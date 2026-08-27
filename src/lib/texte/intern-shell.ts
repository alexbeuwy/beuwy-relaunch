/**
 * Studio-Texte: Interne CRM-Konsole — Shell + Dashboard/„Tageskommando"
 * (R5 Leaf G1, src/app/intern/layout.tsx + src/app/intern/page.tsx).
 *
 * REGEL (Alex, 27.08): Jede neue nutzerlesbare Textfläche registriert
 * ihre Texte hier unter src/lib/texte/<bereich>.ts — defaults + labels —
 * und liest sie zur Laufzeit über getContent(). So kann Alex jeden Text
 * im Studio korrigieren, ohne LLM und ohne Deployment. content.ts
 * spreadet alle Bereichsdateien in DEFAULTS/FIELD_LABELS — das Spreaden
 * selbst ist Sache des Orchestrators, nicht dieses Leafs.
 *
 * NICHT hier: die Navigationsbeschriftungen der Sidebar (Heute, Pipeline,
 * Kontakte, …) — das ist Struktur/IA, kein editierbarer Fließtext, und
 * folgt damit demselben Muster wie die alten TABS-Labels im Vor-Umbau-
 * Layout (ebenfalls hart im Code).
 */

export const INTERN_SHELL_DEFAULTS: Record<string, string> = {
  "intern.shell.kpi.neue_leads": "Neue Leads",
  "intern.shell.kpi.leads_woche": "Leads diese Woche",
  "intern.shell.kpi.deal_wert": "Offener Deal-Wert",
  "intern.shell.kpi.tickets_offen": "Offene Tickets",

  "intern.shell.aufgaben.titel": "Fällige Aufgaben",
  "intern.shell.aufgaben.leer": "Keine Aufgaben fällig — schöner Vormittag.",
  "intern.shell.aufgaben.alle_link": "Alle Aufgaben ansehen",

  "intern.shell.leads.titel": "Zuletzt eingegangen",
  "intern.shell.leads.leer": "Noch keine Leads eingegangen.",
  "intern.shell.leads.leer_aktion": "Zur Pipeline",
  "intern.shell.leads.alle_link": "Zur Pipeline",

  "intern.shell.laeuft.titel": "Läuft gerade",
  "intern.shell.laeuft.link": "Flows ansehen",

  "intern.shell.demo.label": "Demo-Modus",
  "intern.shell.demo.titel": "Diese Ansicht zeigt Beispieldaten.",
  "intern.shell.demo.text":
    "Auf diesem Deployment ist keine CRM-Datenbank angebunden. Sobald Supabase eingerichtet ist, ersetzen echte Zahlen, Aufgaben und Leads die Beispiele automatisch.",
};

export const INTERN_SHELL_LABELS: Record<string, string> = {
  "intern.shell.kpi.neue_leads": "Intern · Dashboard · Kachel 1 · Beschriftung",
  "intern.shell.kpi.leads_woche": "Intern · Dashboard · Kachel 2 · Beschriftung",
  "intern.shell.kpi.deal_wert": "Intern · Dashboard · Kachel 3 · Beschriftung",
  "intern.shell.kpi.tickets_offen": "Intern · Dashboard · Kachel 4 · Beschriftung",

  "intern.shell.aufgaben.titel": "Intern · Dashboard · Panel-Titel „Fällige Aufgaben“",
  "intern.shell.aufgaben.leer": "Intern · Dashboard · Leerzustand-Satz Aufgaben",
  "intern.shell.aufgaben.alle_link": "Intern · Dashboard · Link-Text zur Aufgaben-Seite",

  "intern.shell.leads.titel": "Intern · Dashboard · Panel-Titel „Zuletzt eingegangen“",
  "intern.shell.leads.leer": "Intern · Dashboard · Leerzustand-Satz Leads",
  "intern.shell.leads.leer_aktion": "Intern · Dashboard · Leerzustand-Aktion Leads",
  "intern.shell.leads.alle_link": "Intern · Dashboard · Link-Text zur Pipeline",

  "intern.shell.laeuft.titel": "Intern · Dashboard · „Läuft gerade“-Zeile · Label",
  "intern.shell.laeuft.link": "Intern · Dashboard · „Läuft gerade“-Zeile · Link-Text",

  "intern.shell.demo.label": "Intern · Demo-Hinweis · Pille",
  "intern.shell.demo.titel": "Intern · Demo-Hinweis · Überschrift",
  "intern.shell.demo.text": "Intern · Demo-Hinweis · Erklärtext",
};
