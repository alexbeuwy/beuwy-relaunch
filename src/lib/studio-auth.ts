import { createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

/**
 * Studio-Authentifizierung.
 *
 * Das Passwort liegt als scrypt-Hash in Supabase (Tabelle website_secrets,
 * RLS ohne Policies — für anon unerreichbar). Gelesen und geschrieben wird
 * ausschließlich über zwei SECURITY-DEFINER-Funktionen, die dasselbe
 * CONTENT_WRITE_SECRET verlangen wie das Speichern der Texte. Das Secret
 * verlässt den Server nie.
 *
 * Solange kein Hash in der Datenbank steht, gilt STUDIO_PASSWORD aus der
 * Umgebung — so lässt sich ein frisches Deployment überhaupt erst öffnen.
 * Sobald einmal ein Passwort gesetzt wurde, gewinnt der Datenbankwert.
 *
 * Das Cookie trägt keinen Zufallswert, sondern einen Hash der aktuellen
 * Zugangsdaten. Dadurch macht jeder Passwortwechsel alle offenen
 * Sitzungen ungültig, ganz ohne Session-Speicher.
 */

export const STUDIO_COOKIE = "studio_auth";

/* Trennt den Cookie-Wert vom gespeicherten Hash — der Cookie ist damit
   kein Passwort-Äquivalent, auch wenn er abgegriffen wird. */
const COOKIE_SALT = "beuwy-studio-cookie";

const SCRYPT_N = 16384;
const SCRYPT_R = 8;
const SCRYPT_P = 1;
const KEY_LENGTH = 32;

/* ── Hashen und Prüfen ──────────────────────────────────────────────── */

/** scrypt-Hash mit frischem Salt: scrypt$N$r$p$salt$key, alles base64. */
export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const key = scryptSync(password, salt, KEY_LENGTH, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
  });
  return [
    "scrypt",
    SCRYPT_N,
    SCRYPT_R,
    SCRYPT_P,
    salt.toString("base64"),
    key.toString("base64"),
  ].join("$");
}

/** Konstant-zeitlicher String-Vergleich (Länge zuerst, dann timingSafeEqual). */
export function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

function verifyScrypt(password: string, stored: string): boolean {
  const teile = stored.split("$");
  if (teile.length !== 6 || teile[0] !== "scrypt") return false;
  const N = Number(teile[1]);
  const r = Number(teile[2]);
  const p = Number(teile[3]);
  if (!Number.isInteger(N) || !Number.isInteger(r) || !Number.isInteger(p)) return false;
  /* Grenze gegen einen manipulierten Hash, der den Server mit absurden
     Parametern beschäftigen würde. */
  if (N > 1 << 20 || r > 32 || p > 16) return false;

  let salt: Buffer;
  let erwartet: Buffer;
  try {
    salt = Buffer.from(teile[4], "base64");
    erwartet = Buffer.from(teile[5], "base64");
  } catch {
    return false;
  }
  if (salt.length === 0 || erwartet.length === 0) return false;

  try {
    const key = scryptSync(password, salt, erwartet.length, { N, r, p });
    return key.length === erwartet.length && timingSafeEqual(key, erwartet);
  } catch {
    return false;
  }
}

/* ── Zugangsdaten: Datenbank zuerst, Umgebung als Notnagel ──────────── */

/** Marker für „noch kein Hash gesetzt, es gilt STUDIO_PASSWORD". */
function envCredential(password: string): string {
  return `env$${createHash("sha256").update(password + COOKIE_SALT).digest("hex")}`;
}

async function rpc(fn: string, body: Record<string, unknown>): Promise<Response | null> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  const secret = process.env.CONTENT_WRITE_SECRET;
  if (!url || !key || !secret) return null;
  try {
    return await fetch(`${url}/rest/v1/rpc/${fn}`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...body, p_secret: secret }),
      cache: "no-store",
    });
  } catch {
    return null;
  }
}

/** Der in der Datenbank hinterlegte Hash, oder null. */
async function loadStoredHash(): Promise<string | null> {
  const res = await rpc("get_studio_password_hash", {});
  if (!res || !res.ok) return null;
  try {
    const wert = await res.json();
    return typeof wert === "string" && wert.length > 0 ? wert : null;
  } catch {
    return null;
  }
}

/**
 * Die aktuell gültigen Zugangsdaten — Datenbankhash, sonst STUDIO_PASSWORD.
 * null bedeutet: auf diesem Deployment ist das Studio nicht eingerichtet.
 */
export async function currentCredential(): Promise<string | null> {
  const gespeichert = await loadStoredHash();
  if (gespeichert) return gespeichert;
  const pw = process.env.STUDIO_PASSWORD;
  return pw ? envCredential(pw) : null;
}

/** Prüft ein eingegebenes Passwort gegen die aktuellen Zugangsdaten. */
export function verifyCredential(password: string, credential: string): boolean {
  if (!password) return false;
  if (credential.startsWith("env$")) {
    return safeEqual(envCredential(password).slice(4), credential.slice(4));
  }
  return verifyScrypt(password, credential);
}

/** Schreibt einen neuen Hash. false, wenn die Datenbank nicht erreichbar ist. */
export async function storePasswordHash(hash: string): Promise<boolean> {
  const res = await rpc("set_studio_password_hash", { p_hash: hash });
  return Boolean(res && res.ok);
}

/* ── Cookie ─────────────────────────────────────────────────────────── */

/** Cookie-Wert zu gegebenen Zugangsdaten. Ändert sich mit dem Passwort. */
export function cookieTokenFor(credential: string): string {
  return createHash("sha256").update(credential + COOKIE_SALT).digest("hex");
}

/** Prüft den Wert des "studio_auth"-Cookies gegen die aktuellen Zugangsdaten. */
export async function isStudioAuthed(
  cookieValue: string | undefined | null,
): Promise<boolean> {
  if (!cookieValue) return false;
  const credential = await currentCredential();
  if (!credential) return false;
  return safeEqual(cookieValue, cookieTokenFor(credential));
}
