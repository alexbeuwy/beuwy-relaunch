import { listeRegistrieren } from "../lesen";

/** Studio-Texte /bottimmo-alternative — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "bottimmo-alternative", titel: "BOTTIMMO-Alternative", route: "/bottimmo-alternative" };
const S = "s.bottimmo-alternative.";

const rails = listeRegistrieren("bottimmo-alternative", "rails", "Vergleichszeile", [
  {
    thema: "Vorlagen vs. eigene Marke",
    linksLabel: "Vorlage",
    linksText:
      "Design und Struktur stammen aus dem Baukasten. Dasselbe Grundgerüst läuft parallel bei anderen Kunden desselben Anbieters.",
    rechtsLabel: "Eigene Marke",
    rechtsText:
      "Typografie, Farbwelt und Sprache werden für Ihr Haus entwickelt. Wiedererkennbar, auch ohne Logo im Bild.",
  },
  {
    thema: "Gemietete Inhalte vs. eigenes System",
    linksLabel: "Gemietete Inhalte",
    linksText:
      "Texte, Bilder und Funnel gehören zur Lizenz. Sie laufen, solange Sie zahlen, und stehen mit der Kündigung still.",
    rechtsLabel: "Eigenes System",
    rechtsText:
      "Website, Inhalte und Funnel gehören Ihnen. Sie bleiben, auch wenn sich die Zusammenarbeit irgendwann ändert.",
  },
  {
    thema: "Selbstbedienung vs. done for you",
    linksLabel: "Selbstbedienung",
    linksText:
      "Einrichtung, Pflege und Anpassungen übernehmen Sie selbst, im Dashboard des Baukastens, neben dem Tagesgeschäft.",
    rechtsLabel: "Done for you",
    rechtsText:
      "Aufbau, Pflege und Weiterentwicklung übernehmen wir. Sie bekommen Ergebnisse zu sehen, keine Aufgabenliste.",
  },
  {
    thema: "Monatliche Lizenz vs. eigener Vermögenswert",
    linksLabel: "Monatliche Lizenz",
    linksText: "Sie zahlen für die Nutzung. Endet die Lizenz, endet auch die Website.",
    rechtsLabel: "Eigener Vermögenswert",
    rechtsText: "Sie bezahlen für ein System, das Ihnen gehört und mit Ihrem Haus mitwächst.",
  },
], { thema: "Thema", linksLabel: "Linke Spalte · Label", linksText: "Linke Spalte · Text", rechtsLabel: "Rechte Spalte · Label", rechtsText: "Rechte Spalte · Text" });

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "BOTTIMMO Alternative: Maßarbeit statt Baukasten | beuwy",
  [`${S}meta.beschreibung`]:
    "Der faire Vergleich zwischen Baukasten-Systemen wie BOTTIMMO und einer eigenen Marke für Immobilienmakler: was jede Lösung wirklich bringt, und für wen sie richtig ist.",

  [`${S}hero.eyebrow`]: "Vergleich · BOTTIMMO",
  [`${S}hero.titel`]: "Die BOTTIMMO-Alternative für Makler, die *auffallen* wollen.",
  [`${S}hero.sub`]:
    "BOTTIMMO baut ein bewährtes Marketing-Paket für den Einstieg. Wer schon zu den führenden Häusern seiner Stadt zählt, braucht mehr als das Paket, das auch der Mitbewerber zwei Straßen weiter nutzt. Hier lesen Sie den fairen Vergleich.",
  [`${S}hero.cta2`]: "Was BOTTIMMO gut kann →",

  [`${S}einordnung.eyebrow`]: "Einordnung",
  [`${S}einordnung.titel`]: "Baukasten-Systeme sind für den Einstieg gebaut, nicht für den *Vorsprung*.",
  [`${S}einordnung.text1`]:
    "Anbieter wie BOTTIMMO liefern ein bewährtes Marketing-Paket: eigene Website, vorgefertigte Anzeigen, ein Funnel, der grundsätzlich funktioniert. Für ein Büro, das gerade erst online sichtbar werden will, ist das ein schneller, solider Start, ohne dass jemand bei null anfängt.",
  [`${S}einordnung.text2_vor`]: "Die Grenze liegt im System selbst:",
  [`${S}einordnung.text2_mark`]: "gleiche Vorlagen, gleiche Funnels, gleiche Ratgeber",
  [`${S}einordnung.text2_nach`]:
    "laufen parallel bei vielen anderen Maklern im selben Markt. Was für den Einstieg reicht, wird zur Bremse, sobald zwei Häuser in derselben Stadt mit demselben Baukasten werben.",

  [`${S}gegenueberstellung.eyebrow`]: "Der Unterschied",
  [`${S}gegenueberstellung.titel`]: "Standard-Paket. Oder *Maßarbeit*.",
  ...rails.defaults,

  [`${S}ehrlich.eyebrow`]: "Ehrlich gesagt",
  [`${S}ehrlich.titel`]: "Nicht jedes Haus braucht *Maßarbeit*, noch nicht.",
  [`${S}ehrlich.bottimmo_titel`]: "Für wen BOTTIMMO die richtige Wahl bleibt",
  [`${S}ehrlich.bottimmo_text`]:
    "Für den ersten eigenen Online-Auftritt, ein kleines Marketingbudget im dreistelligen Monatsbereich, oder wenn Website und Anzeigen einfach nur laufen sollen, ohne dass die Marke im Mittelpunkt steht. Eine vernünftige Entscheidung, keine Notlösung.",
  [`${S}ehrlich.beuwy_titel`]: "Für wen beuwy richtig ist",
  [`${S}ehrlich.beuwy_text`]:
    "Für Häuser, die bereits einen Marktanteil verteidigen oder ausbauen, deren nächster Wettbewerber nicht der Baukasten-Nachbar ist, sondern das führende Büro der Stadt. Hier zahlt sich ein eigenes System aus, weil der Unterschied im Auftritt direkt den Unterschied im Alleinauftrag macht. 17 Jahre Markenarbeit stecken in jedem System, das wir bauen, kein Pilotprojekt.",

  [`${S}abschluss.karte_label`]: "Für Häuser mit Anspruch",
  [`${S}abschluss.karte_titel`]: "Sie haben den Baukasten längst hinter sich gelassen.",
  [`${S}abschluss.karte_text`]:
    "Ein Vorlagen-System bringt Sie online. Ein eigenes System bringt Sie an die Spitze Ihres Markts, und bleibt, wenn sich sonst etwas ändert.",
  [`${S}abschluss.schluss_titel`]: "Lassen Sie uns über Ihren Auftritt sprechen, nicht über eine Vorlage.",
  [`${S}abschluss.schluss_text`]:
    "In einem kurzen Gespräch sehen wir, wo Ihr aktueller Auftritt Sie unter Wert verkauft, und was ein eigenes System dagegen tut.",
  [`${S}abschluss.footnote`]:
    "BOTTIMMO ist eine Marke der BOTTIMMO AG. beuwy steht in keiner Verbindung zu BOTTIMMO.",
  [`${S}abschluss.link_kosten`]: "Was kostet eine Maklerwebsite?",
  [`${S}abschluss.link_software`]: "Maklersoftware im Vergleich",
  [`${S}abschluss.link_website`]: "Website für Makler",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",

  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel (*Wort* = Hervorhebung)",
  [`${S}hero.sub`]: "Hero · Subline",
  [`${S}hero.cta2`]: "Hero · Sekundär-Link (Anker Einordnung)",

  [`${S}einordnung.eyebrow`]: "Einordnung · Eyebrow",
  [`${S}einordnung.titel`]: "Einordnung · Titel (*Wort* = Hervorhebung)",
  [`${S}einordnung.text1`]: "Einordnung · Absatz 1",
  [`${S}einordnung.text2_vor`]: "Einordnung · Absatz 2 · Teil vor dem Highlighter",
  [`${S}einordnung.text2_mark`]: "Einordnung · Absatz 2 · Highlighter-Teil",
  [`${S}einordnung.text2_nach`]: "Einordnung · Absatz 2 · Teil nach dem Highlighter",

  [`${S}gegenueberstellung.eyebrow`]: "Gegenüberstellung · Eyebrow",
  [`${S}gegenueberstellung.titel`]: "Gegenüberstellung · Titel (*Wort* = Hervorhebung)",

  [`${S}ehrlich.eyebrow`]: "Für wen · Eyebrow",
  [`${S}ehrlich.titel`]: "Für wen · Titel (*Wort* = Hervorhebung)",
  [`${S}ehrlich.bottimmo_titel`]: "Für wen · linke Spalte · Titel",
  [`${S}ehrlich.bottimmo_text`]: "Für wen · linke Spalte · Text",
  [`${S}ehrlich.beuwy_titel`]: "Für wen · rechte Spalte · Titel",
  [`${S}ehrlich.beuwy_text`]: "Für wen · rechte Spalte · Text",

  [`${S}abschluss.karte_label`]: "Abschluss · Gelbe Karte · Label",
  [`${S}abschluss.karte_titel`]: "Abschluss · Gelbe Karte · Titel",
  [`${S}abschluss.karte_text`]: "Abschluss · Gelbe Karte · Text",
  [`${S}abschluss.schluss_titel`]: "Abschluss · Schluss-Titel",
  [`${S}abschluss.schluss_text`]: "Abschluss · Schluss-Text",
  [`${S}abschluss.footnote`]: "Abschluss · Fußnote",
  [`${S}abschluss.link_kosten`]: "Abschluss · Quervernetzung · Link 1",
  [`${S}abschluss.link_software`]: "Abschluss · Quervernetzung · Link 2",
  [`${S}abschluss.link_website`]: "Abschluss · Quervernetzung · Link 3",

  ...rails.labels,
};
