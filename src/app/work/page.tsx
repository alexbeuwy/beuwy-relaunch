import type { Metadata } from "next";
import Link from "next/link";
import { Section, HeadlineDisplay } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { AssetSlot } from "@/components/AssetSlot";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";
import { cases } from "@/lib/cases";

export const metadata: Metadata = {
  title: "Arbeit — vier Marken, die wir mit aufgebaut haben",
  description:
    "Vision · Königswege · acta · PURELEI. €160M KKR Joint Venture · 2.240 Partner · 315 Wohnungen · 1M Follower. Eine Hand, seit 2017.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Arbeit — vier Marken, die wir mit aufgebaut haben",
    description: "Vision · Königswege · acta · PURELEI. €300M+ im Kundenbuch.",
    type: "article",
    url: "https://beuwy.com/work",
  },
  twitter: { card: "summary_large_image" },
};

const breadcrumb = breadcrumbLd([{ name: "beuwy", href: "/" }, { name: "Arbeit", href: "/work" }]);

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <section className="pt-[140px] md:pt-[180px] pb-[64px]">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <span className="eyebrow"><span className="num">/</span> Arbeit · 2017 → 2026</span>
          </Reveal>
          <Reveal delay={80}>
            <h1
              className="h-display-xl mt-7 max-w-[1100px]"
            >
              Vier Marken — <em className="gradient-text">von unbekannt</em>{" "}
              zu bekannt.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              className="mt-7 max-w-[680px] text-[19px] md:text-[22px] leading-[1.45]"
              style={{ color: "var(--ink-cream)", letterSpacing: "-0.011em" }}
            >
              <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>€300M+</em> im Kundenbuch.
              PURELEI · Vision · Königswege · acta. Seit 2017 dieselbe Hand am Steuer.
            </p>
          </Reveal>
        </div>
      </section>

      <Section chapter="01 Cases" title="Was wir gebaut haben" date="" tone="raised">
        <div className="space-y-6">
          {cases.map((c, i) => (
            <Reveal key={c.slug} delay={i * 40}>
              <article
                id={c.slug}
                className="glass grid md:grid-cols-12 gap-8 items-start p-7 md:p-10"
              >
                <div className="md:col-span-12">
                  <AssetSlot
                    src={`/assets/cases/${c.slug}.jpg`}
                    alt={`${c.client} — case visual`}
                    aspect="16/9"
                    caption={`${c.client} · ${c.cat}`}
                    prompt={`Premium editorial photograph for ${c.client} (${c.cat}) — moody dark bordeaux background with yellow accent lighting, sculptural mockup or product hero shot, 16:9`}
                  />
                </div>
                <div className="md:col-span-4">
                  <span
                    style={{
                      color: "var(--ink-dim)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")} · {c.cat.toUpperCase()} · {c.years}
                  </span>
                  <p
                    className="font-display mt-3"
                    style={{
                      fontSize: 28,
                      letterSpacing: "-0.02em",
                      color: "var(--ink-yellow)",
                      lineHeight: 1.1,
                    }}
                  >
                    {c.client}
                  </p>
                  <p
                    className="font-display mt-5"
                    style={{
                      fontSize: 56,
                      letterSpacing: "-0.025em",
                      color: "var(--ink-yellow)",
                      lineHeight: 0.95,
                    }}
                  >
                    {c.kpi}
                  </p>
                  <p
                    className="mt-2"
                    style={{
                      color: "var(--ink-cream)",
                      fontSize: 13,
                      fontWeight: 510,
                    }}
                  >
                    {c.kpiLabel}
                  </p>
                </div>
                <div className="md:col-span-8">
                  <p
                    className="font-display"
                    style={{
                      fontSize: 28,
                      letterSpacing: "-0.02em",
                      color: "var(--ink-yellow)",
                      lineHeight: 1.15,
                    }}
                  >
                    {c.headline}
                  </p>
                  <p
                    className="mt-4 max-w-[640px]"
                    style={{
                      color: "var(--ink-muted)",
                      fontSize: 15,
                      lineHeight: "24px",
                    }}
                  >
                    {c.body}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {c.deliverables.map((d) => (
                      <li
                        key={d}
                        className="chip"
                        style={{ background: "var(--bg-elevated)" }}
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/work/${c.slug}`}
                    className="inline-flex items-center gap-2 mt-7 group"
                    style={{ color: "var(--ink-cream)", fontSize: 14, fontWeight: 510 }}
                  >
                    Case mit Vorher / Nachher lesen
                    <span aria-hidden className="group-hover:translate-x-1 transition-transform" style={{ color: "var(--ink-yellow)" }}>
                      →
                    </span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section chapter="02 Weiter" title="Vielleicht deins?" date="" tone="elevated">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[1000px]">
            Du hast ein gutes Geschäft —{" "}
            <em className="font-display italic">und eine Seite, die das nicht zeigt?</em>
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p
            className="mt-6 max-w-[640px] text-[17px] leading-[1.55]"
            style={{ color: "var(--ink-muted)" }}
          >
            Schauen wir uns deine Seite mal an — in 15 Sekunden, gratis, ohne Login. Du kriegst eine
            klare Einschätzung: was geht, was nicht, wo du gerade Anfragen verlierst.
          </p>
        </Reveal>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/audit" className="btn-primary">
            Kostenlosen Audit starten
            <span aria-hidden>→</span>
          </Link>
          <Link href="/anfrage" className="btn-secondary">
            Oder Brief schicken
          </Link>
        </div>
      </Section>
    </>
  );
}
