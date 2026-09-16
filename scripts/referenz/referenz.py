#!/usr/bin/env python3
"""
Referenz-Toolkit: erfolgreiche Reels holen, transkribieren, als
Referenz-Datei ablegen. Läuft auf dem Mac (Browser-Cookies für Instagram),
nicht in der Cloud — Instagram und TikTok liefern ohne Login nichts.

    python3 scripts/referenz/referenz.py URL [URL ...]
    python3 scripts/referenz/referenz.py --liste urls.txt
    python3 scripts/referenz/referenz.py --json export.json --min-faktor 3
    python3 scripts/referenz/referenz.py --datei aufnahme.mov --konto alex

Eingaben
  URL            Instagram-Reel oder TikTok-Video
  --liste        Textdatei, eine URL je Zeile (# = Kommentar)
  --json         Export der Chrome-Extension oder eines Apify-Actors:
                 Liste von Objekten mit URL- und Kennzahl-Feldern, die
                 Feldnamen werden heuristisch erkannt (url/permalink/link,
                 plays/views/likes/comments/shares, caption, username)
  --datei        lokale Video-/Audiodatei (z. B. OBS-Rohaufnahme für den
                 Stimmkorpus), kein Download

Optionen
  --min-faktor N nur Reels behalten, deren Views >= N × Median des Kontos
  --top N        je Konto die N besten nach Views
  --browser B    Cookies aus diesem Browser (chrome, safari, firefox, arc)
  --modell M     Whisper-Modell (small | medium | large-v3-turbo), Standard medium
  --sprache S    Sprache des Reels (de, en, …), Standard: automatisch erkennen
  --aus DIR      Ausgabeordner, Standard docs/branding/referenzen
  --nur-liste    nichts laden, nur zeigen, was ausgewählt würde

Ausgabe je Reel: docs/branding/referenzen/{konto}-{id}.md mit Kennzahlen,
Transkript (Absätze an Pausen > 0,4 s), Beat-Rohling mit Sekunden und
Prozent, Sprechtempo. Daneben {konto}-{id}.json mit Wort-Zeitstempeln.
Die Videos selbst landen in scripts/referenz/media/ (gitignored).

Abhängigkeiten: pip install -r scripts/referenz/requirements.txt
Auf Apple Silicon zusätzlich: pip install mlx-whisper (schneller), braucht
ffmpeg (brew install ffmpeg). Ohne mlx läuft faster-whisper, ohne ffmpeg.
"""

from __future__ import annotations

import argparse
import json
import re
import statistics
import subprocess
import sys
from dataclasses import dataclass, field
from datetime import date
from pathlib import Path

HIER = Path(__file__).resolve().parent
WURZEL = HIER.parent.parent
MEDIA = HIER / "media"
STANDARD_AUS = WURZEL / "docs" / "branding" / "referenzen"

PAUSE_SEK = 0.4  # ab hier ist es ein Absatz, also eine Schnittmarke


# ── Eingabe ──────────────────────────────────────────────────────────


@dataclass
class Kandidat:
    url: str
    konto: str = ""
    views: int | None = None
    likes: int | None = None
    kommentare: int | None = None
    shares: int | None = None
    caption: str = ""
    laenge_sek: float | None = None
    datum: str = ""
    lokal: Path | None = None
    extra: dict = field(default_factory=dict)


URL_FELDER = ("url", "permalink", "link", "href", "reelurl", "videourl_page", "post_url", "posturl")
VIEW_FELDER = ("videoplaycount", "playcount", "plays", "videoviewcount", "viewcount", "views", "play_count", "view_count")
LIKE_FELDER = ("likescount", "likecount", "likes", "like_count")
KOMM_FELDER = ("commentscount", "commentcount", "comments", "comment_count")
SHARE_FELDER = ("sharescount", "sharecount", "shares", "share_count", "reshare_count")
KONTO_FELDER = ("ownerusername", "username", "account", "author", "user", "handle")
CAPTION_FELDER = ("caption", "text", "description", "title")
DAUER_FELDER = ("videoduration", "duration", "length", "laenge")
DATUM_FELDER = ("timestamp", "takenat", "taken_at", "date", "created", "published")


def _finde(obj: dict, felder: tuple[str, ...]):
    """Erstes Feld, dessen normalisierter Name in `felder` steht (auch verschachtelt eine Ebene)."""
    flach = {}
    for k, v in obj.items():
        flach[re.sub(r"[^a-z]", "", k.lower())] = v
        if isinstance(v, dict):
            for k2, v2 in v.items():
                flach.setdefault(re.sub(r"[^a-z]", "", f"{k}{k2}".lower()), v2)
                flach.setdefault(re.sub(r"[^a-z]", "", k2.lower()), v2)
    for f in felder:
        if f in flach and flach[f] not in (None, ""):
            return flach[f]
    return None


def _zahl(v) -> int | None:
    if v is None:
        return None
    if isinstance(v, (int, float)):
        return int(v)
    m = re.sub(r"[^\d]", "", str(v))
    return int(m) if m else None


def aus_json(pfad: Path) -> list[Kandidat]:
    daten = json.loads(pfad.read_text("utf8"))
    if isinstance(daten, dict):
        for k in ("items", "data", "results", "posts", "reels"):
            if isinstance(daten.get(k), list):
                daten = daten[k]
                break
    if not isinstance(daten, list):
        sys.exit("JSON: erwarte eine Liste von Objekten")
    out: list[Kandidat] = []
    for o in daten:
        if not isinstance(o, dict):
            continue
        url = _finde(o, URL_FELDER)
        if not url:
            sc = _finde(o, ("shortcode", "code", "id"))
            if sc and _finde(o, ("videourl",)) is not None:
                url = f"https://www.instagram.com/reel/{sc}/"
        if not url:
            continue
        konto = str(_finde(o, KONTO_FELDER) or "") or konto_aus_url(str(url))
        out.append(
            Kandidat(
                url=str(url),
                konto=konto.lstrip("@"),
                views=_zahl(_finde(o, VIEW_FELDER)),
                likes=_zahl(_finde(o, LIKE_FELDER)),
                kommentare=_zahl(_finde(o, KOMM_FELDER)),
                shares=_zahl(_finde(o, SHARE_FELDER)),
                caption=str(_finde(o, CAPTION_FELDER) or "")[:600],
                laenge_sek=(lambda d: float(d) if d not in (None, "") else None)(_finde(o, DAUER_FELDER)),
                datum=str(_finde(o, DATUM_FELDER) or "")[:19],
                extra={"videoUrl": _finde(o, ("videourl", "video_url", "videoplayurl"))},
            )
        )
    return out


def konto_aus_url(url: str) -> str:
    m = re.search(r"tiktok\.com/@([^/?#]+)", url)
    if m:
        return m.group(1)
    m = re.search(r"instagram\.com/([^/?#]+)/(?:reel|p)/", url)
    if m and m.group(1) not in ("reel", "p", "reels"):
        return m.group(1)
    return ""


def kennung_aus_url(url: str) -> str:
    m = re.search(r"/(?:reel|reels|p|video)/([A-Za-z0-9_-]+)", url)
    return m.group(1) if m else re.sub(r"[^A-Za-z0-9]", "", url)[-12:]


def auswahl(kandidaten: list[Kandidat], min_faktor: float | None, top: int | None) -> list[Kandidat]:
    """Views >= min_faktor × Median je Konto, dann die Top-N je Konto."""
    if not min_faktor and not top:
        return kandidaten
    je_konto: dict[str, list[Kandidat]] = {}
    for k in kandidaten:
        je_konto.setdefault(k.konto or "?", []).append(k)
    out: list[Kandidat] = []
    for konto, liste in je_konto.items():
        mit_views = [k for k in liste if k.views]
        if min_faktor and len(mit_views) >= 3:
            med = statistics.median(k.views for k in mit_views)  # type: ignore[misc]
            liste = [k for k in mit_views if k.views >= min_faktor * med]  # type: ignore[operator]
            for k in liste:
                k.extra["median_konto"] = med
                k.extra["faktor"] = round(k.views / med, 1)  # type: ignore[operator]
        liste.sort(key=lambda k: k.views or 0, reverse=True)
        out.extend(liste[:top] if top else liste)
    return out


# ── Download ─────────────────────────────────────────────────────────


def lade(k: Kandidat, browser: str | None) -> Path | None:
    MEDIA.mkdir(exist_ok=True)
    ziel = MEDIA / f"{k.konto or 'x'}-{kennung_aus_url(k.url)}.%(ext)s"
    kennung = kennung_aus_url(k.url)
    vorhanden = [p for p in MEDIA.glob(f"*-{kennung}.*") if p.suffix.lower() in (".mp4", ".mov", ".webm", ".m4a", ".mkv")]
    info_alt = next(MEDIA.glob(f"*-{kennung}.info.json"), None)
    if vorhanden:
        if info_alt:
            _uebernimm(k, json.loads(info_alt.read_text("utf8")))
        return vorhanden[0]
    quelle = k.extra.get("videoUrl") or k.url
    cmd = ["yt-dlp", "--no-warnings", "--no-playlist", "-o", str(ziel), "--print-json", "--quiet", "--write-info-json"]
    if browser and quelle == k.url:
        cmd += ["--cookies-from-browser", browser]
    cmd.append(str(quelle))
    try:
        p = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
    except FileNotFoundError:
        sys.exit("yt-dlp fehlt: pip install yt-dlp")
    if p.returncode != 0:
        print(f"  ✗ Download fehlgeschlagen: {p.stderr.strip().splitlines()[-1] if p.stderr.strip() else p.returncode}")
        if "login" in p.stderr.lower() or "empty media" in p.stderr.lower():
            print("    → mit --browser chrome (oder safari/arc) die Login-Cookies mitgeben")
        return None
    try:
        info = json.loads(p.stdout.strip().splitlines()[-1])
        _uebernimm(k, info)
        pfad = info.get("filepath") or info.get("_filename")
        if pfad and Path(pfad).exists():
            return Path(pfad)
    except (json.JSONDecodeError, IndexError):
        pass
    neu = sorted(
        (q for q in MEDIA.glob(f"*-{kennung}.*") if q.suffix.lower() != ".json"),
        key=lambda q: q.stat().st_mtime,
    )
    return neu[-1] if neu else None


def _uebernimm(k: Kandidat, info: dict) -> None:
    """Kennzahlen aus der yt-dlp-Info, nur wo der Kandidat noch nichts hat."""
    k.views = k.views or _zahl(info.get("view_count"))
    k.likes = k.likes or _zahl(info.get("like_count"))
    k.kommentare = k.kommentare or _zahl(info.get("comment_count"))
    k.shares = k.shares or _zahl(info.get("repost_count"))
    k.caption = k.caption or (info.get("description") or info.get("title") or "")[:600]
    k.laenge_sek = k.laenge_sek or info.get("duration")
    # Handle vor Anzeigename: "roninxsocials" statt "Ronin Socials | Content Marketing | Ads"
    for feld in ("channel", "uploader_id", "uploader", "channel_id"):
        wert = str(info.get(feld) or "").lstrip("@")
        if wert and not wert.isdigit():
            k.konto = k.konto or wert
            break
    k.konto = k.konto or str(info.get("uploader_id") or "")
    if info.get("upload_date"):
        d = str(info["upload_date"])
        k.datum = k.datum or f"{d[:4]}-{d[4:6]}-{d[6:]}"


# ── Transkription ────────────────────────────────────────────────────


@dataclass
class Wort:
    wort: str
    start: float
    ende: float


def transkribiere(datei: Path, modell: str, sprache: str | None) -> tuple[list[Wort], float, str]:
    """Liefert Wörter mit Zeitstempeln, die Gesamtdauer und die erkannte Sprache.
    Sprache nie erzwingen, wenn das Reel englisch ist: Whisper übersetzt sonst
    holprig statt zu transkribieren."""
    try:
        import mlx_whisper  # type: ignore

        name = {"small": "mlx-community/whisper-small-mlx", "medium": "mlx-community/whisper-medium-mlx"}.get(
            modell, f"mlx-community/whisper-{modell}"
        )
        r = mlx_whisper.transcribe(str(datei), path_or_hf_repo=name, language=sprache, word_timestamps=True)
        woerter = [
            Wort(w["word"].strip(), float(w["start"]), float(w["end"]))
            for s in r["segments"]
            for w in s.get("words", [])
        ]
        dauer = float(r["segments"][-1]["end"]) if r["segments"] else 0.0
        return woerter, dauer, str(r.get("language") or sprache or "?")
    except ImportError:
        pass
    from faster_whisper import WhisperModel

    m = WhisperModel(modell, device="cpu", compute_type="int8")
    segs, info = m.transcribe(str(datei), language=sprache, word_timestamps=True, vad_filter=True)
    woerter: list[Wort] = []
    for s in segs:
        for w in s.words or []:
            woerter.append(Wort(w.word.strip(), float(w.start), float(w.end)))
    return woerter, float(info.duration or (woerter[-1].ende if woerter else 0.0)), info.language


def absaetze(woerter: list[Wort]) -> list[list[Wort]]:
    """Ein neuer Absatz bei jeder Pause > PAUSE_SEK oder an einem Satzende,
    sobald der Block 12 Wörter hat. Fertig geschnittene Reels haben keine
    Pausen mehr, deshalb reicht die Pause allein nicht. Absätze sind Beats."""
    if not woerter:
        return []
    out: list[list[Wort]] = [[woerter[0]]]
    for a, b in zip(woerter, woerter[1:]):
        pause = b.start - a.ende > PAUSE_SEK
        satzende = a.wort.endswith((".", "?", "!")) and len(out[-1]) >= 12
        if pause or satzende:
            out.append([b])
        else:
            out[-1].append(b)
    return out


# ── Ausgabe ──────────────────────────────────────────────────────────


def _n(v) -> str:
    return f"{v:,}".replace(",", ".") if isinstance(v, int) else "–"


def slug(text: str) -> str:
    text = text.lower().replace("ä", "ae").replace("ö", "oe").replace("ü", "ue").replace("ß", "ss")
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9._-]+", "-", text)).strip("-.") or "unbekannt"


def schreibe(k: Kandidat, woerter: list[Wort], dauer: float, sprache: str, aus: Path, quelle_datei: Path) -> Path:
    aus.mkdir(parents=True, exist_ok=True)
    kennung = kennung_aus_url(k.url) if not k.lokal else k.lokal.stem
    # Shortcodes sind case-sensitiv (Dc6KR6BRN33), deshalb nur das Konto slugifizieren
    basis = f"{slug(k.konto)}-{re.sub(r'[^A-Za-z0-9_-]+', '-', kennung).strip('-')}"
    md = aus / f"{basis}.md"
    js = aus / f"{basis}.json"
    if md.exists() and re.search(r"Status: (analysiert|verwendet)", md.read_text("utf8")):
        print(f"  · {md.name} ist schon analysiert, wird nicht überschrieben")
        return md

    bloecke = absaetze(woerter)
    gesamt = sum(len(b) for b in bloecke)
    tempo = round(gesamt / dauer * 60) if dauer else 0
    faktor = k.extra.get("faktor")

    zeilen = [
        f"# Referenz — @{k.konto or '?'} · {kennung}",
        "",
        f"> Quelle: {k.url if not k.lokal else k.lokal.name}",
        f"> Geholt: {date.today().isoformat()} · Status: roh | analysiert | verwendet",
        f"> Views {_n(k.views)} · Likes {_n(k.likes)} · Kommentare {_n(k.kommentare)} · Shares {_n(k.shares)}"
        + (f" · {faktor}× Median des Kontos" if faktor else ""),
        f"> Länge {dauer:.1f} s · {gesamt} Wörter · {tempo} Wörter/Min · {len(bloecke)} Beats (Pause > {PAUSE_SEK} s oder Satzende) · Sprache {sprache}",
    ]
    if k.datum:
        zeilen.append(f"> Veröffentlicht: {k.datum}")
    if k.caption:
        zeilen += ["", "**Caption:**", "", "> " + k.caption.replace("\n", "\n> ")]
    zeilen += ["", "---", "", "## Transkript (Absätze = Beats)", ""]
    for b in bloecke:
        zeilen.append(f"**[{b[0].start:5.1f}]** " + " ".join(w.wort for w in b))
        zeilen.append("")
    zeilen += [
        "---",
        "",
        "## Beat-Rohling (zum Ausfüllen: Funktion je Absatz)",
        "",
        "| Sek. | % | Text (Anfang) | Funktion | Retention-Gerät |",
        "|---|---|---|---|---|",
    ]
    for b in bloecke:
        anteil = round(b[0].start / dauer * 100) if dauer else 0
        anfang = " ".join(w.wort for w in b)[:60]
        zeilen.append(f"| {b[0].start:.1f} | {anteil} % | {anfang} | | |")
    zeilen += [
        "",
        "Funktionen: Hook · Kontext · Bruch · Beleg · Zwischenstation · Reward · Loop",
        "(siehe `../SKELETTE.md` Teil 3). Skelett: `[?]` · Retention-Geräte: `[?]`",
        "",
        "## Skelett-Analyse",
        "",
        "_noch offen — füllt die Session oder die Engine im Referenz-Modus_",
        "",
    ]
    md.write_text("\n".join(zeilen), "utf8")
    js.write_text(
        json.dumps(
            {
                "url": k.url,
                "konto": k.konto,
                "views": k.views,
                "likes": k.likes,
                "kommentare": k.kommentare,
                "shares": k.shares,
                "caption": k.caption,
                "sprache": sprache,
                "dauer": dauer,
                "datei": str(quelle_datei),
                "woerter": [{"w": w.wort, "s": round(w.start, 2), "e": round(w.ende, 2)} for w in woerter],
            },
            ensure_ascii=False,
            indent=1,
        ),
        "utf8",
    )
    return md


# ── Hauptprogramm ────────────────────────────────────────────────────


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("urls", nargs="*")
    ap.add_argument("--liste", type=Path)
    ap.add_argument("--json", type=Path, dest="json_pfad")
    ap.add_argument("--datei", type=Path, action="append", default=[])
    ap.add_argument("--konto", default="")
    ap.add_argument("--min-faktor", type=float, default=None)
    ap.add_argument("--top", type=int, default=None)
    ap.add_argument("--browser", default=None)
    ap.add_argument("--modell", default="medium")
    ap.add_argument("--sprache", default=None)
    ap.add_argument("--aus", type=Path, default=STANDARD_AUS)
    ap.add_argument("--nur-liste", action="store_true")
    a = ap.parse_args()

    kandidaten: list[Kandidat] = [Kandidat(url=u, konto=konto_aus_url(u)) for u in a.urls]
    if a.liste:
        for z in a.liste.read_text("utf8").splitlines():
            z = z.strip()
            if z and not z.startswith("#"):
                kandidaten.append(Kandidat(url=z, konto=konto_aus_url(z)))
    if a.json_pfad:
        kandidaten += aus_json(a.json_pfad)
    for d in a.datei:
        kandidaten.append(Kandidat(url=d.name, konto=a.konto or "alex", lokal=d))

    if not kandidaten:
        ap.print_help()
        sys.exit(1)

    kandidaten = auswahl(kandidaten, a.min_faktor, a.top)
    print(f"{len(kandidaten)} Referenz(en) ausgewählt")
    for k in kandidaten:
        print(f"  @{k.konto or '?':<22} {_n(k.views):>10} Views  {k.url}")
    if a.nur_liste:
        return

    fertig: list[Path] = []
    for k in kandidaten:
        print(f"\n→ {k.url}")
        datei = k.lokal if k.lokal else lade(k, a.browser)
        if not datei or not datei.exists():
            continue
        print(f"  transkribiere {datei.name} ({a.modell}) …")
        try:
            woerter, dauer, sprache = transkribiere(datei, a.modell, a.sprache)
        except Exception as e:  # noqa: BLE001
            print(f"  ✗ Transkription fehlgeschlagen: {e}")
            continue
        if not woerter:
            print("  ✗ keine Sprache erkannt")
            continue
        md = schreibe(k, woerter, dauer, sprache, a.aus, datei)
        fertig.append(md)
        print(f"  ✓ {md.relative_to(WURZEL) if md.is_relative_to(WURZEL) else md}  ({len(woerter)} Wörter, {dauer:.0f} s)")

    print(f"\n{len(fertig)} Referenz-Datei(en) geschrieben.")
    if fertig:
        print("Nächster Schritt: Transkript in /os ins Referenz-Feld, oder in Claude Code:")
        print("  „Referenz-Modus, Thema X, Referenz docs/branding/referenzen/<datei>.md“")


if __name__ == "__main__":
    main()
