import Image from "next/image";
import Link from "next/link";
import { AiPille } from "./AiPille";
import { rich } from "./RichText";
import { LogoSlot, MARKEN_SLUGS, slugifyMarke } from "./MaklerElemente";
import { RotationsWort } from "./RotationsWort";
import { HERO_POSTER, HERO_VIDEO, maklerAsset } from "@/lib/cdn";
import stil from "./MaklerHero.module.css";

/**
 * XXL-Hero nach REFERENZ-ANALYSE.md (Referenz 1, mit Video statt Foto):
 * Media läuft randlos an den rechten und oberen Viewport-Rand, die linke
 * Bildkante fadet ins Weiß. Layering: Floating Card auf dem Video,
 * gelber Kreis + Kreislinie im Übergang. Darunter die Abschluss-Leiste
 * mit Wordmarks in Markentypo-Anmutung (hellgrau, jetzt über LogoSlot
 * upgradefähig auf echte SVGs, GOAL Kriterium 5) und dem Zahlenband.
 * Alle Texte über Studio-Keys (mk.*).
 */

function Haken() {
  return (
    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-akzent" aria-hidden>
      <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
        <path d="M1 5.2 4.4 8.6 11 1.4" stroke="#161613" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function MaklerHero({ c }: { c: Record<string, string> }) {
  const checks = (c["mk.hero.checks"] ?? "")
    .split("|")
    .map((teil) => {
      const [label, sub] = teil.split("~");
      return { label: label?.trim(), sub: sub?.trim() };
    })
    .filter((x) => x.label);
  const marken = (c["mk.trust.namen"] ?? "").split("|").map((n) => n.trim()).filter(Boolean);
  const stats = [1, 2, 3, 4]
    .map((i) => ({ wert: c[`mk.stats.s${i}_wert`], label: c[`mk.stats.s${i}_label`] }))
    .filter((s) => s.wert && s.label);

  return (
    <header className="relative bg-bg-base">
      {/* ── Szene 1: Text links, XXL-Video randlos rechts ── */}
      <div className="relative min-h-[92dvh]">
        {/* Video-Plate: läuft an den rechten und oberen Rand, nur unten
            links gerundet. Mobile: eigener Block unter dem Text. */}
        <div className="relative mt-4 aspect-[4/3] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[52vw]">
          {/* Innerer Clip-Rahmen: Rundung + overflow hier, damit die
              Floating Card außen über die Kante ragen darf. */}
          <div className="absolute inset-0 overflow-hidden lg:rounded-bl-[48px]">
          <video
            src={HERO_VIDEO}
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
            className={`h-full w-full object-cover motion-reduce:hidden ${stil.mediaEnter}`}
          />
          <Image
            src={HERO_POSTER}
            alt="Kampagnenwelt von beuwy: Premium-Auftritt für Immobilienmakler"
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="hidden object-cover motion-reduce:block"
          />
          {/* Linke Bildkante fadet ins Weiß (nur Desktop) */}
          <span className="pointer-events-none absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r from-bg-base to-transparent lg:block" />
          <AiPille className="!bottom-auto !top-4 right-4" />
          </div>

          {/* Floating Card (Referenz 1, Glass-Fassung): schwebt unten
              rechts im Video, mit Luft zum Rand (Alex, 26.08). Glas +
              umlaufende Beam-Kontur + Zeitlupen-Schweben:
              MaklerHero.module.css. */}
          <div
            className={`absolute bottom-6 right-6 z-10 lg:bottom-[12%] lg:right-10 ${stil.enter}`}
            style={{ "--i": 4 } as React.CSSProperties}
          >
            <div className={stil.karteRahmen}>
              <div className={`flex items-center gap-4 p-5 pr-6 ${stil.karteGlas}`}>
                <div>
                  <p className="t-label !text-[10px]">{c["mk.hero.badge_label"]}</p>
                  <p className="mt-1 font-display text-[44px] font-bold leading-none tracking-[-0.02em] text-ink-cream tnum">
                    {c["mk.hero.badge_wert"]}
                  </p>
                  <p className="mt-1 text-[13px] leading-snug text-ink-muted">
                    {c["mk.hero.badge_text"]}
                  </p>
                </div>
                <div className="relative hidden h-20 w-16 overflow-hidden rounded-lg sm:block">
                  <Image src={maklerAsset(19)} alt="" fill sizes="64px" className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gelber Kreis + Kreislinie im Übergang (Referenz 2) */}
        <span className="pointer-events-none absolute bottom-[24%] right-[50vw] z-0 hidden h-28 w-28 rounded-full bg-akzent/45 lg:block" aria-hidden />
        <span className="pointer-events-none absolute bottom-[30%] right-[47vw] z-0 hidden h-48 w-48 rounded-full border border-ink-yellow/20 lg:block" aria-hidden />

        {/* Textspalte */}
        <div className="relative z-10 mx-auto flex min-h-full max-w-[1200px] flex-col justify-center px-6 pb-16 pt-28 lg:min-h-[92dvh] lg:max-w-none lg:pl-[max(24px,calc((100vw-1280px)/2))] lg:pr-[55vw] lg:pt-24">
          <p className={`t-label !text-ink-yellow ${stil.enter}`} style={{ "--i": 0 } as React.CSSProperties}>{c["mk.hero.eyebrow"]}</p>
          {/* H1 endet vor dem rotierenden Zielgruppen-Wort (BRIEF §9);
              der Punkt lebt im RotationsWort, damit der Breitenwechsel
              nichts außerhalb reflowt. */}
          <h1
            className={`mt-5 font-display text-[clamp(34px,4.2vw,58px)] font-bold leading-[1.04] tracking-[-0.03em] text-ink-cream [text-wrap:balance] ${stil.enter}`}
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {rich(c["mk.hero.title"] ?? "")}{" "}
            <RotationsWort
              woerter={(c["mk.hero.rotation"] ?? "Maklern")
                .split("|")
                .map((w) => w.trim())
                .filter(Boolean)}
            />
          </h1>
          <p className={`t-body-lg mt-6 max-w-[36rem] ${stil.enter}`} style={{ "--i": 2 } as React.CSSProperties}>
            {c["mk.hero.subtitle"]}
          </p>

          {/* Checkmark-Trio (Referenz 1) */}
          {checks.length > 0 && (
            <div className={`mt-9 grid max-w-[38rem] grid-cols-1 gap-5 border-t border-line-subtle pt-8 sm:grid-cols-3 ${stil.enter}`} style={{ "--i": 3 } as React.CSSProperties}>
              {checks.map((check) => (
                <div key={check.label} className="flex items-start gap-3">
                  <Haken />
                  <div>
                    <p className="text-[14px] font-semibold leading-tight text-ink-cream">{check.label}</p>
                    {check.sub && <p className="mt-0.5 text-[12.5px] text-ink-muted">{check.sub}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={`mt-9 flex flex-wrap items-center gap-5 ${stil.enter}`} style={{ "--i": 4 } as React.CSSProperties}>
            <Link
              href="/anfrage"
              className="group inline-flex items-center gap-2.5 rounded-full bg-akzent px-7 py-3.5 text-[15px] font-semibold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover"
            >
              {c["mk.hero.cta"]}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:translate-x-0.5" aria-hidden>
                <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/#ergebnisse"
              className="text-[14px] font-medium text-ink-muted underline decoration-line-medium underline-offset-4 transition-colors duration-[var(--duration-quick)] hover:text-ink-cream"
            >
              {c["mk.hero.cta2"]}
            </Link>
            <span className="t-small w-full sm:w-auto">{c["mk.hero.cta_hinweis"]}</span>
          </div>
        </div>
      </div>

      {/* ── Abschluss-Leiste: Wordmarks in Markentypo + Zahlenband ── */}
      <div className="relative mx-auto -mt-2 max-w-[1360px] px-4 pb-4 lg:-mt-14">
        <div className="rounded-[28px] border border-line-subtle bg-bg-base px-8 py-9 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div>
              <p className="t-label !text-[10.5px]">{c["mk.trust.label"]}</p>
              <div className="mt-6 flex max-w-[520px] flex-wrap items-center gap-x-9 gap-y-5">
                {marken.map((name) => (
                  <LogoSlot key={name} name={name} slug={MARKEN_SLUGS[name] ?? slugifyMarke(name)} />
                ))}
              </div>
            </div>
            {stats.length > 0 && (
              <div className="grid grid-cols-2 gap-x-8 gap-y-6 border-line-subtle sm:grid-cols-4 lg:border-l lg:pl-14">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-[30px] font-bold leading-none tracking-[-0.02em] text-ink-cream tnum">
                      {s.wert}
                    </p>
                    <p className="mt-2 text-[11.5px] leading-snug text-ink-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
