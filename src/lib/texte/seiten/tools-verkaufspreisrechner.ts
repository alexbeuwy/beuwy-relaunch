import { listeRegistrieren } from "../lesen";

/** Studio-Texte /tools/verkaufspreisrechner — nur die Seitentexte; der Wizard bleibt Code. */
export const SEITE = {
  slug: "tools-verkaufspreisrechner",
  titel: "Verkaufspreisrechner",
  route: "/tools/verkaufspreisrechner",
};
const S = "s.tools-verkaufspreisrechner.";

const verfahren = listeRegistrieren(
  "tools-verkaufspreisrechner",
  "verfahren",
  "Verfahren",
  [
    {
      titel: "Vergleichswertverfahren",
      text: "Der Preis leitet sich aus tatsächlich verkauften, ähnlichen Objekten in der Umgebung ab. Das gängigste Verfahren bei Eigentumswohnungen und Einfamilienhäusern — und die Basis dieses Rechners.",
    },
    {
      titel: "Sachwertverfahren",
      text: "Bau- und Bodenwert werden getrennt ermittelt und addiert. Der Rechner gleicht dafür live mit den amtlichen Bodenrichtwerten (BORIS) ab — wichtig bei Häusern, Grundstücken und Gewerbeobjekten, wo Grund und Gebäude unterschiedlich altern.",
    },
    {
      titel: "Ertragswertverfahren",
      text: "Der Wert ergibt sich aus der erzielbaren Miete. Standard bei vermieteten Objekten — bei Mehrfamilienhäusern bildet dieser Rechner es direkt über Ihre Jahresnettokaltmiete und einen regionalen Vervielfältiger ab.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const faq = listeRegistrieren(
  "tools-verkaufspreisrechner",
  "faq",
  "FAQ",
  [
    {
      frage: "Wie genau ist das?",
      antwort:
        "So genau, wie ein Modell ohne Objektbesichtigung sein kann: eine Orientierungswert-Spanne um den Mittelwert, kein Gutachten. Die Adresse gleichen wir per Satellitenblick und amtlichen Bodenrichtwerten ab, Zustand, Ausstattung und Energieklasse geben Sie an. Für einen belastbaren Wert braucht es am Ende eine Besichtigung.",
    },
    {
      frage: "Was beeinflusst den Preis?",
      antwort:
        "Objektart, Lage, Wohn- und Grundstücksfläche, Baujahr, Zustand, Ausstattung und Energieeffizienzklasse — bei Mehrfamilienhäusern zusätzlich die Jahresnettokaltmiete. Im Ergebnis sehen Sie die einzelnen Werttreiber mit ihrem prozentualen Effekt, keine Black Box.",
    },
    {
      frage: "Woher kommen die amtlichen Bodenrichtwerte?",
      antwort:
        "Aus BORIS, dem Bodenrichtwertinformationssystem der Vermessungs- und Katasterverwaltung. Der Rechner fragt automatisch den Wert für Ihre Koordinaten ab, sobald die Adresse bestätigt ist, und kennzeichnet ihn im Ergebnis deutlich als amtliche Quelle.",
    },
    {
      frage: "Verkaufen mit oder ohne Makler?",
      antwort:
        "Ohne Makler sparen Sie die Provision, tragen aber Besichtigungen, Verhandlung und Vertragsabwicklung selbst. Ein guter Makler bringt Marktzugang, Verhandlungserfahrung und nimmt Ihnen den Aufwand ab — dafür kostet er. Was sich lohnt, hängt vom Objekt und von Ihrer Zeit ab, nicht von einer pauschalen Antwort.",
    },
    {
      frage: "Was macht beuwy mit meiner Berechnung?",
      antwort:
        "Ohne Ihre E-Mail-Adresse: nichts. Die Berechnung läuft im Browser, es wird nichts gespeichert und niemand kontaktiert Sie. Der PDF-Report entsteht ebenfalls lokal bei Ihnen und lässt sich direkt herunterladen — erst wenn Sie ihn zusätzlich per E-Mail anfordern, landet Ihre Anfrage bei uns.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Verkaufspreis berechnen: Was ist Ihre Immobilie wert? | beuwy",
  [`${S}meta.beschreibung`]:
    "Kostenlos und sofort: Adresse, Objektart und Eckdaten eingeben und die Verkaufswert-Spanne Ihrer Immobilie sehen — mit amtlichen Bodenrichtwerten, Satellitenblick und PDF-Report, ohne E-Mail-Pflicht vorab.",
  [`${S}hero.eyebrow`]: "Kostenloser Rechner für Eigentümer",
  [`${S}hero.titel`]: "Verkaufspreis berechnen: Was ist Ihre Immobilie *wert*?",
  [`${S}hero.sub`]:
    "Adresse, Objektart und ein paar Eckdaten — Satellitenblick, amtliche Bodenrichtwerte und Ihre Verkaufswert-Spanne, sofort sichtbar, ohne dass Sie vorher Ihre E-Mail-Adresse eintippen müssen.",
  [`${S}methode.eyebrow`]: "Die Methode",
  [`${S}methode.titel`]: "Woher die *Zahl* kommt.",
  [`${S}methode.sub`]:
    "Immobilienbewertung kennt drei anerkannte Verfahren. Dieser Rechner kombiniert alle drei, je nach Objektart — transparent, nicht als Black Box.",
  ...verfahren.defaults,
  [`${S}methode.quelle_vor`]: "Mehr zu allen drei Verfahren und wann welches greift:",
  [`${S}methode.quelle_link`]: "Immobilie bewerten",
  [`${S}methode.quelle_nach`]: ".",
  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor der *Berechnung* wissen wollen.",
  ...faq.defaults,
  [`${S}pitch.label`]: "Für Makler",
  [`${S}pitch.titel`]: "Sie sind Makler?",
  [`${S}pitch.text_vor`]:
    "Genau dieses Tool bauen wir in Ihren Farben auf Ihre Domain — Ihr Branding, Ihre Leads, angebunden an Ihr CRM.",
  [`${S}pitch.link`]: "Zusammenarbeit anfragen →",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel (ein *Wort* = Highlighter)",
  [`${S}hero.sub`]: "Hero · Subline",
  [`${S}methode.eyebrow`]: "Methode · Eyebrow",
  [`${S}methode.titel`]: "Methode · Titel (ein *Wort* = Highlighter)",
  [`${S}methode.sub`]: "Methode · Subline",
  ...verfahren.labels,
  [`${S}methode.quelle_vor`]: "Methode · Quellenhinweis · Teil vor dem Link",
  [`${S}methode.quelle_link`]: "Methode · Quellenhinweis · Link-Text",
  [`${S}methode.quelle_nach`]: "Methode · Quellenhinweis · Teil nach dem Link (Satzende)",
  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,
  [`${S}pitch.label`]: "Makler-Sektion · Label",
  [`${S}pitch.titel`]: "Makler-Sektion · Titel",
  [`${S}pitch.text_vor`]: "Makler-Sektion · Text vor dem Link",
  [`${S}pitch.link`]: "Makler-Sektion · Link-Text (führt zu /anfrage)",
};
