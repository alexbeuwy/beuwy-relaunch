import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { getContent } from "@/lib/content";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { PainRows } from "@/components/PainRows";
import { FaqAccordion } from "@/components/FaqAccordion";
import { seitenTexte } from "@/lib/texte/lesen";

/**
 * Wissensseite (R3 Welle 2, Cluster C) — /google-unternehmensprofil-makler.
 * Kompakter Wissens-Kopf beantwortet die Suchfrage wörtlich (Kategorie,
 * Kontaktdaten, Fotos, Q&A). Hauptteil: PainRows zu den vier häufigsten
 * Versäumnissen, danach eine Wochenroutine-Tabelle (Wochentag → Aufgabe →
 * Zeitaufwand) als Umsetzungsplan. GelbeKarte, Beweis-Anriss über den
 * RIEGEL-Relaunch (342.000 €/9 Abschlüsse in 6 Wochen, Platz 21 von über
 * 25.000 Maklern beim ImmoScout24-Award). FAQ + FAQPage-JSON-LD. Foto 5
 * laut R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "google-unternehmensprofil-makler");
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

export default async function GoogleUnternehmensprofilMaklerPage() {
  const c = await getContent();
  const t = seitenTexte(c, "google-unternehmensprofil-makler");
  const pains = t.liste("pains", ["quote", "answer"] as const);
  const routine = t.liste("routine", ["tag", "aufgabe", "minuten"] as const);
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
              <Highlight>{t("kopf.sub_mark")}</Highlight>{" "}
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
                src={maklerAsset(5)}
                alt="Makler prüft das eigene Google-Unternehmensprofil auf dem Laptop im Büro"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Versäumnisse — PainRows ──────────────────────────────────────────── */}
      <section id="versaeumnisse" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("versaeumnisse.eyebrow")}
              titel={t("versaeumnisse.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={pains} />
          </div>
        </div>
      </section>

      {/* ── Wochenroutine — Tabelle als Umsetzungsplan ──────────────────────── */}
      <section id="routine" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("routine.eyebrow")}
              titel={t("routine.titel")}
              sub={t("routine.sub")}
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-subtle">
                    <th className="t-label py-3 pr-6 font-semibold !text-ink-cream">
                      {t("routine.th_termin")}
                    </th>
                    <th className="t-label py-3 pr-6 font-semibold">{t("routine.th_aufgabe")}</th>
                    <th className="t-label py-3 font-semibold">{t("routine.th_zeitaufwand")}</th>
                  </tr>
                </thead>
                <tbody>
                  {routine.map((row) => (
                    <tr key={row.tag} className="border-b border-line-subtle">
                      <td className="t-data py-4 pr-6 !text-ink-cream">{row.tag}</td>
                      <td className="t-body py-4 pr-6">{row.aufgabe}</td>
                      <td className="t-body py-4 tnum">{row.minuten}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <p className="t-body mt-8 max-w-[640px]">
              {t("routine.text_vor")}{" "}
              <Link href="/bewertungen-aufbauen" className="ref-link">
                {t("routine.link")}
              </Link>
              {t("routine.text_nach")}
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

      {/* ── Beweis-Anriss — RIEGEL-Relaunch ─────────────────────────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[46ch]">{t("beweis.titel")}</p>
          </Reveal>
          <Reveal delay={60}>
            <Link href="/cases/riegel-immobilien" className="ref-link mt-8 inline-block">
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
              <Link href="/seo-fuer-immobilienmakler" className="ref-link">
                {t("finale.link2")}
              </Link>
              {t("finale.satz3")}{" "}
              <Link href="/empfehlungsgeschaeft-digitalisieren" className="ref-link">
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
