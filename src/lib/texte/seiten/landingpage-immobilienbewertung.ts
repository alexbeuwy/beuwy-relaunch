import { listeRegistrieren } from "../lesen";

/** Studio-Texte /landingpage-immobilienbewertung — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "landingpage-immobilienbewertung", titel: "Bewertungs-Landingpage", route: "/landingpage-immobilienbewertung" };
const S = "s.landingpage-immobilienbewertung.";

const stufen = listeRegistrieren("landingpage-immobilienbewertung", "stufen", "Stufe", [
  {
    titel: "Der Hook",
    text: "Headline und Subline stellen die Preisfrage direkt, ohne Umweg über die Firmengeschichte. Wer auf die Seite kommt, weiß in drei Sekunden, dass hier eine Zahl zum eigenen Objekt wartet, keine allgemeine Werbeaussage.",
  },
  {
    titel: "Das Rechner-Modul",
    text: "Adresse eingeben, fertig. Im Hintergrund laufen amtliche Bodenrichtwerte und ausgewertete Vergleichsverkäufe mit, das Ergebnis erscheint mit Score. Genau dieses Modul steht live unter Verkaufspreisrechner.",
  },
  {
    titel: "Der Beweis-Block",
    text: "Bevor das Formular kommt, sieht der Besucher eine belegte Zahl statt eines Werbeversprechens: echte Abschlüsse, echtes Volumen. Das macht die Rechner-Ausgabe glaubwürdig, statt sie wie einen Werbetrick wirken zu lassen.",
  },
  {
    titel: "Das Formular",
    text: "Name, Telefonnummer, Wunschzeitpunkt, mehr nicht. Jedes zusätzliche Feld kostet Abschlüsse. Die Anfrage landet strukturiert im CRM, mit Quelle und Score, nicht als loser Zettel im Postfach.",
  },
], { titel: "Titel", text: "Text" });

const faq = listeRegistrieren("landingpage-immobilienbewertung", "faq", "FAQ", [
  {
    q: "Muss eine Bewertungs-Landingpage immer einen Rechner haben?",
    a: "Nicht zwingend, aber sie profitiert enorm davon. Ein Formular ohne sofortige Gegenleistung fühlt sich für den Eigentümer wie eine Anfrage bei einer fremden Behörde an. Ein Rechner liefert innerhalb einer Minute etwas Konkretes zurück, bevor überhaupt eine Kontaktdaten-Frage kommt.",
  },
  {
    q: "Wie lang sollte das Formular am Ende sein?",
    a: "So kurz wie möglich für den ersten Schritt: Name, Telefonnummer, ein grober Zeitpunkt. Details wie Wohnfläche oder Zustand fragen Sie im zweiten Schritt oder im ersten Telefonat ab, nicht alle auf einmal in einem Formular, das dann keiner zu Ende ausfüllt.",
  },
  {
    q: "Wohin fließen die Leads aus der Landingpage?",
    a: "Direkt ins CRM, mit Quelle, Score aus dem Rechner und dem nächsten Arbeitsschritt. Kein Copy-Paste aus einem Formular-Postfach, keine Anfrage, die zwischen zwei Mitarbeitern liegen bleibt.",
  },
  {
    q: "Reicht eine Landingpage allein, ohne Anzeigen?",
    a: "Nein. Eine Landingpage ist ein Werkzeug, kein Traffic-Kanal. Ohne Zufluss aus Suche, Anzeigen oder Empfehlung liegt sie nur bereit, aber niemand findet sie. Wie der Zufluss aussieht, zeigt Performance-Marketing für Makler.",
  },
], { q: "Frage", a: "Antwort" });

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Die Bewertungs-Landingpage: Anatomie einer Seite, die registriert | beuwy",
  [`${S}meta.beschreibung`]:
    "Die Bewertungs-Landingpage überzeugt Eigentümer in vier Sektionen: Hook, Rechner, Beweis, Formular. Die Seite, die aus einem Klick eine Anfrage macht.",
  [`${S}meta.og_titel`]: "Die Bewertungs-Landingpage: Anatomie einer Seite, die registriert | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Sektion für Sektion am lebenden Beispiel: Hook, Rechner, Beweis, Formular. Die Anatomie einer Bewertungs-Landingpage, die Eigentümer tatsächlich konvertiert.",

  [`${S}cta.label`]: "Zusammenarbeit anfragen",

  [`${S}kopf.eyebrow`]: "Landingpage-Anatomie",
  [`${S}kopf.titel`]: "Die Bewertungs-Landingpage: Anatomie einer Seite, die *registriert*.",
  [`${S}kopf.text_vor`]:
    "Eine Landingpage, die Eigentümer konvertiert, führt in vier Sektionen: ein Hook, der die Preisfrage direkt stellt, ein Rechner, der in unter einer Minute eine erste Zahl liefert, ein Beweis-Block mit belegten Abschlusszahlen und ein Formular, das nur so viel fragt, wie für den nächsten Schritt nötig ist.",
  [`${S}kopf.text_mark`]:
    "Jede Sektion hat genau eine Aufgabe, keine Sektion wirbt einfach nur für sich",
  [`${S}kopf.text_mid`]: ". Am eigenen",
  [`${S}kopf.link_rechner`]: "Verkaufspreisrechner",
  [`${S}kopf.text_nach`]: "lässt sich das Muster live nachvollziehen.",
  [`${S}kopf.hinweis`]: "Antwort innerhalb von 24 Stunden",

  [`${S}stufen.eyebrow`]: "Die Anatomie",
  [`${S}stufen.titel`]: "Vier Stufen. Jede mit *einer* Aufgabe.",
  [`${S}stufen.sub`]:
    "Kein Flyer im Web, sondern ein Funnel: Hook, Rechner, Beweis, Formular. Jede Stufe führt den Besucher genau einen Schritt weiter.",
  ...stufen.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Eine Landingpage ist kein digitaler Flyer.",
  [`${S}unterschied.text`]:
    "Ein Flyer erklärt, wer Sie sind. Eine Landingpage führt einen Besucher in unter zwei Minuten vom ersten Klick zu einer qualifizierten Anfrage im CRM. Beides sieht auf den ersten Blick ähnlich aus, nur eine der beiden Varianten registriert tatsächlich Eigentümer.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "Für RIEGEL Immobilien lief genau dieser Aufbau live: Rechner, Beweis, Formular. In den ersten drei Monaten danach neun zusätzliche Mandate.",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *eigenen* Aufbau wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihre *Landingpage*, keinen weiteren Flyer.",
  [`${S}finale.text_vor`]: "Das Rechner-Modul aus dieser Anatomie sehen Sie live im",
  [`${S}finale.link_rechner`]: "Verkaufspreisrechner",
  [`${S}finale.text_mid1`]: ", wie der Zufluss auf die Seite entsteht, zeigt",
  [`${S}finale.link_performance`]: "Performance-Marketing für Makler",
  [`${S}finale.text_mid2`]: ". Den Überblick über alle Bausteine bietet der",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_nach`]: ".",
  [`${S}finale.hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · Open-Graph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",

  [`${S}cta.label`]: "Der CTA-Wortlaut (Kopf + Finale)",

  [`${S}kopf.eyebrow`]: "Wissens-Kopf · Eyebrow",
  [`${S}kopf.titel`]: "Wissens-Kopf · H1 (*Wort* = Hervorhebung)",
  [`${S}kopf.text_vor`]: "Wissens-Kopf · Antwortsatz · Teil vor dem Highlighter",
  [`${S}kopf.text_mark`]: "Wissens-Kopf · Antwortsatz · Highlighter-Teil",
  [`${S}kopf.text_mid`]: "Wissens-Kopf · Antwortsatz · Teil vor dem Rechner-Link",
  [`${S}kopf.link_rechner`]: "Wissens-Kopf · Link · Verkaufspreisrechner",
  [`${S}kopf.text_nach`]: "Wissens-Kopf · Antwortsatz · Teil nach dem Rechner-Link",
  [`${S}kopf.hinweis`]: "Wissens-Kopf · Mikrozeile unter dem CTA",

  [`${S}stufen.eyebrow`]: "Stufen · Eyebrow",
  [`${S}stufen.titel`]: "Stufen · Titel (*Wort* = Hervorhebung)",
  [`${S}stufen.sub`]: "Stufen · Subline",

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.text`]: "Beweis · Satz",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (*Wort* = Hervorhebung)",

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · H2 (*Wort* = Hervorhebung)",
  [`${S}finale.text_vor`]: "Finale · Text · Teil vor Link 1",
  [`${S}finale.link_rechner`]: "Finale · Link · Verkaufspreisrechner",
  [`${S}finale.text_mid1`]: "Finale · Text · Teil zwischen Link 1 und 2",
  [`${S}finale.link_performance`]: "Finale · Link · Performance-Marketing für Makler",
  [`${S}finale.text_mid2`]: "Finale · Text · Teil zwischen Link 2 und 3",
  [`${S}finale.link_hub`]: "Finale · Link · Immobilienmarketing-Hub",
  [`${S}finale.text_nach`]: "Finale · Text · Teil nach Link 3",
  [`${S}finale.hinweis`]: "Finale · Mikrozeile unter dem CTA",

  ...stufen.labels,
  ...faq.labels,
};
