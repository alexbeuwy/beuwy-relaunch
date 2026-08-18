"use client";

import { useEffect } from "react";

/**
 * Ein einziger Scroll-Antrieb für die ganze Seite.
 *
 * Schreibt --hero-p (0…1) auf <html>, während der Hero durchläuft. Alles,
 * was sich beim Scrollen bewegt, hängt an dieser Variablen — kein zweiter
 * Listener, keine Bibliothek. Gerechnet wird nur im rAF, geschrieben nur
 * wenn sich der Wert sichtbar ändert.
 *
 * Bei prefers-reduced-motion bleibt --hero-p auf 0: die Seite steht dann
 * genau so da wie im ersten Frame.
 */
export function ScrollFortschritt() {
  useEffect(() => {
    const wurzel = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let letzter = -1;

    const messen = () => {
      frame = 0;
      const hero = document.querySelector<HTMLElement>(".hero-riso");
      if (!hero) return;
      /* Die Bewegung läuft über die erste Bildhöhe. Danach liegt der
         Hero hinter dem Flur und bewegt sich nicht mehr sichtbar. */
      const strecke = hero.offsetHeight;
      if (strecke <= 0) return;
      const p = Math.min(1, Math.max(0, window.scrollY / strecke));
      const gerundet = Math.round(p * 200) / 200;
      if (gerundet === letzter) return;
      letzter = gerundet;
      wurzel.style.setProperty("--hero-p", String(gerundet));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(messen);
    };

    messen();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      wurzel.style.removeProperty("--hero-p");
    };
  }, []);

  return null;
}
