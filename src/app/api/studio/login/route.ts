import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import {
  STUDIO_COOKIE,
  cookieTokenFor,
  currentCredential,
  verifyCredential,
} from "@/lib/studio-auth";

/**
 * Studio-Login: prüft das Passwort gegen die aktuellen Zugangsdaten
 * (scrypt-Hash aus Supabase, ersatzweise STUDIO_PASSWORD) und setzt bei
 * Erfolg das httpOnly-Cookie "studio_auth" (30 Tage). Ohne eingerichtete
 * Zugangsdaten antwortet die Route ehrlich mit 503 — fail-open gibt es
 * beim Login nicht.
 */

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!rateLimit(`studio-login:${clientIp(req)}`, 10, 10 * 60_000)) {
    return NextResponse.json(
      { ok: false, error: "Zu viele Versuche — bitte in ein paar Minuten erneut probieren." },
      { status: 429 },
    );
  }

  const credential = await currentCredential();
  if (!credential) {
    return NextResponse.json(
      { ok: false, error: "Studio ist auf diesem Deployment nicht konfiguriert." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  const password = typeof body.password === "string" ? body.password : "";
  if (!verifyCredential(password, credential)) {
    return NextResponse.json(
      { ok: false, error: "Das Passwort ist leider nicht korrekt." },
      { status: 401 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(STUDIO_COOKIE, cookieTokenFor(credential), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
