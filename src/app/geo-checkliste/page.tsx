import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";

/**
 * Wissens-Seite — /geo-checkliste (R3-SEITENPLAN.json, Cluster K). Angle
 * verlangt explizit eine abarbeitbare Checkliste mit Prüfmethode je Punkt —
 * deshalb hier keine Nummern-Liste als Hauptbaustein, sondern 21
 * Häkchen-Punkte in vier Gruppen (Daten, Struktur, Antworten, Konsistenz),
 * jeder mit eigener Prüfmethode. Titel verspricht "21 Punkte", die Zahl
 * wird eingehalten (5+5+6+5). Foto 19 laut Spec.
 * Texte: src/lib/texte/seiten/geo-checkliste.ts (Studio-Keys s.geo-checkliste.*).
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "geo-checkliste");
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

type Punkt = { titel: string; text: string; pruefung: string };
type Gruppe = { name: string; punkte: Punkt[] };

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

function HaekchenIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      className="shrink-0 text-ink-yellow"
      aria-hidden
    >
      <circle cx="7.5" cy="7.5" r="7" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M4.6 7.7l1.8 1.8 4-4.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function GeoChecklistePage() {
  const c = await getContent();
  const t = seitenTexte(c, "geo-checkliste");

  const gruppenNamen = t.liste("gruppen", ["name"] as const);
  const GRUPPEN: Gruppe[] = [
    { name: gruppenNamen[0]?.name ?? "", punkte: t.liste("punkteDaten", ["titel", "text", "pruefung"] as const) },
    { name: gruppenNamen[1]?.name ?? "", punkte: t.liste("punkteStruktur", ["titel", "text", "pruefung"] as const) },
    { name: gruppenNamen[2]?.name ?? "", punkte: t.liste("punkteAntworten", ["titel", "text", "pruefung"] as const) },
    { name: gruppenNamen[3]?.name ?? "", punkte: t.liste("punkteKonsistenz", ["titel", "text", "pruefung"] as const) },
  ];
  const GESAMT = GRUPPEN.reduce((n, g) => n + g.punkte.length, 0);

  const FAQS = t.liste("faq", ["frage", "antwort"] as const).map((f) => ({ q: f.frage, a: f.antwort }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
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
            <p className="t-label !text-ink-yellow">{t("hero.eyebrow")}</p>
            <h1 className="t-display mt-4">{rich(t("hero.titel"))}</h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              {t("hero.intro")}{" "}
              <Highlight>{t("hero.intro_highlight")}</Highlight>
              .
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta label={t("hero.cta_label")} />
              <span className="t-small w-full sm:w-auto">{t("hero.cta_hinweis")}</span>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 max-w-[1200px] px-6 lg:px-10">
          <Reveal delay={80}>
            <div className="relative aspect-[21/9] overflow-hidden rounded-[28px]">
              <Image
                src={maklerAsset(19)}
                alt="Person geht eine Checkliste auf einem Tablet Punkt für Punkt durch"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Checkliste — vier Gruppen à 5-6 Punkte mit Prüfmethode ──────── */}
      {GRUPPEN.map((gruppe, gi) => (
        <section
          key={`gruppe-${gi}`}
          id={`gruppe-${gi + 1}`}
          className={gi % 2 === 0 ? "bg-bg-elevated" : "bg-bg-base"}
        >
          <div className="mx-auto max-w-[900px] px-6 py-16 md:py-20 lg:px-10">
            <Reveal>
              <p className="t-label !text-ink-yellow">
                Gruppe {gi + 1} von {GRUPPEN.length}
              </p>
              <h2 className="t-h2 mt-3">{gruppe.name}</h2>
            </Reveal>
            <div className="mt-10 space-y-6">
              {gruppe.punkte.map((punkt, i) => (
                <Reveal key={`punkt-${gi}-${i}`} delay={i * 40}>
                  <div className="flex items-start gap-3 border-b border-line-subtle pb-6">
                    <span className="mt-1">
                      <HaekchenIcon />
                    </span>
                    <div>
                      <p className="t-body font-medium !text-ink-cream">{punkt.titel}</p>
                      <p className="t-body mt-1.5">{punkt.text}</p>
                      <p className="t-small mt-2 !text-ink-dim">Prüfmethode: {punkt.pruefung}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

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

      {/* ── Beweis-Anriss ────────────────────────────────────────────────── */}
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
            <SektionsKopf eyebrow={t("faq.eyebrow")} titel={t("faq.titel")} ausrichtung="mitte" />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
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
              <Link href="/geo-fuer-immobilienmakler" className="ref-link">
                {t("finale.text_link1")}
              </Link>
              {t("finale.text_mitte1")}{" "}
              <Link href="/ai-overviews-immobilien" className="ref-link">
                {t("finale.text_link2")}
              </Link>
              {t("finale.text_mitte2")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.text_link3")}
              </Link>
              .
            </p>
            <div className="mt-9 flex justify-center">
              <ZusammenarbeitCta label={t("finale.cta_label")} />
            </div>
            <p className="t-small mt-4">{t("finale.cta_hinweis")}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
