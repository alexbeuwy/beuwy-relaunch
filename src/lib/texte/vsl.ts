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

  /* Das System — alle Bausteine aus dem RIEGEL-Projekt */
  "mk.vsl.front_system_eyebrow": "Alles, was bei RIEGEL Immobilien läuft",
  "mk.vsl.front_system_titel": "Dreißig Bausteine. Ein *System*.",
  "mk.vsl.front_system_sub":
    "Was die großen Portale in zwanzig Jahren gebaut haben, steht in sechs Wochen unter Ihrem Namen. Hier die vollständige Liste aus dem RIEGEL-Projekt.",
  "mk.vsl.front_system_1_titel": "Marke & Auftritt",
  "mk.vsl.front_system_1_text": "Der erste Eindruck, in acht Sekunden entschieden.",
  "mk.vsl.front_system_1_p1": "Markenrelaunch: Logo, Farben, Schrift, Ton",
  "mk.vsl.front_system_1_p2": "Website neu gebaut, mobil zuerst",
  "mk.vsl.front_system_1_p3": "Über 30 Objektarten-Seiten, vom Zinshaus bis zur Pflegeimmobilie",
  "mk.vsl.front_system_1_p4": "Über 30 Standort-Seiten, jede mit eigenem Marktbild",
  "mk.vsl.front_system_1_p5": "KI-Visuals gekennzeichnet, echte Objekte im Vordergrund",
  "mk.vsl.front_system_2_titel": "Rechner & Leads",
  "mk.vsl.front_system_2_text": "Der Eigentümer rechnet. Sie bekommen den Kontakt.",
  "mk.vsl.front_system_2_p1": "Immorechner: Wert in 60 Sekunden, ohne Anmeldung",
  "mk.vsl.front_system_2_p2": "Amtliche Bodenrichtwerte und Satellitenansicht der Lage",
  "mk.vsl.front_system_2_p3": "Preisatlas für 18 Städte: Preise, Bodenwerte, Trends",
  "mk.vsl.front_system_2_p4": "PDF-Report mit Ihrem Logo, automatisch per Mail",
  "mk.vsl.front_system_2_p5": "Verkaufs- und Vermietungs-Funnel, Terminbuchung online",
  "mk.vsl.front_system_3_titel": "Eigenes Portal",
  "mk.vsl.front_system_3_text": "Objekte wie bei den Großen, unter Ihrem Namen.",
  "mk.vsl.front_system_3_p1": "Objektliste mit Filtern, Objektseiten mit Exposé",
  "mk.vsl.front_system_3_p2": "Objekte live aus der Maklersoftware, keine doppelte Pflege",
  "mk.vsl.front_system_3_p3": "Kunden-Login und Merkliste",
  "mk.vsl.front_system_3_p4": "Suchaufträge: neue Objekte gehen automatisch an passende Käufer",
  "mk.vsl.front_system_3_p5": "Anfrage und Exposé-Download direkt am Objekt",
  "mk.vsl.front_system_4_titel": "Sichtbarkeit bei Google & KI",
  "mk.vsl.front_system_4_text": "Gefunden bei Google. Genannt von ChatGPT.",
  "mk.vsl.front_system_4_p1": "Ratgeber zu Verkauf, Steuer, Erbe, Scheidung, Vermietung",
  "mk.vsl.front_system_4_p2": "GEO-Artikel wie „Bester Immobilienmakler Speyer“, gebaut für KI-Antworten",
  "mk.vsl.front_system_4_p3": "Standort-Guides für die ganze Region",
  "mk.vsl.front_system_4_p4": "Strukturierte Daten für Google und KI: Organisation, FAQ, Objekte",
  "mk.vsl.front_system_4_p5": "Bewertungen von Google, ImmoScout24, Trustpilot live eingebunden",
  "mk.vsl.front_system_5_titel": "CRM & Automatisierung",
  "mk.vsl.front_system_5_text": "Läuft nachts. Ohne neue Stelle.",
  "mk.vsl.front_system_5_p1": "Internes Cockpit: Leads, Reports, Wiedervorlagen an einem Ort",
  "mk.vsl.front_system_5_p2": "Nachfass-Mails, die von selbst rausgehen",
  "mk.vsl.front_system_5_p3": "Mailings zum Suchauftrag, vor der Veröffentlichung",
  "mk.vsl.front_system_5_p4": "Termin-Erinnerungen und Kalender-Einträge automatisch",
  "mk.vsl.front_system_5_p5": "Zugänge fürs Team, Medienverwaltung, alles im Browser",
  "mk.vsl.front_system_6_titel": "Daten & Steuerung",
  "mk.vsl.front_system_6_text": "Sie sehen, was Eigentümer tun. Ohne Cookie-Banner.",
  "mk.vsl.front_system_6_p1": "Cookieloses Tracking, DSGVO-fest, kein Banner nötig",
  "mk.vsl.front_system_6_p2": "Klick-Heatmap je Seite und Gerät, wie bei Hotjar, selbst gebaut",
  "mk.vsl.front_system_6_p3": "Conversion-Trichter je Rechner-Schritt",
  "mk.vsl.front_system_6_p4": "Auswertung: Welche Seite bringt welche Anfrage",
  "mk.vsl.front_system_6_p5": "Wochenbericht mit Kennzahlen per Mail",

  /* Die Frage */
  "mk.vsl.front_frage_eyebrow": "Die ehrliche Rechnung",
  "mk.vsl.front_frage_titel": "Und das alles soll nicht zu *einem* einzigen Mehrdeal führen?",
  "mk.vsl.front_frage_text":
    "Dreißig Bausteine, die sonst drei Agenturen, zwei Freelancer und eine neue Stelle wären. Hier laufen sie in einem System. Nachts, ohne Urlaub, ohne Kündigungsfrist. Bei RIEGEL waren es neun Abschlüsse in sechs Wochen. Sie brauchen einen.",
  "mk.vsl.front_frage_text2":
    "Wer heute noch Mitarbeiter für Aufgaben einstellt, die ein System übernimmt, bezahlt zweimal: das Gehalt und den Vorsprung der anderen.",

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

  /* Investition */
  "mk.vsl.front_preis_eyebrow": "Die Investition",
  "mk.vsl.front_preis_titel": "Ein Abschluss. Und das System ist *bezahlt*.",
  "mk.vsl.front_preis_einmal": "27.900 €",
  "mk.vsl.front_preis_einmal_label": "netto, einmalig",
  "mk.vsl.front_preis_raten": "3 × 9.900 €",
  "mk.vsl.front_preis_raten_label": "netto, zu Kickoff, Design-Freigabe und Livegang",
  "mk.vsl.front_preis_anker":
    "Zum Vergleich: Ein Objekt für 400.000 € bringt bei 7,14 % Gesamtprovision 28.560 € Courtage. Ein einziger zusätzlicher Abschluss, und Ihr System hat sich bezahlt. Jeder weitere gehört Ihnen.",
  "mk.vsl.front_preis_enthalten": "Enthalten: Marke, Website, Rechner, eigenes Portal, Reports, Mailings, CRM-Anbindung, sechs Wochen Umsetzung.",

  /* Einwände */
  "mk.vsl.front_einwand_titel": "Drei Fragen, die jeder stellt.",
  "mk.vsl.front_einwand_1_frage": "Warum nicht einfach eine Website für 3.000 €?",
  "mk.vsl.front_einwand_1_antwort":
    "Weil eine Website nur die Visitenkarte ist. Hier bekommen Sie, womit Portale Geld verdienen: Rechner, Suchaufträge, Reports, Mailings, CRM. Eine Website bringt Ihnen keinen Alleinauftrag. Ein System bringt jeden Monat welche.",
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
  "mk.vsl.front_system_1_titel": `${L}Gruppe 1 · Titel`,
  "mk.vsl.front_system_1_text": `${L}Gruppe 1 · Unterzeile`,
  "mk.vsl.front_system_1_p1": `${L}Gruppe 1 · Baustein 1`,
  "mk.vsl.front_system_1_p2": `${L}Gruppe 1 · Baustein 2`,
  "mk.vsl.front_system_1_p3": `${L}Gruppe 1 · Baustein 3`,
  "mk.vsl.front_system_1_p4": `${L}Gruppe 1 · Baustein 4`,
  "mk.vsl.front_system_1_p5": `${L}Gruppe 1 · Baustein 5`,
  "mk.vsl.front_system_2_titel": `${L}Gruppe 2 · Titel`,
  "mk.vsl.front_system_2_text": `${L}Gruppe 2 · Unterzeile`,
  "mk.vsl.front_system_2_p1": `${L}Gruppe 2 · Baustein 1`,
  "mk.vsl.front_system_2_p2": `${L}Gruppe 2 · Baustein 2`,
  "mk.vsl.front_system_2_p3": `${L}Gruppe 2 · Baustein 3`,
  "mk.vsl.front_system_2_p4": `${L}Gruppe 2 · Baustein 4`,
  "mk.vsl.front_system_2_p5": `${L}Gruppe 2 · Baustein 5`,
  "mk.vsl.front_system_3_titel": `${L}Gruppe 3 · Titel`,
  "mk.vsl.front_system_3_text": `${L}Gruppe 3 · Unterzeile`,
  "mk.vsl.front_system_3_p1": `${L}Gruppe 3 · Baustein 1`,
  "mk.vsl.front_system_3_p2": `${L}Gruppe 3 · Baustein 2`,
  "mk.vsl.front_system_3_p3": `${L}Gruppe 3 · Baustein 3`,
  "mk.vsl.front_system_3_p4": `${L}Gruppe 3 · Baustein 4`,
  "mk.vsl.front_system_3_p5": `${L}Gruppe 3 · Baustein 5`,
  "mk.vsl.front_system_4_titel": `${L}Gruppe 4 · Titel`,
  "mk.vsl.front_system_4_text": `${L}Gruppe 4 · Unterzeile`,
  "mk.vsl.front_system_4_p1": `${L}Gruppe 4 · Baustein 1`,
  "mk.vsl.front_system_4_p2": `${L}Gruppe 4 · Baustein 2`,
  "mk.vsl.front_system_4_p3": `${L}Gruppe 4 · Baustein 3`,
  "mk.vsl.front_system_4_p4": `${L}Gruppe 4 · Baustein 4`,
  "mk.vsl.front_system_4_p5": `${L}Gruppe 4 · Baustein 5`,
  "mk.vsl.front_system_5_titel": `${L}Gruppe 5 · Titel`,
  "mk.vsl.front_system_5_text": `${L}Gruppe 5 · Unterzeile`,
  "mk.vsl.front_system_5_p1": `${L}Gruppe 5 · Baustein 1`,
  "mk.vsl.front_system_5_p2": `${L}Gruppe 5 · Baustein 2`,
  "mk.vsl.front_system_5_p3": `${L}Gruppe 5 · Baustein 3`,
  "mk.vsl.front_system_5_p4": `${L}Gruppe 5 · Baustein 4`,
  "mk.vsl.front_system_5_p5": `${L}Gruppe 5 · Baustein 5`,
  "mk.vsl.front_system_6_titel": `${L}Gruppe 6 · Titel`,
  "mk.vsl.front_system_6_text": `${L}Gruppe 6 · Unterzeile`,
  "mk.vsl.front_system_6_p1": `${L}Gruppe 6 · Baustein 1`,
  "mk.vsl.front_system_6_p2": `${L}Gruppe 6 · Baustein 2`,
  "mk.vsl.front_system_6_p3": `${L}Gruppe 6 · Baustein 3`,
  "mk.vsl.front_system_6_p4": `${L}Gruppe 6 · Baustein 4`,
  "mk.vsl.front_system_6_p5": `${L}Gruppe 6 · Baustein 5`,
  "mk.vsl.front_frage_eyebrow": `${L}Die Frage · Eyebrow`,
  "mk.vsl.front_frage_titel": `${L}Die Frage · Titel`,
  "mk.vsl.front_frage_text": `${L}Die Frage · Absatz 1`,
  "mk.vsl.front_frage_text2": `${L}Die Frage · Absatz 2`,
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
  "mk.vsl.front_preis_eyebrow": `${L}Investition · Eyebrow`,
  "mk.vsl.front_preis_titel": `${L}Investition · Titel`,
  "mk.vsl.front_preis_einmal": `${L}Investition · Einmalpreis (Zahl)`,
  "mk.vsl.front_preis_einmal_label": `${L}Investition · Zeile unter dem Einmalpreis`,
  "mk.vsl.front_preis_raten": `${L}Investition · Ratenpreis (Zahl)`,
  "mk.vsl.front_preis_raten_label": `${L}Investition · Zeile unter dem Ratenpreis`,
  "mk.vsl.front_preis_anker": `${L}Investition · Vergleichsrechnung (Courtage)`,
  "mk.vsl.front_preis_enthalten": `${L}Investition · Was enthalten ist`,
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
