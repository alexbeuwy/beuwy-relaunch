import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RiCheckLine } from "@remixicon/react";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";

/**
 * Wissensseite (R3 Welle 2, Cluster K) — /ki-expose-texte. Kompakter
 * Wissens-Kopf beantwortet die Suchfrage wörtlich: Ja für die Rohfassung,
 * nein für die Objektwahrheit. Hauptteil: Stil-Leitplanken als Checkliste,
 * ein konkretes Vorher/Nachher-Beispiel mit einer erfundenen, unbelegten
 * Behauptung im Rohtext (Risiko irreführender Werbung, sachlich benannt,
 * keine Rechtsberatung), GelbeKarte, Beweis-Anriss, FAQ inkl.
 * Haftungsfrage + FAQPage-JSON-LD. Foto 10 laut R3-SEITENPLAN.json.
 * R11: alle Fließtexte laufen über Studio-Keys src/lib/texte/seiten/
 * ki-expose-texte.ts.
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "ki-expose-texte");
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

export default async function KiExposeTextePage() {
  const t = seitenTexte(await getContent(), "ki-expose-texte");
  const leitplanken = t.liste("leitplanken", ["text"] as const);
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
              {t("kopf.text_vor")} <Highlight>{t("kopf.text_mark")}</Highlight>
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
                src={maklerAsset(10)}
                alt="Makler vergleicht einen Textentwurf am Bildschirm mit den Objektunterlagen auf Papier"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Stil-Leitplanken — Checkliste ────────────────────────────────────── */}
      <section id="leitplanken" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("leitplanken.eyebrow")}
              titel={t("leitplanken.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <ul className="mt-10 max-w-[640px] space-y-4">
              {leitplanken.map((punkt) => (
                <li key={punkt.text} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-akzent-wash">
                    <RiCheckLine className="h-4 w-4 text-ink-cream" />
                  </span>
                  <span className="t-body">{punkt.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Vorher/Nachher — konkretes Beispiel ──────────────────────────────── */}
      <section id="beispiel" className="bg-bg-base">
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
              <div className="h-full rounded-[24px] border border-line-subtle bg-bg-elevated p-7">
                <p className="t-label">{t("beispiel.roh_label")}</p>
                <p className="t-body mt-4">{t("beispiel.roh_text")}</p>
                <p className="t-small mt-4">{t("beispiel.roh_problem")}</p>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className="h-full rounded-[24px] border-l-2 border-akzent bg-bg-elevated p-7">
                <p className="t-label">{t("beispiel.fassung_label")}</p>
                <p className="t-body mt-4">{t("beispiel.fassung_text")}</p>
                <p className="t-small mt-4">{t("beispiel.fassung_hinweis")}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Die Grenze — GelbeKarte, Haftung sachlich benannt ───────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label={t("grenze.label")} titel={t("grenze.titel")} glyph>
              {t("grenze.text")}
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss ────────────────────────────────────────────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[46ch]">{rich(t("beweis.titel"))}</p>
            <p className="t-body mt-4 max-w-[52ch]">{t("beweis.text")}</p>
            <Link href="/exposes-die-verkaufen" className="ref-link mt-6 inline-block">
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
            <FaqAccordion items={faqs} />
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
              {t("finale.text_vor")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.link_hub")}
              </Link>
              {t("finale.text_mid1")}{" "}
              <Link href="/exposes-die-verkaufen" className="ref-link">
                {t("finale.link_expose")}
              </Link>
              {t("finale.text_mid2")}{" "}
              <Link href="/chatgpt-fuer-makler" className="ref-link">
                {t("finale.link_chatgpt")}
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
