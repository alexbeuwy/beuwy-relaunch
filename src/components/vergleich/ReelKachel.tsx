"use client";

import { useEffect, useRef } from "react";
import { reelRiegel } from "@/lib/cdn";

/**
 * Reel-Kachel im Aha-Vergleich (Karte 2, beuwy): echtes Objekt-Reel aus
 * dem RIEGEL-Projekt — läuft stumm als Ambient-Loop, sobald es zu
 * mindestens 40 % im Viewport steht, und pausiert sofort wieder
 * darunter. Keine AiPille (echtes Video, kein KI-Bild) und kein
 * Play-Button — das Reel ist reine Atmosphäre, keine Interaktion.
 */
export function ReelKachel({ nummer, label }: { nummer: "01" | "02"; label: string }) {
  const { video: videoUrl, poster: posterUrl } = reelRiegel(nummer);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rahmenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const video = videoRef.current;
    const rahmen = rahmenRef.current;
    if (!video || !rahmen) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(rahmen);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={rahmenRef}
      className="relative aspect-[9/16] overflow-hidden rounded-[20px] bg-ink-cream/10"
    >
      {/* Stumme Ambient-Loop ohne Sprache, daher ohne Untertitel-Spur. */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterUrl}
        preload="none"
        muted
        loop
        playsInline
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="absolute bottom-2.5 left-2.5 right-2.5 truncate rounded-full bg-black/45 px-3 py-1.5 text-[10.5px] text-white/85 backdrop-blur">
        {label}
      </span>
    </div>
  );
}
