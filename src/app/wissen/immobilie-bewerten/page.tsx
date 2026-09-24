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
 * Wissensseite (R3 Welle 2, Cluster T) — /wissen/immobilie-bewerten.
 * Kompakter Wissens-Kopf beantwortet die Suchfrage wörtlich. Hauptteil:
 * vertikale Nummern-Liste der drei ImmoWertV-Verfahren (Vergleichswert,
 * Ertragswert, Sachwert) mit je einer vollständig durchgerechneten
 * Beispielrechnung, danach eine Vergleichs-Tabelle mit den Ergebnissen
 * dieser drei Beispiele (tnum). GelbeKarte als Pointe, Beweis-Anriss über
 * den RIEGEL-Case (eigener Bewertungsrechner, belegte Zahlen), FAQ +
 * FAQPage-JSON-LD. Foto 11 laut R3-SEITENPLAN.json.
 * R11: alle Fließtexte laufen über Studio-Keys src/lib/texte/seiten/
 * wissen-immobilie-bewerten.ts.
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "wissen-immobilie-bewerten");
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

export default async function ImmobilieBewertenPage() {
  const t = seitenTexte(await getContent(), "wissen-immobilie-bewerten");
  const verfahren = t.liste("verfahren", ["titel", "text"] as const);
  const vergleich = t.liste("vergleichstabelle", ["verfahren", "fall", "ergebnis"] as const);
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
            <h1 className="t-display mt-4">{rich(t("kopf.titel"))}</h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              {t("kopf.text_vor")}{" "}
              <Highlight>{t("kopf.text_mark")}</Highlight>
              {t("kopf.text_nach")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta label={t("cta.label")} />
              <span className="t-small w-full sm:w-auto">{t("kopf.hinweis")}</span>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 max-w-[1200px] px-6 lg:px-10">
          <Reveal delay={80}>
            <div className="relative aspect-[21/9] overflow-hidden rounded-[28px]">
              <Image
                src={maklerAsset(11)}
                alt="Person prüft Unterlagen und eine Wertermittlung am Tisch, Grundriss und Zahlen im Blick"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Die drei Verfahren — vertikale Nummern-Liste mit Rechenweg ──────── */}
      <section id="verfahren" className="bg-bg-elevated">
        <div className="mx-auto max-w-[880px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("verfahren.eyebrow")}
              titel={t("verfahren.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 divide-y divide-line-subtle border-t border-line-subtle">
            {verfahren.map((v, i) => (
              <Reveal key={v.titel} delay={i * 60}>
                <div className="grid gap-3 py-10 sm:grid-cols-[88px_1fr] sm:gap-8">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <p className="t-h3">{v.titel}</p>
                    <p className="t-body mt-3">{v.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vergleichs-Tabelle — die drei Beispiel-Ergebnisse nebeneinander ── */}
      <section id="vergleich" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("vergleichstabelle.eyebrow")}
              titel={t("vergleichstabelle.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line-medium">
                  <th className="py-3 pr-4 t-label !text-[10.5px]">{t("vergleichstabelle.spalte_verfahren")}</th>
                  <th className="py-3 pr-4 t-label !text-[10.5px]">{t("vergleichstabelle.spalte_fall")}</th>
                  <th className="py-3 t-label !text-[10.5px]">{t("vergleichstabelle.spalte_ergebnis")}</th>
                </tr>
              </thead>
              <tbody>
                {vergleich.map((z) => (
                  <tr key={z.verfahren} className="border-b border-line-subtle align-top">
                    <td className="py-4 pr-4 t-body max-w-[13rem] !text-ink-cream font-medium">
                      {z.verfahren}
                    </td>
                    <td className="py-4 pr-4 t-body max-w-[20rem]">{z.fall}</td>
                    <td className="py-4 font-mono text-[14px] text-ink-cream tnum">{z.ergebnis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Reveal delay={100}>
            <p className="t-small mt-6 max-w-[640px] !text-ink-dim">{t("vergleichstabelle.hinweis")}</p>
          </Reveal>
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

      {/* ── Beweis-Anriss — RIEGEL-Case, eigener Bewertungsrechner ──────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[52ch]">{t("beweis.text")}</p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ — 4 Fragen, FaqAccordion + JSON-LD oben im Head ─────────────── */}
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

      {/* ── Finale — CTA, Textlinks zu Hub + Spec-Links ─────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">{t("finale.label")}</p>
            <h2 className="t-h2 mt-4">{rich(t("finale.titel"))}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              {t("finale.text_vor")}{" "}
              <Link href="/tools/verkaufspreisrechner" className="ref-link">
                {t("finale.link_rechner")}
              </Link>{" "}
              {t("finale.text_mid1")}{" "}
              <Link href="/ki-immobilienbewertung" className="ref-link">
                {t("finale.link_ki")}
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
