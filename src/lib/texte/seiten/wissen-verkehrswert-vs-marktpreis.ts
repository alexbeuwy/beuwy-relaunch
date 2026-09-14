import { listeRegistrieren } from "../lesen";

/** Studio-Texte /wissen/verkehrswert-vs-marktpreis — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "wissen-verkehrswert-vs-marktpreis",
  titel: "Verkehrswert vs. Marktpreis",
  route: "/wissen/verkehrswert-vs-marktpreis",
};
const S = "s.wissen-verkehrswert-vs-marktpreis.";

const gruende = listeRegistrieren(
  "wissen-verkehrswert-vs-marktpreis",
  "gruende",
  "Grund",
  [
    {
      titel: "Angebot und Nachfrage",
      text: "In einer gefragten Lage mit wenig verfügbarem Bestand zahlen mehrere Interessenten gegeneinander, der Marktpreis steigt über den Verkehrswert. Bei Überangebot passiert das Gegenteil, selbst wenn der Verkehrswert gleich bleibt.",
    },
    {
      titel: "Der Zeitpunkt",
      text: "Ein Verkehrswertgutachten hat ein festes Wertermittlungsdatum. Zinsen, Baukosten und Kaufinteresse ändern sich danach weiter, der Marktpreis am Tag der Beurkundung kennt diesen Stichtag nicht.",
    },
    {
      titel: "Was erst bei Besichtigung auffällt",
      text: "Sanierungsstau, Grundriss, Geräuschkulisse: Manches sieht ein Käufer erst vor Ort und preist es sofort ein, ein Vergleichswertverfahren dagegen rechnet mit Durchschnittswerten vergleichbarer Objekte.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const zeilen = listeRegistrieren(
  "wissen-verkehrswert-vs-marktpreis",
  "zeilen",
  "Tabellen-Zeile",
  [
    { merkmal: "Zahl", angebot: "Angebotspreis auf dem Portal", abschluss: "Abschlusspreis im Notarvertrag" },
    { merkmal: "Beispiel", angebot: "449.000 €", abschluss: "417.000 €" },
    { merkmal: "Enthält Verhandlungsspielraum", angebot: "ja, meist eingepreist", abschluss: "nein, ist das Ergebnis" },
    { merkmal: "Wer setzt die Zahl", angebot: "Verkäufer bzw. Makler", abschluss: "Käufer und Verkäufer gemeinsam" },
  ],
  { merkmal: "Merkmal", angebot: "Angebotspreis-Spalte", abschluss: "Abschlusspreis-Spalte" },
);

const faq = listeRegistrieren(
  "wissen-verkehrswert-vs-marktpreis",
  "faq",
  "FAQ",
  [
    {
      q: "Welcher Wert zählt bei einer Erbschaft oder Scheidung?",
      a: "Der Verkehrswert. Finanzamt und Familiengericht brauchen eine neutrale, nachvollziehbar berechnete Zahl, keine Momentaufnahme aus dem aktuellen Marktgeschehen. Deshalb verlangen beide ein Gutachten, kein Portal-Exposé.",
    },
    {
      q: "Warum zeigt das Portal oft einen höheren Preis als der Gutachter?",
      a: "Der Angebotspreis enthält üblicherweise einen Verhandlungspuffer, den Verkäufer oder Makler bewusst einrechnen. Der Verkehrswert tut das nicht, er bildet ausschließlich den nach Verfahren berechneten Wert ab, ohne taktischen Aufschlag.",
    },
    {
      q: "Kann der Marktpreis unter dem Verkehrswert liegen?",
      a: "Ja. Bei Überangebot in der Region, bei sichtbarem Sanierungsstau oder wenn ein Objekt lange auf dem Markt steht, sinkt der erzielbare Preis unter den rechnerischen Wert, auch wenn sich am Gutachten nichts ändert.",
    },
    {
      q: "Ersetzt ein Online-Rechner das Verkehrswertgutachten?",
      a: "Nein. Ein Rechner liefert eine kostenlose Ersteinschätzung auf Basis von Bodenrichtwerten und vergleichbaren Verkäufen, ein Verkehrswertgutachten braucht einen öffentlich bestellten Sachverständigen. Für Bank, Gericht oder Finanzamt zählt nur Letzteres.",
    },
  ],
  { q: "Frage", a: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Verkehrswert vs. Marktpreis: Warum zwei Zahlen richtig sein können | beuwy",
  [`${S}meta.beschreibung`]:
    "Verkehrswert und Marktpreis: zwei Zahlen für dieselbe Immobilie, eine amtlich berechnet, eine im Verkauf verhandelt. Beispielrechnung und Verhandlungsfolgen.",
  [`${S}meta.og_titel`]: "Verkehrswert vs. Marktpreis: Warum zwei Zahlen richtig sein können | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Der Verkehrswert ist eine Rechnung nach § 194 BauGB, der Marktpreis ein Verhandlungsergebnis. Warum beide für dieselbe Immobilie richtig sein können, mit Beispielrechnung.",

  [`${S}kopf.eyebrow`]: "Bewertung & Marktpreis",
  [`${S}kopf.titel`]: "Verkehrswert vs. Marktpreis: Warum *beide* Zahlen richtig sein können.",
  [`${S}kopf.sub_vor`]:
    "Der Verkehrswert ist die amtlich berechnete, objektive Zahl nach § 194 Baugesetzbuch, ermittelt über Vergleichs-, Ertrags- oder Sachwertverfahren, unabhängig davon, wer gerade kauft oder verkauft. Der Marktpreis ist die Zahl, die tatsächlich verhandelt und bezahlt wird, und schwankt mit Nachfrage, Zeitpunkt und dem, was ein einzelner Käufer bereit ist zu zahlen.",
  [`${S}kopf.sub_mark`]:
    "Beide können für dieselbe Immobilie richtig sein und trotzdem zehn Prozent oder mehr auseinanderliegen",
  [`${S}kopf.sub_nach`]: ", weil der eine eine Rechnung ist und der andere ein Verhandlungsergebnis.",
  [`${S}kopf.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}kopf.antwort`]: "Antwort innerhalb von 24 Stunden",

  [`${S}definitionen.eyebrow`]: "Zwei Definitionen",
  [`${S}definitionen.titel`]: "Eine Zahl aus dem *Gesetz*, eine Zahl aus dem Verhandeln.",
  [`${S}definitionen.card1_label`]: "Verkehrswert",
  [`${S}definitionen.card1_text`]:
    "Der nach § 194 BauGB definierte, objektiv berechnete Wert einer Immobilie zu einem festen Stichtag, ermittelt über ein anerkanntes Verfahren (Vergleichswert-, Ertragswert- oder Sachwertverfahren). Er interessiert Banken, Gerichte und das Finanzamt, weil er unabhängig von der Verhandlung zwischen zwei konkreten Personen entsteht.",
  [`${S}definitionen.card1_small`]:
    "Zuständig: öffentlich bestellter und vereidigter Sachverständiger, nicht der Makler.",
  [`${S}definitionen.card2_label`]: "Marktpreis",
  [`${S}definitionen.card2_text`]:
    "Der Preis, den ein konkreter Käufer für ein konkretes Objekt an einem konkreten Tag tatsächlich zahlt. Er entsteht aus Angebot, Nachfrage, Vermarktung und Verhandlungsgeschick, nicht aus einer Formel. Zwei baugleiche Wohnungen im selben Haus können deshalb zu unterschiedlichen Marktpreisen verkauft werden.",
  [`${S}definitionen.card2_small`]: "Zuständig: Käufer und Verkäufer gemeinsam, moderiert durch den Makler.",

  [`${S}gruende.eyebrow`]: "Warum sie auseinanderlaufen",
  [`${S}gruende.titel`]: "Drei Gründe, warum der Markt anders rechnet als das Gutachten.",
  ...gruende.defaults,

  [`${S}portalfalle.eyebrow`]: "Die Portal-Falle",
  [`${S}portalfalle.titel`]: "Was auf dem Portal steht, ist nicht das, was am Ende *bezahlt* wird.",
  [`${S}portalfalle.sub`]:
    "Beispielrechnung, keine Zusage für ein konkretes Objekt. Der tatsächliche Abstand hängt von Lage, Zustand und Verhandlungsdauer ab.",
  [`${S}portalfalle.th_merkmal`]: "Merkmal",
  [`${S}portalfalle.th_angebot`]: "Angebotspreis",
  [`${S}portalfalle.th_abschluss`]: "Abschlusspreis",
  ...zeilen.defaults,
  [`${S}portalfalle.text_vor`]:
    "Steht ein Objekt für 449.000 € auf dem Portal, ist das der Angebotspreis, meist mit eingerechnetem Verhandlungsspielraum. Nach Besichtigungen und Verhandlung liegt der Notarvertrag am Ende häufig darunter, im Beispiel bei 417.000 €, eine Differenz von rund sieben Prozent. Für Eigentümer heißt das: Der Angebotspreis ist eine Vermarktungsentscheidung, keine Prognose. Wer vorab wissen will, in welchem Korridor der Verkehrswert liegt, bekommt eine erste, kostenlose Einschätzung über den",
  [`${S}portalfalle.link1`]: "Verkaufspreisrechner",
  [`${S}portalfalle.text_mitte`]: ", ausführlicher erklärt auf der Seite",
  [`${S}portalfalle.link2`]: "Immobilie bewerten",
  [`${S}portalfalle.text_nach`]: ".",

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Ein Gutachten verhandelt nicht mit.",
  [`${S}unterschied.text`]:
    "Der Verkehrswert schützt vor einer willkürlichen Zahl, der Marktpreis schützt vor einem zu langen Vermarktungszeitraum. Ein guter Preisvorschlag orientiert sich an beidem: am Verkehrswert als Untergrenze der Seriosität, am Marktpreis als Zielzone für den tatsächlichen Verkauf.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.titel`]:
    "Der Bewertungsrechner von RIEGEL Immobilien rechnet mit amtlichen Bodenrichtwerten und über 5.000 ausgewerteten Verkäufen. Sechs Wochen nach dem Relaunch: neun Abschlüsse, 342.000 € Volumen.",
  [`${S}beweis.link`]: "Fallstudie RIEGEL Immobilien lesen →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Gespräch wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Klären wir Ihren *Preis*, bevor der Markt es tut.",
  [`${S}finale.satz1`]: "Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.link1`]: "Immobilienmarketing-Hub",
  [`${S}finale.satz2`]: ", die drei Bewertungsverfahren im Detail auf der Seite",
  [`${S}finale.link2`]: "Immobilie bewerten",
  [`${S}finale.satz3`]: ", eine erste Zahl liefert der",
  [`${S}finale.link3`]: "Verkaufspreisrechner",
  [`${S}finale.satz4`]: ".",
  [`${S}finale.antwort`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · Open-Graph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",

  [`${S}kopf.eyebrow`]: "Kopf · Eyebrow",
  [`${S}kopf.titel`]: "Kopf · Titel (ein *Wort* = Highlighter)",
  [`${S}kopf.sub_vor`]: "Kopf · Subline · Teil vor dem Highlight",
  [`${S}kopf.sub_mark`]: "Kopf · Subline · Hervorgehobener Teil",
  [`${S}kopf.sub_nach`]: "Kopf · Subline · Teil nach dem Highlight",
  [`${S}kopf.cta_label`]: "Kopf & Finale · CTA-Beschriftung",
  [`${S}kopf.antwort`]: "Kopf · Antwortzeit-Hinweis",

  [`${S}definitionen.eyebrow`]: "Definitionen · Eyebrow",
  [`${S}definitionen.titel`]: "Definitionen · Titel (ein *Wort* = Highlighter)",
  [`${S}definitionen.card1_label`]: "Definitionen · Karte 1 · Label",
  [`${S}definitionen.card1_text`]: "Definitionen · Karte 1 · Text",
  [`${S}definitionen.card1_small`]: "Definitionen · Karte 1 · Kleingedrucktes",
  [`${S}definitionen.card2_label`]: "Definitionen · Karte 2 · Label",
  [`${S}definitionen.card2_text`]: "Definitionen · Karte 2 · Text",
  [`${S}definitionen.card2_small`]: "Definitionen · Karte 2 · Kleingedrucktes",

  [`${S}gruende.eyebrow`]: "Gründe · Eyebrow",
  [`${S}gruende.titel`]: "Gründe · Titel",
  ...gruende.labels,

  [`${S}portalfalle.eyebrow`]: "Portal-Falle · Eyebrow",
  [`${S}portalfalle.titel`]: "Portal-Falle · Titel (ein *Wort* = Highlighter)",
  [`${S}portalfalle.sub`]: "Portal-Falle · Subline",
  [`${S}portalfalle.th_merkmal`]: "Portal-Falle · Tabelle · Spaltenkopf Merkmal",
  [`${S}portalfalle.th_angebot`]: "Portal-Falle · Tabelle · Spaltenkopf Angebotspreis",
  [`${S}portalfalle.th_abschluss`]: "Portal-Falle · Tabelle · Spaltenkopf Abschlusspreis",
  ...zeilen.labels,
  [`${S}portalfalle.text_vor`]: "Portal-Falle · Erklärtext · Teil vor Link 1 (Rechner)",
  [`${S}portalfalle.link1`]: "Portal-Falle · Erklärtext · Linktext 1 (Verkaufspreisrechner)",
  [`${S}portalfalle.text_mitte`]: "Portal-Falle · Erklärtext · Teil zwischen Link 1 und Link 2",
  [`${S}portalfalle.link2`]: "Portal-Falle · Erklärtext · Linktext 2 (Immobilie bewerten)",
  [`${S}portalfalle.text_nach`]: "Portal-Falle · Erklärtext · Teil nach Link 2",

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.titel`]: "Beweis · Kernsatz",
  [`${S}beweis.link`]: "Beweis · Linktext (Fallstudie RIEGEL)",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.satz1`]: "Finale · Satz · Teil vor Link 1 (Hub)",
  [`${S}finale.link1`]: "Finale · Satz · Linktext 1 (Immobilienmarketing-Hub)",
  [`${S}finale.satz2`]: "Finale · Satz · Teil zwischen Link 1 und Link 2 (Immobilie bewerten)",
  [`${S}finale.link2`]: "Finale · Satz · Linktext 2 (Immobilie bewerten)",
  [`${S}finale.satz3`]: "Finale · Satz · Teil zwischen Link 2 und Link 3 (Rechner)",
  [`${S}finale.link3`]: "Finale · Satz · Linktext 3 (Verkaufspreisrechner)",
  [`${S}finale.satz4`]: "Finale · Satz · Teil nach Link 3",
  [`${S}finale.antwort`]: "Finale · Antwortzeit-Hinweis",
};
