import { listeRegistrieren } from "../lesen";

/** Studio-Texte /casaone-website — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "casaone-website", titel: "CasaOne-Website", route: "/casaone-website" };
const S = "s.casaone-website.";

const anzeichen = listeRegistrieren(
  "casaone-website",
  "anzeichen",
  "Anzeichen",
  [
    { text: "Sie verkaufen überwiegend Objekte über 800.000 €" },
    { text: "Eigentümer vergleichen Sie mit Maklern, die eine eigene Marke zeigen" },
    { text: "Ihre Website sieht aus wie die des Mitbewerbers im selben CRM-System" },
    { text: "Es gibt keinen eigenen Bewertungsrechner, nur ein Kontaktformular" },
    { text: "Die Bildsprache stammt aus Stock-Fotos statt aus echten Objekten" },
    { text: "Ein Alleinauftrag ging zuletzt an einen Mitbewerber mit stärkerem Auftritt" },
  ],
  { text: "Text" },
);

const schritte = listeRegistrieren(
  "casaone-website",
  "schritte",
  "Migrationsschritt",
  [
    {
      titel: "Analyse des bestehenden Auftritts",
      text: "Wir sichten Ihre CasaOne-Struktur, Ihre Objektklasse und den Auftritt der Mitbewerber, die Sie tatsächlich verlieren.",
    },
    {
      titel: "Markenkern definieren",
      text: "Typografie, Farbwelt und Sprache entstehen für Ihre Preisklasse, nicht aus einer Vorlage, die andere CasaOne-Kunden ebenfalls nutzen.",
    },
    {
      titel: "Objekt-Sync migrieren",
      text: "CasaOne bleibt Ihr CRM. Objekte laufen weiter automatisch, jetzt im Layout Ihrer neuen Marke statt im Baukasten-Raster.",
    },
    {
      titel: "Livegang mit Parallelbetrieb",
      text: "Das neue Portal steht, bevor die alte Website abgeschaltet wird: kein Tag ohne Auftritt, kein verlorener Eigentümer-Kontakt.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const faq = listeRegistrieren(
  "casaone-website",
  "faq",
  "FAQ",
  [
    {
      frage: "Muss ich CasaOne kündigen, um zu wechseln?",
      antwort:
        "Nein. CasaOne bleibt Ihr CRM für Objekte und Kontakte, wir tauschen ausschließlich den Auftritt davor. Ob und wann Sie die alte Website-Lizenz kündigen, entscheiden Sie unabhängig davon.",
    },
    {
      frage: "Ab welcher Preisklasse lohnt sich der Wechsel?",
      antwort:
        "Eine feste Grenze gibt es nicht. Als Richtwert: Sobald Sie regelmäßig Objekte über 800.000 € vermarkten und Eigentümer Sie mit Häusern vergleichen, die eine eigene Marke zeigen, wird der Vorlagen-Auftritt zum Nachteil.",
    },
    {
      frage: "Verliere ich beim Wechsel meine Objektdaten?",
      antwort:
        "Nein. Die Objektdaten bleiben in CasaOne, wo sie heute schon liegen. Das neue Portal liest sie über die bestehende Anbindung, nichts wird doppelt gepflegt oder geht verloren.",
    },
    {
      frage: "Wie lange dauert der Migrationspfad?",
      antwort:
        "Analyse, Markenkern, Objekt-Sync und Livegang laufen üblicherweise über mehrere Wochen, mit Parallelbetrieb bis zum Umstellungstag. Eine feste Zahl nennen wir erst nach dem ersten Gespräch über Ihren Bestand.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "CasaOne-Website: Grenzen des Baukastens im Premium-Segment | beuwy",
  [`${S}meta.beschreibung`]:
    "CasaOne-Website: für den Start reicht der Baukasten, im Premium-Segment stößt die Vorlage an Grenzen bei Typografie, Bildwelt und Funnel. Der Migrationspfad.",
  [`${S}meta.og_titel`]: "CasaOne-Website: Grenzen des Baukastens im Premium-Segment | beuwy",
  [`${S}meta.og_beschreibung`]:
    "CasaOne verwaltet Objekte zuverlässig. Sobald Eigentümer hochpreisiger Objekte vergleichen, entscheidet die eigene Marke: der ehrliche Migrationspfad ohne Systemwechsel.",

  [`${S}kopf.eyebrow`]: "CRM · CasaOne",
  [`${S}kopf.titel`]: "CasaOne-Website: wo der Baukasten im *Premium*-Segment endet.",
  [`${S}kopf.intro_vor`]:
    "Für den Start reicht sie: CasaOne verwaltet Objekte und Kontakte zuverlässig und liefert eine CRM-Website, die läuft. Für ein Büro im Premium-Segment reicht sie meist nicht mehr, weil",
  [`${S}kopf.intro_highlight`]: "Typografie, Bildwelt und Funnel aus der Vorlage stammen",
  [`${S}kopf.intro_nach`]:
    ", nicht aus Ihrer Positionierung. Ein Eigentümer einer 1,2-Mio.-€-Immobilie vergleicht Sie mit Maklern, die einen eigenen Auftritt zeigen. Der Wechsel ist kein Bruch: CasaOne bleibt CRM, nur der Auftritt davor wird ausgetauscht.",
  [`${S}kopf.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}kopf.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",

  [`${S}checkliste.eyebrow`]: "Selbst-Check",
  [`${S}checkliste.titel`]: "Sechs Anzeichen, dass CasaOne nicht mehr *reicht*.",
  [`${S}checkliste.sub`]: "Trifft mehr als die Hälfte zu, kostet die Vorlage Sie vermutlich bereits Alleinaufträge.",
  ...anzeichen.defaults,

  [`${S}migration.eyebrow`]: "Der Migrationspfad",
  [`${S}migration.titel`]: "Vier Schritte. CasaOne bleibt, der *Auftritt* wechselt.",
  ...schritte.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "CasaOne bleibt Ihr CRM. Nur der Auftritt wechselt die Liga.",
  [`${S}unterschied.text`]:
    "Ein Baukasten reicht, solange niemand vergleicht. Im Premium-Segment vergleicht jeder Eigentümer, meist bevor er anruft. Die Marke entscheidet dort, wo die Vorlage aufhört.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "Für Vision Group bauten wir Marke und Auftritt für den Investorenmarkt: aus einem Dreierteam wurde eine 160-Mio.-€-Partnerschaft mit KKR, 1.450 Wohneinheiten entwickelt im Höchststand. Ohne Auftritt kein Gespräch dieser Größenordnung.",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *Wechsel* wissen wollen.",
  ...faq.defaults,
  [`${S}faq.hinweis`]: "CasaOne ist eine Marke der CasaOne AG. beuwy ist unabhängiger Dienstleister.",

  [`${S}fazit.label`]: "Der nächste Schritt",
  [`${S}fazit.titel`]: "Bauen wir den Auftritt für Ihre *Preisklasse*.",
  [`${S}fazit.text_1`]: "Was ein eigenes Portal kostet, zeigt",
  [`${S}fazit.link1`]: "Maklerwebsite-Kosten",
  [`${S}fazit.text_2`]: ", den Aufbau im Detail",
  [`${S}fazit.link2`]: "Website für Immobilienmakler",
  [`${S}fazit.text_3`]: ". Den Überblick über alle Bausteine finden Sie im",
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

  [`${S}checkliste.eyebrow`]: "Selbst-Check · Eyebrow",
  [`${S}checkliste.titel`]: "Selbst-Check · Titel (ein *Wort* = Hervorhebung)",
  [`${S}checkliste.sub`]: "Selbst-Check · Subline",
  ...anzeichen.labels,

  [`${S}migration.eyebrow`]: "Migrationspfad · Eyebrow",
  [`${S}migration.titel`]: "Migrationspfad · Titel (ein *Wort* = Hervorhebung)",
  ...schritte.labels,

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis-Anriss · Label",
  [`${S}beweis.text`]: "Beweis-Anriss · Text",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Hervorhebung)",
  ...faq.labels,
  [`${S}faq.hinweis`]: "FAQ · Marken-Disclaimer unter dem Accordion",

  [`${S}fazit.label`]: "Finale · Label",
  [`${S}fazit.titel`]: "Finale · H2 (ein *Wort* = Hervorhebung)",
  [`${S}fazit.text_1`]: "Finale · Absatz · Teil 1 (vor Link 1)",
  [`${S}fazit.link1`]: "Finale · Absatz · Link 1 (Maklerwebsite-Kosten)",
  [`${S}fazit.text_2`]: "Finale · Absatz · Teil 2 (zwischen Link 1 und 2)",
  [`${S}fazit.link2`]: "Finale · Absatz · Link 2 (Website für Immobilienmakler)",
  [`${S}fazit.text_3`]: "Finale · Absatz · Teil 3 (zwischen Link 2 und 3)",
  [`${S}fazit.link3`]: "Finale · Absatz · Link 3 (Immobilienmarketing-Hub)",
  [`${S}fazit.text_4`]: "Finale · Absatz · Teil 4 (nach Link 3)",
  [`${S}fazit.cta_hinweis`]: "Finale · Mikrozeile unter dem CTA",
};
