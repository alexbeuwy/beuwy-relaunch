import { listeRegistrieren } from "../lesen";

/** Studio-Texte /marketing-bautraeger — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "marketing-bautraeger", titel: "Marketing für Bauträger", route: "/marketing-bautraeger" };
const S = "s.marketing-bautraeger.";

const pains = listeRegistrieren("marketing-bautraeger", "pains", "Pain-Punkt", [
  {
    quote: "Am ersten Tag der Vermarktung klingelt das Telefon durchgehend, und niemand weiß, wer schon angerufen hat.",
    answer:
      "Ohne ein System, das jede Anfrage sofort erfasst, verlieren Sie am wichtigsten Tag der Vermarktung genau die Übersicht, die über die ersten Reservierungen entscheidet.",
  },
  {
    quote: "Die Preisliste von letzter Woche kursiert noch, obwohl sich seitdem drei Einheiten geändert haben.",
    answer:
      "Ein PDF, das per Mail verschickt wird, veraltet, sobald es verschickt ist. Interessenten vergleichen dann Preise, die längst nicht mehr stimmen, und Ihr Vertrieb erklärt Unstimmigkeiten statt zu verkaufen.",
  },
  {
    quote: "Die Musterwohnung steht bereit, aber die Terminliste kommt per Nachricht am Vorabend.",
    answer:
      "Ohne eine Terminbuchung, die selbst mitdenkt, verwaltet Ihr Team Kalender statt Käufer zu begleiten, und Doppelbuchungen kosten Vertrauen, bevor der Interessent die Wohnung überhaupt betritt.",
  },
], { quote: "Zitat", answer: "Antwort" });

const schritte = listeRegistrieren("marketing-bautraeger", "schritte", "Schritt", [
  {
    titel: "Reservierung statt Rückruf-Zettel",
    text: "Interessenten reservieren eine Einheit direkt im Portal, mit Zeitstempel und Priorität. Kein Zettel, der zwischen zwei Schreibtischen verschwindet.",
  },
  {
    titel: "Preislisten, die sich selbst pflegen",
    text: "Ändert sich ein Preis oder ist eine Einheit reserviert, aktualisiert sich das Exposé automatisch. Niemand verschickt mehr eine veraltete PDF von letzter Woche.",
  },
  {
    titel: "Musterwohnungs-Termine, die sich selbst füllen",
    text: "Interessenten buchen ihren Termin im freien Slot, die Bestätigung geht automatisch raus. Ihr Team führt Besichtigungen, statt Kalender zu jonglieren.",
  },
  {
    titel: "Käufer-Kommunikation über jede Bauphase",
    text: "Vom Reservierungsschreiben bis zur Übergabe löst jede Bauphase die passende Nachricht automatisch aus. Ein Ansprechpartner arbeitet nach Ticketsystem, damit niemand nach zwei Wochen fragen muss, wie weit eine Anpassung ist.",
  },
], { titel: "Titel", text: "Text" });

const faq = listeRegistrieren("marketing-bautraeger", "faq", "FAQ", [
  {
    q: "Funktioniert das Portal, wenn wir mehrere Bauträger-Projekte gleichzeitig vermarkten?",
    a: "Ja. Jedes Projekt bekommt eine eigene Preisliste, eigene Musterwohnungs-Termine und ein eigenes Reporting, alles über dasselbe Portal gesteuert.",
  },
  {
    q: "Wie schnell steht das Portal vor dem Vermarktungsstart?",
    a: "Vier bis sechs Wochen von der Aufnahme bis zum Livegang. Den Termin für den Vermarktungsstart bekommen Sie schriftlich, bevor das Projekt beginnt.",
  },
  {
    q: "Was passiert mit Interessenten, die schon vor dem Livegang auf einer Warteliste stehen?",
    a: "Die übernehmen wir ins Portal und qualifizieren sie mit, noch bevor die erste Musterwohnung öffnet.",
  },
], { q: "Frage", a: "Antwort" });

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Marketing für Bauträger: Reservierungen statt Anfrage-Chaos | beuwy",
  [`${S}meta.beschreibung`]:
    "beuwy baut Bauträgern ein Vertriebsportal für den Vermarktungsstart: Preislisten, die sich pflegen lassen, Musterwohnungs-Termine, die sich selbst füllen, und automatische Käuferkommunikation.",
  [`${S}meta.og_titel`]: "Marketing für Bauträger: Reservierungen statt Anfrage-Chaos | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Ein Vertriebsportal für den Vermarktungsstart: Preislisten, die sich pflegen lassen, Musterwohnungs-Termine, die sich selbst füllen, Käuferkommunikation über jede Bauphase.",

  [`${S}cta.label`]: "Zusammenarbeit anfragen",

  [`${S}hero.eyebrow`]: "Marketing für Bauträger",
  [`${S}hero.titel`]: "Marketing für Bauträger, das *Reservierungen* bringt, kein Anfrage-Chaos.",
  [`${S}hero.sub_vor`]:
    "Marketing für Bauträger heißt: Der Vermarktungsstart läuft über ein Portal, das Interessenten registriert, Preislisten aktuell hält und",
  [`${S}hero.sub_mark`]:
    "Musterwohnungs-Termine selbst vergibt, statt dass jede Anfrage einzeln im Postfach landet",
  [`${S}hero.sub_nach`]: ".",
  [`${S}hero.hinweis`]: "Antwort innerhalb von 24 Stunden",
  [`${S}hero.badge_label`]: "Beweis, keine Behauptung",

  [`${S}problem.eyebrow`]: "Der Vermarktungsstart entscheidet",
  [`${S}problem.titel`]: "Der *wichtigste* Tag der Vermarktung ist oft auch der chaotischste.",
  ...pains.defaults,

  [`${S}system.eyebrow`]: "Der Mechanismus",
  [`${S}system.titel`]: "Vier Stufen. Ein Portal von der *Reservierung* bis zur Übergabe.",
  [`${S}system.sub`]:
    "beuwy arbeitet als Unternehmensberatung für Ihren Vertrieb, nicht als Agentur, die einzelne Werbemittel abliefert. Jedes Portal ist Teil Ihres Vermarktungsstarts, mit einem festen Ansprechpartner.",
  ...schritte.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Anfrage-Chaos ist kein Vermarktungsstart.",
  [`${S}unterschied.text`]:
    "Standardanbieter schicken Interessenten ins offene Postfach und hoffen, dass jemand zurückruft. Wir bauen Ihnen ein Portal, das reserviert, terminiert und kommuniziert, vom ersten Klick bis zur Schlüsselübergabe.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "Sechs Wochen nach dem Relaunch: neun Abschlüsse, 342.000 € Volumen, ohne einen einzigen gekauften Lead.",
  [`${S}beweis.link`]: "Weitere Fallstudien ansehen →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *Vermarktungsstart* wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihren *Vermarktungsstart*.",
  [`${S}finale.text_vor`]:
    "Ein Portal für Bauträger ist ein Baustein unter mehreren. Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_mid`]: ", Referenzen in den",
  [`${S}finale.link_cases`]: "Fallstudien",
  [`${S}finale.text_nach`]: ".",
  [`${S}finale.hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · Open-Graph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",

  [`${S}cta.label`]: "Der CTA-Wortlaut (Hero + Finale)",

  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel (ein *Wort* = Highlighter)",
  [`${S}hero.sub_vor`]: "Hero · Subline · Teil vor dem Highlighter",
  [`${S}hero.sub_mark`]: "Hero · Subline · Highlighter-Teil",
  [`${S}hero.sub_nach`]: "Hero · Subline · Teil nach dem Highlighter",
  [`${S}hero.hinweis`]: "Hero · Mikrozeile unter dem CTA",
  [`${S}hero.badge_label`]: "Hero · Floating Card · Label über der Zahl",

  [`${S}problem.eyebrow`]: "Problem · Eyebrow",
  [`${S}problem.titel`]: "Problem · Titel (*Wort* = Hervorhebung)",

  [`${S}system.eyebrow`]: "Mechanismus · Eyebrow",
  [`${S}system.titel`]: "Mechanismus · Titel (*Wort* = Hervorhebung)",
  [`${S}system.sub`]: "Mechanismus · Subline",

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.text`]: "Beweis · Satz",
  [`${S}beweis.link`]: "Beweis · Link zu den Fallstudien",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (*Wort* = Hervorhebung)",

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · H2 (*Wort* = Hervorhebung)",
  [`${S}finale.text_vor`]: "Finale · Text · Teil vor dem 1. Link",
  [`${S}finale.link_hub`]: "Finale · Link · Immobilienmarketing-Hub",
  [`${S}finale.text_mid`]: "Finale · Text · Teil zwischen den Links",
  [`${S}finale.link_cases`]: "Finale · Link · Fallstudien",
  [`${S}finale.text_nach`]: "Finale · Text · Teil nach dem 2. Link",
  [`${S}finale.hinweis`]: "Finale · Mikrozeile unter dem CTA",

  ...pains.labels,
  ...schritte.labels,
  ...faq.labels,
};
