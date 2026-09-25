# beuwy · Film 5 · Winkel „Keynote"

**Titel:** Es gibt Momente, da ändert sich alles.
**Länge:** 72 s (Ziel erreicht: unter 75 s)
**Format:** 16:9 Master, 9:16 Schnittfassung aus denselben Szenen (Typo zentriert, Safe Zone 80 %)
**Stimme:** ElevenLabs, deutsch, männlich, ruhig-tief, trocken („Apple-Spot"-Kette: weniger Bass, kurzer Raum, -16 LUFS). eleven_v3 als Master, Szenen 7 und 15 mit multilingual_v2 für exakte Pausen.
**Aussprache:** „beuwy" = „Boiwie" (/ˈbɔʏviː/), Pronunciation Dictionary auf v3, Alias auf v2.
**Sprechtext gesamt:** 114 Wörter auf 72 s = 1,58 Wörter/s (Grenze 2,3). Drei Musik-Momente ohne Stimme.

## Idee

Die Idee ist, dass der Makler das Mandat nicht mehr jagt, sondern morgens angerufen wird. beuwy ist das System, das diesen Anruf baut. Präsentiert wie ein Produkt-Launch: ein Moment, ein Reveal, eine Salve Einzelwörter, vier Belege, ein „Eins noch".

## Roter Faden (VSL-Logik im Keynote-Takt)

1. **Hook (0–21 s):** Ein einziger Moment. 23:48 bewertet ein Eigentümer sein Haus, 08:10 ruft er an. Bei Ihnen. Kein Problem-Gejammer, sondern der Traumzustand als Szene.
2. **Reveal (21–26 s):** Das System hinter diesem Moment, enthüllt wie ein Gerät.
3. **Features (26–35 s):** Acht Einzelwörter, acht Bildschirme. Was man bekommt, in Wörtern, die jeder kennt.
4. **Beweis (35–53 s):** Vier Zielgruppen, vier freigegebene Zahlen. Makler, Projektentwickler, Finanzvertrieb, Vertrieb (Gründer selbst).
5. **Abgrenzung/Aufwand (53–60 s):** Sechs Wochen, schriftlich. Dann dreißig Minuten pro Woche.
6. **One more thing (60–66 s):** „Eins noch." Gebietsschutz: ein Büro pro Stadt. Ehrliche Knappheit.
7. **CTA (66–72 s):** Logo-Sting, „Zusammenarbeit anfragen", beuwy.com.

Hintergrund-Rhythmus: dunkel → dunkel → weiß → dunkel → gelb → dunkel → weiß → weiß → dunkel → gelb → dunkel → weiß → weiß → dunkel → gelb → weiß. Nie zweimal dieselbe Fläche länger als 9 s.

## Design-Regeln für alle Szenen

- Helvena für alles, Headlines 700, riesig (Einzelwort bis 60 % Bildbreite). GeistMono nur für Uhrzeiten und Zahlen (tabular).
- Weiß #FFFFFF, Tinte #161613, Gelb #EFE683. Dunkel = #161613 mit weißer Schrift. Gelbe Fläche = Tinte-Schrift.
- Nie kursiv. Kein Gold, kein Verlauf, kein Glow, keine Partikel, kein Bokeh, keine Weltkugel, keine Stock-Menschen.
- Nur beuwy-eigene UI: Portal, Rechner, Report, Deal-Kanban, Wochenbericht. Kundenlogo-Platzhalter = neutrales „Ihr Logo"-Feld (Ausnahme: Case-Karten mit freigegebenem Kundennamen als Text).
- Motion Blur auf jeder schnellen Bewegung (Shutter 180°, 16 Subframes). Easing: expo-out für Ankünfte, expo-in für Abgänge.
- Ein Gedanke pro Bild.

---

## Szenen

### 1 · 0,0–4,0 s · dunkel · „Der Moment"
- **Sprecher:** „Es gibt Momente, … da ändert sich alles."
- **Betonung:** Pause 0,5 s nach „Momente". Leise, fast privat. „alles" tief und fallend, nicht laut.
- **Bild/Typo:** Schwarz. Ein einzelner weißer Punkt in der Mitte, 8 px. Bei „alles" Wort „alles." erscheint in Helvena 700, 280 px, weiß.
- **Animation:** Punkt pulsiert einmal (Scale 1→1,15→1). „alles." per Masken-Reveal von unten, Buchstaben 30 ms versetzt, leichter vertikaler Motion Blur.
- **Sound:** Stille 0,6 s, dann tiefer Sub-Drone (40 Hz) blendet ein. Einzelner trockener Uhr-Tick auf dem Punkt-Puls. Musik: Klavier, eine Note.

### 2 · 4,0–9,0 s · dunkel · „23:48"
- **Sprecher:** „Dreiundzwanzig Uhr achtundvierzig. … Ein Eigentümer bewertet sein Haus."
- **Betonung:** Uhrzeit sachlich, abgehackt. Pause 0,4 s. „Haus" am Satzende, leicht angehoben.
- **Bild/Typo:** Odometer-Uhr „23:48" in GeistMono, 420 px, weiß. Darunter klein (Helvena 500, 28 px, 60 % Weiß): „Ein Eigentümer. Sein Haus."
- **Animation:** Odometer: Ziffern rollen von 00:00 hoch mit vertikalem Motion Blur, rasten auf „23:48" mit 4 px Overshoot ein. Letzte Ziffer tickt einmal nach (47→48).
- **Sound:** Mechanisches Zählwerk-Rattern, jedes Einrasten ein Klick. Drone bleibt. Musik: zweite Klaviernote.

### 3 · 9,0–13,5 s · weiß · „Eine Minute später"
- **Sprecher:** „Eine Minute später hat er seinen Report. … Mit Ihrem Logo."
- **Betonung:** „Report" betont. Pause 0,3 s. „Ihrem" betont (nicht „Logo").
- **Bild/Typo:** Hart auf Weiß. iPhone-Silhouette (flach, Tinte-Rahmen) mit beuwy-Bewertungsrechner: Regler „Wohnfläche", „Baujahr", Button „Bewertung anfordern". Tap. Aus dem Handy fährt ein A4-Report nach vorn: Kopfzeile mit gelb hinterlegtem Feld „IHR LOGO", Wertspanne in GeistMono.
- **Animation:** Whip-Pan von links (Motion Blur 40 px) auf Weiß. Tap-Ripple (Tinte, 20 % Deckkraft). Report: 3D-Flug aus der Z-Tiefe (translateZ -800 → 0, rotateX 18° → 0), Schatten wächst mit. Highlighter-Strich in Gelb zieht über „IHR LOGO" (von links, 280 ms).
- **Sound:** Weißer Whoosh auf dem Pan. Soft-Tap. Papier-Swoosh beim Report. Kleiner Marker-Kratzer beim Highlighter. Musik: Pulse-Synth setzt ein, 96 BPM.

### 4 · 13,5–17,5 s · dunkel · „08:10"
- **Sprecher:** „Acht Uhr zehn. … Er ruft an. … Bei Ihnen."
- **Betonung:** Drei kurze Sätze, jeweils 0,3 s Luft. „Ihnen" ist das stärkste Wort des Hooks: tiefer, langsamer, mit einem Atemzug davor.
- **Bild/Typo:** Match-Cut: Report klappt weg, Odometer ist zurück, rollt 23:48 → 08:10. Dann eingehender Anruf in beuwy-UI auf dem Handy („Eingehender Anruf · Eigentümer, Bewertung von gestern"). Auf „Bei Ihnen." Schnitt auf Typo „Bei Ihnen." 320 px weiß.
- **Animation:** Odometer-Rollen mit starkem Motion Blur (Zeitraffer-Gefühl). Handy vibriert (2 px Shake, 3 Zyklen). „Bei Ihnen." per Scale 1,08 → 1,0 mit Blur 12 → 0 px.
- **Sound:** Schnelles Zählwerk-Rauschen, dann Handy-Vibration (zwei Pulse). Auf „Ihnen" Bass-Hit + Musik bricht ab (Cut to silence 0,4 s).

### 5 · 17,5–21,0 s · gelb · Musik-Moment + Titel
- **Sprecher:** „Ihr nächstes Mandat beginnt, … während Sie schlafen."
- **Betonung:** Pause nach „beginnt". „schlafen" weich, fallend, Lächeln in der Stimme.
- **Bild/Typo:** Volle gelbe Fläche. Tinte, Helvena 700, zweizeilig: „Ihr nächstes Mandat / beginnt, während Sie schlafen." Wort „schlafen" bekommt Unterstreichung in Tinte (4 px).
- **Animation:** Gelb wischt als Masken-Reveal diagonal über das Schwarz (Kante hart, kein Verlauf). Zeilen kommen Wort für Wort (RSVP-Takt, 90 ms), Unterstreichung zieht sich von links.
- **Sound:** Musik-Drop: voller Beat setzt auf dem Gelb ein. Tiefer Impact auf Szenenbeginn. Danach 1,0 s nur Musik (Stimme schweigt von 20,0–21,0).

### 6 · 21,0–26,0 s · dunkel · Produkt-Reveal
- **Sprecher:** (21,0–23,0 nur Musik) „Das ist das beuwy-System."
- **Betonung:** Langsam, feierlich, aber trocken. „System" am Ende betont. „beuwy" = „Boiwie".
- **Bild/Typo:** Schwarz. Ein Laptop mit dem beuwy-Portal (Kundenkonto, Suchaufträge, Objektkarten) dreht sich aus dem Profil ins Frontal, daneben das Handy mit Rechner, dahinter der Report. Alles in Tinte/Weiß/Gelb. Unter dem Geräte-Trio: „Das beuwy-System." Helvena 700, 120 px, weiß.
- **Animation:** Keynote-Reveal: Kamera fährt langsam (2 s) von extremer Nahaufnahme einer Portal-Kante zurück, 3D-Rotation rotateY 70° → 0°. Licht als harte weiße Kante, die über das Gerät wandert (Maske, kein Glow). Titel per Tracking-Animation (Laufweite 0,4 em → 0 em).
- **Sound:** Sub-Swell, dann ein einzelner metallischer Klang beim Einrasten auf Frontal. Musik atmet (Filter öffnet).

### 7 · 26,0–35,0 s · weiß · Feature-Salve
- **Sprecher:** „Marke. … Website. … Portal. … Reports. … Mailings. … CRM. … Bewertungsrechner. … Wochenbericht."
- **Betonung:** Jedes Wort einzeln, auf den Beat, gleiche Tonhöhe, Wochenbericht als Schlusswort fallend. Je ein Beat Abstand (ca. 1,1 s). Einzeln generiert mit multilingual_v2, im Schnitt auf die Beats gelegt.
- **Bild/Typo:** Pro Wort ein Frame. Links riesiges Wort (Helvena 700, 220 px, Tinte), rechts ein angeschnittener UI-Ausschnitt:
  - Marke → Logo-Konstruktion mit Raster, „Ihr Logo" entsteht
  - Website → Startseite im Browser-Rahmen, Scroll
  - Portal → Login „Kundenkonto", Suchauftrag gespeichert (Häkchen)
  - Reports → Report-Fächer, fünf Seiten spreizen sich auf
  - Mailings → E-Mail „Passend zu Ihrem Suchauftrag", mit Kundenlogo-Feld
  - CRM → Deal-Kanban, Karte wandert „Termin" → „Mandat"; Fußzeile klein, reiner Text: „Anbindung an onOffice, FLOWFACT, Propstack, JUSTIMMO, CasaOne" (keine Logos)
  - Bewertungsrechner → Regler, Wertspanne rollt als Odometer
  - Wochenbericht → Kennzahlen-Karte, Sparkline in Tinte, Zahl in GeistMono
- **Animation:** Harte Schnitte auf den Beat, jedes Wort kommt per horizontalem Whip mit Motion Blur (60 px → 0) und geht per Whip nach links. UI-Ausschnitte parallax 0,6× gegen das Wort. Auf „CRM" kurzer Frame-Flash auf dunkel (2 Frames) als Rhythmusbruch. Bei „Wochenbericht" bleibt das Bild 0,8 s stehen.
- **Sound:** Pro Wort ein Whoosh + Snap-Transient, alternierend links/rechts im Stereo. Bei „Wochenbericht" Snare-Roll endet in Stille.

### 8 · 35,0–39,5 s · weiß → dunkel · Beweis Makler
- **Sprecher:** „Ein Makler: … neun zusätzliche Mandate. … In drei Monaten."
- **Betonung:** „neun" betont, Zahl langsam. „drei Monaten" ruhig nachgeschoben.
- **Bild/Typo:** 3D-Karte (weiß, Tinte-Schrift) fliegt ins Bild: klein oben „RIEGEL Immobilien · Makler", groß „+9 Mandate", darunter „in 3 Monaten nach dem Relaunch".
- **Animation:** Karten-Whip: Karte kommt aus der Tiefe mit rotateY -35° → 0, Motion Blur. „9" als Odometer 0 → 9. Am Ende kippt die Karte nach rechts weg und reißt den Hintergrund auf Dunkel mit (Whip-Übergang).
- **Sound:** Karten-Whoosh, Odometer-Klicks (9), Bass-Tick auf der 9.

### 9 · 39,5–44,0 s · dunkel · Beweis Projektentwickler
- **Sprecher:** „Ein Projektentwickler: … von drei Personen auf vierzehnhundertfünfzig Wohneinheiten."
- **Betonung:** „drei" und „vierzehnhundertfünfzig" beide betont, Kontrast hörbar machen. Kurze Pause vor „vierzehnhundertfünfzig".
- **Bild/Typo:** Zweite Karte, dunkel (#161613, weiße Schrift, 1 px weiße Kante): „Vision Group · Projektentwicklung", groß „3 → 1.450", darunter „Wohneinheiten · 160 Mio. € Joint Venture mit KKR". Nur freigegebene Zahlen, keine Aussage zum heutigen Stand.
- **Animation:** Karte stapelt sich über die erste (Z-Offset, erste bleibt unscharf dahinter). „3" steht, dann rollt „1.450" im Odometer hoch (1,2 s), Pfeil zeichnet sich als Linie.
- **Sound:** Tieferer Karten-Whoosh, schnelles Zählwerk, Riser auf die Zahl.

### 10 · 44,0–48,5 s · gelb · Beweis Finanzvertrieb
- **Sprecher:** „Ein Finanzvertrieb: … von sechzig auf über zweitausenddreihundert Partner."
- **Betonung:** „zweitausenddreihundert" betont, „Partner" fallend.
- **Bild/Typo:** Gelbe Fläche, dritte Karte (weiß auf Gelb): „Königswege · Top 10 der deutschen Finanzvertriebe", groß „60 → 2.300+", darunter „Partner unter derselben Marke".
- **Animation:** Gelb schiebt sich als Masken-Wipe von unten. Karte whippt von rechts, stapelt sich. Odometer 60 → 2.300, Motion Blur auf den rollenden Ziffern, „+" erscheint als letzter Snap.
- **Sound:** Heller Whoosh, Zählwerk, Snap auf „+".

### 11 · 48,5–53,0 s · dunkel · Beweis Vertrieb / Gründer
- **Sprecher:** „Und unser Gründer? … Hat selbst dreihundertachtzig Wohnungen verkauft."
- **Betonung:** Frage leicht angehoben, Pause 0,4 s. „selbst" betont (das Aha für Vertriebe).
- **Bild/Typo:** Alle drei Karten fächern sich auf und weichen zur Seite. Mitte: „380" GeistMono 380 px, weiß. Darunter: „Wohnungen. Selbst verkauft." Klein darunter (60 % Weiß): „Alexander Pütter · 17 Jahre Markenarbeit · Bosch, Continental, Michelin". Keine Person im Bild (kein KI-Porträt).
- **Animation:** Karten-Fächer (Report-Fächer-Motiv aus v2) spreizt 3 Karten in Z, dreht sie weg. „380" per o-Zoom: die Kamera fliegt durch die „0" von „380" auf die nächste Szene (Zoom durch Buchstaben).
- **Sound:** Fächer-Swoosh, Moment Stille, dann Schlag. Zoom-Whoosh mit Pitch-Anstieg in den Übergang.

### 12 · 53,0–57,5 s · weiß · Sechs Wochen, schriftlich
- **Sprecher:** „Live in sechs Wochen. … Den Termin bekommen Sie schriftlich."
- **Betonung:** „sechs" betont. „schriftlich" als Schlusswort, fest.
- **Bild/Typo:** Aus der „0" heraus: Weiß. Zeitleiste mit sechs Kästchen (Woche 1–6), füllt sich in Gelb. Am Ende Stempel in Tinte: „schriftlich zugesagt".
- **Animation:** Fortschritt füllt sich Kästchen für Kästchen auf die Beats. Stempel fällt aus Scale 1,6 → 1,0 mit 3 Frames Motion Blur und 2 px Bild-Shake.
- **Sound:** Sechs Ticks im Beat, Stempel-Thump.

### 13 · 57,5–60,0 s · weiß · Aufwand danach
- **Sprecher:** „Danach: dreißig Minuten Abstimmung pro Woche."
- **Betonung:** „dreißig Minuten" betont, entspannt gesprochen.
- **Bild/Typo:** „30 Min." GeistMono 300 px, Tinte. Darunter „Abstimmung pro Woche". Nichts sonst.
- **Animation:** Stempel zoomt raus, Timer-Ring (1 px Tinte) zeichnet sich um die 30 in 1,5 s. Dann Abblende auf Schwarz in 4 Frames.
- **Sound:** Leiser Timer-Tick. Musik fällt auf Pad zurück, Beat stoppt am Szenenende.

### 14 · 60,0–62,0 s · dunkel · „Eins noch."
- **Sprecher:** (60,0–60,8 Stille) „Eins noch."
- **Betonung:** Leise, fast beiläufig, mit angedeutetem Lächeln. Keynote-Moment.
- **Bild/Typo:** Schwarz. „Eins noch." Helvena 500, 96 px, weiß, klein in der Mitte.
- **Animation:** Nur Opacity 0 → 1 in 400 ms. Keine Bewegung. Der ruhigste Moment im Film.
- **Sound:** Totale Stille 0,8 s, dann nur Raumton.

### 15 · 62,0–66,0 s · gelb · Gebietsschutz
- **Sprecher:** „Pro Stadt arbeiten wir mit einem einzigen Büro. … Mit einem."
- **Betonung:** „einzigen" betont. Pause 0,5 s. „Mit einem." langsam, trocken, fast geflüstert.
- **Bild/Typo:** Gelb knallt rein. Odometer aus Städtenamen (Helvena 700, Tinte) rollt vertikal: München, Hamburg, Köln, Frankfurt, Stuttgart … stoppt auf „Ihre Stadt." Daneben riesige „1" in GeistMono. Darunter klein: „Ein Büro pro Stadt. Vertraglich."
- **Animation:** Städte-Walze mit starkem vertikalem Motion Blur, Bremskurve expo-out, rastet mit Overshoot. „1" per Masken-Reveal von unten.
- **Sound:** Beat kehrt voll zurück (Drop 2). Walzen-Rattern, Einrast-Klack, Bass-Hit auf „1".

### 16 · 66,0–72,0 s · weiß · Logo-Sting + CTA
- **Sprecher:** „beuwy. … Zusammenarbeit anfragen."
- **Betonung:** „beuwy" = „Boiwie", ruhig, selbstbewusst. Pause 0,6 s. „anfragen" fallend, abgeschlossen.
- **Bild/Typo:** Weiß. beuwy-Wortmarke (Tinte) in der Mitte. Darunter klein: „Unternehmensberatung für Immobilienunternehmen". Dann Button-Pill in Gelb mit Tinte-Schrift „Zusammenarbeit anfragen", darunter „beuwy.com".
- **Animation:** Logo-Zoom rückwärts: Kamera kommt aus dem Inneren des „b" (o-Zoom-Umkehr), Wortmarke settled mit Blur 20 → 0 px. Pill fährt von unten ein (translateY 24 px, 400 ms, expo-out), gelber Highlighter-Strich läuft einmal unter „beuwy.com". Letzte 1,5 s Standbild.
- **Sound:** Logo-Sting: tiefer Impact + kurzes Klavier-Motiv (drei Töne, das Motiv aus Szene 1 aufgelöst). Klick-Sound auf der Pill. Musik endet auf Ton, 1,2 s Ausklang.

---

## Sprechtext am Stück (für ElevenLabs)

```
Es gibt Momente, [pause] da ändert sich alles.
Dreiundzwanzig Uhr achtundvierzig. Ein Eigentümer bewertet sein Haus.
Eine Minute später hat er seinen Report. Mit Ihrem Logo.
Acht Uhr zehn. Er ruft an. [pause] Bei Ihnen.
Ihr nächstes Mandat beginnt, während Sie schlafen.
Das ist das beuwy-System.
Marke. Website. Portal. Reports. Mailings. CRM. Bewertungsrechner. Wochenbericht.
Ein Makler: neun zusätzliche Mandate. In drei Monaten.
Ein Projektentwickler: von drei Personen auf vierzehnhundertfünfzig Wohneinheiten.
Ein Finanzvertrieb: von sechzig auf über zweitausenddreihundert Partner.
Und unser Gründer? Hat selbst dreihundertachtzig Wohnungen verkauft.
Live in sechs Wochen. Den Termin bekommen Sie schriftlich.
Danach: dreißig Minuten Abstimmung pro Woche.
[pause] Eins noch.
Pro Stadt arbeiten wir mit einem einzigen Büro. [pause] Mit einem.
beuwy. Zusammenarbeit anfragen.
```
Jede Zeile als eigene Datei generieren (Dateiname `k01.mp3` … `k16.mp3`), Feature-Salve als acht Einzelwörter, damit sie exakt auf die Beats gelegt werden kann. Tags nur englisch, max. ein Tag pro Zeile.

## Claim-Prüfung (nur freigegebene Fakten)

| Aussage im Film | Status | Quelle |
|---|---|---|
| 23:48 bewertet, Report mit Logo, 08:10 Anruf | Szenario aus freigegebenem Hook A | VSL-EXPLAINER-v2 Z.76 |
| RIEGEL +9 Mandate in 3 Monaten | freigegeben | VSL-EXPLAINER-v2 §6b; content.ts Z.69 |
| Vision Group 3 → 1.450 WE, 160 Mio. € JV mit KKR | freigegeben, ohne Aktualitätsbehauptung | content.ts Z.270 |
| Königswege 60 → 2.300+ Partner, Top 10 Finanzvertriebe | freigegeben | content.ts Z.72, 270–272 |
| Gründer 380 Wohnungen selbst verkauft, 17 Jahre Markenarbeit | freigegeben | marketing-kapitalanlage-immobilien.ts; content.ts Z.245 |
| Live in sechs Wochen, Termin schriftlich | freigegeben (4–6 Wochen) | VSL-EXPLAINER-v2 Z.108 |
| 30 Minuten Abstimmung pro Woche | freigegeben, nur Abstimmung | VSL-EXPLAINER-v2 §6b |
| Ein Büro pro Stadt | freigegeben (Alex 23.09.) | VSL-EXPLAINER-v2 §2.2 |

Bewusst **nicht** verwendet: 2.100 Beurkundungen, 5–40 Mehrmandate, 10 Mandate/Monat, 90 % KI-Box, Preis 27.900 €, „ohne Zeitaufwand", „ohne Werbekosten", Vergleichs-Superlative, Konkurrenz-Namen, „Agentur", „Partner" für beuwy selbst (Wort „Partner" nur als Königswege-Vertriebspartner-Zahl), „zwei Termine" vs. „vier Termine" (Widerspruch offen), „40+/100+ Projekte" (Widerspruch offen).

## Offene Punkte für Alex

1. **„Eins noch" = künftiges Angebot?** Es gibt keine dokumentierte Roadmap. Das Skript nutzt deshalb den freigegebenen Gebietsschutz. Sobald Sie zwei, drei Sätze zu einem künftigen Angebot freigeben (etwa für Finanzdienstleister oder KI-Abläufe), tauschen wir nur Szene 15 aus. Platzhalter-Struktur: „Eins noch." → „Ab [Monat]: [Angebot in drei Wörtern]." → gleiche Walzen-Animation mit Angebotsname statt Städten.
2. **Finanzdienstleister:** Belegt nur über den Königswege-Case (Finanzvertrieb). Reicht das?
3. **CRM-Namen als Text** in Szene 7 (keine Logos): ok, oder lieber ganz raus?
4. **„Sechs Wochen"** gesprochen, obwohl die Spanne 4–6 Wochen ist: die konservative Zahl, bewusst gewählt.
