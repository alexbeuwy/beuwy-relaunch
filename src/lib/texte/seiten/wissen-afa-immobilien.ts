import { listeRegistrieren } from "../lesen";

/** Studio-Texte /wissen/afa-immobilien — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "wissen-afa-immobilien", titel: "AfA bei Immobilien", route: "/wissen/afa-immobilien" };
const S = "s.wissen-afa-immobilien.";

const saetze = listeRegistrieren(
  "wissen-afa-immobilien",
  "saetze",
  "AfA-Satz",
  [
    { baujahr: "vor 1925", satz: "2,5 %", grundlage: "§ 7 Abs. 4 S. 1 Nr. 1 EStG", beispiel: "7.500 €" },
    { baujahr: "1925–2022", satz: "2 %", grundlage: "§ 7 Abs. 4 S. 1 Nr. 2 Buchst. b EStG", beispiel: "6.000 €" },
    { baujahr: "ab 2023", satz: "3 %", grundlage: "§ 7 Abs. 4 S. 1 Nr. 2 Buchst. a EStG (JStG 2022)", beispiel: "9.000 €" },
  ],
  { baujahr: "Baujahr", satz: "AfA-Satz", grundlage: "Rechtsgrundlage", beispiel: "Beispiel-Betrag" },
);

const faq = listeRegistrieren(
  "wissen-afa-immobilien",
  "faq",
  "FAQ",
  [
    {
      frage: "Muss ich die AfA jedes Jahr neu beantragen?",
      antwort:
        "Sie tragen die AfA jedes Jahr erneut in der Anlage V Ihrer Steuererklärung ein — automatisch läuft nichts. Wer eine Steuersoftware oder einen Steuerberater nutzt, muss die Grunddaten (Kaufpreis, Gebäudeanteil, Baujahr) einmal hinterlegen, danach übernimmt das Programm die Fortschreibung.",
    },
    {
      frage: "Kann ich AfA auch für meine selbstgenutzte Wohnung absetzen?",
      antwort:
        "Nein. Die AfA gilt nur für vermietete oder betrieblich genutzte Immobilien, weil sie Einkünfte aus Vermietung und Verpachtung mindert. Für selbstgenutztes Wohneigentum gibt es keine laufende Abschreibung.",
    },
    {
      frage: "Was passiert mit der AfA, wenn ich die Immobilie verkaufe?",
      antwort:
        "Die AfA des Verkäufers endet mit dem Verkauf. Der neue Eigentümer beginnt eine eigene Berechnung auf Basis seines eigenen Kaufpreises — der Satz richtet sich dabei weiterhin nach dem Baujahr des Gebäudes, nicht nach dem Jahr des Erwerbs.",
    },
    {
      frage: "Lohnt sich für mein Gebäude ein Restnutzungsdauer-Gutachten?",
      antwort:
        "Das hängt vom Alter, Modernisierungsgrad und Gebäudewert ab. Die Mechanik, wer typischerweise profitiert und woran Sie ein seriöses Gutachten erkennen, zeigt die Seite Restnutzungsdauer-Gutachten.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "AfA bei Immobilien: Abschreibung verständlich — mit Rechenwegen | beuwy",
  [`${S}meta.beschreibung`]:
    "AfA bei Immobilien: 2, 2,5 oder 3 Prozent je nach Baujahr, Gebäude- vs. Bodenanteil, mit Rechenbeispielen und Steuereffekt. Klare Grenze zur Steuerberatung.",
  [`${S}meta.og_titel`]: "AfA bei Immobilien: Abschreibung verständlich — mit Rechenwegen | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Die drei gesetzlichen AfA-Sätze, der Unterschied zwischen Gebäude- und Bodenanteil, ein vollständiges Rechenbeispiel mit Steuereffekt — ohne Steuerberatungsanspruch.",

  [`${S}kopf.eyebrow`]: "Wissen",
  [`${S}kopf.titel`]: "AfA bei Immobilien: 2, 2,5 oder 3 Prozent — und warum das *zählt*.",
  [`${S}kopf.intro_vor`]:
    "Die Abschreibung für Abnutzung (AfA) verteilt die Anschaffungskosten eines vermieteten Gebäudes über die gesetzlich unterstellte Nutzungsdauer und mindert damit jedes Jahr die Steuerlast.",
  [`${S}kopf.intro_highlight`]:
    "Der reguläre Satz richtet sich nach dem Baujahr: 2,5 Prozent vor 1925, 2 Prozent für 1925 bis 2022, 3 Prozent für Neubauten ab 2023",
  [`${S}kopf.intro_nach`]:
    ". Abgeschrieben wird ausschließlich der Gebäudeanteil des Kaufpreises, nicht der Bodenanteil, weil Grund und Boden sich nicht abnutzen. Mit einem Restnutzungsdauer-Gutachten lässt sich der Satz in bestimmten Fällen erhöhen — dazu mehr auf der Nachbarseite.",
  [`${S}kopf.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}kopf.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",

  [`${S}saetze.eyebrow`]: "Die drei Fälle",
  [`${S}saetze.titel`]: "Ein halbes Prozent entscheidet über *tausende* Euro.",
  [`${S}saetze.sub`]:
    "Beispielrechnung in der letzten Spalte: derselbe Gebäudewert von 300.000 € mit dem jeweils passenden Satz.",
  [`${S}saetze.head_baujahr`]: "Baujahr",
  [`${S}saetze.head_satz`]: "AfA-Satz",
  [`${S}saetze.head_grundlage`]: "Rechtsgrundlage",
  [`${S}saetze.head_beispiel`]: "Beispiel: 300.000 € Gebäudewert",
  ...saetze.defaults,

  [`${S}gebaeude.eyebrow`]: "Gebäudeanteil vs. Bodenanteil",
  [`${S}gebaeude.titel`]: "Nur das *Gebäude* nutzt sich ab — der Boden nicht.",
  [`${S}gebaeude.spalte1_titel`]: "Warum die Aufteilung zählt",
  [`${S}gebaeude.spalte1_text`]:
    "Das Finanzamt erkennt die AfA nur für den Gebäudeanteil eines Kaufpreises an, weil sich Grund und Boden nicht abnutzen. Die Aufteilung steht im Idealfall bereits im Kaufvertrag. Fehlt sie, hilft ersatzweise die Arbeitshilfe des Bundesfinanzministeriums oder ein Gutachten. In der Praxis liegt der Gebäudeanteil bei Bestandsimmobilien meist zwischen 65 und 85 Prozent des Kaufpreises, abhängig vom örtlichen Bodenrichtwert.",
  [`${S}gebaeude.spalte2_titel`]: "Vollständiges Rechenbeispiel",
  [`${S}gebaeude.spalte2_text`]:
    "Kaufpreis 420.000 €, der Bodenrichtwert weist einen Grundstücksanteil von 22 Prozent aus. Gebäudeanteil: 420.000 € × 78 % = 327.600 €. Baujahr 1998, also 2 % AfA-Satz. Jährliche AfA: 6.552 €. Bei einem Grenzsteuersatz von 42 % ergibt das eine Steuerersparnis von rund 2.752 € pro Jahr, über zehn Jahre 27.520 €.",
  [`${S}gebaeude.hinweis`]:
    "Orientierungswert, kein Gutachten und keine Steuerberatung. Der tatsächliche Gebäudeanteil, Sonderabschreibungen und Ihr persönlicher Grenzsteuersatz hängen vom Einzelfall ab — klären Sie das mit einem Steuerberater, bevor Sie eine Zahl für die Steuererklärung übernehmen.",

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "0,5 Prozentpunkte sind kein Rundungsfehler.",
  [`${S}unterschied.text`]:
    "Auf einen Gebäudewert von 300.000 € macht der Unterschied zwischen 2 und 2,5 Prozent 1.500 € pro Jahr, über zwanzig Jahre 30.000 €. Baujahr und Gebäudeanteil sauber einzuordnen ist deshalb keine Formalie, sondern die Grundlage für jede weitere Rechnung.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "Für Vision Group haben wir Investorenunterlagen aufgesetzt, die einer Prüfung durch einen Konzern wie KKR standhielten — 1.450 Wohneinheiten, ein Joint Venture über 160 Mio. €. Dieselbe Disziplin gilt für jede Zahl, die am Ende ein Finanzamt liest: nur eine sauber hergeleitete Rechnung hält stand.",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor der *nächsten* Steuererklärung wissen wollen.",
  ...faq.defaults,

  [`${S}fazit.label`]: "Der nächste Schritt",
  [`${S}fazit.titel`]: "Bauen wir Ihre *Zahlenbasis*.",
  [`${S}fazit.text_1`]: "Ihren eigenen Rechenweg mit Modernisierungsgrad und Steuereffekt liefert unser",
  [`${S}fazit.link1`]: "AfA-Rechner",
  [`${S}fazit.text_2`]: "kostenlos in wenigen Minuten. Ob sich für Ihr Gebäude ein Gutachten lohnt, zeigt",
  [`${S}fazit.link2`]: "Restnutzungsdauer-Gutachten",
  [`${S}fazit.text_3`]: ". Den Überblick über alle Bausteine bietet der",
  [`${S}fazit.link3`]: "Immobilienmarketing-Hub",
  [`${S}fazit.text_4`]: ".",
  [`${S}fazit.cta_hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · OpenGraph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · OpenGraph-Beschreibung",

  [`${S}kopf.eyebrow`]: "Wissens-Kopf · Eyebrow",
  [`${S}kopf.titel`]: "Wissens-Kopf · H1 (ein *Wort* = Hervorhebung)",
  [`${S}kopf.intro_vor`]: "Wissens-Kopf · Intro-Absatz · Teil vor dem Highlighter",
  [`${S}kopf.intro_highlight`]: "Wissens-Kopf · Intro-Absatz · Highlighter-Teil",
  [`${S}kopf.intro_nach`]: "Wissens-Kopf · Intro-Absatz · Teil nach dem Highlighter",
  [`${S}kopf.cta_label`]: "Wissens-Kopf · CTA-Button-Text",
  [`${S}kopf.cta_hinweis`]: "Wissens-Kopf · Mikrozeile unter dem CTA",

  [`${S}saetze.eyebrow`]: "AfA-Sätze · Eyebrow",
  [`${S}saetze.titel`]: "AfA-Sätze · Titel (ein *Wort* = Hervorhebung)",
  [`${S}saetze.sub`]: "AfA-Sätze · Subline",
  [`${S}saetze.head_baujahr`]: "AfA-Sätze · Tabellenkopf · Baujahr-Spalte",
  [`${S}saetze.head_satz`]: "AfA-Sätze · Tabellenkopf · AfA-Satz-Spalte",
  [`${S}saetze.head_grundlage`]: "AfA-Sätze · Tabellenkopf · Rechtsgrundlage-Spalte",
  [`${S}saetze.head_beispiel`]: "AfA-Sätze · Tabellenkopf · Beispiel-Spalte",
  ...saetze.labels,

  [`${S}gebaeude.eyebrow`]: "Gebäudeanteil · Eyebrow",
  [`${S}gebaeude.titel`]: "Gebäudeanteil · Titel (ein *Wort* = Hervorhebung)",
  [`${S}gebaeude.spalte1_titel`]: "Gebäudeanteil · Spalte 1 · Titel",
  [`${S}gebaeude.spalte1_text`]: "Gebäudeanteil · Spalte 1 · Text",
  [`${S}gebaeude.spalte2_titel`]: "Gebäudeanteil · Spalte 2 · Titel",
  [`${S}gebaeude.spalte2_text`]: "Gebäudeanteil · Spalte 2 · Text",
  [`${S}gebaeude.hinweis`]: "Gebäudeanteil · Steuerberatungs-Hinweis",

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis-Anriss · Label",
  [`${S}beweis.text`]: "Beweis-Anriss · Text",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Hervorhebung)",
  ...faq.labels,

  [`${S}fazit.label`]: "Finale · Label",
  [`${S}fazit.titel`]: "Finale · H2 (ein *Wort* = Hervorhebung)",
  [`${S}fazit.text_1`]: "Finale · Absatz · Teil 1 (vor Link 1)",
  [`${S}fazit.link1`]: "Finale · Absatz · Link 1 (AfA-Rechner)",
  [`${S}fazit.text_2`]: "Finale · Absatz · Teil 2 (zwischen Link 1 und 2)",
  [`${S}fazit.link2`]: "Finale · Absatz · Link 2 (Restnutzungsdauer-Gutachten)",
  [`${S}fazit.text_3`]: "Finale · Absatz · Teil 3 (zwischen Link 2 und 3)",
  [`${S}fazit.link3`]: "Finale · Absatz · Link 3 (Immobilienmarketing-Hub)",
  [`${S}fazit.text_4`]: "Finale · Absatz · Teil 4 (nach Link 3)",
  [`${S}fazit.cta_hinweis`]: "Finale · Mikrozeile unter dem CTA",
};
