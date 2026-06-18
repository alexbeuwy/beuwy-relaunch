# beuwy — Projekt-Kontext (Master-Dokument)

> **Single Source of Truth.** Wenn du (oder ein Operator, ein Co-Founder, ein
> KI-Agent) wissen willst, *was beuwy ist, wohin es soll, wie die Site gebaut
> ist und wie man sie weiterbaut* — die Antwort steht hier oder ist von hier
> verlinkt. Damit Kontext nie verloren geht.
>
> **Letzte Aktualisierung:** 2026-06 · Branch `claude/beuwy-homepage-redesign-3t2Ao`
>
> **Verwandte Docs:**
> - [`docs/RELAUNCH-TIER-STRATEGY.md`](./RELAUNCH-TIER-STRATEGY.md) — **Strategie-Vorschlag** für den €50k/Monat-Motor (produktisierter „Relaunch"-Tier, Pricing, Scope, Delivery-System, Operator-Last). *Vorschlag — wartet auf Entscheidung.*
> - [`docs/funnel-strategy.md`](./funnel-strategy.md) — Funnel-Architektur, Schwartz-Stages, A/B-Plan, Beweis-Hygiene, Anti-Patterns
> - [`README.md`](../README.md) — Quickstart (dev/build) + Puck-Editor-Kurzanleitung
> - [`public/assets/operator/README.md`](../public/assets/operator/README.md) — Founder-Foto-Drop-Zone

---

## Inhalt

1. [North Star — das Geschäftsziel](#1--north-star--das-geschäftsziel)
2. [Die €50k/Monat-Rechnung (ehrlich)](#2--die-50kmonat-rechnung-ehrlich)
3. [Was beuwy verkauft — Offer-Ladder](#3--was-beuwy-verkauft--offer-ladder)
4. [Positionierung & Messaging](#4--positionierung--messaging)
5. [Tech-Architektur](#5--tech-architektur)
6. [Das CMS (Puck) — komplett](#6--das-cms-puck--komplett)
7. [Route-Map — was editierbar ist und was nicht](#7--route-map--was-editierbar-ist-und-was-nicht)
8. [Design-System (autoritativ)](#8--design-system-autoritativ)
9. [Content- & Beweis-Hygiene](#9--content--beweis-hygiene)
10. [Funnel & Growth](#10--funnel--growth)
11. [Playbook — How-to](#11--playbook--how-to)
12. [Konventionen & Guardrails](#12--konventionen--guardrails)
13. [Backlog / offene Punkte](#13--backlog--offene-punkte)
14. [Changelog — was bisher gebaut wurde](#14--changelog--was-bisher-gebaut-wurde)

---

## 1 · North Star — das Geschäftsziel

**Ziel:** **€50.000 Umsatz pro Monat** aus systematisiertem Freelancing — durch
**System & Automatisierung**, nicht durch mehr Stunden.

**Womit:** **Branding + Design + Performance-orientierte Website-Relaunches.**
Das Angebot ist als **No-Brainer-Deal-Maker** gedacht: ein Relaunch, bei dem der
Buyer nicht lange überlegen muss, weil Risiko, Preis und Liefertermin geklärt
sind, bevor er fragt.

**Differenzierung (der Moat):** beuwy baut nicht „eine schönere Website", sondern
die **maschinenlesbare Markenrepräsentation für die Agent-Ära** — die Marke, die
ein KI-Agent (Claude, GPT, Perplexity, Google AI Overviews) *zuerst empfiehlt*,
wenn ein Buyer fragt statt googelt. Das ist der „Agent-Layer", den die Site verkauft.

**Operator:** Alexander Pütter (Heidelberg). Brand-Arbeit seit 2009 (Bosch,
Continental, Michelin), beuwy seit 2017, 2023 selbst Unternehmer (315 Wohnungen
über Instagram, €48,4M). Solo-Operator-Modell: „du sprichst mit dem, der baut".

> Die Spannung, die alles steuert: **ein Solo-Operator** + **€50k/Monat** +
> **Premium-Ticket** geht nur über **System & Automatisierung** und eine
> **Offer-Ladder**, nicht über bespoke Handarbeit allein. Siehe §2.

---

## 2 · Die €50k/Monat-Rechnung (ehrlich)

> Dieser Abschnitt ist Analyse, keine Behauptung. Annahmen sind als *(Annahme)*
> markiert. Er existiert, damit die zentrale strategische Frage nie aus dem Blick
> gerät: **Welches Angebot trägt die €50k — und skaliert es ohne den Operator zu
> verbrennen?**

€50k/Monat = **€600k/Jahr**. Die aktuelle Site positioniert primär das **System
ab €38.000** mit **6 Mandaten/Jahr** als Scarcity. Daraus folgt sofort eine
Lücke:

| Szenario | Rechnung | Ergebnis/Monat | Problem |
|---|---|---|---|
| **A — nur System, bespoke** | 6 × €38k / Jahr | ~€19k/Mon | Scarcity „6/Jahr" deckelt bei ~€19k. Zu wenig. |
| **A2 — System hochskaliert** | ~16 × €38k / Jahr | ~€50k/Mon | Bräuchte ~16 Mandate — *2,6× die kommunizierte Kapazität* eines Solo-Operators. Nur mit Delivery-System machbar. |
| **B — System + Compound-MRR** | 8 × €38k + 6 Retainer à €6,5k *(Annahme)* | ~€45–53k/Mon | Retainer (MRR) stabilisiert. Realistischer, aber Delivery-Last bleibt hoch. |
| **C — produktisierter No-Brainer-Relaunch** | 4 × ~€12k/Mon *(Annahme Preis)* | ~€48k/Mon | Volumen-Motor. Genau das „durch System & Automatisierung". Aktuell auf der Site **unterrepräsentiert**. |

**Synthese (die zentrale Empfehlung):**

- Das **€38k System** ist der **Premium-Anker** — Trust, Positionierung, der
  Agent-Layer-Pitch. Es zieht die wenigen großen Mandate und definiert die Marke.
- Der **€50k/Monat-Motor** ist wahrscheinlich **NICHT** das bespoke System allein,
  sondern ein **produktisierter, systematisierter „No-Brainer-Relaunch"** (Branding
  + Design + Performance) zu einem zugänglicheren Preis, **wiederholbar geliefert
  über Templates, Komponenten-System und Automatisierung** — plus **Compound-Retainer
  als MRR-Stabilisator**.
- Die **Offer-Ladder existiert schon** (Sprint €12,5k / System €38k / Compound
  €6,5k/Mo) — sie ist aber auf der Site dem Premium-System untergeordnet. Für das
  €50k-Ziel muss der **Volumen-/No-Brainer-Tier** ein eigenes, schärferes Schaufenster
  bekommen (eigene Landing, eigener Funnel, klarer Festpreis, Automatisierung in der
  Delivery).

**→ Offene strategische Entscheidung (siehe §13):** Welcher Tier ist der €50k-Motor,
und welches Delivery-System macht ihn ohne Operator-Burnout wiederholbar? Bis das
entschieden ist, bleibt die Site primär ein Premium-Trust-Asset, kein Volumen-Funnel.

---

## 3 · Was beuwy verkauft — Offer-Ladder

| Tier | Preis | Dauer | Inhalt | Rolle |
|---|---|---|---|---|
| **Sprint** | ab €12.500 | 5 Tage | Eine Sektion (Brand · Site · *oder* Agent-Layer) + Audit + 1 Pivot-Empfehlung | Einstieg / Test |
| **System** *(empfohlen)* | ab €38.000 | 10 Werktage | DESIGN.md + Live-Site + Agent-Layer + 30 Tage Compound-Standby | Premium-Anker |
| **Compound** | ab €6.500 / Monat | monatlich | Experimente · Lifecycle · Paid · Cohort-Receipts · Operator-Standby (≤6h) | MRR / Retainer |

**Die drei Auslieferungen des System (der „Agent-Layer"-Mechanismus):**

1. **DESIGN.md** — maschinenlesbare Marken-Quelle: Tokens, Voice, Vocabulary,
   Forbidden Phrases. Wenn ein Agent über die Marke spricht, redet er aus dieser Datei.
2. **Live-Site** — Next.js auf Vercel, eigene Domain, schnell/indizierbar/mobil.
3. **Agent-Layer** — schema.org, llms.txt, Cluster-Brief + GPT-Audit der aktuellen
   Sichtbarkeit über Claude/GPT/Gemini/Perplexity.

**Liefer-Garantie (Risk Reversal):** **„Tag 10 — oder Geld zurück."** Steht das
System nicht am 10. Werktag live auf der Kundendomain → voller Festpreis zurück.
**Gilt für die Auslieferung, NICHT für Rankings/Umsatz** (das garantiert niemand
seriös; UWG-sicher). Verankert in `/system#contract`, gespiegelt auf Home (Offer-Block),
`/sichtbar`, `/go/sichtbar`, `/go/tsl`.

---

## 4 · Positionierung & Messaging

- **Kern-These:** „Bald sucht niemand mehr — man fragt. Wirst du empfohlen?" Der
  Agent steht zwischen Anfrage und Anbieter; in seiner Antwort gibt es **keinen
  zweiten Platz**.
- **Ton:** **Du-Form** (Founder-ICP, kein klassischer Mittelstand). Warm, direkt,
  opinionated, ohne Hype.
- **DACH-Psychologie:** **Beweis vor Hype.** Hofstede-Unsicherheitsvermeidung DE 65
  vs. US 46; unbelegte Superlative sind via UWG abmahnbar. Also: Emotion *im Dienst*
  der Evidenz, jede Zahl mit Quelle, echte Referenzen mit Namen statt „10.000
  zufriedene Kunden".
- **Named Proof:** Vision (€160M KKR JV) · Königswege (170→2.240 Partner) · acta
  (315 Wohnungen / €48,4M) · PURELEI (1M+ Follower). Jede Case hat eine eigene
  Detail-Seite mit Vorher/Nachher + Quellen.
- **ICP:** Founder mit einem Produkt, das besser ist als seine Website zeigt;
  schnelle Entscheider; Schwartz-Sophistication Stage 3–4 (Solution-/Product-aware).
  Details + Audience-Map → [`funnel-strategy.md`](./funnel-strategy.md).

---

## 5 · Tech-Architektur

| Schicht | Wahl |
|---|---|
| Framework | **Next.js 15.5** (App Router) |
| Runtime | **React 19** |
| Sprache | **TypeScript 5.6** (strict) |
| Styling | **Tailwind CSS 3.4** + CSS-Variablen in `globals.css` |
| Page Builder / CMS | **Puck** (`@measured/puck` ^0.20) |
| Fonts | **Fraunces** (Display, Google Fonts) · **Geist Sans/Mono** (Body/Code, `geist`-Package) |
| Deploy | **Vercel** (Build-SHA via `NEXT_PUBLIC_BUILD_SHA` injiziert) |
| Persistenz (CMS) | **GitHub Contents API** (Commit → Vercel-Redeploy) |
| Auth (Editor) | **HTTP Basic Auth** via Edge-Middleware |

**Rendering:** Fast alles ist **statisch** (SSG/prerendered). Puck-Seiten unter
`/p/[slug]` und die Editor-Routen sind `force-dynamic`. Build-Stand: **27 Routen,
alle grün.**

**Verzeichnis-Skelett:**

```
src/
  app/
    layout.tsx              Root-Shell: Fonts, JSON-LD (Org/WebSite/Person), Nav, Footer, Effekte
    page.tsx                Homepage — rendert content/puck/home.json via Puck <Render> (SSG)
    sichtbar/               VSL-Landing (hardcoded, indexed)
    go/sichtbar/            Paid-Traffic-Variante (hardcoded, noindex)
    go/tsl/                 Text Sales Letter (hardcoded, noindex)
    method/ system/ work/   High-ACV-Seiten (hardcoded, indexed)
    work/[slug]/            6 Case-Detail-Pages (SSG aus src/lib/cases.ts)
    manifesto/ anfrage/ audit/   weitere hardcoded Seiten
    map/                    Owner-Cockpit (hardcoded, noindex) — Übersicht ALLER Routen
    p/[slug]/               Öffentliches Rendering einer Puck-Page
    build/ build/[slug]/    Puck-Editor (auth-gated)
    api/puck/[slug]/        GET/POST CMS-Persistenz
    api/puck-redirect/      Slug → /build/[slug]
    api/audit/ api/lead/ api/anfrage/   Funnel-Backends
    sitemap.ts robots.ts opengraph-image.tsx twitter-image.tsx not-found.tsx
    globals.css             Tokens + Utilities + Animationen (AUTORITATIV für Farben)
  blocks/                   15 Puck-Block-Komponenten (Hero, Pain, … Faq)
  components/               Section, Reveal, CountUp, AssetSlot, ChromeGate, Nav, Footer, JsonLd, …
  puck/config.tsx           Puck-Registry: Blöcke → Editor-Felder + Defaults
  lib/cases.ts              Single source of truth für Case-Studies
  lib/github.ts             commitFileToGitHub() — GET-sha-then-PUT
  middleware.ts             Basic-Auth-Gate für /build + /api/puck
content/puck/
  home.json                 Homepage-Inhalt (Puck-Format) — EDITIERBAR
  demo.json                 Spielwiese
public/assets/
  operator/                 Founder-Foto-Drop-Zone (+ README)
  cases/                    Case-Hero-Bilder (<slug>-hero.jpg)
docs/
  PROJECT.md                ← dieses Dokument
  funnel-strategy.md        Funnel-/Growth-Detail
```

---

## 6 · Das CMS (Puck) — komplett

> **Direkte Antwort auf „Was ist mit dem CMS?":** Das CMS ist **Puck**, ein
> visueller Drag-Drop-Builder, Git-backed. Es ist **voll funktionsfähig** —
> **aber es steuert aktuell nur die Homepage** (und beliebige neue `/p/<slug>`-
> Landingpages). Die hochwertigen Sales-/Trust-Seiten, die zuletzt gebaut wurden
> (`/sichtbar`, `/method`, `/system`, `/work`, `/work/[slug]`, `/go/*`), sind
> **hardcoded React und NICHT im Editor bearbeitbar.** Das ist eine bewusste
> Trade-off-Entscheidung (Kontrolle/Craft vs. Editierbarkeit) — siehe unten.

### 6.1 Wie es funktioniert

- **Jede Puck-Seite = eine JSON-Datei** unter `content/puck/<slug>.json` im
  Puck-`Data`-Format: `{ content: [{ type, props }], root: { props } }`.
- **Homepage:** `content/puck/home.json`, statisch importiert in `app/page.tsx`,
  ausgeliefert unter `/` (SSG). Editierbar unter `/build/home`.
- **Weitere Puck-Pages:** rendern unter `/p/<slug>` (`force-dynamic`, liest die
  Datei zur Request-Zeit). Editierbar unter `/build/<slug>`.
- **15 Blöcke** sind in `src/puck/config.tsx` registriert (Hero, Pain, Dream,
  Mechanism, Proof, Offer, Scarcity, Identification, Magnet, BigCta, ImageWithText,
  SingleImage, Quote, LogoWall, Faq) — jeder mit Editor-Feldern + Defaults.

### 6.2 Editor-Oberfläche

- **`/build`** — listet alle Puck-Pages, markiert `home` als **LIVE**, „Neue Page"-
  Formular (Slug → `/api/puck-redirect` → `/build/<slug>`).
- **`/build/<slug>`** — der echte Drag-Drop-Puck-Editor. Lädt die JSON (oder leer),
  „Publish" ruft `POST /api/puck/<slug>`.

### 6.3 Persistenz (zwei Backends, gleiche Datei)

`POST /api/puck/<slug>` (Node-Runtime):

1. **Lokal (`next dev`):** schreibt `content/puck/<slug>.json` direkt auf Disk → HMR.
2. **Production (Vercel):** Vercel-FS ist read-only → committet die JSON via
   **GitHub Contents API** (`lib/github.ts`, GET-sha-then-PUT) auf den Deploy-Branch
   → **Vercel deployt automatisch neu** → Inhalt geht beim nächsten Build live.

### 6.4 Auth (Schutz)

`src/middleware.ts` schützt `/build`, `/build/*`, `/api/puck/*` per **HTTP Basic
Auth** (Edge-Runtime, konstantzeitiger SHA-256-Vergleich):

- **Production:** *fail-closed* — ohne `EDITOR_USER`/`EDITOR_PASSWORD` → 401.
- **Lokal (`next dev`):** *fail-open* — kein Login nötig.

### 6.5 Environment-Variablen

| Var | Zweck | Pflicht |
|---|---|---|
| `EDITOR_USER` / `EDITOR_PASSWORD` | Basic-Auth für Editor | Prod: ja |
| `GITHUB_TOKEN` | Commit-Persistenz (fine-grained PAT *Contents: R/W*, oder classic `repo`) | Prod: ja |
| `GITHUB_OWNER` | Default `alexbeuwy` | nein |
| `GITHUB_REPO` | Default `beuwy-relaunch` | nein |
| `GITHUB_COMMIT_BRANCH` | Fallback: `VERCEL_GIT_COMMIT_REF` → `main` | nein |

### 6.6 Die wichtige Einschränkung + Empfehlung

**Editierbar im CMS:** `/` (home) und alle `/p/<slug>` Puck-Pages.
**NICHT editierbar (hardcoded React):** `/sichtbar`, `/method`, `/system`, `/work`,
`/work/[slug]`, `/go/sichtbar`, `/go/tsl`, `/manifesto`, `/audit`, `/anfrage`, `/map`.

**Warum hardcoded:** Diese Seiten brauchen psychologische Copy-Dichte, präzise
Sequenzierung und Layout-Kontrolle, die über die Block-Formen hinausgeht. Die
neuesten Premium-Seiten (`/system`, `/method`) waren bereits vor diesen Änderungen
hardcoded — das Team akzeptiert hardcoded für Premium-Craft.

**Optionen für die Zukunft (Entscheidung offen, §13):**
- **(a) So lassen:** Sales-Seiten als Code (Entwickler ändert), Home + neue
  Kampagnen-Landings via Puck. *Empfohlen, solange Alex/ein Dev die Seiten pflegt.*
- **(b) Portieren:** `/sichtbar` & Co. in Puck-Pages überführen (mehr Blöcke nötig:
  ein „VSL-Long-Form"-Block, „Vergleichsmatrix"-Block, „Garantie-Seal"-Block). Macht
  sie editierbar, kostet Block-Engineering und etwas Craft-Kontrolle.
- **(c) Hybrid:** die *Kampagnen*-Landings (`/go/*`) als Puck bauen, damit Marketing
  schnell Varianten testen kann, die Trust-Seiten als Code lassen.

---

## 7 · Route-Map — was editierbar ist und was nicht

> Lebende Übersicht auch unter **`/map`** (Owner-Cockpit, im Browser klickbar).

| Route | Typ | Index | CMS-editierbar | Zweck |
|---|---|---|---|---|
| `/` | Puck (SSG) | ✅ | ✅ `/build/home` | Homepage |
| `/sichtbar` | Hardcoded | ✅ | ❌ | Premium VSL-Landing |
| `/method` | Hardcoded | ✅ | ❌ | Methode + Vergleich + Pricing |
| `/work` | Hardcoded | ✅ | ❌ | Case-Index |
| `/work/[slug]` ×6 | SSG (`lib/cases.ts`) | ✅ | ❌ (Daten in `cases.ts`) | Case-Detail mit Vorher/Nachher |
| `/system` | Hardcoded | ✅ | ❌ | Premium-Tier + Liefervertrag + Garantie |
| `/manifesto` | Hardcoded | ✅ | ❌ | Vision/Thesis |
| `/audit` | Hardcoded + API | ✅ | ❌ | Free GPT-Audit (Funnel-Qualifier) |
| `/anfrage` | Hardcoded + API | ✅ | ❌ | Lead-Formular (Brief) |
| `/go/sichtbar` | Hardcoded | ❌ noindex | ❌ | Paid-Traffic-VSL (Meta/YT) |
| `/go/tsl` | Hardcoded | ❌ noindex | ❌ | Text Sales Letter (DM/Email) |
| `/map` | Hardcoded | ❌ noindex | ❌ | Owner-Cockpit |
| `/p/[slug]` | Puck (dynamic) | (slug-abh.) | ✅ `/build/<slug>` | Beliebige neue Puck-Landing |
| `/build`, `/build/[slug]` | Admin | ❌ | — | Puck-Editor (auth) |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt` | System | ✅ | ❌ | Crawler/Agent-Infra |

**Nav (bewusst schlank):** Methode · Arbeit · System · Manifest. `/sichtbar` lebt im
**Footer** + `/map`; die `/go/*`-Funnels sind absichtlich nirgends verlinkt
(nur über Ads/Outbound + `/map`).

---

## 8 · Design-System (autoritativ)

> **Autoritative Quelle = `src/app/globals.css` (`:root`) + `tailwind.config.ts`.**
> Komponenten nutzen die **CSS-Variablen** (`var(--ink-yellow)`), nicht die
> Tailwind-Tokens — bei Drift gewinnt `globals.css`.

**Farben (Bordeaux / Cream / Gold):**

| Variable | Wert | Verwendung |
|---|---|---|
| `--bg-base` | `#1A0404` | Seiten-Hintergrund (bordeaux-ink) |
| `--bg-raised` | `#210606` | Karten/Panels (superdark) |
| `--bg-elevated` | `#3A0808` | höchste Elevation (bordeaux) |
| `--ink-yellow` | `#F7E99A` | Headlines, Akzent, CTAs |
| `--ink-cream` | `#FFFDF3` | Body-Text |
| `--ink-muted` | `#C2B89F` | Sekundärtext |
| `--ink-dim` | `#8A8068` | Meta/Tertiär |
| `--line-subtle` / `-medium` / `-strong` | gelb-alpha / `#F7E99A` | Hairlines/Borders |
| `--accent-red` | `#FF5F5F` | Signal (Fehler/„Vorher") |
| `#B23A48` | (literal) | Rot-Akzent auf Cream-Bändern |

**Fonts:**
- **Display:** Fraunces 400, Italic für Emphasis, `letter-spacing -0.02em` → `.h-display`, `HeadlineDisplay`, `.h-display-xl/-md`.
- **Body:** Geist Sans (`--font-body` = `--font-geist-sans`).
- **Mono:** Geist Mono (`--font-mono`) — Meta-Labels, Eyebrows, Quellen.

**Section-Tones:** `base` · `raised` · `elevated` · `cream` (hell, dunkle Schrift) · `bright`.

**Kern-Komponenten:** `Section` + `HeadlineDisplay`, `Reveal` (Scroll-Fade),
`CountUp` (animierte Zahlen), `AssetSlot` (Bild/Video-Platzhalter mit AI-Prompt-Hint),
`ChromeGate` (versteckt Nav/Footer auf `/go/*`), `JsonLd` (+ Helper `breadcrumbLd`,
`faqPageLd`, `serviceLd`, `founderLd`, `organizationLd`), `Nav`, `Footer`.

**Utility-Klassen:** `.btn-primary`, `.btn-secondary`, `.card`, `.glass`, `.chip`,
`.eyebrow`/`.eyebrow-rule`, `.gradient-text`, `.stat-num-display`, `.tnum`.

**Wichtige Konvention:** Es gibt **keine** `.h-display-lg`-Klasse — für „lg"
die `HeadlineDisplay`-Komponente (`size="lg"`) nutzen, nicht eine rohe Klasse.

---

## 9 · Content- & Beweis-Hygiene

Jede kundenseitige Zahl braucht eine **reale, datierte, möglichst verlinkbare
Quelle**. Vollständige Bulletproof- und Do-Not-Use-Listen → [`funnel-strategy.md` §6](./funnel-strategy.md).

**Cite-able (Auszug):** Pew 8%/15% Klick (07/2025) · Bitkom 64% Nachzügler (03/2025)
· Destatis 20%/17% KI-Nutzung (11/2024) · Gartner −25% Suchvolumen (02/2024) · ifo
146 Mrd. € Bürokratie (11/2024) · Destatis +10,3% Insolvenzen (2025).

**NICHT auf Live-Pages:** „X% haben keine Website" (Folklore), konkrete
Agentur-Kosten/Dauer als Statistik (nur „marktüblich"), CAC-Zahlen (kein DE-Datensatz),
Founder-Stunden, Gütesiegel-Conversion-%.

**Case-Daten:** Single source of truth = **`src/lib/cases.ts`**. Felder: `slug,
client, cat, years, kpi, kpiLabel, headline, body, deliverables, eyebrow, context,
before, after, breakdown[], sources[], quote?`. Neue Case anlegen → `/work/[slug]`
+ Sitemap-Eintrag entstehen automatisch.

---

## 10 · Funnel & Growth

```
ORGANIC / DIRECT      → /sichtbar      (premium, indexed, weiterleitbar an CFO)
PAID Meta / YouTube   → /go/sichtbar   (nav-frei, single CTA, noindex)
LinkedIn DM / Email   → /go/tsl        (Founder-Brief, noindex)
                                │
                                ▼
                           /audit  (15-Sek Qualifier — auch auf jeder Case-Page)
                                ▼
                           /anfrage (Brief → Call → Close)
```

Drei Conversion-Stufen (kein Tripwire-Funnel — passt nicht zum Premium-Ticket):
**Audit → Brief → Call.** Reasoning, Schwartz-Stage-Mapping, A/B-Testplan,
Anti-Patterns: → [`funnel-strategy.md`](./funnel-strategy.md).

**Bezug zu §2 (€50k):** Dieser Funnel optimiert auf qualifizierte Audit-Starts →
Briefe. Für den **Volumen-Tier** (No-Brainer-Relaunch) braucht es zusätzlich einen
eigenen, schärferen Angebots-Funnel — derzeit offen (§13).

---

## 11 · Playbook — How-to

**Neue Puck-Landingpage (editierbar):** `/build` → Slug eingeben → Editor → Blöcke
ziehen → Publish. Live unter `/p/<slug>`. Prod braucht `GITHUB_TOKEN`.

**Homepage ändern:** `/build/home` (visuell) **oder** `content/puck/home.json`
direkt im Repo. FAQ-Schema folgt automatisch (aus dem Faq-Block abgeleitet).

**Neue Case:** Objekt in `src/lib/cases.ts` ergänzen → Detail-Page + Sitemap
automatisch. Bild: `public/assets/cases/<slug>-hero.jpg`.

**Garantie-Text ändern:** Quelle = `src/app/system/page.tsx` (`contractTerms` +
Garantie-Seal). Gespiegelt in: Home (`content/puck/home.json` → Offer-Block-Props
`guarantee_*`), `/sichtbar`, `/go/sichtbar`, `/go/tsl`. **Alle fünf** anpassen.

**Founder-Foto aktivieren:** Datei nach `public/assets/operator/alexander-puetter.jpg`
(+ `-vsl.mp4` für das `/go/sichtbar`-Video). Zeigt automatisch statt Platzhalter.

**Neuen Block für den Editor:** Komponente in `src/blocks/` → in `src/puck/config.tsx`
registrieren (Felder + Defaults + `render`).

**Neue hardcoded Seite:** `src/app/<route>/page.tsx` mit `metadata` export; Section/
Reveal/HeadlineDisplay wiederverwenden; ggf. `sitemap.ts` + `/map` ergänzen.

---

## 12 · Konventionen & Guardrails

- **Du-Voice** durchgehend. (Sie nur, falls explizit ein Mittelstand-Segment dazukommt.)
- **Keine Ergebnis-Garantien** (Rankings/Umsatz). Nur die Liefer-Garantie. UWG-sicher.
- **Keine Fake-Scarcity / Countdown.** Echte Scarcity (6 Mandate/Jahr) trägt, weil prüfbar.
- **Beweis vor Hype.** Jede Zahl mit Quelle. Echte Namen statt anonymer Massen.
- **Keine untranslated English-Slogans** (Anglizismen wie „Brand/Operator/Agent-Layer" ok).
- **`/go/*` = Single-Goal.** Audit ist der CTA; Brief sekundär, nie parallel.
- **Git:** Entwicklung auf `claude/beuwy-homepage-redesign-3t2Ao`. Conventional-Commit-
  Stil (`feat(scope):`, `fix(scope):`). Build muss grün sein vor Push.
- **Guard-Sentence:** *„Wer 38.000 € investiert, will nicht durch ein 22-Minuten-Video
  gezogen werden."* — wenn ein Funnel-Move dagegen verstößt, gehört er nicht zu beuwy.

---

## 13 · Backlog / offene Punkte

**Strategisch (höchster Hebel):**
- [ ] **€50k-Motor definieren** (§2): Ist es das System hochskaliert, System+Compound-MRR,
      oder ein produktisierter No-Brainer-Relaunch zu ~€10–15k? Delivery-System +
      Automatisierung dafür spezifizieren.
- [ ] **CMS-Strategie für Sales-Seiten entscheiden** (§6.6): hardcoded lassen / portieren / hybrid.
- [ ] **Scarcity vs. Volumen auflösen:** „6 Mandate/Jahr" (Premium) vs. €50k/Monat (Volumen)
      sauber in zwei Tiers mit getrennter Kommunikation trennen.

**Assets (blockt „echten" Launch der neuen Seiten):**
- [ ] Founder-Portrait → `public/assets/operator/alexander-puetter.jpg`
- [ ] Founder-VSL-Video → `public/assets/operator/alexander-puetter-vsl.mp4`
- [ ] 6× Case-Hero-Bilder → `public/assets/cases/<slug>-hero.jpg`

**Growth/Infra:**
- [ ] A/B-Tracking (PostHog/Plausible) für `/sichtbar` vs. `/go/sichtbar` vs. `/go/tsl`
- [ ] Stats vor „richtig live" einmal manuell auf Quell-URLs gegenchecken (DE-Institutionsseiten waren beim Research 403-geblockt)
- [ ] Impressum + Datenschutz (Footer-Links zeigen aktuell auf `#`) — **rechtlich nötig** für DE-Live

**Doku-/Code-Hygiene:**
- [ ] `README.md` Drift: Body-Font (war „Inter", ist Geist), Cream-Wert (`#FFFDF3`), Sektionen-Liste
- [ ] `tailwind.config.ts` referenziert `--font-inter`/`--font-jetbrains`, real ist Geist → aufräumen
- [ ] Produktiv-Branch/Vercel-Connection final festlegen

---

## 14 · Changelog — was bisher gebaut wurde

Reihenfolge neueste zuerst (Branch `claude/beuwy-homepage-redesign-3t2Ao`).

- **Owner-Cockpit + Footer-Wiring** — `/map` (alle Routen gruppiert, noindex);
  Footer zeigt `/sichtbar` + Case-Detail-Links.
- **Funnel-Abschluss** — `/go/tsl` (Text Sales Letter), Audit-Magnet auf jeder
  Case-Page, `docs/funnel-strategy.md` (internes Strategie-Brief).
- **Funnel-Ausbau** — `/work/[slug]` (6 SSG-Case-Pages, `lib/cases.ts`), Founder-Foto
  auf Home (ProofBlock), Garantie-Spiegelung im Offer-Block, `/go/sichtbar`
  (Paid-Variante), `ChromeGate`.
- **Sales-Layer** — Geld-zurück-Garantie auf `/system`, `/method` auf High-ACV-Niveau
  poliert (Vergleichsmatrix + Garantie + CTA), Founder-Portrait-Slot, `/sichtbar`
  (Premium-VSL).
- **(davor)** — `/system`-Rebuild (Trust-Selling), FAQ + FAQPage-Schema, Agent-Layer-
  Dogfooding (llms.txt, JSON-LD, OG, sitemap), Puck-Unifizierung + GitHub-Persistenz +
  Auth-Gate (Tina entfernt).

> Bei jeder größeren Änderung: diesen Changelog + die relevanten Abschnitte
> aktualisieren. **Das Dokument lebt — sonst geht genau der Kontext verloren, den
> es bewahren soll.**
