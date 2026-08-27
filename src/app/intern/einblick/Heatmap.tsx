"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { KLICK_STUFEN } from "@/lib/track-client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

/**
 * Client-Bauteile für /intern/einblick (R5 Leaf G5 · LEAF U5 Politur,
 * 27.08). Zwei-Pass-Port aus Riegels `DichteKarte`/`farbRampe`
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
 *
 * LEAF U5 (Alex, 27.08): Die Dateiliste dieses Leafs umfasst NUR
 * page.tsx und diese Datei — jedes client-seitige Bauteil, das
 * /intern/einblick zum Umschalten von Zeitraum/Gerät/Pfad braucht
 * (Server Component page.tsx kann selbst keine onValueChange-Handler
 * tragen), lebt deshalb hier neben der Heatmap: `UmschalterTabs`
 * (Zeitraum + Geräte-Umschalter, ui/tabs), `PfadAuswahl` (ui/select
 * statt der früheren Pillen-Reihe) und `KpiZahl` (Zahlen-Pop-in bei
 * Zeitraumwechsel). Die eigentliche Heatmap bekommt zusätzlich
 * Hover-Tooltips (ui/tooltip, delayDuration 300) mit der Klickzahl je
 * Punktcluster — statt eines Tooltips pro Roh-Klickzelle (könnten
 * Hunderte sein) bündelt `hotspotsFuer` die Punkte auf ein grobes
 * Raster, damit eine überschaubare Zahl an Radix-Tooltip-Instanzen
 * entsteht und "Cluster" auch inhaltlich stimmt.
 */

type Punkt = { x: number; y: number; n: number };

const ZAHL = new Intl.NumberFormat("de-DE");

/** --ease-smooth-out aus globals.css als Sekundenwert-Array für motion/react. */
const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

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

type Hotspot = { x: number; y: number; n: number };

/** Bündelt rohe Klickpunkte auf ein grobes 22×22-Raster (gewichteter
 *  Mittelpunkt je Zelle) und behält die stärksten `deckel` Zellen —
 *  macht aus potenziell vielen Klick-Zellen eine überschaubare Zahl an
 *  Hover-Zielen und liefert inhaltlich echte "Punktcluster" statt
 *  Einzelpixel. */
function hotspotsFuer(punkte: Punkt[], raster = 22, deckel = 60): Hotspot[] {
  if (punkte.length === 0) return [];
  const zellen = new Map<string, Hotspot>();
  for (const p of punkte) {
    const gx = Math.min(raster - 1, Math.max(0, Math.floor((p.x / KLICK_STUFEN) * raster)));
    const gy = Math.min(raster - 1, Math.max(0, Math.floor((p.y / KLICK_STUFEN) * raster)));
    const key = `${gx}:${gy}`;
    const vorhanden = zellen.get(key);
    if (vorhanden) {
      const gesamtN = vorhanden.n + p.n;
      vorhanden.x = (vorhanden.x * vorhanden.n + p.x * p.n) / gesamtN;
      vorhanden.y = (vorhanden.y * vorhanden.n + p.y * p.n) / gesamtN;
      vorhanden.n = gesamtN;
    } else {
      zellen.set(key, { x: p.x, y: p.y, n: p.n });
    }
  }
  return Array.from(zellen.values())
    .sort((a, b) => b.n - a.n)
    .slice(0, deckel);
}

export function Heatmap({
  punkte,
  pfad,
  geraet,
  leerText,
  unterleger,
}: {
  punkte: Punkt[];
  pfad: string;
  geraet: "desktop" | "mobil" | "alle";
  leerText: string;
  /** fullPage-Screenshot der Seite (tools/einblick-unterleger.mjs) —
      Klick-Koordinaten sind dokumentrelativ, das Bild ist es auch:
      Overlays folgen exakt der Bildgeometrie. */
  unterleger?: { datei: string; seitenverhaeltnis: number };
}) {
  const max = Math.max(1, ...punkte.map((p) => p.n));
  const gesamt = punkte.reduce((a, p) => a + p.n, 0);
  const hotspots = useMemo(() => hotspotsFuer(punkte), [punkte]);
  const hotspotMax = Math.max(1, ...hotspots.map((h) => h.n));

  function durchmesser(n: number): number {
    return Math.round(10 + 20 * Math.sqrt(n / hotspotMax));
  }

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-line-subtle">
        <div className="flex items-center gap-2 border-b border-line-subtle bg-bg-elevated px-3 py-2">
          <ChromePunkte />
          <span className="truncate font-mono text-[11px] text-ink-dim">beuwy.com{pfad}</span>
        </div>
        <div className={unterleger ? "max-h-[70vh] overflow-y-auto" : undefined}>
        <div
          className={
            unterleger
              ? "relative w-full bg-white"
              : `relative w-full border-dashed bg-white ${
                  geraet === "mobil" ? "mx-auto aspect-[9/17] max-w-[320px]" : "aspect-[16/11]"
                }`
          }
          style={unterleger ? { aspectRatio: String(1 / unterleger.seitenverhaeltnis) } : undefined}
        >
          {unterleger && (
            /* eslint-disable-next-line @next/next/no-img-element -- lokales Asset in Originalgeometrie */
            <img
              src={unterleger.datei}
              alt=""
              className="absolute inset-0 h-full w-full select-none opacity-90"
              draggable={false}
            />
          )}
          <DichteKarte punkte={punkte} max={max} />

          {hotspots.length > 0 && (
            <TooltipProvider delayDuration={300}>
              {hotspots.map((h, i) => {
                const groesse = durchmesser(h.n);
                const anzahl = Math.round(h.n);
                return (
                  <Tooltip key={i}>
                    <TooltipTrigger asChild>
                      <span
                        tabIndex={0}
                        className="absolute -translate-x-1/2 -translate-y-1/2 cursor-default rounded-full outline-none focus-visible:ring-2 focus-visible:ring-(--ring)"
                        style={{
                          left: `${(h.x / KLICK_STUFEN) * 100}%`,
                          top: `${(h.y / KLICK_STUFEN) * 100}%`,
                          width: groesse,
                          height: groesse,
                        }}
                        aria-label={`${ZAHL.format(anzahl)} Klick${anzahl === 1 ? "" : "s"}`}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <span className="tnum font-mono">
                        {ZAHL.format(anzahl)} Klick{anzahl === 1 ? "" : "s"}
                      </span>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </TooltipProvider>
          )}

          {punkte.length === 0 && (
            <p className="absolute inset-0 grid place-items-center px-6 text-center text-[13px] text-ink-dim">
              {leerText}
            </p>
          )}
        </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11.5px] text-ink-dim">
        <span className="tnum font-mono">
          {gesamt} Klick{gesamt === 1 ? "" : "s"} in dieser Auswahl
          {unterleger && geraet === "mobil" ? " · Unterleger: Desktop-Ansicht" : ""}
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

/** Eine Kennzahl als Text — die Zahl selbst crossfadet bei Prop-Wechsel
 *  (Zeitraumwechsel navigiert serverseitig neu, aber diese Client-
 *  Komponente behält bei einer weichen Navigation ihre Identität und
 *  bekommt einfach einen neuen `wert`-Prop, siehe Dateikopf). Alte Zahl
 *  fadet raus (quick, 150ms), neue kommt mit leichtem y-Shift rein
 *  (fast, 250ms) — Schließen bewusst schneller als Öffnen. mode=
 *  "popLayout" nimmt die austretende Zahl sofort aus dem Layoutfluss,
 *  damit unterschiedlich breite Zahlen nicht kurz nebeneinander
 *  hüpfen. Bei reduzierter Bewegung nur Opacity, kein y-Shift. */
export function KpiZahl({ wert }: { wert: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <span className="relative inline-block">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={wert}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: EASE_SMOOTH } }}
          exit={{ opacity: 0, transition: { duration: 0.15, ease: EASE_SMOOTH } }}
          className="inline-block"
        >
          {wert}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

type UmschalterOption = { wert: string; href: string; label: string };

/** Zeitraum- UND Geräte-Umschalter (ui/tabs) — beide sind dieselbe Form
 *  "eine Handvoll sich gegenseitig ausschließender Optionen, jede mit
 *  eigenem Link", nur der Options-Satz unterscheidet sich. Navigiert
 *  bei Auswahl per router.push statt <Link>, weil TabsTrigger ein
 *  <button> ist — passend zu /intern, das ohnehin durchgängig JS
 *  voraussetzt (Command-Palette, Toaster). */
export function UmschalterTabs({
  wert,
  optionen,
  ariaLabel,
}: {
  wert: string;
  optionen: UmschalterOption[];
  ariaLabel?: string;
}) {
  const router = useRouter();
  return (
    <Tabs
      value={wert}
      onValueChange={(neu) => {
        if (neu === wert) return;
        const ziel = optionen.find((o) => o.wert === neu);
        if (ziel) router.push(ziel.href);
      }}
    >
      <TabsList aria-label={ariaLabel}>
        {optionen.map((o) => (
          <TabsTrigger key={o.wert} value={o.wert}>
            {o.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

/** Pfad-Wahl für die Heatmap (ui/select statt der früheren Pillen-
 *  Reihe) — zeigt Pfad + Views je Option, navigiert bei Auswahl. */
export function PfadAuswahl({
  wert,
  optionen,
  ariaLabel,
}: {
  wert: string;
  optionen: { pfad: string; href: string; label: string }[];
  ariaLabel?: string;
}) {
  const router = useRouter();
  return (
    <Select
      value={wert}
      onValueChange={(neu) => {
        if (neu === wert) return;
        const ziel = optionen.find((o) => o.pfad === neu);
        if (ziel) router.push(ziel.href);
      }}
    >
      <SelectTrigger className="w-full sm:w-[340px]" aria-label={ariaLabel}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {optionen.map((o) => (
          <SelectItem key={o.pfad} value={o.pfad}>
            <span className="flex w-full min-w-0 items-center justify-between gap-3">
              <span className="truncate">{o.pfad}</span>
              <span className="tnum shrink-0 font-mono text-[11px] text-ink-dim">{o.label}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
