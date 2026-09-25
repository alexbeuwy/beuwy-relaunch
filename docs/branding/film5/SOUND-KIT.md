# Sound-Kit — beuwy Animationsfilm (Apple-Stil, fast paced, 60–75 s)

Erzeugt mit der ElevenLabs Sound-Effects-API (`POST /v1/sound-generation`),
`prompt_influence` durchgehend 0.5, kurze `duration_seconds`. 18 API-Aufrufe
verbraucht (Budget: max. 30). Alle Dateien liegen unter `sfx/` neben dieser
Datei, Pfad-Präfix:
`/tmp/claude-0/-home-user-beuwy-relaunch/1bdc0956-df5e-5ed5-b04e-ad607ee60a6e/scratchpad/film5/sfx/`

## SFX-Übersicht

| Datei | Dauer | Zweck / Einsatz im Film |
|---|---|---|
| `soft-whoosh-1.mp3` / `-2.mp3` | 0.7 s | Schneller, luftiger Whoosh für Schnitte, Karten-Whip, Logo-Zoom, o-Zoom-Übergänge. Zwei Varianten zur Abwechslung bei aufeinanderfolgenden Whip-Cuts, damit es nicht identisch klingt. |
| `deep-impact-1.mp3` / `-2.mp3` | 0.9 s | Tiefer Sub-Bass-Boom für harte Landungen: Logo-Reveal, große Zahl knallt ins Bild, Szenenwechsel auf Schwarz/Tinte-Hintergrund. Zwei Varianten für Drop-Momente an unterschiedlichen Stellen im Film. |
| `glass-tap-1.mp3` | 0.5 s | Feiner Glas-Tap für UI-Interaktionen: Handy-Rechner-Tippen, Report-Karte antippen, Menüpunkt auswählen. |
| `ui-pop-1.mp3` | 0.5 s | Weiches Pop für UI-Elemente, die erscheinen: Badge, Tooltip, kleines Icon poppt neben einer Headline auf. |
| `notification-ding-1.mp3` / `-2.mp3` | 1.0 s | Heller, zweitöniger Benachrichtigungston (eigenständig, nicht 1:1 iPhone) für „neue Anfrage", „Termin gebucht", Vorquali-Funnel-Moment. Zwei Varianten für zwei getrennte Benachrichtigungs-Beats im Film. |
| `keyboard-burst-1.mp3` | 0.8 s | Kurzer mechanischer Tastatur-Burst für Formular-/Funnel-Ausfüll-Momente oder kinetische Typo-Einblendung. |
| `cash-chime-1.mp3` | 0.9 s | Aufsteigender Zwei-Ton-Bestätigungs-Chime für „Zusammenarbeit bestätigt", Report-/Ergebnis-Reveal, Odometer-Uhr erreicht Zielwert. |
| `riser-2s-1.mp3` | 2.0 s | Spannungsaufbau-Riser vor dem großen Reveal/Drop — z. B. kurz vor dem Logo-Sting am Ende des Build-ups. |
| `reverse-swell-1.mp3` | 1.5 s | Rückwärts-Swell als weicher Einleitungs-Transition in eine neue Szene (z. B. Übergang Problem → Abgrenzung), baut Spannung vor einem harten Cut auf. |
| `card-flick-1.mp3` | 0.5 s | Knackiges Karten-/Papier-Flick-Geräusch für den Report-Fächer und Karten-Whip-Wechsel. |
| `heartbeat-pulse-1.mp3` | 1.2 s | Tiefer, gedämpfter Herzschlag-Puls für die emotionale Problem-Szene (dunkler Kontrast-Moment), leise unter dem Score. |
| `logo-sting-1.mp3` / `-2.mp3` | 1.5 s | Kurzer, heller Premium-Logo-Sting (Chime + sanfter Sub-Thump) für den finalen beuwy-Logo-Reveal / CTA-Moment. Zwei Varianten zur Auswahl der bestpassenden für den Schlusston. |

**Gesamt: 12 Sounds, 18 Dateien (6 Sounds mit 2 Varianten, 6 mit 1 Variante).**

## Musik (ElevenLabs Music API)

Account-Check: `POST /v1/music` ist für diesen Account freigeschaltet
(Tier „starter"). Erst mit einer 3-Sekunden-Testanfrage geprüft (HTTP 200,
valides MP3), danach zwei volle 75-Sekunden-Kandidaten erzeugt:

- `musik/musik-kandidat-A.mp3` — 75 s, instrumental, „modern minimal
  electronic / four-on-the-floor, 120–128 BPM, glasige Arpeggios, ruhiger
  Aufbau bis Sek. 25, dann klarer Drop", kein Gesang.
- `musik/musik-kandidat-B.mp3` — 75 s, instrumental, zweite Variante
  („deep tech house", 124 BPM, luftigerer Aufbau, kräftigerer Drop bei
  Sek. 25), kein Gesang.

Beide liegen unter:
`/tmp/claude-0/-home-user-beuwy-relaunch/1bdc0956-df5e-5ed5-b04e-ad607ee60a6e/scratchpad/film5/musik/`

Empfehlung: einen der beiden Kandidaten als Bett wählen, ggf. gegen
`video/system-explainer/audio/v2/musik-126.mp3` (bereits im Repo,
126 BPM) A/B-hören — je nachdem, welcher Drop am Punch-Moment im
Storyboard am saubersten sitzt.

## Budget-Status

- SFX-Aufrufe verbraucht: 18 / 30 (16 aus dem ersten Batch + 2 Retries
  wegen `duration_seconds`-Minimum von 0.5 s für `glass-tap` und `ui-pop`).
- Music-Aufrufe: 1 Testaufruf (3 s) + 2 volle Kandidaten (je 75 s) = 3.
- Kein API-Key in dieser Datei, keinem Log oder Commit gespeichert.
