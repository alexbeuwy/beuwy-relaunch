import { listeRegistrieren } from "../lesen";

/** Studio-Texte /tools/mietpreisrechner — nur die Seitentexte; der Miet-Wizard bleibt Code. */
export const SEITE = {
  slug: "tools-mietpreisrechner",
  titel: "Mietpreisrechner",
  route: "/tools/mietpreisrechner",
};
const S = "s.tools-mietpreisrechner.";

const vergleich = listeRegistrieren(
  "tools-mietpreisrechner",
  "vergleich",
  "Vergleichsmiete-Punkt",
  [
    {
      titel: "Der Mietspiegel",
      text: "Städte über 50.000 Einwohner veröffentlichen meist einen eigenen Mietspiegel mit Preisspannen je Lage, Baujahr und Ausstattung. Er ist die rechtlich relevante Grundlage — unser Rechner ersetzt ihn nicht, er bereitet auf ihn vor.",
    },
    {
      titel: "Zu- und Abschläge",
      text: "Balkon, Einbauküche, energetischer Zustand oder ein fehlendes Bad wirken sich auf die erzielbare Miete aus. Zustand und Ausstattung im Rechner bilden diese Effekte modellhaft ab.",
    },
    {
      titel: "Die Mietpreisbremse",
      text: "In vielen angespannten Wohnungsmärkten begrenzt die Mietpreisbremse (§ 556d BGB) die zulässige Neuvermietungsmiete. Der Rechner zeigt einen Hinweis, wenn das für Ihre Stadtgröße typischerweise relevant ist.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const faq = listeRegistrieren(
  "tools-mietpreisrechner",
  "faq",
  "FAQ",
  [
    {
      frage: "Wie genau ist der Mietpreisrechner?",
      antwort:
        "Der Rechner liefert eine Orientierung auf Basis von Objekttyp, Stadtgröße, Zustand, Ausstattung und Baujahr, keinen Mietspiegelwert. Für Neuvermietungen oder Mieterhöhungen zählt rechtlich der örtliche Mietspiegel, nicht dieser Rechner.",
    },
    {
      frage: "Was zählt zur Kaltmiete, die hier berechnet wird?",
      antwort:
        "Die reine Nettokaltmiete, ohne Betriebs- und Heizkosten. Nebenkosten kommen je nach Objekt und Abrechnung noch dazu und sind hier bewusst nicht eingerechnet.",
    },
    {
      frage: "Wann greift die Mietpreisbremse?",
      antwort:
        "Die Mietpreisbremse gilt nur in von den Bundesländern ausgewiesenen Gebieten mit angespanntem Wohnungsmarkt, meist in größeren Städten. Der Rechner zeigt einen Hinweis nach Stadtgröße, ersetzt aber keinen Blick in die tatsächliche Gebietskulisse Ihrer Stadt.",
    },
    {
      frage:
        "Ich bin Makler oder Vermieter mehrerer Objekte — kann ich so einen Rechner auch für meine eigene Website bekommen?",
      antwort:
        "Ja. beuwy baut Vermietern und Maklern genau solche Rechner in die eigene Website, mit dem Ergebnis direkt im eigenen Postfach statt bei uns. Schreiben Sie uns über die Zusammenarbeitsanfrage, wir zeigen Ihnen, wie das für Ihr Haus aussieht.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Mietpreis berechnen: Welche Miete ist realistisch? | beuwy",
  [`${S}meta.beschreibung`]:
    "Mietpreis kostenlos berechnen: Kaltmiete-Spanne und Preis je Quadratmeter live aus Objekttyp, Lage, Zustand, Ausstattung und Baujahr, mit offenem Rechenweg und Mietpreisbremse-Hinweis.",
  [`${S}meta.og_beschreibung`]:
    "Kaltmiete-Spanne und Preis je Quadratmeter live berechnet, kostenlos und ohne Anmeldung. Rechenweg offen, Mietpreisbremse-Hinweis, wenn relevant.",
  [`${S}kopf.label`]: "Mietpreisrechner",
  [`${S}kopf.titel`]: "Welche Miete ist für Ihr Objekt *realistisch*?",
  [`${S}kopf.sub_vor`]:
    "Kaltmiete-Spanne und Preis je Quadratmeter, in drei kurzen Schritten aus Objektart, Lage, Zustand, Ausstattung und Baujahr — kostenlos und ohne Anmeldung.",
  [`${S}kopf.sub_highlight`]: "Der Rechenweg liegt offen, damit Sie nachvollziehen, wie die Zahl entsteht",
  [`${S}kopf.sub_nach`]: ".",
  [`${S}vergleich.eyebrow`]: "Vergleichsmiete verstehen",
  [`${S}vergleich.titel`]: "Drei Dinge entscheiden über *jede* Vergleichsmiete.",
  [`${S}vergleich.sub`]:
    "Dieser Rechner liefert eine Orientierung. Die rechtssichere ortsübliche Vergleichsmiete im Sinne des BGB liefert nur der örtliche Mietspiegel.",
  ...vergleich.defaults,
  [`${S}vergleich.quelle_vor`]:
    "Wie Sie Schritt für Schritt zur belastbaren Vergleichsmiete kommen, zeigt der Leitfaden",
  [`${S}vergleich.quelle_link`]: "Mietpreis ermitteln",
  [`${S}vergleich.quelle_nach`]: ".",
  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor der *ersten* Zahl wissen wollen.",
  ...faq.defaults,
  [`${S}pitch.label`]: "Für Vermieter und Makler",
  [`${S}pitch.titel`]: "Dieser Rechner kann auch Ihrer sein.",
  [`${S}pitch.text`]:
    "Als Unternehmensberatung baut beuwy Vermietern mit mehreren Einheiten und Maklern, die Eigentümer vor dem ersten Anruf abholen wollen, genau solche Rechner in die eigene Website — mit dem Ergebnis direkt im eigenen Postfach.",
  [`${S}pitch.cta`]: "Zusammenarbeit anfragen",
  [`${S}pitch.cta_hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung (weicht vom Meta-Text ab)",
  [`${S}kopf.label`]: "Kopf · Eyebrow",
  [`${S}kopf.titel`]: "Kopf · Titel (ein *Wort* = Highlighter)",
  [`${S}kopf.sub_vor`]: "Kopf · Subline · Teil vor dem Highlighter",
  [`${S}kopf.sub_highlight`]: "Kopf · Subline · Hervorgehobener Teil",
  [`${S}kopf.sub_nach`]: "Kopf · Subline · Teil nach dem Highlighter (Satzende)",
  [`${S}vergleich.eyebrow`]: "Vergleichsmiete · Eyebrow",
  [`${S}vergleich.titel`]: "Vergleichsmiete · Titel (ein *Wort* = Highlighter)",
  [`${S}vergleich.sub`]: "Vergleichsmiete · Subline",
  ...vergleich.labels,
  [`${S}vergleich.quelle_vor`]: "Vergleichsmiete · Quellenhinweis · Teil vor dem Link",
  [`${S}vergleich.quelle_link`]: "Vergleichsmiete · Quellenhinweis · Link-Text",
  [`${S}vergleich.quelle_nach`]: "Vergleichsmiete · Quellenhinweis · Teil nach dem Link (Satzende)",
  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,
  [`${S}pitch.label`]: "Vermieter/Makler-Pitch · Label",
  [`${S}pitch.titel`]: "Vermieter/Makler-Pitch · Titel",
  [`${S}pitch.text`]: "Vermieter/Makler-Pitch · Text",
  [`${S}pitch.cta`]: "Vermieter/Makler-Pitch · Knopf-Text",
  [`${S}pitch.cta_hinweis`]: "Vermieter/Makler-Pitch · Hinweis unter dem Knopf",
};
