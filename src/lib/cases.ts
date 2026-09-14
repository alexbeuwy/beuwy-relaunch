import { DEFAULTS as CASES_TEXTE } from "./texte/seiten/cases-detail";

/**
 * Fallstudien — Datenquelle für die Startseiten-Sektion und die
 * Unterseiten unter /cases/<slug>.
 *
 * R11 (14.09, Studio-Pflicht): die Texte selbst stehen nicht mehr hier,
 * sondern als Studio-Keys in src/lib/texte/seiten/cases-detail.ts. Diese
 * Datei behält nur die STRUKTUR (Slugs, Bild-/Video-Pfade, Link,
 * Beispielprojekt-Kennzeichnung, Reihenfolge) — CASES ist damit weiterhin
 * ein vollständiges, sofort nutzbares Array (Fallback mit den
 * Studio-Defaults als Text) für alle bestehenden Konsumenten
 * (CaseGrid, StartUnten, sitemap.ts, die einzelnen Marketing-Landingpages
 * über caseBySlug). Für live editierbare Texte rufen /cases und
 * /cases/[slug] stattdessen casesMitTexten()/caseMitTexten() mit dem
 * Ergebnis von getContent() auf.
 *
 * Die Headline erzählt die REISE, nicht die Leistung: wo der Kunde
 * stand und wo er heute steht. Das ist der Grund, warum jemand klickt.
 *
 * `beispiel: true` markiert Platzhalter-Fälle mit erfundenen Firmen und
 * Zahlen. Sie tragen auf der Seite sichtbar den Vermerk „Beispielprojekt",
 * damit nie eine erfundene Zahl als echte Referenz gelesen wird. Echte
 * Fälle enthalten ausschließlich belegte Angaben.
 */

export type CaseFakt = { wert: string; label: string };

export type CaseStudy = {
  slug: string;
  kunde: string;
  branche: string;
  jahr: string;
  /** Die Reise — steht als Überschrift auf Karte und Unterseite */
  reise: string;
  /** Ein Satz für die Karte auf der Startseite */
  teaser: string;
  fakten: CaseFakt[];
  ausgangslage: string;
  gebaut: string[];
  danach: string;
  /** Bild im Repo (public/) oder leer */
  bild?: string;
  bildAlt?: string;
  /** Video-URL, erscheint nur auf der Unterseite */
  video?: string;
  videoLabel?: string;
  link?: { label: string; href: string };
  beispiel?: boolean;
};

/** Nicht-textliche Struktur je Fall, in der Reihenfolge, die auch die Studio-Keys nutzen. */
type FallStruktur = {
  slug: string;
  bild?: string;
  /** alt-Text ist ein Bild-Attribut, kein Fließtext — bewusst nicht im Studio (Konvention R11). */
  bildAlt?: string; // studio:ok
  video?: string;
  link?: { label: string; href: string };
  beispiel?: boolean;
  faktenAnzahl: number;
  gebautAnzahl: number;
};

const STRUKTUR: FallStruktur[] = [
  {
    slug: "riegel-immobilien",
    bild: "/refs/riegel.webp",
    bildAlt: "Startseite von RIEGEL Immobilien nach dem Relaunch", // studio:ok
    link: { label: "riegel-immobilien.de", href: "https://www.riegel-immobilien.de" },
    faktenAnzahl: 3,
    gebautAnzahl: 4,
  },
  {
    slug: "vision-group",
    video: "https://beuwy.com/wp-content/uploads/2025/11/Vision-Imagefilm.webm",
    faktenAnzahl: 3,
    gebautAnzahl: 4,
  },
  { slug: "koenigswege", faktenAnzahl: 3, gebautAnzahl: 3 },
  { slug: "sanierungshaus-beispiel", beispiel: true, faktenAnzahl: 3, gebautAnzahl: 3 },
  { slug: "kapitalanlage-beispiel", beispiel: true, faktenAnzahl: 3, gebautAnzahl: 3 },
];

const CD = "s.cases-detail.";

/** Baut einen vollständigen Fall aus der Struktur (Index i) + einer Textquelle (Studio-Defaults oder getContent()). */
function baueFall(quelle: Record<string, string>, i: number): CaseStudy {
  const s = STRUKTUR[i];
  const n = i + 1; // 1-basiert, wie in den Studio-Keys
  const g = (key: string) => quelle[key] ?? "";

  const faktenStart = STRUKTUR.slice(0, i).reduce((summe, x) => summe + x.faktenAnzahl, 0);
  const gebautStart = STRUKTUR.slice(0, i).reduce((summe, x) => summe + x.gebautAnzahl, 0);

  const fakten: CaseFakt[] = Array.from({ length: s.faktenAnzahl }, (_, k) => ({
    wert: g(`${CD}fakten.${faktenStart + k + 1}.wert`), // studio:ok (Key-Konstruktion, kein Fließtext)
    label: g(`${CD}fakten.${faktenStart + k + 1}.label`), // studio:ok (Key-Konstruktion, kein Fließtext)
  }));
  const gebaut: string[] = Array.from({ length: s.gebautAnzahl }, (_, k) =>
    g(`${CD}gebaut.${gebautStart + k + 1}.text`), // studio:ok (Key-Konstruktion, kein Fließtext)
  );
  const videoLabel = g(`${CD}faelle.${n}.videoLabel`);

  return {
    slug: s.slug,
    kunde: g(`${CD}faelle.${n}.kunde`),
    branche: g(`${CD}faelle.${n}.branche`),
    jahr: g(`${CD}faelle.${n}.jahr`),
    reise: g(`${CD}faelle.${n}.titel`),
    teaser: g(`${CD}faelle.${n}.teaser`),
    fakten,
    ausgangslage: g(`${CD}faelle.${n}.ausgangslage`),
    gebaut,
    danach: g(`${CD}faelle.${n}.danach`),
    bild: s.bild,
    bildAlt: s.bildAlt,
    video: s.video,
    videoLabel: videoLabel || undefined,
    link: s.link,
    beispiel: s.beispiel,
  };
}

/** Fallback-Array mit den Studio-Defaults als Text — für alle Konsumenten ohne getContent(). */
export const CASES: CaseStudy[] = STRUKTUR.map((_, i) => baueFall(CASES_TEXTE, i));

export function caseBySlug(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}

/**
 * Reihenfolge-Vorgabe (GOAL/BRIEF, Leaf G1): Immobilien-Cases zuerst in
 * JEDER Listen-Reihenfolge — Übersicht, Startseite, "weitere Fallstudien".
 * Alle anderen behalten ihre Reihenfolge aus CASES (stabiler Sort).
 */
const IMMOBILIEN_ZUERST = ["riegel-immobilien", "vision-group", "koenigswege"];

export function orderedCases(): CaseStudy[] {
  const rang = (slug: string) => {
    const i = IMMOBILIEN_ZUERST.indexOf(slug);
    return i === -1 ? IMMOBILIEN_ZUERST.length : i;
  };
  return [...CASES].sort((a, b) => rang(a.slug) - rang(b.slug));
}

/** Wie caseBySlug(), aber mit live aus dem Studio gelesenen Texten (getContent()-Ergebnis). */
export function caseMitTexten(c: Record<string, string>, slug: string): CaseStudy | undefined {
  const i = STRUKTUR.findIndex((s) => s.slug === slug);
  if (i === -1) return undefined;
  return baueFall(c, i);
}

/** Wie orderedCases(), aber mit live aus dem Studio gelesenen Texten (getContent()-Ergebnis). */
export function casesMitTexten(c: Record<string, string>): CaseStudy[] {
  return orderedCases().map((basis) => caseMitTexten(c, basis.slug)!);
}
