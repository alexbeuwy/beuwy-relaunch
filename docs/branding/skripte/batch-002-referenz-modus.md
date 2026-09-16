# Batch 002 — Reels bauen wie ein System (Referenz-Modus)

> Eingabe: „Ich nehme mit OBS auf, Codex schneidet mit HyperFrames, alle
> 2 Sekunden was Neues, Flash-Inserts zu kurz zum Lesen, 50 Versuche für
> einen Skript-Writer, der meinen Stil trifft"
> Datum: 2026-09-16 · Säulen-Mix: 1×a, 4×b · Status: offen
> Fakten nur aus dem Chat vom 16.09. und den Research-Ergebnissen
> (HyperFrames ~50k Sterne, whisper.cpp ~54k, humanizer ~49k). Nichts
> erfunden. Wo eine Zahl fehlt, steht `[?]` und Alex trägt sie ein.

---

## Skelett-Analyse

**Referenz 1:** Reel @sebastiankauffmann („Tag 220 der Journey", Karte
„Scrapling, Adaptive Web Scraping, MCP · Parser · Browser · Open Source",
Copy-Hook „MIT ÜBER 80.000"). 187 Likes, 374 Kommentare, 68 Shares zum
Zeitpunkt des Screenshots. Kein Transkript vorhanden, Beats aus dem Bild
abgeleitet:

| Zeitanteil | Beat | Funktion | Oben |
|---|---|---|---|
| 0–7 % | Hook | Zahl + unvollständiger Satz („mit über 80.000 …") | Karte blitzt, Tool-Name groß |
| 7–20 % | Warum | Was das Tool für ihn erledigt | Karte bleibt, Tags erscheinen einzeln |
| 20–80 % | Liste/Beleg | Eigenschaften je 2 Sek. als Tag-Karte | MCP, Parser, Browser, Open Source |
| 80–100 % | Auswahl + Loop | Was er damit gebaut hat, Rückschnitt | Erste Karte |

Retention-Geräte: Copy-Hook endet mitten im Satz (Lücke), Tags erscheinen
zu schnell zum Mitlesen (Pause/Rewatch), Kommentar-Rate 2× Likes (Frage
im Body, vermutlich „welches Tool nutzt ihr").
**→ Skelett 6, Listen-Flash.**

**Referenz 2:** Reel „Editing-Prompt im Terminal" (Screenshot: langer
Prompt an einen Agenten, „B-roll" als Caption, Overlay-Text „AI funnel
builder cheat codes"). Beats: Talking Head → Prompt-Screen → Agent
arbeitet → Ergebnis. **→ Skelett 7, Umdrehen.**

**Referenz 3:** Reel „Carousel-Repos" (Karten-Liste mit GitHub-Repos,
Sterne als Badge, Creator klein unten rechts, Caption „Now install one of
these repositories that"). **→ Skelett 6**, Variante mit 6 Karten und
Gesicht als Einblendung statt Halbbild.

Übernommen: Struktur, Zeitanteile, Karten-Takt, Lücke im Copy-Hook.
Nicht übernommen: ein einziges Wort.

---

## Skript 1 — Fünf Repos, kein Cutter · Säule (b) · Skelett 6 · ~32 Sek.

**Hooks (Text on screen, ≤ 8 Wörter):**

- Pattern-Interrupt: „Mein Cutter hat 50.000 Sterne."
- Kontra-These: „Reels schneiden ist keine Arbeit mehr."
- Konkrete Zahl: „5 Repos. 0 € Schnitt. 1 Reel am Tag."

**Body (gesprochen):**

> Ich schneide meine Reels nicht mehr selbst. Und ich bezahle auch
> niemanden dafür. Fünf Repos, alle auf GitHub, alle kostenlos.
>
> Erstes: whisper.cpp. Transkribiert die Rohdatei aus OBS, mit Zeitstempel
> pro Wort. Daraus kommen die Captions.
>
> Zweites: auto-editor. Schneidet jede Pause raus, bevor ich überhaupt
> hinschaue.
>
> Drittes: HyperFrames. Von HeyGen, rund fünfzigtausend Sterne. Das ist der
> eigentliche Cutter. Ein Agent schreibt HTML mit Zeitmarken, daraus wird
> das Video. Zoom auf hundertfünfzehn Prozent, Karte oben, Text rein, Text
> raus.
>
> Viertes: humanizer. Neunundvierzigtausend Sterne. Hab ich getestet, weil
> meine Skripte nach Maschine klangen. Bringt auf Deutsch nichts. Nur
> Englisch.
>
> Fünftes ist deshalb mein eigenes. Eine Liste mit deutschen KI-Floskeln,
> und ein Scanner, der jedes Skript durchfallen lässt, das eine davon
> enthält.

**Loop/Ende (ohne CTA):**

> Das erste Repo davon läuft gerade, während ich das hier sage.

**Regie:** Talking Head unten, Handmikro, im Gehen. Oben je Repo eine
Karte im GitHub-Look (Name, eine Zeile, Sterne-Badge), 1,5 Sek. sichtbar,
dann weg. Bei „Bringt auf Deutsch nichts" Karte mit rotem Strich durch.

**Schnittplan:**

```
 0.0  voll   schnitt   Talking Head, Gehen, Mikro kommt ins Bild
 0.0  oben   copy      „5 Repos. 0 € Schnitt. 1 Reel am Tag."
 2.0  oben   flash     Karte „ggml-org/whisper.cpp · ★ 54k" (1,2 Sek.)
 4.0  unten  zoom      115 %
 6.0  oben   karte     whisper.cpp · „Wort-Zeitstempel aus OBS-Datei"
 8.5  oben   screen    Terminal, Transkript läuft durch
10.5  oben   karte     auto-editor · „Pausen raus, automatisch"
12.5  unten  zoom      100 %
14.0  oben   karte     heygen-com/hyperframes · ★ 50k
16.0  oben   screen    HTML mit data-start / data-duration, Zoom auf Zeilen
18.0  oben   flash     „100 % → 115 %" (0,8 Sek.)
20.0  oben   karte     blader/humanizer · ★ 49k
22.5  oben   karte     dieselbe Karte, roter Strich, „nur Englisch"
24.5  unten  zoom      115 %
26.0  oben   karte     „KI-TELLS.md · 4 Klassen · Score < 3"
28.0  oben   screen    Scanner-Befund, rote Treffer
30.0  voll   schnitt   Rückschnitt auf Anfangsbild, whisper-Karte blitzt
```

**Tells:** Score 0. Zahlen: 5, 50k, 54k, 49k, 115 %. Ich: 6×. Namen: OBS,
whisper.cpp, auto-editor, HyperFrames, HeyGen, humanizer.

---

## Skript 2 — Codex schneidet gerade · Säule (b) · Skelett 7 · ~35 Sek.

**Hooks:**

- Pattern-Interrupt: „Der Schnitt läuft. Ich bin nicht dran."
- Kontra-These: „Cutter werden nicht ersetzt. Nur Cutter ohne Taste."
- Konkrete Zahl: „Alle 2 Sekunden ein Schnitt. Kein Mensch beteiligt."

**Body (gesprochen):**

> Das hier wird gerade geschnitten. Nicht von mir. Von Codex.
>
> Ich nehme mit OBS auf, die Datei landet in einem Ordner, fertig. Früher
> war das der Punkt, an dem ich abends zwei Stunden am Schnitt hing. `[?]`
>
> Jetzt dreh ich mal um.
>
> Das ist der Prompt. Steht da: Stille raus, alle zwei Sekunden ein
> Ereignis, Zoom von hundert auf hundertfünfzehn Prozent, Karten oben, wenn
> ich ein Tool nenne. Und das ist Codex, wie er das mit HyperFrames baut.
> HTML, Zeitmarken, Render.
>
> Was er nicht entscheidet: was oben eingeblendet wird und wann. Das steht
> im Skript. Im Schnittplan, Sekunde für Sekunde. Den schreibt Claude,
> bevor ich überhaupt aufnehme.
>
> Der Agent schneidet also nicht nach Gefühl. Er schneidet nach Plan.

**Loop/Ende (ohne CTA):**

> Und der Plan für dieses Reel hier stand, bevor ich die Kamera an hatte.

**Regie:** Erste 8 Sek. Talking Head am Schreibtisch, dann Kamera physisch
auf den Monitor drehen, kein Schnitt. Terminal in Vollbild, Zoom auf den
Prompt, dann auf den Render-Fortschritt. Am Ende Kamera zurück.

**Schnittplan:**

```
 0.0  voll   schnitt   Talking Head, Schreibtisch, Monitor im Hintergrund
 0.0  oben   copy      „Der Schnitt läuft. Ich bin nicht dran."
 2.0  oben   karte     Finder-Ordner „Filme/Reels", eine neue MOV-Datei
 4.0  unten  zoom      115 %
 6.0  oben   flash     „OBS → Ordner → fertig" (1,0 Sek.)
 8.0  voll   umdrehen  Kamera schwenkt auf den Monitor, kein Schnitt
10.0  voll   screen    Prompt an Codex, Zoom auf „alle 2 Sekunden"
12.5  voll   zoom      Zoom auf „100 → 115 %"
14.5  voll   screen    Codex-Output, HTML mit data-start
17.0  voll   flash     „npx hyperframes render" (1,2 Sek.)
19.0  voll   screen    Vorschau: Karte erscheint oben im Reel
21.5  voll   zoom      Zoom auf Render-Fortschritt
24.0  oben   karte     Schnittplan aus dem Skript, Zeilen mit Sekunden
26.5  voll   screen    Zeile „24.0 oben karte" hervorgehoben
29.0  voll   umdrehen  Kamera zurück auf Alex
31.0  unten  zoom      115 %
33.0  voll   schnitt   Anfangsbild
```

**Tells:** Score 0. Zahlen: 2 Sek., 100→115 %. Ich: 7×. Namen: Codex, OBS,
HyperFrames, Claude. `[?]` = Alex' echte Schnittzeit vor dem Agenten.

---

## Skript 3 — 50 Versuche · Säule (b) · Skelett 4 auf 1 · ~38 Sek.

**Hooks:**

- Pattern-Interrupt: „Ich hab 50 Skript-Writer gebaut. Alle Müll."
- Kontra-These: „Das Modell war nie das Problem."
- Konkrete Zahl: „50 Versuche. 5 Modelle. 0 Skripte, die klangen wie ich."

**Body (gesprochen):**

> Ich hab fünfzig Mal versucht, mir einen Skript-Writer zu bauen. ChatGPT,
> Claude, Codex, alles durch. Jedes Mal kamen Skripte raus, die jeder
> Creator hätte posten können. Aber das Problem war nie das Modell.
>
> Das Problem waren drei Dinge, die gefehlt haben.
>
> Erstens: Ich hab dem Modell Regeln gegeben. Direkt, kurze Sätze, keine
> Floskeln. Regeln erzeugen Regel-Deutsch. Jetzt bekommt es zwanzig echte
> Sätze von mir, transkribiert aus meinen Aufnahmen.
>
> Zweitens: Es hat sich jedes Mal die Struktur ausgedacht. Jetzt bekommt es
> das Skelett von einem Reel, das schon lief. Gleiche Beats, gleiche
> Sekunden, null Wörter davon.
>
> Drittens: Niemand hat Nein gesagt. Jetzt misst ein Scanner die
> KI-Floskeln, und ein zweites Modell prüft gegen mein Sprachprofil. Was
> durchfällt, wird nicht gespeichert.

**Loop/Ende (ohne CTA):**

> Das hier ist das erste Skript, das durchgekommen ist.

**Regie:** Talking Head unten, Küche oder Auto. Oben bei „fünfzig Mal"
ein schneller Stapel aus Chat-Screenshots (je 0,5 Sek.). Die drei Dinge
je als Karte mit einem Wort: Korpus, Skelett, Gate.

**Schnittplan:**

```
 0.0  voll   schnitt   Talking Head, Küche, Kaffee in der Hand
 0.0  oben   copy      „50 Versuche. 5 Modelle. 0 Treffer."
 2.0  oben   screen    Stapel Chat-Screenshots, 4 Stück je 0,5 Sek.
 4.0  unten  zoom      115 %
 6.0  oben   flash     „Modell ≠ Problem" (1,0 Sek.)
 8.0  oben   karte     „3 Dinge"
10.0  oben   karte     „1 · Korpus"
12.5  oben   screen    STIMMKORPUS.md, Sätze scrollen
14.5  unten  zoom      100 %
16.5  oben   karte     „2 · Skelett"
18.5  oben   screen    Beat-Tabelle mit Sekundenmarken
21.0  oben   flash     „Struktur 1:1 · Wörter 0 %" (1,2 Sek.)
23.0  oben   karte     „3 · Gate"
25.0  oben   screen    Scanner-Befund, „Score 7 · verwerfen" in Rot
27.5  unten  zoom      115 %
30.0  oben   screen    Scanner-Befund, „Score 0 · sauber"
32.5  oben   flash     „Skript 1 von Batch 002" (1,0 Sek.)
35.0  voll   schnitt   Anfangsbild
```

**Tells:** Score 2 (Aufzählung „Erstens/Zweitens/Drittens", einmal, 2
Punkte). Bewusst gelassen: die Referenz-Reels zählen genauso durch, das
ist Sprechen, kein Aufsatz. Zahlen: 50, 20, 3. Ich: 8×. Namen: ChatGPT,
Claude, Codex.

---

## Skript 4 — Du konntest das nicht lesen · Säule (b) · Skelett 3 · ~28 Sek.

**Hooks:**

- Pattern-Interrupt: „Das war Absicht." (nach einem Flash-Insert)
- Kontra-These: „Lesbare Einblendungen kosten dich Watchtime."
- Konkrete Zahl: „0,8 Sekunden. Zu kurz. Genau richtig."

**Body (gesprochen):**

> Das gerade eben konntest du nicht lesen. War Absicht.
>
> Ich hab mir angeschaut, was die Reels gemeinsam haben, die bei mir hängen
> bleiben. Unten das Gesicht, oben läuft was. Und alle paar Sekunden wird
> irgendwas eingeblendet, ein Tool, ein Prompt, eine Zahl, und ist wieder
> weg, bevor man es hat.
>
> Dann pausiert man. Oder spult zurück. Oder schaut das Ding ein zweites
> Mal. Alles drei zählt als Watchtime. Und Watchtime ist die einzige
> Währung, die Instagram gerade akzeptiert.
>
> Also bau ich das ein. Zwei bis vier Einblendungen pro Reel, null Komma
> acht bis eins Komma fünf Sekunden. Mehr nicht, sonst wird es Rauschen.

**Loop/Ende (ohne CTA):**

> Das da oben war die dritte.

**Regie:** Sekunde 0 startet mit einem Flash-Insert (Repo-Name oder
Prompt), 0,8 Sek., dann Talking Head. Beim Loop-Satz blitzt derselbe
Insert nochmal, exakt gleich kurz.

**Schnittplan:**

```
 0.0  oben   flash     „KI-TELLS.md · 4 Klassen · Score < 3" (0,8 Sek.)
 0.8  voll   schnitt   Talking Head, nah, Blick in die Kamera
 1.0  oben   copy      „Das war Absicht."
 3.0  unten  zoom      115 %
 5.0  oben   screen    Referenz-Reel, Gesicht unten, Karten oben (stumm)
 7.5  oben   screen    zweites Referenz-Reel, Karte erscheint und verschwindet
 9.5  oben   flash     „Pause · Rewatch · Verweildauer" (1,2 Sek.)
11.5  unten  zoom      100 %
13.5  oben   karte     „3 Reaktionen, 1 Kennzahl: Watchtime"
16.0  oben   screen    Instagram-Insights, Balken „Ø angesehen"
18.5  unten  zoom      115 %
20.5  oben   karte     „2–4 pro Reel · 0,8–1,5 Sek."
23.0  oben   screen    Schnittplan-Zeilen mit „flash" markiert
25.5  oben   flash     derselbe Insert wie bei 0.0 (0,8 Sek.)
26.5  voll   schnitt   Anfangsbild
```

**Tells:** Score 0. Zahlen: 0,8, 1,5, 2–4. Ich: 4×. Namen: Instagram.

---

## Skript 5 — Teleprompter, der zuhört · Säule (a) · Skelett 2 · ~30 Sek.

**Hooks:**

- Pattern-Interrupt: „Mein Teleprompter hört mir zu."
- Kontra-These: „Auswendig lernen ist Zeitverschwendung."
- Konkrete Zahl: „1 Reel am Tag. 0 Minuten Text lernen."

**Body (gesprochen):**

> Jeder, der Reels macht, kennt das: Skript geschrieben, Kamera an, dritter
> Satz weg.
>
> Ich hab mir deshalb einen Teleprompter gebaut. Liegt auf beuwy.com, eine
> einzige HTML-Seite. Er hört mit und springt zur nächsten Zeile, wenn ich
> die aktuelle gesagt hab. Ich schau nicht auf einen Scroll, ich schau auf
> einen Satz.
>
> Das Skript kommt aus meinem Content Hub, da tipp ich rein. Absatz gleich
> Beat gleich Schnittmarke. Der Teleprompter zeigt also genau die Einheit,
> die nachher ein Schnitt wird.
>
> Ein Reel am Tag, das ist der Plan. Ohne einen Satz auswendig zu lernen.

**Loop/Ende (ohne CTA):**

> Der dritte Satz sitzt jetzt übrigens. Weil ich ihn gerade abgelesen hab.

**Regie:** Talking Head unten, dahinter der Laptop mit dem Teleprompter
sichtbar. Oben Screenrecording der Seite: Zeile springt, während Alex
spricht. Bei „Absatz gleich Beat" der Content Hub mit Absätzen.

**Schnittplan:**

```
 0.0  voll   schnitt   Talking Head, Laptop im Hintergrund, Alex tippt noch
 0.0  oben   copy      „Mein Teleprompter hört mir zu."
 2.0  oben   screen    Kamera-App, Aufnahme läuft, Alex stockt (Selbstironie)
 4.0  unten  zoom      115 %
 6.0  oben   screen    beuwy.com/teleprompter.html, eine Zeile groß
 8.0  oben   flash     „1 HTML-Datei · Voice-Advance" (1,2 Sek.)
10.0  oben   screen    Zeile springt weiter, synchron zum Gesprochenen
12.5  unten  zoom      100 %
14.5  oben   screen    Content Hub, Skript mit Absätzen
16.5  oben   karte     „Absatz = Beat = Schnitt"
19.0  unten  zoom      115 %
21.0  oben   screen    Teleprompter zeigt genau diesen Absatz
23.5  oben   flash     „1 Reel / Tag" (0,8 Sek.)
26.0  oben   screen    Teleprompter springt auf den Loop-Satz
28.5  voll   schnitt   Anfangsbild
```

**Tells:** Score 0. Zahlen: 1, 3. Ich: 7×. Namen: beuwy.com, Content Hub.

---

Format-Regeln: `../PROTOKOLL.md` §5 · Sprache: `../SPRACHPROFIL.md` ·
Hooks: `../HOOK-PATTERNS.md` · Skelette: `../SKELETTE.md` · Gate:
`../KI-TELLS.md`
