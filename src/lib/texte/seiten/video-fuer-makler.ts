import { listeRegistrieren } from "../lesen";

/** Studio-Texte /video-fuer-makler — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "video-fuer-makler", titel: "Video für Makler", route: "/video-fuer-makler" };
const S = "s.video-fuer-makler.";

const vergleich = listeRegistrieren(
  "video-fuer-makler",
  "vergleich",
  "Video-Typ",
  [
    {
      typ: "Objektvideo (Rundgang)",
      aufwand: "mittel, je Objekt neu",
      wirkung: "hoch bei Premium-Objekten, gering bei Standardwohnungen",
      einsatz: "Exposé, Portal-Anzeige",
    },
    {
      typ: "Markenvideo (Imagefilm)",
      aufwand: "hoch, dafür einmalig alle 2–3 Jahre",
      wirkung: "wirkt dauerhaft bei jedem neuen Objekt mit",
      einsatz: "Startseite, erstes Beratungsgespräch",
    },
    {
      typ: "Personenvideo (kurze Vorstellung)",
      aufwand: "gering, Smartphone reicht",
      wirkung: "hoch für Vertrauen vor dem Erstkontakt",
      einsatz: "Social Media, Google-Profil, Website",
    },
  ],
  { typ: "Video-Typ", aufwand: "Aufwand", wirkung: "Wirkung", einsatz: "Einsatzort" },
);

const faq = listeRegistrieren(
  "video-fuer-makler",
  "faq",
  "FAQ",
  [
    {
      frage: "Welches Video sollte ich als Erstes produzieren lassen?",
      antwort:
        "Meist das Personenvideo, weil es am wenigsten kostet und am schnellsten steht — eine kurze, ruhige Vorstellung reicht, gedreht mit dem Smartphone. Objekt- und Markenvideo folgen, sobald ein passendes Objekt oder ein Anlass für den größeren Dreh da ist.",
    },
    {
      frage: "Brauche ich für jedes Objekt ein eigenes Video?",
      antwort:
        "Nein. Bei Standardwohnungen im mittleren Preissegment reichen gute Fotos meist aus, ein Rundgang lohnt sich vor allem bei besonderem Grundriss, hochwertiger Ausstattung oder wenn Interessenten überregional anreisen müssten und sich vorab ein genaueres Bild machen sollen.",
    },
    {
      frage: "Wie lange sollte ein Objektvideo sein?",
      antwort:
        "Zwischen 60 und 120 Sekunden für die Portalversion, geschnitten in der Reihenfolge des Exposés: Eingang, Wohnbereich, Außenbereich. Längere Fassungen funktionieren als Anhang auf der eigenen Website, auf dem Portal bricht die Aufmerksamkeit danach meist ab.",
    },
    {
      frage: "Was ist der Unterschied zwischen einem Objektvideo und einem Imagefilm?",
      antwort:
        "Ein Objektvideo verkauft ein einzelnes Haus und verliert danach seinen Zweck. Ein Imagefilm zeigt, wer Sie sind und wie Sie arbeiten, und bleibt Jahre im Einsatz — auf der eigenen Website, im ersten Gespräch, unabhängig davon, welches Objekt gerade vermarktet wird.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Video für Makler: Vom Rundgang zum Vertrauensaufbau | beuwy",
  [`${S}meta.beschreibung`]:
    "Video für Makler heißt, drei Typen zu kennen: Objektvideo, Markenvideo, Personenvideo, mit Aufwand und Wirkung im Vergleich, plus dem Hero-Video-Prinzip erklärt.",
  [`${S}meta.og_titel`]: "Video für Makler: Vom Rundgang zum Vertrauensaufbau | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Drei Video-Typen für Makler im Vergleich: was ein Rundgang leistet, was ein Markenfilm dauerhaft trägt, und warum ein kurzes Personenvideo vor dem ersten Anruf wirkt.",

  [`${S}kopf.eyebrow`]: "Bewegtbild fürs Maklerbüro",
  [`${S}kopf.titel`]: "Video für Makler: vom Rundgang zum *Vertrauensaufbau*.",
  [`${S}kopf.intro_vor`]:
    "Als Makler brauchen Sie im Kern drei Video-Typen: das Objektvideo für den einzelnen Rundgang, das Markenvideo für den Wiedererkennungswert über alle Objekte hinweg, und das Personenvideo, das Sie zeigt, bevor der Eigentümer Sie am Telefon hat.",
  [`${S}kopf.intro_highlight`]: "Ein Objektvideo verkauft ein Haus, Marken- und Personenvideo verkaufen Sie selbst",
  [`${S}kopf.intro_nach`]:
    " — und nur die beiden Letzteren wirken über den Verkauf eines einzelnen Objekts hinaus weiter.",
  [`${S}kopf.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}kopf.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",

  [`${S}vergleich.eyebrow`]: "Der Vergleich",
  [`${S}vergleich.titel`]: "Drei Video-Typen, drei *unterschiedliche* Aufgaben.",
  [`${S}vergleich.head_typ`]: "Video-Typ",
  [`${S}vergleich.head_aufwand`]: "Aufwand",
  [`${S}vergleich.head_wirkung`]: "Wirkung",
  [`${S}vergleich.head_einsatz`]: "Einsatzort",
  ...vergleich.defaults,

  [`${S}prinzip.eyebrow`]: "Das Hero-Video-Prinzip",
  [`${S}prinzip.titel`]: "Ein Markenvideo, das *jeden* Besuch mitträgt.",
  [`${S}prinzip.sub`]:
    "Unsere eigene Startseite öffnet mit einem lautlosen Loop statt einem statischen Bild — dasselbe Prinzip, das wir für ein Markenvideo empfehlen: kein Ton nötig, keine Ladepause, der Ton der Marke steht in den ersten drei Sekunden fest, bevor ein Wort fällt.",
  [`${S}prinzip.text`]:
    "Übertragen auf ein Maklerbüro heißt das: Das Markenvideo läuft leise im Hintergrund der eigenen Website und im ersten Beratungsgespräch, während jedes einzelne Objektvideo kommt und wieder verschwindet, sobald das Haus verkauft ist. Wer beide Ebenen trennt, muss nicht bei jedem neuen Objekt wieder bei null anfangen.",

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Ein Rundgang zeigt ein Haus. Ihr Gesicht zeigt, wem man vertraut.",
  [`${S}unterschied.text`]:
    "Objektvideos verbrauchen sich mit dem Verkauf. Marken- und Personenvideo bauen etwas auf, das bleibt, wenn das nächste Objekt noch gar nicht im Bestand ist — der Grund, warum wir beide Ebenen getrennt planen, statt sie in einem einzigen Dreh zu vermischen.",

  [`${S}beweis.label`]: "Beweis, kein Showreel",
  [`${S}beweis.text`]:
    "Für die Vision Group haben wir den Imagefilm gebaut, der die Investorenstory trug — am Höchststand 2022 stand das Haus bei 1.450 entwickelten Wohneinheiten und ging ein Joint Venture mit KKR über 160 Mio. € ein.",
  [`${S}beweis.video_text`]:
    "Der Film war kein Nebenprodukt, sondern Teil der Unterlagen, mit denen ein Dreierteam vor internationalen Investoren bestand.",
  [`${S}beweis.link`]: "Fallstudie Vision Group ansehen →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Dreh wissen wollen.",
  ...faq.defaults,

  [`${S}fazit.label`]: "Der nächste Schritt",
  [`${S}fazit.titel`]: "Bauen wir Ihr *Bewegtbild-System*.",
  [`${S}fazit.text_1`]: "Einen Überblick über alle Bausteine finden Sie im",
  [`${S}fazit.link1`]: "Immobilienmarketing-Hub",
  [`${S}fazit.text_2`]: ", wie ein Personenvideo auf",
  [`${S}fazit.link2`]: "Social Media",
  [`${S}fazit.text_3`]: "wirkt und wie Sie einen Dreh überhaupt briefen, zeigt",
  [`${S}fazit.link3`]: "das Fotografie-Briefing",
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

  [`${S}vergleich.eyebrow`]: "Vergleichs-Tabelle · Eyebrow",
  [`${S}vergleich.titel`]: "Vergleichs-Tabelle · Titel (ein *Wort* = Hervorhebung)",
  [`${S}vergleich.head_typ`]: "Vergleichs-Tabelle · Tabellenkopf · Video-Typ",
  [`${S}vergleich.head_aufwand`]: "Vergleichs-Tabelle · Tabellenkopf · Aufwand",
  [`${S}vergleich.head_wirkung`]: "Vergleichs-Tabelle · Tabellenkopf · Wirkung",
  [`${S}vergleich.head_einsatz`]: "Vergleichs-Tabelle · Tabellenkopf · Einsatzort",
  ...vergleich.labels,

  [`${S}prinzip.eyebrow`]: "Hero-Video-Prinzip · Eyebrow",
  [`${S}prinzip.titel`]: "Hero-Video-Prinzip · Titel (ein *Wort* = Hervorhebung)",
  [`${S}prinzip.sub`]: "Hero-Video-Prinzip · Subline",
  [`${S}prinzip.text`]: "Hero-Video-Prinzip · Text",

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis-Anriss · Label",
  [`${S}beweis.text`]: "Beweis-Anriss · Text",
  [`${S}beweis.video_text`]: "Beweis-Anriss · Zusatztext (nur wenn Case-Video vorhanden)",
  [`${S}beweis.link`]: "Beweis-Anriss · Link-Text (Fallstudie)",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Hervorhebung)",
  ...faq.labels,

  [`${S}fazit.label`]: "Finale · Label",
  [`${S}fazit.titel`]: "Finale · H2 (ein *Wort* = Hervorhebung)",
  [`${S}fazit.text_1`]: "Finale · Absatz · Teil 1 (vor Link 1)",
  [`${S}fazit.link1`]: "Finale · Absatz · Link 1 (Immobilienmarketing-Hub)",
  [`${S}fazit.text_2`]: "Finale · Absatz · Teil 2 (zwischen Link 1 und 2)",
  [`${S}fazit.link2`]: "Finale · Absatz · Link 2 (Social Media)",
  [`${S}fazit.text_3`]: "Finale · Absatz · Teil 3 (zwischen Link 2 und 3)",
  [`${S}fazit.link3`]: "Finale · Absatz · Link 3 (Fotografie-Briefing)",
  [`${S}fazit.text_4`]: "Finale · Absatz · Teil 4 (nach Link 3)",
  [`${S}fazit.cta_hinweis`]: "Finale · Mikrozeile unter dem CTA",
};
