import { listeRegistrieren } from "../lesen";

/** Studio-Texte /geo-fuer-immobilienmakler — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "geo-fuer-immobilienmakler", titel: "GEO für Immobilienmakler", route: "/geo-fuer-immobilienmakler" };
const S = "s.geo-fuer-immobilienmakler.";

const pains = listeRegistrieren("geo-fuer-immobilienmakler", "pains", "Pain", [
  {
    zitat: "„Welcher Makler in Köln ist gut?“ fragt der Eigentümer heute nicht Google. Er fragt ChatGPT.",
    antwort:
      "Nennt die Antwort drei Namen, sitzt Ihrer entweder mit am Tisch oder gar nicht. Der Eigentümer öffnet danach keine zehn blauen Links mehr, er ruft den ersten Namen an, den er gerade gehört hat.",
  },
  {
    zitat: "Google beantwortet die Frage inzwischen selbst, ganz oben, bevor der erste blaue Link überhaupt sichtbar wird.",
    antwort:
      "Die AI Overview steht über den gewohnten Ergebnissen. Wer darin nicht zitiert wird, verliert den Klick, unabhängig davon, wie gut die eigene Seite eine Zeile darunter rankt.",
  },
  {
    zitat: "Ein Blogartikel im Monat und ein paar Backlinks galten lange als Suchmaschinenoptimierung.",
    antwort:
      "Für eine KI-Antwort reicht das allein nicht. Eine KI zitiert Seiten, die eine Frage im ersten Satz eindeutig beantworten, und Firmendaten, die überall gleich lauten. Ein Blogartikel ohne diese Struktur wird beim Zusammenstellen der Antwort übersprungen.",
  },
], { zitat: "Zitat", antwort: "Antwort" });

const schritte = listeRegistrieren("geo-fuer-immobilienmakler", "schritte", "Schritt", [
  {
    titel: "Seiten, die die Frage sofort beantworten",
    text: "Jede Seite beantwortet ihre Suchfrage im ersten Absatz wörtlich, ohne Anlauf und ohne Einleitung. Genau diesen Absatz liest eine KI, wenn sie eine Antwort zusammenstellt.",
  },
  {
    titel: "Strukturierte Daten, die eine KI lesen kann",
    text: "Organisation, Leistungen und FAQ stehen als strukturierte Daten hinter jeder Seite. Eine KI liest diese Struktur zuverlässiger als einen Absatz voller Nebensätze.",
  },
  {
    titel: "llms.txt und eine Firmenkarte, die überall gleich lautet",
    text: "Eine llms.txt-Datei listet Leistungen, Zielgruppen und Zahlen maschinenlesbar auf. Name, Adresse und Telefonnummer stehen dabei überall identisch, auf der Website, in Verzeichnissen und auf dem Portal.",
  },
  {
    titel: "Verzahnung mit dem Portal",
    text: "Zitiert eine KI Ihr Büro, landet der Klick auf einer Seite, die sofort registriert: Name, Anliegen, nächster Schritt. Die KI zitiert, das Portal registriert. Kein Zitat verpufft im Nichts.",
  },
], { titel: "Titel", text: "Text" });

const faq = listeRegistrieren("geo-fuer-immobilienmakler", "faq", "FAQ", [
  {
    frage: "Was ist GEO für Immobilienmakler?",
    antwort:
      "GEO steht für Generative Engine Optimization: die Arbeit daran, dass ChatGPT, Claude oder Perplexity Ihr Büro nennen, wenn jemand nach einem Makler fragt. Statt für einen Platz in der Trefferliste zu optimieren, optimieren Sie für einen Platz in der Antwort selbst.",
  },
  {
    frage: "Was unterscheidet GEO von klassischem SEO?",
    antwort:
      "Klassisches SEO zielt auf Rankings und Klicks aus einer Ergebnisliste. GEO zielt auf Zitierfähigkeit: Eine KI liest Ihre Seite, versteht sie in einem Satz und nennt Ihren Namen in ihrer Antwort. Die Grundlagen überschneiden sich, aber Struktur und strukturierte Daten wiegen bei GEO schwerer als Backlinks.",
  },
  {
    frage: "Wie lange dauert es, bis eine KI mein Büro nennt?",
    antwort:
      "Die Struktur, literale Antworten, strukturierte Daten und llms.txt, steht in vier bis sechs Wochen. Wann eine KI zum ersten Mal zitiert, hängt zusätzlich vom Modell und der Konkurrenz in Ihrer Stadt ab. Das besprechen wir ehrlich im Gespräch, statt einen pauschalen Termin zu versprechen.",
  },
  {
    frage: "Was kostet GEO für Immobilienmakler?",
    antwort:
      "Das hängt vom Umfang Ihres bestehenden Auftritts ab. Ein Gespräch klärt das in dreißig Minuten, mit einer konkreten Einschätzung statt einer Preisliste von der Stange.",
  },
  {
    frage: "Funktioniert das auch für kleinere Städte?",
    antwort:
      "Gerade dort. Eine KI-Antwort auf „Makler in einer Kleinstadt mit 20.000 Einwohnern“ nennt oft nur ein oder zwei Namen, weil kaum jemand die Struktur dafür baut. Wer dort zuerst steht, bleibt lange stehen.",
  },
], { frage: "Frage", antwort: "Antwort" });

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "GEO für Immobilienmakler: Sichtbar in ChatGPT & KI-Suche | beuwy",
  [`${S}meta.beschreibung`]:
    "GEO für Immobilienmakler heißt: Ihr Büro taucht in den Antworten von ChatGPT, Claude und Perplexity auf, wenn Eigentümer nach einem Makler fragen. beuwy baut die Struktur dafür, in Wochen statt Quartalen.",
  [`${S}meta.og_titel`]: "GEO für Immobilienmakler: Sichtbar in ChatGPT & KI-Suche | beuwy",
  [`${S}meta.og_beschreibung`]:
    "beuwy baut die Struktur, die KI-Antworten zitierfähig macht: literale Antworten, strukturierte Daten, llms.txt und ein Portal, das jede Anfrage auffängt.",

  [`${S}hero.messbar_label`]: "Messbar, nicht behauptet",
  [`${S}hero.eyebrow`]: "GEO für Immobilienmakler",
  [`${S}hero.titel`]: "GEO für Immobilienmakler: Ihr Name in der *Antwort*, bevor der erste blaue Link erscheint.",
  [`${S}hero.sub_vor`]:
    "Eigentümer fragen heute nicht mehr nur Google. Sie fragen ChatGPT, Claude oder Perplexity nach einem Makler in ihrer Stadt, und die Antwort",
  [`${S}hero.sub_highlight`]: "nennt nur eine Handvoll Namen",
  [`${S}hero.sub_nach`]: ".",
  [`${S}hero.cta`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",

  [`${S}problem.eyebrow`]: "Was GEO bedeutet",
  [`${S}problem.titel`]: "Wer in der *Antwort* fehlt, existiert für diesen Eigentümer nicht.",
  [`${S}problem.text`]:
    "GEO, Generative Engine Optimization, ist die Arbeit daran, dass ChatGPT, Claude oder Perplexity Ihr Büro nennen, wenn ein Eigentümer nach einem Makler fragt. Das Ziel heißt Zitierfähigkeit: Eine KI-Antwort spricht Ihren Namen aus, mit Ort und Leistung, statt nur einen blauen Link in einer Ergebnisliste zu zeigen. Für Immobilienmakler zählt das, weil genau diese Frage heute zuerst in einem Chat-Fenster landet, nicht mehr in einer Suchleiste.",
  ...pains.defaults,

  [`${S}system.eyebrow`]: "Der Mechanismus",
  [`${S}system.titel`]: "Vier Bausteine, damit eine KI Ihren Namen *kennt*.",
  [`${S}system.sub`]:
    "Kein Trick, keine Abkürzung. Struktur, die eine KI lesen kann, und ein Portal, das den Klick auffängt, sobald sie zitiert.",
  ...schritte.defaults,

  [`${S}abgrenzung.label`]: "Die Abgrenzung",
  [`${S}abgrenzung.titel`]: "Zehn weitere Backlinks sind kein GEO.",
  [`${S}abgrenzung.text1`]:
    "Agenturen verkaufen GEO gern als denselben alten Trick mit neuem Namen: ein Blogartikel im Monat, ein paar Backlinks, fertig.",
  [`${S}abgrenzung.text2`]:
    "Wir bauen Struktur, die eine KI tatsächlich liest: literale Antworten, strukturierte Daten, ein konsistentes Firmenprofil und ein Portal, das jede Anfrage auffängt. Als Unternehmensberatung mit einem festen Ansprechpartner, nicht als Agentur, die ein Werbemittel abliefert und wieder verschwindet.",

  [`${S}beweis.label`]: "Beweis, kein Buzzword",
  [`${S}beweis.titel`]: "*Siebzehn* Jahre Systematik, jetzt auf Antworten übersetzt.",
  [`${S}beweis.text_vor`]:
    "Was seit siebzehn Jahren für Marken funktioniert, gilt jetzt für Antworten: Eine klare, belegte Position wird zitiert, eine reine Behauptung wird übersprungen. Klassische Suchmaschinenoptimierung bleibt das Fundament darunter, mehr dazu auf der Schwesterseite",
  [`${S}beweis.text_link`]: "SEO für Immobilienmakler",
  [`${S}beweis.text_nach`]: ".",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem ersten *Gespräch* wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir die Struktur, die eine KI *zitiert*.",
  [`${S}finale.text_vor`]:
    "GEO ist ein Baustein unter mehreren. Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.text_link1`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_mid`]: ", Referenzen in den",
  [`${S}finale.text_link2`]: "Fallstudien",
  [`${S}finale.text_nach`]: ".",
  [`${S}finale.cta`]: "Zusammenarbeit anfragen",
  [`${S}finale.hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · Open-Graph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",

  [`${S}hero.messbar_label`]: "Hero · Floating Card · Label",
  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel (ein *Wort* = Highlighter)",
  [`${S}hero.sub_vor`]: "Hero · Subline · Teil vor dem Highlight",
  [`${S}hero.sub_highlight`]: "Hero · Subline · Highlight-Wortgruppe",
  [`${S}hero.sub_nach`]: "Hero · Subline · Satzende nach dem Highlight",
  [`${S}hero.cta`]: "Hero · CTA-Text",
  [`${S}hero.cta_hinweis`]: "Hero · Mikrozeile unter dem CTA",

  [`${S}problem.eyebrow`]: "Problem · Eyebrow",
  [`${S}problem.titel`]: "Problem · Titel (*Wort* = Highlighter)",
  [`${S}problem.text`]: "Problem · Einleitungsabsatz",

  [`${S}system.eyebrow`]: "Mechanismus · Eyebrow",
  [`${S}system.titel`]: "Mechanismus · Titel (*Wort* = Highlighter)",
  [`${S}system.sub`]: "Mechanismus · Subline",

  [`${S}abgrenzung.label`]: "Abgrenzung · Label",
  [`${S}abgrenzung.titel`]: "Abgrenzung · Titel",
  [`${S}abgrenzung.text1`]: "Abgrenzung · Absatz 1",
  [`${S}abgrenzung.text2`]: "Abgrenzung · Absatz 2",

  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.titel`]: "Beweis · Titel (*Wort* = Highlighter)",
  [`${S}beweis.text_vor`]: "Beweis · Absatz · Teil vor dem Link",
  [`${S}beweis.text_link`]: "Beweis · Absatz · Linktext (Schwesterseite SEO)",
  [`${S}beweis.text_nach`]: "Beweis · Absatz · Satzende nach dem Link",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (*Wort* = Highlighter)",

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (*Wort* = Highlighter)",
  [`${S}finale.text_vor`]: "Finale · Absatz · Teil vor Link 1",
  [`${S}finale.text_link1`]: "Finale · Absatz · Linktext (Hub)",
  [`${S}finale.text_mid`]: "Finale · Absatz · Teil zwischen den Links",
  [`${S}finale.text_link2`]: "Finale · Absatz · Linktext (Fallstudien)",
  [`${S}finale.text_nach`]: "Finale · Absatz · Satzende",
  [`${S}finale.cta`]: "Finale · CTA-Text",
  [`${S}finale.hinweis`]: "Finale · Mikrozeile unter dem CTA",

  ...pains.labels,
  ...schritte.labels,
  ...faq.labels,
};
