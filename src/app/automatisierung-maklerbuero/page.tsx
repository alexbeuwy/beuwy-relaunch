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
 * Wissensseite (R3 Welle 2, Cluster K) — /automatisierung-maklerbuero.
 * Kompakter Wissens-Kopf beantwortet die Suchfrage wörtlich. Hauptteil:
 * eine Vergleichstabelle mit 9 Abläufen (Vorher/Nachher-Richtwerte), ein
 * Zweispalter zum Ticketsystem-Prinzip, eine Checkliste "was beim Menschen
 * bleibt". GelbeKarte, Beweis-Anriss (RIEGEL-Rückrufregel aus cases.ts).
 * FAQ + FAQPage-JSON-LD. Foto 14 (Hochformat) laut R3-SEITENPLAN.json.
 *
 * R11: alle Texte laufen über Studio-Keys, siehe
 * src/lib/texte/seiten/automatisierung-maklerbuero.ts.
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "automatisierung-maklerbuero");
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

export default async function AutomatisierungMaklerbueroPage() {
  const c = await getContent();
  const t = seitenTexte(c, "automatisierung-maklerbuero");
  const ablaeufe = t.liste("ablaeufe", ["ablauf", "manuell", "automatisiert"] as const);
  const bleibtBeimMenschen = t.liste("beimenschen", ["punkt"] as const);
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
                src={maklerAsset(14)}
                alt="Makler prüft eine Übersicht laufender Vorgänge am Bildschirm, Kalender und Notizen daneben"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover object-top"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Die 9 Abläufe — Vergleichstabelle Vorher/Nachher ────────────────── */}
      <section id="ablaeufe" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("ablaeufe.eyebrow")}
              titel={t("ablaeufe.titel")}
              sub={t("ablaeufe.sub")}
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-subtle">
                    <th className="t-label py-3 pr-6 font-semibold">{t("ablaeufe.spalte_ablauf")}</th>
                    <th className="t-label py-3 pr-6 font-semibold">{t("ablaeufe.spalte_manuell")}</th>
                    <th className="t-label py-3 font-semibold !text-ink-cream">{t("ablaeufe.spalte_automatisiert")}</th>
                  </tr>
                </thead>
                <tbody>
                  {ablaeufe.map((row) => (
                    <tr key={row.ablauf} className="border-b border-line-subtle">
                      <td className="t-data py-4 pr-6 !text-ink-cream">{row.ablauf}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.manuell}</td>
                      <td className="t-body py-4 tnum">{row.automatisiert}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Ticketsystem-Prinzip — Zweispalter ───────────────────────────────── */}
      <section id="ticketsystem" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("ticketsystem.eyebrow")}
              titel={t("ticketsystem.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[24px] border border-line-subtle bg-bg-elevated p-7">
                <p className="t-label">{t("ticketsystem.ohne_label")}</p>
                <p className="t-body mt-4">
                  {t("ticketsystem.ohne_text")}
                </p>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className="h-full rounded-[24px] border-l-2 border-akzent bg-bg-elevated p-7">
                <p className="t-label">{t("ticketsystem.mit_label")}</p>
                <p className="t-body mt-4">
                  {t("ticketsystem.mit_text")}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Was beim Menschen bleibt — Checkliste ────────────────────────────── */}
      <section id="beim-menschen" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("beimenschen.eyebrow")}
              titel={t("beimenschen.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <ul className="mt-10 max-w-[640px] space-y-4">
              {bleibtBeimMenschen.map((p) => (
                <li key={p.punkt} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-akzent-wash">
                    <RiCheckLine className="h-4 w-4 text-ink-cream" />
                  </span>
                  <span className="t-body">{p.punkt}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label={t("unterschied.label")} titel={t("unterschied.titel")} glyph>
              {t("unterschied.text")}
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — RIEGEL, Rückrufregel nach sechs Monaten ─────────── */}
      <section id="beweis" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[46ch]">
              {t("beweis.text")}
            </p>
            <Link href="/cases/riegel-immobilien" className="ref-link mt-6 inline-block">
              {t("beweis.link")}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
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

      {/* ── Finale — CTA + Textlinks zu Hub und Spec-Links ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">{t("finale.label")}</p>
            <h2 className="t-h2 mt-4">{rich(t("finale.titel"))}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[56ch]">
              {t("finale.satz_1")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.link_1")}
              </Link>
              {t("finale.satz_2")}{" "}
              <Link href="/email-marketing-immobilienmakler" className="ref-link">
                {t("finale.link_2")}
              </Link>
              {t("finale.satz_3")}{" "}
              <Link href="/ki-fuer-immobilienmakler" className="ref-link">
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
