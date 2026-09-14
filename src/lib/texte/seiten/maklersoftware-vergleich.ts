import { listeRegistrieren } from "../lesen";

/** Studio-Texte /maklersoftware-vergleich — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "maklersoftware-vergleich", titel: "Maklersoftware im Vergleich", route: "/maklersoftware-vergleich" };
const S = "s.maklersoftware-vergleich.";

const systeme = listeRegistrieren("maklersoftware-vergleich", "systeme", "System", [
  {
    nr: "01",
    name: "onOffice",
    satz1:
      "Eines der am weitesten verbreiteten Maklerverwaltungssysteme im deutschsprachigen Raum, im Einsatz vom Einzelmakler bis zum großen Maklerhaus.",
    satz2:
      "Bekannt für Objektverwaltung, Kontaktmanagement und eine breite Schnittstellenlandschaft zu Portalen und Zusatztools.",
    andock:
      "Wir docken Ihre Website direkt an onOffice an: Anfragen landen mit Quelle und nächstem Schritt im System, nicht im Postfach.",
    linkLabel: "Website-Lösung für onOffice ansehen",
  },
  {
    nr: "02",
    name: "FLOWFACT",
    satz1:
      "Eine der am längsten etablierten Maklersoftware-Marken in Deutschland, verbreitet vor allem bei größeren Büros und Maklernetzwerken.",
    satz2:
      "Deckt Objekt-, Kontakt- und Vorgangsverwaltung ab, mit Fokus auf Prozesssteuerung im Tagesgeschäft.",
    andock:
      "Wir bauen den Auftritt drumherum: Exposés und Formulare, die direkt in Ihre FLOWFACT-Vorgänge einlaufen.",
    linkLabel: "",
  },
  {
    nr: "03",
    name: "Propstack",
    satz1:
      "Eine jüngere, cloudbasierte Maklersoftware, die zunehmend Verbreitung findet, auch bei technikaffinen Büros und im gewerblichen Segment.",
    satz2: "Bekannt für ein modernes Bedienkonzept und eine offene Schnittstellenphilosophie.",
    andock:
      "Wir nutzen genau diese Offenheit: Website-Leads und Exposé-Anfragen fließen strukturiert in Ihr Propstack.",
    linkLabel: "",
  },
  {
    nr: "04",
    name: "JUSTIMMO",
    satz1:
      "Eine cloudbasierte Maklersoftware mit Ursprung in Österreich, zunehmend auch im deutschen Markt vertreten.",
    satz2: "Deckt CRM, Objektverwaltung und Portalanbindung in einem System ab.",
    andock:
      "Wir binden Rechner und Anfrageformulare so an, dass jeder Lead mit Score direkt in Ihrem JUSTIMMO landet.",
    linkLabel: "",
  },
  {
    nr: "05",
    name: "CasaOne",
    satz1:
      "Eine Maklersoftware für Objektverwaltung, Kontaktmanagement und CRM-Prozesse im deutschsprachigen Maklermarkt.",
    satz2:
      "Wie bei den anderen Systemen zeigt der Standard-Auftritt selten das volle Potenzial der Anbindung nach außen.",
    andock:
      "Wir sorgen dafür, dass Ihre Website genauso direkt an CasaOne andockt, wie sich die Software selbst bedienen lässt.",
    linkLabel: "",
  },
], { nr: "Nummer", name: "Name", satz1: "Satz 1", satz2: "Satz 2", andock: "Andock-Satz", linkLabel: "Link-Beschriftung (nur System 1, leer = kein Link)" });

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Maklersoftware im Vergleich: onOffice, FLOWFACT, Propstack & Co. | beuwy",
  [`${S}meta.beschreibung`]:
    "Maklersoftware Vergleich 2026: onOffice, FLOWFACT, Propstack, JUSTIMMO, CasaOne. Jede kann mehr, als ihr Standard-Auftritt zeigt. Der Überblick, und wie beuwy dort andockt, wo Ihr CRM aufhört.",

  [`${S}hero.eyebrow`]: "CRM-Vergleich",
  [`${S}hero.titel`]: "Maklersoftware im Vergleich: *jede* kann mehr, als sie zeigt.",
  [`${S}hero.sub`]:
    "Welches CRM zu Ihrem Haus passt, entscheiden Sie, nicht wir. Was wir sehen: Bei jeder dieser Plattformen bleibt der Standard-Auftritt weit hinter dem zurück, was das System eigentlich könnte.",
  [`${S}hero.cta2`]: "Zu den Systemen ↓",

  [`${S}position.eyebrow`]: "Unsere Position",
  [`${S}position.titel`]: "Das *beste* CRM gibt es nicht, nur das beste für Ihr Haus.",
  [`${S}position.text`]:
    "onOffice, FLOWFACT, Propstack, JUSTIMMO, CasaOne: alle fünf haben sich am deutschsprachigen Maklermarkt etabliert, jedes mit eigenem Schwerpunkt. Diese Seite bewertet nicht, welches System „gewinnt“. Sie zeigt, wo bei jedem System ungenutztes Potenzial liegt: zwischen dem, was die Software kann, und dem, was ihr Standard-Auftritt zeigt.",

  [`${S}systeme.eyebrow`]: "Die Systeme",
  [`${S}systeme.titel`]: "Fünf CRMs. Fünf ungenutzte *Andockstellen*.",
  ...systeme.defaults,

  [`${S}motor.eyebrow`]: "Warum beides zählt",
  [`${S}motor.titel`]: "Das CRM ist der *Motor*. Der Auftritt ist das Schaufenster.",
  [`${S}motor.text`]:
    "Ein starkes CRM organisiert, was im Hintergrund passiert. Ob ein Eigentümer anruft, entscheidet sich am Schaufenster davor: an der Website, die zeigt, was im Motor steckt. Wir bauen das Schaufenster und die Leitung dazwischen: Jede Anfrage kommt mit Quelle und nächstem Schritt direkt in Ihrem System an, unabhängig davon, welches der fünf Systeme oben Sie einsetzen.",

  [`${S}abschluss.karte_label`]: "Unabhängig vom System",
  [`${S}abschluss.karte_titel`]: "Ihr CRM bleibt, wie es ist. Ihr Auftritt wird, was er sein sollte.",
  [`${S}abschluss.karte_text`]:
    "Wir bauen keine neue Software. Wir bauen seit 17 Jahren das Portal, das Ihr bestehendes System endlich ausnutzt.",
  [`${S}abschluss.schluss_titel`]: "Nennen Sie uns Ihr System, wir zeigen Ihnen, was ungenutzt bleibt.",
  [`${S}abschluss.schluss_text`]:
    "Im ersten Gespräch schauen wir uns Ihre CRM-Anbindung und Ihren Auftritt gemeinsam an.",
  [`${S}abschluss.footnote`]:
    "onOffice, FLOWFACT, Propstack, JUSTIMMO und CasaOne sind Marken der jeweiligen Anbieter. beuwy ist unabhängiger Dienstleister ohne Gesellschafterbindung an diese Anbieter.",
  [`${S}abschluss.link_onoffice`]: "onOffice-Websites",
  [`${S}abschluss.link_bottimmo`]: "BOTTIMMO-Alternative",
  [`${S}abschluss.link_kosten`]: "Was kostet eine Maklerwebsite?",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",

  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel (*Wort* = Hervorhebung)",
  [`${S}hero.sub`]: "Hero · Subline",
  [`${S}hero.cta2`]: "Hero · Sekundär-Link (Anker Systeme)",

  [`${S}position.eyebrow`]: "Position · Eyebrow",
  [`${S}position.titel`]: "Position · Titel (*Wort* = Hervorhebung)",
  [`${S}position.text`]: "Position · Text",

  [`${S}systeme.eyebrow`]: "Systeme · Eyebrow",
  [`${S}systeme.titel`]: "Systeme · Titel (*Wort* = Hervorhebung)",

  [`${S}motor.eyebrow`]: "Motor/Schaufenster · Eyebrow",
  [`${S}motor.titel`]: "Motor/Schaufenster · Titel (*Wort* = Hervorhebung)",
  [`${S}motor.text`]: "Motor/Schaufenster · Text",

  [`${S}abschluss.karte_label`]: "Abschluss · Gelbe Karte · Label",
  [`${S}abschluss.karte_titel`]: "Abschluss · Gelbe Karte · Titel",
  [`${S}abschluss.karte_text`]: "Abschluss · Gelbe Karte · Text",
  [`${S}abschluss.schluss_titel`]: "Abschluss · Schluss-Titel",
  [`${S}abschluss.schluss_text`]: "Abschluss · Schluss-Text",
  [`${S}abschluss.footnote`]: "Abschluss · Fußnote",
  [`${S}abschluss.link_onoffice`]: "Abschluss · Quervernetzung · Link 1",
  [`${S}abschluss.link_bottimmo`]: "Abschluss · Quervernetzung · Link 2",
  [`${S}abschluss.link_kosten`]: "Abschluss · Quervernetzung · Link 3",

  ...systeme.labels,
};
