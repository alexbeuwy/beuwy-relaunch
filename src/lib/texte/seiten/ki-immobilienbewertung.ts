import { listeRegistrieren } from "../lesen";

/** Studio-Texte /ki-immobilienbewertung — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "ki-immobilienbewertung", titel: "KI-Immobilienbewertung", route: "/ki-immobilienbewertung" };
const S = "s.ki-immobilienbewertung.";

const schritte = listeRegistrieren(
  "ki-immobilienbewertung",
  "schritte",
  "Schritt",
  [
    {
      titel: "Vergleichsdaten",
      text: "Tausende tatsächliche Verkäufe aus der Region fließen als Grundlage ein, nicht nur Angebotspreise aus Anzeigen.",
    },
    {
      titel: "Merkmale",
      text: "Wohnfläche, Baujahr, Objekttyp, Postleitzahl und bei Häusern die Grundstücksfläche gehen als feste Größen in die Rechnung ein.",
    },
    {
      titel: "Gewichtung",
      text: "Das Modell gewichtet, wie stark jedes Merkmal den Preis in genau dieser Region historisch beeinflusst hat, statt eine pauschale Formel über alle Orte zu legen.",
    },
    {
      titel: "Ausgabe als Spanne",
      text: "Am Ende steht eine Wertspanne, keine einzelne Zahl. Die verbleibende Unsicherheit wird sichtbar gemacht, nicht versteckt.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const pains = listeRegistrieren(
  "ki-immobilienbewertung",
  "pains",
  "Fehlerquelle",
  [
    {
      zitat: "Der Sanierungszustand hinter der Fassade sieht kein Modell.",
      antwort:
        "Ob das Bad 2023 saniert wurde oder seit 1985 unverändert ist, macht einen Unterschied von mehreren Prozentpunkten. Ein Modell ohne Besichtigung kennt nur die gemeldeten Eckdaten, nicht den tatsächlichen Zustand.",
    },
    {
      zitat: "Die Mikrolage zählt nicht als Datenpunkt.",
      antwort:
        "Straßenlärm, ein Neubau direkt vor dem Balkon oder ein besonders ruhiger Innenhof wirken sich real auf den Preis aus, tauchen aber in keiner Postleitzahlen-Statistik auf.",
    },
    {
      zitat: "Sondermerkmale fehlen komplett.",
      antwort:
        "Erbpacht, Denkmalschutz oder ein eingetragenes Wohnrecht verändern den Wert erheblich, sind in den meisten automatisierten Modellen aber schlicht nicht vorgesehen.",
    },
  ],
  { zitat: "Zitat", antwort: "Antwort" },
);

const vergleich = listeRegistrieren(
  "ki-immobilienbewertung",
  "vergleich",
  "Vergleichs-Zeile",
  [
    { merkmal: "Dauer bis zum Ergebnis", rechner: "Sekunden", gutachten: "mehrere Tage bis Wochen" },
    { merkmal: "Objektbesichtigung", rechner: "nein", gutachten: "ja, vor Ort" },
    { merkmal: "Rechtssicherheit", rechner: "Orientierungswert, kein Gutachten", gutachten: "gerichtsfest, anerkannt" },
    {
      merkmal: "Typischer Einsatzzweck",
      rechner: "erste Einschätzung, Verkaufsvorbereitung",
      gutachten: "Gericht, Finanzamt, Erbschaft, Scheidung",
    },
    {
      merkmal: "Berücksichtigt Sanierung/Mikrolage",
      rechner: "nur über Ihre eigene Schätzung",
      gutachten: "ja, direkt geprüft",
    },
  ],
  { merkmal: "Merkmal", rechner: "Wert KI-Rechner", gutachten: "Wert Gutachten" },
);

const faq = listeRegistrieren(
  "ki-immobilienbewertung",
  "faq",
  "FAQ",
  [
    {
      frage: "Ersetzt eine KI-Bewertung ein Sachverständigengutachten?",
      antwort:
        "Nein. Eine KI-Bewertung liefert eine Orientierungswert-Spanne ohne Besichtigung, ein Gutachten prüft das Objekt vor Ort und ist als einziges gerichtsfest. Das ist eine allgemeine Einordnung, keine Rechts- oder Steuerberatung im Einzelfall.",
    },
    {
      frage: "Wie genau ist so eine Spanne wirklich?",
      antwort:
        "Bei einem gut trainierten Modell und ausreichend Vergleichsdaten liegt der reale Verkaufspreis meist innerhalb der ausgegebenen Spanne, oft um die zehn Prozent um den Mittelwert. Zustand, Lage und Ausstattung fließen nur so genau ein, wie sie eingegeben wurden.",
    },
    {
      frage: "Wann brauche ich zwingend einen Sachverständigen statt eines Rechners?",
      antwort:
        "Bei Gerichtsverfahren, gegenüber dem Finanzamt, bei einer Erbauseinandersetzung oder Scheidung verlangen die beteiligten Stellen üblicherweise ein geprüftes Gutachten. Ein Rechner reicht dort nicht aus, auch nicht als Ersatz für eine kurzfristige Verhandlung.",
    },
    {
      frage: "Kann ein Makler eine KI-Schätzung einfach als Verkaufspreis übernehmen?",
      antwort:
        "Nein, sie ist ein Ausgangspunkt, kein fertiges Angebot. Ein Makler prüft Zustand, Ausstattung und Mikrolage vor Ort und passt die Preisstrategie entsprechend an, bevor eine Zahl im Exposé steht.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "KI-Immobilienbewertung: Was Modelle können und wo der Gutachter bleibt | beuwy",
  [`${S}meta.beschreibung`]:
    "KI-Immobilienbewertung liefert in Sekunden eine Wertspanne, sieht aber weder Sanierungszustand noch Mikrolage. Das AVM-Prinzip und die Gutachter-Grenze erklärt.",
  [`${S}meta.og_titel`]: "KI-Immobilienbewertung: Was Modelle können und wo der Gutachter bleibt | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Wie ein AVM-Modell rechnet, wo es blind bleibt und ab wann ein Sachverständigengutachten statt eines Rechners nötig ist.",

  [`${S}hero.eyebrow`]: "KI im Maklerbüro",
  [`${S}hero.titel`]: "KI-Immobilienbewertung: was ein Modell *schätzt*, und wo der Gutachter übernimmt.",
  [`${S}hero.intro_vor`]:
    "KI-basierte Immobilienbewertung, auch AVM genannt (Automated Valuation Model), liefert eine Wertspanne aus tausenden vergleichbaren Verkäufen und Objektdaten, meist in Sekunden, gut genug für eine erste Orientierung.",
  [`${S}hero.intro_highlight`]:
    "Was das Modell nicht sieht: den Sanierungszustand hinter der Fassade, die tatsächliche Mikrolage, ein zweites Bad im Dachgeschoss.",
  [`${S}hero.intro_nach`]:
    "Das bleibt eine Fehlerquelle, die nur eine Besichtigung schließt. Für den Verkauf reicht die Schätzung als Startpunkt, für Gericht, Finanzamt oder Erbauseinandersetzung braucht es ein Gutachten von einem Sachverständigen.",
  [`${S}hero.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_antwortzeit`]: "Antwort innerhalb von 24 Stunden",

  [`${S}mechanismus.eyebrow`]: "Das AVM-Prinzip",
  [`${S}mechanismus.titel`]: "So rechnet ein *automatisiertes* Bewertungsmodell.",
  ...schritte.defaults,

  [`${S}fehlerquellen.eyebrow`]: "Wo das Modell blind bleibt",
  [`${S}fehlerquellen.titel`]: "Drei Dinge, die *kein* Rechner sieht.",
  ...pains.defaults,

  [`${S}vergleich.eyebrow`]: "Der Vergleich",
  [`${S}vergleich.titel`]: "Rechner und Gutachten lösen *unterschiedliche* Aufgaben.",
  [`${S}vergleich.kopf_merkmal`]: "Merkmal",
  [`${S}vergleich.kopf_rechner`]: "KI-Rechner",
  [`${S}vergleich.kopf_gutachten`]: "Sachverständigengutachten",
  ...vergleich.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Ein Rechner schätzt. Ein Gutachter urteilt.",
  [`${S}unterschied.text`]:
    "Beide Werkzeuge haben ihren Platz, aber nicht denselben. Ein Rechner gibt in Sekunden eine Richtung vor, ein Gutachten steht am Ende einer Prüfung vor Ort und trägt eine Unterschrift, die vor Gericht und Finanzamt Bestand hat.",

  [`${S}beweis.label`]: "Beweis, kein Prototyp",
  [`${S}beweis.text`]:
    "Für RIEGEL Immobilien haben wir einen Bewertungsrechner mit amtlichen Bodenrichtwerten und über 5.000 ausgewerteten Verkäufen gebaut. Adresse rein, Ersteinschätzung raus, der Lead liegt mit Score im CRM.",
  [`${S}beweis.text2_vor`]: "Unser eigener",
  [`${S}beweis.link_rechner`]: "Verkaufspreisrechner",
  [`${S}beweis.text2_nach`]:
    "zeigt das Grundprinzip live: eine Wertspanne mit nachvollziehbarem Rechenweg, als Orientierungswert, kein Gutachten.",
  [`${S}beweis.link_case`]: "Fallstudie RIEGEL Immobilien lesen →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Gespräch wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihren eigenen *Bewertungsrechner*.",
  [`${S}finale.text_1`]: "Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_2`]: ", probieren können Sie das Prinzip direkt am",
  [`${S}finale.link_rechner`]: "Verkaufspreisrechner",
  [`${S}finale.text_3`]:
    ", wie KI insgesamt im Maklerbüro zu einem System statt zu einem Prompt wird, zeigt",
  [`${S}finale.link_ki`]: "KI für Immobilienmakler",
  [`${S}finale.text_4`]: ".",
  [`${S}finale.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}finale.cta_antwortzeit`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · OpenGraph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · OpenGraph-Beschreibung",

  [`${S}hero.eyebrow`]: "Wissens-Kopf · Eyebrow",
  [`${S}hero.titel`]: "Wissens-Kopf · Titel (ein *Wort* = Highlighter)",
  [`${S}hero.intro_vor`]: "Wissens-Kopf · Antwort-Satz, Teil vor dem Highlight",
  [`${S}hero.intro_highlight`]: "Wissens-Kopf · Antwort-Satz, markierter Teil",
  [`${S}hero.intro_nach`]: "Wissens-Kopf · Antwort-Satz, Teil nach dem Highlight",
  [`${S}hero.cta_label`]: "Wissens-Kopf · CTA-Button-Text",
  [`${S}hero.cta_antwortzeit`]: "Wissens-Kopf · Antwortzeit-Hinweis neben dem CTA",

  [`${S}mechanismus.eyebrow`]: "AVM-Mechanismus · Eyebrow",
  [`${S}mechanismus.titel`]: "AVM-Mechanismus · Titel (ein *Wort* = Highlighter)",
  ...schritte.labels,

  [`${S}fehlerquellen.eyebrow`]: "Fehlerquellen · Eyebrow",
  [`${S}fehlerquellen.titel`]: "Fehlerquellen · Titel (ein *Wort* = Highlighter)",
  ...pains.labels,

  [`${S}vergleich.eyebrow`]: "Vergleichstabelle · Eyebrow",
  [`${S}vergleich.titel`]: "Vergleichstabelle · Titel (ein *Wort* = Highlighter)",
  [`${S}vergleich.kopf_merkmal`]: "Vergleichstabelle · Spaltenkopf 1 (Merkmal)",
  [`${S}vergleich.kopf_rechner`]: "Vergleichstabelle · Spaltenkopf 2 (KI-Rechner)",
  [`${S}vergleich.kopf_gutachten`]: "Vergleichstabelle · Spaltenkopf 3 (Gutachten)",
  ...vergleich.labels,

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis-Anriss · Label",
  [`${S}beweis.text`]: "Beweis-Anriss · Text (RIEGEL-Rechner)",
  [`${S}beweis.text2_vor`]: "Beweis-Anriss · Zweiter Satz, Teil vor dem Link",
  [`${S}beweis.link_rechner`]: "Beweis-Anriss · Link-Text (Verkaufspreisrechner)",
  [`${S}beweis.text2_nach`]: "Beweis-Anriss · Zweiter Satz, Teil nach dem Link",
  [`${S}beweis.link_case`]: "Beweis-Anriss · Link-Text (Fallstudie RIEGEL)",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.text_1`]: "Finale · Satz, Teil vor Link 1 (Hub)",
  [`${S}finale.link_hub`]: "Finale · Link-Text 1 (Immobilienmarketing-Hub)",
  [`${S}finale.text_2`]: "Finale · Satz, Teil zwischen Link 1 und Link 2",
  [`${S}finale.link_rechner`]: "Finale · Link-Text 2 (Verkaufspreisrechner)",
  [`${S}finale.text_3`]: "Finale · Satz, Teil zwischen Link 2 und Link 3",
  [`${S}finale.link_ki`]: "Finale · Link-Text 3 (KI für Immobilienmakler)",
  [`${S}finale.text_4`]: "Finale · Satz, Abschluss nach Link 3",
  [`${S}finale.cta_label`]: "Finale · CTA-Button-Text",
  [`${S}finale.cta_antwortzeit`]: "Finale · Antwortzeit-Hinweis unter dem CTA",
};
