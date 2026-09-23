import { listeRegistrieren } from "../lesen";

/** Studio-Texte /immobilienmakler-werbung — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "immobilienmakler-werbung", titel: "Immobilienmakler-Werbung", route: "/immobilienmakler-werbung" };
const S = "s.immobilienmakler-werbung.";

const kanaele = listeRegistrieren("immobilienmakler-werbung", "kanaele", "Kanal-Zeile", [
  {
    kanal: "Postwurf / Flyer",
    messbarkeit: "kaum messbar, kein Klick, kein Rechner",
    ziel: "Startseite oder gar keine",
    eignung: "Anker im Farming-Gebiet, kein Anfrage-Kanal",
  },
  {
    kanal: "Bus- / Plakatwerbung",
    messbarkeit: "keine Klick-Daten, nur Markenwirkung",
    ziel: "keine Landingpage dahinter",
    eignung: "Namensbekanntheit, keine Vorqualifizierung",
  },
  {
    kanal: "Portal-Featured-Listing",
    messbarkeit: "Klicks beim Portal, nicht bei Ihnen",
    ziel: "Portal-Profil neben dem Wettbewerber",
    eignung: "kurzfristiger Schub, endet mit dem Abo",
  },
  {
    kanal: "Performance-Marketing + eigenes Portal",
    messbarkeit: "jede Stufe messbar, wöchentlich",
    ziel: "Landingpage mit Rechner, Registrierung im CRM",
    eignung: "planbare, wiederholbare Anfragen",
  },
], { kanal: "Kanal", messbarkeit: "Messbarkeit", ziel: "Wohin führt der Klick", eignung: "Eignung" });

const pruefung = listeRegistrieren("immobilienmakler-werbung", "pruefung", "Prüf-Punkt", [
  { text: "Führt der Klick auf eine Landingpage oder nur auf die Startseite?" },
  { text: "Gibt es dort einen Rechner oder ein Formular, das registriert?" },
  { text: "Landet die Anfrage mit Quelle im CRM oder in einem geteilten Postfach?" },
  { text: "Lässt sich ein Preis je Registrierung berechnen, nicht nur ein Media-Budget?" },
  { text: "Bekommen Sie einen Wochenbericht oder erst die Rechnung am Monatsende?" },
], { text: "Text" });

const faq = listeRegistrieren("immobilienmakler-werbung", "faq", "FAQ", [
  {
    frage: "Ist klassische Werbung wie Flyer oder Plakat komplett nutzlos?",
    antwort:
      "Nein, aber sie beantwortet eine andere Frage als Performance-Marketing. Ein Flyer im Farming-Gebiet erinnert an Ihren Namen, er registriert aber niemanden und lässt sich nicht in Anfragen zurückrechnen. Als alleinige Werbeausgabe reicht das selten.",
  },
  {
    frage: "Wie viel sollte ich für Werbung als Makler ausgeben?",
    antwort:
      "Das hängt von Ihrer Region, dem Wettbewerb und Ihrem Mandats-Ziel ab. Wichtiger als die Summe ist die Kette dahinter: Ohne Landingpage, Rechner und CRM-Anbindung verpufft auch ein großes Budget in reiner Sichtbarkeit.",
  },
  {
    frage: "Lohnt sich ein Featured-Listing bei ImmoScout?",
    antwort:
      "Als kurzfristiger Schub für ein einzelnes Objekt kann das funktionieren. Als Werbestrategie für Ihr Büro nicht, weil die Anfrage über das Portal läuft, nicht über Sie, und mit dem Abo endet.",
  },
  {
    frage: "Was unterscheidet beuwy von einer klassischen Werbeagentur?",
    antwort:
      "Eine Agentur liefert meist Anzeigen. beuwy arbeitet als Unternehmensberatung an der ganzen Kette: Anzeige, Landingpage, Rechner, CRM und Wochenbericht, damit jede Ausgabe eine Zahl bekommt statt nur eine Rechnung.",
  },
], { frage: "Frage", antwort: "Antwort" });

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Werbung für Immobilienmakler: Was wirkt, was verbrennt Geld | beuwy",
  [`${S}meta.beschreibung`]:
    "Werbung für Immobilienmakler: Print, Bus und Portal-Buchung erzeugen Sichtbarkeit ohne Kette zur Anfrage. beuwy misst jede Ausgabe an der 5%-Kette bis zum Mandat.",
  [`${S}meta.og_titel`]: "Werbung für Immobilienmakler: Was wirkt, was verbrennt Geld | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Kanal-Ehrlichkeit statt Werbeglaube: Print, Bus und Portal-Buchung vs. Performance-Marketing plus eigenes Portal. beuwy misst jede Ausgabe an der 5%-Kette.",

  [`${S}kopf.eyebrow`]: "Akquise",
  [`${S}kopf.titel`]: "Werbung, die *nachweisbar* wirkt, nicht die, die auffällt.",
  [`${S}kopf.sub_vor`]:
    "Werbung lohnt sich für Immobilienmakler, wenn sie sich an einer Kette messen lässt: Anzeige, Klick, Rechner, Registrierung, Mandat. Postwurf, Bus-Plakat und ungezielte Portal-Buchungen erzeugen",
  [`${S}kopf.sub_highlight`]: "Sichtbarkeit, die sich nicht in Anfragen zurückrechnen lässt",
  [`${S}kopf.sub_nach`]:
    ". Performance-Marketing mit einem eigenen Portal dahinter lässt sich lückenlos messen, von der ersten Anzeige bis zur registrierten Anfrage im CRM.",
  [`${S}kopf.cta`]: "Zusammenarbeit anfragen",
  [`${S}kopf.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",

  [`${S}kanaele.eyebrow`]: "Kanal-Ehrlichkeit",
  [`${S}kanaele.titel`]: "Vier Kanäle, ein *ehrlicher* Blick auf die Messbarkeit.",
  [`${S}kanaele.sub`]:
    "Nicht jede Ausgabe, die nach Werbung aussieht, endet in einer Kette bis zur Anfrage. Diese vier Kanäle im ehrlichen Vergleich, ohne einen davon schlechtzureden.",
  [`${S}kanaele.kopf_kanal`]: "Kanal",
  [`${S}kanaele.kopf_messbarkeit`]: "Messbarkeit",
  [`${S}kanaele.kopf_ziel`]: "Wohin führt der Klick",
  [`${S}kanaele.kopf_eignung`]: "Eignung",
  ...kanaele.defaults,
  [`${S}kanaele.text_vor`]:
    "Die letzte Zeile ist keine Kanal-Empfehlung, sondern eine Kette: Wie diese vier Stufen im Detail funktionieren und mit welcher Quote sie realistisch rechnen können, zeigt die Seite",
  [`${S}kanaele.text_link`]: "Performance-Marketing für Makler",
  [`${S}kanaele.text_nach`]: ".",

  [`${S}pruefung.eyebrow`]: "Vor der nächsten Buchung",
  [`${S}pruefung.titel`]: "Fünf Fragen, bevor Sie das *nächste* Budget freigeben.",
  [`${S}pruefung.sub`]:
    "Stellen Sie diese fünf Fragen jeder Werbeausgabe, egal ob Print, Portal oder Anzeige. Wer zwei oder mehr mit Nein beantwortet, kauft Sichtbarkeit statt Anfragen.",
  ...pruefung.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Sichtbarkeit ist keine Anfrage.",
  [`${S}unterschied.text`]:
    "Ein Plakat, das jeder sieht, und eine Anzeige, die niemand anklickt, kosten oft ähnlich viel. Der Unterschied zeigt sich erst am Ende der Kette: bei der Zahl der Anfragen, die tatsächlich im CRM landen, nicht bei der Zahl der Blicke.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "In den ersten drei Monaten nach dem Relaunch bei RIEGEL Immobilien: neun zusätzliche Mandate, ohne einen einzigen gekauften Lead.",
  [`${S}beweis.cases_link`]: "Weitere Fallstudien ansehen →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Budget wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihre *messbare* Kette.",
  [`${S}finale.text_vor`]: "Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.text_link1`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_mid1`]: ", die Mechanik der Kette auf der Seite",
  [`${S}finale.text_link2`]: "Performance-Marketing für Makler",
  [`${S}finale.text_mid2`]: "und den ersten Anker für Eigentümer im",
  [`${S}finale.text_link3`]: "Verkaufspreisrechner",
  [`${S}finale.text_nach`]: ".",
  [`${S}finale.cta`]: "Zusammenarbeit anfragen",
  [`${S}finale.hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · Open-Graph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",

  [`${S}kopf.eyebrow`]: "Wissens-Kopf · Eyebrow",
  [`${S}kopf.titel`]: "Wissens-Kopf · Titel (*Wort* = Highlighter)",
  [`${S}kopf.sub_vor`]: "Wissens-Kopf · Absatz · Teil vor dem Highlight",
  [`${S}kopf.sub_highlight`]: "Wissens-Kopf · Absatz · Highlight-Wortgruppe",
  [`${S}kopf.sub_nach`]: "Wissens-Kopf · Absatz · Rest nach dem Highlight",
  [`${S}kopf.cta`]: "Wissens-Kopf · CTA-Text",
  [`${S}kopf.cta_hinweis`]: "Wissens-Kopf · Mikrozeile unter dem CTA",

  [`${S}kanaele.eyebrow`]: "Kanal-Tabelle · Eyebrow",
  [`${S}kanaele.titel`]: "Kanal-Tabelle · Titel (*Wort* = Highlighter)",
  [`${S}kanaele.sub`]: "Kanal-Tabelle · Subline",
  [`${S}kanaele.kopf_kanal`]: "Kanal-Tabelle · Spaltenkopf 1",
  [`${S}kanaele.kopf_messbarkeit`]: "Kanal-Tabelle · Spaltenkopf 2",
  [`${S}kanaele.kopf_ziel`]: "Kanal-Tabelle · Spaltenkopf 3",
  [`${S}kanaele.kopf_eignung`]: "Kanal-Tabelle · Spaltenkopf 4",
  [`${S}kanaele.text_vor`]: "Kanal-Tabelle · Absatz unter der Tabelle · Teil vor dem Link",
  [`${S}kanaele.text_link`]: "Kanal-Tabelle · Absatz unter der Tabelle · Linktext",
  [`${S}kanaele.text_nach`]: "Kanal-Tabelle · Absatz unter der Tabelle · Satzende",

  [`${S}pruefung.eyebrow`]: "Checkliste · Eyebrow",
  [`${S}pruefung.titel`]: "Checkliste · Titel (*Wort* = Highlighter)",
  [`${S}pruefung.sub`]: "Checkliste · Subline",

  [`${S}unterschied.label`]: "Unterschied · Label",
  [`${S}unterschied.titel`]: "Unterschied · Titel",
  [`${S}unterschied.text`]: "Unterschied · Text",

  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.text`]: "Beweis · Text",
  [`${S}beweis.cases_link`]: "Beweis · Linktext zu weiteren Fallstudien",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (*Wort* = Highlighter)",

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (*Wort* = Highlighter)",
  [`${S}finale.text_vor`]: "Finale · Absatz · Teil vor Link 1",
  [`${S}finale.text_link1`]: "Finale · Absatz · Linktext (Hub)",
  [`${S}finale.text_mid1`]: "Finale · Absatz · Teil zwischen Link 1 und 2",
  [`${S}finale.text_link2`]: "Finale · Absatz · Linktext (Performance-Marketing)",
  [`${S}finale.text_mid2`]: "Finale · Absatz · Teil zwischen Link 2 und 3",
  [`${S}finale.text_link3`]: "Finale · Absatz · Linktext (Verkaufspreisrechner)",
  [`${S}finale.text_nach`]: "Finale · Absatz · Satzende",
  [`${S}finale.cta`]: "Finale · CTA-Text",
  [`${S}finale.hinweis`]: "Finale · Mikrozeile unter dem CTA",

  ...kanaele.labels,
  ...pruefung.labels,
  ...faq.labels,
};
