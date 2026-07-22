# DESIGN-DIRECTION — beuwy Relaunch

Verbindliches Briefing für den Neubau der Landingpage (Design-Director-Review,
23.07.2026). Referenzniveau: linear.app, vercel.com, resend.com. Jede Regel ist
prüfbar — wer abweicht, begründet es im Commit.

## 1. Urteil über den IST-Zustand

Die Seite ist ein Hormozi-Funnel im Dark-Luxe-Kostüm: 12 Sektionen, die alle
gleichzeitig schreien, mit unbelegten Zahlen und einem fabrizierten Slot-Grid, das
jeder Käufer auf 16k-Niveau als Theater erkennt. Typografisch ist die Hierarchie
kollabiert: gelbes Display auf fünf Größenstufen, ~20 kursiv-gelbe Hervorhebungen —
wenn alles betont ist, ist nichts betont. 14 font-sizes und 100+ Inline-Style-Objekte
sind kein System, sondern Rauschen. Strukturell ist jede Sektion dasselbe Rezept
(Headline + Intro + Karten-Raster) — genau das generische Muster, das die Seite
widerlegen soll.

## 2. Regelwerk

### 2.1 Typo-Skala (exakt, keine anderen Größen auf der Seite)

Geist Sans (Interface, Copy) + Geist Mono (Daten, Labels, Beweise). Fraunces nur als
Display ≥ 32px — nie für Zahlen, nie für Karten-Titel. Die Mono-Ebene ist der
Charakter der Seite: "hier stehen Fakten, keine Adjektive".

| Token | Größe | Font/Gewicht | line-height | letter-spacing | Einsatz |
|---|---|---|---|---|---|
| `display` | clamp(40px, 5.5vw, 64px) | Fraunces 400 | 1.02 | −0.025em | H1, exakt 1× pro Seite |
| `h2` | clamp(28px, 3.2vw, 40px) | Fraunces 400 | 1.1 | −0.02em | 1× pro Sektion |
| `h3` | 20px | Geist 600 | 1.3 | −0.015em | Untertitel, Karten-Titel |
| `body-lg` | 17px | Geist 400 | 1.6 | −0.011em | Sektions-Intro, max 1×/Sektion |
| `body` | 15px | Geist 400 | 1.55 | −0.011em | Fließtext |
| `small` | 13px | Geist 400 | 1.5 | 0 | Sekundärtext |
| `data` | 13px | Geist Mono 400 | 1.5 | 0, `tnum` | Fakten, Quellen, Tool-Status |
| `label` | 11px | Geist Mono 500 | 1.2 | +0.12em, uppercase | Eyebrows, Meta |
| `score` | 64px | Geist Mono 500 | 1.0 | −0.02em, `tnum` | nur Score-Ziffer im Tool |

Gewichte: Geist 400/500/600, Fraunces 400 (+italic). `fontWeight: 510` → 500.
Kein 104px-Hero mehr — der Hero teilt den Fold mit dem Tool.

**Prüfregel:** `grep -c "text-\["` außerhalb dieser 9 Werte = 0; `style={{}}` für
Typo/Farbe = 0.

### 2.2 Spacing

Basis 4px. In Komponenten: 8 / 12 / 16 / 24 / 32. Zwischen Blöcken: 48 / 64.
Sektions-Padding py-24 (96px) Desktop, py-16 (64px) Mobile — Ausnahme nur Hero
(pt-32). Sektionskopf-Rhythmus immer identisch: Eyebrow → 16px → H2 → 20px →
Intro → 48px → visuelles Element.

### 2.3 Farb-Einsatz

Kontraste nachgerechnet: Cream/Base 19.4:1 · Muted/Base 10.0:1 · Dim/Base 5.05:1 ·
Gelb/Base 16.1:1 · Signal/Base 6.6:1. Das Problem war Dosierung, nicht Farbwahl.

- **Bordeaux, genau 3 Flächen:** `#1A0404` (Seite), `#210606` (Panels), `#2B0808`
  (nur Innenflächen im Tool-Panel). `#3A0808` als Fläche fliegt raus; nur noch
  Hover-/Border-Ton.
- **Cream `#FFFDF3` ist Headline-Farbe.** Nicht Gelb. Wichtigste Einzelentscheidung.
- **Gelb `#F7E99A` = Aktion + Beweis, sonst nichts:** Primary-CTA, Focus-Ring,
  Score-Ziffer, aktive Nav, max 1 hervorgehobenes Wort pro Headline. Max 2 gelbe
  Elemente pro Viewport. Nie Fließtext, nie Fläche — Ausnahme: exakt 1 invertierte
  Gelb-Sektion (finaler CTA). Zweiter Gelbton nur `--ink-yellow-hover: #FBF1B6`.
- **Text:** Cream = Headlines + Betonungen, `#C2B89F` = Fließtext, `#8A8068` = Meta.
- **Signal-Rot `#FF5F5F` nur semantisch** (Fail-Befunde, Fehler). Nie dekorativ.
- **Gradients:** nur Hero-Stage-Lamp (radial, ≤ 8 % Gelb-Opazität) + Score-Sheen.

Token-Änderungen: `--bg-elevated: #3A0808` → `#2B0808`; neu `--ink-yellow-hover: #FBF1B6`.

### 2.4 Sektionshöhen & Grid

- 8 Sektionen (Masterplan §5), Gesamtscroll ≤ 6,5 Viewport-Höhen bei 1440×900.
- Jede Sektion außer Hero: Inhalt ≤ 640px hoch. Wer mehr braucht, kürzt Inhalt.
- Container max-w 1120px, 12 Spalten, 24px Gutter, Ränder 24px Mobile / 40px Desktop.
  Prosa max 560px (~70 Zeichen).
- Nur zwei Layout-Muster: (A) einspaltig Prosa-Maß, (B) asymmetrischer 7/5- oder
  5/7-Split. Symmetrische 3er-Kartenraster verboten.

## 3. Hero mit integriertem Tool

Komposition (Desktop, zentriert, gesamt ≤ 100dvh bei ≥ 800px Höhe):
1. Nav 64px.
2. 128px Abstand → zentrierter Stack max-w 720px: Eyebrow (`label`, "Digitale
   Vertriebssysteme · Finance & Real Estate") → 16px → H1 (Fraunces clamp 40–64,
   Cream, max 2 Zeilen/10 Wörter, EIN Wort gelb-kursiv) → 20px → Subline (17px,
   max 20 Wörter, keine rhetorische Frage).
3. 48px → **Tool-Panel als dominantes Objekt:** 680px, zentriert, `#210606`, Radius
   16, Hairline `rgba(247,233,154,0.14)`. Input 56px Mono 15, Placeholder
   "ihre-domain.de", gelber Submit "Analyse starten" inline. Darunter Mono-13:
   "Screenshot · Schema-Check · AI-Analyse — ca. 30 Sek., kein Login."
4. 32px → eine Mono-Zeile Legacy-Proof: "Systeme hinter Riegel · Saadi ·
   Königswege · acta".

**Interaktions-Choreografie:**
- Fokus: Hairline → `rgba(247,233,154,0.45)`, Ring `0 0 0 3px rgba(247,233,154,0.08)`,
  300ms. Kein Lift, kein Glow.
- Submit: Label-Text-Swap (200ms) → "Wird geprüft…". Panel wächst per
  `interpolate-size: allow-keywords` + height-auto-Transition (400ms, `--panel-ease`)
  und öffnet die **Status-Bühne**: Mono-Checkliste, Zeilen per Badge-Pop (500ms)
  einzeln eintreffend — echte Fakten aus Schritt 1 sofort als Text, kein Spinner.
  **BorderBeam läuft NUR während der Analyse** (Statusanzeige, nicht Deko).
- **Screenshot-Reveal (Money-Moment):** Browser-Chrome-Mock (Hairline, Mono-URL,
  16:10). Start `blur(12px) scale(1.02)` + `clip-path: inset(0 0 100% 0)`, über
  700ms von oben nach unten aufgezogen, 1px gelbe Scanlinie an der Clip-Kante,
  danach genau ein Specular-Sweep. Wie ein Polaroid unter dem Scanner — ein
  Dokument, das entwickelt wird.
- Ergebnis: Panel → 960px, Split 55/45 (Screenshot links, Score + 3 Befunde rechts).
  Score 64px Mono zählt per `t-digit`-Stagger hoch (500ms, 70ms Stagger, Overshoot).
  Befunde mit 70ms Stagger: Mono-Severity-Tag (Rot bei Fail, Dim bei OK) + ein Satz.
  E-Mail-Gate erst am PDF-Report, nie vor dem Ergebnis.
- `prefers-reduced-motion`: alles instant, Fakten identisch.

## 4. Zehn Anti-Slop-Regeln (prüfbar)

1. Keine Zahl ohne DOM-sichtbare Quelle (Mono-Quellenzeile).
2. Keine Scarcity-UI ohne Backend-Wahrheit. Kapazität steht, wenn wahr, als Satz im FAQ.
3. Sektions-Intro ≤ 25 Wörter, ein Absatz, dann das visuelle Element.
4. Max 1 kursiv-gelbe Hervorhebung pro Sektion. Headline-Grundfarbe Cream.
5. Max 2 Karten-Raster seitenweit, keins symmetrisch 3-up mit Icon+Titel+Text.
   Proof = 2-up (Riegel, Saadi).
6. Jede Sektion: genau eine Aufgabe, genau ein visuelles Element.
7. Max 2 Buttons pro Sektion, seitenweit ein CTA-Verb. Verboten: "Slot", "sichern",
   "jetzt", "nur noch".
8. Keine rhetorischen Fragen als Copy-Einstieg. Erster Satz = belegbare Aussage.
9. Keine Dauer-Animationen. Nur zustandsgebunden: Fokus, Submit, 1× In-View.
10. Null `style={{}}` für Typo/Farbe, null `dangerouslySetInnerHTML`.

## 5. Top-3 Mikro-Interaktionen (ROI-Reihenfolge)

1. Tool-Statusliste + Screenshot-Scan-Reveal (`clip-path`-Transition + Badge-Pop +
   Text-Swap) — beweist die Kernbehauptung in 30 Sekunden.
2. Score-Count-up mit `t-digit`-Stagger (Mechanik existiert in globals.css) — auch
   auf die 2 Proof-Kennzahlen. Zahlen fühlen sich gemessen an, nicht behauptet.
3. FAQ/Prozess-Aufklapper mit `interpolate-size: allow-keywords` + height-auto
   (300ms) + Icon-Swap-Chevron. Fallback ältere Browser: instant öffnen.

## 6. Palette: bleibt (mit 2 chirurgischen Korrekturen)

Bordeaux/Gelb ist das Distinktivste an der Marke; Kontraste AA/AAA-fest. Das
Slop-Problem war Dosierung, nicht Palette. Korrekturen: `--bg-elevated` → `#2B0808`,
neuer Token `--ink-yellow-hover: #FBF1B6`. Alles andere unverändert; die
Neuverteilung (Cream-Headlines, Gelb-Budget, Rot semantisch) ist die eigentliche
Korrektur.
