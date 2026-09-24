import { listeRegistrieren } from "../lesen";

/** Studio-Texte /ai-overviews-immobilien — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "ai-overviews-immobilien",
  titel: "AI Overviews für Immobilien",
  route: "/ai-overviews-immobilien",
};
const S = "s.ai-overviews-immobilien.";

const problem = listeRegistrieren(
  "ai-overviews-immobilien",
  "problem",
  "Einwand",
  [
    {
      quote: "Die Antwort steht schon über den Ergebnissen, bevor irgendjemand klickt.",
      antwort:
        "Bei allgemeinen Fragen wie „Wie läuft ein Hausverkauf ab“ fasst Google die Antwort direkt zusammen. Ein Teil der Nutzer liest diese Zusammenfassung und geht nie zu einer einzelnen Seite weiter, egal wie gut sie rankt.",
    },
    {
      quote: "Platz drei bringt nichts, wenn die Overview die Frage schon beantwortet hat.",
      antwort:
        "Ranking war lange die ganze Messlatte. Jetzt kann eine Seite auf Platz drei stehen und trotzdem leer ausgehen, weil der Nutzer seine Antwort bereits gelesen hat, ohne einen der Treffer darunter zu öffnen.",
    },
    {
      quote: "Wer nicht zitiert wird, verschwindet doppelt: kein Klick, keine Erwähnung.",
      antwort:
        "Die Overview nennt zwei bis vier Quellen namentlich. Wer dort nicht auftaucht, ist für diese Suchanfrage komplett unsichtbar, nicht nur einen Rang schlechter platziert.",
    },
  ],
  { quote: "Zitat", antwort: "Antwort" },
);

const mechanismus = listeRegistrieren(
  "ai-overviews-immobilien",
  "mechanismus",
  "Schritt",
  [
    {
      titel: "Literale Antwort",
      text: "Ein Satz, der die Suchfrage direkt beantwortet, meist gleich im ersten Absatz. Google zieht bevorzugt Formulierungen, die ohne Umweg zur Frage passen.",
    },
    {
      titel: "Strukturierte Daten",
      text: "FAQPage- und Article-Markup ordnen Frage und Antwort maschinenlesbar zu, statt sie in Fließtext zu verstecken, den ein System erst interpretieren müsste.",
    },
    {
      titel: "Konsistente Fakten",
      text: "Name, Zahl und Leistungsversprechen stimmen über Website, Google-Profil und Bewertungsportale hinweg überein. Widersprüche kosten Vertrauen bei Mensch und Modell gleichermaßen.",
    },
    {
      titel: "Sichtbare Aktualität",
      text: "Ein Datum, ein aktueller Marktbezug, eine gepflegte Seite statt eines Textes, der seit drei Jahren unverändert dasteht.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const beispiel = listeRegistrieren(
  "ai-overviews-immobilien",
  "beispiel",
  "Karte",
  [
    {
      label: "Overview ohne Ihre Seite als Quelle",
      text: "Google fasst die Provisionsspanne aus zwei großen Portalen zusammen und nennt deren Namen als Quelle. Ihr Büro taucht in der Antwort nicht auf, obwohl Ihre eigene Seite dieselbe Frage längst beantwortet.",
    },
    {
      label: "Overview mit Ihrer Seite als Quelle",
      text: "Ihre Seite beantwortet dieselbe Frage in einem Satz, mit FAQ-Markup und einer Zahl aus Ihrer eigenen Praxis. Google nennt Ihr Büro namentlich als eine der Quellen, direkt in der Zusammenfassung, ganz ohne Klick.",
    },
  ],
  { label: "Karten-Label", text: "Karten-Text" },
);

const faq = listeRegistrieren(
  "ai-overviews-immobilien",
  "faq",
  "FAQ",
  [
    {
      frage: "Verschwinden klassische Rankings durch AI Overviews komplett?",
      antwort:
        "Nein. Overviews erscheinen vor allem bei allgemeinen Informationsfragen, nicht bei jeder Suche. Bei konkreten, kommerziellen Anfragen wie „Makler Musterstadt“ zeigt Google weiterhin die gewohnten organischen Treffer, oft ganz ohne Overview darüber.",
    },
    {
      frage: "Wie erfahre ich, ob meine Seite in einer Overview zitiert wurde?",
      antwort:
        "Ein verlässliches, flächendeckendes Tool dafür gibt es bisher nicht. Google Search Console zeigt Teilsignale, ansonsten hilft nur die Stichprobe: die eigene Zielfrage regelmäßig selbst eingeben und nachsehen, wer genannt wird.",
    },
    {
      frage: "Muss ich meine Texte jetzt komplett für KI umschreiben?",
      antwort:
        "Nein, die Grundlagen sind dieselben wie bei gutem SEO: eine klare Antwort auf eine konkrete Frage, saubere Struktur, echte Fakten statt Marketing-Sprech. Wer das schon macht, muss nichts grundlegend ändern.",
    },
    {
      frage: "Gilt das auch für ChatGPT und Perplexity, nicht nur für Google?",
      antwort:
        "Ja, mit ähnlicher Logik, aber eigenen Regeln bei der Quellenwahl. Wie Eigentümer heute über solche Assistenten recherchieren, zeigt die Schwesterseite Perplexity & Co.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "AI Overviews: Wenn Google selbst antwortet, und Sie zitiert werden | beuwy",
  [`${S}meta.beschreibung`]:
    "AI Overviews beantworten Suchfragen direkt in Google, oft ohne Klick. Was das für Immobilienmakler konkret bedeutet und wie Ihre Seite trotzdem zitiert wird.",
  [`${S}meta.og_beschreibung`]:
    "Klickverlust bei generischen Fragen, neue Sichtbarkeit durch Zitate: Wie Google AI Overviews Immobilienmakler treffen und wie Seitenstruktur darauf reagiert.",

  [`${S}hero.eyebrow`]: "KI-Suche",
  [`${S}hero.titel`]: "AI Overviews: wenn Google selbst antwortet, und Sie trotzdem *zitiert* werden.",
  [`${S}hero.text_vor`]:
    "Google AI Overviews bedeuten für Makler zwei Dinge gleichzeitig: Bei allgemeinen Fragen wie „Wie läuft ein Hausverkauf ab“ fasst Google die Antwort direkt über den Ergebnissen zusammen, ein Teil der Klicks bleibt aus. Gleichzeitig entsteht eine neue Chance, wenn Ihre Seite als eine der zitierten Quellen erscheint:",
  [`${S}hero.text_mitte`]:
    "Ihr Name steht dann in der Antwort selbst, auch wenn niemand klickt",
  [`${S}hero.text_nach`]:
    ". Wer weiter nur für einen Rankingplatz schreibt, tritt gegen eine Zusammenfassung an, die er nicht sieht, wer literale Antworten liefert, wird Teil davon.",
  [`${S}hero.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",
  [`${S}hero.bild_alt`]:
    "Makler prüft eine Google-Suchergebnisseite am Laptop, Notizblock mit Stichpunkten daneben",

  [`${S}problem.eyebrow`]: "Die Klickverlust-Realität",
  [`${S}problem.titel`]: "Ranking ist nicht mehr gleich *Sichtbarkeit*.",
  ...problem.defaults,

  [`${S}mechanismus.eyebrow`]: "Der Mechanismus",
  [`${S}mechanismus.titel`]: "Vier Bedingungen, damit eine Seite *zitiert* wird.",
  [`${S}mechanismus.sub`]:
    "Zitierfähigkeit ist keine neue Disziplin, sondern eine Verschärfung der alten: klare Antworten, sauber ausgezeichnet, konsistent gehalten.",
  ...mechanismus.defaults,

  [`${S}beispiel.eyebrow`]: "Ein Beispiel",
  [`${S}beispiel.titel`]: "Dieselbe Frage, zwei sehr *unterschiedliche* Ergebnisse.",
  [`${S}beispiel.sub`]: "Suchfrage: „Was kostet ein Makler beim Hausverkauf?“",
  ...beispiel.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Nicht geklickt ist nicht dasselbe wie nicht gesehen.",
  [`${S}unterschied.text`]:
    "Ein Klick ist messbar, eine Erwähnung in einer Zusammenfassung wirkt trotzdem: Wer seinen Namen dort liest, merkt ihn sich für den nächsten Schritt. Wer fehlt, ist für diese Suchanfrage schlicht nicht vorhanden gewesen.",

  [`${S}beweis.label`]: "Beweis, kein Buzzword",
  [`${S}beweis.titel`]:
    "*Siebzehn* Jahre Markenarbeit, geprüft heute doppelt: vom Menschen und vom Sprachmodell, das nur zitiert, was es belegen kann.",
  [`${S}beweis.link`]: "Wie wir Seiten zitierfähig machen →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Gespräch wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir eine Seite, die *zitiert* wird.",
  [`${S}finale.text_a`]: "Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_b`]: ", die volle Systematik für KI-Sichtbarkeit auf",
  [`${S}finale.link_geo`]: "GEO für Immobilienmakler",
  [`${S}finale.text_c`]: ", die klassische Grundlage dazu auf",
  [`${S}finale.link_seo`]: "SEO für Immobilienmakler",
  [`${S}finale.text_d`]: ".",
  [`${S}finale.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}finale.cta_hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",

  [`${S}hero.eyebrow`]: "Wissens-Kopf · Eyebrow",
  [`${S}hero.titel`]: "Wissens-Kopf · H1 (ein *Wort* = Highlighter)",
  [`${S}hero.text_vor`]: "Wissens-Kopf · Intro-Satz, Teil vor dem Highlight",
  [`${S}hero.text_mitte`]: "Wissens-Kopf · Intro-Satz, hervorgehobener Teil",
  [`${S}hero.text_nach`]: "Wissens-Kopf · Intro-Satz, Teil nach dem Highlight",
  [`${S}hero.cta_label`]: "Wissens-Kopf · Knopf-Text",
  [`${S}hero.cta_hinweis`]: "Wissens-Kopf · Hinweis neben dem Knopf",
  [`${S}hero.bild_alt`]: "Wissens-Kopf · Bild-Alt-Text",

  [`${S}problem.eyebrow`]: "Problem · Eyebrow",
  [`${S}problem.titel`]: "Problem · Titel (ein *Wort* = Highlighter)",
  ...problem.labels,

  [`${S}mechanismus.eyebrow`]: "Mechanismus · Eyebrow",
  [`${S}mechanismus.titel`]: "Mechanismus · Titel (ein *Wort* = Highlighter)",
  [`${S}mechanismus.sub`]: "Mechanismus · Subline",
  ...mechanismus.labels,

  [`${S}beispiel.eyebrow`]: "Beispiel · Eyebrow",
  [`${S}beispiel.titel`]: "Beispiel · Titel (ein *Wort* = Highlighter)",
  [`${S}beispiel.sub`]: "Beispiel · Subline",
  ...beispiel.labels,

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.titel`]: "Beweis · Titel (ein *Wort* = Highlighter)",
  [`${S}beweis.link`]: "Beweis · Link-Text",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.text_a`]: "Finale · Satz, Teil vor Link 1",
  [`${S}finale.link_hub`]: "Finale · Link-Text (Immobilienmarketing-Hub)",
  [`${S}finale.text_b`]: "Finale · Satz, Teil zwischen Link 1 und 2",
  [`${S}finale.link_geo`]: "Finale · Link-Text (GEO für Immobilienmakler)",
  [`${S}finale.text_c`]: "Finale · Satz, Teil zwischen Link 2 und 3",
  [`${S}finale.link_seo`]: "Finale · Link-Text (SEO für Immobilienmakler)",
  [`${S}finale.text_d`]: "Finale · Satz-Ende",
  [`${S}finale.cta_label`]: "Finale · Knopf-Text",
  [`${S}finale.cta_hinweis`]: "Finale · Hinweis unter dem Knopf",
};
