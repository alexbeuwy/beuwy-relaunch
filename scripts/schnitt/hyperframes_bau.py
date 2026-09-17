"""
HyperFrames-Bau: aus edit.json eine HyperFrames-Komposition (HTML) und
daraus per `npx hyperframes render` das fertige MP4. Kein Resolve nötig.

    python3 scripts/schnitt/hyperframes_bau.py scripts/schnitt/aus/<name>/edit.json
    python3 scripts/schnitt/hyperframes_bau.py … --maxdauer 15   # nur die ersten 15 s (Test)
    python3 scripts/schnitt/hyperframes_bau.py … --nur-html       # nur die Komposition, kein Render

Aufbau der Komposition (docs: `npx hyperframes docs data-attributes`):
  - Wurzel: <div data-composition-id="root" data-width data-height>
  - Je Segment ein <video class="clip" data-start data-duration data-media-start>
    mit CSS-Scale für den Zoom (100 / 115 %)
  - Captions: je Zustand (Block + aktives Wort) ein <div> mit data-start/-duration,
    aktives Wort als <b> in der Hervorhebungsfarbe des Stils
  - Karten/Flash/Copy-Hook: die PNGs aus karten/ als <img class="clip">
    mit kurzem Einblenden per WAAPI
Audio kommt aus den Video-Elementen (data-has-audio).

Voraussetzungen: Node ≥ 18, `npm install` in scripts/schnitt (hyperframes),
ffmpeg im PATH (brew install ffmpeg), Chrome holt hyperframes selbst
(`npx hyperframes browser ensure`).
"""

from __future__ import annotations

import argparse
import html
import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

HIER = Path(__file__).resolve().parent


def _stil(name: str) -> dict:
    return json.loads((HIER / "stile" / f"{name}.json").read_text("utf8"))


def _zeiten_der_woerter(edit: dict, woerter: list[dict]) -> list[list[tuple[str, float]]]:
    """Wörter je Caption-Block in Timeline-Zeit (gleiche Zuordnung wie overlay.py)."""
    segmente = edit["segmente"]

    def ziel(t: float) -> float | None:
        for s in segmente:
            if s["quelle_start"] <= t <= s["quelle_ende"]:
                return s["ziel_start"] + (t - s["quelle_start"])
        return None

    bloecke: list[list[tuple[str, float]]] = [[] for _ in edit["captions"]]
    zi = 0
    for w in woerter:
        zs = ziel(float(w["s"]))
        if zs is None:
            continue
        while zi < len(bloecke) - 1 and zs >= edit["captions"][zi + 1]["start"] - 1e-6:
            zi += 1
        if zi < len(bloecke):
            bloecke[zi].append((w["w"], zs))
    return bloecke


def komposition(edit: dict, stil: dict, woerter: list[dict], projekt: Path, maxdauer: float | None) -> Path:
    projekt.mkdir(parents=True, exist_ok=True)
    (projekt / "karten").mkdir(exist_ok=True)
    b, h = int(edit["format"]["breite"]), int(edit["format"]["hoehe"])
    fps = int(edit["format"]["fps"])
    c = stil["captions"]
    dauer = float(edit["dauer_ziel"])
    if maxdauer:
        dauer = min(dauer, maxdauer)

    # Rohvideo verlinken (Chrome lädt relativ zum Projekt)
    roh = Path(edit["video"])
    ziel_roh = projekt / ("roh" + roh.suffix.lower())
    if not ziel_roh.exists():
        try:
            os.symlink(roh, ziel_roh)
        except OSError:
            shutil.copy2(roh, ziel_roh)

    teile: list[str] = []
    # ── Spur 1: Segmente ────────────────────────────────────────────
    zooms = edit.get("zooms", [])
    for si, s in enumerate(edit["segmente"]):
        start = float(s["ziel_start"])
        d = float(s["quelle_ende"]) - float(s["quelle_start"])
        if start >= dauer:
            continue
        d = min(d, dauer - start)
        faktor = 1.0
        for z in zooms:
            if z["start"] <= start + 0.02:
                faktor = float(z["faktor"])
        teile.append(
            f'<video id="seg{si}" class="clip seg" src="{ziel_roh.name}" data-start="{start:.3f}" data-duration="{d:.3f}" '
            f'data-media-start="{float(s["quelle_start"]):.3f}" data-has-audio="true" '
            f'style="transform:scale({faktor:.3f})"></video>'
        )

    # ── Captions ────────────────────────────────────────────────────
    bloecke = _zeiten_der_woerter(edit, woerter)
    hervor = c.get("hervorhebung")
    for bi, block in enumerate(edit["captions"]):
        ws = bloecke[bi] if bi < len(bloecke) else []
        if not ws:
            continue
        b_start, b_ende = float(block["start"]), float(block["ende"])
        if b_start >= dauer:
            continue
        b_ende = min(b_ende, dauer)
        # Zustände: ab jedem Wortstart ist dieses Wort aktiv
        for wi, (_wort, wz) in enumerate(ws):
            z_start = max(b_start, wz)
            z_ende = ws[wi + 1][1] if wi + 1 < len(ws) else b_ende
            z_ende = min(max(z_ende, z_start + 0.05), b_ende)
            if z_ende <= z_start:
                continue
            innen = []
            for wj, (wort, _) in enumerate(ws):
                txt = html.escape(wort.upper() if c.get("grossschreibung") else wort)
                if hervor and wj == wi:
                    innen.append(f'<b class="aktiv">{txt}</b>')
                else:
                    innen.append(txt)
            teile.append(
                f'<div id="cap{bi}-{wi}" class="clip cap" data-start="{z_start:.3f}" data-duration="{z_ende - z_start:.3f}">'
                f'<span>{" ".join(innen)}</span></div>'
            )

    # ── Karten, Flash, Copy-Hook ────────────────────────────────────
    for i, o in enumerate(edit.get("overlays", [])):
        start, d = float(o["start"]), float(o["dauer"])
        if start >= dauer:
            continue
        d = min(d, dauer - start)
        quelle = Path(o["datei"])
        ziel = projekt / "karten" / quelle.name
        if not ziel.exists():
            shutil.copy2(quelle, ziel)
        teile.append(
            f'<img id="ov{i}" class="clip karte {o["art"]}" src="karten/{quelle.name}" data-start="{start:.3f}" data-duration="{d:.3f}" alt="">'
        )

    kontur = int(c.get("kontur_breite", 5))
    schatten = "text-shadow: 0 4px 12px rgba(0,0,0,.6);" if c.get("schatten") else ""
    css = f"""
    * {{ margin:0; padding:0; box-sizing:border-box; }}
    html, body {{ margin:0; width:{b}px; height:{h}px; overflow:hidden; background:#000; }}
    #root {{ position:relative; width:{b}px; height:{h}px; overflow:hidden; background:#000; }}
    .clip {{ position:absolute; inset:0; }}
    video.seg {{ width:100%; height:100%; object-fit:cover; transform-origin:50% 50%; }}
    .cap {{ display:flex; align-items:flex-start; justify-content:center; pointer-events:none; }}
    .cap span {{
      position:absolute; top:{int(h * float(c["position_y"]))}px; left:70px; right:70px;
      transform:translateY(-50%);
      text-align:center; font-family: Inter, "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-weight:800; font-size:{int(c["groesse"])}px; line-height:1.2; color:{c["farbe"]};
      -webkit-text-stroke:{kontur}px {c["kontur"]}; paint-order:stroke fill; {schatten}
    }}
    .cap b.aktiv {{ color:{hervor or c["farbe"]}; font-weight:800; }}
    img.karte {{ width:100%; height:100%; object-fit:contain; }}
    """
    # Einblenden der Karten über GSAP (HyperFrames steuert die Timeline deterministisch)
    tweens = []
    for i, o in enumerate(edit.get("overlays", [])):
        if float(o["start"]) >= dauer:
            continue
        d = 0.12 if o["art"] == "flash" else 0.22
        tweens.append(f'tl.from("#ov{i}", {{opacity:0, y:18, duration:{d}}}, {float(o["start"]):.3f});')
    gsap = f"""
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script>
  const tl = gsap.timeline({{ paused: true }});
  {chr(10).join(tweens)}
  window.__timelines = window.__timelines || {{}};
  window.__timelines["root"] = tl;
  tl.seek(0);
</script>"""
    doc = f"""<!doctype html>
<html lang="de" data-resolution="{'portrait' if h > b else 'landscape'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width={b}, height={h}">
<title>{html.escape(Path(edit["video"]).stem)} · {html.escape(edit["stil"])}</title>
<style>{css}</style>
</head>
<body>
<div id="root" data-composition-id="root" data-start="0" data-duration="{dauer:.3f}" data-width="{b}" data-height="{h}" data-fps="{fps}">
{chr(10).join(teile)}
</div>
{gsap}
</body>
</html>
"""
    (projekt / "index.html").write_text(doc, "utf8")
    (projekt / "hyperframes.json").write_text(
        json.dumps(
            {
                "$schema": "https://hyperframes.heygen.com/schema/hyperframes.json",
                "paths": {"blocks": "compositions", "components": "compositions/components", "assets": "karten"},
                "media": {"autoProxy": True},
            },
            indent=2,
        ),
        "utf8",
    )
    return projekt / "index.html"


def _ffmpeg_pfad() -> str | None:
    """ffmpeg und ffprobe ohne brew: die npm-Pakete ffmpeg-static und
    ffprobe-static (in package.json) bringen statische Binaries mit.
    Liegt ffmpeg schon im PATH, passiert nichts."""
    if shutil.which("ffmpeg") and shutil.which("ffprobe"):
        return None
    bin_dir = HIER / "bin"
    bin_dir.mkdir(exist_ok=True)
    try:
        out = subprocess.run(
            ["node", "-e", "console.log(require('ffmpeg-static'));console.log(require('ffprobe-static').path)"],
            cwd=HIER,
            capture_output=True,
            text=True,
            timeout=30,
        )
        ffmpeg, ffprobe = [z.strip() for z in out.stdout.strip().splitlines()[:2]]
        for name, exe in (("ffmpeg", ffmpeg), ("ffprobe", ffprobe)):
            ziel = bin_dir / name
            if ziel.is_symlink() or ziel.exists():
                ziel.unlink()
            ziel.symlink_to(exe)
        return str(bin_dir)
    except Exception:  # noqa: BLE001
        return None


def rendern(projekt: Path, ausgabe: Path, fps: int, qualitaet: str = "looks") -> int:
    """`npx hyperframes render` aus scripts/schnitt heraus (dort liegt node_modules)."""
    if not (HIER / "node_modules" / ".bin" / "hyperframes").exists():
        print("hyperframes fehlt: in scripts/schnitt einmal `npm install` ausführen.")
        return 2
    cmd = ["npx", "hyperframes", "render", str(projekt), "-o", str(ausgabe), "-f", str(fps), "-q", qualitaet]
    env = dict(os.environ, HYPERFRAMES_SKIP_SKILLS="1")
    extra = _ffmpeg_pfad()
    if extra:
        env["PATH"] = extra + os.pathsep + env.get("PATH", "")
    print("→", " ".join(cmd))
    return subprocess.call(cmd, cwd=HIER, env=env)


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("edit", type=Path)
    ap.add_argument("--transkript", type=Path, help="referenz.json mit Wörtern (Standard: woerter.json neben edit.json)")
    ap.add_argument("--maxdauer", type=float, default=None)
    ap.add_argument("--nur-html", action="store_true")
    ap.add_argument("--qualitaet", default="looks", choices=["draft", "looks", "delivery", "standard", "high"])
    ap.add_argument("-o", "--ausgabe", type=Path, default=None)
    a = ap.parse_args()

    edit = json.loads(a.edit.read_text("utf8"))
    stil = _stil(edit["stil"])
    wpfad = a.transkript or (a.edit.parent / "woerter.json")
    if not wpfad.exists():
        sys.exit(f"Wörter fehlen: {wpfad} (schnitt.py schreibt woerter.json)")
    woerter = json.loads(wpfad.read_text("utf8"))
    woerter = woerter.get("woerter", woerter)

    projekt = a.edit.parent / "hyperframes"
    index = komposition(edit, stil, woerter, projekt, a.maxdauer)
    print(f"Komposition: {index}")
    if a.nur_html:
        return
    ausgabe = a.ausgabe or (a.edit.parent / f"{Path(edit['video']).stem}-{edit['stil']}.mp4")
    rc = rendern(projekt, ausgabe, int(edit["format"]["fps"]), a.qualitaet)
    if rc == 0:
        print(f"Fertig: {ausgabe}")
    sys.exit(rc)


if __name__ == "__main__":
    main()
