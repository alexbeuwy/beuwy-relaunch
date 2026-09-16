# Referenz-Bibliothek — fremde Reels, die nachweislich laufen

Hier liegt je Reel eine Datei: Kennzahlen, Transkript in Beats, Beat-Rohling,
Skelett-Analyse. Aus diesen Skeletten werden Alex' Skripte geschrieben.
**Struktur 1:1, Wörter 0 %.**

## Reinkommen

Auf dem Mac, aus dem Repo-Ordner:

```bash
pip install -r scripts/referenz/requirements.txt

# einzelne Reels (Instagram, TikTok)
python3 scripts/referenz/referenz.py https://www.instagram.com/reel/XXXX/ --browser chrome

# Export der Chrome-Extension oder eines Apify-Actors, nur Ausreißer (≥ 3× Median je Konto)
python3 scripts/referenz/referenz.py --json ~/Downloads/beuwy-feed-export.json --min-faktor 3 --top 5 --browser chrome

# eigene OBS-Rohaufnahme für den Stimmkorpus
python3 scripts/referenz/referenz.py --datei ~/Movies/Filme/Reels/IMG_5215.MOV --konto alex --aus /tmp/alex
```

`--browser chrome` gibt die Login-Cookies mit. Ohne Login liefert Instagram
oft nichts; aus der Cloud klappt es nur sporadisch, TikTok gar nicht.
Sprache wird automatisch erkannt (englische Referenzen bleiben englisch,
das Skelett ist sprachunabhängig).

Der JSON-Export darf jede Form haben, solange je Eintrag eine URL und
Kennzahlen drinstehen (Feldnamen wie `url`/`permalink`, `plays`/`views`,
`likes`, `comments`, `username`). Apify-Actors und die Extension passen.

## Status je Datei

| Status | Bedeutung |
|---|---|
| roh | Transkript da, Beat-Rohling leer |
| analysiert | Skelett-Analyse ausgefüllt (Session oder Engine) |
| verwendet | mindestens ein Batch daraus geschrieben, Batch-Nummer steht in der Datei |

Dateien mit Status `analysiert` oder `verwendet` überschreibt das Toolkit
nicht mehr.

## Analysieren

In Claude Code: „Analysiere `docs/branding/referenzen/<datei>.md`" —
die Session füllt den Beat-Rohling (Funktion je Beat, Retention-Gerät),
benennt das Skelett nach `../SKELETTE.md` und setzt den Status. Dann:
„Referenz-Modus, Thema X" → Batch.

Im Dashboard `/os`: Transkript-Block in das Referenz-Feld, Thema eingeben,
Batch. Die Engine macht die Analyse selbst und speichert sie im Detail.

## Auswahlregel

Nur Reels, die **für ihr Konto** Ausreißer sind: Views ≥ 3× Median der
letzten 20–30 Reels des Kontos. Ein Reel mit 200.000 Views auf einem
Konto, das immer 200.000 macht, sagt nichts über die Struktur. Eines mit
200.000 auf einem Konto, das sonst 30.000 macht, sagt alles.
