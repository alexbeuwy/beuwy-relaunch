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
import { PainRows } from "@/components/PainRows";
import { FaqAccordion } from "@/components/FaqAccordion";

/**
 * Wissens-Seite — /website-relaunch-makler (R3-SEITENPLAN.json, Cluster C).
 * Angle nennt Redirect-Plan, Inhalts-Inventur und Messpunkte vorher/nachher
 * als konkrete Bausteine, deshalb hier eine Häkchen-Checkliste (Muster aus
 * /ki-richtlinien-maklerbuero) als Hauptbaustein statt Nummern-Liste oder
 * Tabelle. PainRows zeigt danach die typischen Relaunch-Unfälle, die genau
 * dann passieren, wenn die Checkliste übersprungen wird. Beweis läuft als
 * Text-Anriss (RIEGEL), Cluster-Schwester-Link auf /seo-fuer-immobilienmakler.
 * Foto 9 laut Spec.
 *
 * R11: alle Texte laufen über Studio-Keys, siehe
 * src/lib/texte/seiten/website-relaunch-makler.ts. Die drei Checklisten-
 * Gruppen bleiben als feste Struktur im Code, nur Titel + Punkte kommen
 * aus dem Studio (je eine Liste pro Gruppe).
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "website-relaunch-makler");
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

export default async function WebsiteRelaunchMaklerPage() {
  const c = await getContent();
  const t = seitenTexte(c, "website-relaunch-makler");
  const pains = t.liste("pains", ["zitat", "antwort"] as const);
  const faqs = t.liste("faq", ["frage", "antwort"] as const);

  const GRUPPEN = [
    { titel: t("checkliste.gruppe1_titel"), punkte: t.liste("checkliste_punkte1", ["punkt"] as const) },
    { titel: t("checkliste.gruppe2_titel"), punkte: t.liste("checkliste_punkte2", ["punkt"] as const) },
    { titel: t("checkliste.gruppe3_titel"), punkte: t.liste("checkliste_punkte3", ["punkt"] as const) },
  ];

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
                src={maklerAsset(9)}
                alt="Bildschirm zeigt eine Redirect-Tabelle während des Website-Relaunchs"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Typische Relaunch-Unfälle — PainRows ────────────────────────── */}
      <section id="unfaelle" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("unfaelle.eyebrow")}
              titel={t("unfaelle.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={pains.map((p) => ({ quote: p.zitat, answer: p.antwort }))} />
          </div>
        </div>
      </section>

      {/* ── Die Checkliste — drei Gruppen, Häkchen-Punkte ───────────────── */}
      <section id="checkliste" className="bg-bg-base">
        <div className="mx-auto max-w-[860px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("checkliste.eyebrow")}
              titel={t("checkliste.titel")}
              className="max-w-[640px]"
            />
          </Reveal>
          <div className="mt-12 space-y-10">
            {GRUPPEN.map((gruppe, gi) => (
              <Reveal key={gruppe.titel} delay={gi * 60}>
                <div>
                  <p className="t-label !text-ink-dim">{gruppe.titel}</p>
                  <div className="mt-4 space-y-4">
                    {gruppe.punkte.map((p) => (
                      <div key={p.punkt} className="flex items-start gap-3 border-b border-line-subtle pb-4">
                        <span className="mt-0.5">
                          <HaekchenIcon />
                        </span>
                        <p className="t-body">{p.punkt}</p>
                      </div>
                    ))}
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
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              {t("beweis.text")}
            </p>
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
            <FaqAccordion items={faqs.map((f) => ({ q: f.frage, a: f.antwort }))} />
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
              {t("finale.satz_1")}{" "}
              <Link href="/seo-fuer-immobilienmakler" className="ref-link">
                {t("finale.link_1")}
              </Link>
              {t("finale.satz_2")}{" "}
              <Link href="/makler-website-fehler" className="ref-link">
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
