import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { darfIrgendwie } from "@/lib/os/zugang";
import { instagramKonfiguriert, instagramSync } from "@/lib/os/instagram";
import { tiktokKonfiguriert, tiktokSync } from "@/lib/os/tiktok";

/**
 * Der tägliche Lauf. Holt Instagram und TikTok parallel, schreibt Reels
 * und Followerstände nach Supabase und protokolliert jeden Versuch —
 * auch den gescheiterten, damit im Dashboard sichtbar wird, welche
 * Anbindung klemmt.
 *
 * Ausgelöst von Vercel-Cron (vercel.json) oder von Hand aus /os.
 */

export const runtime = "nodejs";
export const maxDuration = 120;

async function lauf() {
  const [ig, tt] = await Promise.all([
    instagramKonfiguriert()
      ? instagramSync()
      : Promise.resolve({ ok: false, anzahl: 0, detail: "nicht konfiguriert" }),
    tiktokKonfiguriert()
      ? tiktokSync()
      : Promise.resolve({ ok: false, anzahl: 0, detail: "nicht konfiguriert" }),
  ]);
  revalidatePath("/os");
  return { instagram: ig, tiktok: tt };
}

export async function POST(req: NextRequest) {
  if (!(await darfIrgendwie(req))) {
    return NextResponse.json({ ok: false, error: "Nicht berechtigt" }, { status: 401 });
  }
  const ergebnis = await lauf();
  return NextResponse.json({ ok: ergebnis.instagram.ok || ergebnis.tiktok.ok, ...ergebnis });
}

/* Vercel-Cron ruft mit GET. */
export async function GET(req: NextRequest) {
  return POST(req);
}
