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
 * /geo-fuer-immobilienmakler — GEO-Leaf (Generative Engine Optimization),
 * gleiche XXL-Systematik wie marketing-bautraeger/ki-fuer-immobilienmakler.
 * Kein CaseGrid: cases.ts geprüft (RIEGEL/Vision Group/Königswege), aber
 * keiner der belegten Fälle behauptet eine KI-Zitierung — die Beweis-
 * Sektion arbeitet stattdessen mit der Studio-Zahl mk.stats.s3 (17 Jahre),
 * um keine Fallstudie in eine Behauptung zu pressen, die sie nicht trägt.
 * Foto 19 (quadratisch, BRIEF §4/§9-Zuteilung) läuft in derselben
 * Hero-Plate wie die querformatigen Fotos anderer R2-Seiten — object-cover
 * füllt den Container unabhängig vom Quellformat, kein eigenes Layout
 * nötig. Querverweis auf die Schwesterseite /seo-fuer-immobilienmakler
 * sitzt im Beweis-Block (die Route existiert noch nicht, Link wird laut
 * Auftrag einfach gesetzt).
 *
 * R11 (14.09): mk.*-Keys bleiben (Floating-Card-Zahlen), alle übrigen
 * Texte laufen jetzt über s.geo-fuer-immobilienmakler.* (seitenTexte).
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "geo-fuer-immobilienmakler");
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

function ZusammenarbeitCta({ text, className = "" }: { text: string; className?: string }) {
  return (
    <Link
      href="/anfrage"
      className={`group inline-flex items-center gap-2.5 rounded-full bg-akzent px-7 py-3.5 text-[15px] font-semibold text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-akzent-hover ${className}`}
    >
      {text}
      <PfeilRechts className="transition-transform duration-(--duration-quick) ease-(--ease-smooth-out) group-hover:translate-x-0.5" />
    </Link>
  );
}

export default async function GeoFuerImmobilienmaklerPage() {
  const c = await getContent();
  const t = seitenTexte(c, "geo-fuer-immobilienmakler");
  const pains = t.liste("pains", ["zitat", "antwort"] as const);
  const schritte = t.liste("schritte", ["titel", "text"] as const);
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

      {/* ── Hero — Foto 19, Floating Card mit Studio-Zahl s4 ─────────────── */}
      <section className="relative bg-bg-base">
        <div className="relative min-h-[70dvh]">
          <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[52vw] lg:rounded-bl-[48px]">
            <Image
              src={maklerAsset(19)}
              alt="Makler bespricht mit einer Kollegin eine Objektübersicht am Tisch, warmes Licht im Büro"
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "50% 38%" }}
            />
            <span className="pointer-events-none absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r from-bg-base to-transparent lg:block" />
            <AiPille className="!bottom-auto !top-4 right-4" />

            <div className="absolute bottom-8 left-6 max-w-[13.5rem] rounded-2xl bg-white/95 p-5 backdrop-blur-sm lg:bottom-12 lg:left-10">
              <p className="t-label !text-[10px]">{t("hero.messbar_label")}</p>
              <p className="mt-1 font-display text-[40px] font-bold leading-none tracking-[-0.02em] text-ink-cream tnum">
                {c["mk.stats.s4_wert"]}
              </p>
              <p className="mt-1 text-[13px] leading-snug text-ink-muted">
                {c["mk.stats.s4_label"]}
              </p>
            </div>
          </div>

          <div className="relative z-10 mx-auto flex min-h-full max-w-[1200px] flex-col justify-center px-6 pb-14 pt-28 lg:min-h-[70dvh] lg:max-w-none lg:pl-[max(24px,calc((100vw-1280px)/2))] lg:pr-[55vw] lg:pt-24">
            <p className="t-label !text-ink-yellow">{t("hero.eyebrow")}</p>
            <h1 className="mt-5 font-display text-[clamp(34px,4.4vw,58px)] font-bold leading-[1.05] tracking-[-0.03em] text-ink-cream [text-wrap:balance]">
              {rich(t("hero.titel"))}
            </h1>
            <p className="t-body-lg mt-6 max-w-[36rem]">
              {t("hero.sub_vor")}{" "}
              <Highlight>{t("hero.sub_highlight")}</Highlight>
              {t("hero.sub_nach")}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta text={t("hero.cta")} />
              <span className="t-small w-full sm:w-auto">{t("hero.cta_hinweis")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem — literale Definition, dann Pain-Erzählung ──────────── */}
      <section id="problem" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("problem.eyebrow")}
              titel={t("problem.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={40}>
            <p className="t-body-lg mt-6 max-w-[680px]">{t("problem.text")}</p>
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={pains.map((p) => ({ quote: p.zitat, answer: p.antwort }))} />
          </div>
        </div>
      </section>

      {/* ── Mechanismus — 4-Stufen-Rail, konkret statt Buzzword ─────────── */}
      <section id="system" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("system.eyebrow")}
              titel={t("system.titel")}
              sub={t("system.sub")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {schritte.map((schritt, i) => (
              <Reveal key={schritt.titel} delay={i * 60}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="t-h3 mt-4">{schritt.titel}</p>
                  <p className="t-body mt-3">{schritt.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Abgrenzung — GelbeKarte, Unternehmensberatung statt Agentur ── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label={t("abgrenzung.label")} titel={t("abgrenzung.titel")} glyph>
              <p>{t("abgrenzung.text1")}</p>
              <p className="mt-3">{t("abgrenzung.text2")}</p>
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis — Studio-Zahl s3, Querverweis auf die Schwesterseite ── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[46ch]">{rich(t("beweis.titel"))}</p>
          </Reveal>
          <Reveal delay={60}>
            <div className="mt-10 max-w-[420px]">
              <p className="font-display text-[44px] font-bold tracking-[-0.02em] text-ink-cream tnum">
                {c["mk.stats.s3_wert"]}
              </p>
              <p className="t-body mt-2">{c["mk.stats.s3_label"]}</p>
            </div>
            <p className="t-body mt-8 max-w-[52ch]">
              {t("beweis.text_vor")}{" "}
              <Link href="/seo-fuer-immobilienmakler" className="ref-link">
                {t("beweis.text_link")}
              </Link>
              {t("beweis.text_nach")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ — 5 Fragen, FaqAccordion + JSON-LD oben im Head ─────────── */}
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

      {/* ── Finale — CTA, Links zu Hub + Cases im Text ──────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">{t("finale.label")}</p>
            <h2 className="t-h2 mt-4">{rich(t("finale.titel"))}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[52ch]">
              {t("finale.text_vor")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.text_link1")}
              </Link>
              {t("finale.text_mid")}{" "}
              <Link href="/cases" className="ref-link">
                {t("finale.text_link2")}
              </Link>
              {t("finale.text_nach")}
            </p>
            <div className="mt-9 flex justify-center">
              <ZusammenarbeitCta text={t("finale.cta")} />
            </div>
            <p className="t-small mt-4">{t("finale.hinweis")}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
