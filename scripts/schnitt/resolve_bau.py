"""
Baut aus edit.json die Timeline in DaVinci Resolve.

Läuft auf zwei Arten:
  a) In Resolve: Workspace → Scripts → beuwy-schnitt (Free und Studio).
     Dafür liegt dieses Skript (oder ein Symlink) in
     ~/Library/Application Support/Blackmagic Design/DaVinci Resolve/Fusion/Scripts/Utility/
     und liest EDIT_JSON aus der Datei ~/.beuwy-schnitt (Pfad zur edit.json).
  b) Extern (nur Studio, Preferences → System → General → External scripting: Local):
     python3 scripts/schnitt/resolve_bau.py scripts/schnitt/aus/<name>/edit.json

Was gebaut wird:
  - Projekt „beuwy Reels“ (oder das offene), Timeline 1080×1920 mit dem Namen des Videos
  - Videospur 1: die Segmente ohne Stille, je Segment ein Zoom (100 / 115 %)
  - Videospur 2: overlay.mov (Captions, Karten, Copy-Hook, Alpha) ab Frame 0
  - optional Render als MP4 H.264 in den Ausgabeordner

Alle Frames-Rechnungen laufen über die Clip-FPS aus dem Media Pool, nicht
über Annahmen. Zoom: Resolve rechnet ZoomX/ZoomY als Faktor um den
Ausgangswert, deshalb wird der Ausgangswert erst gelesen und dann
multipliziert.
"""

from __future__ import annotations

import json
import os
import sys
from pathlib import Path


def _resolve():
    """Resolve-Objekt: aus dem Skript-Menü (globals) oder extern per Modul."""
    r = globals().get("resolve")
    if r is not None:
        return r
    try:
        import DaVinciResolveScript as dvr  # type: ignore
    except ImportError:
        api = os.environ.get(
            "RESOLVE_SCRIPT_API",
            "/Library/Application Support/Blackmagic Design/DaVinci Resolve/Developer/Scripting",
        )
        sys.path.append(os.path.join(api, "Modules"))
        os.environ.setdefault(
            "RESOLVE_SCRIPT_LIB",
            "/Applications/DaVinci Resolve/DaVinci Resolve.app/Contents/Libraries/Fusion/fusionscript.so",
        )
        try:
            import DaVinciResolveScript as dvr  # type: ignore
        except ImportError as e:
            raise SystemExit(
                "DaVinciResolveScript nicht gefunden. Entweder das Skript in Resolve über "
                "Workspace → Scripts starten (Free), oder Studio mit External scripting = Local "
                "und RESOLVE_SCRIPT_API/RESOLVE_SCRIPT_LIB setzen. Details: scripts/schnitt/README.md"
            ) from e
    r = dvr.scriptapp("Resolve")
    if r is None:
        raise SystemExit("Resolve läuft nicht oder External scripting steht auf None.")
    return r


def _frames(sek: float, fps: float) -> int:
    return int(round(sek * fps))


def _clip_fps(item, fallback: float) -> float:
    for key in ("FPS", "Frame rate", "Video frame rate"):
        try:
            v = item.GetClipProperty(key)
            if v:
                return float(str(v).split()[0])
        except Exception:  # noqa: BLE001
            continue
    return fallback


def baue(edit: dict, rendern: bool = False, fps: float = 30.0, projektname: str = "beuwy Reels") -> None:
    r = _resolve()
    pm = r.GetProjectManager()
    projekt = pm.GetCurrentProject()
    if projekt is None:
        projekt = pm.LoadProject(projektname) or pm.CreateProject(projektname)
    if projekt is None:
        raise SystemExit("Kein Projekt.")
    mp = projekt.GetMediaPool()
    ms = r.GetMediaStorage()

    breite = str(edit["format"]["breite"])
    hoehe = str(edit["format"]["hoehe"])
    projekt.SetSetting("timelineResolutionWidth", breite)
    projekt.SetSetting("timelineResolutionHeight", hoehe)
    projekt.SetSetting("timelineFrameRate", str(int(fps)))

    # ── Medien ──────────────────────────────────────────────────────
    video = edit["video"]
    overlay = edit.get("overlay_mov")
    pfade = [video] + ([overlay] if overlay and Path(overlay).exists() else [])
    items = mp.ImportMedia(pfade) or ms.AddItemListToMediaPool(pfade) or []
    if not items:
        raise SystemExit(f"Import fehlgeschlagen: {pfade}")
    by_name = {Path(it.GetClipProperty("File Path") or it.GetName()).name: it for it in items}
    roh = by_name.get(Path(video).name) or items[0]
    ov = by_name.get(Path(overlay).name) if overlay else None
    if overlay and ov is None and len(items) > 1:
        ov = items[1]

    # ── Timeline ────────────────────────────────────────────────────
    name = Path(video).stem + " · " + edit["stil"]
    tl = mp.CreateEmptyTimeline(name)
    if tl is None:
        raise SystemExit("Timeline konnte nicht angelegt werden (Name schon vergeben?).")
    projekt.SetCurrentTimeline(tl)
    tl.SetSetting("useCustomSettings", "1")
    tl.SetSetting("timelineResolutionWidth", breite)
    tl.SetSetting("timelineResolutionHeight", hoehe)
    tl.SetSetting("timelineFrameRate", str(int(fps)))

    # ── Spur 1: Segmente ────────────────────────────────────────────
    cfps = _clip_fps(roh, fps)
    clips = [
        {
            "mediaPoolItem": roh,
            "startFrame": _frames(s["quelle_start"], cfps),
            "endFrame": max(_frames(s["quelle_ende"], cfps) - 1, _frames(s["quelle_start"], cfps) + 1),
        }
        for s in edit["segmente"]
    ]
    angelegt = mp.AppendToTimeline(clips) or []
    print(f"Spur 1: {len(angelegt)} von {len(clips)} Segmenten")

    # ── Zooms je Clip ───────────────────────────────────────────────
    items_v1 = tl.GetItemListInTrack("video", 1) or []
    zooms = edit.get("zooms", [])
    tl_start = tl.GetStartFrame()
    gesetzt = 0
    for it in items_v1:
        start_sek = (it.GetStart() - tl_start) / fps
        faktor = 1.0
        for z in zooms:
            if z["start"] <= start_sek + 0.02:
                faktor = float(z["faktor"])
        if abs(faktor - 1.0) < 1e-6:
            continue
        try:
            basis = float(it.GetProperty("ZoomX") or 1.0)
            it.SetProperty("ZoomX", basis * faktor)
            it.SetProperty("ZoomY", basis * faktor)
            gesetzt += 1
        except Exception as e:  # noqa: BLE001
            print(f"  Zoom nicht gesetzt: {e}")
    print(f"Zooms: {gesetzt} Clips auf 115 %")

    # ── Spur 2: Overlay ─────────────────────────────────────────────
    if ov is not None:
        ofps = _clip_fps(ov, fps)
        ende = _frames(edit["dauer_ziel"], ofps)
        info = {"mediaPoolItem": ov, "startFrame": 0, "endFrame": ende, "trackIndex": 2, "recordFrame": tl_start}
        ok = mp.AppendToTimeline([info])
        if not ok:
            # Fallback: Spur anlegen und ohne recordFrame anhängen (Spur 2 ist leer, also Frame 0)
            tl.AddTrack("video")
            ok = mp.AppendToTimeline([{"mediaPoolItem": ov, "startFrame": 0, "endFrame": ende, "trackIndex": 2}])
        print("Spur 2: Overlay " + ("liegt" if ok else "NICHT gesetzt, bitte overlay.mov von Hand auf V2 ziehen"))

    # ── Render ──────────────────────────────────────────────────────
    if rendern:
        ziel = str(Path(edit["captions_srt"]).parent)
        formate = projekt.GetRenderFormats() or {}
        fmt = "mp4" if "mp4" in formate.values() or "mp4" in formate else list(formate.values())[0]
        codecs = projekt.GetRenderCodecs(fmt) or {}
        codec = next((c for c in codecs.values() if "264" in str(c)), list(codecs.values())[0] if codecs else "H264")
        projekt.SetCurrentRenderFormatAndCodec(fmt, codec)
        projekt.SetRenderSettings(
            {
                "SelectAllFrames": True,
                "TargetDir": ziel,
                "CustomName": Path(video).stem + "-" + edit["stil"],
                "ExportVideo": True,
                "ExportAudio": True,
                "FormatWidth": int(breite),
                "FormatHeight": int(hoehe),
                "FrameRate": int(fps),
            }
        )
        job = projekt.AddRenderJob()
        projekt.StartRendering([job])
        print(f"Render gestartet → {ziel}")

    print(f"Fertig: Timeline „{name}“ in Projekt „{projekt.GetName()}“")


def _edit_pfad_aus_datei() -> Path | None:
    p = Path.home() / ".beuwy-schnitt"
    if p.exists():
        return Path(p.read_text("utf8").strip())
    return None


if __name__ == "__main__" or "resolve" in globals():
    pfad = Path(sys.argv[1]) if len(sys.argv) > 1 and sys.argv[1].endswith(".json") else _edit_pfad_aus_datei()
    if not pfad or not pfad.exists():
        raise SystemExit("edit.json angeben oder Pfad in ~/.beuwy-schnitt schreiben.")
    e = json.loads(pfad.read_text("utf8"))
    baue(e, rendern="--rendern" in sys.argv, fps=float(e["format"]["fps"]))
