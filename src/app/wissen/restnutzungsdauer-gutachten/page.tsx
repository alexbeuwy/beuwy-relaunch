import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
 * Wissensseite (R3 Welle 2, Cluster T) — /wissen/restnutzungsdauer-gutachten.
 * Kompakter Wissens-Kopf beantwortet die Suchfrage wörtlich, inklusive
 * BFH-Kontext. Hauptteil: vier PainRows gegen gängige Fehlannahmen, ein
 * Zweispalter mit der Mechanik (kürzere RND → höherer Satz) plus
 * vollständigem Rechenbeispiel, danach eine Häkchen-Checkliste seriöser
 * Gutachter-Kriterien. GelbeKarte als Pointe, Beweis-Anriss über die
 * Transparenz des eigenen AfA-Rechners (keine Steuerberatung), FAQ +
 * FAQPage-JSON-LD. Foto 14 (hochkant) laut R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "wissen-restnutzungsdauer-gutachten");
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

function Haken() {
  return (
    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-akzent" aria-hidden>
      <svg width="11" height="9" viewBox="0 0 12 10" fill="none">
        <path
          d="M1 5.2 4.4 8.6 11 1.4"
          stroke="#161613"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default async function RestnutzungsdauerGutachtenPage() {
  const c = await getContent();
  const t = seitenTexte(c, "wissen-restnutzungsdauer-gutachten");
  const einwaende = t.liste("einwaende", ["quote", "answer"] as const);
  const kriterien = t.liste("kriterien", ["text"] as const);
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
                src={maklerAsset(14)}
                alt="Sachverständiger begutachtet die Bausubstanz eines älteren Gebäudes vor Ort"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 22%" }}
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Vier Einwände — PainRows gegen gängige Fehlannahmen ─────────────── */}
      <section id="einwaende" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("einwaende.eyebrow")}
              titel={t("einwaende.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[780px]">
            <PainRows items={einwaende} />
          </div>
        </div>
      </section>

      {/* ── Zweispalter — Mechanik, mit vollständigem Rechenbeispiel ────────── */}
      <section id="mechanik" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("mechanik.eyebrow")}
              titel={t("mechanik.titel")}
              className="max-w-[760px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-10 border-t border-line-subtle pt-10 md:grid-cols-2 md:gap-16">
            <Reveal>
              <p className="t-h3">{t("mechanik.saetze_titel")}</p>
              <p className="t-body mt-3">{t("mechanik.saetze_text")}</p>
            </Reveal>
            <Reveal delay={80}>
              <p className="t-h3">{t("mechanik.beispiel_titel")}</p>
              <p className="t-body mt-3">{t("mechanik.beispiel_text")}</p>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="t-small mt-10 max-w-[720px] !text-ink-dim">{t("mechanik.hinweis")}</p>
          </Reveal>
        </div>
      </section>

      {/* ── Checkliste — seriöse Gutachter-Kriterien ─────────────────────────── */}
      <section id="kriterien" className="bg-bg-elevated">
        <div className="mx-auto max-w-[880px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("kriterien.eyebrow")}
              titel={t("kriterien.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-10 max-w-[680px] space-y-4">
            {kriterien.map((k, i) => (
              <Reveal key={k.text} delay={i * 50}>
                <div className="flex items-start gap-3">
                  <Haken />
                  <p className="t-body pt-0.5">{k.text}</p>
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

      {/* ── Beweis-Anriss — Transparenz des eigenen AfA-Rechners ────────────── */}
      <section id="beweis" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[52ch]">{t("beweis.text")}</p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ — 4 Fragen, FaqAccordion + JSON-LD oben im Head ─────────────── */}
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
        </div>
      </section>

      {/* ── Finale — CTA, Textlinks zu Hub + Spec-Links ─────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">{t("finale.label")}</p>
            <h2 className="t-h2 mt-4">{rich(t("finale.titel"))}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              {t("finale.text_vor")}{" "}
              <Link href="/tools/afa-rechner" className="ref-link">
                {t("finale.link_rechner")}
              </Link>{" "}
              {t("finale.text_mitte")}{" "}
              <Link href="/wissen/afa-immobilien" className="ref-link">
                {t("finale.link_afa")}
              </Link>
              {t("finale.text_mitte2")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.link_hub")}
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
