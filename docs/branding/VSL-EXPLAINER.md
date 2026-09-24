# VSL-Explainer für /system (Plan, 23.09, zur Freigabe)

Ersetzt das Video vor der Kamera. Ein animierter Explainer (Instructional
Sales VSL) in der Sprache der Makler, mit echten Screens aus dem
RIEGEL-Pilot. Die eingeblendeten Headlines ergeben hintereinander gelesen
ein vollständiges Verkaufsgespräch. Wer den Ton aus hat, versteht das
Angebot trotzdem.

Grundlagen (23.09, alle im Scratchpad bzw. unter `docs/redesign/recherche/`):
Makler-Sprache und Einwände (Foren, Software-Bewertungen, Studien),
RIEGEL-Inventar aus dem Repo `alexbeuwy/riegel` und der Live-Seite,
Technik-Test HyperFrames (Render im Container funktioniert, 1080p).

## Was ich an der Ausgangsidee geändert habe, und warum

| Idee | Änderung | Grund |
|---|---|---|
| „Hunderte hyperpersonalisierte Dokumente am Tag" | „Jeder Eigentümer bekommt in 60 Sekunden seinen Report. Mit Ihrem Logo." | Kein Makler sagt „hyperpersonalisiert". Menge klingt nach Spam. Kunden von Homeday und McMakler beschweren sich genau über „standardisierte Antwortmails". Die Wirkung verkauft, die Stückzahl nicht. |
| „Keine Zeit für KI" | KI kommt einmal vor, als Entlastung: „Sie müssen dafür nichts über KI wissen." | Makler sagen „keine Zeit", nicht „keine Zeit für KI". KI als Thema weckt Skepsis. |
| Portal-Datenschatz, Hotjar | Als Bedrohung durch den Wettbewerber erzählt, danach als Ihr Vorteil gezeigt | Nach eigenem Portal fragt kein Makler. Angst, abgehängt zu werden, trägt dagegen. |
| „Was bleibt liegen?" | Bleibt der Kern des Hooks | Deckt sich mit jeder Quelle: Zeitmangel, Nachfassen, Bestandskunden. |
| Wettbewerber mit System | Kein Feindbild. Ein Makler aus Ihrer Stadt, der nicht besser ist, nur schneller und ohne Lücken | Glaubwürdig, keine Angstmache. |

## Die Headline-Kette (das Verkaufsgespräch in 16 Zeilen)

1. Ihr Geschäft läuft.
2. Aber was bleibt liegen?
3. Die Bewertungsanfrage von Freitagabend. Der Suchkunde vom März. Das Nachfassen nach der Besichtigung.
4. Was liegen bleibt, holt sich ein anderer.
5. Der Makler in Ihrer Stadt, der schon ein System hat.
6. Sein Rechner sammelt Eigentümer. Auch nachts.
7. Jeder bekommt in 60 Sekunden seinen Report. Mit seinem Logo.
8. Käufer legen bei ihm ein Konto an. Mit Suchauftrag.
9. Er sieht, was Eigentümer auf seiner Seite wirklich anschauen.
10. Sie müssen dafür nichts über KI wissen.
11. So sieht das aus. Live bei RIEGEL Immobilien.
12. 32 Bewertungsanfragen in 30 Tagen. Jede mit Adresse.
13. Sie liefern zwei Termine und Ihre Fotos.
14. In sechs Wochen läuft es. An Ihrer Maklersoftware.
15. Einmal pro Stadt.
16. Ist Ihre noch frei?

Test: Nur 1, 2, 4, 10, 13, 15, 16 lesen ergibt schon das Gespräch
(Status → Lücke → Verlust → Entlastung → Aufwand → Knappheit → Handlung).

## Szenen (ca. 2:20, 16:9, 1920 × 1080)

| Zeit | ON (Headline) | Sprechtext (Entwurf) | Bild / Animation |
|---|---|---|---|
| 0:00 | 1–2 | „Ihr Geschäft läuft. Die Objekte gehen weg, die Kunden empfehlen Sie weiter. Aber seien Sie ehrlich: Was bleibt liegen?" | Weiß, Headline setzt sich Wort für Wort, gelber Highlighter auf „liegen". |
| 0:10 | 3 | „Die Bewertungsanfrage von Freitagabend. Der Suchkunde vom März. Das Nachfassen nach der Besichtigung. Der Eigentümer, der noch nicht so weit war." | Karten mit Zeitstempel stapeln sich (Mail, Notiz, verpasster Anruf), leicht schräg, der Stapel wächst. |
| 0:25 | 4–5 | „Das Problem ist nicht die Arbeit. Das Problem ist: Was liegen bleibt, holt sich ein anderer. Der Makler in Ihrer Stadt, der schon ein System hat." | Stadtkarte, zwei Pins. Die Karten vom Stapel fliegen zum anderen Pin. |
| 0:40 | 6–9 | „Sein Rechner sammelt Eigentümer, auch nachts. Jeder bekommt in sechzig Sekunden einen Report mit Wert, Bodenrichtwert und Satellitenbild. Käufer legen ein Konto an und hinterlegen, was sie suchen. Und er sieht, welche Seiten Eigentümer wirklich lesen." | Vier schnelle Schnitte, je ein UI-Moment: Rechner-Schritte, PDF fliegt aus dem Laptop ins Postfach (Chips: Name, Adresse, Satellit), Konto mit Merkliste, Heatmap legt sich über eine Seite. |
| 1:05 | 10 | „Sie müssen dafür nichts über KI wissen. Und Sie müssen nichts davon selbst einrichten." | Hart zurück auf Weiß, Stapel löst sich auf. |
| 1:15 | 11 | „So sieht das aus. Live bei RIEGEL Immobilien in Speyer." | Echte RIEGEL-Screens in Browser- und Handy-Rahmen: Rechner, Report, Objektliste mit Karte, Preisatlas, Cockpit, Netz aus ca. 95 Standort- und Ratgeberseiten. |
| 1:40 | 12 | „Zweiunddreißig Bewertungsanfragen in dreißig Tagen. Jede mit Adresse, Objekt und Telefonnummer. Gerechnet mit 489 echten Abschlüssen als Basis." | Zähler 0 → 32, darunter kurz die Zahl 489. |
| 1:55 | 13–14 | „Was Sie tun müssen? Zwei Termine und Ihre Fotos. Den Rest bauen wir. In sechs Wochen läuft es, an Ihrer Maklersoftware." | Zwei Kalenderblätter, Fotostapel, Fortschrittsbalken 6 Wochen. |
| 2:05 | 15–16 | „Wir bauen das System in jeder Stadt nur einmal. Prüfen Sie unter diesem Video, ob Ihre noch frei ist." | Das Stadt-Feld der Seite als Animation: Cursor tippt „Ihre Stadt", gelber Knopf pulsiert einmal. Übergang direkt zum echten Knopf unter dem Video. |

Sprechtext rund 300 Wörter, ruhig, 130 Wörter pro Minute. Preis bleibt auf
der Seite. Im Video steht er nicht, damit das Video auch als Anzeige läuft.

## Beweise: was belegt ist und was nicht

| Aussage | Status |
|---|---|
| 32 Bewertungsanfragen in 30 Tagen | Belegt: `riegel/docs/naechste-schritte.md`, Stand 18.08.2026. Neuere Zahl bitte von Alex. |
| Engine mit 489 echten Abschlüssen kalibriert | Belegt: `riegel/docs/fortschritt.md` (Backtest 12.08.2026) |
| Bodenrichtwerte live, Satellitenbild, PDF-Report, Konto, Suchauftrag, Heatmap, Cockpit, ca. 95 SEO-Seiten, onOffice | Belegt im Repo und live geprüft |
| Nachfass-Mails automatisch | Bei RIEGEL nur geplant. Im Video nur als Fähigkeit des Systems, nicht als RIEGEL-Ergebnis. |
| Suchauftrag-Mails | Gebaut, zum 18.08. noch 0 versendet. Wie oben. |
| 9 Abschlüsse / 342.000 € in 6 Wochen | **Kein Beleg im RIEGEL-Repo.** Steht aber schon auf beuwy.com-Seiten. Quelle von Alex nötig, sonst raus (UWG). |
| Platz 21 ImmoScout24-Award | Echt, aber **vor dem Relaunch** gewonnen. Nicht als Folge des Systems darstellen. |

## Technik

- HyperFrames (Apache 2.0, HTML + GSAP, Render per Headless Chrome im
  Container). Test mit Helvena und gelbem Highlighter bestanden.
- MP4 braucht `ffmpeg-static` (das vorinstallierte ffmpeg kann kein H.264).
- Stimme: ElevenLabs mit Zeitmarken pro Wort, damit Headlines genau auf
  dem gesprochenen Wort erscheinen. Braucht `ELEVENLABS_API_KEY` in der
  Umgebung.
- Screens: echte Aufnahmen von riegel-immobilien.de (Scroll, Klicks),
  keine erfundenen Oberflächen.
- Musik: lizenzfreies, ruhiges Bett, unter der Stimme abgesenkt.
- Ausgabe: `public/` bzw. BunnyCDN, URL als `mk.vsl.url` im Studio.
  Später ein 60-Sekunden-Schnitt in 9:16 für Anzeigen.

## Ablauf

1. Freigabe dieses Plans (Headline-Kette, Sprechtext, offene Punkte).
2. Storyboard: je Szene ein Standbild als Skizze. Freigabe.
3. Stimme erzeugen, Animation bauen, Rohschnitt als MP4. Freigabe.
4. Feinschliff, finaler Render, Einbau auf /system.
