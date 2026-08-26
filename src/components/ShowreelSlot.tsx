"use client";

import { useState } from "react";
import Image from "next/image";
import { AiPille } from "./AiPille";
import { HERO_SCHNITT, maklerAsset } from "@/lib/cdn";

/**
 * Breite Klick-Plate für den großen Kampagnen-Zusammenschnitt
 * (Hero-Alle-Videos.webm, 7,5 MB). Wegen der Größe lädt das Video
 * AUSSCHLIESSLICH klick-initiiert (BRIEF §9) — bis dahin steht ein
 * Poster mit Play-Affordance, die Sektion bricht nie leer.
 */
export function ShowreelSlot({ className = "" }: { className?: string }) {
  const [spielt, setSpielt] = useState(false);

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-[24px] border border-line-subtle bg-bg-elevated sm:aspect-[21/9] ${className}`}
    >
      {spielt ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video src={HERO_SCHNITT} autoPlay controls playsInline className="h-full w-full object-cover" />
      ) : (
        <button
          type="button"
          onClick={() => setSpielt(true)}
          aria-label="Showreel abspielen"
          className="group relative block h-full w-full text-left"
        >
          <Image
            src={maklerAsset(18)}
            alt="Szenen aus der beuwy-Kampagnenwelt"
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
          <AiPille />
          <span className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <span
            className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-[0_1px_2px_rgba(20,20,18,0.12)] transition-transform duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] group-hover:scale-105"
            aria-hidden
          >
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
              <path d="M1 1.8v16.4c0 .7.76 1.13 1.36.77l14-8.2a.9.9 0 0 0 0-1.54l-14-8.2A.9.9 0 0 0 1 1.8Z" fill="#161613" />
            </svg>
          </span>
          <span className="absolute bottom-4 left-4 whitespace-nowrap rounded-full bg-white/85 px-3 py-1 text-[11px] font-medium tracking-[0.04em] text-ink-muted backdrop-blur-sm">
            Showreel — die Kampagnenwelt in Bewegung
          </span>
        </button>
      )}
    </div>
  );
}
