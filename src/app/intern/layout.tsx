import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { STUDIO_COOKIE, isStudioAuthed } from "@/lib/studio-auth";
import { Logo } from "@/components/Logo";

/**
 * Layout für /intern (R3 Leaf B8 — CRM, Redirect seit R2 — Auth-UX).
 * Gleiches Cookie/Muster wie /os und /studio (src/lib/studio-auth.ts):
 * ohne gültiges Cookie gibt es hier nichts zu sehen — statt einer
 * Hinweis-Karte jetzt ein direkter redirect("/login?weiter=/intern"),
 * damit der Zugangsweg für alle internen Bereiche gleich aussieht. Nach
 * erfolgreichem Login (src/app/login/page.tsx honoriert den weiter-Param)
 * geht es direkt zurück hierher statt über einen Zwischenklick.
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
    redirect("/login?weiter=/intern");
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
