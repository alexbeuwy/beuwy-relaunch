import { listeRegistrieren } from "../lesen";

/** Studio-Texte /verkaeufer-ansprechen — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "verkaeufer-ansprechen", titel: "Verkäufer ansprechen", route: "/verkaeufer-ansprechen" };
const S = "s.verkaeufer-ansprechen.";

const signale = listeRegistrieren(
  "verkaeufer-ansprechen",
  "signale",
  "Frühsignal",
  [
    {
      titel: "Erbschaft",
      signal:
        "Eine Immobilie fällt in eine Erbengemeinschaft, oft mit unterschiedlichen Interessen zwischen Verkaufen und Behalten.",
      anker:
        "Ein Ratgeber-Artikel zu „Geerbte Immobilie verkaufen oder vermieten“ plus Bewertungsrechner rankt genau dann, wenn ein Erbe zu recherchieren beginnt, ohne dass jemand personenbezogene Daten aus einem Nachlassregister zieht.",
    },
    {
      titel: "Auszug der Kinder",
      signal:
        "Das Haus wird zu groß, die Frage nach Downsizing oder Vermieten der freien Zimmer taucht zum ersten Mal auf.",
      anker:
        "Content zu „Haus zu groß, was jetzt?“ mit einem Vergleichsrechner Verkauf gegen Vermietung fängt genau diesen Moment ab, lange bevor ein Exposé überhaupt in Frage kommt.",
    },
    {
      titel: "Auslaufende Zinsbindung",
      signal:
        "Die Anschlussfinanzierung steht an, der Eigentümer prüft zum ersten Mal ernsthaft Alternativen zum Halten.",
      anker:
        "Ein Artikel zu „Zinsbindung läuft aus: Verkaufen oder refinanzieren?“, ergänzt um eine Datenmail an bereits eingewilligte Kontakte zum passenden Zeitpunkt.",
    },
    {
      titel: "Jobwechsel oder Umzug",
      signal: "Ein Ortswechsel erzwingt eine Entscheidung über die bisherige Immobilie.",
      anker:
        "Eine lokale Landingpage samt Rechner für den Fernverkauf-Prozess erreicht diese Zielgruppe, während sie noch nach dem neuen Wohnort sucht, nicht erst nach einem Makler.",
    },
    {
      titel: "Trennung oder Scheidung",
      signal: "Die gemeinsame Immobilie muss aufgeteilt werden, ein sensibles, oft belastetes Thema.",
      anker:
        "Sachlicher, einfühlsamer Content ohne Verkaufsdruck baut Vertrauen auf, bevor der erste Kontakt entsteht, statt mit einer Werbeanzeige in eine ohnehin schwierige Lage zu platzen.",
    },
    {
      titel: "Renteneintritt",
      signal: "Altersgerechtes Wohnen wird zum ersten Mal ernsthaft zum Thema.",
      anker:
        "Ein Artikel zu „Immobilie im Ruhestand: verkaufen, vermieten oder umbauen“ positioniert Sie als Ansprechpartner, bevor der Entschluss überhaupt feststeht.",
    },
  ],
  { titel: "Titel", signal: "Signal", anker: "Anker" },
);

const faq = listeRegistrieren(
  "verkaeufer-ansprechen",
  "faq",
  "FAQ",
  [
    {
      q: "Ist die Ansprache vor dem Verkaufsentschluss DSGVO-konform?",
      a: "Ja, solange sie über Inhalte läuft, die jemand freiwillig aufruft, statt über gekaufte oder gescrapte Daten zu Lebensereignissen. Ein Rechner oder Ratgeber-Artikel, der bei Google gefunden wird, verarbeitet keine personenbezogenen Daten, bevor der Eigentümer selbst ein Kontaktformular ausfüllt.",
    },
    {
      q: "Woher weiß ich, wer gerade ein Frühsignal hat?",
      a: "Gar nicht im Vorfeld, und das ist der Punkt. Sie bauen Inhalte für jedes Signal, und wer davon betroffen ist, findet sie über die eigene Suche. Sie sprechen niemanden gezielt an, bevor er sich nicht selbst gemeldet hat.",
    },
    {
      q: "Wie lange dauert es, bis diese Strategie Anfragen bringt?",
      a: "Die ersten Inhalte und Rechner stehen innerhalb weniger Wochen. Bis sie zuverlässig ranken und regelmäßig Anfragen bringen, vergehen meist mehrere Monate, abhängig von der Konkurrenz in Ihrer Stadt für die jeweilige Suchfrage.",
    },
    {
      q: "Ersetzt das die klassische Ansprache nach Exposé-Anfrage?",
      a: "Nein, es ergänzt sie. Wer bereits über ein Portal anfragt, ist im Kaufsignal-Stadium und braucht die gewohnte, schnelle Reaktion. Die Frühsignal-Strategie holt zusätzlich die Eigentümer ab, die noch gar nicht wissen, dass sie bald verkaufen.",
    },
  ],
  { q: "Frage", a: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Verkäufer ansprechen, bevor sie suchen: Frühsignale nutzen | beuwy",
  [`${S}meta.beschreibung`]:
    "Verkäufer ansprechen, bevor sie suchen: Frühsignale wie Erbschaft, Auszug und Zinsanpassung als Anker, mit Inhalten und Rechnern statt gekaufter Daten.",
  [`${S}meta.og_titel`]: "Verkäufer ansprechen, bevor sie suchen: Frühsignale nutzen | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Sechs Lebensereignisse, die einem Verkauf meist vorausgehen, und wie Inhalte und Rechner dort ansetzen, DSGVO-sauber, statt auf das fertige Kaufsignal zu warten.",

  [`${S}kopf.eyebrow`]: "Wachstum",
  [`${S}kopf.titel`]: "Eigentümer ansprechen, lange bevor sie einen Makler *suchen*.",
  [`${S}kopf.text_vor`]:
    "Sie erreichen Eigentümer vor dem Verkaufsentschluss, indem Sie nicht auf das Kaufsignal warten, sondern auf die Lebensereignisse davor reagieren: Erbschaft, Auszug der Kinder, auslaufende Zinsbindung, Trennung oder Renteneintritt. Statt Daten zu diesen Ereignissen zu sammeln, was DSGVO-rechtlich nicht zulässig wäre, bauen Sie",
  [`${S}kopf.text_hervor`]:
    "Inhalte und Rechner, die genau dann gefunden werden, wenn ein Eigentümer beginnt, sich zu informieren",
  [`${S}kopf.text_nach`]:
    ". So werden Sie sichtbar, bevor der erste Suchbegriff „Makler“ überhaupt eingegeben wird.",
  [`${S}kopf.cta`]: "Zusammenarbeit anfragen",
  [`${S}kopf.cta_note`]: "Antwort innerhalb von 24 Stunden",

  [`${S}unterschied.eyebrow`]: "Zwei Ausgangspunkte",
  [`${S}unterschied.titel`]: "Das Kaufsignal ist der *letzte*, nicht der erste Moment.",
  [`${S}unterschied.reaktiv_label`]: "Reaktive Ansprache",
  [`${S}unterschied.reaktiv_titel`]: "Sie warten auf das fertige Exposé-Signal.",
  [`${S}unterschied.reaktiv_text`]:
    "Der Eigentümer hat sich längst entschieden und vergleicht bereits drei bis fünf Makler. Sie treten in eine Konkurrenzsituation ein, in der nur noch Preis und erster Eindruck zählen.",
  [`${S}unterschied.frueh_label`]: "Frühsignal-Ansprache",
  [`${S}unterschied.frueh_titel`]: "Sie sind schon da, wenn die Frage erst entsteht.",
  [`${S}unterschied.frueh_text`]:
    "Der Eigentümer informiert sich zum ersten Mal, findet Ihren Inhalt statt eine Werbeanzeige, und verbindet Ihren Namen mit der Antwort, nicht mit dem Verkauf. Bis zur Entscheidung sind Sie bereits die vertraute Adresse.",

  [`${S}signale.eyebrow`]: "Die sechs Frühsignale",
  [`${S}signale.titel`]: "Jedes Lebensereignis bekommt seinen eigenen *Anker*.",
  [`${S}signale.sub`]:
    "Kein Zugriff auf Register oder Datenhändler. Jeder Anker ist ein Inhalt oder Rechner, den ein Eigentümer selbst findet, sobald er zu recherchieren beginnt.",
  ...signale.defaults,

  [`${S}unterschied2.label`]: "Der Unterschied",
  [`${S}unterschied2.titel`]: "Wer zuerst hilft, wird zuerst gefragt.",
  [`${S}unterschied2.text`]:
    "Sie kaufen keine Adressen und schreiben niemanden ungefragt an. Sie bauen die Antwort, die ein Eigentümer selbst sucht, sobald das Lebensereignis eintritt. Der Kontakt entsteht, wenn er bereit ist, nicht wenn eine Liste behauptet, er sei es.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "Ein Bewertungsrechner, kalibriert mit 489 echten Abschlüssen und amtlichen Bodenrichtwerten: Adresse rein, Ersteinschätzung raus, der Lead liegt mit Score im CRM, nicht erst im Postfach.",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Inhalt wissen wollen.",
  ...faq.defaults,

  [`${S}finale.titel`]: "Bauen wir Ihre *Frühsignal*-Kette.",
  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.text_vor`]: "Frühsignal-Ansprache ist ein Baustein unter mehreren. Passend dazu:",
  [`${S}finale.link_rechner`]: "der Mietpreisrechner",
  [`${S}finale.text_mitte`]: "als Downsizing-Anker und",
  [`${S}finale.link_email`]: "E-Mail-Marketing für Immobilienmakler",
  [`${S}finale.text_mitte2`]: "für die zeitlich getriggerte Datenmail. Den Überblick zeigt der",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_nach`]: ".",
  [`${S}finale.cta`]: "Zusammenarbeit anfragen",
  [`${S}finale.cta_note`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · Open-Graph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",

  [`${S}kopf.eyebrow`]: "Wissens-Kopf · Eyebrow",
  [`${S}kopf.titel`]: "Wissens-Kopf · Titel (ein *Wort* = Highlighter)",
  [`${S}kopf.text_vor`]: "Wissens-Kopf · Textabsatz, Teil vor dem Highlight",
  [`${S}kopf.text_hervor`]: "Wissens-Kopf · Hervorgehobener Satz",
  [`${S}kopf.text_nach`]: "Wissens-Kopf · Textabsatz, Teil nach dem Highlight",
  [`${S}kopf.cta`]: "Wissens-Kopf · Button-Text",
  [`${S}kopf.cta_note`]: "Wissens-Kopf · Hinweis neben dem Button",

  [`${S}unterschied.eyebrow`]: "Reaktiv vs. Früh · Eyebrow",
  [`${S}unterschied.titel`]: "Reaktiv vs. Früh · Titel (ein *Wort* = Highlighter)",
  [`${S}unterschied.reaktiv_label`]: "Reaktiv vs. Früh · Spalte 1 · Label",
  [`${S}unterschied.reaktiv_titel`]: "Reaktiv vs. Früh · Spalte 1 · Titel",
  [`${S}unterschied.reaktiv_text`]: "Reaktiv vs. Früh · Spalte 1 · Text",
  [`${S}unterschied.frueh_label`]: "Reaktiv vs. Früh · Spalte 2 · Label",
  [`${S}unterschied.frueh_titel`]: "Reaktiv vs. Früh · Spalte 2 · Titel",
  [`${S}unterschied.frueh_text`]: "Reaktiv vs. Früh · Spalte 2 · Text",

  [`${S}signale.eyebrow`]: "Frühsignale · Eyebrow",
  [`${S}signale.titel`]: "Frühsignale · Titel (ein *Wort* = Highlighter)",
  [`${S}signale.sub`]: "Frühsignale · Subline",
  ...signale.labels,

  [`${S}unterschied2.label`]: "Der Unterschied · Karten-Label",
  [`${S}unterschied2.titel`]: "Der Unterschied · Karten-Titel",
  [`${S}unterschied2.text`]: "Der Unterschied · Karten-Text",

  [`${S}beweis.label`]: "Beweis-Anriss · Label",
  [`${S}beweis.text`]: "Beweis-Anriss · Text",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,

  [`${S}finale.label`]: "Finale · Eyebrow",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.text_vor`]: "Finale · Text, Teil vor Link 1 (Mietpreisrechner)",
  [`${S}finale.link_rechner`]: "Finale · Link-Text 1 (Mietpreisrechner)",
  [`${S}finale.text_mitte`]: "Finale · Text, Teil zwischen Link 1 und Link 2",
  [`${S}finale.link_email`]: "Finale · Link-Text 2 (E-Mail-Marketing)",
  [`${S}finale.text_mitte2`]: "Finale · Text, Teil zwischen Link 2 und Link 3",
  [`${S}finale.link_hub`]: "Finale · Link-Text 3 (Immobilienmarketing-Hub)",
  [`${S}finale.text_nach`]: "Finale · Text, Teil nach Link 3",
  [`${S}finale.cta`]: "Finale · Button-Text",
  [`${S}finale.cta_note`]: "Finale · Hinweis unter dem Button",
};
