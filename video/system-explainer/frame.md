# frame.md — beuwy System-Explainer (Design-Wahrheit)

Quelle: beuwy.com „Light Makler Style" (`src/app/globals.css`, CLAUDE.md).
Stil: editorial-premium. Hell, viel Weißraum, ein Fokus pro Bild.

## Canvas

- 1920 × 1080, `canvas: #FFFFFF`. Inhalte oberhalb y = 900 (Keep-out unten).
- Ränder: 120 px links/rechts, 96 px oben.

## Farben (nach Rolle)

| Rolle | Wert | Einsatz |
|---|---|---|
| canvas | #FFFFFF | Hintergrund immer |
| ink | #161613 | Headlines, Zahlen, Knopftext |
| muted | #5D5D58 | Fließtext, Unterzeilen |
| dim | #8A8A84 | Labels, Zeitstempel, Fußnoten |
| line | rgba(20,20,18,0.08) | Kartenrand, Trennlinien |
| surface | #F7F7F5 | Karten-Innenflächen, Kartengrund |
| akzent | #F3E27F | **einziger Akzent**: Highlighter, Knopf, Fokus-Pin |
| akzent-hover | #EED96A | gedrückter Knopf |
| wash | #FBF5D6 | Chips, Flächen hinter Beweiszahlen |

Verboten: Gold, Verläufe (außer weicher Kartenschatten), Glow, Neon, dunkle Szenen.

## Schrift

Nur Helvena (Dateien in `assets/fonts/`):

```css
@font-face { font-family: "Helvena"; src: url("assets/fonts/helvena.woff2") format("woff2"); font-weight: 100 900; }
@font-face { font-family: "HelvenaBold"; src: url("assets/fonts/helvena-og-800.ttf") format("truetype"); font-weight: 800; }
```

| Rolle | Familie | Größe | Gewicht | Tracking | Zeilenhöhe |
|---|---|---|---|---|---|
| display | HelvenaBold | 132 px | 800 | -0.03em | 1.0 |
| h1 | HelvenaBold | 104 px | 800 | -0.025em | 1.02 |
| h2 | HelvenaBold | 76 px | 800 | -0.02em | 1.05 |
| body-lg | Helvena | 40 px | 400 | 0 | 1.35 |
| label | Helvena | 22 px | 600 | 0.08em, UPPERCASE | 1.2 |
| zahl | HelvenaBold | 280 px | 800 | -0.04em, `font-variant-numeric: tabular-nums` | 0.9 |

**Nie kursiv.** Betonung nur über den Highlighter.

## Komponenten

- **Highlighter**: gelber Balken hinter einem Wort, von 55 % bis 92 % der
  Zeichenhöhe. Umsetzung: Span mit absolut positioniertem `::before` bzw.
  Kind-Element (Farbe akzent), das per `scaleX` 0 → 1 von links wischt
  (`transform-origin: left`). Dauer 0.45 s, Ease `power3.out`, genau auf
  dem gesprochenen Wort.
- **Karte**: weiß, 1 px Rand line, Radius 28 px, Schatten
  `0 24px 60px -30px rgba(22,22,19,0.28)`.
- **Chip**: wash, Radius 999 px, 22 px Helvena 600, Innenabstand 10 × 20 px.
- **Knopf**: akzent, Radius 999 px, HelvenaBold 32 px, Innenabstand 26 × 52 px,
  Pfeil → rechts.
- **Browser-Rahmen**: weiße Karte, Kopfleiste 44 px surface mit drei grauen
  Punkten (#D0D0CA, 12 px) und URL-Text dim 18 px.
- **AI-Pille** (Pflicht auf jedem KI-Foto): unten rechts im Foto, schwarz
  60 % Deckkraft, weißer Text „AI Visual" 14 px, Radius 999 px.
- **Pin**: Kreis 36 px. Grau #C9C9C3 = „Ihr Büro", akzent = „der andere" bzw.
  „vergeben", mit weichem Ring rgba(243,226,127,0.35) 16 px.

## Bewegung

- Standard-Ease `power3.out` (entspricht cubic-bezier(0.22,1,0.36,1)).
  Eintritt 0.5–0.7 s, Distanz 24–40 px, dazu Opacity 0 → 1.
- Wortweise Headlines: je Wort `y: 40 → 0`, `opacity 0 → 1`, Versatz
  0.06–0.09 s, synchron zur Stimme.
- Karten: `spring-pop-entrance` (scale 0.92 → 1, back.out(1.6)) oder
  Fall mit leichter Drehung.
- Kamera: höchstens ein langsamer Push (scale 1 → 1.04) pro Szene.
- Keine Exits in Szenen (Übergänge macht der Assembler). Keine Schleifen.

## Stimme und Ton

Sie-Form, Makler-Deutsch, kurz. Eingeblendet werden nur die Headlines aus
dem Storyboard, nie der Sprechtext als Untertitel.
