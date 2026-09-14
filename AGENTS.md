# AGENTS.md — Spielregeln für jeden Agent in diesem Repo (Codex, Claude, Mensch)

Erst lesen: `CLAUDE.md` (Design-Richtung, Studio-Pflicht, Gates) und
`docs/redesign/MASTERPLAN.md` (Nordstern, Backlog, Tick-Protokoll).
Diese Datei regelt nur das Zusammenspiel mehrerer Agents.

## Branches

- Integrationsbranch: `claude/light-makler-style` (PR #8 → `main`).
  Darauf committet der stündliche Claude-Loop direkt.
- Jeder andere Agent arbeitet auf einem eigenen Branch
  (`codex/<thema>`), abgezweigt vom aktuellen Integrationsbranch, und
  öffnet einen PR **gegen `claude/light-makler-style`**, nicht gegen
  `main`. Vor jedem Push: `git pull --rebase origin claude/light-makler-style`.
- Nie force-pushen, nie History auf fremden Branches umschreiben.

## Zuständigkeiten (Konflikte vermeiden)

**Loop-Zone (Claude, stündlich):** Startseiten-Strecke und Motion —
`src/components/MaklerHero.tsx`, `StartOben.tsx`, `StartUnten.tsx`,
`src/components/vergleich/**`, `src/components/motion/**`,
`src/components/VasenTiefe*`, `src/lib/texte/**`, `src/lib/content.ts`,
`src/app/llms.txt/**`, `docs/redesign/MASTERPLAN.md`.

**Frei für Codex (ohne Absprache):** alle Cluster-/Wissens-/Leistungs-
Seiten unter `src/app/<slug>/page.tsx` (außer `page.tsx` der Startseite
und `anfrage/`), `src/app/tools/**` + `src/components/bewertung/**`,
`src/app/intern/**` + `src/lib/crm/**`, `src/app/api/**`, `scripts/`,
`tools/`.

Wer einen Backlog-Punkt aus dem Masterplan übernimmt, markiert ihn
dort mit `[~] Codex` (bzw. `[~] Claude`). Der Loop lässt markierte
Punkte in Ruhe. Nach dem Merge: `[x]` + Log-Zeile.

## Gates

**Studio-Pflicht ist ein Gate (R11):** jeder nutzerlesbare Text einer
öffentlichen Seite/Komponente ist ein Studio-Key (`src/lib/texte/seiten/<slug>.ts`,
Lesen über `seitenTexte()` aus `src/lib/texte/lesen.ts`). `node tools/texte-scan.mjs`
muss 0 Treffer liefern — `scripts/verify.mjs` prüft das. Neue Seite = neue
Textdatei + `node tools/texte-index.mjs`. (gelten für alle, kein Push ohne)

1. `npx tsc --noEmit` = 0 Fehler
2. `npx next build` grün
3. Server auf :3100 (`npx next start -p 3100`) + `node scripts/verify.mjs`
   → muss `VERIFY: OK` melden (alle Routen 200, Marken-Greps)
4. Screenshot-Abnahme sichtbarer Änderungen (Desktop 1440 + Mobil 390,
   Muster: `tools/shot.mjs`; Playwright-Chromium unter
   `/opt/pw-browsers/chromium`, CDN-Bilder werden aus
   `docs/redesign/refs/fotos/` bedient)
5. Studio-Pflicht: neue nutzerlesbare Texte als Keys in
   `src/lib/texte/<bereich>.ts`, gelesen über `getContent()`
6. Marken-Regeln: kein Gold, nie kursiv, „kostenlos" nur unter /tools
   und im Tools-Cluster, kein „Portal" als Nutzenwort (Markenwort ist
   „System"), kein Ludwigshafen im Footer, KI-Bilder mit `<AiPille />`
7. Motion nur über die Tokens in `globals.css`; Scroll-Scrubs
   (gsap/CSS view-timeline) sind die dokumentierte Ausnahme

## Commits

Deutsch, Imperativ-frei im Stil der History („Loop-Tick 2 (A2a):
FAQPage-Schema …"), Body erklärt das Warum. Keine Modell-Namen in
Commits oder Code-Kommentaren.

## Lokale Umgebung

Env-Variablen: siehe `docs/branding/ANBINDUNGEN.md`. Ohne Supabase-
Env läuft alles fail-open (Demo-Daten); `/intern` und `/studio`
brauchen `STUDIO_PASSWORD`. Secrets niemals in Prompts, Commits oder
Screenshots.
