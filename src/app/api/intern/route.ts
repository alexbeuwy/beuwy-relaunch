import { NextRequest, NextResponse } from "next/server";
import { STUDIO_COOKIE, isStudioAuthed } from "@/lib/studio-auth";
import { leadNotizAnlegen, leadStatusSetzen } from "@/lib/crm/db";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/**
 * Mutationen für /intern (R3 Leaf B8 — CRM). Klassischer Form-POST statt
 * JSON-Client: die Formulare auf der Detailseite (Status-Buttons,
 * Notiz-Textarea) senden application/x-www-form-urlencoded direkt hierher,
 * die Route schreibt über src/lib/crm/db.ts (einziger erlaubter
 * Datenzugriff) und schickt den Browser per 303 zurück zur Detailseite.
 *
 * Studio-Cookie ist Pflicht — ohne gültige Sitzung gibt es 401, bevor
 * überhaupt Formulardaten gelesen werden.
 */

export const runtime = "nodejs";

const STATUS_WERTE = new Set(["neu", "kontaktiert", "termin", "angebot", "kunde", "verloren"]);
const MAX_NOTIZ_ZEICHEN = 4000;

export async function POST(req: NextRequest) {
  if (!rateLimit(`intern:${clientIp(req)}`, 40, 10 * 60_000)) {
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
  const id = String(form.get("id") ?? "").trim();
  const wert = String(form.get("wert") ?? "").trim();

  if (!id) {
    return NextResponse.json({ ok: false, error: "Fehlende Lead-ID." }, { status: 400 });
  }

  if (aktion === "status") {
    if (!STATUS_WERTE.has(wert)) {
      return NextResponse.json({ ok: false, error: "Unbekannter Status." }, { status: 422 });
    }
    await leadStatusSetzen(id, wert);
  } else if (aktion === "notiz") {
    const text = wert.slice(0, MAX_NOTIZ_ZEICHEN);
    if (!text) {
      return NextResponse.json({ ok: false, error: "Notiz ist leer." }, { status: 422 });
    }
    await leadNotizAnlegen(id, text);
  } else {
    return NextResponse.json({ ok: false, error: "Unbekannte Aktion." }, { status: 400 });
  }

  // 303: der Browser folgt dem POST mit einem frischen GET zurück auf die Detailseite.
  return NextResponse.redirect(new URL(`/intern/leads/${encodeURIComponent(id)}`, req.url), {
    status: 303,
  });
}
