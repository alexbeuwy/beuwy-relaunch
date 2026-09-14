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
import { FaqAccordion } from "@/components/FaqAccordion";

/**
 * Wissensseite (R3 Welle 2, Cluster K) — /perplexity-immobiliensuche.
 * Kompakter Wissens-Kopf beantwortet die Suchfrage wörtlich: Ja, ein
 * wachsender Teil recherchiert über Assistenten statt über zehn blaue
 * Links. Hauptteil variiert bewusst gegen die Schwesterseite
 * /ai-overviews-immobilien: eine Damals/Heute-Vergleichstabelle zum
 * Recherche-Muster, eine Nummern-Liste zur Quellen-Logik der Assistenten,
 * ein Vorher/Nachher-Beispiel derselben Frage. GelbeKarte, Beweis-Anriss,
 * FAQ + FAQPage-JSON-LD. Foto 12 (Hochformat) laut R3-SEITENPLAN.json.
 *
 * R11: alle Texte laufen über Studio-Keys, siehe
 * src/lib/texte/seiten/perplexity-immobiliensuche.ts.
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "perplexity-immobiliensuche");
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

export default async function PerplexityImmobiliensuchePage() {
  const c = await getContent();
  const t = seitenTexte(c, "perplexity-immobiliensuche");
  const damalsHeute = t.liste("damals_heute", ["merkmal", "damals", "heute"] as const);
  const quellenLogik = t.liste("quellen_logik", ["titel", "text"] as const);
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── Wissens-Kopf — kompakt, Antwort direkt darunter ─────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[880px] px-6 pb-4 pt-32 lg:px-10 lg:pt-36">
          <Reveal>
            <p className="t-label !text-ink-yellow">{t("hero.eyebrow")}</p>
            <h1 className="t-display mt-4">
              {rich(t("hero.titel"))}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              {t("hero.sub_vor")}{" "}
              <Highlight>{t("hero.sub_highlight")}</Highlight>{" "}
              {t("hero.sub_nach")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta label={t("cta.label")} />
              <span className="t-small w-full sm:w-auto">{t("hero.cta_hinweis")}</span>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 max-w-[1200px] px-6 lg:px-10">
          <Reveal delay={80}>
            <div className="relative aspect-[21/9] overflow-hidden rounded-[28px]">
              <Image
                src={maklerAsset(12)}
                alt="Person tippt eine Frage in einen KI-Assistenten am Smartphone, während sie am Küchentisch sitzt"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover object-top"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Das Recherche-Muster — Damals/Heute-Vergleichstabelle ───────────── */}
      <section id="muster" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("muster.eyebrow")}
              titel={t("muster.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-subtle">
                    <th className="t-label py-3 pr-6 font-semibold">{t("muster.spalte_merkmal")}</th>
                    <th className="t-label py-3 pr-6 font-semibold">{t("muster.spalte_damals")}</th>
                    <th className="t-label py-3 font-semibold !text-ink-cream">{t("muster.spalte_heute")}</th>
                  </tr>
                </thead>
                <tbody>
                  {damalsHeute.map((row) => (
                    <tr key={row.merkmal} className="border-b border-line-subtle">
                      <td className="t-data py-4 pr-6 !text-ink-cream">{row.merkmal}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.damals}</td>
                      <td className="t-body py-4 tnum">{row.heute}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Quellen-Logik — Nummern-Liste ────────────────────────────────────── */}
      <section id="quellen-logik" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("quellen_logik.eyebrow")}
              titel={t("quellen_logik.titel")}
              sub={t("quellen_logik.sub")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-x-14 border-t border-line-subtle sm:grid-cols-2">
            {quellenLogik.map((q, i) => (
              <Reveal key={q.titel} delay={(i % 4) * 50}>
                <div className="border-b border-line-subtle py-7">
                  <div className="flex items-baseline gap-3">
                    <span className="t-data shrink-0 tnum">{String(i + 1).padStart(2, "0")}</span>
                    <p className="t-h3 !text-[17px]">{q.titel}</p>
                  </div>
                  <p className="t-body mt-2 pl-9">{q.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Beispiel — dieselbe Frage, mit und ohne Struktur ────────────────── */}
      <section id="beispiel" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("beispiel.eyebrow")}
              titel={t("beispiel.titel")}
              sub={t("beispiel.sub")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[24px] border border-line-subtle bg-bg-base p-7">
                <p className="t-label">{t("beispiel.ohne_label")}</p>
                <p className="t-body mt-4">
                  {t("beispiel.ohne_text")}
                </p>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className="h-full rounded-[24px] border-l-2 border-akzent bg-bg-base p-7">
                <p className="t-label">{t("beispiel.mit_label")}</p>
                <p className="t-body mt-4">
                  {t("beispiel.mit_text")}
                </p>
              </div>
            </Reveal>
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

      {/* ── Beweis-Anriss ────────────────────────────────────────────────────── */}
      <section id="beweis" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[46ch]">
              {rich(t("beweis.text"))}
            </p>
            <Link href="/geo-fuer-immobilienmakler" className="ref-link mt-6 inline-block">
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
            <FaqAccordion items={faqs.map((f) => ({ q: f.frage, a: f.antwort }))} />
          </div>
        </div>
      </section>

      {/* ── Finale — CTA + Textlinks zu Hub und Spec-Links ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">{t("finale.label")}</p>
            <h2 className="t-h2 mt-4">{rich(t("finale.titel"))}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[56ch]">
              {t("finale.satz_1")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.link_1")}
              </Link>
              {t("finale.satz_2")}{" "}
              <Link href="/geo-fuer-immobilienmakler" className="ref-link">
                {t("finale.link_2")}
              </Link>
              {t("finale.satz_3")}{" "}
              <Link href="/ai-overviews-immobilien" className="ref-link">
                {t("finale.link_3")}
              </Link>
              {t("finale.satz_4")}
            </p>
            <div className="mt-9 flex justify-center">
              <ZusammenarbeitCta label={t("cta.label")} />
            </div>
            <p className="t-small mt-4">{t("finale.cta_hinweis")}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
