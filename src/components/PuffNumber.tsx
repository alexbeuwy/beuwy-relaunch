/**
 * Puffballon-Zahlen als Special-Effekt: einzelne Ziffern werden als
 * Folienballon-PNGs gerendert (aus PuffBalloon-Bitmaps.otf extrahiert,
 * auf BunnyCDN). Bewusst KEIN Font — sbix/SVG-Farbfonts rendern in vielen
 * Browsern nicht zuverlässig; echte Bilder funktionieren überall.
 *
 * <PuffNumber value="58,5" /> → Reihe von Ballon-Ziffern, an der
 * Grundlinie ausgerichtet, Höhe an die Textzeile gekoppelt (1em-Vielfaches).
 */

const CDN = "https://beuwy-2.b-cdn.net/assets/puff";

/* Zeichen → Dateiname + native PNG-Maße (für aspect-ratio, kein Layout-Shift) */
const GLYPHS: Record<string, { file: string; w: number; h: number }> = {
  "0": { file: "0", w: 185, h: 240 },
  "1": { file: "1", w: 133, h: 240 },
  "2": { file: "2", w: 185, h: 240 },
  "3": { file: "3", w: 182, h: 240 },
  "4": { file: "4", w: 212, h: 240 },
  "5": { file: "5", w: 186, h: 240 },
  "6": { file: "6", w: 180, h: 240 },
  "7": { file: "7", w: 186, h: 240 },
  "8": { file: "8", w: 196, h: 240 },
  "9": { file: "9", w: 180, h: 240 },
  ",": { file: "comma", w: 164, h: 240 },
  ".": { file: "period", w: 194, h: 183 },
  "%": { file: "percent", w: 243, h: 240 },
  "+": { file: "plus", w: 236, h: 240 },
};

export function PuffNumber({
  value,
  className = "",
  size = "1em",
}: {
  value: string;
  className?: string;
  /** Ballonhöhe, an die Schriftgröße gekoppelt (z. B. "1.1em" oder "72px"). */
  size?: string;
}) {
  const chars = [...value.trim()];
  return (
    <span
      className={`puff-row ${className}`}
      style={{ ["--puff-h" as string]: size }}
      aria-label={value}
      role="img"
    >
      {chars.map((ch, i) => {
        const g = GLYPHS[ch];
        if (!g) {
          // Nicht abgedeckte Zeichen (z. B. Leerzeichen) als schmale Lücke.
          return (
            <span key={i} className="puff-gap" aria-hidden>
              {ch === " " ? " " : ch}
            </span>
          );
        }
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={`${CDN}/${g.file}.png`}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="puff-glyph"
            style={{ aspectRatio: `${g.w} / ${g.h}` }}
          />
        );
      })}
    </span>
  );
}
