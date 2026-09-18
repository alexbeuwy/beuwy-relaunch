# Schnitt-System — Video rein, Reel im eigenen Stil raus

Nachbau des Systems aus `docs/branding/referenzen/jenya_kork-DdBmO3BAWYH.md`:
ein Stilkatalog, ein Video reinschicken, Stil wählen, fertiges Reel.
Gerendert wird mit **HyperFrames** (HTML-Komposition → MP4, ohne Resolve).
Resolve bleibt als zweiter Weg (`--ziel resolve`) für Handarbeit.

## Was rauskommt

`scripts/schnitt/aus/<video>/`:

| Datei | Inhalt |
|---|---|
| `<video>-<stil>.mp4` | das fertige Reel, 1080×1920, H.264 + AAC |
| `captions.srt` | Untertitel für den Upload |
| `edit.json`, `woerter.json` | Edit-Liste und Wort-Zeitstempel (Übergabe an Agenten) |
| `karten/*.png` | Karten, Flash-Inserts, Copy-Hook mit Alpha |
| `hyperframes/index.html` | die Komposition, in HyperFrames Studio editierbar (`npx hyperframes preview`) |

Im Bild: Rohvideo ohne Stille, je Clip Zoom 100 % oder 115 %, Captions mit
hervorgehobenem Wort, Karten oben. Der Schnittplan (`Sek. · Zone · Art ·
Inhalt`) ist die Edit-Liste. Nichts wird geraten.

## Einrichten (einmal, auf dem Mac)

```bash
pip install -r scripts/schnitt/requirements.txt
cd scripts/schnitt && npm install && npx hyperframes browser ensure && cd -
```

`npm install` bringt HyperFrames, ffmpeg und ffprobe mit (statische
Binaries, kein brew nötig). Ohne Chrome-Download: `--docker`.

Schriften: Inter (Bold, Black) nach `~/Library/Fonts` legen oder einen
Ordner mit `--fontdir` angeben. Helvena wird beim ersten Lauf aus
`src/app/fonts/helvena.woff2` gewandelt. Fehlt eine Schrift, nimmt das
System Helvetica.

**Resolve Free:** Externe Skripte gehen nicht. Deshalb läuft der Bau aus
dem Skript-Menü heraus. Einmal verlinken:

```bash
mkdir -p ~/Library/Application\ Support/Blackmagic\ Design/DaVinci\ Resolve/Fusion/Scripts/Utility
ln -sf "$PWD/scripts/schnitt/resolve_bau.py" \
  ~/Library/Application\ Support/Blackmagic\ Design/DaVinci\ Resolve/Fusion/Scripts/Utility/beuwy-schnitt.py
```

Danach steht in Resolve unter Workspace → Scripts → Utility der Eintrag
`beuwy-schnitt`. Das Skript liest den Pfad zur letzten `edit.json` aus
`~/.beuwy-schnitt` (schreibt `schnitt.py` automatisch).

**Resolve Studio:** Zusätzlich Preferences → System → General → External
scripting using: **Local**. Dann baut `schnitt.py` ohne `--trocken` direkt.

## Benutzen

```bash
# 1. Schnitt vorbereiten (Transkript, Stille, Captions, Karten, Overlay)
python3 scripts/schnitt/schnitt.py \
  --video ~/Movies/Filme/Reels/IMG_5215.MOV \
  --stil beuwy \
  --schnittplan docs/branding/skripte/batch-004-stufenleiter-jacklaydenn.md --skript 1 \
  --trocken

# 2. Rendern (HyperFrames, Standard): Schritt 1 ohne --trocken
python3 scripts/schnitt/schnitt.py --video ~/Movies/Filme/Reels/IMG_5215.MOV --stil beuwy \
  --schnittplan docs/branding/skripte/batch-004-stufenleiter-jacklaydenn.md --skript 1

# Alternativ Resolve: --ziel resolve --trocken, dann Workspace → Scripts → beuwy-schnitt
```

Frei gesprochen, ohne Skript: erst `--trocken`, dann schreibt der
`schnittplan-agent` (siehe `.claude/skills/reel/SKILL.md`) aus
`woerter.json` die Datei `schnittplan.txt`, dann `--schnittplan
scripts/schnitt/aus/<name>/schnittplan.txt --transkript …/woerter.json`.

**Ordner-Wächter** (nur filmen, Rest passiert):

```bash
python3 scripts/schnitt/wache.py --ordner ~/Movies/Filme/Reels --stil beuwy
```

Jede neue Datei in `Reels` wird geschnitten, das MP4 landet in
`Reels/fertig/`. Liegt `<name>.schnittplan.txt` daneben, wird er benutzt.
Als Dienst: `~/Library/LaunchAgents/com.beuwy.reel-wache.plist` mit
`ProgramArguments` = `python3 scripts/schnitt/wache.py --ordner …`,
`RunAtLoad` = true, dann `launchctl load` der Datei.

Ohne `--schnittplan` gibt es nur Stille-Schnitt, Zooms im Takt des Stils
und Captions. Mit `--transkript <referenz.json>` entfällt die
Transkription (z. B. wenn `referenz.py --datei` schon lief).

## Highlight-Reel aus einem Ordner

Ordner voller Clips rein, schnell geschnittenes Reel raus. Jeder Clip 1 bis
2 Sekunden im Wechsel, Zoom-Punch je Schnitt, optional Musik mit Schnitt
auf den Beat, optional Titelkarte im beuwy-Stil.

```bash
python3 scripts/schnitt/highlight.py --ordner ~/Downloads/Highlight\ Reel
python3 scripts/schnitt/highlight.py --ordner ~/Downloads/Highlight\ Reel \
  --gesamt 30 --musik ~/Music/track.mp3 --titel "Sommer 2026"
```

`--auswahl aktiv` (Standard) nimmt je Clip die Momente mit der meisten
Bewegung, `--gleichmaessig` verteilt sie über den Clip. `--clipdauer 1.5`
setzt eine feste Dauer. `--format landscape|square` für andere Kanäle.
Ergebnis: `scripts/schnitt/aus/highlight-<ordner>/highlight.mp4`, die
Komposition daneben ist in HyperFrames Studio nachjustierbar.

## Stile

`scripts/schnitt/stile/<name>.json`. Ein Stil legt fest: Layout (Gesicht
unten oder Vollbild), Stille-Schwelle, Zoom-Muster und Takt, Caption-Art
(Sätze oder Wörter, Größe, Position, Farbe, Kontur, Hervorhebung), Karten
(Zone, Farben, Schriften, Dauer, Flash-Dauer), Copy-Hook.

| Stil | Herkunft | Kern |
|---|---|---|
| `beuwy` | globals.css | Gesicht unten, Karten oben, Papier/Tinte/Ultramarin, aktives Wort ultramarin |
| `jenya` | @jenya_kork | Vollbild, Satz-Captions mittig, weiß mit Schatten, keine Karten, 4-Sekunden-Takt |
| `kauffmann` | @sebastiankauffmann | Versalien-Captions mit rotem Kasten, Karten oben mit Tags, 2-Sekunden-Takt |

Neuer Stil: Referenz mit `scripts/referenz/referenz.py` holen, Einzelbilder
anschauen, JSON kopieren und Werte anpassen. Kein Code.

## Was die API kann und was nicht (Stand Resolve 19/20)

- Clips per `AppendToTimeline` mit Frame-In/Out anhängen: ja. Deshalb wird
  jeder Zoom-Sprung schon in `schnitt.py` zu einem eigenen Clip.
- Zoom je Clip über `SetProperty("ZoomX"/"ZoomY")`: ja, als Faktor um den
  gelesenen Ausgangswert.
- Untertitel per API importieren: unsicher dokumentiert. Deshalb rendern
  wir die Captions selbst ins Overlay. Die SRT liegt trotzdem bei.
- Ein Clip auf Spur 2 an Frame 0: `trackIndex` + `recordFrame`; wenn das in
  einer Resolve-Version hakt, wird die Spur angelegt und ohne `recordFrame`
  angehängt. Im schlimmsten Fall `overlay.mov` von Hand auf V2 ziehen.
- Render per API: ja (`SetRenderSettings`, `AddRenderJob`, `StartRendering`),
  Format und Codec werden zur Laufzeit abgefragt.

Getestet ohne Resolve: Trockenlauf, Overlay-Render, Karten, Captions,
Segmente. Der Resolve-Teil ist gegen die dokumentierte API geschrieben und
beim ersten Lauf auf dem Mac zu prüfen.
