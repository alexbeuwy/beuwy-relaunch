import type { Metadata } from "next";
import { cookies } from "next/headers";
import { STUDIO_COOKIE, isStudioAuthed } from "@/lib/studio-auth";
import { StudioLogin } from "@/components/StudioLogin";
import { BrandingOS } from "@/components/BrandingOS";
import { ladeSnapshot, osKonfiguriert } from "@/lib/os/db";
import { lageBerechnen } from "@/lib/os/kpi";
import { instagramKonfiguriert } from "@/lib/os/instagram";
import { tiktokKonfiguriert } from "@/lib/os/tiktok";
import { engineKonfiguriert } from "@/lib/os/skript-engine";
import { stimmeKonfiguriert } from "@/lib/os/stimme";
import { LEERER_SNAPSHOT } from "@/lib/os/typen";

/**
 * Branding OS — internes Dashboard fürs Personal Branding
 * (Antigravity-Protokoll, docs/branding/). Hinter demselben Login wie
 * /studio, noindex, aus dem Studio verlinkt.
 *
 * Die Daten kommen aus Supabase und werden zweimal täglich von der
 * Automatik gefüllt (/api/os/sync, Zeiten in vercel.json).
 */

export const metadata: Metadata = {
  title: "Branding OS — beuwy",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function OsPage() {
  const angemeldet = await isStudioAuthed(
    (await cookies()).get(STUDIO_COOKIE)?.value,
  );

  if (!angemeldet) {
    return (
      <div className="min-h-dvh bg-[#131311] px-4 pt-32">
        <StudioLogin ziel="/os" />
      </div>
    );
  }

  const snapshot = osKonfiguriert() ? await ladeSnapshot() : LEERER_SNAPSHOT;

  return (
    <BrandingOS
      snapshot={snapshot}
      lage={lageBerechnen(snapshot)}
      anbindungen={{
        datenbank: osKonfiguriert(),
        instagram: instagramKonfiguriert(),
        tiktok: tiktokKonfiguriert(),
        engine: engineKonfiguriert(),
        stimme: stimmeKonfiguriert(),
      }}
    />
  );
}
