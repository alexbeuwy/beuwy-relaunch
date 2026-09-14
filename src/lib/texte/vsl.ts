/**
 * Studio-Texte: /vsl — die schlanke Frontseite (ein Claim, ein Video,
 * ein Knopf, drei kurze Blöcke, echte Kundenlogos). Copy-Brief seit
 * 14.09 („1000 Buyers“): EIN Schmerzpunkt (der Eigentümer sieht Ihren
 * Unterschied nicht), eine gegen den Strich gebürstete Wahrheit (nicht
 * der bessere Makler bekommt den Auftrag), glaubwürdige Zahlen (ein
 * Alleinauftrag mehr im Monat, echte Case-Zahlen), „wir sind darüber
 * gestolpert" statt „wir sind schlauer“, nie über-erklären.
 *
 * REGEL (Alex, 27.08): Jede nutzerlesbare Textfläche registriert ihre
 * Texte hier — defaults + labels — und liest sie über getContent().
 * Präfix mk.vsl.front_* → Studio-Bereich „Frontseite /vsl“.
 */

export const VSL_FRONT_DEFAULTS: Record<string, string> = {
  "mk.vsl.front_eyebrow": "Für Makler, die besser sind, als ihr Auftritt zeigt",
  "mk.vsl.front_titel": "Nicht der bessere Makler bekommt den Auftrag. Der, der *teurer* aussieht.",
  "mk.vsl.front_sub":
    "Marke, Website, Exposés, Nachfass — fertig gebaut in 4–6 Wochen. Sie liefern zwei Termine und Ihre Fotos. Ein Alleinauftrag mehr im Monat, und es hat sich gerechnet.",
  "mk.vsl.front_cta": "Zusammenarbeit anfragen",
  "mk.vsl.front_cta_hinweis": "Antwort in 24 Stunden · kein Pitch, keine Massenmail",

  "mk.vsl.front_grund_eyebrow": "Wenn man es auf den Kern bringt",
  "mk.vsl.front_grund_titel": "Eigentlich ist es nur dieser *eine* Grund.",
  "mk.vsl.front_grund_text":
    "Der Eigentümer vergleicht abends drei Makler am Handy. Er kann nicht sehen, wer besser verkauft. Er sieht nur, wer teurer wirkt — und den ruft er an.",
  "mk.vsl.front_grund_text2":
    "Mehr Anzeigen, mehr gekaufte Kontakte, mehr Nachfassen: Alles davon verstärkt nur, was er dort sieht.",

  "mk.vsl.front_story_eyebrow": "Was Ihnen niemand erzählt",
  "mk.vsl.front_story_titel": "Sie bezahlen dafür, dass Ihr Wettbewerber neben Ihnen steht.",
  "mk.vsl.front_story_text":
    "Gleiche Liste, gleiches Layout, gleiche Kontakte — auf den Portalen sind Sie einer von drei. Der Unterschied entsteht erst, wenn der Eigentümer Ihren Namen googelt. Dort entscheidet er, ob Sie der Makler sind oder eine der drei Optionen.",

  "mk.vsl.front_stolper_eyebrow": "Nicht schlauer. Nur früher dran.",
  "mk.vsl.front_stolper_titel": "Wir haben das nicht erfunden. Wir sind darüber *gestolpert*.",
  "mk.vsl.front_stolper_text":
    "17 Jahre haben wir Marken gebaut, für Bosch, Continental, Michelin. Dann bekam ein Maklerbüro denselben Auftritt — und hatte sechs Wochen später neun Abschlüsse. Seitdem bauen wir nur noch das.",
  "mk.vsl.front_beleg_label": "RIEGEL Immobilien — Zahlen aus dem Case",
  "mk.vsl.front_beleg":
    "9~Abschlüsse in sechs Wochen|342.000 €~Abschlussvolumen in sechs Wochen|Platz 21~von über 25.000 Maklern, ImmoScout24-Award",

  "mk.vsl.front_cta2_titel": "Wenn Sie besser verkaufen, als man Ihnen ansieht: *Reden* wir.",

  "mk.vsl.front_logos_label": "Marken, die beuwy vertrauen",
  "mk.vsl.front_logos":
    "Vision Group|Königswege|RIEGEL Immobilien|hzo immobilien|invyse|getsafe|PURELEI|Netlution|Instaffo|PreFin|accredia|Finsolute|ImmoAbschreibung|innovakonzept|Rosental|Kopp Consulting|JPF Ingenieurbüro|TREC Careers|BeautyFarm|Snow Aligner|Gooodkid Records|Infocient",
  "mk.vsl.front_fuss": "Marke, Website & Automatisierung für Immobilienmakler",
  "mk.vsl.front_mehr": "Zur ausführlichen Seite",
  "mk.vsl.front_meta_titel": "Marke, Website & Exposés für Immobilienmakler | beuwy",
  "mk.vsl.front_meta_beschreibung":
    "Nicht der bessere Makler bekommt den Auftrag, sondern der, der teurer aussieht. beuwy baut Ihnen in 4–6 Wochen genau diesen Auftritt: Marke, Website, Exposés, Nachfass.",
  "mk.vsl.platzhalter": "90 Sekunden — folgt in Kürze",
};

export const VSL_FRONT_LABELS: Record<string, string> = {
  "mk.vsl.front_eyebrow": "Frontseite /vsl · Zeile über der Headline",
  "mk.vsl.front_titel": "Frontseite /vsl · Headline (ein *Wort* = Highlighter)",
  "mk.vsl.front_sub": "Frontseite /vsl · Satz unter der Headline",
  "mk.vsl.front_cta": "Frontseite /vsl · Knopf (führt in den Anfrage-Funnel)",
  "mk.vsl.front_cta_hinweis": "Frontseite /vsl · Hinweis unter dem Knopf",
  "mk.vsl.front_grund_eyebrow": "Frontseite /vsl · Block „Der eine Grund“ · Eyebrow",
  "mk.vsl.front_grund_titel": "Frontseite /vsl · Block „Der eine Grund“ · Titel",
  "mk.vsl.front_grund_text": "Frontseite /vsl · Block „Der eine Grund“ · Absatz 1",
  "mk.vsl.front_grund_text2": "Frontseite /vsl · Block „Der eine Grund“ · Absatz 2",
  "mk.vsl.front_story_eyebrow": "Frontseite /vsl · Gelbe Karte · Eyebrow",
  "mk.vsl.front_story_titel": "Frontseite /vsl · Gelbe Karte · Titel",
  "mk.vsl.front_story_text": "Frontseite /vsl · Gelbe Karte · Text",
  "mk.vsl.front_stolper_eyebrow": "Frontseite /vsl · Block „Gestolpert“ · Eyebrow",
  "mk.vsl.front_stolper_titel": "Frontseite /vsl · Block „Gestolpert“ · Titel",
  "mk.vsl.front_stolper_text": "Frontseite /vsl · Block „Gestolpert“ · Text",
  "mk.vsl.front_beleg_label": "Frontseite /vsl · Beleg-Kasten · Zeile über den Zahlen",
  "mk.vsl.front_beleg": "Frontseite /vsl · Beleg-Kasten · Zahl~Text, mit | getrennt (nur belegte Case-Zahlen!)",
  "mk.vsl.front_cta2_titel": "Frontseite /vsl · Zweiter Knopf · Überschrift",
  "mk.vsl.front_logos_label": "Frontseite /vsl · Zeile über den Kundenlogos",
  "mk.vsl.front_logos": "Frontseite /vsl · Kundenlogos, mit | getrennt (Freigaben!)",
  "mk.vsl.front_fuss": "Frontseite /vsl · Fußzeile neben dem Logo",
  "mk.vsl.front_mehr": "Frontseite /vsl · Link zur Startseite (Fußzeile)",
  "mk.vsl.front_meta_titel": "Frontseite /vsl · Browser-Titel (SEO)",
  "mk.vsl.front_meta_beschreibung": "Frontseite /vsl · Meta-Beschreibung (SEO, Google-Snippet)",
  "mk.vsl.platzhalter": "Makler · VSL-Video · Pill auf dem Platzhalter, solange keine Video-URL da ist",
};
