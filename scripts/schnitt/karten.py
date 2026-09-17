"""
Karten-Maler: rendert Karten, Flash-Inserts und den Copy-Hook als PNG mit
Alpha in der Größe des Reels (1080×1920). Resolve legt sie 1:1 auf
Videospur 2, deshalb sind sie schon an der richtigen Stelle im Bild.

Design kommt aus dem Stil (Farben, Radius, Rand, Schriften). Beim Hausstil
sind das die Tokens aus src/app/globals.css: Papier, Tinte, Ultramarin.
"""

from __future__ import annotations

import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

HIER = Path(__file__).resolve().parent
WURZEL = HIER.parent.parent

# Wo Schriften liegen können, in dieser Reihenfolge
FONT_ORDNER = [
    HIER / "fonts",
    Path.home() / "Library" / "Fonts",
    Path("/Library/Fonts"),
    Path("/System/Library/Fonts"),
    Path("/System/Library/Fonts/Supplemental"),
    Path("/usr/share/fonts/truetype/dejavu"),
]

# Name im Stil → mögliche Dateinamen
FONT_DATEIEN = {
    "Inter": ["Inter-Regular.ttf", "Inter-Regular.otf", "Inter.ttc", "Inter-VariableFont_opsz,wght.ttf", "Helvetica.ttc", "DejaVuSans.ttf"],
    "Inter-Bold": ["Inter-Bold.ttf", "Inter-Bold.otf", "Inter-SemiBold.ttf", "Inter.ttc", "HelveticaNeue.ttc", "DejaVuSans-Bold.ttf"],
    "Inter-Black": ["Inter-Black.ttf", "Inter-ExtraBold.ttf", "Inter-Bold.ttf", "HelveticaNeue.ttc", "DejaVuSans-Bold.ttf"],
    "Helvena": ["Helvena.ttf", "Helvena.otf", "Inter-Bold.ttf", "HelveticaNeue.ttc", "DejaVuSerif-Bold.ttf"],
}


def _hex(farbe: str, alpha: int = 255) -> tuple[int, int, int, int]:
    f = farbe.lstrip("#")
    return (int(f[0:2], 16), int(f[2:4], 16), int(f[4:6], 16), alpha)


class KartenMaler:
    def __init__(self, stil: dict, ziel: Path, fontdir: Path | None = None):
        self.stil = stil
        self.ziel = ziel
        self.ziel.mkdir(parents=True, exist_ok=True)
        self.ordner = ([fontdir] if fontdir else []) + FONT_ORDNER
        self.breite = int(stil["format"]["breite"])
        self.hoehe = int(stil["format"]["hoehe"])
        self._helvena_bereit()

    def _helvena_bereit(self) -> None:
        """Die Hausschrift liegt als woff2 im Repo; einmal nach TTF wandeln."""
        ziel = HIER / "fonts" / "Helvena.ttf"
        quelle = WURZEL / "src" / "app" / "fonts" / "helvena.woff2"
        if ziel.exists() or not quelle.exists():
            return
        try:
            from fontTools.ttLib import TTFont

            f = TTFont(str(quelle))
            f.flavor = None
            ziel.parent.mkdir(exist_ok=True)
            f.save(str(ziel))
        except Exception:  # noqa: BLE001 — dann eben Fallback-Schrift
            pass

    def font(self, name: str, groesse: int) -> ImageFont.FreeTypeFont:
        for datei in FONT_DATEIEN.get(name, [name]):
            for ordner in self.ordner:
                p = ordner / datei
                if p.exists():
                    try:
                        return ImageFont.truetype(str(p), groesse)
                    except OSError:
                        continue
        return ImageFont.load_default(size=groesse)

    # ── Layout-Hilfen ────────────────────────────────────────────────

    def _umbruch(self, zeichner: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, max_breite: int) -> list[str]:
        zeilen: list[str] = []
        for absatz in text.split("\n"):
            aktuell = ""
            for wort in absatz.split():
                probe = f"{aktuell} {wort}".strip()
                if zeichner.textlength(probe, font=font) <= max_breite or not aktuell:
                    aktuell = probe
                else:
                    zeilen.append(aktuell)
                    aktuell = wort
            zeilen.append(aktuell)
        return zeilen

    def _zone(self, zone: str) -> tuple[int, int]:
        """Oberer und unterer Rand der Zone in Pixeln."""
        k = self.stil["karten"]
        if zone == "oben":
            return 0, int(self.hoehe * float(k.get("zone_hoehe", 0.45)))
        if zone == "unten":
            return int(self.hoehe * (1 - float(k.get("zone_hoehe", 0.45)))), self.hoehe
        return 0, self.hoehe

    # ── Zeichnen ─────────────────────────────────────────────────────

    def male(self, index: int, art: str, zone: str, inhalt: str) -> Path:
        datei = self.ziel / f"{index:02d}-{art}.png"
        if art == "copy":
            self._copy_hook(datei, inhalt)
        elif art == "flash":
            self._flash(datei, zone, inhalt)
        else:
            self._karte(datei, zone, inhalt)
        return datei

    def _karte(self, datei: Path, zone: str, inhalt: str) -> None:
        k = self.stil["karten"]
        bild = Image.new("RGBA", (self.breite, self.hoehe), (0, 0, 0, 0))
        z = ImageDraw.Draw(bild)
        oben, unten = self._zone(zone)
        rand = int(k["rand"])
        # „1 · Baukasten“ → Nummern-Badge + Titel; „Titel · Untertitel“ → zwei Größen
        teile = [t.strip() for t in re.split(r"\s·\s", inhalt, maxsplit=1)]
        badge = ""
        if len(teile) > 1 and len(teile[0]) <= 3:
            badge, titel, text = teile[0], teile[1], ""
        else:
            titel, text = (teile[0], teile[1] if len(teile) > 1 else "")
        font_t = self.font(k["font_titel"], int(k["groesse_titel"]))
        font_x = self.font(k["font_text"], int(k["groesse_text"]))
        font_b = self.font(k["font_titel"], int(k["groesse_titel"] * 0.7))
        badge_platz = int(k["groesse_titel"] * 1.5) + 24 if badge else 0
        innen = self.breite - 2 * rand - 2 * 48 - badge_platz
        zt = self._umbruch(z, titel, font_t, innen)
        zx = self._umbruch(z, text, font_x, innen) if text else []
        h_t = len(zt) * int(k["groesse_titel"] * 1.2)
        h_x = len(zx) * int(k["groesse_text"] * 1.35)
        kasten_h = 56 + h_t + (24 + h_x if zx else 0) + 56
        # Karte mittig in der Zone
        y0 = oben + (unten - oben - kasten_h) // 2
        x0, x1 = rand, self.breite - rand
        # weicher Schatten
        schatten = Image.new("RGBA", bild.size, (0, 0, 0, 0))
        ImageDraw.Draw(schatten).rounded_rectangle((x0 + 6, y0 + 10, x1 + 6, y0 + kasten_h + 10), int(k["radius"]), fill=(0, 0, 0, 70))
        from PIL import ImageFilter

        bild = Image.alpha_composite(bild, schatten.filter(ImageFilter.GaussianBlur(18)))
        z = ImageDraw.Draw(bild)
        z.rounded_rectangle((x0, y0, x1, y0 + kasten_h), int(k["radius"]), fill=_hex(k["hintergrund"]))
        tx = x0 + 48
        if badge:
            d = int(k["groesse_titel"] * 1.5)
            by = y0 + 56 + (h_t - d) // 2
            z.ellipse((tx, by, tx + d, by + d), fill=_hex(k["akzent"]))
            bw = z.textlength(badge, font=font_b)
            z.text((tx + (d - bw) / 2, by + d * 0.16), badge, font=font_b, fill=_hex(k["hintergrund"]))
            tx += d + 24
        else:
            z.rounded_rectangle((x0, y0 + 40, x0 + 10, y0 + kasten_h - 40), 5, fill=_hex(k["akzent"]))
            tx += 16
        y = y0 + 56
        for zeile in zt:
            z.text((tx, y), zeile, font=font_t, fill=_hex(k["tinte"]))
            y += int(k["groesse_titel"] * 1.2)
        if zx:
            y += 24
            for zeile in zx:
                z.text((tx, y), zeile, font=font_x, fill=_hex(k["zweitfarbe"]))
                y += int(k["groesse_text"] * 1.35)
        bild.save(datei)

    def _flash(self, datei: Path, zone: str, inhalt: str) -> None:
        """Flash-Insert: ein Streifen in Akzentfarbe, Text in Papier, bewusst groß."""
        k = self.stil["karten"]
        bild = Image.new("RGBA", (self.breite, self.hoehe), (0, 0, 0, 0))
        z = ImageDraw.Draw(bild)
        oben, unten = self._zone(zone)
        font = self.font(k["font_titel"], int(k["groesse_titel"] * 0.95))
        rand = int(k["rand"])
        zeilen = self._umbruch(z, inhalt, font, self.breite - 2 * rand - 80)
        zh = int(k["groesse_titel"] * 0.95 * 1.2)
        h = len(zeilen) * zh + 64
        y0 = oben + (unten - oben - h) // 2
        z.rounded_rectangle((rand, y0, self.breite - rand, y0 + h), int(k["radius"]) // 2, fill=_hex(k["akzent"]))
        y = y0 + 32
        for zeile in zeilen:
            w = z.textlength(zeile, font=font)
            z.text(((self.breite - w) / 2, y), zeile, font=font, fill=_hex(k["hintergrund"]))
            y += zh
        bild.save(datei)

    def _copy_hook(self, datei: Path, inhalt: str) -> None:
        """Text on screen, mittig, mit Kontur: der Hook der ersten 2 Sekunden."""
        c = self.stil["copy_hook"]
        bild = Image.new("RGBA", (self.breite, self.hoehe), (0, 0, 0, 0))
        z = ImageDraw.Draw(bild)
        font = self.font(self.stil["captions"]["font"], int(c["groesse"]))
        zeilen = self._umbruch(z, inhalt.strip("„“\"“"), font, self.breite - 160)
        zh = int(c["groesse"] * 1.18)
        y = int(self.hoehe * float(c["position_y"])) - len(zeilen) * zh // 2
        for zeile in zeilen:
            w = z.textlength(zeile, font=font)
            x = (self.breite - w) / 2
            z.text((x, y), zeile, font=font, fill=_hex(c["farbe"]), stroke_width=int(self.stil["captions"].get("kontur_breite", 5)), stroke_fill=_hex(c["kontur"]))
            y += zh
        bild.save(datei)
