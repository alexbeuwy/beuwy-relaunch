# KI-Tells — woran man merkt, dass ein Skript eine Maschine geschrieben hat

Das ist die deutsche Entsprechung zu `blader/humanizer` (48k Sterne, nur
Englisch). Humanizer entfernt 25 Muster aus englischer Prosa. Diese Liste
ist für **gesprochene deutsche Reel-Skripte** gebaut. Sie ist die Vorgabe
für den Scanner in `src/lib/os/ki-tells.ts` — beides zusammen ändern.

Ein Skript ist erst fertig, wenn der Score unter der Schwelle liegt.
Nicht, wenn es „gut klingt".

## Scoring

| Klasse | Punkte je Treffer | Bedeutung |
|---|---|---|
| Hart | 3 | Floskel, die kein Mensch beim Sprechen sagt |
| Struktur | 2 | Satzbau-Reflex, den LLMs ohne Auftrag produzieren |
| Weich | 1 | Einzeln erlaubt, gehäuft ein Tell |

Gemessen wird auf **Body + Loop-Ende** (das Gesprochene). Hooks werden
nur gegen die harte Liste geprüft.

| Score | Urteil |
|---|---|
| 0–2 | sauber, drehbar |
| 3–5 | eine Überarbeitung, dann nochmal messen |
| ≥ 6 | verwerfen und neu schreiben, nicht flicken |

## A. Harte Floskeln (3 Punkte, immer)

Groß-/Kleinschreibung egal. Wortstamm reicht („eintauchen" trifft auch
„tauchen wir ein").

**Opener und Rahmen**

- „Lass uns eintauchen", „tauchen wir ein", „lasst uns … anschauen"
- „In der heutigen", „in der heutigen digitalen Welt", „in Zeiten von"
- „Stell dir vor" als Satzanfang
- „Heute zeige ich", „in diesem Video", „in diesem Reel", „willkommen
  zurück", „hey Leute", „hi Leute"
- „Du wirst nicht glauben", „warte bis zum Ende", „bleib dran",
  „bis zum Schluss schauen"
- „Ich verrate dir", „das Geheimnis", „der geheime", „Hack", „Cheat-Code"
- „Spoiler", „Plot Twist", „Pro-Tipp", „kleiner Tipp"
- „Bereit?", „Los geht's", „Let's go", „Lass uns loslegen"

**Buzzwords**

- „Game-Changer", „game changing", „next level", „aufs nächste Level"
- „Es war noch nie so einfach", „so einfach wie nie"
- „revolutionär", „revolutioniert", „innovativ", „disruptiv"
- „ganzheitlich", „maßgeschneidert", „nahtlos", „Journey"
- „entfesseln", „boosten", „supercharge", „skalieren" als Verb ohne Objekt
- „Skalierungspotenzial", „Wertschöpfung", „Synergien", „Mehrwert"
- „leveragen", „committen", „alignen", „Deep Dive"

**Motivations- und Coach-Sprache**

- „Mindset", „Zieh es durch", „Glaub an dich", „Du schaffst das"
- „Erfolg ist", „dein Traum", „deine Träume", „Freiheit" als Ziel-Wort
- „Vertrau mir", „Ich weiß, was du denkst", „Klingt verrückt, aber"

**Abschluss-Reflexe**

- „Fazit", „Zusammenfassend", „Kurz gesagt", „Am Ende des Tages"
- „Denk daran", „Merke dir", „Merk dir das"
- „Das Beste daran", „Und das Beste ist"
- Jede CTA-Form: „Folge mir", „Folg mir", „Speicher dir", „Teil das",
  „Kommentier", „Link in der Bio", „Schreib mir", „Abonnier"

**Übersetzungsdeutsch**

- „Das ist, warum", „Das ist der Grund, warum" → „Deshalb"
- „macht Sinn" → „ergibt Sinn" oder umgehen
- „Hier ist der Deal", „Hier ist die Sache", „Die Wahrheit ist",
  „Lass mich erklären", „Lass mich dir zeigen"
- „Der Schlüssel ist", „Der Trick ist", „Das Ding ist"

## B. Struktur-Tells (2 Punkte)

Diese Muster sind einzeln unauffällig. LLMs setzen sie reflexhaft und
mehrfach. Gezählt wird je Vorkommen, sofern nicht anders angegeben.

| Tell | Erkennung | Regel |
|---|---|---|
| **Nicht-X-sondern-Y** | „Es geht nicht um X. Es geht um Y." · „Nicht X, sondern Y." · „Das Problem ist nicht X." | ab dem 2. Vorkommen je 2 Punkte |
| **Triaden-Reflex** | Aufzählung „X, Y und Z" (genau drei Glieder) | ab dem 2. Vorkommen je 2 Punkte |
| **Nicht-nur-sondern-auch** | „nicht nur … sondern auch" | jedes Vorkommen |
| **Rhetorische Frage als Opener** | erster Satz des Body endet mit „?" · „Kennst du das?" · „Du willst X?" | einmal |
| **Ausrufezeichen** | „!" im Gesprochenen | jedes Vorkommen (Sprachprofil: null erlaubt) |
| **Doppelpunkt-Pointe** | „Das Ergebnis:" · „Das Problem:" · „Die Lösung:" · „Ergebnis:" | ab dem 2. Vorkommen |
| **Anapher-Dreier** | drei aufeinanderfolgende Sätze mit demselben ersten Wort | einmal je Block |
| **Gedankenstrich-Dichte** | mehr als 1 Gedankenstrich (— oder –) je 40 Wörter | einmal, wenn überschritten |
| **Hook-Echo** | erster gesprochener Satz wiederholt einen der drei Hooks wörtlich (≥ 5 gleiche Wörter in Folge) | einmal |
| **Moral am Ende** | letzter Satz beginnt mit „Also", „Deshalb", „Darum", „Denk", „Merk" | einmal |
| **Satzlänge** | mehr als 25 % der Sätze länger als 18 Wörter | einmal |
| **Substantiv-Ketten** | Wörter auf -ung, -keit, -heit, -ität, -ismus: mehr als 6 je 100 Wörter | einmal |
| **Passiv-Dichte** | „wird … " / „werden … " + Partizip: mehr als 2 je 100 Wörter | einmal |
| **Aufzählung mit „Erstens"** | „Erstens", „Zweitens", „Drittens" | einmal je Skript |

## C. Weiche Tells (1 Punkt je Vorkommen)

Wörter, die im Sprechen selten sind und in Häufung verraten, dass niemand
das gesagt hat.

- „spannend", „interessant" (als Bewertung ohne Grund)
- „ehrlich gesagt", „ganz ehrlich" (ab dem 2. Vorkommen)
- „im Grunde", „im Wesentlichen", „letztendlich", „grundsätzlich"
- „effektiv", „effizient", „optimieren", „optimal"
- „Potenzial", „Möglichkeiten", „Chancen" (vage, ohne Zahl)
- „Strategie", „strategisch" (ohne konkrete Handlung dahinter)
- „Erfolg", „erfolgreich", „Wachstum", „Ziele"
- „wichtig", „entscheidend", „essenziell", „elementar"
- „einfach" als Verstärker („einfach großartig")
- „wirklich", „tatsächlich", „absolut" (ab dem 3. Vorkommen zusammen)
- „Tools" ohne Namen, „Prozesse" ohne Inhalt, „Content" ohne Objekt

## D. Fehlende Substanz (2 Punkte je Punkt)

Nicht was drinsteht, sondern was fehlt. Alex spricht aus Projekten, mit
Zahlen. Ein Skript ohne beides ist Theorie.

- **Keine Zahl** im Gesprochenen (Betrag, Zeitraum, Anzahl, Datum)
- **Kein Ich** („ich", „mein", „mir", „mich", „wir") im Gesprochenen
- **Kein Eigenname** (Tool, Kunde, Ort, Person, Produkt) im Gesprochenen

## E. Was ausdrücklich erlaubt ist

Damit der Scanner nicht Alex' Stimme wegbügelt:

- Selbstkorrektur mitten im Satz: „also — nein, eigentlich ist es
  schlimmer". Ein Gedankenstrich pro 40 Wörter ist dafür da.
- Satzfragmente. „Mit Claude." „Den Kunden, nicht mich."
- „halt", „eh", „quasi", „irgendwie" in Maßen: das ist Sprechen.
- Anglizismen, wo das Deutsche gestelzt wäre: Hook, Reel, Funnel,
  Prompt, Agent, Terminal.
- Ein trockener Nachsatz als Pointe. Keine Ausrufezeichen, nie.

## Nutzung

1. Scanner läuft in der Skript-Engine automatisch nach jedem Entwurf
   und vor dem Kritiker-Pass. Score ≥ 3 löst eine Überarbeitung aus,
   Score ≥ 6 nach der Überarbeitung verwirft das Skript.
2. In Claude-Code-Sessions: jedes Skript vor dem Ablegen in
   `skripte/` gedanklich gegen A bis D prüfen. Treffer werden nicht
   umformuliert, sondern der Satz wird neu gesagt, so wie Alex ihn
   beim Gehen sagen würde.
3. Neue Tells kommen dazu, wenn Alex ein Skript als „generisch"
   zurückgibt: den Grund benennen, hier eintragen, Scanner nachziehen.
