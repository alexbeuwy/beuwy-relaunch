---
format: 1920x1080
duration: 123s
message: "Was in Ihrem Büro liegen bleibt, holt sich der Makler mit System. In sechs Wochen haben Sie es selbst, einmal pro Stadt."
arc: Status → Lücke → Verlust → Bedrohung (was der andere hat) → Wende → Beweis → Aufwand → Knappheit → Handlung
audience: Inhaber kleiner und mittlerer Maklerbüros, 40–60, Geschäft läuft, keine Zeit
mode: collaborative
---

# System-Explainer beuwy · Storyboard v3 (Bau)

**Botschaft:** Was in Ihrem Büro liegen bleibt, holt sich der Makler mit
System. In sechs Wochen haben Sie es selbst, einmal pro Stadt.

**Format:** 1920 × 1080, ca. 140 s, Stimme (Alex, geklont), ruhiges
Musikbett unter der Stimme. Untertitel: keine eingebrannten; die
Headlines tragen den Inhalt ohne Ton.

**Spine (roter Faden):** der Stapel liegengebliebener Aufgaben. Er wächst
in Frame 3, fliegt in Frame 5 zum Wettbewerber, löst sich in Frame 11 auf
und kommt in Frame 16 als eine einzige Karte zurück: „Ihre Stadt".

**Headline-Kette** (ohne Ton gelesen = Verkaufsgespräch):
Ihr Geschäft läuft. → Aber was bleibt liegen? → Was liegen bleibt, holt
sich ein anderer. → Der Makler in Ihrer Stadt, der schon ein System hat. →
Sein Rechner sammelt Eigentümer. Auch nachts. → Jeder Eigentümer bekommt in
60 Sekunden seinen Report. → Käufer legen bei ihm ein Konto an. Mit
Suchauftrag. → Er sieht, wo Eigentümer wirklich klicken. → Dieses System
gibt es jetzt für Ihr Büro. → Sie müssen dafür nichts über KI wissen. → So
sieht das aus. Live bei RIEGEL. → 9 zusätzliche Mandate in den ersten 3
Monaten, rund 257.000 € Courtage-Potenzial. → Sie liefern zwei Termine und Ihre Fotos. → In sechs Wochen läuft
es. An Ihrer Maklersoftware. → Einmal pro Stadt. → Ist Ihre noch frei?

**Marke:** Weiß #FFFFFF, Tinte #161613, gedämpft #5D5D58, Linie
rgba(20,20,18,.08), Akzent Pastellgelb #F3E27F (nur Highlighter, Knopf,
Fokus), Wash #FBF5D6. Helvena 800 für Headlines (96–120 px), Helvena 400
für Text (32–40 px), Zahlen tabellarisch. Radien 24–32 px. Easing
cubic-bezier(0.22, 1, 0.36, 1).

**Verbote:** kein Gold, nie kursiv, keine Verläufe, kein Glow, keine
erfundene RIEGEL-Oberfläche (echte Screens oder neutrale Platzhalter),
keine Zahl ohne Beleg, kein „hyperpersonalisiert". Motion-Fehler
vermeiden: Diashow (jeder Beat eine neue Karte) und Bildschirmschoner
(Bewegung ohne Aussage).

**Gehaltener Frame:** Frame 11 („Sie müssen dafür nichts über KI
wissen.") steht zwei Sekunden still.

## Still open

- Stimme: Probe congstar / Alex ruhig / LDC liegt bei Alex (assets/stimmproben).
- Chips in Frame 15: onOffice ist bei RIEGEL belegt; FLOWFACT/Propstack stehen als Aussage auf beuwy.com — bestätigen.

## Frame 1 — Status

- scene: weiße Fläche; „Ihr Geschäft läuft.“ (display, zentriert) setzt sich Wort für Wort per waterfall-entry, erstes Wort auf „Ihr“@0.35, letztes a
- duration: 5.46s
- start: 0s
- transition_in: cut
- status: built
- voiceover: "Ihr Geschäft läuft. Die Objekte gehen weg, die Kunden empfehlen Sie weiter."
- src: compositions/01-status.html
- blueprint: kinetic-type-beats
- rules: waterfall-entry
- focal: Headline „Ihr Geschäft läuft.“
- cues: Ihr@0.35 · Geschäft@0.55 · läuft.@1.0 · Die@1.58 · Objekte@1.77 · gehen@2.22 · weg,@2.45 · die@2.88 · Kunden@3.07 · empfehlen@3.5 · Sie@3.97 · weiter.@4.1

Shot sequence (Sekunden relativ zum Frame-Start; Wortzeiten in `cues`):
Scene 1 (0.0–2.0s): weiße Fläche; „Ihr Geschäft läuft.“ (display, zentriert) setzt sich Wort für Wort per waterfall-entry, erstes Wort auf „Ihr“@0.35, letztes auf „läuft.“. → Scene 2 (2.0–5.4s): Headline steht; sehr langsamer Push scale 1 → 1.03 auf dem ganzen Satz. Keine weiteren Elemente.

## Frame 2 — Die Frage

- scene: „Aber was bleibt liegen?“ (display, zentriert) erscheint Wort für Wort auf der Stimme (ab „Was“).
- duration: 4.24s
- start: 5.46s
- transition_in: cut
- status: built
- voiceover: "Aber seien Sie ehrlich: Was bleibt liegen?"
- src: compositions/02-frage.html
- blueprint: kinetic-type-beats
- rules: css-marker-patterns
- focal: „liegen“ mit Highlighter
- cues: Aber@0.35 · seien@0.62 · Sie@0.86 · ehrlich:@1.02 · Was@1.78 · bleibt@2.11 · liegen?@2.43

Shot sequence (Sekunden relativ zum Frame-Start; Wortzeiten in `cues`):
Scene 1 (0.0–1.6s): „Aber was bleibt liegen?“ (display, zentriert) erscheint Wort für Wort auf der Stimme (ab „Was“). → Scene 2 (Wort „liegen?“): gelber Highlighter wischt von links unter „liegen“ (css-marker-patterns, highlight-Modus, 0.45 s). → Scene 3 bis Ende: Halten, minimaler Push scale 1 → 1.02.

## Frame 3 — Der Stapel

- scene: weiße Fläche, oben links Label „LIEGT SEIT …“ (label, dim).
- duration: 10.02s
- start: 9.7s
- transition_in: cut
- status: built
- voiceover: "Die Bewertungsanfrage von Freitagabend. Der Suchkunde vom März. Das Nachfassen nach der Besichtigung. Der Eigentümer, der noch nicht so weit war."
- src: compositions/03-stapel.html
- blueprint: compose
- rules: spring-pop-entrance, sine-wave-loop
- focal: der wachsende Kartenstapel (Hero-Prop des Films)
- cues: Die@0.35 · Bewertungsanfrage@0.55 · von@1.49 · Freitagabend.@1.66 · Der@2.58 · Suchkunde@2.82 · vom@3.46 · März.@3.66 · Das@4.27 · Nachfassen@4.59 · nach@5.18 · der@5.38 · Besichtigung.@5.48 · Der@6.31 · Eigentümer,@6.58 · der@7.28 · noch@7.44 · nicht@7.63 · so@7.86 · weit@7.98 · war.@8.2

Shot sequence (Sekunden relativ zum Frame-Start; Wortzeiten in `cues`):
Scene 1 (0.0–0.6s): weiße Fläche, oben links Label „LIEGT SEIT …“ (label, dim). → Scene 2: vier Aufgabenkarten (Karte, 620 × 170 px) fallen nacheinander mittig-rechts auf einen Stapel, jede leicht gedreht (-4°, 3°, -2°, 5°) und um ~70 px versetzt, spring-pop-entrance, je genau auf ihrem Stichwort: Karte 1 auf „Bewertungsanfrage“: Zeitstempel „Fr · 21:14“, Titel „Bewertungsanfrage“, Zeile „Einfamilienhaus, Schifferstadt“. Karte 2 auf „Suchkunde“: „seit März“, „Suchkunde“, „3 Zimmer, Speyer, bis 420.000 €“. Karte 3 auf „Nachfassen“: „Di · Besichtigung“, „Nachfassen offen“, „Familie Kern“. Karte 4 auf „Eigentümer,“: „„melden Sie sich im Herbst““, „Eigentümer“, „noch nicht so weit“. Zeitstempel dim 20 px, Titel HelvenaBold 40 px, Zeile muted 24 px. → Scene 3 (Rest): Stapel steht, ganz leichtes Atmen (sine-wave-loop, y ±3 px, endliche Wiederholung). Unten rechts erscheint am Ende „Liegt.“ (h2, dim).

## Frame 4 — Verlust

- scene: der Stapel aus Frame 3 steht klein (Skala 0.45) unten rechts (Callback, gleiche Karten, gleiche Drehungen).
- duration: 4.15s
- start: 19.72s
- transition_in: cut
- status: built
- voiceover: "Und was liegen bleibt, holt sich ein anderer."
- src: compositions/04-verlust.html
- blueprint: kinetic-type-beats
- rules: waterfall-entry, css-marker-patterns
- focal: „ein anderer“ mit Highlighter
- cues: Und@0.35 · was@0.64 · liegen@0.88 · bleibt,@1.16 · holt@1.67 · sich@1.93 · ein@2.13 · anderer.@2.31

Shot sequence (Sekunden relativ zum Frame-Start; Wortzeiten in `cues`):
Scene 1 (0.0–0.4s): der Stapel aus Frame 3 steht klein (Skala 0.45) unten rechts (Callback, gleiche Karten, gleiche Drehungen). → Scene 2 (ab „Und“): links „Was liegen bleibt, holt sich ein anderer.“ (h1, zweizeilig, linksbündig, max. 1100 px breit) Wort für Wort. → Scene 3 (auf „anderer.“): Highlighter wischt unter „ein anderer“. Stapel rutscht dabei 40 px nach rechts unten (nudge-artig, power3.out).

## Frame 5 — Der andere

- scene: neutrale Stadtkarte als Raster (surface-Fläche mit feinen line-Linien im 80-px-Raster, einige hellgraue Straßenzüge als breite Linien), kein
- duration: 8.03s
- start: 23.87s
- transition_in: crossfade
- status: built
- voiceover: "Der Makler in Ihrer Stadt, der schon ein System hat. Er verkauft kein bisschen besser als Sie. Ihm rutscht nur nichts mehr durch."
- src: compositions/05-der-andere.html
- blueprint: spatial-pan-stations
- rules: viewport-change, spring-pop-entrance
- focal: gelber Pin „Der andere“
- cues: Der@0.35 · Makler@0.62 · in@1.01 · Ihrer@1.17 · Stadt,@1.44 · der@1.8 · schon@1.98 · ein@2.22 · System@2.36 · hat.@2.83 · Er@3.24 · verkauft@3.43 · kein@3.91 · bisschen@4.16 · besser@4.51 · als@4.82 · Sie.@4.97 · Ihm@5.32 · rutscht@5.59 · nur@5.93 · nichts@6.14 · mehr@6.41 · durch.@6.57

Shot sequence (Sekunden relativ zum Frame-Start; Wortzeiten in `cues`):
Scene 1 (0.0–1.0s): neutrale Stadtkarte als Raster (surface-Fläche mit feinen line-Linien im 80-px-Raster, einige hellgraue Straßenzüge als breite Linien), keine echte Stadt, keine Namen. Grauer Pin „Ihr Büro“ links (x≈560, y≈560) poppt auf. → Scene 2 (auf „Makler“): gelber Pin „Der andere“ rechts oben (x≈1340, y≈380) poppt auf, mit Ring. Oben links Headline „Der Makler in Ihrer Stadt, der schon ein System hat.“ (h2, max. 1000 px) Wort für Wort, Highlighter unter „System“ auf „System“. → Scene 3 (ab „Er“ bis „durch.“): vier kleine Aufgabenkarten (Miniaturen der Karten aus Frame 3, 200 × 60 px) fliegen nacheinander in einem Bogen vom grauen zum gelben Pin und verschwinden dort; der gelbe Pin pulst bei jeder Ankunft einmal (scale 1 → 1.15 → 1). Leichter Kamera-Pan (viewport-change) 40 px Richtung gelber Pin über die Szene.

## Frame 6 — Rechner

- scene: links Headline „Sein Rechner sammelt Eigentümer.“ (h2, max. 760 px) Wort für Wort. Rechts eine neutrale Rechner-Karte (820 × 520 px, keine R
- duration: 5.06s
- start: 31.9s
- transition_in: wipe-left
- status: built
- voiceover: "Sein Rechner sammelt Eigentümer. Auch nachts um Viertel vor zwölf."
- src: compositions/06-rechner.html
- blueprint: compose
- rules: spring-pop-entrance, discrete-text-sequence
- focal: Toast „Neuer Eigentümer“
- cues: Sein@0.35 · Rechner@0.66 · sammelt@1.04 · Eigentümer.@1.38 · Auch@2.2 · nachts@2.58 · um@2.93 · Viertel@3.08 · vor@3.4 · zwölf.@3.57

Shot sequence (Sekunden relativ zum Frame-Start; Wortzeiten in `cues`):
Scene 1 (0.0–1.2s): links Headline „Sein Rechner sammelt Eigentümer.“ (h2, max. 760 px) Wort für Wort. Rechts eine neutrale Rechner-Karte (820 × 520 px, keine RIEGEL-Oberfläche): Schrittleiste 4 Segmente (2 gelb), zwei graue Formularbalken, gelber Knopf „Wert berechnen“. → Scene 2 (auf „Auch nachts“): unter der Headline „Auch nachts.“ mit Highlighter; darunter Uhr „23:48“ (h1, dim, tabular) zählt per discrete-text-sequence von 23:46 auf 23:48. → Scene 3 (Rest): Toast oben rechts an der Karte poppt auf: dunkle Fläche ink, weißer Text „Neuer Eigentümer · Einfamilienhaus, Speyer“ (22 px). Kurz danach ein zweiter Toast darunter „Neuer Eigentümer · Wohnung, Ludwigshafen“.

## Frame 7 — Report

- scene: links Headline „Jeder Eigentümer bekommt in 60 Sekunden seinen Report.“ (h2, max. 800 px) Wort für Wort, Highlighter unter „60 Sekunden“ auf
- duration: 7.33s
- start: 36.96s
- transition_in: wipe-left
- status: built
- voiceover: "Jeder bekommt in sechzig Sekunden seinen Report. Mit Wert, Bodenrichtwert und Luftbild seines Hauses."
- src: compositions/07-report.html
- blueprint: compose
- rules: spring-pop-entrance, motion-blur-streak
- focal: PDF-Report mit Chips
- cues: Jeder@0.35 · bekommt@0.73 · in@1.14 · sechzig@1.28 · Sekunden@1.64 · seinen@2.09 · Report.@2.38 · Mit@3.08 · Wert,@3.29 · Bodenrichtwert@3.76 · und@4.62 · Luftbild@4.83 · seines@5.35 · Hauses.@5.69

Shot sequence (Sekunden relativ zum Frame-Start; Wortzeiten in `cues`):
Scene 1 (0.0–1.4s): links Headline „Jeder Eigentümer bekommt in 60 Sekunden seinen Report.“ (h2, max. 800 px) Wort für Wort, Highlighter unter „60 Sekunden“ auf „sechzig Sekunden“. → Scene 2 (auf „Report.“): rechts fliegt ein PDF-Blatt (Karte hochkant 460 × 600 px, -3° gedreht) von unten ein (motion-blur-streak, kurz): oben ein Luftbild-Feld (surface mit diagonaler Schraffur als Platzhalter), darunter Titel „Marktwert-Report“, zwei Textbalken, große Zahl „412.000 €“. → Scene 3 (ab „Mit“): fünf Chips docken nacheinander an der unteren Kante des Blatts an, je auf dem Wort: „Name“, „Adresse“, „Bodenrichtwert“ (auf „Bodenrichtwert“), „Luftbild“ (auf „Luftbild“), „Ihr Logo“ zuletzt. → Scene 4: Halten, Blatt dreht sich langsam von -3° auf -1°.

## Frame 8 — Konto

- scene: links Headline „Käufer legen bei ihm ein Konto an. Mit Suchauftrag.“ (h2, max. 800 px), Highlighter unter „Mit Suchauftrag.“ auf „hinterlege
- duration: 7.29s
- start: 44.29s
- transition_in: wipe-left
- status: built
- voiceover: "Käufer legen bei ihm ein Konto an und hinterlegen, was sie suchen. Passt ein neues Objekt, geht die Mail von selbst raus."
- src: compositions/08-konto.html
- blueprint: compose
- rules: spring-pop-entrance, anchored-layout-expand
- focal: Mail „Passt zu Ihrem Suchauftrag“
- cues: Käufer@0.35 · legen@0.78 · bei@0.99 · ihm@1.12 · ein@1.27 · Konto@1.4 · an@1.74 · und@1.89 · hinterlegen,@2.0 · was@2.46 · sie@2.65 · suchen.@2.8 · Passt@3.43 · ein@3.76 · neues@3.89 · Objekt,@4.19 · geht@4.7 · die@4.91 · Mail@5.05 · von@5.23 · selbst@5.4 · raus.@5.72

Shot sequence (Sekunden relativ zum Frame-Start; Wortzeiten in `cues`):
Scene 1 (0.0–1.6s): links Headline „Käufer legen bei ihm ein Konto an. Mit Suchauftrag.“ (h2, max. 800 px), Highlighter unter „Mit Suchauftrag.“ auf „hinterlegen“. Rechts Konto-Karte (760 × 520): Label „SUCHAUFTRAG“, Avatar-Kreis surface mit Initialen „JK“, Chips erscheinen nacheinander: „3–4 Zimmer“, „Speyer“, „bis 450.000 €“, „Garten“. → Scene 2 (auf „Passt“): ein neues Objekt-Kärtchen (Titel „Doppelhaushälfte, Speyer-West“, grauer Bildblock) gleitet von rechts in die Karte. → Scene 3 (auf „Mail“): darunter klappt eine Mail-Zeile auf (anchored-layout-expand): linker gelber Balken, Text „Passt zu Ihrem Suchauftrag: Doppelhaushälfte, Speyer-West“, rechts Status „gesendet 06:00“ (dim).

## Frame 9 — Heatmap

- scene: links Headline „Er sieht, wo Eigentümer wirklich klicken.“ (h2), Highlighter unter „wirklich klicken“ auf „wirklich“. Rechts Seitenskizze in
- duration: 4.5s
- start: 51.58s
- transition_in: wipe-left
- status: built
- voiceover: "Und er sieht, wo Eigentümer auf seiner Seite wirklich klicken."
- src: compositions/09-heatmap.html
- blueprint: compose
- rules: ambient-glow-bloom
- focal: dichtester Heatmap-Punkt am Knopf
- cues: Und@0.35 · er@0.65 · sieht,@0.79 · wo@1.05 · Eigentümer@1.27 · auf@1.89 · seiner@2.04 · Seite@2.31 · wirklich@2.66 · klicken.@3.02

Shot sequence (Sekunden relativ zum Frame-Start; Wortzeiten in `cues`):
Scene 1 (0.0–1.0s): links Headline „Er sieht, wo Eigentümer wirklich klicken.“ (h2), Highlighter unter „wirklich klicken“ auf „wirklich“. Rechts Seitenskizze in Karte (760 × 520): zwei Textbalken, Bildblock, gelber Knopf „Immobilie bewerten“. → Scene 2 (ab „wirklich“ bis Ende): Heatmap-Punkte blühen nacheinander auf (ambient-glow-bloom, radiale Verläufe in akzent mit Transparenz, 6–8 Punkte, deterministische Positionen), der größte genau auf dem Knopf zuletzt. Kleines Label über der Karte „Klicks · letzte 7 Tage“ (label, dim).

## Frame 10 — Wende

- scene: harter Schnitt auf reines Weiß, leer.
- duration: 3.39s
- start: 56.08s
- transition_in: cut
- status: built
- voiceover: "Dieses System gibt es jetzt für Ihr Büro."
- src: compositions/10-wende.html
- blueprint: titlecard-reveal
- rules: waterfall-entry, css-marker-patterns
- focal: „Ihr Büro“ mit Highlighter
- cues: Dieses@0.35 · System@0.74 · gibt@1.17 · es@1.4 · jetzt@1.51 · für@1.74 · Ihr@1.88 · Büro.@2.02

Shot sequence (Sekunden relativ zum Frame-Start; Wortzeiten in `cues`):
Scene 1 (0.0–0.3s): harter Schnitt auf reines Weiß, leer. → Scene 2 (ab „Dieses“): „Dieses System gibt es jetzt für Ihr Büro.“ (h1, zentriert, zweizeilig) Wort für Wort. → Scene 3 (auf „Büro.“): Highlighter wischt unter „Ihr Büro“. Halten.

## Frame 11 — Entlastung (gehalten)

- scene: der Stapel aus Frame 3 steht groß mittig-rechts (gleiche vier Karten).
- duration: 7.55s
- start: 59.47s
- transition_in: cut
- status: built
- voiceover: "Sie müssen dafür nichts über KI wissen. Und Sie richten nichts davon selbst ein."
- src: compositions/11-entlastung.html
- blueprint: titlecard-reveal
- rules: depth-scatter-assemble
- focal: „Sie müssen dafür nichts über KI wissen.“
- cues: Sie@0.35 · müssen@0.57 · dafür@0.9 · nichts@1.24 · über@1.51 · KI@1.71 · wissen.@2.08 · Und@2.77 · Sie@2.94 · richten@3.09 · nichts@3.4 · davon@3.71 · selbst@4.04 · ein.@4.42

Shot sequence (Sekunden relativ zum Frame-Start; Wortzeiten in `cues`):
Scene 1 (0.0–0.4s): der Stapel aus Frame 3 steht groß mittig-rechts (gleiche vier Karten). → Scene 2 (ab „Sie“): Headline „Sie müssen dafür nichts über KI wissen.“ (h1, zentriert, oben bei y≈330) Wort für Wort; gleichzeitig lösen sich die vier Karten nacheinander auf: jede kippt leicht, fällt 60 px und blendet aus (depth-scatter-assemble, Scatter-Richtung, deterministisch), die letzte auf „wissen.“. → Scene 3 (auf „Und“): Unterzeile „Und nichts selbst einrichten.“ (body-lg, muted) darunter. → Scene 4 (letzte 2.2 s): gehaltener Frame, nichts bewegt sich.

## Frame 12 — RIEGEL live

- scene: links Headline „So sieht das aus. Live bei RIEGEL Immobilien.“ (h2, max. 640 px), Highlighter unter „Live“ auf „Live“. Rechts Browser-Rahmen
- duration: 15.14s
- start: 67.02s
- transition_in: crossfade
- status: built
- voiceover: "So sieht das aus. Live bei RIEGEL Immobilien in Speyer. Der Rechner ist mit vierhundertneunundachtzig echten Abschlüssen kalibriert. Dazu das eigene Portal, der Preisatlas und rund fünfundneunzig Seiten für Google und KI-Suche."
- src: compositions/12-riegel.html
- blueprint: device-surface-showcase
- rules: 3d-page-scroll, spring-pop-entrance
- focal: Browser-Rahmen mit echten RIEGEL-Screens
- cues: So@0.35 · sieht@0.59 · das@0.77 · aus.@0.95 · Live@1.51 · bei@1.86 · RIEGEL@2.03 · Immobilien@2.41 · in@3.04 · Speyer.@3.18 · Der@3.83 · Rechner@4.06 · ist@4.45 · mit@4.61 · vierhundertneunundachtzig@4.8 · echten@6.02 · Abschlüssen@6.4 · kalibriert.@6.91 · Dazu@7.71 · das@8.09 · eigene@8.28 · Portal,@8.61 · der@9.28 · Preisatlas@9.46 · und@10.25 · rund@10.47 · fünfundneunzig@10.7 · Seiten@11.51 · für@11.89 · Google@12.06 · und@12.44 · KI-Suche.@12.63

Shot sequence (Sekunden relativ zum Frame-Start; Wortzeiten in `cues`):
Scene 1 (0.0–1.8s): links Headline „So sieht das aus. Live bei RIEGEL Immobilien.“ (h2, max. 640 px), Highlighter unter „Live“ auf „Live“. Rechts Browser-Rahmen (1040 × 650, URL „riegel-immobilien.de“) mit Bild assets/riegel/rechner.png (object-fit cover, oben). → Scene 2 (auf „Rechner“): unter der Headline Zahl-Zeile „489“ (h1) + „echte Abschlüsse als Basis“ (body-lg, muted), Zahl zählt 0 → 489. → Scene 3 (auf „Portal,“): Bild im Rahmen wechselt (harter Schnitt) auf assets/riegel/objekte-scroll.png und scrollt langsam nach unten (translateY 0 → -900 px im Rahmen, 3d-page-scroll ohne Kippung). → Scene 4 (auf „Seiten“): Wechsel auf assets/riegel/home-scroll.png, scrollt 0 → -1200 px; darunter Chip „≈ 95 Seiten für Google und KI-Suche“. Alle Bilder echt, nichts nachgebaut.

## Frame 13 — Ergebnis

- scene: zentriert Zahl „9“ (zahl-Stil 280 px) zählt 0
- duration: 16.42s
- start: 82.16s
- transition_in: cut
- status: built
- voiceover: "Das Ergebnis: neun zusätzliche Mandate in den ersten drei Monaten. Bei vierhunderttausend Euro durchschnittlichem Hauspreis sind das rund zweihundertsiebenundfünfzigtausend Euro Courtage-Potenzial. Schon ein verkauftes Mandat bezahlt das System."
- src: compositions/13-ergebnis.html
- blueprint: dataviz-countup
- rules: counting-dynamic-scale, css-marker-patterns
- focal: Zahl „9“
- cues: Das@0.35 · Ergebnis:@0.71 · neun@1.61 · zusätzliche@1.92 · Mandate@2.53 · in@3.04 · den@3.15 · ersten@3.33 · drei@3.72 · Monaten.@3.95 · Bei@4.68 · vierhunderttausend@4.95 · Euro@5.81 · durchschnittlichem@6.1 · Hauspreis@6.78 · sind@7.4 · das@7.62 · rund@7.83 · zweihundertsiebenundfünfzigtausend@8.16 · Euro@10.11 · Courtage-Potenzial.@10.47 · Schon@11.84 · ein@12.12 · verkauftes@12.25 · Mandat@12.79 · bezahlt@13.17 · das@13.59 · System.@13.74

Shot sequence (Sekunden relativ zum Frame-Start; Wortzeiten in `cues`):
Scene 1 (0.0–3.5s): zentriert Zahl „9“ (zahl-Stil 280 px) zählt 0 → 9 ab „neun“ (counting-dynamic-scale), darunter „zusätzliche Mandate in den ersten 3 Monaten“ (h2). Gelber Highlighter-Balken unter der 9. → Scene 2 (ab „Bei“): Zahlblock rückt 120 px nach oben; darunter erscheint „rund 257.000 € Courtage-Potenzial“ (h2), Betrag zählt 0 → 257.000 (tabular, Tausenderpunkt) ab „zweihundertsiebenundfünfzigtausend“. → Scene 3 (auf „Schon“): darunter in einer wash-Fläche (Radius 20) „Ein verkauftes Mandat bezahlt das System.“ (body-lg, ink). → Scene 4 (letzte 3 s): Fußnote unten (y≈860, 18 px, dim): „RIEGEL Immobilien · 9 × Ø-Hauspreis 400.000 € (Capital 09/2026) × 7,14 % · Mandate, noch keine Abschlüsse“.

## Frame 14 — Aufwand

- scene: links Headline „Sie liefern zwei Termine und Ihre Fotos.“ (h2, max. 760 px), Highlighter unter „zwei Termine“ auf „Zwei“.
- duration: 5.75s
- start: 98.58s
- transition_in: wipe-left
- status: built
- voiceover: "Was Sie dafür tun? Zwei Termine, dazu Ihre Fotos. Den Rest bauen wir."
- src: compositions/14-aufwand.html
- blueprint: compose
- rules: spring-pop-entrance
- focal: zwei Kalenderblätter
- cues: Was@0.35 · Sie@0.58 · dafür@0.71 · tun?@0.98 · Zwei@1.49 · Termine,@1.85 · dazu@2.38 · Ihre@2.71 · Fotos.@2.9 · Den@3.58 · Rest@3.82 · bauen@4.12 · wir.@4.41

Shot sequence (Sekunden relativ zum Frame-Start; Wortzeiten in `cues`):
Scene 1 (0.0–1.4s): links Headline „Sie liefern zwei Termine und Ihre Fotos.“ (h2, max. 760 px), Highlighter unter „zwei Termine“ auf „Zwei“. → Scene 2 (auf „Termine,“): rechts fallen zwei Kalenderblätter (Karte 260 × 300, Kopf akzent mit „Kickoff“ bzw. „Freigabe“, Zahl „60 Min.“ bzw. „45 Min.“ HelvenaBold 56 px) nacheinander, spring-pop-entrance. → Scene 3 (auf „Fotos.“): daneben drei echte Fotos als Stapel (assets/fotos/makler-5.webp, makler-7.webp, makler-13.webp; 320 × 220, Radius 16, leicht gedreht), jedes mit AI-Pille „AI Visual“. → Scene 4 (auf „Rest“): Unterzeile „Den Rest bauen wir.“ (body-lg, muted) unter der Headline.

## Frame 15 — Zeit

- scene: zentriert „In sechs Wochen läuft es.“ (h1), Highlighter unter „sechs Wochen“ auf „sechs“.
- duration: 4.64s
- start: 104.33s
- transition_in: wipe-left
- status: built
- voiceover: "In sechs Wochen läuft es, angebunden an Ihre Maklersoftware."
- src: compositions/15-zeit.html
- blueprint: compose
- rules: stat-bars-and-fills, spring-pop-entrance
- focal: Fortschrittsbalken sechs Wochen
- cues: In@0.35 · sechs@0.6 · Wochen@0.87 · läuft@1.16 · es,@1.42 · angebunden@1.64 · an@2.29 · Ihre@2.42 · Maklersoftware.@2.64

Shot sequence (Sekunden relativ zum Frame-Start; Wortzeiten in `cues`):
Scene 1 (0.0–1.2s): zentriert „In sechs Wochen läuft es.“ (h1), Highlighter unter „sechs Wochen“ auf „sechs“. → Scene 2 (ab „läuft“): darunter Balken 1200 × 20 px (surface), füllt sich mit akzent von links (stat-bars-and-fills, scaleX 0 → 1, 1.6 s); darunter Labels „Woche 1“ links, „Woche 6“ rechts (label, dim). → Scene 3 (auf „Maklersoftware.“): drei Chips docken unter dem Balken an: „onOffice“, „FLOWFACT“, „Propstack“ (weiß mit line-Rand).

## Frame 16 — Einmal pro Stadt

- scene: Callback auf Frame 5: dieselbe Raster-Stadtkarte, nah (scale 1.8), gelber Pin mittig.
- duration: 6.41s
- start: 108.97s
- transition_in: crossfade
- status: built
- voiceover: "Wir bauen das System in jeder Stadt nur einmal. Wer zuerst startet, hat die Stadt."
- src: compositions/16-stadt.html
- blueprint: zoom-out-workspace-reveal
- rules: viewport-change, spring-pop-entrance
- focal: gelber Pin „vergeben“
- cues: Wir@0.35 · bauen@0.58 · das@0.86 · System@1.0 · in@1.48 · jeder@1.64 · Stadt@1.92 · nur@2.23 · einmal.@2.42 · Wer@3.07 · zuerst@3.36 · startet,@3.88 · hat@4.52 · die@4.7 · Stadt.@4.84

Shot sequence (Sekunden relativ zum Frame-Start; Wortzeiten in `cues`):
Scene 1 (0.0–1.2s): Callback auf Frame 5: dieselbe Raster-Stadtkarte, nah (scale 1.8), gelber Pin mittig. → Scene 2 (ab „Wir“): eine durchgehende, abbremsende Kamerafahrt zurück (scale 1.8 → 1.0, viewport-change), dabei werden 10–12 graue Pins auf der größeren Fläche sichtbar (Städte, ohne Namen), der gelbe Pin bekommt das Label „vergeben“. → Scene 3 (auf „einmal.“): oben links Headline „Einmal pro Stadt.“ (h1), Highlighter unter „Stadt“. → Scene 4 (auf „Wer zuerst“): zwei weitere Pins werden nacheinander gelb (spring-pop), Label je „vergeben“.

## Frame 17 — Ist Ihre noch frei?

- scene: zentriert Headline „Ist Ihre noch frei?“ (display), Highlighter unter „frei“ auf „frei“.
- duration: 7.37s
- start: 115.38s
- transition_in: cut
- status: built
- voiceover: "Prüfen Sie jetzt direkt unter diesem Video, ob Ihre Stadt noch frei ist."
- src: compositions/17-cta.html
- blueprint: cta-morph-press
- rules: discrete-text-sequence, press-release-spring
- focal: gelber Knopf „Verfügbarkeit prüfen“
- cues: Prüfen@0.35 · Sie@0.8 · jetzt@0.91 · direkt@1.15 · unter@1.58 · diesem@1.79 · Video,@2.06 · ob@2.41 · Ihre@2.54 · Stadt@2.71 · noch@2.97 · frei@3.15 · ist.@3.48

Shot sequence (Sekunden relativ zum Frame-Start; Wortzeiten in `cues`):
Scene 1 (0.0–1.2s): zentriert Headline „Ist Ihre noch frei?“ (display), Highlighter unter „frei“ auf „frei“. → Scene 2 (ab „direkt“): darunter das Stadt-Feld der Seite (Pille 1100 × 104 px, 3 px Rand akzent, weiß): links tippt ein Cursor „Ihre Stadt“ Zeichen für Zeichen (discrete-text-sequence) mit blinkendem Strich (endliche Wiederholung), rechts im Feld der gelbe Knopf „Verfügbarkeit prüfen →“. → Scene 3 (auf „frei“ am Satzende): Knopf drückt sich einmal (press-release-spring). Darunter Label „direkt unter diesem Video“ (label, dim). → Scene 4 (letzte 3 s): Endbild steht still; das ist die letzte Szene, keine Blende.
