"use client";

import { useState } from "react";
import Image from "next/image";
import { AiPille } from "./AiPille";
import { maklerAsset } from "@/lib/cdn";

/**
 * 9:16-Slot für das VSL-Video (Alex nimmt es mit OBS auf). Solange
 * keine Video-URL im Studio hinterlegt ist, steht ein ruhiges
 * Poster-Bild mit Play-Affordance — die Sektion funktioniert auch ohne
 * Video, bricht also nie leer.
 *
 * Studio-Key: `vsl.url` (leer = Platzhalter). Formate: mp4/webm-URL.
 */
export function VslSlot({ videoUrl, posterNummer = 14 }: { videoUrl?: string; posterNummer?: number }) {
  const [spielt, setSpielt] = useState(false);
  const hatVideo = Boolean(videoUrl && videoUrl.startsWith("http"));

  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-[340px] overflow-hidden rounded-[24px] border border-line-subtle bg-bg-elevated">
      {hatVideo && spielt ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          src={videoUrl}
          autoPlay
          controls
          playsInline
          className="h-full w-full object-cover"
        />
      ) : (
        <button
          type="button"
          onClick={() => hatVideo && setSpielt(true)}
          disabled={!hatVideo}
          aria-label={hatVideo ? "Video abspielen" : "Video folgt in Kürze"}
          className="group relative block h-full w-full text-left"
        >
          <Image
            src={maklerAsset(posterNummer)}
            alt="Einblick in die Arbeit von beuwy"
            fill
            sizes="340px"
            className="object-cover"
          />
          <AiPille />
          <span className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          <span
            className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-[0_1px_2px_rgba(20,20,18,0.12)] transition-transform duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] group-hover:scale-105"
            aria-hidden
          >
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
              <path d="M1 1.8v16.4c0 .7.76 1.13 1.36.77l14-8.2a.9.9 0 0 0 0-1.54l-14-8.2A.9.9 0 0 0 1 1.8Z" fill="#161613" />
            </svg>
          </span>
          {!hatVideo && (
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/85 px-3 py-1 text-[11px] font-medium tracking-[0.04em] text-ink-muted backdrop-blur-sm">
              90 Sekunden — folgt in Kürze
            </span>
          )}
        </button>
      )}
    </div>
  );
}
