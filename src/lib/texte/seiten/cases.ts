/** Studio-Texte /cases — Fallstudien-Übersicht. Case-Inhalte selbst: s.cases-detail.* (src/lib/cases.ts). */
export const SEITE = { slug: "cases", titel: "Fallstudien (Übersicht)", route: "/cases" };
const S = "s.cases.";

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Fallstudien — Referenzen für Immobilienmakler | beuwy",
  [`${S}meta.beschreibung`]:
    "Reale Projekte, echte Zahlen: wie beuwy Marke, Portal und Vertriebssystem für führende Immobilienmakler und Unternehmen gebaut hat.",
  [`${S}hero.eyebrow`]: "Fallstudien",
  [`${S}hero.titel`]: "Was passiert, wenn Marke und System zusammenpassen.",
  [`${S}hero.sub_vor`]: "Reale Projekte, reale Zahlen:",
  [`${S}hero.sub_highlight`]: "kein Fall ohne Beleg",
  [`${S}hero.sub_nach`]:
    ". 17 Jahre Markenarbeit, messbar an echten Ergebnissen statt an Behauptungen. Beispielprojekte sind sichtbar markiert und tragen keine echten Referenzen.",
  [`${S}abschluss.label`]: "Nächster Schritt",
  [`${S}abschluss.titel`]: "Wenn Ihr Projekt die nächste Fallstudie werden soll, sprechen wir.",
  [`${S}abschluss.text`]: "30 Minuten, kein Pitch. Wir sagen ehrlich, ob Ihr Auftritt so ein Ergebnis tragen kann.",
  [`${S}abschluss.cta`]: "Zusammenarbeit anfragen",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel",
  [`${S}hero.sub_vor`]: "Hero · Subline · Teil vor dem Highlighter",
  [`${S}hero.sub_highlight`]: "Hero · Subline · Hervorgehobener Teil",
  [`${S}hero.sub_nach`]: "Hero · Subline · Teil nach dem Highlighter",
  [`${S}abschluss.label`]: "Abschluss-Karte · Label",
  [`${S}abschluss.titel`]: "Abschluss-Karte · Titel",
  [`${S}abschluss.text`]: "Abschluss-Karte · Text",
  [`${S}abschluss.cta`]: "Abschluss-Karte · CTA-Text (führt zu /anfrage)",
};
