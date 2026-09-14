import { listeRegistrieren } from "../lesen";

/** Studio-Texte /email-marketing-immobilienmakler — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "email-marketing-immobilienmakler",
  titel: "E-Mail-Marketing für Immobilienmakler",
  route: "/email-marketing-immobilienmakler",
};
const S = "s.email-marketing-immobilienmakler.";

const pains = listeRegistrieren(
  "email-marketing-immobilienmakler",
  "pains",
  "Einwand",
  [
    {
      quote: "Der Newsletter geht am Monatsanfang raus. Die Öffnungsrate sagt, dass ihn kaum einer liest.",
      answer:
        "Ein Verteiler, der jeden Monat dieselbe Nachricht an alle schickt, wird irgendwann übersehen, noch bevor er geöffnet wird. Die Adresse bleibt im System, das Vertrauen nicht.",
    },
    {
      quote: "Hunderte Kontakte liegen im CRM, während die nächste Anzeigenkampagne wieder neue Leads einkauft.",
      answer:
        "Bestandskontakte kosten nichts mehr, sobald sie einmal da sind. Wer sie liegen lässt und stattdessen für jeden neuen Kontakt zahlt, verbrennt Budget für etwas, das im eigenen System schon wartet.",
    },
    {
      quote: "Der Eigentümer, der vor vier Monaten sagte, er verkauft vielleicht nächstes Jahr, hat gerade beim Wettbewerber unterschrieben.",
      answer:
        "Ohne eine Regel, die genau diesen Moment nachhält, verschwindet die Notiz in einer Liste, die niemand mehr öffnet. Der Wettbewerber ruft an, wenn Sie längst weitergezogen sind.",
    },
    {
      quote: "Jede Mail riecht nach Massen-Mail, noch bevor der Eigentümer sie öffnet.",
      answer:
        "„Sehr geehrte Damen und Herren“ und ein Betreff wie ein Werbeprospekt verraten den Verteiler auf den ersten Blick. Was wie an alle gerichtet wirkt, landet im Kopf auch wie an niemanden, und im Zweifel im Papierkorb.",
    },
  ],
  { quote: "Zitat", answer: "Antwort" },
);

const schritte = listeRegistrieren(
  "email-marketing-immobilienmakler",
  "schritte",
  "Schritt",
  [
    {
      titel: "Follow-up, das niemand vergisst",
      text: "Wer heute nicht verkauft, bekommt in sechs Monaten automatisch die richtige E-Mail. Die Regel merkt sich den Kontakt, nicht Ihr Kopf.",
    },
    {
      titel: "Personalisierte Datenmails statt Massen-Newsletter",
      text: "Jede Mail bezieht sich auf ein konkretes Objekt, einen Rechner-Wert oder eine Preisänderung. Kein Verteiler, der an tausend gleiche Adressen geht.",
    },
    {
      titel: "Terminanfragen sortieren sich selbst",
      text: "Nach Dringlichkeit und Objektwert: Der heiße Verkäufer-Lead landet oben in Ihrer Liste, die reine Info-Anfrage weiter unten.",
    },
    {
      titel: "Jede Mail zahlt aufs Portal ein",
      text: "Registrierung, Rechner, Termin: Jede Nachricht führt zurück ins System. Der Wochenbericht zeigt, was ankommt, statt dass Sie raten müssen.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const faq = listeRegistrieren(
  "email-marketing-immobilienmakler",
  "faq",
  "FAQ",
  [
    {
      q: "Woher kommen die Kontakte für die E-Mails?",
      a: "Aus Ihrem eigenen System: Eigentümer, die den Bewertungsrechner genutzt haben, Interessenten, die sich fürs Portal registriert haben, und Bestandskontakte aus Ihrem CRM. Wir verschicken nicht an gekaufte Adresslisten.",
    },
    {
      q: "Ist das DSGVO-konform machbar?",
      a: "Ja, mit sauberer Einwilligung: Double-Opt-in bei neuen Kontakten, ein klarer Abmeldelink in jeder Mail, dokumentierte Zustimmung im System. Wir bauen den Prozess technisch sauber auf, für die rechtliche Bewertung im Einzelfall empfehlen wir trotzdem die Rücksprache mit Ihrem Datenschutzbeauftragten oder Anwalt.",
    },
    {
      q: "Wie persönlich sind automatische Mails wirklich?",
      a: "Persönlicher als die meisten von Hand getippten Rundmails. Jede Mail zieht Name, Objekt und den letzten Schritt des Kontakts, kein „Sehr geehrte Damen und Herren“, sondern ein Satz, der zu dem passt, was diese Person gerade tatsächlich getan hat.",
    },
    {
      q: "Wie viele Mails sind zu viele?",
      a: "Weniger, als Sie denken, wenn jede Mail einen Grund hat. Die Regel richtet sich nach dem Schritt des Kontakts, nicht nach einem Kalender. Wer sich abmeldet, bekommt keine weitere Mail, das Portal merkt sich das.",
    },
    {
      q: "Funktioniert das mit onOffice oder meinem CRM?",
      a: "Ja. Die Automation dockt an onOffice, FLOWFACT, Propstack, JUSTIMMO oder CasaOne an. Jede Mail wird im System dokumentiert, mit Quelle und nächstem Schritt, kein Zettel, kein Copy-Paste.",
    },
  ],
  { q: "Frage", a: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "E-Mail-Marketing für Immobilienmakler: Das Postfach verkauft mit | beuwy",
  [`${S}meta.beschreibung`]:
    "beuwy baut Immobilienmaklern automatisiertes E-Mail-Marketing: Follow-up, der nichts vergisst, personalisierte Datenmails zum Objekt statt Massen-Newsletter, Terminanfragen nach Dringlichkeit sortiert.",
  [`${S}meta.og_titel`]: "E-Mail-Marketing für Immobilienmakler: Das Postfach verkauft mit | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Automatisiertes E-Mail-Marketing statt Massen-Newsletter: Follow-up, der nichts vergisst, personalisierte Datenmails zum Objekt, Terminanfragen nach Dringlichkeit sortiert, ein Wochenbericht statt Bauchgefühl.",

  [`${S}hero.karte_label`]: "Beweis, keine Behauptung",
  [`${S}hero.eyebrow`]: "E-Mail-Marketing für Immobilienmakler",
  [`${S}hero.titel`]: "E-Mail-Marketing für Immobilienmakler, das *verkauft*, nicht nur verschickt.",
  [`${S}hero.text_vor`]:
    "E-Mail-Marketing für Makler heißt: Jeder Kontakt bekommt automatisiert und personalisiert die Mail, die zu seinem Moment passt —",
  [`${S}hero.text_hervor`]: "vom ersten Rechner-Ergebnis bis zur Erinnerung sechs Monate später",
  [`${S}hero.text_nach`]: ", ohne dass jemand von Hand nachfasst.",
  [`${S}hero.cta`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_note`]: "Antwort innerhalb von 24 Stunden",

  [`${S}problem.eyebrow`]: "Ihr Postfach arbeitet nicht für Sie",
  [`${S}problem.titel`]: "Hunderte Kontakte warten. Ihr Postfach bleibt *stumm*.",
  ...pains.defaults,

  [`${S}system.eyebrow`]: "Der Mechanismus",
  [`${S}system.titel`]: "Vier Stufen. Ein Postfach, das *mitverkauft*.",
  [`${S}system.sub`]:
    "beuwy arbeitet als Unternehmensberatung für Ihr Vertriebssystem, nicht als Agentur, die einzelne Kampagnen verschickt. E-Mail-Marketing ist Teil Ihres Portals, mit einem festen Ansprechpartner.",
  ...schritte.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Ein Newsletter ist kein System. Ihr Postfach schon.",
  [`${S}unterschied.text`]:
    "Standardanbieter verschicken einmal im Monat dieselbe Nachricht an alle und hoffen auf eine Öffnung. Wir bauen Ihrem Postfach ein System: automatisiert, personalisiert, verbunden mit Portal und Rechner — ein Baustein der regionalen Dominanz, die Eigentümer an Sie erinnert, lange bevor sie verkaufen wollen.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.titel`]:
    "Sechs Wochen nach dem Relaunch: neun Abschlüsse, 342.000 € Volumen, ohne einen einzigen gekauften Lead.",
  [`${S}beweis.text`]:
    "Ein Teil davon lief automatisch: Die Rückrufregel schickt jedem Eigentümer, der heute nicht verkauft, in sechs Monaten von selbst die passende E-Mail.",
  [`${S}beweis.link`]: "Weitere Fallstudien ansehen →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Versand wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihr *Postfach-System*.",
  [`${S}finale.text_vor`]:
    "E-Mail-Marketing ist ein Baustein unter mehreren. Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_mitte`]: ", Referenzen in den",
  [`${S}finale.link_cases`]: "Fallstudien",
  [`${S}finale.text_nach`]: ".",
  [`${S}finale.cta`]: "Zusammenarbeit anfragen",
  [`${S}finale.cta_note`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · Open-Graph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",

  [`${S}hero.karte_label`]: "Hero · Floating-Karte · Label",
  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel (ein *Wort* = Highlighter)",
  [`${S}hero.text_vor`]: "Hero · Textabsatz, Teil vor dem Highlight",
  [`${S}hero.text_hervor`]: "Hero · Hervorgehobener Satz",
  [`${S}hero.text_nach`]: "Hero · Textabsatz, Teil nach dem Highlight",
  [`${S}hero.cta`]: "Hero · Button-Text",
  [`${S}hero.cta_note`]: "Hero · Hinweis neben dem Button",

  [`${S}problem.eyebrow`]: "Problem · Eyebrow",
  [`${S}problem.titel`]: "Problem · Titel (ein *Wort* = Highlighter)",
  ...pains.labels,

  [`${S}system.eyebrow`]: "Mechanismus · Eyebrow",
  [`${S}system.titel`]: "Mechanismus · Titel (ein *Wort* = Highlighter)",
  [`${S}system.sub`]: "Mechanismus · Subline",
  ...schritte.labels,

  [`${S}unterschied.label`]: "Der Unterschied · Karten-Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Karten-Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Karten-Text",

  [`${S}beweis.label`]: "Beweis-Anriss · Label",
  [`${S}beweis.titel`]: "Beweis-Anriss · Titel",
  [`${S}beweis.text`]: "Beweis-Anriss · Text",
  [`${S}beweis.link`]: "Beweis-Anriss · Link-Text (zu allen Fallstudien)",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,

  [`${S}finale.label`]: "Finale · Eyebrow",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.text_vor`]: "Finale · Text, Teil vor Link 1 (Immobilienmarketing-Hub)",
  [`${S}finale.link_hub`]: "Finale · Link-Text 1 (Immobilienmarketing-Hub)",
  [`${S}finale.text_mitte`]: "Finale · Text, Teil zwischen Link 1 und Link 2",
  [`${S}finale.link_cases`]: "Finale · Link-Text 2 (Fallstudien)",
  [`${S}finale.text_nach`]: "Finale · Text, Teil nach Link 2",
  [`${S}finale.cta`]: "Finale · Button-Text",
  [`${S}finale.cta_note`]: "Finale · Hinweis unter dem Button",
};
