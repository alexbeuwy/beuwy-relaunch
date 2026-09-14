import { listeRegistrieren } from "../lesen";

/** Studio-Texte /flowfact-website — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "flowfact-website",
  titel: "FLOWFACT-Website",
  route: "/flowfact-website",
};
const S = "s.flowfact-website.";

const problem = listeRegistrieren(
  "flowfact-website",
  "problem",
  "Einwand",
  [
    {
      quote: "Der Preis wird in FLOWFACT geändert. Auf der Website steht noch der alte.",
      antwort:
        "Ohne Anbindung sind Website und CRM zwei getrennte Wahrheiten. Jede Änderung im System muss jemand ein zweites Mal von Hand auf der Website nachziehen, sonst sieht der Interessent einen falschen Preis.",
    },
    {
      quote: "Ein neues Objekt braucht zwei Uploads, eins ins CRM, eins auf die Website.",
      antwort:
        "Doppelte Pflege kostet Zeit, die niemand bucht, die aber jede Woche anfällt. Bei fünf neuen Objekten im Monat sind das fünf Vorgänge, die es mit einer sauberen Anbindung gar nicht gäbe.",
    },
    {
      quote: "Anfragen von der Website landen im allgemeinen Postfach, nicht im FLOWFACT-Vorgang.",
      antwort:
        "Ohne Rückkanal weiß niemand, welche Anfrage zu welchem Objekt und welchem Vorgang gehört. Der Rückruf verzögert sich, oder er fällt ganz durch, weil die Information im falschen System liegt.",
    },
    {
      quote: "Niemand im Team weiß mehr, welches System gerade die Wahrheit ist.",
      antwort:
        "Wachsen Website und CRM getrennt, driften Objektstatus, Preise und Kontaktdaten irgendwann auseinander. Am Ende prüft das Team beide Systeme, bevor es einem Eigentümer eine verbindliche Auskunft gibt.",
    },
  ],
  { quote: "Zitat", antwort: "Antwort" },
);

const anbindung = listeRegistrieren(
  "flowfact-website",
  "anbindung",
  "Schritt",
  [
    {
      titel: "Analyse der bestehenden FLOWFACT-Struktur",
      text: "Wir sichten Objektfelder, Vorgangslogik und die vorhandene Schnittstelle, bevor eine Zeile Website-Code entsteht.",
    },
    {
      titel: "Objekt-Sync einrichten",
      text: "Objekte laufen automatisch aus FLOWFACT auf die Website, im Layout Ihrer Marke statt im Standard-Raster.",
    },
    {
      titel: "Anfrage-Routing mit Score",
      text: "Jede Anfrage schreibt mit Quelle und Score direkt in den passenden FLOWFACT-Vorgang, kein Postfach dazwischen.",
    },
    {
      titel: "Testphase mit echten Objekten",
      text: "Vor dem Livegang prüfen wir Preisänderungen, neue Objekte und eingehende Anfragen im echten Datenfluss, nicht nur mit Testdaten.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const faq = listeRegistrieren(
  "flowfact-website",
  "faq",
  "FAQ",
  [
    {
      frage: "Muss ich FLOWFACT wechseln?",
      antwort: "Nein. Ihr CRM bleibt exakt so, wie es ist — wir docken an, wir ersetzen nichts.",
    },
    {
      frage: "Wie technisch aufwendig ist eine FLOWFACT-Anbindung?",
      antwort:
        "Das hängt von Ihrer bestehenden Datenstruktur ab. In den meisten Fällen läuft die Anbindung über eine vorhandene Exportschnittstelle, die wir sauber an die Website anbinden, statt eine neue Insellösung zu bauen.",
    },
    {
      frage: "Was kostet doppelte Datenpflege wirklich?",
      antwort:
        "Selten einen sichtbaren Posten in der Buchhaltung, aber jede Woche Zeit im Team: ein zweiter Upload je Objekt, eine zweite Preisänderung, eine Anfrage, die erst gesucht werden muss. Genau das fällt mit einer sauberen Anbindung weg.",
    },
    {
      frage: "Funktioniert dasselbe Prinzip auch mit anderen CRMs?",
      antwort:
        "Ja. Das Prinzip ist bei jedem System dasselbe — welche Anbindung sich für Ihr Haus lohnt, zeigt der Maklersoftware-Vergleich.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "FLOWFACT-Website: Anbindung statt Insellösung | beuwy",
  [`${S}meta.beschreibung`]:
    "FLOWFACT-Website: wie die Anbindung an Ihr CRM funktioniert, warum doppelte Datenpflege ein stiller Kostenfaktor ist, und das Anbindungsmuster von beuwy.",
  [`${S}meta.og_beschreibung`]:
    "Objekte aus FLOWFACT automatisch auf die Website, Anfragen mit Quelle zurück ins CRM: das Anbindungsmuster gegen doppelte Datenpflege und getrennte Insellösungen.",

  [`${S}hero.eyebrow`]: "CRM · FLOWFACT",
  [`${S}hero.titel`]: "FLOWFACT-Website: *Anbindung* statt Insellösung.",
  [`${S}hero.text_vor`]:
    "Über eine Schnittstelle, die Objekte automatisch aus FLOWFACT auf die Website spielt und Anfragen mit Quelle zurück in den passenden Vorgang schreibt, statt Website und CRM als zwei getrennte Systeme zu pflegen. In der Praxis läuft das über die vorhandene Exportstrecke oder eine direkte Anbindung —",
  [`${S}hero.text_mitte`]:
    "technisch lösbar, aber nur so gut, wie die Website sie sauber entgegennimmt",
  [`${S}hero.text_nach`]: ". Fehlt diese Anbindung, pflegt jemand im Team dieselben Daten zweimal.",
  [`${S}hero.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",
  [`${S}hero.bild_alt`]: "Makler gleicht am Bildschirm zwei Systeme ab, CRM-Vorgang und Website-Ansicht",

  [`${S}problem.eyebrow`]: "Die Schnittstellen-Realität",
  [`${S}problem.titel`]: "Zwei Systeme ohne Anbindung sind zwei *Wahrheiten*.",
  ...problem.defaults,

  [`${S}anbindung.eyebrow`]: "Das Anbindungsmuster",
  [`${S}anbindung.titel`]: "Vier Schritte von der *Analyse* bis zum Livegang.",
  [`${S}anbindung.sub`]:
    "Kein neues CRM, keine Umstellung für das Team — die Website lernt, mit FLOWFACT zu sprechen, nicht umgekehrt.",
  ...anbindung.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Zwei Systeme. Eine Wahrheit.",
  [`${S}unterschied.text`]:
    "Jede doppelt gepflegte Objektzeile kostet Zeit, die niemand bucht, aber jeder im Team spürt. Eine saubere Anbindung macht FLOWFACT und Website zu einem System mit zwei Ansichten, statt zu zwei Systemen, die jemand von Hand synchron hält.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.titel`]:
    "beuwy verbindet Marke und System seit 17 Jahren, zuletzt für Häuser wie Ihres. Bei RIEGEL Immobilien landet jede Anfrage mit Quelle und nächstem Schritt direkt im Maklersystem — Ergebnis: neun Abschlüsse, 342.000 € Volumen in sechs Wochen.",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor der *Anbindung* wissen wollen.",
  ...faq.defaults,
  [`${S}faq.hinweis`]: "FLOWFACT ist eine Marke der FLOWFACT AG. beuwy ist unabhängiger Dienstleister.",

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Eine Wahrheit. Ein *System*.",
  [`${S}finale.text_a`]: "Wie die Anbindung bei anderen Systemen aussieht, zeigt der",
  [`${S}finale.link_vergleich`]: "Maklersoftware-Vergleich",
  [`${S}finale.text_b`]: ". Den Überblick über alle Bausteine finden Sie im",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_c`]: ".",
  [`${S}finale.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}finale.cta_hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",

  [`${S}hero.eyebrow`]: "Wissens-Kopf · Eyebrow",
  [`${S}hero.titel`]: "Wissens-Kopf · H1 (ein *Wort* = Highlighter)",
  [`${S}hero.text_vor`]: "Wissens-Kopf · Intro-Satz, Teil vor dem Highlight",
  [`${S}hero.text_mitte`]: "Wissens-Kopf · Intro-Satz, hervorgehobener Teil",
  [`${S}hero.text_nach`]: "Wissens-Kopf · Intro-Satz, Teil nach dem Highlight",
  [`${S}hero.cta_label`]: "Wissens-Kopf · Knopf-Text",
  [`${S}hero.cta_hinweis`]: "Wissens-Kopf · Hinweis neben dem Knopf",
  [`${S}hero.bild_alt`]: "Wissens-Kopf · Bild-Alt-Text",

  [`${S}problem.eyebrow`]: "Problem · Eyebrow",
  [`${S}problem.titel`]: "Problem · Titel (ein *Wort* = Highlighter)",
  ...problem.labels,

  [`${S}anbindung.eyebrow`]: "Anbindungsmuster · Eyebrow",
  [`${S}anbindung.titel`]: "Anbindungsmuster · Titel (ein *Wort* = Highlighter)",
  [`${S}anbindung.sub`]: "Anbindungsmuster · Subline",
  ...anbindung.labels,

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.titel`]: "Beweis · Titel",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,
  [`${S}faq.hinweis`]: "FAQ · Markenhinweis (Fußzeile)",

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.text_a`]: "Finale · Satz, Teil vor Link 1",
  [`${S}finale.link_vergleich`]: "Finale · Link-Text (Maklersoftware-Vergleich)",
  [`${S}finale.text_b`]: "Finale · Satz, Teil zwischen Link 1 und 2",
  [`${S}finale.link_hub`]: "Finale · Link-Text (Immobilienmarketing-Hub)",
  [`${S}finale.text_c`]: "Finale · Satz-Ende",
  [`${S}finale.cta_label`]: "Finale · Knopf-Text",
  [`${S}finale.cta_hinweis`]: "Finale · Hinweis unter dem Knopf",
};
