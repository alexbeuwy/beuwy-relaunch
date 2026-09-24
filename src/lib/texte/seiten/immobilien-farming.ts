import { listeRegistrieren } from "../lesen";

/** Studio-Texte /immobilien-farming — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "immobilien-farming",
  titel: "Immobilien-Farming",
  route: "/immobilien-farming",
};
const S = "s.immobilien-farming.";

const klassisch = listeRegistrieren(
  "immobilien-farming",
  "klassisch",
  "Zeile",
  [
    { text: "Flyer und Postwurf alle sechs bis acht Wochen im festgelegten Gebiet" },
    { text: "Streuverlust: der Flyer landet bei jedem Briefkasten, nicht nur bei Verkaufswilligen" },
    { text: "Ein Kontaktpunkt pro Wurf, dann Stille bis zur nächsten Runde" },
    { text: "Kaum messbar, welcher Flyer welchen Anruf ausgelöst hat" },
  ],
  { text: "Text" },
);

const digital = listeRegistrieren(
  "immobilien-farming",
  "digital",
  "Zeile",
  [
    { text: "Google-Unternehmensprofil mit stadtteilgenauer Kategorie und laufenden Beiträgen" },
    { text: "Eine Landingpage pro Stadtteil statt einer Seite für die ganze Stadt" },
    { text: "Wöchentliche Story mit echten Objekten aus der Gegend, keine Stock-Bilder" },
    { text: "Datenmail an registrierte Interessenten, sobald ein Objekt im Gebiet online geht" },
    { text: "Jeder Touchpoint messbar: Klicks, Rechner-Starts, Registrierungen pro Stadtteil" },
  ],
  { text: "Text" },
);

const checkliste = listeRegistrieren(
  "immobilien-farming",
  "checkliste",
  "Punkt",
  [
    { text: "Google-Unternehmensprofil mit Postleitzahl-genauer Kategorie" },
    { text: "Eine eigene Landingpage je Stadtteil, nicht eine für die ganze Stadt" },
    { text: "Wöchentliche Story mit Objekten aus genau diesem Gebiet" },
    { text: "Datenmail bei jedem neuen Objekt im Farming-Gebiet" },
    { text: "Bewertungen, die den Stadtteil im Klartext nennen" },
    { text: "Bewertungsrechner, der die Adresse aus dem Gebiet als Erstanker aufnimmt" },
  ],
  { text: "Text" },
);

const faq = listeRegistrieren(
  "immobilien-farming",
  "faq",
  "FAQ",
  [
    {
      frage: "Reicht Social Media allein für digitales Farming?",
      antwort:
        "Nein. Eine Story ohne Google-Profil, ohne Landingpage und ohne Rechner ist nur ein einzelner Kontaktpunkt, wie ein Flyer. Farming funktioniert, wenn mehrere Kanäle im selben Gebiet gleichzeitig laufen und sich gegenseitig bestätigen.",
    },
    {
      frage: "Wie groß sollte ein Farming-Gebiet sein?",
      antwort:
        "So groß, wie Sie es glaubwürdig mit lokalem Wissen füllen können, meist ein Stadtteil oder eine Kleinstadt, nicht eine ganze Großstadt auf einmal. Kleinere Gebiete mit hoher Wiederholung schlagen große Gebiete mit dünner Präsenz.",
    },
    {
      frage: "Ist der klassische Postwurf jetzt überflüssig?",
      antwort:
        "Nicht zwingend. Viele Häuser fahren beides parallel: der Flyer bleibt ein physischer Anker, die digitale Ebene liefert die Wiederholung und die Messbarkeit, die Papier allein nicht schafft.",
    },
    {
      frage: "Wie schnell zeigt digitales Farming Wirkung?",
      antwort:
        "Profil, Landingpage und die ersten Story-Formate stehen in vier bis sechs Wochen. Bis ein Stadtteil Sie als die naheliegende Adresse kennt, vergehen meist mehrere Monate konsequenter Wiederholung, keine einzelne Aktion.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Immobilien-Farming: Der Stadtteil, der an Sie denkt | beuwy",
  [`${S}meta.beschreibung`]:
    "Immobilien-Farming digital heißt: regionale Omnipräsenz vom Google-Profil bis zur Story statt nur Postwurf. beuwy baut die Dominanz in Ihrem Stadtteil auf.",
  [`${S}meta.og_beschreibung`]:
    "Farming klassisch lief über den Postwurf, digital heißt es Omnipräsenz vom Google-Profil bis zur Story. beuwy baut die Dominanz, die Eigentümer im Stadtteil an Sie denken lässt.",

  [`${S}hero.eyebrow`]: "Akquise",
  [`${S}hero.titel`]: "Der Stadtteil, der an *Sie* denkt.",
  [`${S}hero.text_vor`]:
    "Farming heißt, in einem festgelegten Gebiet so konsequent präsent zu sein, dass Eigentümer dort",
  [`${S}hero.text_mitte`]: "automatisch an Sie denken",
  [`${S}hero.text_nach`]:
    ", sobald sie verkaufen. Klassisch lief das über den Postwurf im Briefkasten. Digital heißt Farming: dieselbe Konsequenz, verteilt über Google-Profil, lokale Landingpage, Story-Präsenz und Datenmail, jedes davon ein weiterer, messbarer Kontaktpunkt im selben Stadtteil.",
  [`${S}hero.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",
  [`${S}hero.bild_alt`]: "Makler geht durch einen Stadtteil, den er systematisch betreut",

  [`${S}zweispalter.eyebrow`]: "Zwei Wege, ein Ziel",
  [`${S}zweispalter.titel`]: "Derselbe Stadtteil, *zwei* Systeme.",
  [`${S}klassisch.label`]: "Klassisch: der Postwurf",
  ...klassisch.defaults,
  [`${S}digital.label`]: "Digital: die Omnipräsenz",
  ...digital.defaults,

  [`${S}checkliste.eyebrow`]: "Die Grundausstattung",
  [`${S}checkliste.titel`]: "Sechs Bausteine für ein *digitales* Farming-Gebiet.",
  [`${S}checkliste.sub`]:
    "Kein Baustein wirkt allein. Zusammen ergeben sie die Wiederholung, die ein Postwurf nie erreicht.",
  ...checkliste.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Dominanz ist Wiederholung, keine Anzeige.",
  [`${S}unterschied.text`]:
    "Eine einzelne Kampagne fällt auf. Sechs Wochen später ist sie vergessen. Ein Farming-System bleibt sichtbar, Woche für Woche, bis der Stadtteil Sie nicht mehr wiedererkennt, sondern erwartet.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.titel`]:
    "beuwy hat acta selbst mit aufgebaut: rund 380 vermarktete Wohneinheiten über Instagram-Anzeigen, ein Volumen von rund 40 Mio. €. Nicht eine Kampagne, sondern die Wiederholung, die digitales Farming ausmacht.",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Gespräch wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihre *Omnipräsenz*.",
  [`${S}finale.text_a`]: "Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_b`]: ", die Story- und Kanal-Seite unter",
  [`${S}finale.link_social`]: "Social Media für Immobilienmakler",
  [`${S}finale.text_c`]: "und die Datenmail-Strecke im",
  [`${S}finale.link_email`]: "E-Mail-Marketing für Immobilienmakler",
  [`${S}finale.text_d`]: ".",
  [`${S}finale.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}finale.cta_hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",

  [`${S}hero.eyebrow`]: "Wissens-Kopf · Eyebrow",
  [`${S}hero.titel`]: "Wissens-Kopf · H1 (ein *Wort* = Highlighter)",
  [`${S}hero.text_vor`]: "Wissens-Kopf · Intro-Satz, Teil vor dem Highlight",
  [`${S}hero.text_mitte`]: "Wissens-Kopf · Intro-Satz, hervorgehobener Teil",
  [`${S}hero.text_nach`]: "Wissens-Kopf · Intro-Satz, Teil nach dem Highlight",
  [`${S}hero.cta_label`]: "Wissens-Kopf · Knopf-Text",
  [`${S}hero.cta_hinweis`]: "Wissens-Kopf · Hinweis neben dem Knopf",
  [`${S}hero.bild_alt`]: "Wissens-Kopf · Bild-Alt-Text",

  [`${S}zweispalter.eyebrow`]: "Zweispalter · Eyebrow",
  [`${S}zweispalter.titel`]: "Zweispalter · Titel (ein *Wort* = Highlighter)",
  [`${S}klassisch.label`]: "Zweispalter · Spalten-Label „Klassisch“",
  ...klassisch.labels,
  [`${S}digital.label`]: "Zweispalter · Spalten-Label „Digital“",
  ...digital.labels,

  [`${S}checkliste.eyebrow`]: "Checkliste · Eyebrow",
  [`${S}checkliste.titel`]: "Checkliste · Titel (ein *Wort* = Highlighter)",
  [`${S}checkliste.sub`]: "Checkliste · Subline",
  ...checkliste.labels,

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.titel`]: "Beweis · Titel",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.text_a`]: "Finale · Satz, Teil vor Link 1",
  [`${S}finale.link_hub`]: "Finale · Link-Text (Immobilienmarketing-Hub)",
  [`${S}finale.text_b`]: "Finale · Satz, Teil zwischen Link 1 und 2",
  [`${S}finale.link_social`]: "Finale · Link-Text (Social Media für Immobilienmakler)",
  [`${S}finale.text_c`]: "Finale · Satz, Teil zwischen Link 2 und 3",
  [`${S}finale.link_email`]: "Finale · Link-Text (E-Mail-Marketing für Immobilienmakler)",
  [`${S}finale.text_d`]: "Finale · Satz-Ende",
  [`${S}finale.cta_label`]: "Finale · Knopf-Text",
  [`${S}finale.cta_hinweis`]: "Finale · Hinweis unter dem Knopf",
};
