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
 * Wissensseite (R3 Welle 2, Cluster P) — /makler-kennzahlen. Hauptteil:
 * eine Nummern-Liste mit den 9 Kennzahlen (Anfragequote bis Bewertungsquote),
 * je mit Formel und einem durchgerechneten Beispiel, danach eine
 * Vergleichs-Tabelle, die das Wochenbericht-Prinzip an vier Beispielwochen
 * zeigt (tnum, overflow-x-auto). Das Gratis-Wort aus dem T-Cluster bleibt
 * hier außen vor (Cluster P). GelbeKarte zu Bauchgefühl als teuerster
 * Kennzahl, Beweis-Anriss (RIEGEL: 342.000 €, 9 Abschlüsse in 6 Wochen),
 * FAQ + FAQPage-JSON-LD. Foto 3 laut R3-SEITENPLAN.json.
 *
 * R11 (14.09): jeder Text läuft über Studio-Keys s.makler-kennzahlen.*
 * (src/lib/texte/seiten/makler-kennzahlen.ts).
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "makler-kennzahlen");
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

export default async function MaklerKennzahlenPage() {
  const c = await getContent();
  const t = seitenTexte(c, "makler-kennzahlen");
  const kennzahlen = t.liste("kennzahlen", ["titel", "text"] as const);
  const wochen = t.liste("wochen", ["woche", "anfragen", "erreicht", "termine", "alleinauftraege", "cpl"] as const);
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
            <h1 className="t-display mt-4">{rich(t("hero.titel"))}</h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              {t("hero.intro_vor")}{" "}
              <Highlight>{t("hero.intro_highlight")}</Highlight>
              {t("hero.intro_nach")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta label={t("hero.cta_label")} />
              <span className="t-small w-full sm:w-auto">{t("hero.cta_antwortzeit")}</span>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 max-w-[1200px] px-6 lg:px-10">
          <Reveal delay={80}>
            <div className="relative aspect-[21/9] overflow-hidden rounded-[28px]">
              <Image
                src={maklerAsset(3)}
                alt="Makler wertet am Bildschirm einen Wochenbericht mit Anfragen und Terminquote aus"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Nummern-Liste — die 9 Kennzahlen mit Formel und Rechenbeispiel ──── */}
      <section id="kennzahlen" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("kennzahlen.eyebrow")}
              titel={t("kennzahlen.titel")}
              sub={t("kennzahlen.sub")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[820px] divide-y divide-line-subtle">
            {kennzahlen.map((k, i) => (
              <Reveal key={k.titel} delay={i * 40}>
                <div className="flex gap-5 py-6 first:pt-0">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <p className="t-body font-medium !text-ink-cream">{k.titel}</p>
                    <p className="t-body mt-1.5">{k.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Wochenbericht-Prinzip — Vergleichs-Tabelle über vier Wochen ─────── */}
      <section id="wochenbericht" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("wochenbericht.eyebrow")}
              titel={t("wochenbericht.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-subtle">
                    <th className="t-label py-3 pr-6 font-semibold">{t("wochenbericht.kopf_woche")}</th>
                    <th className="t-label py-3 pr-6 font-semibold">{t("wochenbericht.kopf_anfragen")}</th>
                    <th className="t-label py-3 pr-6 font-semibold">{t("wochenbericht.kopf_erreicht")}</th>
                    <th className="t-label py-3 pr-6 font-semibold">{t("wochenbericht.kopf_termine")}</th>
                    <th className="t-label py-3 pr-6 font-semibold">
                      {t("wochenbericht.kopf_alleinauftraege")}
                    </th>
                    <th className="t-label py-3 font-semibold !text-ink-cream">{t("wochenbericht.kopf_cpl")}</th>
                  </tr>
                </thead>
                <tbody>
                  {wochen.map((w) => (
                    <tr key={w.woche} className="border-b border-line-subtle">
                      <td className="t-data py-4 pr-6 !text-ink-cream">{w.woche}</td>
                      <td className="t-body py-4 pr-6 tnum">{w.anfragen}</td>
                      <td className="t-body py-4 pr-6 tnum">{w.erreicht}</td>
                      <td className="t-body py-4 pr-6 tnum">{w.termine}</td>
                      <td className="t-body py-4 pr-6 tnum">{w.alleinauftraege}</td>
                      <td className="t-body py-4 tnum">{w.cpl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <p className="t-body mt-10 max-w-[68ch]">{t("wochenbericht.kommentar")}</p>
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

      {/* ── Beweis-Anriss — RIEGEL, Wochenbericht als System in der Praxis ──── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[52ch]">{t("beweis.text")}</p>
            <Link href="/cases/riegel-immobilien" className="ref-link mt-6 inline-block">
              {t("beweis.link_case")}
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
            <p className="t-body-lg mx-auto mt-5 max-w-[56ch]">
              {t("finale.text_1")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.link_hub")}
              </Link>
              {t("finale.text_2")}{" "}
              <Link href="/performance-marketing-makler" className="ref-link">
                {t("finale.link_perf")}
              </Link>
              {t("finale.text_3")}{" "}
              <Link href="/maklerbuero-skalieren" className="ref-link">
                {t("finale.link_skalieren")}
              </Link>
              {t("finale.text_4")}
            </p>
            <div className="mt-9 flex justify-center">
              <ZusammenarbeitCta label={t("finale.cta_label")} />
            </div>
            <p className="t-small mt-4">{t("finale.cta_antwortzeit")}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
