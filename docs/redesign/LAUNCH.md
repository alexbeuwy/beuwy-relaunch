# LAUNCH.md — Livegang beuwy.com (WordPress → Vercel)

Stand: 14.09.2026, Branch `claude/light-makler-style`, PR #8 → `main`.
Quelle: sechs Audit-Läufe (Env/Integrationen, SEO-Redirects/Header, Recht,
Technik/Perf, Funktionstest, Content-QA). Jede Zeile ist eine Handlung
oder ein belegter Fakt. Verantwortliche: **Alex** (außerhalb des Codes),
**Loop** (Claude, stündlich, Loop-Zone laut AGENTS.md), **Codex**
(Cluster-Seiten, `src/app/api/**`, `src/lib/**` außerhalb der Loop-Zone).

---

## 1. Blocker vor dem Livegang

| # | Blocker | Wer | Schritt |
|---|---|---|---|
| B1 | `STUDIO_PASSWORD` fehlt → `/studio` und `/intern` dauerhaft 503 (Henne-Ei: ohne Env-Passwort und ohne DB-Hash liefert `currentCredential()` in `src/lib/studio-auth.ts:129-137` `null`, `src/app/api/studio/login/route.ts:27-33` antwortet 503). | Alex | In Vercel Production `STUDIO_PASSWORD` setzen (mind. 10 Zeichen, `src/app/api/studio/password/route.ts` MIN_LENGTH). Nach dem ersten Login im Studio auf ein eigenes Passwort umstellen — das wandert in die DB, Env bleibt Fallback. |
| B2 | Lead-Verlust: ohne `RESEND_API_KEY` UND ohne `SUPABASE_URL`/`SUPABASE_ANON_KEY`/`CONTENT_WRITE_SECRET` landet jede Anfrage nur als `console.warn` im Vercel-Function-Log (`src/lib/email.ts:13-14`, `src/lib/crm/db.ts:46-49`). UI zeigt ehrlich einen Demo-Hinweis, aber kein Eintrag in `/intern`, keine Mail. | Alex | Mindestens eine Kette setzen — im Idealfall beide: `RESEND_API_KEY` (Mail an ap@beuwy.com) UND das Supabase-Trio (CRM). Vollständige Env-Liste in Abschnitt 2. |
| B3 | ~~Produktions-Smoke-Test~~ **Erledigt 14.09 (Orchestrator):** tsc 0, Build grün, `next start -p 3100`, `node scripts/verify.mjs` → „Routen geprüft: 91, rot: 0, VERIFY: OK". curl-Serie: `/leads`, `/portfolio/:slug`, `/portfolio_cat/:slug`, `/icon-box`, `/page-sitemap.xml`, `/impressum/`, `/datenschutz/` → je 308 mit korrektem Location; `/` trägt alle fünf Security-Header, kein `X-Powered-By`. | erledigt | Vor dem Merge einmal wiederholen (Abschnitt 6 Schritt 3). |
| B4 | ~~E-Mail-Vorlage~~ **Erledigt 14.09:** Kopfband jetzt „MARKE · WEBSITE · SYSTEM", Mail-Fuß „beuwy — Alexander Pütter · ap@beuwy.com · Impressum" (Link auf beuwy.com/impressum) — keine Adresse im Klartext, kein Ludwigshafen. | erledigt | Alex: falls die Postanschrift doch in jede Mail soll, in `src/lib/email.ts` (Fußzeile) ergänzen. |
| B5 | Recht: erledigt in diesem Lauf, muss aber im Preview sichtbar geprüft werden — Impressum ohne OS-Plattform-Link (Plattform seit 20.07.2025 abgeschaltet, Hinweis war abmahnfähig), Datenschutz mit Einblick-Tracking, `/konto`-Cookies, Photon/BORIS-Proxys (Details Abschnitt 3). | Alex | Preview `/impressum` und `/datenschutz` einmal lesen und freigeben. Offene Rechtsfakten in Abschnitt 2.4. |

---

## 2. Alex-Todos außerhalb des Codes

### 2.1 Vercel — Environment Variables (Production + Preview)

Bestandsaufnahme aus `docs/branding/ANBINDUNGEN.md` Abschnitt 0 (per Grep
über `src/` und `scripts/` verifiziert). Alle unter Settings → Environment
Variables.

| Variable | Pflicht | Wirkung wenn leer | Woher |
|---|---|---|---|
| `STUDIO_PASSWORD` | **Ja** | `/studio`, `/intern` → 503, Blocker B1 | selbst vergeben, ≥ 10 Zeichen |
| `RESEND_API_KEY` | **Ja** | keine Mail an ap@beuwy.com, Formulare zeigen `demo:true`, Blocker B2 | resend.com → API Keys |
| `SUPABASE_URL` | **Ja** | kein CRM (`/intern` leer), keine Studio-Overrides, Studio-Login nur per Env-Passwort | Supabase-Projekt „beuwy Funnels" → Settings → API → Project URL |
| `SUPABASE_ANON_KEY` | **Ja** | wie `SUPABASE_URL` (nur zusammen wirksam) | Supabase → Settings → API → anon key |
| `CONTENT_WRITE_SECRET` | **Ja** | Studio-Passwortänderung 503, `/konto`-Login ohne Persistenz, `/api/track`-Events verworfen | selbst vergeben; dasselbe Secret für Studio, CRM, OS (SECURITY-DEFINER-RPCs) |
| `EMAIL_FROM` | Empfohlen | Fallback `beuwy <onboarding@resend.dev>` (`src/lib/email.ts:16`) — Sandbox-Absender, Spam-Risiko, keine SPF/DKIM auf beuwy.com | in Resend verifizierte `@beuwy.com`-Adresse, z. B. `beuwy <no-reply@beuwy.com>`; Domain in Resend per DNS verifizieren |
| `EMAIL_TO` | Nein | Fallback `ap@beuwy.com` (Code-Default `src/lib/email.ts:17`) | nur bei Adresswechsel |
| `ANTHROPIC_API_KEY` | Empfohlen | `/api/audit/analyze` → `source:"demo"`, Website-Check ohne KI-Text — Lead-Magnet schwächer | console.anthropic.com |
| `CRON_SECRET` | Nein | `/api/cron/flows` (stündlich) und `/api/cron/erinnerungen` (07:00) laufen auch ohne — Fallback auf `x-vercel-cron`-Header | nur für manuelle Auslösung von außen; Masterplan-Blocker „C5 Nachfass-Flows" hängt formal daran |
| `OS_CRON_SECRET` | Nein (seit L6) | `/api/os/sync` und `/api/os/wochenreport` laufen per `x-vercel-cron`-Header auch ohne Secret; nur für manuelle Auslösung von außen | selbst vergeben |
| `AUDIT_WRITE_SECRET` | Nein | `/api/audit/save` 503, kein teilbares `/check/{domain}`; Website-Check läuft | selbst vergeben |
| `AUDIT_SIGNING_SECRET` | Nein | keine signierten Scan-Weitergaben zwischen Audit-Schritten | selbst vergeben |
| `BUNNY_STORAGE_KEY` | Nein | Audit-Screenshot nur inline, nicht dauerhaft; Produktfotos/Hero-Video liegen fest auf `beuwy-2.b-cdn.net` | Bunny → Storage-Zone „beuwy-website" → FTP & API Access |
| `NODE_ENV` | automatisch | nur `secure`-Flag der Cookies | nicht manuell setzen |
| Branding-OS-only | Nein | `IG_*`, `META_*`, `TIKTOK_*`, `ELEVENLABS_*`, `SUPABASE_SERVICE_KEY`, `OS_START` — `/os` zeigt leere Zahlen | ANBINDUNGEN.md Abschnitte 1–6 |

### 2.2 Secrets rotieren (standen im Chat)

- Studio-Passwort: nach dem ersten Login in `/studio` neu setzen (wandert in die DB); das im Chat genannte Startpasswort danach in Vercel durch ein frisches ersetzen.
- Bunny-AccessKey (Storage-Zone „beuwy-website"): in Bunny → FTP & API Access neu generieren, alten Key verwerfen, `BUNNY_STORAGE_KEY` in Vercel aktualisieren.
- `CONTENT_WRITE_SECRET`: falls jemals außerhalb von Vercel/Supabase geteilt → in Supabase-RPCs und Vercel gleichzeitig tauschen.

### 2.3 DNS, Domain, Search Console

- Domain `beuwy.com` (+ `www`) in Vercel → Project → Domains anlegen; DNS auf Vercel umstellen (A/ALIAS + CNAME laut Vercel-Anzeige); `www` → Apex-Redirect in Vercel wählen.
- HSTS ist mit `preload` gesetzt (`next.config.mjs` headers) — greift erst, wenn die Domain sauber auf HTTPS läuft; Preload-Listeneintrag optional, nicht rückgängig zu machen.
- Search Console: Property beuwy.com beibehalten, `https://beuwy.com/sitemap.xml` neu einreichen; alte Yoast-Sitemaps (`page-`, `portfolio-`, `portfolio_category-`, `page_category-sitemap.xml`) sind per 308 auf `/sitemap.xml` umgeleitet — alte Einträge in Search Console entfernen.
- Externe Verweise, die der Code nicht umleiten kann: `calendly.com/alex-beuwy/30min` und `info@beuwy.com` kommen im Repo nicht mehr vor (grep: 0 Treffer). Google-Unternehmensprofil, Signaturen, Social-Bios auf `/termin` und `ap@beuwy.com` umstellen.
- WordPress-Hosting erst kündigen, wenn Abschnitt 5 durch ist (Rückweg für 48 h).

### 2.4 Rechtsfakten (nicht aus dem Repo verifizierbar — keine Erfindung)

- Supabase-Region: `src/app/datenschutz/page.tsx` behauptet „Hosting-Region Europa". Im Supabase-Dashboard (Project Settings → General → Region) prüfen; falls nicht EU: Drittlandhinweis + SCC in der Erklärung ergänzen.
- Impressum „Weitere Standorte": Memeler Str. 99, 68307 Mannheim · Genter Str. 5, 13353 Berlin — prüfen, ob aktuell und ob sie ins Impressum gehören; sonst streichen.
- Adresse in Transaktions-Mails (siehe B4): entscheiden, ob Impressums-Link oder Adresse.
- JSON-LD: `src/components/SchemaOrg.tsx::OrganisationLd()` strahlt die Postanschrift „Max-Bill-Str. 3, 67061 Ludwigshafen am Rhein" global auf allen 81 Seiten aus (unsichtbar, für lokale KI/Google-Sichtbarkeit). Marken-Gate „kein Ludwigshafen im Footer" ist nicht verletzt — Entscheidung: bewusst behalten (Empfehlung, GEO) oder auf `/impressum` beschränken.

### 2.5 Freigaben

- Kundenlogos Startseite (`mk.trust.namen`, `src/lib/content.ts:229`: ENGEL & VÖLKERS, VON POLL, DAHLER & COMPANY, KENSINGTON, RE/MAX, McMakler, Homeday, BETTERHOMES) — Studio-Label sagt ausdrücklich „(Freigaben!)". Nutzungsfreigabe pro Haus einholen oder Namen im Studio kürzen.
- `public/logos/README.md`: `acta.svg`, `flowfact.svg`, `casaone.svg` sind Nachbauten (kein offizielles Asset) — Originale beschaffen oder freigeben lassen. Masterplan-Blocker „Echte Kundenlogo-SVGs" bleibt offen.
- Testimonials/Google-Bewertungen: Masterplan-Blocker „echte Testimonials freigeben" — bis dahin keine Kundenstimmen ohne Nachnamen (Regel in `content.ts:179`).
- VSL-Video-URL (`mk.vsl.url`) und Podcast-URL (`mk.podcast.url`) liefern (Masterplan-Blocker).

---

## 3. In diesem Lauf erledigt

**R11 (14.09, nach dem Audit) — Studio ist immer 1:1 live**
- Speichern im Studio revalidiert den ganzen Seitenbaum; jede der 86 öffentlichen Routen liest ihre Texte aus Studio-Keys (80 Textdateien unter `src/lib/texte/seiten/`). Gate `tools/texte-scan.mjs` in `scripts/verify.mjs`.
- Alex-Todo (klein): `supabase/crm-dummy.sql` einmal im Supabase-SQL-Editor ausführen, damit „Dummy-Daten löschen" und die Zeitverteilung in `/intern/einstellungen` funktionieren (docs/branding/ANBINDUNGEN.md, Abschnitt 7).

**Frontseite — `src/app/vsl/page.tsx` (Orchestrator, parallel zum Audit)**
- Neue Route `/vsl`: ein Claim, 16:9-Videobühne (`VslSlot format="breit"`, gleiche Studio-URL `mk.vsl.url`), ein CTA in den Anfrage-Funnel, 22 echte Kundenlogos der alten beuwy.com (17 SVGs neu unter `public/logos/`, Herkunft im README), Mini-Rahmen ohne Menü. Texte als Studio-Keys `mk.vsl.front_*`. In der Sitemap; Screenshots `docs/redesign/refs/review/r10-vsl-*.png`.

**Env/Integrationen — `docs/branding/ANBINDUNGEN.md`**
- Neuer Abschnitt 0 „Livegang-Checkliste — WEBSITE": vollständige Env-Tabelle mit Pflicht-Status und Ausfallverhalten; Korrektur der bislang falsch dokumentierten `OS_CRON_SECRET`-Pflicht. Schließt Masterplan G1.

**SEO-Redirects/Header — `next.config.mjs`**
- 24 permanente Redirects (308): `/leads` → `/leadgenerierung-immobilienmakler`; `/portfolio`, `/portfolio/:slug*`, `/portfolio_cat/:slug*` → `/cases`; `/page_category/:slug*` → `/`; 19 Theme-Demo-Seiten (`/icon-box`, `/home-3`, `/creative-*`, `/classic-*`, `/apartments-*`, `/saadi-timeline`, `/shooting-27-03-2026`, `/home`, `/home2` …) → `/`; vier Yoast-Sitemaps → `/sitemap.xml`. `node --check` OK.
- `headers()` für `/:path*`: HSTS (2 Jahre, includeSubDomains, preload), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy` (Kamera/Mikro/Geo aus). Bewusst keine CSP (bricht Inline-JSON-LD/gsap).
- `/impressum/`, `/datenschutz/`: kein Eintrag nötig — Next 15 normalisiert Trailing-Slash per 308 vor den Config-Redirects (trailingSlash-Default false). Live-Bestätigung in Abschnitt 6.
- `src/app/not-found.tsx` vorhanden und gestaltet (Headline, Body, CTA „Zur Startseite").

**Recht — `src/app/impressum/page.tsx`, `src/app/datenschutz/page.tsx`**
- Impressum: Sektion „EU-Streitschlichtung" mit Link auf ec.europa.eu/consumers/odr entfernt (Plattform seit 20.07.2025 abgeschaltet, VO (EU) 2024/3228; Hinweis irreführend i. S. d. § 5 UWG). VSBG-Sektion bleibt.
- Datenschutz Abschnitt 5 „Reichweitenmessung ohne Cookies (Einblick)": Pageviews, Klick-Raster 0,5 %, Scroll-Tiefe, Geräteklasse, `pageload_id` in `bw_track_events` (`src/components/TrackBeacon.tsx`, `src/app/api/track/route.ts`); § 25 Abs. 2 Nr. 2 TDDDG (Orchestrator: Gesetzesname an drei Stellen von TTDSG auf TDDDG aktualisiert), Art. 6 Abs. 1 lit. f DSGVO. Falsche Aussage „kein Analyse-Tool" entfernt.
- Datenschutz Abschnitt 10 „Kundenkonto (/konto)": Magic-Code-Login, Cookies `konto_auth` (httpOnly, 30 Tage) und `konto_da` (30 Tage) aus `src/lib/konto-auth.ts`, Onboarding-Felder (Name, Firma, Rolle, Interesse, Teamgröße, Stadt) und Ticket-Verlauf. Cookie-Abschnitt (jetzt 12) listet alle drei Cookies.
- Datenschutz Abschnitt 9 „Rechner-Tools": Server-Proxys an Photon/komoot (`src/app/api/geocode/route.ts`) und VBORIS-WMS RLP / BORIS-WFS Hessen (`src/app/api/bodenrichtwert/route.ts`); nur Server-IP geht dorthin.
- Stand-Datum beider Stellen auf 14. September 2026.

**Content-QA — 83 öffentliche Routen (gegen :3101 gecrawlt), 0 Änderungen nötig**
- 0 kaputte interne Links (inkl. Case-Detailseiten riegel-immobilien, vision-group, koenigswege je 200).
- 0 Platzhalter-Reste, 0 leere Überschriften, 0 doppelte `<title>`, 0 fehlende Meta-Descriptions, 0 echte Tippfehler (31 Duplikat-Wort-Rohtreffer einzeln als korrektes Deutsch/DOM-Artefakt verifiziert).
- 0 „kostenlos" außerhalb `/tools` und T-Cluster; 0 `<img>` ohne `alt`; 0 Seiten ohne `/anfrage`- oder `/termin`-Link.

**Technik/Perf — verifiziert, kein Fix nötig**
- Hero-Poster mit `priority`; `maplibre-gl` (542 KB) per `next/dynamic({ssr:false})` nur auf `/tools/verkaufspreisrechner`; 172 kB First-Load-JS; alle `next/image` mit `sizes`/`width`/`height`; Fonts self-hosted, keine externen Font-Requests.
- Kontrast Akzent-CTA `#f3e27f` auf `#161613` ≈ 13,8:1 (AAA).

**Funktionstest — verifiziert, kein Fix nötig**
- `/api/booking`, `/api/tool-lead`, `/api/track`, `/api/geocode`, `/api/bodenrichtwert`, `/api/konto`, beide Cron-Routen, `/api/studio/login`: saubere 422/401/429/204, ehrlicher Demo-Modus ohne `RESEND_API_KEY`, fail-soft ohne Stacktrace-Leak; alle Wizards rendern im initialen HTML.

---

## 4. Offen für Loop/Codex (priorisiert, Masterplan-tauglich)

Backlog-Zeilen zum Übernehmen in `docs/redesign/MASTERPLAN.md` (Markierung `[~] Codex`/`[~] Claude` beim Start).

**P1 — vor dem Merge**
- [x] L1 Mail-Kopfband/-Fuß (Blocker B4) — erledigt 14.09
- [x] L2 Produktions-Build + verify + curl-Serie (Blocker B3) — erledigt 14.09, VERIFY: OK (91 Routen)

**P2 — vor oder direkt nach dem Livegang**
- [ ] L3 „Portal" als Nutzenwort: 280 Fundstellen auf 42 Seiten (Liste `scratchpad/portal_fileline.txt` des Content-QA-Laufs). Muster: „eigenes/Ihr/neues Portal" → „System"; „Portal-Profil bei ImmoScout", „Immobilienportal", „Portal-Kontakte" bleiben Fachbegriff. Klarste Verstöße: `src/app/casaone-website/page.tsx:63` („Das neue Portal steht"), `:296` („Was ein eigenes Portal kostet"), `src/app/performance-marketing-makler/page.tsx:149` („führt auf Ihr Portal"), `src/app/immobilienmakler-werbung/page.tsx:57` („Performance-Marketing + eigenes Portal"). Größte Dateien: `makler-website-baukasten-vergleich` (23), `immoscout-profil-vs-eigene-website` (23, überwiegend Fachbegriff), `marketing-projektentwickler` (15), `leadgenerierung-immobilienmakler` (15), `eigentuemer-leads-generieren` (15). Manuelle Sichtung, kein Suchen-Ersetzen — Codex
- [ ] L4 `alternates.canonical` fehlt auf ~85 von ~90 Seiten (nur `/immobilienmarketing`, `/immobilienmarketing-agentur`, `/tools`, `/tools/afa-rechner`, `/tools/verkaufspreisrechner` setzen es). Pro Seite `alternates: { canonical: "/<pfad>" }` oder zentraler Helper aus dem Routenpfad — Codex (Cluster) / Loop (Startseite)
- [x] L5 LogoSlot-Preloads: `loading="lazy"` + `fetchPriority="low"` am Logo-`<img>` — erledigt 14.09 (vorher 20 Image-Preloads im `<head>` von `/`, danach nur noch das Hero-Poster)
- [x] L6 `darfAutomatik()` fällt auf `x-vercel-cron` zurück — erledigt 14.09 (ANBINDUNGEN.md angepasst: `OS_CRON_SECRET` wieder optional)
- [x] L7 `poweredByHeader: false` — erledigt 14.09

**P3 — nach dem Livegang**
- [ ] L8 `src/components/MaklerHero.tsx:50`: `preload="auto"` am Hero-`<video>` (Firefox/Safari defaulten auf `metadata`, ein Roundtrip extra) — Loop
- [ ] L9 `src/lib/bewertung/boris.ts:164/171`: Berlin-Koordinaten (52.52/13.405) laufen durch die grobe `BB_BBOX` und liefern 200 `data:null` statt 422 „außerhalb". `BE_BBOX` vor Brandenburg prüfen und hart 422 zurückgeben, analog Bremen-vor-Niedersachsen (Kommentar Z. 159-161) — Codex
- [ ] L10 `robots.ts` optional um `/intern`, `/studio`, `/os`, `/konto` erweitern (alle bereits `noindex` per Metadata; defense-in-depth) — Codex
- [ ] L11 Seitenspezifische `opengraph-image.tsx` für `/immobilienmarketing`, `/cases`, `/leadgenerierung-immobilienmakler` analog `src/app/opengraph-image.tsx` — Loop
- [ ] L12 Build-Warnung `Can't resolve '@react-email/render'` (Import-Trace `src/lib/email.ts` → `src/app/intern/flows/FlowEditor.tsx`): `@react-email/render` als devDependency oder bewusst ignorieren (Code-Pfad nie erreicht, nur `html`-Feld) — Codex
- [ ] L13 `package.json` ohne `browserslist` → `polyfills`-Chunk 112,6 KB auf jeder Seite. `"browserslist": ["defaults", "not IE 11"]` nach Analytics-Blick — Alex entscheidet Zielspektrum, Codex setzt

---

## 5. Nach dem Livegang (erste 48 h)

- [ ] Echte Testanfrage über `/anfrage` → Mail bei ap@beuwy.com angekommen UND Eintrag in `/intern` (Beweis, dass B2 gelöst ist). Danach Testeintrag im CRM löschen.
- [ ] Testbuchung über `/termin` und einen Tool-Lead (`/tools/afa-rechner`) — kein Demo-Hinweis mehr sichtbar.
- [ ] `/studio` Login mit neuem Passwort, eine Textänderung speichern, live prüfen (Supabase-Override greift).
- [ ] Vercel → Logs: keine 5xx, keine `console.warn` „Mail übersprungen"; Cron-Logs: `/api/cron/flows` und `/api/cron/erinnerungen` 200; `/api/os/*` 200 sobald `OS_CRON_SECRET` gesetzt.
- [ ] Search Console: Sitemap verarbeitet, Abdeckung ohne „Weiterleitung"-Fehler; Stichprobe `site:beuwy.com` — keine alten Theme-Demo-URLs mehr in den Ergebnissen.
- [ ] `curl -I https://beuwy.com/leads` → 308 auf `/leadgenerierung-immobilienmakler`; `curl -I https://beuwy.com/impressum/` → 308 auf `/impressum`; `curl -I https://beuwy.com/page-sitemap.xml` → 308 auf `/sitemap.xml`.
- [ ] `curl -I https://beuwy.com/` zeigt HSTS, nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy; kein `X-Powered-By` (lokal bestätigt).
- [ ] Postfach-Test: eine Transaktions-Mail an ein Gmail- und ein Outlook-Konto — Absender `@beuwy.com`, nicht im Spam, Kopfband ohne „Portal".
- [ ] PageSpeed Insights / Lighthouse mobil auf `/` und `/tools/verkaufspreisrechner`: LCP-Element ist das Hero-Poster, keine Layout-Shifts.
- [ ] `/tools/website-check` mit einer Fremd-Domain: KI-Text kommt (nicht `Demo-Modus`), `/check/{domain}` speicherbar.
- [ ] Einblick: `/intern` zeigt Pageviews/Klicks der ersten Stunden (bestätigt `CONTENT_WRITE_SECRET` + `bw_track_anlegen`).
- [ ] Bewertungs-Rechner: eine Adresse in RLP und eine in Hessen → Bodenrichtwert kommt; Berlin → bekannt leer (L9).
- [ ] WordPress-Hosting erst nach diesem Abschnitt kündigen; DNS-TTL wieder hochsetzen.

---

## 6. Go-Live-Ablauf in 10 Schritten

1. **Env setzen** (Abschnitt 2.1) in Vercel Production + Preview: `STUDIO_PASSWORD`, `RESEND_API_KEY`, `EMAIL_FROM`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `CONTENT_WRITE_SECRET`, `ANTHROPIC_API_KEY`, `OS_CRON_SECRET`. Resend-Domain beuwy.com per DNS verifizieren.
2. **L1 ist drin** (E-Mail-Footer, Blocker B4, Commit 14.09) — nichts mehr zu mergen.
3. **Lokale Gates:** `npx tsc --noEmit` = 0 · `npx next build` grün · `npx next start -p 3100` · `node scripts/verify.mjs` → `VERIFY: OK`. Dann curl-Serie: `/leads`, `/portfolio/filmmaking-layout`, `/icon-box`, `/page-sitemap.xml`, `/impressum/`, `/datenschutz/` → je 308 + korrektes `Location`; `curl -I /` → fünf Security-Header; `/llms.txt`, `/sitemap.xml` → 200.
4. **Vercel-Preview von PR #8** öffnen: `/impressum`, `/datenschutz` lesen (B5); Testanfrage über `/anfrage` mit Preview-Env → Mail + `/intern`-Eintrag.
5. **Screenshot-Abnahme** Desktop 1440 / Mobil 390 für `/`, `/vsl`, `/immobilienmarketing`, `/tools`, `/anfrage` (Gate 4, `tools/shot.mjs`).
6. **Freigaben-Check** (2.5): Logos ohne Freigabe im Studio aus `mk.trust.namen` nehmen; keine Testimonials ohne Nachnamen.
7. **PR #8 mergen** → `main`. Vercel baut Production; Deployment-Log auf Build-Fehler prüfen (Warnung `@react-email/render` ist bekannt und harmlos).
8. **Domain umziehen:** `beuwy.com` + `www` in Vercel hinzufügen, DNS beim Registrar auf Vercel-Werte, `www` → Apex. WordPress-Hosting bleibt parallel erreichbar.
9. **Live-Checks sofort:** `curl -I https://beuwy.com/` (200, HSTS), Redirect-Serie aus Schritt 3 gegen die Live-Domain, `/studio`-Login, Testanfrage produktiv.
10. **Search Console:** `https://beuwy.com/sitemap.xml` einreichen, alte Yoast-Sitemaps entfernen, „Indexierung beantragen" für `/`, `/immobilienmarketing`, `/leadgenerierung-immobilienmakler`, `/website-fuer-immobilienmakler`. Dann Abschnitt 5 für 48 h abarbeiten; erst danach WordPress kündigen und Secrets aus 2.2 rotieren, falls noch nicht geschehen.
