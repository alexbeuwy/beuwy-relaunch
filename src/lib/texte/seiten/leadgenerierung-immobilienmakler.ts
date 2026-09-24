import { listeRegistrieren } from "../lesen";

/** Studio-Texte /leadgenerierung-immobilienmakler — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "leadgenerierung-immobilienmakler",
  titel: "Leadgenerierung für Immobilienmakler",
  route: "/leadgenerierung-immobilienmakler",
};
const S = "s.leadgenerierung-immobilienmakler.";

const pains = listeRegistrieren(
  "leadgenerierung-immobilienmakler",
  "pains",
  "Problem-Zeile",
  [
    {
      quote: "Derselbe Eigentümer bekommt an einem Abend vier Anrufe.",
      answer:
        "Lead-Portale verkaufen eine Adresse an mehrere Makler gleichzeitig. Wer zuerst anruft, führt das Gespräch, nicht wer den besseren Marktpreis nennt. Sie bezahlen für einen Wettlauf, nicht für einen Kunden.",
    },
    {
      quote: "Wer über ein Portal kommt, vergleicht drei Provisionen, bevor er Ihren Namen kennt.",
      answer:
        "Der Kontakt hat noch keine Meinung von Ihnen, nur ein Formular ausgefüllt. Er prüft Angebote, nicht Menschen. Die Beziehung, die einen Alleinauftrag rechtfertigt, fängt bei null an.",
    },
    {
      quote: "Ein gekaufter Kontakt kennt Ihren Namen nicht, bevor das Telefon klingelt.",
      answer:
        "Er weiß nicht, wer Sie sind, was Sie verkauft haben oder warum er Ihnen vertrauen sollte. Jedes Gespräch beginnt bei der Einwandbehandlung, nie beim Verkaufen.",
    },
  ],
  { quote: "Zitat", answer: "Antwort" },
);

const schritte = listeRegistrieren(
  "leadgenerierung-immobilienmakler",
  "schritte",
  "Mechanismus-Schritt",
  [
    {
      titel: "Sichtbarkeit dort, wo Eigentümer suchen",
      text: "Wenn „Makler + Stadtteil“ gegoogelt wird, steht Ihr Name über dem Portal.",
    },
    {
      titel: "Der Rechner qualifiziert, während Sie besichtigen",
      text: "Adresse rein, Ersteinschätzung raus: Der Verkäufer-Lead bekommt sofort einen Score.",
    },
    {
      titel: "Die Anfrage landet im CRM, nicht im Postfach",
      text: "Jede Anfrage kommt mit Quelle und nächstem Schritt an. Keine Zettel, kein Copy-Paste, kein vergessener Rückruf.",
    },
    {
      titel: "Automatisches Nachfassen über Monate",
      text: "Wer heute nicht verkauft, bekommt in 6 Monaten die richtige Mail. Automatisch.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const faq = listeRegistrieren(
  "leadgenerierung-immobilienmakler",
  "faq",
  "FAQ",
  [
    {
      frage: "Wie lange dauert es bis zu den ersten Eigentümer-Anfragen?",
      antwort:
        "Sichtbarkeit und Rechner stehen innerhalb von vier bis sechs Wochen. Die ersten qualifizierten Anfragen kommen meist in den Wochen danach, abhängig von Ihrem Markt und davon, wie viele Eigentümer dort gerade verkaufen. Eine feste Zahl nennen wir erst, wenn wir Ihren Markt kennen.",
    },
    {
      frage: "Funktioniert das auch in kleinen Märkten?",
      antwort:
        "Ja, mit angepasster Erwartung. In einer Kleinstadt suchen weniger Menschen gleichzeitig einen Makler als in einer Großstadt, also kommen weniger Anfragen, aber genauso qualifizierte. Sichtbarkeit vor Ort wirkt dort sogar leichter, weil kaum ein Mitbewerber sie überhaupt aufbaut.",
    },
    {
      frage: "Was ist mit Portalen wie ImmoScout?",
      antwort:
        "Bleiben Sie dort gelistet. Portale ersetzen wir nicht, wir ergänzen sie um das, was ihnen fehlt: eine Quelle, die nur Ihnen gehört und nach dem ersten Klick weiterarbeitet, statt den Kontakt an den Nächstbietenden weiterzureichen.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Leadgenerierung für Immobilienmakler: Eigentümer statt Kontakte | beuwy",
  [`${S}meta.beschreibung`]:
    "Kein gemieteter Portal-Kontakt: beuwy baut Immobilienmaklern die eigene Quelle für Eigentümer-Anfragen, Sichtbarkeit, Bewertungsrechner und CRM-Anbindung als ein System.",
  [`${S}meta.og_titel`]: "Leadgenerierung für Immobilienmakler: Eigentümer statt Kontakte | beuwy",
  [`${S}meta.og_beschreibung`]:
    "beuwy baut die eigene Quelle für Eigentümer-Anfragen, Sichtbarkeit, Bewertungsrechner und CRM-Anbindung als ein System, nicht als gemieteter Portal-Kontakt.",

  [`${S}hero.eyebrow`]: "Eigene Quelle statt Portal-Kontakt",
  [`${S}hero.titel`]: "Leadgenerierung für Immobilienmakler — *Eigentümer*, keine Adressen.",
  [`${S}hero.sub_vor`]:
    "Lead-Portale verkaufen denselben Kontakt an mehrere Makler zeitgleich. Unser System sorgt dafür, dass",
  [`${S}hero.sub_mark`]: "Eigentümer Sie finden, bevor sie beim Portal ankommen",
  [`${S}hero.sub_nach`]: ", und die Anfrage bei Ihnen landet, nicht bei drei Konkurrenten gleichzeitig.",
  [`${S}hero.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}hero.antwort`]: "Antwort innerhalb von 24 Stunden",
  [`${S}hero.karte_label`]: "Ergebnis bei Bestandskunden",

  [`${S}problem.eyebrow`]: "Das Problem mit gekauften Leads",
  [`${S}problem.titel`]: "Der teuerste Lead ist der, den *drei andere* Makler auch gerade anrufen.",
  ...pains.defaults,

  [`${S}mechanismus.eyebrow`]: "Der Mechanismus",
  [`${S}mechanismus.titel`]: "Vier Stufen. Eine Quelle, die *Ihnen* gehört.",
  [`${S}mechanismus.sub`]:
    "Ein Lead-Portal endet, sobald Sie aufhören zu zahlen. Ein eigenes System bleibt und arbeitet weiter, auch am Wochenende, auch im Termin.",
  ...schritte.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Portale vermieten Ihnen Kontakte.",
  [`${S}unterschied.text`]:
    "Wir bauen Ihnen die Quelle: eine eigene Sichtbarkeit, die Ihnen gehört, nicht gemietet, nicht geteilt, nicht kündbar durch einen Algorithmus.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.titel`]:
    "In den ersten drei Monaten nach dem Relaunch kamen neun zusätzliche Mandate, ohne einen einzigen gekauften Lead.",
  [`${S}beweis.text`]: "17 Jahre Markenarbeit stecken in diesem System, nicht ein Quartal Testphase.",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Gespräch wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihre eigene *Quelle*.",
  [`${S}finale.satz_vor`]:
    "Leadgenerierung ist der erste Baustein. Die meisten Makler kombinieren sie mit einer eigenen",
  [`${S}finale.satz_link1`]: "Maklerwebsite",
  [`${S}finale.satz_mitte`]: ", die den Rechner trägt. Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.satz_link2`]: "Immobilienmarketing-Hub",
  [`${S}finale.satz_nach`]: ".",
  [`${S}finale.antwort`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · Open-Graph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",

  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel (ein *Wort* = Highlighter)",
  [`${S}hero.sub_vor`]: "Hero · Subline · Teil vor dem Highlight",
  [`${S}hero.sub_mark`]: "Hero · Subline · Hervorgehobener Teil",
  [`${S}hero.sub_nach`]: "Hero · Subline · Teil nach dem Highlight",
  [`${S}hero.cta_label`]: "Hero & Finale · CTA-Beschriftung",
  [`${S}hero.antwort`]: "Hero · Antwortzeit-Hinweis",
  [`${S}hero.karte_label`]: "Hero · Kennzahl-Karte · Bezeichnung",

  [`${S}problem.eyebrow`]: "Problem · Eyebrow",
  [`${S}problem.titel`]: "Problem · Titel (ein *Wort* = Highlighter)",
  ...pains.labels,

  [`${S}mechanismus.eyebrow`]: "Mechanismus · Eyebrow",
  [`${S}mechanismus.titel`]: "Mechanismus · Titel (ein *Wort* = Highlighter)",
  [`${S}mechanismus.sub`]: "Mechanismus · Subline",
  ...schritte.labels,

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.titel`]: "Beweis · Kernsatz",
  [`${S}beweis.text`]: "Beweis · Zusatztext",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.satz_vor`]: "Finale · Satz · Teil vor Link 1 (Maklerwebsite)",
  [`${S}finale.satz_link1`]: "Finale · Satz · Linktext 1 (Maklerwebsite)",
  [`${S}finale.satz_mitte`]: "Finale · Satz · Teil zwischen Link 1 und Link 2 (Hub)",
  [`${S}finale.satz_link2`]: "Finale · Satz · Linktext 2 (Immobilienmarketing-Hub)",
  [`${S}finale.satz_nach`]: "Finale · Satz · Teil nach Link 2",
  [`${S}finale.antwort`]: "Finale · Antwortzeit-Hinweis",
};
