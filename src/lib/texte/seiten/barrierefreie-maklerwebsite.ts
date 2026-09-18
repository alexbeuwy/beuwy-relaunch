import { listeRegistrieren } from "../lesen";

/** Studio-Texte /barrierefreie-maklerwebsite — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "barrierefreie-maklerwebsite",
  titel: "Barrierefreie Maklerwebsite",
  route: "/barrierefreie-maklerwebsite",
};
const S = "s.barrierefreie-maklerwebsite.";

const massnahmen = listeRegistrieren(
  "barrierefreie-maklerwebsite",
  "massnahmen",
  "Maßnahme",
  [
    {
      titel: "Farbkontrast prüfen",
      text: "Text zu Hintergrund mindestens im Verhältnis 4,5 zu 1, besonders dort, wo helle Akzentfarbe auf hellem Grund steht. Ein einfacher Kontrast-Checker reicht für die erste Prüfung jeder Seite.",
    },
    {
      titel: "Tastatur-Bedienbarkeit",
      text: "Jede Funktion muss ohne Maus erreichbar sein, mit sichtbarem Fokus-Rahmen statt eines entfernten Outline-Stils. Wer per Tab durch das Kontaktformular springt, muss jederzeit sehen, wo er gerade steht.",
    },
    {
      titel: "Alt-Texte für jedes Bild",
      text: "Exposé-Fotos und Grundrisse bekommen einen beschreibenden Alt-Text, nicht nur Dekor-Bilder eine leere Zeile. Ein Screenreader-Nutzer soll ein Objekt verstehen können, ohne ein einziges Foto zu sehen.",
    },
    {
      titel: "Klare Formularlabels",
      text: "Jedes Feld trägt ein sichtbares Label, Fehlermeldungen erscheinen als Text, nicht nur als rote Umrandung. Ein Kontaktformular, das nur über Farbe kommuniziert, was falsch ist, verliert Anfragen, nicht nur Barrierefreiheits-Punkte.",
    },
    {
      titel: "Saubere Überschriften-Hierarchie",
      text: "Eine H1 pro Seite, H2 und H3 in der richtigen Reihenfolge, keine Sprünge nur wegen der optischen Größe. Das hilft Screenreadern beim Navigieren und macht die Seite nebenbei für Google leichter lesbar.",
    },
    {
      titel: "Skalierbare Schrift",
      text: "Zoom bis 200 Prozent ohne Layoutbruch, keine festen Pixel-Höhen für Textblöcke. Wer die Schrift auf dem Handy vergrößert, soll noch immer das ganze Exposé lesen können, nicht nur die Hälfte eines abgeschnittenen Absatzes.",
    },
    {
      titel: "Verständliche Sprache",
      text: "Kurze Sätze, Fachbegriffe erklärt, vor allem auf Finanzierungs- und Ablaufseiten. Das hilft älteren Verkäufern genauso wie jedem, der eine Immobilienseite nebenbei auf dem Handy liest.",
    },
    {
      titel: "Untertitel für Videos",
      text: "Objekt-Rundgänge und Imagefilme bekommen Untertitel, nicht nur Ton. Wer ein Video ohne Kopfhörer im Wartezimmer oder Zug ansieht, versteht sonst nur die Hälfte des Inhalts.",
    },
    {
      titel: "Nie nur Farbe als Signal",
      text: "Ein Pflichtfeld oder ein Status wird zusätzlich mit Text oder Symbol markiert, nicht nur mit einer Farbe. Menschen mit Farbsehschwäche sind ein Teil jeder Zielgruppe, auch wenn es im Alltag selten auffällt.",
    },
    {
      titel: "Barrierefreiheitserklärung veröffentlichen",
      text: "Eine kurze Seite mit Stand, bekannten Lücken und einer Kontaktmöglichkeit für Rückmeldungen. Das zeigt, dass Barrierefreiheit ein laufender Prozess ist, kein einmaliges Häkchen.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const faq = listeRegistrieren(
  "barrierefreie-maklerwebsite",
  "faq",
  "FAQ",
  [
    {
      q: "Gilt das BFSG auch für kleine Maklerbüros?",
      a: "Für reine Dienstleistungen gibt es eine Ausnahme für Kleinstunternehmen mit weniger als 10 Mitarbeitenden und begrenztem Jahresumsatz. Ob diese Ausnahme im eigenen Fall greift und ob die Website überhaupt in den Anwendungsbereich fällt, ist eine Einzelfallfrage. Das ist keine Rechtsberatung.",
    },
    {
      q: "Ab wann muss eine Website barrierefrei sein?",
      a: "Das BFSG gilt seit dem 28. Juni 2025 für neue, in den Anwendungsbereich fallende digitale Dienstleistungen, für bestehende Angebote existieren teils längere Übergangsfristen. Die genaue Frist für Ihre konkrete Website klärt im Zweifel ein Anwalt für IT- oder Wettbewerbsrecht.",
    },
    {
      q: "Reicht ein Overlay-Plugin für automatische Barrierefreiheit?",
      a: "Nein, in der Praxis meist nicht. Solche Plugins legen eine Schicht über bestehenden Code, ohne die zugrunde liegende Struktur zu verändern. Screenreader stolpern trotzdem über fehlende Labels oder eine falsche Überschriften-Reihenfolge. Echte Fixes passieren im Code, nicht per Zusatz-Skript.",
    },
    {
      q: "Ist diese Seite eine Rechtsberatung zum BFSG?",
      a: "Nein. Diese Seite ordnet ein, was Barrierefreiheit für eine Maklerwebsite praktisch bedeutet, und zeigt wirksame Maßnahmen. Eine rechtssichere Bewertung, ob und in welchem Umfang Ihre Website unter das Gesetz fällt, ersetzt das nicht. Das gehört in die Hände einer Fachperson.",
    },
  ],
  { q: "Frage", a: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Barrierefreie Maklerwebsite: Pflicht, Chance und Praxis (BFSG) | beuwy",
  [`${S}meta.beschreibung`]:
    "Barrierefreie Maklerwebsite nach BFSG: wer wirklich betroffen ist, die 10 wirksamsten Maßnahmen für den Alltag, und warum sie die Conversion erhöhen.",
  [`${S}meta.og_titel`]: "Barrierefreie Maklerwebsite: Pflicht, Chance und Praxis (BFSG) | beuwy",
  [`${S}meta.og_beschreibung`]:
    "BFSG ohne Panik eingeordnet, die 10 wirksamsten Maßnahmen für eine barrierefreie Maklerwebsite, und warum sie mehr Anfragen bringt, nicht nur Compliance erfüllt.",

  [`${S}kopf.eyebrow`]: "BFSG für Makler",
  [`${S}kopf.titel`]: "Barrierefreie Maklerwebsite: Pflicht, Chance und *Praxis*.",
  [`${S}kopf.sub_vor`]:
    "Das hängt vom Einzelfall ab: Das Barrierefreiheitsstärkungsgesetz verpflichtet seit Juni 2025 bestimmte digitale Dienstleistungen gegenüber Verbrauchern, etwa E-Commerce, Bankdienstleistungen oder Reiseinformationsdienste. Immobilienvermittlung zählt nicht zu diesen benannten Kategorien, eine reine Exposé- und Kontaktseite fällt in den meisten Fällen nicht direkt unter das Gesetz.",
  [`${S}kopf.sub_mark`]:
    "Sobald Ihre Website einen echten Vertragsabschluss im elektronischen Geschäftsverkehr ermöglicht, kann sich das ändern",
  [`${S}kopf.sub_nach`]: ". Eine rechtssichere Einzelfallprüfung ersetzt dieser Absatz nicht.",
  [`${S}kopf.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}kopf.antwort`]: "Antwort innerhalb von 24 Stunden",

  [`${S}nutzen.eyebrow`]: "Mehr als Compliance",
  [`${S}nutzen.titel`]: "Barrierefreiheit ist ein *Conversion*-Hebel, kein Bußgeld-Thema.",
  [`${S}nutzen.sub`]:
    "Viele Verkäufer sind über 60, geerbte Objekte bringen oft noch ältere Angehörige ins Spiel. Höherer Kontrast hilft beim Lesen im hellen Garten, klare Formularlabels senken Abbrüche, und eine saubere Überschriften-Struktur macht dieselbe Seite auch für Google leichter lesbar.",

  [`${S}massnahmen.eyebrow`]: "Die Maßnahmen",
  [`${S}massnahmen.titel`]: "Zehn Punkte, die im Alltag *tatsächlich* etwas ändern.",
  ...massnahmen.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Barrierefrei ist kein Compliance-Häkchen.",
  [`${S}unterschied.text`]:
    "Ein Overlay-Plugin erzeugt den Anschein von Barrierefreiheit, ohne die Struktur darunter zu ändern. Ein Portal, das von Anfang an mit klarem Kontrast, echten Alt-Texten und sauberer Überschriften-Hierarchie gebaut wird, ist für Screenreader lesbar und für Google gleich mit dazu, ohne ein zweites Projekt und ohne nachträgliches Flicken.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.titel`]:
    "17 Jahre Markenarbeit, davor für Bosch, Continental und Michelin. Ein Portal entsteht bei beuwy in vier bis sechs Wochen. Diese zehn Maßnahmen sind darin von Anfang an enthalten, statt später in ein bestehendes System gepresst zu werden.",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor der *Einordnung* wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir ein Portal, das *niemanden* ausschließt.",
  [`${S}finale.satz1`]: "Wie ein technischer Neuaufbau ohne Rankingverlust abläuft, zeigt",
  [`${S}finale.link1`]: "Website-Relaunch ohne Sichtbarkeitsverlust",
  [`${S}finale.satz2`]: ", welche Fehler eine Maklerwebsite sonst noch kosten",
  [`${S}finale.link2`]: "Die 11 häufigsten Makler-Website-Fehler",
  [`${S}finale.satz3`]: ". Den Überblick über alle Bausteine bietet der",
  [`${S}finale.link3`]: "Immobilienmarketing-Hub",
  [`${S}finale.satz4`]: ".",
  [`${S}finale.antwort`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · Open-Graph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",

  [`${S}kopf.eyebrow`]: "Kopf · Eyebrow",
  [`${S}kopf.titel`]: "Kopf · Titel (ein *Wort* = Highlighter)",
  [`${S}kopf.sub_vor`]: "Kopf · Subline · Teil vor dem Highlight",
  [`${S}kopf.sub_mark`]: "Kopf · Subline · Hervorgehobener Teil",
  [`${S}kopf.sub_nach`]: "Kopf · Subline · Teil nach dem Highlight",
  [`${S}kopf.cta_label`]: "Kopf & Finale · CTA-Beschriftung",
  [`${S}kopf.antwort`]: "Kopf · Antwortzeit-Hinweis",

  [`${S}nutzen.eyebrow`]: "Nutzen · Eyebrow",
  [`${S}nutzen.titel`]: "Nutzen · Titel (ein *Wort* = Highlighter)",
  [`${S}nutzen.sub`]: "Nutzen · Subline",

  [`${S}massnahmen.eyebrow`]: "Maßnahmen · Eyebrow",
  [`${S}massnahmen.titel`]: "Maßnahmen · Titel (ein *Wort* = Highlighter)",
  ...massnahmen.labels,

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.titel`]: "Beweis · Kernsatz",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.satz1`]: "Finale · Satz · Teil vor Link 1 (Relaunch)",
  [`${S}finale.link1`]: "Finale · Satz · Linktext 1 (Website-Relaunch)",
  [`${S}finale.satz2`]: "Finale · Satz · Teil zwischen Link 1 und Link 2 (Fehler)",
  [`${S}finale.link2`]: "Finale · Satz · Linktext 2 (Makler-Website-Fehler)",
  [`${S}finale.satz3`]: "Finale · Satz · Teil zwischen Link 2 und Link 3 (Hub)",
  [`${S}finale.link3`]: "Finale · Satz · Linktext 3 (Immobilienmarketing-Hub)",
  [`${S}finale.satz4`]: "Finale · Satz · Teil nach Link 3",
  [`${S}finale.antwort`]: "Finale · Antwortzeit-Hinweis",
};
