# Anbindungen — was das OS füttert und wie es scharf wird

Das Dashboard unter `/os` zeigt unten für jede Anbindung einen Punkt:
grün heißt konfiguriert, grau heißt Schlüssel fehlt. Diese Datei sagt pro
Dienst, welche Variable wo herkommt. Alle Variablen kommen in Vercel unter
**Settings → Environment Variables** (Production + Preview).

Ohne jede Anbindung läuft das OS trotzdem — es zeigt dann leere Zahlen und
sagt das auch. Kaputt geht nichts.

---

## 0. Livegang-Checkliste — WEBSITE (beuwy.com)

Diese Tabelle ist die vollständige env-Bestandsaufnahme für den Umzug von
WordPress auf Vercel (Stand: Repo-Audit, per Grep über `src/` und
`scripts/`). Abschnitt 1–6 unten beschreiben nur das `/os`-Dashboard —
diese Sektion hier ist website-kritisch. "Pflicht?" bewertet die
öffentliche Website (Formulare, Studio, Cron), NICHT das Branding-OS.

Grundprinzip im ganzen Projekt: **fail-open, nie fail-silent-falsch** —
ohne eine Variable liefert eine Route entweder `demo:true`/eine ehrliche
503-Fehlermeldung, oder sie tut nichts Sichtbares (Tracking, Screenshot-
Upload). Es gibt (Stand dieses Audits) **keine** Stelle, an der die UI
"angekommen"/"gesendet" zeigt, während im Hintergrund nichts passiert —
das wurde für `/api/booking`, `/api/tool-lead`, `/api/video-analyse`,
`/api/konto` und die drei `/tools`-Rechner-Formulare geprüft: jede
Erfolgsseite prüft `j.demo` und zeigt dann zusätzlich einen Hinweis
("Mail-Versand noch nicht aktiviert — bitte direkt an ap@beuwy.com
schreiben"). Die einzige praktische Lücke: Fehlen **gleichzeitig**
`RESEND_API_KEY` UND die drei Supabase-Variablen, landet eine Anfrage
NUR als `console.warn` im (kurzlebigen) Vercel-Function-Log — kein Mail,
kein CRM-Eintrag. Die UI warnt zwar ehrlich und bittet um eine
Direkt-Mail an `ap@beuwy.com`, aber ob die Besucherin das wirklich tut,
ist Glückssache. **Deshalb: für den echten Livegang müssen mindestens
`RESEND_API_KEY` ODER die drei Supabase-Variablen gesetzt sein — im
Idealfall beides.**

| Variable | Pflicht für Website live? | Wirkung wenn leer | Wo setzen |
|---|---|---|---|
| `RESEND_API_KEY` | **Ja** (praktisch) | `sendMail()` liefert `{ok:false, skipped:true}`; alle Formulare (`/api/booking`, `/api/tool-lead`, `/api/video-analyse`, `/api/konto`, Cron-Mails) zeigen ehrlich `demo:true` + Hinweistext "bitte direkt an ap@beuwy.com schreiben". Anfrage geht NUR ins Vercel-Log, keine Mail an Alex. | resend.com → API Keys → Vercel Production+Preview |
| `EMAIL_FROM` | Empfohlen | Fällt auf `beuwy <onboarding@resend.dev>` zurück — Resends Sandbox-Absender. Funktioniert technisch, wirkt aber unprofessionell im Postfach der Kundin und kann in Spam landen, weil die Domain nicht `beuwy.com` ist. | Vercel — sollte eine in Resend verifizierte `@beuwy.com`-Adresse sein (z. B. `beuwy <no-reply@beuwy.com>`) |
| `EMAIL_TO` | Nein | Fällt hart codiert auf `ap@beuwy.com` zurück (auch als Default in `src/lib/email.ts` verdrahtet) — für den Livegang ausreichend, aber bei Adresswechsel an ZWEI Stellen zu pflegen (Env UND Code-Default). | Vercel; Code-Default in `src/lib/email.ts` Zeile 17 |
| `SUPABASE_URL` | **Ja** (praktisch) | `crmKonfiguriert()`/`config()` → `false` in `src/lib/crm/db.ts`, `src/lib/content.ts`, `src/lib/studio-auth.ts`, `src/lib/os/db.ts`, `src/lib/audit-cache.ts`. Leads werden NICHT im CRM gespeichert (`leadAnlegen` → `null`), `/intern` bleibt leer, Studio-Texte bleiben bei den Code-Defaults (kein Problem für Livegang, aber Alex kann dann nichts mehr per Studio ändern), `/studio`-Login funktioniert nur noch über `STUDIO_PASSWORD`. | Supabase-Projekt „beuwy Funnels" → Project Settings → API → Project URL |
| `SUPABASE_ANON_KEY` | **Ja** (praktisch) | Wie `SUPABASE_URL` — beide sind nur zusammen wirksam. | Supabase → Project Settings → API → `anon`/`public` Key |
| `CONTENT_WRITE_SECRET` | **Ja** (praktisch) | Wie oben — zusätzlich: `/studio`-Passwort-Änderung (`storePasswordHash`) schlägt fehl (503, "Datenbankverbindung fehlt"), `/konto`-Login fällt auf den speicherlosen HMAC-Demo-Code zurück (funktioniert, aber ohne Persistenz), Tracking-Events (`/api/track`) werden verworfen. | Selbst vergebenes Zufalls-Secret — dasselbe für alle drei RPC-Familien (Studio, CRM, OS) |
| `STUDIO_PASSWORD` | **Ja**, solange kein DB-Hash gesetzt ist | Ohne diese Variable UND ohne zuvor in der DB gesetztes Passwort liefert `currentCredential()` `null` → `/studio`-Login antwortet immer mit 503 "Studio ist auf diesem Deployment nicht konfiguriert" — Alex kommt gar nicht ins Studio, kann also auch kein DB-Passwort setzen (Henne-Ei). | Vercel — Startpasswort, danach in `/studio` auf ein eigenes umstellen (wandert dann in die DB und gewinnt) |
| `CRON_SECRET` | Nein (optional) | `/api/cron/flows` und `/api/cron/erinnerungen` akzeptieren ohne dieses Secret trotzdem Vercel-eigene Aufrufe über den `x-vercel-cron`-Header (siehe `vercel.json`) — die beiden Crons laufen also auch ohne `CRON_SECRET`. Nur nötig, wer den Lauf von außen (Postman, Handy-Shortcut) manuell auslösen will. | Vercel — beliebige Zufallszeichenfolge |
| `AUDIT_WRITE_SECRET` | Nein | `/api/audit/save` liefert 503 "not_configured" — der Website-Check unter `/tools/website-check` läuft trotzdem (Score + KI-Analyse), nur landet kein Ergebnis unter `/check/{domain}` zum Teilen. Tagesdeckel (`quotaAllows()`) ist ebenfalls fail-open (erlaubt bei fehlendem Secret unbegrenzt). | Vercel — eigenes Secret, unabhängig von `CONTENT_WRITE_SECRET` |
| `AUDIT_SIGNING_SECRET` | Nein | `packShare()`/`unpackShare()` liefern `null` — keine teilbaren, signierten Scan-Ergebnisse zwischen den drei Audit-Schritten (Scan → Analyse → Screenshot → Save); jeder Schritt läuft aber einzeln weiter, nur ohne Cross-Step-Verifizierung. | Vercel — eigenes Secret |
| `ANTHROPIC_API_KEY` | Nein (aber empfohlen) | `/api/audit/analyze` liefert `source:"demo"` mit dem Hinweistext "Demo-Modus: Die KI-Analyse ist hier nicht aktiv" — die technischen Befunde bleiben echt, nur ohne KI-Bewertung/Score-Text. Ohne diesen Key ist der zentrale Lead-Magnet (`/tools/website-check`) spürbar schwächer. | console.anthropic.com → API Keys |
| `BUNNY_STORAGE_KEY` | Nein | `uploadToBunny()` in `/api/audit/screenshot` liefert `null` — der Screenshot wird trotzdem inline als Data-URL zurückgegeben und im Browser angezeigt, landet aber nicht dauerhaft im `/check/{domain}`-Gutachten. Betrifft NICHT die 19 Produktfotos/`hero-video.webm` auf der Website — die liegen bereits fest unter `beuwy-2.b-cdn.net/assets/makler assets/` und brauchen keinen Schreibzugriff zur Laufzeit. | Bunny.net → Storage-Zone „beuwy-website" → FTP & API Access → Password |
| `NODE_ENV` | Automatisch (Vercel setzt das) | Steuert nur das `secure`-Flag der Cookies (`studio_auth`, `konto_auth`) — nicht manuell setzen. | Von Vercel automatisch gesetzt |

**Branding-OS-only (siehe Abschnitte 1–6 unten, NICHT Pflicht für den
Website-Livegang):** `IG_USER_ID`, `IG_ACCESS_TOKEN`, `META_APP_ID`,
`META_APP_SECRET`, `TIKTOK_CLIENT_KEY`, `TIKTOK_CLIENT_SECRET`,
`TIKTOK_REFRESH_TOKEN`, `ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID`,
`ELEVENLABS_MODEL`, `SUPABASE_SERVICE_KEY`, `OS_START`.

**`OS_CRON_SECRET` (Stand 14.09, nach Code-Fix):** `darfAutomatik()` in
`src/lib/os/zugang.ts` folgt jetzt demselben Muster wie die Website-Crons
(`/api/cron/flows`, `/api/cron/erinnerungen`): Bearer-Secret, wenn
gesetzt — sonst reicht der von Vercel gesetzte `x-vercel-cron`-Header.
Die OS-Crons `/api/os/sync` und `/api/os/wochenreport` aus `vercel.json`
laufen damit auch ohne das Secret; es braucht nur, wer den Lauf von
außen anstoßen will (Handy-Shortcut, Make, n8n). Vor dem Fix brach die
Funktion ohne Secret sofort ab (Launch-Audit).

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
| `OS_CRON_SECRET` | Bearer-Token für externe Auslöser (beliebige Zufallszeichenfolge); Vercel-Cron läuft auch ohne (siehe Abschnitt 0) |
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

---

## 7. CRM-Konsole · Dummy-Daten (R11b, 14.09)

`/intern/einstellungen` hat zwei Knöpfe: **Dummy-Daten befüllen** und
**Dummy-Daten löschen**. Das Befüllen läuft komplett über die vorhandenen
`bw_*`-RPCs (Kontakte, Leads mit Status/Notizen, Deals, Aufgaben, Konten
mit Tickets, Mail-Protokoll, zwei pausierte Flows, ~4.000 Einblick-
Ereignisse) und braucht keine Migration. Zwei Dinge brauchen SQL:

| RPC | Zweck | Ohne Migration |
|---|---|---|
| `bw_dummy_verteilen(p_secret)` | verteilt die Zeitstempel der Dummy-Zeilen über die letzten 6 Wochen | Befüllen klappt, alle Einträge tragen das heutige Datum (Meldung „teilweise") |
| `bw_dummy_loeschen(p_secret)` | entfernt ausschließlich Dummy-Zeilen (Domain `@muster-makler.de`, `pageload_id dummy-*`, Flows `[Demo] …`) | Löschen meldet „Migration fehlt" |

**Einrichten (einmalig, ~1 Minute):** `supabase/crm-dummy.sql` im Supabase-
SQL-Editor des Projekts „beuwy Funnels" ausführen. Vorher den Block
`-- SECRET` prüfen: er vergleicht `p_secret` mit
`website_secrets.content_write` (Spalten `name`/`value`) — heißen die
Spalten anders, an `public.bw_pruefe_secret` angleichen.

Sicherheit: Flows werden pausiert angelegt, damit die Nachfass-Crons keine
Mails an Fantasie-Adressen schicken. Echte Daten sind von beiden Knöpfen
nie betroffen — alles ist über die Markierungen oben abgegrenzt.
