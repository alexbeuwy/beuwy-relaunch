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
 /os           HyperFrames    OBS-Overlays   beuwy.com        (im Skript)
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
| Schnitt | Stille raus (auto-editor oder Whisper-Pausen), dann HyperFrames-Komposition aus dem Schnittplan: Zoom-Sprünge, Karten, Flash-Inserts, Wort-Captions | MP4 | Codex/Claude-Agent |
| Post | Copy-Hook, Caption (4. Hook-Ebene), Uhrzeit | Instagram + TikTok | Alex |
| KPI | Sync 05:00/17:00, Schwellen aus `KPI-LOGIK.md` | `/os` | automatisch |

---

## 2. Rollen der Modelle

Ressourcenregel: teuer denkt, billig arbeitet, und jemand prüft.

| Rolle | Modell | Was |
|---|---|---|
| Orchestrierung, Strategie, Kontrolle | Fable 5.1 (Claude-Code-Session) | Plan, Aufgabenschnitt, Abnahme jedes Grunt-Ergebnisses, Batch-Freigabe |
| Skript-Writer | Opus 5, `effort: high`, adaptives Thinking | Skelett-Extraktion und Skripte in der Engine (`skript-engine.ts`) |
| Kritiker | Sonnet 5 | Liest Skript + Sprachprofil + Scanner-Befund, gibt je Skript ein Urteil mit den Sätzen, die neu gesagt werden müssen |
| Grunts | Sonnet 5 | Research, Transkription anstoßen, Apify-Läufe, Scanner-Code, Karten-HTML für HyperFrames, Rückfragen an Alex formulieren |

Was **nicht** an Grunts geht: Hooks schreiben, Bodies schreiben,
Sprachprofil ändern, Strategie anfassen.

---

## 3. Agentischer Schnitt (HyperFrames)

`heygen-com/hyperframes`, Apache 2.0, ~50k Sterne. HTML/CSS mit
`data-start`/`data-duration` wird deterministisch zu MP4 gerendert.
CLI: `npx hyperframes init | preview | lint | render`. Skills:
`npx skills add heygen-com/hyperframes` liefert u. a. `/talking-head-recut`
und `/embedded-captions` (Wort-Captions mit Hervorhebung).

Was es kann und was davor passieren muss:

| Aufgabe | Wo |
|---|---|
| Stille rausschneiden | **vor** HyperFrames: `auto-editor` oder Whisper-Pausen > 0,4 Sek. |
| Zoom-Sprünge 100 → 115 % | HyperFrames, GSAP-Tween je Ereignis aus dem Schnittplan |
| Karten oben (Repo-Liste, Tool, Zahl) | HyperFrames-Komposition, eine HTML-Karte je `karte`/`flash`-Zeile |
| Wort-Captions | `/embedded-captions` mit Whisper-Wort-Timestamps |
| Kamera umdrehen (Skelett 7) | Rohschnitt, kein Overlay |

**Der Schnittplan aus dem Skript ist die Edit-Liste.** Der Agent liest
die Zeilen (`Sek. · Zone · Art · Inhalt`) und baut daraus die
Komposition. Damit entfällt das Raten, was wann eingeblendet wird.
Karten-Design: `src/app/globals.css`-Tokens, damit die Karten zur Marke
passen und nicht nach Template aussehen.

---

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
