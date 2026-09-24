import { listeRegistrieren } from "../lesen";

/** Studio-Texte /bottimmo-erfahrungen — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "bottimmo-erfahrungen",
  titel: "BOTTIMMO Erfahrungen",
  route: "/bottimmo-erfahrungen",
};
const S = "s.bottimmo-erfahrungen.";

const staerken = listeRegistrieren(
  "bottimmo-erfahrungen",
  "staerken",
  "Stärke",
  [
    {
      titel: "Schnell startklar",
      text: "Website, Anzeigenvorlagen und Funnel stehen in kurzer Zeit, ohne dass ein Büro bei null anfängt. Für den ersten eigenen Online-Auftritt ein echter Vorteil.",
    },
    {
      titel: "Fertige Themenwelt",
      text: "Ratgeberartikel und Inhalte zu Standardfragen liegen bereits vor, statt dass jemand im Büro sie selbst schreiben muss. Das füllt eine Website, die sonst leer bliebe.",
    },
    {
      titel: "Wartung inklusive",
      text: "Updates, technische Pflege und die laufende Funktionsfähigkeit übernimmt der Anbieter. Niemand im Büro muss sich um ein CMS oder ein Sicherheitsupdate kümmern.",
    },
    {
      titel: "Überschaubares Budget",
      text: "Die monatlichen Kosten bewegen sich im dreistelligen Bereich, planbar und ohne größere Vorabinvestition. Ein kalkulierbarer Einstieg für ein kleines Marketingbudget.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const vergleich = listeRegistrieren(
  "bottimmo-erfahrungen",
  "vergleich",
  "Kriterium",
  [
    { kriterium: "Erster Online-Auftritt", reicht: "Ja, schnell und ohne Vorlaufzeit online", grenze: "—" },
    {
      kriterium: "Design und Bildsprache",
      reicht: "Ausreichend für ein Büro ohne Markenanspruch",
      grenze: "Vorlage, dieselbe wie bei anderen Kunden desselben Systems",
    },
    {
      kriterium: "Inhalte und Ratgeber",
      reicht: "Solide Standardtexte für den Einstieg",
      grenze: "Gemietet, laufen mit der Lizenz aus, keine eigene Stimme",
    },
    {
      kriterium: "Wettbewerb in derselben Stadt",
      reicht: "Unauffällig, solange kein Mitbewerber dasselbe System nutzt",
      grenze: "Zwei Häuser mit demselben Baukasten wirken austauschbar",
    },
    {
      kriterium: "Alleinauftrag gegen den Marktführer",
      reicht: "—",
      grenze: "Ein Vorlagen-Auftritt verliert gegen eine eigene Marke",
    },
    {
      kriterium: "Eigentum am Ergebnis",
      reicht: "—",
      grenze: "Website und Inhalte laufen nur, solange die Lizenz läuft",
    },
  ],
  { kriterium: "Kriterium", reicht: "Spalte Baukasten reicht", grenze: "Spalte Baukasten stößt an Grenze" },
);

const faq = listeRegistrieren(
  "bottimmo-erfahrungen",
  "faq",
  "FAQ",
  [
    {
      frage: "Ist BOTTIMMO für Makler grundsätzlich zu empfehlen?",
      antwort:
        "Für den ersten eigenen Online-Auftritt und ein überschaubares Marketingbudget ja. Das Paket bringt ein Büro schnell und ohne Vorlaufzeit online, ohne dass jemand bei null anfängt.",
    },
    {
      frage: "Woran erkenne ich, dass ich aus dem Baukasten herausgewachsen bin?",
      antwort:
        "Wenn Eigentümer Sie mit einem Mitbewerber vergleichen, der eine eigene Marke zeigt, und Sie den Alleinauftrag genau dort verlieren. Oder wenn ein Konkurrent in derselben Stadt dasselbe System nutzt und beide Auftritte sich kaum unterscheiden.",
    },
    {
      frage: "Muss ich BOTTIMMO kündigen, um zu wechseln?",
      antwort:
        "Das entscheiden Sie unabhängig von uns, meist läuft der Wechsel parallel: das neue Portal steht, bevor die alte Lizenz endet, damit kein Tag ohne Website vergeht.",
    },
    {
      frage: "Was kostet ein eigenes Portal im Vergleich zum Baukasten?",
      antwort:
        "Ein eigenes Portal ist eine höhere Investition im Voraus, dafür gehört Ihnen das Ergebnis dauerhaft, statt an eine laufende Lizenz gebunden zu sein. Einen konkreten Betrag nennen wir erst nach dem ersten Gespräch über Ihren Markt.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "BOTTIMMO Erfahrungen 2026: Was der Baukasten kann und was nicht | beuwy",
  [`${S}meta.beschreibung`]:
    "BOTTIMMO Erfahrungen 2026: der faire Blick auf Tempo und Themenwelt gegen die Grenze aus Vorlage und gemieteten Inhalten. Wann der Baukasten reicht, wann nicht.",
  [`${S}meta.og_beschreibung`]:
    "Der faire Vergleich: BOTTIMMO liefert Tempo und eine fertige Themenwelt, die Grenze ist die geteilte Vorlage. Wann ein eigenes Portal mehr bringt als der Baukasten.",

  [`${S}hero.eyebrow`]: "Erfahrungsbericht · BOTTIMMO",
  [`${S}hero.titel`]: "BOTTIMMO Erfahrungen 2026: was der Baukasten *wirklich* kann.",
  [`${S}hero.text_vor`]:
    "BOTTIMMO liefert ein schnelles, fertiges Marketing-Paket: eigene Website, vorgefertigte Anzeigen und eine breite Themenwelt an Ratgeberinhalten, in kurzer Zeit startklar. Für den ersten eigenen Online-Auftritt ist das eine solide Lösung. Die Grenze liegt im System selbst:",
  [`${S}hero.text_mitte`]:
    "Design, Funnel und Inhalte laufen als Vorlage bei vielen anderen Maklern im selben Markt parallel",
  [`${S}hero.text_nach`]:
    ". Ob das reicht, hängt vom Anspruch ab: als Einstieg gut, als Unterscheidung gegen den führenden Makler der Stadt nicht.",
  [`${S}hero.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",
  [`${S}hero.bild_alt`]:
    "Makler prüft am Bildschirm die eigene Website neben einem Baukasten-Vorlagenraster",

  [`${S}staerken.eyebrow`]: "Was der Baukasten gut kann",
  [`${S}staerken.titel`]: "Vier *Stärken*, ohne die BOTTIMMO nicht so verbreitet wäre.",
  ...staerken.defaults,

  [`${S}vergleich.eyebrow`]: "Der ehrliche Vergleich",
  [`${S}vergleich.titel`]: "Sechs Kriterien: wann der Baukasten *reicht*, wann nicht.",
  [`${S}vergleich.sub`]:
    "Keine Wertung über BOTTIMMO als System, sondern über die Frage, die zählt: passt eine geteilte Vorlage zu Ihrem Anspruch in Ihrer Stadt?",
  [`${S}vergleich.kopf_nr`]: "Nr.",
  [`${S}vergleich.kopf_kriterium`]: "Kriterium",
  [`${S}vergleich.kopf_reicht`]: "Baukasten reicht",
  [`${S}vergleich.kopf_grenze`]: "Baukasten stößt an Grenze",
  ...vergleich.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Der Baukasten ist Handwerk. Eine Marke ist es nicht.",
  [`${S}unterschied.text`]:
    "BOTTIMMO baut zuverlässig, was jedes Büro braucht. Nur baut es dasselbe auch für den Mitbewerber zwei Straßen weiter. Eine Marke entscheidet den Alleinauftrag genau da, wo die Vorlage aufhört.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.titel`]:
    "In den ersten drei Monaten nach dem Relaunch mit eigener Marke statt Vorlage: neun zusätzliche Mandate. RIEGEL Immobilien belegt zudem Platz 21 von über 25.000 Maklern beim ImmoScout24-Award.",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor der *Entscheidung* wissen wollen.",
  ...faq.defaults,
  [`${S}faq.hinweis`]: "BOTTIMMO ist eine Marke der BOTTIMMO AG. beuwy steht in keiner Verbindung zu BOTTIMMO.",

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihre *Marke*, nicht die nächste Vorlage.",
  [`${S}finale.text_a`]: "Den fairen Vergleich mit ausführlicher Gegenüberstellung lesen Sie unter",
  [`${S}finale.link_alternative`]: "BOTTIMMO-Alternative",
  [`${S}finale.text_b`]: ", was ein eigenes Portal kostet zeigt",
  [`${S}finale.link_kosten`]: "Maklerwebsite-Kosten",
  [`${S}finale.text_c`]: ". Den Überblick über alle Bausteine finden Sie im",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
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

  [`${S}staerken.eyebrow`]: "Stärken · Eyebrow",
  [`${S}staerken.titel`]: "Stärken · Titel (ein *Wort* = Highlighter)",
  ...staerken.labels,

  [`${S}vergleich.eyebrow`]: "Vergleich · Eyebrow",
  [`${S}vergleich.titel`]: "Vergleich · Titel (ein *Wort* = Highlighter)",
  [`${S}vergleich.sub`]: "Vergleich · Subline",
  [`${S}vergleich.kopf_nr`]: "Vergleich · Tabellenkopf „Nr.“",
  [`${S}vergleich.kopf_kriterium`]: "Vergleich · Tabellenkopf „Kriterium“",
  [`${S}vergleich.kopf_reicht`]: "Vergleich · Tabellenkopf „Baukasten reicht“",
  [`${S}vergleich.kopf_grenze`]: "Vergleich · Tabellenkopf „Baukasten stößt an Grenze“",
  ...vergleich.labels,

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.titel`]: "Beweis · Titel",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,
  [`${S}faq.hinweis`]: "FAQ · Markenhinweis (Fußzeile)",

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.text_a`]: "Finale · Satz, Teil vor Link 1",
  [`${S}finale.link_alternative`]: "Finale · Link-Text (BOTTIMMO-Alternative)",
  [`${S}finale.text_b`]: "Finale · Satz, Teil zwischen Link 1 und 2",
  [`${S}finale.link_kosten`]: "Finale · Link-Text (Maklerwebsite-Kosten)",
  [`${S}finale.text_c`]: "Finale · Satz, Teil zwischen Link 2 und 3",
  [`${S}finale.link_hub`]: "Finale · Link-Text (Immobilienmarketing-Hub)",
  [`${S}finale.text_d`]: "Finale · Satz-Ende",
  [`${S}finale.cta_label`]: "Finale · Knopf-Text",
  [`${S}finale.cta_hinweis`]: "Finale · Hinweis unter dem Knopf",
};
