/**
 * Studio-Texte: Seitenrahmen — Navigation (mk.nav.*) und Footer
 * (mk.footer.*). Landet im Studio unter „Startseite" → Navigation/Footer.
 * Wird von Agent L (R11) befüllt; content.ts spreadet bereits.
 *
 * hrefs bleiben Code (siehe Nav.tsx/Footer.tsx) — hier stehen nur die
 * sichtbaren Labels. Nummerierte Listen von Hand (kein listeRegistrieren:
 * das erzeugt immer Keys unter dem Präfix "s." für Unterseiten, hier
 * brauchen wir "mk.").
 */

export const RAHMEN_DEFAULTS: Record<string, string> = {
  /* ── Navigation ─────────────────────────────────────────────────── */
  "mk.nav.skip": "Zum Inhalt springen",
  "mk.nav.punkt1_label": "Leistungen",
  "mk.nav.punkt2_label": "Ergebnisse",
  "mk.nav.punkt3_label": "Tools",
  "mk.nav.punkt4_label": "Über uns",
  "mk.nav.punkt5_label": "Wissen",
  "mk.nav.cta": "Zusammenarbeit anfragen",

  /* ── Footer ──────────────────────────────────────────────────────── */
  "mk.footer.intro":
    "Unternehmensberatung für Immobilienunternehmen, die ihren Vorsprung ausbauen wollen — im gesamten DACH-Raum.",

  "mk.footer.leistungen_titel": "Leistungen",
  "mk.footer.leistungen1_label": "Website für Makler",
  "mk.footer.leistungen2_label": "Leadgenerierung",
  "mk.footer.leistungen3_label": "onOffice-Websites",
  "mk.footer.leistungen4_label": "SEO für Makler",
  "mk.footer.leistungen5_label": "GEO: Sichtbar in KI-Suche",
  "mk.footer.leistungen6_label": "Social Media für Makler",
  "mk.footer.leistungen7_label": "E-Mail-Marketing",
  "mk.footer.leistungen8_label": "Über beuwy",

  "mk.footer.wissen_titel": "Wissen",
  "mk.footer.wissen1_label": "Immobilienmarketing-Hub",
  "mk.footer.wissen2_label": "Die 30 besten Maklerwebsites",
  "mk.footer.wissen3_label": "Was kostet eine Maklerwebsite",
  "mk.footer.wissen4_label": "KI für Immobilienmakler",
  "mk.footer.wissen5_label": "Immobilienmarketing-Agentur?",
  "mk.footer.wissen6_label": "Marketing für Projektentwickler",
  "mk.footer.wissen7_label": "Marketing für Bauträger",
  "mk.footer.wissen8_label": "Marketing für Immobilienvertriebe",
  "mk.footer.wissen9_label": "Kapitalanlage-Immobilien",
  "mk.footer.wissen10_label": "Alle Ratgeber im Überblick",
  "mk.footer.wissen11_label": "Rechner & Tools",

  "mk.footer.kontakt_titel": "Kontakt",
  "mk.footer.kontakt_anfrage": "Zusammenarbeit anfragen",
  "mk.footer.kontakt_email": "ap@beuwy.com",
  "mk.footer.kontakt_impressum": "Impressum",
  "mk.footer.kontakt_datenschutz": "Datenschutz",

  "mk.footer.copyright_vor": "©",
  "mk.footer.copyright_nach": "beuwy · Alexander Pütter",
  "mk.footer.claim": "Marke · Website · Automatisierung",
};

export const RAHMEN_LABELS: Record<string, string> = {
  "mk.nav.skip": "Makler · Nav · Skip-Link (Tastatur-Fokus)",
  "mk.nav.punkt1_label": "Makler · Nav · Punkt 1",
  "mk.nav.punkt2_label": "Makler · Nav · Punkt 2",
  "mk.nav.punkt3_label": "Makler · Nav · Punkt 3",
  "mk.nav.punkt4_label": "Makler · Nav · Punkt 4",
  "mk.nav.punkt5_label": "Makler · Nav · Punkt 5",
  "mk.nav.cta": "Makler · Nav · CTA-Button",

  "mk.footer.intro": "Makler · Footer · Einleitungssatz unter dem Logo",
  "mk.footer.leistungen_titel": "Makler · Footer · Spalte 1 · Titel",
  "mk.footer.leistungen1_label": "Makler · Footer · Leistungen · Punkt 1",
  "mk.footer.leistungen2_label": "Makler · Footer · Leistungen · Punkt 2",
  "mk.footer.leistungen3_label": "Makler · Footer · Leistungen · Punkt 3",
  "mk.footer.leistungen4_label": "Makler · Footer · Leistungen · Punkt 4",
  "mk.footer.leistungen5_label": "Makler · Footer · Leistungen · Punkt 5",
  "mk.footer.leistungen6_label": "Makler · Footer · Leistungen · Punkt 6",
  "mk.footer.leistungen7_label": "Makler · Footer · Leistungen · Punkt 7",
  "mk.footer.leistungen8_label": "Makler · Footer · Leistungen · Punkt 8",
  "mk.footer.wissen_titel": "Makler · Footer · Spalte 2 · Titel",
  "mk.footer.wissen1_label": "Makler · Footer · Wissen · Punkt 1",
  "mk.footer.wissen2_label": "Makler · Footer · Wissen · Punkt 2",
  "mk.footer.wissen3_label": "Makler · Footer · Wissen · Punkt 3",
  "mk.footer.wissen4_label": "Makler · Footer · Wissen · Punkt 4",
  "mk.footer.wissen5_label": "Makler · Footer · Wissen · Punkt 5",
  "mk.footer.wissen6_label": "Makler · Footer · Wissen · Punkt 6",
  "mk.footer.wissen7_label": "Makler · Footer · Wissen · Punkt 7",
  "mk.footer.wissen8_label": "Makler · Footer · Wissen · Punkt 8",
  "mk.footer.wissen9_label": "Makler · Footer · Wissen · Punkt 9",
  "mk.footer.wissen10_label": "Makler · Footer · Wissen · Punkt 10",
  "mk.footer.wissen11_label": "Makler · Footer · Wissen · Punkt 11",
  "mk.footer.kontakt_titel": "Makler · Footer · Spalte 3 · Titel",
  "mk.footer.kontakt_anfrage": "Makler · Footer · Kontakt · Anfrage-Link",
  "mk.footer.kontakt_email": "Makler · Footer · Kontakt · E-Mail-Adresse (Anzeigetext)",
  "mk.footer.kontakt_impressum": "Makler · Footer · Kontakt · Impressum-Link",
  "mk.footer.kontakt_datenschutz": "Makler · Footer · Kontakt · Datenschutz-Link",
  "mk.footer.copyright_vor": "Makler · Footer · Copyright-Zeile · vor der Jahreszahl",
  "mk.footer.copyright_nach": "Makler · Footer · Copyright-Zeile · nach der Jahreszahl",
  "mk.footer.claim": "Makler · Footer · Claim-Zeile unten rechts",
};
