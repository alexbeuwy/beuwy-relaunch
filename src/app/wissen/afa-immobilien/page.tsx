import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";

/**
 * Wissensseite (R3 Welle 2, Cluster T) — /wissen/afa-immobilien.
 * Kompakter Wissens-Kopf beantwortet die Suchfrage wörtlich. Hauptteil:
 * Vergleichs-Tabelle der drei gesetzlichen AfA-Sätze (2 %/2,5 %/3 %, tnum),
 * danach ein Zweispalter zu Gebäude- vs. Bodenanteil mit vollständigem
 * Rechenbeispiel inklusive Steuereffekt. GelbeKarte als Pointe,
 * Beweis-Anriss über die Vision-Group-Zahlen als Beleg für Zahlendisziplin
 * (kein Steuerberatungs-Anspruch), FAQ + FAQPage-JSON-LD. Klare
 * Steuerberatungs-Grenze mehrfach markiert. Foto 13 (hochkant) laut
 * R3-SEITENPLAN.json, per object-cover im 21:9-Band.
 *
 * R11: alle Texte laufen über Studio-Keys (src/lib/texte/seiten/wissen-afa-immobilien.ts).
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "wissen-afa-immobilien");
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

export default async function AfaImmobilienPage() {
  const c = await getContent();
  const t = seitenTexte(c, "wissen-afa-immobilien");
  const saetze = t.liste("saetze", ["baujahr", "satz", "grundlage", "beispiel"] as const);
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
            <p className="t-label !text-ink-yellow">{t("kopf.eyebrow")}</p>
            <h1 className="t-display mt-4">{rich(t("kopf.titel"))}</h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              {t("kopf.intro_vor")}{" "}
              <Highlight>{t("kopf.intro_highlight")}</Highlight>
              {t("kopf.intro_nach")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta label={t("kopf.cta_label")} />
              <span className="t-small w-full sm:w-auto">{t("kopf.cta_hinweis")}</span>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 max-w-[1200px] px-6 lg:px-10">
          <Reveal delay={80}>
            <div className="relative aspect-[21/9] overflow-hidden rounded-[28px]">
              <Image
                src={maklerAsset(13)}
                alt="Person rechnet Abschreibungswerte für eine vermietete Immobilie an einem Notebook durch"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 20%" }}
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Vergleichs-Tabelle — die drei gesetzlichen AfA-Sätze ────────────── */}
      <section id="saetze" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("saetze.eyebrow")}
              titel={t("saetze.titel")}
              sub={t("saetze.sub")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line-medium">
                  <th className="py-3 pr-4 t-label !text-[10.5px]">{t("saetze.head_baujahr")}</th>
                  <th className="py-3 pr-4 t-label !text-[10.5px]">{t("saetze.head_satz")}</th>
                  <th className="py-3 pr-4 t-label !text-[10.5px]">{t("saetze.head_grundlage")}</th>
                  <th className="py-3 t-label !text-[10.5px]">{t("saetze.head_beispiel")}</th>
                </tr>
              </thead>
              <tbody>
                {saetze.map((z) => (
                  <tr key={z.baujahr} className="border-b border-line-subtle align-top">
                    <td className="py-4 pr-4 t-body max-w-[9rem] !text-ink-cream font-medium">
                      {z.baujahr}
                    </td>
                    <td className="py-4 pr-4 font-mono text-[14px] text-ink-cream tnum">{z.satz}</td>
                    <td className="py-4 pr-4 t-body max-w-[18rem]">{z.grundlage}</td>
                    <td className="py-4 font-mono text-[14px] text-ink-cream tnum">
                      {z.beispiel}/Jahr
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Zweispalter — Gebäude- vs. Bodenanteil, mit Rechenweg ───────────── */}
      <section id="gebaeudeanteil" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf eyebrow={t("gebaeude.eyebrow")} titel={t("gebaeude.titel")} className="max-w-[760px]" />
          </Reveal>
          <div className="mt-12 grid gap-10 border-t border-line-subtle pt-10 md:grid-cols-2 md:gap-16">
            <Reveal>
              <p className="t-h3">{t("gebaeude.spalte1_titel")}</p>
              <p className="t-body mt-3">{t("gebaeude.spalte1_text")}</p>
            </Reveal>
            <Reveal delay={80}>
              <p className="t-h3">{t("gebaeude.spalte2_titel")}</p>
              <p className="t-body mt-3">{t("gebaeude.spalte2_text")}</p>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="t-small mt-10 max-w-[720px] !text-ink-dim">{t("gebaeude.hinweis")}</p>
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

      {/* ── Beweis-Anriss — Vision Group, Zahlendisziplin ohne Steuerbezug ──── */}
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
            <SektionsKopf eyebrow={t("faq.eyebrow")} titel={t("faq.titel")} ausrichtung="mitte" />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={faqs.map((f) => ({ q: f.frage, a: f.antwort }))} />
          </div>
        </div>
      </section>

      {/* ── Finale — CTA, Textlinks zu Hub + Spec-Links ─────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">{t("fazit.label")}</p>
            <h2 className="t-h2 mt-4">{rich(t("fazit.titel"))}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              {t("fazit.text_1")}{" "}
              <Link href="/tools/afa-rechner" className="ref-link">
                {t("fazit.link1")}
              </Link>{" "}
              {t("fazit.text_2")}{" "}
              <Link href="/wissen/restnutzungsdauer-gutachten" className="ref-link">
                {t("fazit.link2")}
              </Link>
              {t("fazit.text_3")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("fazit.link3")}
              </Link>
              {t("fazit.text_4")}
            </p>
            <div className="mt-9 flex justify-center">
              <ZusammenarbeitCta label={t("kopf.cta_label")} />
            </div>
            <p className="t-small mt-4">{t("fazit.cta_hinweis")}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
