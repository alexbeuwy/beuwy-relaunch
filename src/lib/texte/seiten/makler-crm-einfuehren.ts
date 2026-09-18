import { listeRegistrieren } from "../lesen";

/** Studio-Texte /makler-crm-einfuehren — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "makler-crm-einfuehren",
  titel: "Makler-CRM einführen",
  route: "/makler-crm-einfuehren",
};
const S = "s.makler-crm-einfuehren.";

const phasen = listeRegistrieren(
  "makler-crm-einfuehren",
  "phasen",
  "Plan-Phase",
  [
    {
      nr: "Tag 1–7",
      titel: "Datenhygiene",
      text: "Bestehende Kontakte sichten, Dubletten zusammenführen, veraltete Einträge markieren. Was hier nicht bereinigt wird, gilt im neuen System als Wahrheit.",
    },
    {
      nr: "Tag 8–14",
      titel: "Struktur & Rechte",
      text: "Felder, Status und Zuständigkeiten festlegen, bevor die erste Zeile importiert wird. Wer welche Anfrage sieht und bearbeitet, steht vor dem Livegang fest.",
    },
    {
      nr: "Tag 15–22",
      titel: "Migration & Anbindung",
      text: "Bereinigte Daten importieren, Website-Formulare und Bewertungsrechner ans CRM anbinden. Ab hier landet jede neue Anfrage automatisch mit Quelle im System.",
    },
    {
      nr: "Tag 23–30",
      titel: "Team-Adoption",
      text: "Schulung im laufenden Betrieb, nicht nur am Starttag. Nach den ersten echten Anfragen zeigt sich, wo noch Rückfragen bleiben. Die werden hier geklärt, bevor sie zur Gewohnheit werden.",
    },
  ],
  { nr: "Zeitraum", titel: "Titel", text: "Text" },
);

const pains = listeRegistrieren(
  "makler-crm-einfuehren",
  "pains",
  "Fehler-Zeile",
  [
    {
      quote: "Wir migrieren erst, bereinigen später.",
      answer:
        "Jede Dublette und jede veraltete Telefonnummer landet unverändert im neuen System und wird dort zur neuen Wahrheit, weil sie niemand mehr hinterfragt.",
    },
    {
      quote: "Das ganze Team bekommt ab Tag eins Vollzugriff auf alles.",
      answer:
        "Ohne klare Rollen trägt jeder Daten anders ein. Aus einem einheitlichen System wird binnen Wochen wieder ein Sammelsurium, nur digital statt auf Papier.",
    },
    {
      quote: "Das CRM läuft, aber die Website spielt nicht mit.",
      answer:
        "Ohne Anbindung an Formulare und Bewertungsrechner bleibt der wichtigste Zufluss aus. Das System füllt sich nur, wenn jemand von Hand einträgt, und das passiert selten zuverlässig.",
    },
    {
      quote: "Die Schulung fand einmalig am Starttag statt.",
      answer:
        "Nach zwei Wochen im Tagesgeschäft sind die ersten Handgriffe vergessen. Ohne Wiederholung fällt das Team zurück in Zettel, Excel-Liste und E-Mail-Postfach.",
    },
  ],
  { quote: "Zitat", answer: "Antwort" },
);

const faq = listeRegistrieren(
  "makler-crm-einfuehren",
  "faq",
  "FAQ",
  [
    {
      q: "Welches CRM sollte ich einführen?",
      a: "Das hängt von Größe, Budget und bestehenden Anbindungen Ihres Büros ab, keine pauschale Empfehlung passt für jedes Haus. Einen neutralen Überblick über die verbreitetsten Systeme finden Sie im Maklersoftware-Vergleich.",
    },
    {
      q: "Wie lange dauert die Migration bei einem großen Altbestand?",
      a: "Der Phasenplan bleibt gleich, die Dauer je Phase wächst mit der Menge und dem Zustand der Altdaten. Bei mehreren Tausend unsauberen Kontakten dauert allein die Datenhygiene oft länger als eine Woche.",
    },
    {
      q: "Muss ich alte Daten wirklich bereinigen, bevor ich migriere?",
      a: "Ja. Eine Migration überträgt Dubletten und veraltete Einträge eins zu eins ins neue System. Bereinigung danach ist deutlich aufwendiger, weil sich die Fehler bereits in den täglichen Arbeitsablauf eingenistet haben.",
    },
    {
      q: "Wie bekomme ich das Team zum Mitziehen?",
      a: "Über klare Rollen, wiederholte Schulung statt einmaligem Termin, und einen sichtbaren Nutzen im Alltag, etwa dass niemand mehr eine Anfrage von Hand aus dem Postfach ins System kopiert.",
    },
  ],
  { q: "Frage", a: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Makler-CRM einführen ohne Chaos: Der 30-Tage-Plan | beuwy",
  [`${S}meta.beschreibung`]:
    "Makler-CRM einführen ohne Chaos: Der 30-Tage-Plan für Migration, Datenhygiene und Team-Adoption. Ein CRM wird erst mit Zufluss aus dem Portal wertvoll.",
  [`${S}meta.og_titel`]: "Makler-CRM einführen ohne Chaos: Der 30-Tage-Plan | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Vier Phasen, dreißig Tage: Datenhygiene vor Migration, Struktur vor Zugriff, Anbindung vor Schulung, und warum ein CRM erst mit echtem Zufluss wertvoll wird.",

  [`${S}kopf.eyebrow`]: "Prozess",
  [`${S}kopf.titel`]: "Ein CRM einführen, ohne dass das Tagesgeschäft *stillsteht*.",
  [`${S}kopf.sub_vor`]:
    "Ein CRM führen Sie in Ihrem Maklerbüro am wirkungsvollsten in vier Phasen über rund dreißig Tage ein: zuerst den Datenbestand bereinigen, dann Struktur und Rechte festlegen, danach migrieren und ans Portal anbinden, zuletzt das Team im laufenden Betrieb schulen. Wer zuerst migriert und später bereinigt, überträgt jeden alten Fehler unverändert ins neue System.",
  [`${S}kopf.sub_mark`]:
    "Wertvoll wird ein CRM erst, wenn danach echter Zufluss aus der eigenen Website hineinfließt",
  [`${S}kopf.sub_nach`]: ", sonst bleibt es eine gepflegte, aber leere Tabelle.",
  [`${S}kopf.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}kopf.antwort`]: "Antwort innerhalb von 24 Stunden",

  [`${S}plan.eyebrow`]: "Der Plan",
  [`${S}plan.titel`]: "Vier Phasen. Dreißig Tage. Keine *umgedrehte* Reihenfolge.",
  [`${S}plan.sub`]:
    "Jede Phase baut auf der vorherigen auf. Wer eine Phase überspringt, holt den Aufwand später doppelt nach.",
  ...phasen.defaults,

  [`${S}fehler.eyebrow`]: "Was die Einführung verzögert",
  [`${S}fehler.titel`]: "Vier Sätze, die man in fast *jedem* Maklerbüro hört.",
  ...pains.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Ein leeres CRM ist eine teure Tabelle.",
  [`${S}unterschied.text`]:
    "Migration, Struktur und Schulung sind die Vorarbeit. Wert entsteht erst, wenn Anfragen von der eigenen Website automatisch dort landen, nicht wenn ein weiteres System eingerichtet, aber nie gefüttert wird.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.titel`]:
    "Bei acta stand der Zufluss, bevor ein System zur Pflicht wurde: rund 380 vermarktete Wohneinheiten über Instagram-Anzeigen, ein Volumen von rund 40 Mio. €. Ohne Anfragen ist das beste CRM eine leere Tabelle.",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor der *Einführung* wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir den *Zufluss*, der Ihr CRM füllt.",
  [`${S}finale.satz1`]: "Welches System zu Ihrem Haus passt, zeigt der",
  [`${S}finale.link1`]: "Maklersoftware-Vergleich",
  [`${S}finale.satz2`]:
    ". Wie Sie Ihre Kontakte danach regelmäßig und ohne Streuverlust erreichen, steht unter",
  [`${S}finale.link2`]: "E-Mail-Marketing für Immobilienmakler",
  [`${S}finale.satz3`]: ". Den Überblick über alle Bausteine bietet der",
  [`${S}finale.link3`]: "Immobilienmarketing-Hub",
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

  [`${S}plan.eyebrow`]: "Plan · Eyebrow",
  [`${S}plan.titel`]: "Plan · Titel (ein *Wort* = Highlighter)",
  [`${S}plan.sub`]: "Plan · Subline",
  ...phasen.labels,

  [`${S}fehler.eyebrow`]: "Fehler · Eyebrow",
  [`${S}fehler.titel`]: "Fehler · Titel (ein *Wort* = Highlighter)",
  ...pains.labels,

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.titel`]: "Beweis · Kernsatz",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.satz1`]: "Finale · Satz · Teil vor Link 1 (Maklersoftware-Vergleich)",
  [`${S}finale.link1`]: "Finale · Satz · Linktext 1 (Maklersoftware-Vergleich)",
  [`${S}finale.satz2`]: "Finale · Satz · Teil zwischen Link 1 und Link 2 (E-Mail-Marketing)",
  [`${S}finale.link2`]: "Finale · Satz · Linktext 2 (E-Mail-Marketing für Immobilienmakler)",
  [`${S}finale.satz3`]: "Finale · Satz · Teil zwischen Link 2 und Link 3 (Hub)",
  [`${S}finale.link3`]: "Finale · Satz · Linktext 3 (Immobilienmarketing-Hub)",
  [`${S}finale.satz4`]: "Finale · Satz · Teil nach Link 3",
  [`${S}finale.antwort`]: "Finale · Antwortzeit-Hinweis",
};
