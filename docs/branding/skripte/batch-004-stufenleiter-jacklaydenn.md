# Batch 004 — Ein Skript, Skelett von @jacklaydenn (Stufenleiter)

> Eingabe: „Schreib mir EIN Skript nach den viralen Strukturen: Open Loop,
> Hook, fast paced, Retention-Kurve" + Link DarwoM2M-kS
> Referenz: `../referenzen/jacklaydenn-DarwoM2M-kS.md` — echtes Transkript
> (38,5 Sek., 144 Wörter, 225 Wörter/Min, 9.183 Likes, 171 Kommentare,
> gepostet 2026-07-12), Skelett 8 „Stufenleiter"
> Datum: 2026-09-16 · Säule: c · Status: offen
> Fakten: Claude, Vercel, 3.400 € an einem Tag (Protokoll/Batch 001),
> Design-Tokens, Sprachprofil und KI-Tells-Scanner aus dem beuwy-Repo.
> Kein Wort der Referenz übernommen.

---

## Skelett (aus der Referenz, 38 Sekunden)

| % | Sek. | Beat | Funktion |
|---|---|---|---|
| 0–17 | 0–6 | Hook | Allgemeingültige Behauptung + „es gibt 5 Stufen" + Achse, an der der Zuschauer sich selbst misst |
| 17–26 | 6–10 | Stufe 1 + 2 | Schnellfeuer, 2 Stufen in 3,5 Sek. |
| 26–51 | 10–19 | Stufe 3 | Selbstbeleg im Bild, echte Namen |
| 51–80 | 19–30 | Stufe 4 | Verschachtelter Open Loop („dafür müssen ein paar Dinge stimmen") + Schnellliste + Quelle |
| 80–100 | 30–38 | Stufe 5 | Reward: die Stufe, auf der Alex steht, mit der Zahl |
| — | 38–40 | Loop | Ein Satz zurück zum Hook (Phase 1: Loop statt offenem Ende) |

Retention-Kurve: Loop bei Sekunde 3 auf, erst bei Sekunde 30 zu. Zweiter
Loop bei Sekunde 22, nach 2 Sekunden zu. Beats werden nach oben länger.

---

## Skript 1 — Fünf Stufen · Säule (c) · Skelett 8 (Referenz) · ~38 Sek.

**Hooks (Text on screen, ≤ 8 Wörter):**

- Pattern-Interrupt: „5 Stufen. Die meisten hören bei 2 auf."
- Kontra-These: „Deine KI-Website ist Stufe 1. Deshalb billig."
- Konkrete Zahl: „Stufe 5: 3.400 €. Stufe 1: 0 €."

**Body (gesprochen):**

> Jede Firma lässt sich gerade eine Website mit KI bauen. Aber davon gibt
> es fünf Stufen, und auf welcher du landest, entscheidet, ob dafür
> dreitausendvierhundert Euro drin sind oder null.
>
> Stufe eins: Baukasten. Vorlage, Logo rein, fertig. Stufe zwei: Baukasten,
> aber die Texte kommen aus ChatGPT.
>
> Stufe drei: Claude baut die Seite. Echter Code, an einem Tag auf Vercel,
> so wie die hier oben. Der Kunde merkt den Unterschied, auch wenn er
> nicht sagen kann, woran.
>
> Stufe vier: Claude baut die Seite mit einem Design-System und einem
> Sprachprofil. Dafür müssen ein paar Dinge stimmen. Farben und Abstände
> als Regeln, kein Text ohne echte Sätze vom Kunden, und ein Scanner, der
> KI-Deutsch rauswirft. Alles aus meinem eigenen Repo.
>
> Und Stufe fünf ist Geschmack. Entscheiden, was rausfliegt. Jeder hat
> jetzt Claude, deshalb sieht alles gleich aus. Wer rauswirft, was alle
> haben, baut die Seite, die der Kunde herumzeigt. Das ist die Stufe, für
> die dreitausendvierhundert Euro bezahlt werden. Für einen Tag.

**Loop/Ende (ohne CTA):**

> Und die meisten hören bei zwei auf.

**Regie:** Talking Head unten, Handmikro, Schreibtisch. Oben je Stufe eine
Karte, die von Stufe 1 bis 5 ruhiger und größer wird: 1 und 2 blitzen
nur, 5 steht 6 Sekunden. Bei Stufe 3 „so wie die hier oben" wortwörtlich:
die echte Kundenseite scrollt oben. Bei Stufe 4 die drei Dinge als
Schnellliste, zu kurz zum Lesen. Bei Stufe 5 das Terminal, in dem
Abschnitte gelöscht werden.

**Schnittplan:**

```
 0.0  voll   schnitt   Talking Head, Schreibtisch, Alex lehnt sich rein
 0.0  oben   copy      „5 Stufen. Die meisten hören bei 2 auf."
 2.0  oben   karte     Leiter, 5 leere Stufen
 4.0  unten  zoom      115 %
 5.5  oben   flash     „3.400 € oder 0 €" (1,0 Sek.)
 6.5  oben   karte     „1 · Baukasten" (0,8 Sek., blitzt)
 8.0  oben   karte     „2 · Baukasten + ChatGPT" (0,8 Sek., blitzt)
 9.5  unten  zoom      100 %
10.5  oben   karte     „3 · Claude baut Code"
12.5  oben   screen    echte Kundenseite, Scroll (Name geschwärzt)
14.5  oben   flash     „Vercel · 1 Tag" (1,0 Sek.)
16.5  unten  zoom      115 %
19.0  oben   karte     „4 · Design-System + Sprachprofil"
21.5  oben   screen    globals.css, Tokens scrollen
23.5  oben   flash     „Tokens · Korpus · Scanner" (1,2 Sek., zu schnell)
25.5  oben   screen    Scanner-Befund, rote Treffer werden grün
28.0  unten  zoom      100 %
30.0  oben   karte     „5 · Geschmack" (bleibt bis 36.0)
32.0  oben   screen    Claude-Terminal, Alex löscht Abschnitte
34.5  unten  zoom      115 %
36.0  oben   flash     „3.400 € · 1 Tag" (1,2 Sek.)
38.0  voll   schnitt   Anfangsbild, Leiter mit 5 leeren Stufen
```

**Tells:** Score 0 (Scanner-Lauf 16.09.). Zahlen: 5, 3.400, 1 Tag. Ich: 1×. Namen: ChatGPT, Claude, Vercel.

---

Referenz: `../referenzen/jacklaydenn-DarwoM2M-kS.md` · Skelette:
`../SKELETTE.md` · Gate: `../KI-TELLS.md` · Sprache: `../SPRACHPROFIL.md`
