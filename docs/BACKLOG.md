# Nacht-Backlog — 23.07.2026, 00:30 → 09:00 CEST

Regeln für jede Loop-Iteration (alle 30 min):
1. Diese Datei lesen, oberstes offenes Item nehmen (Status `[ ]` → `[~]` → `[x]`).
2. ~25 min fokussiert arbeiten. `npm run build` muss grün sein vor jedem Commit.
3. Committen + pushen auf `claude/beuwy-landing-page-9hwyik` (löst Vercel-Preview aus).
4. Status hier aktualisieren (inkl. Notizen für die nächste Iteration).
5. Ab 08:45 CEST (06:45 UTC): abbrechen, Morgenreport schreiben (M1), Loop beenden.

Leitplanken: `docs/MASTERPLAN.md` (§5, §6, §8) + `docs/DESIGN-DIRECTION.md`
(verbindlich — Abweichung nur mit Begründung im Commit). Vercel-Token liegt im
Scratchpad (`.vercel-env`) — NIE ins Repo. Nur Preview-Deploys, Produktion
beuwy.com bleibt unberührt. Keine erfundenen Zahlen/Claims — nur Belegbares.

## Strang 1 — Produkt

- [x] **P1 · Fundament:** globals.css auf Token-System der DESIGN-DIRECTION
  umbauen (9 Typo-Tokens als Utility-Klassen, Farb-Korrekturen `--bg-elevated:#2B0808`,
  `--ink-yellow-hover`), Section.tsx auf 1120px/py-24, Fraunces-Font prüfen/laden.
  Alte Seiten löschen: /method, /system, /manifesto, /work, /audit, /anfrage
  (Redirects in next.config auf /#sektion). Nav + Footer auf One-Pager umbauen.
- [x] **P2 · Seitenskelett + Copy v1:** page.tsx neu — 8 Sektionen nach Masterplan §5
  mit finaler Copy (Hero-Kernsatz "Die erste Empfehlung kommt heute von Google und
  ChatGPT…", Anti-Slop-Regeln 1–10 einhalten). Statisch zuerst, Interaktionen später.
- [x] **P3 · Tool-Backend:** /api/audit v2 — (a) Screenshot-Route mit playwright-core
  + @sparticuz/chromium (npm install nötig), (b) deterministische Checks
  (schema.org, llms.txt, OG, Title/Meta, robots), (c) Claude-Analyse MIT echtem
  Seiteninhalt (HTML-Text extrahieren, an Claude geben), Streaming-fähige
  Statusschritte (Route aufteilen: /api/audit/scan + /api/audit/analyze).
  Timeout-/Fehlerpfade sauber. maxDuration beachten (Vercel Hobby: 60s).
- [x] **P4 · Tool-Frontend:** Hero-Panel nach DESIGN-DIRECTION §3 — Fokus-Ring,
  Text-Swap-Submit, Status-Bühne mit Badge-Pop-Checkliste, Screenshot-Scan-Reveal
  (clip-path + Scanlinie + Sheen), Score-Count-up (t-digit), Ergebnis-Split 55/45,
  BorderBeam nur während Analyse (npm install border-beam; falls Paket
  inkompatibel: eigener conic-gradient-Beam, ~30 Zeilen CSS). reduced-motion.
- [x] **P5 · Sektionen 2–5 verfeinern:** Status-quo-Kosten (Verlustaversion),
  Proof (Riegel/Saadi 2-up mit Scope-Fakten + Live-Links + Zitat-Platzhalter),
  System (4 Layer an Riegel-Mechanik erklärt), Prozess mit echter Knappheit
  ("max. 2 Systemstarts/Monat" als Satz, kein Slot-Theater).
- [x] **P6 · Sektionen 6–8 + Rechtsseiten:** Founder, FAQ (interpolate-size-
  Aufklapper + FAQPage-Schema), CTA-Sektion (einzige invertierte Gelb-Sektion).
  /impressum + /datenschutz (Daten in MASTERPLAN §5; Datenschutz: Vercel-Hosting,
  Audit-Tool-Verarbeitung, Anthropic-API als Auftragsverarbeiter erwähnen).
- [x] **P6b · Buchungssystem aus Riegel portieren (Alex' Wunsch, ersetzt
  Calendly/mailto als CTA):** Quelle liegt geklont unter /workspace/riegel —
  `src/components/booking-tool.tsx` (562 Z.), `src/app/termin/page.tsx`,
  `src/app/api/booking/route.ts` + libs `email.ts`, `rate-limit.ts`,
  `supabase-server.ts`. Nach beuwy portieren als /termin + CTA-Ziel #kontakt:
  Anlässe anpassen (Systemgespräch 30 min · Diagnose-Rückfrage · Bestandskunde),
  nur Video/Telefon (kein Vor-Ort-Ortsfeld), Empfänger ap@beuwy.com,
  beuwy-Brand-Styling (Typo-Tokens!), E-Mail-Layout-Logo/Farben auf beuwy.
  Resend/Supabase sind ohne Keys crash-frei (Mail wird dann nicht versendet) —
  benötigte Env-Vars (RESEND_API_KEY, EMAIL_TO, ggf. Supabase) im Morgenreport
  auflisten. Supabase-Persistenz: nur wenn ohne eigenes Projekt sinnvoll
  abbildbar, sonst mail-only + TODO.
- [x] **P7 · GEO-Layer:** metadata (Title/Description/OG), OG-Image (statisch
  generiert), schema.org Organization + WebSite + ProfessionalService + FAQPage,
  /llms.txt, sitemap.ts, robots.ts.
- [x] **P8 · Interaktions-Feinschliff:** Reveal-on-Scroll (fail-open), Hover-Zustände,
  Nav-Scroll-Verhalten, Mikro-Detail-Pass gegen DESIGN-DIRECTION §5, Anti-Slop-Greps
  (Regel 10) als Selbst-Check laufen lassen.
- [ ] **P9 · QS-Runde:** npm run build, Playwright-Screenshots (390px, 768px, 1440px),
  visuelle Prüfung gegen DESIGN-DIRECTION (Gelb-Budget! Sektionshöhen!),
  Kontrast-Checks, tote Links, Meta-Daten.
- [ ] **P10 · Design-Review-Subagent:** Frische Augen: Subagent bewertet die
  Screenshots hart gegen DESIGN-DIRECTION §4 (10 Regeln einzeln) — Befunde fixen.
- [ ] **P11 · Live-Verifikation:** Vercel-Preview-URL des Branches holen, Tool live
  durchspielen (echte Domain testen), Screenshot des Ergebnisses für Morgenreport.

## Strang 2 — Vertrieb (parallel per Subagent möglich)

- [x] **S1 · docs/sales/loom-drehbuch.md:** 4-min-Drehbuch aus Masterplan §4
  ausformuliert (wortwörtliche Musterformulierungen, Setup-Checkliste OBS/A7III,
  Thumbnail-Regel, Follow-up-Sequenz mit je neuem Befund).
- [x] **S2 · docs/sales/nachrichten-riegel-saadi.md:** Je 1 Intro-Bitte + 1
  Zitat-Bitte (O-Ton für Landingpage), kurz, kopierfertig, in Alex' Ton.
- [x] **S3 · docs/sales/linkedin-vorlagen.md:** UWG-konforme Sequenz (Connect-Note,
  Post-Accept-Message mit Loom-Link, 2 Follow-ups mit je neuem Befund).
- [~] **S4 · docs/sales/zielliste.md:** ~50 Firmen Finance/RE DACH (Makler mit
  Portfolio, Finanzvertriebe, Vermögensverwalter, Bauträger, PropTechs) mit
  Domain + Quelle + 1-Zeilen-Hypothese, per Research-Subagents. Öffentliche
  Quellen, keine personenbezogenen Daten außer Firma/GF-Name aus Impressum.

## Abschluss

- [ ] **M1 · Morgenreport:** docs/MORGENREPORT.md — was live ist (Preview-URL),
  was entschieden wurde, Screenshots, offene Fragen aus Masterplan §9,
  priorisierte Nächste-Schritte-Liste für den Tag, Loom-Drehbuch-Verweis.
  Danach: Loop mit stop beenden.

## Notizen zwischen Iterationen

- **P8+S1-3 (03:55):** S1-S3 committet (drei Dateien in docs/sales/).
  P8: Inline-Styles Footer/Nav bereinigt (btn-sm-Utility), scroll-margin-top
  88px für Anker + smooth scroll (reduced-motion: auto). Verbleibende
  style={{}}: Logo (strukturell), BookingTool-Progress (dynamische Breite),
  opengraph-image (Satori braucht inline), --line/--digit-index (CSS-Vars) —
  alles legitime Ausnahmen. S4-Zielliste läuft noch.
- **03:40:** S1-S3 (ein Subagent) und S4 (Research-Subagent) laufen im
  Hintergrund und schreiben nach docs/sales/ — NICHT doppelt bearbeiten;
  nächste Iteration committet die Ergebnisse, sobald die Dateien da sind.
  Nächstes Bau-Item: P8 (Feinschliff), dann P9/P10/P11.

- **P1 (23:55):** Typo-Tokens als `.t-*`-Klassen in globals.css, `--bg-elevated`
  → #2B0808 (+`--bg-hover`, `--ink-yellow-hover`), `interpolate-size` auf :root,
  `.h-display`/HeadlineDisplay auf Cream, `.eyebrow` auf Mono. Section auf
  1120px/py-24. Alte Seiten gelöscht (/method /system /manifesto /work /anfrage
  /audit) + Redirects in next.config.mjs auf Anker. Nav (4 Anker + CTA
  "Systemgespräch" → /#kontakt) und Footer (Riegel/Saadi-Links, /impressum,
  /datenschutz, keine Fake-Claims mehr) neu. Build grün.
  **Achtung für P2:** page.tsx ist noch die ALTE 12-Sektionen-Seite — Anker
  #proof/#system/#prozess/#faq/#kontakt/#tool existieren erst mit dem Neubau.
  ChapterLabel/SpotlightTracker/Editor/EmailMockup/LogoWall werden nach P2
  vermutlich ungenutzt → dann löschen. CTA-Ziel: bis P6b mailto:ap@beuwy.com,
  danach das portierte Buchungssystem (/termin). Alex' Ansage 00:10: KEIN
  Calendly — Buchungssystem aus dem Riegel-Projekt übernehmen (→ P6b).
- **P2 (00:35):** page.tsx neu — 8 Sektionen (hero+tool / kosten / proof /
  system / prozess / founder / faq / kontakt-invert). AuditTool.tsx als
  funktionale Basis (volle Choreografie → P4). Section.tsx vereinfacht
  (SectionHead mit festem Rhythmus), HeadlineDisplay entfernt. Neue CSS:
  hero-lamp, cta-invert, btn-inverse, faq-item (native details, P6 rüstet um),
  is-*-Modifier + .panel statt Inline-Styles. Editor/EmailMockup/LogoWall/
  ChapterLabel gelöscht. Layout-Metadata auf neue Positionierung. Build grün.
  WICHTIG: Knappheits-Zeile "max. 2 Systemstarts/Monat" bewusst NICHT gebaut —
  widerspricht Alex' 6-7-Ansage; stattdessen Operator-Argument ("baut Alexander
  selbst"). Diagnose-Preis 1.990 € steht im FAQ (Default, Alex bestätigt noch).
  Offen für P5-Feinschliff: Kosten-Sektion Zeile 2 ggf. konkreter (Branchen-
  Beispiel), Proof-Karten Zitat-Slots.
- **P3 (00:55):** Backend v2 live — /api/audit/scan (SSRF-Guard, Seiten-Fetch,
  9 deterministische Checks, Text-Extraktion, Screenshot best-effort mit hartem
  25s-Race) + /api/audit/analyze (claude-sonnet-5 mit echtem Seiteninhalt +
  Checks als Kontext, Befunde in Geschäfts-Sprache). Alte /api/audit-Route weg,
  AuditTool auf Zwei-Phasen-Flow (zeigt Screenshot + Checks sofort, Analyse
  folgt). serverExternalPackages für @sparticuz/chromium gesetzt. Smoke-Test
  lokal: Scan OK (riegel.vercel.app → techScore 100, alle 9 Checks korrekt),
  Claude-Analyse lokal ohne Key = Demo-Pfad (auf Vercel ist der Key gesetzt).
  ACHTUNG P11: Screenshot funktioniert LOKAL nicht (Session-Proxy resettet
  Chromium-CONNECT, reine Dev-Eigenheit) — auf dem Vercel-Preview unbedingt
  live verifizieren (@sparticuz-Pfad, dort kein Proxy). Falls dort auch leer:
  chromium.args prüfen / headless:"shell"-Variante testen.
- **P4 (01:40):** Volle Tool-Choreografie: Status-Bühne (grid-rows-Transition,
  Zeilen per Badge-Pop mit --line-index-Stagger, echte Fakten statt Spinner),
  Screenshot-Scan-Reveal (clip-path top→bottom 700ms + Scanlinie + genau ein
  Sheen-Sweep, getriggert via img.onLoad), Score-Digit-Stagger (eigene
  .score-digit ohne Endlos-Sheen), Panel-Expansion 680→960px via data-stage,
  eigener conic-gradient-BorderBeam (läuft NUR bei data-busy; kein npm-Paket
  nötig). prefers-reduced-motion: alles instant. Hero-H1-Container auf 880px
  (2 Zeilen statt 3 bei 1440), Mobile-Form stapelt. Screenshots geprüft
  (1440 + 390, im Scratchpad). Build grün. BorderBeam-Paket von Alex' Liste
  damit obsolet. Lokal weiterhin ohne Screenshot (Proxy) — P11 prüft live.
- **P5+P6 (02:35):** Gebatcht, weil Cron-Fires nicht ankommen (nur der
  Stunden-Heartbeat trägt; ab jetzt zusätzlich send_later-Kette alle 30 min).
  FAQ auf interpolate-size-Accordion (::details-content block-size Transition,
  reduced-motion instant). /impressum + /datenschutz live (Daten von
  beuwy.com/impressum; Datenschutz nennt Vercel-Hosting, Website-Check-Fluss
  inkl. Anthropic als AV, keine Cookies/Tracking — im Morgenreport: anwaltlich
  prüfen lassen). CaseCard hat jetzt quote-Prop (leer bis O-Töne da sind,
  keine erfundenen Stimmen). Sektionen 2-5 Copy gesichtet, keine Änderung
  nötig. Founder/CTA standen schon aus P2. Build grün (9 Seiten).
- **P6b (03:20):** Buchungssystem aus Riegel portiert: /termin + BookingTool
  (Rail, Progress, Honeypot, Consent, .ics + Google-Kalender, Bestätigung erst
  nach Übermittlung) + /api/booking (Rate-Limit, Validierung, Resend-Mails;
  ohne RESEND_API_KEY ehrlicher Demo-Modus mit UI-Hinweis + Server-Log) +
  lib/email + lib/rate-limit. Anlässe: Systemgespräch 30 / Diagnose 45 /
  Bestandskunde 30; nur Video/Telefon. CTAs → /termin (AuditTool mit
  ?domain-Prefill). Datenschutz um Terminbuchung/Resend ergänzt.
  ENV FÜR ALEX: RESEND_API_KEY + EMAIL_TO=ap@beuwy.com auf Vercel setzen.
- **P7 (03:35):** GEO-Layer live: opengraph-image.tsx (ImageResponse,
  Kernsatz auf Bordeaux), /llms.txt (Leistungen, Referenzen, Tool, Kontakt),
  sitemap.ts, robots.ts (api/ disallow), JSON-LD @graph in page.tsx
  (ProfessionalService + WebSite + FAQPage — einzige erlaubte
  dangerouslySetInnerHTML-Stelle, statisches JSON). Damit besteht beuwy den
  eigenen Website-Check: schema.org ✓, FAQ-Schema ✓, llms.txt ✓, OG ✓,
  robots ✓. Build grün (15 Routen).
- **00:20:** Loop neu armiert nach Session-Neustart (In-Memory-Cron war weg):
  Cron-Job 83971490 (13,43 * * * *) + persistenter Fallback-Trigger
  trig_01Du7dKG7GfHPnPfxLm53KGw (25 * * * *, überlebt Neustarts, re-armiert
  den Cron bei Bedarf). Beide werden im M1-Abschluss gelöscht.
  Riegel-Repo geklont: /workspace/riegel (shallow).
