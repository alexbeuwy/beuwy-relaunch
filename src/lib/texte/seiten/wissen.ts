import { listeRegistrieren } from "../lesen";

/**
 * Studio-Texte /wissen — Hub-Übersicht. Die 50 Ratgeber selbst kommen
 * datengetrieben aus docs/redesign/R3-SEITENPLAN.json (Route + Frage je
 * Ratgeber) und bleiben Code; hier stehen nur die Rahmentexte der Seite.
 * Reihenfolge der Cluster-Liste = REIHENFOLGE im Code (W, C, K, V, T, P).
 */
export const SEITE = { slug: "wissen", titel: "Wissen (Hub)", route: "/wissen" };
const S = "s.wissen.";

const cluster = listeRegistrieren(
  "wissen",
  "cluster",
  "Cluster",
  [
    { titel: "Akquise & Alleinauftrag", sub: "Wie aus Eigentümern Mandate werden." },
    { titel: "Auftritt & Conversion", sub: "Was aus Besuchern Anfragen macht." },
    { titel: "KI & Sichtbarkeit", sub: "Von ChatGPT im Alltag bis zur Zitierfähigkeit in KI-Antworten." },
    { titel: "Vergleiche & Werkzeuge", sub: "Baukästen, CRMs und Portale — ehrlich eingeordnet." },
    { titel: "Immobilien-Zahlen", sub: "Bewertung, Miete, AfA — mit Rechenwegen statt Bauchgefühl." },
    { titel: "Büro & Prozesse", sub: "Provision, Team, Kennzahlen." },
  ],
  { titel: "Titel", sub: "Subline" },
);

const tools = listeRegistrieren(
  "wissen",
  "tools",
  "Rechner",
  [
    { titel: "Verkaufspreis-Rechner" },
    { titel: "Mietpreis-Rechner" },
    { titel: "AfA- & Restnutzungsdauer-Rechner" },
  ],
  { titel: "Titel" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Makler-Wissen: Akquise, Marketing, KI und Zahlen | beuwy",
  [`${S}meta.beschreibung`]:
    "Das Wissens-Archiv von beuwy: 50 Ratgeber zu Akquise, Marke, KI, Conversion und Immobilien-Zahlen — jede Seite beantwortet ihre Frage im ersten Absatz.",
  [`${S}meta.og_beschreibung`]:
    "50 Ratgeber zu Akquise, Marke, KI, Conversion und Immobilien-Zahlen — ohne Floskeln, mit Rechenwegen.",
  [`${S}hero.eyebrow`]: "Wissen",
  [`${S}hero.titel`]: "Alles, was ein Makler über *Sichtbarkeit* wissen muss.",
  [`${S}hero.sub_nach`]:
    " Ratgeber, sechs Themenfelder, drei Rechner. Jede Seite beantwortet ihre Frage im ersten Absatz — zum Nachschlagen gebaut, nicht zum Scrollen.",
  ...cluster.defaults,
  ...tools.defaults,
  [`${S}ausprobieren.label`]: "Zum Ausprobieren",
  [`${S}ausprobieren.titel`]: "Drei Rechner, sofort nutzbar.",
  [`${S}ausprobieren.text`]:
    "Verkaufspreis, Mietpreis, AfA mit Restnutzungsdauer — dieselben Werkzeuge, die in beuwy-Portalen Eigentümer registrieren, hier offen im Browser.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung (weicht vom Meta-Text ab)",
  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel (ein *Wort* = Highlighter)",
  [`${S}hero.sub_nach`]: "Hero · Subline · Teil nach der Ratgeber-Anzahl (Zahl bleibt Code)",
  ...cluster.labels,
  ...tools.labels,
  [`${S}ausprobieren.label`]: "Rechner-Kachel · Gelbe Karte · Label",
  [`${S}ausprobieren.titel`]: "Rechner-Kachel · Gelbe Karte · Titel",
  [`${S}ausprobieren.text`]: "Rechner-Kachel · Gelbe Karte · Text",
};
