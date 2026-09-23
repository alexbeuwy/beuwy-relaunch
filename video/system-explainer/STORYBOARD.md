---
format: 1920x1080
duration: 140s
message: "Was in Ihrem Büro liegen bleibt, holt sich der Makler mit System. In sechs Wochen haben Sie es selbst, einmal pro Stadt."
arc: Status → Lücke → Verlust → Bedrohung (was der andere hat) → Wende → Beweis → Aufwand → Knappheit → Handlung
audience: Inhaber kleiner und mittlerer Maklerbüros, 40–60, Geschäft läuft, keine Zeit
mode: collaborative
---

# System-Explainer beuwy · Storyboard v2

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

- scene: Weiß. „Ihr Geschäft läuft." setzt sich Wort für Wort.
- duration: 4s
- transition_in: cut
- status: built
- voiceover: "Ihr Geschäft läuft. Die Objekte gehen weg, die Kunden empfehlen Sie weiter."
- src: compositions/01-status.html

Warum: Respekt zuerst. Der Leser nickt, bevor er etwas hört, das wehtut.

## Frame 2 — Die Frage

- scene: „Aber was bleibt liegen?" Gelber Highlighter wischt über „liegen".
- duration: 4s
- transition_in: cut
- status: built
- voiceover: "Aber seien Sie ehrlich: Was bleibt liegen?"
- src: compositions/02-frage.html

Warum: Die Lücke öffnen. Frage statt Behauptung, der Leser beantwortet sie selbst.

## Frame 3 — Der Stapel

- scene: Vier Aufgabenkarten mit Zeitstempel stapeln sich leicht schräg.
- duration: 12s
- transition_in: cut
- status: built
- voiceover: "Die Bewertungsanfrage von Freitagabend. Der Suchkunde vom März. Das Nachfassen nach der Besichtigung. Der Eigentümer, der noch nicht so weit war."
- src: compositions/03-stapel.html

Warum: Szenen statt Zahlen. Jeder Makler erkennt mindestens zwei Karten wieder. Hero-Prop wird eingeführt.

## Frame 4 — Verlust

- scene: „Was liegen bleibt, holt sich ein anderer." Stapel rechts unten.
- duration: 7s
- transition_in: cut
- status: built
- voiceover: "Das Problem ist nicht die Arbeit. Das Problem ist: Was liegen bleibt, holt sich ein anderer."
- src: compositions/04-verlust.html

Warum: Aus Unordnung wird Verlust. Wendepunkt der Emotion.

## Frame 5 — Der andere

- scene: Neutrale Stadtkarte, zwei Pins. „Ihr Büro" grau, „Der andere" gelb. Karten fliegen vom grauen zum gelben Pin.
- duration: 8s
- transition_in: crossfade
- status: built
- voiceover: "Der Makler in Ihrer Stadt, der schon ein System hat. Er ist nicht besser als Sie. Nur schneller, und ihm rutscht nichts durch."
- src: compositions/05-der-andere.html

Warum: Kein Feindbild, sondern ein Spiegel. Callback auf Frame 3 (Stapel wandert).

## Frame 6 — Rechner

- scene: „Sein Rechner sammelt Eigentümer. Auch nachts." Uhr 23:48, Rechner-Schritte als Platzhalterblock, neuer Kontakt ploppt auf.
- duration: 7s
- transition_in: wipe-left
- status: built
- voiceover: "Sein Rechner sammelt Eigentümer, auch nachts."
- src: compositions/06-rechner.html

## Frame 7 — Report

- scene: „Jeder Eigentümer bekommt in 60 Sekunden seinen Report." PDF fliegt ins Postfach, Chips: Name, Adresse, Bodenrichtwert, Luftbild, Logo.
- duration: 8s
- transition_in: wipe-left
- status: built
- voiceover: "Jeder bekommt in sechzig Sekunden seinen Report. Mit Wert, Bodenrichtwert und Luftbild seines Hauses."
- src: compositions/07-report.html

Wahr: PDF 5–9 Seiten, Luftbild, Bodenrichtwerte live (RIEGEL-Repo).

## Frame 8 — Konto

- scene: „Käufer legen bei ihm ein Konto an. Mit Suchauftrag." Konto-Karte mit Präferenzen, neues Objekt → Mail „passt zu Ihrem Suchauftrag".
- duration: 7s
- transition_in: wipe-left
- status: built
- voiceover: "Käufer legen bei ihm ein Konto an und hinterlegen, was sie suchen. Passt ein neues Objekt, geht die Mail von selbst raus."
- src: compositions/08-konto.html

## Frame 9 — Heatmap

- scene: „Er sieht, wo Eigentümer wirklich klicken." Heatmap-Punkte legen sich über eine Seitenskizze.
- duration: 7s
- transition_in: wipe-left
- status: built
- voiceover: "Und er sieht, wo Eigentümer auf seiner Seite wirklich klicken."
- src: compositions/09-heatmap.html

## Frame 10 — Wende

- scene: Harter Schnitt auf Weiß. „Dieses System gibt es jetzt für Ihr Büro." Highlighter auf „Ihr Büro".
- duration: 5s
- transition_in: cut
- status: built
- voiceover: "Dieses System gibt es jetzt für Ihr Büro."
- src: compositions/10-wende.html

## Frame 11 — Entlastung (gehalten)

- scene: „Sie müssen dafür nichts über KI wissen." Der Stapel aus Frame 3 löst sich Karte für Karte auf. Zwei Sekunden Stille im Bild.
- duration: 7s
- transition_in: cut
- status: built
- voiceover: "Sie müssen dafür nichts über KI wissen. Und Sie richten nichts davon selbst ein."
- src: compositions/11-entlastung.html

## Frame 12 — RIEGEL live

- scene: „So sieht das aus. Live bei RIEGEL Immobilien." Browser-Rahmen, echte Screens wechseln: Rechner, Objektliste, Preisatlas, Konto. Unterzeile „Rechner kalibriert mit 489 echten Abschlüssen".
- duration: 16s
- transition_in: crossfade
- status: built
- voiceover: "So sieht das aus, live bei RIEGEL Immobilien in Speyer. Der Rechner ist mit 489 echten Abschlüssen kalibriert. Dazu das eigene Portal, der Preisatlas, rund 95 Seiten für Google und KI-Suche."
- src: compositions/12-riegel.html

Wahr: alle Screens echt (riegel-immobilien.de, 23.09).

## Frame 13 — Ergebnis

- scene: Zähler 0 → 9, darunter „zusätzliche Mandate in den ersten 3 Monaten". Zweite Zeile zählt hoch: „rund 257.000 € Courtage-Potenzial". Fußnote klein: Rechenweg (9 × Ø-Preis RIEGEL laut Capital × Provision) und „Mandate, noch keine Abschlüsse".
- duration: 11s
- transition_in: cut
- status: built
- voiceover: "Das Ergebnis: neun zusätzliche Mandate in den ersten drei Monaten. Bei einem durchschnittlichen Hauspreis von 400.000 Euro sind das rund 257.000 Euro Courtage-Potenzial. Schon ein verkauftes Mandat bezahlt das System."
- src: compositions/13-ergebnis.html

Wahr: Mandate laut Alex (23.09). Ø-Hauspreis 400.000 € aus dem Capital-Makler-Ranking (RIEGEL, Speyer, Schwerpunkt Haus). 400.000 € × 7,14 % = 28.560 € je Mandat; 9 × 28.560 € = 257.040 €. Potenzial, als Rechnung gekennzeichnet. Quelle: Capital-Makler-Ranking, Ausgabe 09/2026.

## Frame 14 — Aufwand

- scene: „Sie liefern zwei Termine und Ihre Fotos." Zwei Kalenderblätter, Fotostapel.
- duration: 8s
- transition_in: wipe-left
- status: built
- voiceover: "Was Sie tun müssen? Zwei Termine und Ihre Fotos. Den Rest bauen wir."
- src: compositions/14-aufwand.html

## Frame 15 — Zeit

- scene: „In sechs Wochen läuft es. An Ihrer Maklersoftware." Balken 6 Wochen, Chips onOffice · FLOWFACT · Propstack.
- duration: 8s
- transition_in: wipe-left
- status: built
- voiceover: "In sechs Wochen läuft es, angebunden an Ihre Maklersoftware."
- src: compositions/15-zeit.html

## Frame 16 — Einmal pro Stadt

- scene: Stadtkarte aus Frame 5 zoomt raus: Deutschland, einzelne Städte vergeben (gelb). „Einmal pro Stadt."
- duration: 9s
- transition_in: crossfade
- status: built
- voiceover: "Wir bauen das System in jeder Stadt nur einmal. Wer zuerst startet, hat die Stadt."
- src: compositions/16-stadt.html

Callback auf Frame 5 (Karte). Wahr: vergebene Städte nur echte Kunden.

## Frame 17 — Ist Ihre noch frei?

- scene: Das Stadt-Feld der Seite: Cursor tippt, gelber Knopf „Verfügbarkeit prüfen". Headline „Ist Ihre noch frei?". Endbild bleibt 2 s.
- duration: 10s
- transition_in: cut
- status: built
- voiceover: "Prüfen Sie jetzt direkt unter diesem Video, ob Ihre Stadt noch frei ist."
- src: compositions/17-cta.html

Übergabe an den echten Knopf unter dem Video. Kein statisches Endcard-Logo.
