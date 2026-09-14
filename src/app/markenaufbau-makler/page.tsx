import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";
import { GelbeKarte, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CaseGrid } from "@/components/CaseGrid";
import { caseBySlug } from "@/lib/cases";

/**
 * W-Cluster — /markenaufbau-makler (R3-SEITENPLAN.json). Antwort auf
 * "Wie baue ich als Makler eine Marke auf?" direkt im Kopf. Hauptbaustein:
 * eine Nummern-Liste der fünf Markenbausteine, gerahmt von einem
 * Zweispalter Visitenkarte/Instanz und einer GelbeKarte mit der
 * Formel "Wiedererkennung × Beweis". Beweis: Königswege (60→2.300+
 * Partner, Top 10 der deutschen Finanzvertriebe), exakt wie im Angle der
 * Spec verlangt. Kompakter Wissens-Kopf statt 70vh-Hero, Foto 10.
 * R11: alle Fließtexte laufen über Studio-Keys src/lib/texte/seiten/
 * markenaufbau-makler.ts.
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "markenaufbau-makler");
  return {
    title: t("meta.titel"),
    description: t("meta.beschreibung"),
    openGraph: {
      title: t("meta.og_titel"),
      description: t("meta.og_beschreibung"),
      type: "website",
      locale: "de_DE",
    },
  };
}

function PfeilRechts({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className} aria-hidden>
      <path
        d="M1 7h11M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ZusammenarbeitCta({ label, className = "" }: { label: string; className?: string }) {
  return (
    <Link
      href="/anfrage"
      className={`group inline-flex items-center gap-2.5 rounded-full bg-akzent px-7 py-3.5 text-[15px] font-semibold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover ${className}`}
    >
      {label}
      <PfeilRechts className="transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:translate-x-0.5" />
    </Link>
  );
}

export default async function MarkenaufbauMaklerPage() {
  const t = seitenTexte(await getContent(), "markenaufbau-makler");
  const koenigswege = caseBySlug("koenigswege");
  const bausteine = t.liste("bausteine", ["titel", "text"] as const);
  const faqs = t.liste("faq", ["q", "a"] as const);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── Kompakter Wissens-Kopf ───────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[860px] px-6 pb-12 pt-32 md:pt-40 lg:px-10">
          <p className="t-label !text-ink-yellow">{t("kopf.eyebrow")}</p>
          <h1 className="t-display mt-5 max-w-[22ch]">{rich(t("kopf.titel"))}</h1>
          <p className="t-body-lg mt-6 max-w-[62ch]">{t("kopf.text")}</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <ZusammenarbeitCta label={t("cta.label")} />
            <span className="t-small w-full sm:w-auto">{t("kopf.hinweis")}</span>
          </div>
        </div>
      </section>

      {/* ── Foto-Band ────────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[28px]">
            <Image
              src={maklerAsset(10)}
              alt="Team stimmt Typografie und Bildsprache eines Markenauftritts ab"
              fill
              sizes="(min-width: 1024px) 1120px, 100vw"
              className="object-cover"
            />
            <AiPille />
          </div>
        </div>
      </section>

      {/* ── Fünf Bausteine — Nummern-Liste ───────────────────────────── */}
      <section id="bausteine" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("bausteine.eyebrow")}
              titel={t("bausteine.titel")}
              sub={t("bausteine.sub")}
              className="max-w-[760px]"
            />
          </Reveal>
          <div className="mt-12 divide-y divide-line-subtle border-t border-line-subtle">
            {bausteine.map((b, i) => (
              <Reveal key={b.titel} delay={i * 60}>
                <div className="grid gap-3 py-7 md:grid-cols-[3rem_14rem_1fr] md:items-baseline md:gap-10">
                  <span className="font-display text-[22px] font-bold text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="t-h3">{b.titel}</p>
                  <p className="t-body">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visitenkarte vs. Instanz — Zweispalter ──────────────────── */}
      <section id="unterschied" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("vergleich.eyebrow")}
              titel={t("vergleich.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-10 border-t border-line-subtle pt-10 md:grid-cols-2 md:gap-16">
            <Reveal>
              <p className="t-label">{t("vergleich.links_label")}</p>
              <p className="t-h3 mt-3">{t("vergleich.links_titel")}</p>
              <p className="t-body mt-3">{t("vergleich.links_text")}</p>
            </Reveal>
            <Reveal delay={80}>
              <p className="t-label">{t("vergleich.rechts_label")}</p>
              <p className="t-h3 mt-3">{t("vergleich.rechts_titel")}</p>
              <p className="t-body mt-3">{t("vergleich.rechts_text")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als Pointe ─────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label={t("formel.label")} titel={t("formel.titel")} glyph>
              {t("formel.text")}
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Königswege 60 → 2.300+ ──────────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[46ch]">{t("beweis.text")}</p>
          </Reveal>
          {koenigswege ? (
            <div className="mt-10">
              <CaseGrid cases={[koenigswege]} />
            </div>
          ) : null}
          <Reveal delay={60}>
            <Link href="/cases" className="ref-link mt-8 inline-block">
              {t("beweis.link")}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-bg-elevated">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("faq.eyebrow")}
              titel={t("faq.titel")}
              ausrichtung="mitte"
            />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* ── Finale ───────────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">{t("finale.label")}</p>
            <h2 className="t-h2 mt-4">{rich(t("finale.titel"))}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              {t("finale.text_vor")}{" "}
              <Link href="/makler-positionierung" className="ref-link">
                {t("finale.link_positionierung")}
              </Link>
              {t("finale.text_mid1")}{" "}
              <Link href="/cases" className="ref-link">
                {t("finale.link_cases")}
              </Link>
              {t("finale.text_mid2")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.link_hub")}
              </Link>
              {t("finale.text_nach")}
            </p>
            <div className="mt-9 flex justify-center">
              <ZusammenarbeitCta label={t("cta.label")} />
            </div>
            <p className="t-small mt-4">{t("finale.hinweis")}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
