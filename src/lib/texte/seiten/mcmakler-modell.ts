import { listeRegistrieren } from "../lesen";

/** Studio-Texte /mcmakler-modell — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "mcmakler-modell", titel: "McMakler-Modell", route: "/mcmakler-modell" };
const S = "s.mcmakler-modell.";

const staerken = listeRegistrieren(
  "mcmakler-modell",
  "staerken",
  "Stärke",
  [
    {
      label: "Standardisierter Ablauf",
      satz:
        "Jede Anfrage folgt demselben Trichter, unabhängig davon, wer im Callcenter gerade abhebt. Nichts hängt an einer einzelnen Person.",
    },
    {
      label: "Werbedruck",
      satz:
        "TV, Radio, Bannerwerbung: Der Name ist bekannt, bevor ein Eigentümer überhaupt an Verkauf denkt. Das kann kein einzelnes Büro finanziell mitgehen.",
    },
    {
      label: "Tempo",
      satz:
        "Erste Rückmeldung und Online-Bewertung laufen oft binnen Stunden. Wer schnell antwortet, gewinnt den ersten Eindruck.",
    },
    {
      label: "Skalierung",
      satz:
        "Das Modell funktioniert in jeder Stadt gleich, weil es auf Prozess statt auf lokale Beziehungen gebaut ist.",
    },
  ],
  { label: "Label", satz: "Satz" },
);

const grenzen = listeRegistrieren(
  "mcmakler-modell",
  "grenzen",
  "Grenze",
  [
    {
      quote: "Der Anruf kommt schnell. Der Mensch am Telefon wechselt trotzdem.",
      answer:
        "Ein standardisierter Prozess bedeutet selten denselben Ansprechpartner vom ersten Anruf bis zum Notartermin. Für den Eigentümer fühlt sich das nach Warteschleife an, nicht nach Beziehung.",
    },
    {
      quote: "Die Online-Bewertung ist in Minuten da. Die Besichtigung macht trotzdem jemand vor Ort.",
      answer:
        "Ein automatisierter Richtwert kennt weder die sanierte Küche noch die laute Straße. Die eigentliche Einschätzung entsteht erst, wenn jemand mit Ortskenntnis durchs Haus geht.",
    },
    {
      quote: "Das Werbebudget schlägt fast jeden Makler. Die Ortskenntnis nicht.",
      answer:
        "Reichweite lässt sich kaufen, ein über Jahre gewachsenes Netz aus Nachbarn, Notaren und früheren Kunden nicht. Das ist der eine Vorteil, den kein Marketingbudget der Welt ersetzt.",
    },
  ],
  { quote: "Zitat", answer: "Antwort" },
);

const hebel = listeRegistrieren(
  "mcmakler-modell",
  "hebel",
  "Hebel",
  [
    {
      titel: "Ortskenntnis als Beweis",
      text: "Nicht behaupten, zeigen: konkrete Straßen, reale Bodenrichtwerte, abgeschlossene Fälle aus genau dem Stadtteil, in dem der Eigentümer wohnt.",
    },
    {
      titel: "Kontinuität",
      text: "Ein Name, eine Nummer, vom ersten Anruf bis zum Notartermin. Kein Callcenter, das jedes Mal neu erklärt bekommt, worum es geht.",
    },
    {
      titel: "Beweisführung statt Rabatt",
      text: "Wer die eigene Erfolgsquote, Vermarktungsdauer und Reichweite offenlegt, muss die Provision nicht über den Preis verteidigen.",
    },
    {
      titel: "Auftritt auf Augenhöhe",
      text: "Ein eigenes Portal, das genauso professionell wirkt wie der bundesweite Herausforderer, nimmt der Größe des Gegners die Wirkung.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const faq = listeRegistrieren(
  "mcmakler-modell",
  "faq",
  "FAQ",
  [
    {
      q: "Ist das McMakler-Modell seriös?",
      a: "Ja, es ist ein etabliertes Geschäftsmodell mit klarer Logik: standardisierter Prozess, zentraler Vertrieb, hoher Werbedruck. Ob es für einen einzelnen Eigentümer die richtige Wahl ist, hängt vom Objekt und vom gewünschten Maß an persönlicher Betreuung ab, nicht von der Seriosität des Modells.",
    },
    {
      q: "Verliert ein Regionalmakler grundsätzlich gegen Hybridmakler?",
      a: "Nein. Beim Werbebudget verliert fast jedes einzelne Büro, bei Ortskenntnis, Kontinuität und einem professionellen eigenen Auftritt nicht. Genau diese drei Hebel entscheiden häufig, wem der Eigentümer am Ende zusagt.",
    },
    {
      q: "Was, wenn ein Eigentümer bereits ein Angebot von McMakler hat?",
      a: "Dann zählt der direkte Vergleich: derselbe Ansprechpartner über die gesamte Vermarktung, echte Ortskenntnis und ein Auftritt, der Vertrauen zeigt statt nur Reichweite. Ein Rabatt auf die eigene Provision ist selten das überzeugendste Argument.",
    },
    {
      q: "Brauche ich das gleiche Marketingbudget wie ein Hybridmakler?",
      a: "Nein. Regionale Dominanz in einer Stadt oder einem Stadtteil kostet einen Bruchteil eines bundesweiten TV-Budgets, weil Sie nur dort sichtbar sein müssen, wo Ihre Zielgruppe tatsächlich sucht.",
    },
  ],
  { q: "Frage", a: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Das McMakler-Modell: Was Hybridmakler richtig machen — und wo Sie gewinnen | beuwy",
  [`${S}meta.beschreibung`]:
    "Das McMakler-Modell erklärt: Hybridmakler gewinnen über Prozess und Werbedruck, nicht über Ortskenntnis. Wie regionale Makler mit Beweisführung dagegenhalten.",
  [`${S}meta.og_titel`]: "Das McMakler-Modell: Was Hybridmakler richtig machen — und wo Sie gewinnen | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Prozess und Werbedruck sind die Stärke von Hybridmaklern, nicht Ortskenntnis. Vier Hebel, mit denen regionale Makler dagegenhalten.",

  [`${S}kopf.eyebrow`]: "Wettbewerb",
  [`${S}kopf.titel`]: "Das McMakler-Modell: stark im Prozess, *schwach* vor Ort.",
  [`${S}kopf.text_vor`]:
    "Sie konkurrieren mit Hybridmaklern wie McMakler nicht über Werbebudget, das gewinnen Sie strukturell nicht. Sie gewinnen über das, was ein bundesweiter Prozess nicht leisten kann:",
  [`${S}kopf.text_hervor`]:
    "echte Ortskenntnis, denselben Ansprechpartner bis zum Notar und einen Auftritt, der genauso professionell wirkt",
  [`${S}kopf.text_nach`]:
    ". Deren Stärke ist Tempo und Reichweite, Ihre ist die Region, in der Sie schon jeden Straßenzug kennen.",
  [`${S}kopf.cta`]: "Zusammenarbeit anfragen",
  [`${S}kopf.cta_note`]: "Antwort innerhalb von 24 Stunden",

  [`${S}staerken.eyebrow`]: "Ehrlich betrachtet",
  [`${S}staerken.titel`]: "Was Hybridmakler *richtig* machen.",
  [`${S}staerken.sub`]:
    "Bevor eine Gegenstrategie funktioniert, muss die Stärke des Gegners stimmen. Vier Dinge, die das Modell strukturell besser kann als ein einzelnes Büro.",
  ...staerken.defaults,

  [`${S}grenzen.eyebrow`]: "Die Grenze des Modells",
  [`${S}grenzen.titel`]: "Wo der *Prozess* endet und die Region anfängt.",
  ...grenzen.defaults,

  [`${S}hebel.eyebrow`]: "Der Konter",
  [`${S}hebel.titel`]: "Vier Hebel, mit denen Sie regional *gewinnen*.",
  [`${S}hebel.sub`]:
    "Kein Wettrüsten beim Werbebudget. Vier Hebel, die ein bundesweiter Prozess strukturell nicht in derselben Tiefe bedienen kann.",
  ...hebel.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Reichweite ist mietbar. Vertrauen nicht.",
  [`${S}unterschied.text`]:
    "Ein bundesweiter Prozess kauft Aufmerksamkeit ein, Woche für Woche, Kampagne für Kampagne. Ortskenntnis und ein über Jahre aufgebauter Ruf lassen sich nicht kaufen, nur verdienen. Genau das ist der Vorsprung, den kein Werbebudget ausgleicht.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "In den ersten drei Monaten nach dem Relaunch: neun zusätzliche Mandate, ein regionales Haus gegen bundesweite Konkurrenz. RIEGEL Immobilien belegt zudem Platz 21 von über 25.000 Maklern beim ImmoScout24-Award.",
  [`${S}beweis.link`]: "Fallstudie RIEGEL Immobilien lesen →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Gespräch wissen wollen.",
  ...faq.defaults,
  [`${S}faq.disclaimer`]:
    "McMakler ist eine Marke der McMakler GmbH. beuwy ist unabhängiger Dienstleister ohne Gesellschafterbindung an dieses Unternehmen; die Angaben zum Geschäftsmodell beruhen auf öffentlich bekannten Informationen.",

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihre regionale *Dominanz*.",
  [`${S}finale.text_vor`]: "Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_mitte`]:
    ". Wie sich der Hebel in kleineren Städten besonders schnell auszahlt, zeigt die Seite",
  [`${S}finale.link_kleinstadt`]: "Makler in der Kleinstadt",
  [`${S}finale.text_mitte2`]:
    ", wie Sie den Wiedererkennungswert dafür aufbauen, die Seite",
  [`${S}finale.link_marke`]: "Markenaufbau für Makler",
  [`${S}finale.text_nach`]: ".",
  [`${S}finale.cta`]: "Zusammenarbeit anfragen",
  [`${S}finale.cta_note`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · Open-Graph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",

  [`${S}kopf.eyebrow`]: "Wissens-Kopf · Eyebrow",
  [`${S}kopf.titel`]: "Wissens-Kopf · Titel (ein *Wort* = Highlighter)",
  [`${S}kopf.text_vor`]: "Wissens-Kopf · Textabsatz, Teil vor dem Highlight",
  [`${S}kopf.text_hervor`]: "Wissens-Kopf · Hervorgehobener Satz",
  [`${S}kopf.text_nach`]: "Wissens-Kopf · Textabsatz, Teil nach dem Highlight",
  [`${S}kopf.cta`]: "Wissens-Kopf · Button-Text",
  [`${S}kopf.cta_note`]: "Wissens-Kopf · Hinweis neben dem Button",

  [`${S}staerken.eyebrow`]: "Stärken · Eyebrow",
  [`${S}staerken.titel`]: "Stärken · Titel (ein *Wort* = Highlighter)",
  [`${S}staerken.sub`]: "Stärken · Subline",
  ...staerken.labels,

  [`${S}grenzen.eyebrow`]: "Grenzen · Eyebrow",
  [`${S}grenzen.titel`]: "Grenzen · Titel (ein *Wort* = Highlighter)",
  ...grenzen.labels,

  [`${S}hebel.eyebrow`]: "Hebel · Eyebrow",
  [`${S}hebel.titel`]: "Hebel · Titel (ein *Wort* = Highlighter)",
  [`${S}hebel.sub`]: "Hebel · Subline",
  ...hebel.labels,

  [`${S}unterschied.label`]: "Der Unterschied · Karten-Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Karten-Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Karten-Text",

  [`${S}beweis.label`]: "Beweis-Anriss · Label",
  [`${S}beweis.text`]: "Beweis-Anriss · Text",
  [`${S}beweis.link`]: "Beweis-Anriss · Link-Text (zur Fallstudie)",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,
  [`${S}faq.disclaimer`]: "FAQ · Marken-Fußnote unter dem Accordion",

  [`${S}finale.label`]: "Finale · Eyebrow",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.text_vor`]: "Finale · Text, Teil vor Link 1 (Immobilienmarketing-Hub)",
  [`${S}finale.link_hub`]: "Finale · Link-Text 1 (Immobilienmarketing-Hub)",
  [`${S}finale.text_mitte`]: "Finale · Text, Teil zwischen Link 1 und Link 2",
  [`${S}finale.link_kleinstadt`]: "Finale · Link-Text 2 (Makler in der Kleinstadt)",
  [`${S}finale.text_mitte2`]: "Finale · Text, Teil zwischen Link 2 und Link 3",
  [`${S}finale.link_marke`]: "Finale · Link-Text 3 (Markenaufbau für Makler)",
  [`${S}finale.text_nach`]: "Finale · Text, Teil nach Link 3",
  [`${S}finale.cta`]: "Finale · Button-Text",
  [`${S}finale.cta_note`]: "Finale · Hinweis unter dem Button",
};
