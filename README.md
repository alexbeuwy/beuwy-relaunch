# beuwy — Relaunch

Operator-led Studio · Brand · Site · Agent-Layer in 10 Tagen.

Next.js 15 · TypeScript · Tailwind v3 · `Fraunces 400 (-0.02em)` für Headlines · `Geist Sans` für Body · `Geist Mono` für Meta/Code.

> **📓 Voller Projekt-Kontext (Business-Ziel, Architektur, CMS-Grenzen, Funnel,
> Playbook, Backlog):** [`docs/PROJECT.md`](./docs/PROJECT.md) — das Master-Dokument.
> Funnel-Detail: [`docs/funnel-strategy.md`](./docs/funnel-strategy.md).
> Dieses README ist nur der Dev-Quickstart.

## Quickstart

```bash
npm install
npm run dev   # http://localhost:3000  · Visual Editor unter /build
npm run build # production build
```

## Inhalte editieren — Puck Visual Builder

Jede Seite ist ein Puck-Dokument unter `content/puck/<slug>.json`. Die Homepage ist
`content/puck/home.json` und wird unter `/` ausgeliefert. Editiert wird per echtem
Drag-Drop:

1. `npm run dev` starten
2. Browser öffnen: <http://localhost:3000/build>
3. Seite wählen (`/  (Homepage)` ist als **LIVE** markiert) → **Edit**
4. Sektionen mit der Maus ziehen/umsortieren, neue aus der Palette hinzufügen,
   Felder rechts editieren. **Publish** klicken zum Speichern.

**Persistenz:**
- **Lokal (`next dev`):** Speichern schreibt direkt `content/puck/<slug>.json` auf die Disk.
- **Production (Vercel):** Speichern committet die JSON via GitHub-API auf den
  Deploy-Branch → Vercel deployt automatisch neu. Dafür `GITHUB_TOKEN` setzen
  (fine-grained PAT, *Contents: Read and write*). Siehe `.env.example`.

**Neue Landingpage:** Auf `/build` einen Slug eingeben → leerer Editor → bauen →
Publish. Live unter `/p/<slug>`.

**Zugriffsschutz:** `/build` und `/api/puck/*` sind per HTTP Basic Auth geschützt
(`EDITOR_USER` / `EDITOR_PASSWORD`). In Production *fail-closed* (ohne gesetzte
Credentials → 401), in lokalem `next dev` *fail-open* (kein Login nötig).

## Branch

Dieser Code lebt auf dem Branch `v2-linear-redesign`. Push, in Vercel connecten — fertig.
Env-Vars in Vercel setzen: `EDITOR_USER`, `EDITOR_PASSWORD`, `GITHUB_TOKEN`.

## Struktur

```
src/
  app/
    page.tsx          → Homepage · rendert content/puck/home.json via Puck <Render> (SSG)
    build/            → Visual Editor · /build (Liste) + /build/[slug] (Drag-Drop)
    p/[slug]/         → öffentliches Rendering einer Puck-Page
    api/puck/[slug]/  → GET/POST Persistenz (Filesystem lokal · Git-commit in Prod)
    method/ work/ system/ manifesto/ anfrage/
    globals.css       → Tokens + Buttons + Animations
  blocks/             → 15 React-Block-Komponenten (Hero, Pain, Dream, … Faq)
  puck/config.tsx     → Puck-Registry: mappt Blöcke auf Editor-Felder + Defaults
  lib/github.ts       → commitFileToGitHub() — GET-sha-then-PUT Contents API
  middleware.ts       → Basic-Auth-Gate für /build + /api/puck
  components/         → Logo · Nav · Footer · Section · Editor · EmailMockup · Reveal
content/
  puck/home.json      → Source-of-Truth der Homepage (Puck-Format)
  puck/<slug>.json    → weitere Landingpages
```

## Design Tokens

Autoritativ: `src/app/globals.css` (`:root`) + `tailwind.config.ts`. Vollständige
Tabelle in [`docs/PROJECT.md` §8](./docs/PROJECT.md#8--design-system-autoritativ).

- `--bg-base`     #1A0404   (Page background — bordeaux-ink)
- `--bg-raised`   #210606   (Card surface — superdark)
- `--bg-elevated` #3A0808   (höchste Elevation — bordeaux)
- `--ink-yellow`  #F7E99A   (Headlines + Akzent — beuwy Yellow)
- `--ink-cream`   #FFFDF3   (Body)
- `--ink-muted`   #C2B89F   (Sekundär)
- `--ink-dim`     #8A8068   (Meta/Tertiär)
- `--accent-red`  #FF5F5F   (Signal)
- `--line-subtle` rgba(247,233,154,0.08)

## Home-Sektionen (Puck-Blöcke, content/puck/home.json)

01 Hero · 02 Pain · 03 Dream · 04 Mechanism · 05 Proof · 06 Offer ·
07 Scarcity · 08 Identification · 09 Magnet · 10 Faq · 11 BigCta.

> Hinweis: Nur Home + `/p/<slug>` sind Puck-/CMS-editierbar. Die Sales-/Trust-Seiten
> (`/sichtbar`, `/method`, `/system`, `/work`, `/work/[slug]`, `/go/*`) sind hardcoded
> React — siehe [`docs/PROJECT.md` §6](./docs/PROJECT.md#6--das-cms-puck--komplett).

<!-- redeploy-trigger: 2026-05-11T14:55:30.779767+00:00 -->
