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
  /**
   * Position der Start-Marke auf der X-Achse (0…1), wenn der Start
   * ZWISCHEN zwei Messungen liegt statt auf einer. Ohne Angabe sitzt die
   * Marke auf dem Punkt mit `start: true`.
   */
  startBei?: number;
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
        /* Der Start liegt 2020. Auf diesem Strang gibt es dafuer keine
           Messung, deshalb anteilig: (2020 - 2017) / (2026 - 2017). */
        startBei: 0.3333,
        punkte: [
          { zeit: "2017", wert: 51 },
          { zeit: "2021", wert: 170 },
          { zeit: "2022", wert: 800 },
          { zeit: "2025", wert: 1700, anzeige: "1.700" },
          { zeit: "2026", wert: 2210, anzeige: "2.210" },
        ],
        herkunft: "geprueft",
        quelle:
          "2022 aus der Presseliste von Königswege (ZZF-Podcast, 04.08.2022), 2025 aus einem Branchenbeitrag vom 07.05.2025, Stand 2026 öffentlich auf koenigswege.com · 2017 und 2021: Angaben Königswege",
      },
      {
        id: "provision",
        label: "Provisionserlös",
        einheit: "Provisionserlös in Mio. €",
        punkte: [
          { zeit: "2018", wert: 3.1, anzeige: "3,1 Mio." },
          { zeit: "2019", wert: 4.3, anzeige: "4,3 Mio." },
          { zeit: "2020", wert: 9.4, anzeige: "9,4 Mio.", start: true },
          { zeit: "2021", wert: 17.64, anzeige: "17,64 Mio." },
          { zeit: "2022", wert: 22.1, anzeige: "22,10 Mio." },
          { zeit: "2023", wert: 29.99, anzeige: "29,99 Mio." },
          { zeit: "2024", wert: 34.78, anzeige: "34,78 Mio." },
        ],
        herkunft: "geprueft",
        quelle:
          "2022 bis 2024 aus der Cash-Hitliste der Finanzvertriebe (Jahrgänge 2023 bis 2025), 2021 aus einem Branchenbeitrag, 2018 bis 2020 Angaben Königswege · der Wert für 2022 enthält 1,59 Mio. € Beratungshonorare",
      },
      {
        id: "standorte",
        label: "Standorte",
        einheit: "Standorte in Deutschland",
        punkte: [
          { zeit: "2018", wert: 5 },
          { zeit: "2019", wert: 8 },
          { zeit: "2020", wert: 12, start: true },
          { zeit: "2021", wert: 16 },
          { zeit: "2022", wert: 35 },
          { zeit: "2025", wert: 67 },
          { zeit: "2026", wert: 85 },
        ],
        herkunft: "geprueft",
        quelle:
          "2022 aus der Presseliste von Königswege (04.08.2022), 2025 aus einem Branchenbeitrag vom 07.05.2025, Stand 2026 öffentlich auf koenigswege.com · 2018 bis 2021 Angaben Königswege",
      },
    ],
    kennzahlen: [
      {
        label: "Vertriebspartner",
        wert: "2.210",
        hinweis: "2021 waren es 170",
        herkunft: "geprueft",
      },
      {
        label: "Standorte",
        wert: "85",
        hinweis: "2021 waren es 16",
        herkunft: "geprueft",
      },
      {
        label: "Provisionserlös",
        wert: "34,78 Mio. €",
        hinweis: "2024, Platz 10 der Cash-Hitliste — erstmals unter den Top Ten",
        herkunft: "geprueft",
      },
    ],
  },
  {
    id: "vision-group",
    kunde: "Vision Group",
    branche: "Wohnimmobilien · Mannheim",
    slug: "vision-group",
    logo: "/kunden/vision.png",
    leitzahl: "KKR",
    leitzahlLabel: "Partner ab März 2022",
    straenge: [
      {
        id: "team",
        label: "Mitarbeiter",
        einheit: "Mitarbeiter",
        punkte: [
          { zeit: "2018", wert: 3, start: true },
          { zeit: "2022", wert: 70 },
        ],
        herkunft: "kunde",
        quelle: "Angaben Vision Group · Projektstart 2018, Höchststand 2022",
      },
      {
        id: "ankaeufe",
        label: "Ankäufe pro Jahr",
        einheit: "angekaufte Wohneinheiten pro Jahr",
        punkte: [
          { zeit: "2018", wert: 45, anzeige: "40–50", start: true },
          { zeit: "2022", wert: 770 },
        ],
        herkunft: "kunde",
        quelle: "Angaben Vision Group · 2018 als Größenordnung von 40 bis 50 Einheiten",
      },
      {
        id: "bestand",
        label: "Bestand",
        einheit: "Wohneinheiten im Bestand",
        punkte: [
          { zeit: "2018", wert: 45, anzeige: "40–50", start: true },
          { zeit: "2022", wert: 1385, anzeige: "1.385" },
        ],
        herkunft: "kunde",
        quelle: "Angaben Vision Group · Bestand zum Höchststand 2022",
      },
    ],
    kennzahlen: [
      {
        label: "Team zum Höchststand",
        wert: "70",
        hinweis: "2018 waren es drei Personen",
        herkunft: "kunde",
      },
      {
        label: "Wohneinheiten im Bestand",
        wert: "1.385",
        hinweis: "2022 — bei Projektstart waren es 40 bis 50 pro Jahr",
        herkunft: "kunde",
      },
      {
        label: "Partnerschaft mit KKR",
        wert: "März 2022",
        hinweis:
          "KKR hält seit 1999 Beteiligungen an 29 Unternehmen im deutschsprachigen Raum — Axel Springer, Wella, Hensoldt",
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
        /* ImmoScout24 zaehlt rollierend die letzten sechs Monate, nicht
           einen Monat — die Bezeichnung muss das sagen, sonst steht dort
           das Sechsfache. */
        einheit: "Exposé-Aufrufe, rollierend über sechs Monate",
        punkte: [
          { zeit: "vor Relaunch", wert: 50000, anzeige: "50.000" },
          { zeit: "heute", wert: 292514, anzeige: "292.514" },
        ],
        /* Der Relaunch liegt zwischen den beiden Messungen, nicht auf
           einer davon. Die Achse ist hier ordinal ("vorher"/"heute"),
           deshalb steht die Marke mittig zwischen ihnen. */
        startBei: 0.5,
        herkunft: "schaetzung",
        quelle:
          "Stand heute vom ImmoScout24-Anbieterprofil (immobilienscout24.de/anbieter/profil/riegel-immobilien) · Wert vor dem Relaunch ist eine Größenordnung und noch nicht belegt",
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
