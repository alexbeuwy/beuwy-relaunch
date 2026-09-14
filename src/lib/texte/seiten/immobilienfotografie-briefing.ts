import { listeRegistrieren } from "../lesen";

/** Studio-Texte /immobilienfotografie-briefing — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "immobilienfotografie-briefing",
  titel: "Immobilienfotografie-Briefing",
  route: "/immobilienfotografie-briefing",
};
const S = "s.immobilienfotografie-briefing.";

const punkte = listeRegistrieren(
  "immobilienfotografie-briefing",
  "punkte",
  "Briefing-Punkt",
  [
    {
      titel: "Zeitfenster",
      text: "Fassade und Garten entstehen in der Golden Hour, kurz nach Sonnenaufgang oder vor Sonnenuntergang — flaches Licht ohne harte Schatten. Innenräume dagegen brauchen einen bedeckten oder milden Tag, damit kein Fenster ausbrennt und kein Raum halb im Gegenlicht liegt.",
    },
    {
      titel: "Achsen",
      text: "Kamerahöhe fest zwischen 1,20 und 1,40 Meter, immer auf Stativ. Senkrechte Linien bleiben senkrecht, keine Weitwinkel-Verzerrung, die Wände nach innen kippen lässt. Von der Tür schräg in die Raumdiagonale fotografieren zeigt die Tiefe, die ein Raum tatsächlich hat.",
    },
    {
      titel: "Pflichtaufnahmen je Raum",
      text: "Wohnzimmer und Küche mit je zwei bis drei Perspektiven, jedes weitere Zimmer mit einer, dazu Fassade, Garten oder Balkon, Straßenansicht und Eingangsbereich. Eine feste Liste verhindert, dass der Fotograf vor Ort improvisiert, was er zeigt und was nicht.",
    },
    {
      titel: "Detail-Liste",
      text: "Einbauküche mit Marke, Bodenbelag, Aussicht, Stellplatz, besondere Ausstattung wie Fußbodenheizung oder Kamin — genau die Details, nach denen Interessenten im Exposé später suchen, nicht die, die zufällig gut aussehen.",
    },
    {
      titel: "Lieferformat",
      text: "Mindestauflösung für Druck und Portal, Lieferung innerhalb von drei bis fünf Werktagen, sortiert in der Reihenfolge des Exposés: Eingang, Wohnbereich, Nebenräume, Außenbereich. Ein wahllos benannter Ordner kostet am Ende Zeit, die niemand einplant.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const rechte = listeRegistrieren(
  "immobilienfotografie-briefing",
  "rechte",
  "Bildrechte-Punkt",
  [
    { text: "Nutzungsrecht für Portale und die eigene Website steht schriftlich im Auftrag, nicht als mündliche Annahme." },
    { text: "Laufzeit ist geklärt: zeitlich begrenzt auf die Vermarktung oder dauerhaft für spätere Referenzen." },
    { text: "Sind Personen im Bild, liegt zusätzlich eine Einwilligung vor — ohne sie darf das Foto nicht veröffentlicht werden." },
  ],
  { text: "Text" },
);

const faq = listeRegistrieren(
  "immobilienfotografie-briefing",
  "faq",
  "FAQ",
  [
    {
      frage: "Brauche ich einen Profifotografen oder reicht das Smartphone?",
      antwort:
        "Für ein Standardobjekt in mittlerer Preislage reicht ein Smartphone mit Stativ und Weitwinkel-Vorsicht, wenn das Briefing trotzdem steht. Ab dem gehobenen Segment macht ein Profi mit Vollformatkamera und Belichtungsreihen einen Unterschied, den man im Exposé direkt sieht — Lichtführung und Perspektive lassen sich mit dem Handy nur begrenzt kontrollieren.",
    },
    {
      frage: "Wie lange dauert ein Fototermin?",
      antwort:
        "Für eine durchschnittliche Wohnung rechnen Sie 60 bis 90 Minuten vor Ort, bei einem Haus mit Garten eher zwei Stunden. Golden-Hour-Aufnahmen von Fassade oder Garten verlängern den Termin um ein festes Zeitfenster am frühen Morgen oder späten Nachmittag, das wetterabhängig verschoben werden kann.",
    },
    {
      frage: "Wem gehören die Bilder nach dem Shooting?",
      antwort:
        "Ohne ausdrückliche Regelung bleibt das Nutzungsrecht meist beim Fotografen, der es Ihnen nur für den vereinbarten Zweck einräumt. Klären Sie vor dem Termin schriftlich, ob die Bilder auf Portalen, der eigenen Website und in Social-Media-Anzeigen verwendet werden dürfen, sonst drohen spätere Nutzungsstreitigkeiten.",
    },
    {
      frage: "Wann lohnt sich ein Video zusätzlich zum Foto?",
      antwort:
        "Bei Objekten im gehobenen Segment oder mit besonderem Grundriss schafft ein kurzer Rundgang ein Raumgefühl, das Einzelfotos nicht liefern. Welche Video-Typen dafür infrage kommen und mit welchem Aufwand, zeigt die Seite Video für Makler.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Immobilienfotografie: Das Briefing, das Objekte größer macht | beuwy",
  [`${S}meta.beschreibung`]:
    "Immobilienfotografie briefen Sie mit einem Dokument: Golden Hour, feste Achsen, Pflichtaufnahmen je Raum, Bildrechte und Lieferformat in fünf Punkten.",
  [`${S}meta.og_titel`]: "Immobilienfotografie: Das Briefing, das Objekte größer macht | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Das übernehmbare Briefing für Immobilienfotografen: Tageszeit, Kamera-Achsen, Pflichtaufnahmen je Raum, Bildrechte und wann ein Video das Foto ergänzt.",

  [`${S}kopf.eyebrow`]: "Bildwelt fürs Exposé",
  [`${S}kopf.titel`]: "Immobilienfotografie-Briefing: das Dokument, das Objekte *größer* macht.",
  [`${S}kopf.intro_vor`]:
    "Sie briefen einen Immobilienfotografen mit einem festen Dokument, nicht mit einem Anruf am Morgen des Termins: Zeitfenster für Fassade und Garten, feste Kamera-Achsen statt Weitwinkel-Verzerrung, eine Pflichtliste je Raum und eine klare Regel für Bildrechte, bevor die erste Datei verschickt wird.",
  [`${S}kopf.intro_highlight`]:
    "Ohne dieses Dokument entscheidet der Fotograf vor Ort improvisierend, was er zeigt und was nicht",
  [`${S}kopf.intro_nach`]:
    " — und genau das sieht man dem Exposé an. Reicht die Zeit für einen Termin nicht für jeden Raum einzeln, ersetzt ein kurzer Rundgang einen Teil der Einzelfotos, ohne dass die Bildsprache bricht.",
  [`${S}kopf.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}kopf.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",

  [`${S}briefing.eyebrow`]: "Zum Übernehmen",
  [`${S}briefing.titel`]: "Fünf Punkte, die aus einem Zuruf ein *Briefing* machen.",
  [`${S}briefing.sub`]:
    "Jeder Punkt geht unverändert an den Fotografen — als Dokument, nicht als Gedächtnisstütze für das Telefonat davor.",
  ...punkte.defaults,

  [`${S}bildrechte.eyebrow`]: "Bildrechte in drei Sätzen",
  [`${S}bildrechte.titel`]: "Wer die Bilder *nutzen* darf, gehört ins Auftragsdokument.",
  ...rechte.defaults,
  [`${S}bildrechte.hinweis_vor`]:
    "Reicht die Zeit oder das Budget für ein klassisches Fotoshooting je Raum nicht, lohnt sich oft ein kurzer Rundgang statt zusätzlicher Einzelfotos. Welche Video-Typen dafür infrage kommen und mit welchem Aufwand, zeigt",
  [`${S}bildrechte.hinweis_link`]: "Video für Makler",
  [`${S}bildrechte.hinweis_nach`]: ".",

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Ein Foto zeigt einen Raum. Ein Briefing zeigt zwölf gleich.",
  [`${S}unterschied.text`]:
    "Ohne festes Dokument hängt jedes Objekt von der Tagesform des Fotografen ab. Mit Briefing sehen zwölf Objekte aus zwölf unterschiedlichen Terminen aus, als kämen sie aus derselben Bildwelt — genau das erwartet ein Eigentümer, der vorher drei Makler verglichen hat.",

  [`${S}beweis.label`]: "Beweis, kein Stilblatt",
  [`${S}beweis.text`]:
    "17 Jahre Markenarbeit, unter anderem für Bosch, Continental und Michelin: dieselbe Disziplin, mit der Weltmarken ihre Bildsprache kontrollieren, steckt in jedem Briefing-Dokument, das wir für ein Maklerbüro aufsetzen.",
  [`${S}beweis.link`]: "Wie das Exposé aus diesen Bildern ein Entscheidungsdokument macht →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Termin wissen wollen.",
  ...faq.defaults,

  [`${S}fazit.label`]: "Der nächste Schritt",
  [`${S}fazit.titel`]: "Bauen wir Ihre *Bildwelt*.",
  [`${S}fazit.text_1`]: "Einen Überblick über alle Bausteine finden Sie im",
  [`${S}fazit.link1`]: "Immobilienmarketing-Hub",
  [`${S}fazit.text_2`]: ", wie aus den Bildern ein",
  [`${S}fazit.link2`]: "Exposé, das verkauft",
  [`${S}fazit.text_3`]: "wird, und wann ein Rundgang das Foto ergänzt, zeigt",
  [`${S}fazit.link3`]: "Video für Makler",
  [`${S}fazit.text_4`]: ".",
  [`${S}fazit.cta_hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · OpenGraph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · OpenGraph-Beschreibung",

  [`${S}kopf.eyebrow`]: "Wissens-Kopf · Eyebrow",
  [`${S}kopf.titel`]: "Wissens-Kopf · H1 (ein *Wort* = Hervorhebung)",
  [`${S}kopf.intro_vor`]: "Wissens-Kopf · Intro-Absatz · Teil vor dem Highlighter",
  [`${S}kopf.intro_highlight`]: "Wissens-Kopf · Intro-Absatz · Highlighter-Teil",
  [`${S}kopf.intro_nach`]: "Wissens-Kopf · Intro-Absatz · Teil nach dem Highlighter",
  [`${S}kopf.cta_label`]: "Wissens-Kopf · CTA-Button-Text",
  [`${S}kopf.cta_hinweis`]: "Wissens-Kopf · Mikrozeile unter dem CTA",

  [`${S}briefing.eyebrow`]: "Briefing-Liste · Eyebrow",
  [`${S}briefing.titel`]: "Briefing-Liste · Titel (ein *Wort* = Hervorhebung)",
  [`${S}briefing.sub`]: "Briefing-Liste · Subline",
  ...punkte.labels,

  [`${S}bildrechte.eyebrow`]: "Bildrechte · Eyebrow",
  [`${S}bildrechte.titel`]: "Bildrechte · Titel (ein *Wort* = Hervorhebung)",
  ...rechte.labels,
  [`${S}bildrechte.hinweis_vor`]: "Bildrechte · Video-Hinweis · Teil vor dem Link",
  [`${S}bildrechte.hinweis_link`]: "Bildrechte · Video-Hinweis · Link-Text",
  [`${S}bildrechte.hinweis_nach`]: "Bildrechte · Video-Hinweis · Teil nach dem Link",

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis-Anriss · Label",
  [`${S}beweis.text`]: "Beweis-Anriss · Text",
  [`${S}beweis.link`]: "Beweis-Anriss · Link-Text (Exposé)",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Hervorhebung)",
  ...faq.labels,

  [`${S}fazit.label`]: "Finale · Label",
  [`${S}fazit.titel`]: "Finale · H2 (ein *Wort* = Hervorhebung)",
  [`${S}fazit.text_1`]: "Finale · Absatz · Teil 1 (vor Link 1)",
  [`${S}fazit.link1`]: "Finale · Absatz · Link 1 (Immobilienmarketing-Hub)",
  [`${S}fazit.text_2`]: "Finale · Absatz · Teil 2 (zwischen Link 1 und 2)",
  [`${S}fazit.link2`]: "Finale · Absatz · Link 2 (Exposé, das verkauft)",
  [`${S}fazit.text_3`]: "Finale · Absatz · Teil 3 (zwischen Link 2 und 3)",
  [`${S}fazit.link3`]: "Finale · Absatz · Link 3 (Video für Makler)",
  [`${S}fazit.text_4`]: "Finale · Absatz · Teil 4 (nach Link 3)",
  [`${S}fazit.cta_hinweis`]: "Finale · Mikrozeile unter dem CTA",
};
