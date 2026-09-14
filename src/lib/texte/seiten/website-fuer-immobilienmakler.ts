import { listeRegistrieren } from "../lesen";

/** Studio-Texte /website-fuer-immobilienmakler — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "website-fuer-immobilienmakler",
  titel: "Website für Immobilienmakler",
  route: "/website-fuer-immobilienmakler",
};
const S = "s.website-fuer-immobilienmakler.";

const bausteine = listeRegistrieren(
  "website-fuer-immobilienmakler",
  "bausteine",
  "Baustein",
  [
    {
      label: "Immobilienbewertungs-Rechner",
      satz: "Der Rechner qualifiziert Eigentümer, während Sie besichtigen: Adresse rein, Ersteinschätzung raus — und der Verkäufer-Lead liegt mit Score im CRM, nicht im Postfach.",
    },
    {
      label: "onOffice- / CRM-Anbindung",
      satz: "Jede Anfrage landet mit Quelle und nächstem Schritt direkt in Ihrem System. Keine Zettel, kein Copy-Paste, kein vergessener Rückruf.",
    },
    {
      label: "Tempo & Ladezeit",
      satz: "Eigentümer vergleichen drei Makler in fünf Minuten. Die Seite, die sofort lädt, wirkt wie das Büro, das sofort zurückruft.",
    },
    {
      label: "Objekt-Präsentation",
      satz: "Exposés, die aussehen wie das Objekt es verdient — und Alleinaufträge rechtfertigen, bevor Sie im Wohnzimmer sitzen.",
    },
    {
      label: "Follow-up-Automation",
      satz: "Wer heute nicht verkauft, bekommt in 6 Monaten die richtige Mail. Automatisch.",
    },
    {
      label: "Lokale Sichtbarkeit",
      satz: "Wenn „Makler + Stadtteil“ gegoogelt wird, steht Ihr Name über dem Portal.",
    },
  ],
  { label: "Label", satz: "Satz" },
);

const prozess = listeRegistrieren(
  "website-fuer-immobilienmakler",
  "prozess",
  "Prozess-Schritt",
  [
    {
      titel: "Aufnahme & Struktur",
      text: "Wir sichten Ihre Objekte, Ihr CRM und Ihre Marke. Daraus entsteht die Informationsarchitektur, nicht ein Standard-Menü von der Stange.",
    },
    {
      titel: "Design & Text",
      text: "Jede Seite entsteht als Entwurf mit echten Texten, nicht mit Platzhaltern. Sie sehen, wie es wird, bevor programmiert wird.",
    },
    {
      titel: "Technik & Anbindung",
      text: "Bewertungsrechner, CRM-Schnittstelle und Formulare gehen live und werden gegen Ihre echten Daten getestet.",
    },
    {
      titel: "Test & Go-Live",
      text: "Ladezeit, mobile Darstellung und Weiterleitungen der alten Seite werden geprüft. Dann schalten wir um, ohne dass eine Anfrage verloren geht.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const spiegelPains = listeRegistrieren(
  "website-fuer-immobilienmakler",
  "spiegelPains",
  "Spiegel-Frage",
  [
    {
      quote: "Lädt Ihre Seite so schnell, wie Sie ans Telefon gehen?",
      answer:
        "Fünf Sekunden Ladezeit, und der zweite Tab ist schon offen. Sie verlieren den Vergleich, bevor der Eigentümer eine Zeile gelesen hat.",
    },
    {
      quote: "Sieht Ihr Exposé aus wie das Objekt es verdient?",
      answer:
        "Ein Grundriss als PDF-Anhang und drei Handyfotos wirken wie ein Nebenjob. Der Eigentümer merkt sich das Objekt, nicht den Makler dahinter.",
    },
    {
      quote: "Erkennt ein Fremder in zehn Sekunden, warum er Ihnen sein Haus anvertraut?",
      answer:
        "Ohne Zahlen, Referenzen und ein klares Gesicht bleibt nur ein Name auf einer Visitenkarte. Vertrauen entsteht vor dem ersten Anruf, oder gar nicht.",
    },
  ],
  { quote: "Frage", answer: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Website für Immobilienmakler: Premium statt Baukasten | beuwy",
  [`${S}meta.beschreibung`]:
    "beuwy baut Websites für Immobilienmakler, die Alleinaufträge rechtfertigen: Bewertungsrechner, CRM-Anbindung, Tempo und Objekt-Präsentation, live in vier Wochen.",
  [`${S}meta.og_beschreibung`]:
    "Bewertungsrechner, CRM-Anbindung, Tempo und Objekt-Präsentation, die Alleinaufträge rechtfertigen. Live in vier Wochen, keine Vorlage.",
  [`${S}hero.zurueck`]: "Immobilienmarketing für Makler",
  [`${S}hero.eyebrow`]: "Kernleistung · Website für Immobilienmakler",
  [`${S}hero.titel`]: "Die Website für Immobilienmakler, die *Alleinaufträge* rechtfertigt.",
  [`${S}hero.intro_vor`]:
    "Eigentümer vergleichen drei Makler-Websites in fünf Minuten, bevor sie zum Telefon greifen. Wer dabei",
  [`${S}hero.intro_highlight`]: "teurer und schneller wirkt",
  [`${S}hero.intro_nach`]: ", bekommt öfter den Alleinauftrag. Nicht, wer die bessere Arbeit macht.",
  [`${S}hero.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",
  [`${S}spiegel.eyebrow`]: "Der Vergleich, den Eigentümer wirklich machen",
  [`${S}spiegel.titel`]: "Eigentümer vergleichen drei Makler in *fünf Minuten*.",
  [`${S}spiegel.sub`]:
    "Was Ihre heutige Seite in dieser Zeit über Sie verrät, entscheiden Sie nicht mehr selbst — Tempo, Exposés und Vertrauen sprechen ohne Sie.",
  ...spiegelPains.defaults,
  [`${S}bausteine.eyebrow`]: "Leistungsumfang",
  [`${S}bausteine.titel`]: "Was Ihr *Portal* für Sie erledigt.",
  [`${S}bausteine.sub`]:
    "Sechs Bausteine, jeder einzeln erklärt. Zusammen bringen sie Mandate, die ein Baukasten nicht kopieren kann.",
  ...bausteine.defaults,
  [`${S}integration.stempel`]: "INTEGRIERT · GEPRÜFT · VERNETZT",
  [`${S}integration.eyebrow`]: "Anbindung",
  [`${S}integration.titel`]: "Nahtlos mit den Tools, die Sie *schon nutzen*.",
  [`${S}integration.text`]:
    "Ihre Website docken wir direkt an onOffice, FLOWFACT, Propstack, JUSTIMMO oder CasaOne an, unabhängig davon, welches System Sie heute nutzen. Bewertungsrechner, Kontaktformulare und Exposé-Anfragen landen dort, wo Ihr Team ohnehin arbeitet, nicht in einem zusätzlichen Postfach.",
  [`${S}integration.link`]: "Speziell zur Anbindung an onOffice",
  [`${S}prozess.eyebrow`]: "Ablauf",
  [`${S}prozess.titel`]: "In vier Wochen live, nicht in vier *Monaten*.",
  ...prozess.defaults,
  [`${S}prozess.fussnote`]:
    "Ein Ansprechpartner, jede Anfrage nachweisbar im Ticketsystem. Sie sehen den Stand Ihres Projekts, ohne nach zwei Wochen selbst nachzufragen.",
  [`${S}abgrenzung.label`]: "Abgrenzung",
  [`${S}abgrenzung.titel`]: "Ein Baukasten verkauft Vorlagen. Wir bauen Portale, die Mandate bringen.",
  [`${S}abgrenzung.p1`]:
    "Baukästen verkaufen dieselbe Vorlage an tausend Makler gleichzeitig, nur mit anderem Logo und anderem Foto.",
  [`${S}abgrenzung.p2`]:
    "beuwy baut seit 17 Jahren Marken für anspruchsvolle Auftraggeber und überträgt das auf Ihr Portal: Maßarbeit für Ihre Marke, Ihre Objekte und Ihr CRM, nicht eine von tausend Varianten desselben Templates. Es registriert Eigentümer und qualifiziert sie, bevor Sie zurückrufen.",
  [`${S}abgrenzung.p3_vor`]: "Den Unterschied zu Baukästen wie",
  [`${S}abgrenzung.p3_link1`]: "BOTTIMMO",
  [`${S}abgrenzung.p3_mitte`]: "und was eine Maklerwebsite realistisch",
  [`${S}abgrenzung.p3_link2`]: "kostet",
  [`${S}abgrenzung.p3_nach`]: ", lesen Sie in den beiden Vergleichen.",
  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Makler vorher *wissen* wollen.",
  [`${S}faq.kosten.frage`]: "Was kostet eine Website für Immobilienmakler bei beuwy?",
  [`${S}faq.kosten.antwort_vor`]:
    "Das hängt vom Umfang ab. Vom Bewertungsrechner bis zur CRM-Anbindung ist nicht jedes Haus gleich weit. Die realistischen Marktspannen und was sie beeinflusst, finden Sie auf der Seite",
  [`${S}faq.kosten.antwort_link`]: "Was kostet eine Maklerwebsite",
  [`${S}faq.dauer.frage`]: "Wie lange dauert der Aufbau?",
  [`${S}faq.dauer.antwort`]:
    "Vier Wochen, von der Aufnahme bis zum Go-Live. Den Termin für den Livegang bekommen Sie schriftlich, bevor das Projekt startet.",
  [`${S}faq.domain.frage`]: "Was passiert mit meiner alten Seite und Domain?",
  [`${S}faq.domain.antwort`]:
    "Ihre Domain bleibt Ihre Domain. Wir richten für jede alte Seite eine Weiterleitung ein, damit keine Anfrage und kein Google-Ranking verloren geht, während die neue Seite live geht und danach.",
  [`${S}finale.eyebrow`]: "Nächster Schritt",
  [`${S}finale.titel`]: "Ihre nächste Website entscheidet den nächsten *Alleinauftrag*.",
  [`${S}finale.text`]:
    "Schreiben Sie uns, was Ihre heutige Seite bremst. Wir sagen Ihnen im Gespräch, was ein Neubau in vier Wochen ändert.",
  [`${S}finale.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}finale.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",
  [`${S}finale.fussnote_vor`]: "Mehr zum Gesamtsystem im",
  [`${S}finale.fussnote_link`]: "Immobilienmarketing-Hub",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",
  [`${S}hero.zurueck`]: "Hero · Zurück-Link (Text nach dem Pfeil)",
  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel (ein *Wort* = Highlighter)",
  [`${S}hero.intro_vor`]: "Hero · Intro-Absatz · Teil vor der Markierung",
  [`${S}hero.intro_highlight`]: "Hero · Intro-Absatz · markierter Teil",
  [`${S}hero.intro_nach`]: "Hero · Intro-Absatz · Teil nach der Markierung",
  [`${S}hero.cta_label`]: "Hero · Button-Text",
  [`${S}hero.cta_hinweis`]: "Hero · Hinweis neben dem Button",
  [`${S}spiegel.eyebrow`]: "Spiegel · Eyebrow",
  [`${S}spiegel.titel`]: "Spiegel · Titel (ein *Wort* = Highlighter)",
  [`${S}spiegel.sub`]: "Spiegel · Subline",
  ...spiegelPains.labels,
  [`${S}bausteine.eyebrow`]: "Bausteine · Eyebrow",
  [`${S}bausteine.titel`]: "Bausteine · Titel (ein *Wort* = Highlighter)",
  [`${S}bausteine.sub`]: "Bausteine · Subline",
  ...bausteine.labels,
  [`${S}integration.stempel`]: "Integration · Stempel-Text",
  [`${S}integration.eyebrow`]: "Integration · Eyebrow",
  [`${S}integration.titel`]: "Integration · Titel (ein *Wort* = Highlighter)",
  [`${S}integration.text`]: "Integration · Absatz",
  [`${S}integration.link`]: "Integration · Link-Text (vor dem Pfeil)",
  [`${S}prozess.eyebrow`]: "Prozess · Eyebrow",
  [`${S}prozess.titel`]: "Prozess · Titel (ein *Wort* = Highlighter)",
  ...prozess.labels,
  [`${S}prozess.fussnote`]: "Prozess · Fußnote",
  [`${S}abgrenzung.label`]: "Abgrenzung · Vorspann",
  [`${S}abgrenzung.titel`]: "Abgrenzung · Titel",
  [`${S}abgrenzung.p1`]: "Abgrenzung · Absatz 1",
  [`${S}abgrenzung.p2`]: "Abgrenzung · Absatz 2",
  [`${S}abgrenzung.p3_vor`]: "Abgrenzung · Absatz 3 · Teil vor BOTTIMMO-Link",
  [`${S}abgrenzung.p3_link1`]: "Abgrenzung · Absatz 3 · Link-Text BOTTIMMO",
  [`${S}abgrenzung.p3_mitte`]: "Abgrenzung · Absatz 3 · Teil zwischen den Links",
  [`${S}abgrenzung.p3_link2`]: "Abgrenzung · Absatz 3 · Link-Text kostet",
  [`${S}abgrenzung.p3_nach`]: "Abgrenzung · Absatz 3 · Teil nach dem zweiten Link",
  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  [`${S}faq.kosten.frage`]: "FAQ 1 · Frage",
  [`${S}faq.kosten.antwort_vor`]: "FAQ 1 · Antwort · Teil vor dem Link",
  [`${S}faq.kosten.antwort_link`]: "FAQ 1 · Antwort · Link-Text",
  [`${S}faq.dauer.frage`]: "FAQ 2 · Frage",
  [`${S}faq.dauer.antwort`]: "FAQ 2 · Antwort",
  [`${S}faq.domain.frage`]: "FAQ 3 · Frage",
  [`${S}faq.domain.antwort`]: "FAQ 3 · Antwort",
  [`${S}finale.eyebrow`]: "Finale · Vorspann",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.text`]: "Finale · Absatz",
  [`${S}finale.cta_label`]: "Finale · Button-Text",
  [`${S}finale.cta_hinweis`]: "Finale · Hinweis neben dem Button",
  [`${S}finale.fussnote_vor`]: "Finale · Fußnote · Teil vor dem Hub-Link",
  [`${S}finale.fussnote_link`]: "Finale · Fußnote · Link-Text",
};
