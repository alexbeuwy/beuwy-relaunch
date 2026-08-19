/**
 * Belegte Kennzahlen der drei echten Kunden — Datengrundlage für das
 * Kennzahlen-Dashboard.
 *
 * REGEL FÜR DIESE DATEI: Hier steht nur, was eine Herkunft hat. Jeder
 * Punkt ist ein dokumentierter Stand zu einem dokumentierten Zeitpunkt.
 * Zwischenwerte werden NICHT erfunden — die Linie verbindet die Punkte,
 * sie behauptet keinen Verlauf dazwischen.
 *
 * `herkunft` unterscheidet drei Stufen, und das Dashboard zeigt sie an:
 *   "geprueft"  — öffentlich nachprüfbar (Website des Kunden, Presse)
 *   "kunde"     — Angabe des Kunden bzw. aus dem Projekt
 *   "schaetzung" — Größenordnung, noch nicht gegengeprüft
 *
 * Wo eine Jahreszahl fehlt, steht ein Label statt eines Jahres
 * ("Projektstart"). Ein erfundenes Jahr wäre schlimmer als eine
 * unbeschriftete Achse.
 */

export type Herkunft = "geprueft" | "kunde" | "schaetzung";

export type Punkt = {
  /** Beschriftung der X-Achse: Jahr ("2021") oder Label ("Projektstart") */
  zeit: string;
  wert: number;
  /** Abweichende Anzeige, z. B. "2.210" oder "420.000" */
  anzeige?: string;
  /** Markiert den Punkt, an dem die Zusammenarbeit begann */
  start?: boolean;
};

export type Strang = {
  id: string;
  /** Kurzer Name für die Umschaltung */
  label: string;
  /** Was auf der Y-Achse steht */
  einheit: string;
  punkte: Punkt[];
  herkunft: Herkunft;
  quelle: string;
};

export type Kennzahl = {
  label: string;
  wert: string;
  hinweis: string;
  herkunft: Herkunft;
};

export type KundenKurve = {
  id: string;
  kunde: string;
  branche: string;
  /** Slug der Fallstudie */
  slug: string;
  /** Logo im Repo, sonst wird der Name als Wortmarke gesetzt */
  logo?: string;
  /** Die Kernaussage, rechts oben groß */
  leitzahl: string;
  leitzahlLabel: string;
  straenge: Strang[];
  kennzahlen: Kennzahl[];
};

export const KURVEN: KundenKurve[] = [
  {
    id: "koenigswege",
    kunde: "Königswege",
    branche: "Finanzvertrieb · Heidelberg",
    slug: "koenigswege",
    logo: "/kunden/koenigswege.svg",
    leitzahl: "×13",
    leitzahlLabel: "Vertriebspartner seit Projektstart",
    straenge: [
      {
        id: "partner",
        label: "Vertriebspartner",
        einheit: "Vertriebspartner unter der Marke",
        punkte: [
          { zeit: "2017", wert: 51 },
          { zeit: "2021", wert: 170, start: true },
          { zeit: "2026", wert: 2210, anzeige: "2.210" },
        ],
        herkunft: "geprueft",
        quelle: "Stand 2026 öffentlich auf koenigswege.com · frühere Stände: Angaben Königswege",
      },
    ],
    kennzahlen: [
      {
        label: "Vertriebspartner",
        wert: "2.210",
        hinweis: "2021 waren es 170",
        herkunft: "geprueft",
      },
      { label: "Standorte", wert: "85", hinweis: "bundesweit", herkunft: "geprueft" },
      {
        label: "Marktposition",
        wert: "Top 10",
        hinweis: "der deutschen Finanzvertriebe",
        herkunft: "kunde",
      },
    ],
  },
  {
    id: "vision-group",
    kunde: "Vision Group",
    branche: "Wohnimmobilien · Mannheim",
    slug: "vision-group",
    leitzahl: "KKR",
    leitzahlLabel: "Partner ab März 2022",
    straenge: [
      {
        id: "team",
        label: "Team",
        einheit: "Mitarbeiter",
        punkte: [
          { zeit: "Projektstart", wert: 3, start: true },
          { zeit: "Peak 2022", wert: 70 },
        ],
        herkunft: "kunde",
        quelle: "Angaben Vision Group",
      },
    ],
    kennzahlen: [
      {
        label: "Team zum Höchststand",
        wert: "70",
        hinweis: "bei Projektstart drei Personen",
        herkunft: "kunde",
      },
      {
        label: "Wohneinheiten",
        wert: "1.400",
        hinweis: "zum Höchststand 2022",
        herkunft: "kunde",
      },
      {
        label: "Partnerschaft mit KKR",
        wert: "März 2022",
        hinweis: "erste Transaktion: 163 Wohneinheiten in Dingolfing",
        herkunft: "geprueft",
      },
    ],
  },
  {
    id: "riegel",
    kunde: "RIEGEL Immobilien",
    branche: "Makler · Rhein-Neckar",
    slug: "riegel-immobilien",
    logo: "/kunden/riegel.svg",
    leitzahl: "Platz 21",
    leitzahlLabel: "von über 25.000 Maklern",
    straenge: [
      {
        id: "exposes",
        label: "Exposé-Aufrufe",
        einheit: "Exposé-Aufrufe pro Monat",
        punkte: [
          { zeit: "vor Relaunch", wert: 50000, anzeige: "50.000" },
          { zeit: "heute", wert: 420000, anzeige: "420.000" },
        ],
        herkunft: "schaetzung",
        quelle: "Größenordnung laut RIEGEL — vor Veröffentlichung gegenzuprüfen",
      },
      {
        id: "abschluesse",
        label: "Abschlussvolumen",
        einheit: "Abschlussvolumen in € nach dem Relaunch",
        punkte: [
          { zeit: "Relaunch", wert: 0, start: true },
          { zeit: "Woche 6", wert: 342000, anzeige: "342.000 €" },
        ],
        herkunft: "kunde",
        quelle: "Angaben RIEGEL Immobilien",
      },
    ],
    kennzahlen: [
      {
        label: "ImmoScout24-Award",
        wert: "Platz 21",
        hinweis: "von über 25.000 Maklern, 2025",
        herkunft: "geprueft",
      },
      {
        label: "Volumen",
        wert: "342.000 €",
        hinweis: "in den ersten sechs Wochen",
        herkunft: "kunde",
      },
      { label: "Abschlüsse", wert: "9", hinweis: "im selben Zeitraum", herkunft: "kunde" },
    ],
  },
];

export const HERKUNFT_LABEL: Record<Herkunft, string> = {
  geprueft: "Öffentlich nachprüfbar",
  kunde: "Angabe des Kunden",
  schaetzung: "Größenordnung, wird noch geprüft",
};
