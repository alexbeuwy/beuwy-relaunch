import { listeRegistrieren } from "../lesen";

/**
 * Studio-Texte /marketing-projektentwickler — Struktur bleibt im Code,
 * jeder Text hier. Die mk.*-Keys (Floating-Card-Zahl aus content.ts)
 * bleiben unangetastet, siehe R11-Auftrag — diese Datei deckt nur die
 * seiteneigenen Texte ab, die vorher hart im JSX standen.
 */
export const SEITE = {
  slug: "marketing-projektentwickler",
  titel: "Marketing für Projektentwickler",
  route: "/marketing-projektentwickler",
};
const S = "s.marketing-projektentwickler.";

const pains = listeRegistrieren(
  "marketing-projektentwickler",
  "pains",
  "Einwand",
  [
    {
      quote: "Die Bank fragt nach dem Vorverkaufsstand, nicht nach der Fassade.",
      antwort:
        "Kapitalbindung kostet jeden Monat, den eine Einheit unverkauft bleibt. Marketing, das erst zur Fertigstellung anläuft, kommt für die Finanzierungsfrage zu spät.",
    },
    {
      quote: "Jede Anfrage bekommt dasselbe PDF-Exposé, egal ob sie ernst gemeint ist.",
      antwort:
        "Ohne Qualifizierung wissen Sie erst im Verkaufsgespräch, ob ein Interessent überhaupt finanzieren kann. Das kostet Termine, die nie zu einer Reservierung werden.",
    },
    {
      quote:
        "Am Monatsende fragt die Geschäftsführung nach dem Vertriebsstand, und die Antwort steht in drei verschiedenen Tabellen.",
      antwort:
        "Ohne ein System, das jede Anfrage vom ersten Klick bis zur Reservierung verfolgt, bleibt Reporting eine Fleißarbeit statt einer Entscheidungsgrundlage.",
    },
  ],
  { quote: "Zitat", antwort: "Antwort" },
);

const schritte = listeRegistrieren(
  "marketing-projektentwickler",
  "schritte",
  "Mechanismus-Schritt",
  [
    {
      titel: "Ein Portal statt eines PDF-Verteilers",
      text: "Interessenten registrieren sich selbst, mit Budget, Etage und Wunschgröße. Kein Exposé verschwindet mehr im Postfach eines Maklers, der drei andere Projekte gleichzeitig verkauft.",
    },
    {
      titel: "Qualifizierung vor dem ersten Anruf",
      text: "Anlagehorizont, Eigenkapital und Finanzierungsstand liegen vor, bevor der Vertrieb zum Hörer greift. Nur wer ernsthaft kaufen kann, bekommt den nächsten Termin.",
    },
    {
      titel: "Reporting, das die Geschäftsführung liest",
      text: "Vorverkaufsstand, Interessentenzahl und Conversion je Bauabschnitt, jede Woche automatisch. Eine Zahl statt drei Tabellen zum Zusammensuchen.",
    },
    {
      titel: "Ein Ansprechpartner, keine Warteschleife",
      text: "Neue Preisliste, zusätzlicher Grundriss, geänderter Text: Alles läuft über ein Ticketsystem mit festem Ansprechpartner. Niemand fragt nach zwei Wochen, wie weit die Anpassung ist.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const faq = listeRegistrieren(
  "marketing-projektentwickler",
  "faq",
  "FAQ",
  [
    {
      frage: "Funktioniert das Portal auch für ein einzelnes Bauprojekt, nicht nur für ein ganzes Unternehmen?",
      antwort:
        "Ja. Das Portal steht pro Projekt oder projektübergreifend, je nachdem, wie Sie vertreiben. Bei mehreren Bauabschnitten sehen Sie Vorverkaufsstand und Interessenten getrennt nach Abschnitt.",
    },
    {
      frage: "Ersetzt das Portal unseren Vertriebspartner oder Makler vor Ort?",
      antwort:
        "Nein. Es qualifiziert die Anfragen, die bei Ihrem Vertrieb ankommen, und liefert sie mit Score und Kontext aus. Wer telefoniert und abschließt, bleibt Ihr Team.",
    },
    {
      frage: "Wie schnell steht das Portal, bevor ein Bauabschnitt vermarktet wird?",
      antwort:
        "Vier bis sechs Wochen von der Aufnahme bis zum Livegang, wie bei jedem beuwy-Portal. Bei mehreren Bauabschnitten timen wir den Start auf Ihren Vertriebsplan.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Marketing für Projektentwickler: Abverkauf, bevor der Kran steht | beuwy",
  [`${S}meta.beschreibung`]:
    "beuwy baut Projektentwicklern ein Vertriebsportal, das Interessenten registriert und qualifiziert, während gebaut wird. Reporting je Bauabschnitt statt PDF-Exposés per Mail.",
  [`${S}meta.og_titel`]: "Marketing für Projektentwickler: Abverkauf, bevor der Kran steht | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Ein Vertriebsportal, das Interessenten registriert und qualifiziert, während gebaut wird, mit Reporting je Bauabschnitt statt PDF-Exposés per Mail.",

  [`${S}hero.eyebrow`]: "Marketing für Projektentwickler",
  [`${S}hero.titel`]: "Marketing für Projektentwickler, das *verkauft*, bevor der Kran steht.",
  [`${S}hero.sub_vor`]:
    "Marketing für Projektentwickler heißt: Käufer und Investoren finden Ihr Projekt und registrieren sich über ein eigenes Portal, das sie",
  [`${S}hero.sub_highlight`]: "qualifiziert, lange bevor Sie ein PDF-Exposé verschicken",
  [`${S}hero.sub_nach`]: ".",
  [`${S}hero.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",
  [`${S}hero.beweis_label`]: "Beweis, keine Behauptung",

  [`${S}problem.eyebrow`]: "Der Unterschied zwischen Bauen und Verkaufen",
  [`${S}problem.titel`]: "Ihr Kran steht. Ihr Vertrieb *nicht* immer.",
  ...pains.defaults,

  [`${S}system.eyebrow`]: "Der Mechanismus",
  [`${S}system.titel`]: "Vier Stufen. Ein Portal, das *verkauft* statt verschickt.",
  [`${S}system.sub`]:
    "beuwy arbeitet als Unternehmensberatung für Ihren Vertrieb, nicht als Agentur, die einzelne Werbemittel abliefert. Jedes Portal ist Teil Ihres Vertriebssystems, mit einem festen Ansprechpartner.",
  ...schritte.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Ein PDF-Exposé verkauft nichts. Ein Portal schon.",
  [`${S}unterschied.text`]:
    "Standardanbieter verschicken Grundrisse per Mail und hoffen auf einen Rückruf. Wir bauen Ihnen ein Portal, das jeden Interessenten registriert, qualifiziert und dem richtigen nächsten Schritt zuordnet, vom ersten Klick bis zur Reservierung.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "In den ersten drei Monaten nach dem Relaunch kamen neun zusätzliche Mandate, ohne einen einzigen gekauften Lead.",
  [`${S}beweis.link`]: "Weitere Fallstudien ansehen →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Gespräch wissen wollen.",
  ...faq.defaults,

  [`${S}fazit.label`]: "Der nächste Schritt",
  [`${S}fazit.titel`]: "Bauen wir Ihr *Vertriebsportal*.",
  [`${S}fazit.text_1`]:
    "Ein Portal für Projektentwickler ist ein Baustein unter mehreren. Einen Überblick über alle Bausteine finden Sie im",
  [`${S}fazit.link1`]: "Immobilienmarketing-Hub",
  [`${S}fazit.text_2`]: ", Referenzen in den",
  [`${S}fazit.link2`]: "Fallstudien",
  [`${S}fazit.text_3`]: ".",
  [`${S}fazit.cta_hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · OpenGraph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · OpenGraph-Beschreibung",

  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · H1 (ein *Wort* = Hervorhebung)",
  [`${S}hero.sub_vor`]: "Hero · Subline · Teil vor dem Highlighter",
  [`${S}hero.sub_highlight`]: "Hero · Subline · Highlighter-Teil",
  [`${S}hero.sub_nach`]: "Hero · Subline · Teil nach dem Highlighter",
  [`${S}hero.cta_label`]: "Hero · CTA-Button-Text",
  [`${S}hero.cta_hinweis`]: "Hero · Mikrozeile unter dem CTA",
  [`${S}hero.beweis_label`]: "Hero · Floating Card · Label",

  [`${S}problem.eyebrow`]: "Problem · Eyebrow",
  [`${S}problem.titel`]: "Problem · Titel (ein *Wort* = Hervorhebung)",
  ...pains.labels,

  [`${S}system.eyebrow`]: "Mechanismus · Eyebrow",
  [`${S}system.titel`]: "Mechanismus · Titel (ein *Wort* = Hervorhebung)",
  [`${S}system.sub`]: "Mechanismus · Subline",
  ...schritte.labels,

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis-Anriss · Label",
  [`${S}beweis.text`]: "Beweis-Anriss · Text",
  [`${S}beweis.link`]: "Beweis-Anriss · Link-Text (Fallstudien)",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Hervorhebung)",
  ...faq.labels,

  [`${S}fazit.label`]: "Finale · Label",
  [`${S}fazit.titel`]: "Finale · H2 (ein *Wort* = Hervorhebung)",
  [`${S}fazit.text_1`]: "Finale · Absatz · Teil 1 (vor Link 1)",
  [`${S}fazit.link1`]: "Finale · Absatz · Link 1 (Immobilienmarketing-Hub)",
  [`${S}fazit.text_2`]: "Finale · Absatz · Teil 2 (zwischen Link 1 und 2)",
  [`${S}fazit.link2`]: "Finale · Absatz · Link 2 (Fallstudien)",
  [`${S}fazit.text_3`]: "Finale · Absatz · Teil 3 (nach Link 2)",
  [`${S}fazit.cta_hinweis`]: "Finale · Mikrozeile unter dem CTA",
};
