import { listeRegistrieren } from "../lesen";

/** Studio-Texte /performance-marketing-makler — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "performance-marketing-makler", titel: "Performance-Marketing für Makler", route: "/performance-marketing-makler" };
const S = "s.performance-marketing-makler.";

const stufen = listeRegistrieren("performance-marketing-makler", "stufen", "Stufe", [
  {
    anteil: "100 %",
    titel: "Anzeige gesehen",
    text: "Ihre Marke erscheint bei Eigentümern in Ihrer Region, die noch niemanden beauftragt haben, nicht bei einer zufälligen Reichweite ohne Bezug zum Verkauf.",
  },
  {
    anteil: "38 %",
    titel: "Klick, bleiben dran",
    text: "Wer klickt, landet auf einer Landingpage, die genau die Anzeige fortsetzt, nicht auf einer Startseite, die neu erklären muss, worum es geht.",
  },
  {
    anteil: "14 %",
    titel: "Rechner gestartet",
    text: "Adresse rein, Ersteinschätzung raus: der erste konkrete Schritt, der aus einem Interesse eine Handlung macht.",
  },
  {
    anteil: "5 %",
    titel: "Registriert & qualifiziert",
    text: "Die kommunizierte Quote am Ende der Kette: Der Eigentümer liegt mit Score und Kontext im CRM, nicht als Rohkontakt im Postfach.",
  },
], { anteil: "Anteil", titel: "Titel", text: "Text" });

const wochenbericht = listeRegistrieren("performance-marketing-makler", "wochenbericht", "Wochenbericht-Zeile", [
  { woche: "Woche 1", gesehen: "9.400", klicks: "3.460", rechner: "1.280", registriert: "445" },
  { woche: "Woche 2", gesehen: "11.100", klicks: "4.220", rechner: "1.590", registriert: "588" },
  { woche: "Woche 3", gesehen: "10.600", klicks: "4.030", rechner: "1.510", registriert: "519" },
], { woche: "Zeitraum", gesehen: "Anzeige gesehen", klicks: "Klicks", rechner: "Rechner gestartet", registriert: "Registriert" });

const faq = listeRegistrieren("performance-marketing-makler", "faq", "FAQ", [
  {
    q: "Woher stammen die 100 %, 38 %, 14 %, 5 %?",
    a: "Das ist die Quote, mit der wir bei beuwy intern rechnen und kommunizieren, gemessen über eine größere Zahl an Kampagnen. Ihre tatsächliche Kette weicht je nach Region, Objektart und Anzeigenqualität ab, deshalb steht am Ende jeder Woche ein Bericht, keine Prognose.",
  },
  {
    q: "Was, wenn eine Stufe deutlich schlechter läuft als erwartet?",
    a: "Genau dafür existiert der Wochenbericht. Bricht die Kette an einer Stufe ein, zum Beispiel viele Klicks, aber wenige Rechner-Starts, sehen wir das in der ersten Woche und passen die Landingpage oder die Anzeige an, statt erst am Monatsende zu reagieren.",
  },
  {
    q: "Reicht Performance-Marketing ohne eigenes Portal?",
    a: "Nein, nicht auf Dauer. Eine Anzeige, die auf ein fremdes Formular oder eine generische Portalseite führt, verliert die Registrierungs-Stufe. Der Rechner und die Registrierung müssen auf einer Seite liegen, die Ihnen gehört.",
  },
  {
    q: "Wie schnell sehe ich die ersten Zahlen?",
    a: "Die Kette selbst steht, sobald Landingpage, Rechner und CRM-Anbindung live sind, meist innerhalb von vier bis sechs Wochen. Den ersten Wochenbericht mit echten Zahlen bekommen Sie in der ersten vollen Woche nach dem Livegang der Kampagne.",
  },
], { q: "Frage", a: "Antwort" });

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Performance-Marketing für Makler: Die 5%-Kette erklärt | beuwy",
  [`${S}meta.beschreibung`]:
    "Performance-Marketing für Makler: Anzeige, Klick, Rechner, Registrierung — vier Stufen mit realistischer Quote. beuwy liefert den Wochenbericht statt Bauchgefühl.",
  [`${S}meta.og_titel`]: "Performance-Marketing für Makler: Die 5%-Kette erklärt | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Jede Stufe der Kette mit realistischer Quote, gemessen in einem Wochenbericht statt geschätzt am Monatsende. beuwy baut die Kette von der Anzeige bis zum Mandat.",

  [`${S}cta.label`]: "Zusammenarbeit anfragen",

  [`${S}kopf.eyebrow`]: "Akquise",
  [`${S}kopf.titel`]: "Performance-Marketing, das jede Stufe *misst*.",
  [`${S}kopf.text_vor`]:
    "Performance-Marketing für Makler funktioniert als Kette aus vier messbaren Stufen: Eine Anzeige führt auf Ihr Portal, ein Klick landet auf einer Landingpage mit Bewertungsrechner, der Rechner endet in einer Registrierung mit Kontaktdaten, und aus der Registrierung wird ein qualifiziertes Mandat.",
  [`${S}kopf.text_mark`]: "Jede Stufe hat eine realistische Quote",
  [`${S}kopf.text_nach`]:
    ", die wöchentlich gemessen wird, statt dass am Monatsende nur eine Rechnung ohne Ergebnis steht.",
  [`${S}kopf.hinweis`]: "Antwort innerhalb von 24 Stunden",

  [`${S}kette.eyebrow`]: "Der Mechanismus",
  [`${S}kette.titel`]: "Vier Stufen. Eine Quote statt eines *Gefühls*.",
  [`${S}kette.sub`]:
    "Jede Stufe der Kette ist einzeln messbar und einzeln optimierbar. Bricht eine Stufe ein, sehen Sie genau, wo, statt erst am Monatsende zu rätseln.",
  ...stufen.defaults,
  [`${S}kette.card_titel`]: "Was das im Jahr bedeutet",
  [`${S}kette.card_text`]:
    "registrierte und qualifizierte Eigentümer, gemessen an allen, die die Anzeige sehen.",
  [`${S}kette.mandate_suffix`]: "zusätzliche Mandate",
  [`${S}kette.provision_vor`]: "im Jahr, bei Ø",
  [`${S}kette.provision_nach`]: "Provision je Mandat.",

  [`${S}wochenbericht.eyebrow`]: "Statt Bauchgefühl",
  [`${S}wochenbericht.titel`]: "So liest sich ein *Wochenbericht* in der Praxis.",
  [`${S}wochenbericht.sub`]:
    "Ein Beispiel mit angenommenen Zahlen, damit die Kette greifbar wird. Ihre eigenen Werte hängen von Region, Objektart und Anzeigenqualität ab und stehen im echten Bericht, nicht hier.",
  ...wochenbericht.defaults,
  [`${S}wochenbericht.spalte_zeitraum`]: "Zeitraum",
  [`${S}wochenbericht.spalte_gesehen`]: "Anzeige gesehen",
  [`${S}wochenbericht.spalte_klicks`]: "Klicks",
  [`${S}wochenbericht.spalte_rechner`]: "Rechner gestartet",
  [`${S}wochenbericht.spalte_registriert`]: "Registriert",
  [`${S}wochenbericht.text`]:
    "Drei Wochen, drei leicht unterschiedliche Quoten, alle innerhalb der Bandbreite, mit der wir intern rechnen. Genau diese Schwankung ist der Grund, warum ein einzelner Tag oder eine einzelne Woche nichts über den Erfolg einer Kampagne aussagt, der Verlauf über mehrere Wochen dagegen schon.",

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Eine Kette lügt nicht.",
  [`${S}unterschied.text`]:
    "Ein Media-Budget allein sagt nichts über Anfragen. Erst die Kette aus Anzeige, Landingpage, Rechner und Registrierung macht sichtbar, wo Interesse verloren geht, und genau dort setzt die Optimierung an, nicht am Bauchgefühl.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "Bei RIEGEL Immobilien läuft genau diese Kette mit einem Bewertungsrechner auf amtlichen Bodenrichtwerten: neun zusätzliche Mandate in den ersten drei Monaten, ohne einen einzigen gekauften Lead.",
  [`${S}beweis.link`]: "Weitere Fallstudien ansehen →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Budget wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihre *Kette*.",
  [`${S}finale.text_vor`]: "Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_mid1`]: ", die volle Systematik der eigenen Quelle auf der Seite",
  [`${S}finale.link_lead`]: "Leadgenerierung für Immobilienmakler",
  [`${S}finale.text_mid2`]: "und wie sich eigene Quelle gegen gekauften Kontakt rechnet unter",
  [`${S}finale.link_eigentuemer`]: "Eigentümer-Leads generieren",
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
  [`${S}kopf.text_nach`]: "Wissens-Kopf · Antwortsatz · Teil nach dem Highlighter",
  [`${S}kopf.hinweis`]: "Wissens-Kopf · Mikrozeile unter dem CTA",

  [`${S}kette.eyebrow`]: "Kette · Eyebrow",
  [`${S}kette.titel`]: "Kette · Titel (*Wort* = Hervorhebung)",
  [`${S}kette.sub`]: "Kette · Subline",
  [`${S}kette.card_titel`]: "Jahreskarte · Label",
  [`${S}kette.card_text`]: "Jahreskarte · Text unter der Quote",
  [`${S}kette.mandate_suffix`]: "Jahreskarte · Text nach der Mandate-Zahl",
  [`${S}kette.provision_vor`]: "Jahreskarte · Text vor der Provision",
  [`${S}kette.provision_nach`]: "Jahreskarte · Text nach der Provision",

  [`${S}wochenbericht.eyebrow`]: "Wochenbericht · Eyebrow",
  [`${S}wochenbericht.titel`]: "Wochenbericht · Titel (*Wort* = Hervorhebung)",
  [`${S}wochenbericht.sub`]: "Wochenbericht · Subline",
  [`${S}wochenbericht.spalte_zeitraum`]: "Wochenbericht · Spaltenkopf 1",
  [`${S}wochenbericht.spalte_gesehen`]: "Wochenbericht · Spaltenkopf 2",
  [`${S}wochenbericht.spalte_klicks`]: "Wochenbericht · Spaltenkopf 3",
  [`${S}wochenbericht.spalte_rechner`]: "Wochenbericht · Spaltenkopf 4",
  [`${S}wochenbericht.spalte_registriert`]: "Wochenbericht · Spaltenkopf 5",
  [`${S}wochenbericht.text`]: "Wochenbericht · Fließtext unter der Tabelle",

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
  [`${S}finale.text_vor`]: "Finale · Text · Teil vor Link 1",
  [`${S}finale.link_hub`]: "Finale · Link · Immobilienmarketing-Hub",
  [`${S}finale.text_mid1`]: "Finale · Text · Teil zwischen Link 1 und 2",
  [`${S}finale.link_lead`]: "Finale · Link · Leadgenerierung für Immobilienmakler",
  [`${S}finale.text_mid2`]: "Finale · Text · Teil zwischen Link 2 und 3",
  [`${S}finale.link_eigentuemer`]: "Finale · Link · Eigentümer-Leads generieren",
  [`${S}finale.text_nach`]: "Finale · Text · Teil nach Link 3",
  [`${S}finale.hinweis`]: "Finale · Mikrozeile unter dem CTA",

  ...stufen.labels,
  ...wochenbericht.labels,
  ...faq.labels,
};
