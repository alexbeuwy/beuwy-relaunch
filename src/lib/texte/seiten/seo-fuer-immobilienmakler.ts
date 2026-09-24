import { listeRegistrieren } from "../lesen";

/** Studio-Texte /seo-fuer-immobilienmakler — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "seo-fuer-immobilienmakler", titel: "SEO für Immobilienmakler", route: "/seo-fuer-immobilienmakler" };
const S = "s.seo-fuer-immobilienmakler.";

const pains = listeRegistrieren(
  "seo-fuer-immobilienmakler",
  "pains",
  "Einwand",
  [
    {
      quote: "Wer „Immobilienmakler [Ihre Stadt]“ sucht, sieht zwei Portale und drei Konkurrenten vor Ihnen.",
      answer:
        "Portale und große Ketten arbeiten seit Jahren an genau dieser Suchfrage. Ohne eine Seite, die exakt auf Ihre Stadt und Ihre Leistung zugeschnitten ist, tritt Ihre Startseite gegen einen Gegner an, der strukturell nicht zu schlagen ist.",
    },
    {
      quote: "Ihre Seite steht auf Platz 8. Genauso gut könnte sie offline sein.",
      answer:
        "Fast jeder Klick geht an die ersten drei Treffer. Platz 8 bedeutet: Die Seite existiert für Google, aber nicht für den Eigentümer, der gerade sucht. Ein Ranking, das niemand sieht, bringt keine Anfrage.",
    },
    {
      quote: "Der Blogartikel bringt Besucher. Eigentümer bringt er keine.",
      answer:
        "Ein Text zu einer allgemeinen Frage zieht Leser an, die sich informieren, nicht verkaufen wollen. Ohne Bezug zur Suchintention eines Verkäufers bleibt der Artikel eine Zahl im Analytics-Tool, kein Kontakt im Postfach.",
    },
    {
      quote: "Die eigene Website rankt für den Firmennamen. Für sonst nichts.",
      answer:
        "Wer nach Ihrem Namen sucht, kennt Sie bereits. SEO, das nur den Firmennamen bedient, holt niemanden neu ab. Die Eigentümer, die noch keinen Makler kennen, finden Sie über diese Seite gar nicht erst.",
    },
  ],
  { quote: "Zitat", answer: "Antwort" },
);

const schritte = listeRegistrieren(
  "seo-fuer-immobilienmakler",
  "schritte",
  "Schritt",
  [
    {
      titel: "Eine Seite pro Suchfrage",
      text: "„Makler in [Stadt]“, „Wohnung verkaufen [Stadt]“, „Maklerprovision [Region]“: Jede Suchfrage bekommt eine eigene Seite, die genau diese Frage beantwortet. Google ordnet jede Seite einer Absicht zu, statt eine Startseite gegen zehn Absichten gleichzeitig antreten zu lassen.",
    },
    {
      titel: "Lokale Landingpages",
      text: "Jede Stadt und jeder Stadtteil, in dem Sie tätig sind, bekommt eine eigene Landingpage mit echten lokalen Bezugspunkten. Wer „Makler Musterstadt-Nord“ eingibt, findet eine Seite, die genau davon handelt.",
    },
    {
      titel: "Ranking-Assets, die etwas zu zeigen haben",
      text: "Ein Bewertungsrechner mit echten Bodenrichtwerten, ein Marktbericht, eine Fallstudie mit belegten Zahlen: Inhalte, die Google als hilfreiche Antwort einstuft und die kein Mitbewerber in einer Woche kopiert.",
    },
    {
      titel: "Ein Fundament, das nicht beim Klick endet",
      text: "Das Portal lädt schnell, trägt strukturierte Daten und verlinkt jede Seite sauber mit der nächsten. Wer über die Suche kommt, wird registriert und qualifiziert, bevor das erste Telefonat überhaupt stattfindet.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const faq = listeRegistrieren(
  "seo-fuer-immobilienmakler",
  "faq",
  "FAQ",
  [
    {
      q: "Wie lange dauert es, bis erste Rankings sichtbar werden?",
      a: "Die Seitenarchitektur und die ersten lokalen Landingpages stehen innerhalb von vier bis sechs Wochen. Bis Google eine neue Seite einordnet und sie auf den vorderen Plätzen zeigt, vergehen meist weitere Wochen bis Monate, abhängig von Ihrer Stadt und der dortigen Konkurrenz. Eine feste Zahl nennen wir erst, wenn wir Ihren Markt kennen.",
    },
    {
      q: "Lohnt sich SEO auch in kleinen Städten?",
      a: "Ja, mit angepasster Erwartung. In einer Kleinstadt suchen weniger Menschen gleichzeitig einen Makler als in einer Großstadt, also kommen weniger Anfragen. Dafür reicht dort oft schon eine sauber gebaute Landingpage für Platz eins, weil kaum ein Mitbewerber überhaupt eine eigene Seite für den Ort aufgebaut hat.",
    },
    {
      q: "Was ist mit Portalen wie ImmoScout?",
      a: "Bleiben Sie dort gelistet. Portale ersetzen wir nicht, wir bauen daneben die Sichtbarkeit auf, die Ihnen gehört und nicht endet, sobald das Portal-Abo ausläuft oder ein Mitbewerber mehr für dieselbe Anzeige zahlt.",
    },
    {
      q: "Schreiben Sie auch Blogartikel?",
      a: "Nur wenn ein Artikel eine echte Suchfrage beantwortet, die Eigentümer oder Käufer tatsächlich stellen. Ein Blog ohne Suchintention bringt Leser, aber keine Anfragen, deshalb bauen wir lieber die Landingpage, die genau diese Frage direkt beantwortet.",
    },
    {
      q: "Braucht es dafür eine neue Website?",
      a: "Nicht zwingend. Trägt das technische Fundament Ihrer bestehenden Seite, ziehen wir die Architektur dort ein. Laden die Seiten langsam oder fehlen strukturierte Daten, empfehlen wir den Wechsel auf ein Portal, das von Anfang an auf Suchintention ausgelegt ist.",
    },
  ],
  { q: "Frage", a: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO für Immobilienmakler: Platz 1, wenn Ihre Stadt sucht | beuwy",
  [`${S}meta.beschreibung`]:
    "SEO für Immobilienmakler heißt: eine Seite pro Suchfrage, lokale Landingpages und ein technisches Fundament, das lädt, bevor der nächste Tab offen ist. beuwy baut das Portal, das rankt und jeden Besucher registriert.",
  [`${S}meta.og_titel`]: "SEO für Immobilienmakler: Platz 1, wenn Ihre Stadt sucht | beuwy",
  [`${S}meta.og_beschreibung`]:
    "beuwy baut die Seitenarchitektur, die lokalen Landingpages und das technische Fundament, damit Sie ranken, wenn Ihre Stadt sucht, nicht nur, wenn jemand Ihren Namen kennt.",

  [`${S}hero.karte_label`]: "Beweis, keine Behauptung",
  [`${S}hero.eyebrow`]: "SEO für Immobilienmakler",
  [`${S}hero.titel`]: "SEO für Immobilienmakler, das *Platz eins* bringt, nicht Platz acht.",
  [`${S}hero.text_vor`]:
    "SEO für Immobilienmakler heißt nicht, für den eigenen Namen zu ranken und sonst für nichts. Es heißt, für jede Suchfrage, die ein Eigentümer in Ihrer Stadt eingibt,",
  [`${S}hero.text_hervor`]:
    "die passende Seite bereitzuhalten und jeden Besucher zu registrieren, sobald er da ist",
  [`${S}hero.text_nach`]: ".",
  [`${S}hero.cta`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_note`]: "Antwort innerhalb von 24 Stunden",

  [`${S}antwort.eyebrow`]: "Kurz beantwortet",
  [`${S}antwort.titel`]: "Was *SEO für Immobilienmakler* leistet, und woran es meistens scheitert.",
  [`${S}antwort.sub`]:
    "SEO für Immobilienmakler sorgt dafür, dass Eigentümer und Käufer Sie bei Google finden, wenn sie „Makler + Stadt“ oder eine konkrete Preisfrage eingeben, nicht erst, nachdem sie durch drei Portale gescrollt sind. Dafür braucht es eine Seite pro Suchfrage, lokale Landingpages und ein technisches Fundament, das schnell lädt. Woran es in der Praxis meistens scheitert: eine einzelne Startseite, die für zehn Suchbegriffe gleichzeitig antreten soll, und ein Blog, der Besucher bringt, aber keine Eigentümer.",

  [`${S}problem.eyebrow`]: "Ranking ist nicht gleich Sichtbarkeit",
  [`${S}problem.titel`]: "Eine Seite, die *niemand* sieht, ist keine Seite, die verkauft.",
  ...pains.defaults,

  [`${S}system.eyebrow`]: "Der Mechanismus",
  [`${S}system.titel`]: "Vier Stufen. Eine Seite für jede Suchfrage, die zählt.",
  [`${S}system.sub`]:
    "beuwy arbeitet als Unternehmensberatung an Ihrer Sichtbarkeit, nicht als Agentur, die einzelne Keywords abliefert. Jede Seite ist Teil eines Portals, mit einem festen Ansprechpartner.",
  ...schritte.defaults,
  [`${S}system.geo_vor`]:
    "Google-Rankings sind der eine Kanal. Wie Sie zusätzlich in der KI-Suche auftauchen, zeigt die Schwesterseite",
  [`${S}system.geo_link`]: "GEO für Immobilienmakler",
  [`${S}system.geo_nach`]: ".",

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Platz acht ist kein Erfolg.",
  [`${S}unterschied.text`]:
    "Die meisten SEO-Angebote verkaufen eine Position in einer Tabelle. Wir bauen ein Portal, in dem jede Suchfrage ihre eigene Seite bekommt und jeder Besucher registriert wird, sobald er da ist. Kein Zusatzmodul neben der Website. Das Fundament selbst.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.titel`]:
    "In den ersten drei Monaten nach dem Relaunch: neun zusätzliche Mandate, ohne einen einzigen gekauften Lead. RIEGEL Immobilien belegt zudem Platz 21 von über 25.000 Maklern beim ImmoScout24-Award.",
  [`${S}beweis.link`]: "Weitere Fallstudien ansehen →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Gespräch wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihr *Ranking*.",
  [`${S}finale.text_vor`]: "SEO ist ein Baustein unter mehreren. Einen Überblick über alle Bausteine finden Sie im",
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

  [`${S}antwort.eyebrow`]: "Antwort · Eyebrow",
  [`${S}antwort.titel`]: "Antwort · Titel (ein *Wort* = Highlighter)",
  [`${S}antwort.sub`]: "Antwort · Subline",

  [`${S}problem.eyebrow`]: "Problem · Eyebrow",
  [`${S}problem.titel`]: "Problem · Titel (ein *Wort* = Highlighter)",
  ...pains.labels,

  [`${S}system.eyebrow`]: "Mechanismus · Eyebrow",
  [`${S}system.titel`]: "Mechanismus · Titel (ein *Wort* = Highlighter)",
  [`${S}system.sub`]: "Mechanismus · Subline",
  ...schritte.labels,
  [`${S}system.geo_vor`]: "Mechanismus · Schwesterseiten-Satz, Teil vor dem Link",
  [`${S}system.geo_link`]: "Mechanismus · Schwesterseiten-Link-Text",
  [`${S}system.geo_nach`]: "Mechanismus · Schwesterseiten-Satz, Teil nach dem Link",

  [`${S}unterschied.label`]: "Der Unterschied · Karten-Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Karten-Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Karten-Text",

  [`${S}beweis.label`]: "Beweis-Anriss · Label",
  [`${S}beweis.titel`]: "Beweis-Anriss · Text",
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
