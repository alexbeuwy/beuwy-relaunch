# Film 5 · Winkel „Traumtag“ — Skript

**Titel:** Der andere Tag
**Winkel:** Emotionaler Traumzustand. Ein Tag im Leben eines Marktführers mit beuwy, gegen den alten Alltag. Die Uhr ist der Erzähler.
**Dauer:** 70 s · 118 Wörter VO (≈ 1,7 W/s, Spitze 2,2 W/s in Szene 9) · drei stimmlose Musik-Momente (Umschalter, Logo-Zoom, Sting)
**Format:** 16:9 Master (1920×1080), Safe-Area für 9:16-Reframe, 60 fps (Motion Blur braucht es)

## Idee (ein Satz)

Der Zuschauer soll danach glauben: Mein Tag könnte anders laufen. Die Eigentümer rufen mich an, nachts arbeitet ein System, und in meiner Stadt bin ich die Marke.

## Roter Faden

Eine riesige Odometer-Uhr (GeistMono, tabellarisch) führt durch den Film. Zwei Tage, gleiche Uhr.
1. **Alter Tag (0–18 s):** 23:12, ein Eigentümer vergleicht am Handy drei Makler. Morgens sechs Stunden Wertermittlung, Portalanfrage geteilt. Hell, aber kühl, Tempo nervös.
2. **Umschalter (18–21 s):** Gelbe Fläche, Uhr dreht rückwärts auf 23:14. Stille, dann Bass.
3. **Neuer Tag (21–44 s):** Nachts bewertet der Eigentümer auf Ihrer Seite, Report mit Ihrem Logo, 8:10 Anruf. Hero-Satz. Beweis RIEGEL.
4. **Größer denken (44–56 s):** Ein System trägt Makler, Bauträger, Vertriebe, Finanzvertriebe. Karten-Whip mit Cases. Aufbau 4–6 Wochen, danach 30 Min/Woche.
5. **Stolz (56–65 s):** 18:00, Feierabend. Pro Stadt ein Büro. „Sie sind die Marke Ihrer Stadt.“
6. **Sting + CTA (65–70 s).**

VSL-Mapping: Hook (1–2) → Problem (3–4) → Abgrenzung (5–9) → Beweis (10–11) → Qualifizierung (12–14) → CTA (15).

## Stimme & Regie (gesamt)

- ElevenLabs **eleven_v3**, Stabilität „Natural“ (≈ 0,5), deutsche männliche Stimme, tief-ruhig, 45+, Keynote-Sprecher. Kein Radio-Werbe-Ton, kein Lächeln in der Stimme. Szenen 3 und 9 zusätzlich in **multilingual_v2** rendern (präzise Pausen), bessere Take nehmen.
- „beuwy“ = **„Boiwie“** /ˈbɔʏviː/ (Pronunciation Dictionary v3, Alias in v2).
- Zahlen ausgeschrieben im VO, als Ziffern auf dem Screen.
- Tags englisch, max. 1–2 pro Szene. `[pause]` = ca. 0,4 s.
- Master: ffmpeg-Kette „Apple-Spot“ (trocken, wenig Bass), -16 LUFS; Musik unter VO um 8–10 dB geduckt.
- Musik: minimaler Puls (Pizzicato/Clock-Tick 96 BPM) im alten Tag, ab Szene 5 warmer Synth-Pad + Kick, Drop auf Szene 9, Stille vor dem Sting.

---

## Szenen

| # | Zeit | Grund | Sprecher (exakt) | Betonung / Pausen | Bild / Typo | Animation | Sound |
|---|------|-------|------------------|-------------------|-------------|-----------|-------|
| 1 | 0,0–3,5 | dunkel | „Dreiundzwanzig Uhr zwölf.“ | **zwölf** fallend, danach 0,6 s Luft | Weißes Odometer „23:12“, GeistMono 420 px, zentriert, sonst nichts | Ziffern rollen von 00:00 hoch, vertikaler Motion Blur pro Rolle, letzte Rolle rastet mit 2 % Overshoot | Uhrwerk-Tick 96 BPM, Rastgeräusch „klack“ auf Stopp |
| 2 | 3,5–8,5 | dunkel | „Ein Eigentümer vergleicht drei Makler. [pause] Am Handy. Im Bett.“ | **drei** tragen; Pausen nach „Makler“ und „Handy“; „Im Bett“ leise, fast privat | Uhr schrumpft nach oben links. Hochformat-Handy (beuwy-eigene UI, neutrale Platzhalter-Websites „Makler A / B / C“, graue Blöcke, keine echten Marken) | Push-in auf Handy, drei Website-Karten wischen horizontal durch (Whip, 8 px Motion Blur), Daumen-Scroll-Rhythmus | Leises Swipe ×3, Tick läuft weiter |
| 3 | 8,5–12,0 | weiß | „Er ruft den an, der besser aussieht.“ | **besser aussieht** ans Ende, 0,5 s Luft danach | Harte Umblende auf Weiß. Typo schwarz, 180 px: „Er ruft den an, der besser aussieht.“ Wortweise | Wort-für-Wort-Reveal per Maske von unten (RSVP-Takt), „besser aussieht“ bekommt gelben Highlighter-Strich, der von links einläuft | Whoosh auf Schnitt, Marker-Strich-Geräusch |
| 4 | 12,0–18,0 | weiß | „Und Ihr Tag? [pause] Sechs Stunden Wertermittlung. Kostenlos. [pause] Die Portalanfrage geht an bis zu drei Makler.“ | Fragend-trocken auf „Ihr Tag“; **Kostenlos** kalt und kurz; **drei** am Ende | Uhr unten rechts springt 09:00 → 15:00. Zwei Zeilen nacheinander, jeweils Fokus: „6 Std. Wertermittlung. 0 Auftrag.“ dann Portal-Anfrage-Karte, die sich in drei identische Kopien teilt | Odometer rattert schnell (Blur), dann Karten-Split: eine Karte teilt sich per Scale-Duplicate in drei, die auseinanderdriften; Bild wirkt leicht zu voll (bewusst) | Tick verdoppelt sich (Stress), Papier-Rascheln, drei kurze Ping-Duplikate |
| 5 | 18,0–21,0 | gelb | „Jetzt der andere Tag.“ | Ruhiger, tiefer; **andere** betont; danach 1,2 s stimmlos | Gelbe Vollfläche #EFE683, Tinte #161613. Nur die Uhr: rollt RÜCKWÄRTS auf „23:14“ | Gelb wischt als Maske von rechts über das volle Bild (Whip-Pan, 24 px Blur), alles Alte fliegt raus; Uhr dreht rückwärts, Rast | Rewind-Tape-Sweep, 0,4 s Stille, dann Sub-Bass-Hit + Pad setzt ein |
| 6 | 21,0–26,5 | dunkel | „Dreiundzwanzig Uhr vierzehn. [pause] Er bewertet sein Haus. Auf Ihrer Seite.“ | **Ihrer** hart betont, Satzende tief | beuwy-Bewertungsrechner-UI im Handy, Kundenmarke als Platzhalter „IHR LOGO“. Mikro-Zeile auf dem Screen: „Kalibriert mit 489 echten Abschlüssen + amtlichen Bodenrichtwerten (Case RIEGEL)“ | 3D-Kamerafahrt um das Handy (15° Drehung), Formularfelder füllen sich im Takt, Schieberegler gleitet, Wert-Zahl zählt hoch (Odometer) | Weiche UI-Taps im Takt, Pad steigt |
| 7 | 26,5–30,5 | dunkel | „Der Report kommt sofort. [pause] Mit Ihrem Logo.“ | **sofort** knapp; **Logo** ans Ende, lächelnd-sicher | Report-PDF fliegt aus dem Handy, fächert sich in 4 Seiten auf, jede Seite mit „IHR LOGO“ oben rechts | Report-Fächer: Seiten rotieren aus der Tiefe (Z-Achse), 12 px Motion Blur, Logo-Fläche blitzt gelb auf (Fläche, kein Glow) | Papier-Flip ×4, E-Mail-Ding |
| 8 | 30,5–35,0 | weiß | „Acht Uhr zehn. [pause] Ihr Telefon klingelt. [pause] Er kennt Sie schon.“ | **schon** betont, leicht warm | Weiß. Odometer „08:10“ rollt aus Nacht in Tag. Großes Handy frontal: eingehender Anruf „Eigentümer · Report von gestern Nacht“ | Match-Cut: dunkles Handy wird per Farbwechsel weiß (Übergang über das Handy-Display), Handy vibriert (Shake 3 px, 6 Hz) | Klingelton (eigener, zwei Töne), Vibrations-Summen |
| 9 | 35,0–40,5 | weiß → gelb | „Ihr nächstes Mandat beginnt, [pause] während Sie schlafen.“ | Langsam, **[slows down]** vor „während“; **schlafen** tief und leise | Hero-Typo 220 px, zwei Zeilen: „Ihr nächstes Mandat beginnt,“ / „während Sie schlafen.“ „schlafen“ auf gelbem Highlighter | Zoom durch das „o“ aus „Telefon“-Zeile der Vorszene in die Headline; Zeile 2 per Masken-Reveal; bei „schlafen“ wird die ganze Fläche gelb (Wipe aus dem Highlighter heraus) | Musik-DROP auf „schlafen“: Kick + Bass, danach 1 s Musik ohne Stimme |
| 10 | 40,5–45,0 | gelb | „RIEGEL Immobilien. [pause] Neun zusätzliche Mandate. In drei Monaten.“ | **Neun** kräftig; **drei Monaten** fallend | Gelb, Tinte. Odometer „9“ in 480 px, darunter „zusätzliche Mandate in 3 Monaten nach dem Relaunch · RIEGEL Immobilien“. Kein Ranking-Award | Ziffer rollt 0 → 9 mit Blur und Rast; Unterzeile tippt per Masken-Reveal ein | Mechanischer Zähler-Rattern, Rast-Klack, Kick auf der 9 |
| 11 | 45,0–51,0 | dunkel | „Das gleiche System trägt auch Bauträger, Vertriebe und Finanzvertriebe.“ | **trägt** betont; Aufzählung ohne Sing-Sang, Satzende **Finanzvertriebe** klar | Vier 3D-Karten (weiß auf dunkel) whippen nacheinander ins Bild: MAKLER „9 Mandate / 3 Monate“ · BAUTRÄGER „3 Personen → 1.450 Wohneinheiten · Vision Group“ · VERTRIEBE „380 Wohnungen · 15 Vertriebsleute · acta“ · FINANZVERTRIEBE „60 → 2.300+ Partner · Königswege“ | Karten-Whip: jede Karte kommt mit horizontalem Whip (32 px Blur, 0,35 s), stapelt sich leicht versetzt in 3D (Perspektive 1200 px), Zahlen je als kurzer Odometer | Vier Whooshes im Beat, pro Karte ein Ziffern-Klack |
| 12 | 51,0–56,0 | weiß | „Aufgebaut in vier bis sechs Wochen. [pause] Danach: dreißig Minuten Abstimmung pro Woche.“ | **Wochen** fest; **dreißig Minuten** betont, ruhig | Weiß. Zwei Zahlen nacheinander, riesig: „4–6 Wochen“ (Mikro: „Termin schriftlich zugesagt“), dann „30 Min./Woche“. Dahinter halbtransparent: beuwy-CRM-Kanban, Karten wandern von „Anfrage“ nach „Mandat“ | Kanban-Karten gleiten automatisch nach rechts (Parallax, leichter Blur), Zahlen per Masken-Reveal; Wechsel 4–6 → 30 per vertikalem Roll | Leichte Kalender-Klicks, Karten-Slide-Geräusche |
| 13 | 56,0–59,5 | dunkel | „Achtzehn Uhr. [pause] Feierabend.“ | **Feierabend** warm, gelöst, fast ein Ausatmen | Odometer „18:00“ weiß auf dunkel, darunter klein: „Das System arbeitet weiter.“ | Uhr rollt 08:10 → 18:00 in einem Zug (starker Blur), Rast, dann langsamer Zoom-out (Ruhe) | Tick stoppt. Ein weicher Pad-Akkord, 1 s Stille-Anteil |
| 14 | 59,5–65,0 | gelb | „Pro Stadt arbeiten wir mit einem Büro. [pause] Sie sind die Marke Ihrer Stadt.“ | **einem** betont; nach Pause Ego-Satz langsamer, **Ihrer Stadt** ans Ende, stolz | Gelb. Zeile 1 klein oben: „1 Büro pro Stadt.“ Dann 200 px: „Sie sind die Marke Ihrer Stadt.“ Stadt-Wort als Platzhalter, der kurz durch Städte-Namen rollt und auf „Ihrer Stadt“ stehen bleibt | Slot-Machine-Roll der Städtenamen (vertikaler Blur), Stopp auf „Ihrer Stadt“ mit Overshoot; Gesamtbild atmet (Scale 1,00 → 1,03) | Anschwellen Musik zum Höhepunkt, Rast-Klack auf Stopp |
| 15 | 65,0–70,0 | weiß | „beuwy. [pause] Zusammenarbeit anfragen.“ | „beuwy“ = **Boiwie**, ruhig, stolz; CTA sachlich, keine Werbestimme | beuwy-Logo-Sting: Wortmarke Helvena, Tinte auf Weiß, gelber Punkt/Akzent. Darunter Button-Pill „Zusammenarbeit anfragen“ (gelb, Tinte), darunter „beuwy.com“ | Logo-Zoom: Kamera fliegt aus dem „o“ von „Stadt“ heraus, Wortmarke baut sich per Masken-Reveal auf, Button schiebt von unten (Motion-Token ease-out), 1 s Standbild am Ende | 0,3 s Stille vor Sting, dann Sting (tiefer Ton + heller Klick), Musik endet sauber auf dem Button |

---

## Sprechertext am Stück (für ElevenLabs)

```
Dreiundzwanzig Uhr zwölf.
Ein Eigentümer vergleicht drei Makler. [pause] Am Handy. Im Bett.
Er ruft den an, der besser aussieht.
Und Ihr Tag? [pause] Sechs Stunden Wertermittlung. Kostenlos. [pause] Die Portalanfrage geht an bis zu drei Makler.
Jetzt der andere Tag.
Dreiundzwanzig Uhr vierzehn. [pause] Er bewertet sein Haus. Auf Ihrer Seite.
Der Report kommt sofort. [pause] Mit Ihrem Logo.
Acht Uhr zehn. [pause] Ihr Telefon klingelt. [pause] Er kennt Sie schon.
Ihr nächstes Mandat beginnt, [slows down] während Sie schlafen.
RIEGEL Immobilien. [pause] Neun zusätzliche Mandate. In drei Monaten.
Das gleiche System trägt auch Bauträger, Vertriebe und Finanzvertriebe.
Aufgebaut in vier bis sechs Wochen. [pause] Danach: dreißig Minuten Abstimmung pro Woche.
Achtzehn Uhr. [pause] Feierabend.
Pro Stadt arbeiten wir mit einem Büro. [pause] Sie sind die Marke Ihrer Stadt.
Boiwie. [pause] Zusammenarbeit anfragen.
```

Jede Zeile als eigene Generation rendern (Szenen-Timing im Schnitt steuerbar), 3 Takes pro Zeile, beste wählen.

## Fakten-Check (nur freigegeben)

| Aussage im Film | Status | Quelle |
|---|---|---|
| Eigentümer vergleicht abends am Handy / ruft den an, der besser aussieht | Schmerz-Beleg B1 | HOOKS-v3.md |
| 6 Std. Wertermittlung kostenlos (Quelle: 6–8 Std.) | untere Grenze, belegt | HOOKS-v3.md B7 |
| Portalanfrage an bis zu 3 Makler | belegt | HOOKS-v3.md B6 |
| Nächtliche Bewertung, sofortiger Report mit Logo, Anruf am Morgen | freigegebener Nutzen | VSL-EXPLAINER-v2 Hook A |
| 489 echte Abschlüsse + Bodenrichtwerte (RIEGEL) | freigegeben | cases-detail.ts |
| RIEGEL 9 zusätzliche Mandate in 3 Monaten | freigegeben | VSL-EXPLAINER-v2 §6b |
| Vision Group 3 → 1.450 WE | freigegeben, ohne Aktualitätsbehauptung | content.ts |
| acta 380 Wohnungen, 15 Vertriebsleute | freigegeben (Alex' eigener Vertrieb) | marketing-kapitalanlage-immobilien.ts |
| Königswege 60 → 2.300+ Partner | freigegeben | content.ts |
| 4–6 Wochen, Termin schriftlich | freigegeben | Angebote heute |
| 30 Min. Abstimmung pro Woche | freigegeben, nur Abstimmung | VSL-EXPLAINER-v2 §6b |
| Ein Büro pro Stadt | freigegeben (Alex 23.09.) | VSL-EXPLAINER-v2 §2.2 |

Nicht verwendet: Platz 21 von 25.000 (nicht als beuwy-Erfolg), 160 Mio. € JV (Aktualität), 2.100 Beurkundungen, 10 Mandate/Monat, Preis, Konkurrenz-Namen, Superlative. Kein „Agentur“, kein „Partner“, kein „ohne Zeitaufwand“.

## Offene Punkte für Alex

1. **„18:00 Feierabend“** ist ein Traumbild, keine Zusage. Der Satz „Das System arbeitet weiter“ auf dem Screen fängt das auf, zusammen mit den 30 Min./Woche in Szene 12. Trotzdem: freigeben?
2. **Künftige Angebote:** Es gibt keine dokumentierte Roadmap. Optionaler 3-s-Slot nach Szene 11 (Film dann 73 s), sobald Alex 1 Satz liefert. Arbeitsvorschlag nur als Platzhalter, nicht freigegeben: „Was die KI täglich neu kann, bauen wir Ihnen in feste Abläufe.“
3. **Finanzdienstleister:** Im VO steht „Finanzvertriebe“, weil nur der Königswege-Case belegt ist. Wenn Versicherungs- oder Baufinanzierungs-Berater gemeint sind, braucht es einen eigenen Beleg.
4. **Szene 2/4 Handy-Websites:** nur neutrale Platzhalter, keine realen Makler-Seiten.
5. **Kundenlogo:** Im Film steht „IHR LOGO“. Wenn RIEGEL-Logo gezeigt werden soll, braucht es die Freigabe von RIEGEL.
