/**
 * Belegte Kennzahlen der drei echten Kunden — Datengrundlage für das
 * Kennzahlen-Dashboard.
 *
 * REGEL FÜR DIESE DATEI: Hier steht nur, was belegbar ist. Jeder Punkt
 * einer Kurve ist ein dokumentierter Stand zu einem dokumentierten
 * Zeitpunkt. Zwischenwerte werden NICHT erfunden — die Linie verbindet
 * die Punkte, sie behauptet keinen Verlauf dazwischen. Deshalb hat jede
 * Kurve eine `quelle`, die im Dashboard sichtbar ist.
 *
 * Jeder Kunde hat seine eigene Achse und seine eigene Einheit. Es gibt
 * bewusst keine gemeinsame Skala: Partner, Mitarbeiter und Umsatz sind
 * nicht vergleichbar, und ein gemeinsames Diagramm würde eine
 * Vergleichbarkeit behaupten, die es nicht gibt.
 */

export type Punkt = {
  /** Beschriftung der X-Achse, z. B. "2021" oder "Woche 6" */
  zeit: string;
  wert: number;
  /** Angezeigter Wert, falls die Formatierung abweicht (z. B. "2.200+") */
  anzeige?: string;
  /** Markiert den Punkt, an dem die Zusammenarbeit begann */
  start?: boolean;
};

export type Kennzahl = {
  label: string;
  wert: string;
  /** Kurze Einordnung unter der Zahl */
  hinweis: string;
};

export type KundenKurve = {
  id: string;
  kunde: string;
  branche: string;
  /** Slug der Fallstudie, für den Weiterlesen-Link */
  slug: string;
  /** Was auf der Y-Achse steht */
  einheit: string;
  /** Die Kernaussage, rechts oben groß */
  leitzahl: string;
  leitzahlLabel: string;
  punkte: Punkt[];
  kennzahlen: Kennzahl[];
  quelle: string;
};

export const KURVEN: KundenKurve[] = [
  {
    id: "koenigswege",
    kunde: "Königswege",
    branche: "Finanzvertrieb",
    slug: "koenigswege",
    einheit: "Partner unter der Marke",
    leitzahl: "×13",
    leitzahlLabel: "Partner seit Projektstart",
    punkte: [
      { zeit: "2017", wert: 51 },
      { zeit: "2021", wert: 170, start: true },
      { zeit: "2026", wert: 2200, anzeige: "2.200+" },
    ],
    kennzahlen: [
      { label: "Partner heute", wert: "2.200+", hinweis: "2021 waren es 170" },
      { label: "Vor der Zusammenarbeit", wert: "51", hinweis: "Stand 2017" },
      { label: "Marktposition", wert: "Top 10", hinweis: "der deutschen Finanzvertriebe" },
    ],
    quelle: "Angaben Königswege · Projektstart 2021",
  },
  {
    id: "vision-group",
    kunde: "Vision Group",
    branche: "Immobilien · Mannheim",
    slug: "vision-group",
    einheit: "Mitarbeiter",
    leitzahl: "160 Mio. €",
    leitzahlLabel: "Volumen des JV mit KKR",
    punkte: [
      { zeit: "2023", wert: 3, start: true },
      { zeit: "2026", wert: 70 },
    ],
    kennzahlen: [
      { label: "Team heute", wert: "70", hinweis: "bei Projektstart drei Personen" },
      { label: "Wohneinheiten", wert: "1.400", hinweis: "zum Höchststand" },
      { label: "Partner", wert: "KKR", hinweis: "Gemeinschaftsunternehmen, 160 Mio. €" },
    ],
    quelle: "Angaben Vision Group · Projektstart 2023",
  },
  {
    id: "riegel",
    kunde: "RIEGEL Immobilien",
    branche: "Makler · Rhein-Neckar",
    slug: "riegel-immobilien",
    einheit: "Abschlussvolumen in €",
    leitzahl: "Platz 21",
    leitzahlLabel: "von über 25.000 Maklern",
    punkte: [
      { zeit: "Relaunch", wert: 0, start: true },
      { zeit: "Woche 6", wert: 342000, anzeige: "342.000 €" },
    ],
    kennzahlen: [
      { label: "Volumen", wert: "342.000 €", hinweis: "in den ersten sechs Wochen" },
      { label: "Abschlüsse", wert: "9", hinweis: "im selben Zeitraum" },
      { label: "ImmoScout24-Award", wert: "Platz 21", hinweis: "von über 25.000 Maklern, 2025" },
    ],
    quelle: "Angaben RIEGEL Immobilien · ImmoScout24 ImmoAward 2025",
  },
];
