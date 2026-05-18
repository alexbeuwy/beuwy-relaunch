"use client";

import { useEffect, useRef } from "react";

/**
 * Perfect-loop video via dual-element crossfade.
 *
 * Single <video loop> elements visibly stutter when they wrap back to frame 0.
 * We render two copies of the same video. Video B starts at half-duration and
 * plays in parallel. A CSS-driven opacity loop crossfades between them, so
 * one is always covering the other's hand-off back to frame 0. Net effect:
 * the loop is invisible.
 *
 * The CSS animation period is set from the actual video duration on
 * loadedmetadata, so it stays in sync regardless of how long the clip is.
 */
export function HeroVideo({ src, className = "hero-video" }: { src: string; className?: string }) {
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;

    const onMeta = () => {
      const d = a.duration;
      if (!Number.isFinite(d) || d <= 0) return;
      a.style.setProperty("--video-dur", `${d}s`);
      b.style.setProperty("--video-dur", `${d}s`);
      // Offset B by half the clip so it covers A's loop wrap and vice-versa.
      try {
        b.currentTime = d / 2;
      } catch {
        /* some browsers throw if metadata not fully ready — retry on canplay */
        b.addEventListener(
          "canplay",
          () => {
            b.currentTime = d / 2;
            b.play().catch(() => {});
          },
          { once: true }
        );
      }
      b.play().catch(() => {});
    };

    if (a.readyState >= 1) onMeta();
    else a.addEventListener("loadedmetadata", onMeta, { once: true });

    return () => {
      a.removeEventListener("loadedmetadata", onMeta);
    };
  }, []);

  return (
    <>
      <video
        ref={aRef}
        className={`${className} hero-video-a`}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <video
        ref={bRef}
        className={`${className} hero-video-b`}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
      />
    </>
  );
}
