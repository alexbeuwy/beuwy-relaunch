# PLAN — Light Makler Style (unlazy, orchestriert)

Baum (Tiefe 4). Leaves = Subagent-Einsätze mit eigener Gates-Datei
unter `docs/redesign/gates/`. Contract: `BRIEF.md` (Design-System,
Copy-Regeln, Architektur) — geschrieben VOR dem Fan-out.

## Baum

- **R** Redesign
  - **A Fundament** (Contract, Orchestrator selbst)
    - A1 Token-Welt: globals.css Werte, Fonts, Grain raus — `gates/A1.md`
    - A2 CDN-Helper + AiPille + VslSlot + Content-Keys — `gates/A2.md`
  - **B Rahmen + Startseite**
    - B1 Nav + Footer neu — `gates/B1.md`
    - B2 Hero Startseite — `gates/B2.md`
    - **CHECKPOINT Alex: Screenshots Fundament + Hero → Freigabe**
    - B3 Startseite Sektionen 2–5 — `gates/B3.md`
    - B4 Startseite Sektionen 6–10 — `gates/B4.md`
  - **C Funnel**
    - C1 /anfrage Vorquali (Steps) + vereinfachte Terminbuchung — `gates/C1.md`
  - **D SEO-Seiten**
    - D1 /immobilienmarketing (Hub) — `gates/D1.md`
    - D2 /leadgenerierung-immobilienmakler — `gates/D2.md`
    - D3 /website-fuer-immobilienmakler — `gates/D3.md`
    - D4 /onoffice-website — `gates/D4.md`
  - **E Ranking-Asset**
    - E1 /beste-maklerwebsites (Methodik + 30 Slots, große 8 benannt,
      Scores als Studio-Content) — `gates/E1.md`
  - **F Cluster**
    - F1 /bottimmo-alternative — F2 /maklerwebsite-kosten —
      F3 /maklersoftware-vergleich — `gates/F1..F3.md`
  - **G Bestand**
    - G1 Cases-Restyle + /termin-Verschlankung + Redirects +
      sitemap/robots/metadata — `gates/G1.md`
  - **H Integration (Branch-Gates)**
    - H1 Screenshot-Review alle Seiten (Desktop+Mobil) gegen BRIEF,
      adversarial, Fix-Loop — `gates/H1.md`
    - H2 transitions-polish + make-interfaces-feel-better Schlusspass,
      Build+tsc grün, PR — `gates/H2.md`

Ausführung: Sonnet-5-Subagents (Alex' Vorgabe), Orchestrator vergibt
Briefs = BRIEF.md + Gates-Datei + Leaf-Auftrag. B3/B4 nach Checkpoint;
C–G parallelisierbar (disjunkte Dateien), H sequenziell am Ende.

## Baum R2 — Repositionierung (BRIEF §9, Alex 26.08)

- **R2** Unternehmensberatung · Portale statt Websites · 17 Jahre
  - **R2-O Orchestrator selbst:** BRIEF §9, Hero (H1 kleiner +
    Zielgruppen-Rotation), VslSlot bewegter Platzhalter, cdn.ts-Videos,
    content.ts-Keys, Wiring der Schema-Grafiken — `gates/R2-O.md`
  - R2-1 Schema-Grafiken (Performance-Marketing-Flow ~5 %,
    Standard-Exposé vs. Maßarbeit) `src/components/SchemaGrafiken.tsx` — `gates/R2-1.md`
  - R2-2 Startseiten-Copy-Overhaul StartOben/StartUnten (Portal, AI-Pain,
    Ticketsystem; KEINE content.ts-Edits, Wunsch-Keys melden) — `gates/R2-2.md`
  - R2-3 `/ki-fuer-immobilienmakler` — `gates/R2-3.md`
  - R2-4 `/immobilienmarketing-agentur` (Capture: Beratung statt Agentur) — `gates/R2-4.md`
  - R2-5 `/marketing-projektentwickler` + `/marketing-bautraeger` — `gates/R2-5.md`
  - R2-6 Repositionierungs-/Humanizer-Pass Bestandsseiten + Footer — `gates/R2-6.md`
  - R2-7 GEO/SEO-Paket: llms.txt, JSON-LD, sitemap/robots, interne Links — `gates/R2-7.md`
  - R2-H Abnahme: Build, Shots, Grep-Gates (Agentur/kostenlos), Push — `gates/R2-H.md`

## Statuslog (append-only)

- 2026-08-25 Baum angelegt, A1/A2 begonnen (Orchestrator).
- H2: StempelBadge default 'relative' schlaegt caller-'absolute' — zentral fixen (MaklerElemente), !absolute-Workarounds zuruecknehmen (D3-Fund)
- 2026-08-25 H1 abgeschlossen: 26 Shots, 13 Routen reviewt, 5 Findings
  gefixt (LogoSlot-Inversion, Hub-Akzent, StempelBadge zentral + D3/D4-
  Workarounds raus, "kostenlos" gestrichen, staler Review-Server als
  Root Cause des /termin-Phantomfehlers). H2 G1–G3 gruen, PR folgt.
- 2026-08-26 R2 komplett: 7 Grunts (Schema-Grafiken, Start-Copy,
  KI-/Agentur-/3 Zielgruppen-Seiten, Reposition-Pass, GEO-Paket) +
  Orchestrator (System-Headline statisch auf Makler nach Alex' Fokus-
  Entscheid, Glas-Karte, VSL-Bewegtbild, Money-Lines, Trust-Block mit
  Vision/KKR 160 Mio, Koenigswege 60->2.300, acta 380 WE/40 Mio,
  Kundenlogos riegel/hzo/invyse/koenigswege von beuwy.com). 47 Routen
  gruen, kostenlos=0, R2-H geschlossen.
- 2026-08-26 Assets nachgeliefert (Alex' Auftrag): 13 Logo-SVGs in
  public/logos/ (11 echte Quellen, 2 Nachbauten — Herkunft: README
  dort), Integrations-Strip Startseite auf LogoSlot umgestellt,
  LogoSlot um complete-Check ergaenzt (onLoad vor Hydration verpufft
  sonst). Gruenderfoto als gruender-alex.webp im CDN (GRUENDER_FOTO),
  eingebaut als VSL-Byline (Start) und /termin-Intro — echtes Foto,
  ohne AiPille. VSL-Platzhalter war bereits gebaut (VslSlot).
