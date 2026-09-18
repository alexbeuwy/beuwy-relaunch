import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RiBuilding2Line, RiFlashlightLine, RiFlowChart, RiMegaphoneLine } from "@remixicon/react";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { PainRows } from "@/components/PainRows";
import { FaqAccordion } from "@/components/FaqAccordion";

/**
 * Wissensseite (R3 Welle 2, Cluster V) — /mcmakler-modell. Kompakter
 * Wissens-Kopf beantwortet die Suchfrage wörtlich. Hauptteil in drei
 * Schritten: (1) was Hybridmakler wie McMakler strukturell richtig machen
 * (Icon-Reihe), (2) wo der Prozess endet (PainRows, sachlich, keine
 * Herabsetzung), (3) vier Hebel regionaler Dominanz als Konter (Rail wie
 * in seo-fuer-immobilienmakler). GelbeKarte, Beweis-Anriss (Riegel: Platz
 * 21 von über 25.000 Maklern), FAQ + FAQPage-JSON-LD, Marken-Fußnote vor
 * dem Finale. Foto 8 laut R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "mcmakler-modell");
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

/* Icons der vier Stärken — Reihenfolge folgt der Studio-Liste "staerken". */
const STAERKEN_ICONS = [RiFlowChart, RiMegaphoneLine, RiFlashlightLine, RiBuilding2Line] as const;

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

export default async function McmaklerModellPage() {
  const c = await getContent();
  const t = seitenTexte(c, "mcmakler-modell");
  const staerken = t.liste("staerken", ["label", "satz"] as const);
  const grenzen = t.liste("grenzen", ["quote", "answer"] as const);
  const hebel = t.liste("hebel", ["titel", "text"] as const);
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

      {/* ── Wissens-Kopf — kompakt, Antwort direkt darunter ─────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[880px] px-6 pb-4 pt-32 lg:px-10 lg:pt-36">
          <Reveal>
            <p className="t-label !text-ink-yellow">{t("kopf.eyebrow")}</p>
            <h1 className="t-display mt-4">
              {rich(t("kopf.titel"))}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              {t("kopf.text_vor")}{" "}
              <Highlight>{t("kopf.text_hervor")}</Highlight>
              {t("kopf.text_nach")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta label={t("kopf.cta")} />
              <span className="t-small w-full sm:w-auto">{t("kopf.cta_note")}</span>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 max-w-[1200px] px-6 lg:px-10">
          <Reveal delay={80}>
            <div className="relative aspect-[21/9] overflow-hidden rounded-[28px]">
              <Image
                src={maklerAsset(8)}
                alt="Makler bespricht eine Objektstrategie am Tisch, Stadtplan der Region im Hintergrund"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Was Hybridmakler richtig machen — Icon-Reihe ────────────────────── */}
      <section id="staerken" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("staerken.eyebrow")}
              titel={t("staerken.titel")}
              sub={t("staerken.sub")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 border-t border-line-subtle">
            {staerken.map((s, i) => {
              const Icon = STAERKEN_ICONS[i];
              return (
                <Reveal key={s.label} delay={i * 50}>
                  <div className="grid gap-4 border-b border-line-subtle py-9 sm:grid-cols-[240px_1fr] sm:items-start sm:gap-10 lg:grid-cols-[280px_1fr]">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-akzent-wash text-ink-yellow">
                        <Icon aria-hidden className="size-[18px]" />
                      </span>
                      <p className="t-label !text-ink-dim">{s.label}</p>
                    </div>
                    <p className="font-display text-[20px] font-medium leading-[1.35] tracking-[-0.012em] text-ink-cream sm:text-[22px]">
                      {s.satz}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Wo der Prozess endet — PainRows, sachlich ────────────────────────── */}
      <section id="grenzen" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("grenzen.eyebrow")}
              titel={t("grenzen.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={grenzen} />
          </div>
        </div>
      </section>

      {/* ── Vier Hebel regionaler Dominanz — Rail-Layout ─────────────────────── */}
      <section id="hebel" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("hebel.eyebrow")}
              titel={t("hebel.titel")}
              sub={t("hebel.sub")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {hebel.map((h, i) => (
              <Reveal key={h.titel} delay={i * 60}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="t-h3 mt-4">{h.titel}</p>
                  <p className="t-body mt-3">{h.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label={t("unterschied.label")} titel={t("unterschied.titel")} glyph>
              {t("unterschied.text")}
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Riegel, Platz 21 von über 25.000 Maklern ────────── */}
      <section id="beweis" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[52ch]">{t("beweis.text")}</p>
            <Link href="/cases/riegel-immobilien" className="ref-link mt-6 inline-block">
              {t("beweis.link")}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-bg-base">
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
          <p className="t-small mx-auto mt-10 max-w-[62ch] text-center">{t("faq.disclaimer")}</p>
        </div>
      </section>

      {/* ── Finale — CTA + Textlinks zu Hub und Spec-Links ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">{t("finale.label")}</p>
            <h2 className="t-h2 mt-4">{rich(t("finale.titel"))}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[56ch]">
              {t("finale.text_vor")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.link_hub")}
              </Link>
              {t("finale.text_mitte")}{" "}
              <Link href="/makler-in-kleinstadt" className="ref-link">
                {t("finale.link_kleinstadt")}
              </Link>
              {t("finale.text_mitte2")}{" "}
              <Link href="/markenaufbau-makler" className="ref-link">
                {t("finale.link_marke")}
              </Link>
              {t("finale.text_nach")}
            </p>
            <div className="mt-9 flex justify-center">
              <ZusammenarbeitCta label={t("finale.cta")} />
            </div>
            <p className="t-small mt-4">{t("finale.cta_note")}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
