import { listeRegistrieren } from "../lesen";

/** Studio-Texte /makler-positionierung — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "makler-positionierung",
  titel: "Makler-Positionierung",
  route: "/makler-positionierung",
};
const S = "s.makler-positionierung.";

const problem = listeRegistrieren(
  "makler-positionierung",
  "problem",
  "Einwand",
  [
    {
      quote:
        "Sie verkaufen Eigentumswohnungen, Häuser, Gewerbeflächen und Grundstücke, und sind für keins davon die erste Adresse.",
      antwort:
        "Wer alles anbietet, wird für nichts als Erster genannt. Ein Eigentümer mit einer denkmalgeschützten Villa und ein Investor mit einem Mehrfamilienhaus suchen beide einen Spezialisten für ihren Fall, nicht einen Generalisten für alle Fälle.",
    },
    {
      quote:
        "Jede Empfehlung beginnt mit „Der macht eigentlich alles“, nie mit einem Namen für einen bestimmten Fall.",
      antwort:
        "Empfehlungen funktionieren über Zuordnung: ein Name für eine Situation. Ohne erkennbare Spezialisierung bleibt die Empfehlung vage, und vage Empfehlungen führen seltener zum Anruf als eine, die genau passt.",
    },
    {
      quote: "Bei der Provisionsverhandlung haben Sie kein Argument außer dem Preis.",
      antwort:
        "Ein Generalist konkurriert über den Preis, weil er sonst nichts hat, das ihn unterscheidet. Ein Spezialist verhandelt über die Passung: über Marktkenntnis, die kein Vergleichsangebot bieten kann.",
    },
  ],
  { quote: "Zitat", antwort: "Antwort" },
);

const achsen = listeRegistrieren(
  "makler-positionierung",
  "achsen",
  "Achse",
  [
    {
      titel: "Zielgruppe",
      text: "Für wen genau Sie arbeiten, nicht nur was Sie vermitteln.",
      beispiel_1: "Kapitalanleger, die Rendite und Cashflow verstehen wollen",
      beispiel_2: "Erstkäufer-Familien, die Begleitung durch den Prozess brauchen",
      beispiel_3: "Ruheständler, die von einem großen Haus in eine kleinere Wohnung wechseln",
    },
    {
      titel: "Objektklasse",
      text: "Welcher Immobilientyp Ihre Marktkenntnis am tiefsten macht.",
      beispiel_1: "Altbau-Eigentumswohnungen mit ihren typischen Sanierungsfragen",
      beispiel_2: "Mehrfamilienhäuser als Kapitalanlage mit Renditerechnung",
      beispiel_3: "Denkmalgeschützte Immobilien mit eigenen Auflagen und Förderwegen",
    },
    {
      titel: "Region",
      text: "Wie eng der Radius ist, in dem Sie jede Straße kennen.",
      beispiel_1: "Drei Stadtteile statt einer ganzen Stadt",
      beispiel_2: "Eine Kleinstadt statt einer ganzen Region",
      beispiel_3: "Ein Umkreis, den Sie an einem Vormittag abfahren können",
    },
  ],
  {
    titel: "Titel",
    text: "Text",
    beispiel_1: "Beispiel 1",
    beispiel_2: "Beispiel 2",
    beispiel_3: "Beispiel 3",
  },
);

const faq = listeRegistrieren(
  "makler-positionierung",
  "faq",
  "FAQ",
  [
    {
      frage: "Verliere ich Aufträge, wenn ich mich spezialisiere?",
      antwort:
        "Kurzfristig lehnen Sie vereinzelt Anfragen außerhalb Ihrer Achse ab. Mittelfristig gewinnen Sie mehr, weil Empfehlungen und Suchanfragen Sie gezielter erreichen. Die meisten Makler, die spezialisieren, berichten von mehr passenden statt weniger Anfragen insgesamt.",
    },
    {
      frage: "Wie eng sollte die Positionierung sein?",
      antwort:
        "So eng, dass Sie in einem Satz erklärbar bleibt, und so weit, dass genug Fälle in Ihrem Markt hineinfallen. Eine Kombination aus zwei Achsen, etwa Objektklasse und Region, reicht in den meisten Märkten für eine klare Position.",
    },
    {
      frage: "Was, wenn meine Stadt zu klein für eine Nische ist?",
      antwort:
        "Dann positionieren Sie sich über die Region statt über die Objektklasse: In einer Kleinstadt reicht oft schon, die eine erkennbare Adresse für den gesamten Ort zu sein, weil dort kaum ein Mitbewerber überhaupt eine erkennbare Marke aufgebaut hat.",
    },
    {
      frage: "Kann ich die Positionierung später ändern?",
      antwort:
        "Ja, aber nicht beiläufig. Ein Wechsel der Achse bedeutet neue Inhalte, neue Bildwelt und neue Botschaft, und braucht Zeit, bis der Markt die neue Zuordnung übernimmt. Ein sauberer Rebrand ist dafür der richtige Rahmen, kein stiller Umbau nebenbei.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Makler-Positionierung: Spezialist schlägt Bauchladen | beuwy",
  [`${S}meta.beschreibung`]:
    "Makler-Positionierung: warum der Spezialist mehr verdient als der Bauchladen, über Zielgruppe, Objektklasse und Region zur Provision, die sich verteidigt.",
  [`${S}meta.og_beschreibung`]:
    "Drei Achsen der Positionierung, Zielgruppe, Objektklasse und Region, und warum der Spezialisten-Effekt eine Provision verteidigt, die der Bauchladen nicht halten kann.",

  [`${S}hero.eyebrow`]: "Wachstum",
  [`${S}hero.titel`]: "Warum der *Spezialist* mehr verdient als der Bauchladen.",
  [`${S}hero.text`]:
    "Sie positionieren sich als Makler richtig, indem Sie sich auf eine Zielgruppe, eine Objektklasse oder eine Region festlegen, statt jedes Objekt in jeder Preisklasse anzunehmen. Diese Schärfe wirkt zunächst wie ein Verzicht auf Umsatz, verändert aber, wie Eigentümer und Empfehlungsgeber Sie wahrnehmen: als die Adresse für einen Fall, nicht als eine von zwanzig austauschbaren Optionen. Genau dieser Unterschied verteidigt später die Provision, wenn ein Eigentümer drei Angebote vergleicht.",
  [`${S}hero.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",
  [`${S}hero.bild_alt`]: "Makler prüft am Tisch Objektunterlagen einer einzelnen Nische",

  [`${S}problem.eyebrow`]: "Woran man einen Bauchladen erkennt",
  [`${S}problem.titel`]: "Wer für *alle* da ist, ist für niemanden die erste Wahl.",
  ...problem.defaults,

  [`${S}achsen.eyebrow`]: "Die drei Achsen",
  [`${S}achsen.titel`]: "Zielgruppe, Objektklasse, *Region*: wählen Sie mindestens eine scharf.",
  [`${S}achsen.sub`]:
    "Eine einzelne scharfe Achse reicht oft schon. Zwei kombiniert, etwa Objektklasse und Region, ergeben in den meisten Märkten eine unverwechselbare Position.",
  ...achsen.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Ein Spezialist verhandelt nicht über den Preis.",
  [`${S}unterschied.text`]:
    "Er verhandelt über die Passung. Wer als einziger im Markt genau diese Objektklasse in genau dieser Region kennt, hat ein Argument, das kein Vergleichsangebot unterbieten kann: Es gibt keine Alternative, die dieselbe Marktkenntnis mitbringt.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.titel`]:
    "Ein Familienunternehmen, klar auf die Rhein-Neckar-Region positioniert: in den ersten drei Monaten nach dem Relaunch neun zusätzliche Mandate, ohne einen einzigen gekauften Lead.",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor der *ersten* Nische wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Finden wir Ihre *Achse*.",
  [`${S}finale.text_a`]: "Positionierung ist der erste Schritt, Marke der zweite. Mehr dazu in",
  [`${S}finale.link_ueber`]: "Über uns",
  [`${S}finale.text_b`]: "und im vertiefenden Artikel",
  [`${S}finale.link_marke`]: "Markenaufbau für Makler",
  [`${S}finale.text_c`]: ". Den Überblick über alle Bausteine zeigt der",
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
  [`${S}hero.text`]: "Wissens-Kopf · Intro-Absatz",
  [`${S}hero.cta_label`]: "Wissens-Kopf · Knopf-Text",
  [`${S}hero.cta_hinweis`]: "Wissens-Kopf · Hinweis neben dem Knopf",
  [`${S}hero.bild_alt`]: "Foto-Band · Bild-Alt-Text",

  [`${S}problem.eyebrow`]: "Problem · Eyebrow",
  [`${S}problem.titel`]: "Problem · Titel (ein *Wort* = Highlighter)",
  ...problem.labels,

  [`${S}achsen.eyebrow`]: "Achsen · Eyebrow",
  [`${S}achsen.titel`]: "Achsen · Titel (ein *Wort* = Highlighter)",
  [`${S}achsen.sub`]: "Achsen · Subline",
  ...achsen.labels,

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.titel`]: "Beweis · Titel",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.text_a`]: "Finale · Satz, Teil vor Link 1",
  [`${S}finale.link_ueber`]: "Finale · Link-Text (Über uns)",
  [`${S}finale.text_b`]: "Finale · Satz, Teil zwischen Link 1 und 2",
  [`${S}finale.link_marke`]: "Finale · Link-Text (Markenaufbau für Makler)",
  [`${S}finale.text_c`]: "Finale · Satz, Teil zwischen Link 2 und 3",
  [`${S}finale.link_hub`]: "Finale · Link-Text (Immobilienmarketing-Hub)",
  [`${S}finale.text_d`]: "Finale · Satz-Ende",
  [`${S}finale.cta_label`]: "Finale · Knopf-Text",
  [`${S}finale.cta_hinweis`]: "Finale · Hinweis unter dem Knopf",
};
