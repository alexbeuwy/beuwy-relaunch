import { listeRegistrieren } from "../lesen";

/** Studio-Texte /immoscout-profil-vs-eigene-website — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "immoscout-profil-vs-eigene-website",
  titel: "ImmoScout-Profil vs. eigene Website",
  route: "/immoscout-profil-vs-eigene-website",
};
const S = "s.immoscout-profil-vs-eigene-website.";

const vergleich = listeRegistrieren(
  "immoscout-profil-vs-eigene-website",
  "vergleich",
  "Vergleichs-Aspekt",
  [
    {
      aspekt: "Nachbarschaft",
      portal:
        "Ihr Angebot steht in derselben Trefferliste wie der Konkurrent von nebenan — oft direkt über oder unter ihm, mit einem Klick zum Vergleich.",
      eigen:
        "Auf Ihrer Domain gibt es keinen Wettbewerber auf derselben Seite. Der Eigentümer sieht nur Sie, nicht die Alternative daneben.",
    },
    {
      aspekt: "Gestaltung",
      portal:
        "Gleiches Template, gleiche Schriftart, gleiche Kachelgröße wie bei über 25.000 anderen Maklerprofilen auf derselben Plattform.",
      eigen:
        "Ihre Marke, Ihre Bildsprache, Ihre Reihenfolge der Argumente — nichts davon teilen Sie mit dem nächsten Profil in der Liste.",
    },
    {
      aspekt: "Exposé-Tiefe",
      portal:
        "Datenfelder in der Reihenfolge, die das Portal vorgibt: Zahlen zuerst, Geschichte des Objekts gar nicht.",
      eigen:
        "Eine Dramaturgie, die den Preis begründet, bevor die Zahl überhaupt fällt — mehr dazu unter Exposés, die verkaufen.",
    },
    {
      aspekt: "Anfrage-Weg",
      portal:
        "Die Anfrage geht zuerst an das Portal-Postfach, häufig mit Zeitverzug und ohne Angabe, welches Objekt gemeint war.",
      eigen:
        "Die Anfrage landet direkt mit Quelle und Objektbezug in Ihrem CRM, bevor der Eigentümer den Tab wieder schließt.",
    },
    {
      aspekt: "Google-Ranking",
      portal:
        "Sie ranken für die Marke des Portals. Sucht jemand „Immobilienmakler [Ihre Stadt]“, taucht Ihr Profil bestenfalls tief unten auf.",
      eigen:
        "Jede Suche nach Ihrer Stadt kann zu Ihnen führen — vorausgesetzt, die Seite ist dafür gebaut. Details dazu im SEO-Ratgeber.",
    },
    {
      aspekt: "Lebensdauer",
      portal:
        "Das Profil existiert, solange das Portal-Abo läuft. Kündigen Sie, verschwindet jede bisherige Sichtbarkeit mit ihm.",
      eigen:
        "Die Domain gehört Ihnen. Jede Fallstudie, jede Bewertung, jeder Rang bleibt erhalten, unabhängig vom Portal-Vertrag.",
    },
  ],
  { aspekt: "Aspekt", portal: "Text Portal-Spalte", eigen: "Text Website-Spalte" },
);

const faq = listeRegistrieren(
  "immoscout-profil-vs-eigene-website",
  "faq",
  "FAQ",
  [
    {
      frage: "Soll ich mein ImmoScout-Profil dann kündigen?",
      antwort:
        "Nein. Portale bringen Reichweite, die eine junge Website allein nicht aufbaut. Die Frage ist nicht Portal oder Website, sondern ob Ihre eigene Domain überhaupt existiert, wenn ein Eigentümer nach dem Profil noch einmal googelt.",
    },
    {
      frage: "Prüfen Eigentümer wirklich beides?",
      antwort:
        "In der Praxis ja. Ein Eigentümer, der drei Makler auf einem Portal sieht, googelt danach meist mindestens einen Namen — und findet entweder eine eigene Seite mit Substanz oder gar nichts außer dem Profil, das er schon kannte.",
    },
    {
      frage: "Reicht eine einfache Website mit Kontaktformular?",
      antwort:
        "Als Minimum ja, als Entscheidungsgrundlage selten. Eine Website ohne Fallstudien, ohne Bewertungsrechner und ohne klare Positionierung unterscheidet sich für den Eigentümer kaum vom Portal-Profil daneben.",
    },
    {
      frage: "Wie schnell steht eine eigene Website, die diesen Unterschied macht?",
      antwort:
        "Je nach Umfang vier bis sechs Wochen von der Analyse bis zum Livegang. Ein Systemgespräch reicht, um den Aufwand für Ihr Haus konkret einzuschätzen.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "ImmoScout-Profil vs. eigene Website: Wo Eigentümer wirklich prüfen | beuwy",
  [`${S}meta.beschreibung`]:
    "ImmoScout-Profil vs. eigene Website: Ihr Portal-Profil steht direkt neben jedem Konkurrenten, Ihre eigene Domain ist der einzige Ort ohne Vergleichsspalte.",
  [`${S}meta.og_titel`]: "ImmoScout-Profil vs. eigene Website: Wo Eigentümer wirklich prüfen | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Ihr Portal-Profil steht direkt neben jedem Konkurrenten. Ihre eigene Domain ist der einzige Ort, an dem ein Eigentümer Sie ohne Vergleichsspalte sieht.",

  [`${S}hero.eyebrow`]: "Vergleich",
  [`${S}hero.titel`]: "ImmoScout-Profil oder eigene Website: Wo Eigentümer wirklich *prüfen*.",
  [`${S}hero.intro_vor`]:
    "Nein — Ihr ImmoScout-Profil reicht als alleiniger Online-Auftritt nicht aus, weil es neben dem Profil des nächsten Maklers auf derselben Seite steht, im selben Layout, oft direkt unter dem Wettbewerber mit dem günstigeren Angebot.",
  [`${S}hero.intro_highlight`]:
    "Eine eigene Website ist die einzige Fläche, auf der ein Eigentümer Sie ohne Vergleichsspalte sieht",
  [`${S}hero.intro_nach`]:
    ". Wer beide Kanäle kombiniert, Portal-Reichweite und eigene Domain, gewinnt den Alleinauftrag häufiger als wer sich allein aufs Portal verlässt.",
  [`${S}hero.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_antwortzeit`]: "Antwort innerhalb von 24 Stunden",

  [`${S}vergleich.eyebrow`]: "Zwei Flächen, ein Eigentümer",
  [`${S}vergleich.titel`]: "Gemietete Fläche gegen *eigene* Domain.",
  [`${S}vergleich.sub`]:
    "Sechs Aspekte, an denen der Unterschied für den Eigentümer sichtbar wird — nicht abstrakt, sondern an dem, was er auf beiden Seiten tatsächlich sieht.",
  [`${S}vergleich.kopf_portal`]: "Auf dem Portal",
  [`${S}vergleich.kopf_eigen`]: "Auf Ihrer Website",
  ...vergleich.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Ihr Profil gehört dem Portal.",
  [`${S}unterschied.text`]:
    "Es steht neben dem Konkurrenten, trägt dessen Layout und verschwindet mit dem Abo. Eine eigene Website gehört Ihnen — inklusive jedem Rang, jeder Fallstudie und jeder Bewertung, die Sie darauf aufbauen.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "RIEGEL Immobilien stand vorher auf ImmoScout24 wie jeder Wettbewerber daneben. Nach dem Relaunch der eigenen Website: neun zusätzliche Mandate in den ersten drei Monaten. RIEGEL belegt zudem Platz 21 von über 25.000 Maklern beim ImmoScout24-Award.",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *nächsten* Vergleich wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihre *eigene* Fläche.",
  [`${S}finale.text_1`]:
    "Wie eine Website aussieht, die den Vergleich gewinnt, statt daneben zu stehen, zeigt der Ratgeber",
  [`${S}finale.link_website`]: "Website für Immobilienmakler",
  [`${S}finale.text_2`]:
    ". Wie Sie zusätzlich eigene Eigentümer-Leads statt gemieteter Portal-Kontakte aufbauen, steht unter",
  [`${S}finale.link_leads`]: "Eigentümer-Leads generieren",
  [`${S}finale.text_3`]: ". Einen Überblick über alle Bausteine bietet der",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
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

  [`${S}vergleich.eyebrow`]: "Zweispalter · Eyebrow",
  [`${S}vergleich.titel`]: "Zweispalter · Titel (ein *Wort* = Highlighter)",
  [`${S}vergleich.sub`]: "Zweispalter · Subline",
  [`${S}vergleich.kopf_portal`]: "Zweispalter · Spaltenkopf links (Portal)",
  [`${S}vergleich.kopf_eigen`]: "Zweispalter · Spaltenkopf rechts (eigene Website)",
  ...vergleich.labels,

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis-Anriss · Label",
  [`${S}beweis.text`]: "Beweis-Anriss · Text",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.text_1`]: "Finale · Satz, Teil vor Link 1 (Website für Immobilienmakler)",
  [`${S}finale.link_website`]: "Finale · Link-Text 1 (Website für Immobilienmakler)",
  [`${S}finale.text_2`]: "Finale · Satz, Teil zwischen Link 1 und Link 2",
  [`${S}finale.link_leads`]: "Finale · Link-Text 2 (Eigentümer-Leads generieren)",
  [`${S}finale.text_3`]: "Finale · Satz, Teil zwischen Link 2 und Link 3",
  [`${S}finale.link_hub`]: "Finale · Link-Text 3 (Immobilienmarketing-Hub)",
  [`${S}finale.text_4`]: "Finale · Satz, Abschluss nach Link 3",
  [`${S}finale.cta_label`]: "Finale · CTA-Button-Text",
  [`${S}finale.cta_antwortzeit`]: "Finale · Antwortzeit-Hinweis unter dem CTA",
};
