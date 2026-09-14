import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";
import { Reveal } from "@/components/Reveal";
import { SektionsKopf, GelbeKarte, Highlight, StempelBadge, KreisDeko } from "@/components/MaklerElemente";

/**
 * /onoffice-website — Leaf D4 (docs/redesign/PLAN.md, Gates in
 * docs/redesign/gates/D4.md). onOffice ist eine fremde Marke: die Seite
 * spricht durchgehend von Andocken/Kompatibilität, nie von Partnerschaft
 * (Alex' Partner-Bewerbung läuft noch, s. Leaf-Auftrag). Foto 13 ist die
 * für diese Seite reservierte, einzige Bilddatei (GOAL Asset-Zuteilung).
 *
 * R11 (14.09): Texte laufen über s.onoffice-website.* (seitenTexte). Die
 * FAQ-JSON-LD wird jetzt aus denselben Keys gebaut wie das sichtbare
 * Accordion (FAQ 3 spiegelt Frage + zusammengesetzte Antwort).
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "onoffice-website");
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

function Pfeil() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:translate-x-0.5"
      aria-hidden
    >
      <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FaqIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-1 shrink-0 text-ink-muted transition-transform duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] group-open:rotate-45"
      aria-hidden
    >
      <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default async function OnOfficeWebsitePage() {
  const t = seitenTexte(await getContent(), "onoffice-website");
  const rails = t.liste("rails", ["nr", "label", "kurz", "text"] as const);
  const wochen = t.liste("wochen", ["nr", "titel", "text"] as const);

  const faq3Antwort = `${t("faq.3.antwort_vor")} ${t("faq.3.antwort_link")}${t("faq.3.antwort_nach")}`; // studio:ok — reine Verkettung von Studio-Keys, kein hartkodierter Text
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: t("faq.1.frage"),
        acceptedAnswer: { "@type": "Answer", text: t("faq.1.antwort") },
      },
      {
        "@type": "Question",
        name: t("faq.2.frage"),
        acceptedAnswer: { "@type": "Answer", text: t("faq.2.antwort") },
      },
      {
        "@type": "Question",
        name: t("faq.3.frage"),
        acceptedAnswer: { "@type": "Answer", text: faq3Antwort },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* ── 1. Hero (~70vh): Text links, Foto 13 als Hochformat-Plate rechts ── */}
      <section className="relative bg-bg-base">
        <div className="relative min-h-[70dvh]">
          <Reveal className="relative mt-4 aspect-[4/5] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[40vw]">
            <div className="relative h-full w-full overflow-hidden rounded-[28px] lg:rounded-l-none lg:rounded-bl-[48px]">
              <Image
                src={maklerAsset(13)}
                alt="Premium-Büroszene aus der beuwy-Kampagnenwelt für Immobilienmakler"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 14%" }}
              />
              <span className="pointer-events-none absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-bg-base to-transparent lg:block" />
              <AiPille className="!bottom-auto !top-4 right-4" />

              {/* Floating Card auf dem Foto (Referenz 1) */}
              <div className="absolute bottom-6 left-6 rounded-2xl bg-white/95 p-4 pr-5 backdrop-blur-sm lg:bottom-10 lg:left-8">
                <p className="t-label !text-[10px]">{t("hero.badge_label")}</p>
                <p className="mt-1 font-display text-[36px] font-bold leading-none tracking-[-0.02em] text-ink-cream tnum">
                  {t("hero.badge_wert")}
                </p>
                <p className="mt-1 text-[12.5px] leading-snug text-ink-muted">{t("hero.badge_text")}</p>
              </div>
            </div>

            {/* Stempel-Badge überlappt die obere Bildecke (Referenz 3) */}
            <StempelBadge
              text={t("hero.stempel_text")}
              groesse={100}
              className="absolute -top-5 right-6 z-10 lg:-top-6 lg:right-10"
            />
          </Reveal>

          {/* Gelber Kreis + Kreislinie im Übergang (Referenz 2) */}
          <span
            className="pointer-events-none absolute bottom-[24%] right-[38vw] z-0 hidden h-24 w-24 rounded-full bg-akzent/45 lg:block"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute bottom-[30%] right-[35vw] z-0 hidden h-40 w-40 rounded-full border border-ink-yellow/20 lg:block"
            aria-hidden
          />

          {/* Textspalte */}
          <div className="relative z-10 mx-auto flex min-h-full max-w-[1200px] flex-col justify-center px-6 pb-16 pt-32 lg:min-h-[70dvh] lg:max-w-none lg:pl-[max(24px,calc((100vw-1280px)/2))] lg:pr-[43vw] lg:pt-28">
            <Link
              href="/immobilienmarketing"
              className="t-label !text-ink-dim inline-flex w-fit items-center gap-1.5 transition-colors duration-[var(--duration-quick)] hover:!text-ink-cream"
            >
              {t("hero.breadcrumb")}
            </Link>
            <Reveal>
              <p className="t-label !text-ink-yellow mt-6">{t("hero.eyebrow")}</p>
              <h1 className="mt-5 font-display text-[clamp(36px,4.4vw,60px)] font-bold leading-[1.05] tracking-[-0.03em] text-ink-cream [text-wrap:balance]">
                {rich(t("hero.titel"))}
              </h1>
              <p className="t-body-lg mt-6 max-w-[34rem]">{t("hero.sub")}</p>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link
                  href="/anfrage"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-akzent px-7 py-3.5 text-[15px] font-semibold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover"
                >
                  {t("hero.cta")}
                  <Pfeil />
                </Link>
                <a
                  href="#andocken"
                  className="text-[14px] font-medium text-ink-muted underline decoration-line-medium underline-offset-4 transition-colors duration-[var(--duration-quick)] hover:text-ink-cream"
                >
                  {t("hero.cta_sekundaer")}
                </a>
              </div>
              <p className="t-small mt-5">{t("hero.cta_hinweis")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 2. Problem: onOffice stark, Auftritt sieht nicht danach aus ── */}
      <section className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,42rem)] lg:gap-16">
          <Reveal>
            <SektionsKopf eyebrow={t("problem.eyebrow")} titel={t("problem.titel")} />
          </Reveal>
          <div className="space-y-5">
            <Reveal>
              <p className="t-body-lg">{t("problem.text1")}</p>
            </Reveal>
            <Reveal delay={60}>
              <p className="t-body">{t("problem.text2")}</p>
            </Reveal>
            <Reveal delay={120}>
              <p className="t-body">
                {t("problem.text3_vor")}{" "}
                <Highlight>{t("problem.text3_highlight")}</Highlight>
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p className="t-body">{t("problem.text4")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 3. Vier Rails direkt ans CRM ── */}
      <section id="andocken" className="border-t border-line-subtle bg-bg-elevated">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
          <Reveal>
            <SektionsKopf
              eyebrow={t("andocken.eyebrow")}
              titel={t("andocken.titel")}
              sub={t("andocken.sub")}
            />
          </Reveal>
          <div className="mt-12 border-t border-line-subtle">
            {rails.map((r, i) => (
              <Reveal key={r.nr} delay={i * 40}>
                <div className="grid gap-3 border-b border-line-subtle py-8 sm:grid-cols-[56px_1fr] sm:gap-8 md:grid-cols-[56px_15rem_1fr] md:gap-10">
                  <span className="font-mono text-[13px] text-ink-dim tnum">{r.nr}</span>
                  <div>
                    <p className="text-[15px] font-semibold text-ink-cream">{r.label}</p>
                    <p className="mt-1 text-[13px] text-ink-muted">{r.kurz}</p>
                  </div>
                  <p className="t-body max-w-[36rem]">{r.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Gelbe Karte — die eine Beruhigung ── */}
      <section className="relative overflow-hidden">
        <KreisDeko className="left-[6%] top-[18%] hidden md:block" />
        <div className="relative mx-auto max-w-[640px] px-6 py-24 md:py-28">
          <Reveal>
            <GelbeKarte label={t("karte.label")} titel={t("karte.titel")} glyph>
              {t("karte.text")}
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── 5a. Prozess — vier Wochen ── */}
      <section className="border-t border-line-subtle">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
          <Reveal>
            <SektionsKopf
              eyebrow={t("ablauf.eyebrow")}
              titel={t("ablauf.titel")}
              sub={t("ablauf.sub")}
            />
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {wochen.map((w, i) => (
              <Reveal key={w.nr} delay={i * 40}>
                <div className="border-t border-line-subtle pt-5">
                  <p className="t-label">{w.nr}</p>
                  <p className="mt-2 text-[15px] font-semibold text-ink-cream">{w.titel}</p>
                  <p className="t-body mt-2">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="t-small mt-12 max-w-[54ch] border-t border-line-subtle pt-8">
            {t("ablauf.hinweis")}
          </p>
        </div>
      </section>

      {/* ── 5b. FAQ ── */}
      <section className="border-t border-line-subtle bg-bg-elevated">
        <div className="mx-auto max-w-[760px] px-6 py-24 md:py-28">
          <Reveal>
            <SektionsKopf eyebrow={t("faq.eyebrow")} titel={t("faq.titel")} />
          </Reveal>

          <div className="mt-10 border-t border-line-subtle">
            <Reveal>
              <details className="group border-b border-line-subtle py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[16px] font-semibold text-ink-cream [&::-webkit-details-marker]:hidden">
                  {t("faq.1.frage")}
                  <FaqIcon />
                </summary>
                <p className="t-body mt-3 max-w-[54ch]">{t("faq.1.antwort")}</p>
              </details>
            </Reveal>
            <Reveal delay={40}>
              <details className="group border-b border-line-subtle py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[16px] font-semibold text-ink-cream [&::-webkit-details-marker]:hidden">
                  {t("faq.2.frage")}
                  <FaqIcon />
                </summary>
                <p className="t-body mt-3 max-w-[54ch]">{t("faq.2.antwort")}</p>
              </details>
            </Reveal>
            <Reveal delay={80}>
              <details className="group border-b border-line-subtle py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[16px] font-semibold text-ink-cream [&::-webkit-details-marker]:hidden">
                  {t("faq.3.frage")}
                  <FaqIcon />
                </summary>
                <p className="t-body mt-3 max-w-[54ch]">
                  {t("faq.3.antwort_vor")}{" "}
                  <Link
                    href="/maklersoftware-vergleich"
                    className="text-ink-cream underline decoration-line-medium underline-offset-4"
                  >
                    {t("faq.3.antwort_link")}
                  </Link>
                  {t("faq.3.antwort_nach")}
                </p>
              </details>
            </Reveal>
          </div>

          <p className="t-small mt-10 max-w-[54ch]">{t("faq.rechtshinweis")}</p>
        </div>
      </section>

      {/* ── 6. Finale CTA ── */}
      <section className="bg-akzent-wash">
        <div className="mx-auto max-w-[860px] px-6 py-24 text-center md:py-28">
          <Reveal>
            <p className="t-label">{t("finale.label")}</p>
            <h2 className="t-h2 mt-4">{rich(t("finale.titel"))}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[38rem]">{t("finale.text")}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/anfrage"
                className="group inline-flex items-center gap-2.5 rounded-full bg-akzent px-7 py-3.5 text-[15px] font-semibold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover"
              >
                {t("finale.cta")}
                <Pfeil />
              </Link>
            </div>
            <p className="t-small mt-4">{t("finale.cta_hinweis")}</p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 border-t border-line-subtle pt-8">
              <Link
                href="/immobilienmarketing"
                className="t-small underline decoration-line-medium underline-offset-4 transition-colors duration-[var(--duration-quick)] hover:text-ink-cream"
              >
                {t("finale.link_hub")}
              </Link>
              <Link
                href="/website-fuer-immobilienmakler"
                className="t-small underline decoration-line-medium underline-offset-4 transition-colors duration-[var(--duration-quick)] hover:text-ink-cream"
              >
                {t("finale.link_website")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
