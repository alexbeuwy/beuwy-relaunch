# ElevenLabs auf Trailer-Niveau (Deutsch, VSL ~2 Min.)

Stand: 24.09.2026. Recherche aus offizieller Doku, Blog und Sekundärquellen.
Quellen stehen am Ende; Aussagen ohne Quelle sind als Praxis-Erfahrung
bzw. eigene Empfehlung markiert.

---

## Kurzfassung

1. **Die falsche Betonung ist bei reinem TTS nicht vollständig
   wegzuprompten.** v3 hat keine Regler für die Betonung einzelner
   Wörter und kein SSML. Betonung steuern Sie nur über Satzbau,
   Satzzeichen, GROSSSCHREIBUNG und Delivery-Tags. Die Doku nennt das
   selbst „directional guidance“, also Hinweise und keine Befehle.
2. **Der sicherste Weg zu perfekter Betonung ist Speech-to-Speech
   (Voice Changer).** Sie sprechen das Skript selbst mit genau der
   gewünschten Betonung und Dramaturgie ein. ElevenLabs tauscht nur das
   Timbre und behält „emotions, timing, pacing, and pronunciation“. So
   arbeiten Trailer-Produktionen de facto: Die Regie steckt in der
   Performance.
3. Wenn es reines TTS bleiben soll: **eleven_v3, Stabilität „Natural“
   (0.5)**, Absatz für Absatz generieren, **pro Absatz 4–6 Takes**,
   den besten auswählen, dann in der DAW/ffmpeg schneiden und mastern.
   Für einzelne kaputte Sätze auf **multilingual_v2 mit `<break>`,
   Request Stitching und fester Seed** zurückgreifen.
4. „beuwy“: Auf v3 ein **Pronunciation Dictionary mit IPA-Phonem**
   `/ˈbɔʏviː/` verwenden (Phoneme unterstützt v3 auch in Nicht-Englisch).
   Auf v2 einen **Alias** „Boiwie“ setzen. Beides case-sensitive, also
   `beuwy` und `Beuwy` jeweils anlegen.
5. Den Trailer-Sound macht die **Nachbearbeitung**: Hochpass, Boost im
   Tiefbass-Body, Präsenz, De-Esser, zweistufige Kompression, leichte
   Sättigung, kurzer Raum, danach Loudness-Normalisierung. Die
   ffmpeg-Kette steht in Abschnitt 6.

---

## 1. Modellwahl

| Modell | Deutsch | Stärken | Schwächen für Trailer |
|---|---|---|---|
| `eleven_v3` (GA seit März 2026, Flaggschiff) | ja, 70+ Sprachen | größte Ausdrucksbreite, Audio-Tags, IPA-Phoneme auch nicht-englisch, 5.000 Zeichen/Request | **kein SSML-`<break>`**, **kein Request Stitching**, in der UI kein Speed-, Similarity- oder Speaker-Boost-Regler, variiert stark von Take zu Take, bei „Creative“ Halluzinationen, **PVCs „underperform on v3“** |
| `eleven_multilingual_v2` | ja, 29 Sprachen | laut Doku „most stable“, konsistent, `<break time>` bis 3 s, Request Stitching, `speed`, `style`, Seed | weniger dramatische Bandbreite, Phoneme aus Dictionaries werden ignoriert (nur Alias) |
| `eleven_flash_v2_5` | ja | ~75 ms Latenz, halber Preis, 40k Zeichen | für Echtzeit-Agenten gebaut, klanglich unter den beiden anderen: **nicht für Trailer** |
| `eleven_v3_conversational` | ja | Echtzeit-v3 für Agenten | kein Stitching, für Voiceover irrelevant |
| Turbo v2.5 | – | ersetzt durch Flash | veraltet |

**Neuere Modelle 2026:** Nach v3 gibt es kein neues TTS-Modell. Laut
Changelog bis 21.09.2026 kamen nur API-Detailänderungen (u. a.
`enable_phoneme_tags` bei Agents standardmäßig an). Voice Design hat mit
`eleven_ttv_v3` ein v3-Pendant (auch mit Referenz-Audio). Speech-to-Speech
läuft weiterhin über `eleven_multilingual_sts_v2`.

**Empfehlung:** Den Master mit **v3** erzeugen. **multilingual_v2** dient
als Reparaturwerkzeug für Sätze, die präzise Pausen oder Stitching
brauchen. Die beste Qualität bekommen Sie mit **STS** (Abschnitt 5).

Wichtig für Alex' Klon (siehe `video/system-explainer/BRIEF.md`): Ist
der Klon ein **Professional Voice Clone**, klingt er auf v3 laut Doku
schlechter. Dann entweder einen IVC aus sehr ausdrucksstarkem Material
anlegen oder den PVC auf multilingual_v2 bzw. im Voice Changer nutzen.

## 2. voice_settings

### eleven_v3
- Wirksam ist vor allem **`stability`**. Die UI bietet drei Modi (die
  Werte stammen aus der Praxis, die UI rastet so ein):
  - **Creative ≈ 0.0**: am emotionalsten, reagiert am stärksten auf
    Tags, aber „prone to hallucinations“ (falsche Wörter, Geräusche,
    gesprochene Tags).
  - **Natural ≈ 0.5**: „closest to the original voice recording“,
    ausgewogen, reagiert noch gut auf Tags. **Für Trailer: Natural.**
  - **Robust ≈ 1.0**: sehr stabil, „less responsive to directional
    prompts“. Eher monoton, Tags wirken kaum.
- Similarity, Speaker Boost und Speed sind in der UI für v3 nicht
  verfügbar. Die API nimmt die Felder an, sie wirken aber kaum oder gar
  nicht. Das Tempo also über den Text steuern (kurze Sätze, Absätze,
  `[slows down]`) oder später per Time-Stretch in der Post.
- `seed` setzen, damit ein guter Take reproduzierbar bleibt.

### eleven_multilingual_v2 (Trailer-Setup)
| Parameter | bisher | Empfehlung Trailer | Begründung |
|---|---|---|---|
| stability | 0.5 | **0.35–0.45** für dramatische Bögen; 0.55–0.6 für ruhige, autoritative Passagen | Weniger Stabilität gibt mehr Melodie, aber mehr Ausreißer. Bei ernstem Ton höher, dann braucht es weniger Regenerationen (Doku). |
| similarity_boost | 0.8 | **0.75–0.85** | Zu hoch reproduziert Artefakte aus der Quellaufnahme. |
| style | 0.3 | **0–0.15** | Offizielle Empfehlung: „keep this setting at 0 at all times“. Style destabilisiert und verschiebt oft die Betonung. **Ein wahrscheinlicher Grund für die falschen Betonungen.** |
| use_speaker_boost | – | **true** | mehr Nähe zum Timbre, nur minimal mehr Latenz |
| speed | 1.06 | **0.92–0.98** | Trailer-Sprache ist langsamer und gewichtiger. 1.06 hetzt und drückt die Betonung flach. Gültiger Bereich 0.7–1.2. |

## 3. Audio-Tags, Pausen, Betonung, SSML

### Tags, die offiziell dokumentiert sind (Doku + ElevenLabs-Blog)
- **Emotion/Ton:** `[calm]` `[serious tone]` `[dramatic]` `[dramatic tone]`
  `[reflective]` `[matter-of-fact]` `[excited]` `[curious]` `[sarcastic]`
  `[sorrowful]` `[flatly]` `[deadpan]` `[resigned tone]` `[lighthearted]`
- **Delivery/Tempo:** `[whispers]` `[softly]` `[quietly]` `[shouts]`
  `[slows down]` `[deliberate]` `[drawn out]` `[rushed]` `[rapid-fire]`
  `[understated]`
- **Pausen:** `[pause]` `[pauses]` `[continues after a beat]`
  `[breathes]` `[exhales]` `[sighs]` `[hesitates]`
- **Betonung:** `[emphasized]` `[stress on next word]`
- **Genre/Rolle:** `[fantasy narrator]` `[classic film noir]` u. a.
  (`[movie trailer voice]` funktioniert je nach Stimme, ist aber nicht
  dokumentiert)
- **Nicht verwenden** (fürs VSL unpassend): SFX-Tags wie `[explosion]`,
  experimentelle Tags.

### Sprache und Platzierung
- **Tags auf Englisch**, auch wenn der Text deutsch ist. Die gesamte Doku
  und alle Beispiele sind englisch. Deutsche Tags werden häufiger
  vorgelesen (Praxis-Erfahrung, nicht offiziell belegt).
- Tag **vor** die Stelle setzen, ab der er gelten soll. Er wirkt etwa bis
  zum nächsten Tag oder Absatz. Mid-Sentence ist erlaubt
  (`… und dann [pause] ändert sich alles.`).
- **Sparsam:** 1 Tag pro Satz, höchstens 2 übereinander
  (`[serious tone][slows down]`). Bei Overtagging oder wenn der Tag nicht
  zur Stimme passt, **liest v3 den Tag laut vor** (Blog).
- Tag und Stimme müssen zusammenpassen: Eine tiefe, ruhige Stimme wird
  kein überzeugendes `[shouts]`.
- **Pro Request mehr als 250 Zeichen.** Kurze Prompts liefern laut Doku
  inkonsistente Ergebnisse. Deshalb absatzweise generieren (300–800
  Zeichen), nie Satz für Satz.

### Pausen
| Modell | Mittel |
|---|---|
| v3 | `[pause]`, `…` (Ellipse, gibt Pause und Gewicht), Gedankenstrich `–`, **Zeilenumbruch/Leerzeile** für längere Beats, Punkt statt Komma. **Kein `<break>`.** |
| v2 / flash v2.5 | `<break time="0.8s" />` (max. 3 s). Laut Doku bei vielen Breaks instabil, also höchstens ein paar pro Request. |
| alle | Präzise Pausen am zuverlässigsten **im Schnitt setzen**: Absätze einzeln generieren und die Stille in der Timeline bauen. |

### Betonung einzelner Wörter (der Kern des Problems)
In der Reihenfolge ihrer Wirksamkeit:
1. **Satzbau:** Das Wort mit der Betonung ans Satzende oder allein
   stellen. Deutsche Satzbetonung fällt natürlich auf das letzte
   Informationswort.
   Statt „Sie bekommen in sechs Wochen eine neue Marke.“ lieber
   „Eine neue Marke. In sechs Wochen.“
2. **GROSSSCHREIBUNG** eines Wortes (offiziell: „increases emphasis“).
   Nur ein Wort pro Satz. Bei ganzen Sätzen in Caps schreit die Stimme
   oder buchstabiert. Achtung im Deutschen: Kurze Wörter in Caps
   (z. B. „SIE“, „EIN“) werden manchmal wie Abkürzungen gelesen. Das
   ist erst getestet, wenn es gehört ist.
3. `[stress on next word]` / `[emphasized]` direkt vor dem Wort (v3).
4. **Isolieren per Satzzeichen:** „Nicht irgendeine Website. *Ihre*.“
   funktioniert als „… Website. Ihre.“ Punkt, Ellipse oder Gedankenstrich
   vor dem Wort erzwingen einen Akzent.
5. Kursiv, Markdown-`*` und Anführungszeichen: **nicht offiziell
   unterstützt.** Anführungszeichen erzeugen eher Zitat-Intonation und
   Sternchen werden mitunter gesprochen. Nicht verwenden.
6. Wiederholung („Wochen. Nicht Quartale. Wochen.“) funktioniert
   rhetorisch und prosodisch gut.

### SSML je Modell
| Feature | v3 | multilingual v2 | flash v2.5 | flash v2 (nur EN) |
|---|---|---|---|---|
| `<break>` | nein | ja (≤ 3 s) | ja | ja |
| `<phoneme>` inline | nein (aber IPA in `/…/` inline laut Best-Practices, ca. 80–90 % Trefferquote) | nein | nein | ja (CMU/IPA) |
| Dictionary-Phonem (PLS) | **ja, auch Deutsch** | ignoriert | ignoriert | ja |
| Dictionary-Alias | ja | ja | ja | ja |

## 4. Aussprache „beuwy“ (Boi-wie)

**A. Pronunciation Dictionary (empfohlen, gilt für alle Requests)**

`beuwy.pls`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<lexicon version="1.0"
  xmlns="http://www.w3.org/2005/01/pronunciation-lexicon"
  alphabet="ipa" xml:lang="de-DE">
  <!-- v3: Phonem; case-sensitive, daher alle Schreibweisen -->
  <lexeme><grapheme>beuwy</grapheme><phoneme>ˈbɔʏviː</phoneme></lexeme>
  <lexeme><grapheme>Beuwy</grapheme><phoneme>ˈbɔʏviː</phoneme></lexeme>
  <lexeme><grapheme>BEUWY</grapheme><phoneme>ˈbɔʏviː</phoneme></lexeme>
</lexicon>
```
Für multilingual v2 eine zweite Datei mit Alias (dort werden Phoneme
ignoriert):
```xml
<lexeme><grapheme>beuwy</grapheme><alias>Boiwie</alias></lexeme>
<lexeme><grapheme>Beuwy</grapheme><alias>Boiwie</alias></lexeme>
```
- Hochladen per `POST /v1/pronunciation-dictionaries/add-from-file`, danach
  im TTS-Request:
  `"pronunciation_dictionary_locators":[{"pronunciation_dictionary_id":"…","version_id":"…"}]`
  (max. 3 pro Request).
- Das Dictionary wird von oben nach unten gelesen und nur der erste
  Treffer zählt.
- Alias-Varianten zum A/B-Testen: „Boiwie“, „Boi-wie“, „Beuwie“. Das
  deutsche „eu“ wird zuverlässig /ɔʏ/, „wie“ zuverlässig /viː/. Eine
  Variante mit „y“ am Ende wird oft /ʏ/ oder englisch /i/ gelesen.
- Notlösung direkt im Text: auf v3 `/ˈbɔʏviː/`, sonst einfach „Boiwie“
  ins Sprechskript schreiben (die Untertitel kommen aus dem Studio-Text,
  nicht aus dem TTS-Text).
- Weitere Wörter gleich mit ins Dictionary: „onOffice“ (Alias
  „on Office“), „VSL“, „KI“ (Alias „K-I“ oder „Ka-I“), Zahlen wie
  „6 Wochen“ ausschreiben: „sechs Wochen“.

## 5. Werkzeuge

### Speech-to-Speech / Voice Changer (Top-Empfehlung für Betonung)
- `POST /v1/speech-to-speech/{voice_id}` mit `model_id:
  "eleven_multilingual_sts_v2"` (Deutsch unterstützt; laut Doku auch für
  Englisch besser als das englische Modell), `remove_background_noise:
  true` nur bei unsauberer Aufnahme (sonst leidet das Timbre).
- **Max. 5 Min. pro Datei, < 50 MB**. Also 2 Min. VSL in einem Stück
  oder in Absätzen. Kosten: 1.000 Zeichen pro Minute.
- Es bleiben erhalten: Timing, Pausen, Betonung, Emotion, **Akzent und
  Aussprache der Eingabe**. „beuwy“ also selbst richtig sprechen.
- Aufnahmetipps: ruhiger, trockener Raum, Pegel ohne Clipping,
  übertrieben dramatisch sprechen (STS glättet eher), Tempo der
  Zielstimme. Männliche Zielstimme mit tiefer Aufnahme ergibt weniger
  Artefakte.
- Settings (Praxis): stability 0.5–0.7, similarity 0.8–0.9, style 0.
- Workflow: 3 Takes selbst einsprechen, den besten Take (oder das Beste
  pro Absatz) per STS umwandeln, 2–3 Varianten erzeugen, auswählen.

### Voice Design / Voice Library (tiefe deutsche Trailer-Stimme)
- **Voice Design v3** (`POST /v1/text-to-voice/design`,
  `model_id: "eleven_ttv_v3"`): Beschreibung (20–1.000 Zeichen) plus
  Vorschautext (100–1.000 Zeichen) ergeben 3 Previews. `loudness`
  (-1…1, 0 ≈ −24 LUFS), `guidance_scale` niedrig halten bei langen
  Beschreibungen, `seed`. Optional Referenz-Audio.
  Beispielprompt:
  > „Männlicher Sprecher, mittleres Alter, sehr tiefe, sonore
  > Baritonstimme, akzentfreies Hochdeutsch, ruhig und autoritär,
  > langsames, bewusstes Tempo, dezente Rauheit, nah am Mikrofon
  > aufgenommen, Studioqualität. Premium-Werbespot- und
  > Kinotrailer-Sprecher.“
  Previewtext sollte ein echter VSL-Absatz sein, damit die Betonung
  gleich mitgetestet wird. Speichern per `POST /v1/text-to-voice`
  (generated_voice_id).
- **Voice Library:** Filter Sprache = Deutsch, Use Case =
  „Advertisement/Narration“, Suche nach „trailer“, „deep“, „cinematic“,
  „Werbung“. Über die API nur mit kostenpflichtigem Plan nutzbar.
  Vorher Lizenz und Hinweise zur kommerziellen Nutzung der jeweiligen
  Stimme prüfen.
- Auf v3 Designed Voices bzw. IVCs bevorzugen, **keine PVCs**.

### Studio (Projects)
- Kapitel/Absätze einzeln regenerieren, **Pronunciations-Editor**
  (Dictionary direkt im Projekt), Takes vergleichen, Export als WAV. Gut
  für einen Durchgang ohne Code.

### Mehrere Takes
- Das Modell ist nicht deterministisch. Laut Doku: bei lebhafter
  Sprache niedrigere Stabilität und regenerieren, bis es passt.
- Per API: denselben Absatz mit `seed` 1…6 generieren, den besten Take
  auswählen und den Seed notieren. Mit gleichem Seed und gleichem Text
  ist der Take weitgehend reproduzierbar.
- Ausgabe als `output_format=pcm_44100` oder `wav_44100` (Pro+),
  mindestens `mp3_44100_192`. Keine 128-kbit-MP3 in den Master geben.

### Request Stitching (`previous_request_ids`)
- Nur **multilingual v2 / flash**, **nicht bei eleven_v3**, die API
  lehnt es dort ab. Bis zu 3 vorherige/nächste Request-IDs aus dem
  Response-Header `request-id`, gültig 2 Stunden. Alternativ gibt es
  `previous_text`/`next_text` (auf v3 nicht dokumentiert, im Test
  prüfen).
- Nutzen: Die Prosodie läuft über Absatzgrenzen hinweg weiter, ohne
  „Satzanfang-Reset“.
- Auf v3 als Ersatz: große Absätze (≤ 5.000 Zeichen) generieren und an
  natürlichen Pausen schneiden.

### Wortgenaue Zeitmarken (für die Headline-Sync im VSL)
- TTS: `POST /v1/text-to-speech/{voice_id}/with-timestamps`.
- Bei STS gibt es keine Zeitmarken. Dann das fertige Audio plus Text durch
  ElevenLabs **Forced Alignment** oder Scribe (STT mit Wort-Timestamps)
  schicken.

## 6. Nachbearbeitung: Trailer-Sound

Ziel: nah, groß, dicht, konstant laut, ohne scharfe S-Laute. Reihenfolge:
Aufräumen → EQ → De-Ess → Kompression (2 Stufen) → Sättigung → Raum →
Loudness → Limiter.

```bash
ffmpeg -i vo_raw.wav -af "\
highpass=f=70:poles=2,\
equalizer=f=250:t=q:w=1.2:g=-2.5,\
equalizer=f=110:t=q:w=1.0:g=3,\
equalizer=f=3200:t=q:w=1.0:g=2.5,\
equalizer=f=11000:t=h:w=0.7:g=2,\
deesser=i=0.4:m=0.5:f=0.5,\
acompressor=threshold=-20dB:ratio=3:attack=15:release=120:makeup=3:knee=4,\
acompressor=threshold=-12dB:ratio=6:attack=3:release=60:makeup=2,\
asoftclip=type=tanh:threshold=0.9:output=1,\
aecho=0.85:0.25:28|43:0.18|0.12,\
loudnorm=I=-16:TP=-1.5:LRA=7,\
alimiter=limit=0.84:attack=3:release=40\
" -ar 48000 -c:a pcm_s24le vo_trailer.wav
```

Erklärung und Stellschrauben:
- `highpass 70 Hz`: Rumpeln raus, der Tiefbass-Body bleibt.
- `-2.5 dB @250 Hz`: Mulm und „Pappkarton“-Klang raus. `+3 dB @110 Hz`:
  der „Trailer-Brustton“ (bei Frauenstimmen 180–200 Hz).
- `+2.5 dB @3,2 kHz`: Präsenz und Verständlichkeit. `High-Shelf @11 kHz`:
  Luft.
- `deesser`: nach dem Präsenz-Boost nötig. Falls die Version keinen
  `deesser` hat, stattdessen `equalizer=f=6500:t=q:w=2:g=-3`.
- Zwei Kompressoren: erst langsam (Dichte), dann schnell (Spitzen). Das
  ist die „upward/constant“-Dichte, die man aus Trailern kennt.
- `asoftclip`: leichte Röhren- und Tape-Sättigung. Für mehr Wärme
  `threshold` senken (0.8). `aexciter` ist eine Alternative für Obertöne.
- `aecho` mit sehr kurzem Delay: kleiner Raum statt Hall. Die Stimme wird
  „geerdet“, rückt aber nicht nach hinten. Für Kino-Hallfahne am
  Satzende besser in der DAW einen Plate-Send mit Automation setzen, das
  kann ffmpeg nicht sauber.
- `loudnorm -16 LUFS / −1,5 dBTP` für Web/Social (YouTube und
  Instagram normalisieren auf etwa −14 LUFS). Das Voiceover allein vor
  der Musikmischung eher auf −18 LUFS bringen, Musik mit
  `sidechaincompress` ducken:
  `[music][vo]sidechaincompress=threshold=0.05:ratio=8:attack=20:release=300`.
- Für genauere Werte `loudnorm` in zwei Durchgängen laufen lassen
  (erster Durchgang mit `print_format=json`, dann die gemessenen Werte
  übergeben).
- Hinweis: Die Kette ist nach ffmpeg-Filterdoku geschrieben, konnte hier
  aber nicht ausgeführt werden, weil ffmpeg im Container nicht installiert
  ist. Deshalb vor der Freigabe einmal anhören. Die EQ-Werte hängen
  von der Stimme ab.

Optional „Apple-Spot“ statt „Kino“: weniger Bass (+1,5 dB @120), kein
Raum, weniger Sättigung, trocken und nah. Apple-Werbung ist fast
komplett trocken.

## 7. Empfohlener Workflow (Schritt für Schritt)

**Phase 0: Skript sprechbar machen (größter Hebel gegen falsche
Betonung)**
1. Den Studio-Text in ein separates **Sprechskript** kopieren. Die
   Untertitel bleiben beim Studio-Text.
2. Sätze kürzen (≤ 12 Wörter). Das Betonungswort ans Satzende setzen.
   Zahlen, Abkürzungen und Marken ausschreiben („sechs Wochen“,
   „K-I“). Keine Klammern, kein Doppelpunkt vor Aufzählungen.
3. Pro VSL-Beat (Hook → Problem → Abgrenzung → Beweis → Qualifizierung
   → CTA) einen Absatz von 300–800 Zeichen anlegen. Zwischen den Beats
   eine Leerzeile.
4. Pro Satz höchstens ein Wort in CAPS, pro Absatz 1–3 englische Tags.

Beispiel (v3):
```
[serious tone][slows down] Die meisten Makler verlieren ihre besten Aufträge nicht an bessere Makler.
[pause] Sondern an bessere AUFTRITTE.

[matter-of-fact] Eine Website, die nach 2014 aussieht. Ein Instagram-Profil, das seit Monaten schweigt … und ein Eigentümer, der genau das sieht.

[calm][deliberate] Boiwie baut Ihnen Marke, Website und Anfragen-System. In Wochen. [pause] Nicht in Quartalen.

[understated] Zusammenarbeit anfragen. Den Rest übernehmen wir.
```

**Phase 1: Stimme festlegen**
5. 2–3 Kandidaten: Alex-IVC (kein PVC auf v3), eine Voice-Design-v3-Stimme
   (Prompt oben), eine Library-Stimme. Jeweils mit Hook und CTA testen.

**Phase 2a: Weg A, Speech-to-Speech (beste Betonung)**
6. Alex spricht das Sprechskript 3× ein (WAV, 48 kHz, trockener Raum,
   bewusst dramatisch und langsam).
7. `POST /v1/speech-to-speech/{voice_id}?output_format=pcm_44100`
   mit `model_id=eleven_multilingual_sts_v2`,
   `voice_settings={"stability":0.6,"similarity_boost":0.85,"style":0}`,
   pro Absatz 2–3 Generierungen, dann die besten auswählen.

**Phase 2b: Weg B, reines TTS**
7. Pro Absatz:
```json
POST /v1/text-to-speech/{voice_id}?output_format=pcm_44100
{
  "model_id": "eleven_v3",
  "text": "<Absatz, 300–800 Zeichen, mit Tags>",
  "language_code": "de",
  "voice_settings": { "stability": 0.5 },
  "seed": 1,
  "pronunciation_dictionary_locators": [
    { "pronunciation_dictionary_id": "<beuwy-ipa>", "version_id": "<v>" }
  ]
}
```
   Seeds 1–6 durchgehen, pro Absatz den besten Take und Seed notieren.
   Klingt ein Absatz zu flach, auf Creative (0.0) gehen und mehr Takes
   erzeugen. Halluziniert er, auf Robust (1.0) gehen und die Tags
   reduzieren.
8. Reparatur einzelner Sätze, deren Betonung auf v3 nicht sitzt:
```json
{
  "model_id": "eleven_multilingual_v2",
  "text": "Nicht in Quartalen. <break time=\"0.6s\" /> In Wochen.",
  "voice_settings": { "stability": 0.45, "similarity_boost": 0.8,
                      "style": 0, "use_speaker_boost": true, "speed": 0.95 },
  "previous_request_ids": ["<request-id des vorigen v2-Absatzes>"],
  "seed": 3,
  "pronunciation_dictionary_locators": [ { "pronunciation_dictionary_id": "<beuwy-alias>" } ]
}
```
   Achtung: v2 und v3 klingen mit derselben Stimme leicht verschieden.
   Deshalb nur ganze Sätze tauschen, keine Wörter.
   Hilft auch das nicht, diesen einen Satz per STS einsprechen.

**Phase 3: Schnitt und Mastering**
9. Takes in der Timeline zusammensetzen, Pausen im Schnitt setzen
   (0,4–1,2 s zwischen Beats, vor dem CTA bewusst länger), Atmer
   kürzen, nicht löschen.
10. ffmpeg-Kette aus Abschnitt 6 auf das zusammengesetzte VO anwenden,
    danach die Musik mit Ducking unterlegen und final auf −14 bis
    −16 LUFS bringen.
11. Zeitmarken: Bei TTS-Weg die Timestamps aus `/with-timestamps`
    übernehmen. Beim STS-Weg nach dem Schnitt Forced Alignment laufen
    lassen, dann die Headlines im Video synchronisieren.

**Code-Hinweis:** `src/lib/os/stimme.ts` nutzt aktuell multilingual_v2
mit `style: 0.35`. Für die Reels ist das gewollt („Sprachmemo“). Das
VSL-Voiceover sollte einen eigenen Pfad mit den Settings oben bekommen,
statt `stimme.ts` umzubauen.

---

## Quellen

- Prompting Eleven v3 (Stabilitätsmodi, Tags, Ellipsen, Caps, kein `<break>`, PVC-Hinweis): https://elevenlabs.io/docs/best-practices/prompting/eleven-v3
- Best Practices TTS (IPA inline bei v3, Pausen je Modell): https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices
- Controls (break ≤ 3 s, phoneme, alias, Dictionaries case-sensitive, erster Treffer zählt, Speed 0.7–1.2): https://elevenlabs.io/docs/best-practices/prompting/controls
- Pronunciation Dictionaries (Phoneme nur flash_v2 + v3; IPA nicht-englisch nur v3): https://elevenlabs.io/docs/eleven-api/guides/how-to/text-to-speech/pronunciation-dictionaries
- TTS-Produktguide (Style „keep at 0“, v3 ohne Speed/Similarity/Speaker Boost, Regenerieren): https://elevenlabs.io/docs/eleven-creative/playground/text-to-speech
- API Create Speech (Parameter, Seed, Stitching, Output-Formate): https://elevenlabs.io/docs/api-reference/text-to-speech/convert
- Request Stitching (nicht für eleven_v3, IDs 2 h gültig): https://elevenlabs.io/docs/eleven-api/guides/how-to/text-to-speech/request-stitching
- Home-Assistant-Issue (API lehnt previous_request_ids bei v3 ab): https://github.com/home-assistant/core/issues/182944
- Modelle: https://elevenlabs.io/docs/models
- Changelog 2026: https://elevenlabs.io/docs/changelog
- v3 GA / Modellübersicht 2026: https://invideo.io/blog/elevenlabs-ai-voice-models/ und https://inworld.ai/resources/elevenlabs-v3-review
- Blog Delivery-Tags ([pause], [slows down], [stress on next word] …): https://elevenlabs.io/blog/eleven-v3-audio-tags-precision-delivery-control-for-ai-speech
- Blog Emotional Context: https://elevenlabs.io/blog/eleven-v3-audio-tags-expressing-emotional-context-in-speech
- Blog Character Direction ([dramatic], Genre-Tags): https://elevenlabs.io/blog/eleven-v3-character-direction
- Blog Audio Tags 101 (Overtagging, gesprochene Tags): https://elevenlabs.io/blog/v3-audiotags
- Prompt-Länge > 250 Zeichen (Suchergebnis zum v3-Guide): https://elevenlabs.io/docs/best-practices/prompting/eleven-v3
- Voice Changer (Modelle, 5 Min., Performance bleibt erhalten): https://elevenlabs.io/docs/capabilities/voice-changer und https://elevenlabs.io/docs/eleven-creative/playground/voice-changer
- Voice Design API: https://elevenlabs.io/docs/api-reference/text-to-voice/design und https://elevenlabs.io/blog/voice-design-v3
- Trailer-VO-Mixing (EQ, Kompression, Sättigung, kleiner Raum): https://www.boomlibrary.com/blog/sound-design-voice-over-and-music-for-film-trailers/

Nicht gefunden bzw. nicht belegt: offizielle Aussage zur Tag-Sprache
(englisch ist gängige Praxis); belastbare Reddit-Threads speziell zur
deutschen Betonung. Die Stabilitäts-Zahlenwerte 0/0.5/1 für die
v3-Modi sind aus der Praxis und nicht explizit dokumentiert.
