import type { Metadata } from "next";
import Link from "next/link";
import { rich } from "@/components/RichText";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { MietWizard } from "@/components/bewertung/miet-wizard";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";

/**
 * B3 — /tools/mietpreisrechner (R3-SEITENPLAN.json, T-Cluster). Kompakter
 * Wissens-Kopf statt 70vh-Hero, darunter direkt der Mietpreis-Wizard
 * (Objektart → Lage → Eckdaten, kein Gate vor dem Ergebnis). "kostenlos"
 * ist unter /tools/* erlaubt (R3-PLAN.md, Abschnitt "Verträge"). Der
 * Wizard importiert seine Rechenlogik ausschließlich aus
 * src/lib/rechner/mietwert.ts — diese Seite fasst die Zahlen nie selbst an.
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "tools-mietpreisrechner");
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

export default async function MietpreisrechnerPage() {
  const c = await getContent();
  const t = seitenTexte(c, "tools-mietpreisrechner");
  const vergleich = t.liste("vergleich", ["titel", "text"] as const);
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

      {/* ── Kompakter Kopf ───────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[860px] px-6 pb-10 pt-32 md:pt-40 lg:px-10">
          <p className="t-label !text-ink-yellow">{t("kopf.label")}</p>
          <h1 className="t-display mt-5 max-w-[24ch]">{rich(t("kopf.titel"))}</h1>
          <p className="t-body-lg mt-6 max-w-[62ch]">
            {t("kopf.sub_vor")}{" "}
            <Highlight>{t("kopf.sub_highlight")}</Highlight>
            {t("kopf.sub_nach")}
          </p>
        </div>
      </section>

      {/* ── Wizard — sofort startklar, kein Gate vor dem Ergebnis ────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[1040px] px-6 pb-20 md:pb-28 lg:px-10">
          <MietWizard />
        </div>
      </section>

      {/* ── Vergleichsmiete verstehen ────────────────────────────────── */}
      <section id="vergleichsmiete" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("vergleich.eyebrow")}
              titel={t("vergleich.titel")}
              sub={t("vergleich.sub")}
              className="max-w-[760px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-10 border-t border-line-subtle pt-10 md:grid-cols-3">
            {vergleich.map((punkt, i) => (
              <Reveal key={punkt.titel} delay={i * 60}>
                <p className="t-h3">{punkt.titel}</p>
                <p className="t-body mt-3">{punkt.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={160}>
            <p className="t-body mt-10 max-w-[70ch]">
              {t("vergleich.quelle_vor")}{" "}
              <Link href="/wissen/mietpreis-ermitteln" className="ref-link">
                {t("vergleich.quelle_link")}
              </Link>
              {t("vergleich.quelle_nach")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
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

      {/* ── Vermieter/Makler-Pitch → /anfrage ────────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte
              label={t("pitch.label")}
              titel={t("pitch.titel")}
              glyph
            >
              {t("pitch.text")}
            </GelbeKarte>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 text-center">
              <ZusammenarbeitCta label={t("pitch.cta")} />
              <p className="t-small mt-4">{t("pitch.cta_hinweis")}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
