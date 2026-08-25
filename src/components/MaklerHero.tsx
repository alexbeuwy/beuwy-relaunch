import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightUpLine } from "@remixicon/react";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { HERO_VIDEO, HERO_POSTER } from "@/lib/cdn";
import styles from "./MaklerHero.module.css";

/**
 * XXL-Hero der Startseite (Light Makler Style, Leaf B2).
 *
 * Eine Szene, ein Bild: links dominiert die Headline, rechts trägt die
 * Video-Plate — beide zusammen sind der eine Fokus des ersten Viewports.
 * Darunter, außerhalb der 100dvh-Szene, die Trust-Zeile als reine
 * Wordmark-Typografie (keine Logo-Dateien, BRIEF §5/§7).
 */
export function MaklerHero({ c }: { c: Record<string, string> }) {
  const wordmarken = (c["mk.trust.namen"] ?? "")
    .split("|")
    .map((name) => name.trim())
    .filter(Boolean);

  return (
    <>
      <section className="relative bg-bg-base">
        <div
          className={[
            "mx-auto flex min-h-[100dvh] w-full max-w-[1480px] flex-col gap-14",
            "px-6 pt-28 pb-16",
            "lg:grid lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1fr)] lg:content-center",
            "lg:items-center lg:gap-16 lg:px-12 lg:pt-24 lg:pb-20",
          ].join(" ")}
        >
          {/* Text — die Headline dominiert die Szene */}
          <div>
            <p
              className={`text-[11.5px] leading-[1.2] font-semibold tracking-[0.07em] text-(--gold) uppercase ${styles.enter}`}
              style={{ "--i": 0 } as CSSProperties}
            >
              {c["mk.hero.eyebrow"]}
            </p>

            <h1
              className={[
                "mt-5 text-[clamp(44px,6.5vw,92px)] leading-[1.02] font-extrabold tracking-[-0.03em]",
                "text-ink-cream text-balance [&>em]:text-(--gold)",
                styles.enter,
              ].join(" ")}
              style={{ "--i": 1 } as CSSProperties}
            >
              {rich(c["mk.hero.title"])}
            </h1>

            <p
              className={`t-body-lg mt-7 max-w-[34rem] ${styles.enter}`}
              style={{ "--i": 2 } as CSSProperties}
            >
              {c["mk.hero.subtitle"]}
            </p>

            <div
              className={`mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 ${styles.enter}`}
              style={{ "--i": 3 } as CSSProperties}
            >
              <Link
                href="/anfrage"
                className={[
                  "group inline-flex h-[52px] items-center gap-2.5 rounded-full bg-akzent px-7",
                  "text-[15px] font-semibold tracking-[-0.01em] text-ink-cream",
                  "transition-colors duration-(--duration-fast) ease-(--ease-smooth-out) hover:bg-akzent-hover",
                  "outline-offset-2 focus-visible:outline-2 focus-visible:outline-(--ring)",
                ].join(" ")}
              >
                {c["mk.hero.cta"]}
                <RiArrowRightUpLine
                  aria-hidden="true"
                  className="size-[18px] shrink-0 transition-transform duration-(--duration-fast) ease-(--ease-smooth-out) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <span className="t-small">{c["mk.hero.cta_hinweis"]}</span>
            </div>
          </div>

          {/* Media-Plate — trägt die Szene, blinkt nicht daneben.
              bg-bg-elevated: Platzhalterton, solange das Bild lädt. */}
          <div
            className={`relative aspect-[4/3] w-full overflow-hidden rounded-[28px] bg-bg-elevated lg:aspect-auto lg:h-[78vh] ${styles.mediaEnter}`}
          >
            <video
              className="absolute inset-0 h-full w-full object-cover motion-safe:block motion-reduce:hidden"
              src={HERO_VIDEO}
              poster={HERO_POSTER}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
            <Image
              src={HERO_POSTER}
              alt="Interieur in warmem Licht — aus der beuwy-Kampagnenwelt"
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover motion-reduce:block motion-safe:hidden"
            />
            <AiPille />
          </div>
        </div>
      </section>

      {/* Trust-Strip — reine Wordmark-Typo, keine Fremdlogo-Dateien */}
      <section className="border-y border-line-subtle bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-10 lg:px-10 lg:py-12">
          <p className="t-label text-center">{c["mk.trust.label"]}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
            {wordmarken.map((name) => (
              <span
                key={name}
                className="text-[13px] font-medium tracking-[0.14em] text-ink-dim uppercase"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
