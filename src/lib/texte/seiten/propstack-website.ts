import { listeRegistrieren } from "../lesen";

/** Studio-Texte /propstack-website — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "propstack-website",
  titel: "Propstack-Website",
  route: "/propstack-website",
};
const S = "s.propstack-website.";

const propstackLiefert = listeRegistrieren(
  "propstack-website",
  "propstack_liefert",
  "Propstack liefert · Punkt",
  [
    { punkt: "Automatische Objekt-Veröffentlichung direkt aus dem CRM-Datensatz" },
    { punkt: "Ein technisch laufendes Grundgerüst ohne separate Website-Software" },
    { punkt: "Konsistente Objektdaten, weil Website und CRM dieselbe Quelle nutzen" },
    { punkt: "Eine offene Schnittstellenphilosophie, die Anbindungen grundsätzlich erlaubt" },
  ],
  { punkt: "Text" },
);

const portalBraucht = listeRegistrieren(
  "propstack-website",
  "portal_braucht",
  "Portal braucht zusätzlich · Punkt",
  [
    { punkt: "Eigene Typografie, Farbwelt und Bildsprache statt CRM-Vorlage" },
    { punkt: "Einen Bewertungsrechner, der Eigentümer-Leads vorqualifiziert, nicht nur ein Kontaktformular" },
    { punkt: "Lokale Landingpages pro Stadtteil, die eine reine Objekt-Website nicht kennt" },
    { punkt: "Eine Registrierungs- und Nachfassstrecke, die weiterläuft, wenn der Eigentümer nicht sofort verkauft" },
  ],
  { punkt: "Text" },
);

const schritte = listeRegistrieren(
  "propstack-website",
  "schritte",
  "Schritt",
  [
    {
      titel: "Objekt-Sync direkt aus Propstack",
      text: "Objekte laufen automatisch aus Propstack auf die Website — im Layout Ihrer Marke, nicht im Raster des CRM. Ändern Sie den Preis im System, zieht die Website nach.",
    },
    {
      titel: "Anfragen mit Quelle und Score zurück ins CRM",
      text: "Jede Anfrage landet mit Quelle und Score direkt in Ihrem Propstack, kein Copy-Paste, kein Zettel, kein vergessener Rückruf.",
    },
    {
      titel: "Bewertungsrechner als Vorqualifizierung",
      text: "Der Rechner nimmt die Adresse auf und liefert eine Ersteinschätzung — der Eigentümer-Lead liegt als Kontakt mit Score im CRM, nicht nur als E-Mail im Postfach.",
    },
    {
      titel: "Ein Datensatz, keine Parallelpflege",
      text: "Objektdaten bleiben ausschließlich in Propstack. Die Website liest sie über die bestehende Schnittstelle, statt eine zweite Wahrheit aufzubauen.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const faq = listeRegistrieren(
  "propstack-website",
  "faq",
  "FAQ",
  [
    {
      frage: "Ersetzt ein eigenes Portal Propstack?",
      antwort:
        "Nein. Propstack bleibt Ihr CRM und Ihre Objektverwaltung. Ein eigenes Portal ist der Auftritt davor, der an genau dieses System andockt, statt es zu ersetzen.",
    },
    {
      frage: "Reicht die Propstack-Website für den Start?",
      antwort:
        "Für die reine Objektpräsenz ja. Für den Alleinauftrag gegen einen Mitbewerber mit eigener Marke entscheidet meist, was der Eigentümer vorher im Netz sieht, nicht nur, ob das Objekt korrekt dargestellt ist.",
    },
    {
      frage: "Wie lange dauert die Anbindung an Propstack?",
      antwort:
        "Analyse, Design und Anbindung stehen üblicherweise innerhalb weniger Wochen. Eine feste Zahl nennen wir erst, wenn wir Ihre bestehende Datenstruktur kennen.",
    },
    {
      frage: "Funktioniert dasselbe Prinzip auch mit anderen CRMs?",
      antwort:
        "Ja, das Prinzip ist bei jedem System dasselbe. Welche Anbindung sich für Ihr Haus lohnt, zeigt der Maklersoftware-Vergleich.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Propstack-Website: Was das CRM kann und wo der Auftritt beginnt | beuwy",
  [`${S}meta.beschreibung`]:
    "Propstack-Website: Das CRM liefert eine funktionierende Objekt-Website, aber ein Datenblatt, keine Marke. Wo Propstack endet und ein eigenes Portal beginnt.",
  [`${S}meta.og_titel`]: "Propstack-Website: Was das CRM kann und wo der Auftritt beginnt | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Propstack liefert eine funktionierende CRM-Website. Für den Alleinauftrag zählt, was ein Eigentümer vorher sieht — dafür braucht es Marke und saubere Anbindung statt Ersatz.",
  [`${S}hero.eyebrow`]: "CRM · Propstack",
  [`${S}hero.titel`]: "Propstack-Website: wo das CRM endet und Ihr *Auftritt* beginnt.",
  [`${S}hero.sub_vor`]:
    "Ja, Propstack liefert eine eigene Objekt-Website, die Objekte automatisch aus dem CRM-Datensatz veröffentlicht — technisch reicht das für einen laufenden Auftritt. Das Ergebnis bleibt aber ein Datenblatt, keine Marke:",
  [`${S}hero.sub_highlight`]: "Layout, Struktur und Sprache folgen der CRM-Vorlage",
  [`${S}hero.sub_nach`]:
    ", nicht Ihrer Positionierung. Für die reine Objektpräsenz reicht das. Für den Alleinauftrag entscheidet, was der Eigentümer vor dem Termin über Sie sieht.",
  [`${S}cta.label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",
  [`${S}zweispalter.eyebrow`]: "Zwei Ebenen, ein System",
  [`${S}zweispalter.titel`]: "Was Propstack liefert. Was ein *Portal* zusätzlich braucht.",
  [`${S}zweispalter.propstack_label`]: "Propstack liefert",
  ...propstackLiefert.defaults,
  [`${S}zweispalter.portal_label`]: "Ein eigenes Portal braucht zusätzlich",
  ...portalBraucht.defaults,
  [`${S}anbindung.eyebrow`]: "Anbindung statt Ersatz",
  [`${S}anbindung.titel`]: "Vier Schritte, wie eine *saubere* Anbindung aussieht.",
  [`${S}anbindung.sub`]:
    "Kein neues System, keine Schulung fürs Team — vier Verbindungen zwischen Ihrem Portal und dem Propstack, das Sie schon nutzen.",
  ...schritte.defaults,
  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Propstack ist der Motor. Der Auftritt ist das Schaufenster.",
  [`${S}unterschied.text`]:
    "Ein starkes CRM organisiert, was im Hintergrund passiert. Ob ein Eigentümer anruft, entscheidet sich am Schaufenster davor. Wir bauen das Schaufenster und die Leitung dazwischen — Ihr Propstack bleibt exakt so, wie es ist.",
  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "Bei RIEGEL Immobilien landet jede Anfrage mit Quelle und nächstem Schritt direkt im Maklersystem. Ergebnis der ersten drei Monate: neun zusätzliche Mandate.",
  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Gespräch wissen wollen.",
  ...faq.defaults,
  [`${S}faq.hinweis`]: "Propstack ist eine Marke der Propstack GmbH. beuwy ist unabhängiger Dienstleister.",
  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Ihr Propstack bleibt. Ihr *Auftritt* wechselt die Liga.",
  [`${S}finale.satz_1`]: "Wie sich andere CRM-Systeme anbinden lassen, zeigt der",
  [`${S}finale.link_1`]: "Maklersoftware-Vergleich",
  [`${S}finale.satz_2`]: ", das gleiche Prinzip für onOffice steht unter",
  [`${S}finale.link_2`]: "onOffice-Website",
  [`${S}finale.satz_3`]: ". Den Überblick über alle Bausteine finden Sie im",
  [`${S}finale.link_3`]: "Immobilienmarketing-Hub",
  [`${S}finale.satz_4`]: ".",
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
  [`${S}zweispalter.eyebrow`]: "Zweispalter · Eyebrow",
  [`${S}zweispalter.titel`]: "Zweispalter · Titel",
  [`${S}zweispalter.propstack_label`]: "Zweispalter · Spalte links Label",
  ...propstackLiefert.labels,
  [`${S}zweispalter.portal_label`]: "Zweispalter · Spalte rechts Label",
  ...portalBraucht.labels,
  [`${S}anbindung.eyebrow`]: "Anbindung · Eyebrow",
  [`${S}anbindung.titel`]: "Anbindung · Titel",
  [`${S}anbindung.sub`]: "Anbindung · Subline",
  ...schritte.labels,
  [`${S}unterschied.label`]: "Unterschied-Karte · Label",
  [`${S}unterschied.titel`]: "Unterschied-Karte · Titel",
  [`${S}unterschied.text`]: "Unterschied-Karte · Text",
  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.text`]: "Beweis · Text",
  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel",
  ...faq.labels,
  [`${S}faq.hinweis`]: "FAQ · Marken-Disclaimer",
  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.satz_1`]: "Finale · Satzteil 1 (vor Link 1)",
  [`${S}finale.link_1`]: "Finale · Link 1 (Ziel: Maklersoftware-Vergleich)",
  [`${S}finale.satz_2`]: "Finale · Satzteil 2 (zwischen Link 1 und Link 2)",
  [`${S}finale.link_2`]: "Finale · Link 2 (Ziel: onOffice-Website)",
  [`${S}finale.satz_3`]: "Finale · Satzteil 3 (zwischen Link 2 und Link 3)",
  [`${S}finale.link_3`]: "Finale · Link 3 (Ziel: Immobilienmarketing-Hub)",
  [`${S}finale.satz_4`]: "Finale · Satzteil 4 (nach Link 3)",
  [`${S}finale.cta_hinweis`]: "Finale · Hinweis neben dem CTA",
};
