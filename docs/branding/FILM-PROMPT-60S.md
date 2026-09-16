# Prompt: 60-Sekunden-Werbeanimation beuwy (After Effects, High-End)

Verwendung: als Brief an einen Motion Designer oder als Prompt an ein
LLM, das daraus Storyboard, AE-Kompositionsplan, VO-Skript und Shotlist
ausarbeitet. Der Film zeigt, was beuwy für Makler und Immobilien-
Vertriebe aufsetzt, mit dem Gefühl „das ist zu gut, um wahr zu sein",
und löst dieses Gefühl mit echten Zahlen auf.

---

## Auftrag

Erstelle Storyboard, Shotlist mit Timecodes, Voice-over-Skript (Deutsch,
Sie-Form) und After-Effects-Umsetzungsplan für einen 60-Sekunden-Film.
Absender: beuwy, Premium-Boutique für Immobilienmakler und Vertriebe von
Bauträgern und Kapitalanlagen. Produkt: ein komplettes Vertriebssystem,
fertig gebaut in 4 bis 6 Wochen. Marke, Website, Exposés auf Knopfdruck,
personalisierte Mails, Nachfass-Automatik, CRM mit jedem Deal messbar.
Der Kunde liefert Fotos und zwei Termine.

## Gefühl

Zu gut, um wahr zu sein. Der Zuschauer soll zweimal denken „das geht
nicht", und beim dritten Mal die Zahl sehen, die es beweist. Ton: ruhig,
sicher, teuer. Kein Hype, kein Sprecher-Grinsen. Musik: ein tiefer,
gleichmäßiger Puls, der zum Ende hin öffnet.

## Bildwelt (verbindlich)

Reines Weiß als Studio, neutrale Tinte für Typografie, ein einziger Akzent
in Pastellgelb (#f3e27f). Keine Verläufe, kein Gold, keine Kursive, keine
Stock-Menschen, keine glänzenden 3D-Rendermenschen. Typografie: enge,
fette Grotesk (Helvena-Charakter), sehr groß, negative Laufweite, Hervor-
hebung eines Wortes per gelbem Textmarker-Balken. Objekte: echte UI-
Elemente als schwebende Karten (Website, Exposé-Seite, Mail-Fenster,
CRM-Zeile, Handy mit Reel), weiche, lange Schatten, leichte Parallaxe,
3D-Kamera mit langsamen Fahrten. Makro-Details: Cursor, tippender Text,
umblätternde Exposé-Seite, ein Pin, der auf eine Karte fällt.

## Dramaturgie mit Timecodes

00:00 bis 00:04, Hook. Schwarz auf Weiß, riesig: „Sehen Sie so gut aus,
wie Sie verkaufen?" Das Fragezeichen fällt weg, der Satz bleibt als
Aussage. VO: „Sie verkaufen besser als die meisten. Sieht man das?"

00:04 bis 00:14, Problem als Szene. Ein Handy, 21:04 Uhr, drei Makler-
Websites nebeneinander, alle grau, alle gleich. Der Daumen wischt. Eine
wird angetippt, es ist nicht die des Zuschauers. VO: „Abends um neun
entscheidet ein Eigentümer am Handy. Drei Makler, drei Websites, ein
Anruf. Er kann nicht sehen, wer besser verkauft. Er sieht, wer besser
aussieht."

00:14 bis 00:20, Der Satz, der zu gut klingt. Weiß. Groß: „In sechs
Wochen sind Sie der, den er anruft." VO: „Wir bauen Ihnen in sechs
Wochen genau diesen Auftritt. Sie liefern Fotos und zwei Termine. Klingt
zu gut. Schauen Sie hin."

00:20 bis 00:44, Das System, ein durchgehender Kamerazug ohne Schnitt.
Die Kamera fährt an schwebenden Karten entlang, jede Karte baut sich in
zwei Sekunden auf:
- 00:20 Marke: Wortmarke setzt sich aus Strichen zusammen, Farbfläche
  Pastellgelb rollt ein.
- 00:24 Website: Hero-Seite auf einem Laptop, Foto des echten Makler-
  teams, Headline mit gelbem Balken.
- 00:28 Exposé auf Knopfdruck: eine Exposé-Seite, Name, Adresse und
  Luftbild wechseln dreimal, Layout bleibt.
- 00:32 Mail: ein Mailfenster tippt einen Satz mit echten Variablen
  („Ihr Nachbar in der Gartenstraße hat 2022 für 63 % seiner Preis-
  vorstellung verkauft."), die Variablen leuchten kurz gelb.
- 00:36 Nachfass: eine Zeitleiste, drei Punkte, die Mail geht „von
  selbst" raus, ein Termin erscheint im Kalender.
- 00:40 CRM: eine Zeile springt von „neu" auf „Termin" auf „Mandat", ein
  Zähler zählt hoch.
VO über den Zug: „Marke. Website. Exposés, die sich selbst schreiben.
Mails, die jeden Empfänger beim Namen kennen. Ein Nachfass, der arbeitet,
während Sie beim Notar sitzen. Und jedes Mandat steht in Ihrem CRM."

00:44 bis 00:52, Beweis. Weiß. Drei Zahlen zählen hoch, tabellarische
Ziffern: „9 Abschlüsse in sechs Wochen", „342.000 € Abschlussvolumen",
„Platz 21 von über 25.000 Maklern". Kleine Zeile: RIEGEL Immobilien.
VO: „Zu gut, um wahr zu sein? Riegel Immobilien, sechs Wochen nach dem
Livegang: neun Abschlüsse."

00:52 bis 01:00, Abschluss. Wortmarke beuwy, darunter ein Satz: „Sehen
Sie so gut aus, wie Sie verkaufen." Knopf in Pastellgelb: „Zusammenarbeit
anfragen". Kleine Zeile: beuwy.com. VO: „beuwy. Antwort in 24 Stunden."

## Umsetzung in After Effects

3D-Kamera mit einem einzigen Rig für 00:20 bis 00:44, Karten als
Precomps auf Z-Ebenen, Parallaxe über Kameraabstand, Tiefenunschärfe
dezent. Textanimatoren für Buchstaben-Einflüge (Deckkraft + 12 px Y,
easy ease, 280 ms), Textmarker-Balken als Shape-Layer mit Trim Paths.
Exposé-Wechsel als Maskenwischer über zwei Ebenen. Tippen über ein
Slider-Expression auf Source Text. Zähler über Expression mit
Math.round und Tausenderpunkt. Motion Blur an, Frame-Rate 25 fps, alle
Bewegungen zwischen 250 und 500 ms, keine Bounce-Kurven. Schatten als
weiche Drop Shadows mit großer Distanz und niedriger Deckkraft, keine
Glows. Sound: Klick beim Antippen, Papier beim Umblättern, ein leiser
„Sent"-Ton bei der Mail, Tiefton-Puls unter allem.

## Lieferung

Master 16:9 in 4K, 25 fps, ProRes. Cutdowns 9:16 in 30 und 15 Sekunden
(Hook, System-Zug verkürzt, Beweis, CTA). Untertitel als SRT. Alle
Zahlen im Film sind die aus dem RIEGEL-Case, keine erfundenen Werte.
Bevor „Riegel" gezeigt wird: Freigabe des Kunden einholen.

## Nicht erlaubt

Stock-Personen, Verläufe, Gold, Kursive, Glow, Partikel, Bokeh-Bälle,
Hände, die auf Tablets tippen, Weltkugeln, Zahnräder, Raketen.
Kein „revolutionär", kein „innovativ", kein „Partner". Keine Behauptung
ohne Zahl.

---

Kurzfassung für KI-Bildgeneratoren (Stil-Referenz, englisch):
"Editorial premium motion design, pure white studio, ink-black tight
grotesk typography, single pastel-yellow highlighter accent, floating
real UI cards (website, exposé page, email window, CRM row) with long
soft shadows, slow 3D camera dolly, macro cursor and typing details,
no gradients, no people, no glow, calm and expensive."
