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
 * Wissensseite (R3 Welle 2, Cluster W) — /eigentuemer-leads-generieren.
 * Kompakter Wissens-Kopf beantwortet die Suchfrage wörtlich, danach eine
 * Vergleichs-Tabelle (eigene Quelle vs. gemieteter Portal-Kontakt) und ein
 * Zweispalter zur 5%-Kette, gespeist aus den Studio-Werten mk.pm.* (siehe
 * PerformanceStory/StartOben) statt neu erfundener Zahlen. GelbeKarte,
 * textlicher Beweis-Anriss (Riegel), FAQ + FAQPage-JSON-LD. Foto 4 laut
 * R3-SEITENPLAN.json.
 *
 * R11: alle Seitentexte laufen über Studio-Keys, siehe
 * src/lib/texte/seiten/eigentuemer-leads-generieren.ts. Die mk.pm.*-Werte
 * (Quote, Mandate, Provision) bleiben eigenständige Studio-Keys aus
 * content.ts, unverändert.
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "eigentuemer-leads-generieren");
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

export default async function EigentuemerLeadsGenerierenPage() {
  const c = await getContent();
  const t = seitenTexte(c, "eigentuemer-leads-generieren");
  const quote = c["mk.pm.quote"] ?? "5 %";
  const mandate = c["mk.pm.mandate"] ?? "5";
  const provision = c["mk.pm.provision"] ?? "31.285 €";
  const vergleich = t.liste("vergleich", ["merkmal", "eigen", "portal"] as const);
  const kette = t.liste("kette", ["anteil", "label", "text"] as const);
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
                src={maklerAsset(4)}
                alt="Eigentümer gibt eine Adresse in den Bewertungsrechner ein"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Vergleichs-Tabelle — eigene Quelle vs. gemieteter Kontakt ───────── */}
      <section id="vergleich" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("vergleich.eyebrow")}
              titel={t("vergleich.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-subtle">
                    <th className="t-label py-3 pr-6 font-semibold">{t("vergleich.spalte_merkmal")}</th>
                    <th className="t-label py-3 pr-6 font-semibold !text-ink-cream">
                      {t("vergleich.spalte_eigen")}
                    </th>
                    <th className="t-label py-3 font-semibold">{t("vergleich.spalte_portal")}</th>
                  </tr>
                </thead>
                <tbody>
                  {vergleich.map((row) => (
                    <tr key={row.merkmal} className="border-b border-line-subtle">
                      <td className="t-data py-4 pr-6 !text-ink-cream">{row.merkmal}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.eigen}</td>
                      <td className="t-body py-4 tnum">{row.portal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Zweispalter — die 5%-Kette, gespeist aus mk.pm.* ────────────────── */}
      <section id="kette" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("kette.eyebrow")}
              titel={t("kette.titel")}
              sub={t("kette.sub")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div className="divide-y divide-line-subtle border-t border-line-subtle">
              {kette.map((stufe, i) => (
                <Reveal key={stufe.label} delay={i * 60}>
                  <div className="flex items-baseline justify-between gap-6 py-6">
                    <div>
                      <p className="t-h3">{stufe.label}</p>
                      <p className="t-body mt-2 max-w-[42ch]">{stufe.text}</p>
                    </div>
                    <p className="font-display shrink-0 text-[26px] font-bold tracking-[-0.01em] text-ink-yellow tnum">
                      {stufe.anteil}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <div className="rounded-[28px] border border-line-subtle bg-bg-elevated p-8">
                <p className="t-label">{t("kette.karte_label")}</p>
                <p className="mt-4 font-display text-[44px] font-bold leading-none tracking-[-0.02em] text-ink-cream tnum">
                  {quote}
                </p>
                <p className="t-body mt-2">
                  {t("kette.karte_text")}
                </p>
                <div className="mt-8 border-t border-line-subtle pt-6">
                  <p className="t-data !text-ink-cream tnum">
                    {mandate} {t("kette.mandate_suffix")}
                  </p>
                  <p className="t-small mt-1">
                    {t("kette.karte_footnote_vor")} {provision} {t("kette.karte_footnote_nach")} {/* studio:ok — Key-Name, kein Fließtext */}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label={t("unterschied.label")} titel={t("unterschied.titel")} glyph>
              {t("unterschied.text")}
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Riegel-Rechner als lebendes Beispiel ────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              {t("beweis.text")}
            </p>
            <Link href="/cases/riegel-immobilien" className="ref-link mt-6 inline-block">
              {t("beweis.link")}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
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
            <FaqAccordion items={faqs.map((f) => ({ q: f.frage, a: f.antwort }))} />
          </div>
        </div>
      </section>

      {/* ── Finale — CTA + Textlinks zu Hub und Spec-Links ──────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">{t("finale.label")}</p>
            <h2 className="t-h2 mt-4">{rich(t("finale.titel"))}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              {t("finale.satz_1")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.link_1")}
              </Link>
              {t("finale.satz_2")}{" "}
              <Link href="/leadgenerierung-immobilienmakler" className="ref-link">
                {t("finale.link_2")}
              </Link>
              {t("finale.satz_3")}{" "}
              <Link href="/tools/verkaufspreisrechner" className="ref-link">
                {t("finale.link_3")}
              </Link>{" "}
              {t("finale.satz_4")}{" "}
              <Link href="/performance-marketing-makler" className="ref-link">
                {t("finale.link_4")}
              </Link>
              {t("finale.satz_5")}
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
