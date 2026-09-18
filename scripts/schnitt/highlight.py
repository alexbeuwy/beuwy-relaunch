#!/usr/bin/env python3
"""
Highlight-Cutter: ein Ordner voller Clips rein, ein schnell geschnittenes
Reel raus. Jeder Clip 1 bis 2 Sekunden, Zoom-Punch je Schnitt, optional
Musik mit Schnitt auf den Beat. Render mit HyperFrames.

    python3 scripts/schnitt/highlight.py --ordner ~/Downloads/Highlight\\ Reel
    python3 scripts/schnitt/highlight.py --ordner ~/Downloads/Highlight\\ Reel \\
        --musik ~/Music/track.mp3 --gesamt 30 --titel "Sommer 2026"
    python3 scripts/schnitt/highlight.py --ordner … --clipdauer 1.2 --auswahl aktiv --format landscape

Ablauf:
  1. Clips (mov, mp4, m4v, mkv, webm) und Bilder (jpg, png, heic nicht) einsammeln,
     sortiert nach Name (--nach-datum: nach Aufnahmezeit).
  2. Je Clip die besten Momente wählen: --auswahl aktiv (meiste Bewegung,
     Standard) oder gleichmaessig. Je Moment 1 bis 2 Sekunden im Wechsel
     1.0 / 1.5 / 2.0 (--clipdauer setzt einen festen Wert).
  3. Mit --musik: Schnitte auf die Beats legen (`hyperframes beats`), Clips stumm.
  4. HyperFrames-Komposition: Zoom-Punch im Wechsel (rein/raus), harter Schnitt,
     optional Titelkarte im beuwy-Stil, dann `npx hyperframes render`.

Ausgabe: scripts/schnitt/aus/highlight-<ordner>/highlight.mp4
"""

from __future__ import annotations

import argparse
import html
import json
import os
import random
import shutil
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

HIER = Path(__file__).resolve().parent
VIDEO = {".mov", ".mp4", ".m4v", ".mkv", ".webm"}
BILD = {".jpg", ".jpeg", ".png"}
FORMATE = {"portrait": (1080, 1920), "landscape": (1920, 1080), "square": (1080, 1080)}


@dataclass
class Quelle:
    pfad: Path
    dauer: float  # 0 bei Bildern
    breite: int
    hoehe: int


@dataclass
class Moment:
    quelle: Quelle
    start: float  # in der Quelle
    dauer: float
    ziel: float = 0.0  # in der Timeline


# ── Einsammeln ───────────────────────────────────────────────────────


def _info(pfad: Path) -> Quelle | None:
    import av

    if pfad.suffix.lower() in BILD:
        from PIL import Image

        with Image.open(pfad) as im:
            return Quelle(pfad, 0.0, im.width, im.height)
    try:
        with av.open(str(pfad)) as c:
            st = c.streams.video[0]
            dauer = float(c.duration / 1_000_000) if c.duration else float(st.frames / float(st.average_rate or 30))
            return Quelle(pfad, dauer, st.width, st.height)
    except Exception as e:  # noqa: BLE001
        print(f"  übersprungen {pfad.name}: {e}")
        return None


def einsammeln(ordner: Path, nach_datum: bool) -> list[Quelle]:
    dateien = [p for p in ordner.iterdir() if p.suffix.lower() in VIDEO | BILD and not p.name.startswith(".")]
    dateien.sort(key=(lambda p: p.stat().st_mtime) if nach_datum else (lambda p: p.name.lower()))
    quellen = [q for q in (_info(p) for p in dateien) if q]
    return quellen


# ── Momente wählen ───────────────────────────────────────────────────


def aktivitaet(q: Quelle, schritt: float = 0.25) -> list[tuple[float, float]]:
    """(Zeit, Bewegung) je Abtastpunkt: mittlere Bilddifferenz bei 96 px Breite."""
    import av
    import numpy as np

    punkte: list[tuple[float, float]] = []
    with av.open(str(q.pfad)) as c:
        st = c.streams.video[0]
        st.thread_type = "AUTO"
        naechste = 0.0
        vorher = None
        for fr in c.decode(st):
            t = float(fr.pts * st.time_base) if fr.pts is not None else naechste
            if t < naechste:
                continue
            klein = fr.to_image().convert("L").resize((96, int(96 * q.hoehe / max(q.breite, 1)) or 1))
            arr = np.asarray(klein, dtype=np.float32)
            if vorher is not None:
                punkte.append((t, float(np.abs(arr - vorher).mean())))
            vorher = arr
            naechste += schritt
    return punkte


def momente_waehlen(q: Quelle, n: int, dauern: list[float], auswahl: str, rand: float = 0.3) -> list[Moment]:
    if q.dauer == 0.0:  # Bild
        return [Moment(q, 0.0, dauern[0])]
    nutzbar = max(q.dauer - 2 * rand, 0.2)
    out: list[Moment] = []
    if auswahl == "aktiv" and q.dauer > 3.0:
        try:
            pk = aktivitaet(q)
        except Exception:  # noqa: BLE001
            pk = []
        if pk:
            # Fenster mit der meisten Bewegung, Mindestabstand 1,5 × Clipdauer
            kandidaten = sorted(pk, key=lambda x: x[1], reverse=True)
            gewaehlt: list[float] = []
            for t, _ in kandidaten:
                d = dauern[len(gewaehlt) % len(dauern)]
                s = min(max(t - d / 2, rand), q.dauer - rand - d)
                if s < 0:
                    continue
                if all(abs(s - g) >= 1.5 * d for g in gewaehlt):
                    gewaehlt.append(s)
                if len(gewaehlt) >= n:
                    break
            for i, s in enumerate(sorted(gewaehlt)):
                out.append(Moment(q, s, dauern[i % len(dauern)]))
            if out:
                return out
    # gleichmäßig verteilt
    for i in range(n):
        d = dauern[i % len(dauern)]
        s = rand + (nutzbar - d) * ((i + 0.5) / n) if n > 1 else rand + max(nutzbar - d, 0) / 2
        out.append(Moment(q, max(s, 0.0), min(d, max(q.dauer - 0.05, 0.2))))
    return out


def plan(quellen: list[Quelle], gesamt: float | None, clipdauer: float | None, auswahl: str, seed: int) -> list[Moment]:
    random.seed(seed)
    dauern = [clipdauer] if clipdauer else [1.0, 1.5, 2.0, 1.0, 1.2, 1.8]
    mittel = sum(dauern) / len(dauern)
    n_clips = len(quellen)
    if not n_clips:
        sys.exit("Keine Clips gefunden.")
    ziel_anzahl = int(round(gesamt / mittel)) if gesamt else n_clips
    ziel_anzahl = max(ziel_anzahl, 1)
    # Momente je Quelle: mindestens 1, lange Quellen bekommen mehr
    gewichte = [max(q.dauer, 1.0) for q in quellen]
    summe = sum(gewichte)
    je_quelle = [max(1, int(round(ziel_anzahl * g / summe))) for g in gewichte]
    momente: list[Moment] = []
    di = 0
    for q, n in zip(quellen, je_quelle):
        ms = momente_waehlen(q, n, dauern[di:] + dauern[:di], auswahl)
        di = (di + len(ms)) % len(dauern)
        momente += ms
    if gesamt:
        # gleichmäßig auf die Zielanzahl kürzen, Reihenfolge behalten
        while sum(m.dauer for m in momente) > gesamt and len(momente) > 1:
            idx = max(range(len(momente)), key=lambda i: momente[i].quelle.dauer if len([m for m in momente if m.quelle is momente[i].quelle]) > 1 else -1)
            if momente[idx].quelle.dauer <= 0 or len([m for m in momente if m.quelle is momente[idx].quelle]) <= 1:
                break
            momente.pop(idx)
    t = 0.0
    for m in momente:
        m.ziel = t
        t += m.dauer
    return momente


# ── Beats ────────────────────────────────────────────────────────────


def beats_lesen(projekt: Path, musik: Path) -> list[float]:
    """`npx hyperframes beats` schreibt beats/<audio>.json; leere Liste, wenn das nicht klappt."""
    try:
        subprocess.run(["npx", "hyperframes", "beats", str(musik)], cwd=projekt, capture_output=True, text=True, timeout=300,
                       env=dict(os.environ, HYPERFRAMES_SKIP_SKILLS="1", PATH=_pfad_mit_ffmpeg()))
        for p in (projekt / "beats").glob("*.json"):
            d = json.loads(p.read_text("utf8"))
            arr = d.get("beats") or d.get("times") or d
            if isinstance(arr, list):
                return [float(x["time"] if isinstance(x, dict) else x) for x in arr]
    except Exception:  # noqa: BLE001
        pass
    return []


def auf_beats(momente: list[Moment], beats: list[float]) -> list[Moment]:
    """Jeden Schnitt auf den nächsten Beat ziehen (nur, wenn das die Dauer um < 40 % ändert)."""
    if len(beats) < 4:
        return momente
    t = 0.0
    for m in momente:
        wunsch = t + m.dauer
        naechster = min(beats, key=lambda b: abs(b - wunsch))
        if abs(naechster - wunsch) < 0.4 * m.dauer and naechster > t + 0.4:
            m.dauer = naechster - t
        m.ziel = t
        t += m.dauer
    return momente


# ── Komposition ──────────────────────────────────────────────────────


def _pfad_mit_ffmpeg() -> str:
    from hyperframes_bau import _ffmpeg_pfad

    extra = _ffmpeg_pfad()
    return (extra + os.pathsep if extra else "") + os.environ.get("PATH", "")


def komposition(momente: list[Moment], projekt: Path, fmt: tuple[int, int], fps: int, musik: Path | None, mit_ton: bool, titel: str | None) -> Path:
    projekt.mkdir(parents=True, exist_ok=True)
    (projekt / "clips").mkdir(exist_ok=True)
    b, h = fmt
    gesamt = sum(m.dauer for m in momente)
    teile: list[str] = []
    tweens: list[str] = []
    verlinkt: dict[Path, str] = {}
    for i, m in enumerate(momente):
        q = m.quelle
        if q.pfad not in verlinkt:
            name = f"c{len(verlinkt):03d}{q.pfad.suffix.lower()}"
            ziel = projekt / "clips" / name
            if not ziel.exists():
                try:
                    os.symlink(q.pfad.resolve(), ziel)
                except OSError:
                    shutil.copy2(q.pfad, ziel)
            verlinkt[q.pfad] = name
        src = "clips/" + verlinkt[q.pfad]
        rein = i % 2 == 0
        a, z = (1.14, 1.0) if rein else (1.0, 1.1)
        if q.dauer == 0.0:
            teile.append(f'<img id="m{i}" class="clip mo" src="{src}" data-start="{m.ziel:.3f}" data-duration="{m.dauer:.3f}" alt="">')
        else:
            ton = "" if (mit_ton and not musik) else ' data-volume="0"'
            teile.append(
                f'<video id="m{i}" class="clip mo" src="{src}" data-start="{m.ziel:.3f}" data-duration="{m.dauer:.3f}" '
                f'data-media-start="{m.start:.3f}" data-has-audio="true"{ton}></video>'
            )
        tweens.append(f'tl.fromTo("#m{i}", {{scale:{a}}}, {{scale:{z}, duration:{m.dauer:.3f}, ease:"power2.out"}}, {m.ziel:.3f});')
    if musik:
        mziel = projekt / ("musik" + musik.suffix.lower())
        if not mziel.exists():
            shutil.copy2(musik, mziel)
        teile.append(f'<audio id="musik" src="{mziel.name}" data-start="0" data-duration="{gesamt:.3f}" data-volume="1"></audio>')
    if titel:
        stil = json.loads((HIER / "stile" / "beuwy.json").read_text("utf8"))
        stil["format"] = {"breite": b, "hoehe": h, "fps": fps}
        stil["copy_hook"]["position_y"] = 0.5
        from karten import KartenMaler

        png = KartenMaler(stil, projekt / "karten").male(0, "copy", "voll", titel)
        teile.append(f'<img id="titel" class="clip" src="karten/{png.name}" data-start="0" data-duration="1.6" alt="">')
        tweens.append('tl.fromTo("#titel", {opacity:0, scale:1.06}, {opacity:1, scale:1, duration:0.25}, 0);')
        tweens.append('tl.to("#titel", {opacity:0, duration:0.2}, 1.35);')

    doc = f"""<!doctype html>
<html lang="de" data-resolution="{'portrait' if h > b else ('square' if h == b else 'landscape')}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width={b}, height={h}">
<title>Highlight</title>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<style>
  * {{ margin:0; padding:0; box-sizing:border-box; }}
  html, body {{ width:{b}px; height:{h}px; overflow:hidden; background:#000; }}
  #root {{ position:relative; width:{b}px; height:{h}px; overflow:hidden; background:#000; }}
  .clip {{ position:absolute; inset:0; }}
  .mo {{ width:100%; height:100%; object-fit:cover; transform-origin:50% 50%; }}
</style>
</head>
<body>
<div id="root" data-composition-id="root" data-start="0" data-duration="{gesamt:.3f}" data-width="{b}" data-height="{h}" data-fps="{fps}">
{chr(10).join(teile)}
</div>
<script>
  const tl = gsap.timeline({{ paused: true }});
  {chr(10).join(tweens)}
  window.__timelines = window.__timelines || {{}};
  window.__timelines["root"] = tl;
  tl.seek(0);
</script>
</body>
</html>
"""
    (projekt / "index.html").write_text(doc, "utf8")
    (projekt / "hyperframes.json").write_text(json.dumps({"paths": {"assets": "clips"}, "media": {"autoProxy": True}}, indent=2), "utf8")
    return projekt / "index.html"


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--ordner", type=Path, required=True)
    ap.add_argument("--gesamt", type=float, default=None, help="Ziel-Länge in Sekunden (sonst: alle Clips, je 1 Moment)")
    ap.add_argument("--clipdauer", type=float, default=None, help="feste Dauer je Clip (Standard: Wechsel 1.0/1.5/2.0)")
    ap.add_argument("--auswahl", choices=["aktiv", "gleichmaessig"], default="aktiv")
    ap.add_argument("--musik", type=Path, default=None)
    ap.add_argument("--mit-ton", action="store_true", help="Originalton der Clips behalten (ohne Musik)")
    ap.add_argument("--titel", default=None)
    ap.add_argument("--format", choices=list(FORMATE), default="portrait")
    ap.add_argument("--fps", type=int, default=30)
    ap.add_argument("--nach-datum", action="store_true")
    ap.add_argument("--seed", type=int, default=7)
    ap.add_argument("--qualitaet", default="looks", choices=["draft", "looks", "delivery"])
    ap.add_argument("--nur-html", action="store_true")
    ap.add_argument("-o", "--ausgabe", type=Path, default=None)
    a = ap.parse_args()

    ordner = a.ordner.expanduser()
    if not ordner.is_dir():
        sys.exit(f"Ordner fehlt: {ordner}")
    quellen = einsammeln(ordner, a.nach_datum)
    print(f"{len(quellen)} Quellen in {ordner.name}")
    momente = plan(quellen, a.gesamt, a.clipdauer, a.auswahl, a.seed)

    projekt = HIER / "aus" / f"highlight-{ordner.name.replace(' ', '-').lower()}" / "hyperframes"
    projekt.mkdir(parents=True, exist_ok=True)
    if a.musik:
        beats = beats_lesen(projekt, a.musik.expanduser())
        if beats:
            momente = auf_beats(momente, beats)
            print(f"Schnitte auf {len(beats)} Beats gelegt")
    gesamt = sum(m.dauer for m in momente)
    print(f"{len(momente)} Schnitte · {gesamt:.1f} s · Ø {gesamt / len(momente):.2f} s je Clip")
    index = komposition(momente, projekt, FORMATE[a.format], a.fps, a.musik.expanduser() if a.musik else None, a.mit_ton, a.titel)
    print(f"Komposition: {index}")
    if a.nur_html:
        return
    from hyperframes_bau import rendern

    ausgabe = a.ausgabe or (projekt.parent / "highlight.mp4")
    rc = rendern(projekt, ausgabe, a.fps, a.qualitaet)
    if rc == 0:
        print(f"Fertig: {ausgabe}")
    sys.exit(rc)


if __name__ == "__main__":
    main()
