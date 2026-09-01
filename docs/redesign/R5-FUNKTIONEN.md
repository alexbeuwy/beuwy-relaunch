# R5 — CRM-Funktionskatalog

Referenzklasse: Attio/HubSpot/Pipedrive/Close-Niveau an Durchdachtheit,
aber dimensioniert auf Alex' realen Betrieb — ein Mensch, wenige,
hochwertige Beratungsmandate (4–5-stellig), Leads aus eigenem Funnel/
Booking/drei Rechnern, Kunden mit zwei konkreten Markenversprechen aus
der Website: einem Ticketsystem und einem Wochenbericht. Dieses CRM
muss beide Versprechen tatsächlich einlösen, nicht nur eine Karte dafür
zeigen (`/konto` zeigt das Wochenbericht-Versprechen heute bereits als
Text — ohne Engine dahinter, siehe Modul 8).

**Heutiger Stand** (gelesen: `src/app/intern/`, `src/lib/crm/db.ts`,
`supabase/crm-schema.sql`): ein Kanban ohne Drag & Drop und ohne
Euro-Wert, ein Lead-Detail mit Rohdaten-Liste, eine Mail-Vorlagen-
Vorschau ohne Versand-Engine, sieben `bw_`-Tabellen (`bw_lead`,
`bw_lead_event`, `bw_lead_notiz`, `bw_mail_log`, `bw_konto`,
`bw_konto_code`, `bw_ticket`). Zugriff ausschließlich über
SECURITY-DEFINER-RPCs mit `CONTENT_WRITE_SECRET`, fail-open ohne Env.
Jedes neue Modul unten hält sich an dasselbe Muster: Präfix `bw_`,
RPC-Zugriff über `src/lib/crm/db.ts`, ehrlicher Demo-Modus ohne DB.

**Drei Funde beim Lesen, die die Priorisierung unten mit erklären:**

1. Die vier Vorquali-Antworten aus `/anfrage` (Rolle, Abschlüsse/Jahr,
   Fokus, Zeithorizont — `AnfrageFunnel.tsx` Z. 109–115) laufen heute
   als Fließtext ins `nachricht`-Feld von `/api/booking`, nicht
   strukturiert in `daten`. Für ein durchsuchbares/filterbares CRM
   gehören sie in `daten` — siehe Modul 3.
2. `mailTerminErinnerung` existiert als Vorlage und taucht in der
   Mail-Vorschau auf, wird aber nirgends tatsächlich ausgelöst — kein
   Cron, kein Trigger. Reine Vorlage ohne Engine. Siehe Modul 6.
3. Drei Lead-Quellen (Funnel, Booking, Tool) legen bei jeder Einreichung
   einen neuen `bw_lead` an, ohne auf dieselbe E-Mail-Adresse zu prüfen
   — dieselbe Person kann als drei unverbundene Karten im Board landen.
   Siehe Modul 3 (Dedup/Merge).

---

## 1. Dashboard / Home — „Tageskommando"

**Zweck:** Ein Blick beim ersten Kaffee zeigt, was heute Aufmerksamkeit
braucht, ohne durch fünf Module zu klicken.

**Funktionen:**
- [ ] „Heute"-Liste: fällige Aufgaben, heutige Termine, Tickets ohne
      Antwort über SLA-Schwelle
- [ ] Neue Leads seit letztem Login, score-sortiert, hoher Score mit
      „sofort reagieren"-Badge
- [ ] Pipeline-Kennzahlen-Kacheln: offener Deal-Wert, gewichteter
      Forecast (Wert × Abschlusswahrscheinlichkeit je Phase), gewonnen
      diesen Monat, Ø Sales-Cycle-Dauer
- [ ] Kapazitäts-Ampel (aus Modul 14: frei / fast voll / voll)
- [ ] Flow-Gesundheit: laufende Sequenzen, Fehler aus dem letzten
      Cron-Lauf (Modul 4)
- [ ] Globaler Aktivitäts-Feed: die letzten Ereignisse über alle
      Kontakte hinweg (Mini-Timeline)
- [ ] Schnellzugriff: „+ Lead anlegen", „+ Aufgabe", Cmd+K sichtbar
      verankert

**Datenbasis:** bestehend `bw_lead`/`leadsListe`. NEU: liest aus
`bw_aufgabe`, `bw_termin`, `bw_deal`, `bw_ticket` (Module 2, 6, 7, 9) —
kein eigenes Tabellen-Objekt, eine bündelnde RPC
`bw_tageskommando_uebersicht()`. Eine schmale v0-Version läuft schon
mit den heutigen Tabellen, wird aber erst mit Modul 2/6/9 vollständig.

**Priorität:** P1

---

## 2. Pipeline — Kanban mit Deal-Wert und Verlust-Gründen

**Zweck:** Alle offenen Chancen auf einen Blick, verschiebbar, mit
echtem Euro-Wert statt nur einem Status-Label.

**Funktionen:**
- [ ] Drag & Drop zwischen den sechs bestehenden Spalten (neu →
      kontaktiert → termin → angebot → kunde → verloren), optimistisches
      UI-Update, Drop löst Status-Änderung serverseitig aus
- [ ] Deal-Wert pro Karte (€), direkt editierbar, Paket-Tag (Marke /
      Website / E-Mail & Nachfassen / Automatisierung / Kombipaket —
      spiegelt die FOKUS-Optionen aus dem Anfrage-Funnel)
- [ ] Kopf-Kennzahl: gewichteter Pipeline-Wert (Wert × Wahrscheinlichkeit
      je Phase)
- [ ] Pflichtfeld beim Verschieben nach „Verloren": Verlust-Grund aus
      fester Liste (zu teuer, falscher Zeitpunkt, Konkurrenz gewählt,
      kein Kontakt mehr erreicht, kein Budget, Inhouse-Lösung, Sonstiges)
      plus Freitext-Notiz
- [ ] „Seit X Tagen in dieser Spalte" je Karte, rote Markierung ab
      Schwelle (Stau-Warnung, analog zur Schwellen-Logik in
      `docs/branding/KPI-LOGIK.md`)
- [ ] Filter/Sortierung nach Quelle, Score, Wert, Alter
- [ ] Mehrfach-Deals je Kontakt: ein bestehender Kunde kann ein
      Erweiterungsmandat als neuen Deal bekommen, ohne den
      Kontakt-Verlauf zu verlieren
- [ ] Übergang „Angebot" → „Kunde" legt automatisch `bw_konto` an und
      verschickt den Login-Code (heute nur lose über `lead_id`
      verknüpft, nicht automatisiert)
- [ ] Optional P2: zusätzliche Zwischenphase „Verhandlung" zwischen
      Angebot und Kunde

**Datenbasis:** bestehend `bw_lead`, `bw_lead_status_setzen`,
`leadsListe`. NEU: `bw_deal` (id, lead_id, konto_id nullable, titel,
paket, wert_cent, waehrung, wahrscheinlichkeit_pct, phase,
erwartetes_abschlussdatum, verloren_grund, verloren_notiz, gewonnen_am,
verloren_am, erstellt, aktualisiert) + RPCs `bw_deal_anlegen`,
`bw_deal_aktualisieren`, `bw_deal_verloren`, `bw_deal_gewonnen`,
`bw_deals_liste`, `bw_pipeline_kpis`. Pragmatische Alternative ohne
neue Tabelle: `wert_cent`/`verloren_grund`/`wahrscheinlichkeit_pct`
direkt als Spalten auf `bw_lead` — schneller umzusetzen, aber kein
sauberes Mehrfach-Deal-pro-Kontakt.

**Priorität:** P1

---

## 3. Kontakte / Konten-360

**Zweck:** Alles zu einer Person oder Firma an einem Ort — Leads,
Deals, Rechenergebnisse, Intent-Antworten, Tickets, Mails, Termine,
Notizen —, damit vor jedem Gespräch kein Kontext fehlt.

**Funktionen:**
- [ ] Kopfbereich: Name, Firma, Kontaktdaten, Lifecycle-Stage
      (Lead/Kunde/Ehemalig), Score, freie Tags
- [ ] Tool-Auswertungen als eigene, lesbare Karte statt Rohdaten-Liste:
      `lead.daten.eingaben`/`ergebnis` aus `/api/tool-lead` strukturiert
      geparst (Orientierungswert, Preis/m², Vergleichsobjekte etc.) statt
      der generischen `DatenListe`-Darstellung von heute
- [ ] Intent-Onboarding-Antworten (`bw_konto.daten` — Rolle, Ziele,
      Teamgröße) sichtbar, sobald aus einem Kontakt ein Konto wurde
- [ ] Vorquali-Antworten aus `/anfrage` als eigene Felder statt
      Fließtext, sobald Fund 1 (oben) behoben ist — Rolle,
      Abschlüsse/Jahr, Fokus, Zeithorizont einzeln filterbar
- [ ] Vollständige Timeline: heutige Events/Mails/Notizen erweitert um
      Termine, Ticket-Antworten, Flow-Schritte, Deal-Phasenwechsel
- [ ] „Empfohlen von"-Verknüpfung sichtbar (Modul 13)
- [ ] Aufgabe direkt aus dem Kontakt anlegen
- [ ] **Dubletten-Zusammenführung:** dieselbe Person kann heute als
      drei unverbundene `bw_lead`-Zeilen existieren (Fund 3) — eine
      Merge-Funktion, die Historie/Notizen/Mails auf einen Datensatz
      zusammenführt
- [ ] Firmen-Gruppierung (mehrere Ansprechpartner derselben
      Maklerfirma unter einem Account) — P2/P3, für Alex' Betrieb selten
      nötig, da meist ein Ansprechpartner pro Firma

**Datenbasis:** bestehend `bw_lead_detail`/`leadDetail`,
`bw_konto_detail`/`kontoDetail`. NEU: `bw_kontakt` (id, email unique,
name, telefon, firma, firma_id nullable, quelle_erst, lifecycle_stage,
tags text[], erstellt, aktualisiert) als Dedup-Schicht, auf die
`bw_lead`/`bw_deal`/`bw_konto`/`bw_termin` per `kontakt_id` verweisen;
RPCs `bw_kontakt_upsert_by_email` (automatisch aus `leadAnlegen`
aufgerufen), `bw_kontakt_360`, `bw_kontakt_merge`. Optional P2/P3:
`bw_firma` (id, name, website, ort, mitarbeiterzahl_bucket, notiz).
Größter Schema-Eingriff im Katalog — kann in Stufen migriert werden
(zuerst nur Lesen/Merge über `email`-Gleichheit, dann echte FKs).

**Priorität:** P1

---

## 4. E-Mail-Builder mit Flows

**Zweck:** Nachfassen läuft automatisch statt aus dem Kopf — eine
sichtbare Sequenz aus Trigger, Wartezeit, Mail und Bedingung, die Alex
einmal baut und die der Cron zuverlässig abarbeitet.

**Funktionen:**
- [ ] Vorlagen-Bibliothek: die sechs bestehenden Vorlagen aus
      `src/lib/email-vorlagen.ts` plus Studio-editierbare Custom-Vorlagen
      (Baustein-Editor: Heading/Intro/Absätze/Liste/CTA — ausschließlich
      über die bestehende Hülle `emailLayout`/`emailRows`, keine neue
      Design-Sprache)
- [ ] Sequenz-Editor als vertikale Schritt-Liste (Trigger → Wartezeit →
      Mail → Bedingung → Mail/Ende) — bei wenigen Schritten pro Flow
      reicht das, ein echter Node-Canvas ist P3-Ausbaustufe
- [ ] Trigger-Typen: Lead erstellt (nach Quelle), Status-Wechsel ohne
      Reaktion, Tag gesetzt, Ticket erstellt/gelöst, Termin verpasst
      (No-Show), manueller Start für einen Kontakt
- [ ] Bedingungen als Exit-Kriterium: Sequenz bricht automatisch ab,
      wenn der Kontakt inzwischen „Kunde" oder „Verloren" ist — kein
      Weiterverkaufen an bereits entschiedene Leads
- [ ] **Abmelde-Pflicht:** jede Flow-Mail trägt einen Ein-Klick-
      Abmelde-Link; setzt `bw_kontakt.mail_abgemeldet`; jeder Versand
      prüft dieses Flag vorher
- [ ] Versand-Engine über Cron (`/api/crm/flows/tick`, Muster wie
      `/api/os/sync`), verarbeitet fällige `bw_flow_lauf`-Zeilen, sendet
      über die bestehende `sendMail()`, loggt in `bw_mail_log`
- [ ] Zustellrate/Abmelde-Rate je Flow als einfache Kennzahl; echte
      Öffnungsraten brauchen ein Tracking-Pixel (DSGVO-Abwägung) — P3

**Datenbasis:** bestehend `sendMail`/`emailLayout`/`emailRows`
(`src/lib/email.ts`), `mailLoggen`. NEU: `bw_email_vorlage` (id, name,
kategorie, betreff, bausteine jsonb), `bw_flow` (id, name, trigger_typ,
trigger_wert jsonb, aktiv, erstellt), `bw_flow_schritt` (id, flow_id,
position, typ, warten_stunden, vorlage_id, bedingung jsonb),
`bw_flow_lauf` (id, flow_id, kontakt_id, gestartet, aktueller_schritt,
status, naechster_lauf_zeitpunkt) + Spalte `flow_lauf_id` auf
`bw_mail_log`, Spalten `mail_abgemeldet`/`mail_abgemeldet_am` auf
`bw_kontakt`.

**Priorität:** P1

---

## 5. Web-Analytics / „Einblick"

**Zweck:** Sehen, was Besucher auf der eigenen Seite wirklich tun —
first-party und cookielos, ohne Consent-Banner-Reibung, als lebender
Beleg der eigenen Automatisierungs-Expertise.

**Funktionen:**
- [ ] Pageviews je Pfad, Referrer, UTM-Parameter, Gerätetyp — täglich
      aggregiert
- [ ] Funnel-Schritte: definierte Meilensteine (`/anfrage` Schritt 1–5,
      `/tools/*` bis Ergebnis, Booking bis Bestätigung) mit Drop-off je
      Schritt
- [ ] Klick-Karten: Heatmap-Overlay je Seite (aggregierte
      x/y-Prozentkoordinaten pro Viewport-Klasse)
- [ ] Scroll-Tiefe: maximal erreichte Tiefe pro Sitzung/Seite,
      aggregiert zum Seiten-Durchschnitt
- [ ] Live-Besucher: aktive Sitzungen der letzten 5 Minuten, mit
      Seite und Quelle
- [ ] **Cookielos:** rotierender Tages-Hash aus IP-Präfix + User-Agent,
      kein persistentes Cookie, kein Cross-Site-Tracking → kein
      Consent-Banner nötig
- [ ] Rückwirkende Zuordnung: füllt derselbe Tages-Hash später ein
      Formular aus, wird die anonyme Reise dem entstehenden Lead
      angehängt
- [ ] Perspektivisch multi-tenant (`mandant_id`-Spalte): dasselbe
      Snippet auch auf Kunden-Websites einsetzbar — Grundlage für den
      vollen Wochenbericht (siehe Modul 8)

**Datenbasis:** komplett NEU: `bw_pageview`, `bw_klick`, `bw_scroll`,
`bw_funnel_schritt` (alle mit optionaler `mandant_id`) + RPCs zum
Schreiben (`bw_pageview_anlegen` etc.) und Lesen
(`bw_einblick_uebersicht`, `bw_einblick_klickkarte`,
`bw_einblick_funnel`, `bw_einblick_live`).

**Priorität:** P2 (MVP zuerst: Pageviews + Funnel-Schritte auf der
eigenen Seite; Klick-Karten/Live-Besucher und Multi-Tenant später)

---

## 6. Termine — Booking-Anbindung

**Zweck:** Jede über `/api/booking` gebuchte oder manuell vereinbarte
Sitzung als eigener, verwaltbarer Termin — mit Erinnerung, Status und
Nachbereitung, nicht nur als Text im Lead.

**Funktionen:**
- [ ] Kalenderansicht (Woche/Monat) aller Termine
- [ ] Eigenes Termin-Objekt statt nur `lead.daten`/Event-Text: Typ,
      Datum/Uhrzeit, Dauer, Modus (Video/Telefon/Vor Ort), verknüpfter
      Kontakt/Deal
- [ ] Automatischer Eintrag aus `/api/booking` (heute nur lose in
      `daten` + Bestätigungsmail, kein eigener Datensatz)
- [ ] Status-Pflege: geplant → bestätigt → wahrgenommen / abgesagt /
      no-show — No-Show-Rate als Kennzahl
- [ ] **Erinnerungs-Cron, der die bestehende Vorlage
      `mailTerminErinnerung` endlich tatsächlich auslöst** (Fund 2 oben
      — Vorlage existiert, Versandweg fehlt komplett)
- [ ] Nachbereitungsnotiz direkt am Termin statt nur allgemeiner
      Lead-Notiz
- [ ] `.ics`-Abo-Feed für Alex' privaten Kalender — einfacher als
      Zwei-Wege-Sync, P2

**Datenbasis:** bestehend `/api/booking`, `mailTerminBestaetigung`,
`mailTerminErinnerung`, `bw_lead_event` (typ=termin). NEU: `bw_termin`
(id, kontakt_id, deal_id nullable, typ, datum, uhrzeit, dauer_min,
modus, status, quelle, erinnerung_gesendet, notiz_nachher, erstellt,
aktualisiert) + RPCs `bw_termin_anlegen`, `bw_termin_status_setzen`,
`bw_termine_liste`, `bw_termin_notiz_setzen`; Cron
`/api/crm/termine/erinnerungen`.

**Priorität:** P1

---

## 7. Tickets — Kundenkonto-Brücke

**Zweck:** Was ein Kunde in `/konto` einreicht, taucht hier vollständig
auf und bekommt eine sichtbare Antwort — das ist das
Ticketsystem-Versprechen der Website, nicht nur eine Liste mit
Status-Badge.

**Funktionen:**
- [ ] **Antwort-Thread statt Einzeltext:** heute zeigt `bw_ticket` nur
      Titel + `detail` + Status-Badge, der Kunde sieht in `KontoBereich.tsx`
      nirgends eine Antwort von Alex — ein echter Konversationsverlauf
      (sichtbar für den Kunden) plus interne Notizen (nur für Alex)
- [ ] Priorität (niedrig/normal/hoch) und Kategorie
- [ ] SLA: Fälligkeit für Erstantwort, „Erste Antwort am"-Zeitstempel
      als Kennzahl, überfällige Tickets im Dashboard sichtbar
- [ ] Benachrichtigungsmail an den Kunden, sobald Alex antwortet
      (neue Vorlage `mailTicketAntwort`, gleiche Hülle wie die
      bestehenden sechs Vorlagen)
- [ ] Status-Konsistenz beheben: Schema-Kommentar nennt
      `offen`/`in-arbeit`/`erledigt`, das Frontend-Label-Mapping in
      `KontoBereich.tsx` nennt `neu`/`in_bearbeitung`/`erledigt` — vor
      dem SLA-Ausbau einmal angleichen
- [ ] Ticket → Aufgabe-Verknüpfung für Nachfass-Automatik (Modul 9)

**Datenbasis:** bestehend `bw_ticket`, `ticketAnlegen`,
`ticketStatusSetzen`. NEU: `bw_ticket_antwort` (id, ticket_id, erstellt,
autor, text, intern boolean) + Spalten auf `bw_ticket`
(`prioritaet`, `kategorie`, `faelligkeit`, `erste_antwort_am`,
`geloest_am`) + RPCs `bw_ticket_antwort_anlegen`,
`bw_ticket_antworten_liste`, `bw_ticket_prioritaet_setzen`,
`bw_ticket_sla_uebersicht`.

**Priorität:** P1

---

## 8. Wochenbericht-Generator

**Zweck:** Der Montags-Report, den `/konto` heute schon als Versprechen
zeigt („Anfragen, Termine, Abschlüsse und die Änderung für die Woche
danach — ohne dass Sie etwas abrufen müssen"), tatsächlich als CRM-
Funktion bauen — genau nach dem Muster, das `/api/os/wochenreport`
für Alex' eigenen Content bereits vormacht.

**Wichtiger Vorbehalt:** Die Karte in `KontoBereich.tsx` verspricht
heute etwas, das mit den aktuellen Daten nur teilweise stimmt. Ein
Kunde ist bei beuwy in Betreuung (`bw_konto`), die „Anfragen, Termine,
Abschlüsse" im Versprechen sind aber die Leistung des **Kunden eigenen**
Maklergeschäfts — nicht beuwys eigene Pipeline. Sauber berichtbar sind
heute nur Dinge, die pro `konto_id` tatsächlich erfasst werden
(Ticket-Aktivität, Projektstatus-Wechsel). Echte Anfragen/Termine/
Abschlüsse des Kunden brauchen entweder Einblick (Modul 5) multi-tenant
auf dessen eigener Website, oder eine Anbindung an seine externen
Lead-Quellen (Portale, eigenes Kontaktformular) — beides größere
Vorhaben. Deshalb zweistufig geplant:

**Funktionen:**
- [ ] **Stufe 1a (sofort baubar):** wöchentliche Mail je aktivem Konto
      mit Projektstatus-Änderung, neu eingereichten/gelösten Tickets,
      nächstem Termin — Cron `/api/crm/wochenbericht` (Vorbild
      `/api/os/wochenreport`), Versand montags früh
- [ ] **Stufe 1b (nach Modul 5 multi-tenant):** echte Anfragen/Termine/
      Abschlüsse aus dem eigenen Funnel des Kunden ergänzen
- [ ] Bericht-Archiv in `/konto` selbst (z. B. `/konto/berichte`) —
      erfüllt „ohne dass Sie etwas abrufen müssen" und macht die
      Historie trotzdem einsehbar
- [ ] „Die Änderung für die Woche danach": ein Freitext-Feld, das Alex
      pro Kunde vor dem Versand kurz ausfüllt (kein KI-Zwang, echte
      Handschrift bleibt möglich)
- [ ] Fehlgeschlagene/übersprungene Versände sichtbar im Dashboard
      (Modul 1)

**Datenbasis:** bestehend `bw_ticket`, `bw_konto`
(`projekt_status`-Wechsel). NEU: `bw_konto_status_event` (id, konto_id,
erstellt, alter_status, neuer_status) — heute schreibt `kontoUpsert`
den Status ohne Protokoll, für den Bericht und für Modul 14 muss der
Wechsel selbst sichtbar sein; `bw_wochenbericht_log` (id, konto_id,
kalenderwoche, versendet_am, inhalt_snapshot jsonb, status); RPC
`bw_wochenbericht_daten(konto_id, woche)`; Cron
`/api/crm/wochenbericht`.

**Priorität:** P1 (Stufe 1a) — Stufe 1b hängt an Modul 5 (P2)

---

## 9. Aufgaben / Follow-ups

**Zweck:** Nichts fällt durch, weil offene To-dos einen Ort haben statt
im Kopf oder verstreut in Notizen zu leben.

**Funktionen:**
- [ ] Manuelle Aufgaben mit Fälligkeit, Bezug (Lead/Deal/Konto/Ticket),
      Erledigt-Haken
- [ ] Automatisch erzeugte Aufgaben aus Regeln: Lead X Tage ohne
      Reaktion in „kontaktiert", Deal X Tage ohne Update in „angebot",
      Ticket ohne Erstantwort über SLA, Termin ohne Nachbereitungsnotiz
      nach Stattfinden, No-Show → Nachfass-Aufgabe
- [ ] Fällig-heute/überfällig-Liste als Grundlage für Modul 1
- [ ] Snoozen/Verschieben, Wiedervorlage
- [ ] Erledigt-Historie als Teil der Kontakt-Timeline (Modul 3)

**Datenbasis:** komplett NEU: `bw_aufgabe` (id, erstellt, faellig_am,
titel, beschreibung, typ, bezug_typ, bezug_id, status, erledigt_am,
erstellt_von) + RPCs `bw_aufgabe_anlegen`, `bw_aufgabe_erledigen`,
`bw_aufgabe_verschieben`, `bw_aufgaben_liste`, `bw_aufgaben_faellig_heute`.
Regel-Engine als eigener Cron-Schritt oder im selben Lauf wie Modul 4.

**Priorität:** P1

---

## 10. Suche über alles (Cmd+K)

**Zweck:** Ein Tastenkürzel statt Klick-Ketten — jeden Kontakt, jedes
Ticket, jeden Termin sofort finden.

**Funktionen:**
- [ ] Cmd+K/Ctrl+K öffnet eine tastaturnavigierbare Befehlspalette
- [ ] Volltextsuche über Name/E-Mail/Firma/Nachricht, Ticket-Titel,
      Termin-Titel, Notizen
- [ ] Ergebnistypen mit Icon/Label (Lead, Deal, Ticket, Termin,
      Aufgabe), Direktsprung per Enter
- [ ] Schnellbefehle: „Neuer Lead", „Neue Aufgabe", zwischen Modulen
      springen
- [ ] Zuletzt geöffnet/zuletzt gesucht, rein lokal im Browser

**Datenbasis:** bei diesem Datenvolumen keine neue Tabelle nötig — RPC
`bw_suche_global(query)` mit `UNION` über `bw_lead`/`bw_ticket`/
`bw_termin`/`bw_aufgabe`/`bw_konto` (ILIKE reicht; `tsvector`+GIN-Index
als reiner Performance-Ausbau später, keine neue Tabelle).

**Priorität:** P3 — lohnt sich ab spürbarem Datenvolumen, heute reichen
Filter/Sortierung in Pipeline und Kontakte

---

## 11. Einstellungen

**Zweck:** Die Stellschrauben des CRM an einem Ort statt verstreut im
Code — Absender, Verlust-Gründe, Benachrichtigungen, Datenschutz.

**Funktionen:**
- [ ] Absender-Signatur/Antwort-Adresse für alle Mails
- [ ] Verlust-Gründe-Liste editierbar (heute als feste Liste im Code
      der Pipeline gedacht, hier Studio-editierbar)
- [ ] Benachrichtigungs-Präferenzen: E-Mail bei neuem Lead,
      überfälligem Ticket, Flow-Fehler
- [ ] Anbindungs-Status wie unter `/os` (grün/grau je Dienst: Supabase,
      Resend, Cron) — dieselbe Transparenz-Konvention
- [ ] Kapazitäts-Grenze einstellen (Modul 14)
- [ ] DSGVO-Werkzeuge: Kontakt-Datenexport, Lösch-Anfrage bearbeiten
      (Auskunfts-/Löschrecht)
- [ ] Nutzerrollen-Feld von Anfang an vorsehen (heute nur „alex", Schema
      so anlegen, dass ein zweiter Nutzer später ohne Breaking Change
      dazukommt)

**Datenbasis:** NEU: `bw_einstellung` (key text primary key, wert
jsonb) als generischer Konfigurationsspeicher; `bw_dsgvo_anfrage` (id,
email, typ, status, erstellt, erledigt_am) für die Lösch-/Auskunfts-
Bearbeitung — P2/P3-Teilfunktion.

**Priorität:** P2

---

## 12. Beweis-Sammler *(überraschend, beratungs-spezifisch)*

**Zweck:** Die Kennzahlen und Zitate der eigenen Kunden systematisch
einsammeln, statt sie beim Website-Update mühsam zusammenzusuchen —
Beweis ist laut `CLAUDE.md` ein Pflicht-Block jeder VSL-Headline, hier
entsteht er laufend statt einmalig.

**Funktionen:**
- [ ] Baseline bei Projektstart erfassen: Anfragen/Monat vorher,
      Antwortzeit vorher, was auch immer als Vergleichswert zählt
- [ ] Periodischer Kennzahlen-Check-in je Kunde (z. B. alle 4 Wochen,
      per Mail-Link ohne Login-Reibung, ähnlich dem Code-Login-Muster
      von `/konto`): „Wie viele Anfragen kamen diese Woche rein, wie
      viele Termine, wie viele Abschlüsse, was hat sich verändert?"
- [ ] Zitat-/Testimonial-Sammler: einfache Einwilligungs-Checkbox bei
      positivem Feedback (aus Tickets oder dem Check-in-Formular) —
      „Dürfen wir das als Zitat verwenden?"
- [ ] Case-Baukasten je Kunde: Kennzahlen + Zitate + Vorher/Nachher an
      einem Ort, mit Freigabe-Status (offen/angefragt/erteilt/
      abgelehnt) — verhindert, dass etwas ungefragt auf der Website landet
- [ ] **Direkte Brücke zu `src/lib/content.ts`:** freigegebene Beweise
      sind die Quelle für die dort laut `CLAUDE.md` Studio-editierbaren
      Kennzahlen/Kundennamen — schließt den Kreis zwischen CRM und
      Marketing-Website
- [ ] Export als PDF/Slide für Akquise-Gespräche

**Datenbasis:** NEU: `bw_beweis` (id, konto_id, erstellt, kategorie
[kennzahl/zitat/vorher_nachher], titel, wert_vorher, wert_nachher,
einheit, zitat_text, freigabe_status, freigabe_am, quelle,
sichtbar_auf_website boolean) + RPCs `bw_beweis_anlegen`,
`bw_beweis_freigabe_setzen`, `bw_beweis_liste`; Cron
`/api/crm/beweis/abfrage` für den periodischen Check-in.

**Priorität:** P2

---

## 13. Empfehlungs-Radar *(überraschend, beratungs-spezifisch)*

**Zweck:** Für eine Boutique-Beratung ist Empfehlung der wichtigste und
am wenigsten gemanagte Kanal — sichtbar machen, wer wen gebracht hat,
und den „Ask" systematisch statt zufällig stellen.

**Funktionen:**
- [ ] Feld „Empfohlen von" bei jedem neuen Lead — Verknüpfung zu einem
      bestehenden Kontakt statt Freitext, wo möglich
- [ ] Automatischer Aufgaben-Auslöser „Empfehlung erbitten" nach starken
      Meilensteinen (Livegang, sehr positiver Beweis-Wert aus Modul 12)
- [ ] Empfehlungs-Übersicht: welcher Kunde hat wie viele/wie werthaltige
      Folge-Mandate gebracht (Summe `bw_deal.wert_cent` aller Deals mit
      dieser Empfehlungsquelle)
- [ ] Empfehlungs-Rate als Dashboard-Kennzahl: Anteil neuer Deals mit
      bekannter Empfehlungsquelle
- [ ] Dankeschön-Aufgabe automatisch ab einem Empfehlungswert-Schwellwert
- [ ] Optionales Prämienprogramm (formales Tracking von
      Empfehlungs-Prämien) — P3, nur falls Alex das überhaupt anbieten will

**Datenbasis:** primär neue Spalte `empfohlen_von_kontakt_id` auf
`bw_lead`/`bw_kontakt`, RPC `bw_empfehlungs_uebersicht()` — kein eigenes
Tabellen-Objekt nötig für die Kern-Funktion. Optional P3: `bw_empfehlung`
(id, von_kontakt_id, zu_lead_id, erstellt, praemie_status, praemie_wert)
nur bei einem formalen Prämienprogramm.

**Priorität:** P2

---

## 14. Kapazitäts-Radar *(überraschend, beratungs-spezifisch)*

**Zweck:** Alex ist Ein-Mann-Betrieb — das CRM muss verhindern, dass er
mehr hochwertige Mandate annimmt, als er gleichzeitig gut bedienen
kann, und rechtzeitig sagen, wann neue Pipeline nötig ist.

**Funktionen:**
- [ ] Einstellbare Kapazitäts-Grenze: maximale Anzahl gleichzeitiger
      aktiver Mandate (Modul 11)
- [ ] Ampel im Dashboard: frei / fast voll / voll — Auslastung = Konten
      in aktiven Phasen (aufnahme/design/umsetzung/livegang zählen
      voll, „betrieb" zählt leichter, da laufender Retainer statt
      volle Projektarbeit)
- [ ] Warnung beim Erstellen eines neuen „Angebot"-Deals, wenn die
      Kapazität schon ausgeschöpft ist
- [ ] Vorlaufzeit-Prognose: „voraussichtlich wieder frei ab [Datum]"
      auf Basis der durchschnittlichen Phasendauer bisheriger Mandate
- [ ] Pipeline-gewichtete 90-Tage-Umsatzprognose (Deal-Wert ×
      Wahrscheinlichkeit, gruppiert nach erwartetem Abschlussmonat) —
      gezielt auf Kapazitätsplanung gemappt, nicht nur als reine
      Umsatzzahl

**Datenbasis:** braucht `bw_konto_status_event` aus Modul 8 (Protokoll
der Projektstatus-Wechsel, heute nicht vorhanden) für die
Phasendauer-Berechnung, sowie `bw_deal` aus Modul 2 für den Forecast.
NEU: RPC `bw_kapazitaet_uebersicht()`. Kein zusätzliches
Tabellen-Objekt über Modul 8/2 hinaus.

**Priorität:** P2 (die zugrundeliegende Protokollierung in Modul 8
sollte aber schon in Welle 1 mitlaufen, damit ab Tag 1 Daten für die
Phasendauer-Berechnung entstehen)

---

## Neue Tabellen im Überblick

| Tabelle | Modul | Priorität |
|---|---|---|
| `bw_deal` | Pipeline | P1 |
| `bw_kontakt` | Kontakte/Konten-360 | P1 |
| `bw_email_vorlage`, `bw_flow`, `bw_flow_schritt`, `bw_flow_lauf` | E-Mail-Flows | P1 |
| `bw_termin` | Termine | P1 |
| `bw_ticket_antwort` | Tickets | P1 |
| `bw_aufgabe` | Aufgaben | P1 |
| `bw_konto_status_event` | Wochenbericht / Kapazitäts-Radar | P1 |
| `bw_wochenbericht_log` | Wochenbericht | P1 |
| `bw_pageview`, `bw_klick`, `bw_scroll`, `bw_funnel_schritt` | Einblick | P2 |
| `bw_einstellung`, `bw_dsgvo_anfrage` | Einstellungen | P2 |
| `bw_beweis` | Beweis-Sammler | P2 |
| `bw_firma` | Kontakte/Konten-360 (Erweiterung) | P2/P3 |
| `bw_empfehlung` | Empfehlungs-Radar (nur bei Prämienprogramm) | P3 |

**Erweiterungen bestehender Tabellen:** `bw_lead` (+`empfohlen_von_kontakt_id`,
optional +`wert_cent`/`verloren_grund` als Pragma-Variante zu `bw_deal`),
`bw_kontakt`/`bw_konto` (+`mail_abgemeldet`, `mail_abgemeldet_am`),
`bw_mail_log` (+`flow_lauf_id`), `bw_ticket` (+`prioritaet`, `kategorie`,
`faelligkeit`, `erste_antwort_am`, `geloest_am`).

---

## Empfohlener Ausbaupfad

### Welle 1 — Betrieb absichern, Markenversprechen einlösen (P1)

Reihenfolge nach Abhängigkeit, nicht nach Modulnummer:

1. **Fundament:** `bw_kontakt` (Dedup) + `bw_deal` anlegen — reine
   Schema-Arbeit, noch kein neues UI, aber alles Weitere hängt daran.
2. **Pipeline-Ausbau** (Deal-Wert, Drag & Drop, Verlust-Gründe) —
   sofortiger täglicher Nutzen für Alex.
3. **Kontakte/Konten-360** — macht die gesammelten Daten endlich
   sichtbar und nutzbar, inklusive Dubletten-Merge.
4. **Aufgaben + Dashboard/Tageskommando** — Betriebsdisziplin für den
   Ein-Mann-Betrieb, bevor mehr Module dazukommen.
5. **Termine** (inklusive endlich funktionierender Erinnerungs-Cron) —
   schließt die Booking-Lücke.
6. **Tickets-Ausbau** (Antwort-Thread, SLA) — löst das
   Ticketsystem-Versprechen tatsächlich ein.
7. **Wochenbericht-Generator Stufe 1a** (inkl. `bw_konto_status_event`
   als Protokollbasis für später) — löst das zweite Markenversprechen ein.
8. **E-Mail-Flows** (MVP: Schritt-Liste statt Canvas, Cron-Engine,
   Abmelde-Pflicht) — beuwy nutzt die eigene Automatisierung, die es
   auch verkauft.

### Welle 2 — Differenzierung und Wachstum (P2, danach P3)

1. **Einstellungen** — konsolidiert, was bis dahin verstreut
   provisorisch gelöst wurde (Verlust-Gründe, Absender, Benachrichtigungen).
2. **Einblick, MVP** (Pageviews + Funnel-Schritte auf der eigenen
   Website) — Voraussetzung für Wochenbericht Stufe 1b.
3. **Beweis-Sammler** — sobald genug Kunden im „Betrieb"-Status sind,
   um Fallstudien laufend zu füllen.
4. **Empfehlungs-Radar** — sichtbar machen, was informell schon passiert.
5. **Kapazitäts-Radar** — Ampel + Forecast, sobald genug
   Phasendauer-Daten aus Modul 8 vorliegen.
6. **P3 danach, wenn es sich lohnt:** Cmd+K-Suche (ab spürbarem
   Datenvolumen), Wochenbericht Stufe 1b (Einblick multi-tenant),
   visueller Node-Canvas für Flows, `.ics`-Kalender-Feed,
   Empfehlungs-Prämienprogramm, DSGVO-Self-Service.
