import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GRUENDER_FOTO, maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { getContent } from "@/lib/content";
import {
  GelbeKarte,
  Highlight,
  LogoSlot,
  MARKEN_SLUGS,
  SektionsKopf,
  slugifyMarke,
} from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { seitenTexte } from "@/lib/texte/lesen";

/**
 * Über-uns-Seite (Alex, 26.08: „über uns ausarbeiten und high end
 * texten"). Dramaturgie: Haltung → drei Stationen als Story-Karten
 * (Vision Group, Königswege, acta — mit Logos) → Arbeitsweise →
 * kompakte Gründer-Karte. Kein Personenkult (BRIEF §7): die Firma
 * und die Häuser tragen die Seite, der Gründer bekommt eine Karte,
 * kein Kapitel. GRUENDER_FOTO ist echt — bewusst OHNE AiPille.
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "ueber-uns");
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

export default async function UeberUnsPage() {
  const c = await getContent();
  const t = seitenTexte(c, "ueber-uns");
  const stationen = t.liste("stationen", ["marke", "zeitraum", "titel", "text"] as const);
  const arbeitsweise = t.liste("arbeitsweise", ["titel", "text"] as const);
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

      {/* ── Hero — die Firma, nicht die Person ──────────────────────────── */}
      <section className="relative bg-bg-base">
        <div className="relative min-h-[70dvh]">
          <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[52vw] lg:rounded-bl-[48px]">
            <Image
              src={maklerAsset(11)}
              alt="Beratungsszene aus der beuwy-Kampagnenwelt in der Golden Hour"
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "50% 40%" }}
            />
            <span className="pointer-events-none absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r from-bg-base to-transparent lg:block" />
            <AiPille className="!bottom-auto !top-4 right-4" />

            <div className="absolute bottom-8 left-6 max-w-[13.5rem] rounded-2xl bg-white/95 p-5 backdrop-blur-sm lg:bottom-12 lg:left-10">
              <p className="t-label !text-[10px]">{t("hero.karte_label")}</p>
              <p className="mt-1 font-display text-[40px] font-bold leading-none tracking-[-0.02em] text-ink-cream tnum">
                {c["mk.stats.s3_wert"]}
              </p>
              <p className="mt-1 text-[13px] leading-snug text-ink-muted">
                {c["mk.stats.s3_label"]}
              </p>
            </div>
          </div>

          <div className="relative z-10 mx-auto flex min-h-full max-w-[1200px] flex-col justify-center px-6 pb-14 pt-28 lg:min-h-[70dvh] lg:max-w-none lg:pl-[max(40px,calc((100vw-1120px)/2))] lg:pr-[55vw] lg:pt-24">
            <p className="t-label !text-ink-yellow">{t("hero.eyebrow")}</p>
            <h1 className="mt-5 font-display text-[clamp(32px,3.5vw,50px)] font-bold leading-[1.05] tracking-[-0.03em] text-ink-cream [text-wrap:balance]">
              {rich(t("hero.titel"))}
            </h1>
            <p className="t-body-lg mt-6 max-w-[36rem]">
              {t("hero.sub_vor")}{" "}
              <Highlight>{t("hero.sub_mark")}</Highlight>{" "}
              {t("hero.sub_nach")}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta label={t("hero.cta_label")} />
              <span className="t-small w-full sm:w-auto">{t("hero.antwort")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Haltung — warum Beratung, nicht Agentur ─────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("haltung.eyebrow")}
              titel={t("haltung.titel")}
              className="max-w-[760px]"
            />
          </Reveal>
          <Reveal delay={60}>
            <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-6">
                <p className="t-body-lg">{t("haltung.spalte1_p1")}</p>
                <p className="t-body-lg">{t("haltung.spalte1_p2")}</p>
              </div>
              <div className="space-y-6">
                <p className="t-body-lg">
                  {t("haltung.spalte2_p1_vor")}{" "}
                  <Highlight>{t("haltung.spalte2_p1_mark")}</Highlight>
                  {t("haltung.spalte2_p1_nach")}
                </p>
                <p className="t-body-lg">{t("haltung.spalte2_p2")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Drei Stationen — Story-Karten mit Logos ─────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("stationen.eyebrow")}
              titel={t("stationen.titel")}
              sub={t("stationen.sub")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {stationen.map((s, i) => (
              <Reveal key={s.marke} delay={i * 70}>
                <article className="flex h-full flex-col rounded-[28px] border border-line-subtle bg-white px-7 py-8">
                  <span className="flex h-6 items-center">
                    <LogoSlot
                      name={s.marke}
                      slug={MARKEN_SLUGS[s.marke] ?? slugifyMarke(s.marke)}
                      hoehe={20}
                    />
                  </span>
                  <p className="t-label mt-6 !text-[10px]">{s.zeitraum}</p>
                  <h3 className="mt-3 text-[19px] font-semibold leading-snug tracking-[-0.015em] text-ink-cream">
                    {s.titel}
                  </h3>
                  <p className="mt-4 border-t border-line-subtle pt-4 text-[14.5px] leading-[1.65] text-ink-muted">
                    {s.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Arbeitsweise — vier Zusagen ─────────────────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("arbeitsweise.eyebrow")}
              titel={t("arbeitsweise.titel")}
              className="max-w-[680px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {arbeitsweise.map((punkt, i) => (
              <Reveal key={punkt.titel} delay={i * 60}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="t-h3 mt-4">{punkt.titel}</p>
                  <p className="t-body mt-3">{punkt.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gründer — eine Karte, kein Kapitel (kein Personenkult) ──────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[880px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <div className="flex flex-col items-start gap-8 rounded-[28px] border border-line-subtle bg-white p-8 sm:flex-row sm:items-center lg:p-10">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl">
                <Image
                  src={GRUENDER_FOTO}
                  alt="Alexander Pütter, Gründer von beuwy"
                  fill
                  sizes="112px"
                  className="object-cover"
                  style={{ objectPosition: "50% 30%" }}
                />
              </div>
              <div>
                <p className="t-label !text-[10.5px]">{t("gruender.label")}</p>
                <p className="mt-2 text-[19px] font-semibold text-ink-cream">{t("gruender.name")}</p>
                <p className="t-body mt-3 max-w-[46ch]">
                  {t("gruender.text_vor")}{" "}
                  <Highlight>{t("gruender.text_mark")}</Highlight>{" "}
                  {t("gruender.text_nach")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Pointe ──────────────────────────────────────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label={t("unterschied.label")} titel={t("unterschied.titel")} glyph>
              {t("unterschied.text")}
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
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

      {/* ── Finale ──────────────────────────────────────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">{t("finale.label")}</p>
            <h2 className="t-h2 mt-4">{rich(t("finale.titel"))}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[52ch]">
              {t("finale.satz_vor")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.link1")}
              </Link>
              {t("finale.satz_mitte")}{" "}
              <Link href="/cases" className="ref-link">
                {t("finale.link2")}
              </Link>
              {t("finale.satz_nach")}
            </p>
            <div className="mt-9 flex justify-center">
              <ZusammenarbeitCta label={t("hero.cta_label")} />
            </div>
            <p className="t-small mt-4">{t("finale.antwort")}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
