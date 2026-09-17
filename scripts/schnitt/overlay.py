"""
Overlay-Ebene: Captions, Karten, Flash-Inserts und Copy-Hook als EIN Video
mit Alpha (ProRes 4444, .mov), genau so lang wie die geschnittene Timeline.
Resolve legt es als einen Clip auf Videospur 2. Damit hängt nichts am
Untertitel-Import der Scripting-API, und der Caption-Stil (Wort-
Hervorhebung, Kontur, Position) ist komplett unserer.

Eingabe: edit.json aus schnitt.py. Ausgabe: overlay.mov daneben.
Rendert mit PyAV (bringt ffmpeg mit, kein System-ffmpeg nötig).
"""

from __future__ import annotations

import json
from pathlib import Path

import av
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

from karten import KartenMaler, _hex


class CaptionMaler:
    """Rendert einen Caption-Block als RGBA-Bild in Reelgröße, mit optional
    hervorgehobenem Wort. Bilder werden je (Block, Wortindex) gecacht."""

    def __init__(self, stil: dict, maler: KartenMaler):
        self.stil = stil
        self.c = stil["captions"]
        self.maler = maler
        self.breite = maler.breite
        self.hoehe = maler.hoehe
        self.font = maler.font(self.c["font"], int(self.c["groesse"]))
        self.cache: dict[tuple[int, int], Image.Image] = {}

    def bild(self, block_index: int, woerter: list[str], aktiv: int) -> Image.Image:
        key = (block_index, aktiv)
        if key in self.cache:
            return self.cache[key]
        c = self.c
        img = Image.new("RGBA", (self.breite, self.hoehe), (0, 0, 0, 0))
        z = ImageDraw.Draw(img)
        zh = int(int(c["groesse"]) * 1.2)
        max_b = self.breite - 140
        # Umbruch auf Wortebene, damit die Hervorhebung ein ganzes Wort trifft
        zeilen: list[list[int]] = [[]]
        for i, w in enumerate(woerter):
            probe = " ".join(woerter[j] for j in zeilen[-1] + [i])
            if z.textlength(probe, font=self.font) <= max_b or not zeilen[-1]:
                zeilen[-1].append(i)
            else:
                zeilen.append([i])
        y = int(self.hoehe * float(c["position_y"])) - len(zeilen) * zh // 2
        kontur = int(c.get("kontur_breite", 5))
        hervor = c.get("hervorhebung")
        art = c.get("hervorhebung_art", "farbe")
        for zeile in zeilen:
            text = " ".join(woerter[i] for i in zeile)
            gesamt = z.textlength(text, font=self.font)
            x = (self.breite - gesamt) / 2
            if c.get("schatten"):
                sch = Image.new("RGBA", img.size, (0, 0, 0, 0))
                ImageDraw.Draw(sch).text((x + 4, y + 6), text, font=self.font, fill=(0, 0, 0, 160))
                img = Image.alpha_composite(img, sch.filter(ImageFilter.GaussianBlur(6)))
                z = ImageDraw.Draw(img)
            for i in zeile:
                wort = woerter[i]
                wb = z.textlength(wort + " ", font=self.font)
                ist_aktiv = hervor and i == aktiv
                if ist_aktiv and art == "kasten":
                    pad = 10
                    z.rounded_rectangle((x - pad, y - 4, x + z.textlength(wort, font=self.font) + pad, y + zh - 8), 10, fill=_hex(hervor))
                    z.text((x, y), wort, font=self.font, fill=_hex(c["farbe"]))
                else:
                    farbe = _hex(hervor) if ist_aktiv else _hex(c["farbe"])
                    z.text((x, y), wort, font=self.font, fill=farbe, stroke_width=kontur, stroke_fill=_hex(c["kontur"]))
                x += wb
            y += zh
        self.cache[key] = img
        return img


def rendere_overlay(edit: dict, stil: dict, woerter: list[dict], ziel: Path, fortschritt=print) -> Path:
    """woerter: Liste {w, s, e} in ROHzeit (aus referenz.json). Die Umrechnung
    in Timeline-Zeit passiert hier über die Segmente aus edit.json."""
    fps = int(edit["format"]["fps"])
    breite, hoehe = int(edit["format"]["breite"]), int(edit["format"]["hoehe"])
    dauer = float(edit["dauer_ziel"])
    n = int(round(dauer * fps)) + 1
    maler = KartenMaler(stil, ziel.parent / "karten")
    cm = CaptionMaler(stil, maler)

    # Segmente für Roh → Ziel
    segmente = edit["segmente"]

    def ziel_zeit(t: float) -> float | None:
        for s in segmente:
            if s["quelle_start"] <= t <= s["quelle_ende"]:
                return s["ziel_start"] + (t - s["quelle_start"])
        return None

    # Caption-Blöcke mit Wort-Zeiten in Zielzeit
    bloecke: list[dict] = []
    for bi, b in enumerate(edit["captions"]):
        bloecke.append({"start": b["start"], "ende": b["ende"], "woerter": [], "zeiten": []})
    # Wörter den Blöcken zuordnen (gleiche Reihenfolge wie in schnitt.captions)
    zi = 0
    for w in woerter:
        zs = ziel_zeit(float(w["s"]))
        if zs is None:
            continue
        while zi < len(bloecke) - 1 and zs >= bloecke[zi + 1]["start"] - 1e-6:
            zi += 1
        if zi < len(bloecke):
            bloecke[zi]["woerter"].append(w["w"].upper() if stil["captions"].get("grossschreibung") else w["w"])
            bloecke[zi]["zeiten"].append(zs)

    overlays = [
        (o["start"], o["start"] + o["dauer"], Image.open(o["datei"]).convert("RGBA"))
        for o in edit["overlays"]
    ]

    out = av.open(str(ziel), "w")
    st = out.add_stream("prores_ks", rate=fps)
    st.width, st.height = breite, hoehe
    st.pix_fmt = "yuva444p10le"
    st.options = {"profile": "4"}
    leer = Image.new("RGBA", (breite, hoehe), (0, 0, 0, 0))
    letzte_signatur = None
    letzter_frame = None
    for f in range(n):
        t = f / fps
        # Signatur: welcher Block, welches Wort, welche Overlays sichtbar
        block = next((i for i, b in enumerate(bloecke) if b["start"] <= t <= b["ende"] and b["woerter"]), None)
        aktiv = -1
        if block is not None:
            zeiten = bloecke[block]["zeiten"]
            aktiv = max((i for i, z in enumerate(zeiten) if z <= t), default=0)
        sichtbar = tuple(i for i, (a, b, _) in enumerate(overlays) if a <= t < b)
        signatur = (block, aktiv, sichtbar)
        if signatur != letzte_signatur:
            img = leer
            if block is not None:
                img = Image.alpha_composite(img, cm.bild(block, bloecke[block]["woerter"], aktiv))
            for i in sichtbar:
                img = Image.alpha_composite(img, overlays[i][2])
            letzter_frame = av.VideoFrame.from_ndarray(np.array(img), format="rgba")
            letzte_signatur = signatur
        for p in st.encode(letzter_frame):
            out.mux(p)
        if f % (fps * 5) == 0:
            fortschritt(f"  overlay {t:5.1f} s / {dauer:.1f} s")
    for p in st.encode():
        out.mux(p)
    out.close()
    return ziel


if __name__ == "__main__":
    import sys

    e = json.loads(Path(sys.argv[1]).read_text("utf8"))
    s = json.loads((Path(__file__).parent / "stile" / f"{e['stil']}.json").read_text("utf8"))
    w = json.loads(Path(sys.argv[2]).read_text("utf8"))["woerter"]
    print(rendere_overlay(e, s, w, Path(sys.argv[1]).parent / "overlay.mov"))
