import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { GelbeKarte, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { PainRows } from "@/components/PainRows";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CaseGrid } from "@/components/CaseGrid";
import { caseBySlug } from "@/lib/cases";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";

/**
 * W-Cluster — /objektakquise-strategien (R3-SEITENPLAN.json). Antwort auf
 * "Welche Objektakquise-Strategien funktionieren 2026?" direkt im Kopf.
 * Hauptbaustein: eine ehrliche Vergleichstabelle von Kaltakquise bis zum
 * eigenen Portal (Aufwand/erste Wirkung/Eignung), gerahmt von PainRows
 * gegen generische Ranglisten-Artikel und einer GelbeKarte gegen die
 * Illusion der einen Wunderstrategie. Beweis: RIEGEL (Kap. 342.000 €/9
 * Abschlüsse in 6 Wochen). Kompakter Wissens-Kopf statt 70vh-Hero, Foto 7.
 * Texte: src/lib/texte/seiten/objektakquise-strategien.ts (Studio-Keys
 * s.objektakquise-strategien.*).
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "objektakquise-strategien");
  return {
    title: t("meta.titel"),
    description: t("meta.beschreibung"),
    openGraph: {
      title: t("meta.titel"),
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

export default async function ObjektakquiseStrategienPage() {
  const c = await getContent();
  const t = seitenTexte(c, "objektakquise-strategien");
  const riegel = caseBySlug("riegel-immobilien");

  const PAINS = t.liste("pains", ["quote", "answer"] as const);
  const STRATEGIEN = t.liste("strategien", ["name", "aufwand", "wirkung", "eignung"] as const);
  const FAQS = t.liste("faq", ["frage", "antwort"] as const).map((f) => ({ q: f.frage, a: f.antwort }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
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
          <p className="t-label !text-ink-yellow">{t("hero.eyebrow")}</p>
          <h1 className="t-display mt-5 max-w-[22ch]">{rich(t("hero.titel"))}</h1>
          <p className="t-body-lg mt-6 max-w-[62ch]">{t("hero.intro")}</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <ZusammenarbeitCta label={t("hero.cta_label")} />
            <span className="t-small w-full sm:w-auto">{t("hero.cta_hinweis")}</span>
          </div>
        </div>
      </section>

      {/* ── Foto-Band ────────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[28px]">
            <Image
              src={maklerAsset(7)}
              alt="Makler bespricht am Tisch eine Übersicht mehrerer Akquise-Kanäle"
              fill
              sizes="(min-width: 1024px) 1120px, 100vw"
              className="object-cover"
            />
            <AiPille />
          </div>
        </div>
      </section>

      {/* ── Problem — Wunderlisten ohne Aufwand/Wirkung ─────────────── */}
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
            <PainRows items={PAINS} />
          </div>
        </div>
      </section>

      {/* ── Vergleichstabelle — 7 Strategien, Kaltakquise bis Portal ─── */}
      <section id="strategien" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("strategien.eyebrow")}
              titel={t("strategien.titel")}
              sub={t("strategien.sub")}
              className="max-w-[760px]"
            />
          </Reveal>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line-medium">
                  <th className="py-3 pr-4 t-label !text-[10.5px]">{t("strategien.spalte_rang")}</th>
                  <th className="py-3 pr-4 t-label !text-[10.5px]">{t("strategien.spalte_name")}</th>
                  <th className="py-3 pr-4 t-label !text-[10.5px]">{t("strategien.spalte_aufwand")}</th>
                  <th className="py-3 pr-4 t-label !text-[10.5px]">{t("strategien.spalte_wirkung")}</th>
                  <th className="py-3 t-label !text-[10.5px]">{t("strategien.spalte_eignung")}</th>
                </tr>
              </thead>
              <tbody>
                {STRATEGIEN.map((s, i) => (
                  <tr key={`strategie-${i}`} className="border-b border-line-subtle align-top">
                    <td className="py-4 pr-4 font-mono text-[13px] text-ink-muted tnum">
                      {String(i + 1).padStart(2, "0")}
                    </td>
                    <td className="py-4 pr-4 t-body max-w-[13rem] !text-ink-cream font-medium">
                      {s.name}
                    </td>
                    <td className="py-4 pr-4 t-body max-w-[15rem]">{s.aufwand}</td>
                    <td className="py-4 pr-4 t-body max-w-[14rem]">{s.wirkung}</td>
                    <td className="py-4 t-body max-w-[16rem]">{s.eignung}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Reveal delay={80}>
            <p className="t-body mt-8 max-w-[70ch]">{t("strategien.fazit")}</p>
          </Reveal>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als Pointe ─────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label={t("unterschied.label")} titel={t("unterschied.titel")} glyph>
              {t("unterschied.text")}
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — RIEGEL ───────────────────────────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[46ch]">{t("beweis.text")}</p>
          </Reveal>
          {riegel ? (
            <div className="mt-10">
              <CaseGrid cases={[riegel]} />
            </div>
          ) : null}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-bg-elevated">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf eyebrow={t("faq.eyebrow")} titel={t("faq.titel")} ausrichtung="mitte" />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
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
              <Link href="/eigentuemer-leads-generieren" className="ref-link">
                {t("finale.text_link1")}
              </Link>{" "}
              {t("finale.text_mitte1")}{" "}
              <Link href="/alleinauftrag-gewinnen" className="ref-link">
                {t("finale.text_link2")}
              </Link>
              {t("finale.text_mitte2")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.text_link3")}
              </Link>
              .
            </p>
            <div className="mt-9 flex justify-center">
              <ZusammenarbeitCta label={t("finale.cta_label")} />
            </div>
            <p className="t-small mt-4">{t("finale.cta_hinweis")}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
