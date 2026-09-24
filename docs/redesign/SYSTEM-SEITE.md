# /system: Aufbau und Begründung (Entwurf 23.09)

Vorgabe von Alex (23.09): Die Seite dreht sich um einen großen, auffälligen
Knopf und bleibt minimal. Das Video trägt die Argumente. Dazu Exit-Intent
und die Mechaniken, mit denen CRO-Agenturen arbeiten. Die Struktur kommt
von echten, aktuellen Seiten.

Recherche (23.09, Seiten live abgerufen):
- `recherche/2026-09-23-vsl-seiten.md`: 16 Seiten, u. a. acquisition.com,
  closers.io, consulting.com, Chili Piper, Gong, Calendly und die
  deutschen Makler-Anbieter coform.de, immocy.de, makler.immo,
  admospherics.de.
- `recherche/2026-09-23-cro-mechaniken.md`: Testergebnisse von
  dripagency.de (eigene Statistik über ihre A/B-Tests), GoodUI, Speero/CXL,
  Studien zu Endowed Progress und Hick's Law, Rechtslage (UWG, TDDDG).

## Aufbau

1. Logo, Zeile für die Zielgruppe, Headline, Video.
2. **Stadt-Check = der eine große Knopf.** Feld „Ihre Stadt" und ein
   gelber Knopf. Ergebnis sofort: frei → der Funnel mit den vier Fragen
   erscheint direkt darunter, ohne Seitenwechsel; vergeben → Video-Analyse
   oder Nachbarstadt.
3. Vertrauensleiste (drei Zahlen) und Kundenlogos.
4. Derselbe Knopf noch einmal, er springt zum Stadt-Check.
5. Mini-Fuß.

Bausteine, Preis, Einwände, Für wen: nur im Video (Skript:
`docs/branding/VSL-SKRIPT.md`). Die Studio-Keys bleiben im Code.

## Mechaniken und Belege

| Mechanik | Wo gesehen / Beleg | Psychologie |
|---|---|---|
| Ein Ziel, ein Knopf, kein Menü | 10 von 16 Seiten (acquisition.com „I'M READY TO SCALE" 6×, immocy.de 8×) | Hick's Law |
| Gebietsschutz als Knopf („Verfügbarkeit prüfen") | makler.immo, admospherics.de („Eine Region. Ein Makler."); dripagency.de: Scarcity-Tests mit klarem Sieger gewinnen zu 84,2 % (n=67) | echte Knappheit, Verlustangst |
| Erste Frage direkt auf der Seite, Funnel inline | Chili Piper (Formular → Qualifizierung → Kalender ohne Seitenwechsel) | Foot-in-the-Door, Commitment |
| Fortschritt mit Vorsprung im Funnel | Nunes & Drèze 2006: 34 % statt 19 % Abschluss | Endowed Progress |
| Sticky-Leiste mobil | GoodUI Pattern 41 (29 Tests); Fallstudien +5 bis +20 % | Fogg: Auslöser in Reichweite |
| Exit-Intent mit Mehrwert statt Rabatt | dripagency.de: Popups 72 % Gewinnrate (n=25) | Reziprozität |
| Gelber Knopf als einzige Farbe | Von-Restorff-Effekt | Isolation |
| Risiko-Zeile unter dem Knopf („unverbindlich · Antwort in 24 Stunden") | immocy.de, admospherics.de, getclients.com | Risikoumkehr |

Bewusst nicht umgesetzt: Countdown-Timer, „Makler X hat gerade gebucht",
erfundene Platzzahlen (UWG § 5); Ich-Form im Knopf (Sie-Form ist Pflicht,
Studienlage widersprüchlich); Knopf erst nach Minute X (keine Testzahl).

## Recht

- Exit-Intent und Sticky-Leiste laufen ohne Cookie und ohne Storage. Der
  Zustand lebt nur im Speicher der Seite (TDDDG § 25).
- Die Liste der vergebenen Städte muss echt sein (nur Städte mit laufendem
  Vertrag). Sonst ist der Stadt-Check irreführend (UWG § 5).
- A/B-Tests: Die Zuteilung braucht ein Cookie. Vor dem Start klären, ob
  das als technisch notwendig gilt oder eine Einwilligung braucht.

## A/B-Tests (nach Freigabe des Entwurfs)

Vercel Flags SDK + Middleware: Variante auf dem Server, kein Flackern.
Erste Tests: Knopf-Text, Headline. Auswertung über die vorhandene
Einblick-Messung in /intern. Laufzeit nach dripagency.de: Median 42 Tage.
Bei wenig Traffic nur große Unterschiede testen.
