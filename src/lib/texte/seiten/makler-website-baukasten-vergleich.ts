import { listeRegistrieren } from "../lesen";

/** Studio-Texte /makler-website-baukasten-vergleich — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "makler-website-baukasten-vergleich",
  titel: "Baukasten-Vergleich",
  route: "/makler-website-baukasten-vergleich",
};
const S = "s.makler-website-baukasten-vergleich.";

const matrix = listeRegistrieren(
  "makler-website-baukasten-vergleich",
  "matrix",
  "Matrix-Zeile",
  [
    {
      kriterium: "Tempo bis Livegang",
      wix: "In Tagen online, generisches Vorlagen-Layout",
      bottimmo: "Website und Anzeigenvorlagen in kurzer Zeit startklar",
      casaone: "Läuft direkt aus dem CRM-System, schnell für Bestandsdaten",
      massportal: "Vier bis sechs Wochen, dafür auf die eigene Marke zugeschnitten",
    },
    {
      kriterium: "CRM-Anbindung",
      wix: "Keine native Anbindung an Maklersoftware, Formulare oft manuell übertragen",
      bottimmo: "Eigenes System, Anbindung an externe CRMs eingeschränkt",
      casaone: "Direkt am eigenen CRM, kaum Anbindung außerhalb des CasaOne-Ökosystems",
      massportal: "Anbindung an das CRM, das Sie bereits nutzen: onOffice, FLOWFACT, Propstack",
    },
    {
      kriterium: "Exposé-Qualität",
      wix: "Freies Baukasten-Layout, Exposé-Logik muss selbst gebaut werden",
      bottimmo: "Vorgefertigte Exposé-Vorlage im Systemlook",
      casaone: "Exposé direkt aus den CRM-Objektdaten, im CasaOne-Raster",
      massportal: "Dramaturgie, die den Preis begründet, im eigenen Markenlook",
    },
    {
      kriterium: "SEO-Fähigkeit",
      wix: "Technische SEO-Grundausstattung vorhanden, Seitenstruktur bleibt generisch",
      bottimmo: "Fertige Themenwelt an Ratgeberinhalten, geteilt mit anderen Kunden des Systems",
      casaone: "Fokus liegt auf Objektverwaltung, SEO bleibt Nebensache",
      massportal: "Eine Seite pro Suchfrage, lokale Landingpages, technisches Fundament fürs Ranking",
    },
    {
      kriterium: "Eigentum an Inhalten",
      wix: "Inhalte bleiben im Baukasten-System gebunden, Umzug bedeutet Neubau",
      bottimmo: "Ratgebertexte sind gemietet, laufen mit der Lizenz aus",
      casaone: "Website bleibt an das CRM-Abo gekoppelt",
      massportal: "Domain, Code und Inhalte gehören dauerhaft Ihrem Büro",
    },
  ],
  {
    kriterium: "Kriterium",
    wix: "Wix / Jimdo",
    bottimmo: "BOTTIMMO",
    casaone: "CasaOne",
    massportal: "Maßportal",
  },
);

const faq = listeRegistrieren(
  "makler-website-baukasten-vergleich",
  "faq",
  "FAQ",
  [
    {
      q: "Welcher Baukasten ist der beste für Makler?",
      a: "Das hängt vom Anspruch ab, nicht von einer festen Rangliste. Für den ersten Online-Auftritt mit kleinem Budget ist ein Baukasten oft ausreichend. Für den Alleinauftrag gegen den führenden Makler der Stadt entscheidet meist die eigene Marke, nicht die geteilte Vorlage.",
    },
    {
      q: "Kann ich später vom Baukasten auf ein eigenes Portal wechseln?",
      a: "Ja, das ist der übliche Weg. Domains und Inhalte aus dem Baukasten lassen sich meist nicht direkt übernehmen, weil sie an das jeweilige System gebunden sind. Der Wechsel läuft parallel: das neue Portal steht, bevor die alte Lizenz endet.",
    },
    {
      q: "Warum dauert ein Maßportal länger als ein Baukasten?",
      a: "Ein Baukasten füllt eine bestehende Vorlage mit Ihren Daten. Ein Maßportal entsteht neu, von der Marke über die Seitenarchitektur bis zur CRM-Anbindung. Das braucht vier bis sechs Wochen, dafür ist das Ergebnis nicht mit dem des Mitbewerbers austauschbar.",
    },
    {
      q: "Was kostet ein eigenes Portal im Vergleich zum Baukasten?",
      a: "Ein Baukasten läuft meist über eine monatliche Lizenz im dreistelligen Bereich, ein Maßportal über eine höhere Investition im Voraus, dafür gehört Ihnen das Ergebnis dauerhaft. Details und Spannen stehen unter Maklerwebsite-Kosten.",
    },
  ],
  { q: "Frage", a: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Makler-Website-Baukästen im Vergleich: Wix, Jimdo, BOTTIMMO & Co. | beuwy",
  [`${S}meta.beschreibung`]:
    "Makler-Website-Baukästen im Vergleich: Wix, Jimdo, BOTTIMMO und weitere nach Tempo, CRM, Exposés und SEO geprüft, mit klarer Grenze zum eigenen Maßportal.",
  [`${S}meta.og_titel`]: "Makler-Website-Baukästen im Vergleich: Wix, Jimdo, BOTTIMMO & Co. | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Fünf Kriterien, vier Systeme: wo ein Website-Baukasten für Makler reicht und wo die Grenze zum eigenen Maßportal beginnt.",

  [`${S}kopf.eyebrow`]: "Vergleich",
  [`${S}kopf.titel`]: "Welcher Website-Baukasten passt für *Makler*, und wann keiner mehr reicht.",
  [`${S}kopf.text_vor`]:
    "Welcher Website-Baukasten für Makler passt, hängt von Ihrem Anspruch ab, nicht von einer festen Rangliste. Wix und Jimdo liefern ein freies Layout ohne Maklerbezug, BOTTIMMO eine fertige Themenwelt speziell für Makler, CasaOne eine Website direkt aus dem CRM-System heraus.",
  [`${S}kopf.text_hervor`]:
    "Bei allen dreien bleiben Design und Inhalte an das jeweilige System gebunden",
  [`${S}kopf.text_nach`]:
    ". Ein eigenes Maßportal löst genau diese Bindung, kostet dafür mehr Zeit beim Bau.",
  [`${S}kopf.cta`]: "Zusammenarbeit anfragen",
  [`${S}kopf.cta_note`]: "Antwort innerhalb von 24 Stunden",

  [`${S}position.eyebrow`]: "Unsere Position",
  [`${S}position.titel`]: "Es gibt keinen *besten* Baukasten, nur die passende Grenze für Ihr Haus.",
  [`${S}position.sub`]:
    "Diese Seite bewertet nicht, welches System gewinnt. Sie zeigt, an welchem Punkt ein geteiltes System an seine Grenze stößt und ein eigenes Portal mehr bringt als jede weitere Vorlagen-Anpassung.",

  [`${S}matrix.eyebrow`]: "Die Matrix",
  [`${S}matrix.titel`]: "Fünf Kriterien, vier Systeme im *direkten* Vergleich.",
  [`${S}matrix.kopf_kriterium`]: "Kriterium",
  [`${S}matrix.kopf_wix`]: "Wix / Jimdo",
  [`${S}matrix.kopf_bottimmo`]: "BOTTIMMO",
  [`${S}matrix.kopf_casaone`]: "CasaOne",
  [`${S}matrix.kopf_massportal`]: "Maßportal",
  ...matrix.defaults,
  [`${S}matrix.fussnote_vor`]:
    "Wix, Jimdo, BOTTIMMO und CasaOne sind Marken der jeweiligen Anbieter. beuwy ist unabhängiger Dienstleister ohne Gesellschafterbindung an diese Anbieter. Ausführlicher zu BOTTIMMO:",
  [`${S}matrix.fussnote_link`]: "BOTTIMMO Erfahrungen",
  [`${S}matrix.fussnote_nach`]: ".",

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Ein Baukasten ist kein Maßportal.",
  [`${S}unterschied.text`]:
    "Er füllt eine bestehende Vorlage mit Ihren Daten, schnell und zuverlässig. Ein Maßportal entsteht neu um Ihre Marke herum: Seitenarchitektur, CRM-Anbindung und SEO-Fundament eingeschlossen. Das braucht mehr Zeit beim Bau, dafür kein zweites Büro mit derselben Vorlage.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "17 Jahre Markenarbeit, davor für Bosch und Continental. Für RIEGEL Immobilien bedeutete der Wechsel vom Vorlagen-Auftritt zum eigenen Portal: neun zusätzliche Mandate in den ersten drei Monaten.",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor der *Systemwahl* wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihr *Maßportal*, keine weitere Vorlage.",
  [`${S}finale.text_vor`]: "Den ausführlichen Erfahrungsbericht zu einem der Systeme lesen Sie unter",
  [`${S}finale.link_bottimmo`]: "BOTTIMMO Erfahrungen",
  [`${S}finale.text_mitte`]: ", was ein eigenes Portal kostet zeigt",
  [`${S}finale.link_kosten`]: "Maklerwebsite-Kosten",
  [`${S}finale.text_mitte2`]: ". Den Überblick über alle Bausteine bietet der",
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

  [`${S}position.eyebrow`]: "Positionierung · Eyebrow",
  [`${S}position.titel`]: "Positionierung · Titel (ein *Wort* = Highlighter)",
  [`${S}position.sub`]: "Positionierung · Subline",

  [`${S}matrix.eyebrow`]: "Matrix · Eyebrow",
  [`${S}matrix.titel`]: "Matrix · Titel (ein *Wort* = Highlighter)",
  [`${S}matrix.kopf_kriterium`]: "Matrix · Tabellenkopf · Spalte 1",
  [`${S}matrix.kopf_wix`]: "Matrix · Tabellenkopf · Spalte 2",
  [`${S}matrix.kopf_bottimmo`]: "Matrix · Tabellenkopf · Spalte 3",
  [`${S}matrix.kopf_casaone`]: "Matrix · Tabellenkopf · Spalte 4",
  [`${S}matrix.kopf_massportal`]: "Matrix · Tabellenkopf · Spalte 5",
  ...matrix.labels,
  [`${S}matrix.fussnote_vor`]: "Matrix · Fußnote, Teil vor dem Link",
  [`${S}matrix.fussnote_link`]: "Matrix · Fußnote, Link-Text (BOTTIMMO Erfahrungen)",
  [`${S}matrix.fussnote_nach`]: "Matrix · Fußnote, Teil nach dem Link",

  [`${S}unterschied.label`]: "Der Unterschied · Karten-Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Karten-Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Karten-Text",

  [`${S}beweis.label`]: "Beweis-Anriss · Label",
  [`${S}beweis.text`]: "Beweis-Anriss · Text",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,

  [`${S}finale.label`]: "Finale · Eyebrow",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.text_vor`]: "Finale · Text, Teil vor Link 1 (BOTTIMMO Erfahrungen)",
  [`${S}finale.link_bottimmo`]: "Finale · Link-Text 1 (BOTTIMMO Erfahrungen)",
  [`${S}finale.text_mitte`]: "Finale · Text, Teil zwischen Link 1 und Link 2",
  [`${S}finale.link_kosten`]: "Finale · Link-Text 2 (Maklerwebsite-Kosten)",
  [`${S}finale.text_mitte2`]: "Finale · Text, Teil zwischen Link 2 und Link 3",
  [`${S}finale.link_hub`]: "Finale · Link-Text 3 (Immobilienmarketing-Hub)",
  [`${S}finale.text_nach`]: "Finale · Text, Teil nach Link 3",
  [`${S}finale.cta`]: "Finale · Button-Text",
  [`${S}finale.cta_note`]: "Finale · Hinweis unter dem Button",
};
