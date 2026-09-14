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
import { CaseGrid } from "@/components/CaseGrid";
import { caseBySlug } from "@/lib/cases";

/**
 * Zielgruppenseite E-Mail-Marketing für Immobilienmakler. Eigener Pain
 * (der ungeöffnete Newsletter, schlummernde CRM-Kontakte neben teuer
 * eingekauften Leads, das vergessene Follow-up, Massen-Mails, die nach
 * Massen-Mail riechen) und ein eigener Mechanismus (Follow-up-Automation,
 * personalisierte Datenmails statt Newsletter, Terminanfragen nach
 * Dringlichkeit, Wochenbericht statt Bauchgefühl). Gleiche XXL-Systematik
 * und Element-Bibliothek wie marketing-bautraeger und
 * marketing-projektentwickler. Foto 13 ist die für dieses Leaf zugeteilte
 * Aufnahme — im Gegensatz zu den Querformaten 1–11 ein Hochformat, die
 * Hero-Plate übernimmt deshalb die Hochformat-Proportionen (analog
 * onoffice-website statt marketing-bautraeger).
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "email-marketing-immobilienmakler");
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

export default async function EmailMarketingImmobilienmaklerPage() {
  const c = await getContent();
  const t = seitenTexte(c, "email-marketing-immobilienmakler");
  const pains = t.liste("pains", ["quote", "answer"] as const);
  const schritte = t.liste("schritte", ["titel", "text"] as const);
  const faqs = t.liste("faq", ["q", "a"] as const);
  const riegel = caseBySlug("riegel-immobilien");

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

      {/* ── Hero — ~70vh, Foto 13 (Hochformat), Floating Card mit Studio-Zahl ── */}
      <section className="relative bg-bg-base">
        <div className="relative min-h-[70dvh]">
          <div className="relative mt-4 aspect-[4/5] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[40vw] lg:rounded-bl-[48px]">
            <Image
              src={maklerAsset(13)}
              alt="Premium-Büroszene aus der beuwy-Kampagnenwelt, Symbolbild für automatisiertes E-Mail-Marketing im Maklerbüro"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "50% 14%" }}
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

          <div className="relative z-10 mx-auto flex min-h-full max-w-[1200px] flex-col justify-center px-6 pb-14 pt-28 lg:min-h-[70dvh] lg:max-w-none lg:pl-[max(24px,calc((100vw-1280px)/2))] lg:pr-[43vw] lg:pt-24">
            <p className="t-label !text-ink-yellow">{t("hero.eyebrow")}</p>
            <h1 className="mt-5 font-display text-[clamp(34px,4.4vw,58px)] font-bold leading-[1.05] tracking-[-0.03em] text-ink-cream [text-wrap:balance]">
              {rich(t("hero.titel"))}
            </h1>
            <p className="t-body-lg mt-6 max-w-[36rem]">
              {t("hero.text_vor")}{" "}
              <Highlight>{t("hero.text_hervor")}</Highlight>
              {t("hero.text_nach")}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta label={t("hero.cta")} />
              <span className="t-small w-full sm:w-auto">{t("hero.cta_note")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem — ungeöffneter Newsletter, schlummerndes CRM, vergessenes Follow-up ── */}
      <section id="problem" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("problem.eyebrow")}
              titel={t("problem.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={pains} />
          </div>
        </div>
      </section>

      {/* ── Mechanismus — 4-Stufen-Rail, Unternehmensberatung statt Agentur ── */}
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

      {/* ── Der Unterschied — GelbeKarte, Postfach als Teil der regionalen Dominanz ── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label={t("unterschied.label")} titel={t("unterschied.titel")} glyph>
              {t("unterschied.text")}
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Riegel-Case, Rückrufregel als konkreter Beleg ────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[46ch]">{t("beweis.titel")}</p>
            <p className="t-body mt-4 max-w-[54ch]">{t("beweis.text")}</p>
          </Reveal>
          {riegel ? (
            <div className="mt-10">
              <CaseGrid cases={[riegel]} />
            </div>
          ) : null}
          <Reveal delay={60}>
            <Link href="/cases" className="ref-link mt-8 inline-block">
              {t("beweis.link")}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ — 5 Fragen, FaqAccordion + JSON-LD oben im Head ─────────────── */}
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

      {/* ── Finale — CTA, Links zu Hub + Cases im Text ──────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">{t("finale.label")}</p>
            <h2 className="t-h2 mt-4">{rich(t("finale.titel"))}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[52ch]">
              {t("finale.text_vor")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.link_hub")}
              </Link>
              {t("finale.text_mitte")}{" "}
              <Link href="/cases" className="ref-link">
                {t("finale.link_cases")}
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
