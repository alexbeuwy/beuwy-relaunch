# beuwy-relaunch

Next.js 15 · TypeScript · Tailwind v4 · Deutsch. Site-Struktur und Tokens:
siehe `README.md` und `src/app/globals.css`. Commit-Messages auf Deutsch,
im Stil der bestehenden History.

## Antigravity-Protokoll (aktiv)

Für alles rund um Personal Branding, Reel-Skripte, Hooks, Content-Ideen
und das `/os`-Dashboard gilt das Antigravity-Protokoll — Skill
`.claude/skills/antigravity/` lädt es. Quelle der Wahrheit:

- `docs/branding/PROTOKOLL.md` — Rolle, fixe Strategie, Creative Unlock Rule
- `docs/branding/SPRACHPROFIL.md` — Alex' Stimme (Pflicht für jede Copy)
- `docs/branding/HOOK-PATTERNS.md` — 3 Hook-Varianten pro Skript
- `docs/branding/SKELETTE.md` — bewiesene Strukturen, Bildaufbau, Schnittplan
- `docs/branding/STIMMKORPUS.md` — echte Sätze von Alex (Few-Shot, nie kopieren)
- `docs/branding/KI-TELLS.md` — deutsche KI-Muster, Scoring, Gate (Score < 3)
- `docs/branding/PIPELINE.md` — Werkzeugkette Recherche → Schnitt, Modell-Rollen
- `docs/branding/KPI-LOGIK.md` — Kennzahlen + Entscheidungsschwellen
- `docs/branding/referenzen/` — fremde Reels: Transkript, Beats, Skelett-Analyse
  (`scripts/referenz/referenz.py` holt und transkribiert)
- `docs/branding/skripte/` — Skript-Batches (Batch-Nummern fortlaufend)
- `scripts/schnitt/` — Schnitt-System: Stilkatalog, Stille raus, Zooms,
  Captions, Karten; Render mit HyperFrames, Resolve optional (README dort)
- `.claude/agents/` — Reel-OS-Agenten (referenz, skript, hook, kritiker,
  schnittplan, schnitt); Orchestrator ist der Skill `/reel`

Kurzfassung: Einzeiler-Idee oder Referenz-Transkript rein → sofort
drehbare Skripte raus, in ein bewiesenes Skelett geschrieben, mit
Schnittplan, deutsch, in Alex' Sprache, gemessen gegen KI-TELLS.
Strategie ist fix und wird nicht diskutiert.

## Branding-OS

`/os` — internes Dashboard hinter dem Studio-Login (dasselbe Cookie wie
`/studio`, von dort verlinkt), noindex. Nav und Footer sind dort
ausgeblendet (`NurWebsite`).

- `src/lib/os/` — `db` (Supabase-RPCs), `instagram`, `tiktok` (Ingest),
  `kpi` (Entscheidungs-Engine), `skript-engine` (Opus schreibt, Sonnet
  kritisiert, Referenz-Modus), `ki-tells` (Scanner nach KI-TELLS.md),
  `stimme` (ElevenLabs), `zugang` (Cookie oder Cron-Secret)
- `src/app/api/os/` — `sync`, `skripte`, `stimme`, `wochenreport`
- `supabase/os-schema.sql` — Tabellen und Zugriffsschicht
- `docs/branding/ANBINDUNGEN.md` — welche Env-Variable wo herkommt

Schwellen der Entscheidungs-Engine stehen in `docs/branding/KPI-LOGIK.md`
und sind in `kpi.ts` umgesetzt — beides zusammen ändern, nie einzeln.
Die Skript-Engine liest die Markdown-Dateien aus `docs/branding/` zur
Laufzeit; sie sind die einzige Quelle der Wahrheit für Ton und Regeln.
`KI-TELLS.md` und `ki-tells.ts` gehören zusammen — beides ändern, nie
einzeln. `OS_PHASE=2` gibt die Phase-2-Säulen frei; ohne die Variable
lehnt die Engine Immobilien-Inhalte ab.
