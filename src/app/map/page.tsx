import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { cases } from "@/lib/cases";

export const metadata: Metadata = {
  title: "Site-Karte — Cockpit",
  description: "Owner-Cockpit. Alle Routen, gruppiert nach Zweck.",
  // Internal — never indexed, never in sitemap.
  robots: { index: false, follow: false },
};

type RouteEntry = {
  path: string;
  title: string;
  note: string;
  tag: "indexed" | "noindex" | "admin" | "ssg" | "api";
  external?: boolean;
};

type RouteGroup = {
  label: string;
  intent: string;
  entries: RouteEntry[];
};

const groups: RouteGroup[] = [
  {
    label: "01 Öffentlich & indexiert",
    intent: "Organischer + direkter Traffic. In der Sitemap. Was Crawler und Buyer finden.",
    entries: [
      { path: "/", title: "Home", note: "Puck-driven. content/puck/home.json. Hero · Pain · Dream · Mechanism · Proof · Offer · Scarcity · Identification · Magnet · FAQ · BigCTA.", tag: "indexed" },
      { path: "/sichtbar", title: "Sichtbar in der KI-Ära", note: "Premium VSL-Landing. Beweis-lastig statt hype-lastig. Hook: KI frisst die Suche. Schwartz Stage 3/4.", tag: "indexed" },
      { path: "/method", title: "Methode", note: "Vier Phasen · Tag-für-Tag-Plan · Vergleichsmatrix · Pricing · Garantie-Echo · Final-CTA.", tag: "indexed" },
      { path: "/work", title: "Arbeit (Index)", note: "Alle Cases als Karten mit CTA zu den Detail-Pages.", tag: "indexed" },
      { path: "/system", title: "System", note: "Premium-Tier. Track-Record · Operator · Liefervertrag · Geld-zurück-Seal · Pass-Check.", tag: "indexed" },
      { path: "/manifesto", title: "Manifest", note: "Vision/Thesis für die Agent-Ära 2026–2030.", tag: "indexed" },
      { path: "/audit", title: "GPT-Audit", note: "Free Brand-Sichtbarkeits-Audit. Lead-Gate. Funnel-Qualifier.", tag: "indexed" },
      { path: "/anfrage", title: "Brief schicken", note: "Multi-Step Lead-Formular. End-of-funnel.", tag: "indexed" },
    ],
  },
  {
    label: "02 Case-Detail-Pages",
    intent: "SSG, automatisch generiert aus src/lib/cases.ts. Jeder Case hat Vorher/Nachher, Breakdown, Quellen, Audit-Magnet, Nachbar-Rail.",
    entries: cases.map((c) => ({
      path: `/work/${c.slug}`,
      title: c.client,
      note: `${c.cat} · ${c.years} · ${c.kpi} ${c.kpiLabel}`,
      tag: "ssg" as const,
    })),
  },
  {
    label: "03 Paid / Outbound (noindex)",
    intent: "Für Meta-Ads, YouTube-Pre-Roll, LinkedIn-DMs, Newsletter. robots: noindex, canonical → /sichtbar. Nav-frei via ChromeGate. Nicht in der Sitemap.",
    entries: [
      { path: "/go/sichtbar", title: "Paid VSL (premium)", note: "Cold-Traffic-Variante von /sichtbar. Single-CTA, Sticky-Mobile, Founder-Video-Slot.", tag: "noindex" },
      { path: "/go/tsl", title: "Text Sales Letter", note: "Founder-Brief im Cream-Band. Für LinkedIn-DM, Outbound-Email, Newsletter. Schwartz Stage 4/5.", tag: "noindex" },
    ],
  },
  {
    label: "04 Admin · Puck-Editor",
    intent: "Visual page builder. Auth-gated über Middleware. Live-Edits committen direkt nach GitHub.",
    entries: [
      { path: "/build", title: "Puck-Hub", note: "Liste aller editierbaren Puck-Pages + Neuanlage.", tag: "admin" },
      { path: "/build/home", title: "Home editieren", note: "Bearbeitet content/puck/home.json — die echte Homepage.", tag: "admin" },
      { path: "/build/demo", title: "Demo editieren", note: "Spielwiese · content/puck/demo.json.", tag: "admin" },
    ],
  },
  {
    label: "05 System-Routen",
    intent: "Crawler-/SEO-/PWA-Infrastruktur. Brauchst du selten direkt.",
    entries: [
      { path: "/sitemap.xml", title: "Sitemap", note: "Auto-generiert aus src/app/sitemap.ts inkl. aller Case-Slugs.", tag: "indexed" },
      { path: "/robots.txt", title: "Robots", note: "Crawler-Direktiven.", tag: "indexed" },
      { path: "/llms.txt", title: "llms.txt", note: "Agent-Crawler-Briefing (Claude/GPT/Perplexity).", tag: "indexed" },
    ],
  },
];

const repoLinks = [
  { label: "docs/funnel-strategy.md", note: "Internes Strategie-Brief: Schwartz-Stages, 3-Pfad-Architektur, Garantie, Beweis-Hygiene, A/B-Plan, Anti-Patterns." },
  { label: "src/lib/cases.ts", note: "Single source of truth für alle Cases. Hier neue Cases anlegen — /work/[slug] wird automatisch generiert." },
  { label: "content/puck/home.json", note: "Homepage-Inhalte. Editierbar via /build/home oder direkt im Repo." },
  { label: "public/assets/operator/", note: "Drop alexander-puetter.jpg hier — AssetSlots auf Home, /system, /sichtbar, /go/tsl zeigen es automatisch an." },
  { label: "public/assets/cases/", note: "Drop <slug>-hero.jpg pro Case hier. AI-Prompts liegen in den AssetSlots." },
];

export default function MapPage() {
  return (
    <section className="pt-[140px] md:pt-[160px] pb-[120px]">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <Reveal>
          <span className="eyebrow">
            <span className="num">/</span> Owner-Cockpit · 2026
          </span>
        </Reveal>
        <Reveal delay={60}>
          <h1
            className="h-display-xl mt-6"
            style={{ maxWidth: 900 }}
          >
            Alles, was wir gebaut haben —{" "}
            <em className="gradient-text">eine Adresse</em>.
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p
            className="mt-7 max-w-[640px] text-[17px] leading-[1.55]"
            style={{ color: "var(--ink-cream)", letterSpacing: "-0.011em" }}
          >
            Diese Seite ist intern (<code style={{ fontFamily: "var(--font-mono)", color: "var(--ink-yellow)" }}>noindex</code>),
            nicht in der Sitemap, nicht über die Nav verlinkt. Sie ist dein Cockpit — gruppiert
            nach Zweck, mit Status-Tag und Preview.
          </p>
        </Reveal>

        {/* Site stats */}
        <Reveal delay={160}>
          <div
            className="mt-10 grid grid-cols-3 gap-4 max-w-[640px] pt-6"
            style={{ borderTop: "1px solid var(--line-subtle)" }}
          >
            <StatTile big={String(groups[0].entries.length + cases.length)} label="Öffentlich + indexiert" />
            <StatTile big={String(groups[2].entries.length)} label="Paid / Outbound · noindex" />
            <StatTile big={String(cases.length)} label="Case-Detail-Pages (SSG)" />
          </div>
        </Reveal>

        {/* Route groups */}
        <div className="mt-20 space-y-16">
          {groups.map((g, gi) => (
            <Reveal key={g.label} delay={gi * 60}>
              <section>
                <div className="flex items-baseline gap-4 mb-3 flex-wrap">
                  <p
                    className="font-display"
                    style={{
                      fontSize: 28,
                      letterSpacing: "-0.02em",
                      color: "var(--ink-yellow)",
                      lineHeight: 1.1,
                    }}
                  >
                    {g.label}
                  </p>
                </div>
                <p
                  className="mb-6 max-w-[760px] text-[14px] leading-[1.6]"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {g.intent}
                </p>

                <div
                  className="rounded-[14px] overflow-hidden"
                  style={{
                    background: "var(--bg-raised)",
                    border: "1px solid var(--line-subtle)",
                  }}
                >
                  {g.entries.map((r, ri) => (
                    <RouteRow
                      key={r.path}
                      entry={r}
                      last={ri === g.entries.length - 1}
                    />
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        {/* Repo references */}
        <Reveal delay={200}>
          <section className="mt-20">
            <p
              className="font-display"
              style={{
                fontSize: 28,
                letterSpacing: "-0.02em",
                color: "var(--ink-yellow)",
                lineHeight: 1.1,
              }}
            >
              06 Repo-Anker
            </p>
            <p
              className="mt-3 mb-6 max-w-[760px] text-[14px] leading-[1.6]"
              style={{ color: "var(--ink-muted)" }}
            >
              Dateien, die du im GitHub-Repo öffnen kannst — die Quellen hinter den Pages.
            </p>
            <ul className="space-y-2">
              {repoLinks.map((rl) => (
                <li
                  key={rl.label}
                  className="rounded-[10px] p-5 grid md:grid-cols-12 gap-4 items-start"
                  style={{
                    background: "var(--bg-raised)",
                    border: "1px solid var(--line-subtle)",
                  }}
                >
                  <code
                    className="md:col-span-5"
                    style={{
                      color: "var(--ink-yellow)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 13,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {rl.label}
                  </code>
                  <p
                    className="md:col-span-7"
                    style={{ color: "var(--ink-cream)", fontSize: 14, lineHeight: 1.55 }}
                  >
                    {rl.note}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* Build sha + tip */}
        <Reveal delay={260}>
          <div
            className="mt-20 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            style={{ borderTop: "1px solid var(--line-subtle)" }}
          >
            <p
              style={{
                color: "var(--ink-dim)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.06em",
              }}
            >
              Tippe <code style={{ color: "var(--ink-yellow)" }}>/map</code> in die Adresszeile —
              das ist dein Quick-Path zurück hierher.
            </p>
            <p
              style={{
                color: "var(--ink-dim)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.06em",
              }}
            >
              build {process.env.NEXT_PUBLIC_BUILD_SHA || "local"}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatTile({ big, label }: { big: string; label: string }) {
  return (
    <div>
      <p
        className="font-display"
        style={{
          fontSize: 36,
          letterSpacing: "-0.025em",
          color: "var(--ink-yellow)",
          lineHeight: 1,
        }}
      >
        {big}
      </p>
      <p
        className="mt-2"
        style={{
          color: "var(--ink-dim)",
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          lineHeight: 1.3,
        }}
      >
        {label}
      </p>
    </div>
  );
}

function RouteRow({ entry, last }: { entry: RouteEntry; last: boolean }) {
  const tagStyle: Record<RouteEntry["tag"], { bg: string; fg: string; label: string }> = {
    indexed: { bg: "rgba(247,233,154,0.12)", fg: "var(--ink-yellow)", label: "indexed" },
    noindex: { bg: "rgba(255,95,95,0.12)", fg: "var(--accent-red)", label: "noindex" },
    admin:   { bg: "rgba(247,233,154,0.06)", fg: "var(--ink-muted)", label: "admin · auth" },
    ssg:     { bg: "rgba(247,233,154,0.08)", fg: "var(--ink-yellow)", label: "ssg" },
    api:     { bg: "rgba(247,233,154,0.04)", fg: "var(--ink-dim)",    label: "api" },
  };
  const t = tagStyle[entry.tag];

  return (
    <Link
      href={entry.path}
      target={entry.external ? "_blank" : undefined}
      rel={entry.external ? "noreferrer" : undefined}
      className="group block"
      style={{
        padding: "16px 20px",
        borderBottom: last ? "none" : "1px solid var(--line-subtle)",
        textDecoration: "none",
      }}
    >
      <div className="grid md:grid-cols-12 gap-3 items-start">
        <code
          className="md:col-span-3"
          style={{
            color: "var(--ink-yellow)",
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            letterSpacing: "0.01em",
          }}
        >
          {entry.path}
        </code>
        <div className="md:col-span-7">
          <p
            className="font-display"
            style={{
              fontSize: 17,
              letterSpacing: "-0.015em",
              color: "var(--ink-cream)",
              lineHeight: 1.25,
              marginBottom: 4,
            }}
          >
            {entry.title}
          </p>
          <p style={{ color: "var(--ink-muted)", fontSize: 13.5, lineHeight: 1.55 }}>
            {entry.note}
          </p>
        </div>
        <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-2">
          <span
            style={{
              background: t.bg,
              color: t.fg,
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "4px 8px",
              borderRadius: 4,
            }}
          >
            {t.label}
          </span>
          <span
            aria-hidden
            className="group-hover:translate-x-1 transition-transform"
            style={{ color: "var(--ink-yellow)", fontSize: 16 }}
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
