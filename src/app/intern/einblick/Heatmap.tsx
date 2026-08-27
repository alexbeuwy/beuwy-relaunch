"use client";

import { useEffect, useRef, useState } from "react";
import { KLICK_STUFEN } from "@/lib/track-client";

/**
 * Klick-Dichtekarte für /intern/einblick (R5 Leaf G5). Zwei-Pass-Port aus
 * Riegels `DichteKarte`/`farbRampe`
 * (/home/user/alexbeuwy/riegel/src/components/intern-dashboard.tsx,
 * Z. 3121 + 3161 — siehe docs/redesign/R5-PORTGUT.md Fundstück 4):
 * reines `<canvas>`, kein npm-Paket. Pass 1 trägt je Klick einen
 * radialen Alpha-Verlauf additiv auf (Wurzel-Skalierung gegen einen
 * einzelnen Hotspot, der sonst alles andere optisch auffrisst), Pass 2
 * färbt jedes Pixel über die Farbrampe ein.
 *
 * ABWEICHUNG von Riegel (Auftrag): Farbrampe läuft Pastellgelb → Tinte
 * statt Riegels Blau-Cyan-Grün-Gelb-Rot — passt zu beuwys hellem,
 * markenfarbigem CRM statt einer generischen Ampel (Design-Direktive
 * Regel 19: Semantik-Farben bleiben auf Status beschränkt).
 *
 * Kein echter Seiten-Screenshot: die Karte liegt über einem dezenten
 * Platzhalter (grauer Rahmen, Pfad als Kopfzeile wie eine Browser-
 * Adressleiste) — „ein echter Screenshot-Unterleger kommt später".
 */

type Punkt = { x: number; y: number; n: number };

/** Farbrampe: 256 RGB-Stützstellen, Pastellgelb → Tinte. */
function farbRampe(): Uint8ClampedArray {
  const stops: [number, number, number, number][] = [
    [0.0, 251, 245, 214], // #fbf5d6 — akzent-wash, kaum sichtbar
    [0.3, 243, 226, 127], // #f3e27f — akzent (Pastellgelb)
    [0.65, 198, 150, 42], // goldbraun, Übergang
    [1.0, 22, 22, 19], // #161613 — Tinte, "heiß"
  ];
  const out = new Uint8ClampedArray(256 * 3);
  for (let i = 0; i < 256; i++) {
    const t = i / 255;
    let a = stops[0];
    let b = stops[stops.length - 1];
    for (let k = 0; k < stops.length - 1; k++) {
      if (t >= stops[k][0] && t <= stops[k + 1][0]) {
        a = stops[k];
        b = stops[k + 1];
        break;
      }
    }
    const spanne = b[0] - a[0] || 1;
    const f = (t - a[0]) / spanne;
    out[i * 3] = a[1] + (b[1] - a[1]) * f;
    out[i * 3 + 1] = a[2] + (b[2] - a[2]) * f;
    out[i * 3 + 2] = a[3] + (b[3] - a[3]) * f;
  }
  return out;
}
const RAMPE = farbRampe();

function DichteKarte({ punkte, max }: { punkte: Punkt[]; max: number }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [groesse, setGroesse] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const messen = () => setGroesse({ w: el.clientWidth, h: el.clientHeight });
    messen();
    const ro = new ResizeObserver(messen);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const cv = canvasRef.current;
    const { w, h } = groesse;
    if (!cv || w === 0 || h === 0) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(h * dpr);
    const ctx = cv.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    if (punkte.length === 0) return;

    // Radius relativ zur Breite — auf breiten Karten dürfen die Flecken
    // größer sein, sonst wird die Karte zum Nadelkissen.
    const radius = Math.max(14, Math.round(w * 0.024));

    // Pass 1: Alpha-Dichte, additiv, Wurzel-Skala.
    ctx.globalCompositeOperation = "source-over";
    for (const p of punkte) {
      const cx = (p.x / KLICK_STUFEN) * w;
      const cy = (p.y / KLICK_STUFEN) * h;
      const staerke = Math.min(1, 0.18 + 0.82 * Math.sqrt(p.n / max));
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      g.addColorStop(0, `rgba(0,0,0,${staerke})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Pass 2: Alpha → Farbe über die Rampe.
    const bild = ctx.getImageData(0, 0, cv.width, cv.height);
    const d = bild.data;
    for (let i = 0; i < d.length; i += 4) {
      const a = d[i + 3];
      if (a === 0) continue;
      const t = a * 3;
      d[i] = RAMPE[t];
      d[i + 1] = RAMPE[t + 1];
      d[i + 2] = RAMPE[t + 2];
      // Deckel bei ~0,82: der Platzhalter (später ein Screenshot) soll
      // durchscheinen, sonst sieht man nicht mehr, WORAUF geklickt wurde.
      d[i + 3] = Math.min(210, a);
    }
    ctx.putImageData(bild, 0, 0);
  }, [punkte, max, groesse]);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="h-full w-full" style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

/** Drei Punkte, selbst gezeichnet — Browser-Chrome-Andeutung für die
 *  Platzhalter-Kopfzeile, kein Icon-Import. */
function ChromePunkte() {
  return (
    <span className="flex shrink-0 gap-1" aria-hidden>
      <i className="h-2 w-2 rounded-full bg-line-medium" />
      <i className="h-2 w-2 rounded-full bg-line-medium" />
      <i className="h-2 w-2 rounded-full bg-line-medium" />
    </span>
  );
}

export function Heatmap({
  punkte,
  pfad,
  geraet,
  leerText,
}: {
  punkte: Punkt[];
  pfad: string;
  geraet: "desktop" | "mobil" | "alle";
  leerText: string;
}) {
  const max = Math.max(1, ...punkte.map((p) => p.n));
  const gesamt = punkte.reduce((a, p) => a + p.n, 0);

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-line-subtle">
        <div className="flex items-center gap-2 border-b border-line-subtle bg-bg-elevated px-3 py-2">
          <ChromePunkte />
          <span className="truncate font-mono text-[11px] text-ink-dim">beuwy.com{pfad}</span>
        </div>
        <div
          className={`relative w-full border-dashed bg-white ${
            geraet === "mobil" ? "mx-auto aspect-[9/17] max-w-[320px]" : "aspect-[16/11]"
          }`}
        >
          <DichteKarte punkte={punkte} max={max} />
          {punkte.length === 0 && (
            <p className="absolute inset-0 grid place-items-center px-6 text-center text-[13px] text-ink-dim">
              {leerText}
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11.5px] text-ink-dim">
        <span className="tnum font-mono">
          {gesamt} Klick{gesamt === 1 ? "" : "s"} in dieser Auswahl
        </span>
        <span className="inline-flex items-center gap-2">
          wenig
          <span
            className="h-2 w-24 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, var(--akzent-wash), var(--akzent), #c6962a, var(--ink-cream))",
            }}
          />
          viel
        </span>
      </div>
    </div>
  );
}
