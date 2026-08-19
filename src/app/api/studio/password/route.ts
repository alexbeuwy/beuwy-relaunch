import { NextRequest, NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import {
  STUDIO_COOKIE,
  cookieTokenFor,
  currentCredential,
  hashPassword,
  isStudioAuthed,
  storePasswordHash,
  verifyCredential,
} from "@/lib/studio-auth";

/**
 * Passwort ändern. Verlangt eine gültige Sitzung UND das aktuelle
 * Passwort — ein abgegriffenes Cookie allein reicht also nicht, um
 * ausgesperrt zu werden.
 *
 * Der neue scrypt-Hash geht über die abgesicherte RPC nach Supabase.
 * Danach ist jedes alte Cookie ungültig (der Cookie-Wert leitet sich aus
 * dem Hash ab), deshalb bekommt der aufrufende Browser sofort ein frisches.
 */

export const runtime = "nodejs";

const MIN_LENGTH = 10;
const MAX_LENGTH = 200;

export async function POST(req: NextRequest) {
  if (!rateLimit(`studio-pw:${clientIp(req)}`, 5, 10 * 60_000)) {
    return NextResponse.json(
      { ok: false, error: "Zu viele Versuche — bitte in ein paar Minuten erneut probieren." },
      { status: 429 },
    );
  }

  if (!(await isStudioAuthed(req.cookies.get(STUDIO_COOKIE)?.value))) {
    return NextResponse.json(
      { ok: false, error: "Nicht angemeldet — bitte im Studio neu anmelden." },
      { status: 401 },
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

  const aktuell = typeof body.current === "string" ? body.current : "";
  const neu = typeof body.next === "string" ? body.next : "";

  if (!verifyCredential(aktuell, credential)) {
    return NextResponse.json(
      { ok: false, error: "Das aktuelle Passwort stimmt nicht." },
      { status: 401 },
    );
  }
  if (neu.length < MIN_LENGTH) {
    return NextResponse.json(
      { ok: false, error: `Das neue Passwort braucht mindestens ${MIN_LENGTH} Zeichen.` },
      { status: 422 },
    );
  }
  if (neu.length > MAX_LENGTH) {
    return NextResponse.json(
      { ok: false, error: `Das neue Passwort ist zu lang (max. ${MAX_LENGTH} Zeichen).` },
      { status: 422 },
    );
  }
  if (neu === aktuell) {
    return NextResponse.json(
      { ok: false, error: "Das neue Passwort ist dasselbe wie das alte." },
      { status: 422 },
    );
  }

  const hash = hashPassword(neu);
  if (!(await storePasswordHash(hash))) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Das neue Passwort konnte nicht gespeichert werden — die Datenbankverbindung fehlt. Das alte Passwort gilt weiter.",
      },
      { status: 503 },
    );
  }

  const res = NextResponse.json({ ok: true });
  /* Der Hash ist neu, damit auch der Cookie-Wert — alle anderen
     Sitzungen sind ab jetzt abgemeldet. */
  res.cookies.set(STUDIO_COOKIE, cookieTokenFor(hash), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
