/**
 * Studio-Texte: /intern/pipeline — Deal-Kanban (R5 Leaf G2).
 *
 * REGEL (Alex, 27.08): Jede neue nutzerlesbare Textfläche registriert
 * ihre Texte hier unter src/lib/texte/<bereich>.ts — defaults + labels —
 * und liest sie zur Laufzeit über getContent(). So kann Alex jeden Text
 * im Studio korrigieren, ohne LLM und ohne Deployment. content.ts
 * spreadet alle Bereichsdateien in DEFAULTS/FIELD_LABELS (Orchestrator).
 *
 * NICHT hier drin: die sechs Status-Namen (Neu/Kontaktiert/…) und die
 * Kontextmenü-Statusliste — feste Domain-Vokabeln, exakt wie in
 * src/app/intern/page.tsx und src/app/intern/leads/[id]/page.tsx bereits
 * als Code-Konstante geführt, nicht als Studio-Text.
 */

export const INTERN_PIPELINE_DEFAULTS: Record<string, string> = {
  "intern.pipeline.eyebrow": "Intern · CRM",
  "intern.pipeline.titel": "Der *Deal*-Kanban.",
  "intern.pipeline.sub":
    "Jeder Deal mit echtem Euro-Wert, verschiebbar per Drag & Drop — von der ersten Anfrage bis zum Abschluss.",

  "intern.pipeline.demo_label": "Demo-Modus",
  "intern.pipeline.demo_titel": "Diese Ansicht zeigt Beispieldaten.",
  "intern.pipeline.demo_text":
    "Auf diesem Deployment ist keine CRM-Datenbank angebunden. Das Board bleibt bedienbar, Änderungen speichern aber nur im Browser — sobald Supabase eingerichtet ist, übernehmen echte Deals automatisch.",

  "intern.pipeline.neu_deal_button": "+ Deal anlegen",
  "intern.pipeline.board_leer_text": "Noch keine Deals und keine unqualifizierten Leads im Board.",
  "intern.pipeline.board_leer_cta": "+ Ersten Deal anlegen",

  "intern.pipeline.spalte_unqualifiziert": "Unqualifiziert",
  "intern.pipeline.unqualifiziert_leer": "Keine unqualifizierten Leads",
  "intern.pipeline.zu_deal_button": "Zu Deal machen",
  "intern.pipeline.spalte_leer": "Keine Deals",

  "intern.pipeline.karte_menu_label": "Weitere Aktionen",
  "intern.pipeline.kein_kontakt": "Kein Kontakt verknüpft",
  "intern.pipeline.heute": "Heute",
  "intern.pipeline.menu_verschieben_nach": "Verschieben nach …",
  "intern.pipeline.menu_bearbeiten": "Bearbeiten",
  "intern.pipeline.menu_kontakt_oeffnen": "Kontakt öffnen",

  "intern.pipeline.dialog_neu_titel": "Deal anlegen",
  "intern.pipeline.feld_titel": "Titel",
  "intern.pipeline.feld_wert": "Wert (€)",
  "intern.pipeline.feld_email": "Kontakt-E-Mail",
  "intern.pipeline.dialog_speichern": "Speichern",
  "intern.pipeline.dialog_abbrechen": "Abbrechen",

  "intern.pipeline.fehler_titel_leer": "Bitte einen Titel angeben.",
  "intern.pipeline.fehler_email": "Bitte eine gültige E-Mail-Adresse angeben.",
  "intern.pipeline.fehler_speichern": "Konnte nicht gespeichert werden — bitte erneut versuchen.",
  "intern.pipeline.fehler_schliessen": "Schließen",

  "intern.pipeline.verloren_titel": "Deal als verloren markieren",
  "intern.pipeline.verloren_sub": "Bitte kurz den Grund angeben — das schärft die Pipeline für später.",
  "intern.pipeline.verloren_grund_platzhalter": "Grund auswählen",
  "intern.pipeline.verloren_notiz_platzhalter": "Freitext, optional (bei „Anderes“ Pflicht)",
  "intern.pipeline.verloren_speichern": "Als verloren speichern",
  "intern.pipeline.verloren_fehler_grund": "Bitte einen Grund auswählen.",
  "intern.pipeline.verloren_fehler_notiz": "Bei „Anderes“ bitte kurz erläutern.",
  "intern.pipeline.grund_zu_teuer": "Zu teuer",
  "intern.pipeline.grund_keine_antwort": "Keine Antwort",
  "intern.pipeline.grund_wettbewerber": "Wettbewerber",
  "intern.pipeline.grund_kein_bedarf": "Kein Bedarf",
  "intern.pipeline.grund_anderes": "Anderes",

  "intern.pipeline.toast_verschoben": "{titel} → {status} verschoben.",
  "intern.pipeline.toast_rueckgaengig": "Rückgängig",
  "intern.pipeline.toast_angelegt": "{titel} angelegt.",
};

export const INTERN_PIPELINE_LABELS: Record<string, string> = {
  "intern.pipeline.eyebrow": "Intern · Pipeline · Eyebrow über der Überschrift",
  "intern.pipeline.titel": "Intern · Pipeline · Seitenüberschrift (*Wort* = Highlight)",
  "intern.pipeline.sub": "Intern · Pipeline · Satz unter der Überschrift",

  "intern.pipeline.demo_label": "Intern · Pipeline · Demo-Hinweis · Label der gelben Karte",
  "intern.pipeline.demo_titel": "Intern · Pipeline · Demo-Hinweis · Überschrift",
  "intern.pipeline.demo_text": "Intern · Pipeline · Demo-Hinweis · Fließtext",

  "intern.pipeline.neu_deal_button": "Intern · Pipeline · Button „Deal anlegen“",
  "intern.pipeline.board_leer_text": "Intern · Pipeline · Leerzustand ganzes Board · Satz",
  "intern.pipeline.board_leer_cta": "Intern · Pipeline · Leerzustand ganzes Board · Button",

  "intern.pipeline.spalte_unqualifiziert": "Intern · Pipeline · Spaltentitel „Unqualifiziert“",
  "intern.pipeline.unqualifiziert_leer": "Intern · Pipeline · Leerzustand Unqualifiziert-Spalte",
  "intern.pipeline.zu_deal_button": "Intern · Pipeline · Button „Zu Deal machen“",
  "intern.pipeline.spalte_leer": "Intern · Pipeline · Leerzustand einer Deal-Spalte",

  "intern.pipeline.karte_menu_label": "Intern · Pipeline · Kontextmenü-Button · Aria-Label",
  "intern.pipeline.kein_kontakt": "Intern · Pipeline · Karte ohne auflösbaren Kontakt",
  "intern.pipeline.heute": "Intern · Pipeline · Alter-Badge „Heute“",
  "intern.pipeline.menu_verschieben_nach": "Intern · Pipeline · Kontextmenü · Untermenü „Verschieben nach …“",
  "intern.pipeline.menu_bearbeiten": "Intern · Pipeline · Kontextmenü · Eintrag „Bearbeiten“",
  "intern.pipeline.menu_kontakt_oeffnen": "Intern · Pipeline · Kontextmenü · Eintrag „Kontakt öffnen“ (nur bei verknüpftem Kontakt)",

  "intern.pipeline.dialog_neu_titel": "Intern · Pipeline · Dialog „Deal anlegen“ · Titel",
  "intern.pipeline.feld_titel": "Intern · Pipeline · Dialog „Deal anlegen“ · Feld Titel",
  "intern.pipeline.feld_wert": "Intern · Pipeline · Dialog „Deal anlegen“ · Feld Wert",
  "intern.pipeline.feld_email": "Intern · Pipeline · Dialog „Deal anlegen“ · Feld E-Mail",
  "intern.pipeline.dialog_speichern": "Intern · Pipeline · Dialoge · Button Speichern",
  "intern.pipeline.dialog_abbrechen": "Intern · Pipeline · Dialoge · Button Abbrechen",

  "intern.pipeline.fehler_titel_leer": "Intern · Pipeline · Fehlertext leerer Titel",
  "intern.pipeline.fehler_email": "Intern · Pipeline · Fehlertext ungültige E-Mail",
  "intern.pipeline.fehler_speichern": "Intern · Pipeline · Fehlertext Speichern fehlgeschlagen",
  "intern.pipeline.fehler_schliessen": "Intern · Pipeline · Fehlerzeile · Button Schließen",

  "intern.pipeline.verloren_titel": "Intern · Pipeline · Verloren-Dialog · Titel",
  "intern.pipeline.verloren_sub": "Intern · Pipeline · Verloren-Dialog · Satz",
  "intern.pipeline.verloren_grund_platzhalter": "Intern · Pipeline · Verloren-Dialog · Grund-Auswahl · Platzhalter",
  "intern.pipeline.verloren_notiz_platzhalter": "Intern · Pipeline · Verloren-Dialog · Notizfeld-Platzhalter",
  "intern.pipeline.verloren_speichern": "Intern · Pipeline · Verloren-Dialog · Speichern-Button",
  "intern.pipeline.verloren_fehler_grund": "Intern · Pipeline · Verloren-Dialog · Fehler ohne Grund",
  "intern.pipeline.verloren_fehler_notiz": "Intern · Pipeline · Verloren-Dialog · Fehler ohne Notiz bei „Anderes“",
  "intern.pipeline.grund_zu_teuer": "Intern · Pipeline · Verlust-Grund „Zu teuer“",
  "intern.pipeline.grund_keine_antwort": "Intern · Pipeline · Verlust-Grund „Keine Antwort“",
  "intern.pipeline.grund_wettbewerber": "Intern · Pipeline · Verlust-Grund „Wettbewerber“",
  "intern.pipeline.grund_kein_bedarf": "Intern · Pipeline · Verlust-Grund „Kein Bedarf“",
  "intern.pipeline.grund_anderes": "Intern · Pipeline · Verlust-Grund „Anderes“",

  "intern.pipeline.toast_verschoben":
    "Intern · Pipeline · Toast nach Statuswechsel ({titel} = Deal-Titel, {status} = neuer Status — Platzhalter, nicht entfernen)",
  "intern.pipeline.toast_rueckgaengig": "Intern · Pipeline · Toast nach Statuswechsel · Rückgängig-Action-Label",
  "intern.pipeline.toast_angelegt":
    "Intern · Pipeline · Toast nach Deal-Anlage ({titel} = Deal-Titel — Platzhalter, nicht entfernen)",
};
