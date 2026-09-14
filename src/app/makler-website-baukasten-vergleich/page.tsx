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
 * Wissens-Seite D19 — /makler-website-baukasten-vergleich (R3-SEITENPLAN.json,
 * Cluster V). Angle ist explizit eine Matrix nach Kriterien — anders als die
 * Schwesterseite /immoscout-profil-vs-eigene-website (Zweispalter Portal vs.
 * Website), deshalb hier eine echte Vergleichs-Tabelle nach dem Muster von
 * /bottimmo-erfahrungen (überprüft), mit vier Spalten (Wix/Jimdo, BOTTIMMO,
 * CasaOne, Maßportal) statt zwei. Aussagen zu den einzelnen Systemen bleiben
 * allgemein bekannt/unstrittig, im Zweifel weggelassen — gleiche
 * Zurückhaltung wie /maklersoftware-vergleich. Beweis läuft als Text-Anriss
 * (17 Jahre + RIEGEL), keine zweite CaseGrid, um sich von der Schwesterseite
 * abzusetzen. Foto 4 laut Spec.
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "makler-website-baukasten-vergleich");
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

export default async function MaklerWebsiteBaukastenVergleichPage() {
  const c = await getContent();
  const t = seitenTexte(c, "makler-website-baukasten-vergleich");
  const matrix = t.liste("matrix", ["kriterium", "wix", "bottimmo", "casaone", "massportal"] as const);
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

      {/* ── Wissens-Kopf ─────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[880px] px-6 pb-4 pt-32 lg:px-10 lg:pt-36">
          <Reveal>
            <p className="t-label !text-ink-yellow">{t("kopf.eyebrow")}</p>
            <h1 className="t-display mt-4">
              {rich(t("kopf.titel"))}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              {t("kopf.text_vor")}{" "}
              <Highlight>{t("kopf.text_hervor")}</Highlight>
              {t("kopf.text_nach")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta label={t("kopf.cta")} />
              <span className="t-small w-full sm:w-auto">{t("kopf.cta_note")}</span>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 max-w-[1200px] px-6 lg:px-10">
          <Reveal delay={80}>
            <div className="relative aspect-[21/9] overflow-hidden rounded-[28px]">
              <Image
                src={maklerAsset(4)}
                alt="Makler vergleicht am Bildschirm mehrere Website-Baukästen nebeneinander"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Positionierung — kein „bestes" System, sondern passende Grenze ── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("position.eyebrow")}
              titel={t("position.titel")}
              sub={t("position.sub")}
              className="max-w-[720px]"
            />
          </Reveal>
        </div>
      </section>

      {/* ── Matrix — fünf Kriterien, vier Systeme ───────────────────────── */}
      <section id="matrix" className="bg-bg-base">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("matrix.eyebrow")}
              titel={t("matrix.titel")}
              className="max-w-[760px]"
            />
          </Reveal>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[960px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line-medium">
                  <th className="py-3 pr-4 t-label !text-[10.5px]">{t("matrix.kopf_kriterium")}</th>
                  <th className="py-3 pr-4 t-label !text-[10.5px]">{t("matrix.kopf_wix")}</th>
                  <th className="py-3 pr-4 t-label !text-[10.5px]">{t("matrix.kopf_bottimmo")}</th>
                  <th className="py-3 pr-4 t-label !text-[10.5px]">{t("matrix.kopf_casaone")}</th>
                  <th className="py-3 t-label !text-[10.5px] !text-ink-yellow">{t("matrix.kopf_massportal")}</th>
                </tr>
              </thead>
              <tbody>
                {matrix.map((z) => (
                  <tr key={z.kriterium} className="border-b border-line-subtle align-top">
                    <td className="py-4 pr-4 t-body max-w-[10rem] !text-ink-cream font-medium">
                      {z.kriterium}
                    </td>
                    <td className="py-4 pr-4 t-body max-w-[15rem]">{z.wix}</td>
                    <td className="py-4 pr-4 t-body max-w-[15rem]">{z.bottimmo}</td>
                    <td className="py-4 pr-4 t-body max-w-[15rem]">{z.casaone}</td>
                    <td className="py-4 t-body max-w-[15rem]">{z.massportal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="t-small mt-8 max-w-[62ch]">
            {t("matrix.fussnote_vor")}{" "}
            <Link href="/bottimmo-erfahrungen" className="ref-link">
              {t("matrix.fussnote_link")}
            </Link>
            {t("matrix.fussnote_nach")}
          </p>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als Pointe ─────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label={t("unterschied.label")} titel={t("unterschied.titel")} glyph>
              {t("unterschied.text")}
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Text-Kronzeuge, keine zweite CaseGrid ───────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[52ch]">{t("beweis.text")}</p>
          </Reveal>
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
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* ── Finale — CTA, Textlinks zu Hub und Spec-Links ───────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">{t("finale.label")}</p>
            <h2 className="t-h2 mt-4">{rich(t("finale.titel"))}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              {t("finale.text_vor")}{" "}
              <Link href="/bottimmo-erfahrungen" className="ref-link">
                {t("finale.link_bottimmo")}
              </Link>
              {t("finale.text_mitte")}{" "}
              <Link href="/maklerwebsite-kosten" className="ref-link">
                {t("finale.link_kosten")}
              </Link>
              {t("finale.text_mitte2")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.link_hub")}
              </Link>
              {t("finale.text_nach")}
            </p>
            <div className="mt-9 flex justify-center">
              <ZusammenarbeitCta label={t("finale.cta")} />
            </div>
            <p className="t-small mt-4">{t("finale.cta_note")}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
