# beuwy — v2 Linear Redesign

Operator-led Studio · Brand · Site · Agent-Layer in 10 Tagen.

Next.js 15 · TypeScript · Tailwind v3 · `Fraunces 400 (-0.02em)` für Headlines · `Inter` für Body.

## Quickstart

```bash
npm install
npm run dev   # http://localhost:3000  · Tina-Editor unter /admin/index.html
npm run build # production build
```

## Inhalte editieren — TinaCMS

Die Homepage liest ihren Copy aus `content/pages/home.json`. Du editierst sie auf zwei Wegen:

**A · Visueller Editor (empfohlen):**
1. `npm run dev` starten
2. Browser öffnen: <http://localhost:3000/admin/index.html>
3. Im Editor auf "Pages → home" klicken — alle Sektionen sind als Felder gegliedert (01 Hero, 02 Pain, …)
4. Tippen, speichern. Tina schreibt direkt in `content/pages/home.json` auf der Disk.
5. Commit & push wie gewohnt — Vercel deployt.

**B · Direkt im JSON (für Schnellfixes):**
- `content/pages/home.json` öffnen, Wort ändern, speichern. Tina-Schema und Page-Komponente lesen identisch.

**Tina Cloud (optional, für Edit von unterwegs):**
- Account auf <https://app.tina.io> erstellen, Projekt linken
- `NEXT_PUBLIC_TINA_CLIENT_ID` und `TINA_TOKEN` als Env-Vars setzen (siehe `.env.example`)
- Build-Script auf `npm run build:cloud` umstellen — Tina speichert dann in der Cloud, Vercel zieht beim Deploy

## Branch

Dieser Code lebt auf dem Branch `v2-linear-redesign`. Push, in Vercel connecten — fertig.

## Struktur

```
src/
  app/
    page.tsx          → Landing · 12 Sektionen Sales-Faden (liest content/pages/home.json)
    method/           → 4-Phasen Methode + Pricing
    work/             → Case-Studies
    system/           → DESIGN.md Editor View
    manifesto/        → Agent-Ära These
    anfrage/          → Brief / Kontakt
    globals.css       → Tokens + Buttons + Animations
  components/
    Logo · Nav · Footer · Section · Editor · EmailMockup · Reveal
content/
  pages/home.json     → Source-of-Truth für alle Homepage-Texte (Tina-editierbar)
tina/
  config.ts           → Schema der editierbaren Felder pro Sektion
  __generated__/      → Auto-generierte GraphQL/TS Types (commited)
```

## Design Tokens

- `--bg-base`     #1A0404   (Page background, etwas dunkler als #210606)
- `--bg-raised`   #210606   (Card surface — beuwy Super-Dark Red)
- `--ink-yellow`  #F7E99A   (Headlines + Akzent — beuwy Yellow)
- `--ink-cream`   #F2EFE1   (Body)
- `--ink-muted`   #C2B89F   (Sekundär)
- `--line-subtle` rgba(247,233,154,0.08)

## Red Thread Sektionen (Landing)

01 Hook · 02 Pain · 03 Dream · 04 Mechanism · 05 Proof · 06 Authority ·
07 Offer · 08 Scarcity · 09 Disqualifier · 10 Paths · 11 Magnet · 12 Close.

<!-- redeploy-trigger: 2026-05-11T14:55:30.779767+00:00 -->
