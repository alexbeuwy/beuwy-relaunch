import { NextRequest, NextResponse } from "next/server";
import { STUDIO_COOKIE, isStudioAuthed } from "@/lib/studio-auth";
import { ticketAntwortAnlegen, ticketStatusSetzen } from "@/lib/crm/db";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/**
 * Mutationen für /intern/tickets (R5 Leaf G7). Klassischer Form-POST statt
 * JSON-Client — Muster identisch zu src/app/api/intern/route.ts: die
 * Formulare auf der Tickets-Seite (Status-Buttons, Antwort-Textarea)
 * senden application/x-www-form-urlencoded direkt hierher, die Route
 * schreibt über src/lib/crm/db.ts (einziger erlaubter Datenzugriff) und
 * schickt den Browser per 303 zurück zur selben Konto-/Ticket-Auswahl.
 *
 * Studio-Cookie ist Pflicht — ohne gültige Sitzung gibt es 401, bevor
 * überhaupt Formulardaten gelesen werden.
 */

export const runtime = "nodejs";

const STATUS_WERTE = new Set(["offen", "in-arbeit", "erledigt"]);
const MAX_TEXT_ZEICHEN = 4000;

export async function POST(req: NextRequest) {
  if (!rateLimit(`intern-tickets:${clientIp(req)}`, 40, 10 * 60_000)) {
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
  const idRoh = String(form.get("id") ?? "").trim();
  const id = Number(idRoh);
  const konto = String(form.get("konto") ?? "").trim();

  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ ok: false, error: "Fehlende oder ungültige Ticket-ID." }, { status: 400 });
  }

  if (aktion === "status") {
    const wert = String(form.get("wert") ?? "").trim();
    if (!STATUS_WERTE.has(wert)) {
      return NextResponse.json({ ok: false, error: "Unbekannter Status." }, { status: 422 });
    }
    await ticketStatusSetzen(id, wert);
  } else if (aktion === "antwort") {
    const text = String(form.get("text") ?? "").trim().slice(0, MAX_TEXT_ZEICHEN);
    if (!text) {
      return NextResponse.json({ ok: false, error: "Antwort ist leer." }, { status: 422 });
    }
    await ticketAntwortAnlegen(id, "beuwy", text);
  } else {
    return NextResponse.json({ ok: false, error: "Unbekannte Aktion." }, { status: 400 });
  }

  // 303: der Browser folgt dem POST mit einem frischen GET zurück auf dieselbe Auswahl.
  const ziel = new URL("/intern/tickets", req.url);
  if (konto) ziel.searchParams.set("konto", konto);
  ziel.searchParams.set("ticket", String(id));
  return NextResponse.redirect(ziel, { status: 303 });
}
