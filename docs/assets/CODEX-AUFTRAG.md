# Asset-Auftrag für Codex (beuwy)

Dieser Auftrag ist für Codex (ChatGPT). Codex erzeugt Bilder, legt sie im Repo ab
und pusht einen eigenen Branch. Claude holt den Branch, prüft die Bilder und
baut sie ein. Alex muss dazwischen nichts tun.

## 1 · Ablauf (für Codex)

1. Arbeite im Repo `alexbeuwy/beuwy-relaunch`, Basis-Branch `claude/adoring-fermat-klj7wm`.
2. Lege einen neuen Branch an: `codex/assets-<datum>` (z. B. `codex/assets-2026-09-25`).
3. Lies die Liste in `docs/assets/auftrag.json`. Erzeuge jedes Asset, dessen Status `offen` ist.
4. Speichere jedes Bild als PNG mit transparentem Hintergrund unter
   `public/assets-inbox/<id>.png`, 1024 × 1024 px (Icons) bzw. das angegebene Format.
5. Trage für jedes erzeugte Asset in `docs/assets/auftrag.json` ein:
   `"status": "erzeugt"` und `"prompt"` mit dem genau verwendeten Prompt.
6. Wenn ein Bild die Regeln unten verletzt, erzeuge es neu (bis zu 4 Versuche).
   Behalte nur den besten Versuch.
7. Committe mit der Nachricht `Assets: <Anzahl> Bilder aus Codex` und pushe den Branch.
8. Ändere keinen anderen Code, keine Texte, keine Konfiguration.

## 2 · Stil (verbindlich)

Vorlage ist die Probe-Serie `docs/redesign/icons3d-probe.png` (8 Icons). Jedes Icon:

- ein einziges Objekt, mittig, Dreiviertel-Ansicht (leicht isometrisch)
- weiches, mattes 3D (Knete/Clay), dicke, abgerundete Formen, wenig Details
- Grundfarbe warmes Off-White `#F4F3EF`, genau **ein** Teil in Pastellgelb `#F3E27F`
- Licht weich von oben links, leichte Umgebungsverdeckung, sehr weicher Kontaktschatten
- kein Text, keine Zahlen, keine Buchstaben, keine Umrisslinien, keine Logos fremder Marken
- transparenter Hintergrund
- ruhig und hochwertig, im Stil von Apple, nicht verspielt, keine Gesichter

Prompt-Vorlage (nur `<OBJEKT>` und `<GELBER TEIL>` austauschen):

> A single premium 3D icon of <OBJEKT>. Soft matte clay material, chunky rounded forms,
> warm off-white body (#F4F3EF), <GELBER TEIL> in soft pastel yellow (#F3E27F). Gentle
> studio light from top-left, subtle ambient occlusion, very soft contact shadow.
> Three-quarter isometric view, centered, minimal detail, no text, no numbers, no
> outlines, Apple-like calm premium style, transparent background.

## 3 · Prüfregeln (vor dem Commit)

- Hintergrund wirklich transparent (Alpha), keine weiße Fläche.
- Genau ein gelber Teil, sonst nur Off-White und neutrale Schatten.
- Kein Text, keine Schrift, keine Ziffern im Bild.
- Objekt füllt etwa 70 % der Fläche, nichts angeschnitten.
- Alle Icons wirken wie aus einer Serie (gleiches Licht, gleicher Winkel).

## 4 · Für Claude (nach dem Push)

Claude holt `codex/assets-*`, prüft jedes Bild gegen die Regeln, wandelt die
Bilder in WebP 512 px (`public/icons3d/<id>.webp`) und baut sie ein. Abgelehnte
Bilder bekommen in `auftrag.json` den Status `neu` mit einem Grund.
