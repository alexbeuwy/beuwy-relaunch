import { listeRegistrieren } from "../lesen";

/** Studio-Texte /wissen/spekulationssteuer-immobilien — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "wissen-spekulationssteuer-immobilien",
  titel: "Spekulationssteuer bei Immobilien",
  route: "/wissen/spekulationssteuer-immobilien",
};
const S = "s.wissen-spekulationssteuer-immobilien.";

const szenarien = listeRegistrieren(
  "wissen-spekulationssteuer-immobilien",
  "szenarien",
  "Szenario",
  [
    { szenario: "Vermietet, Verkauf nach 6 Jahren", frist: "6 von 10 Jahren", eigennutzung: "keine", steuerpflicht: "ja, voller Gewinn" },
    { szenario: "Vermietet, Verkauf nach 11 Jahren", frist: "11 von 10 Jahren", eigennutzung: "keine", steuerpflicht: "nein, Frist abgelaufen" },
    { szenario: "Selbst bewohnt, Verkauf nach 4 Jahren", frist: "4 von 10 Jahren", eigennutzung: "durchgehend", steuerpflicht: "nein, Ausnahme greift" },
    {
      szenario: "Vermietet, dann 2 Jahre selbst bewohnt, Verkauf im 3. Jahr",
      frist: "beliebig",
      eigennutzung: "3 Kalenderjahre",
      steuerpflicht: "nein, Ausnahme greift",
    },
  ],
  { szenario: "Szenario", frist: "Haltedauer", eigennutzung: "Eigennutzung", steuerpflicht: "Steuerpflicht" },
);

const ausnahmen = listeRegistrieren(
  "wissen-spekulationssteuer-immobilien",
  "ausnahmen",
  "Ausnahme-Punkt",
  [
    {
      text: "Die Immobilie wurde im Jahr des Verkaufs und in den zwei vollen Kalenderjahren davor durchgehend selbst bewohnt.",
    },
    {
      text: "Alternativ genügt eine Eigennutzung im Verkaufsjahr, im Vorjahr vollständig und im Jahr davor zumindest zeitweise — es müssen keine drei vollen Jahre sein.",
    },
    {
      text: "Vermietung an Kinder, für die noch Kindergeld bezogen wird, zählt in der Praxis häufig als Eigennutzung, im Einzelfall bewertet das Finanzamt das unterschiedlich.",
    },
    {
      text: "Nach zehn Jahren Haltedauer entfällt die Steuerpflicht unabhängig von einer Eigennutzung vollständig.",
    },
  ],
  { text: "Text" },
);

const faq = listeRegistrieren(
  "wissen-spekulationssteuer-immobilien",
  "faq",
  "FAQ",
  [
    {
      frage: "Ab wann läuft die 10-Jahres-Frist?",
      antwort:
        "Sie beginnt mit dem Datum des notariellen Kaufvertrags, nicht mit dem Einzug oder der Grundbucheintragung. Für den Verkauf zählt ebenso das Datum des notariellen Verkaufsvertrags, nicht der Übergabetermin.",
    },
    {
      frage: "Zählt eine Schenkung oder Erbschaft als Neuanschaffung?",
      antwort:
        "Nein. Bei Schenkung und Erbschaft übernimmt die neue Eigentümerin oder der neue Eigentümer die Anschaffungsdaten der Vorbesitzer. Wer eine seit zwölf Jahren im Familienbesitz befindliche Immobilie erbt und sofort verkauft, zahlt in der Regel keine Spekulationssteuer.",
    },
    {
      frage: "Wie hoch ist die Spekulationssteuer konkret?",
      antwort:
        "Es gibt keinen festen Steuersatz. Der Veräußerungsgewinn wird dem übrigen Einkommen zugerechnet und mit dem individuellen, progressiven Einkommensteuersatz versteuert, der je nach Gesamteinkommen zwischen rund 14 % und 45 % liegt.",
    },
    {
      frage: "Kann ein Makler die Steuerpflicht für mich prüfen?",
      antwort:
        "Ein Makler kann die Frist einordnen und auf die Eigennutzungs-Ausnahme hinweisen, das ersetzt aber keine steuerliche Beratung. Für eine verbindliche Berechnung, insbesondere bei Sonderfällen wie Teilverkäufen oder häuslichem Arbeitszimmer, braucht es einen Steuerberater.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Spekulationssteuer bei Immobilien: Fristen, Ausnahmen, Rechenbeispiele | beuwy",
  [`${S}meta.beschreibung`]:
    "Spekulationssteuer bei Immobilien fällt innerhalb der 10-Jahres-Frist an, außer bei Eigennutzung. Fristen, Ausnahmen und Rechenbeispiele im Überblick.",
  [`${S}meta.og_titel`]: "Spekulationssteuer bei Immobilien: Fristen, Ausnahmen, Rechenbeispiele | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Die 10-Jahres-Frist nach § 23 EStG, die Eigennutzungs-Ausnahme und ein Rechenbeispiel mit persönlichem Steuersatz — verständlich erklärt, mit klarer Grenze zur Steuerberatung.",

  [`${S}kopf.eyebrow`]: "Steuer & Fristen",
  [`${S}kopf.titel`]: "Spekulationssteuer bei Immobilien: die *10-Jahres-Frist* einfach erklärt.",
  [`${S}kopf.intro_vor`]:
    "Spekulationssteuer fällt nach § 23 Einkommensteuergesetz an, wenn zwischen Kauf und Verkauf einer nicht selbst genutzten Immobilie weniger als zehn Jahre liegen. Der Gewinn aus dem Verkauf wird dann wie normales Einkommen mit dem persönlichen Steuersatz versteuert.",
  [`${S}kopf.intro_highlight`]:
    "Wurde die Immobilie im Verkaufsjahr und den zwei Jahren davor selbst bewohnt, entfällt die Steuer unabhängig von der Haltedauer",
  [`${S}kopf.intro_nach`]: ". Nach Ablauf von zehn Jahren entfällt sie ebenfalls, ganz ohne Eigennutzung.",
  [`${S}kopf.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}kopf.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",

  [`${S}fristen.eyebrow`]: "Vier Szenarien",
  [`${S}fristen.titel`]: "Dieselbe Frist, vier ganz unterschiedliche *Ergebnisse*.",
  [`${S}fristen.head_szenario`]: "Szenario",
  [`${S}fristen.head_frist`]: "Haltedauer",
  [`${S}fristen.head_eigennutzung`]: "Eigennutzung",
  [`${S}fristen.head_steuerpflicht`]: "Steuerpflicht",
  ...szenarien.defaults,
  [`${S}fristen.rechenbeispiel`]:
    "Rechenbeispiel: Kaufpreis 300.000 € im Jahr 2019, Verkauf 2026 für 420.000 €, ohne Eigennutzung, also nach sieben von zehn Jahren. Der Veräußerungsgewinn beträgt 120.000 €. Bei einem persönlichen Steuersatz von 42 % ergibt das rund 50.400 € Einkommensteuer auf diesen Gewinn, zusätzlich zum sonstigen Einkommen des Jahres. Hätte dieselbe Person bis 2029 gewartet, wäre der gesamte Gewinn steuerfrei geblieben.",

  [`${S}ausnahmen.eyebrow`]: "Die Eigennutzungs-Ausnahme",
  [`${S}ausnahmen.titel`]: "Vier Punkte, an denen die *Steuerpflicht* tatsächlich entfällt.",
  ...ausnahmen.defaults,

  [`${S}unterschied.label`]: "Die Grenze",
  [`${S}unterschied.titel`]: "Wir ordnen ein. Rechnen tut Ihr Steuerberater.",
  [`${S}unterschied.text`]:
    "Ein Makler kann die Frist und die Eigennutzungs-Ausnahme frühzeitig ansprechen, damit ein Eigentümer nicht mitten im Verkaufsprozess von der Steuer überrascht wird. Eine verbindliche Berechnung, insbesondere bei anteiliger Eigennutzung oder mehreren Objekten, gehört in die Hände einer Steuerberatung. Wir geben hier keine individuelle Steuer- oder Rechtsberatung.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "17 Jahre Markenarbeit, unter anderem für Bosch, Continental und Michelin, plus eigene Vertriebserfahrung: Klarheit in komplexen Themen ist unser tägliches Geschäft, auch wenn Steuerfragen am Ende in die Hände eines Steuerberaters gehören.",
  [`${S}beweis.link`]: "Mehr über beuwy erfahren →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Gespräch wissen wollen.",
  ...faq.defaults,

  [`${S}fazit.label`]: "Der nächste Schritt",
  [`${S}fazit.titel`]: "Verkaufen Sie mit *Überblick*, nicht mit Überraschung.",
  [`${S}fazit.text_1`]: "Einen Überblick über alle Bausteine finden Sie im",
  [`${S}fazit.link1`]: "Immobilienmarketing-Hub",
  [`${S}fazit.text_2`]: ", die Abschreibungsregeln für vermietete Objekte auf der Seite",
  [`${S}fazit.link2`]: "AfA bei Immobilien",
  [`${S}fazit.text_3`]: ", eine erste, kostenlose Werteinschätzung liefert der",
  [`${S}fazit.link3`]: "Verkaufspreisrechner",
  [`${S}fazit.text_4`]: ".",
  [`${S}fazit.cta_hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · OpenGraph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · OpenGraph-Beschreibung",

  [`${S}kopf.eyebrow`]: "Wissens-Kopf · Eyebrow",
  [`${S}kopf.titel`]: "Wissens-Kopf · H1 (ein *Wort* = Hervorhebung)",
  [`${S}kopf.intro_vor`]: "Wissens-Kopf · Intro-Absatz · Teil vor dem Highlighter",
  [`${S}kopf.intro_highlight`]: "Wissens-Kopf · Intro-Absatz · Highlighter-Teil",
  [`${S}kopf.intro_nach`]: "Wissens-Kopf · Intro-Absatz · Teil nach dem Highlighter",
  [`${S}kopf.cta_label`]: "Wissens-Kopf · CTA-Button-Text",
  [`${S}kopf.cta_hinweis`]: "Wissens-Kopf · Mikrozeile unter dem CTA",

  [`${S}fristen.eyebrow`]: "Fristen-Tabelle · Eyebrow",
  [`${S}fristen.titel`]: "Fristen-Tabelle · Titel (ein *Wort* = Hervorhebung)",
  [`${S}fristen.head_szenario`]: "Fristen-Tabelle · Tabellenkopf · Szenario",
  [`${S}fristen.head_frist`]: "Fristen-Tabelle · Tabellenkopf · Haltedauer",
  [`${S}fristen.head_eigennutzung`]: "Fristen-Tabelle · Tabellenkopf · Eigennutzung",
  [`${S}fristen.head_steuerpflicht`]: "Fristen-Tabelle · Tabellenkopf · Steuerpflicht",
  ...szenarien.labels,
  [`${S}fristen.rechenbeispiel`]: "Fristen-Tabelle · Rechenbeispiel-Absatz",

  [`${S}ausnahmen.eyebrow`]: "Eigennutzungs-Ausnahme · Eyebrow",
  [`${S}ausnahmen.titel`]: "Eigennutzungs-Ausnahme · Titel (ein *Wort* = Hervorhebung)",
  ...ausnahmen.labels,

  [`${S}unterschied.label`]: "Die Grenze · Label",
  [`${S}unterschied.titel`]: "Die Grenze · Titel",
  [`${S}unterschied.text`]: "Die Grenze · Text",

  [`${S}beweis.label`]: "Beweis-Anriss · Label",
  [`${S}beweis.text`]: "Beweis-Anriss · Text",
  [`${S}beweis.link`]: "Beweis-Anriss · Link-Text (Über uns)",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Hervorhebung)",
  ...faq.labels,

  [`${S}fazit.label`]: "Finale · Label",
  [`${S}fazit.titel`]: "Finale · H2 (ein *Wort* = Hervorhebung)",
  [`${S}fazit.text_1`]: "Finale · Absatz · Teil 1 (vor Link 1)",
  [`${S}fazit.link1`]: "Finale · Absatz · Link 1 (Immobilienmarketing-Hub)",
  [`${S}fazit.text_2`]: "Finale · Absatz · Teil 2 (zwischen Link 1 und 2)",
  [`${S}fazit.link2`]: "Finale · Absatz · Link 2 (AfA bei Immobilien)",
  [`${S}fazit.text_3`]: "Finale · Absatz · Teil 3 (zwischen Link 2 und 3)",
  [`${S}fazit.link3`]: "Finale · Absatz · Link 3 (Verkaufspreisrechner)",
  [`${S}fazit.text_4`]: "Finale · Absatz · Teil 4 (nach Link 3)",
  [`${S}fazit.cta_hinweis`]: "Finale · Mikrozeile unter dem CTA",
};
