"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Zählt eine formatierte Zahl hoch, sobald sie in den Viewport kommt —
 * der eine Marketing-Moment, an dem eine bewegte Zahl erlaubt ist
 * (Dream-State-Karte im Performance-Flow). Nimmt den fertigen
 * Studio-String ("156.425 €"), zählt den numerischen Kern in ~700 ms
 * hoch und behält Präfix/Suffix bei. Bei reduced-motion, ohne JS oder
 * wenn kein Zahlenkern parsebar ist, steht sofort der Endwert (SSR
 * rendert ihn ohnehin — fail-open wie Reveal).
 */
export function ZahlHochzaehlen({ wert }: { wert: string }) {
  const [anzeige, setAnzeige] = useState(wert);
  const ref = useRef<HTMLSpanElement>(null);
  const lief = useRef(false);

  useEffect(() => {
    setAnzeige(wert);
    lief.current = false;
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const m = wert.match(/([\d.]+)/);
    if (!m) return;
    const ziel = Number(m[1].replace(/\./g, ""));
    if (!Number.isFinite(ziel) || ziel <= 0) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || lief.current) return;
        lief.current = true;
        obs.disconnect();
        const start = performance.now();
        const dauer = 700;
        const tick = (t: number) => {
          const p = Math.min((t - start) / dauer, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const aktuell = Math.round(ziel * eased).toLocaleString("de-DE");
          setAnzeige(wert.replace(m[1], aktuell));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [wert]);

  return (
    <span ref={ref} className="tnum">
      {anzeige}
    </span>
  );
}
