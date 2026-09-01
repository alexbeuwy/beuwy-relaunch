# MASTERPLAN — Anlaufstelle Nummer 1

**Nordstern (Alex, 01.09):** beuwy.com wird die Anlaufstelle Nummer 1 für
Makler, die Wert auf Qualität, Prozesse, Umsatzsteigerung und Design
legen. Jede Stunde ein Hebel: gewählt, komplett umgesetzt, abgenommen,
gepusht — dieser Plan ist die einzige Quelle dafür, was als Nächstes dran
ist.

**Nordstern-Metriken:** qualifizierte Anfragen/Monat · organische
Sichtbarkeit (Google + KI-Antworten) · Tool-Leads · Funnel-Abschlussquote.

## Tick-Protokoll (Pflicht bei jedem Lauf)

1. **Erst integrieren, dann Neues:** laufende Workflows/Agents und
   uncommittete fremde Arbeit prüfen (`git status`, Workflow-Journale).
   Offene Integration schlägt jeden neuen Hebel.
2. **Einen Hebel wählen** — den mit dem größten Hebel auf den Nordstern,
   der nicht blockiert ist. Lieber ein Hebel fertig als drei angefangen.
3. **Gates wie immer:** tsc 0 · Build grün · `node scripts/verify.mjs` OK ·
   Screenshot-Abnahme VOR Push · Studio-Pflicht für neue Texte · kein
   Gold, nie kursiv, „kostenlos" nur /tools+T-Cluster, kein „Portal" als
   Nutzenwort, kein Ludwigshafen.
4. **Plan fortschreiben:** Hebel abhaken, Log-Zeile unten ergänzen, neue
   Erkenntnisse als neue Backlog-Punkte eintragen.
5. **Committen + pushen** (deutsche Commit-Messages, Branch
   `claude/light-makler-style`).

## Blockiert / wartet auf Alex

- [ ] CRON_SECRET auf Vercel setzen (Flows- + Erinnerungs-Crons scharf)
- [ ] VSL-Video-URL (mk.vsl.url) und Podcast-URL (mk.podcast.url)
- [ ] Echte Kundenlogo-SVGs (acta, FLOWFACT, CASAONE …) + acta-Case-Assets
- [ ] Google-Bewertungen / echte Testimonials zur Einbindung freigeben
- [ ] Entscheidung Preise-Seite (ja/nein — FAQ trägt die Qualifizierung schon)

## Workstreams & Backlog

### A · GEO — in KI-Antworten zitiert werden

- [x] A1 `llms.txt` modernisiert: System-Sprache statt Portal, neue
      GEO-Zitate (10k/100k-Qualifizierung, Client-Avatar, Massenware-
      Vergleich, 5-Mitarbeiter/300-Mandate) — Tick 1, 01.09
- [ ] A2 JSON-LD-Vollausbau: Organization + Service + FAQPage (neue
      FAQ-Einträge!) + BreadcrumbList auf allen Clustern prüfen
- [ ] A3 Zitierfähige Antwort-Absätze: jede Wissens-/Cluster-Seite
      beginnt mit 40–60-Wort-Direktantwort auf die Titel-Frage
- [ ] A4 Eigene Datenpunkte publizieren (zitierbar): z. B. „Was kostet
      eine Maklerwebsite"-Seite mit konkreten Zahlenkorridoren
- [ ] A5 Vergleichs-Content, den KIs gern zitieren: „beuwy vs. Baukasten"
      als ehrliche Tabelle (UWG-fest, generisch statt Marken-Bashing)

### B · SEO/Technik — gefunden werden, schnell sein

- [x] B1 Sitemap-Audit: 85 URLs, alle Lücken sind bewusste noindex-
      Seiten (/anfrage, /intern, /studio, /os, /konto) — sauber. Tick 1.
      Rest (Canonicals, 404, Redirects) → B1b offen
- [ ] B1b Canonicals, 404-Route, Redirect-Hygiene prüfen
- [ ] B2 Core Web Vitals: LCP-Bild preloaden (Hero), Font-Display,
      Bundle-Check (gsap/lenis nur Startseite), CLS der Karten
- [ ] B3 OG-Images: einheitliches OG pro Cluster-Seite (aktuell nur global?)
- [ ] B4 Interne Verlinkung: Hub ↔ Cluster ↔ Tools systematisch (jede
      Seite ≥3 kontextuelle interne Links, Tools von überall erreichbar)
- [ ] B5 Security-Header (CSP/HSTS/X-Frame) in next.config prüfen
- [ ] B6 Breadcrumbs sichtbar + Schema auf allen Unterseiten

### C · Funnels/Conversion — aus Besuchern Anfragen machen

- [ ] C1 Funnel-Analytics: Schritt-Abbrüche im Anfrage-Funnel als
      Einblick-Events tracken (welcher Schritt verliert?)
- [ ] C2 Tool→Anfrage-Brücken: nach Ergebnis-Freischaltung gezielter
      CTA mit Kontext („Ihr Objektwert liegt bei X — was Vermarktung
      mit System daraus macht")
- [ ] C3 Lead-Magnet: „Makler-Website-Checkliste" (PDF, Studio-Texte,
      DOI-Mailflow) als zweiter, weicherer Conversion-Pfad
- [ ] C4 Mobiler Sticky-CTA auf Langseiten (dezent, Light-Style)
- [ ] C5 Nachfass-Flows live schalten (hängt an CRON_SECRET — blockiert)
- [ ] C6 Erfolgsseite Funnel: nächste Schritte + Kalender-Slot statt
      nur Bestätigung

### D · Landing Pages — jede Seite ein Verkäufer

- [ ] D1 Leistungs-LPs (Website/Leadgen/onOffice/SEO/GEO) auf VSL-Bogen
      prüfen: Hook → Problem → Mechanismus → Beweis → CTA, Kernaussagen
- [ ] D2 Cases ausbauen: acta-Case (wartet auf Assets), Riegel-Case um
      Reel-Zahlen ergänzen
- [ ] D3 Stadt-/GEO-Seiten: Qualitäts-Pass statt Templating (je 1 lokaler
      Beweispunkt, lokale interne Links)
- [ ] D4 Wissens-Hub: Top-3-Artikel auf Conversion prüfen (CTA-Platzierung,
      Tool-Brücken)
- [ ] D5 Portal-Nutzenwort-Sweep über alle Unterseiten (llms.txt spricht
      schon System; Leistungs- und Cluster-Seiten nachziehen)

### E · Design/Brand — der Vorsprung muss sichtbar sein

- [ ] E1 Konsistenz-Audit über alle Routen (Buttons, Radien, Abstände,
      Highlight-Nutzung) — Stichprobe 15 Seiten pro Tick
- [ ] E2 Über-uns: Beweis-Dichte erhöhen (Zeitstrahl 17 Jahre, Zahlen)
- [ ] E3 Footer-Feinschliff: Vertrauenszeile, Auszeichnungen-Slot
- [ ] E4 Dark-Assets-Check: alle Fotos/Posters auf Marken-Look (gelb/warm)

### F · Beweis/Trust

- [ ] F1 Testimonial-Slots vorbereiten (Studio-Keys, Video-fähig)
- [ ] F2 Zahlen-Aktualität: alle Kennzahlen aus content.ts im Studio
      pflegbar + Quartals-Erinnerung im Wochenbericht
- [ ] F3 Press/Podcast-Sektion sobald URLs da (blockiert)

### G · Technik/Infra

- [ ] G1 Env-Checkliste dokumentieren (SUPABASE_*, CONTENT_WRITE_SECRET,
      STUDIO_PASSWORD, RESEND/Mail, CRON_SECRET) in docs/branding/ANBINDUNGEN.md
- [ ] G2 Fehler-Sichtbarkeit: /api-Routen loggen nach bw_track? Minimal-
      Monitoring über Wochenbericht
- [ ] G3 Lighthouse-Lauf als Skript (tools/) mit Budget-Grenzen

### H · Analytics/Steuerung

- [ ] H1 Einblick: Funnel-Ansicht (Schritt 1→5 Konversion) im /intern
- [ ] H2 Wochenbericht: Nordstern-Metriken aufnehmen (Anfragen, Tool-Leads)

## Log

- 01.09 · Plan angelegt; R9 (Copy-Faden-Workflow) läuft — Integration hat
  Vorrang vor dem ersten neuen Hebel.
- 01.09 · Tick 1 (manuell beim Einrichten): A1 llms.txt System-Sprache +
  GEO-Zitate; B1 Sitemap-Audit sauber; D5 als Folge-Hebel erkannt.
- 01.09 · R9 integriert: Roter-Faden-Copy (4 Umschreiber + Richter, 27
  Fixes) und Funnel-Politur gepusht — Startstrecke ist Portal-frei.
