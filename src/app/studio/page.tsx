import type { Metadata } from "next";
import { cookies } from "next/headers";
import { DEFAULTS, FIELD_LABELS } from "@/lib/content";
import { STUDIO_COOKIE, currentCredential, isStudioAuthed } from "@/lib/studio-auth";
import { StudioEditor } from "@/components/StudioEditor";
import { PasswortAendern } from "@/components/PasswortAendern";
import { StudioLogin } from "@/components/StudioLogin";

/**
 * Studio — internes Text-CMS. Nicht verlinkt, noindex, Cookie-geschützt.
 * Ohne gültiges Cookie: Login. Mit Cookie: Editor, der die aktuellen
 * Overrides direkt (uncached) aus Supabase lädt und über DEFAULTS merged.
 */

export const metadata: Metadata = {
  title: "Studio — beuwy",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function loadOverrides(): Promise<Record<string, string>> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return {};
  try {
    const res = await fetch(`${url}/rest/v1/website_content?select=key,value`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: "no-store",
    });
    if (!res.ok) return {};
    const rows = (await res.json()) as Array<{ key?: unknown; value?: unknown }>;
    const overrides: Record<string, string> = {};
    for (const row of rows) {
      if (row && typeof row.key === "string" && typeof row.value === "string") {
        overrides[row.key] = row.value;
      }
    }
    return overrides;
  } catch {
    // Fail-open: ohne Datenbank zeigt der Editor die Default-Texte.
    return {};
  }
}

export default async function StudioPage({
  searchParams,
}: {
  searchParams: Promise<{ weiter?: string }>;
}) {
  // weiter-Param aus /login (R4 Auth-UX): nach dem Login zurueck zum
  // Ziel (z. B. /intern). Gleiche Sicherheitsregel wie in login/page.tsx.
  const { weiter } = await searchParams;
  const ziel =
    weiter && weiter.startsWith("/") && !weiter.startsWith("//") &&
    !weiter.includes("\\") && !weiter.includes("://") && weiter.length <= 200
      ? weiter
      : "/studio";
  const jar = await cookies();
  const authed = await isStudioAuthed(jar.get(STUDIO_COOKIE)?.value);

  if (!authed) {
    const configured = Boolean(await currentCredential());
    return (
      <div className="mx-auto max-w-[420px] px-6 pt-36 pb-32">
        <p className="t-label">Studio</p>
        <h1 className="t-h2 mt-4">
          <em>Anmelden</em>
        </h1>
        <p className="t-body mt-4">
          Interner Bereich für Textänderungen an der Website.
        </p>
        <div className="panel mt-8 rounded-xl p-6 sm:p-8">
          {configured ? (
            <StudioLogin ziel={ziel} />
          ) : (
            <p className="t-small">
              Studio ist auf diesem Deployment nicht konfiguriert. Bitte die
              Umgebungsvariable <span className="t-data is-cream">STUDIO_PASSWORD</span> setzen.
            </p>
          )}
        </div>
      </div>
    );
  }

  const overrides = await loadOverrides();
  const writable = Boolean(
    process.env.SUPABASE_URL &&
      process.env.SUPABASE_ANON_KEY &&
      process.env.CONTENT_WRITE_SECRET,
  );

  return (
    <div className="mx-auto max-w-[880px] px-6 lg:px-10 pt-32 pb-24">
      <header>
        <p className="t-label">Studio</p>
        <h1 className="t-h2 mt-4">
          Texte <em>bearbeiten</em>
        </h1>
        <p className="t-body mt-4 max-w-[560px]">
          Felder anpassen und unten speichern — die Website übernimmt die
          Änderungen innerhalb einer Minute. „Zurücksetzen“ stellt den
          Standardtext eines Feldes wieder her.
        </p>
        {!writable && (
          <p className="t-small is-fail mt-4 max-w-[560px]">
            Hinweis: Auf diesem Deployment ist keine Datenbank-Verbindung
            konfiguriert — Speichern wird fehlschlagen.
          </p>
        )}
        {/* Zweiter interner Bereich hinter demselben Login. */}
        <p className="t-small mt-6">
          <a href="/os" className="underline underline-offset-4">
            Branding OS öffnen
          </a>{" "}
          — Reel-Zahlen, Entscheidungen und die Skript-Engine.
        </p>
      </header>
      <div className="mt-12">
        <StudioEditor defaults={DEFAULTS} overrides={overrides} labels={FIELD_LABELS} />
      </div>
      <div className="hairline mt-16 border-t pt-8">
        <PasswortAendern />
      </div>
    </div>
  );
}
