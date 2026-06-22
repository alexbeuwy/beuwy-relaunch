import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, HeadlineDisplay } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { AssetSlot } from "@/components/AssetSlot";
import { CasePlate } from "@/components/CasePlate";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";
import { cases, caseBySlug } from "@/lib/cases";

type Params = { slug: string };

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const c = caseBySlug(slug);
  if (!c) return { title: "Case nicht gefunden" };
  const title = `${c.client} — ${c.headline}`;
  const description = c.body;
  return {
    title,
    description,
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://beuwy.com/work/${c.slug}`,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function CasePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = caseBySlug(slug);
  if (!c) notFound();

  // sibling cases (for the bottom rail)
  const idx = cases.findIndex((x) => x.slug === slug);
  const prev = cases[(idx - 1 + cases.length) % cases.length];
  const next = cases[(idx + 1) % cases.length];

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "beuwy", href: "/" },
          { name: "Arbeit", href: "/work" },
          { name: c.client, href: `/work/${c.slug}` },
        ])}
      />

      {/* ============================================================
          HERO — client, KPI, headline
         ============================================================ */}
      <section className="relative pt-[140px] md:pt-[180px] pb-[64px] overflow-hidden">
        <div
          aria-hidden
          className="glow-orb glow-orb-yellow"
          style={{ top: "-6%", right: "-8%", width: 520, height: 520, opacity: 0.42 }}
        />
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <span className="eyebrow">
              <span className="num">/</span> {c.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="h-display-xl mt-7 max-w-[1080px]">{c.headline}</h1>
          </Reveal>
          <Reveal delay={140}>
            <p
              className="mt-7 max-w-[700px] text-[19px] md:text-[22px] leading-[1.45]"
              style={{ color: "var(--ink-cream)", letterSpacing: "-0.011em" }}
            >
              {c.body}
            </p>
          </Reveal>

          {/* KPI strip */}
          <Reveal delay={200}>
            <div
              className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
              style={{ borderTop: "1px solid var(--line-subtle)" }}
            >
              <KpiCell label="Kategorie" value={c.cat} />
              <KpiCell label="Zeitraum" value={c.years} />
              <KpiCell label="Headline-KPI" value={c.kpi} accent />
              <KpiCell label={c.kpiLabel} value="—" accentValue={false} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          01 — HERO IMAGE
         ============================================================ */}
      <Section chapter="01 Visual" title={c.client} date={c.years} tone="raised">
        <Reveal>
          {c.visual === "plate" ? (
            <CasePlate
              client={c.client}
              kpi={c.kpi}
              kpiLabel={c.kpiLabel}
              cat={c.cat}
              logoSrc={c.plateLogo}
              caption={`${c.client} · ${c.cat}`}
            />
          ) : (
            <AssetSlot
              src={`/assets/cases/${c.slug}-hero.webp`}
              alt={`${c.client} — visual hero`}
              aspect="16/9"
              caption={`${c.client} · ${c.cat}`}
              priority
              prompt={`Premium editorial hero image for ${c.client} (${c.cat}, ${c.years}). Moody dark bordeaux background with warm yellow accent lighting, sculptural product or brand mockup centered. 16:9. Cinematic, magazine cover quality, subtle film grain, not corporate-stocky.`}
            />
          )}
        </Reveal>
      </Section>

      {/* ============================================================
          02 — BEFORE / AFTER
         ============================================================ */}
      <Section chapter="02 Vorher / Nachher" title="Der Sprung" date={c.years} tone="base">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[1000px]">
            Wo es <em className="font-display italic">stand</em> — und{" "}
            <em className="gradient-text">wohin es kippte</em>.
          </HeadlineDisplay>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          <Reveal delay={80}>
            <div
              className="rounded-[14px] p-7 md:p-8 h-full relative"
              style={{
                background: "rgba(255,95,95,0.04)",
                border: "1px solid rgba(255,95,95,0.18)",
              }}
            >
              <span
                style={{
                  color: "var(--accent-red)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Vorher
              </span>
              <p
                className="font-display mt-4"
                style={{ fontSize: 26, letterSpacing: "-0.02em", color: "var(--ink-cream)", lineHeight: 1.2 }}
              >
                Der Ausgangs­zustand
              </p>
              <p className="mt-4 text-[16px] leading-[1.65]" style={{ color: "var(--ink-muted)" }}>
                {c.before}
              </p>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div
              className="rounded-[14px] p-7 md:p-8 h-full relative"
              style={{
                background: "rgba(247,233,154,0.06)",
                border: "1px solid var(--line-medium)",
              }}
            >
              <span
                style={{
                  color: "var(--ink-yellow)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Nachher
              </span>
              <p
                className="font-display mt-4"
                style={{ fontSize: 26, letterSpacing: "-0.02em", color: "var(--ink-yellow)", lineHeight: 1.2 }}
              >
                Was sich verändert hat
              </p>
              <p className="mt-4 text-[16px] leading-[1.65]" style={{ color: "var(--ink-cream)" }}>
                {c.after}
              </p>
            </div>
          </Reveal>
        </div>

        {c.context && (
          <Reveal delay={200}>
            <p
              className="mt-12 max-w-[720px] text-[16px] leading-[1.7]"
              style={{ color: "var(--ink-muted)" }}
            >
              <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>Kontext —</em> {c.context}
            </p>
          </Reveal>
        )}
      </Section>

      {/* ============================================================
          03 — WHAT WE BUILT
         ============================================================ */}
      <Section chapter="03 Lieferumfang" title="Was wir gebaut haben" date={c.years} tone="elevated">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[1000px]">
            Was in unserem
            <br />
            <em className="font-display italic">Lieferumfang</em> lag.
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-6 max-w-[680px] text-[16px] leading-[1.6]" style={{ color: "var(--ink-muted)" }}>
            Wir behaupten nicht, das Wachstum allein gemacht zu haben. Produkt, Markttiming und Sales
            sind die anderen Faktoren. Hier ist, was wir konkret gebaut haben:
          </p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {c.breakdown.map((row, i) => (
            <Reveal key={row.t} delay={i * 60}>
              <div className="card h-full">
                <span
                  className="font-display"
                  style={{ fontSize: 13, color: "var(--ink-dim)", fontFamily: "var(--font-mono)", letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  className="font-display mt-3"
                  style={{ fontSize: 24, letterSpacing: "-0.02em", color: "var(--ink-yellow)", lineHeight: 1.15 }}
                >
                  {row.t}
                </p>
                <p className="mt-3 text-[15px] leading-[1.6]" style={{ color: "var(--ink-cream)" }}>
                  {row.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============================================================
          04 — SOURCES (proof rigor)
         ============================================================ */}
      {c.sources.length > 0 && (
        <Section chapter="04 Quellen" title="Belege" date={c.years} tone="raised">
          <Reveal>
            <HeadlineDisplay size="md" className="max-w-[860px]">
              Jede Zahl <em className="font-display italic">nachprüfbar</em>.
            </HeadlineDisplay>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-6 max-w-[680px] text-[15px] leading-[1.65]" style={{ color: "var(--ink-muted)" }}>
              Was wir nicht beweisen können, behaupten wir nicht. Hier sind die Quellen für die Zahlen
              auf dieser Seite — soweit öffentlich.
            </p>
          </Reveal>
          <div className="mt-10 space-y-3 max-w-[820px]">
            {c.sources.map((src, i) => (
              <Reveal key={src.label} delay={i * 40}>
                <div
                  className="flex items-center gap-4 py-4 px-5 rounded-[10px]"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--line-subtle)",
                  }}
                >
                  <span
                    style={{
                      color: "var(--ink-dim)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.06em",
                      minWidth: 28,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {src.href ? (
                    <a
                      href={src.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 underline-offset-4 hover:underline"
                      style={{ color: "var(--ink-cream)", fontSize: 14 }}
                    >
                      {src.label} <span aria-hidden style={{ color: "var(--ink-yellow)" }}>↗</span>
                    </a>
                  ) : (
                    <span style={{ color: "var(--ink-cream)", fontSize: 14, flex: 1 }}>{src.label}</span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* ============================================================
          05 — QUOTE (if present)
         ============================================================ */}
      {c.quote && (
        <Section tone="cream">
          <Reveal>
            <blockquote
              className="font-display max-w-[900px]"
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                color: "var(--bg-base)",
              }}
            >
              <em className="font-display italic" style={{ color: "#B23A48" }}>&ldquo;</em>
              {c.quote}
              <em className="font-display italic" style={{ color: "#B23A48" }}>&rdquo;</em>
            </blockquote>
          </Reveal>
          <Reveal delay={80}>
            <p
              className="mt-7"
              style={{
                color: "rgba(26,4,4,0.6)",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {c.client} · {c.years}
            </p>
          </Reveal>
        </Section>
      )}

      {/* ============================================================
          AUDIT MAGNET — every case page is also a path to the qualifier
         ============================================================ */}
      <Section tone="bright">
        <div
          aria-hidden
          className="glow-orb glow-orb-cream"
          style={{ top: "20%", right: "-8%", width: 420, height: 420, opacity: 0.7 }}
        />
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <Reveal>
              <HeadlineDisplay size="lg" className="max-w-[540px]">
                Du hast {c.client} gelesen.
                <br />
                <em className="font-display italic">Wie steht deine eigene Seite gerade da?</em>
              </HeadlineDisplay>
            </Reveal>
            <Reveal delay={80}>
              <p
                className="mt-6 text-[16px] leading-[1.55] max-w-[480px]"
                style={{ color: "var(--ink-muted)" }}
              >
                Deine Domain rein. Du bekommst in 15 Sekunden eine klare Einschätzung: was funktioniert,
                was nicht, wo du Anfragen verlierst. Kostenlos, kein Login.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <form
                action="/audit"
                method="get"
                className="mt-7 audit-form-pill rounded-[12px] p-2"
                style={{
                  background: "var(--bg-raised)",
                  border: "1px solid var(--line-subtle)",
                  maxWidth: 480,
                }}
              >
                <div className="flex items-stretch gap-2">
                  <input
                    type="text"
                    name="domain"
                    required
                    placeholder="deine-website.de"
                    className="audit-form-input flex-1 px-4 py-3 rounded-[10px]"
                    style={{
                      background: "transparent",
                      color: "var(--ink-cream)",
                      fontSize: 14,
                      outline: "none",
                      border: "1px solid var(--line-subtle)",
                      fontFamily: "var(--font-mono)",
                    }}
                  />
                  <button type="submit" className="btn-primary" style={{ height: 44 }}>
                    Audit
                    <span aria-hidden>→</span>
                  </button>
                </div>
                <p
                  className="audit-form-hint px-2 py-3"
                  style={{ fontSize: 11, letterSpacing: "0.04em" }}
                >
                  15 Sek · kein Login · klare Antworten in einfachem Deutsch
                </p>
              </form>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={120}>
              <div
                className="rounded-[14px] p-7"
                style={{
                  background: "rgba(247,233,154,0.06)",
                  border: "1px solid var(--line-medium)",
                }}
              >
                <p
                  className="font-display"
                  style={{
                    fontSize: 22,
                    letterSpacing: "-0.018em",
                    color: "var(--ink-yellow)",
                    lineHeight: 1.2,
                  }}
                >
                  Wenn der Audit zeigt, dass deine Seite Anfragen liegen lässt —{" "}
                  <em className="font-display italic">sprechen wir.</em>
                </p>
                <p
                  className="mt-4 text-[14px] leading-[1.6]"
                  style={{ color: "var(--ink-cream)" }}
                >
                  8.900 € fester Preis. In 10 Werktagen live. Tag 10 oder Geld zurück.
                </p>
                <Link
                  href="/anfrage"
                  className="inline-flex items-center gap-2 mt-5 text-[14px]"
                  style={{ color: "var(--ink-yellow)", fontWeight: 510 }}
                >
                  Oder Brief schicken
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ============================================================
          06 — NEIGHBOR CASES + CTA
         ============================================================ */}
      <Section chapter="06 Weiter" title="Andere Cases" date="" tone="base" divider={false}>
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[900px]">
            Vier Mal von <em className="gradient-text">0</em> zur Kategorie.
            <br />
            Hier sind die anderen.
          </HeadlineDisplay>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {[prev, next].map((nb) => (
            <Reveal key={nb.slug}>
              <Link href={`/work/${nb.slug}`} className="card block h-full group">
                <span
                  style={{
                    color: "var(--ink-dim)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.06em",
                  }}
                >
                  {nb.cat.toUpperCase()} · {nb.years}
                </span>
                <p
                  className="font-display mt-4"
                  style={{ fontSize: 28, letterSpacing: "-0.02em", color: "var(--ink-yellow)", lineHeight: 1.1 }}
                >
                  {nb.client}
                </p>
                <p
                  className="font-display mt-4"
                  style={{ fontSize: 44, letterSpacing: "-0.025em", color: "var(--ink-yellow)", lineHeight: 1 }}
                >
                  {nb.kpi}
                </p>
                <p className="mt-2" style={{ color: "var(--ink-cream)", fontSize: 14, fontWeight: 510 }}>
                  {nb.kpiLabel}
                </p>
                <p className="mt-5 text-[15px] leading-[1.55]" style={{ color: "var(--ink-muted)" }}>
                  {nb.body}
                </p>
                <span
                  className="inline-block mt-6 text-[13px] group-hover:text-[var(--ink-yellow)] transition-colors"
                  style={{ color: "var(--ink-cream)" }}
                >
                  Case lesen →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <div className="mt-16 flex flex-wrap items-center gap-3">
            <Link href="/audit" className="btn-primary">
              Vielleicht deins? — Audit starten
              <span aria-hidden>→</span>
            </Link>
            <Link href="/anfrage" className="btn-secondary">
              Brief schicken
            </Link>
            <Link href="/work" className="btn-secondary">
              Alle Cases
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

function KpiCell({ label, value, accent = false }: { label: string; value: string; accent?: boolean; accentValue?: boolean }) {
  return (
    <div>
      <p
        style={{
          color: "var(--ink-dim)",
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </p>
      <p
        className="font-display mt-2"
        style={{
          fontSize: accent ? 32 : 18,
          letterSpacing: "-0.02em",
          color: accent ? "var(--ink-yellow)" : "var(--ink-cream)",
          lineHeight: 1.1,
        }}
      >
        {value}
      </p>
    </div>
  );
}
