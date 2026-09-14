import { listeRegistrieren } from "../lesen";

/** Studio-Texte /maklerwebsite-kosten — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "maklerwebsite-kosten", titel: "Maklerwebsite-Kosten", route: "/maklerwebsite-kosten" };
const S = "s.maklerwebsite-kosten.";

const stufen = listeRegistrieren(
  "maklerwebsite-kosten",
  "stufen",
  "Preisstufe",
  [
    {
      name: "Baukasten-Website",
      preis: "0–50 €/Monat",
      bekommt: "Fertige Vorlage, Standard-Baustein-Editor, Hosting inklusive, in Stunden online.",
      grenze:
        "Austauschbares Design mit wenig Spielraum für eine eigene Marke, kaum Anbindung an CRM oder Automatisierung.",
      versteckt:
        "Eigene Zeit für Pflege und Texte, laufende Lizenzgebühr statt Einmalpreis, ein Anbieterwechsel bedeutet meist Neustart.",
    },
    {
      name: "Template-Agentur",
      preis: "2.000–8.000 €",
      bekommt:
        "Professionelles Design auf Basis eines Templates, eigene Inhalte, meist auf einem gängigen Baukastensystem.",
      grenze:
        "Das Design bleibt im Rahmen der Vorlage. Individuelle Funktionen wie Rechner oder CRM-Anbindung sind Zusatzaufwand.",
      versteckt:
        "Wartung, Plugin-Updates und Hosting laufen häufig separat weiter, Änderungen nach Launch werden meist nach Aufwand berechnet.",
    },
    {
      name: "Individuelle Agentur",
      preis: "8.000–25.000 €",
      bekommt: "Eigenes Design ohne Templatezwang, individuelle Struktur, oft mit eigener Konzeptphase.",
      grenze: "Automatisierung, CRM-Anbindung und laufende Weiterentwicklung sind meist nicht Teil des Pakets.",
      versteckt: "Pflege und technische Wartung nach Launch, zusätzliche Kosten für jede spätere Erweiterung.",
    },
    {
      name: "Premium-System mit CRM-Anbindung & Automatisierung",
      preis: "15.000–50.000+ €",
      bekommt:
        "Ein eigenes System mit direkter CRM-Anbindung, automatisierten Abläufen: Rechner, Follow-up, Lead-Scoring.",
      grenze: "Lohnt sich nur, wenn genug Anfragevolumen da ist, das System auch zu füttern.",
      versteckt:
        "Lizenzkosten der angebundenen Software sowie Aufwand für Betreuung und Weiterentwicklung nach dem Livegang.",
    },
  ],
  { name: "Name", preis: "Preis", bekommt: "Was man bekommt", grenze: "Wo die Grenze liegt", versteckt: "Versteckte Kosten" },
);

const stats = listeRegistrieren(
  "maklerwebsite-kosten",
  "stats",
  "Rechenbeispiel-Stat",
  [
    { wert: "10.000–15.000 €", text: "Courtage, die ein Alleinauftrag im Schnitt bringt." },
    {
      wert: "3",
      text: "zusätzliche Alleinaufträge im Jahr, die ohne die Website nicht zustande gekommen wären.",
    },
    { wert: "Rechnet sich", text: "auf jeder der vier Preisstufen, die Baukasten-Website eingeschlossen." },
  ],
  { wert: "Wert", text: "Text" },
);

const faq = listeRegistrieren(
  "maklerwebsite-kosten",
  "faq",
  "FAQ",
  [
    {
      frage: "Warum steht hier kein beuwy-Preis?",
      antwort:
        "Weil ein seriöser Preis erst nach der Diagnose feststeht: welches CRM angebunden werden soll, wie viele Objekttypen, welche Automatisierung. Die Marktspannen oben zeigen die Bandbreite; Ihren Festpreis nennen wir nach dem ersten Gespräch, schriftlich.",
    },
    {
      frage: "Lohnt sich ein Premium-System auch für kleinere Büros?",
      antwort:
        "Nur, wenn genug Anfragevolumen da ist, das System auch zu füttern. Für ein Ein-Personen-Büro mit wenigen Objekten im Jahr ist häufig eine individuelle Agentur-Lösung die vernünftigere Stufe. Das sagen wir auch so, wenn es zutrifft.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Was kostet eine Maklerwebsite? Preise 2026 im Überblick | beuwy",
  [`${S}meta.beschreibung`]:
    "Baukasten, Template-Agentur, individuelle Agentur oder Premium-System mit CRM-Anbindung: die realistischen Preisspannen für Maklerwebsites 2026, und warum die günstigste Website oft die teuerste ist.",

  [`${S}hero.eyebrow`]: "Preise 2026",
  [`${S}hero.titel`]: "Was kostet eine *Maklerwebsite* wirklich?",
  [`${S}hero.sub`]:
    "Vier Preisstufen, vier verschiedene Ergebnisse. Der Überblick über die realistischen Marktspannen 2026, inklusive der Kosten, die auf keiner Rechnung stehen.",
  [`${S}hero.cta_label2`]: "Direkt zu den Preisstufen ↓",

  [`${S}stufen.eyebrow`]: "Die vier Preisstufen",
  [`${S}stufen.titel`]: "Von der Baukasten-Website bis zum *Premium-System*.",
  [`${S}stufen.kopf_bekommt`]: "Was man bekommt",
  [`${S}stufen.kopf_grenze`]: "Wo die Grenze liegt",
  [`${S}stufen.kopf_versteckt`]: "Versteckte Kosten",
  ...stufen.defaults,

  [`${S}reframe.eyebrow`]: "Der Denkfehler bei der Preisfrage",
  [`${S}reframe.titel`]: "Die teuerste Website ist die, die keine *Eigentümer-Anfragen* bringt.",
  [`${S}reframe.text`]:
    "Jede Preisstufe hat ihren Platz. Die Frage, die den Unterschied macht, lautet nicht „was kostet die Website“, sondern „was bringt sie zurück“. Ein Rechenbeispiel dazu:",
  ...stats.defaults,

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vorher *wissen* wollen.",
  ...faq.defaults,

  [`${S}abschluss.karte_label`]: "Bevor Sie sich entscheiden",
  [`${S}abschluss.karte_titel`]: "Wir sagen Ihnen ehrlich, welche Stufe zu Ihrem Haus passt.",
  [`${S}abschluss.karte_text`]:
    "Nicht jedes Haus braucht ein Premium-System. Im ersten Gespräch schauen wir auf Ihr Anfragevolumen und Ihren Markt und sagen Ihnen, ob sich der Sprung überhaupt rechnet. 17 Jahre Markterfahrung zeigen, wann sich eine Stufe lohnt und wann nicht.",
  [`${S}abschluss.schluss_titel`]: "Sprechen wir über Ihre Zahlen, nicht über eine Preisliste.",
  [`${S}abschluss.schluss_text`]:
    "Wie viele Alleinaufträge bräuchte Ihre Website pro Jahr, damit sich eine neue Stufe rechnet? Das beantworten wir gemeinsam, in einem kurzen Gespräch.",
  [`${S}abschluss.link1`]: "BOTTIMMO-Alternative",
  [`${S}abschluss.link2`]: "Maklersoftware im Vergleich",
  [`${S}abschluss.link3`]: "Website für Makler",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",

  [`${S}hero.eyebrow`]: "Hero (ClusterHero) · Eyebrow",
  [`${S}hero.titel`]: "Hero (ClusterHero) · Titel (ein *Wort* = Highlighter)",
  [`${S}hero.sub`]: "Hero (ClusterHero) · Subline",
  [`${S}hero.cta_label2`]: "Hero (ClusterHero) · Zweiter CTA-Link-Text",

  [`${S}stufen.eyebrow`]: "Vier Preisstufen · Eyebrow",
  [`${S}stufen.titel`]: "Vier Preisstufen · Titel (ein *Wort* = Highlighter)",
  [`${S}stufen.kopf_bekommt`]: "Vier Preisstufen · Spaltenkopf 1 (Was man bekommt)",
  [`${S}stufen.kopf_grenze`]: "Vier Preisstufen · Spaltenkopf 2 (Wo die Grenze liegt)",
  [`${S}stufen.kopf_versteckt`]: "Vier Preisstufen · Spaltenkopf 3 (Versteckte Kosten)",
  ...stufen.labels,

  [`${S}reframe.eyebrow`]: "Reframe · Eyebrow",
  [`${S}reframe.titel`]: "Reframe · Titel (ein *Wort* = Highlighter)",
  [`${S}reframe.text`]: "Reframe · Einleitungs-Absatz vor den drei Stats",
  ...stats.labels,

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,

  [`${S}abschluss.karte_label`]: "Abschluss (ClusterAbschluss) · Gelbe Karte, Label",
  [`${S}abschluss.karte_titel`]: "Abschluss (ClusterAbschluss) · Gelbe Karte, Titel",
  [`${S}abschluss.karte_text`]: "Abschluss (ClusterAbschluss) · Gelbe Karte, Text",
  [`${S}abschluss.schluss_titel`]: "Abschluss (ClusterAbschluss) · Schluss-Titel",
  [`${S}abschluss.schluss_text`]: "Abschluss (ClusterAbschluss) · Schluss-Text",
  [`${S}abschluss.link1`]: "Abschluss (ClusterAbschluss) · Quervernetzung 1 (BOTTIMMO)",
  [`${S}abschluss.link2`]: "Abschluss (ClusterAbschluss) · Quervernetzung 2 (Maklersoftware)",
  [`${S}abschluss.link3`]: "Abschluss (ClusterAbschluss) · Quervernetzung 3 (Website für Makler)",
};
