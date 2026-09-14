import { NextRequest, NextResponse } from "next/server";
import { abmelden } from "@/lib/crm/db";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/**
 * POST /api/abmelden — Gegenstück zu src/app/abmelden/page.tsx. Klassischer
 * Form-POST (kein JSON-Client, kein Studio-Cookie): jeder mit einem
 * gültigen "e"-Link aus einer Flow-Mail darf sich selbst abmelden, das ist
 * die ganze Berechtigung, die diese Route braucht. abmelden() in
 * src/lib/crm/db.ts ist fail-open und liefert kein Erfolgssignal zurück
 * (wie leadStatusSetzen/kontoUpsert & Co. — void, Fehler werden intern
 * verschluckt) — die Route leitet deshalb bei jeder syntaktisch gültigen
 * E-Mail optimistisch auf die Erfolgsansicht weiter, genau wie
 * src/app/api/intern/route.ts es für seine eigenen void-RPCs tut.
 */

export const runtime = "nodejs";

function dekodiereEmail(e: string): string | null {
  try {
    const email = Buffer.from(e, "base64url").toString("utf8").trim().toLowerCase();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  if (!rateLimit(`abmelden:${clientIp(req)}`, 20, 10 * 60_000)) {
    return NextResponse.json({ ok: false, error: "Zu viele Anfragen — bitte kurz warten." }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  const e = String(form.get("e") ?? "").trim();
  const email = dekodiereEmail(e);

  if (!email) {
    return NextResponse.redirect(new URL(`/abmelden${e ? `?e=${encodeURIComponent(e)}` : ""}`, req.url), { status: 303 });
  }

  await abmelden(email);

  // 303: der Browser folgt dem POST mit einem frischen GET zurück auf die Bestätigungsansicht.
  return NextResponse.redirect(new URL(`/abmelden?e=${encodeURIComponent(e)}&ok=1`, req.url), { status: 303 });
}
