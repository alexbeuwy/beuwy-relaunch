import { listeRegistrieren } from "../lesen";

/** Studio-Texte /tools/afa-rechner — nur die Seitentexte; der AfA-Wizard bleibt Code. */
export const SEITE = { slug: "tools-afa-rechner", titel: "AfA-Rechner", route: "/tools/afa-rechner" };
const S = "s.tools-afa-rechner.";

const mechanik = listeRegistrieren(
  "tools-afa-rechner",
  "mechanik",
  "Mechanik-Schritt",
  [
    {
      titel: "Der reguläre Satz unterstellt eine feste Nutzungsdauer",
      text: "Das Finanzamt rechnet bei vermieteten Bestandsimmobilien standardmäßig mit 2 % pro Jahr, bei Neubauten ab 2023 mit 3 % — unabhängig davon, wie alt das Gebäude wirklich ist oder wie gut es in Schuss ist. Das ist eine Pauschale, keine Einzelfallprüfung.",
    },
    {
      titel: "Ein Gutachten ersetzt die Pauschale durch eine echte Zahl",
      text: "Ein Restnutzungsdauer-Gutachten ermittelt, wie viele Jahre das konkrete Gebäude nach Alter, Bauweise und Modernisierungsstand realistisch noch nutzbar ist. Ist diese Zahl kürzer als die gesetzlich unterstellte Nutzungsdauer, steigt die jährliche AfA — Sie schreiben denselben Gebäudewert schneller ab.",
    },
    {
      titel: "Der Bundesfinanzhof hat den Weg dafür 2021 bestätigt",
      text: "Seitdem gilt: Eigentümer dürfen die kürzere Nutzungsdauer mit jeder geeigneten, nachvollziehbaren Methode belegen — nicht nur mit dem starren Rechenweg aus der ImmoWertV. Das Gutachten muss aber methodisch sauber sein, nicht nur eine Behauptung.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const wer = listeRegistrieren(
  "tools-afa-rechner",
  "wer",
  "Zielgruppen-Punkt",
  [
    {
      text: "Vermietete Bestandsimmobilien, die deutlich älter sind als 20–30 Jahre — je größer der Abstand zwischen Alter und gesetzlich unterstellter Nutzungsdauer, desto größer der mögliche Effekt.",
    },
    {
      text: "Käufe mit hohem Grenzsteuersatz — der steuerliche Effekt einer höheren AfA skaliert direkt mit dem persönlichen Steuersatz.",
    },
    {
      text: "Gebäude ohne umfassende Kernsanierung — ein frisch durchmodernisiertes Haus hat oft schon eine lange Restnutzungsdauer, hier bringt ein Gutachten seltener einen Sprung.",
    },
  ],
  { text: "Text" },
);

const gutachter = listeRegistrieren(
  "tools-afa-rechner",
  "gutachter",
  "Gutachter-Kriterium",
  [
    {
      text: "Öffentlich bestellt und vereidigt oder von einer anerkannten Institution zertifiziert (z. B. DEKRA, TÜV, DIA) — keine reine Selbstauskunft ohne Qualifikationsnachweis.",
    },
    { text: "Vor-Ort-Begehung des Gebäudes, nicht nur eine Einschätzung aus Fotos oder Katasterdaten." },
    {
      text: "Vollständiges Gutachten nach ImmoWertV-Methodik mit nachvollziehbarer Herleitung — kein Kurzgutachten, das nur eine Zahl ohne Begründung liefert.",
    },
  ],
  { text: "Text" },
);

const faq = listeRegistrieren(
  "tools-afa-rechner",
  "faq",
  "FAQ",
  [
    {
      frage: "Wie genau ist dieser Rechner?",
      antwort:
        "Er zeigt eine Orientierung auf Basis von Baujahr, Modernisierungsgrad und einer vereinfachten Nutzungsdauer-Logik, kein Gutachtenergebnis. Ob sich ein Gutachten für Ihr konkretes Objekt lohnt, prüft am Ende ein Sachverständiger vor Ort.",
    },
    {
      frage: "Erkennt das Finanzamt das an?",
      antwort:
        "Grundsätzlich ja, mit Einschränkungen: Seit dem BFH-Urteil von 2021 dürfen Sie eine kürzere Nutzungsdauer mit jeder geeigneten Methode nachweisen. Das Finanzamt prüft das Gutachten im Einzelfall — akzeptiert werden in der Praxis vor allem methodisch saubere Gutachten von qualifizierten, unabhängigen Sachverständigen, nicht jede pauschale Kurzeinschätzung. Eine Garantie gibt es nie, das ist Aufgabe Ihres Steuerberaters.",
    },
    {
      frage: "Was kostet ein Restnutzungsdauer-Gutachten?",
      antwort:
        "Das hängt von Objektgröße und Gutachter ab. Ob sich die Kosten lohnen, zeigt der Vergleich mit der Mehr-Abschreibung über mehrere Jahre, die dieser Rechner als Orientierung ausgibt — bei kleinen Kaufpreisen oder bereits kurzer verbleibender Nutzungsdauer kann sich ein Gutachten schlicht nicht rechnen.",
    },
    {
      frage: "Gilt das auch für selbst genutzte Immobilien?",
      antwort:
        "Nein. Die AfA nach § 7 EStG und damit auch dieser Rechner betreffen ausschließlich vermietete Immobilien im Privatvermögen. Bei einer selbst genutzten Wohnung gibt es keine Abschreibung auf den Kaufpreis.",
    },
    {
      frage: "Was macht beuwy mit meiner Berechnung?",
      antwort:
        "Ohne Ihre E-Mail-Adresse: nichts. Die Berechnung läuft im Browser, es wird nichts gespeichert und niemand kontaktiert Sie. Der PDF-Report entsteht ebenfalls lokal bei Ihnen und lässt sich direkt herunterladen — erst wenn Sie zusätzlich die Auswertung per E-Mail anfordern, landet Ihre Anfrage bei uns.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "AfA-Rechner: Restnutzungsdauer und Abschreibung berechnen | beuwy",
  [`${S}meta.beschreibung`]:
    "Kostenlos und sofort: Kaufpreis, Baujahr und Modernisierung eingeben und sehen, ob ein Restnutzungsdauer-Gutachten Ihre AfA erhöht — mit offenem Rechenweg und PDF-Auswertung zum Sofort-Download, ohne E-Mail-Pflicht.",
  [`${S}hero.eyebrow`]: "Kostenloser AfA-Rechner für Eigentümer",
  [`${S}hero.titel`]: "AfA-Rechner: Wie viel *mehr* Abschreibung steckt in Ihrer Immobilie?",
  [`${S}hero.sub_vor`]:
    "Kaufpreis, Baujahr und Modernisierung eingeben — die Spanne zwischen regulärer AfA und AfA mit Restnutzungsdauer-Gutachten steht sofort da, als PDF direkt zum Herunterladen.",
  [`${S}hero.sub_highlight`]: "Kein E-Mail-Zwang, um Ergebnis oder PDF zu sehen",
  [`${S}hero.sub_nach`]: ", anders als bei den meisten AfA-Rechnern im Netz.",
  [`${S}mechanik.eyebrow`]: "Die Mechanik",
  [`${S}mechanik.titel`]: "Wie ein Restnutzungsdauer-Gutachten die *AfA* erhöht.",
  [`${S}mechanik.sub`]: "Drei Schritte erklären den Effekt, den der Rechner oben in Zahlen zeigt.",
  ...mechanik.defaults,
  [`${S}mechanik.wer_titel`]: "Für wen sich ein Gutachten meistens lohnt",
  ...wer.defaults,
  [`${S}mechanik.gutachter_titel`]: "Woran Sie einen seriösen Gutachter erkennen",
  ...gutachter.defaults,
  [`${S}mechanik.quelle_vor1`]: "Mehr zum Ablauf eines Gutachtens und was es kostet:",
  [`${S}mechanik.quelle_link1`]: "Restnutzungsdauer-Gutachten",
  [`${S}mechanik.quelle_vor2`]:
    ". Wie die AfA für Immobilien grundsätzlich funktioniert, auch jenseits dieses Rechners:",
  [`${S}mechanik.quelle_link2`]: "AfA Immobilien",
  [`${S}mechanik.quelle_nach`]: ".",
  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *Gutachten* wissen wollen.",
  ...faq.defaults,
  [`${S}pitch.label`]: "Für Makler",
  [`${S}pitch.titel`]: "Sie sind Makler?",
  [`${S}pitch.text_vor`]:
    "Genau dieses Tool bauen wir in Ihren Farben auf Ihre Domain — Ihr Branding, Ihre Leads, angebunden an Ihr CRM.",
  [`${S}pitch.link`]: "Zusammenarbeit anfragen →",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel (ein *Wort* = Highlighter)",
  [`${S}hero.sub_vor`]: "Hero · Subline · Teil vor dem Highlighter",
  [`${S}hero.sub_highlight`]: "Hero · Subline · Hervorgehobener Teil",
  [`${S}hero.sub_nach`]: "Hero · Subline · Teil nach dem Highlighter",
  [`${S}mechanik.eyebrow`]: "Mechanik · Eyebrow",
  [`${S}mechanik.titel`]: "Mechanik · Titel (ein *Wort* = Highlighter)",
  [`${S}mechanik.sub`]: "Mechanik · Subline",
  ...mechanik.labels,
  [`${S}mechanik.wer_titel`]: "Mechanik · Zwischentitel „Für wen lohnt sich ein Gutachten“",
  ...wer.labels,
  [`${S}mechanik.gutachter_titel`]: "Mechanik · Zwischentitel „Seriöser Gutachter“",
  ...gutachter.labels,
  [`${S}mechanik.quelle_vor1`]: "Mechanik · Quellenhinweis · Teil vor Link 1",
  [`${S}mechanik.quelle_link1`]: "Mechanik · Quellenhinweis · Link 1 (Restnutzungsdauer-Gutachten)",
  [`${S}mechanik.quelle_vor2`]: "Mechanik · Quellenhinweis · Teil zwischen Link 1 und Link 2",
  [`${S}mechanik.quelle_link2`]: "Mechanik · Quellenhinweis · Link 2 (AfA Immobilien)",
  [`${S}mechanik.quelle_nach`]: "Mechanik · Quellenhinweis · Teil nach Link 2 (Satzende)",
  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,
  [`${S}pitch.label`]: "Makler-Sektion · Label",
  [`${S}pitch.titel`]: "Makler-Sektion · Titel",
  [`${S}pitch.text_vor`]: "Makler-Sektion · Text vor dem Link",
  [`${S}pitch.link`]: "Makler-Sektion · Link-Text (führt zu /anfrage)",
};
