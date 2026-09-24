/**
 * Studio-Texte: /intern/flows — E-Mail-Flow-Builder (R5 Leaf G4) + die
 * öffentliche Abmelde-Seite /abmelden, die zum selben Leaf gehört (jede
 * Flow-Mail verlinkt dorthin).
 *
 * REGEL (Alex, 27.08): Jede neue nutzerlesbare Textfläche registriert
 * ihre Texte hier unter src/lib/texte/<bereich>.ts — defaults + labels —
 * und liest sie zur Laufzeit über getContent(). So kann Alex jeden Text
 * im Studio korrigieren, ohne LLM und ohne Deployment. content.ts
 * spreadet alle Bereichsdateien in DEFAULTS/FIELD_LABELS (Orchestrator).
 *
 * NICHT hier drin: die Auslöser-/Status-/Schritt-Typ-Codes selbst (feste
 * Domain-Vokabeln in FlowEditor.tsx) — nur die deutschen Anzeige-Labels
 * dafür, exakt wie INTERN_PIPELINE_DEFAULTS es für Status/Verlust-Gründe
 * vormacht.
 */

export const INTERN_FLOWS_DEFAULTS: Record<string, string> = {
  /* ── Übersicht ──────────────────────────────────────────────────── */
  "intern.flows.eyebrow": "Intern · CRM",
  "intern.flows.titel": "*Flows*, die von selbst nachfassen.",
  "intern.flows.sub":
    "Trigger, Wartezeit, Mail, Bedingung — einmal gebaut, danach läuft der Cron es zuverlässig ab.",

  "intern.flows.demo_label": "Demo-Modus",
  "intern.flows.demo_titel": "Diese Ansicht zeigt Beispiel-Flows.",
  "intern.flows.demo_text":
    "Auf diesem Deployment ist keine CRM-Datenbank angebunden. Der Editor bleibt bedienbar, Änderungen speichern aber nur im Browser — sobald Supabase eingerichtet ist, übernehmen echte Flows automatisch.",

  "intern.flows.neu_button": "+ Flow anlegen",
  "intern.flows.liste_leer_text": "Noch kein Flow angelegt — nichts fasst automatisch nach.",
  "intern.flows.liste_leer_cta": "+ Ersten Flow anlegen",

  "intern.flows.laeufe_label": "laufend",
  "intern.flows.karte_schritte_leer": "Noch keine Schritte",
  "intern.flows.karte_bearbeiten": "Bearbeiten",

  "intern.flows.status_entwurf": "Entwurf",
  "intern.flows.status_aktiv": "Aktiv",
  "intern.flows.status_pausiert": "Pausiert",

  "intern.flows.ausloeser_lead_neu": "Lead erstellt",
  "intern.flows.ausloeser_tool_lead": "Tool-Lead",
  "intern.flows.ausloeser_booking": "Terminbuchung",
  "intern.flows.ausloeser_konto_neu": "Konto erstellt",
  "intern.flows.ausloeser_manuell": "Manueller Start",

  "intern.flows.fehler_speichern": "Konnte nicht gespeichert werden — bitte erneut versuchen.",
  "intern.flows.fehler_schliessen": "Schließen",

  /* ── Editor ─────────────────────────────────────────────────────── */
  "intern.flows.editor_neu_titel": "Neuer Flow",
  "intern.flows.zurueck_button": "← Zur Übersicht",
  "intern.flows.feld_name": "Name",
  "intern.flows.feld_name_platzhalter": "z. B. Nachfass nach Erstanfrage",
  "intern.flows.feld_ausloeser": "Auslöser",
  "intern.flows.speichern_button": "Flow speichern",
  "intern.flows.abbrechen_button": "Verwerfen",

  "intern.flows.fehler_name_leer": "Bitte einen Namen für den Flow angeben.",
  "intern.flows.fehler_kein_schritt": "Bitte mindestens einen Schritt hinzufügen.",
  "intern.flows.fehler_mail_unvollstaendig": "Bitte Betreff und Text ausfüllen oder eine Vorlage wählen.",

  "intern.flows.kette_leer_text": "Noch keine Schritte — mit „+“ den ersten hinzufügen.",
  "intern.flows.schritt_hinzufuegen_label": "Schritt hinzufügen",
  "intern.flows.schritt_typ_mail": "Mail",
  "intern.flows.schritt_typ_warten": "Warten",
  "intern.flows.schritt_typ_bedingung": "Bedingung",
  "intern.flows.schritt_typ_platzhalter": "Schritt-Typ wählen",
  "intern.flows.schritt_zusammenfassung_ohne_betreff": "Ohne Betreff",

  "intern.flows.schritt_hoch_label": "Nach oben verschieben",
  "intern.flows.schritt_runter_label": "Nach unten verschieben",
  "intern.flows.schritt_bearbeiten_button": "Schritt bearbeiten",
  "intern.flows.schritt_entfernen_label": "Entfernen",
  "intern.flows.schritt_entfernen_bestaetigen": "Wirklich entfernen?",
  "intern.flows.schritt_entfernen_ja": "Ja, entfernen",
  "intern.flows.schritt_entfernen_nein": "Abbrechen",

  "intern.flows.schritt_dialog_titel": "Schritt bearbeiten",
  "intern.flows.schritt_dialog_speichern": "Übernehmen",
  "intern.flows.schritt_dialog_abbrechen": "Abbrechen",

  "intern.flows.dialog_neu_titel": "Neuer Flow",
  "intern.flows.dialog_weiter": "Weiter zu den Schritten",
  "intern.flows.dialog_abbrechen": "Abbrechen",

  "intern.flows.mail_modus_vorlage": "Vorlage",
  "intern.flows.mail_modus_frei": "Freitext",
  "intern.flows.mail_vorlage_label": "Vorlage",
  "intern.flows.mail_vorlage_hinweis":
    "Nur „Nachfass“ braucht ausschließlich den Namen und ist für jeden Kontakt vollständig. Die übrigen Vorlagen füllen fehlende Angaben (Termin, Tool-Ergebnis, Code) beim Versand mit Platzhaltern.",
  "intern.flows.mail_betreff_label": "Betreff",
  "intern.flows.mail_betreff_platzhalter": "Betreff der E-Mail",
  "intern.flows.mail_text_label": "Text",
  "intern.flows.mail_text_platzhalter": "Ein Absatz je Leerzeile. Kurz, Sie-Form, ohne Floskeln.",
  "intern.flows.mail_vorschau_label": "Vorschau",
  "intern.flows.mail_tab_vorschau": "Vorschau",
  "intern.flows.mail_tab_rohtext": "Rohtext",

  "intern.flows.vorlage_funnel_bestaetigung": "Funnel-Bestätigung",
  "intern.flows.vorlage_termin_bestaetigung": "Termin-Bestätigung",
  "intern.flows.vorlage_termin_erinnerung": "Termin-Erinnerung",
  "intern.flows.vorlage_nachfass": "Nachfass",
  "intern.flows.vorlage_tool_ergebnis": "Tool-Ergebnis",
  "intern.flows.vorlage_konto_code": "Konto-Anmeldecode",

  "intern.flows.warten_label": "Wartezeit",
  "intern.flows.warten_1h": "1 Std.",
  "intern.flows.warten_4h": "4 Std.",
  "intern.flows.warten_1t": "1 Tag",
  "intern.flows.warten_3t": "3 Tage",
  "intern.flows.warten_1w": "1 Woche",

  "intern.flows.bedingung_feld_label": "Feld",
  "intern.flows.bedingung_feld_status": "Status",
  "intern.flows.bedingung_wert_label": "Wert",
  "intern.flows.bedingung_hinweis": "Passt der Wert nicht, endet der Flow an dieser Stelle.",

  /* ── /abmelden (öffentliche Seite, gleiches Leaf) ──────────────────── */
  "abmelden.eyebrow": "beuwy",
  "abmelden.titel": "Keine automatischen E-Mails mehr erhalten.",
  "abmelden.text":
    "Ein Klick genügt — danach verschickt beuwy keine automatischen Nachfass-Mails mehr an Sie. Persönliche Antworten auf laufende Anfragen sind davon nicht betroffen.",
  "abmelden.button": "Automatische E-Mails abbestellen",
  "abmelden.erfolg_titel": "Erledigt.",
  "abmelden.erfolg_text": "Sie erhalten keine automatischen E-Mails mehr von uns.",
  "abmelden.fehler_text": "Das hat gerade nicht geklappt — bitte laden Sie die Seite neu und versuchen es erneut.",
  "abmelden.ungueltig_text": "Dieser Abmelde-Link ist unvollständig oder ungültig.",
};

export const INTERN_FLOWS_LABELS: Record<string, string> = {
  "intern.flows.eyebrow": "Intern · Flows · Eyebrow über der Überschrift",
  "intern.flows.titel": "Intern · Flows · Seitenüberschrift (*Wort* = Highlight)",
  "intern.flows.sub": "Intern · Flows · Satz unter der Überschrift",

  "intern.flows.demo_label": "Intern · Flows · Demo-Hinweis · Label der gelben Karte",
  "intern.flows.demo_titel": "Intern · Flows · Demo-Hinweis · Überschrift",
  "intern.flows.demo_text": "Intern · Flows · Demo-Hinweis · Fließtext",

  "intern.flows.neu_button": "Intern · Flows · Button „Flow anlegen“",
  "intern.flows.liste_leer_text": "Intern · Flows · Leerzustand Übersicht · Satz",
  "intern.flows.liste_leer_cta": "Intern · Flows · Leerzustand Übersicht · Button",

  "intern.flows.laeufe_label": "Intern · Flows · Karte · Anhängsel hinter der Läufe-Zahl",
  "intern.flows.karte_schritte_leer": "Intern · Flows · Karte · Schritt-Vorschau ohne Schritte",
  "intern.flows.karte_bearbeiten": "Intern · Flows · Karte · Link „Bearbeiten“",

  "intern.flows.status_entwurf": "Intern · Flows · Status „Entwurf“",
  "intern.flows.status_aktiv": "Intern · Flows · Status „Aktiv“",
  "intern.flows.status_pausiert": "Intern · Flows · Status „Pausiert“",

  "intern.flows.ausloeser_lead_neu": "Intern · Flows · Auslöser „Lead erstellt“",
  "intern.flows.ausloeser_tool_lead": "Intern · Flows · Auslöser „Tool-Lead“",
  "intern.flows.ausloeser_booking": "Intern · Flows · Auslöser „Terminbuchung“",
  "intern.flows.ausloeser_konto_neu": "Intern · Flows · Auslöser „Konto erstellt“",
  "intern.flows.ausloeser_manuell": "Intern · Flows · Auslöser „Manueller Start“",

  "intern.flows.fehler_speichern": "Intern · Flows · Fehlertext Speichern fehlgeschlagen",
  "intern.flows.fehler_schliessen": "Intern · Flows · Fehlerzeile · Button Schließen",

  "intern.flows.editor_neu_titel": "Intern · Flows · Editor · Titel für neuen Flow",
  "intern.flows.zurueck_button": "Intern · Flows · Editor · Link zurück zur Übersicht",
  "intern.flows.feld_name": "Intern · Flows · Editor · Feld Name",
  "intern.flows.feld_name_platzhalter": "Intern · Flows · Editor · Feld Name · Platzhalter",
  "intern.flows.feld_ausloeser": "Intern · Flows · Editor · Feld Auslöser",
  "intern.flows.speichern_button": "Intern · Flows · Editor · Button Speichern",
  "intern.flows.abbrechen_button": "Intern · Flows · Editor · Button Verwerfen",

  "intern.flows.fehler_name_leer": "Intern · Flows · Editor · Fehlertext leerer Name",
  "intern.flows.fehler_kein_schritt": "Intern · Flows · Editor · Fehlertext kein Schritt",
  "intern.flows.fehler_mail_unvollstaendig": "Intern · Flows · Editor · Fehlertext unvollständige Mail",

  "intern.flows.kette_leer_text": "Intern · Flows · Editor · Leerzustand Schritt-Kette",
  "intern.flows.schritt_hinzufuegen_label": "Intern · Flows · Editor · Aria-Label „Schritt hinzufügen“",
  "intern.flows.schritt_typ_mail": "Intern · Flows · Editor · Schritt-Typ „Mail“",
  "intern.flows.schritt_typ_warten": "Intern · Flows · Editor · Schritt-Typ „Warten“",
  "intern.flows.schritt_typ_bedingung": "Intern · Flows · Editor · Schritt-Typ „Bedingung“",
  "intern.flows.schritt_typ_platzhalter": "Intern · Flows · Editor · „+“-Einfüger · Auswahl-Platzhalter",
  "intern.flows.schritt_zusammenfassung_ohne_betreff": "Intern · Flows · Editor · Karten-Zusammenfassung ohne Betreff",

  "intern.flows.schritt_hoch_label": "Intern · Flows · Editor · Aria-Label „Nach oben“",
  "intern.flows.schritt_runter_label": "Intern · Flows · Editor · Aria-Label „Nach unten“",
  "intern.flows.schritt_bearbeiten_button": "Intern · Flows · Editor · Aria-Label „Schritt bearbeiten“",
  "intern.flows.schritt_entfernen_label": "Intern · Flows · Editor · Button „Entfernen“",
  "intern.flows.schritt_entfernen_bestaetigen": "Intern · Flows · Editor · Zwei-Klick-Bestätigung · Frage",
  "intern.flows.schritt_entfernen_ja": "Intern · Flows · Editor · Zwei-Klick-Bestätigung · Ja",
  "intern.flows.schritt_entfernen_nein": "Intern · Flows · Editor · Zwei-Klick-Bestätigung · Abbrechen",

  "intern.flows.schritt_dialog_titel": "Intern · Flows · Editor · Schritt-Dialog · Titel",
  "intern.flows.schritt_dialog_speichern": "Intern · Flows · Editor · Schritt-Dialog · Button „Übernehmen“",
  "intern.flows.schritt_dialog_abbrechen": "Intern · Flows · Editor · Schritt-Dialog · Button „Abbrechen“",

  "intern.flows.dialog_neu_titel": "Intern · Flows · Übersicht · Neu-Dialog · Titel",
  "intern.flows.dialog_weiter": "Intern · Flows · Übersicht · Neu-Dialog · Button „Weiter“",
  "intern.flows.dialog_abbrechen": "Intern · Flows · Übersicht · Neu-Dialog · Button „Abbrechen“",

  "intern.flows.mail_modus_vorlage": "Intern · Flows · Editor · Mail-Modus „Vorlage“",
  "intern.flows.mail_modus_frei": "Intern · Flows · Editor · Mail-Modus „Freitext“",
  "intern.flows.mail_vorlage_label": "Intern · Flows · Editor · Feld Vorlagen-Auswahl",
  "intern.flows.mail_vorlage_hinweis": "Intern · Flows · Editor · Hinweis unter der Vorlagen-Auswahl",
  "intern.flows.mail_betreff_label": "Intern · Flows · Editor · Feld Betreff",
  "intern.flows.mail_betreff_platzhalter": "Intern · Flows · Editor · Feld Betreff · Platzhalter",
  "intern.flows.mail_text_label": "Intern · Flows · Editor · Feld Text",
  "intern.flows.mail_text_platzhalter": "Intern · Flows · Editor · Feld Text · Platzhalter",
  "intern.flows.mail_vorschau_label": "Intern · Flows · Editor · Überschrift Live-Vorschau",
  "intern.flows.mail_tab_vorschau": "Intern · Flows · Editor · Vorschau-Tab „Vorschau“",
  "intern.flows.mail_tab_rohtext": "Intern · Flows · Editor · Vorschau-Tab „Rohtext“",

  "intern.flows.vorlage_funnel_bestaetigung": "Intern · Flows · Vorlagen-Name „Funnel-Bestätigung“",
  "intern.flows.vorlage_termin_bestaetigung": "Intern · Flows · Vorlagen-Name „Termin-Bestätigung“",
  "intern.flows.vorlage_termin_erinnerung": "Intern · Flows · Vorlagen-Name „Termin-Erinnerung“",
  "intern.flows.vorlage_nachfass": "Intern · Flows · Vorlagen-Name „Nachfass“",
  "intern.flows.vorlage_tool_ergebnis": "Intern · Flows · Vorlagen-Name „Tool-Ergebnis“",
  "intern.flows.vorlage_konto_code": "Intern · Flows · Vorlagen-Name „Konto-Anmeldecode“",

  "intern.flows.warten_label": "Intern · Flows · Editor · Beschriftung Wartezeit-Pillen",
  "intern.flows.warten_1h": "Intern · Flows · Editor · Wartezeit-Pille „1 Std.“",
  "intern.flows.warten_4h": "Intern · Flows · Editor · Wartezeit-Pille „4 Std.“",
  "intern.flows.warten_1t": "Intern · Flows · Editor · Wartezeit-Pille „1 Tag“",
  "intern.flows.warten_3t": "Intern · Flows · Editor · Wartezeit-Pille „3 Tage“",
  "intern.flows.warten_1w": "Intern · Flows · Editor · Wartezeit-Pille „1 Woche“",

  "intern.flows.bedingung_feld_label": "Intern · Flows · Editor · Feld „Feld“ (Bedingung)",
  "intern.flows.bedingung_feld_status": "Intern · Flows · Editor · Bedingungs-Feld „Status“",
  "intern.flows.bedingung_wert_label": "Intern · Flows · Editor · Feld „Wert“ (Bedingung)",
  "intern.flows.bedingung_hinweis": "Intern · Flows · Editor · Hinweistext Bedingung",

  "abmelden.eyebrow": "Abmelden · Eyebrow über der Überschrift",
  "abmelden.titel": "Abmelden · Überschrift",
  "abmelden.text": "Abmelden · Fließtext",
  "abmelden.button": "Abmelden · Button",
  "abmelden.erfolg_titel": "Abmelden · Erfolgs-Überschrift",
  "abmelden.erfolg_text": "Abmelden · Erfolgs-Text",
  "abmelden.fehler_text": "Abmelden · Fehlertext bei fehlgeschlagenem Versuch",
  "abmelden.ungueltig_text": "Abmelden · Text bei fehlendem/ungültigem Link-Parameter",
};
