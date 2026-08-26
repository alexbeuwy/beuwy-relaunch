"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Die Dream-State-Zahl der Performance-Sektion: pendelt in einer
 * endlosen, sehr weichen Schleife durch realistische Jahreswerte
 * (+5 → +12 → +27 → +9 → …), die Summe darunter rechnet live mit
 * (Mandate × Ø Provision). Lenis-Gefühl: lange Übergänge, easeInOut,
 * kurze Ruhephasen auf jedem Wert. SSR und reduced-motion zeigen den
 * Studio-Startwert statisch — die Schleife ist Kür, nie Pflicht.
 */
const STUETZWERTE = [5, 12, 27, 9, 18];
const UEBERGANG_MS = 2600;
const PAUSE_MS = 1400;

function easeInOut(p: number) {
  return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
}

export function MandateLoop({
  startMandate,
  provisionText,
}: {
  startMandate: string;
  provisionText: string;
}) {
  const start = Number.parseInt(startMandate, 10) || 5;
  const provision =
    Number((provisionText.match(/[\d.]+/)?.[0] ?? "31.285").replace(/\./g, "")) || 31285;

  const [mandate, setMandate] = useState(start);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = wrap.current;
    if (!node) return;

    let raf = 0;
    let timeout = 0;
    let laeuft = false;

    const werte = [start, ...STUETZWERTE.filter((w) => w !== start)];
    let index = 0;

    const naechster = () => {
      const von = werte[index];
      index = (index + 1) % werte.length;
      const nach = werte[index];
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - t0) / UEBERGANG_MS, 1);
        setMandate(Math.round(von + (nach - von) * easeInOut(p)));
        if (p < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          timeout = window.setTimeout(naechster, PAUSE_MS);
        }
      };
      raf = requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !laeuft) {
        laeuft = true;
        timeout = window.setTimeout(naechster, 600);
      }
    });
    obs.observe(node);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [start]);

  const summe = (mandate * provision).toLocaleString("de-DE");

  return (
    <div ref={wrap}>
      <p className="font-display text-[clamp(52px,6vw,76px)] font-bold leading-none tracking-[-0.03em] text-ink-cream tnum">
        +{mandate}
      </p>
      <p className="mt-2 text-[17px] font-semibold text-ink-cream">
        zusätzliche Mandate im Jahr
      </p>
      <div className="mt-6 border-t border-ink-cream/15 pt-5">
        <p className="text-[14px] text-ink-cream/70 tnum">× Ø {provisionText} Maklerprovision</p>
        <p className="mt-2 font-display text-[clamp(28px,3vw,36px)] font-bold leading-none tracking-[-0.02em] text-ink-cream tnum">
          = {summe} €
        </p>
        <p className="mt-2 text-[13px] text-ink-cream/60">
          zusätzlicher Umsatz — Zahlen aus Ihrem Markt, im Gespräch gerechnet,
          nicht versprochen.
        </p>
      </div>
    </div>
  );
}
