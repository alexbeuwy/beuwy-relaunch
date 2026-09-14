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
import { CaseGrid } from "@/components/CaseGrid";
import { caseBySlug } from "@/lib/cases";

/**
 * Wissensseite (R3 Welle 2, Cluster W) — /immobilienmakler-werbung.
 * Kompakter Wissens-Kopf beantwortet die Suchfrage wörtlich, danach eine
 * Vergleichs-Tabelle (Print/Bus/Portal-Buchung vs. Performance+Portal) und
 * eine Checkliste, mit der jede Werbeausgabe an der 5%-Kette gemessen wird.
 * GelbeKarte, textlicher Beweis-Anriss (Riegel), FAQ + FAQPage-JSON-LD.
 * Foto 11 laut R3-SEITENPLAN.json.
 *
 * R11 (14.09): Texte laufen über s.immobilienmakler-werbung.* (seitenTexte).
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "immobilienmakler-werbung");
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

function HakenIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M4.8 8.2l2.1 2.1 4.3-4.6"
        stroke="currentColor"
        strokeWidth="1.5"
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

export default async function ImmobilienmaklerWerbungPage() {
  const t = seitenTexte(await getContent(), "immobilienmakler-werbung");
  const riegel = caseBySlug("riegel-immobilien");
  const kanaele = t.liste("kanaele", ["kanal", "messbarkeit", "ziel", "eignung"] as const);
  const pruefung = t.liste("pruefung", ["text"] as const);
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
                src={maklerAsset(11)}
                alt="Makler prüft eine Werbeauswertung am Bildschirm"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Vergleichs-Tabelle — Kanal-Ehrlichkeit ──────────────────────────── */}
      <section id="kanaele" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("kanaele.eyebrow")}
              titel={t("kanaele.titel")}
              sub={t("kanaele.sub")}
              className="max-w-[760px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-subtle">
                    <th className="t-label py-3 pr-6 font-semibold !text-ink-cream">{t("kanaele.kopf_kanal")}</th>
                    <th className="t-label py-3 pr-6 font-semibold">{t("kanaele.kopf_messbarkeit")}</th>
                    <th className="t-label py-3 pr-6 font-semibold">{t("kanaele.kopf_ziel")}</th>
                    <th className="t-label py-3 font-semibold">{t("kanaele.kopf_eignung")}</th>
                  </tr>
                </thead>
                <tbody>
                  {kanaele.map((row) => (
                    <tr key={row.kanal} className="border-b border-line-subtle">
                      <td className="t-data py-4 pr-6 !text-ink-cream">{row.kanal}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.messbarkeit}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.ziel}</td>
                      <td className="t-body py-4 tnum">{row.eignung}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <p className="t-body mt-10 max-w-[680px]">
              {t("kanaele.text_vor")}{" "}
              <Link href="/performance-marketing-makler" className="ref-link">
                {t("kanaele.text_link")}
              </Link>
              {t("kanaele.text_nach")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Checkliste — jede Werbeausgabe vor der Buchung prüfen ───────────── */}
      <section id="pruefung" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("pruefung.eyebrow")}
              titel={t("pruefung.titel")}
              sub={t("pruefung.sub")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid max-w-[720px] gap-5">
            {pruefung.map((item, i) => (
              <Reveal key={item.text} delay={i * 50}>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-akzent-hover">
                    <HakenIcon />
                  </span>
                  <p className="t-body">{item.text}</p>
                </div>
              </Reveal>
            ))}
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

      {/* ── Beweis-Anriss — Riegel-Case, Werbung mit Kette bis zum Abschluss ── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[52ch]">{t("beweis.text")}</p>
          </Reveal>
          {riegel ? (
            <div className="mt-10">
              <CaseGrid cases={[riegel]} />
            </div>
          ) : null}
          <Reveal delay={60}>
            <Link href="/cases" className="ref-link mt-8 inline-block">
              {t("beweis.cases_link")}
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
              {t("finale.text_vor")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.text_link1")}
              </Link>
              {t("finale.text_mid1")}{" "}
              <Link href="/performance-marketing-makler" className="ref-link">
                {t("finale.text_link2")}
              </Link>{" "}
              {t("finale.text_mid2")}{" "}
              <Link href="/tools/verkaufspreisrechner" className="ref-link">
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
