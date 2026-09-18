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
 * Wissensseite (R3 Welle 2, Cluster P) — /provision-verteidigen. Eigener
 * Pain (Eigentümer vergleicht drei Angebote nach dem Prozentsatz, ein
 * Rabatt heute ist ein Präzedenzfall für jeden Verkauf danach). Hauptteil:
 * eine Drei-Schritte-Rail (Vermarktungsplan vor Unterschrift,
 * Reichweiten-Nachweis während der Laufzeit, Wochenbericht bis zum
 * Notartermin) und eine Gegenüberstellungs-Tabelle Rabatt-Gespräch vs.
 * Beweis-Gespräch. Das Gratis-Wort aus dem T-Cluster bleibt hier außen vor
 * (Cluster P). GelbeKarte, Beweis-Anriss (RIEGEL, CRM-Anbindung +
 * Rückrufregel als sichtbares System), FAQ + FAQPage-JSON-LD. Foto 1 laut
 * R3-SEITENPLAN.json.
 *
 * R11 (14.09): Texte laufen über s.provision-verteidigen.* (seitenTexte).
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "provision-verteidigen");
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

function ZusammenarbeitCta({ text, className = "" }: { text: string; className?: string }) {
  return (
    <Link
      href="/anfrage"
      className={`group inline-flex items-center gap-2.5 rounded-full bg-akzent px-7 py-3.5 text-[15px] font-semibold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover ${className}`}
    >
      {text}
      <PfeilRechts className="transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:translate-x-0.5" />
    </Link>
  );
}

export default async function ProvisionVerteidigenPage() {
  const t = seitenTexte(await getContent(), "provision-verteidigen");
  const pains = t.liste("pains", ["zitat", "antwort"] as const);
  const schritte = t.liste("schritte", ["titel", "text"] as const);
  const gespraech = t.liste("gespraech", ["argument", "ohne", "mit"] as const);
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
              {t("kopf.sub_vor")}{" "}
              <Highlight>{t("kopf.sub_highlight")}</Highlight>
              {t("kopf.sub_nach")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta text={t("kopf.cta")} />
              <span className="t-small w-full sm:w-auto">{t("kopf.cta_hinweis")}</span>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 max-w-[1200px] px-6 lg:px-10">
          <Reveal delay={80}>
            <div className="relative aspect-[21/9] overflow-hidden rounded-[28px]">
              <Image
                src={maklerAsset(1)}
                alt="Makler legt einem Eigentümer am Tisch einen konkreten Vermarktungsplan vor"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Problem — Prozentsatz-Vergleich, Rabattfrage, Präzedenzfall ─────── */}
      <section id="problem" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("problem.eyebrow")}
              titel={t("problem.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={pains.map((p) => ({ quote: p.zitat, answer: p.antwort }))} />
          </div>
        </div>
      </section>

      {/* ── Mechanismus — Drei-Schritte-Rail ─────────────────────────────────── */}
      <section id="schritte" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("schritte.eyebrow")}
              titel={t("schritte.titel")}
              sub={t("schritte.sub")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {schritte.map((s, i) => (
              <Reveal key={s.titel} delay={i * 60}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="t-h3 mt-4">{s.titel}</p>
                  <p className="t-body mt-3">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gegenüberstellung — Rabatt-Gespräch vs. Beweis-Gespräch ─────────── */}
      <section id="gespraech" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("gespraech.eyebrow")}
              titel={t("gespraech.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-subtle">
                    <th className="t-label py-3 pr-6 font-semibold">{t("gespraech.kopf_argument")}</th>
                    <th className="t-label py-3 pr-6 font-semibold">{t("gespraech.kopf_ohne")}</th>
                    <th className="t-label py-3 font-semibold !text-ink-cream">{t("gespraech.kopf_mit")}</th>
                  </tr>
                </thead>
                <tbody>
                  {gespraech.map((row) => (
                    <tr key={row.argument} className="border-b border-line-subtle">
                      <td className="t-data py-4 pr-6 !text-ink-cream">{row.argument}</td>
                      <td className="t-body py-4 pr-6">{row.ohne}</td>
                      <td className="t-body py-4">{row.mit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <p className="t-body mt-10 max-w-[68ch]">
              {t("gespraech.text_vor")}{" "}
              <Link href="/alleinauftrag-gewinnen" className="ref-link">
                {t("gespraech.text_link")}
              </Link>
              {t("gespraech.text_nach")}
            </p>
          </Reveal>
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

      {/* ── Beweis-Anriss — RIEGEL, CRM-Anbindung + Rückrufregel als System ─── */}
      <section id="beweis" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[52ch]">{t("beweis.text")}</p>
            <Link href="/cases/riegel-immobilien" className="ref-link mt-6 inline-block">
              {t("beweis.case_link")}
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
              {t("finale.text_vor")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.text_link1")}
              </Link>
              {t("finale.text_mid1")}{" "}
              <Link href="/alleinauftrag-gewinnen" className="ref-link">
                {t("finale.text_link2")}
              </Link>
              {t("finale.text_mid2")}{" "}
              <Link href="/performance-marketing-makler" className="ref-link">
                {t("finale.text_link3")}
              </Link>
              {t("finale.text_nach")}
            </p>
            <div className="mt-9 flex justify-center">
              <ZusammenarbeitCta text={t("finale.cta")} />
            </div>
            <p className="t-small mt-4">{t("finale.hinweis")}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
