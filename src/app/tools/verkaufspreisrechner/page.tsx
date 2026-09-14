import type { Metadata } from "next";
import Link from "next/link";

import { rich } from "@/components/RichText";
import { GelbeKarte, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ConsentProvider } from "@/components/bewertung/consent";
import { Calculator } from "@/components/bewertung/calculator";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";

/**
 * LEAF P2 — /tools/verkaufspreisrechner, jetzt mit dem portierten
 * Verkaufspreis-Wizard (Objektart → Standort → Eckdaten → Analyse →
 * Ergebnis, s. components/bewertung/calculator.tsx). Der Wizard ist above
 * the fold der Held der Seite; das Ergebnis steht sofort da, der optionale
 * PDF-Report kommt danach, ohne Lead-Gate davor. "kostenlos" ist unter
 * /tools/* ausdrücklich erlaubt.
 *
 * ConsentProvider umschließt nur diese Seite (nicht global im Layout) —
 * der Satelliten-Kartenblick im Wizard ist die einzige Stelle der Seite,
 * die externe Kartenkacheln lädt.
 */

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "tools-verkaufspreisrechner");
  return {
    title: t("meta.titel"),
    description: t("meta.beschreibung"),
    alternates: { canonical: "/tools/verkaufspreisrechner" },
    openGraph: {
      title: t("meta.titel"),
      description: t("meta.beschreibung"),
      type: "website",
      locale: "de_DE",
    },
  };
}

export default async function VerkaufspreisrechnerPage() {
  const c = await getContent();
  const t = seitenTexte(c, "tools-verkaufspreisrechner");
  const verfahren = t.liste("verfahren", ["titel", "text"] as const);
  const faqs = t.liste("faq", ["frage", "antwort"] as const);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.frage,
      acceptedAnswer: { "@type": "Answer", text: f.antwort },
    })),
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ── Hero kompakt — der Wizard ist der Held, above the fold ────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 pb-8 pt-28 lg:px-10 lg:pb-10 lg:pt-32">
          <p className="t-label !text-ink-yellow">{t("hero.eyebrow")}</p>
          <h1 className="mt-4 max-w-[760px] font-display text-[clamp(30px,4vw,46px)] font-bold leading-[1.08] tracking-[-0.025em] text-ink-cream [text-wrap:balance]">
            {rich(t("hero.titel"))}
          </h1>
          <p className="t-body-lg mt-4 max-w-[620px]">{t("hero.sub")}</p>
        </div>
      </section>

      {/* ── Rechner ──────────────────────────────────────────────────── */}
      <section id="rechner" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 pb-20 lg:px-10 lg:pb-28">
          <ConsentProvider>
            <Calculator />
          </ConsentProvider>
        </div>
      </section>

      {/* ── Methode — 3 Verfahren kurz ───────────────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("methode.eyebrow")}
              titel={t("methode.titel")}
              sub={t("methode.sub")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {verfahren.map((v, i) => (
              <Reveal key={v.titel} delay={i * 60}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">{String(i + 1).padStart(2, "0")}</p>
                  <p className="t-h3 mt-4">{v.titel}</p>
                  <p className="t-body mt-3">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={180}>
            <p className="t-body mt-10 max-w-[640px]">
              {t("methode.quelle_vor")}{" "}
              <Link href="/wissen/immobilie-bewerten" className="ref-link">
                {t("methode.quelle_link")}
              </Link>
              {t("methode.quelle_nach")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-bg-base">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf eyebrow={t("faq.eyebrow")} titel={t("faq.titel")} ausrichtung="mitte" />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={faqs.map((f) => ({ q: f.frage, a: f.antwort }))} />
          </div>
        </div>
      </section>

      {/* ── Makler-Sektion — dezent, kein Hard-Sell ─────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label={t("pitch.label")} titel={t("pitch.titel")} glyph>
              {t("pitch.text_vor")}{" "}
              <Link href="/anfrage" className="font-semibold text-ink-cream underline decoration-ink-cream/30 underline-offset-4">
                {t("pitch.link")}
              </Link>
            </GelbeKarte>
          </Reveal>
        </div>
      </section>
    </>
  );
}
