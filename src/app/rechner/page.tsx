import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";
import { RevenueCalculator } from "@/components/RevenueCalculator";
import { HeadlineCheck } from "@/components/HeadlineCheck";

export const metadata: Metadata = {
  title: "Was kostet dich deine Seite? — Rechner",
  description:
    "Drei Zahlen von dir, und du siehst, was eine Website, die nicht verkauft, dich jeden Monat kostet — und wann sich eine neue rechnet. Plus 5-Sekunden-Test für deine wichtigste Zeile.",
  alternates: { canonical: "/rechner" },
  openGraph: {
    title: "Was kostet dich deine Seite — jeden Monat?",
    description:
      "Rechne aus, was dich eine Seite kostet, die nicht verkauft. Und teste, ob ein Fremder in 5 Sekunden versteht, was du tust.",
    type: "website",
    url: "https://beuwy.com/rechner",
  },
  twitter: { card: "summary_large_image" },
};

export default function RechnerPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "beuwy", href: "/" }, { name: "Rechner", href: "/rechner" }])} />

      {/* ---- Tool 1: Umsatz-Leck-Rechner ---- */}
      <section className="section-band section-band-base pt-[140px] md:pt-[180px] pb-[48px]">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <span className="eyebrow"><span className="num">/</span> Rechner · 30 Sek</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="h-display-xl mt-6 max-w-[1000px]">
              Deine Seite kostet nicht <em>8.900 €</em>.
              <br />
              Sie kostet dich <em className="gradient-text">jeden Monat</em>.
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p
              className="mt-5 max-w-[640px] text-[16px] md:text-[17px] leading-[1.5]"
              style={{ color: "var(--ink-muted)", letterSpacing: "-0.011em" }}
            >
              Drei Zahlen von dir. Du siehst, was eine Website, die nicht verkauft, dich kostet —
              und wann sich eine neue rechnet. Zieh an den Reglern.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10">
              <RevenueCalculator />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Tool 2: 5-Sekunden-Test ---- */}
      <section className="section-band section-band-raised py-[64px] md:py-[96px]">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <span className="eyebrow"><span className="num">/</span> 5-Sekunden-Test</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="h-display-md mt-6 max-w-[900px]">
              Versteht ein Fremder in <em>5 Sekunden</em>, was du tust?
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p
              className="mt-5 max-w-[640px] text-[16px] md:text-[17px] leading-[1.5]"
              style={{ color: "var(--ink-muted)", letterSpacing: "-0.011em" }}
            >
              Die erste Zeile deiner Seite entscheidet, ob jemand bleibt. Tipp sie rein —
              du siehst sofort, wo sie dich Anfragen kostet.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10">
              <HeadlineCheck />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Close ---- */}
      <section className="section-band section-band-base py-[64px] md:py-[88px]">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <h2 className="h-display-md max-w-[820px]">
              Die klare Seite, die das einsammelt — <em className="gradient-text">in 10 Werktagen</em>.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/audit" className="btn-primary">Kostenlosen Audit starten <span aria-hidden>→</span></Link>
              <Link href="/system" className="btn-secondary">Das Angebot ansehen</Link>
              <span style={{ color: "var(--ink-dim)", fontSize: 13 }}>
                8.900 € · Tag 10 oder Geld zurück · 2 Plätze frei Q3/2026
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
