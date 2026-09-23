import { listeRegistrieren } from "../lesen";

/** Studio-Texte /objektakquise-strategien — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "objektakquise-strategien",
  titel: "Objektakquise-Strategien",
  route: "/objektakquise-strategien",
};
const S = "s.objektakquise-strategien.";

const pains = listeRegistrieren(
  "objektakquise-strategien",
  "pains",
  "Einwand",
  [
    {
      quote:
        "Zehn Objektakquise-Tipps in einer Liste, aber keine Zeile dazu, welcher Tipp wie viel Zeit frisst.",
      answer:
        "Eine Rangliste ohne Aufwand-Wirkung-Verhältnis ist keine Entscheidungshilfe. Ein Makler mit zwei Wochenstunden für Akquise braucht andere Kanäle als ein Büro mit eigenem Marketing-Budget.",
    },
    {
      quote:
        "Der Artikel empfiehlt Kaltakquise und Social Media und SEO und Empfehlungsmarketing, gleichzeitig, ab morgen.",
      answer:
        "Wer alles gleichzeitig anfängt, bringt keinen Kanal auf ein Niveau, das trägt. Jede Strategie braucht eine eigene Anlaufzeit, bevor sie überhaupt Ergebnisse zeigen kann.",
    },
    {
      quote: "Kein Wort dazu, wie lange es bis zur ersten Anfrage dauert.",
      answer:
        "Kaltakquise kann in derselben Woche ein Mandat bringen, ein eigenes Portal frühestens nach Wochen. Ohne diese Zeitachse plant kein Büro sein Budget oder seine Geduld richtig.",
    },
  ],
  { quote: "Zitat", answer: "Antwort" },
);

const strategien = listeRegistrieren(
  "objektakquise-strategien",
  "strategien",
  "Strategie",
  [
    {
      name: "Kaltakquise (Anruf, Klingeln)",
      aufwand: "Sehr hoch, mehrere Stunden am Tag, dauerhaft",
      wirkung: "Sofort möglich, aber unberechenbar",
      eignung: "Einzelmakler mit viel Zeit, wenig Marketingbudget",
    },
    {
      name: "Postwurf und Flyer",
      aufwand: "Mittel, Layout und Verteilung je Runde",
      wirkung: "Wochen bis Monate, breite Streuung",
      eignung: "Ergänzung zum digitalen Auftritt, keine Alleinstrategie",
    },
    {
      name: "Empfehlungsmarketing",
      aufwand: "Gering laufend, hoch beim Aufbau der Servicequalität",
      wirkung: "Monate bis Jahre, dann konstant",
      eignung: "Jedes etablierte Büro, kaum in der Geschwindigkeit steuerbar",
    },
    {
      name: "Google-Unternehmensprofil und Bewertungen",
      aufwand: "Gering, laufende Pflege statt Projekt",
      wirkung: "Wochen bis erste Sichtbarkeit, Monate bis Wirkung",
      eignung: "Pflichtprogramm für jedes Büro, unabhängig von der Größe",
    },
    {
      name: "Regionales Social-Media-Farming",
      aufwand: "Hoch, fester Content-Rhythmus über Monate",
      wirkung: "Monate bis Reichweite im Stadtteil spürbar wird",
      eignung: "Makler vor der Kamera oder mit Team dafür",
    },
    {
      name: "Performance-Marketing mit Bewertungsrechner",
      aufwand: "Hoch beim Aufbau, gering in der laufenden Steuerung",
      wirkung: "Wochen bis erste Leads, planbar über das Budget",
      eignung: "Büros mit klarem Anfrageziel und Anzeigenbudget",
    },
    {
      name: "Eigenes Portal als SEO-Fundament",
      aufwand: "Hoch beim Aufbau, sehr gering laufend",
      wirkung: "Monate bis erste Rankings, danach dauerhaft wachsend",
      eignung: "Büros mit langfristigem Anspruch, nicht für schnelle Einzelfälle",
    },
  ],
  { name: "Name", aufwand: "Aufwand", wirkung: "Erste Wirkung", eignung: "Eignung" },
);

const faq = listeRegistrieren(
  "objektakquise-strategien",
  "faq",
  "FAQ",
  [
    {
      frage: "Ist Kaltakquise 2026 noch sinnvoll?",
      antwort:
        "Als eine von mehreren Strategien ja, vor allem für schnelle Einzelmandate. Als einzige Quelle nicht: Der Zeitaufwand pro Termin ist hoch, und jedes Ergebnis endet mit dem Anruf, statt weiterzuwirken wie eine Landingpage oder ein Rechner, die auch nachts arbeiten.",
    },
    {
      frage: "Wie viele Akquise-Kanäle sollte ich gleichzeitig bespielen?",
      antwort:
        "Zwei bis drei, mit einem klaren Schwerpunkt. Ein schneller Kanal für kurzfristige Mandate, kombiniert mit einem Kanal, der über Monate compoundiert, etwa ein Google-Profil oder ein eigenes Portal. Fünf Kanäle gleichzeitig bedeuten meist fünf halb gepflegte Kanäle.",
    },
    {
      frage: "Was kostet der Aufbau eines eigenen Portals im Vergleich zu laufender Kaltakquise?",
      antwort:
        "Ein Portal ist eine Investition im Voraus, Kaltakquise eine laufende Zeitkosten-Rechnung ohne Ende. Nach dem Aufbau sinkt der Aufwand beim Portal auf Pflege, während Kaltakquise jede Woche denselben Einsatz verlangt. Einen konkreten Betrag nennen wir erst nach dem ersten Gespräch.",
    },
    {
      frage: "Wie schnell zeigen sich erste Ergebnisse?",
      antwort:
        "Kaltakquise kann in derselben Woche einen Termin bringen. Performance-Marketing mit Rechner zeigt erste Leads meist innerhalb weniger Wochen. Ein eigenes Portal als SEO-Fundament braucht Monate, bevor es zuverlässig rankt, dafür trägt es danach ohne täglichen Einsatz weiter.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Objektakquise: 7 Strategien, die 2026 wirklich Mandate bringen | beuwy",
  [`${S}meta.beschreibung`]:
    "Objektakquise 2026: 7 Strategien ehrlich verglichen, von Kaltakquise bis zum eigenen Portal, mit Aufwand und Eignung je Kanal statt einer Wunderliste.",
  [`${S}meta.og_beschreibung`]:
    "Ehrliches Ranking der Objektakquise-Strategien 2026: Aufwand, erste Wirkung und Eignung je Kanal, von Kaltakquise bis zum eigenen Portal als SEO-Fundament.",
  [`${S}hero.eyebrow`]: "Wachstum",
  [`${S}hero.titel`]: "Sieben Objektakquise-Strategien – und welche 2026 wirklich *Mandate* bringen.",
  [`${S}hero.intro`]:
    "2026 funktionieren Objektakquise-Strategien am besten kombiniert: Kaltakquise und Postwurf bringen einzelne Mandate, aber mit hohem Zeitaufwand pro Abschluss. Empfehlungsmarketing und ein gepflegtes Google-Profil skalieren langsamer, dafür ohne laufende Kosten. Performance-Marketing mit eigenem Bewertungsrechner und ein eigenes Portal als SEO-Fundament liefern den planbarsten, am besten skalierenden Zufluss, brauchen aber Vorlauf, bevor die ersten Anfragen kommen.",
  [`${S}hero.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",
  [`${S}problem.eyebrow`]: "Warum Ranglisten meistens nicht helfen",
  [`${S}problem.titel`]: "Eine Liste ohne *Aufwand* ist keine Strategie.",
  ...pains.defaults,
  [`${S}strategien.eyebrow`]: "Der ehrliche Vergleich",
  [`${S}strategien.titel`]: "Sieben Kanäle, von *Kaltakquise* bis zum eigenen Portal.",
  [`${S}strategien.sub`]:
    "Kein Ranking nach Sympathie, sondern nach Aufwand, erster Wirkung und Eignung. Die Reihenfolge folgt der Logik: was zuerst trägt, bis das nächste compoundiert.",
  [`${S}strategien.spalte_rang`]: "Rang",
  [`${S}strategien.spalte_name`]: "Strategie",
  [`${S}strategien.spalte_aufwand`]: "Aufwand",
  [`${S}strategien.spalte_wirkung`]: "Erste Wirkung",
  [`${S}strategien.spalte_eignung`]: "Eignung",
  ...strategien.defaults,
  [`${S}strategien.fazit`]:
    "Die letzte Zeile ist bewusst die letzte: Ein eigenes Portal braucht am längsten, bis es rankt, dafür arbeitet es danach weiter, ohne dass jede Woche neuer Einsatz nötig wird. Genau darauf ist unsere Arbeit als Unternehmensberatung ausgelegt, nicht auf eine einzelne Kampagne.",
  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Es gibt keine beste Strategie. Es gibt die richtige Kette.",
  [`${S}unterschied.text`]:
    "Kaltakquise füllt die Lücke, bis das eigene Portal rankt. Ein Bewertungsrechner fängt die Anfrage ab, die eine Anzeige gerade geweckt hat. Keine dieser Strategien ersetzt die andere, sie übergeben sich gegenseitig den nächsten Interessenten.",
  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "In den ersten drei Monaten nach dem Relaunch: neun zusätzliche Mandate, ohne einen einzigen gekauften Lead.",
  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor der *ersten* Kampagne wissen wollen.",
  ...faq.defaults,
  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihre *Kette*.",
  [`${S}finale.text_vor`]: "Objektakquise ist ein Baustein unter mehreren. Vertiefend zu einzelnen Kanälen:",
  [`${S}finale.text_link1`]: "Eigentümer-Leads generieren",
  [`${S}finale.text_mitte1`]: "und",
  [`${S}finale.text_link2`]: "Alleinauftrag gewinnen",
  [`${S}finale.text_mitte2`]: ". Den Überblick über alle Bausteine zeigt der",
  [`${S}finale.text_link3`]: "Immobilienmarketing-Hub",
  [`${S}finale.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}finale.cta_hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",
  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel (ein *Wort* = Highlighter)",
  [`${S}hero.intro`]: "Hero · Intro-Absatz",
  [`${S}hero.cta_label`]: "Hero · Button-Text",
  [`${S}hero.cta_hinweis`]: "Hero · Hinweis neben dem Button",
  [`${S}problem.eyebrow`]: "Problem · Eyebrow",
  [`${S}problem.titel`]: "Problem · Titel (ein *Wort* = Highlighter)",
  ...pains.labels,
  [`${S}strategien.eyebrow`]: "Vergleichstabelle · Eyebrow",
  [`${S}strategien.titel`]: "Vergleichstabelle · Titel (ein *Wort* = Highlighter)",
  [`${S}strategien.sub`]: "Vergleichstabelle · Subline",
  [`${S}strategien.spalte_rang`]: "Vergleichstabelle · Spalte Rang",
  [`${S}strategien.spalte_name`]: "Vergleichstabelle · Spalte Strategie",
  [`${S}strategien.spalte_aufwand`]: "Vergleichstabelle · Spalte Aufwand",
  [`${S}strategien.spalte_wirkung`]: "Vergleichstabelle · Spalte Erste Wirkung",
  [`${S}strategien.spalte_eignung`]: "Vergleichstabelle · Spalte Eignung",
  ...strategien.labels,
  [`${S}strategien.fazit`]: "Vergleichstabelle · Fazit-Absatz darunter",
  [`${S}unterschied.label`]: "Der Unterschied · Vorspann",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",
  [`${S}beweis.label`]: "Beweis · Vorspann",
  [`${S}beweis.text`]: "Beweis · Text",
  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,
  [`${S}finale.label`]: "Finale · Vorspann",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.text_vor`]: "Finale · Textlink-Satz · Teil vor dem ersten Link",
  [`${S}finale.text_link1`]: "Finale · Textlink-Satz · Link zu Eigentümer-Leads generieren",
  [`${S}finale.text_mitte1`]: "Finale · Textlink-Satz · Teil zwischen den ersten beiden Links",
  [`${S}finale.text_link2`]: "Finale · Textlink-Satz · Link zu Alleinauftrag gewinnen",
  [`${S}finale.text_mitte2`]: "Finale · Textlink-Satz · Teil vor dem Hub-Link",
  [`${S}finale.text_link3`]: "Finale · Textlink-Satz · Link zum Immobilienmarketing-Hub",
  [`${S}finale.cta_label`]: "Finale · Button-Text",
  [`${S}finale.cta_hinweis`]: "Finale · Hinweis unter dem Button",
};
