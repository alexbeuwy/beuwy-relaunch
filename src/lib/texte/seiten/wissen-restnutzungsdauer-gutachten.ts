import { listeRegistrieren } from "../lesen";

/** Studio-Texte /wissen/restnutzungsdauer-gutachten — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "wissen-restnutzungsdauer-gutachten",
  titel: "Restnutzungsdauer-Gutachten",
  route: "/wissen/restnutzungsdauer-gutachten",
};
const S = "s.wissen-restnutzungsdauer-gutachten.";

const einwaende = listeRegistrieren(
  "wissen-restnutzungsdauer-gutachten",
  "einwaende",
  "Einwand",
  [
    {
      quote: "Ein Gutachten kostet mehr, als es bringt.",
      answer:
        "Nicht bei größeren Objekten. Bei 400.000 € Gebäudewert und einer vom regulären Satz auf eine nachgewiesene Restnutzungsdauer von 30 Jahren verkürzten AfA steigt die jährliche Abschreibung um mehrere tausend Euro. Ein Gutachtenhonorar von 1.500 bis 3.500 € amortisiert sich dann oft im ersten Jahr über die Steuerersparnis.",
    },
    {
      quote: "Das Finanzamt erkennt sowieso jedes Gutachten an.",
      answer:
        "Nein. Seit einem BMF-Schreiben von 2023 verlangt die Finanzverwaltung eine methodisch nachvollziehbare Herleitung nach der ImmoWertV, kein Kurzverfahren aus einem Online-Formular. Ein Gutachten ohne Vor-Ort-Besichtigung und ohne dokumentierten Rechenweg wird häufig abgelehnt.",
    },
    {
      quote: "Bei einem jüngeren Gebäude lohnt sich das ohnehin nicht.",
      answer:
        "Das stimmt meistens. Je jünger und je besser modernisiert ein Gebäude ist, desto kleiner ist der Abstand zwischen der gesetzlich unterstellten und der tatsächlichen Restnutzungsdauer. Am stärksten profitieren ältere Gebäude ohne umfassende Modernisierung.",
    },
    {
      quote: "Einmal Gutachten, für immer gültig.",
      answer:
        "Ein Gutachten gilt für den Zeitraum, den es belegt, und für den Eigentümer, der es beauftragt hat. Bei einem Verkauf beginnt die Betrachtung für den neuen Eigentümer neu — ein bestehendes Gutachten lässt sich nicht einfach übertragen.",
    },
  ],
  { quote: "Zitat", answer: "Antwort" },
);

const kriterien = listeRegistrieren(
  "wissen-restnutzungsdauer-gutachten",
  "kriterien",
  "Kriterium",
  [
    { text: "Öffentlich bestellt und vereidigt oder zertifiziert nach DIN EN ISO/IEC 17024" },
    { text: "Besichtigt das Objekt vor Ort, statt ein Ferngutachten anhand weniger Fotos zu erstellen" },
    { text: "Leitet die Restnutzungsdauer nachvollziehbar nach ImmoWertV und Sachwertrichtlinie her" },
    { text: "Liefert ein schriftliches Gutachten mit begründetem Rechenweg, nicht nur einen Ergebniswert" },
    { text: "Arbeitet unabhängig von Verkäufer oder Vermittler, ohne Erfolgshonorar" },
    { text: "Bringt Erfahrung mit Bestandsimmobilien vergleichbaren Alters mit" },
  ],
  { text: "Text" },
);

const faq = listeRegistrieren(
  "wissen-restnutzungsdauer-gutachten",
  "faq",
  "FAQ",
  [
    {
      q: "Ist ein Restnutzungsdauer-Gutachten dasselbe wie ein Verkehrswertgutachten?",
      a: "Nein. Ein Restnutzungsdauer-Gutachten ist enger gefasst: Es weist ausschließlich die tatsächliche Restnutzungsdauer für die AfA nach, nicht den gesamten Marktwert. Dadurch ist es in der Regel schneller und günstiger als ein vollständiges Verkehrswertgutachten.",
    },
    {
      q: "Wie lange dauert ein Restnutzungsdauer-Gutachten?",
      a: "Von der Objektbesichtigung bis zum fertigen Gutachten vergehen meist ein bis drei Wochen, abhängig vom Gutachter und der Auslastung. Für die Steuererklärung eines laufenden Jahres sollten Sie das rechtzeitig einplanen.",
    },
    {
      q: "Kann ich das Gutachten selbst mit einem Online-Tool erstellen?",
      a: "Nein. Ein Online-Rechner liefert eine erste Einschätzung, ob sich ein Gutachten überhaupt lohnen könnte — er ersetzt kein Gutachten mit Vor-Ort-Besichtigung, das die Finanzverwaltung anerkennt.",
    },
    {
      q: "Was passiert, wenn das Finanzamt das Gutachten trotzdem ablehnt?",
      a: "Das kann vorkommen, wenn die Methodik nicht sauber dokumentiert ist. Ein Einspruch ist möglich, verzögert aber den Steuervorteil. Deshalb lohnt sich vorab ein Blick auf die Kriterien seriöser Gutachter — und ein Gespräch mit Ihrem Steuerberater vor der Beauftragung.",
    },
  ],
  { q: "Frage", a: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Restnutzungsdauer-Gutachten: Wann sich kürzere AfA-Zeiträume lohnen | beuwy",
  [`${S}meta.beschreibung`]:
    "Restnutzungsdauer-Gutachten erklärt: kürzere Nutzungsdauer erhöht die jährliche AfA. Mechanik, wer profitiert, BFH-Einordnung, Kriterien für seriöse Gutachter.",
  [`${S}meta.og_titel`]: "Restnutzungsdauer-Gutachten: Wann sich kürzere AfA-Zeiträume lohnen | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Wie eine kürzere Restnutzungsdauer die jährliche AfA erhöht, wer davon profitiert und woran Sie ein Gutachten erkennen, das vor dem Finanzamt besteht.",

  [`${S}kopf.eyebrow`]: "Wissen",
  [`${S}kopf.titel`]: "Restnutzungsdauer-Gutachten: wann sich eine *kürzere* Zahl auszahlt.",
  [`${S}kopf.text_vor`]:
    "Ein Restnutzungsdauer-Gutachten lohnt sich, wenn ein Sachverständiger für Ihre vermietete Immobilie eine kürzere Restnutzungsdauer nachweist, als der gesetzliche AfA-Satz unterstellt — denn eine kürzere Nutzungsdauer bedeutet automatisch eine höhere jährliche Abschreibung.",
  [`${S}kopf.text_hervor`]:
    "Der Bundesfinanzhof hat 2021 bestätigt, dass Eigentümer diesen Nachweis mit jeder geeigneten gutachterlichen Methode nach der ImmoWertV führen dürfen",
  [`${S}kopf.text_nach`]:
    ". Am stärksten profitieren ältere Gebäude ohne umfassende Modernisierung. Ob es sich für Sie rechnet, hängt vom Gebäudewert, dem Gutachterhonorar und Ihrem Grenzsteuersatz ab.",
  [`${S}kopf.cta`]: "Zusammenarbeit anfragen",
  [`${S}kopf.cta_note`]: "Antwort innerhalb von 24 Stunden",

  [`${S}einwaende.eyebrow`]: "Vier Fehlannahmen",
  [`${S}einwaende.titel`]: "Was über Restnutzungsdauer-Gutachten *falsch* erzählt wird.",
  ...einwaende.defaults,

  [`${S}mechanik.eyebrow`]: "Die Mechanik",
  [`${S}mechanik.titel`]: "Kürzere Restnutzungsdauer, *höhere* Abschreibung.",
  [`${S}mechanik.saetze_titel`]: "In zwei Sätzen",
  [`${S}mechanik.saetze_text`]:
    "Der reguläre AfA-Satz unterstellt eine feste Nutzungsdauer — bei 2 % sind das rechnerisch 50 Jahre. Weist ein Gutachten eine kürzere tatsächliche Restnutzungsdauer nach, ersetzt der Kehrwert dieser Zahl (100 geteilt durch die Restnutzungsdauer in Jahren) den regulären Satz, und die jährliche AfA steigt.",
  [`${S}mechanik.beispiel_titel`]: "Vollständiges Rechenbeispiel",
  [`${S}mechanik.beispiel_text`]:
    "Gebäudewert 350.000 €, Baujahr 1975, regulärer Satz 2 % = 7.000 €/Jahr. Ein Gutachten weist eine Restnutzungsdauer von 28 Jahren nach, statt der gesetzlich unterstellten 50 Jahre. Neuer Satz: 100 / 28 = 3,57 % = 12.500 €/Jahr. Das sind 5.500 € mehr Abschreibung pro Jahr, über zehn Jahre 55.000 €. Bei 42 % Grenzsteuersatz macht das 2.310 € Steuerersparnis pro Jahr, über zehn Jahre 23.100 €.",
  [`${S}mechanik.hinweis`]:
    "Orientierungswert, kein Gutachten und keine Steuerberatung. Ob eine Restnutzungsdauer von 28 Jahren für Ihr konkretes Gebäude nachweisbar ist, entscheidet ausschließlich ein Sachverständiger vor Ort.",

  [`${S}kriterien.eyebrow`]: "Vor der Beauftragung prüfen",
  [`${S}kriterien.titel`]: "Woran Sie ein *seriöses* Gutachten erkennen.",
  ...kriterien.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Ein Kurzgutachten ist kein Beweis.",
  [`${S}unterschied.text`]:
    "Seit die Finanzverwaltung ihre Anforderungen 2023 verschärft hat, prüfen Finanzämter genauer, ob ein Gutachten methodisch sauber hergeleitet ist. Ein günstiges Online-Kurzverfahren ohne Besichtigung hält dieser Prüfung oft nicht stand — ein teureres, sauber dokumentiertes Gutachten schon.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "Unser AfA-Rechner zeigt jeden Rechenschritt offen — vom Gebäudewert über die Modernisierungspunkte bis zur Restnutzungsdauer —, damit Sie vor jedem Gespräch mit einem Gutachter oder Steuerberater schon wissen, ob sich der nächste Schritt überhaupt lohnt.",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor der *Beauftragung* wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Prüfen Sie zuerst, ob es sich *lohnt*.",
  [`${S}finale.text_vor`]: "Eine erste Einschätzung mit Modernisierungspunkten liefert unser",
  [`${S}finale.link_rechner`]: "AfA-Rechner",
  [`${S}finale.text_mitte`]:
    "kostenlos in wenigen Minuten. Die Grundlagen zur regulären AfA und zum Gebäudeanteil zeigt",
  [`${S}finale.link_afa`]: "AfA bei Immobilien",
  [`${S}finale.text_mitte2`]: ". Den Überblick über alle Bausteine bietet der",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
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
  [`${S}kopf.text_hervor`]: "Wissens-Kopf · Hervorgehobener Satz (BFH-Beleg)",
  [`${S}kopf.text_nach`]: "Wissens-Kopf · Textabsatz, Teil nach dem Highlight",
  [`${S}kopf.cta`]: "Wissens-Kopf · Button-Text",
  [`${S}kopf.cta_note`]: "Wissens-Kopf · Hinweis neben dem Button",

  [`${S}einwaende.eyebrow`]: "Einwände · Eyebrow",
  [`${S}einwaende.titel`]: "Einwände · Titel (ein *Wort* = Highlighter)",
  ...einwaende.labels,

  [`${S}mechanik.eyebrow`]: "Mechanik · Eyebrow",
  [`${S}mechanik.titel`]: "Mechanik · Titel (ein *Wort* = Highlighter)",
  [`${S}mechanik.saetze_titel`]: "Mechanik · Spalte 1 · Titel",
  [`${S}mechanik.saetze_text`]: "Mechanik · Spalte 1 · Text",
  [`${S}mechanik.beispiel_titel`]: "Mechanik · Spalte 2 · Titel",
  [`${S}mechanik.beispiel_text`]: "Mechanik · Spalte 2 · Text",
  [`${S}mechanik.hinweis`]: "Mechanik · Kleingedruckter Hinweis",

  [`${S}kriterien.eyebrow`]: "Kriterien · Eyebrow",
  [`${S}kriterien.titel`]: "Kriterien · Titel (ein *Wort* = Highlighter)",
  ...kriterien.labels,

  [`${S}unterschied.label`]: "Der Unterschied · Karten-Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Karten-Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Karten-Text",

  [`${S}beweis.label`]: "Beweis-Anriss · Label",
  [`${S}beweis.text`]: "Beweis-Anriss · Text",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,

  [`${S}finale.label`]: "Finale · Eyebrow",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.text_vor`]: "Finale · Text, Teil vor Link 1 (AfA-Rechner)",
  [`${S}finale.link_rechner`]: "Finale · Link-Text 1 (AfA-Rechner)",
  [`${S}finale.text_mitte`]: "Finale · Text, Teil zwischen Link 1 und Link 2",
  [`${S}finale.link_afa`]: "Finale · Link-Text 2 (AfA bei Immobilien)",
  [`${S}finale.text_mitte2`]: "Finale · Text, Teil zwischen Link 2 und Link 3",
  [`${S}finale.link_hub`]: "Finale · Link-Text 3 (Immobilienmarketing-Hub)",
  [`${S}finale.text_nach`]: "Finale · Text, Teil nach Link 3",
  [`${S}finale.cta`]: "Finale · Button-Text",
  [`${S}finale.cta_note`]: "Finale · Hinweis unter dem Button",
};
