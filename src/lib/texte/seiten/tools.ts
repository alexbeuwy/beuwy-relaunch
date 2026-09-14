import { listeRegistrieren } from "../lesen";

/** Studio-Texte /tools — Rechner-Hub. Struktur (Reihenfolge, Links) bleibt im Code. */
export const SEITE = { slug: "tools", titel: "Rechner-Hub", route: "/tools" };
const S = "s.tools.";

const werkzeuge = listeRegistrieren(
  "tools",
  "werkzeuge",
  "Rechner",
  [
    {
      titel: "Verkaufspreisrechner",
      text: "Was ist Ihre Immobilie wert? Wohnfläche, Baujahr, Zustand und Lage eingeben — die Verkaufswert-Spanne steht sofort da, mit Rechenweg.",
    },
    {
      titel: "Mietpreisrechner",
      text: "Welche Kaltmiete ist realistisch? Objekttyp, Zustand und Ausstattung ergeben eine Spanne für Ihre Vermietung — inklusive Hinweis zur Mietpreisbremse.",
    },
    {
      titel: "AfA-/Restnutzungsdauer-Rechner",
      text: "Wie viel Abschreibung ist drin? Regulärer Satz gegen ein mögliches Restnutzungsdauer-Gutachten im Vergleich, mit dem Steuereffekt in Euro.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Kostenlose Immobilien-Rechner für Eigentümer | beuwy",
  [`${S}meta.beschreibung`]:
    "Verkaufspreis, Mietpreis und AfA-Restnutzungsdauer selbst berechnen — kostenlos, sofort, ohne E-Mail-Pflicht. Mit nachvollziehbarem Rechenweg statt Black Box.",
  [`${S}hero.eyebrow`]: "Kostenlose Rechner für Eigentümer",
  [`${S}hero.titel`]: "Rechnen Sie selbst — *bevor* Sie fragen.",
  [`${S}hero.sub`]:
    "Drei Rechner, ein Prinzip: Das Ergebnis steht sofort da, ohne dass Sie vorher Ihre E-Mail-Adresse eintippen müssen. Wer mehr will, fordert die Auswertung freiwillig an.",
  ...werkzeuge.defaults,
  [`${S}karte.cta`]: "Rechner öffnen",
  [`${S}pitch.eyebrow`]: "Für Makler",
  [`${S}pitch.titel`]: "Diese Rechner können auch *Ihre* Website tragen.",
  [`${S}pitch.karte_label`]: "Der Unterschied",
  [`${S}pitch.karte_titel`]: "Kein Baukasten-Widget.",
  [`${S}pitch.karte_text_vor`]:
    "Wir bauen genau diese Rechner in Ihren Farben auf Ihre Domain — als Eigentümer-Magnet, der Anfragen direkt in Ihr CRM qualifiziert.",
  [`${S}pitch.karte_link`]: "Zusammenarbeit anfragen →",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel (ein *Wort* = Highlighter)",
  [`${S}hero.sub`]: "Hero · Subline",
  ...werkzeuge.labels,
  [`${S}karte.cta`]: "Rechner-Karte · Link-Mikrotext (für alle drei Karten)",
  [`${S}pitch.eyebrow`]: "Makler-Pitch · Eyebrow",
  [`${S}pitch.titel`]: "Makler-Pitch · Titel (ein *Wort* = Highlighter)",
  [`${S}pitch.karte_label`]: "Makler-Pitch · Gelbe Karte · Label",
  [`${S}pitch.karte_titel`]: "Makler-Pitch · Gelbe Karte · Titel",
  [`${S}pitch.karte_text_vor`]: "Makler-Pitch · Gelbe Karte · Text vor dem Link",
  [`${S}pitch.karte_link`]: "Makler-Pitch · Gelbe Karte · Link-Text (führt zu /anfrage)",
};
