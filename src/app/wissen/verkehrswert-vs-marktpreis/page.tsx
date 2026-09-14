import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { getContent } from "@/lib/content";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { seitenTexte } from "@/lib/texte/lesen";

/**
 * Wissensseite (R3 Welle 2, Cluster T) — /wissen/verkehrswert-vs-marktpreis.
 * Kompakter Wissens-Kopf beantwortet die Suchfrage wörtlich. Hauptteil in
 * drei Bausteinen: Zweispalter mit den zwei Definitionen, eine
 * Drei-Gründe-Rail für die Abweichung, eine Tabelle zur Portal-Falle
 * (Angebotspreis vs. Abschlusspreis) mit einer klar markierten
 * Beispielrechnung. "kostenlos" ist hier erlaubt (Cluster T) und wird
 * einmal für den Verweis auf /tools/verkaufspreisrechner genutzt.
 * GelbeKarte, Beweis-Anriss (RIEGEL-Bewertungsrechner mit amtlichen
 * Bodenrichtwerten), FAQ + FAQPage-JSON-LD. Foto 18 laut
 * R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "wissen-verkehrswert-vs-marktpreis");
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

export default async function VerkehrswertVsMarktpreisPage() {
  const c = await getContent();
  const t = seitenTexte(c, "wissen-verkehrswert-vs-marktpreis");
  const gruende = t.liste("gruende", ["titel", "text"] as const);
  const zeilen = t.liste("zeilen", ["merkmal", "angebot", "abschluss"] as const);
  const faq = t.liste("faq", ["q", "a"] as const);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
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
              {t("kopf.sub_vor")}{" "}
              <Highlight>{t("kopf.sub_mark")}</Highlight>
              {t("kopf.sub_nach")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta label={t("kopf.cta_label")} />
              <span className="t-small w-full sm:w-auto">{t("kopf.antwort")}</span>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 max-w-[1200px] px-6 lg:px-10">
          <Reveal delay={80}>
            <div className="relative aspect-[21/9] overflow-hidden rounded-[28px]">
              <Image
                src={maklerAsset(18)}
                alt="Makler erklärt einem Eigentümer am Tisch den Unterschied zwischen zwei Preiszahlen"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Zwei Definitionen — Zweispalter im Karten-Stil ──────────────────── */}
      <section id="definitionen" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("definitionen.eyebrow")}
              titel={t("definitionen.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[24px] border border-line-subtle bg-bg-base p-7">
                <p className="t-label">{t("definitionen.card1_label")}</p>
                <p className="t-body mt-4">{t("definitionen.card1_text")}</p>
                <p className="t-small mt-4">{t("definitionen.card1_small")}</p>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className="h-full rounded-[24px] border-l-2 border-akzent bg-bg-base p-7">
                <p className="t-label">{t("definitionen.card2_label")}</p>
                <p className="t-body mt-4">{t("definitionen.card2_text")}</p>
                <p className="t-small mt-4">{t("definitionen.card2_small")}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Drei Gründe für die Abweichung — Rail ────────────────────────────── */}
      <section id="gruende" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("gruende.eyebrow")}
              titel={t("gruende.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {gruende.map((g, i) => (
              <Reveal key={g.titel} delay={i * 60}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="t-h3 mt-4">{g.titel}</p>
                  <p className="t-body mt-3">{g.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portal-Falle — Angebotspreis vs. Abschlusspreis, Beispielrechnung ── */}
      <section id="portal-falle" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("portalfalle.eyebrow")}
              titel={t("portalfalle.titel")}
              sub={t("portalfalle.sub")}
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-subtle">
                    <th className="t-label py-3 pr-6 font-semibold">{t("portalfalle.th_merkmal")}</th>
                    <th className="t-label py-3 pr-6 font-semibold">{t("portalfalle.th_angebot")}</th>
                    <th className="t-label py-3 font-semibold !text-ink-cream">
                      {t("portalfalle.th_abschluss")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {zeilen.map((row) => (
                    <tr key={row.merkmal} className="border-b border-line-subtle">
                      <td className="t-data py-4 pr-6 !text-ink-cream">{row.merkmal}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.angebot}</td>
                      <td className="t-body py-4 tnum">{row.abschluss}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <p className="t-body mt-10 max-w-[68ch]">
              {t("portalfalle.text_vor")}{" "}
              <Link href="/tools/verkaufspreisrechner" className="ref-link">
                {t("portalfalle.link1")}
              </Link>
              {t("portalfalle.text_mitte")}{" "}
              <Link href="/wissen/immobilie-bewerten" className="ref-link">
                {t("portalfalle.link2")}
              </Link>
              {t("portalfalle.text_nach")}
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

      {/* ── Beweis-Anriss — RIEGEL, Bewertungsrechner mit Bodenrichtwerten ──── */}
      <section id="beweis" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[52ch]">{t("beweis.titel")}</p>
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
            <FaqAccordion items={faq} />
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
              {t("finale.satz1")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.link1")}
              </Link>
              {t("finale.satz2")}{" "}
              <Link href="/wissen/immobilie-bewerten" className="ref-link">
                {t("finale.link2")}
              </Link>
              {t("finale.satz3")}{" "}
              <Link href="/tools/verkaufspreisrechner" className="ref-link">
                {t("finale.link3")}
              </Link>
              {t("finale.satz4")}
            </p>
            <div className="mt-9 flex justify-center">
              <ZusammenarbeitCta label={t("kopf.cta_label")} />
            </div>
            <p className="t-small mt-4">{t("finale.antwort")}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
