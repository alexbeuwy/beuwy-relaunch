# Pipeline — von fremdem Reel zu eigenem Reel, Ende zu Ende

Stand 2026-09-16. Diese Datei sagt, welches Werkzeug welchen Schritt
macht, welches Modell welche Rolle hat und wo die Übergaben liegen.
Alles, was Alex schon hat (Chrome-Extension, Content Hub, Teleprompter,
OBS, HyperFrames-Workflow), bleibt. Neu ist der Kern in der Mitte:
Skelett → Skript → Prüfung.

---

## 0. Warum die Skripte bisher generisch waren

Drei Dinge fehlten, und keins davon löst ein GitHub-Repo:

1. **Kein Korpus.** Regeln („direkt, kurze Sätze") erzeugen Regel-Deutsch.
   Echte Sätze erzeugen Alex-Deutsch. → `STIMMKORPUS.md`
2. **Keine bewiesene Struktur.** Das Modell erfand jedes Mal ein Gerüst.
   Jetzt übernimmt es das Gerüst eines Reels, das schon lief. →
   `SKELETTE.md`, Referenz-Modus
3. **Kein Gate.** Niemand hat Nein gesagt. Jetzt misst ein Scanner die
   KI-Muster und ein zweites Modell prüft gegen das Sprachprofil, bevor
   etwas gespeichert wird. → `KI-TELLS.md`, `ki-tells.ts`, Kritiker-Pass

Zu `blader/humanizer` (48k Sterne): ein englischer Rewriter für 25
Prosa-Muster. Für deutsche gesprochene Skripte unbrauchbar, das Prinzip
ist übernommen und in `KI-TELLS.md` auf Deutsch neu gebaut. Die
Top-Repos für Kurzvideo-Skripte (claude-youtube 370★, vyralcontent
112★, viral-hooks-skill 93★) liefern Struktur-Baukästen in Englisch,
keinen Stil. Nichts davon wird installiert.

---

## 1. Die Kette

```
Recherche ─→ Auswahl ─→ Transkript ─→ Skelett ─→ Skript ─→ Prüfung
    │                                                        │
Chrome-Ext / Apify                                   Scanner + Kritiker
                                                             │
                                                             ▼
KPI ◀── Post ◀── Schnitt ◀── Aufnahme ◀── Teleprompter ◀── Schnittplan
 /os           Resolve        OBS-Overlays   beuwy.com        (im Skript)
```

| Schritt | Werkzeug | Übergabe (Datei/Feld) | Wer |
|---|---|---|---|
| Recherche | Chrome-Extension (Top-Posts eines Accounts) oder Apify `myagizm/instagram-reel-scraper-v2` (ab 0,70 $/1000, Felder `plays`, `likes`, `videoUrl`, `caption`, `videoDuration`) | JSON-Liste | Alex / Sonnet-Grunt |
| Auswahl | Filter: Views > 3× Median des Accounts, Länge 20–45 Sek., Format Talking Head | 3–5 URLs + `videoUrl` | Fable/Opus prüft |
| Transkript | `scripts/referenz/referenz.py` (yt-dlp + Whisper, Sprache automatisch, Beats an Pausen/Satzenden), auf dem Mac mit `--browser chrome` | `docs/branding/referenzen/<konto>-<id>.md` + `.json` | Sonnet-Grunt |
| Skelett | Referenz-Modus: Beats, Zeitanteile, Retention-Geräte | Feld `skelett` im Skript | Opus 5 (Engine) |
| Skript | Skelett + Alex' Thema + Stimmkorpus → 3 Hooks, Body, Loop, Schnittplan | `/os` oder `skripte/batch-NNN.md` | Opus 5 (Engine) |
| Prüfung | `ki-tells.ts` (deterministisch) → Kritiker (Sonnet 5) → eine Überarbeitung (Opus) | Score im Detail-Text | automatisch |
| Teleprompter | Body absatzweise nach `beuwy.com/teleprompter.html` (Voice-Advance) | Body-Text | Alex |
| Aufnahme | OBS mit Overlay-Szenen: Zone oben leer für B-Roll, Copy-Hook als Textquelle | Rohdatei in `Filme/Reels` | Alex |
| Schnitt | `scripts/schnitt/schnitt.py --video … --stil beuwy --schnittplan … --skript N`: Stille raus, Clips mit Zoom, Captions + Karten + Copy-Hook als Alpha-Overlay; dann in DaVinci Resolve Workspace → Scripts → beuwy-schnitt | Resolve-Timeline, MP4 | automatisch |
| Post | Copy-Hook, Caption (4. Hook-Ebene), Uhrzeit | Instagram + TikTok | Alex |
| KPI | Sync 05:00/17:00, Schwellen aus `KPI-LOGIK.md` | `/os` | automatisch |

---

## 2. Rollen der Modelle

Ressourcenregel: teuer denkt, billig arbeitet, und jemand prüft.

| Rolle | Modell | Was |
|---|---|---|
| Orchestrierung, Strategie, Kontrolle | Fable 5.1 (Claude-Code-Session, Skill `/reel`) | Plan, Aufgabenschnitt, Abnahme jedes Agenten-Ergebnisses, Batch-Freigabe |
| `skript-agent` | Opus 5 | Skripte im Referenz-Modus oder aus einer Idee, mit Schnittplan (`.claude/agents/`) |
| `hook-agent` | Opus 5 | 10 Hooks je Skript nach Pattern, Copy-Hook + gesprochener Satz |
| `schnittplan-agent` | Opus 5 | Schnittplan aus dem Transkript, wenn frei gefilmt wurde |
| `kritiker` | Sonnet 5 | Sprachprofil + Scanner, Urteil je Skript, ändert nichts |
| `referenz-agent` | Sonnet 5 | Reels holen, transkribieren, Beat-Rohling füllen |
| `schnitt-agent` | Sonnet 5 | schneiden, rendern, Einzelbilder prüfen |
| Engine im `/os` | Opus 5 + Sonnet 5 | derselbe Ablauf ohne Claude Code, auf Knopfdruck (`skript-engine.ts`) |

Alex' Anteil: filmen. Mit Skript (Teleprompter) oder frei. Der Rest
läuft über `/reel` oder den Ordner-Wächter (`scripts/schnitt/wache.py`).

Was **nicht** an Grunts geht: Hooks schreiben, Bodies schreiben,
Sprachprofil ändern, Strategie anfassen.

---

## 3. Agentischer Schnitt (DaVinci Resolve)

Nachbau des Systems aus `referenzen/jenya_kork-DdBmO3BAWYH.md`: Stilkatalog,
Video rein, Stil wählen, Reel raus. Alles in `scripts/schnitt/`
(README dort), DaVinci Resolve ist installiert.

| Schritt | Werkzeug | Ergebnis |
|---|---|---|
| Transkript | Whisper (Wort-Zeitstempel) | Basis für Stille-Schnitt und Captions |
| Stille raus | Wortpausen > Stil-Schwelle | Segmente in Rohzeit → Timeline-Zeit |
| Zoom-Sprünge | Stil-Takt oder `zoom`-Zeilen im Schnittplan | je Clip 100 % oder 115 % |
| Karten, Flash, Copy-Hook | `karten.py` aus dem Schnittplan, beuwy-Tokens | PNG mit Alpha |
| Captions | `overlay.py`, Sätze oder Wörter, aktives Wort hervorgehoben | im Overlay-Video |
| Overlay | ProRes 4444 mit Alpha, ein Clip auf V2 | `overlay.mov` |
| Timeline | `resolve_bau.py` über die Resolve-Scripting-API | Projekt „beuwy Reels“ |
| Render | Resolve, H.264 1080×1920 | MP4 |

**Der Schnittplan aus dem Skript ist die Edit-Liste.** Jede Zeile
(`Sek. · Zone · Art · Inhalt`) wird zu einer Karte, einem Flash, einem
Zoom oder einem Schnitt. Damit entfällt das Raten.

**Stile** (`scripts/schnitt/stile/`): `beuwy` (Hausstil aus globals.css),
`jenya`, `kauffmann`. Ein neuer Stil ist eine JSON-Datei, abgeleitet aus
einer Referenz.

HyperFrames (HeyGen, ~50k Sterne) bleibt als Option für animierte Karten,
ist aber nicht mehr der Cutter.

## 4. Referenz-Modus bedienen

**Im Dashboard `/os`:** Thema eingeben, Referenz-Transkript in das zweite
Feld, Batch. Die Engine extrahiert das Skelett, schreibt 3–6 Skripte in
das Skelett, misst, lässt prüfen, überarbeitet einmal, speichert nur, was
unter Score 3 liegt. Der Detail-Text nennt Skelett und Scores.

**In Claude Code:** Reel-Link oder Extension-Export geben, „Referenz-Modus,
Thema X" sagen. Die Session holt und transkribiert mit
`scripts/referenz/referenz.py`, füllt die Skelett-Analyse in
`docs/branding/referenzen/`, schreibt den Batch. Skripte über Score 2
werden nicht abgelegt. Erster echter Durchlauf: Batch 003 aus
@roninxsocials (Dc6KR6BRN33).

**Ohne Referenz** läuft die Engine wie bisher, aber jetzt mit Korpus,
Skelett-Wahl aus der Bibliothek, Scanner und Kritiker.

---

## 5. Offene Entscheidungen (nur Alex)

1. **Phase 2.** Immobilien, Story, Marketing als Säulen sind im
   Protokoll gesperrt (§3, §9). Die Engine kennt den Schalter
   `OS_PHASE=2` (Vercel-Env). Solange er nicht gesetzt ist, lehnt der
   Kritiker Immobilien-Inhalte ab. Die Datenbank kennt nur Säulen a/b/c;
   Phase-2-Skripte werden ohne Säule gespeichert, bis die Migration
   (`supabase/os-schema.sql`, Check-Constraint) erweitert wird.
2. **Korpus füllen.** Ohne 15+ echte gesprochene Sätze in
   `STIMMKORPUS.md` bleibt der Stil eine Annäherung. Das ist der Schritt
   mit dem größten Hebel und der kann nur von Alex kommen.
3. **Referenz-Accounts.** Welche 5–10 Accounts die Chrome-Extension
   regelmäßig zieht. Vorschlag: die, deren Reels Alex schon als Referenz
   geschickt hat, plus zwei deutsche Selbstständigkeits-Accounts.
