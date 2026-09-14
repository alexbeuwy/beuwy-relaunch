import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { PainRows } from "@/components/PainRows";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CaseGrid } from "@/components/CaseGrid";
import { caseBySlug } from "@/lib/cases";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";

/**
 * Wissensseite (R3 Welle 2, Cluster W) — /empfehlungsgeschaeft-digitalisieren.
 * Kompakter Wissens-Kopf beantwortet die Suchfrage wörtlich, danach
 * PainRows (typische Denkfehler reiner Empfehlungs-Makler) und eine
 * Nummern-Liste mit den vier Schritten. GelbeKarte, Königswege-Beweis
 * (Empfehlungswachstum 60→2.300+ Partner), FAQ + FAQPage-JSON-LD. Foto 6
 * laut R3-SEITENPLAN.json.
 *
 * R11: alle Texte laufen über Studio-Keys
 * (src/lib/texte/seiten/empfehlungsgeschaeft-digitalisieren.ts).
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "empfehlungsgeschaeft-digitalisieren");
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

export default async function EmpfehlungsgeschaeftDigitalisierenPage() {
  const c = await getContent();
  const t = seitenTexte(c, "empfehlungsgeschaeft-digitalisieren");
  const pains = t.liste("pains", ["quote", "antwort"] as const);
  const schritte = t.liste("schritte", ["titel", "text"] as const);
  const faqs = t.liste("faq", ["frage", "antwort"] as const);
  const koenigswege = caseBySlug("koenigswege");

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
                src={maklerAsset(6)}
                alt="Zufriedener Kunde gibt kurz nach dem Notartermin eine Bewertung ab"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Einwände — typische Denkfehler reiner Empfehlungs-Makler ────────── */}
      <section id="einwaende" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf eyebrow={t("einwaende.eyebrow")} titel={t("einwaende.titel")} className="max-w-[720px]" />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={pains.map((p) => ({ quote: p.quote, answer: p.antwort }))} />
          </div>
        </div>
      </section>

      {/* ── Mechanismus — Nummern-Liste, vier Schritte ──────────────────────── */}
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
          <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {schritte.map((schritt, i) => (
              <Reveal key={schritt.titel} delay={i * 60}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="t-h3 mt-4">{schritt.titel}</p>
                  <p className="t-body mt-3">{schritt.text}</p>
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

      {/* ── Beweis-Anriss — Königswege, Wachstum durch Empfehlung und Marke ── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[52ch]">{t("beweis.text")}</p>
          </Reveal>
          {koenigswege ? (
            <div className="mt-10">
              <CaseGrid cases={[koenigswege]} />
            </div>
          ) : null}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
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

      {/* ── Finale — CTA + Textlinks zu Hub und Spec-Links ──────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">{t("fazit.label")}</p>
            <h2 className="t-h2 mt-4">{rich(t("fazit.titel"))}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              {t("fazit.text_1")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("fazit.link1")}
              </Link>
              {t("fazit.text_2")}{" "}
              <Link href="/ueber-uns" className="ref-link">
                {t("fazit.link2")}
              </Link>
              {t("fazit.text_3")}{" "}
              <Link href="/website-fuer-immobilienmakler" className="ref-link">
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
