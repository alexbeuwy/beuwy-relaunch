import { listeRegistrieren } from "../lesen";

/** Studio-Texte /makler-kennzahlen — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "makler-kennzahlen", titel: "Makler-Kennzahlen", route: "/makler-kennzahlen" };
const S = "s.makler-kennzahlen.";

const kennzahlen = listeRegistrieren(
  "makler-kennzahlen",
  "kennzahlen",
  "Kennzahl",
  [
    {
      titel: "Anfragequote",
      text: "Eigentümer-Anfragen ÷ Besucher der Bewertungsseite × 100. Beispiel: 6 Anfragen bei 150 Besuchern in einer Woche ergeben 4 %. Sinkt die Quote, liegt das Problem meist am Rechner oder am Formular, nicht am Werbebudget.",
    },
    {
      titel: "Cost per Lead",
      text: "Marketingkosten ÷ Anzahl Anfragen. Beispiel: 480 € Anzeigenbudget für 12 Anfragen ergeben 40 € je Lead. Steigt der Wert über mehrere Wochen, ist meist die Zielgruppe zu breit eingestellt, nicht das Budget zu klein.",
    },
    {
      titel: "Erreichungsquote",
      text: "Anteil der Anfragen, die innerhalb von fünf Minuten erreicht werden. Beispiel: 9 von 12 Anfragen erreicht ergeben 75 %. Jede Minute darüber kostet Interesse, das direkt auf die Terminquote durchschlägt.",
    },
    {
      titel: "Terminquote",
      text: "Erstgespräche ÷ erreichte Anfragen. Beispiel: 9 erreichte Anfragen, 5 Erstgespräche ergeben 56 %. Bleibt sie niedrig trotz hoher Erreichungsquote, liegt das Problem im Gespräch selbst, nicht im Zufluss.",
    },
    {
      titel: "Alleinauftragsquote",
      text: "Alleinaufträge ÷ Erstgespräche. Beispiel: 5 Erstgespräche, 2 Alleinaufträge ergeben 40 %. Diese Zahl trennt ein vorbereitetes Gespräch mit Vermarktungsplan von einem, das nur den Prozentsatz verteidigt.",
    },
    {
      titel: "Vermarktungsdauer",
      text: "Tage vom Alleinauftrag bis zur ersten verbindlichen Kaufzusage. Beispiel: 34 Tage bei einer Eigentumswohnung in mittlerer Lage. Verlängert sie sich Woche für Woche, zeigt sich meist ein Preis-Problem, bevor der Eigentümer es zugibt.",
    },
    {
      titel: "Time-to-Notar",
      text: "Tage vom Alleinauftrag bis zum Notartermin. Beispiel: 58 Tage bei einer freistehenden Doppelhaushälfte. Je kürzer dieser Wert, desto weniger Zeit bleibt für Rückzieher, Nachverhandlungen oder einen zweiten Makler im Rennen.",
    },
    {
      titel: "Cost per Abschluss",
      text: "Marketingkosten eines Zeitraums ÷ Notartermine im selben Zeitraum. Beispiel: 2.400 € im Quartal bei 4 Abschlüssen ergeben 600 € je Abschluss: die Zahl, die am Ende über die Wirtschaftlichkeit entscheidet, nicht der Cost per Lead allein.",
    },
    {
      titel: "Bewertungsquote",
      text: "Anteil abgeschlossener Mandate, aus denen eine Google-Bewertung wird. Beispiel: 3 von 5 Verkäufern hinterlassen eine Bewertung, macht 60 %. Diese Quote entsteht nicht am Notartermin, sondern im Umgang mit dem Mandat davor.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const wochen = listeRegistrieren(
  "makler-kennzahlen",
  "wochen",
  "Wochenbericht-Zeile",
  [
    { woche: "Woche 31", anfragen: "8", erreicht: "88 %", termine: "4", alleinauftraege: "1", cpl: "42 €" },
    { woche: "Woche 32", anfragen: "11", erreicht: "91 %", termine: "6", alleinauftraege: "2", cpl: "37 €" },
    { woche: "Woche 33", anfragen: "6", erreicht: "83 %", termine: "3", alleinauftraege: "0", cpl: "55 €" },
    { woche: "Woche 34", anfragen: "13", erreicht: "92 %", termine: "7", alleinauftraege: "3", cpl: "33 €" },
  ],
  {
    woche: "Woche",
    anfragen: "Anfragen",
    erreicht: "Erreichungsquote",
    termine: "Termine",
    alleinauftraege: "Alleinaufträge",
    cpl: "Cost per Lead",
  },
);

const faq = listeRegistrieren(
  "makler-kennzahlen",
  "faq",
  "FAQ",
  [
    {
      frage: "Muss ich alle neun Kennzahlen von Anfang an tracken?",
      antwort:
        "Nein. Starten Sie mit Anfragequote, Terminquote und Alleinauftragsquote, denn die drei zeigen die größten Lücken im Trichter zwischen Website und Notartermin. Die übrigen sechs Kennzahlen ergänzen Sie, sobald eine Tabelle oder ein CRM die Zahlen ohnehin mitschreibt.",
    },
    {
      frage: "Wie oft sollte ich die Zahlen auswerten?",
      antwort:
        "Wöchentlich, nicht monatlich. Ein Monat verschleift genau die Schwankung, die zeigt, ob ein Problem einmalig war oder sich wiederholt. Ein kurzer Wochenbericht mit denselben fünf, sechs Zahlen reicht dafür völlig aus.",
    },
    {
      frage: "Was, wenn eine einzelne Woche schlecht aussieht?",
      antwort:
        "Eine Woche ist kein Trend, wie die Beispieltabelle mit Woche 33 zeigt. Reagieren Sie erst, wenn sich eine Abweichung über drei bis vier Wochen bestätigt, sonst korrigieren Sie ein System, das eigentlich funktioniert, wegen eines Ausreißers.",
    },
    {
      frage: "Reicht eine einfache Tabelle, oder brauche ich dafür ein CRM?",
      antwort:
        "Für den Einstieg reicht eine Tabelle, in die jede Anfrage mit Datum, Quelle und Ergebnis eingetragen wird. Ab einer zweistelligen Zahl an Anfragen im Monat wird das schnell fehleranfällig, dann übernimmt ein CRM die Erfassung automatisch, ohne dass jede Zahl von Hand nachgetragen wird.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Makler-Kennzahlen: Die 9 Zahlen, die ein Büro steuern | beuwy",
  [`${S}meta.beschreibung`]:
    "Makler-Kennzahlen: die 9 KPIs von Anfragequote bis Time-to-Notar, mit Formel und Rechenbeispiel. Das Wochenbericht-Prinzip statt Bauchgefühl im Maklerbüro.",
  [`${S}meta.og_titel`]: "Makler-Kennzahlen: Die 9 Zahlen, die ein Büro steuern | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Von der Anfragequote bis zum Time-to-Notar: die 9 Kennzahlen, mit denen ein Maklerbüro sich selbst steuert, statt sich auf ein Gefühl zu verlassen.",

  [`${S}hero.eyebrow`]: "Kennzahlen & Steuerung",
  [`${S}hero.titel`]: "Makler-Kennzahlen: die *9 Zahlen*, die ein Büro wirklich steuern.",
  [`${S}hero.intro_vor`]:
    "Als Makler sollten Sie neun Kennzahlen regelmäßig messen: Anfragequote, Cost per Lead, Erreichungsquote, Terminquote, Alleinauftragsquote, Vermarktungsdauer, Time-to-Notar, Cost per Abschluss und Bewertungsquote. Jede Zahl zeigt eine andere Stelle im Trichter zwischen Website-Besuch und Notartermin, und",
  [`${S}hero.intro_highlight`]:
    "erst zusammen ergeben sie ein Bild, dem ein Büro folgen kann, statt einem Gefühl",
  [`${S}hero.intro_nach`]:
    ". Ohne diese Zahlen bleibt jede Entscheidung (mehr Werbebudget, eine Einstellung, ein Rabatt auf die Provision) eine Vermutung.",
  [`${S}hero.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_antwortzeit`]: "Antwort innerhalb von 24 Stunden",

  [`${S}kennzahlen.eyebrow`]: "Die 9 Zahlen",
  [`${S}kennzahlen.titel`]: "Vom Website-Besuch bis zum Notartermin: eine Zahl je *Stufe*.",
  [`${S}kennzahlen.sub`]:
    "Jede Kennzahl beantwortet eine andere Frage. Zusammen zeigen sie, an welcher Stelle im Trichter tatsächlich etwas verloren geht.",
  ...kennzahlen.defaults,

  [`${S}wochenbericht.eyebrow`]: "Das Wochenbericht-Prinzip",
  [`${S}wochenbericht.titel`]: "Eine Woche zeigt einen Ausschlag. Vier Wochen zeigen einen *Trend*.",
  [`${S}wochenbericht.kopf_woche`]: "Woche",
  [`${S}wochenbericht.kopf_anfragen`]: "Anfragen",
  [`${S}wochenbericht.kopf_erreicht`]: "Erreichungsquote",
  [`${S}wochenbericht.kopf_termine`]: "Termine",
  [`${S}wochenbericht.kopf_alleinauftraege`]: "Alleinaufträge",
  [`${S}wochenbericht.kopf_cpl`]: "Cost per Lead",
  ...wochen.defaults,
  [`${S}wochenbericht.kommentar`]:
    "Woche 33 sieht schlecht aus: weniger Anfragen, keine Alleinaufträge, ein Cost per Lead von 55 €. Ein Bauchgefühl hätte an dieser Stelle das Budget gekürzt oder die Kampagne pausiert. Der Wochenbericht zeigt stattdessen, dass Woche 34 wieder über dem Schnitt liegt: derselbe Aufbau, dieselbe Zielgruppe, nur eine schwächere Woche dazwischen.",

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Bauchgefühl ist die teuerste Kennzahl.",
  [`${S}unterschied.text`]:
    "Ein Bauchgefühl kostet nichts in dem Moment, in dem Sie es äußern. Bezahlt wird es später: in einer Preissenkung nach einer einzigen schwachen Woche, obwohl der Trend über vier Wochen stabil war, oder in einem Werbebudget, das seit Monaten steigt, ohne dass jemand den Cost per Lead kennt. Neun Zahlen sind der günstigere Weg.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "Bei RIEGEL Immobilien landet jede Anfrage mit Quelle im System, samt Terminstrecke und Rückrufregel. In den ersten drei Monaten nach dem Relaunch stand die Zahl fest: neun zusätzliche Mandate, nachvollziehbar über genau die Kennzahlen, die vorher fehlten.",
  [`${S}beweis.link_case`]: "Fallstudie RIEGEL Immobilien lesen →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Gespräch wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihren *Wochenbericht*.",
  [`${S}finale.text_1`]: "Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_2`]:
    ", wie sich der Cost per Lead über Anzeigen und Rechner senken lässt, zeigt die Seite",
  [`${S}finale.link_perf`]: "Performance-Marketing für Makler",
  [`${S}finale.text_3`]: ", wann aus den Zahlen die erste Einstellung folgt, zeigt die Seite",
  [`${S}finale.link_skalieren`]: "Maklerbüro skalieren",
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

  [`${S}kennzahlen.eyebrow`]: "Die 9 Kennzahlen · Eyebrow",
  [`${S}kennzahlen.titel`]: "Die 9 Kennzahlen · Titel (ein *Wort* = Highlighter)",
  [`${S}kennzahlen.sub`]: "Die 9 Kennzahlen · Subline",
  ...kennzahlen.labels,

  [`${S}wochenbericht.eyebrow`]: "Wochenbericht-Tabelle · Eyebrow",
  [`${S}wochenbericht.titel`]: "Wochenbericht-Tabelle · Titel (ein *Wort* = Highlighter)",
  [`${S}wochenbericht.kopf_woche`]: "Wochenbericht-Tabelle · Spaltenkopf 1 (Woche)",
  [`${S}wochenbericht.kopf_anfragen`]: "Wochenbericht-Tabelle · Spaltenkopf 2 (Anfragen)",
  [`${S}wochenbericht.kopf_erreicht`]: "Wochenbericht-Tabelle · Spaltenkopf 3 (Erreichungsquote)",
  [`${S}wochenbericht.kopf_termine`]: "Wochenbericht-Tabelle · Spaltenkopf 4 (Termine)",
  [`${S}wochenbericht.kopf_alleinauftraege`]: "Wochenbericht-Tabelle · Spaltenkopf 5 (Alleinaufträge)",
  [`${S}wochenbericht.kopf_cpl`]: "Wochenbericht-Tabelle · Spaltenkopf 6 (Cost per Lead)",
  ...wochen.labels,
  [`${S}wochenbericht.kommentar`]: "Wochenbericht-Tabelle · Kommentar-Absatz unter der Tabelle",

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis-Anriss · Label",
  [`${S}beweis.text`]: "Beweis-Anriss · Text",
  [`${S}beweis.link_case`]: "Beweis-Anriss · Link-Text (Fallstudie RIEGEL)",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.text_1`]: "Finale · Satz, Teil vor Link 1 (Hub)",
  [`${S}finale.link_hub`]: "Finale · Link-Text 1 (Immobilienmarketing-Hub)",
  [`${S}finale.text_2`]: "Finale · Satz, Teil zwischen Link 1 und Link 2",
  [`${S}finale.link_perf`]: "Finale · Link-Text 2 (Performance-Marketing für Makler)",
  [`${S}finale.text_3`]: "Finale · Satz, Teil zwischen Link 2 und Link 3",
  [`${S}finale.link_skalieren`]: "Finale · Link-Text 3 (Maklerbüro skalieren)",
  [`${S}finale.text_4`]: "Finale · Satz, Abschluss nach Link 3",
  [`${S}finale.cta_label`]: "Finale · CTA-Button-Text",
  [`${S}finale.cta_antwortzeit`]: "Finale · Antwortzeit-Hinweis unter dem CTA",
};
