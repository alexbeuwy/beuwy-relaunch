/**
 * Studio-Texte: /intern/kontakte — Kontaktliste + 360-Akte (R5 Leaf G3).
 *
 * REGEL (Alex, 27.08): Jede neue nutzerlesbare Textfläche registriert
 * ihre Texte hier unter src/lib/texte/<bereich>.ts — defaults + labels —
 * und liest sie zur Laufzeit über getContent(). So kann Alex jeden Text
 * im Studio korrigieren, ohne LLM und ohne Deployment. content.ts
 * spreadet alle Bereichsdateien in DEFAULTS/FIELD_LABELS (Orchestrator).
 *
 * NICHT hier drin: die Chronik-Typ-Badges (Lead/Mail/Deal/Notiz/Konto),
 * die sechs Deal-Status-Namen und die Quellen-Labels (Funnel/Buchung/
 * Tool/Manuell) — feste Domain-Vokabeln, exakt wie in
 * src/app/intern/page.tsx, .../leads/[id]/page.tsx und
 * .../pipeline/KanbanBoard.tsx bereits als Code-Konstante geführt, nicht
 * als Studio-Text (siehe Kommentar in src/lib/texte/intern-pipeline.ts).
 */

export const INTERN_KONTAKTE_DEFAULTS: Record<string, string> = {
  /* ── Liste ────────────────────────────────────────────────────────── */
  "intern.kontakte.eyebrow": "Intern · CRM",
  "intern.kontakte.titel": "Jeder Kontakt. Eine *Akte*.",
  "intern.kontakte.sub":
    "Alle Personen aus Funnel, Buchung und Tools an einem Ort — durchsuchbar, mit voller Historie dahinter.",

  "intern.kontakte.demo_label": "Demo-Modus",
  "intern.kontakte.demo_titel": "Diese Liste zeigt Beispiel-Kontakte.",
  "intern.kontakte.demo_text":
    "Auf diesem Deployment ist keine CRM-Datenbank angebunden. Neue Kontakte lassen sich anlegen, sobald Supabase eingerichtet ist — bis dahin bleiben Änderungen ohne Wirkung.",

  "intern.kontakte.suche_placeholder": "Name, Firma, E-Mail …",
  "intern.kontakte.neu_button": "+ Kontakt anlegen",

  "intern.kontakte.spalte_name": "Name",
  "intern.kontakte.spalte_firma": "Firma",
  "intern.kontakte.spalte_rolle": "Rolle",
  "intern.kontakte.spalte_email": "E-Mail",
  "intern.kontakte.spalte_seit": "Seit",

  "intern.kontakte.keine_treffer": "Keine Kontakte gefunden — anderer Suchbegriff?",
  "intern.kontakte.leer_text": "Noch keine Kontakte hinterlegt.",
  "intern.kontakte.leer_cta": "+ Ersten Kontakt anlegen",

  "intern.kontakte.dialog_titel": "Kontakt anlegen",
  "intern.kontakte.feld_name": "Name",
  "intern.kontakte.feld_email": "E-Mail",
  "intern.kontakte.feld_telefon": "Telefon",
  "intern.kontakte.feld_firma": "Firma",
  "intern.kontakte.feld_rolle": "Rolle",
  "intern.kontakte.dialog_speichern": "Speichern",
  "intern.kontakte.dialog_abbrechen": "Abbrechen",
  "intern.kontakte.fehler_email": "Bitte eine gültige E-Mail-Adresse angeben.",
  "intern.kontakte.fehler_schliessen": "Schließen",

  /* ── Akte ─────────────────────────────────────────────────────────── */
  "intern.kontakte.akte.zurueck": "← Zurück zu Kontakten",
  "intern.kontakte.akte.nicht_gefunden_titel": "Kein Kontakt gefunden.",
  "intern.kontakte.akte.nicht_gefunden_text":
    "Entweder stimmt die ID nicht, oder der Kontakt wurde gelöscht.",

  "intern.kontakte.akte.kontakt_seit": "Kontakt seit",
  "intern.kontakte.akte.keine_telefon": "Kein Telefon hinterlegt",
  "intern.kontakte.akte.mail_label": "E-Mail schreiben",
  "intern.kontakte.akte.tel_label": "Anrufen",

  "intern.kontakte.akte.chronik_titel": "Chronik",
  "intern.kontakte.akte.chronik_leer": "Noch keine Ereignisse für diesen Kontakt.",
  "intern.kontakte.akte.ergebnis_titel": "Rechenergebnis",
  "intern.kontakte.akte.intent_titel": "Angaben aus dem Konto-Onboarding",

  "intern.kontakte.akte.deals_titel": "Deals",
  "intern.kontakte.akte.deals_leer": "Noch keine Deals für diesen Kontakt.",
  "intern.kontakte.akte.deals_alle_link": "Zur Pipeline",

  "intern.kontakte.akte.aufgaben_titel": "Offene Aufgaben",
  "intern.kontakte.akte.aufgaben_leer": "Keine offenen Aufgaben für diesen Kontakt.",
  "intern.kontakte.akte.aufgaben_alle_link": "Alle Aufgaben",

  "intern.kontakte.akte.notiz_titel": "Schnell-Notiz",
  "intern.kontakte.akte.notiz_platzhalter": "Was ist der Stand?",
  "intern.kontakte.akte.notiz_speichern": "Notiz speichern",
  "intern.kontakte.akte.notiz_kein_lead":
    "Für diesen Kontakt gibt es noch keinen verknüpften Lead — eine Notiz lässt sich erst speichern, sobald eine Anfrage oder ein Deal existiert.",
  "intern.kontakte.akte.notiz_leer": "Bitte eine Notiz eingeben.",
};

export const INTERN_KONTAKTE_LABELS: Record<string, string> = {
  "intern.kontakte.eyebrow": "Intern · Kontakte · Eyebrow über der Überschrift",
  "intern.kontakte.titel": "Intern · Kontakte · Seitenüberschrift (*Wort* = Highlight)",
  "intern.kontakte.sub": "Intern · Kontakte · Satz unter der Überschrift",

  "intern.kontakte.demo_label": "Intern · Kontakte · Demo-Hinweis · Label der gelben Karte",
  "intern.kontakte.demo_titel": "Intern · Kontakte · Demo-Hinweis · Überschrift",
  "intern.kontakte.demo_text": "Intern · Kontakte · Demo-Hinweis · Fließtext",

  "intern.kontakte.suche_placeholder": "Intern · Kontakte · Suchfeld · Platzhalter",
  "intern.kontakte.neu_button": "Intern · Kontakte · Button „Kontakt anlegen“",

  "intern.kontakte.spalte_name": "Intern · Kontakte · Tabelle · Spalte „Name“",
  "intern.kontakte.spalte_firma": "Intern · Kontakte · Tabelle · Spalte „Firma“",
  "intern.kontakte.spalte_rolle": "Intern · Kontakte · Tabelle · Spalte „Rolle“",
  "intern.kontakte.spalte_email": "Intern · Kontakte · Tabelle · Spalte „E-Mail“",
  "intern.kontakte.spalte_seit": "Intern · Kontakte · Tabelle · Spalte „Seit“",

  "intern.kontakte.keine_treffer": "Intern · Kontakte · Leerzustand nach Suche ohne Treffer",
  "intern.kontakte.leer_text": "Intern · Kontakte · Leerzustand ganze Liste · Satz",
  "intern.kontakte.leer_cta": "Intern · Kontakte · Leerzustand ganze Liste · Button",

  "intern.kontakte.dialog_titel": "Intern · Kontakte · Dialog „Kontakt anlegen“ · Titel",
  "intern.kontakte.feld_name": "Intern · Kontakte · Dialog · Feld Name",
  "intern.kontakte.feld_email": "Intern · Kontakte · Dialog · Feld E-Mail",
  "intern.kontakte.feld_telefon": "Intern · Kontakte · Dialog · Feld Telefon",
  "intern.kontakte.feld_firma": "Intern · Kontakte · Dialog · Feld Firma",
  "intern.kontakte.feld_rolle": "Intern · Kontakte · Dialog · Feld Rolle",
  "intern.kontakte.dialog_speichern": "Intern · Kontakte · Dialog · Button Speichern",
  "intern.kontakte.dialog_abbrechen": "Intern · Kontakte · Dialog · Button Abbrechen",
  "intern.kontakte.fehler_email": "Intern · Kontakte · Fehlertext ungültige E-Mail",
  "intern.kontakte.fehler_schliessen": "Intern · Kontakte · Fehlerzeile · Button Schließen",

  "intern.kontakte.akte.zurueck": "Intern · Kontakte · Akte · Zurück-Link",
  "intern.kontakte.akte.nicht_gefunden_titel": "Intern · Kontakte · Akte · Nicht-gefunden · Titel",
  "intern.kontakte.akte.nicht_gefunden_text": "Intern · Kontakte · Akte · Nicht-gefunden · Satz",

  "intern.kontakte.akte.kontakt_seit": "Intern · Kontakte · Akte · Kopf · „Kontakt seit“-Label",
  "intern.kontakte.akte.keine_telefon": "Intern · Kontakte · Akte · Kopf · Kein Telefon hinterlegt",
  "intern.kontakte.akte.mail_label": "Intern · Kontakte · Akte · Kopf · Aria-Label Mail-Kanal",
  "intern.kontakte.akte.tel_label": "Intern · Kontakte · Akte · Kopf · Aria-Label Telefon-Kanal",

  "intern.kontakte.akte.chronik_titel": "Intern · Kontakte · Akte · Spalte „Chronik“ · Titel",
  "intern.kontakte.akte.chronik_leer": "Intern · Kontakte · Akte · Chronik · Leerzustand",
  "intern.kontakte.akte.ergebnis_titel": "Intern · Kontakte · Akte · Chronik · Rechenergebnis-Titel",
  "intern.kontakte.akte.intent_titel": "Intern · Kontakte · Akte · Chronik · Konto-Angaben-Titel",

  "intern.kontakte.akte.deals_titel": "Intern · Kontakte · Akte · Spalte „Deals“ · Titel",
  "intern.kontakte.akte.deals_leer": "Intern · Kontakte · Akte · Deals · Leerzustand",
  "intern.kontakte.akte.deals_alle_link": "Intern · Kontakte · Akte · Deals · Link zur Pipeline",

  "intern.kontakte.akte.aufgaben_titel": "Intern · Kontakte · Akte · Spalte „Aufgaben“ · Titel",
  "intern.kontakte.akte.aufgaben_leer": "Intern · Kontakte · Akte · Aufgaben · Leerzustand",
  "intern.kontakte.akte.aufgaben_alle_link": "Intern · Kontakte · Akte · Aufgaben · Link zur Aufgabenliste",

  "intern.kontakte.akte.notiz_titel": "Intern · Kontakte · Akte · Notizfeld · Titel",
  "intern.kontakte.akte.notiz_platzhalter": "Intern · Kontakte · Akte · Notizfeld · Platzhalter",
  "intern.kontakte.akte.notiz_speichern": "Intern · Kontakte · Akte · Notizfeld · Button",
  "intern.kontakte.akte.notiz_kein_lead": "Intern · Kontakte · Akte · Notizfeld · Fehler ohne Lead",
  "intern.kontakte.akte.notiz_leer": "Intern · Kontakte · Akte · Notizfeld · Fehler leere Notiz",
};
