# R3 — Endspurt „Launch-ready Primus" (26.08, 5h-Fenster)

Ziel (Alex): Seite 100 % launch-ready, als wären wir seit 10 Jahren
Deutschlands Primus — auch gegen BOTTIMMO & Co. Gates: docs/redesign/gates/R3.md,
runnable über scripts/verify.mjs. Methode: unlazy orchestrated, Sonnet-Grunts
in drei Workflow-Wellen, Orchestrator prüft jede Welle gegen die Gates.

## Baum
- A Fundament (Orchestrator): Plan+Gates+verify · Ludwigshafen raus aus Footer ·
  Supabase-Schema bw_* (Migration via MCP)
- B Welle 1 (9 Grunts): B1 Rechner-Engine lib+Tests · B2 /tools/verkaufspreisrechner ·
  B3 /tools/mietpreisrechner · B4 /tools/afa-rechner · B5 Datenschutz-Vollausbau ·
  B6 Impressum-Vollausbau · B7 E-Mail-Sequenz (Vorlagen+Anbindung) ·
  B8 CRM /intern · B9 Kundenkonto /konto
- C VSL-Reorder Startseite (Orchestrator/Fable)
- D Welle 2 (50 Grunts): GEO/SEO-Seiten nach R3-SEITENPLAN.json,
  danach Integration (sitemap/llms/wissen-Hub skriptgeneriert)
- E Welle 3: Humanizer-Sweep über alle page.tsx
- F Verifikation: build 100 %, alle Routen 200, Greps, Screenshots, Push

## Verträge (vor Fan-out fixiert)
- Supabase: NUR Präfix bw_ (bw_lead, bw_lead_event, bw_lead_notiz, bw_mail_log,
  bw_konto, bw_konto_code, bw_tool_lauf). Zugriff ausschließlich über
  SECURITY-DEFINER-RPCs mit CONTENT_WRITE_SECRET (Muster src/lib/os/db.ts).
  Client: src/lib/crm/db.ts (B8 legt an, B7/B9 nutzen NUR diese Datei).
- Rechner: reine Funktionen in src/lib/rechner/*.ts (B1), UI-Seiten (B2–B4)
  importieren NUR daraus. Keine Steuer-/Rechtsberatungs-Versprechen; jede
  Ergebnisansicht trägt den Satz „Orientierungswert, kein Gutachten".
- „kostenlos": bleibt global verboten AUSSER unter /tools/* und im T-Cluster
  des Seitenplans (Eigentümer-Suchwort). Gate greift entsprechend.
- Design: bestehendes System (Helvena, Pastellgelb-Akzent, nie kursiv,
  Motion-Tokens, LogoSlot/SektionsKopf/GelbeKarte/Reveal). Referenzseiten:
  marketing-bautraeger (Aufbau), seo-fuer-immobilienmakler (Wissen-Layout).
- E-Mail: emailLayout aus src/lib/email.ts ist die einzige Hülle.
  Absender-Ton: hilfreich, kurz, menschlich; keine Marketing-Floskeln.
- Adresse: Ludwigshafen verschwindet aus dem FOOTER (Impressum/Datenschutz/
  SchemaOrg behalten die Rechtsangaben).

## Status-Log (append-only)
- [x] A1 Plan/Gates/verify geschrieben
- [x] A2 Footer ohne Ludwigshafen · A3 bw_-Schema+RPCs in beuwy Funnels (Migrationen r3_crm_bw_schema/r3_crm_bw_rpcs)
- [x] Vertrag src/lib/crm/db.ts fixiert · Welle B (9 Grunts) gestartet · Welle D (13 Grunts/50 Seiten) gestartet
- [x] C VSL-Umbau: Anfassen-Sektion (Tools) vor Beweis, Danach-Block als eigene Sektion hinter Beweis
- [x] Integration vorbereitet: sitemap+llms+Nav+Footer+/wissen-Hub (datengetrieben)
