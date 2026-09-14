import type { Metadata } from "next";
import Link from "next/link";

import { rich } from "@/components/RichText";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { AfaWizard } from "@/components/bewertung/afa-wizard";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";

/**
 * LEAF P4 — /tools/afa-rechner, jetzt mit dem portierten AfA-Wizard
 * (Objekt & Kauf → Modernisierung → Steuer → Analyse → Ergebnis, s.
 * components/bewertung/afa-wizard.tsx). Anspruch: besser als
 * nutzungsdauer.com und immoabschreibung.de — beide zeigen das Ergebnis
 * erst nach der Lead-Wall, dieser Rechner sofort, inklusive PDF-Download
 * ohne Namens-/E-Mail-Pflicht. Kompakter Kopf statt 70vh-Hero, der Wizard
 * ist der Blickfang direkt darunter. "kostenlos" ist unter /tools/*
 * ausdrücklich erlaubt (Vertrag).
 */

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "tools-afa-rechner");
  return {
    title: t("meta.titel"),
    description: t("meta.beschreibung"),
    alternates: { canonical: "/tools/afa-rechner" },
    openGraph: {
      title: t("meta.titel"),
      description: t("meta.beschreibung"),
      type: "website",
      locale: "de_DE",
    },
  };
}

export default async function AfaRechnerPage() {
  const c = await getContent();
  const t = seitenTexte(c, "tools-afa-rechner");
  const mechanik = t.liste("mechanik", ["titel", "text"] as const);
  const wer = t.liste("wer", ["text"] as const);
  const gutachter = t.liste("gutachter", ["text"] as const);
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

      {/* ── Hero kompakt — Tool ist der Held, above the fold ────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 pb-8 pt-28 lg:px-10 lg:pb-10 lg:pt-32">
          <p className="t-label !text-ink-yellow">{t("hero.eyebrow")}</p>
          <h1 className="mt-4 max-w-[780px] font-display text-[clamp(30px,4vw,46px)] font-bold leading-[1.08] tracking-[-0.025em] text-ink-cream [text-wrap:balance]">
            {rich(t("hero.titel"))}
          </h1>
          <p className="t-body-lg mt-4 max-w-[640px]">
            {t("hero.sub_vor")}{" "}
            <Highlight>{t("hero.sub_highlight")}</Highlight>
            {t("hero.sub_nach")}
          </p>
        </div>
      </section>

      {/* ── Rechner ──────────────────────────────────────────────────── */}
      <section id="rechner" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 pb-20 lg:px-10 lg:pb-28">
          <AfaWizard />
        </div>
      </section>

      {/* ── Mechanik — wie ein Gutachten die AfA erhöht ─────────────────── */}
      <section id="mechanik" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("mechanik.eyebrow")}
              titel={t("mechanik.titel")}
              sub={t("mechanik.sub")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-10 border-t border-line-subtle pt-10 md:grid-cols-3">
            {mechanik.map((punkt, i) => (
              <Reveal key={punkt.titel} delay={i * 60}>
                <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="t-h3 mt-4">{punkt.titel}</p>
                <p className="t-body mt-3">{punkt.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-16 grid gap-10 md:grid-cols-2">
              <div>
                <p className="t-h3">{t("mechanik.wer_titel")}</p>
                <ul className="mt-4 space-y-3">
                  {wer.map((punkt) => (
                    <li key={punkt.text} className="t-body flex gap-3">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-akzent" />
                      <span>{punkt.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="t-h3">{t("mechanik.gutachter_titel")}</p>
                <ul className="mt-4 space-y-3">
                  {gutachter.map((punkt) => (
                    <li key={punkt.text} className="t-body flex gap-3">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-akzent" />
                      <span>{punkt.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <p className="t-body mt-12 max-w-[720px]">
              {t("mechanik.quelle_vor1")}{" "}
              <Link href="/wissen/restnutzungsdauer-gutachten" className="ref-link">
                {t("mechanik.quelle_link1")}
              </Link>
              {t("mechanik.quelle_vor2")}{" "}
              <Link href="/wissen/afa-immobilien" className="ref-link">
                {t("mechanik.quelle_link2")}
              </Link>
              {t("mechanik.quelle_nach")}
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
