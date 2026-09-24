import { listeRegistrieren } from "../lesen";

/** Studio-Texte /perplexity-immobiliensuche — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "perplexity-immobiliensuche",
  titel: "Perplexity Immobiliensuche",
  route: "/perplexity-immobiliensuche",
};
const S = "s.perplexity-immobiliensuche.";

const damalsHeute = listeRegistrieren(
  "perplexity-immobiliensuche",
  "damals_heute",
  "Merkmal",
  [
    { merkmal: "Ausgangspunkt der Suche", damals: "zehn blaue Links", heute: "eine zusammengefasste Antwort" },
    { merkmal: "Anzahl geöffneter Seiten", damals: "3 – 5 Vergleiche", heute: "oft keine, nur die Quellen der Antwort" },
    { merkmal: "Was überzeugt", damals: "Position in der Trefferliste", heute: "Nennung als zitierte Quelle" },
    { merkmal: "Was der Nutzer sieht", damals: "Titel und Meta-Beschreibung", heute: "eine Zusammenfassung aus mehreren Seiten" },
    { merkmal: "Entscheidend für Sichtbarkeit", damals: "Keyword-Dichte, Backlinks", heute: "Konsistenz, echte Zahlen, klare Struktur" },
  ],
  { merkmal: "Merkmal", damals: "Damals", heute: "Heute" },
);

const quellenLogik = listeRegistrieren(
  "perplexity-immobiliensuche",
  "quellen_logik",
  "Faktor",
  [
    {
      titel: "Echte Zahlen statt Marketing-Sprech",
      text: "Eine belegte Kennzahl wiegt für ein Sprachmodell mehr als eine Behauptung wie „führender Makler der Region“, die niemand nachprüfen kann.",
    },
    {
      titel: "Klare Frage-Antwort-Struktur",
      text: "FAQ-Abschnitte lassen sich leicht extrahieren und einer konkreten Nutzerfrage zuordnen, ganz anders als ein langer Fließtext ohne Gliederung.",
    },
    {
      titel: "Konsistenz über alle Profile",
      text: "Name, Adresse und Leistungsversprechen müssen auf der Website, im Google-Profil und auf Bewertungsportalen übereinstimmen, sonst wertet das Modell die Quelle als unsicher.",
    },
    {
      titel: "Sichtbare Aktualität",
      text: "Ein Jahr, ein aktueller Marktbezug oder ein Datum im Text signalisiert, dass die Information nicht seit Jahren unverändert im Netz steht.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const faq = listeRegistrieren(
  "perplexity-immobiliensuche",
  "faq",
  "FAQ",
  [
    {
      frage: "Suchen wirklich schon viele Eigentümer über KI-Assistenten statt über Google?",
      antwort:
        "Der Anteil wächst, ist aber noch kleiner als die klassische Google-Suche. Wer sich heute schon auf beide Recherchewege vorbereitet, verliert nichts, wenn der Anteil weiter steigt, und gewinnt schon jetzt die ersten Kontakte, die diesen Weg gehen.",
    },
    {
      frage: "Muss ich mich bei Perplexity oder ChatGPT extra anmelden, um gefunden zu werden?",
      antwort:
        "Nein. Diese Assistenten greifen auf öffentlich zugängliche Webinhalte zu, ähnlich wie eine Suchmaschine. Es gibt kein Profil, das Sie dort separat anlegen müssten, entscheidend ist die eigene Website.",
    },
    {
      frage: "Zitieren Assistenten auch kleine, regionale Makler-Websites?",
      antwort:
        "Ja, wenn die Seite die gestellte Frage klar und belegt beantwortet. Größe spielt eine kleinere Rolle als bei klassischen Rankings, weil das Modell nach der besten Antwort sucht, nicht nach der bekanntesten Marke.",
    },
    {
      frage: "Wie hängt das mit AI Overviews in der Google-Suche zusammen?",
      antwort:
        "Ähnliche Logik, unterschiedliche Bühne. Google fasst innerhalb der eigenen Suche zusammen, Perplexity und ChatGPT-Suche tun das als eigenständiges Werkzeug. Beide Themen und ihre Unterschiede erklärt die Schwesterseite AI Overviews.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Perplexity & Co.: Wie Eigentümer heute Makler recherchieren | beuwy",
  [`${S}meta.beschreibung`]:
    "Perplexity, ChatGPT-Suche und Copilot verändern, wie Eigentümer einen Makler recherchieren. Das Suchmuster 2026 und was diese Assistenten wirklich zitieren.",
  [`${S}meta.og_titel`]: "Perplexity & Co.: Wie Eigentümer heute Makler recherchieren | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Recherche-Muster 2026, die Quellen-Logik der KI-Assistenten und was tatsächlich zitiert wird: Daten, FAQs, Konsistenz statt Keyword-Dichte.",
  [`${S}hero.eyebrow`]: "KI-Suche",
  [`${S}hero.titel`]: "Perplexity & Co.: wie Eigentümer heute einen Makler *recherchieren*.",
  [`${S}hero.sub_vor`]:
    "Ja, ein wachsender Teil der Eigentümer stellt die Frage heute nicht mehr nur Google, sondern direkt einem Assistenten wie Perplexity, der ChatGPT-Suche oder Copilot: „Welcher Makler in meiner Stadt hat gute Bewertungen?“ Diese Werkzeuge lesen mehrere Quellen gleichzeitig und liefern eine zusammengefasste Antwort mit Verweisen zurück, statt zehn blaue Links.",
  [`${S}hero.sub_highlight`]:
    "Welche Quelle in dieser Antwort landet, folgt anderen Regeln als ein Google-Ranking",
  [`${S}hero.sub_nach`]:
    "— echte Zahlen, klare Struktur und Konsistenz zählen mehr als klassische Keyword-Dichte.",
  [`${S}cta.label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",
  [`${S}muster.eyebrow`]: "Das Recherche-Muster 2026",
  [`${S}muster.titel`]: "Von zehn Links zu *einer* Antwort mit Quellen.",
  [`${S}muster.spalte_merkmal`]: "Merkmal",
  [`${S}muster.spalte_damals`]: "Google-Suche, klassisch",
  [`${S}muster.spalte_heute`]: "KI-Assistent, 2026",
  ...damalsHeute.defaults,
  [`${S}quellen_logik.eyebrow`]: "Die Quellen-Logik",
  [`${S}quellen_logik.titel`]: "Was ein Assistent als *Quelle* auswählt.",
  [`${S}quellen_logik.sub`]:
    "Vier Faktoren, die häufiger über eine Nennung entscheiden als der klassische Rankingfaktor.",
  ...quellenLogik.defaults,
  [`${S}beispiel.eyebrow`]: "Ein Beispiel",
  [`${S}beispiel.titel`]: "Dieselbe Frage, zwei sehr *unterschiedliche* Antworten.",
  [`${S}beispiel.sub`]: "Frage: „Welcher Makler in meiner Stadt kümmert sich um den kompletten Verkauf?“",
  [`${S}beispiel.ohne_label`]: "Ohne klare Struktur",
  [`${S}beispiel.ohne_text`]:
    "Ihre Seite beschreibt Leistungen in langen, werblichen Absätzen ohne konkrete Zahl. Der Assistent findet keine eindeutige Antwort zum Extrahieren und zitiert stattdessen einen Wettbewerber mit klarer FAQ-Sektion.",
  [`${S}beispiel.mit_label`]: "Mit klarer Struktur",
  [`${S}beispiel.mit_text`]:
    "Eine FAQ-Frage auf Ihrer Seite beantwortet exakt diese Formulierung, mit einer Zahl aus Ihrer eigenen Praxis. Der Assistent zitiert Ihr Büro namentlich als eine von zwei Quellen der Antwort.",
  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Ein Assistent zitiert keine Meinung, sondern einen Beleg.",
  [`${S}unterschied.text`]:
    "„Führender Makler der Region“ ist eine Behauptung, die ein Sprachmodell nicht einordnen kann. Eine Zahl, ein Datum, eine Quelle, die sich nachprüfen lässt, kann es. Genau das entscheidet, wer in der Antwort auftaucht und wer nicht.",
  [`${S}beweis.label`]: "Beweis, kein Buzzword",
  [`${S}beweis.text`]:
    "*Siebzehn* Jahre Markenarbeit heißt: konsistente Fakten waren die Aufgabe, lange bevor ein Sprachmodell sie geprüft hat.",
  [`${S}beweis.link`]: "Wie wir Seiten zitierfähig machen →",
  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Gespräch wissen wollen.",
  ...faq.defaults,
  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir eine Seite, die *zitiert* wird.",
  [`${S}finale.satz_1`]: "Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.link_1`]: "Immobilienmarketing-Hub",
  [`${S}finale.satz_2`]: ", die volle Systematik für KI-Sichtbarkeit auf",
  [`${S}finale.link_2`]: "GEO für Immobilienmakler",
  [`${S}finale.satz_3`]: ", wie dasselbe Prinzip in der Google-Suche wirkt, zeigt",
  [`${S}finale.link_3`]: "AI Overviews für Immobilienmakler",
  [`${S}finale.satz_4`]: ".",
  [`${S}finale.cta_hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · OpenGraph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · OpenGraph-Beschreibung",
  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel (ein *Wort* = Highlighter)",
  [`${S}hero.sub_vor`]: "Hero · Subline (Teil vor dem Highlight)",
  [`${S}hero.sub_highlight`]: "Hero · Subline (hervorgehobener Teil)",
  [`${S}hero.sub_nach`]: "Hero · Subline (Teil nach dem Highlight)",
  [`${S}cta.label`]: "CTA · Button-Beschriftung",
  [`${S}hero.cta_hinweis`]: "Hero · Hinweis neben dem CTA",
  [`${S}muster.eyebrow`]: "Recherche-Muster · Eyebrow",
  [`${S}muster.titel`]: "Recherche-Muster · Titel",
  [`${S}muster.spalte_merkmal`]: "Recherche-Muster · Tabellenkopf Spalte 1",
  [`${S}muster.spalte_damals`]: "Recherche-Muster · Tabellenkopf Spalte 2",
  [`${S}muster.spalte_heute`]: "Recherche-Muster · Tabellenkopf Spalte 3",
  ...damalsHeute.labels,
  [`${S}quellen_logik.eyebrow`]: "Quellen-Logik · Eyebrow",
  [`${S}quellen_logik.titel`]: "Quellen-Logik · Titel",
  [`${S}quellen_logik.sub`]: "Quellen-Logik · Subline",
  ...quellenLogik.labels,
  [`${S}beispiel.eyebrow`]: "Beispiel · Eyebrow",
  [`${S}beispiel.titel`]: "Beispiel · Titel",
  [`${S}beispiel.sub`]: "Beispiel · Subline (die gestellte Frage)",
  [`${S}beispiel.ohne_label`]: "Beispiel · Karte links Label",
  [`${S}beispiel.ohne_text`]: "Beispiel · Karte links Text",
  [`${S}beispiel.mit_label`]: "Beispiel · Karte rechts Label",
  [`${S}beispiel.mit_text`]: "Beispiel · Karte rechts Text",
  [`${S}unterschied.label`]: "Unterschied-Karte · Label",
  [`${S}unterschied.titel`]: "Unterschied-Karte · Titel",
  [`${S}unterschied.text`]: "Unterschied-Karte · Text",
  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.text`]: "Beweis · Text (ein *Wort* = Highlighter)",
  [`${S}beweis.link`]: "Beweis · Link-Beschriftung",
  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel",
  ...faq.labels,
  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.satz_1`]: "Finale · Satzteil 1 (vor Link 1)",
  [`${S}finale.link_1`]: "Finale · Link 1 (Ziel: Immobilienmarketing-Hub)",
  [`${S}finale.satz_2`]: "Finale · Satzteil 2 (zwischen Link 1 und Link 2)",
  [`${S}finale.link_2`]: "Finale · Link 2 (Ziel: GEO für Immobilienmakler)",
  [`${S}finale.satz_3`]: "Finale · Satzteil 3 (zwischen Link 2 und Link 3)",
  [`${S}finale.link_3`]: "Finale · Link 3 (Ziel: AI Overviews für Immobilienmakler)",
  [`${S}finale.satz_4`]: "Finale · Satzteil 4 (nach Link 3)",
  [`${S}finale.cta_hinweis`]: "Finale · Hinweis neben dem CTA",
};
