import { listeRegistrieren } from "../lesen";

/** Studio-Texte /wissen/mietpreis-ermitteln — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "wissen-mietpreis-ermitteln", titel: "Mietpreis ermitteln", route: "/wissen/mietpreis-ermitteln" };
const S = "s.wissen-mietpreis-ermitteln.";

const schritte = listeRegistrieren(
  "wissen-mietpreis-ermitteln",
  "schritte",
  "Schritt",
  [
    {
      titel: "Mietspiegel der Gemeinde prüfen",
      text: "Größere Städte führen einen qualifizierten Mietspiegel nach § 558d BGB, wissenschaftlich erstellt und alle zwei Jahre fortgeschrieben. Kleinere Gemeinden haben oft nur einen einfachen Mietspiegel oder gar keinen — dort helfen Vergleichsangebote aus Portalen für ähnliche Objekte in derselben Lage weiter.",
    },
    {
      titel: "Vergleichsmiete im Mietspiegel finden",
      text: "Im Mietspiegel-Feld für Wohnfläche, Baujahr und Ausstattung steht eine Spanne, kein Punktwert. Beispiel: 75 m², Baujahr 2003, mittlere Ausstattung — das Feld nennt 8,40 bis 9,10 €/m², Mittelwert 8,75 €/m².",
    },
    {
      titel: "Zu- und Abschläge anwenden",
      text: "Merkmale, die der Mietspiegel nicht direkt erfasst, wandern als Zu- oder Abschlag in den m²-Preis. Beispielrechnung auf dem Wert von oben: Balkon +0,30 €/m², Einbauküche +0,20 €/m², Lage an einer Hauptverkehrsachse −0,25 €/m². 8,75 + 0,30 + 0,20 − 0,25 ergibt 9,00 €/m². Bei 75 m² macht das 675 € Kaltmiete im Monat.",
    },
    {
      titel: "Mietpreisbremse prüfen",
      text: "In Gebieten, die eine Landesregierung als angespannten Wohnungsmarkt ausgewiesen hat, darf die Miete bei einer Neuvermietung höchstens zehn Prozent über der ortsüblichen Vergleichsmiete liegen (§ 556d BGB). Ausnahmen gelten für Neubauten nach dem 1. Oktober 2014 und nach umfassender Modernisierung. Diese Seite ist keine Rechtsberatung — ob Ihre Adresse in einem solchen Gebiet liegt und welche Ausnahme greift, klärt im Zweifel ein Anwalt oder Mieterverein.",
    },
    {
      titel: "Rechner als Einstieg nutzen",
      text: "Unser Mietpreisrechner rechnet nach demselben Prinzip wie ein Mietspiegel: eine Basis-Kaltmiete je Objekttyp und Stadtgröße, korrigiert um Zustand, Ausstattung und Baujahr, mit einer Spanne von rund acht Prozent statt einem Punktwert — kostenlos und in unter zwei Minuten nutzbar.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const zuschlaege = listeRegistrieren(
  "wissen-mietpreis-ermitteln",
  "zuschlaege",
  "Zu-/Abschlag",
  [
    { text: "Balkon oder Terrasse" },
    { text: "Einbauküche" },
    { text: "Aufzug im Mehrfamilienhaus" },
    { text: "Stellplatz oder Garage" },
    { text: "Fußbodenheizung oder hochwertige Sanitäranlagen" },
    { text: "Lage an einer Hauptverkehrsachse" },
    { text: "Erdgeschoss ohne Balkon oder Garten" },
    { text: "Sichtbarer Sanierungsstau" },
  ],
  { text: "Text" },
);

const faq = listeRegistrieren(
  "wissen-mietpreis-ermitteln",
  "faq",
  "FAQ",
  [
    {
      frage: "Darf ich als Eigentümer die Miete einfach über den Mietspiegel-Mittelwert setzen?",
      antwort:
        "Bei einer Neuvermietung ja, solange keine Mietpreisbremse greift oder eine zulässige Ausnahme vorliegt. Bei einer laufenden Mieterhöhung gelten zusätzliche Grenzen wie die Kappungsgrenze — dafür lohnt sich vorab ein Blick in den aktuellen Mietspiegel Ihrer Gemeinde.",
    },
    {
      frage: "Was mache ich, wenn meine Gemeinde keinen Mietspiegel hat?",
      antwort:
        "Dann orientieren Sie sich an mindestens drei bis vier vergleichbaren Angeboten aus Portalen, möglichst mit ähnlicher Wohnfläche, Baujahr und Lage. Je weniger Vergleichsfälle vorliegen, desto größer sollte die Spanne sein, die Sie einkalkulieren.",
    },
    {
      frage: "Wie oft sollte ich den Mietpreis meiner Bestandsimmobilie neu prüfen?",
      antwort:
        "Ein jährlicher Check reicht in den meisten Märkten. Bei spürbaren Veränderungen in der Nachbarschaft — neue Infrastruktur, größere Sanierungsprojekte in der Umgebung, ein neuer Mietspiegel — lohnt sich ein Blick auch außerhalb des Rhythmus.",
    },
    {
      frage: "Wie hängt der Mietpreis mit dem Verkaufswert meiner Immobilie zusammen?",
      antwort:
        "Bei vermieteten Objekten fließt die erzielbare Miete direkt in den Verkehrswert ein, über das Ertragswertverfahren. Wie das im Detail gerechnet wird, zeigt die Seite Immobilie bewerten.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Mietpreis ermitteln: Vergleichsmiete, Spiegel und Spielraum | beuwy",
  [`${S}meta.beschreibung`]:
    "Mietpreis ermitteln: Mietspiegel lesen, Vergleichsmiete finden, Zu- und Abschläge rechnen, Mietpreisbremse prüfen. Mit Rechenbeispiel und Rechner als Einstieg.",
  [`${S}meta.og_titel`]: "Mietpreis ermitteln: Vergleichsmiete, Spiegel und Spielraum | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Vom Mietspiegel über Zu- und Abschläge bis zur Mietpreisbremse: die richtige Miete in fünf nachvollziehbaren Schritten, mit Rechenbeispiel.",

  [`${S}hero.eyebrow`]: "Wissen",
  [`${S}hero.titel`]: "Mietpreis ermitteln: die *richtige* Zahl vor der ersten Anzeige.",
  [`${S}hero.intro_vor`]:
    "Der richtige Mietpreis ergibt sich aus dem Mietspiegel oder vergleichbaren Angeboten Ihrer Stadt, korrigiert um Zu- und Abschläge für Lage, Ausstattung und Zustand.",
  [`${S}hero.intro_highlight`]:
    "In Städten mit angespanntem Wohnungsmarkt begrenzt zusätzlich die Mietpreisbremse die zulässige Miete bei einer Neuvermietung auf höchstens zehn Prozent über der ortsüblichen Vergleichsmiete",
  [`${S}hero.intro_nach`]:
    ". Ein Online-Rechner mit Basiswerten für Objekttyp und Stadtgröße liefert in wenigen Minuten eine erste Spanne, ersetzt aber weder den Mietspiegel noch eine rechtliche Prüfung im Einzelfall.",
  [`${S}hero.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_antwortzeit`]: "Antwort innerhalb von 24 Stunden",

  [`${S}schritte.eyebrow`]: "In fünf Schritten",
  [`${S}schritte.titel`]: "Vom Mietspiegel zur *belastbaren* Zahl.",
  ...schritte.defaults,

  [`${S}zuschlaege.eyebrow`]: "Zum Nachschlagen",
  [`${S}zuschlaege.titel`]: "Die häufigsten *Zu- und Abschläge* auf einen Blick.",
  ...zuschlaege.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Ein Rechner kennt keinen Straßenlärm.",
  [`${S}unterschied.text`]:
    "Ein Algorithmus rechnet mit Durchschnittswerten für Ihre Stadtgröße, nicht mit der Baustelle vor dem Fenster oder dem Blick ins Grüne. Die Zahl aus dem Rechner ist der Startpunkt für ein Gespräch, nicht das letzte Wort dazu.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "17 Jahre Erfahrung darin, Zahlen für Menschen verständlich zu machen, die keine Fachleute sind, stecken in jedem Rechenmodell, das wir bauen — vom Investoren-Pitch bis zum Mietpreisrechner, der Ihre Eigentümer-Anfragen registriert.",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor der *ersten* Anzeige wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihre *Vermietungsstrecke*.",
  [`${S}finale.text_1`]: "Eine erste Spanne liefert unser",
  [`${S}finale.link_mietpreisrechner`]: "Mietpreisrechner",
  [`${S}finale.text_2`]:
    "kostenlos in unter zwei Minuten. Wie dieselben Grundfragen bei einem Verkauf beantwortet werden, zeigt",
  [`${S}finale.link_bewerten`]: "Immobilie bewerten",
  [`${S}finale.text_3`]: ". Den Überblick über alle Bausteine bietet der",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
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
  [`${S}hero.intro_highlight`]: "Wissens-Kopf · Antwort-Satz, markierter Teil (Mietpreisbremse)",
  [`${S}hero.intro_nach`]: "Wissens-Kopf · Antwort-Satz, Teil nach dem Highlight",
  [`${S}hero.cta_label`]: "Wissens-Kopf · CTA-Button-Text",
  [`${S}hero.cta_antwortzeit`]: "Wissens-Kopf · Antwortzeit-Hinweis neben dem CTA",

  [`${S}schritte.eyebrow`]: "Fünf Schritte · Eyebrow",
  [`${S}schritte.titel`]: "Fünf Schritte · Titel (ein *Wort* = Highlighter)",
  ...schritte.labels,

  [`${S}zuschlaege.eyebrow`]: "Checkliste Zu-/Abschläge · Eyebrow",
  [`${S}zuschlaege.titel`]: "Checkliste Zu-/Abschläge · Titel (ein *Wort* = Highlighter)",
  ...zuschlaege.labels,

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis-Anriss · Label",
  [`${S}beweis.text`]: "Beweis-Anriss · Text",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.text_1`]: "Finale · Satz, Teil vor Link 1 (Mietpreisrechner)",
  [`${S}finale.link_mietpreisrechner`]: "Finale · Link-Text 1 (Mietpreisrechner)",
  [`${S}finale.text_2`]: "Finale · Satz, Teil zwischen Link 1 und Link 2",
  [`${S}finale.link_bewerten`]: "Finale · Link-Text 2 (Immobilie bewerten)",
  [`${S}finale.text_3`]: "Finale · Satz, Teil zwischen Link 2 und Link 3",
  [`${S}finale.link_hub`]: "Finale · Link-Text 3 (Immobilienmarketing-Hub)",
  [`${S}finale.text_4`]: "Finale · Satz, Abschluss nach Link 3",
  [`${S}finale.cta_label`]: "Finale · CTA-Button-Text",
  [`${S}finale.cta_antwortzeit`]: "Finale · Antwortzeit-Hinweis unter dem CTA",
};
