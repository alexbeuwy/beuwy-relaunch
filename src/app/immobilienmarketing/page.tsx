import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine, RiArrowRightUpLine } from "@remixicon/react";
import { maklerAsset } from "@/lib/cdn";
import { rich } from "@/components/RichText";
import { AiPille } from "@/components/AiPille";
import { Highlight, SektionsKopf, StempelBadge } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { getContent } from "@/lib/content";
import { seitenTexte, type SeitenTexte } from "@/lib/texte/lesen";

/**
 * D1 — SEO-Hub „Immobilienmarketing". Rankt für das Keyword selbst UND
 * verteilt Autorität auf alle Unterseiten (BRIEF §6, GOAL Kriterium 2).
 * XXL-Hero im Systemstil (Foto 10, ~75vh statt MaklerHeros 92dvh) →
 * Einordnungs-Sektion (echter Fließtext, kein Blabla) → Themen-Rails
 * (KEINE Kartengrids) → 4 Säulen als neutrale Karten (Gelb nur im CTA,
 * ein Akzent pro Viewport) → Finale.
 * Texte: src/lib/texte/seiten/immobilienmarketing.ts (Studio-Keys
 * s.immobilienmarketing.*).
 */

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "immobilienmarketing");
  return {
    title: t("meta.titel"),
    description: t("meta.beschreibung"),
    alternates: { canonical: "/immobilienmarketing" },
    openGraph: {
      title: t("meta.og_titel"),
      description: t("meta.og_beschreibung"),
      type: "article",
      locale: "de_DE",
    },
  };
}

/* Reihenfolge = Reihenfolge der registrierten "themen"-Liste (Struktur
   bleibt im Code: Ziel-URLs sind keine Studio-Texte). */
const THEMEN_HREFS = [
  "/leadgenerierung-immobilienmakler",
  "/website-fuer-immobilienmakler",
  "/onoffice-website",
  "/beste-maklerwebsites",
  "/maklerwebsite-kosten",
  "/maklersoftware-vergleich",
  "/bottimmo-alternative",
  "/ki-fuer-immobilienmakler",
  "/immobilienmarketing-agentur",
  "/marketing-projektentwickler",
  "/marketing-bautraeger",
  "/marketing-immobilienvertrieb",
  "/seo-fuer-immobilienmakler",
  "/geo-fuer-immobilienmakler",
  "/social-media-immobilienmakler",
  "/email-marketing-immobilienmakler",
  "/marketing-kapitalanlage-immobilien",
  "/ueber-uns",
];

function CtaPill({ label, className = "" }: { label: string; className?: string }) {
  return (
    <Link
      href="/anfrage"
      className={`group inline-flex items-center gap-2.5 rounded-full bg-akzent px-7 py-3.5 text-[15px] font-semibold text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-akzent-hover ${className}`}
    >
      {label}
      <RiArrowRightUpLine
        aria-hidden="true"
        className="size-4 shrink-0 transition-transform duration-(--duration-quick) ease-(--ease-smooth-out) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}

function HubHero({ t }: { t: SeitenTexte }) {
  return (
    <header className="relative bg-bg-base">
      <div className="relative min-h-[70dvh] lg:min-h-[76dvh]">
        {/* Media-Plate: randlos rechts + oben, linke Kante fadet ins Weiß.
            Mobile: eigener Block über dem Text (wie MaklerHero-Konvention). */}
        <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[52vw] lg:rounded-bl-[48px]">
          <Image
            src={maklerAsset(10)}
            alt="Menschen besprechen Baupläne an einer Kücheninsel im Golden-Hour-Licht"
            fill
            priority
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover"
          />
          <span className="pointer-events-none absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r from-bg-base to-transparent lg:block" />
          <AiPille />

          {/* Layering-Element (REFERENZ-ANALYSE Pflicht): Stempel-Badge auf der Bildecke */}
          <StempelBadge
            text={t("hero.stempel")}
            groesse={100}
            className="absolute right-5 top-5 lg:right-7 lg:top-7"
          />
        </div>

        {/* Textspalte */}
        <div className="relative z-10 mx-auto flex min-h-full max-w-[1120px] flex-col justify-center px-6 pb-14 pt-24 lg:min-h-[76dvh] lg:max-w-none lg:pl-[max(24px,calc((100vw-1120px)/2))] lg:pr-[54vw] lg:pt-24">
          <p className="t-label !text-ink-yellow">{t("hero.eyebrow")}</p>
          <h1 className="t-display mt-5 max-w-[16ch]">{rich(t("hero.titel"))}</h1>
          <p className="t-body-lg mt-6 max-w-[34rem]">
            {t("hero.intro_vor")} <Highlight>{t("hero.intro_highlight")}</Highlight>.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <CtaPill label={t("cta.label")} />
            <span className="t-small">{t("hero.cta_hinweis")}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function EinordnungSection({ t }: { t: SeitenTexte }) {
  return (
    <section className="border-t border-line-subtle bg-bg-base">
      <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
        <Reveal>
          <SektionsKopf
            eyebrow={t("einordnung.eyebrow")}
            titel={t("einordnung.titel")}
            className="max-w-[720px]"
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-10">
          <Reveal delay={0}>
            <h3 className="t-h3">{t("einordnung.spalte1_titel")}</h3>
            <p className="t-body mt-4">
              {t("einordnung.spalte1_p_vor")}{" "}
              <Link
                href="/leadgenerierung-immobilienmakler"
                className="text-ink-cream underline decoration-line-medium underline-offset-4 transition-colors duration-(--duration-quick) hover:decoration-ink-cream"
              >
                {t("einordnung.spalte1_link")}
              </Link>{" "}
              {t("einordnung.spalte1_p_nach")}
            </p>
          </Reveal>

          <Reveal delay={60}>
            <h3 className="t-h3">{t("einordnung.spalte2_titel")}</h3>
            <p className="t-body mt-4">
              {t("einordnung.spalte2_p_vor")}{" "}
              <Link
                href="/website-fuer-immobilienmakler"
                className="text-ink-cream underline decoration-line-medium underline-offset-4 transition-colors duration-(--duration-quick) hover:decoration-ink-cream"
              >
                {t("einordnung.spalte2_link")}
              </Link>{" "}
              {t("einordnung.spalte2_p_nach")}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h3 className="t-h3">{t("einordnung.spalte3_titel")}</h3>
            <p className="t-body mt-4">
              {t("einordnung.spalte3_p_vor")}{" "}
              <Link
                href="/maklersoftware-vergleich"
                className="text-ink-cream underline decoration-line-medium underline-offset-4 transition-colors duration-(--duration-quick) hover:decoration-ink-cream"
              >
                {t("einordnung.spalte3_link")}
              </Link>{" "}
              {t("einordnung.spalte3_p_nach")}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ThemenSection({ t }: { t: SeitenTexte }) {
  const THEMEN = t.liste("themen", ["titel", "text"] as const);
  return (
    <section className="border-t border-line-subtle bg-bg-elevated">
      <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
        <Reveal>
          <SektionsKopf
            eyebrow={t("themen.eyebrow")}
            titel={t("themen.titel")}
            sub={t("themen.sub")}
            className="max-w-[640px]"
          />
        </Reveal>

        <div className="mt-14">
          {THEMEN.map((thema, i) => (
            <Reveal key={THEMEN_HREFS[i]} delay={i * 40}>
              <Link
                href={THEMEN_HREFS[i]}
                className={`group grid grid-cols-1 gap-3 py-8 md:grid-cols-[64px_1fr_auto] md:items-start md:gap-8 md:py-9 ${
                  i > 0 ? "border-t border-line-subtle" : ""
                }`}
              >
                <span className="t-data tnum">{String(i + 1).padStart(2, "0")}</span>
                <div className="md:max-w-[640px]">
                  <h3 className="t-h3 transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) group-hover:text-ink-yellow">
                    {thema.titel}
                  </h3>
                  <p className="t-body mt-2.5">{thema.text}</p>
                </div>
                <span className="mt-1 flex items-center gap-1.5 text-[13px] font-medium text-ink-cream md:mt-0">
                  <span className="hidden md:inline">{t("themen.link_label")}</span>
                  <RiArrowRightLine
                    aria-hidden="true"
                    className="size-4 shrink-0 transition-transform duration-(--duration-quick) ease-(--ease-smooth-out) group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
          <div className="border-t border-line-subtle" />
        </div>
      </div>
    </section>
  );
}

function SaeulenSection({ t }: { t: SeitenTexte }) {
  const SAEULEN = t.liste("saeulen", ["titel", "text"] as const);
  return (
    <section className="border-t border-line-subtle bg-bg-base">
      <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
        <Reveal>
          <SektionsKopf
            eyebrow={t("saeulen.eyebrow")}
            titel={t("saeulen.titel")}
            sub={t("saeulen.sub")}
            ausrichtung="mitte"
          />
        </Reveal>

        {/* Neutrale Karten, ein Akzent pro Viewport (BRIEF §3): das einzige Gelb dieser Sektion ist die CtaPill darunter — vier gelbe Karten nebeneinander wären Akzent-Inflation. */}
        <div className="mx-auto mt-14 grid max-w-[880px] gap-6 sm:grid-cols-2">
          {SAEULEN.map((saeule, i) => (
            <Reveal key={`saeule-${i}`} delay={i * 60}>
              <div className="h-full rounded-[28px] border border-line-subtle bg-bg-base px-7 py-8 sm:px-8 sm:py-9">
                <p className="t-data tnum text-ink-yellow">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-3 font-display text-[26px] leading-[1.18] tracking-[-0.015em] text-ink-cream [font-weight:640] [text-wrap:balance]">
                  {saeule.titel}
                </p>
                <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-muted">{saeule.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <CtaPill label={t("cta.label")} />
        </div>
      </div>
    </section>
  );
}

function FinaleSection({ t }: { t: SeitenTexte }) {
  return (
    <section className="border-t border-line-subtle bg-bg-elevated">
      <div className="mx-auto max-w-[640px] px-6 py-20 text-center md:py-24 lg:px-10">
        <Reveal>
          <p className="t-label">{t("finale.label")}</p>
          <h2 className="t-h2 mt-4">{rich(t("finale.titel"))}</h2>
          <div className="mt-9 flex flex-col items-center gap-3">
            <CtaPill label={t("cta.label")} />
            <span className="t-small">{t("finale.cta_hinweis")}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default async function ImmobilienmarketingPage() {
  const c = await getContent();
  const t = seitenTexte(c, "immobilienmarketing");

  return (
    <>
      <HubHero t={t} />
      <article>
        <EinordnungSection t={t} />
        <ThemenSection t={t} />
        <SaeulenSection t={t} />
        <FinaleSection t={t} />
      </article>
    </>
  );
}
