/**
 * Studio-Texte: Aufgaben + Termin-Erinnerungen (R5 Leaf G6,
 * src/app/intern/aufgaben/page.tsx). Die Erinnerungs-Mail selbst
 * (Cron unter src/app/api/cron/erinnerungen/route.ts) nutzt
 * mailTerminErinnerung() aus src/lib/email-vorlagen.ts — deren Copy läuft
 * über die dortigen Templates, nicht über diese Datei.
 *
 * REGEL (Alex, 27.08): Jede neue nutzerlesbare Textfläche registriert
 * ihre Texte hier unter src/lib/texte/<bereich>.ts — defaults + labels —
 * und liest sie zur Laufzeit über getContent(). So kann Alex jeden Text
 * im Studio korrigieren, ohne LLM und ohne Deployment. content.ts
 * spreadet alle Bereichsdateien in DEFAULTS/FIELD_LABELS — das Spreaden
 * selbst ist Sache des Orchestrators, nicht dieses Leafs.
 *
 * NICHT hier: dynamisch interpolierte Systemtexte ("Überfällig seit X
 * Tagen", "Morgen fällig", die aria-label-Sätze auf den Erledigt-Buttons)
 * — folgt demselben Muster wie faelligLabel()/zeitRelativ() in
 * src/app/intern/page.tsx und .../kontakte/page.tsx: reine
 * Berechnungsfunktionen, kein Studio-Text, weil sie Zahlen einsetzen statt
 * fertigen Satz zu sein.
 */

export const INTERN_AUFGABEN_DEFAULTS: Record<string, string> = {
  "intern.aufgaben.eyebrow": "Aufgaben",
  "intern.aufgaben.titel": "Nichts fällt durch.",
  "intern.aufgaben.sub": "Alle offenen Aufgaben an einem Ort — überfällig zuerst.",

  "intern.aufgaben.demo_label": "Demo-Modus",
  "intern.aufgaben.demo_titel": "Diese Ansicht zeigt Beispiel-Aufgaben.",
  "intern.aufgaben.demo_text":
    "Auf diesem Deployment ist keine CRM-Datenbank angebunden. Sobald Supabase eingerichtet ist, ersetzen echte Aufgaben die Beispiele automatisch.",

  "intern.aufgaben.neu.titel_label": "Titel",
  "intern.aufgaben.neu.titel_placeholder": "Was ist zu tun?",
  "intern.aufgaben.neu.faellig_label": "Fällig am",
  "intern.aufgaben.neu.kontakt_label": "Kontakt (optional)",
  "intern.aufgaben.neu.kontakt_placeholder": "kunde@beispiel.de",
  "intern.aufgaben.neu.button": "Aufgabe anlegen",

  "intern.aufgaben.fehler_titel": "Bitte einen Titel eingeben.",
  "intern.aufgaben.fehler_email": "Diese E-Mail-Adresse sieht nicht gültig aus.",
  "intern.aufgaben.fehler_schliessen": "Schließen",

  "intern.aufgaben.gruppe.ueberfaellig": "Überfällig",
  "intern.aufgaben.gruppe.heute_morgen": "Heute & morgen",
  "intern.aufgaben.gruppe.spaeter": "Später & ohne Datum",
  "intern.aufgaben.gruppe.erledigt": "Erledigt (letzte 7 Tage)",

  "intern.aufgaben.leer.ueberfaellig": "Keine überfälligen Aufgaben.",
  "intern.aufgaben.leer.heute_morgen": "Für heute und morgen nichts fällig.",
  "intern.aufgaben.leer.spaeter": "Keine weiteren offenen Aufgaben.",
  "intern.aufgaben.leer.erledigt": "Keine erledigten Aufgaben der letzten 7 Tage.",
  "intern.aufgaben.leer.gesamt": "Keine offenen Aufgaben — alles erledigt.",

  "intern.aufgaben.wieder_oeffnen": "Wieder öffnen",

  "intern.aufgaben.bezug.lead": "Lead",
  "intern.aufgaben.bezug.deal": "Deal",
  "intern.aufgaben.bezug.ticket": "Ticket",

  /* ── Dialog „Aufgabe anlegen" (LEAF U3) — löst die bisher permanent
     sichtbare Schnell-Anlage-Leiste ab (Button → ui/dialog, konsistent
     zu Kontakte und zum bereits bestehenden „?neu=1"-Sprungziel aus der
     CommandPalette). neu.titel_label/-placeholder, neu.faellig_label,
     neu.kontakt_label, neu.button und die fehler_*-Keys oben werden
     unverändert im Dialog weiterverwendet, nur ergänzt. */
  "intern.aufgaben.neu.trigger": "+ Aufgabe anlegen",
  "intern.aufgaben.dialog_titel": "Neue Aufgabe",
  "intern.aufgaben.dialog_beschreibung": "Titel, Fälligkeit und optional ein bestehender Kontakt.",
  "intern.aufgaben.dialog_erfolg": "Aufgabe angelegt.",
  "intern.aufgaben.dialog_fehler_allgemein": "Aufgabe konnte nicht gespeichert werden — bitte erneut versuchen.",
  "intern.aufgaben.neu.kontakt_kein": "Kein Kontakt",
  "intern.aufgaben.neu.kontakt_select_placeholder": "Kontakt wählen (optional)",
  "intern.aufgaben.dialog_abbrechen": "Abbrechen",
  "intern.aufgaben.check_fehler": "Aufgabe konnte nicht als erledigt markiert werden.",
};

export const INTERN_AUFGABEN_LABELS: Record<string, string> = {
  "intern.aufgaben.eyebrow": "Intern · Aufgaben · Eyebrow",
  "intern.aufgaben.titel": "Intern · Aufgaben · Seitentitel",
  "intern.aufgaben.sub": "Intern · Aufgaben · Unterzeile",

  "intern.aufgaben.demo_label": "Intern · Aufgaben · Demo-Hinweis · Pille",
  "intern.aufgaben.demo_titel": "Intern · Aufgaben · Demo-Hinweis · Überschrift",
  "intern.aufgaben.demo_text": "Intern · Aufgaben · Demo-Hinweis · Erklärtext",

  "intern.aufgaben.neu.titel_label": "Intern · Aufgaben · Schnell-Anlage · Feld „Titel“",
  "intern.aufgaben.neu.titel_placeholder": "Intern · Aufgaben · Schnell-Anlage · Platzhalter „Titel“",
  "intern.aufgaben.neu.faellig_label": "Intern · Aufgaben · Schnell-Anlage · Feld „Fällig am“",
  "intern.aufgaben.neu.kontakt_label": "Intern · Aufgaben · Schnell-Anlage · Feld „Kontakt“",
  "intern.aufgaben.neu.kontakt_placeholder": "Intern · Aufgaben · Schnell-Anlage · Platzhalter „Kontakt“",
  "intern.aufgaben.neu.button": "Intern · Aufgaben · Schnell-Anlage · Button",

  "intern.aufgaben.fehler_titel": "Intern · Aufgaben · Fehlertext „Titel fehlt“",
  "intern.aufgaben.fehler_email": "Intern · Aufgaben · Fehlertext „E-Mail ungültig“",
  "intern.aufgaben.fehler_schliessen": "Intern · Aufgaben · Fehler-Leiste · Schließen-Link",

  "intern.aufgaben.gruppe.ueberfaellig": "Intern · Aufgaben · Gruppen-Titel „Überfällig“",
  "intern.aufgaben.gruppe.heute_morgen": "Intern · Aufgaben · Gruppen-Titel „Heute & morgen“",
  "intern.aufgaben.gruppe.spaeter": "Intern · Aufgaben · Gruppen-Titel „Später & ohne Datum“",
  "intern.aufgaben.gruppe.erledigt": "Intern · Aufgaben · Gruppen-Titel „Erledigt“",

  "intern.aufgaben.leer.ueberfaellig": "Intern · Aufgaben · Leerzustand „Überfällig“",
  "intern.aufgaben.leer.heute_morgen": "Intern · Aufgaben · Leerzustand „Heute & morgen“",
  "intern.aufgaben.leer.spaeter": "Intern · Aufgaben · Leerzustand „Später“",
  "intern.aufgaben.leer.erledigt": "Intern · Aufgaben · Leerzustand „Erledigt“",
  "intern.aufgaben.leer.gesamt": "Intern · Aufgaben · Leerzustand, wenn gar nichts offen ist",

  "intern.aufgaben.wieder_oeffnen": "Intern · Aufgaben · Button-Titel „Wieder öffnen“",

  "intern.aufgaben.bezug.lead": "Intern · Aufgaben · Bezugs-Badge „Lead“",
  "intern.aufgaben.bezug.deal": "Intern · Aufgaben · Bezugs-Badge „Deal“",
  "intern.aufgaben.bezug.ticket": "Intern · Aufgaben · Bezugs-Badge „Ticket“",

  "intern.aufgaben.neu.trigger": "Intern · Aufgaben · Button „+ Aufgabe anlegen“ (öffnet Dialog)",
  "intern.aufgaben.dialog_titel": "Intern · Aufgaben · Dialog „Aufgabe anlegen“ · Titel",
  "intern.aufgaben.dialog_beschreibung": "Intern · Aufgaben · Dialog · Beschreibung",
  "intern.aufgaben.dialog_erfolg": "Intern · Aufgaben · Dialog · Toast nach Erfolg",
  "intern.aufgaben.dialog_fehler_allgemein": "Intern · Aufgaben · Dialog · Toast bei allgemeinem Fehler",
  "intern.aufgaben.neu.kontakt_kein": "Intern · Aufgaben · Dialog · Select-Option „Kein Kontakt“",
  "intern.aufgaben.neu.kontakt_select_placeholder": "Intern · Aufgaben · Dialog · Select-Platzhalter „Kontakt“",
  "intern.aufgaben.dialog_abbrechen": "Intern · Aufgaben · Dialog · Button Abbrechen",
  "intern.aufgaben.check_fehler": "Intern · Aufgaben · Toast bei Fehler beim Abhaken",
};
