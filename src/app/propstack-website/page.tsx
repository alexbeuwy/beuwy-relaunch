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
 * Wissensseite (R3 Welle 2, Cluster V) — /propstack-website. Beantwortet
 * "Kann ich meine Website direkt aus Propstack betreiben?" wörtlich im
 * Kopf, dann ein Zweispalter (was das CRM liefert vs. was ein eigenes
 * Portal zusätzlich braucht), eine Nummern-Liste zur sauberen Anbindung,
 * GelbeKarte im Motor/Schaufenster-Bild (konsistent zu
 * /maklersoftware-vergleich), Beweis-Anriss RIEGEL (CRM-Anbindung), FAQ +
 * FAQPage-JSON-LD. Foto 19 laut R3-SEITENPLAN.json.
 *
 * R11: alle Texte laufen über Studio-Keys, siehe
 * src/lib/texte/seiten/propstack-website.ts.
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "propstack-website");
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

export default async function PropstackWebsitePage() {
  const c = await getContent();
  const t = seitenTexte(c, "propstack-website");
  const propstackLiefert = t.liste("propstack_liefert", ["punkt"] as const);
  const portalBraucht = t.liste("portal_braucht", ["punkt"] as const);
  const schritte = t.liste("schritte", ["titel", "text"] as const);
  const faqs = t.liste("faq", ["frage", "antwort"] as const);
  const riegel = caseBySlug("riegel-immobilien");

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

      {/* ── Wissens-Kopf ─────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[880px] px-6 pb-4 pt-32 lg:px-10 lg:pt-36">
          <Reveal>
            <p className="t-label !text-ink-yellow">{t("hero.eyebrow")}</p>
            <h1 className="t-display mt-4">
              {rich(t("hero.titel"))}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              {t("hero.sub_vor")}{" "}
              <Highlight>{t("hero.sub_highlight")}</Highlight>
              {t("hero.sub_nach")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta label={t("cta.label")} />
              <span className="t-small w-full sm:w-auto">{t("hero.cta_hinweis")}</span>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 max-w-[1200px] px-6 lg:px-10">
          <Reveal delay={80}>
            <div className="relative aspect-[21/9] overflow-hidden rounded-[28px]">
              <Image
                src={maklerAsset(19)}
                alt="Makler prüft am Tablet eine CRM-Objektliste neben dem geplanten Markenauftritt"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Zweispalter — Was Propstack liefert vs. was ein Portal zusätzlich braucht ── */}
      <section id="zweispalter" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("zweispalter.eyebrow")}
              titel={t("zweispalter.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <p className="t-label">{t("zweispalter.propstack_label")}</p>
              <ul className="mt-5 space-y-4 border-t border-line-subtle pt-5">
                {propstackLiefert.map((z) => (
                  <li key={z.punkt} className="t-body border-b border-line-subtle pb-4">
                    {z.punkt}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={80}>
              <p className="t-label !text-ink-cream">{t("zweispalter.portal_label")}</p>
              <ul className="mt-5 space-y-4 border-t border-line-subtle pt-5">
                {portalBraucht.map((z) => (
                  <li key={z.punkt} className="t-body border-b border-line-subtle pb-4">
                    {z.punkt}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Nummern-Liste — die saubere Anbindung ────────────────────────── */}
      <section id="anbindung" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("anbindung.eyebrow")}
              titel={t("anbindung.titel")}
              sub={t("anbindung.sub")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 border-t border-line-subtle">
            {schritte.map((s, i) => (
              <Reveal key={s.titel} delay={i * 40}>
                <div className="grid gap-3 border-b border-line-subtle py-8 sm:grid-cols-[56px_1fr] sm:gap-8 md:grid-cols-[56px_15rem_1fr] md:gap-10">
                  <span className="font-mono text-[13px] text-ink-dim tnum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15px] font-semibold text-ink-cream">{s.titel}</p>
                  <p className="t-body max-w-[36rem]">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte, Motor/Schaufenster ─────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label={t("unterschied.label")} titel={t("unterschied.titel")} glyph>
              {t("unterschied.text")}
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — RIEGEL, CRM-Anbindung ────────────────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              {t("beweis.text")}
            </p>
          </Reveal>
          {riegel ? (
            <div className="mt-10">
              <CaseGrid cases={[riegel]} />
            </div>
          ) : null}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
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
          <p className="t-small mt-10 max-w-[54ch]">
            {t("faq.hinweis")}
          </p>
        </div>
      </section>

      {/* ── Finale ───────────────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">{t("finale.label")}</p>
            <h2 className="t-h2 mt-4">{rich(t("finale.titel"))}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              {t("finale.satz_1")}{" "}
              <Link href="/maklersoftware-vergleich" className="ref-link">
                {t("finale.link_1")}
              </Link>
              {t("finale.satz_2")}{" "}
              <Link href="/onoffice-website" className="ref-link">
                {t("finale.link_2")}
              </Link>
              {t("finale.satz_3")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.link_3")}
              </Link>
              {t("finale.satz_4")}
            </p>
            <div className="mt-9 flex justify-center">
              <ZusammenarbeitCta label={t("cta.label")} />
            </div>
            <p className="t-small mt-4">{t("finale.cta_hinweis")}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
