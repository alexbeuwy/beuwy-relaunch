"use client";

import { useEffect, useRef, useState } from "react";
import { rich } from "@/components/RichText";

/**
 * FaktenRotor — die große Wechsel-Headline am Fuß der beuwy-Karte
 * (R8, Alex 31.08: "große Headline unten, die sich immer anpasst mit
 * individuellen Fakten — z. B. Ein Nachbar in Ihrer Straße hat 2022
 * für 63 % Ihrer Preisvorstellung verkauft").
 *
 * Zeigt reihum Beispielsätze, die nur ein datengetriebenes System
 * schreiben kann. Alle Sätze stehen unsichtbar im selben Grid-Feld —
 * der längste bestimmt die Höhe, nichts springt beim Wechsel. Timer
 * nur im Viewport; reduced-motion und SSR zeigen den ersten Satz.
 * *Wort*-Markierung läuft über rich() auf den gelben Highlighter.
 */
export function FaktenRotor({ label, fakten }: { label: string; fakten: string[] }) {
  const huelle = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [wechselt, setWechselt] = useState(false);

  const liste = fakten.filter(Boolean);

  useEffect(() => {
    if (liste.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = huelle.current;
    if (!el) return;
    let timer: ReturnType<typeof setInterval> | null = null;
    const beob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !timer) {
          timer = setInterval(() => {
            setWechselt(true);
            // 360 ms = knapp nach Ende der 350ms-Auswisch-Transition
            setTimeout(() => {
              setIndex((i) => (i + 1) % liste.length);
              setWechselt(false);
            }, 360);
          }, 4200);
        } else if (!e.isIntersecting && timer) {
          clearInterval(timer);
          timer = null;
        }
      },
      { threshold: 0.5 },
    );
    beob.observe(el);
    return () => {
      if (timer) clearInterval(timer);
      beob.disconnect();
    };
  }, [liste.length]);

  if (liste.length === 0) return null;

  return (
    <div ref={huelle}>
      <p className="t-label !text-ink-cream/60">{label}</p>
      {/* Screenreader bekommen alle Sätze einmal fest. */}
      <div className="sr-only">
        {liste.map((f) => (
          <p key={f}>{f}</p>
        ))}
      </div>
      <div aria-hidden className="mt-3 grid">
        {/* Unsichtbare Platzhalter: der längste Satz reserviert die Höhe */}
        {liste.map((f) => (
          <p
            key={f}
            className="invisible col-start-1 row-start-1 max-w-[26ch] font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-[1.12] tracking-[-0.02em]"
          >
            {rich(f)}
          </p>
        ))}
        <p
          className={`col-start-1 row-start-1 max-w-[26ch] font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-[1.12] tracking-[-0.02em] text-ink-cream transition-[transform,opacity] duration-[var(--duration-medium)] ease-[var(--ease-smooth-out)] ${
            wechselt ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          {rich(liste[index % liste.length])}
        </p>
      </div>
    </div>
  );
}
