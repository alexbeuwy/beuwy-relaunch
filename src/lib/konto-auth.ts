import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Kundenkonto-Session (/konto, R3 Leaf B9). Signiertes Cookie statt
 * Server-Session-Speicher — Muster identisch zu src/lib/studio-auth.ts:
 * HMAC statt eines zufälligen Session-Tokens, damit kein Speicher für
 * offene Sitzungen nötig ist. Anders als beim Studio ist
 * CONTENT_WRITE_SECRET hier kein hartes Erfordernis: fehlt es (Preview-
 * Deployment ohne Env), greift ein fest hinterlegter Demo-Schlüssel, damit
 * /konto auf jedem Deployment ehrlich durchklickbar bleibt. Das Cookie ist
 * ohnehin kein Passwort-Ersatz für sensible Daten — es bestätigt nur, dass
 * dieser Browser gerade einen an die E-Mail-Adresse verschickten Code
 * eingegeben hat (Muster: Magic-Code-Login). Für echte Auslieferungen
 * bleibt CONTENT_WRITE_SECRET wie überall sonst im Projekt gesetzt.
 */

export const KONTO_COOKIE = "konto_auth";

const DEMO_FALLBACK_SECRET = "beuwy-konto-demo-secret-ohne-env";

function secret(): string {
  return process.env.CONTENT_WRITE_SECRET || DEMO_FALLBACK_SECRET;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

/** E-Mail (base64url) + Punkt + HMAC-Signatur — der Punkt kommt in keinem der beiden Teile vor. */
function cookieValueFor(email: string): string {
  const payload = Buffer.from(email, "utf8").toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function emailFromCookieValue(value: string): string | null {
  const trenner = value.lastIndexOf(".");
  if (trenner <= 0) return null;
  const payload = value.slice(0, trenner);
  const signatur = value.slice(trenner + 1);
  if (!signatur || !safeEqual(signatur, sign(payload))) return null;
  try {
    const email = Buffer.from(payload, "base64url").toString("utf8");
    return email || null;
  } catch {
    return null;
  }
}

/** Setzt das signierte Session-Cookie für eine bestätigte E-Mail-Adresse (httpOnly, 30 Tage). */
export async function setzeKontoCookie(email: string): Promise<void> {
  const jar = await cookies();
  jar.set(KONTO_COOKIE, cookieValueFor(email.trim().toLowerCase()), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

/** Liest die aktuell angemeldete E-Mail-Adresse aus dem Cookie, oder null ohne gültige Sitzung. */
export async function leseKontoCookie(): Promise<string | null> {
  const jar = await cookies();
  const wert = jar.get(KONTO_COOKIE)?.value;
  if (!wert) return null;
  return emailFromCookieValue(wert);
}

/** Meldet ab: löscht das Session-Cookie. */
export async function loescheKontoCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete(KONTO_COOKIE);
}

/** Zufälliger 6-stelliger Code (führende Nullen erlaubt) für den echten, DB-gestützten Login. */
export function zufallsKontoCode(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

/**
 * Speicherloser Demo-Code für Deployments ohne konfigurierte Datenbank
 * (crmKonfiguriert() === false): eine aus E-Mail + 15-Minuten-Zeitfenster
 * abgeleitete HMAC-Ziffernfolge. So funktioniert /konto komplett ohne
 * Env — "code" und "einloesen" berechnen unabhängig voneinander denselben
 * Wert, ohne dass eine Instanz sich den zuvor erzeugten Code merken müsste
 * (Serverless-Instanzen teilen sich sonst keinen Speicher, siehe
 * src/lib/rate-limit.ts). Toleriert das vorherige Zeitfenster mit, damit
 * ein kurz vor dem Umschlagen angeforderter Code nicht sofort verfällt.
 */
function demoCodeZeitfenster(versatz = 0): number {
  return Math.floor(Date.now() / (15 * 60_000)) - versatz;
}

function demoCodeFuerFenster(email: string, fenster: number): string {
  const digest = sign(`konto-demo-code:${email}:${fenster}`);
  const zahl = parseInt(digest.slice(0, 8), 16) % 1_000_000;
  return String(zahl).padStart(6, "0");
}

export function demoKontoCode(email: string): string {
  return demoCodeFuerFenster(email.trim().toLowerCase(), demoCodeZeitfenster());
}

export function demoKontoCodeGueltig(email: string, code: string): boolean {
  const e = email.trim().toLowerCase();
  return code === demoCodeFuerFenster(e, demoCodeZeitfenster(0)) || code === demoCodeFuerFenster(e, demoCodeZeitfenster(1));
}
