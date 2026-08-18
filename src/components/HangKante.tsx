/**
 * Die Hügelkante aus dem Hero-Bild, als Vektor nachgezogen.
 *
 * Der Pfad ist keine erfundene Welle: er ist Spalte für Spalte aus
 * public/hero-riso.webp gemessen (oberste Grünkante, geglättet). Deshalb
 * trägt er dieselbe Asymmetrie wie das Bild — links steigt der Hang an,
 * rechts fällt er unter den Berg ab. Genau daran erkennt man ihn wieder,
 * wenn er weiter unten als Sektionsübergang auftaucht.
 *
 * Rein dekorativ: aria-hidden, kein Fokus, keine Semantik.
 */

/* aus dem Bild gemessen — viewBox 1000×100, 0 = höchster Punkt des Hangs */
const KANTE =
  "M0,14.21 L15.9,13.04 L31.7,10.81 L47.6,8.9 L63.5,7.04 L79.4,5.37 L95.2,3.89 " +
  "L111.1,2.66 L127.0,1.45 L142.9,0.56 L158.7,0.09 L174.6,0.0 L190.5,0.25 " +
  "L206.3,0.96 L222.2,2.29 L238.1,3.98 L254.0,5.87 L269.8,8.09 L285.7,10.59 " +
  "L301.6,13.13 L317.5,15.88 L333.3,18.72 L349.2,21.78 L365.1,25.11 L381.0,28.11 " +
  "L396.8,31.66 L412.7,34.69 L428.6,37.47 L444.4,38.77 L460.3,41.02 L476.2,44.23 " +
  "L492.1,47.57 L507.9,49.95 L523.8,53.35 L539.7,56.53 L555.6,59.46 L571.4,62.49 " +
  "L587.3,65.27 L603.2,68.05 L619.0,71.01 L634.9,73.55 L650.8,75.21 L666.7,76.6 " +
  "L682.5,79.01 L698.4,81.15 L714.3,82.54 L730.2,83.74 L746.0,84.91 L761.9,85.75 " +
  "L777.8,86.83 L793.7,87.91 L809.5,88.99 L825.4,89.95 L841.3,90.5 L857.1,90.97 " +
  "L873.0,91.15 L888.9,92.08 L904.8,93.87 L920.6,95.51 L936.5,96.65 L952.4,97.79 " +
  "L968.3,98.88 L984.1,99.68 L1000.0,100.0 L1000,100 L0,100 Z";

export function HangKante({
  farbe = "var(--hill)",
  gespiegelt = false,
  klasse = "",
}: {
  /** Füllfarbe — die Farbe der Sektion, in die der Hang übergeht */
  farbe?: string;
  /** Für Übergänge nach oben: Kante kippen, damit der Hang hängt statt steht */
  gespiegelt?: boolean;
  klasse?: string;
}) {
  return (
    <svg
      className={`hang-kante${gespiegelt ? " hang-kante--gespiegelt" : ""} ${klasse}`}
      viewBox="0 0 1000 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={KANTE} fill={farbe} />
    </svg>
  );
}
