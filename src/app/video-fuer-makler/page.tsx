import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { caseBySlug } from "@/lib/cases";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";

/**
 * Wissensseite (R3 Welle 2, Cluster C) — /video-fuer-makler. Kompakter
 * Wissens-Kopf beantwortet die Suchfrage wörtlich (drei Video-Typen).
 * Hauptteil: Vergleichs-Tabelle Objekt-/Marken-/Personenvideo mit
 * Aufwand/Wirkung/Einsatzort, danach das Hero-Video-Prinzip der eigenen
 * beuwy-Startseite als konkretes Beispiel für ein Markenvideo, das immer
 * mitarbeitet. GelbeKarte, Beweis-Anriss über den Vision-Group-Imagefilm
 * (1.450 WE Höchststand 2022, KKR-JV 160 Mio. €, Zahlen aus cases.ts, mit
 * der dort dokumentierten Höchststand-Einordnung). FAQ + FAQPage-JSON-LD.
 * Foto 4 laut R3-SEITENPLAN.json.
 *
 * R11: alle Texte laufen über Studio-Keys (src/lib/texte/seiten/video-fuer-makler.ts).
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "video-fuer-makler");
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

export default async function VideoFuerMaklerPage() {
  const c = await getContent();
  const t = seitenTexte(c, "video-fuer-makler");
  const vergleich = t.liste("vergleich", ["typ", "aufwand", "wirkung", "einsatz"] as const);
  const faqs = t.liste("faq", ["frage", "antwort"] as const);
  const vision = caseBySlug("vision-group");

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
                src={maklerAsset(4)}
                alt="Kamera auf Schulterstativ filmt einen Rundgang durch ein helles Wohnzimmer"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Vergleich — drei Video-Typen mit Aufwand/Wirkung/Einsatzort ─────── */}
      <section id="vergleich" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf eyebrow={t("vergleich.eyebrow")} titel={t("vergleich.titel")} className="max-w-[720px]" />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-subtle">
                    <th className="t-label py-3 pr-6 font-semibold !text-ink-cream">{t("vergleich.head_typ")}</th>
                    <th className="t-label py-3 pr-6 font-semibold">{t("vergleich.head_aufwand")}</th>
                    <th className="t-label py-3 pr-6 font-semibold">{t("vergleich.head_wirkung")}</th>
                    <th className="t-label py-3 font-semibold">{t("vergleich.head_einsatz")}</th>
                  </tr>
                </thead>
                <tbody>
                  {vergleich.map((row) => (
                    <tr key={row.typ} className="border-b border-line-subtle">
                      <td className="t-data py-4 pr-6 !text-ink-cream">{row.typ}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.aufwand}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.wirkung}</td>
                      <td className="t-body py-4 tnum">{row.einsatz}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Hero-Video-Prinzip — eigene Startseite als lebendes Beispiel ────── */}
      <section id="prinzip" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("prinzip.eyebrow")}
              titel={t("prinzip.titel")}
              sub={t("prinzip.sub")}
              className="max-w-[760px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <p className="t-body mt-8 max-w-[640px]">{t("prinzip.text")}</p>
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

      {/* ── Beweis-Anriss — Vision-Group-Imagefilm ──────────────────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[46ch]">{t("beweis.text")}</p>
            {vision?.video && <p className="t-body mt-4 max-w-[52ch]">{t("beweis.video_text")}</p>}
          </Reveal>
          <Reveal delay={60}>
            <Link href="/cases/vision-group" className="ref-link mt-8 inline-block">
              {t("beweis.link")}
            </Link>
          </Reveal>
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
            <p className="t-body-lg mx-auto mt-5 max-w-[56ch]">
              {t("fazit.text_1")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("fazit.link1")}
              </Link>
              {t("fazit.text_2")}{" "}
              <Link href="/social-media-immobilienmakler" className="ref-link">
                {t("fazit.link2")}
              </Link>{" "}
              {t("fazit.text_3")}{" "}
              <Link href="/immobilienfotografie-briefing" className="ref-link">
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
