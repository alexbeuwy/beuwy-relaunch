import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Studio-Authentifizierung — bewusst minimal:
 * Das httpOnly-Cookie "studio_auth" trägt den SHA-256-Hex von
 * (STUDIO_PASSWORD + Salt). Serverseitig wird derselbe Wert aus der
 * Env-Var abgeleitet und konstant-zeitlich verglichen. Kein Session-Store
 * nötig; ein geändertes STUDIO_PASSWORD invalidiert alle Cookies sofort.
 */

export const STUDIO_COOKIE = "studio_auth";

const STUDIO_SALT = "beuwy-studio-salt";

/** SHA-256-Hex von (password + Salt) — Cookie-Wert und Vergleichsbasis. */
export function hashStudioSecret(password: string): string {
  return createHash("sha256").update(password + STUDIO_SALT).digest("hex");
}

/** Erwarteter Cookie-Wert laut Env. null, wenn STUDIO_PASSWORD fehlt. */
export function expectedStudioToken(): string | null {
  const password = process.env.STUDIO_PASSWORD;
  if (!password) return null;
  return hashStudioSecret(password);
}

/** Konstant-zeitlicher String-Vergleich (Länge zuerst, dann timingSafeEqual). */
export function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

/** Prüft den Wert des "studio_auth"-Cookies. Fehlende Env ⇒ nie angemeldet. */
export function isStudioAuthed(cookieValue: string | undefined | null): boolean {
  const expected = expectedStudioToken();
  if (!expected || !cookieValue) return false;
  return safeEqual(cookieValue, expected);
}
