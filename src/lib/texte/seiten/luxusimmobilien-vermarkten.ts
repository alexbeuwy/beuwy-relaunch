import { listeRegistrieren } from "../lesen";

/** Studio-Texte /luxusimmobilien-vermarkten — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "luxusimmobilien-vermarkten", titel: "Luxusimmobilien vermarkten", route: "/luxusimmobilien-vermarkten" };
const S = "s.luxusimmobilien-vermarkten.";

const bausteine = listeRegistrieren(
  "luxusimmobilien-vermarkten",
  "bausteine",
  "Baustein",
  [
    {
      titel: "Marke als Türöffner",
      text: "Bevor ein Exposé überhaupt verschickt wird, hat der Käufer Ihre Website, Ihre Sprache und Ihre Bildwelt gesehen. In diesem Segment ersetzt kein Verkaufsgespräch einen Auftritt, der von der ersten Sekunde an die richtige Preisklasse signalisiert.",
    },
    {
      titel: "Diskrete Funnels statt offener Anzeige",
      text: "Statt einer öffentlichen Portalanzeige mit Adresse und Preis steht ein geschützter Bereich: Anfrage vor Einsicht, keine öffentliche Preisnennung, oft eine Diskretionsvereinbarung, bevor Details überhaupt herausgehen.",
    },
    {
      titel: "Qualifizierung vor dem Exposé",
      text: "Ein kurzes Gespräch oder Formular vor dem Versand klärt, ob die Anfrage zur Preisklasse passt, bevor Zeit in eine Besichtigung fließt. Das schützt den Verkäufer vor Neugierigen und den Käufer vor einem Objekt, das nicht zu seinem Budget passt.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const merkmale = listeRegistrieren(
  "luxusimmobilien-vermarkten",
  "merkmale",
  "Merkmal",
  [
    { text: "Diskretionsvereinbarung, bevor Objektdetails herausgehen" },
    { text: "kein öffentlich genannter Angebotspreis in der Anzeige" },
    { text: "Qualifizierungsgespräch vor der ersten Besichtigung" },
    { text: "Exposé erst nach Freigabe durch Käufer-Check, nicht per Download-Button" },
    { text: "eigene Domain statt reiner Portalanzeige als Erstkontakt" },
    { text: "Bildsprache, Sprache und Tempo abgestimmt auf die Preisklasse des Objekts" },
  ],
  { text: "Text" },
);

const faq = listeRegistrieren(
  "luxusimmobilien-vermarkten",
  "faq",
  "FAQ",
  [
    {
      frage: "Widersprechen sich Diskretion und digitale Sichtbarkeit nicht?",
      antwort:
        "Nein, sie betreffen zwei verschiedene Ebenen. Sichtbar ist die Marke, damit der richtige Käufer überhaupt weiß, dass Sie dieses Segment bedienen. Diskret bleibt das einzelne Objekt, sichtbar wird es erst, nachdem eine Anfrage qualifiziert wurde.",
    },
    {
      frage: "Sollte der Preis im Exposé stehen?",
      antwort:
        "Im ersten öffentlichen Kontakt meist nicht. Der Preis gehört ins qualifizierte Gespräch oder in das Exposé nach Freigabe, nicht in eine frei zugängliche Anzeige, die jeder ohne Vorprüfung öffnen kann.",
    },
    {
      frage: "Brauche ich für jedes Luxusobjekt eine eigene Landingpage?",
      antwort:
        "Für außergewöhnliche Einzelobjekte lohnt sich das häufig, weil eine eigene Seite mehr Raum für Bildsprache und Diskretionshinweise bietet als eine Zeile in einer allgemeinen Objektliste. Für das laufende Portfolio reicht meist ein durchgängiger, geschützter Bereich.",
    },
    {
      frage: "Lohnen sich Portale wie ImmoScout im Premium-Segment überhaupt?",
      antwort:
        "Als ein Kanal unter mehreren ja, als einziger Kanal selten. Portale erreichen Breite, das Premium-Segment entscheidet aber häufig über Empfehlung, Netzwerk und eine Marke, die vor dem ersten Anruf schon Vertrauen aufgebaut hat.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Luxusimmobilien vermarkten: Diskretion trifft Sichtbarkeit | beuwy",
  [`${S}meta.beschreibung`]:
    "Luxusimmobilien vermarkten heißt: Marke als Türöffner, diskrete Funnels statt offener Portalanzeige, Qualifizierung vor dem Exposé. beuwy baut den passenden Auftritt.",
  [`${S}meta.og_titel`]: "Luxusimmobilien vermarkten: Diskretion trifft Sichtbarkeit | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Off-Market-Anspruch und digitale Präsenz schließen sich nicht aus. beuwy baut Marke, diskrete Funnels und Qualifizierung vor dem Exposé für das Premium-Segment.",

  [`${S}hero.eyebrow`]: "Premium",
  [`${S}hero.titel`]: "Luxusimmobilien verkaufen sich über *Vertrauen*.",
  [`${S}hero.intro_vor`]:
    "Hochpreisige Immobilien vermarkten Sie, indem Sie zwei scheinbare Gegensätze verbinden: den Off-Market-Anspruch, den Käufer in diesem Segment erwarten, und eine digitale Präsenz, die",
  [`${S}hero.intro_highlight`]: "genug Vertrauen aufbaut, damit sich der richtige Käufer meldet",
  [`${S}hero.intro_nach`]:
    ". Die Marke öffnet die Tür, ein diskreter Funnel schützt das einzelne Objekt, und eine Qualifizierung vor dem Exposé stellt sicher, dass nur passende Anfragen überhaupt Details sehen.",
  [`${S}hero.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_antwortzeit`]: "Antwort innerhalb von 24 Stunden",

  [`${S}bausteine.eyebrow`]: "Der Mechanismus",
  [`${S}bausteine.titel`]: "Drei Bausteine, bevor das erste *Exposé* rausgeht.",
  [`${S}bausteine.sub`]:
    "Alle drei greifen ineinander. Fehlt einer, kippt das Gleichgewicht entweder in Richtung reiner Geheimniskrämerei ohne Anfragen oder in Richtung Portalanzeige ohne Diskretion.",
  ...bausteine.defaults,

  [`${S}merkmale.eyebrow`]: "Zum Prüfen",
  [`${S}merkmale.titel`]: "Woran Sie eine *seriöse* Vermarktung erkennen.",
  [`${S}merkmale.sub`]:
    "Sechs Merkmale, die zusammen den Unterschied zwischen einer Premium-Vermarktung und einer Standard-Anzeige mit höherem Preisschild ausmachen.",
  ...merkmale.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Das Exposé ist hier der letzte Schritt.",
  [`${S}unterschied.text`]:
    "In den meisten Segmenten öffnet das Exposé das Gespräch. Im Premium-Segment ist es umgekehrt: Marke und Qualifizierung öffnen das Gespräch, das Exposé folgt erst, wenn feststeht, dass die Anfrage zum Objekt passt.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "Aus einem Dreierteam ohne eigenen Auftritt wurde ein Haus mit 1.450 entwickelten Wohneinheiten und einem Joint Venture mit KKR über 160 Mio. €. Ohne Marke kein Gespräch mit einem Investor dieser Größenordnung.",
  [`${S}beweis.link_cases`]: "Weitere Fallstudien ansehen →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Gespräch wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihren *diskreten* Auftritt.",
  [`${S}finale.text_1`]: "Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_2`]: ", wie sich die richtige Zielgruppe scharf fassen lässt auf",
  [`${S}finale.link_pos`]: "Makler-Positionierung",
  [`${S}finale.text_3`]: "und wie das Exposé danach aussehen sollte auf",
  [`${S}finale.link_expose`]: "Exposés, die verkaufen",
  [`${S}finale.text_4`]: ".",
  [`${S}finale.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}finale.cta_antwortzeit`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · OpenGraph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · OpenGraph-Beschreibung",

  [`${S}hero.eyebrow`]: "Wissens-Kopf · Eyebrow",
  [`${S}hero.titel`]: "Wissens-Kopf · Titel (ein *Wort* = Highlighter)",
  [`${S}hero.intro_vor`]: "Wissens-Kopf · Antwort-Satz, Teil vor dem Highlight",
  [`${S}hero.intro_highlight`]: "Wissens-Kopf · Antwort-Satz, markierter Teil",
  [`${S}hero.intro_nach`]: "Wissens-Kopf · Antwort-Satz, Teil nach dem Highlight",
  [`${S}hero.cta_label`]: "Wissens-Kopf · CTA-Button-Text",
  [`${S}hero.cta_antwortzeit`]: "Wissens-Kopf · Antwortzeit-Hinweis neben dem CTA",

  [`${S}bausteine.eyebrow`]: "Drei Bausteine · Eyebrow",
  [`${S}bausteine.titel`]: "Drei Bausteine · Titel (ein *Wort* = Highlighter)",
  [`${S}bausteine.sub`]: "Drei Bausteine · Subline",
  ...bausteine.labels,

  [`${S}merkmale.eyebrow`]: "Checkliste Merkmale · Eyebrow",
  [`${S}merkmale.titel`]: "Checkliste Merkmale · Titel (ein *Wort* = Highlighter)",
  [`${S}merkmale.sub`]: "Checkliste Merkmale · Subline",
  ...merkmale.labels,

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis-Anriss · Label",
  [`${S}beweis.text`]: "Beweis-Anriss · Text",
  [`${S}beweis.link_cases`]: "Beweis-Anriss · Link-Text (weitere Fallstudien)",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.text_1`]: "Finale · Satz, Teil vor Link 1 (Hub)",
  [`${S}finale.link_hub`]: "Finale · Link-Text 1 (Immobilienmarketing-Hub)",
  [`${S}finale.text_2`]: "Finale · Satz, Teil zwischen Link 1 und Link 2",
  [`${S}finale.link_pos`]: "Finale · Link-Text 2 (Makler-Positionierung)",
  [`${S}finale.text_3`]: "Finale · Satz, Teil zwischen Link 2 und Link 3",
  [`${S}finale.link_expose`]: "Finale · Link-Text 3 (Exposés, die verkaufen)",
  [`${S}finale.text_4`]: "Finale · Satz, Abschluss nach Link 3",
  [`${S}finale.cta_label`]: "Finale · CTA-Button-Text",
  [`${S}finale.cta_antwortzeit`]: "Finale · Antwortzeit-Hinweis unter dem CTA",
};
