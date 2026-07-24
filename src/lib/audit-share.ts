import { createHmac, timingSafeEqual } from "crypto";

/**
 * HMAC-Signatur für Website-Check-Ergebnisse. Verhindert, dass manipulierte
 * Resultate in den /check/{domain}-Cache gelangen: Nur Payloads, die eine
 * unserer API-Routen selbst erzeugt und signiert hat, akzeptiert /api/audit/save.
 * Ohne AUDIT_SIGNING_SECRET werden keine Shares erzeugt — das Tool läuft
 * dann ohne teilbare Gutachten weiter (fail-open fürs UI, fail-closed fürs Cachen).
 */

export type Share = { blob: string; sig: string };

const secret = () => process.env.AUDIT_SIGNING_SECRET || "";

export function packShare(payload: unknown): Share | null {
  const s = secret();
  if (!s) return null;
  const blob = Buffer.from(JSON.stringify(payload), "utf8").toString("base64");
  const sig = createHmac("sha256", s).update(blob).digest("hex");
  return { blob, sig };
}

export function unpackShare<T>(share: unknown): T | null {
  const s = secret();
  if (!s || typeof share !== "object" || share === null) return null;
  const { blob, sig } = share as { blob?: unknown; sig?: unknown };
  if (typeof blob !== "string" || typeof sig !== "string") return null;
  const expected = createHmac("sha256", s).update(blob).digest();
  let given: Buffer;
  try {
    given = Buffer.from(sig, "hex");
  } catch {
    return null;
  }
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return null;
  }
  try {
    return JSON.parse(Buffer.from(blob, "base64").toString("utf8")) as T;
  } catch {
    return null;
  }
}
