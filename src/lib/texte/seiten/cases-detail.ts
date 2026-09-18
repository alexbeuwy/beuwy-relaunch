import { listeRegistrieren } from "../lesen";

/**
 * Studio-Texte /cases/[slug] — Fallstudien-Inhalte + die statischen
 * Rahmentexte der Detailseite. Struktur (Slugs, Bild-/Video-Pfade,
 * Reihenfolge, Beispielprojekt-Kennzeichnung) bleibt in src/lib/cases.ts
 * als Code; hier stehen nur die Texte, in derselben Reihenfolge wie dort
 * (riegel-immobilien, vision-group, koenigswege, sanierungshaus-beispiel,
 * kapitalanlage-beispiel). cases.ts liest diese Keys über
 * caseMitTexten()/casesMitTexten() und legt sie über die Code-Struktur.
 */
export const SEITE = { slug: "cases-detail", titel: "Fallstudien (Inhalte)", route: "/cases/[slug]" };
const S = "s.cases-detail.";

/* Ein Eintrag je Fall aus CASES, in genau dieser Reihenfolge. */
const faelle = listeRegistrieren(
  "cases-detail",
  "faelle",
  "Fallstudie",
  [
    {
      kunde: "RIEGEL Immobilien",
      branche: "Immobilienmakler · Rhein-Neckar",
      jahr: "2025",
      titel: "Vom regionalen Makler auf Platz 21 von über 25.000",
      teaser:
        "Neue Marke, eigener Bewertungsrechner mit amtlichen Bodenrichtwerten — und ein Auftritt, der die Preisfrage vorwegnimmt.",
      ausgangslage:
        "Ein Familienunternehmen mit über zwanzig Jahren Erfahrung, dessen Auftritt davon nichts erzählte. Eigentümer verglichen drei Makler und entschieden nach dem, was sie vorher im Netz fanden.",
      danach:
        "In den ersten sechs Wochen nach dem Relaunch: neun Abschlüsse, 342.000 € Volumen. Das Projekt hatte sich nach drei Wochen bezahlt gemacht. Heute steht das Haus auf Platz 21 von über 25.000 Maklern beim ImmoScout24-Award.",
      videoLabel: "",
    },
    {
      kunde: "Vision Group",
      branche: "Immobilien · Mannheim",
      jahr: "2023",
      titel: "Von drei Leuten im Gründungsbüro zur Partnerschaft mit KKR",
      teaser:
        "Zwei Gründer, eine Buchhalterin — und Unterlagen, mit denen man vor internationalen Investoren besteht.",
      ausgangslage:
        "Als wir einstiegen, bestand die Firma aus zwei Gründern und einer Buchhalterin. Der Anspruch war eine Liga, in der man ohne Auftritt kein Gespräch bekommt.",
      danach:
        "Aus dem Dreierteam wurden rund 70 Mitarbeiter, und im März 2022 ging Vision eine strategische Partnerschaft mit KKR ein — ein Joint Venture über 160 Mio. €, insgesamt 1.450 entwickelte Wohneinheiten. Das Haus hat den Zyklus danach nicht überstanden; die Zahlen hier sind der Höchststand von 2022, nicht der Stand heute. Was bleibt, ist das Prinzip: wer vor einer großen Entscheidung steht, kauft zuerst Vertrauen — und ein Dreierteam bekommt ohne Auftritt kein Gespräch mit einem Investor dieser Größe.",
      videoLabel: "Vision Group · Imagefilm",
    },
    {
      kunde: "Königswege",
      branche: "Finanzvertrieb",
      jahr: "2024",
      titel: "Von 60 auf über 2.300 Partner unter einer Marke",
      teaser: "Marke, Auftritt und Veranstaltungen neu aufgesetzt — bis das Recruiting nebenbei lief.",
      ausgangslage:
        "Ein Finanzvertrieb wächst über Menschen, die sich der Marke anschließen wollen. Genau daran hakte es: Der Auftritt trug die Ambition nicht.",
      danach:
        "Heute arbeiten über 2.300 Partner unter dieser Marke, das Haus steht in den Top 10 der deutschen Finanzvertriebe. Eine Marke, auf die Partner stolz sind, erledigt das Recruiting nebenbei.",
      videoLabel: "",
    },
    {
      kunde: "Bergmann Sanierung",
      branche: "Bauträger · Sanierung",
      jahr: "2026",
      titel: "Von zwölf Anfragen im Quartal auf zwölf im Monat",
      teaser:
        "Beispielprojekt: wie ein Bauträger mit hohen Auftragswerten aus dem Empfehlungsgeschäft in planbare Anfragen kommt.",
      ausgangslage:
        "Ein Betrieb, der ausschließlich über Empfehlungen wuchs — und dessen Auftragsbuch deshalb im Quartalstakt schwankte.",
      danach:
        "Platzhalter-Fall mit erfundenen Zahlen. Er zeigt den Aufbau einer Fallstudie, bis der echte Fall dokumentiert ist.",
      videoLabel: "",
    },
    {
      kunde: "Nordlicht Kapital",
      branche: "Kapitalanlage",
      jahr: "2026",
      titel: "Vom Excel-Vertrieb zum System, das nichts mehr liegen lässt",
      teaser: "Beispielprojekt: was passiert, wenn jede Anfrage im System landet statt in der Erinnerung.",
      ausgangslage:
        "Anfragen kamen an, wurden aber in Listen gepflegt. Was in keinem System steht, wird nicht nachgefasst.",
      danach:
        "Platzhalter-Fall mit erfundenen Zahlen. Er zeigt den Aufbau einer Fallstudie, bis der echte Fall dokumentiert ist.",
      videoLabel: "",
    },
  ],
  { kunde: "Kunde", branche: "Branche", jahr: "Jahr", titel: "Reise/Titel", teaser: "Teaser", ausgangslage: "Ausgangslage", danach: "Was danach passierte", videoLabel: "Video-Bildunterschrift (nur falls Video vorhanden)" },
);

/* Ergebnis-Zahlen, flach über alle Fälle (3 je Fall, Reihenfolge wie CASES). */
const fakten = listeRegistrieren(
  "cases-detail",
  "fakten",
  "Ergebnis-Zahl",
  [
    { fall: "RIEGEL Immobilien", wert: "342.000 €", label: "Abschlussvolumen in sechs Wochen" },
    { fall: "RIEGEL Immobilien", wert: "9", label: "Abschlüsse in diesem Zeitraum" },
    { fall: "RIEGEL Immobilien", wert: "Platz 21", label: "von über 25.000 Maklern, ImmoScout24-Award" },
    { fall: "Vision Group", wert: "1.450", label: "Wohneinheiten entwickelt" },
    { fall: "Vision Group", wert: "160 Mio. €", label: "Joint Venture mit KKR" },
    { fall: "Vision Group", wert: "3", label: "Personen bei Projektstart" },
    { fall: "Königswege", wert: "2.300+", label: "Partner arbeiten heute unter der Marke" },
    { fall: "Königswege", wert: "Top 10", label: "der deutschen Finanzvertriebe" },
    { fall: "Königswege", wert: "60", label: "Personen beim Start der Zusammenarbeit" },
    { fall: "Bergmann Sanierung", wert: "12", label: "qualifizierte Anfragen im Monat" },
    { fall: "Bergmann Sanierung", wert: "38 %", label: "weniger Kosten je Termin" },
    { fall: "Bergmann Sanierung", wert: "4", label: "Wochen bis zum ersten Abschluss" },
    { fall: "Nordlicht Kapital", wert: "0", label: "Anfragen ohne Rückruf" },
    { fall: "Nordlicht Kapital", wert: "5 Min", label: "Rückrufregel im Vertriebssystem" },
    { fall: "Nordlicht Kapital", wert: "1", label: "Wochenbericht statt Bauchgefühl" },
  ],
  { fall: "Fall (nur Orientierung, wird nicht gelesen)", wert: "Wert", label: "Beschriftung" },
);

/* "Was wir gebaut haben"-Punkte, flach über alle Fälle (4/4/3/3/3, Reihenfolge wie CASES). */
const gebaut = listeRegistrieren(
  "cases-detail",
  "gebaut",
  "Gebaut-Punkt",
  [
    {
      fall: "RIEGEL Immobilien",
      text: "Marke und Website komplett neu, auf die Preisklasse zugeschnitten — und schnell genug, dass sie lädt, während der Eigentümer noch den nächsten Makler-Tab öffnet",
    },
    {
      fall: "RIEGEL Immobilien",
      text: "Bewertungsrechner mit amtlichen Bodenrichtwerten und über 5.000 ausgewerteten Verkäufen: Adresse rein, Ersteinschätzung raus — der Verkäufer-Lead liegt mit Score im CRM, nicht im Postfach",
    },
    {
      fall: "RIEGEL Immobilien",
      text: "Anbindung an das Maklersystem: Jede Anfrage landet mit Quelle und nächstem Schritt direkt im System. Kein Zettel, kein Copy-Paste, kein vergessener Rückruf",
    },
    {
      fall: "RIEGEL Immobilien",
      text: "Terminstrecke und Rückrufregel: Wer heute nicht verkauft, bekommt in sechs Monaten automatisch die richtige Mail",
    },
    { fall: "Vision Group", text: "Marke, Auftritt und Bildsprache für den Investorenmarkt" },
    { fall: "Vision Group", text: "Pitch- und Investorenunterlagen, die einer Prüfung standhalten" },
    { fall: "Vision Group", text: "Imagefilm als Träger der Positionierung" },
    { fall: "Vision Group", text: "Website als Beleg der Größenordnung, nicht als Visitenkarte" },
    { fall: "Königswege", text: "Marke und Auftritt komplett neu aufgesetzt" },
    { fall: "Königswege", text: "Veranstaltungsformate, auf die Partner stolz sind" },
    { fall: "Königswege", text: "Recruiting-Strecke, die aus Interesse einen Termin macht" },
    { fall: "Bergmann Sanierung", text: "Marke, die die Preisklasse sichtbar macht" },
    { fall: "Bergmann Sanierung", text: "Anzeigen auf die Regionen mit dem passenden Bestand" },
    { fall: "Bergmann Sanierung", text: "Vertriebssystem mit Rückrufregel und Wochenbericht" },
    { fall: "Nordlicht Kapital", text: "Eigenes, reduziertes CRM statt Standardsoftware mit 400 Feldern" },
    { fall: "Nordlicht Kapital", text: "Personalisierte Datenmail zum konkreten Angebot" },
    { fall: "Nordlicht Kapital", text: "Automatische Wochenberichte mit Kosten je Abschluss" },
  ],
  { fall: "Fall (nur Orientierung, wird nicht gelesen)", text: "Text" },
);

export const DEFAULTS: Record<string, string> = {
  ...faelle.defaults,
  ...fakten.defaults,
  ...gebaut.defaults,
  [`${S}meta.titel_suffix`]: " — beuwy",
  [`${S}ui.zurueck_link`]: "← Alle Fallstudien",
  [`${S}ui.badge_beispiel`]: "Beispielprojekt · erfundene Zahlen",
  [`${S}ui.abschnitt_ausgangslage`]: "Ausgangslage",
  [`${S}ui.abschnitt_gebaut`]: "Was wir gebaut haben",
  [`${S}ui.abschnitt_danach`]: "Was danach passierte",
  [`${S}ui.quelle_vor`]: "Wie wir das systematisch für führende Makler bauen →",
  [`${S}ui.quelle_link`]: "Immobilienmarketing im Überblick",
  [`${S}ui.weitere_label`]: "Weitere Fallstudien",
  [`${S}ui.weitere_marke`]: "Beispielprojekt",
  [`${S}ui.weitere_lesen`]: "Fallstudie lesen →",
  [`${S}abschluss.label`]: "Nächster Schritt",
  [`${S}abschluss.titel`]: "Wenn Ihre Zahlen so aussehen sollen, sprechen wir darüber.",
  [`${S}abschluss.text`]:
    "30 Minuten, kein Pitch. Wir sagen ehrlich, ob ein Projekt wie dieses für Sie machbar ist, mit 17 Jahren Erfahrung darin, was tatsächlich funktioniert.",
  [`${S}abschluss.cta`]: "Zusammenarbeit anfragen",
};

export const LABELS: Record<string, string> = {
  ...faelle.labels,
  ...fakten.labels,
  ...gebaut.labels,
  [`${S}meta.titel_suffix`]: "SEO · Browser-Titel · Suffix nach der Fallstudien-Reise",
  [`${S}ui.zurueck_link`]: "Kopf · Zurück-Link",
  [`${S}ui.badge_beispiel`]: "Kopf · Beispielprojekt-Badge (nur Platzhalter-Fälle)",
  [`${S}ui.abschnitt_ausgangslage`]: "Zwischentitel · Ausgangslage",
  [`${S}ui.abschnitt_gebaut`]: "Zwischentitel · Was wir gebaut haben",
  [`${S}ui.abschnitt_danach`]: "Zwischentitel · Was danach passierte",
  [`${S}ui.quelle_vor`]: "Quellenhinweis · Teil vor dem Link",
  [`${S}ui.quelle_link`]: "Quellenhinweis · Link-Text (führt zu /immobilienmarketing)",
  [`${S}ui.weitere_label`]: "Weitere Fallstudien · Label",
  [`${S}ui.weitere_marke`]: "Weitere Fallstudien · Beispielprojekt-Marker",
  [`${S}ui.weitere_lesen`]: "Weitere Fallstudien · Link-Mikrotext",
  [`${S}abschluss.label`]: "Abschluss-Karte · Label",
  [`${S}abschluss.titel`]: "Abschluss-Karte · Titel",
  [`${S}abschluss.text`]: "Abschluss-Karte · Text",
  [`${S}abschluss.cta`]: "Abschluss-Karte · CTA-Text (führt zu /anfrage)",
};
