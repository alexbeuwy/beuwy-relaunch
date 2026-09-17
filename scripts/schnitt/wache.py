#!/usr/bin/env python3
"""
Ordner-Wächter: beobachtet den Reels-Ordner, schneidet jede neue Aufnahme
automatisch und legt das fertige MP4 in <Ordner>/fertig/ ab.

    python3 scripts/schnitt/wache.py --ordner ~/Movies/Filme/Reels --stil beuwy
    python3 scripts/schnitt/wache.py --ordner ~/Movies/Filme/Reels --einmal   # nur was jetzt da ist

Regeln:
  - Eine Datei gilt als fertig aufgenommen, wenn ihre Größe 10 Sekunden
    lang gleich bleibt (OBS schreibt beim Aufnehmen weiter).
  - Liegt neben dem Video `<name>.schnittplan.txt` (Zeilen `Sek. Zone Art
    Inhalt`), wird er benutzt. Sonst: Stille raus, Zooms im Takt, Captions.
  - Erledigtes steht in <Ordner>/fertig/.erledigt (Dateiname + Größe),
    damit nichts doppelt läuft.
  - Fehler landen in <Ordner>/fertig/wache.log, der Wächter läuft weiter.

Als Hintergrunddienst auf dem Mac: launchd-Plist nach
~/Library/LaunchAgents/com.beuwy.reel-wache.plist, siehe README.
"""

from __future__ import annotations

import argparse
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

HIER = Path(__file__).resolve().parent
ENDUNGEN = {".mov", ".mp4", ".mkv", ".m4v"}


def erledigt_liste(fertig: Path) -> set[str]:
    p = fertig / ".erledigt"
    return set(p.read_text("utf8").splitlines()) if p.exists() else set()


def merke(fertig: Path, schluessel: str) -> None:
    with (fertig / ".erledigt").open("a", encoding="utf8") as f:
        f.write(schluessel + "\n")


def log(fertig: Path, text: str) -> None:
    zeile = f"{datetime.now():%Y-%m-%d %H:%M:%S}  {text}"
    print(zeile)
    with (fertig / "wache.log").open("a", encoding="utf8") as f:
        f.write(zeile + "\n")


def stabil(pfad: Path, sekunden: int = 10) -> bool:
    a = pfad.stat().st_size
    time.sleep(sekunden)
    return pfad.exists() and pfad.stat().st_size == a and a > 0


def schneide(video: Path, stil: str, fertig: Path) -> bool:
    cmd = [sys.executable, str(HIER / "schnitt.py"), "--video", str(video), "--stil", stil]
    plan = video.with_suffix(".schnittplan.txt")
    if plan.exists():
        cmd += ["--schnittplan", str(plan)]
    log(fertig, f"schneide {video.name} ({stil}{', mit Schnittplan' if plan.exists() else ''})")
    p = subprocess.run(cmd, capture_output=True, text=True)
    if p.returncode != 0:
        log(fertig, f"FEHLER bei {video.name}: {p.stderr.strip().splitlines()[-1] if p.stderr.strip() else p.returncode}")
        return False
    mp4 = HIER / "aus" / video.stem / f"{video.stem}-{stil}.mp4"
    srt = HIER / "aus" / video.stem / "captions.srt"
    if mp4.exists():
        ziel = fertig / mp4.name
        ziel.write_bytes(mp4.read_bytes())
        if srt.exists():
            (fertig / f"{video.stem}.srt").write_text(srt.read_text("utf8"), "utf8")
        log(fertig, f"fertig → {ziel}")
        return True
    log(fertig, f"kein MP4 gefunden für {video.name}")
    return False


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--ordner", type=Path, required=True)
    ap.add_argument("--stil", default="beuwy")
    ap.add_argument("--einmal", action="store_true")
    ap.add_argument("--takt", type=int, default=20, help="Sekunden zwischen zwei Blicken in den Ordner")
    a = ap.parse_args()

    ordner = a.ordner.expanduser()
    if not ordner.is_dir():
        sys.exit(f"Ordner fehlt: {ordner}")
    fertig = ordner / "fertig"
    fertig.mkdir(exist_ok=True)
    log(fertig, f"Wächter läuft auf {ordner}, Stil {a.stil}")

    while True:
        erledigt = erledigt_liste(fertig)
        for video in sorted(ordner.iterdir()):
            if video.suffix.lower() not in ENDUNGEN or video.name.startswith("."):
                continue
            schluessel = f"{video.name}:{video.stat().st_size}"
            if schluessel in erledigt:
                continue
            if not stabil(video):
                continue
            ok = schneide(video, a.stil, fertig)
            merke(fertig, f"{video.name}:{video.stat().st_size}")
            if not ok:
                continue
        if a.einmal:
            break
        time.sleep(a.takt)


if __name__ == "__main__":
    main()
