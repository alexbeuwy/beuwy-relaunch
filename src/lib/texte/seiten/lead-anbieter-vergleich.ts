import { listeRegistrieren } from "../lesen";

/** Studio-Texte /lead-anbieter-vergleich — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "lead-anbieter-vergleich", titel: "Lead-Anbieter-Vergleich", route: "/lead-anbieter-vergleich" };
const S = "s.lead-anbieter-vergleich.";

const pains = listeRegistrieren(
  "lead-anbieter-vergleich",
  "pains",
  "Einwand",
  [
    {
      zitat: "Ein Lead kostet 55 €. Klingt günstig, bis Sie hören, wie oft er verkauft wurde.",
      antwort:
        "Die meisten Anbieter geben denselben Kontakt an drei bis fünf Makler gleichzeitig weiter. Sie zahlen den vollen Preis für ein Rennen, das schon läuft, wenn Ihre Mail rausgeht.",
    },
    {
      zitat: "Jeder dritte Kontakt geht gar nicht erst ans Telefon.",
      antwort:
        "Falsche Nummern, längst vergebene Objekte, Eigentümer, die nur mal schauen wollten: Ein spürbarer Teil jeder Liste lässt sich nicht in ein Gespräch verwandeln, egal wie schnell Sie anrufen.",
    },
    {
      zitat: "Der Lead gehört dem Anbieter. Ihnen gehört nur die Rechnung.",
      antwort:
        "Endet das Abo, endet der Zufluss, sofort und vollständig. Eine eigene Quelle bleibt bestehen, auch wenn Sie einen Monat kein Budget nachlegen.",
    },
  ],
  { zitat: "Zitat", antwort: "Antwort" },
);

const rechnung = listeRegistrieren(
  "lead-anbieter-vergleich",
  "rechnung",
  "Rechnungs-Zeile",
  [
    { merkmal: "Preis pro Kontakt", gekauft: "45 € – 90 €", eigen: "keine Stückkosten" },
    { merkmal: "Käufer je Kontakt (Mehrfachverkauf)", gekauft: "meist 3 – 5 Makler", eigen: "nur Sie" },
    {
      merkmal: "Anteil nicht erreichbar / bereits vergeben",
      gekauft: "ca. 25 % – 35 %",
      eigen: "entfällt strukturell",
    },
    {
      merkmal: "Realistische Abschlussquote je Kontakt",
      gekauft: "meist unter 5 %",
      eigen: "abhängig von der eigenen Kette",
    },
    { merkmal: "Läuft weiter, wenn das Budget pausiert", gekauft: "nein", eigen: "ja" },
  ],
  { merkmal: "Merkmal", gekauft: "Wert gekaufter Lead", eigen: "Wert eigene Quelle" },
);

const faq = listeRegistrieren(
  "lead-anbieter-vergleich",
  "faq",
  "FAQ",
  [
    {
      frage: "Sind gekaufte Leads grundsätzlich schlecht?",
      antwort:
        "Nein. Für einen schnellen Test in einer neuen Region oder zur Überbrückung einer stillen Phase können sie sinnvoll sein. Problematisch wird es erst, wenn gekaufte Kontakte die einzige Quelle bleiben, obwohl derselbe Betrag in eine eigene Kette jeden Monat mehr Ertrag bringen würde.",
    },
    {
      frage: "Wie erkenne ich, ob ein Anbieter seriös ist?",
      antwort:
        "Fragen Sie direkt nach der Exklusivität: Wird der Kontakt nur an Sie oder an mehrere Makler gleichzeitig vergeben, und wie alt ist die Anfrage zum Zeitpunkt des Verkaufs? Ein seriöser Anbieter beantwortet beide Fragen ohne Umschweife.",
    },
    {
      frage: "Ab wann rechnet sich eine eigene Lead-Quelle?",
      antwort:
        "Sobald die monatlichen Ausgaben für gekaufte Kontakte über mehrere Monate stabil anfallen. Ab diesem Punkt kostet der Aufbau einer eigenen Kette meist nicht mehr als der Weiterbezug, arbeitet danach aber weiter, ohne dass jeder Kontakt neu bezahlt wird.",
    },
    {
      frage: "Kann ich gekaufte Leads und eine eigene Quelle parallel nutzen?",
      antwort:
        "Ja, das ist sogar der übliche Weg. Viele Büros laufen gekaufte Kontakte weiter, während die eigene Quelle aufgebaut wird, und reduzieren den Einkauf erst, wenn die eigene Kette zuverlässig genug Anfragen liefert.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Lead-Anbieter im Vergleich: Gekaufte Kontakte gegen eigene Quelle | beuwy",
  [`${S}meta.beschreibung`]:
    "Lead-Anbieter im Vergleich: Was ein gekaufter Eigentümer-Kontakt inklusive Mehrfachverkauf und No-Shows wirklich kostet, und wann sich die eigene Quelle rechnet.",
  [`${S}meta.og_titel`]: "Lead-Anbieter im Vergleich: Gekaufte Kontakte gegen eigene Quelle | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Der reale Preis eines gekauften Eigentümer-Kontakts, inklusive Mehrfachverkauf und No-Shows, im Vergleich zur eigenen Lead-Quelle. Break-even transparent gerechnet.",

  [`${S}hero.eyebrow`]: "Anbieter-Vergleich",
  [`${S}hero.titel`]: "Lead-Anbieter im *Vergleich*: Was ein Kontakt wirklich kostet.",
  [`${S}hero.intro_vor`]:
    "Gekaufte Eigentümer-Leads lohnen sich nur in engen Grenzen. Der einzelne Kontakt kostet meist zwischen 45 € und 90 €, wird aber häufig an drei bis fünf Makler gleichzeitig verkauft, sodass Sie selten der Einzige am Telefon sind. Rechnet man",
  [`${S}hero.intro_highlight`]: "Mehrfachverkauf und nicht erreichbare Kontakte ein",
  [`${S}hero.intro_nach`]:
    ", liegt der reale Preis pro Mandat deutlich über dem Listenpreis. Für einen kurzen Testlauf kann der Einkauf trotzdem sinnvoll sein, als dauerhafte Quelle rechnet sich meist die eigene Kette schneller.",
  [`${S}hero.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_antwortzeit`]: "Antwort innerhalb von 24 Stunden",

  [`${S}problem.eyebrow`]: "Der Listenpreis täuscht",
  [`${S}problem.titel`]: "Der Preis auf der Rechnung ist nicht der Preis pro *Mandat*.",
  ...pains.defaults,

  [`${S}rechnung.eyebrow`]: "Die Rechnung",
  [`${S}rechnung.titel`]: "Gekaufter Kontakt gegen *eigene* Quelle, Zeile für Zeile.",
  [`${S}rechnung.sub`]:
    "Richtwerte aus dem Markt, keine Zusage einzelner Anbieter. Ihr tatsächlicher Preis hängt von Region, Objektklasse und Anbieter ab.",
  [`${S}rechnung.kopf_merkmal`]: "Merkmal",
  [`${S}rechnung.kopf_gekauft`]: "Gekaufter Lead",
  [`${S}rechnung.kopf_eigen`]: "Eigene Quelle",
  ...rechnung.defaults,
  [`${S}rechnung.text_1`]:
    "Beispielrechnung, wenn ein Anbieter 55 € pro Kontakt verlangt: Bei 20 Kontakten im Monat zahlen Sie 1.100 €. Erreichen lassen sich davon realistisch 13 bis 14, weil ein Teil nicht abhebt oder das Objekt längst vergeben ist. Wird daraus im Schnitt ein Mandat, liegt der reale Preis bei rund 1.100 € pro Abschluss, nicht bei den 55 € auf der Rechnung. Eine eigene Quelle kostet in der Anlaufphase ähnlich viel, wird danach aber mit jedem Monat günstiger, weil Anzeige und Rechner weiterlaufen, ohne dass ein Kontakt einzeln neu bezahlt wird — die volle Systematik dahinter zeigt die Seite",
  [`${S}rechnung.link_leads`]: "Eigentümer-Leads generieren",
  [`${S}rechnung.text_2`]: ".",

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Ein Kontakt ist kein Mandat.",
  [`${S}unterschied.text`]:
    "Der Listenpreis eines Leads verschweigt drei Dinge: wie oft er verkauft wurde, wie alt er beim Verkauf schon war, und ob überhaupt jemand abhebt. Eine eigene Quelle hat keinen Listenpreis, dafür einen Preis pro Mandat, der mit der Zeit sinkt statt gleich bleibt.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "Neun zusätzliche Mandate in den ersten drei Monaten nach dem Relaunch, ohne einen einzigen gekauften Lead.",
  [`${S}beweis.link_case`]: "Fallstudie RIEGEL Immobilien lesen →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Gespräch wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihre eigene *Quelle*.",
  [`${S}finale.text_1`]: "Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_2`]: ", die Systematik dahinter auf der Seite",
  [`${S}finale.link_leads`]: "Eigentümer-Leads generieren",
  [`${S}finale.text_3`]: ". Für Kapitalanleger-Objekte gilt eine eigene Logik, nachzulesen unter",
  [`${S}finale.link_kap`]: "Marketing für Kapitalanlage-Immobilien",
  [`${S}finale.text_4`]: ".",
  [`${S}finale.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}finale.cta_antwortzeit`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · OpenGraph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · OpenGraph-Beschreibung",

  [`${S}hero.eyebrow`]: "Wissens-Kopf · Eyebrow",
  [`${S}hero.titel`]: "Wissens-Kopf · Titel (ein *Wort* = Highlighter)",
  [`${S}hero.intro_vor`]: "Wissens-Kopf · Antwort-Satz, Teil vor dem Highlight",
  [`${S}hero.intro_highlight`]: "Wissens-Kopf · Antwort-Satz, markierter Teil",
  [`${S}hero.intro_nach`]: "Wissens-Kopf · Antwort-Satz, Teil nach dem Highlight",
  [`${S}hero.cta_label`]: "Wissens-Kopf · CTA-Button-Text",
  [`${S}hero.cta_antwortzeit`]: "Wissens-Kopf · Antwortzeit-Hinweis neben dem CTA",

  [`${S}problem.eyebrow`]: "Problem (PainRows) · Eyebrow",
  [`${S}problem.titel`]: "Problem (PainRows) · Titel (ein *Wort* = Highlighter)",
  ...pains.labels,

  [`${S}rechnung.eyebrow`]: "Die Rechnung · Eyebrow",
  [`${S}rechnung.titel`]: "Die Rechnung · Titel (ein *Wort* = Highlighter)",
  [`${S}rechnung.sub`]: "Die Rechnung · Subline",
  [`${S}rechnung.kopf_merkmal`]: "Die Rechnung · Spaltenkopf 1 (Merkmal)",
  [`${S}rechnung.kopf_gekauft`]: "Die Rechnung · Spaltenkopf 2 (Gekaufter Lead)",
  [`${S}rechnung.kopf_eigen`]: "Die Rechnung · Spaltenkopf 3 (Eigene Quelle)",
  ...rechnung.labels,
  [`${S}rechnung.text_1`]: "Die Rechnung · Beispielrechnung-Absatz, Teil vor dem Link",
  [`${S}rechnung.link_leads`]: "Die Rechnung · Link-Text (Eigentümer-Leads generieren)",
  [`${S}rechnung.text_2`]: "Die Rechnung · Beispielrechnung-Absatz, Abschluss nach dem Link",

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis-Anriss · Label",
  [`${S}beweis.text`]: "Beweis-Anriss · Text",
  [`${S}beweis.link_case`]: "Beweis-Anriss · Link-Text (Fallstudie RIEGEL)",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.text_1`]: "Finale · Satz, Teil vor Link 1 (Hub)",
  [`${S}finale.link_hub`]: "Finale · Link-Text 1 (Immobilienmarketing-Hub)",
  [`${S}finale.text_2`]: "Finale · Satz, Teil zwischen Link 1 und Link 2",
  [`${S}finale.link_leads`]: "Finale · Link-Text 2 (Eigentümer-Leads generieren)",
  [`${S}finale.text_3`]: "Finale · Satz, Teil zwischen Link 2 und Link 3",
  [`${S}finale.link_kap`]: "Finale · Link-Text 3 (Marketing für Kapitalanlage-Immobilien)",
  [`${S}finale.text_4`]: "Finale · Satz, Abschluss nach Link 3",
  [`${S}finale.cta_label`]: "Finale · CTA-Button-Text",
  [`${S}finale.cta_antwortzeit`]: "Finale · Antwortzeit-Hinweis unter dem CTA",
};
