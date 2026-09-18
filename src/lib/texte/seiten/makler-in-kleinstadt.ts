import { listeRegistrieren } from "../lesen";

/** Studio-Texte /makler-in-kleinstadt — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "makler-in-kleinstadt", titel: "Makler in der Kleinstadt", route: "/makler-in-kleinstadt" };
const S = "s.makler-in-kleinstadt.";

const vergleich = listeRegistrieren("makler-in-kleinstadt", "vergleich", "Vergleichs-Zeile", [
  {
    kriterium: "Wettbewerb um „Makler + Stadt“",
    grossstadt: "meist zehn und mehr Büros mit eigenem Auftritt",
    kleinstadt: "oft nur ein bis zwei Büros mit eigener Seite",
  },
  {
    kriterium: "Suchvolumen pro Monat",
    grossstadt: "hoch, aber stark umkämpft",
    kleinstadt: "niedriger, dafür fast ohne Streuung",
  },
  {
    kriterium: "Reichweite pro Werbe-Euro",
    grossstadt: "teuer, viele Mitbieter auf dieselbe Zielgruppe",
    kleinstadt: "günstiger, weniger Bieter im selben Radius",
  },
  {
    kriterium: "Weg zu Platz eins",
    grossstadt: "Monate, oft gegen Portale und Ketten",
    kleinstadt: "häufig Wochen, wenn kaum ein Wettbewerber eine Landingpage hat",
  },
  {
    kriterium: "Wirkung von Empfehlungen",
    grossstadt: "verpufft im großen Netzwerk",
    kleinstadt: "trägt schnell weiter, kurze Wege zwischen Nachbarn",
  },
], { kriterium: "Kriterium", grossstadt: "Großstadt", kleinstadt: "Kleinstadt" });

const hebel = listeRegistrieren("makler-in-kleinstadt", "hebel", "Hebel", [
  {
    titel: "Eine Landingpage, die den Ort besetzt",
    text: "„Makler in [Stadtname]“ oder „Immobilie verkaufen [Stadtname]“: In einer Stadt mit 30.000 Einwohnern reicht oft eine sauber gebaute Seite, um auf Platz eins zu stehen, weil kaum ein Wettbewerber überhaupt eine eigene Seite für den Ort gebaut hat.",
  },
  {
    titel: "Farming, das sich schneller rechnet",
    text: "Eine wöchentliche Story mit echten Objekten aus dem Ort erreicht in einer Kleinstadt einen größeren Anteil der relevanten Einwohner pro eingesetztem Euro als dieselbe Story in einer Großstadt mit zersplitterter Zielgruppe.",
  },
  {
    titel: "Der Ruf schließt den Kreis",
    text: "Wer in einer Kleinstadt einmal auffällt, dessen Name trägt weiter, oft über den Nachbarn, den Verein, den Handwerker, mit dem man gerade zu tun hatte. Digitale Sichtbarkeit und dieses Netzwerk verstärken sich gegenseitig, statt getrennt zu laufen.",
  },
], { titel: "Titel", text: "Text" });

const faq = listeRegistrieren("makler-in-kleinstadt", "faq", "FAQ", [
  {
    frage: "Lohnt sich eine eigene Landingpage für eine Stadt mit nur 30.000 Einwohnern?",
    antwort:
      "Ja, gerade weil das Suchvolumen kleiner ist als in einer Großstadt, bauen dort selten mehrere Wettbewerber eine eigene Seite für exakt diesen Ort. Eine einzelne saubere Landingpage reicht oft für Platz eins, wo sie in einer Großstadt gegen zehn Konkurrenten antreten müsste.",
  },
  {
    frage: "Wie groß muss das Werbebudget in einer Kleinstadt sein?",
    antwort:
      "Deutlich kleiner als in einer Großstadt, weil weniger Mitbieter um dieselbe Zielgruppe konkurrieren. Wie viel genau sinnvoll ist, hängt von der Zahl der Eigentümer ab, die dort tatsächlich verkaufen, das prüfen wir vor jeder Kampagne.",
  },
  {
    frage: "Reicht Farming allein, ohne SEO?",
    antwort:
      "Für den Anfang ja, für Dauerhaftigkeit selten. Farming baut den Ruf im Ort auf, SEO sorgt dafür, dass jemand, der digital sucht statt zu fragen, Sie trotzdem findet. Beides zusammen trägt weiter als jeder Baustein allein.",
  },
  {
    frage: "Was, wenn ein großes Portal auch in meiner Kleinstadt aktiv wirbt?",
    antwort:
      "Portale werben meist überregional und ohne lokalen Bezug. Eine Landingpage mit echten Ortsbezügen, echten Objekten und einem Namen, den die Nachbarschaft kennt, schlägt eine generische Portal-Anzeige gerade in kleinen Städten häufig, weil Vertrauen dort persönlicher entsteht.",
  },
], { frage: "Frage", antwort: "Antwort" });

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Makler in der Kleinstadt: Marktführer auf 30.000 Einwohner | beuwy",
  [`${S}meta.beschreibung`]:
    "Makler in der Kleinstadt: weniger Wettbewerb um Suchbegriffe, günstigere Story-Omnipräsenz. beuwy zeigt, wie digitales Marketing dort schneller zur Dominanz führt.",
  [`${S}meta.og_titel`]: "Makler in der Kleinstadt: Marktführer auf 30.000 Einwohner | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Kleine Stadt, schneller Hebel: weniger Wettbewerb um „Makler + Stadt“, günstigere Reichweite. beuwy baut die Kette, die aus einem Büro den bekannten Namen im Ort macht.",

  [`${S}kopf.eyebrow`]: "Wachstum",
  [`${S}kopf.titel`]: "In der Kleinstadt reicht meist *eine* gute Seite.",
  [`${S}kopf.sub_vor`]:
    "Ja, digitales Marketing funktioniert in kleinen Städten, oft sogar schneller als in Großstädten. Der Grund ist nicht Ihr Budget, sondern die Konkurrenz: Wer „Makler in [Stadtname]“ sucht, findet in einer Stadt mit 30.000 Einwohnern häufig",
  [`${S}kopf.sub_highlight`]: "ein bis zwei Wettbewerber mit eigener Seite statt zehn",
  [`${S}kopf.sub_nach`]:
    ". Eine saubere Landingpage und eine wöchentliche Story im Ort reichen dort oft für die Position, für die es in der Großstadt ein ganzes System bräuchte.",
  [`${S}kopf.cta`]: "Zusammenarbeit anfragen",
  [`${S}kopf.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",

  [`${S}vergleich.eyebrow`]: "Der Unterschied auf einen Blick",
  [`${S}vergleich.titel`]: "Weniger Suchvolumen, aber ein *klareres* Feld.",
  [`${S}vergleich.kopf_kriterium`]: "Kriterium",
  [`${S}vergleich.kopf_grossstadt`]: "Großstadt",
  [`${S}vergleich.kopf_kleinstadt`]: "Kleinstadt (bis ca. 30.000 Einwohner)",
  ...vergleich.defaults,

  [`${S}hebel.eyebrow`]: "Der Dominanz-Hebel",
  [`${S}hebel.titel`]: "Drei Schritte zum bekannten *Namen* im Ort.",
  [`${S}hebel.sub`]:
    "Alle drei Schritte wirken zusammen. Die volle Systematik hinter dem ersten Schritt steht auf der Seite SEO für Immobilienmakler, hinter dem zweiten auf der Seite Immobilien-Farming.",
  ...hebel.defaults,
  [`${S}hebel.text_vor`]: "Ausführlich beschrieben auf",
  [`${S}hebel.text_link1`]: "SEO für Immobilienmakler",
  [`${S}hebel.text_mid`]: "und",
  [`${S}hebel.text_link2`]: "Immobilien-Farming",
  [`${S}hebel.text_nach`]: ".",

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Klein ist kein Nachteil. Klein ist ein Hebel.",
  [`${S}unterschied.text`]:
    "In einer Großstadt kämpfen Sie um Platz vier von zehn. In einer Kleinstadt kämpfen Sie oft um Platz eins von zwei, gegen einen Wettbewerber, der überhaupt keine eigene Seite für den Ort gebaut hat. Derselbe Aufwand bringt dort ein anderes Ergebnis.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "Ein regionaler Makler in der Rhein-Neckar-Region: sechs Wochen nach dem Relaunch neun Abschlüsse, 342.000 € Volumen, und Platz 21 von über 25.000 Maklern beim ImmoScout24-Award, nicht als bundesweite Kette, sondern als bekannter Name in der eigenen Region.",
  [`${S}beweis.cases_link`]: "Weitere Fallstudien ansehen →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Gespräch wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihre *Dominanz* im Ort.",
  [`${S}finale.text_vor`]: "Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.text_link1`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_mid1`]: ", die Systematik der Omnipräsenz auf",
  [`${S}finale.text_link2`]: "Immobilien-Farming",
  [`${S}finale.text_mid2`]: "und der Weg auf Platz eins bei Google auf",
  [`${S}finale.text_link3`]: "SEO für Immobilienmakler",
  [`${S}finale.text_nach`]: ".",
  [`${S}finale.cta`]: "Zusammenarbeit anfragen",
  [`${S}finale.hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · Open-Graph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",

  [`${S}kopf.eyebrow`]: "Wissens-Kopf · Eyebrow",
  [`${S}kopf.titel`]: "Wissens-Kopf · Titel (*Wort* = Highlighter)",
  [`${S}kopf.sub_vor`]: "Wissens-Kopf · Absatz · Teil vor dem Highlight",
  [`${S}kopf.sub_highlight`]: "Wissens-Kopf · Absatz · Highlight-Wortgruppe",
  [`${S}kopf.sub_nach`]: "Wissens-Kopf · Absatz · Rest nach dem Highlight",
  [`${S}kopf.cta`]: "Wissens-Kopf · CTA-Text",
  [`${S}kopf.cta_hinweis`]: "Wissens-Kopf · Mikrozeile unter dem CTA",

  [`${S}vergleich.eyebrow`]: "Vergleichs-Tabelle · Eyebrow",
  [`${S}vergleich.titel`]: "Vergleichs-Tabelle · Titel (*Wort* = Highlighter)",
  [`${S}vergleich.kopf_kriterium`]: "Vergleichs-Tabelle · Spaltenkopf 1",
  [`${S}vergleich.kopf_grossstadt`]: "Vergleichs-Tabelle · Spaltenkopf 2",
  [`${S}vergleich.kopf_kleinstadt`]: "Vergleichs-Tabelle · Spaltenkopf 3",

  [`${S}hebel.eyebrow`]: "Dominanz-Hebel · Eyebrow",
  [`${S}hebel.titel`]: "Dominanz-Hebel · Titel (*Wort* = Highlighter)",
  [`${S}hebel.sub`]: "Dominanz-Hebel · Subline",
  [`${S}hebel.text_vor`]: "Dominanz-Hebel · Absatz unten · Teil vor Link 1",
  [`${S}hebel.text_link1`]: "Dominanz-Hebel · Absatz unten · Linktext (SEO)",
  [`${S}hebel.text_mid`]: "Dominanz-Hebel · Absatz unten · Teil zwischen den Links",
  [`${S}hebel.text_link2`]: "Dominanz-Hebel · Absatz unten · Linktext (Farming)",
  [`${S}hebel.text_nach`]: "Dominanz-Hebel · Absatz unten · Satzende",

  [`${S}unterschied.label`]: "Unterschied · Label",
  [`${S}unterschied.titel`]: "Unterschied · Titel",
  [`${S}unterschied.text`]: "Unterschied · Text",

  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.text`]: "Beweis · Text",
  [`${S}beweis.cases_link`]: "Beweis · Linktext zu weiteren Fallstudien",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (*Wort* = Highlighter)",

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (*Wort* = Highlighter)",
  [`${S}finale.text_vor`]: "Finale · Absatz · Teil vor Link 1",
  [`${S}finale.text_link1`]: "Finale · Absatz · Linktext (Hub)",
  [`${S}finale.text_mid1`]: "Finale · Absatz · Teil zwischen Link 1 und 2",
  [`${S}finale.text_link2`]: "Finale · Absatz · Linktext (Farming)",
  [`${S}finale.text_mid2`]: "Finale · Absatz · Teil zwischen Link 2 und 3",
  [`${S}finale.text_link3`]: "Finale · Absatz · Linktext (SEO)",
  [`${S}finale.text_nach`]: "Finale · Absatz · Satzende",
  [`${S}finale.cta`]: "Finale · CTA-Text",
  [`${S}finale.hinweis`]: "Finale · Mikrozeile unter dem CTA",

  ...vergleich.labels,
  ...hebel.labels,
  ...faq.labels,
};
