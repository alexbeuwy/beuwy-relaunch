import { listeRegistrieren } from "../lesen";

/** Studio-Texte /immobilienmarketing-agentur — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "immobilienmarketing-agentur",
  titel: "Immobilienmarketing-Agentur",
  route: "/immobilienmarketing-agentur",
};
const S = "s.immobilienmarketing-agentur.";

const rails = listeRegistrieren(
  "immobilienmarketing-agentur",
  "rails",
  "Vergleichs-Zeile",
  [
    {
      thema: "Start der Zusammenarbeit",
      linksLabel: "Briefing",
      linksText:
        "Sie beschreiben, was entstehen soll: Farben, Wording, ein neues Logo. Die Agentur setzt um, was im Briefing steht.",
      rechtsLabel: "Analyse",
      rechtsText:
        "Wir schauen zuerst auf Zahlen: wo Anfragen heute liegen bleiben, welches CRM läuft, was ein System bringen müsste, damit es sich rechnet.",
    },
    {
      thema: "Abrechnung",
      linksLabel: "Nach Aufwand",
      linksText:
        "Stunden, Projekttage oder ein Paketpreis für Design und Kampagne. Bezahlt wird die Arbeit, unabhängig vom Effekt danach.",
      rechtsLabel: "Nach Diagnose",
      rechtsText:
        "Der Festpreis steht nach der Analyse fest, schriftlich, ausgerichtet an dem, was das System an Mandaten bringen soll.",
    },
    {
      thema: "Ergebnis",
      linksLabel: "Ein Auftritt",
      linksText:
        "Website, Anzeige oder Broschüre: fertige Bausteine, die Sie danach selbst bespielen oder weiter beauftragen.",
      rechtsLabel: "Ein System",
      rechtsText:
        "Portal, Funnel und Automatisierung greifen ineinander und arbeiten weiter, auch wenn gerade niemand am Schreibtisch sitzt.",
    },
    {
      thema: "Betreuung",
      linksLabel: "Wechselndes Team",
      linksText:
        "Account Manager, Grafiker, Texter: Je nach Auslastung der Agentur wechseln die Gesichter, Ihre Anfrage läuft über mehrere Postfächer.",
      rechtsLabel: "Ein Ansprechpartner",
      rechtsText:
        "Eine feste Kontaktperson, jede Anfrage nachvollziehbar im Ticketsystem. Sie fragen nicht zwei Wochen später, wie weit Ihre Anpassung ist.",
    },
  ],
  { thema: "Thema", linksLabel: "Label links", linksText: "Text links", rechtsLabel: "Label rechts", rechtsText: "Text rechts" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Immobilienmarketing Agentur gesucht? Warum führende Makler anders wählen | beuwy",
  [`${S}meta.beschreibung`]:
    "Was eine Immobilienmarketing-Agentur leistet, was sie realistisch kostet und wann eine Unternehmensberatung wie beuwy die passendere Wahl ist: der faire Vergleich, Analyse zuerst statt Kampagne zuerst.",
  [`${S}meta.og_titel`]: "Immobilienmarketing Agentur gesucht? Warum führende Makler anders wählen",
  [`${S}meta.og_beschreibung`]:
    "Der faire Vergleich: was eine Immobilienmarketing-Agentur leistet und kostet, und wofür Immobilienunternehmen inzwischen eine Unternehmensberatung beauftragen.",
  [`${S}hero.zurueck`]: "Zur Immobilienmarketing-Übersicht",
  [`${S}hero.eyebrow`]: "Vergleich · Immobilienmarketing Agentur",
  [`${S}hero.titel`]: "Immobilienmarketing Agentur gesucht? Führende Makler wählen *anders*.",
  [`${S}hero.intro`]:
    "Eine Immobilienmarketing-Agentur liefert Kampagnen und ein neues Design. Wer schon zu den führenden Häusern seiner Stadt zählt, will mehr: eine Analyse zuerst, danach ein System, das Anfragen von selbst in Mandate verwandelt.",
  [`${S}hero.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}hero.scroll_link`]: "Was eine Agentur wirklich leistet ↓",
  [`${S}einordnung.eyebrow`]: "Einordnung",
  [`${S}einordnung.titel`]: "Was eine Immobilienmarketing-Agentur *leistet*, und was sie kostet.",
  [`${S}einordnung.p1_vor`]:
    "Eine Immobilienmarketing-Agentur plant, gestaltet und betreut Kampagnen für Immobilienmakler: Anzeigen, Website, Broschüren, gelegentlich auch die Betreuung der Social-Media-Kanäle. Abgerechnet wird nach Projekt oder nach Aufwand, üblich sind zwischen 2.000 Euro für ein Template-Projekt und 25.000 Euro für eine individuelle Konzeption, so die realistischen Marktspannen auf unserer Seite",
  [`${S}einordnung.p1_link`]: "Was kostet eine Maklerwebsite",
  [`${S}einordnung.p1_nach`]:
    ". Am Ende der Zusammenarbeit steht ein Auftritt: eine Website, eine Anzeigenserie, ein neues Logo.",
  [`${S}einordnung.p2_vor`]:
    "beuwy setzt vor dem Design an. Bevor ein Entwurf entsteht, steht die Analyse: wo Anfragen heute liegen bleiben, welches CRM im Hintergrund läuft und wie viele Mandate ein neues System pro Jahr bräuchte, damit es sich rechnet. Aus dieser Analyse entsteht kein einzelner Auftritt, sondern",
  [`${S}einordnung.p2_highlight`]: "ein System aus Portal, Funnel und Automatisierung",
  [`${S}einordnung.p2_nach`]:
    ". Das Ergebnis sind keine schönen Bilder, sondern messbare Mandate und Deals, betreut von einem Ansprechpartner, dessen Arbeit im Ticketsystem nachvollziehbar bleibt.",
  [`${S}unterschied.eyebrow`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Agentur-Modell. Oder *Beratungs-Modell*.",
  ...rails.defaults,
  [`${S}ehrlich.eyebrow`]: "Ehrlich gesagt",
  [`${S}ehrlich.titel`]: "Nicht jede Aufgabe braucht eine *Unternehmensberatung*.",
  [`${S}ehrlich.agentur_titel`]: "Für wen eine Agentur die richtige Wahl bleibt",
  [`${S}ehrlich.agentur_text`]:
    "Für eine einzelne Kampagne, ein neues Logo oder reines Design ohne Anbindung an CRM oder Automatisierung. Wenn die Aufgabe klar umrissen ist und danach niemand ein System pflegen muss, ist eine Agentur oft schneller und günstiger. Eine vernünftige Entscheidung, keine Notlösung.",
  [`${S}ehrlich.beuwy_titel`]: "Für wen beuwy richtig ist",
  [`${S}ehrlich.beuwy_text`]:
    "Für Makler, Projektentwickler, Bauträger und Vertriebsteams, die ihren Vorsprung ausbauen wollen: mehr Mandate, mehr Deals, weniger liegen gebliebene Anfragen. Hier zahlt sich Analyse vor Design aus, weil ein System mehr trägt als ein einzelner Auftritt.",
  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Agentur oder Beratung: Was Sie *vorher* wissen sollten.",
  [`${S}faq.1.frage`]: "Ist beuwy eine Agentur?",
  [`${S}faq.1.antwort`]:
    "Nein. beuwy ist eine Unternehmensberatung für Immobilienunternehmen. Statt direkt mit Design zu starten, beginnen wir mit einer Analyse Ihres Anfragevolumens und Ihres CRM und bauen danach ein System aus Portal, Funnel und Automatisierung, mit einem festen Ansprechpartner, dessen Arbeit im Ticketsystem nachvollziehbar bleibt.",
  [`${S}faq.2.frage`]: "Wann reicht eine klassische Immobilienmarketing-Agentur?",
  [`${S}faq.2.antwort`]:
    "Für eine einzelne Kampagne, ein neues Logo oder reines Design ohne CRM-Anbindung ist eine Agentur oft die schnellere und günstigere Wahl. Erst wenn ein System entstehen soll, das Anfragen automatisch verarbeitet und Mandate nachweisbar macht, lohnt sich der Wechsel zu einer Beratung wie beuwy.",
  [`${S}faq.3.frage`]: "Was kostet eine Immobilienmarketing-Agentur im Vergleich zu beuwy?",
  [`${S}faq.3.antwort_vor`]:
    "Klassische Agenturen liegen je nach Umfang zwischen 2.000 und 25.000 Euro pro Projekt, die realistischen Marktspannen dazu stehen auf unserer Seite",
  [`${S}faq.3.antwort_link`]: "Was kostet eine Maklerwebsite",
  [`${S}faq.3.antwort_nach`]:
    ". Der Preis für ein beuwy-System steht erst nach der Analyse fest, weil er von CRM-Anbindung, Objektzahl und Automatisierungsgrad abhängt, und wird schriftlich genannt, bevor ein Projekt startet.",
  [`${S}abschluss.karte_label`]: "Für Ihr Haus",
  [`${S}abschluss.karte_titel`]: "Eine Agentur liefert einen Auftritt. Wir liefern ein System, das Mandate bringt.",
  [`${S}abschluss.karte_text`]:
    "Kampagnen und Design sind das Handwerk einer Agentur. Wir fangen bei der Analyse an und bauen danach ein System aus Portal, Funnel und Automatisierung, mit einem Ansprechpartner, der jede Anfrage im Ticketsystem nachweisbar bearbeitet.",
  [`${S}abschluss.schluss_titel`]: "Sprechen wir über Ihr System, nicht über ein Briefing.",
  [`${S}abschluss.schluss_text`]:
    "Im ersten Gespräch schauen wir auf Ihr Anfragevolumen und Ihr CRM und sagen Ihnen ehrlich, ob eine Beratung wie beuwy der richtige nächste Schritt ist oder eine klassische Agentur für Ihre Aufgabe reicht.",
  [`${S}abschluss.link1`]: "Was kostet eine Maklerwebsite?",
  [`${S}abschluss.link2`]: "Website für Makler",
  [`${S}abschluss.link3`]: "Zur Immobilienmarketing-Übersicht",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · Open-Graph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",
  [`${S}hero.zurueck`]: "Hero · Zurück-Link (Text nach dem Pfeil)",
  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel (ein *Wort* = Highlighter)",
  [`${S}hero.intro`]: "Hero · Intro-Absatz",
  [`${S}hero.cta_label`]: "Hero · Button-Text",
  [`${S}hero.scroll_link`]: "Hero · Scroll-Link (inkl. Pfeil)",
  [`${S}einordnung.eyebrow`]: "Einordnung · Eyebrow",
  [`${S}einordnung.titel`]: "Einordnung · Titel (ein *Wort* = Highlighter)",
  [`${S}einordnung.p1_vor`]: "Einordnung · Absatz 1 · Teil vor dem Link",
  [`${S}einordnung.p1_link`]: "Einordnung · Absatz 1 · Link-Text",
  [`${S}einordnung.p1_nach`]: "Einordnung · Absatz 1 · Teil nach dem Link",
  [`${S}einordnung.p2_vor`]: "Einordnung · Absatz 2 · Teil vor der Markierung",
  [`${S}einordnung.p2_highlight`]: "Einordnung · Absatz 2 · markierter Teil",
  [`${S}einordnung.p2_nach`]: "Einordnung · Absatz 2 · Teil nach der Markierung",
  [`${S}unterschied.eyebrow`]: "Gegenüberstellung · Eyebrow",
  [`${S}unterschied.titel`]: "Gegenüberstellung · Titel (ein *Wort* = Highlighter)",
  ...rails.labels,
  [`${S}ehrlich.eyebrow`]: "Ehrlich gesagt · Eyebrow",
  [`${S}ehrlich.titel`]: "Ehrlich gesagt · Titel (ein *Wort* = Highlighter)",
  [`${S}ehrlich.agentur_titel`]: "Ehrlich gesagt · Spalte Agentur · Titel",
  [`${S}ehrlich.agentur_text`]: "Ehrlich gesagt · Spalte Agentur · Text",
  [`${S}ehrlich.beuwy_titel`]: "Ehrlich gesagt · Spalte beuwy · Titel",
  [`${S}ehrlich.beuwy_text`]: "Ehrlich gesagt · Spalte beuwy · Text",
  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  [`${S}faq.1.frage`]: "FAQ 1 · Frage",
  [`${S}faq.1.antwort`]: "FAQ 1 · Antwort",
  [`${S}faq.2.frage`]: "FAQ 2 · Frage",
  [`${S}faq.2.antwort`]: "FAQ 2 · Antwort",
  [`${S}faq.3.frage`]: "FAQ 3 · Frage",
  [`${S}faq.3.antwort_vor`]: "FAQ 3 · Antwort · Teil vor dem Link",
  [`${S}faq.3.antwort_link`]: "FAQ 3 · Antwort · Link-Text",
  [`${S}faq.3.antwort_nach`]: "FAQ 3 · Antwort · Teil nach dem Link",
  [`${S}abschluss.karte_label`]: "Abschluss-Karte · Vorspann",
  [`${S}abschluss.karte_titel`]: "Abschluss-Karte · Titel",
  [`${S}abschluss.karte_text`]: "Abschluss-Karte · Text",
  [`${S}abschluss.schluss_titel`]: "Abschluss · Titel neben der Karte",
  [`${S}abschluss.schluss_text`]: "Abschluss · Text neben der Karte",
  [`${S}abschluss.link1`]: "Abschluss · Weitere-Links · 1 (Maklerwebsite-Kosten)",
  [`${S}abschluss.link2`]: "Abschluss · Weitere-Links · 2 (Website für Makler)",
  [`${S}abschluss.link3`]: "Abschluss · Weitere-Links · 3 (Immobilienmarketing-Übersicht)",
};
