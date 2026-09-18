/**
 * Studio-Texte: /vsl — die VSL-Landingpage (18.09, „ultimative VSL":
 * clean, reduziert, Sales-Kette). Reihenfolge = Seite:
 * Hero (Hook, Video, Knopf, Vertrauensleiste) → Der eine Grund →
 * Das System (sechs Bausteine) → Beweis (RIEGEL + Logos) →
 * Vorsprung → Für wen / nicht für wen → Einwände → Nächste Schritte →
 * Exit-Intent. Copy-Brief: docs/redesign/COPY-BRIEF.md.
 *
 * REGEL (Alex, 27.08): Jede nutzerlesbare Textfläche registriert ihre
 * Texte hier — defaults + labels — und liest sie über getContent().
 * Präfix mk.vsl.front_* → Studio-Bereich „Frontseite /vsl". Studio-
 * Overrides (z. B. Alex' Headline) gewinnen immer über diese Defaults.
 */

export const VSL_FRONT_DEFAULTS: Record<string, string> = {
  /* Hero */
  "mk.vsl.front_eyebrow": "Für Makler, die mehr Alleinaufträge wollen. Ohne mehr Werbung.",
  "mk.vsl.front_titel": "Was trennt Sie vom Marktführer Ihrer Stadt? Kein Talent. Sein *System*.",
  "mk.vsl.front_sub":
    "Eigenes Portal, eigene Rechner, eigenes CRM, Reports und Mailings, die von selbst rausgehen. Bewährt bei dutzenden Maklern, in sechs Wochen an Ihr Büro angepasst. Sie liefern Fotos und zwei Termine.",
  "mk.vsl.front_cta": "Zusammenarbeit anfragen",
  "mk.vsl.front_cta_hinweis": "Antwort in 24 Stunden · vier Fragen, eine Minute",
  "mk.vsl.front_vertrauen":
    "17 Jahre~Markenarbeit, u. a. Bosch, Continental, Michelin|Platz 21~von über 25.000 Maklern, ImmoScout24-Award (RIEGEL)|4–6 Wochen~bis Ihr System live ist",

  /* Der eine Grund */
  "mk.vsl.front_grund_eyebrow": "Wenn man es auf den Kern bringt",
  "mk.vsl.front_grund_titel": "Eigentlich ist es nur dieser *eine* Grund.",
  "mk.vsl.front_grund_text":
    "Der Eigentümer vergleicht abends drei Makler am Handy. Drei Websites, drei Exposés, dreimal dasselbe Layout aus derselben Software. Er kann nicht erkennen, wer besser verkauft. Also nimmt er den, der teurer wirkt.",
  "mk.vsl.front_grund_text2":
    "Mehr Anzeigen, mehr gekaufte Kontakte, mehr Nachfassen: Alles davon verstärkt nur, was er dort sieht. Der Unterschied muss vorher da sein.",

  /* Das System */
  "mk.vsl.front_system_eyebrow": "Was die Portale haben. Und Sie ab jetzt auch.",
  "mk.vsl.front_system_titel": "Verkaufen Sie, als wären Sie selbst das *Portal*.",
  "mk.vsl.front_system_sub":
    "Was die großen Portale in zwanzig Jahren mit Millionen gebaut haben, steht in sechs Wochen unter Ihrem Namen. Sechs Bausteine, ein System.",
  "mk.vsl.front_system_1_titel": "Marke & Website",
  "mk.vsl.front_system_1_text": "Eigentümer sehen in acht Sekunden, dass Sie anders sind. Und dass Sie es sich leisten können.",
  "mk.vsl.front_system_2_titel": "Eigene Rechner",
  "mk.vsl.front_system_2_text": "Verkaufspreis, Mietpreis, Abschreibung. Unter Ihrem Namen. Der Eigentümer rechnet, Sie bekommen den Kontakt.",
  "mk.vsl.front_system_3_titel": "Eigenes Portal",
  "mk.vsl.front_system_3_text": "Ihre Objekte, durchsuchbar wie bei den Großen, mit Suchaufträgen und Kunden-Login. Auf Ihrer Domain.",
  "mk.vsl.front_system_4_titel": "Reports per Mail",
  "mk.vsl.front_system_4_text": "Jeder Eigentümer bekommt seinen PDF-Report automatisch. Mit seinen Zahlen, Ihrem Logo, ohne dass jemand tippt.",
  "mk.vsl.front_system_5_titel": "Mailings zum Suchauftrag",
  "mk.vsl.front_system_5_text": "Neue Angebote gehen an die, die genau danach suchen. Vor der Veröffentlichung.",
  "mk.vsl.front_system_6_titel": "CRM & Nachfass",
  "mk.vsl.front_system_6_text": "Jede Anfrage, jeder Termin, jedes Mandat an einem Ort. Der Nachfass läuft, während Sie beim Notar sitzen.",

  /* Beweis */
  "mk.vsl.front_beweis_eyebrow": "Zu gut, um wahr zu sein?",
  "mk.vsl.front_beweis_titel": "RIEGEL Immobilien, sechs Wochen nach dem Livegang.",
  "mk.vsl.front_beleg":
    "9~Abschlüsse in sechs Wochen|342.000 €~Abschlussvolumen in sechs Wochen|Platz 21~von über 25.000 Maklern, ImmoScout24-Award",
  "mk.vsl.front_beweis_text": "Ein Büro, ein Relaunch, sechs Wochen.",
  "mk.vsl.front_logos_label": "Marken, die beuwy vertrauen",
  "mk.vsl.front_logos":
    "Vision Group|Königswege|RIEGEL Immobilien|hzo immobilien|invyse|getsafe|PURELEI|Netlution|Instaffo|PreFin|accredia|Finsolute|ImmoAbschreibung|innovakonzept|Rosental|Kopp Consulting|JPF Ingenieurbüro|TREC Careers|BeautyFarm|Snow Aligner|Gooodkid Records|Infocient",

  /* Vorsprung */
  "mk.vsl.front_vorsprung_eyebrow": "Nicht schlauer. Nur früher dran.",
  "mk.vsl.front_vorsprung_titel": "Während Ihre Wettbewerber noch KI lernen, verkauft Ihr System *schon*.",
  "mk.vsl.front_vorsprung_text":
    "Sie müssen nichts ausprobieren und nichts erfinden. Sie übernehmen, was bei dutzenden Maklern schon läuft, und wir passen es an Ihr Büro an. Anpassen dauert Wochen. Erfinden dauert Jahre.",

  /* Für wen */
  "mk.vsl.front_wen_titel": "Für wen das gebaut ist. Und für wen *nicht*.",
  "mk.vsl.front_wen_ja_label": "Sie sind richtig, wenn Sie …",
  "mk.vsl.front_wen_ja_1": "in Ihrer Stadt die Nummer 1 sein wollen, wenn jemand an Immobilien denkt.",
  "mk.vsl.front_wen_ja_2": "lieber ein bewährtes System übernehmen, statt zwei Jahre selbst zu basteln.",
  "mk.vsl.front_wen_ja_3": "schnell entscheiden, sobald die Zahlen auf dem Tisch liegen.",
  "mk.vsl.front_wen_nein_label": "Nicht richtig, wenn Sie …",
  "mk.vsl.front_wen_nein_1": "die günstigste Website suchen. Ein Baukasten ab 39 € im Monat ist dann ehrlicher.",
  "mk.vsl.front_wen_nein_2": "Automatisierung für eine Spielerei halten.",
  "mk.vsl.front_wen_nein_3": "Ihre Leads lieber weiter mieten.",

  /* Einwände */
  "mk.vsl.front_einwand_titel": "Drei Fragen, die jeder stellt.",
  "mk.vsl.front_einwand_1_frage": "Was kostet das?",
  "mk.vsl.front_einwand_1_antwort":
    "Weniger als eine Courtage. Bei einer Wohnung für 400.000 € sind 3,57 % auf Maklerseite rund 14.280 €. Ein Alleinauftrag mehr, und das System hat sich getragen. Den genauen Umfang klären wir im ersten Gespräch mit Ihren Zahlen, nicht mit einer Preisliste.",
  "mk.vsl.front_einwand_2_frage": "Wie viel Zeit kostet mich das?",
  "mk.vsl.front_einwand_2_antwort":
    "Zwei Termine und Ihre Fotos. Texte, Struktur, Technik und Anbindung kommen von uns. Freigaben dauern Minuten, keine Meetings.",
  "mk.vsl.front_einwand_3_frage": "Läuft das mit onOffice, FLOWFACT oder Propstack?",
  "mk.vsl.front_einwand_3_antwort":
    "Ja. Website, Rechner, Portal und Funnel docken an Ihre Software an. Ihre Objekte laufen live, ohne doppelte Pflege.",

  /* Nächste Schritte */
  "mk.vsl.front_schritte_titel": "So geht es *weiter*.",
  "mk.vsl.front_schritte_1": "Anfrage~Vier Fragen, eine Minute.",
  "mk.vsl.front_schritte_2": "Gespräch~Innerhalb von 24 Stunden, mit Ihren Zahlen.",
  "mk.vsl.front_schritte_3": "Start~Kickoff in der Woche darauf, live in sechs Wochen.",

  /* Exit-Intent */
  "mk.vsl.front_exit_titel": "Bevor Sie gehen: Wie viele Alleinaufträge hat Ihre Website dieses Jahr gekostet?",
  "mk.vsl.front_exit_text": "Vier Fragen, eine Minute. Danach wissen Sie, ob ein System für Ihr Büro Sinn ergibt.",
  "mk.vsl.front_exit_cta": "Kurzcheck starten",
  "mk.vsl.front_exit_weiter": "Weiterlesen",

  /* Rahmen + SEO */
  "mk.vsl.front_fuss": "Marke, Website & Vertriebssystem für Immobilienmakler",
  "mk.vsl.front_mehr": "Zur ausführlichen Seite",
  "mk.vsl.front_meta_titel": "Vertriebssystem für Immobilienmakler: eigenes Portal, Rechner, CRM | beuwy",
  "mk.vsl.front_meta_beschreibung":
    "Was die großen Portale in zwanzig Jahren gebaut haben, steht in sechs Wochen unter Ihrem Namen: eigenes Portal, eigene Rechner, CRM, Reports und Mailings. Bewährt bei Maklern, angepasst an Ihr Büro.",
  "mk.vsl.platzhalter": "5 Minuten — folgt in Kürze",
};

const L = "Frontseite /vsl · ";
export const VSL_FRONT_LABELS: Record<string, string> = {
  "mk.vsl.front_eyebrow": `${L}Zeile über der Headline`,
  "mk.vsl.front_titel": `${L}Headline (ein *Wort* = Highlighter)`,
  "mk.vsl.front_sub": `${L}Satz unter der Headline`,
  "mk.vsl.front_cta": `${L}Knopf (führt in den Anfrage-Funnel)`,
  "mk.vsl.front_cta_hinweis": `${L}Hinweis unter dem Knopf`,
  "mk.vsl.front_vertrauen": `${L}Vertrauensleiste: Zahl~Text, mit | getrennt`,
  "mk.vsl.front_grund_eyebrow": `${L}Der eine Grund · Eyebrow`,
  "mk.vsl.front_grund_titel": `${L}Der eine Grund · Titel`,
  "mk.vsl.front_grund_text": `${L}Der eine Grund · Absatz 1`,
  "mk.vsl.front_grund_text2": `${L}Der eine Grund · Absatz 2`,
  "mk.vsl.front_system_eyebrow": `${L}Das System · Eyebrow`,
  "mk.vsl.front_system_titel": `${L}Das System · Titel`,
  "mk.vsl.front_system_sub": `${L}Das System · Einleitung`,
  "mk.vsl.front_system_1_titel": `${L}Baustein 1 · Titel`,
  "mk.vsl.front_system_1_text": `${L}Baustein 1 · Text`,
  "mk.vsl.front_system_2_titel": `${L}Baustein 2 · Titel`,
  "mk.vsl.front_system_2_text": `${L}Baustein 2 · Text`,
  "mk.vsl.front_system_3_titel": `${L}Baustein 3 · Titel`,
  "mk.vsl.front_system_3_text": `${L}Baustein 3 · Text`,
  "mk.vsl.front_system_4_titel": `${L}Baustein 4 · Titel`,
  "mk.vsl.front_system_4_text": `${L}Baustein 4 · Text`,
  "mk.vsl.front_system_5_titel": `${L}Baustein 5 · Titel`,
  "mk.vsl.front_system_5_text": `${L}Baustein 5 · Text`,
  "mk.vsl.front_system_6_titel": `${L}Baustein 6 · Titel`,
  "mk.vsl.front_system_6_text": `${L}Baustein 6 · Text`,
  "mk.vsl.front_beweis_eyebrow": `${L}Beweis · Eyebrow`,
  "mk.vsl.front_beweis_titel": `${L}Beweis · Titel`,
  "mk.vsl.front_beleg": `${L}Beweis · Zahl~Text, mit | getrennt (nur belegte Case-Zahlen!)`,
  "mk.vsl.front_beweis_text": `${L}Beweis · Satz unter den Zahlen`,
  "mk.vsl.front_logos_label": `${L}Zeile über den Kundenlogos`,
  "mk.vsl.front_logos": `${L}Kundenlogos, mit | getrennt (Freigaben!)`,
  "mk.vsl.front_vorsprung_eyebrow": `${L}Vorsprung · Eyebrow`,
  "mk.vsl.front_vorsprung_titel": `${L}Vorsprung · Titel`,
  "mk.vsl.front_vorsprung_text": `${L}Vorsprung · Text`,
  "mk.vsl.front_wen_titel": `${L}Für wen · Titel`,
  "mk.vsl.front_wen_ja_label": `${L}Für wen · Spalte Ja · Überschrift`,
  "mk.vsl.front_wen_ja_1": `${L}Für wen · Ja 1`,
  "mk.vsl.front_wen_ja_2": `${L}Für wen · Ja 2`,
  "mk.vsl.front_wen_ja_3": `${L}Für wen · Ja 3`,
  "mk.vsl.front_wen_nein_label": `${L}Für wen · Spalte Nein · Überschrift`,
  "mk.vsl.front_wen_nein_1": `${L}Für wen · Nein 1`,
  "mk.vsl.front_wen_nein_2": `${L}Für wen · Nein 2`,
  "mk.vsl.front_wen_nein_3": `${L}Für wen · Nein 3`,
  "mk.vsl.front_einwand_titel": `${L}Einwände · Titel`,
  "mk.vsl.front_einwand_1_frage": `${L}Einwand 1 · Frage`,
  "mk.vsl.front_einwand_1_antwort": `${L}Einwand 1 · Antwort`,
  "mk.vsl.front_einwand_2_frage": `${L}Einwand 2 · Frage`,
  "mk.vsl.front_einwand_2_antwort": `${L}Einwand 2 · Antwort`,
  "mk.vsl.front_einwand_3_frage": `${L}Einwand 3 · Frage`,
  "mk.vsl.front_einwand_3_antwort": `${L}Einwand 3 · Antwort`,
  "mk.vsl.front_schritte_titel": `${L}Nächste Schritte · Titel`,
  "mk.vsl.front_schritte_1": `${L}Schritt 1: Titel~Text`,
  "mk.vsl.front_schritte_2": `${L}Schritt 2: Titel~Text`,
  "mk.vsl.front_schritte_3": `${L}Schritt 3: Titel~Text`,
  "mk.vsl.front_exit_titel": `${L}Exit-Intent · Überschrift (erscheint beim Verlassen, nur Desktop)`,
  "mk.vsl.front_exit_text": `${L}Exit-Intent · Text`,
  "mk.vsl.front_exit_cta": `${L}Exit-Intent · Knopf`,
  "mk.vsl.front_exit_weiter": `${L}Exit-Intent · Schließen-Link`,
  "mk.vsl.front_fuss": `${L}Fußzeile neben dem Logo`,
  "mk.vsl.front_mehr": `${L}Link zur Startseite (Fußzeile)`,
  "mk.vsl.front_meta_titel": `${L}Browser-Titel (SEO)`,
  "mk.vsl.front_meta_beschreibung": `${L}Meta-Beschreibung (SEO, Google-Snippet)`,
  "mk.vsl.platzhalter": "Makler · VSL-Video · Pill auf dem Platzhalter, solange keine Video-URL da ist",
};
