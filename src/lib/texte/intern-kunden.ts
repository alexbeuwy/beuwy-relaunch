/**
 * Studio-Texte: /intern/tickets + /intern/wochenbericht (R5 Leaf G7 —
 * Tickets mit Threads + Wochenbericht-Generator).
 *
 * REGEL (Alex, 27.08): Jede neue nutzerlesbare Textfläche registriert
 * ihre Texte hier unter src/lib/texte/<bereich>.ts — defaults + labels —
 * und liest sie zur Laufzeit über getContent(). So kann Alex jeden Text
 * im Studio korrigieren, ohne LLM und ohne Deployment. content.ts
 * spreadet alle Bereichsdateien in DEFAULTS/FIELD_LABELS (Orchestrator).
 *
 * "Kunden" bündelt beide Ansichten, weil beide auf demselben Konten-
 * basierten Muster arbeiten (kein bw_konten_liste-RPC vorhanden, siehe
 * db.ts) und beide Kundenkommunikation nach außen betreffen.
 *
 * NICHT hier drin: Ticket-Status-Namen (offen/in-arbeit/erledigt, Schema-
 * Vokabular aus bw_ticket) und die Konto-Projektstufen (aufnahme/design/
 * umsetzung/livegang/betrieb, identisch zu KontoBereich.tsx) — feste
 * Domain-Vokabeln, genau wie in src/lib/texte/intern-kontakte.ts
 * begründet, nicht als Studio-Text geführt.
 */

export const INTERN_KUNDEN_DEFAULTS: Record<string, string> = {
  /* ── /intern/tickets ─────────────────────────────────────────────── */
  "intern.kunden.tickets.eyebrow": "Intern · Kunden",
  "intern.kunden.tickets.titel": "Jedes Anliegen. Eine *Antwort*.",
  "intern.kunden.tickets.sub":
    "Was ein Kunde in seinem Konto einreicht, landet hier vollständig — mit Verlauf, Antwortfeld und SLA-Blick.",

  "intern.kunden.tickets.demo_label": "Demo-Modus",
  "intern.kunden.tickets.demo_titel": "Diese Ansicht zeigt Beispiel-Tickets.",
  "intern.kunden.tickets.demo_text":
    "Auf diesem Deployment ist keine CRM-Datenbank angebunden. Antworten und Statuswechsel lassen sich testen, bleiben aber ohne Wirkung.",

  "intern.kunden.tickets.konten_titel": "Konten mit Tickets",
  "intern.kunden.tickets.konten_leer_titel": "Noch keine Tickets eingegangen.",
  "intern.kunden.tickets.konten_leer_text":
    "Sobald ein Kunde im eigenen Konto ein Anliegen einreicht, taucht es hier auf.",
  "intern.kunden.tickets.konten_leer_cta": "Zu den Kontakten",

  "intern.kunden.tickets.sla_badge": "Über 48 Std. ohne Antwort",
  "intern.kunden.tickets.sla_zeile": "Wartet seit {zeit} auf eine Antwort von beuwy.",

  "intern.kunden.tickets.status_titel": "Status",
  "intern.kunden.tickets.thread_titel": "Verlauf",
  "intern.kunden.tickets.thread_leer": "Noch keine Nachrichten in diesem Ticket.",
  "intern.kunden.tickets.antwort_titel": "Antwort schreiben",
  "intern.kunden.tickets.antwort_platzhalter": "Was ist der Stand?",
  "intern.kunden.tickets.antwort_senden": "Antwort senden",
  "intern.kunden.tickets.kein_ticket_text": "Ticket links auswählen, um den Verlauf zu sehen.",

  /* ── /intern/wochenbericht ────────────────────────────────────────── */
  "intern.kunden.wochenbericht.eyebrow": "Intern · Kunden",
  "intern.kunden.wochenbericht.titel": "Der Montag, *vorbereitet*.",
  "intern.kunden.wochenbericht.sub":
    "Projektstatus, erledigte und offene Punkte der Woche — als fertige Mail, bevor sie rausgeht.",

  "intern.kunden.wochenbericht.demo_label": "Demo-Modus",
  "intern.kunden.wochenbericht.demo_titel": "Diese Ansicht zeigt einen Beispiel-Bericht.",
  "intern.kunden.wochenbericht.demo_text":
    "Auf diesem Deployment ist keine CRM-Datenbank angebunden. Die Vorschau bleibt sichtbar, „Jetzt senden“ verschickt in diesem Modus nichts.",

  "intern.kunden.wochenbericht.konten_titel": "Kunde wählen",
  "intern.kunden.wochenbericht.konten_leer_titel": "Noch keine Kundenkonten angelegt.",
  "intern.kunden.wochenbericht.konten_leer_text":
    "Sobald ein Kunde sein Konto einrichtet, lässt sich hier ein Wochenbericht für ihn vorbereiten.",

  "intern.kunden.wochenbericht.vorschau_titel": "Vorschau der E-Mail",
  "intern.kunden.wochenbericht.projektstatus_titel": "Projektstatus",
  "intern.kunden.wochenbericht.erledigt_titel": "Diese Woche erledigt",
  "intern.kunden.wochenbericht.erledigt_leer": "Diese Woche wurde kein Anliegen abgeschlossen.",
  "intern.kunden.wochenbericht.offen_titel": "Aktuell offen",
  "intern.kunden.wochenbericht.offen_leer": "Aktuell liegen keine offenen Anliegen vor.",

  "intern.kunden.wochenbericht.notiz_label": "Persönliche Notiz",
  "intern.kunden.wochenbericht.notiz_hinweis":
    "Die Änderung für die Woche danach — in eigenen Worten, erscheint direkt in der Mail.",
  "intern.kunden.wochenbericht.notiz_platzhalter": "Was ist diese Woche besonders — für diesen Kunden persönlich?",

  "intern.kunden.wochenbericht.button_vorschau": "Vorschau aktualisieren",
  "intern.kunden.wochenbericht.button_senden": "Jetzt senden",
  "intern.kunden.wochenbericht.button_protokollieren": "Als gesendet protokollieren ohne Versand",

  "intern.kunden.wochenbericht.status_gesendet": "Wochenbericht verschickt.",
  "intern.kunden.wochenbericht.status_demo": "Als gesendet protokolliert — kein Versand in diesem Modus.",
  "intern.kunden.wochenbericht.status_fehler": "Versand fehlgeschlagen — bitte erneut versuchen.",

  "intern.kunden.wochenbericht.mail_heading": "Ihr Wochenbericht, {name}.",
  "intern.kunden.wochenbericht.mail_intro":
    "Der Überblick über die vergangene Woche — kurz und ohne Umwege.",
};

export const INTERN_KUNDEN_LABELS: Record<string, string> = {
  "intern.kunden.tickets.eyebrow": "Intern · Kunden · Tickets · Eyebrow über der Überschrift",
  "intern.kunden.tickets.titel": "Intern · Kunden · Tickets · Seitenüberschrift (*Wort* = Highlight)",
  "intern.kunden.tickets.sub": "Intern · Kunden · Tickets · Satz unter der Überschrift",

  "intern.kunden.tickets.demo_label": "Intern · Kunden · Tickets · Demo-Hinweis · Label der gelben Karte",
  "intern.kunden.tickets.demo_titel": "Intern · Kunden · Tickets · Demo-Hinweis · Überschrift",
  "intern.kunden.tickets.demo_text": "Intern · Kunden · Tickets · Demo-Hinweis · Fließtext",

  "intern.kunden.tickets.konten_titel": "Intern · Kunden · Tickets · Spaltenkopf „Konten mit Tickets“",
  "intern.kunden.tickets.konten_leer_titel": "Intern · Kunden · Tickets · Leerzustand ganze Liste · Titel",
  "intern.kunden.tickets.konten_leer_text": "Intern · Kunden · Tickets · Leerzustand ganze Liste · Satz",
  "intern.kunden.tickets.konten_leer_cta": "Intern · Kunden · Tickets · Leerzustand · Link zu Kontakten",

  "intern.kunden.tickets.sla_badge": "Intern · Kunden · Tickets · SLA-Badge · Kurztext",
  "intern.kunden.tickets.sla_zeile": "Intern · Kunden · Tickets · SLA-Hinweiszeile ({zeit} = Platzhalter, nicht entfernen)",

  "intern.kunden.tickets.status_titel": "Intern · Kunden · Tickets · Thread · Status-Spaltenkopf",
  "intern.kunden.tickets.thread_titel": "Intern · Kunden · Tickets · Thread · Spaltenkopf „Verlauf“",
  "intern.kunden.tickets.thread_leer": "Intern · Kunden · Tickets · Thread · Leerzustand",
  "intern.kunden.tickets.antwort_titel": "Intern · Kunden · Tickets · Antwortformular · Titel",
  "intern.kunden.tickets.antwort_platzhalter": "Intern · Kunden · Tickets · Antwortformular · Platzhalter",
  "intern.kunden.tickets.antwort_senden": "Intern · Kunden · Tickets · Antwortformular · Button",
  "intern.kunden.tickets.kein_ticket_text": "Intern · Kunden · Tickets · Hinweis ohne Auswahl",

  "intern.kunden.wochenbericht.eyebrow": "Intern · Kunden · Wochenbericht · Eyebrow über der Überschrift",
  "intern.kunden.wochenbericht.titel": "Intern · Kunden · Wochenbericht · Seitenüberschrift (*Wort* = Highlight)",
  "intern.kunden.wochenbericht.sub": "Intern · Kunden · Wochenbericht · Satz unter der Überschrift",

  "intern.kunden.wochenbericht.demo_label": "Intern · Kunden · Wochenbericht · Demo-Hinweis · Label der gelben Karte",
  "intern.kunden.wochenbericht.demo_titel": "Intern · Kunden · Wochenbericht · Demo-Hinweis · Überschrift",
  "intern.kunden.wochenbericht.demo_text": "Intern · Kunden · Wochenbericht · Demo-Hinweis · Fließtext",

  "intern.kunden.wochenbericht.konten_titel": "Intern · Kunden · Wochenbericht · Spaltenkopf „Kunde wählen“",
  "intern.kunden.wochenbericht.konten_leer_titel": "Intern · Kunden · Wochenbericht · Leerzustand · Titel",
  "intern.kunden.wochenbericht.konten_leer_text": "Intern · Kunden · Wochenbericht · Leerzustand · Satz",

  "intern.kunden.wochenbericht.vorschau_titel": "Intern · Kunden · Wochenbericht · Spaltenkopf „Vorschau der E-Mail“",
  "intern.kunden.wochenbericht.projektstatus_titel": "Intern · Kunden · Wochenbericht · Vorschau · Abschnitt Projektstatus",
  "intern.kunden.wochenbericht.erledigt_titel": "Intern · Kunden · Wochenbericht · Vorschau · Abschnitt „Diese Woche erledigt“",
  "intern.kunden.wochenbericht.erledigt_leer": "Intern · Kunden · Wochenbericht · Vorschau · Leerzustand erledigt",
  "intern.kunden.wochenbericht.offen_titel": "Intern · Kunden · Wochenbericht · Vorschau · Abschnitt „Aktuell offen“",
  "intern.kunden.wochenbericht.offen_leer": "Intern · Kunden · Wochenbericht · Vorschau · Leerzustand offen",

  "intern.kunden.wochenbericht.notiz_label": "Intern · Kunden · Wochenbericht · Notizfeld · Titel",
  "intern.kunden.wochenbericht.notiz_hinweis": "Intern · Kunden · Wochenbericht · Notizfeld · Erklärzeile",
  "intern.kunden.wochenbericht.notiz_platzhalter": "Intern · Kunden · Wochenbericht · Notizfeld · Platzhalter",

  "intern.kunden.wochenbericht.button_vorschau": "Intern · Kunden · Wochenbericht · Button „Vorschau aktualisieren“",
  "intern.kunden.wochenbericht.button_senden": "Intern · Kunden · Wochenbericht · Button „Jetzt senden“",
  "intern.kunden.wochenbericht.button_protokollieren": "Intern · Kunden · Wochenbericht · Button „Als gesendet protokollieren“",

  "intern.kunden.wochenbericht.status_gesendet": "Intern · Kunden · Wochenbericht · Statuszeile nach Versand",
  "intern.kunden.wochenbericht.status_demo": "Intern · Kunden · Wochenbericht · Statuszeile nach Protokollieren/Demo",
  "intern.kunden.wochenbericht.status_fehler": "Intern · Kunden · Wochenbericht · Statuszeile bei Fehler",

  "intern.kunden.wochenbericht.mail_heading": "Intern · Kunden · Wochenbericht · Mailtext · Überschrift ({name} = Platzhalter, nicht entfernen)",
  "intern.kunden.wochenbericht.mail_intro": "Intern · Kunden · Wochenbericht · Mailtext · Einleitungssatz",
};
