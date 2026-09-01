# R5 — Portgut aus Riegel + Design-Direktive CRM

Technik-Scout-Bericht, nur lesend erstellt aus zwei fremden Quellen:
`/home/user/alexbeuwy/riegel` (Riegel-Projekt, Alex' anderes Maklerprojekt)
und `/home/user/dhananjaym182/ai-ui-design-skills/skills` (fünf SaaS-UI-
Design-Skills). Ziel: was ist für den beuwy-CRM-Ausbau (`src/lib/crm/db.ts`,
`bw_`-Tabellen via SECURITY-DEFINER-RPCs) portierbar, und welche
Layout-Regeln soll die künftige CRM-Konsole befolgen.

Referenz beuwy-Seite: `src/lib/crm/db.ts` — anon-Key + `CONTENT_WRITE_SECRET`
gegen RPCs (`bw_lead_anlegen`, `bw_leads_liste`, `bw_lead_detail`,
`bw_lead_status_setzen`, `bw_lead_notiz_anlegen`, `bw_mail_loggen`,
`bw_konto_*`, `bw_ticket_*`). Fail-open: ohne Env liefert alles `null`/`[]`.
Es gibt noch **keine** CRM-Konsolen-UI in beuwy — nur `db.ts` und die
Marketing-Seite `src/app/makler-crm-einfuehren/page.tsx`. `/os` und
`/studio` existieren als schlanke Cookie-geschützte Single-Page-Dashboards
(`src/app/os/page.tsx`, 58 Zeilen; `src/app/studio/page.tsx`, 116 Zeilen) —
noch kein Sidebar-/Tab-Gerüst wie bei Riegel. `globals.css` bringt bereits
ein vollständiges shadcn-Token-Mapping inkl. `--sidebar-*`-Variablen
(`--background:#fff`, `--accent:#fbf5d6` Pastellgelb, `--foreground:#161613`,
`--border:rgba(20,20,18,.1)`, `--font-mono` = GeistMono für tabellarische
Zahlen) — die CRM-Konsole kann direkt darauf aufsetzen, ohne neue Tokens zu
erfinden.

---

## Teil 1 — Portierbare Fundstücke aus Riegel

### 1. `src/lib/track.ts` — First-Party-Tracking-Client

**Pfad:** `/home/user/alexbeuwy/riegel/src/lib/track.ts` (163 Zeilen)

**Was es kann:**
- Cookielose Funnel- + Klick-Heatmap-Erfassung für den Riegel-Rechner.
  `pageloadId` lebt nur im Modul-Speicher (kein Cookie/localStorage) —
  Datenschutz by Design.
- 7 Event-Typen (`rechner_start`, `rechner_step`, `rechner_analyse`,
  `rechner_ergebnis`, `report_form_geoeffnet`, `report_angefordert`,
  `rechner_klick`), je Seitenaufruf dedupliziert (außer Klicks).
- Klick-Heatmap im 0,5-%-Raster (`KLICK_STUFEN = 200`), relativ zu
  `document.scrollWidth/Height`, plus `bereich` (aus
  `data-track-bereich`-Attribut des nächsten Vorfahren), `ansicht`
  (welcher Funnel-Schritt) und `geraet` (Breakpoint 768px).
- Versand gebatcht (`queue`, Flush ab 12 Items oder 4s-Timer) über
  `navigator.sendBeacon`, Fallback `fetch(..., keepalive:true)`.
- Fail-soft: jeder Fehler wird verschluckt, Tracking darf den Rechner nie
  stören. Demo-Modus (`?demo=`) wird ignoriert.

**Abhängigkeiten:** keine — reines Browser-API (`crypto.randomUUID`,
`sendBeacon`, `fetch`). Kein Riegel-Import außer dem eigenen Event-Vertrag.

**Portierungsaufwand: S.** Praktisch 1:1 kopierbar. Anzupassen:
Event-Namen umbenennen auf beuwy-Vokabular (z. B. `bw_funnel_start`,
`bw_funnel_step`, `bw_klick`), `Ansicht`-Union auf die jeweilige beuwy-Seite
zuschneiden (Funnel-Rechner, Vorquali-Formular o. Ä.), Ziel-Route von
`/api/track` auf ein beuwy-Äquivalent ändern.

### 2. `src/app/api/track/route.ts` — Server-Seite des Trackings

**Pfad:** `/home/user/alexbeuwy/riegel/src/app/api/track/route.ts` (209 Zeilen)

**Was es kann:**
- Nimmt Batches von `track.ts` entgegen, validiert **jedes Feld einzeln
  gegen Allowlists** (`ERLAUBTE_EVENTS`, `ERLAUBTE_QUELLEN`,
  `ERLAUBTE_ANSICHTEN`, `ERLAUBTE_GERAETE`), verwirft Unbekanntes statt zu
  werfen.
- Rate-Limit über `clientIp` + In-Memory-Limiter (60 Requests / 10 Min).
- Schreibt via `supabaseServer` (anon/service Client, **kein** RPC-Muster —
  direktes `.from("rechner_events").insert(zeilen)`) in eine flache Tabelle.
- Migrations-Fallback: fehlen neue Spalten (`ansicht`/`geraet`), wird ohne
  sie nachgelegt statt den ganzen Batch zu verlieren.
- Antwortet immer mit 204 — kein Fehlerzustand sichtbar im Browser.

**Ereignis-Schema als Vorlage (Tabelle `rechner_events`):**

```
event         text        -- Event-Name, Allowlist serverseitig
step          smallint    -- nur bei rechner_step (1..3)
quelle        text        -- nur bei report_form_geoeffnet ("cta"|"badge")
x_pct         smallint    -- nur bei Klicks, 0..200 (0,5-%-Bucket)
y_pct         smallint    -- nur bei Klicks, 0..200
bereich       text        -- Slug aus data-track-bereich, Regex-geprüft
ansicht       text        -- welcher Funnel-Schritt/View
geraet        text        -- "desktop" | "mobil"
pageload_id   text        -- Zufalls-Id EINES Seitenaufrufs, kein Cookie
created_at    timestamptz default now()   -- Serverzeit, Client-ts wird verworfen
```

**Abhängigkeiten:** `@/lib/supabase-server` (Riegel-eigener Client, direkter
Tabellenzugriff), `@/lib/rate-limit`.

**Portierungsaufwand: M.** Die Validierungs-/Allowlist-Logik ist 1:1
übertragbar (reines TS, keine Riegel-Typen). Der DB-Zugriff muss aber
umgebaut werden: beuwy schreibt **nicht** direkt auf Tabellen, sondern über
SECURITY-DEFINER-RPCs (Muster `db.ts`). Für den Port braucht es eine neue
Migration `bw_track_events` (eigene Tabelle, **nicht** `einblick_*` oder
`fb_heatmap_*` — siehe Datenbank-Hinweis unten) plus eine RPC
`bw_track_event_anlegen(...)`, die die Route stattdessen aufruft (analog zu
`leadAnlegen()` in `db.ts`). Rate-Limit-Helfer existiert in beuwy vermutlich
noch nicht separat und müsste mitgezogen oder durch ein bestehendes
Äquivalent ersetzt werden.

### 3. `src/app/intern/` — Riegels internes Cockpit (komplett)

**Pfade:** `src/app/intern/page.tsx` (11 Zeilen, reiner Wrapper) +
`src/components/intern-dashboard.tsx` (**3.869 Zeilen**, der eigentliche
Ort der Logik).

**Tab-Struktur** (`TABS`-Array, Zeile 1440):
`overview` (Übersicht) · `conversion` (Funnel + Heatmap) · `reports` ·
`leads` (Anfragen) · `objekte` · `medien` · `feedback` (nur Betreiber,
via `betreiber`-Flag ausgeblendet) · `konten`.

**Conversion-Tab (das Herzstück für den CRM-Ausbau):**
- Zeitraum-Umschalter 7/30 Tage, lädt lazy beim ersten Tab-Öffnen
  (`loadConversion`) gegen `POST /api/intern/conversion`.
- Leerzustand statt leerer Charts, wenn `conv.gesamt === 0` (inkl. Hinweis,
  falls die Tracking-Tabelle noch fehlt).
- 4 `StatCard`s (PDF-Quote, Rechner gestartet, Ergebnis gesehen,
  Quellen-Kachel CTA-vs-Badge).
- `ConversionFunnel`: Balken je Funnel-Stufe, markiert die Stufe mit dem
  größten Abbruch automatisch rot (`schwaechste`-Berechnung: kleinste
  `konversion < 100` gegenüber der Vorstufe).
- `PdfSparkline`, `TopBereiche`, `BereichBalken` (Balkenliste der meist-
  geklickten `data-track-bereich`-Slugs).
- `KlickHeatmap` (Zeile 2909) + `DichteKarte` (Zeile 3161): siehe Punkt 4.
- Interne Test-Links (Demo-Rechner-Aufrufe, zählen nicht mit) und ein
  Zwei-Klick-Reset für die Messdaten (`resetConversion`), bewusst ohne
  `window.confirm`, sondern Inline-Bestätigung mit zwei Buttons.

**Andere Tabs, kurz:**
- `reports`/`leads`: Tabellen mit Toolbar (Suche, Filter-Select,
  Datumsbereich, CSV-Export), aufklappbare Detailzeile für
  Status/Notiz/Wiedervorlage (`saveBearbeitung`, optimistisches Update mit
  Rollback bei Fehler), OnOffice-Übergabe-Button je Zeile, „Kontakt-Akte"
  als Seitenpanel bei Klick auf E-Mail (`openAkte`/`AkteState`).
- `konten`: feste + eingeladene Intern-Zugänge verwalten, Zwei-Klick-
  Bestätigung fürs Löschen (`deleteArm`, 3s-Fenster).
- `medien`: BunnyCDN-Hero-Bild-Auswahl/Upload.
- `overview`: Wiedervorlagen-Liste, 4 Stat-Kacheln, „Neueste
  Reports/Anfragen", System-Status-Ampel (`SystemStatusKachel`, liest
  `/api/health`).

**Abhängigkeiten:** stark an Riegel gebunden (`@/lib/validierung`,
`@/lib/lead-bearbeitung`, `@/lib/feedback-locator`, `@/lib/site`,
`useAuth()` aus `components/auth.tsx`). Die **Struktur** (Tab-Leiste,
State-Muster: lazy-load je Tab, optimistisches Update mit Rollback,
Zwei-Klick-Bestätigung statt `window.confirm`, Toolbar-Baustein mit
Suche+Filter+Export) ist aber vollständig unabhängig vom Riegel-Datenmodell
und 1:1 als **Vorbild** verwendbar.

**Portierungsaufwand: L** (für die Struktur/den Conversion-Tab als
eigenständiges Modul; die Reports/Leads/Objekte-Tabs sind Riegel-spezifisch
und eher Inspirationsquelle als Kopiervorlage). Anzupassen: Datenzugriff
komplett auf `bw_`-RPCs umstellen (kein `supabaseServer.from(...)` direkt),
Auth-Gate auf beuwys existierendes Studio-Cookie-Login umstellen statt
Riegels Passwort-oder-Supabase-Auth-Dualismus (siehe Punkt 5), die
3.869-Zeilen-Monolith-Komponente in kleinere Module aufteilen (die
Design-Direktive unten fordert das ohnehin).

### 4. Heatmap-Implementierung (`grep heatmap`)

**Fundstellen:** `src/lib/track.ts`, `src/components/intern-dashboard.tsx`
(`KlickHeatmap` Z. 2909, `DichteKarte` Z. 3161, `farbRampe` Z. 3121,
`HEATMAP_ANSICHTEN` Z. 2861), `src/components/calculator/report-request.tsx`,
`src/components/calculator/calculator.tsx` (rufen `trackKlick`/`setAnsicht`
auf), `src/app/api/track/route.ts`, `src/app/api/intern/conversion/route.ts`
(Server-Aggregation der Klick-Buckets), `src/app/datenschutz/page.tsx`
(rechtlicher Hinweis).

**Was die Heatmap kann:**
- Client (`trackKlick`): 0,5-%-Bucket-Raster statt Pixel/Cookie —
  bewusstes Datenschutz-Design (kein Fingerprinting-Potenzial).
- Server (`/api/intern/conversion`): aggregiert Rohklicks zu Zellen
  (`ansicht|geraet|x:y` als Key), zählt `n` und den dominanten `bereich`
  je Zelle — **Aggregation läuft in JS**, bewusst statt einer eigenen
  SQL-View, weil PostgREST kein `GROUP BY` kann und die Datenmenge
  (≤20.000 Klicks/Zeitraum) das erlaubt.
- Darstellung (`DichteKarte`, reines `<canvas>`, kein npm-Paket wie
  heatmap.js): Zwei-Pass-Dichtekarte — Pass 1 radialer Alpha-Verlauf pro
  Klick, additiv (`globalCompositeOperation: source-over`,
  Wurzel-Skalierung `Math.sqrt(p.n/max)` gegen Overplotting eines einzelnen
  Hotspots), Pass 2 Alpha→Farbe über eine 256-Stufen-Farbrampe
  (blau→cyan→grün→gelb→rot, `farbRampe()`). Alternative Darstellung
  „Punkte" (Kreisgröße nach Klickzahl) umschaltbar.
- Referenzbilder je Ansicht+Gerät unter `public/intern/heatmap/<ansicht>-
  <geraet>.jpg` (Script `scripts/heatmap-referenz.mts`, im Repo nicht mit
  gelesen — nur referenziert), Bild + Dichtekarte übereinandergelegt via
  `position: absolute` auf gemeinsamer Breite.
- Getrennt nach `ansicht` (Funnel-Schritt, da y-Achse relativ zur
  unterschiedlich hohen Dokumenthöhe je Schritt ist) und `geraet`
  (Desktop/Mobil, da Mobile-Seiten ein Vielfaches länger sind) — sonst
  liegen Klicks aus verschiedenen Seitenlängen bedeutungslos übereinander.

**Abhängigkeiten:** reines Canvas-API, keine externe Heatmap-Bibliothek.
`ResizeObserver` für responsive Breite.

**Portierungsaufwand: M.** Die Canvas-Dichtekarte + Farbrampe sind
eigenständig und 1:1 kopierbar (keine Riegel-Typen). Der Aufwand liegt im
Drumherum: eigene Referenzbilder für beuwy-Seiten erzeugen (kein
`scripts/heatmap-referenz.mts`-Äquivalent bei beuwy vorhanden), Server-
Aggregation von direktem `supabaseServer.from()` auf eine `bw_`-RPC
umstellen (z. B. `bw_track_heatmap_lesen`), `HEATMAP_ANSICHTEN` auf
beuwy-Seiten ummünzen.

### 5. `src/components/auth.tsx` — Konto-Muster

**Pfad:** `/home/user/alexbeuwy/riegel/src/components/auth.tsx` (180 Zeilen)

**Was es kann:**
- React-Context (`AuthProvider`/`useAuth`) um vollen Supabase-Auth
  (E-Mail+Passwort, Sign-up mit `emailRedirectTo` + `user_metadata`,
  Passwort-Reset-Flow, Session-Subscription).
- `authFehlerText()`: übersetzt rohe Supabase-Auth-Fehlermeldungen
  (englisch, teils kryptisch wie „over_email_send_rate_limit") in
  verständliches, kundenfreundliches Deutsch — **eigenständig
  wiederverwendbar**, reine String-Funktion ohne React-Abhängigkeit.
- Zugangskontrolle fürs Intern-Dashboard läuft separat in
  `src/lib/intern-access.ts` (204 Zeilen, ebenfalls gelesen): zwei
  gleichwertige Wege — `ADMIN_PASSWORD` **oder** eine per Supabase-Session
  eingeloggte, allowlisted E-Mail (`internFixedEmails()` + dynamische
  Liste aus `site_settings`). Zusätzlich eine „Notfallregel"
  (`internNotfallErlaubt`): fehlt `INTERN_EMAILS` in Produktion, dürfen
  Adressen der eigenen Seiten-Domain und der Betreiber-Domain
  (`beuwy.com`) trotzdem rein — verhindert versehentliches Aussperren
  beim Deploy, ohne fremde Makler-Domains freizugeben. `istBetreiber()`
  unterscheidet Betreiber- von Makler-Zugang rein für UI-Sichtbarkeit
  (Feedback-Tab), nicht für Rechte.

**Abhängigkeit zu beuwy — wichtiger Unterschied:** beuwy nutzt **kein**
volles Supabase-Auth-Signup/Login. `db.ts` zeigt ein eigenes,
einfacheres Muster: E-Mail+Code-Login ohne Passwort
(`kontoCodeAnlegen`/`kontoCodeEinloesen`, RPC-basiert). Riegels `auth.tsx`
passt also **nicht** 1:1 auf beuwys Kontenmodell. Portierbar ist nicht die
Komponente als Ganzes, sondern zwei Bausteine:
1. `authFehlerText()` als eigenständige Übersetzungsfunktion, falls beuwy
   je echtes Supabase-Auth einführt.
2. Das **Zugriffsmuster aus `intern-access.ts`** (Passwort ODER
   Session-E-Mail-Allowlist + Notfallregel gegen Aussperren) — das ist
   direkt auf eine künftige beuwy-CRM-Konsole übertragbar, unabhängig vom
   Login-Mechanismus, weil es eine reine Autorisierungsschicht ist, die
   nur einen validierten Identifikator (Passwort-Erfolg oder verifizierte
   E-Mail) braucht.

**Portierungsaufwand: S** für `authFehlerText()` (reine Funktion, sofort
kopierbar). **M** für das `intern-access.ts`-Zugriffsmuster (muss auf
beuwys Studio-Cookie-Login statt Supabase-Session umgeschrieben werden,
Grundidee bleibt aber identisch).

### Datenbank-Hinweis (wie beauftragt)

Im Supabase-Projekt existieren bereits fremde Tabellen `einblick_*` und
`fb_heatmap_*` (andere Alex-Projekte) — **nicht verwendet**, nur als Beleg
notiert, dass es für Tracking-/Heatmap-Schemata bereits Vorbilder im
selben Projekt gibt. beuwy bekommt beim Port **eigene** `bw_track_*`-
Tabellen (z. B. `bw_track_events` nach dem oben dokumentierten
`rechner_events`-Schema als Vorlage), zugreifbar ausschließlich über
neue SECURITY-DEFINER-RPCs im Muster von `src/lib/crm/db.ts` — kein
direkter `.from(...)`-Zugriff wie bei Riegel.

### Zusammenfassung Portierungsaufwand

| Fundstück | Aufwand | Kernänderung beim Port |
|---|---|---|
| `track.ts` (Client-Tracking) | **S** | Event-Namen/Ansicht-Union umbenennen |
| `api/track/route.ts` (Server) | **M** | Direktes Insert → `bw_`-RPC |
| `intern/` Conversion-Tab-Struktur | **L** | Datenzugriff auf RPCs, Komponente splitten |
| Heatmap (Canvas/Farbrampe) | **M** | Referenzbilder + RPC-Aggregation neu |
| `authFehlerText()` | **S** | Direkt kopierbar |
| `intern-access.ts`-Zugriffsmuster | **M** | Auf Studio-Cookie statt Supabase-Session |

**Summe: 2× S, 3× M, 1× L** (6 Portstücke insgesamt; die restlichen
`intern/`-Tabs wie Objekte/Medien/Konten sind Riegel-Fachlogik und dienen
eher als Inspirationsquelle denn als Portiergut).

---

## Teil 2 — Design-Direktive CRM

Destilliert aus den SKILL.md-Dateien **saas-product-ui-system** (inkl.
`references/product-ui-principles.md`, `app-surface-patterns.md`,
`component-spec.md` — vollständig gelesen) und **ui-ux-design-system**
(inkl. `references/design-system-skills.md` — vollständig gelesen; deckt
sich inhaltlich fast vollständig mit `product-ui-principles.md`). Die drei
übrigen Skills (`saas-ui-ux-designer-with-flex`,
`saas-ui-ux-designer-skill-typography-flex`, `image-logo-icons`) wurden
per SKILL.md überflogen — sie liefern dieselbe Struktur- und
Dichte-Philosophie in Variationen, keine zusätzlichen Regeln, die für die
CRM-Konsole relevant wären.

**Grundregel:** Die Skills liefern **Struktur- und Qualitätsregeln**
(Dichte, Layout-Reihenfolge, Komponentenzustände, Tabellenverhalten). Sie
liefern **keine** Farben/Fonts für beuwy — deren Tokens (`--accent:
#fbf5d6` Pastellgelb, `--background:#fff`, Helvena, nie kursiv,
GeistMono nur tabellarisch, Motion-Skala aus `globals.css`) **gewinnen
immer**. Wo ein Skill-Default (z. B. „dark-first", „Inter/Manrope/DM
Sans", OKLCH-Tokens mit blauem Primary) mit beuwy kollidiert, wird er
ignoriert — nur die darunterliegende Struktur-Regel bleibt.

### Die 20 Regeln

1. **Sidebar ja, aber schmal und ruhig.** Feste linke Navigation
   240–280px (Skill-Empfehlung), Hintergrund `--sidebar` (bereits `#fff`
   in `globals.css`), aktive Zeile über `--sidebar-accent` (Pastellgelb)
   + Icon-Farbwechsel — **kein** zusätzlicher Farbverlauf, kein Blau
   (Skill-Default „Primary Blue" entfällt vollständig).
2. **Kollisions-Auflösung Dark-First → Light-First.** Jede Skill-Regel,
   die von „dark-first" ausgeht (Schatten-Rezepte, Kontrastwerte,
   Glow-Effekte), wird spiegelbildlich auf Weiß übersetzt: Riegels
   Muster „Verlauf 15% Akzent → transparent" auf farbigen Badges
   (`intern-dashboard.tsx` `STATUS_META`) ist das richtige Vorbild für
   eine helle Fläche — nicht die OKLCH-Dark-Tokens der Skills.
3. **Dichte pro Ansicht bewusst wählen** (Skill-Konzept „Page Density"):
   Übersicht/Dashboard = *balanced*, Tabellen-lastige Ansichten (Leads,
   Reports, Conversion-Rohdaten) = *compact* (kürzere Zeilen, wenig
   Storytelling, Toolbar dicht am Datenbestand). *Comfortable* nur für
   Erstlogin/Leerzustände — nie für die tägliche Arbeitsansicht.
4. **Eine primäre Aktion pro Ansicht.** Konkret: „Zusammenarbeit
   anfragen" bleibt Marketing-CTA-Wortlaut auf öffentlichen Seiten; im
   CRM selbst ist die primäre Aktion je View eine andere (z. B. „Lead
   kontaktieren", „Status setzen") — nie zwei gleich laute Buttons
   nebeneinander (Skill: „never make all buttons equally loud").
5. **Tabellen wie Riegels Reports/Leads-Tab, nicht wie Rohdaten:**
   starke Kopfzeilen-Abgrenzung, ausreichende Zeilenhöhe, Hover-Zustand,
   Zahlen rechtsbündig + tabular-nums (GeistMono, `--font-mono` existiert
   bereits), Metadaten (Datum, Slug) in `--muted-foreground`, Haupttext
   in `--foreground`.
6. **Mobile: Tabellen werden zu gestapelten Karten**, nicht horizontal
   gescrollt — außer bei klar begründeten Datenregionen (z. B. die
   Heatmap-Referenzbild-Ansicht). `overflow-x-auto` als Fallback nur
   innerhalb der eigenen Tabellen-Zelle (siehe Artifact-Grundregel „page
   body must never scroll horizontally", gilt hier gleichermaßen für die
   CRM-Konsole).
7. **Leerzustände sind Pflicht, nicht Kür** — für jede Liste, jeden
   Dashboard-Block: ein Icon/Symbol, eine Zeile Erklärung, ein klarer
   nächster Schritt. Riegels Conversion-Tab-Leerzustand
   („Noch keine Daten — Tracking läuft seit dem nächsten Deploy") ist
   exakt der Ton: sachlich, kein Marketing-Ton in Systemtexten.
8. **Skeletons statt Spinner** für Seiteninhalte (Reports-/Leads-Tabellen
   beim Laden); Spinner nur für kompakte Inline-Aktionen (Button-Klick,
   OnOffice-Übergabe wie in Riegels `OnOfficeButton`).
9. **Optimistisches Update + Rollback** als Standardmuster für
   Inline-Edits (Status, Notiz, Wiedervorlage) — Riegels
   `saveBearbeitung()` ist die Vorlage: State sofort setzen, bei
   Server-Fehler zurückrollen und Fehlertext neben dem Feld zeigen,
   nie ein blockierender Dialog.
10. **Destruktive Aktionen: Zwei-Klick statt `window.confirm`.**
    Riegels Muster (Konto löschen: erster Klick „armiert" 3s lang,
    zweiter löscht wirklich; Messdaten-Reset: Inline-Bestätigung mit
    zwei sichtbaren Buttons) passt zu beuwys Ton besser als ein
    Browser-natives Popup — konsistent für Lead-Löschen, Ticket
    schließen etc. in der CRM-Konsole übernehmen.
11. **Toolbar-Baustein direkt über der Tabelle**, nicht darüber
    schwebend: Suchfeld links (Icon inline), Filter-Dropdowns,
    Datumsbereich, CSV-Export-Button rechts — Skill-Regel „keep filters
    and bulk actions close to the table" deckt sich mit Riegels
    `Toolbar`-Komponente.
12. **Command-Palette: in den gelesenen Skills nicht vorhanden** — keiner
    der SKILL.md- oder Referenz-Texte in `saas-product-ui-system` oder
    `ui-ux-design-system` erwähnt eine Command-Palette explizit. Statt
    einer erfundenen Regel: bei Bedarf eigenständig nach dem
    Dropdown-Menü-Muster aus `component-spec.md` bauen (kompakte
    Liste, gruppiert, Tastatur-Navigation) — kein Skill-Zitat dafür
    vorhanden.
13. **Toasts nur für transiente Bestätigung**, nie für Fehler, die
    Handeln erfordern (dafür ein persistenter Alert-Block, wie Riegels
    `convError`/`resetError`-Zeilen). Gestapelte Toasts dürfen keine
    primären Bedienelemente verdecken.
14. **Karten-Familie vereinheitlichen:** Ein Kartentyp
    (`StatCard`-Muster) für alle KPI-Kacheln, ein Panel-Typ für
    Arbeitsbereiche (Funnel, Heatmap) — Skill-Regel „fewer card styles,
    not more" und „Do not nest too many elevated cards" gilt 1:1;
    beuwys reines Weiß macht das noch wichtiger, da jede zusätzliche
    Fläche nur über Radius/Border/leichten Schatten unterscheidbar ist,
    nie über Farbe.
15. **Radius konsistent, nicht Skill-Default übernehmen.** Skills
    schlagen 12/16/20/24–28px vor; beuwy hat bereits `--radius: 0.75rem`
    (12px) im shadcn-Mapping definiert — dieser EINE Wert plus
    Vielfache (z. B. `--radius` und `calc(--radius + 4px)` für größere
    Panels) statt der vollen Skill-Skala, um nicht ein zweites
    Radius-System einzuführen.
16. **Motion ausschließlich über bestehende Tokens.** Skills nennen
    generische Werte (160–220ms Button-Transition, `translateY(-2px..
    -4px)` Card-Hover). Diese Werte werden **nicht** übernommen, sondern
    auf die nächstliegenden beuwy-Tokens gemappt: Button-/Zustands-
    wechsel → `var(--duration-fast) var(--ease-smooth-out)` (250ms,
    bereits Standard für Border-/Background-Farbwechsel in
    `globals.css`), Panel-/Tab-Übergänge → `var(--duration-medium)`
    oder `var(--duration-slow)`, Karten-Stagger → `var(--duration-
    stagger)` (40ms je Karte). Kein Ad-hoc-`transition: 200ms` im
    CRM-Code.
17. **Typo-Hierarchie über Gewicht + Größe, nicht über Farbschwall** —
    Skill-Regel „hierarchy through size, weight, spacing, muted text";
    für beuwy heißt das: Helvena für Zahlen-Headlines/Card-Titel,
    Helvena-Fließtext-Schnitt für Body, `--muted-foreground` für
    Metadaten, **nie** Kursivierung (globale em/i-Neutralisierung bleibt
    aktiv) und **nie** Unterstreichung als Ersatz-Betonung — Betonung
    wie im Brief vorgegeben über Farbe/Gewicht/Highlighter-Fläche
    (Pastellgelb-Chip), nicht über Skill-Vorschläge wie Farbverläufe
    im Fließtext.
18. **Zahlen-Spalten immer GeistMono + `tabular-nums`**, konsequent für
    jede KPI-Kachel, jede Tabellen-Spalte mit Beträgen/Prozent/Anzahl —
    beuwys Brief-Vorgabe deckt sich hier exakt mit der Skill-Regel
    „numeric columns align thoughtfully".
19. **Status-/Semantik-Farben bleiben auf Status beschränkt** (Skill:
    „reserve semantic colors for status only"). Für beuwy: **kein**
    Riegel-Rot/Grün/Blau/Gelb-Quartett übernehmen — stattdessen Tinte in
    Abstufungen (dunkel = kritisch/neu, hell/grau = erledigt) plus
    Pastellgelb als einziger Hervorhebungs-Akzent für „braucht
    Aufmerksamkeit"; echte Gefahren-Zustände (Löschen, Fehler) dürfen
    einen einzigen zusätzlichen Warnton bekommen (`--destructive:
    #b3402a`, bereits in `globals.css` definiert), aber sparsam,
    nicht als volle Ampel wie bei Riegel.
20. **Empty-/Loading-/Error-/Disabled-Zustand für jede Komponente
    definieren, bevor sie gebaut wird** (Skill-Pflichtkatalog aus
    `component-spec.md`) — als Baustein-Checkliste für jede neue
    CRM-Komponente übernehmen: Default, Hover, Focus-visible, Active,
    Disabled, Loading, Error, wo zutreffend.
21. **AI-/Automatisierungs-Bausteine, falls das CRM später
    Antigravity-Skript-Ausgaben oder OS-KPI-Läufe anzeigt:** die
    Skill-Muster „Agent Run Panel" (Status, Start/Dauer,
    Input-/Output-Zusammenfassung, Logs) und „Skill Card" (Icon, Name,
    Ein-Satz-Beschreibung, Status-Chip, primäre Aktion) sind direkt
    für eine künftige Verzahnung von `src/lib/os/` (Skript-Engine,
    KPI-Engine) mit der CRM-Konsole verwendbar — Struktur übernehmen,
    Farben/Radius wie oben auf beuwy mappen.
22. **Breadcrumbs sparsam** — nur bei echter Tiefe (z. B. Lead-Detail
    innerhalb eines Kontos), nicht auf jeder flachen Tab-Ansicht;
    Skill-Regel „Do not show breadcrumbs on every shallow page".
23. **Drawer statt Modal für Kontext-erhaltende Aufgaben** — Riegels
    „Kontakt-Akte"-Seitenpanel (`openAkte`) ist exakt das Skill-Muster
    „Drawer for contextual editing/detail inspection, preserves page
    context"; Lead-Detail, Notiz-Historie etc. in der beuwy-CRM-Konsole
    nach demselben Muster als Drawer, nicht als Modal.
24. **Deckel-/Skalierungs-Hinweise statt Stille bei Datengrenzen** —
    Skill-Regel „define a small-screen/large-data strategy up front";
    Riegels `klickLimitErreicht`-Hinweis („Es werden die neuesten
    20.000 Klicks ausgewertet") ist das Vorbild: jede
    CRM-Ansicht mit einem Datendeckel (z. B. Leads-Liste,
    Track-Events) zeigt sichtbar an, wenn sie gekappt hat.
25. **Ein Komponenten-Set, keine Parallel-Bibliothek.** Riegels
    3.869-Zeilen-Monolith ist eine Warnung, keine Vorlage: beim
    beuwy-Port die wiederkehrenden Bausteine (StatCard, Toolbar,
    FilterSelect, DateRangeFilter, Umschalter/Segmented, Badge/Status-
    Chip) von Anfang an als eigene, kleine Komponenten unter
    `src/components/crm/` auslagern statt in einer wachsenden
    Tab-Datei zu belassen — deckt sich mit der Skill-Grundregel „keep
    the component library small, consistent, and easy to compose".
