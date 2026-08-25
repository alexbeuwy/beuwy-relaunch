# Anbindungen — was das OS füttert und wie es scharf wird

Das Dashboard unter `/os` zeigt unten für jede Anbindung einen Punkt:
grün heißt konfiguriert, grau heißt Schlüssel fehlt. Diese Datei sagt pro
Dienst, welche Variable wo herkommt. Alle Variablen kommen in Vercel unter
**Settings → Environment Variables** (Production + Preview).

Ohne jede Anbindung läuft das OS trotzdem — es zeigt dann leere Zahlen und
sagt das auch. Kaputt geht nichts.

---

## 1. Datenbank (Supabase) — bereits konfiguriert

Läuft im selben Projekt wie die Website-Texte („beuwy Funnels").
Die OS-Tabellen liegen in `supabase/os-schema.sql` und sind angelegt.

| Variable | Woher |
|---|---|
| `SUPABASE_URL` | steht schon |
| `SUPABASE_ANON_KEY` | steht schon |
| `CONTENT_WRITE_SECRET` | steht schon |
| `SUPABASE_SERVICE_KEY` | optional, nur für die Audio-Ablage — Supabase → Project Settings → API → `service_role` |

Die Tabellen sind für den anon-Key gesperrt. Jeder Zugriff läuft über
SECURITY-DEFINER-Funktionen, die das `CONTENT_WRITE_SECRET` verlangen —
dasselbe Muster wie das Text-Studio. Das Secret verlässt den Server nie.

Für die Vertonung zusätzlich: Supabase → Storage → neuer Bucket `os-audio`,
**public** setzen. Ohne den Bucket kommt die MP3 als direkter Download
zurück statt gespeichert zu werden.

---

## 2. Instagram (Graph API) — Reels, Watchtime, Follower

Voraussetzung: Instagram ist ein **Business- oder Creator-Konto** und mit
einer Facebook-Seite verbunden. Privatkonten liefern keine Insights.

**Schritte**

1. developers.facebook.com → *Meine Apps* → *App erstellen* → Typ „Business".
2. Produkt **Instagram Graph API** hinzufügen.
3. Im Graph-API-Explorer diese Berechtigungen anfordern:
   `instagram_basic`, `instagram_manage_insights`, `pages_show_list`,
   `pages_read_engagement`.
4. `IG_USER_ID` holen: im Explorer `GET /me/accounts` → die Seiten-ID
   nehmen → `GET /{seiten-id}?fields=instagram_business_account`.
   Die zurückgegebene ID ist die gesuchte — nicht der @-Name.
5. `IG_ACCESS_TOKEN` holen: das kurzlebige Token aus dem Explorer gegen ein
   langlebiges tauschen:
   `GET /oauth/access_token?grant_type=fb_exchange_token&client_id={APP_ID}&client_secret={APP_SECRET}&fb_exchange_token={KURZES_TOKEN}`

| Variable | Pflicht |
|---|---|
| `IG_USER_ID` | ja |
| `IG_ACCESS_TOKEN` | ja |
| `META_APP_ID` | nein — nur für die automatische Verlängerung |
| `META_APP_SECRET` | nein — dito |

**Zur Laufzeit:** Das Token hält 60 Tage. Mit `META_APP_ID` und
`META_APP_SECRET` kann `tokenVerlaengern()` ein frisches holen; eintragen
muss man es weiterhin selbst (Vercel erlaubt keine Selbstbeschreibung der
eigenen Env). Kalendereintrag alle acht Wochen ist der ehrlichere Weg.

**Was die API nicht hergibt:** Profilbesuche pro Reel. Die gibt es nur auf
Kontoebene pro Tag — genau so speichert das OS sie. Und die Videolänge
liefert Meta für Reels nicht mit, deshalb steht die Watchtime zunächst in
Sekunden. In Prozent wird sie, sobald das Reel einem Skript zugeordnet ist:
die Länge steht im Skript.

---

## 3. TikTok (Display API) — Aufrufe, Shares, Follower

**Schritte**

1. developers.tiktok.com → App erstellen.
2. Produkte **Login Kit** und **Display API** hinzufügen.
3. Scopes beantragen: `user.info.basic`, `user.info.stats`, `video.list`.
   Die Freigabe dauert in der Regel ein paar Tage.
4. Einmal den OAuth-Flow durchlaufen (Redirect-URI z. B.
   `https://beuwy.com/api/os/tiktok-callback` eintragen, Code gegen Tokens
   tauschen). Aus der Antwort nur den **Refresh-Token** aufheben — der hält
   ein Jahr, das Zugriffstoken holt sich das OS bei jedem Lauf selbst.

| Variable | Pflicht |
|---|---|
| `TIKTOK_CLIENT_KEY` | ja |
| `TIKTOK_CLIENT_SECRET` | ja |
| `TIKTOK_REFRESH_TOKEN` | ja |

**Grenze, die man kennen muss:** Die Display API liefert **keine
Watchtime**. Sehdauer gibt es bei TikTok nur über die Business API, die
einen eigenen Antrag braucht. Deshalb fällt das OS Watchtime-Entscheidungen
über die Instagram-Zahlen; TikTok liefert Reichweite, Shares und Follower.
Der Durchschnitt in der Kachel „Ø Watchtime" mittelt nur über Reels, die
einen Wert haben — TikTok zieht ihn nicht künstlich nach unten.

---

## 4. Skript-Engine (Claude)

| Variable | Woher |
|---|---|
| `ANTHROPIC_API_KEY` | console.anthropic.com → API Keys |

Die Engine liest `PROTOKOLL.md`, `SPRACHPROFIL.md` und `HOOK-PATTERNS.md`
zur Laufzeit aus diesem Ordner — es gibt keine Kopie im Code. Wer die
Markdown-Dateien ändert, ändert damit sofort, wie die Engine schreibt.

Zusätzlich bekommt sie bei jedem Lauf die **echte Hook-Bilanz** mit: welches
Pattern bei Alex tatsächlich Watchtime hält und welche Säule unterversorgt
ist. Der Regelkreis ist damit geschlossen — die Engine schreibt nicht gegen
die Theorie, sondern gegen die Messung.

---

## 5. Stimme (ElevenLabs)

| Variable | Woher |
|---|---|
| `ELEVENLABS_API_KEY` | elevenlabs.io → Profil → API Key |
| `ELEVENLABS_VOICE_ID` | Voices → geklonte Stimme → ID kopieren |
| `ELEVENLABS_MODEL` | optional, Default `eleven_multilingual_v2` |

Vor der Vertonung räumt `fuerStimme()` den Text auf: Regieklammern raus,
Beträge und Prozente ausgeschrieben — sonst stolpert die Stimme über
„3.400 €".

---

## 6. Automatik (Cron) und Wochenreport

| Variable | Zweck |
|---|---|
| `OS_CRON_SECRET` | Bearer-Token für externe Auslöser (beliebige Zufallszeichenfolge) |
| `OS_START` | Startdatum der Kadenz, `JJJJ-MM-TT` — bestimmt Wochenzählung und CTA-Freigabe |
| `RESEND_API_KEY` | steht bereits — verschickt den Wochenreport |
| `EMAIL_TO` | Empfänger des Reports, Default `ap@beuwy.com` |

Zeiten stehen in `vercel.json`:

- **05:00 und 17:00 täglich** → `/api/os/sync` holt Instagram und TikTok.
- **Sonntags 18:00** → `/api/os/wochenreport` rechnet die Lage durch und
  schickt sie per Mail: die eine Änderung für die kommende Woche oben,
  darunter die Kennzahlen und die weiteren Signale.

Vercel-Cron authentifiziert sich über den eigenen Header; `OS_CRON_SECRET`
braucht nur, wer den Lauf von außen anstoßen will (Handy-Shortcut, Make,
n8n). Im Dashboard geht es jederzeit über „Zahlen holen".

---

## Reihenfolge, wenn wenig Zeit ist

1. **Instagram** — liefert Watchtime, die einzige Kennzahl, an der die
   Entscheidungs-Engine wirklich hängt.
2. **Claude** — füllt die Pipeline, damit täglich etwas zu drehen ist.
3. **TikTok** — Reichweite und Follower, nicht entscheidungskritisch.
4. **ElevenLabs** — nur relevant, wenn Faceless-Reels dazukommen.
