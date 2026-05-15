"use client";

import { useEffect } from "react";

/**
 * Global delegated mousemove listener that writes `--mx / --my` (relative to the
 * hovered `.card`) so the dark-luxe / aceternity card-spotlight gradient in
 * globals.css can paint a halo at the cursor. One listener for the whole page —
 * avoids per-card React state.
 */
export function SpotlightTracker() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(".card") as HTMLElement | null;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      target.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    document.addEventListener("mousemove", handler, { passive: true });
    return () => document.removeEventListener("mousemove", handler);
  }, []);

  return null;
}
