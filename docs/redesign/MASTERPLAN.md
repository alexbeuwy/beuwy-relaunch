# MASTERPLAN — Anlaufstelle Nummer 1

**Nordstern (Alex, 01.09):** beuwy.com wird die Anlaufstelle Nummer 1 für
Makler, die Wert auf Qualität, Prozesse, Umsatzsteigerung und Design
legen. Jede Stunde ein Hebel: gewählt, komplett umgesetzt, abgenommen,
gepusht — dieser Plan ist die einzige Quelle dafür, was als Nächstes dran
ist.

**Nordstern-Metriken:** qualifizierte Anfragen/Monat · organische
Sichtbarkeit (Google + KI-Antworten) · Tool-Leads · Funnel-Abschlussquote.

## Tick-Protokoll (Pflicht bei jedem Lauf)

0. **Stand holen:** `git pull --rebase origin claude/light-makler-style`
   — Codex-PRs, die in den Integrationsbranch gemerged wurden, müssen
   vor dem Tick lokal sein (Zusammenspiel: `AGENTS.md`).
1. **Erst integrieren, dann Neues:** laufende Workflows/Agents und
   uncommittete fremde Arbeit prüfen (`git status`, Workflow-Journale).
   Offene Integration schlägt jeden neuen Hebel. Backlog-Punkte mit
   `[~] Codex` sind vergeben — nicht anfassen.
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

- [ ] Vercel-Env vor Livegang (LAUNCH.md 2.1): STUDIO_PASSWORD,
      RESEND_API_KEY + EMAIL_FROM, SUPABASE_URL/ANON_KEY/
      CONTENT_WRITE_SECRET, ANTHROPIC_API_KEY (CRON_SECRET optional —
      Vercel-Header reicht)
- [ ] Rechtsfakten freigeben (LAUNCH.md 2.4): Supabase-Region, Zusatz-
      standorte im Impressum, Preview /impressum + /datenschutz lesen
- [ ] VSL-Video-URL (mk.vsl.url) und Podcast-URL (mk.podcast.url)
- [ ] Echte Kundenlogo-SVGs (acta, FLOWFACT, CASAONE …) + acta-Case-Assets
- [ ] Google-Bewertungen / echte Testimonials zur Einbindung freigeben
- [ ] Entscheidung Preise-Seite (ja/nein — FAQ trägt die Qualifizierung schon)

## Workstreams & Backlog

### A · GEO — in KI-Antworten zitiert werden

- [x] A1 `llms.txt` modernisiert: System-Sprache statt Portal, neue
      GEO-Zitate (10k/100k-Qualifizierung, Client-Avatar, Massenware-
      Vergleich, 5-Mitarbeiter/300-Mandate) — Tick 1, 01.09
- [x] A2a Startseite: FAQPage-Schema mit allen 7 FAQ (inkl. 10k/100k +
      Avatar) ergänzt; Organization-Description auf System-Sprache —
      Tick 2, 01.09. Live geprüft: ProfessionalService + FAQPage auf /
- [ ] A2b BreadcrumbList + Service-Schema-Abdeckung auf allen Clustern
      prüfen (69 Seiten haben JSON-LD — Stichprobe auf Vollständigkeit)
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
- [x] B1b Redirect-Hygiene: 24 WordPress-Alt-URLs (Theme-Demos,
      /leads, /portfolio*, Yoast-Sitemaps) per 308 umgeleitet, live
      geprüft — R10, 14.09. Canonicals → B1c offen
- [ ] B1c `alternates.canonical` auf ~85 Seiten nachziehen (nur 5
      setzen es; zentraler Helper aus dem Routenpfad) — LAUNCH L4
- [ ] B2 Core Web Vitals: LCP-Bild preloaden (Hero), Font-Display,
      Bundle-Check (gsap/lenis nur Startseite), CLS der Karten;
      LogoSlot-Preloads prüfen (LAUNCH L5), Hero-Video preload (L8),
      browserslist gegen 112-KB-Polyfill-Chunk (L13)
- [ ] B3 OG-Images: einheitliches OG pro Cluster-Seite (aktuell nur global?)
- [ ] B4 Interne Verlinkung: Hub ↔ Cluster ↔ Tools systematisch (jede
      Seite ≥3 kontextuelle interne Links, Tools von überall erreichbar)
- [x] B5 Security-Header (HSTS, nosniff, Referrer-Policy, X-Frame,
      Permissions-Policy) + poweredByHeader:false — R10, 14.09. Keine
      CSP (bricht Inline-JSON-LD/gsap) — bewusst.
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
- [ ] D5 Portal-Nutzenwort-Sweep über alle Unterseiten: 280 Fundstellen
      auf 42 Seiten (Content-QA R10). Muster „eigenes/Ihr/neues Portal"
      → „System"; „Portal-Profil bei ImmoScout", „Immobilienportal"
      bleiben Fachbegriff. Klarste Verstöße: casaone-website:63/296,
      performance-marketing-makler:149, immobilienmakler-werbung:57.
      Manuelle Sichtung, kein Suchen-Ersetzen — LAUNCH L3
- [ ] D6 /vsl-Frontseite (14.09 gebaut): A/B-Idee — Startseite gegen
      /vsl als Einstieg für Kampagnen-Traffic; OG-Image eigen (L11)

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

- [x] G1 Env-Checkliste: ANBINDUNGEN.md Abschnitt 0 mit Pflicht-Status
      und Ausfallverhalten je Variable — R10, 14.09
- [x] G4 Launch-Checkliste `docs/redesign/LAUNCH.md` (Blocker, Alex-
      Todos, Go-Live in 10 Schritten, 48-h-Prüfliste) — R10, 14.09
- [x] G7 Studio 1:1 live: Vollrevalidierung beim Speichern, alle
      öffentlichen Texte als Keys (80 Seiten-Textdateien), Gate
      tools/texte-scan.mjs in verify — R11, 14.09
- [x] G8 CRM-Dummy-Daten (/intern/einstellungen, supabase/crm-dummy.sql)
      — R11b, 14.09. Migration muss Alex einmal ausführen
- [ ] G5 Berlin-Koordinaten laufen durch die Brandenburg-Bbox
      (`boris.ts`) → 200 statt 422 — LAUNCH L9
- [ ] G6 Build-Warnung `@react-email/render` (FlowEditor-Import) — L12
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
- 01.09 · Tick 2 (Cron): A2a — Startseite bekommt FAQPage-JSON-LD (die
  Qualifizierungs-Antworten sind jetzt maschinenlesbar), Organization-
  Description Portal-frei. VERIFY OK.
- 14.09 · R10 (XXL-Launch-Workflow, 6 Auditoren + Redakteur): LAUNCH.md
  angelegt; 24 Redirects + Security-Header; Impressum ohne OS-Plattform,
  Datenschutz mit Einblick/Konto/Geo-Proxys (TDDDG); Env-Tabelle in
  ANBINDUNGEN.md; Mail-Kopfband ohne „Portal", Mail-Fuß ohne Adresse;
  OS-Cron-Fallback auf Vercel-Header; poweredByHeader aus. Content-QA
  über 83 Routen: 0 kaputte Links, 0 Platzhalter. Neu: /vsl-Frontseite
  (ein Claim, ein CTA, 22 echte Kundenlogos der alten beuwy.com).
  Produktions-Gate auf :3100 gelaufen (Log-Zeile darunter).
- 14.09 · R11 (Alex: „Studio immer 1:1 auf dem Live-Stand"): Save
  revalidiert den ganzen Seitenbaum; 12 Agents stellen 71 Seiten,
  Startseiten-Blöcke, Nav/Footer, Funnel, Buchung und Cases auf Studio-
  Keys um (Text-Snapshot-Gate: 84/86 identisch, 2 bewusst); Studio bekommt
  Bereich „Unterseiten" mit Seitenwahl und Bereich „Frontseite /vsl";
  Scanner-Gate in verify. R11b: CRM-Dummy-Daten mit zwei Knöpfen in
  /intern/einstellungen + SQL-Migration (Alex-Todo).
- 14.09 · R12: Copy-Brief aus „1000 Buyers a Day" (docs/redesign/COPY-
  BRIEF.md) auf /vsl und die Startseiten-Kernstrecke angewendet — eine
  gegen den Strich gebürstete Headline, ein Schmerzpunkt, glaubwürdige
  Zahlen, drei neue /vsl-Blöcke mit RIEGEL-Beleg. Alles Studio-Keys.
- 18.09 · R13: /vsl als ultimative VSL-Landingpage (Sales-Kette in acht
  Blöcken, sechs System-Bausteine, RIEGEL-Beweis, Für-wen, Einwände,
  Nächste Schritte, Exit-Intent) + VSL-Skript (docs/branding/VSL-SKRIPT.md).
