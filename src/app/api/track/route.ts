import { NextResponse } from "next/server";
import { z } from "zod";
import { trackAnlegen } from "@/lib/crm/db";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/**
 * Einsammel-Route für das Einblick-Erstanbieter-Tracking (R5 Leaf G5).
 * Gegenstück zu src/lib/track-client.ts. Muster portiert aus
 * /home/user/alexbeuwy/riegel/src/app/api/track/route.ts (siehe
 * docs/redesign/R5-PORTGUT.md Fundstück 2) — mit einer bewussten
 * Abweichung: beuwy schreibt NICHT direkt auf eine Tabelle, sondern über
 * die SECURITY-DEFINER-RPC bw_track_anlegen (src/lib/crm/db.ts ::
 * trackAnlegen), Muster wie jeder andere Datenzugriff im Projekt.
 *
 * Die RPC (per Supabase-Introspektion geprüft) liest aus jedem Batch-
 * Item GENAU diese Feldnamen: event, pfad, step, quelle, x_pct, y_pct,
 * bereich, ansicht, geraet, pageload_id — alles andere wird ignoriert.
 * Diese Route baut also aus dem client-seitigen Wire-Format
 * (camelCase-artig, siehe track-client.ts) exakt diese Spaltennamen,
 * validiert JEDES Feld einzeln gegen eine Allowlist/einen Wertebereich
 * und verwirft Unbekanntes statt zu werfen (Riegel-Prinzip: kaputte
 * Client-Daten dürfen nie den ganzen Batch kosten).
 *
 * DATENSCHUTZ BY DESIGN — was hier bewusst NICHT passiert:
 * - KEINE IP, KEIN User-Agent, KEIN Referrer wird gespeichert. Die IP
 *   dient ausschließlich flüchtig dem In-Memory-Rate-Limit.
 * - KEIN Freitext aus dem Client landet ungefiltert in der DB.
 * - Öffentliche Seiten only: /intern, /studio, /os, /konto werden hier
 *   noch einmal serverseitig verworfen — auch wenn der Client (aus
 *   welchem Grund auch immer) doch ein Ereignis für einen dieser Pfade
 *   schickt, landet es nie in der Datenbank.
 *
 * FAIL-SOFT (Auftrag: „Antwort immer 204"): Tracking darf die Seite NIE
 * stören. Anders als Riegels Route (dort 429 bei Rate-Limit) gibt es
 * hier wirklich KEINEN im Browser sichtbaren Fehlerzustand — Rate-Limit,
 * kaputter Body, fehlende Supabase-Konfiguration, DB-Fehler laufen alle
 * auf denselben 204.
 */

/** Zod-Allowlist der Event-Namen — einzige Quelle der Wahrheit für den
 *  Ereignis-Vertrag zwischen track-client.ts und dieser Route. */
const EventName = z.enum(["pageview", "klick", "scroll_tiefe"]);

const ERLAUBTE_GERAETE = new Set(["desktop", "mobil"]);

/** Pfade, die NIE gespeichert werden — Spiegel der Liste in
 *  src/lib/track-client.ts (defense in depth, siehe Datei-Kopf). */
const GESPERRTE_PFADE = ["/intern", "/studio", "/os", "/konto"];

/** Muss zu KLICK_STUFEN in src/lib/track-client.ts passen (0,5-%-Buckets). */
const KLICK_STUFEN = 200;

/** Gültige Scroll-Tiefen-Marken — Vertrag mit track-client.ts SCROLL_MARKEN. */
const SCROLL_MARKEN = new Set([25, 50, 75, 100]);

/** Ein Batch-Request darf höchstens so viele Events tragen; der Client
 *  flusht bei 12 (track-client.ts), 25 ist der großzügige Sicherheitsdeckel. */
const MAX_ITEMS = 25;
const MAX_PFAD_LAENGE = 300;

interface EventZeile {
  event: string;
  pfad: string;
  step: number | null;
  quelle: null;
  x_pct: number | null;
  y_pct: number | null;
  bereich: string | null;
  ansicht: null;
  geraet: string | null;
  pageload_id: string;
}

/** Ganzzahl im Bereich [min, max] — sonst null (verwerfen statt klemmen,
 *  damit offensichtlicher Unsinn nicht als Randwert in die Auswertung rutscht). */
function ganzzahl(v: unknown, min: number, max: number): number | null {
  const n = Math.round(Number(v));
  return Number.isFinite(n) && n >= min && n <= max ? n : null;
}

/** Pfad normalisieren: muss mit "/" beginnen, Query/Hash werden gekappt
 *  (Einblick wertet nach Pfad aus, nicht nach Parametern), gesperrte
 *  Pfade fliegen ganz raus. */
function normalisierterPfad(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const roh = v.trim();
  if (!roh.startsWith("/")) return null;
  const ohneParams = roh.split("?")[0]?.split("#")[0] || "/";
  const pfad = ohneParams.slice(0, MAX_PFAD_LAENGE);
  if (GESPERRTE_PFADE.some((g) => pfad === g || pfad.startsWith(`${g}/`))) return null;
  return pfad;
}

/**
 * Ein Roh-Item auf genau die erlaubten Spalten abbilden. Rückgabe null =
 * verwerfen (ganzes Item). Einzelne unbekannte Nebenfelder verwerfen nur
 * das FELD (Riegel-Muster) — z. B. ein unbekanntes `geraet` kostet nicht
 * den ganzen Klick, nur die Geräte-Zuordnung dieses einen Klicks.
 */
function normalisiere(raw: unknown): EventZeile | null {
  if (!raw || typeof raw !== "object") return null;
  const it = raw as Record<string, unknown>;

  const eventPruefung = EventName.safeParse(it.event);
  if (!eventPruefung.success) return null;
  const event = eventPruefung.data;

  const pfad = normalisierterPfad(it.pfad);
  if (!pfad) return null;

  const pageloadId = typeof it.pageloadId === "string" ? it.pageloadId.trim().slice(0, 64) : "";
  if (!pageloadId) return null;

  const geraetRoh = typeof it.geraet === "string" ? it.geraet : "";
  const geraet = ERLAUBTE_GERAETE.has(geraetRoh) ? geraetRoh : null;

  const zeile: EventZeile = {
    event,
    pfad,
    step: null,
    quelle: null,
    x_pct: null,
    y_pct: null,
    bereich: null,
    ansicht: null,
    geraet,
    pageload_id: pageloadId,
  };

  if (event === "klick") {
    const x = ganzzahl(it.xPct, 0, KLICK_STUFEN);
    const y = ganzzahl(it.yPct, 0, KLICK_STUFEN);
    if (x === null || y === null) return null; // Klick ohne gültige Koordinate ist wertlos
    zeile.x_pct = x;
    zeile.y_pct = y;
    const bereich = typeof it.bereich === "string" ? it.bereich.trim().slice(0, 60) : "";
    // Nur ein knapper Slug-Bereichsname (data-track-bereich), kein Freitext.
    zeile.bereich = /^[a-z0-9_-]{1,60}$/i.test(bereich) ? bereich : "seite";
  } else if (event === "scroll_tiefe") {
    // Zweckentfremdet die `step`-Spalte (Riegel-Erbe: Rechner-Schrittnummer)
    // für die Scroll-Tiefen-Marke — siehe Erklärung in track-client.ts.
    const tiefe = ganzzahl(it.tiefe, 0, 100);
    if (tiefe === null || !SCROLL_MARKEN.has(tiefe)) return null;
    zeile.step = tiefe;
  }

  return zeile;
}

export async function POST(req: Request) {
  // Antwort immer 204 (Auftrag), auch bei Rate-Limit — siehe Datei-Kopf.
  if (!rateLimit(`track:${clientIp(req)}`, 60, 10 * 60_000)) {
    return new NextResponse(null, { status: 204 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  const items = (body as { items?: unknown })?.items;
  if (!Array.isArray(items) || items.length === 0) {
    return new NextResponse(null, { status: 204 });
  }

  const zeilen = items
    .slice(0, MAX_ITEMS)
    .map(normalisiere)
    .filter((z): z is EventZeile => z !== null);

  if (zeilen.length === 0) return new NextResponse(null, { status: 204 });

  // trackAnlegen() ist fail-open (src/lib/crm/db.ts): ohne Supabase-Env
  // oder bei einem DB-Fehler passiert einfach nichts — nie ein Throw.
  // EventZeile ist strukturell ein Record<string, unknown> (nur enger
  // typisiert) — die Signatur von trackAnlegen ist bewusst generisch
  // gehalten, weil sie jeden künftigen Track-Event-Aufrufer bedient.
  await trackAnlegen(zeilen as unknown as Array<Record<string, unknown>>);

  return new NextResponse(null, { status: 204 });
}
