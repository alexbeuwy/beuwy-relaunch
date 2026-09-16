# Stimmkorpus — echte Sätze von Alex

Das Sprachprofil beschreibt die Stimme. Der Korpus **ist** die Stimme.
Ein Modell, das Regeln liest, schreibt Regeln nach. Ein Modell, das
zwanzig echte Sätze hört, schreibt den einundzwanzigsten. Das ist der
Unterschied zwischen „klingt nach Berater" und „klingt nach Alex".

Die Forschung dazu ist eindeutig und ernüchternd zugleich: Few-Shot mit
eigenen Texten ist das, was den Stil trägt, und nach 4–5 gut gewählten
Beispielen je Register bringt mehr kaum noch etwas (arXiv 2509.14543,
2604.26460). Also: wenig, aber echt. Kein Satz hier ist erfunden.

Die Skript-Engine liest diese Datei zur Laufzeit und gibt sie dem Modell
mit der Anweisung: **Rhythmus, Wortwahl und Satzlänge übernehmen, keinen
Satz kopieren.**

---

## 1. Wie der Korpus gefüllt wird

**Quelle A: Rohaufnahmen aus OBS** (Ordner `Filme/Reels`). Auf dem Mac:

```bash
pip install mlx-whisper            # Apple Silicon, schnellste Variante
mlx_whisper IMG_5215.MOV --model mlx-community/whisper-large-v3-turbo \
  --language de --word-timestamps True --output-format txt
```

Aus jedem Transkript die 3–5 Sätze nehmen, die **nur Alex** so sagen
würde: mit Selbstkorrektur, mit „halt", mit konkreter Zahl, mit trockener
Pointe. Nicht die sauberen Sätze, die unsauberen.

**Quelle B: Sprachmemos und Chat-Nachrichten.** Alles, was Alex ohne
Nachdenken tippt oder spricht. Das Register „geschrieben, beiläufig"
ist eine eigene Sektion, weil Captions und Reel-Texte daraus kommen.

**Quelle C: Kundengespräche.** Wenn Alex ein Projekt erklärt, entstehen
die Sätze, die in Säule (c) landen.

Pflege: Sonntags mit dem Wochen-Review. Sätze rein, die in der Woche
gefallen sind. Sätze raus, die Alex nicht mehr sagen würde.

---

## 2. Gesprochen (Transkripte)

> Noch leer. Erste Füllung: drei OBS-Aufnahmen transkribieren, je 3–5
> Sätze hierher. Ziel: 15–25 Sätze.

Wenn Sätze hier stehen, werden die Kalibrier-Beispiele aus dem
Sprachprofil zweitrangig. Bis dahin gelten sie als Ersatz:

- „Ich hab diese Website in einem Tag gebaut. Mit Claude. Und sie hat
  3.400 € gekostet — den Kunden, nicht mich."
- „Selbstständigkeit heißt: Dienstag um 11 im Baumarkt stehen und
  trotzdem mehr verdienen als früher im Quartal."
- „Jeder kann jetzt alles bauen. Deshalb sieht auch alles gleich aus.
  Genau da verdient man jetzt Geld."

---

## 3. Geschrieben, beiläufig (Chat, Memos)

Echte Sätze von Alex aus Arbeitsnachrichten (September 2026). Register:
tippt schnell, kleinschreibung egal, Gedanke vor Grammatik.

- „ich möchte hier bitte endlich nach 50 versuchen mit allen LLMs einen
  bomben skript-writer hinbekommen der meinen stil trifft"
- „die skripte sind aber immer super LLM generic."
- „das ist halt für mich super interessant."
- „so kurz eingeblendet, dass man es nicht schnell genug lesen kann
  wodurch man das reel anhält, länger drauf verweilt oder öfter guckt."
- „ich will wissen ob du das alles strategisch besser machen kannst"
- „er schneidet, macht zoom ins, größensprünge 115-100 % usw. damit es
  alle 2 sekunden engaging bleibt"

Was man daran hört: Superlative sind trocken („bomben", „super"), keine
Ausrufezeichen, Zahlen immer dabei, Anglizismen ohne Scheu, wenn sie
kürzer sind („generic", „engaging"), Nebensätze werden mit „wodurch",
„damit" angehängt statt neu angesetzt.

---

## 4. Wie Alex Dinge nennt

Vokabular, das in Skripten vorkommen darf, weil es seins ist:

| Alex sagt | nicht |
|---|---|
| Claude, Codex, der Agent | „die KI", „das Tool" |
| der Kunde, das Projekt | „der Klient", „der Case" |
| Website, Seite | „Webpräsenz", „Onlineauftritt" |
| Reel, Hook, Funnel, Prompt | deutsche Umschreibungen |
| Baumarkt, Auto, Küche | „Homeoffice" |
| beuwy | „meine Agentur", „mein Unternehmen" |
| Rohbauer, Bank, Wohnung, Bankrate | „Immobilieninvestment", „Objekt" (Phase 2) |
| „hinbekommen", „bauen", „rausholen" | „realisieren", „umsetzen", „implementieren" |

---

## 5. Was Alex nie sagt

Ergänzt `KI-TELLS.md` um Persönliches. Hier landet alles, was ein
Skript verraten würde, auch wenn es kein allgemeines KI-Muster ist.

- „Leute", „Freunde", „Community" als Anrede
- „Ich bin so dankbar", „ich bin stolz"
- „Meine Reise", „mein Weg", „mein Warum"
- „Hustle", „Grind", „Grinden"
- Ein Ausrufezeichen. Irgendwo.
