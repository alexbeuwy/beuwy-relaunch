# Funnel-Strategie · beuwy 2026

> **Internes Dokument.** Nicht für Kunden. Hier steht das Reasoning hinter
> den drei Landing-Pfaden, der Garantie-Architektur und den A/B-Tests, die
> wir laufen lassen. Wenn du eine neue Page baust, eine neue Quelle zitierst
> oder eine Ad-Creative briefst — read this first.

---

## 1 — Die These in einem Absatz

**beuwy verkauft nicht „eine schönere Website".** beuwy verkauft die maschinen­lesbare
Markenrepräsentation in der Ära, in der ein Agent (Claude, GPT, Perplexity, Google
AI Overviews) zwischen Anfrage und Anbieter steht — und der Kauf-Buyer keine zehn
Optionen mehr sieht, sondern eine Empfehlung. Ticket: **ab 38.000 € als Festpreis**.
Auslieferung in **10 Werktagen**. Mandate: **6 pro Jahr**. Eine Person baut: Alexander
Pütter. Eine Garantie hängt am Liefertermin (nicht an Rankings/Umsatz). Eine
Identitäts-Ankerung gegen die Kommodisierung des Worts „Agentur".

Wenn ein interner Stakeholder, ein externer Partner oder ein Co-Operator das Reasoning
hinter einer Funnel-Entscheidung wissen will — die Antwort steht hier.

---

## 2 — Audience-Map (Schwartz-Sophistication-Stages)

Wir verkaufen an Founder im Übergang zwischen **Stage 3 (Solution-Aware)** und
**Stage 4 (Product-Aware)** — *nicht* an Stage-5-jaded Ecom-Coaching-Buyer (das ist
der ecomscaling.org-Markt; nicht unser Spielfeld) und *nicht* an Stage-1-unaware
Mittelstandsbetriebe, denen man erst noch erklären müsste, was ein Agent ist.

| Stage | Definition | Was beuwy zeigt | Pfad |
|---|---|---|---|
| **3 — Solution-Aware** | „Ich brauche bessere Sichtbarkeit / Positionierung." Weiß *was*, sucht *wer*. | Mechanismus + Beweis + Operator-Identität | `/sichtbar`, `/system`, `/work` |
| **4 — Product-Aware** | Vergleicht beuwy aktiv mit Mittelstand-Agentur / Inhouse-Hire / Freelancer. | Vergleichs­matrix + Garantie + Liefervertrag + Quellen | `/method`, `/system`, `/work/[slug]` |
| **5 — Most-Aware** *(seltener Fall)* | Hat alle Pitches gehört. Will Identitäts-Anker und konkrete Lieferpunkte. | Founder-Brief (`/go/tsl`), Operator-Sektion mit Foto + Track-Record | `/go/tsl` |

Wir bauen **nicht** für Stage 1/2 und nicht für Stage-5-jaded Ecom-Coaching-Buyer.

---

## 3 — Die drei Pfade (Funnel-Architektur)

```
                    ┌────────────────────┐
ORGANIC / DIRECT  → │     /sichtbar      │  Premium, weiterleitbar an Co-Founder/CFO,
                    └────────────────────┘  indexable, comparable. Schwartz Stage 3/4.
                              │
                              ▼
                         /audit ─→ /anfrage (Brief → Call)
                         

                    ┌────────────────────┐
PAID META/YT      → │   /go/sichtbar     │  Nav-frei, Single-CTA, noindex,
                    └────────────────────┘  Sticky Mobile-CTA, Founder-Video-Slot.
                              │              Borrows the *structural* VSL moves
                              ▼              (Schwartz Stage 3/4 paid traffic).
                         /audit (Qualifier)
                         

                    ┌────────────────────┐
LINKEDIN / DM     → │     /go/tsl        │  Plain text sales letter, Cream-Band,
EMAIL / NEWSLETTER  └────────────────────┘  schmale Spalte. Founder-Brief im
                              │              37signals/Pmarca/Eliason-Stil.
                              ▼              Stage 4/5 jaded founder audience.
                         /audit (Qualifier)
```

### 3a — `/sichtbar` (organic / direct)

- **Indexierbar** (canonical, in Sitemap, FAQPage JSON-LD).
- **Vollständige Nav + Footer** — Buyer muss zur `/work`/`/method`/`/system` springen können.
- **Beweis vor Hype** — die VSL-Recherche zur DACH-Audience-Psychologie (Hofstede UAI 65,
  UWG-Risiko bei unbelegten Superlativen) macht das zur Pflicht.
- **Sektion-Reihenfolge**: Hook → belegte Agitation → frühe Credibility → Mechanismus
  → Beweis → Angebot → Garantie → Einwand-FAQ → echte Scarcity → CTA mit Trust-Signalen.

### 3b — `/go/sichtbar` (paid cold traffic, Meta/YouTube)

- **`robots: noindex`**, canonical → `/sichtbar` (kein SEO-Dilution).
- **Keine Nav, kein Footer** — via `ChromeGate` aus dem Root-Layout ausgeblendet.
- **Single CTA**: Audit-Start. Brief-Link als sekundärer Pfad.
- **Sticky Mobile-CTA** (Paid-Cold-Traffic-Standard).
- **Founder-Video-Slot** im Hero — wenn das echte Video kommt, ersetzt es den
  `AssetSlot`-Platzhalter automatisch.
- **Erkenntnisse aus der „Ugly VSL"-Recherche** umgesetzt — *strukturelle* Moves
  (Nav-Removal, Single-CTA, Mechanismus-First, Founder-Anker) **ohne** den
  ecomscaling-Look. Bei €38k+ Ticket würde der ugly Look aktiv abstoßen
  („aggressive Verkaufstaktik" wird im DACH-Mittelstand abgestraft).

### 3c — `/go/tsl` (LinkedIn DM, Email, Newsletter)

- **`robots: noindex`**, canonical → `/sichtbar`.
- **Plain text sales letter** im Founder-Brief-Stil. Cream-Band, schmale Spalte
  (~720px), Geist Sans body, Fraunces für Subheads, B23A48 für Akzente.
- **Strukturelle Anleihen** an Schwartz / Halbert / Brunson — Open Loop, sequentielle
  Persuasion, P.S. + P.P.S., Einzelziel, Founder-Foto + handschriftartige Signatur.
- **Stilistische Abgrenzung** zur Ecom-Coaching-VSL: kein Hype, keine Fake-Scarcity,
  keine emotionalen Bullet-Stacks. Es liest sich wie ein persönlicher Brief von Alex,
  nicht wie ein Click-Funnel-Template. Stage-4/5-Audience erkennt den Unterschied.
- **CTA**: ein einziger Audit-Link, inline mehrfach, plus Final-Button.

---

## 4 — Wann welcher Pfad

| Source | Erste Berührung | Warum |
|---|---|---|
| Google organic, direkter Aufruf, Empfehlungs-Link | `/sichtbar` | Buyer ist warm + recherchiert + leitet weiter |
| Meta Ads, YouTube Pre-Roll, kalte Reels | `/go/sichtbar` | Cold mobile, Single-CTA, Sticky-Bar |
| LinkedIn DM aus Outbound, Newsletter, Founder-zu-Founder-Empfehlung per Mail | `/go/tsl` | Stage-4/5, hohe Aufmerksamkeit, will lesen |
| Conference / Speaker-Slot QR | `/sichtbar` | Buyer ist „interessiert nach Talk", will Tiefe |
| Partner-Empfehlung an CFO/Co-Founder | `/sichtbar` (Forward-fähig) | Internal-Champion-Sale; ugly tötet hier die Conversion |

---

## 5 — Die Garantie — was sie ist, was sie nicht ist

### Ist:
- **„Tag 10 — oder Geld zurück."** Festpreis vollständig zurück, wenn Marke + Site +
  Agent-Layer am 10. Werktag *nicht* live auf der Kundendomain stehen.
- Verankert in `src/app/system/page.tsx` (Contract-Sektion) als prominentestes Trust-Device.
- Auf `/sichtbar`, `/go/sichtbar`, `/go/tsl` und Home (Offer-Block) gespiegelt.

### Ist nicht:
- **Keine Ergebnis-Garantie.** Wir garantieren nicht Rankings, nicht Umsatz, nicht Leads.
  Das ist DACH-Seriosität (und UWG-rechtssicher). Wer Ergebnisse garantiert, lügt — und
  das schreiben wir genauso wörtlich auf die Seite.
- **Keine Zufriedenheits-Garantie** im weichen Sinn („wenn du nicht zufrieden bist…").
  Das ist eine vermessbare, harte Lieferzeit-Klausel. Diskussionssicher.
- **Kein Refund-Risiko an Scope-Creep gebunden** — der Festpreis-Liefervertrag definiert
  den Scope hart, ein Refund kann nur ausgelöst werden, wenn beuwy das Lieferdatum verpasst.

---

## 6 — Beweis-Hygiene

Jede Zahl auf einer kundenseitigen Page **muss** eine reale, datierte, möglichst
verlinkbare Quelle haben. Die Marktrecherche, die `/sichtbar` füttert, hat eine
Bulletproof-Liste produziert:

### Cite-able ohne Reue:
- **Pew Research** (Juli 2025): KI-Antwort senkt Klickrate von 15 % auf 8 %.
- **Bitkom** (März 2025): 64 % der DE-Unternehmen nennen sich Digital-Nachzügler.
- **Destatis** (November 2024): 20 % KI-Nutzung gesamt, 17 % bei kleinen Firmen, 48 % bei großen.
- **Destatis** (2026): +10,3 % Unternehmens-Insolvenzen 2025 — Höchststand seit 2014.
- **Gartner** (Februar 2024): −25 % Suchvolumen bis Ende 2026 durch KI-Chatbots.
- **ifo** (November 2024): 146 Mrd. € Bürokratiekosten in DE.
- **DIHK** (2024/2025): 51 % Fachkräftemangel als Geschäftsrisiko, 43 % unbesetzte Stellen.
- **BMF / Wachstumschancengesetz**: E-Rechnungspflicht seit 1.1.2025.

### Cite-able für eigene Kundendaten:
- **Vision Real Estate**: €160M KKR JV, 70 Mitarbeitende. Quelle: vision.de + Branchenpresse.
- **Königswege**: 170 → 2.240 Partner, Top-10 DE cash-online Hitliste 2024. Quelle: cash-online.de.
- **acta**: 315 Wohnungen, €48,4M, Ø Ticket €153.842, 2023–2025. Quelle: intern, abgeleitet.
- **PURELEI**: 1M+ Follower, 20–30 Mio. Ø Umsatz/Jahr seit 2018. Quelle: Instagram public.

### **Nicht** auf eine Live-Page (auch nicht „ungefähr"):
- „X % der KMU haben keine Website" — Agentur-Blog-Folklore (22 % / 37 %, widersprüchlich).
- Konkrete Agentur-Kosten / Projekt-Dauer in Wochen — formulieren wir als „marktüblich /
  typischerweise", nie als Statistik.
- Customer-Acquisition-Cost-Zahlen (40–60 %, $700, $1.200) — US-Benchmark-Blogs, kein DE-Datensatz.
- Founder-Arbeitsstunden-Zahlen — die 1,19-Mrd.-Überstunden-Destatis-Zahl gilt für *Angestellte*.
- „14 Std./Woche Bürokratie" — n=14 Hotels, nicht national.
- Gütesiegel-Conversion-% (z. B. „+33 %") — Größenordnung ok, exakter Wert studien-abhängig.

---

## 7 — Was wir nicht tun (anti-patterns)

Aus der „Ugly VSL"-Recherche und der DACH-Audience-Analyse — diese Moves würden bei
unserer Audience das Gegenteil bewirken:

- ❌ **Fake-Countdown / blinkende Scarcity.** Wir haben echte Scarcity (6 Mandate/Jahr) — sie
  trägt, weil sie überprüfbar ist. Ein Countdown-Timer würde das zerstören.
- ❌ **Ergebnis-Garantien** („+300 % Umsatz!"). UWG-Risiko, Seriositäts-Killer, Branchen-Pose.
- ❌ **„10.000 zufriedene Kunden"** ohne Namen. Wir nennen **vier** Kunden mit Quellen — und das schlägt 10.000 anonyme jedes Mal.
- ❌ **Englische Slogans ohne Übersetzung.** ~62 % der Deutschen verstehen englische Werbeslogans
  nicht vollständig (Endmark/YouGov). Etablierte Anglizismen („Brand", „Operator", „Site",
  „Agent-Layer") sind ok — Slogans nicht.
- ❌ **Designed-aber-leer.** „Beautiful but thin" verliert bei DACH-B2B-Buyern, die Tiefe
  erwarten. Lieber dichter Text als premium-aber-banal.
- ❌ **Doppelnamige CTAs auf paid-traffic-Pages.** Auf `/go/*` immer Single-Goal: Audit.
  Der Brief-Pfad ist nachgelagert, nie parallel.
- ❌ **„Du sparst 50 % gegenüber Agentur X."** Vergleichs-Argumentation ja (Matrix in
  `/method`), Anker-Preise nein.
- ❌ **Stockfoto-Founder.** Wir nutzen `AssetSlot` mit AI-Prompt — wenn das echte Portrait
  nicht da ist, zeigt ein markenkonformer Platzhalter. Kein generisches LinkedIn-Profilbild.

---

## 8 — A/B-Test-Plan

### Phase 1 — Path-Comparison (Q3/2026, ~4–8 Wochen)

Vergleiche **drei Pfade auf einer fairen Traffic-Quelle** (Meta cold traffic, gleiches
Creative-Set, gleiches Budget, randomisiert).

| Variant | Page | Hypothese |
|---|---|---|
| A | `/sichtbar` | Premium-Forward; Stage-3/4 Founder konvertiert hier am besten |
| B | `/go/sichtbar` | Nav-Removal + Single-CTA + Sticky-Bar lifts cold-mobile Audit-Start |
| C | `/go/tsl` | Lange Lese-Audience konvertiert weniger oft, aber qualifizierter |

**Primary metric**: Audit-Starts. **Secondary metric**: Audit-zu-Brief-Conversion.
**Stop-rule**: ~120–200 Audit-Starts pro Variant für ~95 % Konfidenz auf realistischem Lift.

### Phase 2 — Within-Variant-Optimization

Pro Sieger-Variant ein Single-Element-Test:
- `/go/sichtbar`: echtes Founder-Video vs. AssetSlot-Platzhalter
- `/go/tsl`: Headline-Variant (Pain-First vs. Open-Loop)
- `/sichtbar`: Hook-Variant — Angle 9 („KI frisst die Suche") vs. Angle 5 („64 % Nachzügler")

### Tracking

- **PostHog oder Plausible Goal** mit Server-side Audit-Form-Submit als Conversion-Event.
- **Path-Attribution**: erste Landing-URL + erste UTM speichern (cookie-frei via
  first-touch in Local Storage), damit Audit-Submission dem korrekten Pfad zugeordnet wird.
- **Kein Cross-Device-Stitching** (DSGVO-konform, akzeptierter Trade-off).

---

## 9 — Wie man eine neue Case-Page baut

Quelle: `src/lib/cases.ts`. Jede Case ist ein Objekt mit:

```ts
{
  slug: 'neue-case',
  client: 'Kundenname',
  cat: 'Kategorie · Region',
  years: '2024 → live',
  kpi: '€XYZ M',
  kpiLabel: 'Was ist das',
  headline: 'Eine Kategorie-Aussage.',
  body: '~2 Sätze für die /work-Index-Card.',
  deliverables: ['…'],
  eyebrow: '0X Client · Jahr',
  context: 'Warum dieser Brief?',
  before: 'Ausgangslage.',
  after: 'Was sich verändert hat.',
  breakdown: [{ t: 'Subtitel', d: 'Was wir konkret gebaut haben.' }],
  sources: [{ label: 'Quelle', href: 'https://…' }],  // href optional
  quote: 'Optionale Pull-Quote.',
}
```

Push → die Detail-Page `/work/[slug]` wird automatisch generiert (SSG via
`generateStaticParams`). Update von `sitemap.ts` ist automatisch (cases.map).

**Bild ablegen** unter `public/assets/cases/<slug>-hero.jpg` (4:3 oder 16:9, optimiert).
Bis das echte Bild da ist, rendert `AssetSlot` einen markenkonformen Platzhalter.

---

## 10 — Drei Erweiterungen, die offen sind

1. **Echtes 2-Min-Founder-Video** für `/go/sichtbar`. Der `AssetSlot`-Platzhalter rendert
   einen Hint mit dem genauen AI-Prompt. Empfehlung: drei Takes, Studio, 1080p,
   `public/assets/operator/alexander-puetter-vsl.mp4`.

2. **Echtes Founder-Portrait** für Home + `/system` + `/sichtbar` + `/go/tsl`. Drop in
   `public/assets/operator/alexander-puetter.jpg`. README liegt im Ordner.

3. **Case-Hero-Images** für die sechs Case-Detail-Pages. Drop unter
   `public/assets/cases/<slug>-hero.jpg`. AI-Prompts liegen in den AssetSlots.

---

## 11 — Wenn jemand fragt „warum nicht einen Tag-1-Audit-Funnel mit Tripwire?"

Weil unser Ticket €38.000+ ist. Tripwire-Funnels (€7-Buch → €37-Workshop → €497-Course →
High-Ticket-Call) sind eine Ecom-Coaching- und Info-Produkt-Architektur. Bei unserem
Ticket gibt es **drei** Conversion-Stufen, nicht fünf:

1. **Audit** (gratis, 15 Sek) — qualifiziert und beweist Sichtbarkeits-Gap
2. **Brief** (`/anfrage`, async) — qualifiziert Buyer + Match
3. **Call** (eingebaut in den Brief-Reply) — closing conversation

Mehr Stufen verlängern die Sales-Zykluszeit ohne Qualität zu erhöhen. Weniger
verlieren den Beweis-Schritt, der die Garantie erst glaubwürdig macht.

---

## 12 — Letzte Regel: Match the form to the buyer

> *„Wer 38.000 Euro investiert, will nicht durch ein 22-minütiges Video gezogen werden.
> Er will vergleichen, prüfen, intern weiterleiten — und dabei nicht das Gefühl haben,
> manipuliert zu werden."*

Das ist die Sentence, die ein Funnel-Move blockieren oder absegnen soll. Wenn ein
Add-On — eine Page, ein Pop-up, eine Email — gegen diese Sentence verstößt, gehört
es nicht zu beuwy.

— *Dokument lebt. Aktualisiere wenn sich die Audience, das Ticket oder die Wahrheit
ändert.*
