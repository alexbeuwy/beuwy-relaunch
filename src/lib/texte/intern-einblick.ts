/**
 * Studio-Texte: Einblick — First-Party-Analytics (R5 Leaf G5,
 * src/app/intern/einblick/page.tsx).
 *
 * REGEL (Alex, 27.08): Jede neue nutzerlesbare Textfläche registriert
 * ihre Texte hier unter src/lib/texte/<bereich>.ts — defaults + labels —
 * und liest sie zur Laufzeit über getContent(). So kann Alex jeden Text
 * im Studio korrigieren, ohne LLM und ohne Deployment. content.ts
 * spreadet alle Bereichsdateien in DEFAULTS/FIELD_LABELS — das Spreaden
 * selbst ist Sache des Orchestrators, nicht dieses Leafs.
 *
 * NICHT hier (Konvention aus src/app/intern/page.tsx, dort QUELLE_LABEL):
 * die feste Ereignis-Vokabular-Zuordnung (pageview/klick/scroll_tiefe →
 * deutsches Label) bleibt hart im Code — das ist Struktur, kein Fließtext.
 */

export const INTERN_EINBLICK_DEFAULTS: Record<string, string> = {
  "intern.einblick.eyebrow": "Intern · Einblick",
  "intern.einblick.titel": "Einblick",
  "intern.einblick.sub":
    "Erstanbieter-Analytics für die eigene Website — cookielos, ohne Consent-Banner, first-party.",

  "intern.einblick.demo_label": "Demo-Modus",
  "intern.einblick.demo_titel": "Diese Ansicht zeigt Beispieldaten.",
  "intern.einblick.demo_text":
    "Auf diesem Deployment ist keine CRM-Datenbank angebunden. Sobald Supabase eingerichtet ist, ersetzen echte Seitenaufrufe, Klicks und Besuche die Beispiele automatisch.",

  "intern.einblick.zeitraum_heute": "Heute",
  "intern.einblick.zeitraum_7": "7 Tage",
  "intern.einblick.zeitraum_30": "30 Tage",

  "intern.einblick.live_titel": "Live",

  "intern.einblick.kpi_seitenaufrufe": "Seitenaufrufe",
  "intern.einblick.kpi_besuche": "Besuche",
  "intern.einblick.kpi_pro_besuch": "Seiten je Besuch",
  "intern.einblick.kpi_klicks": "Klicks erfasst",

  "intern.einblick.seiten_titel": "Meistbesuchte Seiten",
  "intern.einblick.seiten_spalte_pfad": "Pfad",
  "intern.einblick.seiten_spalte_views": "Views",
  "intern.einblick.seiten_spalte_besuche": "Besuche",
  "intern.einblick.seiten_leer": "Noch keine Seitenaufrufe im gewählten Zeitraum.",
  "intern.einblick.seiten_deckel": "Zeigt die 50 meistbesuchten Pfade im Zeitraum.",

  "intern.einblick.events_titel": "Ereignisse",
  "intern.einblick.events_leer": "Noch keine Ereignisse im gewählten Zeitraum.",

  "intern.einblick.geraete_titel": "Geräte",
  "intern.einblick.geraete_leer": "Noch keine Besuche im gewählten Zeitraum.",

  "intern.einblick.heatmap_titel": "Klick-Heatmap",
  "intern.einblick.heatmap_sub": "Zeigt, wo auf einer Seite tatsächlich geklickt wird.",
  "intern.einblick.heatmap_geraet_alle": "Alle",
  "intern.einblick.heatmap_geraet_desktop": "Desktop",
  "intern.einblick.heatmap_geraet_mobil": "Mobil",
  "intern.einblick.heatmap_leer": "Für diesen Pfad liegen noch keine Klicks vor.",
  "intern.einblick.heatmap_keine_seiten":
    "Noch keine Seite mit Daten — die Heatmap füllt sich, sobald Besucher klicken.",
  "intern.einblick.heatmap_deckel":
    "Es werden je Pfad und Gerät die dichtesten 20.000 Klick-Zellen ausgewertet.",
  "intern.einblick.heatmap_platzhalter_hinweis":
    "Noch kein Seiten-Screenshot hinterlegt — die Karte zeigt vorerst nur die Klick-Dichte.",
};

export const INTERN_EINBLICK_LABELS: Record<string, string> = {
  "intern.einblick.eyebrow": "Intern · Einblick · Eyebrow",
  "intern.einblick.titel": "Intern · Einblick · Titel",
  "intern.einblick.sub": "Intern · Einblick · Untertitel",

  "intern.einblick.demo_label": "Intern · Einblick · Demo-Hinweis · Pille",
  "intern.einblick.demo_titel": "Intern · Einblick · Demo-Hinweis · Überschrift",
  "intern.einblick.demo_text": "Intern · Einblick · Demo-Hinweis · Erklärtext",

  "intern.einblick.zeitraum_heute": "Intern · Einblick · Zeitraum-Umschalter · „Heute“",
  "intern.einblick.zeitraum_7": "Intern · Einblick · Zeitraum-Umschalter · „7 Tage“",
  "intern.einblick.zeitraum_30": "Intern · Einblick · Zeitraum-Umschalter · „30 Tage“",

  "intern.einblick.live_titel": "Intern · Einblick · Live-Zeile · Label vor der Zahl",

  "intern.einblick.kpi_seitenaufrufe": "Intern · Einblick · Kachel 1 · Beschriftung",
  "intern.einblick.kpi_besuche": "Intern · Einblick · Kachel 2 · Beschriftung",
  "intern.einblick.kpi_pro_besuch": "Intern · Einblick · Kachel 3 · Beschriftung",
  "intern.einblick.kpi_klicks": "Intern · Einblick · Kachel 4 · Beschriftung",

  "intern.einblick.seiten_titel": "Intern · Einblick · Seiten-Tabelle · Panel-Titel",
  "intern.einblick.seiten_spalte_pfad": "Intern · Einblick · Seiten-Tabelle · Spalte „Pfad“",
  "intern.einblick.seiten_spalte_views": "Intern · Einblick · Seiten-Tabelle · Spalte „Views“",
  "intern.einblick.seiten_spalte_besuche": "Intern · Einblick · Seiten-Tabelle · Spalte „Besuche“",
  "intern.einblick.seiten_leer": "Intern · Einblick · Seiten-Tabelle · Leerzustand",
  "intern.einblick.seiten_deckel": "Intern · Einblick · Seiten-Tabelle · Datendeckel-Hinweis",

  "intern.einblick.events_titel": "Intern · Einblick · Ereignis-Liste · Panel-Titel",
  "intern.einblick.events_leer": "Intern · Einblick · Ereignis-Liste · Leerzustand",

  "intern.einblick.geraete_titel": "Intern · Einblick · Geräte-Split · Panel-Titel",
  "intern.einblick.geraete_leer": "Intern · Einblick · Geräte-Split · Leerzustand",

  "intern.einblick.heatmap_titel": "Intern · Einblick · Heatmap · Panel-Titel",
  "intern.einblick.heatmap_sub": "Intern · Einblick · Heatmap · Untertitel",
  "intern.einblick.heatmap_geraet_alle": "Intern · Einblick · Heatmap · Geräte-Umschalter „Alle“",
  "intern.einblick.heatmap_geraet_desktop": "Intern · Einblick · Heatmap · Geräte-Umschalter „Desktop“",
  "intern.einblick.heatmap_geraet_mobil": "Intern · Einblick · Heatmap · Geräte-Umschalter „Mobil“",
  "intern.einblick.heatmap_leer": "Intern · Einblick · Heatmap · Leerzustand (Pfad ohne Klicks)",
  "intern.einblick.heatmap_keine_seiten": "Intern · Einblick · Heatmap · Leerzustand (keine Seiten mit Daten)",
  "intern.einblick.heatmap_deckel": "Intern · Einblick · Heatmap · Datendeckel-Hinweis",
  "intern.einblick.heatmap_platzhalter_hinweis": "Intern · Einblick · Heatmap · Platzhalter-Hinweis (kein Screenshot)",
};
