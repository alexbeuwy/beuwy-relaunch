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
    const overrides: Record<string, string> = {};
    /* Seitenweise (PostgREST-Deckel 1.000 Zeilen), gleiches Muster wie
       getContent() — der Editor muss JEDEN Override sehen. */
    for (let von = 0; von < 50_000; von += 1000) {
      const res = await fetch(`${url}/rest/v1/website_content?select=key,value&order=key.asc`, {
        headers: { apikey: key, Authorization: `Bearer ${key}`, Range: `${von}-${von + 999}` },
        cache: "no-store",
      });
      if (!res.ok && res.status !== 206) break;
      const rows = (await res.json()) as Array<{ key?: unknown; value?: unknown }>;
      for (const row of rows) {
        if (row && typeof row.key === "string" && typeof row.value === "string") {
          overrides[row.key] = row.value;
        }
      }
      if (rows.length < 1000) break;
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
    <div className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-32 pb-24">
      <header className="max-w-[640px]">
        <p className="t-label">Studio</p>
        <h1 className="t-h2 mt-4">
          Texte <em>bearbeiten</em>
        </h1>
        <p className="t-body mt-4">
          Bereich links wählen, Felder anpassen und unten speichern — jede
          Seite wird beim Speichern neu gerendert, der Text steht sofort
          live. Was hier steht, ist der Live-Stand: Standardtext aus dem
          Code oder Ihre Änderung. „Zurücksetzen“ stellt den Standardtext
          wieder her.
        </p>
        {!writable && (
          <p className="t-small is-fail mt-4">
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
      <div className="hairline mt-16 max-w-[640px] border-t pt-8">
        <PasswortAendern />
      </div>
    </div>
  );
}
