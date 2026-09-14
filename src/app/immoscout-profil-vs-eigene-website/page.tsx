import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CaseGrid } from "@/components/CaseGrid";
import { caseBySlug } from "@/lib/cases";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";

/**
 * Wissens-Seite D18 — /immoscout-profil-vs-eigene-website (R3-SEITENPLAN.json,
 * Cluster V). Kompakter Wissens-Kopf statt 70vh-Hero: Antwort auf die
 * Suchfrage direkt unter dem H1 (GEO-Prinzip). Hauptteil als Zweispalter
 * (Portal-Profil vs. eigene Website), weil die Seite zwei Flächen
 * nebeneinanderstellt statt eine Matrix aus mehreren Anbietern — dafür ist
 * /makler-website-baukasten-vergleich mit einer echten Tabelle da. Beweis
 * läuft über RIEGEL (CaseGrid), weil der Case selbst über ein
 * ImmoScout24-Ranking geführt wird und damit exakt zum Thema passt. Foto 3
 * laut Spec.
 *
 * R11 (14.09): jeder Text läuft über Studio-Keys
 * s.immoscout-profil-vs-eigene-website.* (src/lib/texte/seiten/).
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "immoscout-profil-vs-eigene-website");
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

export default async function ImmoscoutProfilVsEigeneWebsitePage() {
  const c = await getContent();
  const t = seitenTexte(c, "immoscout-profil-vs-eigene-website");
  const vergleich = t.liste("vergleich", ["aspekt", "portal", "eigen"] as const);
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

      {/* ── Wissens-Kopf — kompakt statt 70vh-Hero, Antwort direkt unter H1 ── */}
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
                alt="Makler prüft am Laptop den eigenen Online-Auftritt neben dem Portal-Profil"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Zweispalter — Portal-Profil vs. eigene Website, sechs Aspekte ── */}
      <section id="vergleich" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("vergleich.eyebrow")}
              titel={t("vergleich.titel")}
              sub={t("vergleich.sub")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 border-t border-line-subtle">
            {vergleich.map((v, i) => (
              <Reveal key={v.aspekt} delay={i * 50}>
                <div className="grid gap-4 border-b border-line-subtle py-8 sm:grid-cols-[10rem_1fr] sm:gap-8 lg:grid-cols-[10rem_1fr_1fr] lg:gap-10">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.04em] text-ink-dim">
                    {v.aspekt}
                  </p>
                  <div>
                    <p className="t-data mb-2">{t("vergleich.kopf_portal")}</p>
                    <p className="t-body">{v.portal}</p>
                  </div>
                  <div>
                    <p className="t-data mb-2 !text-ink-yellow">{t("vergleich.kopf_eigen")}</p>
                    <p className="t-body">{v.eigen}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als Pointe ─────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label={t("unterschied.label")} titel={t("unterschied.titel")} glyph>
              {t("unterschied.text")}
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — RIEGEL, weil der Case über ein ImmoScout24-Ranking läuft ── */}
      <section id="beweis" className="bg-bg-elevated">
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

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
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

      {/* ── Finale — CTA, Textlinks zu Hub und Spec-Links ───────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">{t("finale.label")}</p>
            <h2 className="t-h2 mt-4">{rich(t("finale.titel"))}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              {t("finale.text_1")}{" "}
              <Link href="/website-fuer-immobilienmakler" className="ref-link">
                {t("finale.link_website")}
              </Link>
              {t("finale.text_2")}{" "}
              <Link href="/eigentuemer-leads-generieren" className="ref-link">
                {t("finale.link_leads")}
              </Link>
              {t("finale.text_3")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.link_hub")}
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
