import { listeRegistrieren } from "../lesen";

/** Studio-Texte /eigentuemer-leads-generieren — Struktur bleibt im Code, jeder Text hier.
 *  mk.pm.*-Keys (Quote, Mandate, Provision) bleiben eigenständig, siehe content.ts. */
export const SEITE = {
  slug: "eigentuemer-leads-generieren",
  titel: "Eigentümer-Leads generieren",
  route: "/eigentuemer-leads-generieren",
};
const S = "s.eigentuemer-leads-generieren.";

const vergleich = listeRegistrieren(
  "eigentuemer-leads-generieren",
  "vergleich",
  "Merkmal",
  [
    { merkmal: "Exklusivität", eigen: "Landet nur in Ihrem System", portal: "oft an 3–5 Makler gleichzeitig verkauft" },
    { merkmal: "Vorwissen des Eigentümers", eigen: "kennt Ihren Namen, bevor er anruft", portal: "kennt nur ein ausgefülltes Formular" },
    { merkmal: "Lebensdauer", eigen: "bleibt bestehen, arbeitet weiter", portal: "endet mit dem gebuchten Abo" },
    { merkmal: "Qualifizierung", eigen: "Score liegt bei Registrierung im CRM", portal: "Roh-Kontakt ohne Vorqualifizierung" },
    { merkmal: "Kostenlogik", eigen: "Investition in eigene Sichtbarkeit", portal: "laufende Miete pro Kontakt" },
  ],
  { merkmal: "Merkmal", eigen: "Eigene Quelle", portal: "Gemieteter Portal-Kontakt" },
);

const kette = listeRegistrieren(
  "eigentuemer-leads-generieren",
  "kette",
  "Stufe",
  [
    { anteil: "100 %", label: "Anzeige gesehen", text: "Ihre Marke erscheint bei Eigentümern, die noch niemanden beauftragt haben." },
    { anteil: "38 %", label: "Bleiben dran", text: "Wer klickt, landet auf einem Portal, nicht auf einer Visitenkarte." },
    { anteil: "14 %", label: "Rechner gestartet", text: "Adresse rein, Ersteinschätzung raus, der erste konkrete Schritt." },
    { anteil: "5 %", label: "Registriert & qualifiziert", text: "Die kommunizierte Quote: Der Eigentümer liegt mit Score im CRM." },
  ],
  { anteil: "Anteil", label: "Label", text: "Text" },
);

const faq = listeRegistrieren(
  "eigentuemer-leads-generieren",
  "faq",
  "FAQ",
  [
    {
      frage: "Wie viele Eigentümer-Leads kann ich realistisch pro Monat erwarten?",
      antwort:
        "Das hängt von Ihrer Region, dem Werbebudget und der Zahl der Eigentümer ab, die dort gerade verkaufen. Die Kette selbst ist planbar (Anzeige, Klick, Rechner, Registrierung), die Menge am Ende nicht ohne Ihren Markt zu kennen. Eine feste Zahl nennen wir erst nach dem ersten Blick auf Ihre Region.",
    },
    {
      frage: "Was kostet ein selbst generierter Lead im Vergleich zum gekauften?",
      antwort:
        "Anders als beim gekauften Kontakt sinken die Kosten je registriertem Eigentümer meist, je länger die eigene Quelle läuft, weil Rechner und Portal weiterarbeiten, ohne dass jede Anzeige neu bezahlt wird. Eine pauschale Zahl wäre unseriös, das hängt zu stark von Region und Wettbewerb ab.",
    },
    {
      frage: "Ersetzt die eigene Quelle Portale wie ImmoScout komplett?",
      antwort:
        "Nein. Bleiben Sie dort gelistet, Portale ersetzen wir nicht. Wir bauen daneben die Quelle auf, die Ihnen gehört und nicht endet, sobald ein Wettbewerber mehr für dieselbe Anzeige zahlt.",
    },
    {
      frage: "Brauche ich dafür ein neues CRM?",
      antwort:
        "Nicht zwingend. Die Anfrage muss nur strukturiert in Ihr bestehendes System einlaufen, mit Quelle und nächstem Schritt, statt im Postfach liegen zu bleiben.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Eigentümer-Leads generieren: Die eigene Quelle statt Portal-Miete | beuwy",
  [`${S}meta.beschreibung`]:
    "Eigentümer-Leads generieren: eigene Quelle statt gemieteter Portal-Kontakte, die jeder Wettbewerber bekommt. beuwy baut Rechner, Anzeigen und Portal als System.",
  [`${S}meta.og_titel`]: "Eigentümer-Leads generieren: Die eigene Quelle statt Portal-Miete | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Eigene Lead-Quelle statt gemieteter Portal-Kontakte, die jeder Wettbewerber ebenfalls bekommt. beuwy baut Rechner, Anzeigen und Portal als ein System nach der 5%-Systematik.",
  [`${S}hero.eyebrow`]: "Akquise",
  [`${S}hero.titel`]: "Eigentümer-Leads, die *Ihnen* gehören.",
  [`${S}hero.sub_vor`]: "Sie generieren Eigentümer-Leads, indem Sie eine",
  [`${S}hero.sub_highlight`]: "eigene Quelle",
  [`${S}hero.sub_nach`]:
    "bauen statt gemietete Kontakte einzukaufen: eine Anzeige, die auf einen Bewertungsrechner führt, der eine Adresse in eine Ersteinschätzung verwandelt und den Eigentümer mit Score direkt in Ihr System registriert. Ein gekaufter Lead kennt Ihren Namen nicht, bevor das Telefon klingelt, und wird oft an mehrere Makler gleichzeitig verkauft. Eine eigene Quelle gehört ausschließlich Ihnen und arbeitet weiter, auch während Sie eine Besichtigung führen.",
  [`${S}cta.label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",
  [`${S}vergleich.eyebrow`]: "Der Unterschied auf einen Blick",
  [`${S}vergleich.titel`]: "Eigene Quelle gegen *gemieteten* Kontakt.",
  [`${S}vergleich.spalte_merkmal`]: "Merkmal",
  [`${S}vergleich.spalte_eigen`]: "Eigene Quelle (Rechner + Ads + Portal)",
  [`${S}vergleich.spalte_portal`]: "Gemieteter Portal-Kontakt",
  ...vergleich.defaults,
  [`${S}kette.eyebrow`]: "Die 5 %-Systematik",
  [`${S}kette.titel`]: "Vier Stufen, bis aus einer Anzeige ein *Mandat* wird.",
  [`${S}kette.sub`]:
    "Jede Stufe hat eine realistische Quote statt Bauchgefühl. Das Ende der Kette ist die Zahl, die zählt: Wie viele Eigentümer registrieren sich qualifiziert.",
  ...kette.defaults,
  [`${S}kette.karte_label`]: "Was das im Jahr bedeutet",
  [`${S}kette.karte_text`]:
    "registrierte und qualifizierte Eigentümer, gemessen an allen, die die Anzeige sehen.",
  [`${S}kette.mandate_suffix`]: "zusätzliche Mandate",
  [`${S}kette.karte_footnote_vor`]: "im Jahr, bei Ø",
  [`${S}kette.karte_footnote_nach`]: "Provision je Mandat.",
  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Gemietet ist nicht Ihres.",
  [`${S}unterschied.text`]:
    "Ein gekaufter Kontakt gehört dem Portal, das ihn verkauft, nicht Ihnen. Eine eigene Quelle gehört Ihnen, arbeitet weiter, wenn Sie im Termin sind, und wird mit jeder Anzeige, jedem Rechner-Durchlauf wertvoller statt teurer.",
  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "Bei RIEGEL Immobilien liegt genau dieser Bewertungsrechner mit amtlichen Bodenrichtwerten hinter der eigenen Quelle: neun zusätzliche Mandate in den ersten drei Monaten nach dem Relaunch, ohne einen einzigen gekauften Lead.",
  [`${S}beweis.link`]: "Fallstudie RIEGEL Immobilien lesen →",
  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Gespräch wissen wollen.",
  ...faq.defaults,
  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihre eigene *Quelle*.",
  [`${S}finale.satz_1`]: "Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.link_1`]: "Immobilienmarketing-Hub",
  [`${S}finale.satz_2`]: ", die volle Systematik auf der Seite",
  [`${S}finale.link_2`]: "Leadgenerierung für Immobilienmakler",
  [`${S}finale.satz_3`]: ", den Rechner selbst im",
  [`${S}finale.link_3`]: "Verkaufspreisrechner",
  [`${S}finale.satz_4`]: "und wie die Anzeigen dazu laufen im",
  [`${S}finale.link_4`]: "Performance-Marketing für Makler",
  [`${S}finale.satz_5`]: ".",
  [`${S}finale.cta_hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · OpenGraph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · OpenGraph-Beschreibung",
  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel (ein *Wort* = Highlighter)",
  [`${S}hero.sub_vor`]: "Hero · Subline (Teil vor dem Highlight)",
  [`${S}hero.sub_highlight`]: "Hero · Subline (hervorgehobener Teil)",
  [`${S}hero.sub_nach`]: "Hero · Subline (Teil nach dem Highlight)",
  [`${S}cta.label`]: "CTA · Button-Beschriftung",
  [`${S}hero.cta_hinweis`]: "Hero · Hinweis neben dem CTA",
  [`${S}vergleich.eyebrow`]: "Vergleich · Eyebrow",
  [`${S}vergleich.titel`]: "Vergleich · Titel",
  [`${S}vergleich.spalte_merkmal`]: "Vergleich · Tabellenkopf Spalte 1",
  [`${S}vergleich.spalte_eigen`]: "Vergleich · Tabellenkopf Spalte 2",
  [`${S}vergleich.spalte_portal`]: "Vergleich · Tabellenkopf Spalte 3",
  ...vergleich.labels,
  [`${S}kette.eyebrow`]: "5%-Kette · Eyebrow",
  [`${S}kette.titel`]: "5%-Kette · Titel",
  [`${S}kette.sub`]: "5%-Kette · Subline",
  ...kette.labels,
  [`${S}kette.karte_label`]: "5%-Kette · Kachel-Label",
  [`${S}kette.karte_text`]: "5%-Kette · Kachel-Text unter der Quote",
  [`${S}kette.mandate_suffix`]: "5%-Kette · Kachel-Text nach der Mandate-Zahl",
  [`${S}kette.karte_footnote_vor`]: "5%-Kette · Fußnote (Teil vor der Provision)",
  [`${S}kette.karte_footnote_nach`]: "5%-Kette · Fußnote (Teil nach der Provision)",
  [`${S}unterschied.label`]: "Unterschied-Karte · Label",
  [`${S}unterschied.titel`]: "Unterschied-Karte · Titel",
  [`${S}unterschied.text`]: "Unterschied-Karte · Text",
  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.text`]: "Beweis · Text",
  [`${S}beweis.link`]: "Beweis · Link-Beschriftung",
  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel",
  ...faq.labels,
  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.satz_1`]: "Finale · Satzteil 1 (vor Link 1)",
  [`${S}finale.link_1`]: "Finale · Link 1 (Ziel: Immobilienmarketing-Hub)",
  [`${S}finale.satz_2`]: "Finale · Satzteil 2 (zwischen Link 1 und Link 2)",
  [`${S}finale.link_2`]: "Finale · Link 2 (Ziel: Leadgenerierung für Immobilienmakler)",
  [`${S}finale.satz_3`]: "Finale · Satzteil 3 (zwischen Link 2 und Link 3)",
  [`${S}finale.link_3`]: "Finale · Link 3 (Ziel: Verkaufspreisrechner)",
  [`${S}finale.satz_4`]: "Finale · Satzteil 4 (zwischen Link 3 und Link 4)",
  [`${S}finale.link_4`]: "Finale · Link 4 (Ziel: Performance-Marketing für Makler)",
  [`${S}finale.satz_5`]: "Finale · Satzteil 5 (nach Link 4)",
  [`${S}finale.cta_hinweis`]: "Finale · Hinweis neben dem CTA",
};
