import { listeRegistrieren } from "../lesen";

/** Studio-Texte /onoffice-website — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "onoffice-website", titel: "onOffice-Website", route: "/onoffice-website" };
const S = "s.onoffice-website.";

const rails = listeRegistrieren("onoffice-website", "rails", "Rail", [
  {
    nr: "01",
    label: "Objekt-Sync",
    kurz: "Exposés im Marken-Look statt Portal-Look.",
    text: "Ihre Objekte laufen aus onOffice direkt auf die Website — im Layout Ihrer Marke, nicht im Raster eines Portals. Ändern Sie den Preis im CRM, ändert sich die Website mit.",
  },
  {
    nr: "02",
    label: "Anfragen mit Quelle & Score",
    kurz: "Direkt im CRM, nicht im Postfach.",
    text: "Jede Anfrage landet mit Quelle und Score sofort in Ihrem onOffice — kein Copy-Paste, kein Zettel, kein vergessener Rückruf.",
  },
  {
    nr: "03",
    label: "Bewertungsrechner",
    kurz: "Eigentümer-Leads als Kontakt mit Aktivität.",
    text: "Der Rechner qualifiziert, während Sie besichtigen: Adresse rein, Ersteinschätzung raus — der Eigentümer-Lead liegt als Kontakt mit Aktivität im CRM, bevor Sie zurück im Büro sind.",
  },
  {
    nr: "04",
    label: "Automatisches Nachfassen",
    kurz: "Aus dem CRM heraus, nicht aus dem Kopf.",
    text: "Wer heute nicht kauft, bekommt in sechs Monaten die passende Nachricht — automatisch ausgelöst aus onOffice, ohne dass jemand daran denken muss.",
  },
], { nr: "Nummer", label: "Label", kurz: "Kurzzeile", text: "Text" });

const wochen = listeRegistrieren("onoffice-website", "wochen", "Ablauf-Woche", [
  { nr: "Woche 1", titel: "Zugang & Analyse", text: "CRM-Zugang, bestehende Objektstruktur und Marke sichten." },
  { nr: "Woche 2", titel: "Design", text: "Website, Exposé- und Rechner-Vorlagen im Markenlook." },
  { nr: "Woche 3", titel: "Anbindung", text: "Objekt-Sync, Anfrage-Routing und Score-Logik ans CRM." },
  { nr: "Woche 4", titel: "Livegang", text: "Test mit echten Objekten, Freigabe, live." },
], { nr: "Wochen-Label", titel: "Titel", text: "Text" });

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "onOffice Website: Premium-Auftritt direkt am CRM | beuwy",
  [`${S}meta.beschreibung`]:
    "Websites, die an onOffice andocken: Exposés im Markenlook, Anfragen mit Score direkt im CRM, automatisches Nachfassen. Kein Wechsel, kein Umweg — in vier Wochen live.",
  [`${S}meta.og_titel`]: "onOffice Website: Premium-Auftritt direkt am CRM | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Websites, die an onOffice andocken: Objekt-Sync im Markenlook, Anfragen mit Score direkt im CRM, automatisches Nachfassen.",

  [`${S}hero.badge_label`]: "Direkt am CRM",
  [`${S}hero.badge_wert`]: "4–6",
  [`${S}hero.badge_text`]: "Wochen bis Livegang",
  [`${S}hero.stempel_text`]: "ANGEBUNDEN · MARKENSTARK",
  [`${S}hero.breadcrumb`]: "← Immobilienmarketing-Hub",
  [`${S}hero.eyebrow`]: "Website · Objekt-Sync · CRM-Anbindung",
  [`${S}hero.titel`]: "Ihre onOffice-Website — endlich so stark wie Ihr *Vertrieb*.",
  [`${S}hero.sub`]:
    "onOffice hält Objekte, Kontakte und Abläufe zuverlässig zusammen. Nur der erste Eindruck, Ihre Website, zeigt davon fast nichts. Wir bauen das Portal davor: Es registriert Eigentümer, qualifiziert sie und spielt sie in genau das System, das bei Ihnen schon läuft.",
  [`${S}hero.cta`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_sekundaer`]: "So docken wir an",
  [`${S}hero.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",

  [`${S}problem.eyebrow`]: "Der Unterschied",
  [`${S}problem.titel`]: "onOffice ist stark. Ihre Website sieht das *nicht*.",
  [`${S}problem.text1`]:
    "onOffice hält im Hintergrund zusammen, was bei den meisten Maklerbüros auseinanderfällt: Objekte, Kontakte, Anfragen, Abläufe. Das ist die eigentliche Stärke — ein System, das seit Jahren zuverlässig läuft und das Ihr Team kennt.",
  [`${S}problem.text2`]:
    "Nur sieht man das der Website meistens nicht an. Das mitgelieferte Template macht aus einem Marktführer eine Verwaltungsseite: gleiche Struktur, gleiche Bausteine, gleiche Distanz zum Kunden wie bei jedem anderen Büro mit derselben Software.",
  [`${S}problem.text3_vor`]:
    "Ein Eigentümer vergleicht drei Makler in wenigen Minuten — und entscheidet nach dem, was er sieht, nicht nach dem, was in Ihrem CRM passiert.",
  [`${S}problem.text3_highlight`]: "Verliert die Website, verliert am Ende auch das beste System dahinter.",
  [`${S}problem.text4`]:
    "beuwy verbindet Marke und System seit 17 Jahren, zuletzt für Häuser wie Ihres, davor für Bosch und Continental. Dieselbe Arbeit, jetzt auf Ihr onOffice angewandt.",

  [`${S}andocken.eyebrow`]: "Die Anbindung",
  [`${S}andocken.titel`]: "Vier Rails direkt an Ihr *CRM*.",
  [`${S}andocken.sub`]:
    "Kein neues System, keine Schulung fürs Team — vier Verbindungen zwischen Ihrer Website und dem onOffice, das Sie schon nutzen.",
  ...rails.defaults,

  [`${S}karte.label`]: "Kein Wechsel nötig",
  [`${S}karte.titel`]: "Sie wechseln nichts. Ihr onOffice bleibt.",
  [`${S}karte.text`]: "Es sieht nur zum ersten Mal so aus, wie Sie verkaufen.",

  [`${S}ablauf.eyebrow`]: "Ablauf",
  [`${S}ablauf.titel`]: "Vier Wochen bis zur *Anbindung*.",
  [`${S}ablauf.sub`]: "Von der Analyse bis zum Livegang — ohne dass im Tagesgeschäft etwas stillsteht.",
  ...wochen.defaults,
  [`${S}ablauf.hinweis`]:
    "Ein Ansprechpartner, jeder Schritt nachweisbar im Ticketsystem. Sie fragen nicht nach zwei Wochen, wie weit die Anbindung ist, Sie sehen es.",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vorher *wissen* wollen.",
  [`${S}faq.1.frage`]: "Muss ich onOffice wechseln?",
  [`${S}faq.1.antwort`]: "Nein. Ihr CRM bleibt exakt so, wie es ist — wir docken an, wir ersetzen nichts.",
  [`${S}faq.2.frage`]: "Was ist mit meinen Objektdaten?",
  [`${S}faq.2.antwort`]:
    "Sie bleiben in onOffice, wo sie heute schon liegen. Die Website liest sie über die bestehende Schnittstelle — nichts wird doppelt gepflegt, nichts verlässt Ihr System.",
  [`${S}faq.3.frage`]: "Geht das auch mit FLOWFACT oder Propstack?",
  [`${S}faq.3.antwort_vor`]:
    "Ja. Das Prinzip ist bei jedem CRM dasselbe — welche Anbindung sich für Sie lohnt, sehen Sie im",
  [`${S}faq.3.antwort_link`]: "Maklersoftware-Vergleich",
  [`${S}faq.3.antwort_nach`]: ".",
  [`${S}faq.rechtshinweis`]: "onOffice ist eine Marke der onOffice GmbH. beuwy ist ein unabhängiger Dienstleister.",

  [`${S}finale.label`]: "Nächster Schritt",
  [`${S}finale.titel`]: "Ihr CRM funktioniert. Jetzt sieht man es *auch*.",
  [`${S}finale.text`]:
    "Ein Systemgespräch von 30 Minuten reicht, um zu sehen, wie Ihr onOffice und Ihre Website zusammen aussehen könnten.",
  [`${S}finale.cta`]: "Zusammenarbeit anfragen",
  [`${S}finale.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",
  [`${S}finale.link_hub`]: "Zum Immobilienmarketing-Hub",
  [`${S}finale.link_website`]: "Mehr zur Website für Makler",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · Open-Graph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",

  [`${S}hero.badge_label`]: "Hero · Floating Card · Label",
  [`${S}hero.badge_wert`]: "Hero · Floating Card · Zahl",
  [`${S}hero.badge_text`]: "Hero · Floating Card · Text",
  [`${S}hero.stempel_text`]: "Hero · Stempel-Badge-Text",
  [`${S}hero.breadcrumb`]: "Hero · Breadcrumb-Link (zurück zum Hub)",
  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel (*Wort* = Highlighter)",
  [`${S}hero.sub`]: "Hero · Subline",
  [`${S}hero.cta`]: "Hero · CTA-Text",
  [`${S}hero.cta_sekundaer`]: "Hero · Sekundär-Link (Anker #andocken)",
  [`${S}hero.cta_hinweis`]: "Hero · Mikrozeile unter dem CTA",

  [`${S}problem.eyebrow`]: "Problem · Eyebrow",
  [`${S}problem.titel`]: "Problem · Titel (*Wort* = Highlighter)",
  [`${S}problem.text1`]: "Problem · Absatz 1",
  [`${S}problem.text2`]: "Problem · Absatz 2",
  [`${S}problem.text3_vor`]: "Problem · Absatz 3 · Teil vor dem Highlight",
  [`${S}problem.text3_highlight`]: "Problem · Absatz 3 · Highlight-Satz",
  [`${S}problem.text4`]: "Problem · Absatz 4",

  [`${S}andocken.eyebrow`]: "Anbindung · Eyebrow",
  [`${S}andocken.titel`]: "Anbindung · Titel (*Wort* = Highlighter)",
  [`${S}andocken.sub`]: "Anbindung · Subline",

  [`${S}karte.label`]: "Gelbe Karte · Label",
  [`${S}karte.titel`]: "Gelbe Karte · Titel",
  [`${S}karte.text`]: "Gelbe Karte · Text",

  [`${S}ablauf.eyebrow`]: "Ablauf · Eyebrow",
  [`${S}ablauf.titel`]: "Ablauf · Titel (*Wort* = Highlighter)",
  [`${S}ablauf.sub`]: "Ablauf · Subline",
  [`${S}ablauf.hinweis`]: "Ablauf · Mikrozeile unter dem Raster",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (*Wort* = Highlighter)",
  [`${S}faq.1.frage`]: "FAQ 1 · Frage",
  [`${S}faq.1.antwort`]: "FAQ 1 · Antwort",
  [`${S}faq.2.frage`]: "FAQ 2 · Frage",
  [`${S}faq.2.antwort`]: "FAQ 2 · Antwort",
  [`${S}faq.3.frage`]: "FAQ 3 · Frage",
  [`${S}faq.3.antwort_vor`]: "FAQ 3 · Antwort · Teil vor dem Link",
  [`${S}faq.3.antwort_link`]: "FAQ 3 · Antwort · Linktext",
  [`${S}faq.3.antwort_nach`]: "FAQ 3 · Antwort · Satzende",
  [`${S}faq.rechtshinweis`]: "FAQ · Rechtshinweis unter dem Accordion",

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (*Wort* = Highlighter)",
  [`${S}finale.text`]: "Finale · Absatz",
  [`${S}finale.cta`]: "Finale · CTA-Text",
  [`${S}finale.cta_hinweis`]: "Finale · Mikrozeile unter dem CTA",
  [`${S}finale.link_hub`]: "Finale · Fußzeile · Linktext Hub",
  [`${S}finale.link_website`]: "Finale · Fußzeile · Linktext Website für Makler",

  ...rails.labels,
  ...wochen.labels,
};
