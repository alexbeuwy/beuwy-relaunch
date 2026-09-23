import { listeRegistrieren } from "../lesen";

/** Studio-Texte /google-unternehmensprofil-makler — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "google-unternehmensprofil-makler",
  titel: "Google-Unternehmensprofil",
  route: "/google-unternehmensprofil-makler",
};
const S = "s.google-unternehmensprofil-makler.";

const pains = listeRegistrieren(
  "google-unternehmensprofil-makler",
  "pains",
  "Lücke",
  [
    {
      quote: "Die Kategorie steht noch auf „Unternehmensberatung“ oder ist gar nicht gesetzt.",
      answer:
        "Google zeigt Ihr Profil im lokalen Suchergebnis vor allem dann, wenn die Hauptkategorie exakt zur Suchanfrage passt. Steht dort die falsche oder eine zu allgemeine Kategorie, taucht Ihr Büro bei „Immobilienmakler in der Nähe“ erst gar nicht in der engeren Auswahl auf.",
    },
    {
      quote: "Das letzte Foto ist drei Jahre alt, das Büro sieht heute anders aus.",
      answer:
        "Ein Profil ohne neue Fotos wirkt verlassen, selbst wenn dahinter ein aktives Büro steht. Google wertet zudem regelmäßige Uploads als Aktivitätssignal — ein Profil, das seit Jahren stillsteht, verliert genau dort an Sichtbarkeit, wo es am günstigsten wäre, sie zu halten.",
    },
    {
      quote: "Eine Frage im Q&A-Bereich steht seit Monaten offen — beantwortet hat sie ein Fremder falsch.",
      answer:
        "Der Fragen-Bereich ist für jeden Nutzer öffentlich beschreibbar, auch die Antworten. Bleibt eine Frage zu Öffnungszeiten oder Leistungen unbeantwortet, beantwortet sie irgendwann jemand anderes, und diese Antwort steht dann dauerhaft unter Ihrem Namen.",
    },
    {
      quote: "Bewertungen kommen nur zufällig herein, nie auf Anfrage.",
      answer:
        "Ohne festen Prozess bleiben Bewertungen dem Zufall überlassen, meist von den lautesten, nicht den zufriedensten Kunden. Ein systematischer Ablauf dafür steht in einer eigenen Anleitung, siehe unten.",
    },
  ],
  { quote: "Zitat", answer: "Antwort" },
);

const routine = listeRegistrieren(
  "google-unternehmensprofil-makler",
  "routine",
  "Routine-Termin",
  [
    { tag: "Montag", aufgabe: "Neuer Beitrag: aktuelles Angebot oder verkauftes Objekt der Woche", minuten: "10 Min" },
    { tag: "Mittwoch", aufgabe: "Bewertungsanfrage an den letzten Notartermin verschicken", minuten: "5 Min" },
    { tag: "Freitag", aufgabe: "Zwei bis drei neue Fotos aus der Woche hochladen", minuten: "10 Min" },
    { tag: "Wöchentlich einmal", aufgabe: "Q&A-Bereich prüfen, offene Fragen selbst beantworten", minuten: "5 Min" },
  ],
  { tag: "Termin", aufgabe: "Aufgabe", minuten: "Zeitaufwand" },
);

const faq = listeRegistrieren(
  "google-unternehmensprofil-makler",
  "faq",
  "FAQ",
  [
    {
      q: "Wie lange dauert es, bis ein optimiertes Profil Wirkung zeigt?",
      a: "Rechnen Sie mit mehreren Wochen. Google sammelt Aktivitäts- und Relevanzsignale über Zeit, ein einmaliges Update ändert das Ranking selten über Nacht. Eine feste Wochenroutine wirkt zuverlässiger als ein aufwendiger Einmal-Aufwand.",
    },
    {
      q: "Kann ich mehrere Standorte in einem Profil verwalten?",
      a: "Nein, jeder Standort mit eigener Adresse braucht ein eigenes, einzeln verifiziertes Profil. Bei mehreren Büros lohnt sich die Standortgruppen-Funktion von Google, damit Beiträge und Einstellungen sich zentral pflegen lassen, ohne dass die Profile getrennt bleiben.",
    },
    {
      q: "Was mache ich mit einer schlechten Bewertung im Profil?",
      a: "Antworten Sie sachlich und öffentlich, bieten Sie eine Klärung außerhalb der Kommentarspalte an. Eine Löschung fordert Google nur bei einem echten Regelverstoß, nicht wegen einer unangenehmen, aber zutreffenden Kritik. Wie Sie systematisch mehr Bewertungen aufbauen, zeigt eine eigene Anleitung.",
    },
    {
      q: "Ersetzt das Google-Profil die eigene Website?",
      a: "Nein. Das Profil ist der erste Kontaktpunkt und schafft Vertrauen auf den ersten Blick, die eigene Website liefert die Tiefe: Referenzen, Bewertungsrechner, den vollständigen Auftritt. Beides zusammen entscheidet, ob aus einem Suchtreffer eine Anfrage wird.",
    },
  ],
  { q: "Frage", a: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Google-Unternehmensprofil für Makler: Die unterschätzte Startseite | beuwy",
  [`${S}meta.beschreibung`]:
    "Google-Unternehmensprofil optimieren heißt für Makler: Kategorie exakt setzen, Fotos aktuell halten, Q&A beantworten — vier Bausteine plus Wochenroutine.",
  [`${S}meta.og_titel`]: "Google-Unternehmensprofil für Makler: Die unterschätzte Startseite | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Für die meisten Eigentümer ist das Google-Unternehmensprofil die erste Seite, die sie von Ihnen sehen. Kategorien, Bewertungs-Prozess, Beiträge, Q&A und eine feste Wochenroutine.",

  [`${S}kopf.eyebrow`]: "Google-Sichtbarkeit",
  [`${S}kopf.titel`]: "Google-Unternehmensprofil für Makler: die *unterschätzte* Startseite.",
  [`${S}kopf.sub_vor`]:
    "Sie optimieren Ihr Google-Unternehmensprofil, indem Sie die Hauptkategorie exakt auf „Immobilienmakler“ setzen, Kontaktdaten und Öffnungszeiten aktuell halten, laufend echte Fotos statt Stockmaterial hochladen und Fragen im Q&A-Bereich selbst beantworten, bevor es ein Fremder falsch tut.",
  [`${S}kopf.sub_mark`]:
    "Für die meisten Eigentümer ist das Profil die erste Seite, die sie von Ihnen sehen, noch vor der eigenen Website",
  [`${S}kopf.sub_nach`]:
    "— wer es leer oder veraltet lässt, verliert genau in diesem ersten Moment.",
  [`${S}kopf.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}kopf.antwort`]: "Antwort innerhalb von 24 Stunden",

  [`${S}versaeumnisse.eyebrow`]: "Was am häufigsten fehlt",
  [`${S}versaeumnisse.titel`]: "Vier Lücken, die ein Profil *unsichtbar* machen.",
  ...pains.defaults,

  [`${S}routine.eyebrow`]: "Die Wochenroutine",
  [`${S}routine.titel`]: "30 Minuten pro Woche, fest *eingeplant* statt spontan.",
  [`${S}routine.sub`]:
    "Ein Profil lebt von Regelmäßigkeit, nicht von einer großen Kampagne im Januar. Diese vier Termine reichen für die meisten Maklerbüros.",
  [`${S}routine.th_termin`]: "Termin",
  [`${S}routine.th_aufgabe`]: "Aufgabe",
  [`${S}routine.th_zeitaufwand`]: "Zeitaufwand",
  ...routine.defaults,
  [`${S}routine.text_vor`]:
    "Wie aus der Bewertungsanfrage vom Mittwoch systematisch eine sichtbare Zahl wird, zeigt die eigene Anleitung",
  [`${S}routine.link`]: "Bewertungen aufbauen",
  [`${S}routine.text_nach`]: ".",

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Das Profil ist keine Visitenkarte. Es ist die erste Landingpage.",
  [`${S}unterschied.text`]:
    "Die meisten Makler behandeln ihr Google-Profil wie ein einmalig ausgefülltes Formular. Wer es wie eine Landingpage pflegt — mit Beiträgen, aktuellen Fotos und beantworteten Fragen — verschafft sich einen Vorsprung, für den kein Wettbewerber extra bezahlen muss, ihn aber trotzdem kaum jemand nutzt.",

  [`${S}beweis.label`]: "Beweis, keine Behauptung",
  [`${S}beweis.titel`]:
    "Für RIEGEL Immobilien haben wir den gesamten digitalen Auftritt neu aufgesetzt, das Google-Unternehmensprofil eingeschlossen: In den ersten drei Monaten kamen neun zusätzliche Mandate über das System.",
  [`${S}beweis.link`]: "Fallstudie RIEGEL Immobilien lesen →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Update wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihre *erste* Landingpage.",
  [`${S}finale.satz1`]: "Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.link1`]: "Immobilienmarketing-Hub",
  [`${S}finale.satz2`]: ", wie das Profil in die gesamte Sichtbarkeitsstrategie einzahlt, zeigt",
  [`${S}finale.link2`]: "SEO für Immobilienmakler",
  [`${S}finale.satz3`]: ", wie Empfehlungen online ankommen, zeigt",
  [`${S}finale.link3`]: "Empfehlungsgeschäft digitalisieren",
  [`${S}finale.satz4`]: ".",
  [`${S}finale.antwort`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · Open-Graph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",

  [`${S}kopf.eyebrow`]: "Kopf · Eyebrow",
  [`${S}kopf.titel`]: "Kopf · Titel (ein *Wort* = Highlighter)",
  [`${S}kopf.sub_vor`]: "Kopf · Subline · Teil vor dem Highlight",
  [`${S}kopf.sub_mark`]: "Kopf · Subline · Hervorgehobener Teil",
  [`${S}kopf.sub_nach`]: "Kopf · Subline · Teil nach dem Highlight",
  [`${S}kopf.cta_label`]: "Kopf & Finale · CTA-Beschriftung",
  [`${S}kopf.antwort`]: "Kopf · Antwortzeit-Hinweis",

  [`${S}versaeumnisse.eyebrow`]: "Versäumnisse · Eyebrow",
  [`${S}versaeumnisse.titel`]: "Versäumnisse · Titel (ein *Wort* = Highlighter)",
  ...pains.labels,

  [`${S}routine.eyebrow`]: "Routine · Eyebrow",
  [`${S}routine.titel`]: "Routine · Titel (ein *Wort* = Highlighter)",
  [`${S}routine.sub`]: "Routine · Subline",
  [`${S}routine.th_termin`]: "Routine · Tabelle · Spaltenkopf Termin",
  [`${S}routine.th_aufgabe`]: "Routine · Tabelle · Spaltenkopf Aufgabe",
  [`${S}routine.th_zeitaufwand`]: "Routine · Tabelle · Spaltenkopf Zeitaufwand",
  ...routine.labels,
  [`${S}routine.text_vor`]: "Routine · Verweistext · Teil vor dem Link",
  [`${S}routine.link`]: "Routine · Verweistext · Linktext (Bewertungen aufbauen)",
  [`${S}routine.text_nach`]: "Routine · Verweistext · Teil nach dem Link",

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.titel`]: "Beweis · Kernsatz",
  [`${S}beweis.link`]: "Beweis · Linktext (Fallstudie RIEGEL)",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.satz1`]: "Finale · Satz · Teil vor Link 1 (Hub)",
  [`${S}finale.link1`]: "Finale · Satz · Linktext 1 (Immobilienmarketing-Hub)",
  [`${S}finale.satz2`]: "Finale · Satz · Teil zwischen Link 1 und Link 2 (SEO)",
  [`${S}finale.link2`]: "Finale · Satz · Linktext 2 (SEO für Immobilienmakler)",
  [`${S}finale.satz3`]: "Finale · Satz · Teil zwischen Link 2 und Link 3 (Empfehlungen)",
  [`${S}finale.link3`]: "Finale · Satz · Linktext 3 (Empfehlungsgeschäft digitalisieren)",
  [`${S}finale.satz4`]: "Finale · Satz · Teil nach Link 3",
  [`${S}finale.antwort`]: "Finale · Antwortzeit-Hinweis",
};
