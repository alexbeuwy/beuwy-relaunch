import { NextRequest } from "next/server";
import { STUDIO_COOKIE, isStudioAuthed, safeEqual } from "@/lib/studio-auth";

/**
 * Zwei Wege ins OS: der angemeldete Mensch (Studio-Cookie) und die
 * Automatik (Cron). Beides wird hier zentral geprüft, damit keine Route
 * es vergisst.
 *
 * Env: OS_CRON_SECRET — Bearer-Token für Vercel-Cron und externe Auslöser.
 */

export async function darfBedienen(req: NextRequest): Promise<boolean> {
  return isStudioAuthed(req.cookies.get(STUDIO_COOKIE)?.value);
}

export function darfAutomatik(req: NextRequest): boolean {
  const secret = process.env.OS_CRON_SECRET;
  if (!secret) return false;
  const kopf = req.headers.get("authorization") || "";
  const wert = kopf.startsWith("Bearer ") ? kopf.slice(7) : "";
  if (wert && safeEqual(wert, secret)) return true;
  /* Vercel-Cron meldet sich mit eigenem Header statt Bearer-Token. */
  const vercel = req.headers.get("x-vercel-cron");
  return Boolean(vercel);
}

export async function darfIrgendwie(req: NextRequest): Promise<boolean> {
  return darfAutomatik(req) || (await darfBedienen(req));
}
