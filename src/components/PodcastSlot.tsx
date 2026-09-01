"use client";

import { useState } from "react";
import Image from "next/image";
import { GRUENDER_FOTO } from "@/lib/cdn";

/**
 * 16:9-Slot für das Podcast-Video im Beweis-Block (Alex im Gespräch
 * mit Leon Lin). Gleiche Logik wie VslSlot: ohne Studio-URL steht das
 * Poster (Gründerfoto — echt, keine AiPille) mit Play-Affordance und
 * „folgt"-Pill; mit URL spielt der Klick das Video. Studio-Keys:
 * mk.podcast.url / mk.podcast.titel / mk.podcast.sub.
 */
export function PodcastSlot({
  videoUrl,
  titel,
  sub,
}: {
  videoUrl?: string;
  titel: string;
  sub: string;
}) {
  const [spielt, setSpielt] = useState(false);
  const hatVideo = Boolean(videoUrl && videoUrl.startsWith("http"));

  return (
    <figure className="w-full">
      <div className="relative aspect-video w-full overflow-hidden rounded-[24px] border border-line-subtle bg-bg-elevated">
        {hatVideo && spielt ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video src={videoUrl} autoPlay controls playsInline className="h-full w-full object-cover" />
        ) : (
          <button
            type="button"
            onClick={() => hatVideo && setSpielt(true)}
            disabled={!hatVideo}
            aria-label={hatVideo ? "Podcast abspielen" : "Podcast folgt in Kürze"}
            className="group relative block h-full w-full text-left"
          >
            <Image
              src={GRUENDER_FOTO}
              alt="Alexander Pütter"
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "50% 30%" }}
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <span
              className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-[0_1px_2px_rgba(20,20,18,0.12)] transition-transform duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] group-hover:scale-105"
              aria-hidden
            >
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                <path d="M1 1.8v16.4c0 .7.76 1.13 1.36.77l14-8.2a.9.9 0 0 0 0-1.54l-14-8.2A.9.9 0 0 0 1 1.8Z" fill="#161613" />
              </svg>
            </span>
            {!hatVideo && (
              <span className="absolute bottom-4 left-4 whitespace-nowrap rounded-full bg-white/85 px-3 py-1 text-[11px] font-medium tracking-[0.04em] text-ink-muted backdrop-blur-sm">
                Folge erscheint in Kürze
              </span>
            )}
          </button>
        )}
      </div>
      <figcaption className="mt-4">
        <p className="text-[15.5px] font-semibold text-ink-cream">{titel}</p>
        <p className="t-small mt-1">{sub}</p>
      </figcaption>
    </figure>
  );
}
