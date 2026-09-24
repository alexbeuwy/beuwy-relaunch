import { NextRequest, NextResponse } from "next/server";
import { STUDIO_COOKIE, isStudioAuthed } from "@/lib/studio-auth";
import { aufgabeSpeichern, kontaktUpsert } from "@/lib/crm/db";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/**
 * Mutationen für /intern/aufgaben (R5 Leaf G6 — Aufgaben + Termin-
 * Erinnerungen). Klassischer Form-POST statt JSON-Client, exakt wie
 * /api/intern und /api/intern-kontakte: die Formulare senden
 * application/x-www-form-urlencoded direkt hierher, die Route schreibt
 * ausschließlich über src/lib/crm/db.ts und schickt den Browser per 303
 * zurück — kein Client-JS nötig.
 *
 * BESTEHENDE ABHÄNGIGKEIT (nicht von diesem Leaf gebaut, aber zu erfüllen):
 * src/app/intern/page.tsx (Leaf G1, "Fällige Aufgaben"-Panel im
 * Tageskommando) postet bereits gegen diese Route mit
 * `aktion=erledigen&id=<id>&zurueck=/intern` — der Aktions-Name lautet
 * dort "erledigen", nicht "erledigt". Diese Route übernimmt exakt diesen
 * Namen (statt der Kurzform aus der Auftragsbeschreibung), damit G1s
 * Checkbox-Formular ohne Anpassung funktioniert. /intern/aufgaben (dieses
 * Leaf) nutzt denselben Aktionsnamen für seine eigenen Zeilen.
 *
 * Drei Aktionen: anlegen · erledigen · wieder-oeffnen.
 *
 * "anlegen" — Titel Pflicht, Fällig-Datum optional (YYYY-MM-DD aus einem
 * <input type="date">, wird unverändert an aufgabeSpeichern() durchgereicht
 * — Postgres castet das Format selbst), Kontakt-E-Mail optional. Ist eine
 * E-Mail angegeben, läuft sie zuerst durch kontaktUpsert() (legt den
 * Kontakt an oder findet ihn wieder) — die zurückgegebene Kontakt-ID
 * verknüpft die neue Aufgabe darüber mit dem Kontakt. Liefert
 * kontaktUpsert() null (RPC nicht konfiguriert oder fehlgeschlagen — beide
 * Fälle fail-open in db.ts), wird die Aufgabe trotzdem angelegt, nur ohne
 * Kontakt-Verknüpfung — ein CRM-Ausfall darf das Anlegen einer Aufgabe nie
 * verhindern.
 *
 * "erledigen"/"wieder-oeffnen" — reine id-basierte Statusumkehr über
 * dieselbe aufgabeSpeichern()-Upsert-Funktion (p_erledigt true/false).
 *
 * Fehler wandern als stabiler CODE im Redirect-Query (?fehler=titel etc.),
 * nicht als fertiger Satz — die Zielseite übersetzt den Code über ihre
 * eigenen Studio-Texte (src/lib/texte/intern-aufgaben.ts). Muster:
 * src/app/api/intern-kontakte/route.ts.
 *
 * Studio-Cookie ist Pflicht — ohne gültige Sitzung gibt es 401, bevor
 * überhaupt Formulardaten gelesen werden.
 */

export const runtime = "nodejs";

const MAX_TITEL_ZEICHEN = 300;
const STANDARD_ZIEL = "/intern/aufgaben";

function istEmail(wert: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(wert);
}

/** Nur eigene, relative Ziele — kein "//evil.tld" (protokoll-relativer
 *  Open-Redirect), sonst der feste Standard. Formulare setzen "zurueck"
 *  bewusst selbst (G1: "/intern", dieses Leaf: "/intern/aufgaben"), damit
 *  der Browser dahin zurückkehrt, wo die Aktion ausgelöst wurde. */
function zielUrl(req: NextRequest, form: FormData): URL {
  const roh = String(form.get("zurueck") ?? "").trim();
  const pfad = roh.startsWith("/") && !roh.startsWith("//") ? roh : STANDARD_ZIEL;
  return new URL(pfad, req.url);
}

function redirectOk(req: NextRequest, form: FormData) {
  return NextResponse.redirect(zielUrl(req, form), { status: 303 });
}

function redirectMitFehler(req: NextRequest, form: FormData, code: string) {
  const url = zielUrl(req, form);
  url.searchParams.set("fehler", code);
  return NextResponse.redirect(url, { status: 303 });
}

function parseId(form: FormData): number | null {
  const roh = String(form.get("id") ?? "").trim();
  if (!roh) return null;
  const n = Number(roh);
  return Number.isFinite(n) ? n : null;
}

async function aktionAnlegen(req: NextRequest, form: FormData) {
  const titel = String(form.get("titel") ?? "").trim().slice(0, MAX_TITEL_ZEICHEN);
  if (!titel) {
    return redirectMitFehler(req, form, "titel");
  }

  const faelligRoh = String(form.get("faellig") ?? "").trim();
  const faellig = /^\d{4}-\d{2}-\d{2}$/.test(faelligRoh) ? faelligRoh : null;

  const kontaktEmail = String(form.get("kontaktEmail") ?? "").trim().toLowerCase();
  let kontaktId: string | null = null;
  if (kontaktEmail) {
    if (!istEmail(kontaktEmail)) {
      return redirectMitFehler(req, form, "email");
    }
    kontaktId = await kontaktUpsert({ email: kontaktEmail });
  }

  await aufgabeSpeichern({ titel, faellig, kontaktId });
  return redirectOk(req, form);
}

async function aktionErledigen(req: NextRequest, form: FormData) {
  const id = parseId(form);
  if (id === null) {
    return redirectMitFehler(req, form, "id");
  }
  await aufgabeSpeichern({ id, erledigt: true });
  return redirectOk(req, form);
}

async function aktionWiederOeffnen(req: NextRequest, form: FormData) {
  const id = parseId(form);
  if (id === null) {
    return redirectMitFehler(req, form, "id");
  }
  await aufgabeSpeichern({ id, erledigt: false });
  return redirectOk(req, form);
}

export async function POST(req: NextRequest) {
  if (!rateLimit(`intern-aufgaben:${clientIp(req)}`, 60, 10 * 60_000)) {
    return NextResponse.json({ ok: false, error: "Zu viele Anfragen — bitte kurz warten." }, { status: 429 });
  }

  if (!(await isStudioAuthed(req.cookies.get(STUDIO_COOKIE)?.value))) {
    return NextResponse.json({ ok: false, error: "Nicht angemeldet." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  const aktion = String(form.get("aktion") ?? "");
  if (aktion === "anlegen") return aktionAnlegen(req, form);
  if (aktion === "erledigen") return aktionErledigen(req, form);
  if (aktion === "wieder-oeffnen") return aktionWiederOeffnen(req, form);

  return NextResponse.json({ ok: false, error: "Unbekannte Aktion." }, { status: 400 });
}
