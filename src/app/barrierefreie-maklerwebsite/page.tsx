import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { getContent } from "@/lib/content";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { seitenTexte } from "@/lib/texte/lesen";

/**
 * Wissens-Seite — /barrierefreie-maklerwebsite (R3-SEITENPLAN.json, Cluster
 * C, Rechtsthema BFSG). Angle verlangt eine Einordnung ohne Panik plus die
 * 10 wirksamsten Maßnahmen, deshalb hier eine Nummern-Liste (zehn Punkte)
 * statt Checkliste — /website-relaunch-makler nutzt die Häkchen-Checkliste
 * bereits, hier soll die Bauplan-Vorgabe "nicht jede Seite gleich" sichtbar
 * bleiben. Rechtsteil bleibt bewusst gehedged (BFSG-Anwendungsbereich ist
 * eine Einzelfallfrage, keine Rechtsberatung), passend zur Vorgabe für
 * BFSG/DSGVO-Themen. Beweis läuft als Text-Anriss (17 Jahre). Foto 10 laut
 * Spec.
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "barrierefreie-maklerwebsite");
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

export default async function BarrierefreieMaklerwebsitePage() {
  const c = await getContent();
  const t = seitenTexte(c, "barrierefreie-maklerwebsite");
  const massnahmen = t.liste("massnahmen", ["titel", "text"] as const);
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

      {/* ── Wissens-Kopf ─────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[880px] px-6 pb-4 pt-32 lg:px-10 lg:pt-36">
          <Reveal>
            <p className="t-label !text-ink-yellow">{t("kopf.eyebrow")}</p>
            <h1 className="t-display mt-4">{rich(t("kopf.titel"))}</h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              {t("kopf.sub_vor")}{" "}
              <Highlight>{t("kopf.sub_mark")}</Highlight>
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
                src={maklerAsset(10)}
                alt="Bildschirm zeigt eine Maklerwebsite mit hohem Kontrast und sichtbarem Tastatur-Fokus"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Warum es hilft — kurzer Nutzen-Absatz vor der Liste ─────────── */}
      <section id="nutzen" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("nutzen.eyebrow")}
              titel={t("nutzen.titel")}
              sub={t("nutzen.sub")}
              className="max-w-[720px]"
            />
          </Reveal>
        </div>
      </section>

      {/* ── Die 10 Maßnahmen — Nummern-Liste ─────────────────────────────── */}
      <section id="massnahmen" className="bg-bg-base">
        <div className="mx-auto max-w-[900px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("massnahmen.eyebrow")}
              titel={t("massnahmen.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 space-y-8">
            {massnahmen.map((punkt, i) => (
              <Reveal key={punkt.titel} delay={i * 30}>
                <div className="grid gap-3 border-t border-line-subtle pt-6 sm:grid-cols-[3rem_1fr]">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <p className="t-h3">{punkt.titel}</p>
                    <p className="t-body mt-2">{punkt.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als Pointe ─────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <GelbeKarte label={t("unterschied.label")} titel={t("unterschied.titel")} glyph>
            {t("unterschied.text")}
          </GelbeKarte>
        </div>
      </section>

      {/* ── Beweis-Anriss ────────────────────────────────────────────────── */}
      <section id="beweis" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[52ch]">{t("beweis.titel")}</p>
          </Reveal>
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
            <FaqAccordion items={faq} />
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
              {t("finale.satz1")}{" "}
              <Link href="/website-relaunch-makler" className="ref-link">
                {t("finale.link1")}
              </Link>
              {t("finale.satz2")}{" "}
              <Link href="/makler-website-fehler" className="ref-link">
                {t("finale.link2")}
              </Link>
              {t("finale.satz3")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
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
