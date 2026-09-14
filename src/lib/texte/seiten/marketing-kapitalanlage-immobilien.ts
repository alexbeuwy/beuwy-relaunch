import { listeRegistrieren } from "../lesen";

/** Studio-Texte /marketing-kapitalanlage-immobilien — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "marketing-kapitalanlage-immobilien", titel: "Marketing für Kapitalanlage-Immobilien", route: "/marketing-kapitalanlage-immobilien" };
const S = "s.marketing-kapitalanlage-immobilien.";

const pains = listeRegistrieren("marketing-kapitalanlage-immobilien", "pains", "Pain", [
  {
    zitat: "Eine gekaufte Anleger-Liste kostet beim dritten Vertrieb genauso viel wie beim ersten.",
    antwort:
      "Sie kaufen keinen Kontakt, Sie kaufen einen Wettlauf. Wer zuerst anruft, bekommt das Gespräch, nicht wer das bessere Angebot hat, und die Adresse war kalt, bevor Ihr Team überhaupt gewählt hat.",
  },
  {
    zitat: "Ein Monat bringt zehn Gespräche, der nächste keins, und Ihr Vertrieb dreht Däumchen.",
    antwort:
      "Ohne einen Kanal, der jede Woche neue Interessenten liefert, hängt der Umsatz an der Zufälligkeit des Nachschubs, nicht an der Leistung Ihres Teams.",
  },
  {
    zitat: "Ein Anleger vertraut sein Geld nicht dem Anbieter an, der aussieht wie jeder andere.",
    antwort:
      "Bei Kapitalanlage entscheidet Vertrauen vor Rendite. Ein austauschbarer Auftritt kostet Ihnen den Abschluss, lange bevor der Interessent die Zahlen überhaupt gesehen hat.",
  },
], { zitat: "Zitat", antwort: "Antwort" });

const schritte = listeRegistrieren("marketing-kapitalanlage-immobilien", "schritte", "Schritt", [
  {
    titel: "Qualifizierung vor dem Termin",
    text: "Eigenkapital, Einkommensrahmen und Anlageziel liegen vor, bevor ein Berater den Kalender öffnet. Interessenten ohne die nötigen Mittel verstopfen keinen einzigen Termin mehr.",
  },
  {
    titel: "Von der Anzeige zum vorqualifizierten Gespräch",
    text: "Eine Anzeige führt zum Rechner oder zur Registrierung, die Registrierung zu einem qualifizierten Profil. Ihr Berater sieht das Profil, bevor er zum Hörer greift.",
  },
  {
    titel: "Follow-up für die Anleger von morgen",
    text: "Wer heute noch nicht bereit ist, bleibt nicht liegen. Eine Automation hält den Kontakt, bis aus einem später ein jetzt wird.",
  },
  {
    titel: "Ein Wochenbericht statt Bauchgefühl",
    text: "Registrierungen, Qualifizierungsquote, Termine je Berater: jede Woche schwarz auf weiß, damit Entscheidungen auf Zahlen stehen, nicht auf dem Gefühl des lautesten Vertrieblers.",
  },
], { titel: "Titel", text: "Text" });

const actaFakten = listeRegistrieren("marketing-kapitalanlage-immobilien", "acta_fakten", "acta-Kennzahl", [
  { wert: "15", label: "Vertriebsleute an der Spitze" },
  { wert: "380", label: "Wohneinheiten in drei Jahren verkauft" },
  { wert: "≈ 40 Mio. €", label: "Volumen über Instagram-Anzeigen" },
], { wert: "Wert", label: "Beschriftung" });

const faq = listeRegistrieren("marketing-kapitalanlage-immobilien", "faq", "FAQ", [
  {
    frage: "Funktioniert das auch für kleinere Vertriebe?",
    antwort:
      "Ja. Die Qualifizierungslogik und die Anzeigenstruktur skalieren nach unten genauso wie nach oben. Ein Team mit fünf Beratern qualifiziert nach denselben Kriterien wie eines mit fünfzig.",
  },
  {
    frage: "Woher kommen die Anleger?",
    antwort:
      "Über Anzeigen, die wir für Sie ausspielen, meist auf Instagram und Meta, genauso wie wir es bei unserem eigenen Vertrieb betrieben haben. Kein Listenkauf, keine dritte Adresse.",
  },
  {
    frage: "Wie schnell steht das System?",
    antwort: "Vier bis sechs Wochen von der Aufnahme bis zum Livegang. Den Termin bekommen Sie schriftlich, bevor das Projekt beginnt.",
  },
  {
    frage: "Übernehmt ihr auch die Anzeigen?",
    antwort:
      "Ja. Wir planen, schalten und optimieren die Kampagnen selbst, mit demselben Ansatz, den wir bei unserem eigenen Vertrieb genutzt haben, nicht als Zusatzleistung eines Drittanbieters.",
  },
  {
    frage: "Was unterscheidet euch von Lead-Verkäufern?",
    antwort:
      "Ein Lead-Verkäufer verkauft eine Adresse an jeden, der zahlt. Wir bauen Ihnen ein eigenes Portal, das Ihnen allein gehört. Wir haben ein Anleger-Geschäft selbst betrieben, nicht nur beraten.",
  },
], { frage: "Frage", antwort: "Antwort" });

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Marketing für Kapitalanlage-Immobilien: Anleger statt kalter Leads | beuwy",
  [`${S}meta.beschreibung`]:
    "beuwy baut Vertrieben von Kapitalanlage-Immobilien ein Portal, das Anleger vor dem Termin nach Eigenkapital, Einkommen und Anlageziel qualifiziert, damit der Kalender voller Gespräche steht, die zum Abschluss führen.",
  [`${S}meta.og_titel`]: "Marketing für Kapitalanlage-Immobilien: Anleger statt kalter Leads | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Ein Portal, das Anleger vor dem Termin nach Eigenkapital und Anlageziel qualifiziert, damit der Kalender voller Gespräche steht, die zum Abschluss führen.",

  [`${S}hero.messbar_label`]: "Beweis, keine Behauptung",
  [`${S}hero.eyebrow`]: "Marketing für Kapitalanlage-Vertriebe",
  [`${S}hero.titel`]: "Marketing für Kapitalanlage-Vertriebe, das *vorqualifizierte Anleger* bringt, keine kalten Listen.",
  [`${S}hero.sub_vor`]:
    "Marketing für Kapitalanlage-Immobilien heißt: Anzeigen führen zu einem eigenen Portal, das Anleger nach Eigenkapital, Einkommen und Anlageziel qualifiziert, bevor ein Berater den Termin sieht,",
  [`${S}hero.sub_highlight`]: "statt eine gekaufte Adresse an drei Vertriebe gleichzeitig zu verteilen",
  [`${S}hero.sub_nach`]: ".",
  [`${S}hero.cta`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",

  [`${S}problem.eyebrow`]: "Der teuerste Anleger ist der gekaufte",
  [`${S}problem.titel`]: "Eine Liste kennt Ihren Anleger *nicht*, bevor sie bei drei anderen war.",
  ...pains.defaults,

  [`${S}system.eyebrow`]: "Der Mechanismus",
  [`${S}system.titel`]: "Vier Stufen. Ein Portal, das *qualifiziert* statt nur sammelt.",
  [`${S}system.sub`]:
    "beuwy arbeitet als Unternehmensberatung für Ihren Vertrieb, nicht als Agentur, die einzelne Anzeigen abliefert. Jedes Portal ist Teil Ihrer Anleger-Akquise, mit einem festen Ansprechpartner.",
  ...schritte.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Eine gekaufte Liste verkauft niemand. Ein qualifiziertes Portal schon.",
  [`${S}unterschied.text`]:
    "Lead-Verkäufer liefern dieselbe Adresse an so viele Vertriebe, wie sie finden. Wir bauen Ihnen ein Portal, das Anleger selbst gewinnt, vor dem ersten Anruf qualifiziert und dem richtigen Berater zuordnet.",

  [`${S}beweis.eyebrow`]: "Beweis, kein Beispiel",
  [`${S}beweis.titel`]: "Wir haben *diesen* Vertrieb selbst aufgebaut, mit eigenem Geld.",
  [`${S}beweis.sub`]:
    "Bevor wir für andere Kapitalanlage-Vertriebe bauten, haben wir selbst verkauft. Kein Fallbeispiel, kein Pitch, ein eigener Vertrieb mit eigenem Risiko.",
  [`${S}beweis.acta_text`]:
    "Bei acta stand unsere eigene Vertriebsspitze bei 15 Leuten. Über drei Jahre haben wir rund 380 Wohneinheiten verkauft, ausschließlich über Instagram-Anzeigen gewonnen, ein Volumen von rund 40 Mio. €. Wir kennen Anleger-Akquise aus eigenem Geld, nicht aus Fallstudien.",
  ...actaFakten.defaults,
  [`${S}beweis.zweite_label`]: "Die zweite Größenordnung",
  [`${S}beweis.zweite_text`]:
    "Bei Vision Group ging es um dieselbe Sprache, eine Liga größer: 1.450 Wohneinheiten im Höchststand, ein Joint Venture mit KKR über 160 Mio. €.",
  [`${S}beweis.cases_link`]: "Weitere Fallstudien ansehen →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Gespräch wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihr *Anleger-System*.",
  [`${S}finale.text_vor`]:
    "Ein Portal für Kapitalanlage-Vertriebe ist ein Baustein unter mehreren. Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.text_link1`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_mid`]: ", Referenzen in den",
  [`${S}finale.text_link2`]: "Fallstudien",
  [`${S}finale.text_nach`]: ".",
  [`${S}finale.cta`]: "Zusammenarbeit anfragen",
  [`${S}finale.hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · Open-Graph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",

  [`${S}hero.messbar_label`]: "Hero · Floating Card · Label",
  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel (*Wort* = Highlighter)",
  [`${S}hero.sub_vor`]: "Hero · Subline · Teil vor dem Highlight",
  [`${S}hero.sub_highlight`]: "Hero · Subline · Highlight-Wortgruppe",
  [`${S}hero.sub_nach`]: "Hero · Subline · Satzende",
  [`${S}hero.cta`]: "Hero · CTA-Text",
  [`${S}hero.cta_hinweis`]: "Hero · Mikrozeile unter dem CTA",

  [`${S}problem.eyebrow`]: "Problem · Eyebrow",
  [`${S}problem.titel`]: "Problem · Titel (*Wort* = Highlighter)",

  [`${S}system.eyebrow`]: "Mechanismus · Eyebrow",
  [`${S}system.titel`]: "Mechanismus · Titel (*Wort* = Highlighter)",
  [`${S}system.sub`]: "Mechanismus · Subline",

  [`${S}unterschied.label`]: "Unterschied · Label",
  [`${S}unterschied.titel`]: "Unterschied · Titel",
  [`${S}unterschied.text`]: "Unterschied · Text",

  [`${S}beweis.eyebrow`]: "Beweis · Eyebrow",
  [`${S}beweis.titel`]: "Beweis · Titel (*Wort* = Highlighter)",
  [`${S}beweis.sub`]: "Beweis · Subline",
  [`${S}beweis.acta_text`]: "Beweis · acta-Absatz",
  [`${S}beweis.zweite_label`]: "Beweis · Zwischenüberschrift (zweite Größenordnung)",
  [`${S}beweis.zweite_text`]: "Beweis · Vision-Group-Absatz",
  [`${S}beweis.cases_link`]: "Beweis · Linktext zu weiteren Fallstudien",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (*Wort* = Highlighter)",

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (*Wort* = Highlighter)",
  [`${S}finale.text_vor`]: "Finale · Absatz · Teil vor Link 1",
  [`${S}finale.text_link1`]: "Finale · Absatz · Linktext (Hub)",
  [`${S}finale.text_mid`]: "Finale · Absatz · Teil zwischen den Links",
  [`${S}finale.text_link2`]: "Finale · Absatz · Linktext (Fallstudien)",
  [`${S}finale.text_nach`]: "Finale · Absatz · Satzende",
  [`${S}finale.cta`]: "Finale · CTA-Text",
  [`${S}finale.hinweis`]: "Finale · Mikrozeile unter dem CTA",

  ...pains.labels,
  ...schritte.labels,
  ...actaFakten.labels,
  ...faq.labels,
};
