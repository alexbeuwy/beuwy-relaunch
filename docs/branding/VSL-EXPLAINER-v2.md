# beuwy · Der Film (v2) · Konzept zur Freigabe

Stand 23.09. Ersetzt den Rohschnitt v1. Gebaut wird erst nach Freigabe.
Grundlagen (Scratchpad dieser Session, Kopien unter `docs/redesign/recherche/`
folgen mit dem Bau): Inhalts-Inventar beider Repos (361 Zeilen, jede
Aussage mit Quelle und Belegstand), Apple-Motion-Recherche (15 Referenzen,
30 Techniken), Makler-Sprache (Foren, Bewertungen, Studien),
Werkzeug-Test HyperFrames.

---

## 1. Warum v1 nicht trägt

| Befund v1 | Wert v1 | Zielwert v2 (Apple-Grammatik) |
|---|---|---|
| Einstellungslänge | Ø 7,2 s (17 Szenen / 123 s) | Ø 1,5–2,5 s, im Hook 0,6–1,2 s (Richtwerte Werbespot: Schnitt alle 1,5–2 s) |
| Tote Zeit | ca. 23 % ohne Stimme (Pausen am Szenenende) | < 5 %, Musik und Bild laufen durch |
| Schriftgröße | 76–104 px auf 1920 px | 220–420 px, Wörter füllen die Fläche |
| UI-Größe | Karten mit ca. 40 % der Breite, mittig | randlos, angeschnitten, in Tiefe (CSS-3D) |
| Übergänge | 17 harte Schnitte | Masken-Wipe, Zoom-through, Match-Cut, Whip, Kamera-Moves |
| Sound | Musikbett ohne Taktbezug, keine Effekte | 126 BPM, Schnitte auf Taktschläge, gezielte Effekte |
| Inhalt | Problem vorne, Traumzustand spät, fast kein Trust, RIEGEL dominant | Traumzustand in Sekunde 1, Trust-Block, RIEGEL als 5-s-Beispiel |

## 2. Strategie: der No-Brainer

### 2.1 Traumzustand (in dieser Reihenfolge andocken)

1. **Eigentümer kommen von selbst. Auch nachts.** Ihr nächstes Mandat beginnt, während Sie schlafen.
2. **Nichts bleibt liegen.** Bewertung, Report, Nachfass, Suchauftrag laufen allein.
3. **Die Kunden gehören Ihnen.** Sie verkaufen wie ein Portal, ohne vom Portal abzuhängen.
4. **Sie sind die Adresse Ihrer Stadt.** Einmal pro Stadt.

### 2.2 Wertgleichung (warum Nein sagen schwerfällt)

| Hebel | Aussage im Film | Beleg |
|---|---|---|
| Ergebnis ↑ | Ein Mandat bringt Ø 28.560 € Courtage | 400.000 € Ø-Hauspreis (Capital 09/2026, RIEGEL) × 7,14 % |
| Wahrscheinlichkeit ↑ | Gebaut von einem, der selbst 380 Wohnungen verkauft hat, mit genau diesem System | acta, Aussage Alex, auf /ueber-uns veröffentlicht |
| | Über 40 Makler-Projekte, seit 2017 | `mk.stats.s1` „40+ Premium-Projekte für Makler“, llms.txt „beuwy seit 2017“ (Aussage Alex) |
| | 17 Jahre Markenarbeit, u. a. Bosch, Continental, Michelin | Aussage Alex, auf mehreren Seiten |
| | Kurzbeispiel RIEGEL: 9 zusätzliche Mandate in 3 Monaten | Aussage Alex/Kunde |
| | Rechner mit 489 echten Abschlüssen kalibriert | RIEGEL-Backtest, belegt |
| Zeit ↓ | Live in 6 Wochen, Termin schriftlich | /ueber-uns „den Termin bekommen Sie schriftlich“ |
| Aufwand ↓ | Zwei Termine und Ihre Fotos, keine KI lernen, läuft an Ihrer Maklersoftware | /system (Achtung: Startseite und /ueber-uns sagen „vier Termine“) |
| Kontrolle ↑ | Jeden Montag der Wochenbericht, jedes Anliegen als Ticket | /ueber-uns „Vier Zusagen“ |
| Preis relativ ↓ | Ein Mandat, und das System hat sich bezahlt (27.900 €) | /system |
| Knappheit | Einmal pro Stadt | echt (Alex, 23.09) |
| Risiko ↓ | **Lücke: keine Garantie** | Vorschläge siehe 7 |

### 2.3 Trust-Stack (Reihenfolge im Film)

1. Gründer, echtes Porträt: Alexander Pütter.
2. 17 Jahre Markenarbeit: Bosch, Continental, Michelin (als Namen, keine fremden Logos).
3. Selbst verkauft: 380 Wohnungen in drei Jahren, über Anzeigen, Rechner und Registrierung.
4. Über 40 Makler-Projekte seit 2017, Wand der echten Kundenlogos (RIEGEL, hzo immobilien, invyse, Königswege …).
5. RIEGEL als Kurzbeispiel (5 s).
6. Rechenschaft: Termin schriftlich, Wochenbericht, Ticketsystem.

### 2.4 Bewusst nicht im Film (Risiko)

- „10 Mandate mehr im Monat“ als Zahl: kein Beleg. Die einzige Zahl ist RIEGEL mit ca. 3 pro Monat. Eine Zahl, die jeder Makler sofort gegen RIEGEL hält, kostet Glaubwürdigkeit und ist UWG-Risiko (§ 5).
- „schneller als die Konkurrenz“: keine Vergleichsdaten im Repo. RIEGEL hat am 09.09. eine Abmahnung der Wettbewerbszentrale wegen „Bestpreis“-Werbung bekommen. Vergleichende Superlative nur mit harten Daten.
- „ohne laufende Marketingkosten“: offen, ob das System Anzeigenbudget oder laufende Kosten braucht (FAQ: „Wir justieren Anzeigen“). Bis zur Klärung heißt es „ohne mehr Arbeit“.
- Vision Group (hat den Zyklus nicht überstanden), große Makler-Logos (E&V, Von Poll … nicht freigegeben), KI-Teamfotos als echtes Team.

## 3. Hook: drei Varianten

**A · Die Nacht (Empfehlung).** Der Traumzustand als gelebte Szene, 11 s.
Riesige Uhrzeiten rollen wie ein Zählwerk, dazwischen Systemmomente in Tiefe.

- ON „23:48“ (Zählwerk, füllt die Fläche) · Rechner auf dem Telefon des Eigentümers
- ON „23:49“ · Report fächert auf, Zoom auf „Ihr Logo“
- ON „08:10“ (Nacht rollt im Takt durch) · Anruf „Eigentümer“
- ON „Bei Ihnen.“ (Musik-Drop) → „Ihr nächstes Mandat beginnt, während Sie schlafen.“
- ON „Ohne mehr Arbeit. Ohne neue Stelle.“
- VO: „Dreiundzwanzig Uhr achtundvierzig. Ein Eigentümer bewertet sein Haus. Eine Minute später hat er seinen Report. Mit Ihrem Logo. Am nächsten Morgen, zehn nach acht, ruft er an. Bei Ihnen. Ihr nächstes Mandat beginnt, während Sie schlafen. Ohne mehr Arbeit. Ohne neue Stelle.“
- Geändert gegenüber dem ersten Entwurf: „Eine Minute später“ statt „Um sechs“, weil der Report sofort nach der Bewertung rausgeht (sonst falsche Aussage über das Produkt).

Warum: zeigt das Ergebnis statt es zu behaupten, dockt Traumzustand 1 sofort an,
trägt den ganzen Film (Buchstütze am Ende: „Ihr nächstes Mandat beginnt heute Nacht.“),
ist rechtlich sauber, weil es beschreibt, was das System tut.

**B · Dein Impuls, geschärft.** Drei Schläge, 6 s.
ON „Mehr Mandate.“ · „Ohne mehr Arbeit.“ · „Ohne laufende Werbung.“ → „So geht das.“
Nur mit geklärtem „ohne laufende Werbung“.

**C · Die Rechnung.** Verlust statt Gewinn, 7 s.
ON „28.560 €“ zählt hoch → „So viel Courtage bringt ein Mandat. Wie viele lassen Sie jeden Monat liegen?“

## 4. Skript v2 (ca. 1:55, Stimme congstar, „beuwy“ gesprochen „Boi-wie“)

| Zeit | Akt | Stimme | Bild (Motion) |
|---|---|---|---|
| 0:00 | Hook | wie Hook A | Uhrzeiten-Zählwerk 420 px, Karten aus der Tiefe, Match-Cut Anruf → „Bei Ihnen.“, RSVP-Titel, Bass-Hit auf Downbeat |
| 0:17 | Problem | „Ohne System sieht es so aus: Der Eigentümer vergleicht abends drei Makler am Handy. Dreimal dasselbe. Und was bei Ihnen liegen bleibt, holt sich der Makler mit System.“ | Musik gedämpft; „Ohne System.“ grau; drei gleiche Telefone; Anfragen „Fr 21:14 · unbeantwortet“ stapeln sich und fliegen zum Makler mit System |
| 0:27 | Enthüllung | „Das ist beuwy. Das Vertriebssystem für Makler. Sie verkaufen, als wären Sie selbst das Portal. Nur dass die Kunden Ihnen gehören.“ | Musik öffnet voll, Logo baut sich auf, Zoom durch das „o“ von „Portal“ in die Kundenkonten |
| 0:30 | Wie · Rechner | „Eigentümer berechnen den Wert ihrer Immobilie. In sechzig Sekunden, mit amtlichen Bodenrichtwerten.“ | Wort „Rechner.“ 380 px, echter beuwy-Rechner in 3D-Kamerafahrt |
| 0:36 | Wie · Report | „Der Report geht automatisch raus. Mit Ihrem Logo. Sie bekommen den Kontakt.“ | Report-Seiten fächern in Tiefe, Chips docken an |
| 0:41 | Wie · Portal | „Käufer legen bei Ihnen ein Konto an und speichern ihre Suche.“ | echte Objektliste und Kundenkonto, randlos angeschnitten |
| 0:46 | Wie · Automatik | „Passt ein Objekt, bekommen sie es, bevor es online steht. Nachfassen passiert von selbst.“ | echte Flows, Mail tippt sich, Status springt auf „gesendet“ |
| 0:52 | Wie · Überblick | „Jede Anfrage, jeder Termin, jeder Deal an einem Ort. Und Sie sehen, was Eigentümer auf Ihrer Seite wirklich tun.“ | echtes CRM: Heute-Dashboard, Deal-Kanban, Einblick mit Heatmap |
| 0:59 | Wie · Sichtbar | „Gebaut, um bei Google und in KI-Antworten aufzutauchen.“ | echte Standort- und Ratgeberseiten im Raster, Kamera fährt über das Netz |
| 1:03 | Wie · Summe | „Dreißig Bausteine. Ein System. Unter Ihrem Namen.“ | 30 Kacheln setzen sich zusammen und kollabieren zu „Ihr Logo“ |
| 1:08 | Wer | „Gebaut hat es Alexander Pütter. Siebzehn Jahre Markenarbeit, für Bosch, Continental und Michelin.“ | echtes Porträt, Name, drei Markennamen als Typo |
| 1:15 | Wer | „Und bevor er es Ihnen verkauft, hat er damit selbst verkauft: dreihundertachtzig Wohnungen in drei Jahren.“ | Zahl 380 als Zählwerk, füllt die Fläche |
| 1:21 | Wer | „Seit 2017 laufen Systeme von beuwy bei Maklern. Über vierzig Projekte.“ | Logo-Wand der echten Kunden, Kaskade |
| 1:27 | Beispiel | „Bei RIEGEL Immobilien: neun zusätzliche Mandate in den ersten drei Monaten.“ | Zahl +9, kurzer echter RIEGEL-Screen, Fußnote |
| 1:32 | Angebot | „Ihr Aufwand: zwei Termine und Ihre Fotos. Den Rest bauen wir. Live in sechs Wochen, den Termin bekommen Sie schriftlich.“ | Kalender, Fortschritt 6 Wochen, Stempel „schriftlich“ |
| 1:40 | Angebot | „Jeden Montag sehen Sie im Wochenbericht, was das System gebracht hat.“ | echter Wochenbericht „Der Montag, vorbereitet.“ |
| 1:44 | Angebot | „Ein Mandat bringt im Schnitt achtundzwanzigtausend Euro Courtage. Ein einziges, und das System hat sich bezahlt.“ | Waage: 28.560 € gegen 27.900 €, kippt |
| 1:50 | Knappheit | „Wir bauen es in jeder Stadt nur einmal.“ | Deutschlandkarte, einzelne Städte vergeben |
| 1:53 | CTA | „Prüfen Sie jetzt, ob Ihre Stadt noch frei ist. Ihr nächstes Mandat beginnt heute Nacht.“ | Stadt-Feld wie auf der Seite, Knopf drückt, Buchstütze „23:48“ |

Headline-Kette ohne Ton: 23:48 → Bei Ihnen. → Ihr nächstes Mandat beginnt, während
Sie schlafen. → Ohne mehr Arbeit. → Dreimal dasselbe. → Das ist beuwy. → Verkaufen
wie ein Portal. → Rechner. Report. Portal. Automatisch. Alles im Blick. Gefunden. →
30 Bausteine. Ein System. Ihr Name. → 380 Wohnungen. Selbst verkauft. → 40+
Makler-Projekte. → +9 Mandate. → 2 Termine. 6 Wochen. Schriftlich. → 1 Mandat bezahlt
das System. → Einmal pro Stadt. → Ist Ihre noch frei?

## 5. Motion-Sprache (Apple-Grammatik, beuwy-Farben)

- **Maßstab:** ein Fokus pro Bild. Display 220–420 px, Tracking eng, Helvena 800.
  Kleine Labels daneben für Kontrast (Skalenkontrast statt Farbe).
- **Gelb** nur auf Schlüsselwort, Zahl, CTA oder eine Linie. Nie als Fläche.
- **Techniken** (aus der Recherche, mit Code): Scale-from-Huge-Slam mit Overshoot,
  Wort-Stagger mit Masken, Blur-to-Sharp-Fokus, Zählwerk/Split-Flap für Zahlen,
  Clip-Path- und Iris-Wipes statt Blenden, Zoom-through, Match-Cut, Whip mit
  Bewegungsunschärfe, CSS-3D-Kamera mit Parallax-Ebenen, Schatten als Tiefenanker,
  Licht-Sweep über UI, Stagger statt Gleichzeitigkeit, kurze Atempausen nach Bursts.
- **Tempo nach Akt:** Hook sehr schnell (0,6–1,2 s), Problem mittel (2–3 s),
  Features in Wellen (Burst 3–4 Schnitte in 5 s, dann 0,5 s Luft), Trust über
  Zählwerke, Angebot und CTA bewusst ruhiger.
- **Musik:** 126 BPM, eigens erzeugt, Drop auf „Das ist beuwy“, Breakdown im
  Trust-Block, Lift ins Angebot. Schnitte im Hook und CTA auf Taktschläge.
- **Sound-Design:** Tick, Ping, Klick, Bass-Hit, Whoosh, Riser, gezielt auf 1–2
  Schlüsselschnitte pro Sequenz, Musik weicht der Stimme aus.

## 6. Material

- **Echtes beuwy-System** (weiß/gelb, markengleich): Rechner, Kundenkonto,
  CRM „Heute“, Deal-Kanban, Einblick, Flows, E-Mail-Vorlagen, Wochenbericht.
  Aufgenommen als Bildschirmvideo mit Beispieldaten (Muster-Makler), Demo-Banner
  für die Aufnahme ausgeblendet, Beispielkontakte als Eigentümer statt Makler.
- **RIEGEL** nur im 5-s-Beispiel und als kurzer Portal-Screen.
- **Gründerporträt** echt (`gruender-alex.webp`).
- **Optional Higgsfield** (639 Credits verfügbar): 2–3 filmische Einstellungen im
  Original-Stil (Prompts in `docs/branding/higgsfield-prompts.md`), z. B.
  Eigentümerin nachts am Handy (Hook), Makler-Team am Morgen (Traumzustand).
  Jede Einstellung mit AI-Pille. Kosten vorab testen.

## 6a. Stilprobe (0:00–0:36, gebaut)

- Datei: `video/system-explainer/v2-stilprobe.html`, Ton: `audio/v2/stilprobe-mix.mp3`
  (Mischung per `audio/v2/mix.py`, Stimme per `audio/v2/tts2.py`).
- 15 Einstellungen in 36 s (Ø 2,4 s, im Hook 1,1–2,3 s), keine stehenden Bilder.
- Musik-Drop genau auf „Bei Ihnen.“ (10,83 s). Die Nacht rollt auf den
  Fill-Schlägen der Musik durch. Problem-Teil mit gedämpfter Musik
  (Tiefpass), volle Öffnung auf „beuwy“ (27,97 s, Taktanfang).
- Technik: nur CSS/GSAP (Shader-Übergänge fallen in dieser Umgebung
  lautlos auf harte Schnitte zurück). CSS-3D und Unschärfe geprüft.
- Aussprache in der Probe: „Boiwie“.

## 7. Offene Entscheidungen (Alex)

1. Hook A, B oder C.
2. Risiko-Umkehr (größter No-Brainer-Hebel, fehlt heute): z. B.
   „Live-Termin schriftlich, sonst entfällt die letzte Rate“, Festpreis-Garantie
   („Mehraufwand ist unser Risiko“) oder keine.
3. Preis im Film zeigen (27.900 €) oder nur „ein Mandat bezahlt das System“.
4. Fakten: zwei oder vier Termine? „ohne laufende Werbekosten“ wahr?
   „40+ Makler-Projekte seit 2017“ so freigegeben?
5. Aussprache: welche Probe klingt richtig („beuwy“, „Beuwie“, „Boiwie“, „Boywie“)?
