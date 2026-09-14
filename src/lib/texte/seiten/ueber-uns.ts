import { listeRegistrieren } from "../lesen";

/** Studio-Texte /ueber-uns — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "ueber-uns", titel: "Über uns", route: "/ueber-uns" };
const S = "s.ueber-uns.";

const stationen = listeRegistrieren(
  "ueber-uns",
  "stationen",
  "Station",
  [
    {
      marke: "Vision Group",
      zeitraum: "Begleitet vom Gründungsbüro an",
      titel: "Aus drei Leuten wurde eine Gruppe, mit der Private Equity verhandelt.",
      text: "Als die Vision Group anfing, passte das Team in ein Büro. beuwy hat Marke, Auftritt und Anfragesystem über die Jahre mitentwickelt — bis zu 1.450 Wohneinheiten im Bestand und einem Joint Venture mit KKR über 160 Millionen Euro.",
    },
    {
      marke: "Königswege",
      zeitraum: "Vom Mittelfeld in die Top 10",
      titel: "Von 60 Partnern auf über 2.300 — die Marke rekrutiert heute von selbst.",
      text: "Königswege kam mit 60 Partnern. Heute gehört das Haus zu den zehn größten Finanzvertrieben Deutschlands, und der Auftritt, den wir gebaut haben, ist das Erste, was jeder neue Partner sieht.",
    },
    {
      marke: "acta",
      zeitraum: "Selbst gegründet, selbst betrieben",
      titel: "Unser eigener Vertrieb: 380 Wohneinheiten über Instagram-Anzeigen.",
      text: "acta war kein Kunde, sondern unsere eigene Firma: in der Spitze 15 Leute, rund 380 verkaufte Wohneinheiten in drei Jahren, etwa 40 Millionen Euro Volumen — akquiriert über Anzeigen, Rechner und Registrierung. Genau dieses System bauen wir heute für Sie.",
    },
  ],
  { marke: "Marken-Name", zeitraum: "Zeitraum", titel: "Titel", text: "Text" },
);

const arbeitsweise = listeRegistrieren(
  "ueber-uns",
  "arbeitsweise",
  "Zusage",
  [
    {
      titel: "Done for you, in Wochen",
      text: "Marke, Portal, Funnel und Automationen liefern wir fertig. Ihr Aufwand: vier Termine. Livegang in Wochen, nicht in Quartalen — den Termin bekommen Sie schriftlich.",
    },
    {
      titel: "Ticketsystem statt Zuruf",
      text: "Jedes Ihrer Anliegen läuft als Ticket, mit Status und Nachweis, bis es erledigt ist. Niemand fragt nach zwei Wochen, wie weit sein Dokument ist.",
    },
    {
      titel: "Maßarbeit statt Baukasten",
      text: "Kein Template, keine Standard-Exposés, die auch der Wettbewerber nutzt. Jedes Portal wird für ein Haus gebaut und gehört diesem Haus.",
    },
    {
      titel: "Quoten statt Bauchgefühl",
      text: "Jeden Montag steht der Wochenbericht im Postfach: Anfragen, Quellen, Status. Sie sehen, was das System liefert — nicht, was jemand behauptet.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const faq = listeRegistrieren(
  "ueber-uns",
  "faq",
  "FAQ",
  [
    {
      q: "Was ist beuwy — Agentur oder Beratung?",
      a: "Eine Unternehmensberatung für Immobilienmarketing. Der Unterschied ist die Verantwortung: Eine Agentur liefert Werbemittel ab, wir verantworten ein System, das messbar Mandate und Deals bringt — und weisen das jeden Montag im Wochenbericht nach.",
    },
    {
      q: "Welche Erfahrung steht hinter beuwy?",
      a: "17 Jahre Markenarbeit, unter anderem für Bosch, Continental und Michelin — und eigene Vertriebserfahrung: Mit acta haben wir einen Kapitalanlage-Vertrieb selbst aufgebaut und rund 380 Wohneinheiten über Instagram-Anzeigen verkauft.",
    },
    {
      q: "Arbeitet beuwy nur mit Immobilienmaklern?",
      a: "Der Fokus liegt auf führenden Maklern. Daneben betreuen wir Projektentwickler, Bauträger und Immobilienvertriebe — Zielgruppen, deren Vertrieb nach derselben Logik funktioniert: registrieren, qualifizieren, abschließen.",
    },
    {
      q: "Wer betreut mich in der Zusammenarbeit?",
      a: "Sie haben einen festen Ansprechpartner, und jedes Anliegen läuft zusätzlich über ein Ticketsystem — nachweisbar, mit Status, bis es erledigt ist. Kein Wunsch bleibt offen.",
    },
  ],
  { q: "Frage", a: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Über beuwy: Unternehmensberatung für Immobilienmarketing | beuwy",
  [`${S}meta.beschreibung`]:
    "beuwy ist eine Unternehmensberatung für Immobilienmarketing: Marke, Portal und Vertriebssystem aus einer Hand. 17 Jahre Markenarbeit, eigene Vertriebserfahrung, messbar in Mandaten und Deals.",
  [`${S}meta.og_titel`]: "Über beuwy: Unternehmensberatung für Immobilienmarketing | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Marke, Portal und Vertriebssystem aus einer Hand — von einer Beratung, die Vertrieb aus eigenem Geld kennt, nicht aus Fallstudien.",

  [`${S}hero.eyebrow`]: "Über beuwy",
  [`${S}hero.titel`]: "Wir bauen die Systeme, mit denen Immobilienhäuser *groß* werden.",
  [`${S}hero.sub_vor`]:
    "beuwy ist eine Unternehmensberatung für Immobilienmarketing: Marke, Portal und Vertriebssystem aus einer Hand.",
  [`${S}hero.sub_mark`]: "Seit 17 Jahren, messbar in Mandaten und Deals",
  [`${S}hero.sub_nach`]: "— nicht in Klicks.",
  [`${S}hero.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}hero.antwort`]: "Antwort innerhalb von 24 Stunden",
  [`${S}hero.karte_label`]: "Das Fundament",

  [`${S}haltung.eyebrow`]: "Warum es beuwy gibt",
  [`${S}haltung.titel`]: "Wir haben zu viele gute Häuser mit *austauschbaren* Auftritten gesehen.",
  [`${S}haltung.spalte1_p1`]:
    "Angefangen hat alles in der Markenarbeit für Häuser wie Bosch, Continental und Michelin — dort lernt man, was eine Marke tragen muss, wenn Millionen auf sie schauen.",
  [`${S}haltung.spalte1_p2`]:
    "Dann kam die Immobilienbranche. Und mit ihr eine Beobachtung, die uns nicht losließ: Die besten Makler ihrer Stadt treten online auf wie der Drittbeste. Gleiche Baukasten-Website, gleiche Standard-Exposés, gleiches Bauchgefühl statt Bericht.",
  [`${S}haltung.spalte2_p1_vor`]:
    "Deshalb verkauft beuwy keine Websites. Wir bauen Portale, die Eigentümer registrieren und vorqualifizieren — und ein System drumherum, das",
  [`${S}haltung.spalte2_p1_mark`]: "jede Woche nachweist, was es liefert",
  [`${S}haltung.spalte2_p1_nach`]: ".",
  [`${S}haltung.spalte2_p2`]:
    "Und weil Beratung ohne eigene Narben wohlfeil ist, haben wir einen Vertrieb selbst gegründet und betrieben. Was wir empfehlen, haben wir mit eigenem Geld bezahlt und mit eigenem Team verkauft.",

  [`${S}stationen.eyebrow`]: "Drei Stationen",
  [`${S}stationen.titel`]: "Drei Häuser, drei Größenordnungen — *ein* Muster.",
  [`${S}stationen.sub`]:
    "Zum Nachlesen, nicht zum Glauben: Was aus Häusern wird, wenn Marke und System zusammen gebaut werden.",
  ...stationen.defaults,

  [`${S}arbeitsweise.eyebrow`]: "So arbeiten wir",
  [`${S}arbeitsweise.titel`]: "Vier Zusagen, an denen Sie uns *messen* können.",
  ...arbeitsweise.defaults,

  [`${S}gruender.label`]: "Gründer",
  [`${S}gruender.name`]: "Alexander Pütter",
  [`${S}gruender.text_vor`]: "Führt beuwy seit dem ersten Projekt.",
  [`${S}gruender.text_mark`]: "„Ins Rampenlicht gehört Ihre Marke, nicht meine.\"",
  [`${S}gruender.text_nach`]:
    "Deshalb finden Sie hier keine Bühnenfotos — sondern Wochenberichte, Quoten und drei Stationen zum Nachlesen.",

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Wir sind keine Agentur.",
  [`${S}unterschied.text`]:
    "Eine Agentur liefert Werbemittel ab und ist fertig. Eine Unternehmensberatung verantwortet ein Ergebnis: ein System, das Eigentümer registriert, Termine bringt und jeden Montag Rechenschaft ablegt.",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Häuser über *beuwy* wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Lernen wir uns über Ihre *Zahlen* kennen.",
  [`${S}finale.satz_vor`]: "Was beuwy baut, sehen Sie im",
  [`${S}finale.link1`]: "Immobilienmarketing-Hub",
  [`${S}finale.satz_mitte`]: ", was dabei herauskommt, in den",
  [`${S}finale.link2`]: "Fallstudien",
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

  [`${S}haltung.eyebrow`]: "Haltung · Eyebrow",
  [`${S}haltung.titel`]: "Haltung · Titel (ein *Wort* = Highlighter)",
  [`${S}haltung.spalte1_p1`]: "Haltung · Spalte 1 · Absatz 1",
  [`${S}haltung.spalte1_p2`]: "Haltung · Spalte 1 · Absatz 2",
  [`${S}haltung.spalte2_p1_vor`]: "Haltung · Spalte 2 · Absatz 1 · Teil vor dem Highlight",
  [`${S}haltung.spalte2_p1_mark`]: "Haltung · Spalte 2 · Absatz 1 · Hervorgehobener Teil",
  [`${S}haltung.spalte2_p1_nach`]: "Haltung · Spalte 2 · Absatz 1 · Teil nach dem Highlight",
  [`${S}haltung.spalte2_p2`]: "Haltung · Spalte 2 · Absatz 2",

  [`${S}stationen.eyebrow`]: "Stationen · Eyebrow",
  [`${S}stationen.titel`]: "Stationen · Titel (ein *Wort* = Highlighter)",
  [`${S}stationen.sub`]: "Stationen · Subline",
  ...stationen.labels,

  [`${S}arbeitsweise.eyebrow`]: "Arbeitsweise · Eyebrow",
  [`${S}arbeitsweise.titel`]: "Arbeitsweise · Titel (ein *Wort* = Highlighter)",
  ...arbeitsweise.labels,

  [`${S}gruender.label`]: "Gründer-Karte · Label",
  [`${S}gruender.name`]: "Gründer-Karte · Name",
  [`${S}gruender.text_vor`]: "Gründer-Karte · Text · Teil vor dem Zitat",
  [`${S}gruender.text_mark`]: "Gründer-Karte · Zitat",
  [`${S}gruender.text_nach`]: "Gründer-Karte · Text · Teil nach dem Zitat",

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.satz_vor`]: "Finale · Satz · Teil vor Link 1 (Hub)",
  [`${S}finale.link1`]: "Finale · Satz · Linktext 1 (Immobilienmarketing-Hub)",
  [`${S}finale.satz_mitte`]: "Finale · Satz · Teil zwischen Link 1 und Link 2 (Fallstudien)",
  [`${S}finale.link2`]: "Finale · Satz · Linktext 2 (Fallstudien)",
  [`${S}finale.satz_nach`]: "Finale · Satz · Teil nach Link 2",
  [`${S}finale.antwort`]: "Finale · Antwortzeit-Hinweis",
};
