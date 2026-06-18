# Relaunch-Tier — Strategie-Vorschlag (€50k/Monat-Motor)

> **Status:** Vorschlag zur Entscheidung. Nichts davon ist live, nichts ist
> gebaut. Wenn du eine Variante absegnest oder anpasst, baue ich.
>
> **Briefing:** Produktisierter, systematisierter „No-Brainer-Relaunch"
> (Branding + Design + Performance) als Volumen-Motor. Ziel: **€50k/Monat
> Umsatz** durch System & Automatisierung — nicht durch mehr Stunden.
>
> **Bezug:** [`docs/PROJECT.md §2`](./PROJECT.md#2--die-50kmonat-rechnung-ehrlich)
> identifiziert die Lücke. Hier kommt die Antwort.

---

## 1 · Die Kern-These (eine Seite)

**Du hast aktuell ein Premium-Anker-Angebot (System ab 38k€, 6 Mandate/Jahr).**
Das deckelt rechnerisch bei ~€19k/Monat — selbst bei voller Auslastung. Für €50k
fehlt eine **zweite Säule** mit **höherer Frequenz und niedrigerer Operator-Last
pro Auftrag**.

**Diese zweite Säule ist nicht „dasselbe günstiger".** Wenn du das System nur
billiger machst, kanibalisierst du dein Premium und verbrennst dich an der
gleichen Handarbeit. Die zweite Säule muss **strukturell anders geliefert** werden:

> **Premium-System** = Kategorie definieren, bespoke Voice, Handarbeit, 30–50h
> Operator-Zeit pro Mandat. Verkauft sich an **Founder, die ihre Sprache setzen
> wollen.**
>
> **Volumen-Relaunch** = Standard-Architektur, kalibrierte Voice, Templates +
> Komponenten + Automatisierung. **3–4h Operator-Zeit pro Mandat.** Verkauft
> sich an **Founder, die ihren Auftritt entgiften wollen, ohne 38k auszugeben.**

Zwei verschiedene Buyer, zwei verschiedene Maschinen. Eine Marke.

---

## 2 · Das Produkt — Vorschlag: „Relaunch"

**Arbeitstitel:** **Relaunch** (klar, was es ist; lässt sich nicht missverstehen).
Alternativen, falls du anders willst: *Reboot, Drop, Boost, Stamp*.

**Versprechen (eine Zeile):**
> *„Dein Relaunch in 14 Werktagen. Brand kalibriert. Site live. KI-ready.
> Festpreis. Tag 14 oder Geld zurück."*

**Differenz zum 38k-System:** Du bekommst die *gleiche Architektur* (DESIGN.md,
Live-Site, Agent-Layer) — aber **nicht** als bespoke Kategorie-Definition,
sondern als **schnelle Kalibrierung** auf deine Marke. Wer eine eigene Kategorie
prägen will, geht ins System. Wer schnell, sauber und KI-sichtbar live gehen
will, nimmt den Relaunch.

---

## 3 · Pricing — drei Modelle, eine Entscheidung

| Modell | Preis | Dauer | Kunden/Mon | Brutto/Mon | Operator-Std/Kunde | Risiko |
|---|---|---|---|---|---|---|
| **A — Light** | €5.900 | 10 AT | 8 | €47k | 2,5 h | 🔴 Volumen-hart. Akquise von 8 Briefs/Mon ist die echte Arbeit. Marge wackelt. |
| **B — Sweet Spot** | **€8.900** | 14 AT | **5** | **€44,5k** | 3,5 h | 🟢 Realistisch. 5 Briefs/Mon = ein Brief pro Woche. Operator-Last ~20h/Mon. |
| **C — Premium-leicht** | €13.500 | 14 AT | 4 | €54k | 4–5 h | 🟢 Höchste Marge. Spreizung zum 38k-System aber kleiner — Risiko der Kannibalisierung steigt. |

**Empfehlung:** **B — €8.900 als Anker.** Begründung:
- Klare Differenz zum 38k-System (≈4× günstiger → kein Kannibalismus)
- Klare Differenz zum reinen „Webdesigner ab €2k" (Premium-Position bleibt)
- 5 Kunden/Monat ist akquisierbar, ohne dass Operator-Zeit explodiert
- **+ Compound-Retainer** kommt obendrauf — €50k wird komfortabel erreicht

**Kombiniert mit Compound (Retainer):**
- 5 × €8.900 Relaunch = €44,5k
- 3 × €6.500 Compound = €19,5k *(wenn 3 alte Kunden retained sind)*
- **Total: €64k/Mon möglich** — Ziel deutlich übertroffen

Sobald du 6+ Compound-Kunden hast, trägt der MRR allein €39k+ — der Relaunch-Tier
wird zur Skalierungs-Säule, nicht zur Lebensader.

---

## 4 · Scope — was drin ist und was raus muss

**Was drin ist (das No-Brainer-Pack):**

| Block | Was | Warum drin |
|---|---|---|
| **Brand-Kalibrierung (light)** | Voice-Charter (2 Seiten), Forbidden Phrases (8–12), 1 zentraler Pitch-Satz, Token-Anpassung | Macht die Site „nach dir" klingen, ohne dass wir eine neue Kategorie erfinden |
| **DESIGN.md (light)** | Tokens (Farben, Fonts, Spacing), Voice-Snippets, agent-readable | Das gleiche Format wie im 38k-System — nur basierend auf dem Template, nicht von Null |
| **Live-Site** | Next.js + Vercel + deine Domain, 6–10 Sektionen aus Komponenten-Library | Production-grade Tech, aber Templated statt bespoke |
| **Performance** | Lighthouse 90+, Image-Optimierung, sauberes Schema, Plausible-Setup | Standardisiert, automatisierbar |
| **Agent-Layer** | schema.org, llms.txt, JSON-LD aus Brief-Daten generiert | Differenzierender Faktor — hier behalten wir die beuwy-Identität |
| **Launch + 14 Tage Hypercare** | DNS-Cutover + 14 Tage Reply-Standby | Risiko-Reduktion ohne 30-Tage-Compound-Last |

**Was raus muss (sonst kein Volumen-Tier):**

- ❌ **Eigene Photo-Shoots** → AI-generiert oder kuratierte Stock + AssetSlot-Workflow
- ❌ **Custom Illustration / 3D-Renders** → optional als Add-On (€1,5–3k extra)
- ❌ **Voice von Null erfinden** → wir kalibrieren auf bestehende Marke, nicht Identität-Workshop
- ❌ **Komplexe Animationen** → wir nutzen die bestehenden `Reveal`/`CountUp`/`Scroll`-Komponenten
- ❌ **Multi-Stakeholder-Approvals** → einer entscheidet, ein Approval-Loop, fertig
- ❌ **30 Tage Compound-Standby** → ersetzt durch 14 Tage Hypercare; Compound separat verkaufen

**Was als Add-On verkauft werden kann (Marge):**
- Eigene Photos: +€2.500
- 3D-/Custom-Visuals: +€1.500–3.000
- Englische Übersetzung: +€1.200
- Migration aus altem CMS: +€800–2.000

---

## 5 · Das Delivery-System (das „produktisierte und automatisierte")

> Der Hebel, der den Tier wirtschaftlich macht. **3–4h Operator-Zeit pro Relaunch**
> ist nur erreichbar, wenn 70 % der Arbeit System statt Mensch ist.

### 5.1 — Brief-zu-Brief in 24h *(neu)*

Buyer füllt einen strukturierten Brief unter `/relaunch/brief` (10–15 Felder:
Industry, Audience, USPs, Cases, Tone-Refs, 3 Konkurrenten, Brand-Constraints).
**LLM-Pipeline** liest das, generiert:
- Voice-Charter v0 (AI)
- 3 Hero-Headline-Vorschläge
- Sektion-Logik-Vorschlag (welche 6–10 der 15 Blöcke + Reihenfolge)
- Token-Vorschlag (Farben aus dem Logo per Color-Extraction)

Alex polished in **45 min**, schickt zurück als „Briefing-Antwort". → Buyer-Approval.

### 5.2 — Template-Library *(neu, einmalige Bauarbeit)*

`/relaunch/templates/` — 3 Layout-Patterns für unterschiedliche Industrien:
- **SaaS/AI** (Hero + Feature + Proof + Pricing + FAQ)
- **DTC/Lifestyle** (Hero + Story + Product-Grid + Reviews + Newsletter)
- **Service/Agentur** (Hero + Process + Cases + Team + Contact)

Jedes Template ist ein Puck-Dokument mit den 15 Blöcken vorkonfiguriert.
Buyer-Branch (`/p/<buyer-slug>`) wird daraus geklont.

### 5.3 — Token-Layer-Architektur *(architektonisches Refactor, einmalig)*

Aktuell sind die Komponenten an das beuwy-Bordeaux-Theme verdrahtet. Für den
Volumen-Tier müssen sie **theme-able** werden:
- CSS-Variablen pro Buyer-Brand
- 5–7 Tokens reichen: `--brand-primary`, `--brand-accent`, `--brand-bg`,
  `--brand-bg-raised`, `--brand-ink`, `--font-display`, `--font-body`
- Komponenten passen sich automatisch an

**Aufwand einmalig:** ~2 Tage Refactor (CSS-Variablen-Layer hochziehen,
Komponenten auf Tokens umstellen).

### 5.4 — Agent-Layer-Boilerplate *(klein-automatisiert)*

- `schema.org` JSON-LD wird aus Brief-Daten generiert (`Organization`, `Service`,
  `Person`/Founder, `FAQPage` aus den FAQ-Block-Daten)
- `llms.txt` aus Template + Brief-Daten kompiliert
- `Cluster-Brief` als Markdown aus Brief

### 5.5 — Deployment-Workflow *(GitHub + Vercel)*

Pro Buyer:
- Neuer Branch `client/<slug>` im beuwy-relaunch-Repo (oder eigener Repo später)
- Vercel-Preview auf `<slug>.preview.beuwy.com`
- Buyer reviewed im Browser, kommentiert über Linear/Notion-Embed
- Bei Go-Live: DNS-Cutover, Vercel-Project an Kunden-Domain

### 5.6 — Hypercare-Bot *(klein-automatisiert)*

14 Tage nach Launch:
- Vercel-Analytics-Reports automatisch in Email an Buyer (Wochenrapport)
- Lighthouse-Crawler läuft täglich, alarmiert wenn Score < 85
- Alex schaut nur drüber, antwortet auf direkte Mails

---

## 6 · Wo Alex Hand anlegt (der Mensch-Anker)

Trotz Automatisierung — der Verkaufs-Pitch muss **„ein Operator"** bleiben.
Alex' Zeit pro Relaunch (Sweet-Spot-Modell):

| Phase | Was | Zeit |
|---|---|---|
| **Brief-Review** | Brief lesen, 3 konkrete Notes geben | 30 min |
| **Voice-Polish** | AI-generierte Voice auf Marke kalibrieren | 60 min |
| **Design-Direction** | Aus 2–3 Layout-Vorschlägen wählen, Tokens finalisieren | 30 min |
| **Content-Cut** | Final-Copy auf Headlines/Microcopy kürzen, Forbidden Phrases prüfen | 60 min |
| **Launch-Review** | Vor DNS-Cutover durchsehen, GTM-OK geben | 30 min |
| **Launch-Call** | Persönlich übergeben, Hypercare erklären | 30 min |
| **Hypercare-Tickets** | Lose Mails, ggf. 1–2 Iteration-Wünsche | 60 min |
| **Total** | | **~5 h** |

**Bei 5 Relaunches/Monat = ~25 h aktive Operator-Zeit.** Plus 15–25 h für
Akquise/Sales/Setup → **40–50 h/Monat ausgelastet**. Verhandelbar, ohne
auszubrennen.

---

## 7 · Tier-Architektur — drei sichtbare Tiers

```
                   ┌─────────────────────────────────────────┐
                   │              SYSTEM (Anker)              │
                   │  Kategorie definieren, bespoke           │
PREMIUM            │  Festpreis · 10 AT · 6 Mandate/Jahr      │
                   └─────────────────────────────────────────┘
                                       ▲
                                   bewusste
                                   Spreizung
                                       │
                   ┌─────────────────────────────────────────┐
                   │            RELAUNCH (Motor)              │
                   │  Brand kalibriert, Site live, KI-ready   │
VOLUMEN            │  Festpreis · 14 AT · 5/Mon · ~8,9k       │
                   └─────────────────────────────────────────┘

                   ┌─────────────────────────────────────────┐
RETAINER           │            COMPOUND (MRR)                │
                   │  Standby, Experimente, Cohort-Receipts   │
                   │  monatlich · ab Launch                   │
                   └─────────────────────────────────────────┘
```

**Sprint** *(aktueller Tier)* → verschwindet. Sub-Use-Cases („eine Sektion")
können als **Add-On zum Relaunch** verkauft werden, brauchen keinen eigenen Tier.

---

## 8 · Wo auf der Site

**Vorschlag — drei neue Routen:**

| Route | Zweck | Status |
|---|---|---|
| `/relaunch` | Sales-Page für den neuen Tier — eigene Landing, eigene Hero, eigene FAQ | NEU, hardcoded |
| `/relaunch/brief` | Strukturiertes Brief-Formular (10–15 Felder) | NEU, hardcoded + API |
| `/relaunch/templates` *(intern)* | Template-Library-Übersicht | NEU, noindex |

**Existierende Routen anpassen:**
- `/method` — Pricing-Sektion zeigt drei Tiers statt zwei (Relaunch + System + Compound)
- Home (Offer-Block) — Pfad-Hinweis: „Relaunch oder System? → /method"
- Nav — `/sichtbar` raus, `/relaunch` rein? Oder beide draußen? *(siehe §11)*

**Sub-Brand-Frage:** Soll der Volumen-Tier optisch von der Premium-Marke
abgegrenzt sein? Vorschlag: **gleiche Brand, andere Tonalität auf der Page.**
- `/system` (Premium) = ruhig, Kategorie-prägend, lang-form-Trust
- `/relaunch` (Volumen) = action-orientiert, klar Vorher/Nachher, „in 14 Tagen
  hast du das hier" → Demo-Slot zentral, eine Zahl, ein Knopf

**KEIN sub-domain** (`relaunch.beuwy.com`) — fragmentiert SEO + Trust unnötig.

---

## 9 · Die €50k-Rechnung mit dem neuen Tier

**Realistischer 12-Monats-Pfad:**

| Monat | System | Relaunch | Compound | Brutto/Mon |
|---|---|---|---|---|
| 1–2 | 1 × 38k | 0 | 0 | €38k |
| 3–4 | 1 × 38k | 2 × 8,9k | 1 × 6,5k | €62k |
| 5–6 | 1 × 38k | 3 × 8,9k | 2 × 6,5k | €77,7k |
| 7–9 | 1 × 38k | 4 × 8,9k | 3 × 6,5k | €93,1k |
| 10–12 | 0–1 × 38k | 5 × 8,9k | 4 × 6,5k | €70–108k |

**€50k/Monat wird ab Monat 3 erreicht.** Ab Monat 6 stabil drüber, Skalierung über
€100k denkbar — aber dann wird **Delivery-Kapazität** zur echten Grenze, nicht
Akquise.

**Schwellen, die zählen:**
- **Monat 3:** erstes System UND erste 2 Relaunches gleichzeitig → Operator-Last
  testet
- **Monat 5:** Template-Library trägt 80 % der Designarbeit → 1h Voice-Polish + 2h
  Content-Cut pro Relaunch reicht
- **Monat 7:** 3 Compound-Retainer → MRR-Base von ~€20k, Akquise-Druck sinkt

---

## 10 · Risiken & wo es kippen kann

| Risiko | Wie wahrscheinlich | Gegenmaßnahme |
|---|---|---|
| **Kannibalisierung des Systems** (Buyer wählt 8,9k statt 38k) | Mittel | Klare Spreizung: „Relaunch ist Kalibrierung. System ist Kategorie-Definition." Auf der Landing direkt erklären. |
| **Operator-Burnout** trotz Automatisierung | Mittel-Hoch | Hartes Cap auf 6 Relaunches/Monat. Brief-Pipeline mit „nächster freier Slot in X Wochen" — keine Stress-Verkäufe. |
| **Volumen-Akquise teurer als Marge erträgt** | Mittel | Audit-Funnel als Lead-Quelle (organisch, kostenlos pro Lead). Paid erst sekundär. |
| **Template-Library wird zur Fessel** (alle Sites sehen gleich aus) | Hoch | 3 Layout-Patterns + 5–7 Brand-Tokens = mathematisch ~21 sichtbar verschiedene Looks. Plus: jeder Relaunch hat eine eigene Hero-Variation. |
| **Brand-Verwässerung** durch günstigeren Tier | Niedrig-Mittel | Premium bleibt sichtbar als „System". Relaunch wird als „dasselbe Können in standardisierter Form" positioniert, nicht als Discount. |

---

## 11 · Offene Fragen, die du entscheiden musst

> Diese Fragen kann ich nicht sinnvoll vor-beantworten. Antworten markieren, was
> ich danach baue.

1. **Pricing-Variante A / B / C** *(Empfehlung: B Sweet Spot €8.900)*
2. **Produktname:** „Relaunch" — passt oder etwas anderes?
3. **Sub-Brand-Schärfe:** gleiche Brand-Tonalität wie Premium, oder bewusst
   action-orientiert auf `/relaunch`?
4. **Soll Sprint-Tier wirklich verschwinden?** Oder als „Mini" weiter angeboten
   werden für ad-hoc Section-Arbeit?
5. **Brief-Formular vs. Audit-First:** Soll der Audit (`/audit`) den Funnel-Einstieg
   bleiben — oder ein neuer, kürzerer „Pre-Brief" speziell für Relaunch-Leads?
6. **Pre-Launch-Garantie:** Tag 14 oder Geld zurück — wie bei System — ja oder
   nein? *(Empfehlung: ja, gleiches Versprechen, gleiche Mechanik.)*
7. **Add-On-Preise:** willst du die 4 vorgeschlagenen Add-Ons (Photos, 3D,
   Übersetzung, CMS-Migration) so übernehmen, oder anders?

---

## 12 · Was ich konkret bauen würde, wenn du absegnest

**Sprint 1 (~3 Tage):**
- Token-Layer-Refactor: CSS-Variablen für theme-bare Komponenten
- Eine erste Template-Library mit 1 Pattern (SaaS/AI) als Proof-of-Concept
- `/relaunch` Landing als erste Version (Hardcoded, Premium-Stil)

**Sprint 2 (~3 Tage):**
- Brief-Formular `/relaunch/brief` mit strukturierten Feldern + AI-Pipeline-Stub
- 2 weitere Template-Patterns (DTC, Service)
- `/method` Pricing-Sektion auf drei Tiers anpassen

**Sprint 3 (~2 Tage):**
- Hypercare-Automatisierung (Vercel-Analytics-Email, Lighthouse-Crawler)
- Add-On-Konfigurator im Brief-Formular
- Docs in `docs/PROJECT.md` + `docs/funnel-strategy.md` aktualisiert

**Total: ~8 Arbeitstage zur ersten verkaufbaren Version.**

Danach: ersten Buyer onboarden, Delivery-System unter Last testen, iterieren.

---

## 13 · Nicht-Ziele (Klarheit über das, was es nicht ist)

- **Kein Wix/Squarespace-Ersatz.** Wer das sucht, kauft nicht bei beuwy.
- **Kein Plattform-/SaaS-Geschäft.** Es bleibt Dienstleistung mit Software-
  Werkzeugen — nicht Produkt zum Selbstklicken.
- **Kein Voice-Workshop in 14 Tagen.** Wir kalibrieren, wir definieren keine
  neue Identität von Null. Das ist System-Territorium.
- **Kein 5-Stakeholder-Approval-Spiel.** Ein Entscheider, ein Brief, ein Cutover.
  Wer das nicht kann, wartet auf System-Kapazität.
