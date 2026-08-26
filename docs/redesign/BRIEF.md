# Masterbrief — Light Makler Style (Redesign 2026-08)

Verbindlich für jeden Subagent. Erst lesen, dann bauen. Abweichungen nur,
wenn sie das Ergebnis messbar verbessern — und dann im Ergebnis benennen.

## 1. Auftrag

beuwy wird die Premium-Boutique für **führende Immobilienmakler**, die
ihren Vorsprung ausbauen wollen: Marke & Design, Website & Experience,
E-Mail & Funnel, Automatisierung — done for you, geliefert in Wochen.
Zielgruppe hat kein halbes Jahr und keine Lust auf Baukästen. Die Seite
verkauft wie ein VSL: jeder Block hat genau einen Job im Funnel.

## 2. Pflichtlektüre pro Subagent (Reihenfolge)

1. `.claude/skills/taste-skill/editorial-premium/skill.md` — Stilgesetz
2. `.claude/skills/taste-skill/components/style-recipes.md` — nur den
   Abschnitt zu editorial-premium + dort referenzierte Komponenten-Dateien
3. Dieses Dokument komplett
4. Für Copy zusätzlich: `.claude/skills/copy-that-sells/SKILL.md` und
   `.claude/skills/deutsche-werbetexte/SKILL.md`
5. `docs/redesign/REFERENZ-ANALYSE.md` — die verbindliche Übersetzung
   von Alex' Vorgabe-Screenshots (XXL-Media, Layering, Floating Cards,
   Wordmark-Typo). Zusätzlich ANSEHEN (Read-Tool):
   `docs/redesign/refs/comp-15.webp`, `comp-16.webp`, `comp-17.webp`
   (Copy dort ist generisch und wird NICHT übernommen)

## 3. Design-System (Contract — nicht verhandelbar)

- **Weiß:** `#FFFFFF` Grund, Sektionswechsel über `#F7F7F5` und
  Haarlinien `rgba(20,20,18,0.08)`. Keine warmen Papiertöne, keine
  Verläufe, kein Grain.
- **Tinte:** `#161613` Text, `#5D5D58` gedämpft, `#8A8A84` dim.
- **Akzent (einziger):** Pastellgelb `#F3E27F`, hover `#EED96A`,
  Wash `#FBF5D6`. Dunkler Text auf Gelb, nie weißer.
- **Typo: Helvena für ALLES** (`--font-helvena`, variable 200–900).
  Display 700–800 eng gespationiert, Body 380–420 mit 1.65 Zeilenhöhe.
  Inter existiert nicht mehr. GeistMono nur `tnum`-Zahlen.
  Typo-Leiter in `globals.css` (`.t-display`, `.t-h2`, `.t-body` …) —
  keine Größen außerhalb der Leiter erfinden.
- **Radius:** Karten 20–24px, Buttons Pill. Schatten fast nie — wenn,
  dann getönt und flach (`0 1px 2px rgba(20,20,18,0.06)`).
- **Motion:** ausschließlich Tokens aus `globals.css`
  (`--duration-*`, `--ease-*`, `--distance-*`). Ein Reveal-System für
  Sektionen (bestehende `<Reveal>`-Komponente nutzen), Hover auf allen
  Interaktiven, `prefers-reduced-motion` respektieren. Kein
  `transition-all`, kein `hover:scale-105`-Spam.
- **Ein Fokus-Element pro Viewport.** Headline ODER Bild ODER Zahl —
  nie drei Sachen gleichzeitig schreien lassen.
- Keine Emojis, keine generischen Icon-Grids. Icons: `@remixicon/react`
  (installiert), Strichstärke einheitlich.

## 4. Assets (BunnyCDN, Pull-Zone freigeschaltet)

Basis-URL: `https://beuwy-2.b-cdn.net/assets/makler%20assets/`
Helper existiert: `src/lib/cdn.ts` → `maklerAsset(n)` bzw. `HERO_VIDEO`.

- `makler-1..11, 18` — Kampagnenfotos quer 2400×1792 (Golden Hour,
  beige/gelb, Interieur + Personen)
- `makler-12, 13` — hoch 1536×2752 (Seiten-Plates, Funnel)
- `makler-14` — hoch 1856×2304 · `makler-19` — quadratisch 2048×2048
- `makler-15, 16, 17` — DESIGN-COMPS 2688×1520: Referenz, nicht als
  `<img>` einbauen
- `hero-video.webm` — 2 MB, Hero-Media: autoplay muted loop playsinline,
  `poster` = Foto, bei reduced-motion nur Poster
- **Jedes KI-Bild bekommt die Mikro-Pill „AI Visual"** (Komponente
  `BildPille` aus `src/components/AiPille.tsx`).
- Vor Verwendung eines Fotos: ansehen (Read auf
  `docs/redesign/refs/…` falls vorhanden, sonst per curl von der CDN in
  den Scratch laden und ansehen). Nie blind einbauen.

## 5. Copy-Regeln

- Deutsch, Sie-Form, kein Übersetzungsdeutsch, kein KI-Deutsch
  (Verbotsliste in deutsche-werbetexte beachten).
- Ego-Trigger statt Belehrung: Die Besten wollen hören, dass sie zu den
  Besten gehören — und fürchten, dass ein Schlechterer besser aussieht.
- Rhetorische Fragen als Sektions-Scharniere („Sieht man Ihnen Ihren
  Marktanteil an?").
- Abgrenzung: Standardlösungen (BOTTIMMO & Co.) sind für den
  Durchschnitt gebaut — beuwy für die, die den Durchschnitt hinter
  sich lassen. Namen von Wettbewerbern nur auf den Cluster-Seiten
  nennen, auf der Startseite nur „Baukasten/Standardlösung".
- CTA-Wortlaut überall: **„Zusammenarbeit anfragen"** → führt zu
  `/anfrage` (Vorquali-Funnel). Kein „kostenlos", kein Preis.
- Kennzahlen und Kundennamen: über Content-Keys
  (`src/lib/content.ts`), Platzhalter mit Sought-after-Effekt,
  realistisch formuliert (keine „300 %+"-Comic-Zahlen). Alex passt sie
  im Studio an.
- Trust-Wordmarks in **Markentypo-Anmutung, Hellgrau `#A9A9A3`**
  (Serif für ENGEL & VÖLKERS / VON POLL IMMOBILIEN / DAHLER & COMPANY,
  gesperrte Caps für KENSINGTON/RE/MAX/BETTERHOMES, Mixed Case für
  McMakler/Homeday) — Komponente `Wortmarke` in `MaklerHero.tsx`
  wiederverwenden. Keine Fremdlogo-Bilddateien; Freigaben klärt Alex.
  Label über der Leiste: Key `mk.trust.label`, Studio-editierbar.

## 6. Seitenarchitektur (SEO-Plan)

Jede Seite: deutscher Title mit Keyword, eigene Description, XXL-Hero
im einheitlichen System, VSL-Dramaturgie, interne Verlinkung zum Hub
und zu `/anfrage`.

| Route | Title-Keyword | Job |
|---|---|---|
| `/` | Immobilienmarketing (Unternehmensberatung, nie „Agentur") | Haupt-VSL |
| `/immobilienmarketing` | Immobilienmarketing | Hub, verlinkt alles |
| `/leadgenerierung-immobilienmakler` | Leadgenerierung Immobilienmakler | Problem→System |
| `/website-fuer-immobilienmakler` | Website für Immobilienmakler | Kernleistung |
| `/onoffice-website` | onOffice Website | Partner-Angle |
| `/beste-maklerwebsites` | Die 30 besten Maklerwebsites Deutschlands 2026 | Ranking-Asset, Ego-Loop |
| `/bottimmo-alternative` | BOTTIMMO Alternative | Vergleich |
| `/maklerwebsite-kosten` | Was kostet eine Maklerwebsite | Vergleich (Marktspannen, keine eigene Preisliste) |
| `/maklersoftware-vergleich` | Maklersoftware Vergleich | Vergleich |
| `/anfrage` | — (noindex) | Vorquali-Funnel → Terminbuchung |
| `/cases/[slug]` | bestehend | Beweis, Restyle |

Startseiten-Dramaturgie (jeder Block = ein VSL-Job):
1. XXL-Hero: Video-Plate + Helvena-Display + Wordmark-Strip + CTA
2. Spiegel („Sie sind gut. Sieht man das?") — Ego + Problem
3. Abgrenzung Baukasten vs. Maßarbeit — Feindbild
4. VSL-Slot 9:16 (Platzhalter-Komponente `VslSlot`, Alex nimmt Video
   mit OBS auf) + Kernversprechen
5. 4 Säulen, je 3 konkrete Hebel-Beispiele — Mechanismus (KI leise)
6. Zahlenband + Cases — Beweis
7. Prozess „Wochen statt Quartalen" — Einwand Zeit
8. Qualifizierung/Disqualifizierung — Verknappung ehrlich
9. FAQ (Einwände) → 10. Finale: „Zusammenarbeit anfragen"

## 7. Was NICHT passiert

- Keine Fremdlogo-Bilddateien. Keine „Bekannt aus"-Presseleiste.
- KI-Personen nie als Team oder Kunden ausgeben.
- `/os`, `/studio`, `/api/*` bleiben unangetastet.
- Alte Riso-Komponenten werden ersetzt, nicht umgestylt.
- Kein Menüpunkt ohne fertige Seite dahinter.

## 8. Integrationen + Case-Verkaufslogik (Nachtrag Alex, 25.08)

**Software-Anbindungen als Kompetenz-Beweis.** beuwy schlachtet die
Tools, die Makler schon nutzen, in Premium-Auftritten aus — Websites,
Rechner und Funnels docken direkt ans CRM an. Wordmark-Strip (reine
Typo, wie Trust-Strip): onOffice · FLOWFACT · Propstack · JUSTIMMO ·
CasaOne. Label: „Nahtlos mit den Tools, die Sie schon nutzen." —
Formulierung IMMER als Kompatibilität/Integration, NIE als Partnerschaft
(Ausnahme onOffice, sobald Alex' Partner-Status durch ist — Key
`mk.integrationen.label` Studio-editierbar). Eigene Sektion auf der
Startseite (Säulen-Nähe) + prominenter auf /website-fuer-immobilienmakler
und /onoffice-website.

**Projekte wie riegel-immobilien.de anpreisen — Feature → Hebel,
nie Feature → Feature:**

| Baustein | So wird er verkauft |
|---|---|
| Immobilienbewertungs-Rechner | „Der Rechner qualifiziert Eigentümer, während Sie besichtigen: Adresse rein, Ersteinschätzung raus — und der Verkäufer-Lead liegt mit Score im CRM, nicht im Postfach." |
| onOffice/CRM-Anbindung | „Jede Anfrage landet mit Quelle und nächstem Schritt direkt in Ihrem System. Keine Zettel, kein Copy-Paste, kein vergessener Rückruf." |
| Tempo/Ladezeit | „Eigentümer vergleichen drei Makler in fünf Minuten. Die Seite, die sofort lädt, wirkt wie das Büro, das sofort zurückruft." |
| Objekt-Präsentation | „Exposés, die aussehen wie das Objekt es verdient — und Alleinaufträge rechtfertigen, bevor Sie im Wohnzimmer sitzen." |
| Follow-up-Automation | „Wer heute nicht verkauft, bekommt in 6 Monaten die richtige Mail. Automatisch." |
| Lokale Sichtbarkeit | „Wenn ‚Makler + Stadtteil' gegoogelt wird, steht Ihr Name über dem Portal." |

Diese Übersetzungstabelle ist der Ton für die 3 Hebel-Beispiele je
Säule (§6, Block 5) und für die Case-Restyles (G1).

## 9. Repositionierung R2 (Alex, 26.08) — Contract-Update

Gilt zusätzlich zu §5; bei Widerspruch gewinnt §9.

**Was beuwy ist:** eine **Unternehmensberatung** für Immobilienunternehmen.
Das Wort „Agentur" ist für beuwy selbst VERBOTEN — es darf nur die
anderen bezeichnen (Abgrenzung, Preisvergleich). Grep-Gate: kein
Vorkommen von „Agentur" in Selbstbeschreibung (Footer, llms.txt,
Metadata, About-Sätze).

**Was beuwy verkauft:** keine Websites. **Portale** — Auftritte, die
nicht als schicke Visitenkarte dienen, sondern messbar Mandate und
Deals erzeugen. Systematisch, seit 17 Jahren, mit nachweisbaren
Erfolgen (Zahl 17 existiert als `mk.stats.s3`). Das Wort „Website"
bleibt in SEO-Keywords/Titles erlaubt (Suchvolumen), aber die
Verkaufs-Copy dreht auf Portal/System/Mandate/Deals.

**Zielgruppen (Hero rotiert):** Makler · Projektentwickler · Bauträger ·
Vertriebsteams. Unterseiten je Zielgruppe (siehe R2-Seiten).

**AI-Narrativ (ersetzt jede generische KI-Erwähnung):** Der Schmerz:
Jede Woche ein neues Modell — ChatGPT, Claude, Kimi, DeepSeek — niemand
kommt mit. Selbst wer promptet, bekommt Nettes: mal ein Text, eine
Mail, ein Dokument. Aber Systeme? Prozesse abgeben? Agenten? Unverständlich.
beuwy übersetzt das in nutzbare Abläufe, die im Alltag Arbeit abnehmen.

**No-Brainer-Schema (Grafik + Copy):** Links der Standard: BOTTIMMO-
oder onOffice-Exposés und -Dokumente — für jeden gleich, austauschbar,
Anpassung schwierig. Rechts beuwy: maßgeschneiderte Dokumente und
Kommunikation, automatisierte Prozesse, die überzeugen und Service auch
mit kleinem Team einfach machen. Systeme, die an alles denken, damit
man selbst nicht daran denken muss — Fokus auf Deals und das Unternehmen.

**Performance-Marketing (Grafik, ganz simpel, clean):** Aufmerksamkeit
von außen → Marke → Anfragen → systematisch ~5 % der Erreichten werden
registrierte Kontakte (Mandanten, Kunden, Interessenten). Zahl als
Studio-Key.

**Service-Beweis:** Ein Ansprechpartner, der nach Ticketsystem
nachweisbar arbeitet — niemand fragt nach zwei Wochen: „Wie weit ist
mein Dokument? Mein Rechner? Meine Anpassung?" Gehört in den
Prozess-Block und auf Unterseiten.

**Videos (BunnyCDN, Stand 26.08):** `hero-video.webm` (2,0 MB) bleibt
Hero-Default (Ladezeit!). `Hero-Alle-Videos.webm` (7,1 MB) NICHT als
Default laden — höchstens klick-initiiert. `aus-dem-fenster-gucken-
shot-portrait-shot.webm` (5,2 MB, 9:16) = bewegter VSL-Platzhalter
(preload="none", Poster zuerst). `wide-angle-loft-shot.webm` (5,0 MB)
frei für eine Sektions-Plate auf einer R2-Seite (preload="none").

**R2-Seiten (neu, gleiche XXL-Systematik):**
| Route | Title-Keyword | Job |
|---|---|---|
| `/ki-fuer-immobilienmakler` | KI für Immobilienmakler | AI-Pain → nutzbare Systeme |
| `/immobilienmarketing-agentur` | Immobilienmarketing Agentur | Capture-Page: warum Beratung statt Agentur |
| `/marketing-projektentwickler` | Marketing für Projektentwickler | Zielgruppe 2 |
| `/marketing-bautraeger` | Marketing für Bauträger | Zielgruppe 3 |

**GEO/SEO-Paket:** llms.txt-Vollausbau (Leistungen, Zielgruppen, Zahlen,
Vergleiche), JSON-LD (Organization + Service auf Layout-Ebene, FAQPage
auf Seiten mit FAQ), sitemap/robots um R2-Seiten, interne Verlinkung
Hub ↔ R2-Seiten ↔ Cluster, Footer-Wissen-Spalte erweitert. Ziel:
Erwähnung in KI-Antworten und Platz-1-Snippets — jede Seite beantwortet
ihre Suchfrage im ersten Absatz wörtlich.

**Humanizer-Gate:** Jede neue/geänderte Copy läuft gegen
`.claude/skills/humanizer/SKILL.md` (35 Muster) UND deutsche-werbetexte.
Kein Em-Dash-Teppich, keine Dreier-Listen-Zwänge, keine „nicht nur X,
sondern Y"-Ketten, aktive Verben, is/hat statt „dient als".
