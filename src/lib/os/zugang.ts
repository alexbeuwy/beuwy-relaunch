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
  /* Gleiches Muster wie die Website-Crons (api/cron/flows, erinnerungen):
     Bearer-Secret, wenn gesetzt — sonst reicht der Vercel-Cron-Header.
     Vorher brach die Funktion ohne OS_CRON_SECRET sofort ab, und die
     Crons aus vercel.json liefen nie (Launch-Audit 14.09). */
  const secret = process.env.OS_CRON_SECRET;
  if (secret) {
    const kopf = req.headers.get("authorization") || "";
    const wert = kopf.startsWith("Bearer ") ? kopf.slice(7) : "";
    if (wert && safeEqual(wert, secret)) return true;
  }
  return Boolean(req.headers.get("x-vercel-cron"));
}

export async function darfIrgendwie(req: NextRequest): Promise<boolean> {
  return darfAutomatik(req) || (await darfBedienen(req));
}
