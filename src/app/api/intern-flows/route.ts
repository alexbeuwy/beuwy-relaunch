import { NextRequest, NextResponse } from "next/server";
import { STUDIO_COOKIE, isStudioAuthed } from "@/lib/studio-auth";
import { flowSpeichern, flowsListe } from "@/lib/crm/db";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/**
 * Mutationen für /intern/flows (R5 Leaf G4 — E-Mail-Flow-Builder). JSON-
 * Client statt Form-POST, weil der Editor optimistisch im Browser
 * aktualisiert (Status-Umschalter auf der Karte, Speichern im Editor) und
 * dafür ok/error als JSON braucht statt eines 303-Redirects — exaktes
 * Muster von src/app/api/intern-deals/route.ts. Studio-Cookie ist Pflicht
 * — ohne gültige Sitzung gibt es 401, bevor überhaupt Body gelesen wird.
 *
 * Zwei Aktionen: speichern · status. src/lib/crm/db.ts stellt nur eine
 * generische flowSpeichern()-RPC bereit, die name/status/ausloeser/
 * schritte immer vollständig sendet (kein Partial-Update) — deshalb lädt
 * "status" erst den bestehenden Flow über flowsListe() und sendet alle
 * Felder unverändert mit, außer dem Status. Kein eigener fetch/rpc-Aufruf,
 * nur der erlaubte db.ts-Wrapper.
 */

export const runtime = "nodejs";

const STATUS_WERTE = new Set(["entwurf", "aktiv", "pausiert"]);
const AUSLOESER_WERTE = new Set(["lead_neu", "tool_lead", "booking", "konto_neu", "manuell"]);
const VORLAGE_WERTE = new Set([
  "funnel_bestaetigung",
  "termin_bestaetigung",
  "termin_erinnerung",
  "nachfass",
  "tool_ergebnis",
  "konto_code",
]);
const BEDINGUNG_WERTE = new Set(["neu", "kontaktiert", "termin", "angebot", "kunde", "verloren"]);

const MAX_NAME_ZEICHEN = 200;
const MAX_BETREFF_ZEICHEN = 200;
const MAX_TEXT_ZEICHEN = 4000;
const MAX_SCHRITTE = 40;
const MAX_STUNDEN = 24 * 90; // Deckel gegen Tippfehler — 90 Tage Wartezeit sind schon absurd lang

function fehler(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

/** Prüft und normalisiert eine einzelne Schritt-Zeile aus dem Request-Body.
 *  Wirft nichts — liefert null bei ungültiger Form, der Aufrufer entscheidet
 *  über die Fehlermeldung. */
function pruefeSchritt(roh: unknown): { typ: string; konfig: Record<string, unknown> } | null {
  if (!roh || typeof roh !== "object") return null;
  const o = roh as Record<string, unknown>;
  const typ = String(o.typ ?? "");
  const konfigRoh = o.konfig && typeof o.konfig === "object" ? (o.konfig as Record<string, unknown>) : {};

  if (typ === "mail") {
    const modus = String(konfigRoh.modus ?? "");
    if (modus === "vorlage") {
      const vorlageId = String(konfigRoh.vorlageId ?? "");
      if (!VORLAGE_WERTE.has(vorlageId)) return null;
      return { typ, konfig: { modus, vorlageId } };
    }
    if (modus === "frei") {
      const betreff = String(konfigRoh.betreff ?? "").trim().slice(0, MAX_BETREFF_ZEICHEN);
      const text = String(konfigRoh.text ?? "").trim().slice(0, MAX_TEXT_ZEICHEN);
      if (!betreff || !text) return null;
      return { typ, konfig: { modus, betreff, text } };
    }
    return null;
  }

  if (typ === "warten") {
    const stunden = Number(konfigRoh.stunden);
    if (!Number.isFinite(stunden) || stunden <= 0 || stunden > MAX_STUNDEN) return null;
    return { typ, konfig: { stunden } };
  }

  if (typ === "bedingung") {
    const feld = String(konfigRoh.feld ?? "status");
    const wert = String(konfigRoh.wert ?? "");
    if (feld !== "status" || !BEDINGUNG_WERTE.has(wert)) return null;
    return { typ, konfig: { feld: "status", wert } };
  }

  return null;
}

async function findeFlow(id: string): Promise<Record<string, unknown> | null> {
  const flows = await flowsListe();
  return flows.find((f) => String(f.id ?? "") === id) ?? null;
}

async function aktionSpeichern(body: Record<string, unknown>) {
  const id = body.id ? String(body.id).trim() : null;
  const name = String(body.name ?? "").trim().slice(0, MAX_NAME_ZEICHEN);
  const status = String(body.status ?? "");
  const ausloeser = String(body.ausloeser ?? "");

  if (!name) return fehler(422, "Bitte einen Namen angeben.");
  if (!STATUS_WERTE.has(status)) return fehler(422, "Unbekannter Status.");
  if (!AUSLOESER_WERTE.has(ausloeser)) return fehler(422, "Unbekannter Auslöser.");

  const schritteRoh = Array.isArray(body.schritte) ? body.schritte : [];
  if (schritteRoh.length === 0) return fehler(422, "Bitte mindestens einen Schritt hinzufügen.");
  if (schritteRoh.length > MAX_SCHRITTE) return fehler(422, "Zu viele Schritte in einem Flow.");

  const schritte: Array<{ typ: string; konfig: Record<string, unknown> }> = [];
  for (const roh of schritteRoh) {
    const geprueft = pruefeSchritt(roh);
    if (!geprueft) return fehler(422, "Ein Schritt ist unvollständig oder ungültig.");
    schritte.push(geprueft);
  }

  const flowId = await flowSpeichern({ id, name, status, ausloeser, schritte });
  return NextResponse.json({ ok: true, id: flowId });
}

async function aktionStatus(body: Record<string, unknown>) {
  const id = String(body.id ?? "").trim();
  const status = String(body.status ?? "");
  if (!id) return fehler(400, "Fehlende Flow-ID.");
  if (!STATUS_WERTE.has(status)) return fehler(422, "Unbekannter Status.");

  const bestehend = await findeFlow(id);
  if (!bestehend) return fehler(404, "Flow nicht gefunden.");

  const name = typeof bestehend.name === "string" ? bestehend.name : "";
  const ausloeser = typeof bestehend.ausloeser === "string" ? bestehend.ausloeser : "manuell";
  const schritte = Array.isArray(bestehend.schritte) ? bestehend.schritte : [];

  await flowSpeichern({
    id: bestehend.id ? String(bestehend.id) : id,
    name,
    status,
    ausloeser,
    schritte: schritte as Array<{ typ: string; konfig: Record<string, unknown> }>,
  });

  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest) {
  if (!rateLimit(`intern-flows:${clientIp(req)}`, 60, 10 * 60_000)) {
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
  if (aktion === "speichern") return aktionSpeichern(body);
  if (aktion === "status") return aktionStatus(body);

  return fehler(400, "Unbekannte Aktion.");
}
