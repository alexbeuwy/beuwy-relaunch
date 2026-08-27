# beuwy-relaunch

Next.js 15 · TypeScript · Tailwind v4 · Deutsch, Sie-Form. Commit-Messages
auf Deutsch, im Stil der bestehenden History. Struktur: `README.md`.

## Design-Richtung (seit 2026-08: „Light Makler Style")

beuwy positioniert sich als Premium-Boutique für **führende
Immobilienmakler**: Marke, Website, E-Mail/Funnel, Automatisierung —
done for you, in Wochen statt Quartalen.

- Stil: `editorial-premium` (Taste-Skill-Pack) — hell, viel Weißraum,
  ein Fokus-Element pro Viewport.
- Farben: reines Weiß `#FFFFFF`, neutrale Tinte, **Pastellgelb** als
  einziger Akzent. Kein warmes Papier, keine Verläufe, kein Riso mehr.
- Typo: **Helvena für alles** — Headlines und Fließtext. Inter ist raus.
  GeistMono nur für tabellarische Zahlen. **Nie kursiv** (globale
  em/i-Neutralisierung in `globals.css`) — Betonung über Farbe,
  Gewicht oder Highlighter.
- Motion: ausschließlich über die Motion-Tokens in `globals.css`
  (transitions-dev-Skala). Keine Ad-hoc-Durations.
- Bilder/Video: BunnyCDN `beuwy-2.b-cdn.net/assets/makler assets/`
  (19 Fotos + `hero-video.webm`). KI-Bilder tragen eine Mikro-Pill
  „AI Visual" und werden nie als Team/Kunden gelabelt.
- Jede Headline und jeder Block erfüllt einen VSL-Zweck (Hook →
  Problem → Abgrenzung → Beweis → Qualifizierung → CTA). CTA-Wortlaut:
  „Zusammenarbeit anfragen" → Vorquali-Funnel → Terminbuchung.
- Kennzahlen/Kundennamen sind Studio-editierbar (`src/lib/content.ts`),
  nicht hart im Code.

**Studio-Pflicht (Alex, 27.08):** Jede neue nutzerlesbare Textfläche
registriert ihre Texte als Keys unter `src/lib/texte/<bereich>.ts`
(defaults + labels, von `content.ts` gespreadet) und liest sie über
`getContent()` — Alex korrigiert Texte im Studio ohne LLM.

Masterbrief und Arbeitsstand: `docs/redesign/BRIEF.md` + `PLAN.md`.
SEO-Seitenarchitektur (Hub, Leadgen, Maklerwebsite, onOffice, Ranking,
Cluster) steht im Brief — deutsche Titles mit Keyword, kein Onepager.

## Studio & interne Werkzeuge

- `/studio` — Text-CMS hinter Cookie-Login; jeder Seitentext läuft über
  Keys in `src/lib/content.ts` (Supabase-Overrides, fail-open).
- `/os` — Branding-OS-Dashboard (gleiches Cookie, aus dem Studio
  verlinkt), noindex. Nav/Footer dort ausgeblendet (`NurWebsite`).
  Bausteine: `src/lib/os/` (Ingest Instagram/TikTok, KPI-Engine,
  Skript-Engine, ElevenLabs), Cron in `vercel.json`,
  Schema `supabase/os-schema.sql`, Env-Doku `docs/branding/ANBINDUNGEN.md`.
- KPI-Schwellen: `docs/branding/KPI-LOGIK.md` und `src/lib/os/kpi.ts`
  immer zusammen ändern.

## Antigravity-Protokoll (aktiv)

Personal-Branding-Content (Reel-Skripte, Hooks, Content-Ideen): Skill
`.claude/skills/antigravity/` lädt das Protokoll aus `docs/branding/`
(PROTOKOLL, SPRACHPROFIL, HOOK-PATTERNS — einzige Quelle der Wahrheit,
wird von der Skript-Engine zur Laufzeit gelesen). Einzeiler rein →
5–10 drehfertige Skripte raus, deutsch, ohne Floskeln.
