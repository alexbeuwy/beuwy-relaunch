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
- `docs/branding/KPI-LOGIK.md` — Kennzahlen + Entscheidungsschwellen
- `docs/branding/skripte/` — Skript-Batches (Batch-Nummern fortlaufend)

Kurzfassung: Einzeiler-Idee rein → 5–10 sofort drehbare Skripte raus,
deutsch, in Alex' Sprache, ohne Floskeln. Strategie ist fix und wird
nicht diskutiert.

## Branding-OS Dashboard

`/os` (`src/app/os/`) — internes KPI-Dashboard, noindex, nicht verlinkt.
Daten liegen in v1 im localStorage des Browsers (`beuwy-os-v1`).
