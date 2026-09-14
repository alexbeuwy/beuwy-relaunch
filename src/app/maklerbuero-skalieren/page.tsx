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
 * Wissensseite (R3 Welle 2, Cluster P) — /maklerbuero-skalieren. Hauptteil:
 * eine Drei-Stufen-Rail (Zufluss → Prozess → Team) als Kernaussage des
 * Angles, danach ein Zweispalter im Karten-Stil (Falsche Reihenfolge vs.
 * Richtige Reihenfolge), dann eine kurze Passage zur ersten Rolle im Team.
 * Das Gratis-Wort aus dem T-Cluster bleibt hier außen vor (Cluster P).
 * GelbeKarte, Beweis-Anriss (acta, System vor Headcount als
 * Eigenerfahrung, KEIN Case-Link auf /cases/acta — dort existiert kein
 * Eintrag), FAQ + FAQPage-JSON-LD. Foto 2 laut R3-SEITENPLAN.json.
 * R11: alle Fließtexte laufen über Studio-Keys src/lib/texte/seiten/
 * maklerbuero-skalieren.ts.
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "maklerbuero-skalieren");
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

export default async function MaklerbueroSkalierenPage() {
  const t = seitenTexte(await getContent(), "maklerbuero-skalieren");
  const stufen = t.liste("stufen", ["titel", "text"] as const);
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
                src={maklerAsset(2)}
                alt="Makler bespricht mit einer neuen Teamkollegin einen dokumentierten Ablauf am Bildschirm"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Mechanismus — Drei-Stufen-Rail: Zufluss → Prozess → Team ────────── */}
      <section id="stufen" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("stufen.eyebrow")}
              titel={t("stufen.titel")}
              sub={t("stufen.sub")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {stufen.map((s, i) => (
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

      {/* ── Zweispalter — falsche vs. richtige Reihenfolge ──────────────────── */}
      <section id="reihenfolge" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("reihenfolge.eyebrow")}
              titel={t("reihenfolge.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[24px] border border-line-subtle bg-bg-elevated p-7">
                <p className="t-label">{t("reihenfolge.falsch_label")}</p>
                <p className="t-body mt-4">{t("reihenfolge.falsch_text")}</p>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className="h-full rounded-[24px] border-l-2 border-akzent bg-bg-elevated p-7">
                <p className="t-label">{t("reihenfolge.richtig_label")}</p>
                <p className="t-body mt-4">{t("reihenfolge.richtig_text")}</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="t-body mt-10 max-w-[68ch]">
              {t("reihenfolge.text_vor")}{" "}
              <Link href="/automatisierung-maklerbuero" className="ref-link">
                {t("reihenfolge.link_automatisierung")}
              </Link>
              {t("reihenfolge.text_nach")}
            </p>
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

      {/* ── Beweis-Anriss — acta, System vor Headcount als Eigenerfahrung ──── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[52ch]">{t("beweis.text")}</p>
            <Link href="/ueber-uns" className="ref-link mt-6 inline-block">
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
              <Link href="/automatisierung-maklerbuero" className="ref-link">
                {t("finale.link_automatisierung")}
              </Link>
              {t("finale.text_mid2")}{" "}
              <Link href="/ueber-uns" className="ref-link">
                {t("finale.link_ueberuns")}
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
