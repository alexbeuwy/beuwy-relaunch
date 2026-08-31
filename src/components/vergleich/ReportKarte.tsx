/**
 * Report-Kachel im Aha-Vergleich (Karte 2, beuwy): die weiße Fläche
 * neben dem Foto-Visual — steht für den automatisierten Eigentümer-
 * Report. Reiner Server-Content, keine Interaktion. Der Balkenchart ist
 * bewusst eine einzige Hue (var(--akzent)) mit einem dunklen Fokus-
 * Balken — kein Regenbogen, keine Achsen-Deko (BRIEF Light Makler Style).
 * KPI-Zahlen sind hier Mockup-Inhalt der Produktabbildung, nicht
 * Studio-Content — deshalb hart codiert statt über c[].
 */

// Balkenhöhen (px) der 8 Wochen — der letzte ist der Maximalwert (Fokus).
// Schmale Marken, Lücke breiter als der Balken: der Chart wird per
// preserveAspectRatio="none" auf Kartenbreite gestreckt, erst diese
// Proportion hält die Balken dabei dünn (Abnahme 31.08).
const BALKEN_HOEHEN = [11, 15, 13, 18, 21, 19, 26, 34];
const BAR_BREITE = 6;
const BAR_LUECKE = 8;
const BASISLINIE_Y = 38;
const RADIUS = 4;
const CHART_BREITE = (BALKEN_HOEHEN.length - 1) * (BAR_BREITE + BAR_LUECKE) + BAR_BREITE;

/** Balken mit oben gerundeten, unten an der Basislinie flach abschließenden
 *  Ecken — SVG-rect rundet immer alle vier Ecken, deshalb ein Pfad. */
function balkenPfad(index: number, hoehe: number): string {
  const x = index * (BAR_BREITE + BAR_LUECKE);
  const yTop = BASISLINIE_Y - hoehe;
  const r = Math.min(RADIUS, BAR_BREITE / 2, hoehe);
  return `M${x},${BASISLINIE_Y} L${x},${yTop + r} Q${x},${yTop} ${x + r},${yTop} L${x + BAR_BREITE - r},${yTop} Q${x + BAR_BREITE},${yTop} ${x + BAR_BREITE},${yTop + r} L${x + BAR_BREITE},${BASISLINIE_Y} Z`;
}

const MAX_HOEHE = Math.max(...BALKEN_HOEHEN);

const KPIS = [
  { wert: "+38 %", label: "Anfragen ggü. Vorjahr" },
  { wert: "12 Tage", label: "mittlere Vermarktung" },
] as const;

export function ReportKarte({ titel, sub }: { titel: string; sub: string }) {
  return (
    <div className="h-full rounded-[24px] bg-white p-6 lg:p-7">
      <p className="t-label">{titel}</p>
      <p className="t-small mt-1.5">{sub}</p>

      <svg
        viewBox={`0 0 ${CHART_BREITE} 40`}
        preserveAspectRatio="none"
        className="mt-6 h-16 w-full"
        role="img"
        aria-label="Balkenchart der wöchentlichen Anfragen — steigender Trend"
      >
        {/* Basislinie */}
        <line
          x1="0"
          y1={BASISLINIE_Y}
          x2={CHART_BREITE}
          y2={BASISLINIE_Y}
          stroke="var(--color-line-subtle)"
          strokeWidth="1"
        />
        {BALKEN_HOEHEN.map((hoehe, i) => (
          <path
            key={i}
            d={balkenPfad(i, hoehe)}
            fill={hoehe === MAX_HOEHE ? "#161613" : "var(--akzent)"}
          />
        ))}
      </svg>

      <div className="mt-6 flex items-start gap-8 border-t border-line-subtle pt-6">
        {KPIS.map((kpi) => (
          <div key={kpi.label}>
            <p className="font-mono tnum text-[22px] font-semibold text-ink-cream">{kpi.wert}</p>
            <p className="t-label mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
