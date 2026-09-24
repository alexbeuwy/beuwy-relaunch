import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  RiCalculatorLine,
  RiGalleryLine,
  RiMailSendLine,
  RiMapPin2Line,
  RiPlugLine,
  RiSpeedUpLine,
} from "@remixicon/react";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { Reveal } from "@/components/Reveal";
import { PainRows } from "@/components/PainRows";
import { FaqAccordion } from "@/components/FaqAccordion";
import {
  GelbeKarte,
  Highlight,
  KreisDeko,
  LogoSlot,
  SektionsKopf,
  StempelBadge,
  slugifyMarke,
} from "@/components/MaklerElemente";
import { maklerAsset } from "@/lib/cdn";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";
import stil from "./hero.module.css";

/**
 * D3 — /website-fuer-immobilienmakler (Kernleistung).
 * VSL-Kurzform für eine bereits solution-aware Zielgruppe: Hook (Hero) →
 * Spiegel (Vergleichs-Realität) → Mechanismus (6 Bausteine, Feature→Hebel
 * wörtlich aus BRIEF §8) → Integrations-Beweis → Prozess → Abgrenzung
 * Baukasten → Einwände → Finale. Ein CTA-Wortlaut, ein Foto (18), Element-
 * Bibliothek aus MaklerElemente.
 * Texte: src/lib/texte/seiten/website-fuer-immobilienmakler.ts (Studio-Keys
 * s.website-fuer-immobilienmakler.*).
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "website-fuer-immobilienmakler");
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

const BAUSTEINE_ICONS = [
  RiCalculatorLine,
  RiPlugLine,
  RiSpeedUpLine,
  RiGalleryLine,
  RiMailSendLine,
  RiMapPin2Line,
];

const SOFTWARE = ["onOffice", "FLOWFACT", "Propstack", "JUSTIMMO", "CasaOne"];

export default async function WebsiteFuerImmobilienmaklerPage() {
  const c = await getContent();
  const t = seitenTexte(c, "website-fuer-immobilienmakler");

  const BAUSTEINE = t
    .liste("bausteine", ["label", "satz"] as const)
    .map((b, i) => ({ ...b, icon: BAUSTEINE_ICONS[i] }));
  const PROZESS = t.liste("prozess", ["titel", "text"] as const);
  const SPIEGEL_PAINS = t.liste("spiegelPains", ["quote", "answer"] as const);

  const FAQ_JSON_LD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: t("faq.kosten.frage"),
        acceptedAnswer: {
          "@type": "Answer",
          text: `${t("faq.kosten.antwort_vor")} ${t("faq.kosten.antwort_link")}.`, // studio:ok — Template aus Studio-Keys, kein hartkodierter Satz
        },
      },
      {
        "@type": "Question",
        name: t("faq.dauer.frage"),
        acceptedAnswer: { "@type": "Answer", text: t("faq.dauer.antwort") },
      },
      {
        "@type": "Question",
        name: t("faq.domain.frage"),
        acceptedAnswer: { "@type": "Answer", text: t("faq.domain.antwort") },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      {/* ── 1 · Hero — Foto 18, ~70vh, Hook + Traumzustand ──────────── */}
      <header className="relative bg-bg-base">
        <div className="mx-auto max-w-[1200px] px-6 pt-28 pb-16 lg:px-10 lg:pt-32 lg:pb-20">
          <Link
            href="/immobilienmarketing"
            className="t-small inline-flex items-center gap-1.5 text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream"
          >
            ← {t("hero.zurueck")}
          </Link>

          <div className="mt-10 grid gap-12 lg:mt-14 lg:min-h-[62vh] lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-16">
            <div>
              <p
                className={`t-label !text-ink-yellow ${stil.enter}`}
                style={{ "--i": 0 } as React.CSSProperties}
              >
                {t("hero.eyebrow")}
              </p>
              <h1
                className={`mt-5 font-display text-[clamp(34px,4.2vw,54px)] font-bold leading-[1.06] tracking-[-0.026em] text-ink-cream [text-wrap:balance] ${stil.enter}`}
                style={{ "--i": 1 } as React.CSSProperties}
              >
                {rich(t("hero.titel"))}
              </h1>
              <p
                className={`t-body-lg mt-6 max-w-[34rem] ${stil.enter}`}
                style={{ "--i": 2 } as React.CSSProperties}
              >
                {t("hero.intro_vor")} <Highlight>{t("hero.intro_highlight")}</Highlight>
                {t("hero.intro_nach")}
              </p>

              <div
                className={`mt-9 flex flex-wrap items-center gap-5 ${stil.enter}`}
                style={{ "--i": 3 } as React.CSSProperties}
              >
                <Link
                  href="/anfrage"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-akzent px-7 py-3.5 text-[15px] font-semibold text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-akzent-hover"
                >
                  {t("hero.cta_label")}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="transition-transform duration-(--duration-quick) ease-(--ease-smooth-out) group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    <path
                      d="M1 7h11M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <span className="t-small">{t("hero.cta_hinweis")}</span>
              </div>
            </div>

            <div className={`relative ${stil.mediaEnter}`}>
              <KreisDeko className="-bottom-10 -left-10 lg:-left-14" />
              <div className="relative z-10 aspect-[4/3] w-full overflow-hidden rounded-[28px]">
                <Image
                  src={maklerAsset(18)}
                  alt="Makler bespricht mit Eigentümern den Grundriss auf einem Tablet, warmes Licht, Blick über die Stadt im Hintergrund"
                  fill
                  priority
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
                <AiPille />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── 2 · Spiegel — Vergleichs-Realität, drei rhetorische Fragen ── */}
      <section className="border-t border-line-subtle bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 lg:px-10 lg:py-28">
          <SektionsKopf
            eyebrow={t("spiegel.eyebrow")}
            titel={t("spiegel.titel")}
            sub={t("spiegel.sub")}
            className="max-w-[640px]"
          />
          <div className="mt-12">
            <PainRows items={SPIEGEL_PAINS} />
          </div>
        </div>
      </section>

      {/* ── 3 · Was eine beuwy-Website enthält — Editorial-Rails ────── */}
      <section className="border-t border-line-subtle bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 lg:px-10 lg:py-28">
          <SektionsKopf
            eyebrow={t("bausteine.eyebrow")}
            titel={t("bausteine.titel")}
            sub={t("bausteine.sub")}
            className="max-w-[640px]"
          />
          <div className="mt-14 border-t border-line-subtle">
            {BAUSTEINE.map((b, i) => {
              const Icon = b.icon;
              return (
                <Reveal key={`baustein-${i}`} delay={i * 50}>
                  <div className="grid gap-4 border-b border-line-subtle py-9 sm:grid-cols-[240px_1fr] sm:items-start sm:gap-10 lg:grid-cols-[280px_1fr]">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-akzent-wash text-ink-yellow">
                        <Icon aria-hidden className="size-[18px]" />
                      </span>
                      <p className="t-label !text-ink-dim">{b.label}</p>
                    </div>
                    <p className="font-display text-[20px] font-medium leading-[1.35] tracking-[-0.012em] text-ink-cream sm:text-[22px]">
                      {b.satz}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4 · Integrationen — prominent, Kompatibilität statt Partnerschaft ── */}
      <section className="border-t border-line-subtle bg-bg-elevated">
        <div className="relative mx-auto max-w-[1120px] px-6 py-20 lg:px-10 lg:py-28">
          <StempelBadge
            text={t("integration.stempel")}
            groesse={108}
            className="absolute right-6 top-16 hidden sm:block lg:right-10 lg:top-20"
          />
          <SektionsKopf
            eyebrow={t("integration.eyebrow")}
            titel={t("integration.titel")}
            className="max-w-[600px]"
          />
          <div className="mt-10 flex max-w-[640px] flex-wrap items-center gap-x-10 gap-y-5">
            {SOFTWARE.map((name) => (
              <LogoSlot key={name} name={name} slug={slugifyMarke(name)} />
            ))}
          </div>
          <p className="t-body-lg mt-8 max-w-[600px]">{t("integration.text")}</p>
          <Link href="/onoffice-website" className="btn-link t-small mt-6 inline-block">
            {t("integration.link")} →
          </Link>
        </div>
      </section>

      {/* ── 5 · Prozess — vier Wochen, vier Schritte, schmal ────────── */}
      <section className="border-t border-line-subtle bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-20 lg:px-10 lg:py-28">
          <SektionsKopf eyebrow={t("prozess.eyebrow")} titel={t("prozess.titel")} ausrichtung="mitte" />
          <ol className="mt-14 list-none">
            {PROZESS.map((step, i) => (
              <Reveal key={`prozess-${i}`} delay={i * 60}>
                <li
                  className={`grid grid-cols-[64px_1fr] gap-5 py-7 sm:grid-cols-[88px_1fr] ${
                    i > 0 ? "border-t border-line-subtle" : ""
                  }`}
                >
                  <p className="t-label !text-ink-yellow tnum">Woche {i + 1}</p>
                  <div>
                    <p className="t-h3">{step.titel}</p>
                    <p className="t-body mt-2">{step.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
          <p className="t-small mt-10 border-t border-line-subtle pt-8 text-center">
            {t("prozess.fussnote")}
          </p>
        </div>
      </section>

      {/* ── 6 · Abgrenzung Baukasten — GelbeKarte, ein Fokus-Element ── */}
      <section className="border-t border-line-subtle bg-bg-base">
        <div className="mx-auto max-w-[880px] px-6 py-20 lg:px-10 lg:py-28">
          <GelbeKarte label={t("abgrenzung.label")} titel={t("abgrenzung.titel")} glyph>
            <p>{t("abgrenzung.p1")}</p>
            <p className="mt-3">{t("abgrenzung.p2")}</p>
            <p className="mt-3">
              {t("abgrenzung.p3_vor")}{" "}
              <Link
                href="/bottimmo-alternative"
                className="text-ink-cream underline decoration-ink-cream/40 underline-offset-2 transition-colors duration-(--duration-quick) hover:decoration-ink-cream"
              >
                {t("abgrenzung.p3_link1")}
              </Link>{" "}
              {t("abgrenzung.p3_mitte")}{" "}
              <Link
                href="/maklerwebsite-kosten"
                className="text-ink-cream underline decoration-ink-cream/40 underline-offset-2 transition-colors duration-(--duration-quick) hover:decoration-ink-cream"
              >
                {t("abgrenzung.p3_link2")}
              </Link>
              {t("abgrenzung.p3_nach")}
            </p>
          </GelbeKarte>
        </div>
      </section>

      {/* ── 7 · FAQ — drei Resteinwände ──────────────────────────────── */}
      <section className="border-t border-line-subtle bg-bg-elevated">
        <div className="mx-auto max-w-[760px] px-6 py-20 lg:px-10 lg:py-28">
          <SektionsKopf eyebrow={t("faq.eyebrow")} titel={t("faq.titel")} />
          <div className="mt-12">
            <FaqAccordion
              items={[
                {
                  q: t("faq.kosten.frage"),
                  a: (
                    <>
                      {t("faq.kosten.antwort_vor")}{" "}
                      <Link href="/maklerwebsite-kosten" className="btn-link">
                        {t("faq.kosten.antwort_link")}
                      </Link>
                      .
                    </>
                  ),
                },
                { q: t("faq.dauer.frage"), a: t("faq.dauer.antwort") },
                { q: t("faq.domain.frage"), a: t("faq.domain.antwort") },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── 8 · Finale CTA ───────────────────────────────────────────── */}
      <section className="border-t border-line-subtle bg-bg-base">
        <div className="mx-auto max-w-[680px] px-6 py-24 text-center lg:px-10 lg:py-32">
          <p className="t-label !text-ink-yellow">{t("finale.eyebrow")}</p>
          <h2 className="t-h2 mx-auto mt-4 max-w-[22ch]">{rich(t("finale.titel"))}</h2>
          <p className="t-body-lg mx-auto mt-5 max-w-[46ch]">{t("finale.text")}</p>
          <div className="mt-9 flex flex-col items-center gap-4">
            <Link
              href="/anfrage"
              className="group inline-flex items-center gap-2.5 rounded-full bg-akzent px-7 py-3.5 text-[15px] font-semibold text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-akzent-hover"
            >
              {t("finale.cta_label")}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="transition-transform duration-(--duration-quick) ease-(--ease-smooth-out) group-hover:translate-x-0.5"
                aria-hidden
              >
                <path
                  d="M1 7h11M8 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <span className="t-small">{t("finale.cta_hinweis")}</span>
          </div>
          <p className="t-small mt-10">
            {t("finale.fussnote_vor")}{" "}
            <Link href="/immobilienmarketing" className="btn-link">
              {t("finale.fussnote_link")}
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
