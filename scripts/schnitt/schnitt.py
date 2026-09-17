#!/usr/bin/env python3
"""
Schnitt-System: Rohvideo rein, fertige Reel-Timeline in DaVinci Resolve raus.
Nachbau des Systems aus Referenz @jenya_kork (DdBmO3BAWYH): ein Stilkatalog,
ein Video reinschicken, Stil wählen, Reel im eigenen Stil bekommen.

    python3 scripts/schnitt/schnitt.py --video ~/Movies/Filme/Reels/IMG_5215.MOV --stil beuwy
    python3 scripts/schnitt/schnitt.py --video roh.mov --stil beuwy \\
        --schnittplan docs/branding/skripte/batch-004-stufenleiter-jacklaydenn.md --skript 1
    python3 scripts/schnitt/schnitt.py --video roh.mov --stil jenya --trocken

Was passiert, in dieser Reihenfolge:
  1. Transkript mit Wort-Zeitstempeln (Whisper; oder --transkript <referenz.json>)
  2. Stille raus: Segmente aus den Wortpausen (Stil: min_pause_sek, polster_sek)
  3. Captions als SRT in Timeline-Zeit (Stil: Sätze / Wörter, max_woerter)
  4. Karten und Flash-Inserts als PNG mit Alpha aus dem Schnittplan
     (Zeilen `Sek. Zone Art Inhalt`, siehe docs/branding/SKELETTE.md Teil 4)
  5. Zoom-Sprünge je Segment (Stil: wechsel 100 → 115 %) oder aus dem Schnittplan
  6. Edit-Liste als JSON (aus/edit.json) — das ist die Übergabe
  7. Ohne --trocken: resolve_bau.py baut daraus die Timeline in Resolve
     (Resolve muss laufen, siehe scripts/schnitt/README.md)

Stile liegen in scripts/schnitt/stile/*.json. Ein neuer Stil = eine neue
Datei, abgeleitet aus einer Referenz in docs/branding/referenzen/.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass, asdict
from pathlib import Path

HIER = Path(__file__).resolve().parent
WURZEL = HIER.parent.parent
sys.path.insert(0, str(WURZEL / "scripts" / "referenz"))

from karten import KartenMaler  # noqa: E402


# ── Daten ────────────────────────────────────────────────────────────


@dataclass
class Wort:
    wort: str
    start: float
    ende: float


@dataclass
class Segment:
    """Ein Stück Rohvideo, das bleibt. quelle_* in Rohzeit, ziel_start in Timeline-Zeit."""

    quelle_start: float
    quelle_ende: float
    ziel_start: float

    @property
    def dauer(self) -> float:
        return self.quelle_ende - self.quelle_start


@dataclass
class Ereignis:
    sek: float
    zone: str
    art: str
    inhalt: str


@dataclass
class Overlay:
    datei: str
    start: float
    dauer: float
    zone: str
    art: str
    inhalt: str


# ── Stil ─────────────────────────────────────────────────────────────


def lade_stil(name: str) -> dict:
    pfad = HIER / "stile" / f"{name}.json"
    if not pfad.exists():
        vorhanden = ", ".join(p.stem for p in (HIER / "stile").glob("*.json"))
        sys.exit(f"Stil „{name}“ gibt es nicht. Vorhanden: {vorhanden}")
    return json.loads(pfad.read_text("utf8"))


# ── Transkript ───────────────────────────────────────────────────────


def woerter_laden(pfad: Path) -> list[Wort]:
    """Liest das JSON aus referenz.py (Felder w/s/e)."""
    d = json.loads(pfad.read_text("utf8"))
    return [Wort(x["w"], float(x["s"]), float(x["e"])) for x in d.get("woerter", [])]


def transkribieren(video: Path, modell: str, sprache: str | None) -> list[Wort]:
    from referenz import transkribiere  # aus scripts/referenz

    roh, _dauer, _sprache = transkribiere(video, modell, sprache)
    return [Wort(w.wort, w.start, w.ende) for w in roh]


# ── Schritt 2: Stille raus ───────────────────────────────────────────


def segmente_aus_woertern(woerter: list[Wort], min_pause: float, polster: float, gesamt: float) -> list[Segment]:
    """Alles behalten, was gesprochen ist, plus Polster. Pausen unter min_pause
    bleiben drin (sonst klingt es gehackt), längere fliegen raus."""
    if not woerter:
        return [Segment(0.0, gesamt, 0.0)]
    bloecke: list[list[float]] = [[woerter[0].start, woerter[0].ende]]
    for w in woerter[1:]:
        if w.start - bloecke[-1][1] <= min_pause:
            bloecke[-1][1] = max(bloecke[-1][1], w.ende)
        else:
            bloecke.append([w.start, w.ende])
    out: list[Segment] = []
    ziel = 0.0
    for a, b in bloecke:
        qa = max(0.0, a - polster)
        qb = min(gesamt, b + polster) if gesamt else b + polster
        if out and qa <= out[-1].quelle_ende:
            # Polster überlappt das vorige Segment: zusammenziehen
            ziel -= out[-1].dauer
            qa = out[-1].quelle_start
            out.pop()
        out.append(Segment(qa, qb, ziel))
        ziel += qb - qa
    return out


def teile_an(segmente: list[Segment], zielzeiten: list[float]) -> list[Segment]:
    """Schneidet Segmente an Timeline-Zeiten (z. B. Zoom-Sprüngen) auseinander.
    Schnitte näher als 0,25 s an einer Segmentgrenze werden ignoriert."""
    out: list[Segment] = []
    for s in segmente:
        punkte = sorted(t for t in zielzeiten if s.ziel_start + 0.25 < t < s.ziel_start + s.dauer - 0.25)
        a = s.quelle_start
        z = s.ziel_start
        for t in punkte:
            b = s.quelle_start + (t - s.ziel_start)
            out.append(Segment(a, b, z))
            z += b - a
            a = b
        out.append(Segment(a, s.quelle_ende, z))
    return out


def roh_zu_ziel(t: float, segmente: list[Segment]) -> float | None:
    """Rohzeit → Timeline-Zeit. None, wenn der Moment rausgeschnitten ist."""
    for s in segmente:
        if s.quelle_start <= t <= s.quelle_ende:
            return s.ziel_start + (t - s.quelle_start)
    return None


# ── Schritt 3: Captions ──────────────────────────────────────────────


def _srt_zeit(t: float) -> str:
    ms = int(round(t * 1000))
    h, ms = divmod(ms, 3_600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def captions(woerter: list[Wort], segmente: list[Segment], stil: dict) -> tuple[str, list[dict]]:
    """Blöcke aus max_woerter Wörtern, Bruch an Satzende. Zeiten in Timeline-Zeit."""
    c = stil["captions"]
    max_w = int(c.get("max_woerter", 4))
    gross = bool(c.get("grossschreibung"))
    bloecke: list[list[Wort]] = []
    aktuell: list[Wort] = []
    for w in woerter:
        if roh_zu_ziel(w.start, segmente) is None:
            continue
        aktuell.append(w)
        if len(aktuell) >= max_w or w.wort.rstrip().endswith((".", "?", "!", ":")):
            bloecke.append(aktuell)
            aktuell = []
    if aktuell:
        bloecke.append(aktuell)

    zeilen: list[str] = []
    daten: list[dict] = []
    for i, b in enumerate(bloecke, 1):
        start = roh_zu_ziel(b[0].start, segmente)
        ende = roh_zu_ziel(b[-1].ende, segmente)
        if start is None or ende is None:
            continue
        # bis zum nächsten Block stehen lassen, sonst flackert es
        if i < len(bloecke):
            naechster = roh_zu_ziel(bloecke[i][0].start, segmente)
            if naechster is not None:
                ende = max(ende, naechster - 0.05)
        text = " ".join(w.wort for w in b)
        if gross:
            text = text.upper()
        zeilen += [str(i), f"{_srt_zeit(start)} --> {_srt_zeit(ende)}", text, ""]
        daten.append({"start": round(start, 3), "ende": round(ende, 3), "text": text})
    return "\n".join(zeilen), daten


# ── Schritt 4: Schnittplan ───────────────────────────────────────────

ZEILE = re.compile(r"^\s*(\d+(?:[.,]\d+)?)\s+(oben|unten|voll)\s+(schnitt|zoom|karte|screen|copy|flash|umdrehen)\s+(.+?)\s*$")


def schnittplan_lesen(pfad: Path, skript: int | None) -> list[Ereignis]:
    """Liest den Codeblock nach **Schnittplan:** aus einer Batch-Datei (Skript N)
    oder jede Zeile aus einer reinen Textdatei."""
    text = pfad.read_text("utf8")
    if pfad.suffix == ".md" and "## Skript" in text:
        teile = text.split("\n## Skript ")
        if skript is None or skript < 1 or skript > len(teile) - 1:
            sys.exit(f"--skript 1..{len(teile) - 1} angeben (Batch hat {len(teile) - 1} Skripte)")
        block = teile[skript]
        m = re.search(r"\*\*Schnittplan:\*\*\s*```(.*?)```", block, re.S)
        if not m:
            sys.exit("Kein Schnittplan-Block in diesem Skript")
        text = m.group(1)
    out: list[Ereignis] = []
    for z in text.splitlines():
        m = ZEILE.match(z)
        if m:
            out.append(Ereignis(float(m.group(1).replace(",", ".")), m.group(2), m.group(3), m.group(4)))
    return out


def _flash_dauer(inhalt: str, standard: float) -> tuple[str, float]:
    """Klammer-Anmerkungen am Ende („(1,2 Sek., zu schnell)“, „(0,8 Sek., blitzt)“,
    „(bleibt bis 36.0)“) vom Text trennen. Eine Sekundenangabe darin wird die
    Dauer. Anführungszeichen um den Text fliegen raus."""
    dauer = standard
    m = re.search(r"\s*\(([^()]*)\)\s*$", inhalt)
    if m:
        anmerkung = m.group(1)
        inhalt = inhalt[: m.start()].strip()
        d = re.search(r"(\d+(?:[.,]\d+)?)\s*Sek", anmerkung)
        if d:
            dauer = float(d.group(1).replace(",", "."))
        b = re.search(r"bleibt bis (\d+(?:[.,]\d+)?)", anmerkung)
        if b:
            dauer = -float(b.group(1).replace(",", "."))  # negativ = absolute Endzeit
    return inhalt.strip("„“\"”‚‘' "), dauer


# ── Hauptprogramm ────────────────────────────────────────────────────


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--video", type=Path, required=True)
    ap.add_argument("--stil", default="beuwy")
    ap.add_argument("--schnittplan", type=Path)
    ap.add_argument("--skript", type=int)
    ap.add_argument("--transkript", type=Path, help="JSON aus referenz.py, spart die Transkription")
    ap.add_argument("--modell", default="medium")
    ap.add_argument("--sprache", default=None)
    ap.add_argument("--aus", type=Path, default=None)
    ap.add_argument("--trocken", action="store_true", help="nur Edit-Liste und Assets, kein Resolve")
    ap.add_argument("--rendern", action="store_true", help="nach dem Bau auch rendern")
    ap.add_argument("--fontdir", type=Path, default=None, help="Ordner mit TTF/OTF (Inter, Helvena)")
    ap.add_argument("--ohne-overlay", action="store_true", help="Overlay-Video nicht rendern (nur Karten-PNGs)")
    a = ap.parse_args()

    if not a.video.exists():
        sys.exit(f"Video fehlt: {a.video}")
    stil = lade_stil(a.stil)
    aus = a.aus or (HIER / "aus" / a.video.stem)
    aus.mkdir(parents=True, exist_ok=True)
    fps = float(stil["format"]["fps"])

    # 1. Transkript
    if a.transkript:
        woerter = woerter_laden(a.transkript)
        print(f"Transkript geladen: {len(woerter)} Wörter")
    else:
        print(f"transkribiere {a.video.name} ({a.modell}) …")
        woerter = transkribieren(a.video, a.modell, a.sprache)
        print(f"  {len(woerter)} Wörter")
    gesamt = video_dauer(a.video) or (woerter[-1].ende + 0.5 if woerter else 0.0)

    # 2. Stille raus
    st = stil["stille"]
    segmente = segmente_aus_woertern(woerter, float(st["min_pause_sek"]), float(st["polster_sek"]), gesamt)
    laenge = sum(s.dauer for s in segmente)
    print(f"Segmente: {len(segmente)} · {gesamt:.1f} s → {laenge:.1f} s (Stille raus)")

    # 3. Captions
    srt, caption_daten = captions(woerter, segmente, stil)
    (aus / "captions.srt").write_text(srt, "utf8")

    # 4. Karten aus dem Schnittplan
    ereignisse = schnittplan_lesen(a.schnittplan, a.skript) if a.schnittplan else []
    maler = KartenMaler(stil, aus / "karten", fontdir=a.fontdir)
    overlays: list[Overlay] = []
    k = stil["karten"]
    for i, e in enumerate(ereignisse):
        if e.art in ("karte", "flash", "copy"):
            inhalt, dauer = _flash_dauer(e.inhalt, float(k["flash_sek"]) if e.art == "flash" else float(k["dauer_sek"]))
            if e.art == "copy":
                dauer = float(stil["copy_hook"]["dauer_sek"])
            if dauer < 0:  # „bleibt bis X“: absolute Endzeit
                dauer = -dauer - e.sek
            datei = maler.male(i, e.art, e.zone, inhalt)
            overlays.append(Overlay(str(datei), e.sek, dauer, e.zone, e.art, inhalt))

    # 5. Zooms
    zooms: list[dict] = []
    plan_zooms = [e for e in ereignisse if e.art == "zoom"]
    if plan_zooms:
        for e in plan_zooms:
            m = re.search(r"(\d{2,3})\s*%", e.inhalt)
            zooms.append({"start": e.sek, "faktor": (float(m.group(1)) / 100) if m else 1.15})
    else:
        z = stil["zoom"]
        stufen = z.get("stufen", [1.0])
        if z.get("muster") == "wechsel" and len(stufen) > 1:
            t = 0.0
            i = 0
            max_abstand = float(z.get("max_abstand_sek", 2.5))
            for s in segmente:
                # innerhalb langer Segmente zusätzlich alle max_abstand Sekunden springen
                t = s.ziel_start
                while t < s.ziel_start + s.dauer:
                    zooms.append({"start": round(t, 3), "faktor": stufen[i % len(stufen)]})
                    i += 1
                    t += max_abstand

    # 5b. Segmente an den Zoom-Punkten teilen: Resolve kann per API keinen
    #     Clip schneiden, also bekommt jeder Zoom sein eigenes Segment.
    segmente = teile_an(segmente, [z["start"] for z in zooms])

    # 6. Edit-Liste
    edit = {
        "video": str(a.video.resolve()),
        "stil": stil["name"],
        "format": stil["format"],
        "dauer_roh": round(gesamt, 3),
        "dauer_ziel": round(laenge, 3),
        "segmente": [asdict(s) for s in segmente],
        "zooms": zooms,
        "overlays": [asdict(o) for o in overlays],
        "captions_srt": str((aus / "captions.srt").resolve()),
        "captions": caption_daten,
        "layout": stil.get("layout", "vollbild"),
        "zone_hoehe": stil["karten"].get("zone_hoehe", 0.45),
    }
    # 6b. Overlay-Ebene als Alpha-Video (Captions + Karten + Copy-Hook)
    if not a.ohne_overlay:
        from overlay import rendere_overlay

        print("rendere Overlay (ProRes 4444 mit Alpha) …")
        wort_daten = [{"w": w.wort, "s": w.start, "e": w.ende} for w in woerter]
        mov = rendere_overlay(edit, stil, wort_daten, aus / "overlay.mov")
        edit["overlay_mov"] = str(mov.resolve())

    (aus / "edit.json").write_text(json.dumps(edit, ensure_ascii=False, indent=1), "utf8")
    print(f"Edit-Liste: {aus / 'edit.json'}")
    print(f"  {len(caption_daten)} Captions · {len(overlays)} Overlays · {len(zooms)} Zooms · {len(segmente)} Clips")
    # Für den Start aus dem Resolve-Skriptmenü (Free-Version)
    (Path.home() / ".beuwy-schnitt").write_text(str((aus / "edit.json").resolve()), "utf8")

    if a.trocken:
        print("Trockenlauf, Resolve nicht angefasst. In Resolve: Workspace → Scripts → beuwy-schnitt.")
        return

    # 7. Resolve
    from resolve_bau import baue

    baue(edit, rendern=a.rendern, fps=fps)


def video_dauer(pfad: Path) -> float | None:
    try:
        import av

        with av.open(str(pfad)) as c:
            return float(c.duration / 1_000_000) if c.duration else None
    except Exception:  # noqa: BLE001
        return None


if __name__ == "__main__":
    main()
