import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { STUDIO_COOKIE, isStudioAuthed } from "@/lib/studio-auth";
import { Logo } from "@/components/Logo";

/**
 * Layout für /intern (R3 Leaf B8 — CRM). Gleiches Cookie/Muster wie /os
 * und /studio (src/lib/studio-auth.ts): ohne gültiges Cookie gibt es
 * hier nichts zu sehen, nur einen Hinweis mit Link zur Anmeldung
 * (/login → leitet auf /studio weiter, das den Login-Screen zeigt).
 *
 * Mit Cookie: eine schmale interne Kopfzeile (kleines Logo + Tabs zu den
 * vier internen Bereichen) über jeder /intern-Unterseite — Pipeline,
 * Detailseite und die von Leaf B7 gebaute Mail-Vorschau teilen sich
 * dieses Layout, weil isStudioAuthed hier zentral einmal geprüft wird.
 *
 * Die Website-Nav/Footer werden über die NurWebsite-Mechanik in
 * src/app/layout.tsx ausgeblendet (dort steht bislang nur "/os" in der
 * INTERN-Liste — "/intern" gehört im Integrationsschritt ergänzt, das
 * ist außerhalb der für dieses Leaf zugewiesenen Dateien).
 */

export const metadata: Metadata = {
  title: "Intern — beuwy",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const TABS = [
  { href: "/intern", label: "Pipeline" },
  { href: "/intern/mails", label: "Mails" },
  { href: "/studio", label: "Studio" },
  { href: "/os", label: "OS" },
] as const;

export default async function InternLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isStudioAuthed((await cookies()).get(STUDIO_COOKIE)?.value);

  if (!authed) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-bg-base px-6">
        <div className="max-w-[380px] text-center">
          <p className="t-label">Intern</p>
          <h1 className="t-h2 mt-4">Nicht angemeldet</h1>
          <p className="t-body mt-4">
            Pipeline, Mails und die anderen internen Werkzeuge sind Studio-Zugängen vorbehalten.
          </p>
          <Link
            href="/login"
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-akzent px-6 py-3 text-[14px] font-semibold text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-akzent-hover"
          >
            Zur Anmeldung
            <span
              aria-hidden
              className="transition-transform duration-(--duration-quick) ease-(--ease-smooth-out) group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-bg-base">
      <header className="border-b border-line-subtle">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-3.5 lg:px-10">
          <Logo height={20} />
          <nav className="flex items-center gap-6 overflow-x-auto" aria-label="Interne Bereiche">
            {TABS.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className="whitespace-nowrap text-[13px] font-medium text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream"
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
