import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Activity,
  CheckSquare,
  FileText,
  Kanban,
  Mail,
  MessageSquare,
  PenLine,
  Radio,
  Sun,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { STUDIO_COOKIE, isStudioAuthed } from "@/lib/studio-auth";
import { Logo } from "@/components/Logo";
import { Toaster } from "@/components/ui/sonner";
import { getContent } from "@/lib/content";
import { INTERN_SHELL_DEFAULTS } from "@/lib/texte/intern-shell";
import { CommandPalette } from "./CommandPalette";

/**
 * Layout für /intern (R5 Leaf G1 — Shell + Dashboard). Löst das schmale
 * Kopfzeilen-Layout aus R3 (vier Tabs nebeneinander) durch das in
 * docs/redesign/R5-PORTGUT.md „Design-Direktive CRM" Regel 1 verlangte
 * Muster ab: eine schmale, ruhige linke Sidebar (240px, mobil als
 * Overlay einklappbar) statt einer wachsenden Tableiste — die zehn
 * /intern-Unterseiten aus R5-FUNKTIONEN.md brauchen mehr Struktur, als
 * eine horizontale Leiste tragen kann.
 *
 * Der bestehende Redirect-Schutz bleibt exakt erhalten: ohne gültiges
 * Studio-Cookie geht es direkt auf /login?weiter=/intern, kein
 * Zwischenklick. Mit Cookie umschließt dieses Layout jede /intern-
 * Unterseite — auch die von Nachbar-Leafs gebauten Routen unten in NAV,
 * von denen zum jetzigen Stand nur /intern, /intern/mails und
 * /intern/leads/[id] tatsächlich existieren. Die übrigen Links (Pipeline,
 * Kontakte, Aufgaben, Flows, Einblick, Tickets, Wochenbericht) sind
 * bewusst schon verdrahtet, auch wenn ihre Zielseiten erst durch die
 * Geschwister-Leafs entstehen — 404 bis dahin ist der erwartete
 * Zwischenzustand, kein Bug dieses Leafs.
 *
 * Aktive Zeile + Kopfzeilen-Titel werden NICHT über usePathname()
 * gelöst: das würde eine eigene "use client"-Datei brauchen (siehe
 * src/components/NurWebsite.tsx als Präzedenzfall im Repo), die außerhalb
 * der für dieses Leaf erlaubten Dateiliste läge. Stattdessen ein
 * minimales, Framework-loses Vanilla-JS-Snippet unten im Markup: liest
 * document.title (von jeder Unterseite ohnehin per metadata gesetzt) für
 * den Kopfzeilen-Titel und location.pathname für die Akzent-Zeile in der
 * Sidebar, beobachtet den <title>-Tag per MutationObserver, damit auch
 * Next-eigene Soft-Navigation (Link-Klicks) beide aktuell hält. Ohne JS
 * bleibt die Navigation voll nutzbar, nur ohne Live-Hervorhebung — fail
 * open, wie Reveal.tsx es an anderer Stelle im Repo vormacht.
 *
 * Mobile Overlay ausschließlich über den Checkbox-Hack (kein JS nötig):
 * eine sr-only Checkbox + zwei <label for>, Sidebar/Backdrop reagieren
 * per peer-checked. Website-Nav/Footer werden weiterhin über die
 * NurWebsite-Mechanik in src/app/layout.tsx ausgeblendet — "/intern" dort
 * zu ergänzen ist Sache des Integrationsschritts, nicht dieses Leafs.
 *
 * LEAF U1 (CRM-Shell-Politur, 27.08): jeder Nav-Punkt trägt jetzt sein
 * lucide-Icon (18px, Farbe erbt über currentColor — sh. Zuordnung direkt
 * über NAV unten), der Kopfzeile hängt ein "⌘K"-Hinweis-Chip an, der
 * CommandPalette.tsx öffnet (globales Cmd/Ctrl+K, eigene "use client"-
 * Datei — die Beschränkung aus dem Absatz oben galt für DIESES Layout,
 * nicht für neue Geschwisterdateien im selben Leaf), und der sonner-
 * Toaster hängt global hier, damit jede /intern-Unterseite toast()
 * nutzen kann, ohne selbst einen Toaster zu mounten. Das Datum in der
 * Kopfzeile weicht auf sm: aus, damit Titel + Chip auf schmalen
 * Bildschirmen nicht mit ihm konkurrieren.
 */

export const metadata: Metadata = {
  title: "Intern — beuwy",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type NavPunkt = { href: string; label: string; Icon: LucideIcon };
type NavGruppe = { titel: string; punkte: NavPunkt[] };

/* Icon je Nav-Punkt (lucide-react, 18px im Markup unten, Farbe erbt via
   currentColor) — Zuordnung passend zum Seiteninhalt: Heute=Sun (Tages-
   überblick), Pipeline=Kanban (Board), Kontakte=Users, Aufgaben=
   CheckSquare, Flows=Workflow (Automatisierungsketten), Einblick=Activity
   (Kennzahlen/Trends), Tickets=MessageSquare, Wochenbericht=FileText,
   Mails=Mail, Studio=PenLine (Text-CMS), OS=Radio (Content-/Signal-
   Ingest aus Instagram/TikTok, Branding-OS-Dashboard). */
const NAV: NavGruppe[] = [
  {
    titel: "Arbeit",
    punkte: [
      { href: "/intern", label: "Heute", Icon: Sun },
      { href: "/intern/pipeline", label: "Pipeline", Icon: Kanban },
      { href: "/intern/kontakte", label: "Kontakte", Icon: Users },
      { href: "/intern/aufgaben", label: "Aufgaben", Icon: CheckSquare },
    ],
  },
  {
    titel: "Wachstum",
    punkte: [
      { href: "/intern/flows", label: "Flows", Icon: Workflow },
      { href: "/intern/einblick", label: "Einblick", Icon: Activity },
    ],
  },
  {
    titel: "Kunden",
    punkte: [
      { href: "/intern/tickets", label: "Tickets", Icon: MessageSquare },
      { href: "/intern/wochenbericht", label: "Wochenbericht", Icon: FileText },
    ],
  },
  {
    titel: "System",
    punkte: [
      { href: "/intern/mails", label: "Mails", Icon: Mail },
      { href: "/studio", label: "Studio", Icon: PenLine },
      { href: "/os", label: "OS", Icon: Radio },
    ],
  },
];

/** Drei Balken, selbst gezeichnet — kein Icon-Import (Muster: Funke in MaklerElemente.tsx). */
function HamburgerGlyph() {
  return (
    <svg width="17" height="13" viewBox="0 0 17 13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
      <path d="M1 1.5h15M1 6.5h15M1 11.5h15" />
    </svg>
  );
}

/* Reine Vanilla-JS-Synchronisation, siehe Datei-Kommentar oben — kein
   React-State, kein Hydration-Risiko, läuft nach dem ersten Paint. */
const NAV_SYNC_SCRIPT = `(function(){
  function sync(){
    var t=(document.title||"").split("—")[0].trim();
    var slot=document.querySelector("[data-intern-titel]");
    if(slot&&t){slot.textContent=t;}
    var pfad=location.pathname;
    document.querySelectorAll("[data-intern-nav]").forEach(function(a){
      var href=a.getAttribute("href")||"";
      var aktiv=href==="/intern"?pfad==="/intern":(pfad===href||pfad.indexOf(href+"/")===0);
      if(aktiv){a.setAttribute("data-aktiv","");}else{a.removeAttribute("data-aktiv");}
    });
  }
  sync();
  var titelKnoten=document.querySelector("title");
  if(titelKnoten&&window.MutationObserver){
    new MutationObserver(sync).observe(titelKnoten,{childList:true});
  }
  window.addEventListener("popstate",sync);
})();`;

export default async function InternLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isStudioAuthed((await cookies()).get(STUDIO_COOKIE)?.value);

  if (!authed) {
    redirect("/login?weiter=/intern");
  }

  const c = await getContent();
  const t = (key: string) => c[key] ?? INTERN_SHELL_DEFAULTS[key] ?? key;

  const datum = new Date().toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-dvh bg-bg-base lg:flex">
      {/* Checkbox-Hack: steuert das mobile Sidebar-Overlay vollständig ohne JS. */}
      <input type="checkbox" id="intern-nav" className="peer sr-only" aria-label="Navigation ein-/ausblenden" />

      <label
        htmlFor="intern-nav"
        aria-hidden
        className="fixed inset-0 z-40 hidden bg-ink-cream/40 peer-checked:block lg:hidden"
      />

      <aside className="fixed inset-y-0 left-0 z-50 flex w-[240px] -translate-x-full flex-col border-r border-line-subtle bg-white transition-transform duration-(--duration-medium) ease-(--ease-smooth-out) peer-checked:translate-x-0 lg:static lg:z-auto lg:w-[240px] lg:shrink-0 lg:translate-x-0">
        <div className="flex h-16 shrink-0 items-center border-b border-line-subtle px-5">
          <Logo height={18} />
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-5" aria-label="Interne Bereiche">
          {NAV.map((gruppe) => (
            <div key={gruppe.titel} className="mb-6 last:mb-0">
              <p className="t-label px-3">{gruppe.titel}</p>
              <div className="mt-2 flex flex-col gap-0.5">
                {gruppe.punkte.map((punkt) => (
                  <Link
                    key={punkt.href}
                    href={punkt.href}
                    data-intern-nav
                    className="flex items-center gap-2.5 rounded-lg border-l-2 border-transparent px-3 py-2 text-[13.5px] font-medium text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-bg-elevated hover:text-ink-cream data-[aktiv]:border-akzent data-[aktiv]:bg-akzent-wash data-[aktiv]:font-semibold data-[aktiv]:text-ink-cream"
                  >
                    <punkt.Icon size={18} className="shrink-0" aria-hidden />
                    {punkt.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-line-subtle px-5 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <label
              htmlFor="intern-nav"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line-subtle text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream lg:hidden"
            >
              <HamburgerGlyph />
            </label>
            <p data-intern-titel className="truncate text-[15px] font-semibold text-ink-cream">
              Intern
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <CommandPalette
              texte={{
                titel: t("intern.shell.palette.titel"),
                beschreibung: t("intern.shell.palette.beschreibung"),
                platzhalter: t("intern.shell.palette.platzhalter"),
                leer: t("intern.shell.palette.leer"),
                oeffnenLabel: t("intern.shell.palette.oeffnen_label"),
              }}
            />
            <time dateTime={new Date().toISOString().slice(0, 10)} className="t-data tnum hidden !text-ink-dim sm:inline">
              {datum}
            </time>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>

      <Toaster position="bottom-right" richColors={false} />
      <script dangerouslySetInnerHTML={{ __html: NAV_SYNC_SCRIPT }} />
    </div>
  );
}
