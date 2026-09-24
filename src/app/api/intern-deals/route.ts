import { NextRequest, NextResponse } from "next/server";
import { STUDIO_COOKIE, isStudioAuthed } from "@/lib/studio-auth";
import { dealSpeichern, dealsListe, kontaktUpsert, type BwDeal } from "@/lib/crm/db";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/**
 * Mutationen für /intern/pipeline (R5 Leaf G2 — Deal-Kanban). JSON-Client
 * statt Form-POST, weil der Kanban optimistisch im Browser aktualisiert
 * (Drag & Drop, Inline-Wert-Edit) und dafür ok/error als JSON braucht statt
 * eines 303-Redirects. Studio-Cookie ist Pflicht — ohne gültige Sitzung
 * gibt es 401, bevor überhaupt Body gelesen wird (Muster: /api/intern).
 *
 * Drei Aktionen (Auftrag): status · anlegen · wert. src/lib/crm/db.ts stellt
 * nur eine generische dealSpeichern()-RPC bereit, deren Wrapper "titel" als
 * Pflichtfeld sendet und "wert" bei Nicht-Angabe auf 0 setzt (kein
 * COALESCE-Fallback im Wrapper) — ein echtes Partial-Update über die
 * RPC würde also Titel/Wert unbeabsichtigt überschreiben. Deshalb lädt
 * "status" und "wert" hier erst den bestehenden Deal über dealsListe()
 * und sendet alle Felder unverändert mit, außer dem einen, das sich
 * wirklich ändert — kein eigener fetch/rpc-Aufruf, nur die erlaubten
 * db.ts-Wrapper.
 */

export const runtime = "nodejs";

const STATUS_WERTE = new Set(["neu", "kontaktiert", "termin", "angebot", "kunde", "verloren"]);
const MAX_TITEL_ZEICHEN = 200;
const MAX_NOTIZ_ZEICHEN = 2000;
const MAX_WERT_EUR = 100_000_000; // Deckel gegen Tippfehler/Missbrauch, keine reale Mandatsgröße

const VERLUST_LABEL: Record<string, string> = {
  zu_teuer: "Zu teuer",
  keine_antwort: "Keine Antwort",
  wettbewerber: "Wettbewerber",
  kein_bedarf: "Kein Bedarf",
  anderes: "Anderes",
};

function istEmail(wert: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(wert);
}

function pruefeWert(roh: unknown): number | null {
  const wert = typeof roh === "number" ? roh : Number(roh);
  if (!Number.isFinite(wert) || wert < 0 || wert > MAX_WERT_EUR) return null;
  return wert;
}

async function findeDeal(id: string): Promise<BwDeal | null> {
  const deals = await dealsListe();
  return deals.find((d) => d.id === id) ?? null;
}

function fehler(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

async function aktionStatus(body: Record<string, unknown>) {
  const id = String(body.id ?? "").trim();
  const status = String(body.status ?? "").trim();
  if (!id) return fehler(400, "Fehlende Deal-ID.");
  if (!STATUS_WERTE.has(status)) return fehler(422, "Unbekannter Status.");

  const bestehend = await findeDeal(id);
  if (!bestehend) return fehler(404, "Deal nicht gefunden.");

  let verlustGrund = bestehend.verlust_grund || undefined;
  if (status === "verloren") {
    const grundCode = String(body.verlorenGrund ?? "").trim();
    if (!VERLUST_LABEL[grundCode]) return fehler(422, "Bitte einen Verlust-Grund wählen.");
    const notiz = String(body.verlorenNotiz ?? "").slice(0, MAX_NOTIZ_ZEICHEN).trim();
    if (grundCode === "anderes" && !notiz) {
      return fehler(422, "Bei „Anderes“ bitte kurz erläutern.");
    }
    verlustGrund = notiz ? `${VERLUST_LABEL[grundCode]}: ${notiz}` : VERLUST_LABEL[grundCode];
  }

  await dealSpeichern({
    id: bestehend.id,
    kontaktId: bestehend.kontakt_id,
    leadId: bestehend.lead_id,
    titel: bestehend.titel,
    wert: bestehend.wert_eur,
    status,
    verlustGrund,
    erwartet: bestehend.erwartet,
  });

  return NextResponse.json({ ok: true });
}

async function aktionWert(body: Record<string, unknown>) {
  const id = String(body.id ?? "").trim();
  if (!id) return fehler(400, "Fehlende Deal-ID.");
  const wert = pruefeWert(body.wert);
  if (wert === null) return fehler(422, "Ungültiger Wert.");

  const bestehend = await findeDeal(id);
  if (!bestehend) return fehler(404, "Deal nicht gefunden.");

  await dealSpeichern({
    id: bestehend.id,
    kontaktId: bestehend.kontakt_id,
    leadId: bestehend.lead_id,
    titel: bestehend.titel,
    wert,
    status: bestehend.status,
    verlustGrund: bestehend.verlust_grund || undefined,
    erwartet: bestehend.erwartet,
  });

  return NextResponse.json({ ok: true });
}

async function aktionAnlegen(body: Record<string, unknown>) {
  const titel = String(body.titel ?? "").trim().slice(0, MAX_TITEL_ZEICHEN);
  const email = String(body.kontaktEmail ?? "").trim().toLowerCase();
  const leadId = body.leadId ? String(body.leadId).trim() : null;

  if (!titel) return fehler(422, "Bitte einen Titel angeben.");
  if (!istEmail(email)) return fehler(422, "Bitte eine gültige E-Mail-Adresse angeben.");

  const wertRoh = body.wert === undefined || body.wert === null || body.wert === "" ? 0 : body.wert;
  const wert = pruefeWert(wertRoh);
  if (wert === null) return fehler(422, "Ungültiger Wert.");

  const kontaktId = await kontaktUpsert({ email });
  const dealId = await dealSpeichern({
    kontaktId,
    leadId,
    titel,
    wert,
    status: "neu",
  });

  return NextResponse.json({ ok: true, id: dealId });
}

export async function POST(req: NextRequest) {
  if (!rateLimit(`intern-deals:${clientIp(req)}`, 120, 10 * 60_000)) {
    return fehler(429, "Zu viele Anfragen — bitte kurz warten.");
  }

  if (!(await isStudioAuthed(req.cookies.get(STUDIO_COOKIE)?.value))) {
    return fehler(401, "Nicht angemeldet.");
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fehler(400, "Ungültige Anfrage.");
  }

  const aktion = String(body.aktion ?? "");
  if (aktion === "status") return aktionStatus(body);
  if (aktion === "wert") return aktionWert(body);
  if (aktion === "anlegen") return aktionAnlegen(body);

  return fehler(400, "Unbekannte Aktion.");
}
