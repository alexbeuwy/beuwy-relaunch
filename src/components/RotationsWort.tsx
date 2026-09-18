"use client";

import { useEffect, useRef, useState } from "react";
import stil from "./RotationsWort.module.css";

/**
 * Rotierendes Zielgruppen-Wort im Hero (BRIEF §9): "Maklern" →
 * "Projektentwicklern" → "Bauträgern" → "Vertriebsteams". SSR rendert
 * das erste Wort (SEO/No-JS), der Punkt gehört mit ins rotierende
 * Element, damit beim Breitenwechsel nichts außerhalb reflowt. Für
 * Screenreader steht die volle Liste einmal als sr-only-Satz; die
 * Animation selbst ist aria-hidden. Bei prefers-reduced-motion bleibt
 * das erste Wort stehen.
 */
export function RotationsWort({
  woerter,
  intervallMs = 2800,
}: {
  woerter: string[];
  intervallMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const laeuft = useRef(false);

  useEffect(() => {
    if (woerter.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    laeuft.current = true;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % woerter.length),
      intervallMs
    );
    return () => window.clearInterval(id);
  }, [woerter.length, intervallMs]);

  if (woerter.length === 0) return null;

  return (
    <>
      <span className="sr-only">{woerter.join(", ")}.</span>
      <span aria-hidden className="inline-block whitespace-nowrap">
        <span key={woerter[index]} className={stil.wort}>
          {woerter[index]}.
        </span>
      </span>
    </>
  );
}
