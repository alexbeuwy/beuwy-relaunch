/**
 * Studio-Texte: /vsl — die schlanke Frontseite (ein Claim, ein CTA,
 * ein Video, echte Kundenlogos). Vorbild: klassische VSL-Landingpage,
 * nichts lenkt ab.
 *
 * REGEL (Alex, 27.08): Jede neue nutzerlesbare Textfläche registriert
 * ihre Texte hier unter src/lib/texte/<bereich>.ts — defaults + labels —
 * und liest sie zur Laufzeit über getContent(). content.ts spreadet
 * alle Bereichsdateien in DEFAULTS/FIELD_LABELS. Präfix mk.vsl.* landet
 * im Studio unter „Startseite · VSL-Video" neben mk.vsl.url.
 */

export const VSL_FRONT_DEFAULTS: Record<string, string> = {
  "mk.vsl.front_eyebrow": "Für Makler, die führen statt folgen",
  "mk.vsl.front_titel": "Schneller wachsen, weil Sie aussehen wie der *Marktführer*.",
  "mk.vsl.front_sub":
    "Marke, Website und Automatisierung aus einer Hand. Done for you, live in 4–6 Wochen.",
  "mk.vsl.front_cta": "Zusammenarbeit anfragen",
  "mk.vsl.front_cta_hinweis": "Antwort in 24 Stunden · kein Pitch, keine Massenmail",
  "mk.vsl.front_logos_label": "Marken, die beuwy vertrauen",
  "mk.vsl.front_logos":
    "Vision Group|Königswege|RIEGEL Immobilien|hzo immobilien|invyse|getsafe|PURELEI|Netlution|Instaffo|PreFin|accredia|Finsolute|ImmoAbschreibung|innovakonzept|Rosental|Kopp Consulting|JPF Ingenieurbüro|TREC Careers|BeautyFarm|Snow Aligner|Gooodkid Records|Infocient",
  "mk.vsl.front_fuss": "Marke, Website & Automatisierung für Immobilienmakler",
  "mk.vsl.front_mehr": "Zur ausführlichen Seite",
};

export const VSL_FRONT_LABELS: Record<string, string> = {
  "mk.vsl.front_eyebrow": "Frontseite /vsl · Zeile über der Headline",
  "mk.vsl.front_titel": "Frontseite /vsl · Headline (ein *Wort* = Highlighter)",
  "mk.vsl.front_sub": "Frontseite /vsl · Satz unter der Headline",
  "mk.vsl.front_cta": "Frontseite /vsl · Knopf (führt in den Anfrage-Funnel)",
  "mk.vsl.front_cta_hinweis": "Frontseite /vsl · Hinweis unter dem Knopf",
  "mk.vsl.front_logos_label": "Frontseite /vsl · Zeile über den Kundenlogos",
  "mk.vsl.front_logos": "Frontseite /vsl · Kundenlogos, mit | getrennt (Freigaben!)",
  "mk.vsl.front_fuss": "Frontseite /vsl · Fußzeile neben dem Logo",
  "mk.vsl.front_mehr": "Frontseite /vsl · Link zur Startseite (Fußzeile)",
};
