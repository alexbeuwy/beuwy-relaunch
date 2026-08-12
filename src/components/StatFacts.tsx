"use client";

import { useEffect, useRef, useState } from "react";

/* Fakten-Band im Beweis-Block: Zahlen zählen beim ersten Sichtkontakt hoch
   (respektiert prefers-reduced-motion), davor optional ein 3D-Icon-Asset
   aus /studio. Bewusst ohne Karten und Rahmen — nur Typo und Luft. */

type Fact = {
  value: string; // Ziffern mit Tausenderpunkten, z. B. "38.000"
  suffix: string; // statischer Anhang, z. B. " €"
  label: string;
  icon?: string; // CDN-URL zum 3D-Icon (leer = ohne)
};

const COUNT_DUR = 1400;
const EASE_OUT = (t: number) => 1 - Math.pow(1 - t, 3);

function formatLike(template: string, n: number): string {
  // Formatiert n mit denselben Tausenderpunkten wie die Zielzahl
  const hasDots = template.includes(".");
  const s = Math.round(n).toString();
  if (!hasDots) return s;
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function FactNumber({ value, suffix }: { value: string; suffix: string }) {
  const target = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const [shown, setShown] = useState<string>(() => formatLike(value, 0));
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(value);
      setDone(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || started.current) return;
        started.current = true;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / COUNT_DUR);
          setShown(formatLike(value, EASE_OUT(p) * target));
          if (p < 1) requestAnimationFrame(tick);
          else {
            setShown(value);
            setDone(true);
          }
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, target]);

  return (
    <span ref={ref} className="fact-num" data-done={done || undefined}>
      {shown}
      {suffix && <span className="fact-suffix">{suffix}</span>}
    </span>
  );
}

export function StatFacts({ facts }: { facts: Fact[] }) {
  return (
    <div className="fact-band">
      {facts.map((f) => (
        <div key={f.label} className="fact">
          {f.icon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={f.icon} alt="" className="fact-icon" loading="lazy" />
          ) : null}
          <FactNumber value={f.value} suffix={f.suffix} />
          <p className="fact-label">{f.label}</p>
        </div>
      ))}
    </div>
  );
}
