/**
 * Fallstudien — Datenquelle für die Startseiten-Sektion und die
 * Unterseiten unter /cases/<slug>.
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

export const CASES: CaseStudy[] = [
  {
    slug: "riegel-immobilien",
    kunde: "RIEGEL Immobilien",
    branche: "Immobilienmakler · Rhein-Neckar",
    jahr: "2025",
    reise: "Vom regionalen Makler auf Platz 21 von über 25.000",
    teaser:
      "Neue Marke, eigener Bewertungsrechner mit amtlichen Bodenrichtwerten — und ein Auftritt, der die Preisfrage vorwegnimmt.",
    fakten: [
      { wert: "342.000 €", label: "Abschlussvolumen in sechs Wochen" },
      { wert: "9", label: "Abschlüsse in diesem Zeitraum" },
      { wert: "Platz 21", label: "von über 25.000 Maklern, ImmoScout24-Award" },
    ],
    ausgangslage:
      "Ein Familienunternehmen mit über zwanzig Jahren Erfahrung, dessen Auftritt davon nichts erzählte. Eigentümer verglichen drei Makler und entschieden nach dem, was sie vorher im Netz fanden.",
    gebaut: [
      "Marke und Website komplett neu, auf die Preisklasse zugeschnitten — und schnell genug, dass sie lädt, während der Eigentümer noch den nächsten Makler-Tab öffnet",
      "Bewertungsrechner mit amtlichen Bodenrichtwerten und über 5.000 ausgewerteten Verkäufen: Adresse rein, Ersteinschätzung raus — der Verkäufer-Lead liegt mit Score im CRM, nicht im Postfach",
      "Anbindung an das Maklersystem: Jede Anfrage landet mit Quelle und nächstem Schritt direkt im System. Kein Zettel, kein Copy-Paste, kein vergessener Rückruf",
      "Terminstrecke und Rückrufregel: Wer heute nicht verkauft, bekommt in sechs Monaten automatisch die richtige Mail",
    ],
    danach:
      "In den ersten sechs Wochen nach dem Relaunch: neun Abschlüsse, 342.000 € Volumen. Das Projekt hatte sich nach drei Wochen bezahlt gemacht. Heute steht das Haus auf Platz 21 von über 25.000 Maklern beim ImmoScout24-Award.",
    bild: "/refs/riegel.webp",
    bildAlt: "Startseite von RIEGEL Immobilien nach dem Relaunch",
    link: { label: "riegel-immobilien.de", href: "https://www.riegel-immobilien.de" },
  },
  {
    slug: "vision-group",
    kunde: "Vision Group",
    branche: "Immobilien · Mannheim",
    jahr: "2023",
    reise: "Von drei Leuten im Gründungsbüro zur Partnerschaft mit KKR",
    teaser:
      "Zwei Gründer, eine Buchhalterin — und Unterlagen, mit denen man vor internationalen Investoren besteht.",
    fakten: [
      { wert: "1.450", label: "Wohneinheiten entwickelt" },
      { wert: "160 Mio. €", label: "Joint Venture mit KKR" },
      { wert: "3", label: "Personen bei Projektstart" },
    ],
    ausgangslage:
      "Als wir einstiegen, bestand die Firma aus zwei Gründern und einer Buchhalterin. Der Anspruch war eine Liga, in der man ohne Auftritt kein Gespräch bekommt.",
    gebaut: [
      "Marke, Auftritt und Bildsprache für den Investorenmarkt",
      "Pitch- und Investorenunterlagen, die einer Prüfung standhalten",
      "Imagefilm als Träger der Positionierung",
      "Website als Beleg der Größenordnung, nicht als Visitenkarte",
    ],
    danach:
      "Aus dem Dreierteam wurden rund 70 Mitarbeiter, und im März 2022 ging Vision eine strategische Partnerschaft mit KKR ein — ein Joint Venture über 160 Mio. €, insgesamt 1.450 entwickelte Wohneinheiten. Das Haus hat den Zyklus danach nicht überstanden; die Zahlen hier sind der Höchststand von 2022, nicht der Stand heute. Was bleibt, ist das Prinzip: wer vor einer großen Entscheidung steht, kauft zuerst Vertrauen — und ein Dreierteam bekommt ohne Auftritt kein Gespräch mit einem Investor dieser Größe.",
    video: "https://beuwy.com/wp-content/uploads/2025/11/Vision-Imagefilm.webm",
    videoLabel: "Vision Group · Imagefilm",
  },
  {
    slug: "koenigswege",
    kunde: "Königswege",
    branche: "Finanzvertrieb",
    jahr: "2024",
    reise: "Von 60 auf über 2.300 Partner unter einer Marke",
    teaser:
      "Marke, Auftritt und Veranstaltungen neu aufgesetzt — bis das Recruiting nebenbei lief.",
    fakten: [
      { wert: "2.300+", label: "Partner arbeiten heute unter der Marke" },
      { wert: "Top 10", label: "der deutschen Finanzvertriebe" },
      { wert: "60", label: "Personen beim Start der Zusammenarbeit" },
    ],
    ausgangslage:
      "Ein Finanzvertrieb wächst über Menschen, die sich der Marke anschließen wollen. Genau daran hakte es: Der Auftritt trug die Ambition nicht.",
    gebaut: [
      "Marke und Auftritt komplett neu aufgesetzt",
      "Veranstaltungsformate, auf die Partner stolz sind",
      "Recruiting-Strecke, die aus Interesse einen Termin macht",
    ],
    danach:
      "Heute arbeiten über 2.300 Partner unter dieser Marke, das Haus steht in den Top 10 der deutschen Finanzvertriebe. Eine Marke, auf die Partner stolz sind, erledigt das Recruiting nebenbei.",
  },
  {
    slug: "sanierungshaus-beispiel",
    kunde: "Bergmann Sanierung",
    branche: "Bauträger · Sanierung",
    jahr: "2026",
    reise: "Von zwölf Anfragen im Quartal auf zwölf im Monat",
    teaser:
      "Beispielprojekt: wie ein Bauträger mit hohen Auftragswerten aus dem Empfehlungsgeschäft in planbare Anfragen kommt.",
    fakten: [
      { wert: "12", label: "qualifizierte Anfragen im Monat" },
      { wert: "38 %", label: "weniger Kosten je Termin" },
      { wert: "4", label: "Wochen bis zum ersten Abschluss" },
    ],
    ausgangslage:
      "Ein Betrieb, der ausschließlich über Empfehlungen wuchs — und dessen Auftragsbuch deshalb im Quartalstakt schwankte.",
    gebaut: [
      "Marke, die die Preisklasse sichtbar macht",
      "Anzeigen auf die Regionen mit dem passenden Bestand",
      "Vertriebssystem mit Rückrufregel und Wochenbericht",
    ],
    danach:
      "Platzhalter-Fall mit erfundenen Zahlen. Er zeigt den Aufbau einer Fallstudie, bis der echte Fall dokumentiert ist.",
    beispiel: true,
  },
  {
    slug: "kapitalanlage-beispiel",
    kunde: "Nordlicht Kapital",
    branche: "Kapitalanlage",
    jahr: "2026",
    reise: "Vom Excel-Vertrieb zum System, das nichts mehr liegen lässt",
    teaser:
      "Beispielprojekt: was passiert, wenn jede Anfrage im System landet statt in der Erinnerung.",
    fakten: [
      { wert: "0", label: "Anfragen ohne Rückruf" },
      { wert: "5 Min", label: "Rückrufregel im Vertriebssystem" },
      { wert: "1", label: "Wochenbericht statt Bauchgefühl" },
    ],
    ausgangslage:
      "Anfragen kamen an, wurden aber in Listen gepflegt. Was in keinem System steht, wird nicht nachgefasst.",
    gebaut: [
      "Eigenes, reduziertes CRM statt Standardsoftware mit 400 Feldern",
      "Personalisierte Datenmail zum konkreten Angebot",
      "Automatische Wochenberichte mit Kosten je Abschluss",
    ],
    danach:
      "Platzhalter-Fall mit erfundenen Zahlen. Er zeigt den Aufbau einer Fallstudie, bis der echte Fall dokumentiert ist.",
    beispiel: true,
  },
];

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
