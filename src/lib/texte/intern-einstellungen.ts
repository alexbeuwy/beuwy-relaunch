/**
 * Studio-Texte: Interne CRM-Konsole — Einstellungen (/intern/einstellungen).
 * R11b (14.09): Dummy-Daten befüllen/löschen, damit die Dashboards mit
 * Leben gefüllt sind, bevor echte Anfragen kommen.
 */

export const INTERN_EINSTELLUNGEN_DEFAULTS: Record<string, string> = {
  "intern.einstellungen.titel": "Einstellungen",
  "intern.einstellungen.sub":
    "Werkzeuge für den Betrieb der Konsole. Nichts hier verändert die öffentliche Website.",

  "intern.einstellungen.dummy.label": "Dummy-Daten",
  "intern.einstellungen.dummy.titel": "Konsole mit Beispieldaten füllen",
  "intern.einstellungen.dummy.text":
    "Legt 14 Kontakte, 22 Leads, Deals in allen Phasen, Aufgaben, vier Kundenkonten mit Tickets, Mail-Protokolle, zwei pausierte Flows und rund 4.000 Einblick-Ereignisse der letzten sechs Wochen an. Alle Beispiel-Personen tragen die Domain @muster-makler.de — so lässt sich alles rückstandslos wieder entfernen.",
  "intern.einstellungen.dummy.fuellen": "Dummy-Daten befüllen",
  "intern.einstellungen.dummy.loeschen": "Dummy-Daten löschen",
  "intern.einstellungen.dummy.hinweis":
    "Das Löschen entfernt ausschließlich die Beispiel-Datensätze. Echte Anfragen, Kontakte und Ereignisse bleiben unberührt.",
  "intern.einstellungen.dummy.stand_vorhanden": "Beispieldaten sind angelegt",
  "intern.einstellungen.dummy.stand_leer": "Keine Beispieldaten in der Konsole",

  "intern.einstellungen.ergebnis.gefuellt": "Beispieldaten angelegt.",
  "intern.einstellungen.ergebnis.geloescht": "Beispieldaten entfernt.",
  "intern.einstellungen.ergebnis.teilweise":
    "Angelegt, aber die Zeitstempel konnten nicht verteilt werden — alle Einträge tragen das heutige Datum. Bitte die Migration supabase/crm-dummy.sql in Supabase ausführen (docs/branding/ANBINDUNGEN.md, Abschnitt 7).",
  "intern.einstellungen.fehler.nicht_konfiguriert":
    "CRM ist auf diesem Deployment nicht angebunden (SUPABASE_URL, SUPABASE_ANON_KEY, CONTENT_WRITE_SECRET fehlen).",
  "intern.einstellungen.fehler.migration":
    "Die Lösch-Funktion fehlt in der Datenbank. Bitte supabase/crm-dummy.sql einmal im Supabase-SQL-Editor ausführen (docs/branding/ANBINDUNGEN.md, Abschnitt 7).",
  "intern.einstellungen.fehler.unbekannt": "Das hat nicht geklappt — bitte erneut versuchen.",
};

export const INTERN_EINSTELLUNGEN_LABELS: Record<string, string> = {
  "intern.einstellungen.titel": "Intern · Einstellungen · Seitentitel",
  "intern.einstellungen.sub": "Intern · Einstellungen · Untertitel",
  "intern.einstellungen.dummy.label": "Intern · Einstellungen · Dummy-Karte · Eyebrow",
  "intern.einstellungen.dummy.titel": "Intern · Einstellungen · Dummy-Karte · Titel",
  "intern.einstellungen.dummy.text": "Intern · Einstellungen · Dummy-Karte · Erklärung",
  "intern.einstellungen.dummy.fuellen": "Intern · Einstellungen · Knopf Befüllen",
  "intern.einstellungen.dummy.loeschen": "Intern · Einstellungen · Knopf Löschen",
  "intern.einstellungen.dummy.hinweis": "Intern · Einstellungen · Hinweis unter den Knöpfen",
  "intern.einstellungen.dummy.stand_vorhanden": "Intern · Einstellungen · Status: Beispieldaten vorhanden",
  "intern.einstellungen.dummy.stand_leer": "Intern · Einstellungen · Status: keine Beispieldaten",
  "intern.einstellungen.ergebnis.gefuellt": "Intern · Einstellungen · Meldung nach Befüllen",
  "intern.einstellungen.ergebnis.geloescht": "Intern · Einstellungen · Meldung nach Löschen",
  "intern.einstellungen.ergebnis.teilweise": "Intern · Einstellungen · Meldung: befüllt, Zeitstempel nicht verteilt",
  "intern.einstellungen.fehler.nicht_konfiguriert": "Intern · Einstellungen · Fehler: CRM nicht angebunden",
  "intern.einstellungen.fehler.migration": "Intern · Einstellungen · Fehler: SQL-Migration fehlt",
  "intern.einstellungen.fehler.unbekannt": "Intern · Einstellungen · Fehler: allgemein",
};
