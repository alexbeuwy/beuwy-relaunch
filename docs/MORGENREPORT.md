# Morgenreport — Nachtschicht 22./23.07.2026

Stand: 23.07.2026, 08:46 · 22 Commits auf `claude/beuwy-landing-page-9hwyik`

## Was live ist

**Preview (aktuellster Stand, Commit `07a1427`):**
https://beuwy-relaunch-5l8y4v3dr-alexbeuwys-projects.vercel.app
(Deployment Protection ist aktiv — mit deinem Vercel-Login öffnet es sich
direkt. Alternativ: Vercel-Dashboard → beuwy-relaunch → Deployments →
Branch `claude/beuwy-landing-page-9hwyik`.)

**beuwy.com Produktion wurde nicht angefasst.** Live gehen = PR auf `main`
mergen + Domain im Vercel-Projekt umstellen — deine Entscheidung.

## Nacht-Ergebnisse

1. **Masterplan v2** (`docs/MASTERPLAN.md`) — von drei Subagent-Reviews
   zerlegt und integriert; nach deiner Ansage korrigiert: Delivery deckelt
   nicht, Engpass ist zu 100 % Pipeline (20–25 qualifizierte Gespräche/Monat
   für 6–7 Abschlüsse). Dazu `docs/DESIGN-DIRECTION.md` als verbindliches
   Regelwerk.
2. **Landingpage neu** — One-Pager, 8 Sektionen statt 12, Empfehlungs-
   Kernsatz, Cream-Headlines mit dosiertem Gelb, alle Zahlen mit Quelle,
   keine Fake-Scarcity. Ein unabhängiger Design-Review (10 Anti-Slop-Regeln)
   lief dagegen; alle Befunde sind umgesetzt.
3. **Website-Check end-to-end live** — Scan mit echtem Server-Screenshot
   (~7 s) + deterministische Checks (schema.org, llms.txt, OG, FAQ-Schema …)
   + Claude-Analyse mit echtem Seiteninhalt (~14 s), inszeniert mit
   Status-Bühne, Scan-Reveal-Screenshot, Score-Count-up, BorderBeam nur
   während der Analyse. Live getestet: riegel.vercel.app → 88/100,
   saadi-ag.vercel.app → 44/100 (kein schema.org, keine llms.txt — direkt
   verwertbares Gesprächsmaterial für Kanal B!).
4. **Buchungssystem aus Riegel portiert** — `/termin` mit Rail, Progress,
   .ics + Google-Kalender, Honeypot, Consent; Anlässe Systemgespräch 30 min /
   Diagnose 45 min / Bestandskunde. Alle CTAs zeigen darauf, aus dem
   Website-Check mit vorbefüllter Nachricht.
5. **GEO-Layer** — schema.org-Graph (ProfessionalService + WebSite +
   FAQPage), llms.txt, OG-Image, Sitemap, robots. beuwy besteht den eigenen
   Check in allen 9 Punkten.
6. **Rechtsseiten** — /impressum + /datenschutz mit deinen echten Daten.
   Empfehlung: einmal anwaltlich gegenlesen lassen (bes. Datenschutz).
7. **Sales-Assets** (`docs/sales/`) — Loom-Drehbuch (2 Zielgruppen-Varianten,
   OBS-Setup, Follow-up-Sequenz), Nachrichten an Riegel & Saadi (Intro- +
   Zitat-Bitte), LinkedIn-Vorlagen (UWG-konform), Zielliste mit 53 Firmen
   (~30 mit verifiziertem Website-Schwachpunkt als Loom-Aufhänger, Top-10
   Rhein-Neckar).

## Was du heute tun solltest (Reihenfolge = Priorität)

1. **Riegel & Saadi anschreiben** (`docs/sales/nachrichten-riegel-saadi.md`,
   Copy-Paste) — Intros + O-Ton-Zitate. Wärmster Kanal, 10 Minuten Aufwand,
   höchste Abschlusswahrscheinlichkeit im ganzen Plan.
2. **Env-Vars auf Vercel setzen** (Projekt beuwy-relaunch → Settings →
   Environment Variables): `RESEND_API_KEY` + `EMAIL_TO=ap@beuwy.com`
   (später `EMAIL_FROM` mit eigener Domain). Bis dahin zeigt die
   Terminbestätigung ehrlich den Demo-Hinweis. `ANTHROPIC_API_KEY` war
   schon gesetzt — die Analyse läuft live.
3. **Preview durchklicken** (Desktop + Handy), Website-Check mit 2–3
   Domains testen, /termin durchspielen. Feedback einfach hier in den Chat.
4. **Validierungs-Gate starten:** erste 5 Looms nach
   `docs/sales/loom-drehbuch.md` mit den Top-10 aus
   `docs/sales/zielliste.md`. Ziel: 25 Looms in 2 Wochen, Go-Kriterium
   ≥10 % positive Antworten / ≥3 Termine.
5. **Sicherheit:** Den im Chat geteilten Vercel-Token rotieren
   (vercel.com → Settings → Tokens). Optional den Automation-Bypass-Secret
   des Projekts widerrufen (Settings → Deployment Protection) — den hatte
   ich nur für die nächtlichen Live-Tests erzeugt.

## Offene Entscheidungen (aus Masterplan §9)

- Diagnose-Preis final: Empfehlung **1.990 €**, voll angerechnet (steht so
  im FAQ — sag Bescheid, falls anders).
- Grobe Stunden-Rückschau Riegel/Saadi für die Margen-Rechnung (§7).
- Wann Livegang beuwy.com? (PR + Domain-Umstellung mache ich auf Zuruf.)

## Bewusst offen gelassen

- O-Ton-Zitate: Slots in den Proof-Karten sind eingebaut, bleiben leer bis
  echte Zitate da sind.
- Lokale Dev-Umgebung kann keine Screenshots (Sandbox-Proxy) — auf Vercel
  läuft alles; nur relevant, falls du lokal entwickelst.
- PDF-Report + E-Mail-Gate im Tool (Masterplan §6, Stufe 3) — nächster
  Ausbauschritt, sinnvoll nach den ersten echten Tool-Nutzungen.
