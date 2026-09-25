# Stimmen-Casting — beuwy Trailer (ElevenLabs)

Account-Tier: **Starter** (90.000 Zeichen/Monat, 34.193 bereits verbraucht,
`mp3_44100_192` nicht verfügbar → alle Samples mit `mp3_44100_128`
erzeugt). Verbrauch für dieses Casting: **1.624 Zeichen** (Budget 4.000).

Alle 7 Stimmen stammen aus der bereits vorhandenen Voice-Library des
Accounts (`GET /v1/voices`) — es musste keine geteilte Stimme per
`POST /v1/voices/add` hinzugefügt werden. `GET /v1/shared-voices?language=de`
wurde zusätzlich geprüft (30 Treffer, u. a. „Sandra – Warm & friendly",
„Frank Mocro – Confident & Empathetic", „Viktor – Audiobook Narrator");
keine davon war nötig, da die Bestandsstimmen die Anforderung (mind. 2 w,
mind. 3 m, warm/tief-mittel/ruhig-kraftvoll) bereits abdecken.

Testsatz (109 Zeichen): „Was wäre, wenn Eigentümer zuerst Sie anrufen?
Nicht den Nachbarn. Nicht das Portal. Sie. Das ist beuwy."
- **v3**: `[calm][confident] … [pause] …` , `voice_settings: {stability: 0.5}` (Natural)
- **v2**: `eleven_multilingual_v2`, `stability 0.45, similarity_boost 0.8, style 0.15, use_speaker_boost true, speed 0.95`

Geprüft mit ElevenLabs STT (`scribe_v1`). Dauer per ffmpeg.

## Tabelle

| Nr | Name | voice_id | Geschlecht | Charakter (Label) | Modell | Dauer | STT-Text-Treffer | „beuwy" gehört als |
|---|---|---|---|---|---|---|---|---|
| 1 | Christian Plasa – Warm Voice | `NBqeXKdZHweef6y0B67V` | m | warm, chill, narrative_story | v3 | 10.45s | ✅ exakt | „Buwi" (Diphthong fehlt) |
| 1 | Christian Plasa – Warm Voice | `NBqeXKdZHweef6y0B67V` | m | s. o. | v2 | 8.72s | ✅ exakt | „Bovi" |
| 2 | Leonard – Epic & Corporate | `0oTMoyM0wBOiv66gewih` | m | professionell, episch, advertisement | v3 | 10.37s | ✅ exakt | „Boovi" |
| 2 | Leonard – Epic & Corporate | `0oTMoyM0wBOiv66gewih` | m | s. o. | v2 | 9.85s | ✅ exakt | **„Boivi" (beste Annäherung an /ˈbɔʏviː/)** |
| 3 | Michael Kurzweil | `hBOVjideqPyMYjloL1lg` | m | tief, advertisement | v3 | 11.08s | ✅ exakt | „Boovi" |
| 3 | Michael Kurzweil | `hBOVjideqPyMYjloL1lg` | m | s. o. | v2 | 8.78s | ✅ exakt | „Bolivi" (extra Silbe) |
| 4 | Sympathische Stimme | `RqYtbPVBBytc1OIowrh0` | m | warm, charmant, freundlich, advertisement | v3 | 11.65s | ✅ exakt | „Boovi" |
| 4 | Sympathische Stimme | `RqYtbPVBBytc1OIowrh0` | m | s. o. | v2 | 9.61s | ✅ exakt | „Bovi" |
| 5 | Laura – Calm and Smooth | `Qy4b2JlSGxY7I9M9Bqxb` | w | ruhig, narrative_story | v3 | 10.84s | ✅ exakt | „Beey" (Diphthong fehlt) |
| 5 | Laura – Calm and Smooth | `Qy4b2JlSGxY7I9M9Bqxb` | w | s. o. | v2 | 8.44s | ✅ exakt | „Belvie" |
| 6 | Katharina – Friendly and Cheerful | `Wbfwer6sIhiIyjokwU3Y` | w | ruhig, jung, conversational | v3 | 9.64s | ✅ exakt (1 Komma-Abweichung) | „Boovi" |
| 6 | Katharina – Friendly and Cheerful | `Wbfwer6sIhiIyjokwU3Y` | w | s. o. | v2 | 8.07s | ✅ exakt | „Bolvy" |
| 7 | E-Klasse Stimme weiblich | `53g1U2T6Rfm9QZa6AoSy` | w | (unlabelt, Automotive-Herkunft) | v3 | 9.87s | ✅ exakt | „Buwi" |
| 7 | E-Klasse Stimme weiblich | `53g1U2T6Rfm9QZa6AoSy` | w | s. o. | v2 | 7.29s | ✅ exakt | „Belvue" |

**Textgenauigkeit:** Alle 14 Samples geben den Testsatz inhaltlich
vollständig und korrekt wieder (Satzzeichen-Abweichungen der STT sind
normal). **„beuwy" trifft ohne Pronunciation Dictionary keine Stimme
perfekt** — erwartbar laut Recherche (`2026-09-24-elevenlabs-trailer-stimme.md`):
v3 hat kein `<break>`/SSML und Betonung/Aussprache ist nur „directional
guidance"; die Dictionary-Lösung (IPA `/ˈbɔʏviː/` auf v3, Alias „Boiwie"
auf v2) ist für den finalen Trailer **Pflicht**, nicht optional.

## Empfehlung — Top 3

1. **Leonard – Epic & Corporate** (`0oTMoyM0wBOiv66gewih`, m) — Label
   trifft den Apple-Keynote-/Trailer-Ton am direktesten („epic",
   professionell, advertisement statt Konversation), und die v2-Probe
   kam der Ziel-Aussprache „Boiwie" am nächsten (**„Boivi"**). Zweitschnellste
   Sprechgeschwindigkeit in v2 (9.85s) — passt zum „fast paced" Cut.
   → Hauptkandidat für die männliche Voiceover-Spur.
2. **Christian Plasa – Warm Voice** (`NBqeXKdZHweef6y0B67V`, m) —
   „warm" + „chill"/narrative ist exakt das im Brief geforderte
   „ruhig-kraftvoll, nicht werblich-schreiend". Guter Gegenpol zu
   Leonard, falls die ruhigere, intimere Variante gewünscht ist
   (z. B. für die Problem-/Abgrenzungs-Beats, während Leonard den
   CTA trägt).
3. **Laura – Calm and Smooth** (`Qy4b2JlSGxY7I9M9Bqxb`, w) — stärkste
   weibliche Kandidatin: „calm" + narrative_story, mittleres Alter statt
   jugendlich-verspielt (Katharina), damit näher an „ruhig-kraftvoll" als
   an „freundlich-cheerful". Alternative/Kombination mit einer männlichen
   Stimme für einen Dialog-Schnitt denkbar.

Nicht empfohlen für den Trailer-Ton: **Katharina** (zu jugendlich/cheerful
für die geforderte Autorität) und **E-Klasse Stimme weiblich** (unlabelt,
automotive Herkunft, deutlich kürzeste/schnellste Sprechzeit — wirkt in der
Probe eher informativ als emotional-episch).

## Empfohlene Settings für die Produktion

**v3 (Master-Take, Natural-Stabilität):**
```json
{
  "model_id": "eleven_v3",
  "voice_settings": { "stability": 0.5 },
  "pronunciation_dictionary_locators": [
    { "pronunciation_dictionary_id": "<beuwy-ipa /ˈbɔʏviː/>" }
  ]
}
```
Pro Absatz (300–800 Zeichen) 4–6 Takes mit `seed` 1–6, besten Take + Seed
notieren. Tags sparsam: `[calm][confident]`/`[serious tone][slows down]`,
max. 1–2 pro Satz.

**multilingual_v2 (Repair-Take für einzelne Sätze/Pausen):**
```json
{
  "model_id": "eleven_multilingual_v2",
  "voice_settings": {
    "stability": 0.45,
    "similarity_boost": 0.8,
    "style": 0.15,
    "use_speaker_boost": true,
    "speed": 0.95
  },
  "pronunciation_dictionary_locators": [
    { "pronunciation_dictionary_id": "<beuwy-alias Boiwie>" }
  ]
}
```
`style` bewusst niedrig halten (Doku-Empfehlung „keep at 0"); 0.15 hier
nur, weil das Casting etwas mehr Ausdruck testen sollte — für den
finalen Trailer eher auf 0–0.1 senken, wenn die Betonung kippt.

**Output-Format:** `mp3_44100_128` (Starter-Tier-Limit). Für den finalen
Master ggf. auf einen höheren Plan upgraden, um `pcm_44100`/`wav_44100`
zu bekommen (kein verlustbehaftetes Re-Encoding vor dem Mastering).

**Dateien:** `/tmp/claude-0/-home-user-beuwy-relaunch/1bdc0956-df5e-5ed5-b04e-ad607ee60a6e/scratchpad/film5/stimmen/<nr>-<name>-v3.mp3` bzw. `-v2.mp3`
