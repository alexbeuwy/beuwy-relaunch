# Creative-Director-Audit: Startseite + Branding-Seite

Stand 24.09.2026 · Produktionsbuild auf localhost:3100 · nur gelesen, nichts geändert

Screenshots (alle in diesem Ordner):

| Datei | Inhalt |
|---|---|
| `start-desktop-full.png` / `start-desktop-viewport.png` | Startseite 1440 breit, Ganzseite (20.021 px) + erster Viewport |
| `start-mobil-full.png` / `start-mobil-viewport.png` | Startseite 390 breit, Ganzseite (28.140 px) + erster Viewport |
| `markenaufbau-desktop-full.png` / `-viewport.png` | /markenaufbau-makler 1440 breit (5.993 px) |
| `markenaufbau-mobil-full.png` / `-viewport.png` | /markenaufbau-makler 390 breit (7.494 px) |
| `chunks/*.png` | dieselben Ganzseiten in lesbare Abschnitte geschnitten (Mobil: 4 Spalten je 2.000 px) |
| `report.json` | Headlines, Bilder, Videos, Timing je Seite und Viewport |

Hinweis zur Technik: Chromium im Sandbox-Container erreicht BunnyCDN nicht direkt (Zertifikat über den Proxy). Die CDN-Dateien (Hero-Video, Loft-Video, Reels, Poster) wurden deshalb per curl geholt und über `page.route` in den Browser gereicht. Die Bilder über `/_next/image` liefen normal. Die Screenshots zeigen also, was echte Nutzer sehen. Der Spiegel-Block erscheint in der Ganzseitenaufnahme bewusst unscharf: `SpiegelFokus` hängt am Scroll-Stand, und die Aufnahme startet oben.

---

## 1. Welche Seiten ich geprüft habe

- **Startseite**: `src/app/page.tsx` → `MaklerHero` + `StartOben` + `StartUnten` in `MotionRegie` (Lenis + GSAP, Stufe über Studio-Key `mk.motion.stufe` = „voll“).
- **Branding-Seite**: Eine eigene Leistungsseite für „Marke/Branding“ gibt es nicht. Am nächsten dran ist `src/app/markenaufbau-makler/page.tsx` (W-Cluster, SEO-Wissensseite, Texte in `src/lib/texte/seiten/markenaufbau-makler.ts`). Verwandt ist `/makler-positionierung`. Die Branding-Seite hängt weder in der Nav noch im Footer. Verlinkt ist sie nur aus `/makler-positionierung`, `/mcmakler-modell`, der Sitemap und `llms.txt`. Nav „Leistungen“ springt auf `/#leistungen`, und die Footer-Spalte „Leistungen“ hat keinen Punkt „Marke“.

---

## 2. Startseite, Abschnitt für Abschnitt

Texte sind die aktiven Werte (Defaults in `src/lib/content.ts`, `src/lib/texte/start-bloecke.ts`, `start-vergleich.ts` und `vsl.ts`, live gegengeprüft).

| # | VSL-Zweck | Headline (echter Text) | Komponenten | Bilder/Medien |
|---|---|---|---|---|
| 1 | Hook | Eyebrow „Marke · Website · Automatisierung“ · H1 „Den Alleinauftrag bekommt *nicht* der bessere Makler.“ · Sub „Sondern der, der teurer aussieht. Wir bauen Ihnen in 4–6 Wochen genau diesen Auftritt … Sie liefern zwei Termine.“ · 3 Checks · CTA „Zusammenarbeit anfragen“ + „Ergebnisse ansehen“ · Floating Card „100+ Markenprojekte seit 2009“ | `MaklerHero` (+ `RotationsWort` mit nur einem Wort, `AiPille`, Glas-Karte mit Beam-Kontur) | `hero-video.webm` (2,1 MB, KI, Autoplay), Poster `makler-1`, Thumbnail `makler-19`, gelber Kreis und Kreislinie als Deko |
| 1b | Autorität | „Projekte mit Maklern führender Häuser“ | Logo-Leiste `LogoSlot` | E&V, Von Poll, Dahler, Kensington, RE/MAX, McMakler, Homeday, Betterhomes (SVGs in `public/logos`) |
| 2 | Spiegel/Pain | „Sie sind unter den Besten. *Sieht* man Ihnen das an?“ · p1–p3 („… den Auftrag bekam ein anderer … Und er ist in sechs Wochen erledigt.“) · Stempel „Erster Eindruck · Entscheidet“ | `SpiegelFokus` (Blur-Scrub), `StempelBadge`, `KreisDeko`, `VasenTiefe` | Loft-Video `wide-angle-loft-shot.webm` (5,2 MB, lazy), Poster `makler-2`, Vasen-Freisteller |
| 2b | Integration | „Angebunden an die Tools, die Sie schon nutzen“ | gelbes Band mit `LogoSlot dunkel` | onOffice, FLOWFACT, Propstack, JUSTIMMO, CasaOne |
| 3a | Abgrenzung | „Was macht Ihre Website, während Sie beim Notar sitzen?“ · Baukasten vs. beuwy (je 4 Punkte) | `SektionsKopf`, zwei Listen | – |
| 3b | Aha-Vergleich | „Kann ein Eigentümer Ihr Exposé vom Wettbewerb *unterscheiden*?“ · Karte A „Massenware. Ab 39 € im Monat.“ · Karte B „Wirkt wie Handarbeit. Kostet Sie keine Stunde.“ + rotierende Sätze („Ihr Exposé wurde diese Woche 41-mal gemerkt …“) · Punchline „Verkaufen konnten Sie schon immer. Mit einem *System* sieht man Ihnen das an.“ | `VergleichBuehne` (sticky Stack), `StandardKarte`, `BeuwyKarte` | Exposé-Wireframe, KI-Bild mit „Verkauft in 12 Tagen. 104 % vom Angebotspreis.“, Mail-Terminal, 2 echte RIEGEL-Reels (mp4, 2,7 + 5,9 MB), Vase |
| 4 | VSL + Versprechen | Gelbe Karte „In 90 Sekunden · Kein Pitch. Ein echtes Projekt.“ · „Video ansehen“ · Byline Alexander Pütter · „Führende Makler im DACH-Raum vertrauen beuwy“ | `VslSlot` (Platzhalter), `GelbeKarte`, `AvatarReihe` | Portrait-Video (5,4 MB) bzw. Poster `makler-14` mit Pill „5 Minuten — folgt in Kürze“, Gründerfoto 44 px, 4 Avatar-Crops aus KI-Bildern |
| 5 | Mechanismus | „Vier Säulen tragen Ihren *Vorsprung*.“ · 01 Marke & Design · 02 Website & Experience · 03 E-Mail & Funnel · 04 Automatisierung (je Satz + 3 Hebel) | Editorial-Rails | 4 KI-Gruppenfotos `makler-3…6` (4:5) |
| 5b | Mechanismus/Dream | „So wird aus einer Anzeige ein *Mandat*.“ · Stationen Gesehen werden / Hängen bleiben / Sich vorstellen · Funnel 100→38→14→5 % · „+27 zusätzliche Mandate im Jahr × Ø 31.285 € = 844.695 €“ | `PerformanceStory` (sticky), `MandateLoop` | 9:16-KI-Ads, KI-Paar `makler-11`, Anfrage-Karte |
| 5c | Proof zum Anfassen | „Fassen Sie das System *an*.“ · 3 Rechner-Karten | Karten mit Link | – |
| 6 | Beweis | „Sie müssen uns nicht glauben. *Rechnen* Sie nach.“ · „17 Jahre Markenarbeit. Und bei KI vorne dabei.“ · Podcast „Im Gespräch: Leon Lin“ (Platzhalter „Folge erscheint in Kürze“) · Kacheln Vision Group 1.450 / Königswege 2.300+ / acta 380 · Kundenlogos · Balken „Was danach messbar passiert ist“ · Fälle RIEGEL + Vision Group | `PodcastSlot`, `TrustMeilensteine`, `WirkungsSpuren`, Case-Liste | Podcast-Poster, KI-Bild `makler-7` neben den Fallstudien |
| 6b | Dream State | „Dann sieht Ihre Stadt Sie *überall*.“ · 4 Szenen (Fahrzeug, Messe, Stadion, Story) · Showreel | CSS-Wireframe-Szenen „IHR LOGO“, `ShowreelSlot` (7,5 MB, nur auf Klick) | Poster `makler-18`, Calla-Vase |
| 7 | Einwand Zeit | „In *Wochen* liefern, was andere in Quartalen versprechen.“ · W1 / W2–3 / W4 / ∞ · „Vier Termine reichen.“ | Timeline + `GelbeKarte` | KI-Bild `makler-8` (21:10, 1.920 px) |
| 8 | Qualifizierung | „beuwy passt nicht zu *jedem*.“ · „Das ist Absicht, nicht Marketing.“ · Ja-/Nein-Liste · Stempel „AUSGEWÄHLT · NICHT FÜR ALLE“ | Listen, `StempelBadge` | KI-Bild `makler-9` |
| 9 | Einwände | „Die *Antworten*, die vorher kommen.“ · 7 FAQ (Kosten, Zielgruppe, Kunden, Tempo, Inhalte, onOffice/FLOWFACT, nach Livegang) | Accordion (Plus-Icons) | – |
| 10 | CTA | „Ihr Ruf ist erstklassig. *Zeit* für ein System, das mithält.“ · CTA · „Antwort in 24 Stunden“ | Text + Button, Deko-Kreise | – |

Seitenumfang: Desktop 20.021 px (≈22 Viewports), Mobil 28.140 px (≈33 Viewports). Die Seite hat 25 Headlines und 3 Mal eine Mechanismus-Erklärung (Abgrenzung, Säulen, Performance, Prozess).

## 3. /markenaufbau-makler, Abschnitt für Abschnitt

| # | Zweck | Headline (echter Text) | Komponenten | Bilder |
|---|---|---|---|---|
| 1 | Wissens-Kopf (SEO-Antwort) | Eyebrow „Wachstum“ · H1 „Vom Visitenkarten-Logo zur *Instanz* am Markt.“ · Antwortabsatz mit 90 Wörtern · CTA + „Antwort innerhalb von 24 Stunden“ | Text | – |
| 2 | Stimmung | – | Foto-Band 21:9 | KI-Bild `makler-10` (lachende Gruppe am Küchentresen) + AiPille |
| 3 | Mechanismus | „Eine Marke ist kein Logo. Sie ist ein *Guss*.“ · 01 Typografie · 02 Bildwelt · 03 Sprache · 04 Farbwelt · 05 Konsistenz | Nummern-Liste | – |
| 4 | Abgrenzung | „Der Unterschied zeigt sich nicht am Logo, sondern am *Empfang*.“ · Visitenkarten-Marke vs. Instanz-Marke | Zweispalter, reiner Text | – |
| 5 | Pointe | „Marke = Wiedererkennung × Beweis.“ | `GelbeKarte` | – |
| 6 | Beweis | „Beweis, kein Beispiel“ · Königswege 60 → 2.300+ Partner (Satz steht doppelt: Absatz + Case-Karte) | `CaseGrid` mit 1 Karte (halbe Breite, rechts leer) | – |
| 7 | Einwände | „Was Sie vor dem *ersten* Rebrand wissen wollen.“ · 4 FAQ | `FaqAccordion` (Chevron statt Plus wie auf der Startseite) | – |
| 8 | CTA | „Bauen wir Ihre *Instanz*.“ · Fließtext mit 3 Links · CTA | Text + Button | – |

Eine Seite über Marke ohne ein einziges Markenbeispiel: kein Logo, kein Exposé, keine Visitenkarte, kein Vorher/Nachher. Das einzige Bild ist ein KI-Stockmotiv.

---

## 4. Bewertung als Creative Director

### Was premium wirkt
- **Typo und Weißraum.** Helvena in schwerem Schnitt, enge Laufweite, Pastellgelb als einziger Akzent und Highlighter statt Kursiv. Das hat Haltung und liegt deutlich über dem Branchenniveau (onOffice-Templates, Bottimmo).
- **Die Hero-Headline** „Den Alleinauftrag bekommt nicht der bessere Makler.“ plus „Sondern der, der teurer aussieht.“ ist der stärkste Satz der Seite: ein echter Pattern-Interrupt mit Ego-Treffer.
- **Der Aha-Vergleich (3b)** ist der einzige Moment mit echtem Wow. Die graue „Massenware“-Karte wird von der gelben beuwy-Welt überfahren, und darin stecken echte RIEGEL-Reels und lebendige Mail-Variablen. Hier wird gezeigt statt behauptet.
- **Wirkungs-Balken und Meilenstein-Kacheln.** Sie sind nüchtern, belegt und mit GeistMono gesetzt, das wirkt glaubwürdig.
- **Motion-Disziplin.** Es gibt Tokens, reduced-motion wird beachtet, Lenis läuft nur mit `pointer:fine`, und `mk.motion.stufe` dient als Rollback. Handwerklich ist das sauber.

### Was generisch oder KI-haft wirkt
- **Die Bildwelt ist das größte Problem.** 19 KI-Motive zeigen fast alle dasselbe: gut aussehende Mittdreißiger in Beige-Anzügen lachen in warmem Gegenlicht an einer Kücheninsel, daneben gelbe Vasen. Allein auf der Startseite sind es 9 Varianten davon, dazu 4 fast identische Säulen-Fotos. Das ist die visuelle Sprache eines Stock-Abos. Die „AI Visual“-Pille ist ehrlich, sagt dem Besucher aber auch: „Hier ist nichts echt.“ Ausgerechnet eine Seite, die verspricht, dass man „teurer aussieht“, sieht an diesem Punkt billig aus.
- **Die Floating Card „100+ Markenprojekte seit 2009“** im Hero ist ein Template-Klischee (Glas, Beam, Mini-Foto). Mobil liegt sie direkt auf den Gesichtern im Video.
- **Die Deko-Kreise** (gelber Kreis, Kreislinie) im Hero schneiden die Check-Texte („während Sie beim …“) und wirken wie Rest-Deko eines Figma-Templates. Am Seitenende tauchen sie ohne Funktion wieder auf.
- **Die Dream-State-Szenen „Fahrzeug / Messe / Stadion / Story“** sind graue Wireframe-Kästchen mit „IHR LOGO“-Pillen. Den Traumzustand muss man aber zeigen: ein echtes Fahrzeug-Branding, eine Bandenwerbung, eine Story. Mit Kästchen stirbt der Traum.
- **Die Vasen-Parallaxe** (4 Freisteller) ist nett, aber Requisite ohne Botschaft.
- **Die Branding-Seite** besteht aus Text-Listen, einer gelben Karte und einem Stockfoto. Der Look ist zu 100 % SEO-Ratgeber und zu 0 % Designstudio.

### Verkaufsdramaturgie (Startseite)

| Baustein | Befund | Note |
|---|---|---|
| Hook | stark (H1 + Sub). Aber das Medium rechts ist austauschbares KI-Video statt Beweis (echtes Exposé, echte Site, echter Kunde). | B+ |
| Pain | Spiegel-Text trifft („Abends am Handy hat er nur teurer ausgesehen“). Er startet aber per Blur-Scrub unscharf bzw. gedimmt, also wird genau der wichtigste Absatz verzögert lesbar. | B |
| Dream State | kommt spät (Block 6b) und als Wireframe-Kästchen. Die „+27 Mandate / 844.695 €“ sind eine Rechenannahme, die groß wie ein Ergebnis inszeniert ist. Das widerspricht dem Beweis-Claim „Sie müssen uns nicht glauben“. | C |
| Mechanismus | wird 4× erklärt (Abgrenzung, Säulen, Performance, Prozess). Einen benannten, eigenen Mechanismus (Methode mit Namen, z. B. „das beuwy-Mandatssystem“) gibt es nicht. | C+ |
| Proof | Die Kacheln stammen von Vision Group (Projektentwickler), Königswege (Finanzvertrieb) und acta (Kapitalanlage). **Keiner davon ist Makler.** Der einzige Makler-Case (RIEGEL, 9 Mandate in 3 Monaten) ist klein. Es gibt kein Zitat, kein Gesicht und kein Video eines echten Maklers. VSL und Podcast sind beide Platzhalter („folgt in Kürze“). | D+ |
| Offer | kein greifbares Angebot: kein Paketname, kein Preisrahmen („ab …“), keine Garantie, kein Risiko-Umkehrer. Die FAQ „Was kostet das?“ weicht aus. | D |
| Knappheit | nur „nicht für alle“ als Stempel. Der naheliegende Hebel für Makler fehlt komplett: **Gebietsschutz** („ein Makler pro Stadt/Region“, „noch X Regionen frei in Q4“). | D |
| CTA | Wortlaut ist konsistent. Dahinter steht aber kein Versprechen, was im Gespräch passiert (z. B. „15-Min-Analyse Ihres Auftritts vs. Top-Wettbewerber“). Mobil fehlt ein Sticky-CTA auf 33 Viewports. | C+ |

### Wo Beweise fehlen oder sich selbst widersprechen
- „Projekte mit Maklern führender Häuser“ + E&V/Von Poll/Dahler/Kensington-Logos: rechtlich und reputativ heikel (Label-Doku im Studio sagt selbst „Freigaben!“). Direkt darunter steht außerdem „gebaut für Häuser, die gerade groß werden“ mit RIEGEL/hzo/invyse. Der Besucher merkt die Diskrepanz.
- **AvatarReihe**: „Führende Makler im DACH-Raum vertrauen beuwy“ neben 4 Gesichtern, die aus KI-Bildern gecroppt sind (`MaklerElemente.tsx`, `AVATAR_FOTOS`). Das verstößt gegen die eigene Regel „KI-Bilder nie als Team/Kunden labeln“, und `title="AI Visual"` sieht niemand.
- Uneinheitliche Zahlen: Hero „4–6 Wochen“, Spiegel „in sechs Wochen“, Prozess W1–W4. Hero „Sie liefern zwei Termine“, Prozess „Vier Termine reichen“. VSL-Karte „In 90 Sekunden“, Pill „5 Minuten“. Hero-Badge „100+ Markenprojekte“, Stats-Key „40+ Premium-Projekte“.
- Das Integrations-Band feiert onOffice/FLOWFACT/Propstack/CasaOne/justimmo. Zwei Blöcke später hängen dieselben Namen (plus BOTTIMMO) als „Massenware“-Pills an der grauen Karte. Das ist gleichzeitig Schulterschluss und Seitenhieb, und BRIEF §5 sagt „kein Wettbewerbername“.
- Footer: „Unternehmensberatung für Immobilienunternehmen“. Das widerspricht der Positionierung „Premium-Boutique für führende Makler“.

### Zu viel Text
- Die Startseite ist mit 22 bzw. 33 Viewports rund doppelt so lang wie nötig. Säulen (4 × Satz + 3 Hebel), Performance-Story, Prozess und FAQ erzählen dieselbe Geschichte in 4 Formaten.
- Der Branding-Kopf ist ein Absatz mit 90 Wörtern direkt unter der H1 (SEO-Antwort). Für GEO/AI Overviews ist das sinnvoll, für die Conversion nicht. Er gehört unter den Fold oder in ein aufklappbares „Kurz beantwortet“.

### Bewegung und Animation
- Vorhanden: Hero-Stagger (Tokens), Glas-Karte schwebt 7 s und hat eine Beam-Kontur, Stempel dreht sich 40 s, Lenis (Desktop), GSAP-Scrubs, Spiegel-Blur-Reveal, sticky Vergleichsbühne, sticky Performance-Stationen, Mandate-Counter, Vasen-Parallaxe und `Reveal`-Fades fast überall.
- Kritik: Viel Ambient-Bewegung (Schweben, Drehen, Parallaxe) und wenig **narrative** Bewegung. Die zwei Momente mit Story-Motion (Vergleichsbühne, Performance-Story) sind gut. Im Hero fehlt eine Signatur-Inszenierung: Heute stehen dort Text-Fade und ein Loop-Video. `RotationsWort` läuft mit genau einem Wort („Makler“), die Funktion ist also tot. Die Branding-Seite hat nur `Reveal`-Fades.
- Risiko: Der Blur-Scrub auf dem Pain-Text und die fullPage-Unschärfe zeigen, dass der Inhalt vom Scroll-Stand abhängt. Bei Deep-Links oder einem Sprung per Anker kann Text kurz unscharf stehen.

### Ladezeit-Eindruck
- Lokal: TTFB ~15 ms, `load` 0,6 s Desktop / 0,47 s Mobil, LCP 260 ms (Textblock). Die Werte sind lokal gemessen und nicht repräsentativ, der Server ist aber schnell.
- Gewicht Startseite: ~620 KB JS (dekomprimiert: GSAP, ScrollTrigger, Lenis, Client-Komponenten), ~210 KB CSS, ~110 KB Fonts, 116–119 Requests. Dazu kommt das Hero-Video mit 2,1 MB als Autoplay, **auch mobil** (preload=metadata, spielt aber sofort). Loft-Video (5,2 MB) und Reels (2,7 + 5,9 MB) laden lazy bzw. auf Klick, das ist gut.
- Das Video-`poster` zeigt direkt auf die 2.400-px-CDN-Datei statt auf eine per `next/image` optimierte Größe.
- Desktop hat **9 px horizontalen Overflow** (`scrollWidth` 1449 bei 1440). Verursacher sind die Vasen-Freisteller in `VasenTiefe` (`-right-3`) und ein weißer Deko-Kreis (`-right-10 bottom-16`).
- /markenaufbau-makler: 172 ms load, 62 Requests, leicht. Da gibt es kein Problem.

### Mobil
- Der Hero ist verdreht: Oben kommt ein 240 px hohes Video mit der Glas-Karte, die die Gesichter verdeckt. Danach folgen ~100 px Leerraum, die H1 steht bei y≈460 und der CTA erst bei y≈980, also **unter dem Fold**. Der erste Screen verkauft nichts.
- Die Logo-Leiste bricht in 4 Zeilen mit uneinheitlichen Logos um (Dahler und Betterhomes als Negativ-Kästen, Kensington winzig).
- Die 4 Säulen × Hochformat-KI-Foto erzeugen allein ~5 Screens Stockfoto-Scrollen.
- Ein Sticky-CTA oder eine Bottom-Bar fehlt. Bei 28.000 px ist das ein Conversion-Leck.
- Die Branding-Seite ist mobil sauber, aber eine Textwand (90-Wörter-Absatz direkt nach der H1).

---

## 5. Assets: Bestand und Empfehlung

### BunnyCDN `beuwy-2.b-cdn.net/assets/makler assets/`
| Asset | Einsatz | Urteil |
|---|---|---|
| `makler-1…11, 18` (quer 2400×1792, KI) | Hero-Poster, Säulen, Cases, Prozess, Showreel-Poster, Branding-Band | **Ersetzen.** Alle zeigen dieselbe Szene („lachendes Team an der Kücheninsel“). Ersatz: echtes Shooting mit Alex und 1–2 echten Kunden (RIEGEL), dazu Arbeitsproben als Motiv (Exposés, Websites, Schilder, Fahrzeuge) |
| `makler-12, 13` (hoch), `makler-14` (VSL-Poster), `makler-19` (Card-Thumb) | VSL-Platzhalter, Hero-Karte | Ersetzen (VSL-Poster = Standbild aus der echten VSL) |
| `makler-15…17` | Design-Comps, nicht verbaut | ok |
| `makler-9x16-01…03` | Performance-Story „Ad“, Szenen | ersetzen durch echte Anzeigen-Creatives aus Kundenprojekten |
| `Vase-01/02/02-blurry/03` | Parallax-Requisiten | können bleiben, aber sparsamer (maximal 1×). Sie verursachen den Desktop-Overflow |
| `hero-video.webm` (2,1 MB, KI) | Hero | **Ersetzen.** Ersatz: Screen-Recording oder Motion-Reel echter Kundenauftritte (Site → Exposé → Schild → Reel), 6–8 s, mobil als Standbild |
| `wide-angle-loft-shot.webm` (5,2 MB, KI) | Spiegel-Plate | ersetzen durch „Eigentümer am Handy vergleicht zwei Makler“ als echte UI-Sequenz |
| `aus-dem-fenster-gucken-shot-portrait-shot.webm` (5,4 MB, KI) | VSL-Platzhalter | durch die echte VSL ersetzen |
| `Hero-Alle-Videos.webm` (7,5 MB, KI) | Showreel | Ersetzen: Showreel aus echten Projekten |
| `reel-riegel-01/02.mp4` + Poster | Vergleichsbühne | **behalten und ausbauen**, das ist das beste Asset der Seite |
| `gruender-alex.webp` (1200², „Platzhalter-Fassung“) | Byline 44 px | professionelles Portrait machen und groß zeigen (Founder-led Boutique) |

### `public/`
| Pfad | Inhalt | Urteil |
|---|---|---|
| `logos/` (38 SVG) | Trust-Leiste, Integrationen, Kunden. `acta`, `flowfact`, `casaone` sind **Nachbauten**. Dazu viele branchenfremde Logos (beautyfarm, snow-aligner, gooodkid-records …) | Nachbauten durch offizielle Assets ersetzen. Maklerhaus-Logos (E&V, Von Poll, Dahler, Kensington, RE/MAX, McMakler, Homeday, Betterhomes) nur mit Freigabe verwenden, sonst entfernen. Einheitliche Monochrom-Behandlung (keine Negativ-Kästen) |
| `icons3d/` (8 WebP: glocke, haus, kalender, lupe, netz, rechner, report, stempel) | **nicht referenziert** | löschen (3D-Icons wären ohnehin generisch) |
| `hero-riso.webp` (267 KB) | Altlast aus dem Riso-Stil, nur noch per CSS/ScrollFortschritt referenziert | entfernen, passt nicht mehr zur Design-Richtung |
| `proof/riegel.jpg`, `proof/saadi.jpg` | **nicht referenziert** | prüfen: echte Kundenfotos gehören auf die Startseite |
| `kunden/` (beuwy-marke.svg, koenigswege.svg, riegel.svg, vision.png) | BelegRaster/Kennzahlen | ok, vision.png → SVG |
| `refs/riegel.webp` | Case-Bild | ok |
| `einblick/` (10 Screenshots) | interne Einblick-Unterleger | ok (intern) |
| `studio-thumbs/` | Studio | ok |
| `beuwy-signatur-logo.png` | nicht referenziert | aufräumen |
| `hero/README.txt` | „stage.jpg slot reserved“ | Altlast, entfernen |

---

## 6. Die 15 wichtigsten Schwächen, priorisiert

1. **Kein Makler-Beweis in Makler-Größe.** Die Proof-Kacheln stammen von einem Projektentwickler, einem Finanzvertrieb und einem Kapitalanlage-Vertrieb. Der einzige Makler-Case (RIEGEL, 9 Mandate) ist klein. Es gibt kein Zitat und kein Gesicht eines echten Maklers.
2. **Die Bildwelt ist austauschbares KI-Stock.** Dieselbe Kücheninsel mit Beige-Anzügen erscheint 9× auf der Startseite, 4 fast identische Säulen-Fotos kommen dazu, und das Hero-Video ist ebenfalls KI. Das widerspricht direkt dem Versprechen „teurer aussehen“.
3. **Fake-Social-Proof: AvatarReihe.** Aus KI-Bildern gecroppte Gesichter stehen neben „Führende Makler im DACH-Raum vertrauen beuwy“. Das verstößt gegen die eigene KI-Regel und ist ein Glaubwürdigkeits- und Rechtsrisiko.
4. **Trust-Leiste mit E&V/Von Poll/Dahler/Kensington ohne sichtbare Freigabe.** Sie steht im Widerspruch zu „Häuser, die gerade groß werden“ und ist juristisch heikel.
5. **Zwei Platzhalter im Kern der Dramaturgie.** VSL („5 Minuten — folgt in Kürze“) und Podcast („Folge erscheint in Kürze“) sind leer, und „Video ansehen“ führt ins Nichts.
6. **Kein Offer.** Es fehlen Paket, Preisanker, Garantie und Risiko-Umkehr. Die Kosten-FAQ weicht aus.
7. **Keine Knappheit.** Gebietsschutz bzw. Exklusivität pro Region ist für Makler der stärkste Hebel und fehlt ganz. Außer dem Stempel „nicht für alle“ gibt es nichts.
8. **Die Branding-Seite ist keine Leistungsseite.** Es gibt keine Markenbeispiele, kein Vorher/Nachher, keine Identity-Mockups, nur ein Stockfoto. Die Eyebrow sagt „Wachstum“, und die Seite ist aus Nav und Footer nicht erreichbar.
9. **Der mobile Hero verkauft nicht.** Oben steht ein Video mit einer Karte über den Gesichtern, die H1 kommt erst bei ~460 px, der CTA unter dem Fold. Ein Sticky-CTA fehlt auf 33 Screens.
10. **Die Seite ist doppelt so lang wie nötig.** Der Mechanismus wird 4× erklärt, Säulen und FAQ sind textlastig, 22 bzw. 33 Viewports.
11. **Widersprüchliche Zahlen und Aussagen.** 4–6 vs. 6 vs. 4 Wochen, 2 vs. 4 Termine, 90 Sekunden vs. 5 Minuten, 100+ vs. 40+ Projekte. Dazu Integrationspartner, die gleichzeitig als „Massenware“ vorgeführt werden.
12. **Der Dream State wirkt billig und kommt zu spät.** Die „IHR LOGO“-Wireframes für Fahrzeug, Messe und Stadion ersetzen echte Mockups, und die Hochrechnung „+27 Mandate / 844.695 €“ ist groß wie ein Ergebnis inszeniert, obwohl sie Annahme ist.
13. **Kein Wow-Moment im Hero.** Statisches Layout, KI-Loop, Template-Glaskarte und Deko-Kreise überlappen den Check-Text. `RotationsWort` rotiert ein einziges Wort. Der einzige echte Wow-Moment (Vergleichsbühne) liegt 2 Screens tief.
14. **Der Pain-Text startet unscharf.** Der Blur-Scrub (`SpiegelFokus`) verzögert ausgerechnet den stärksten Problem-Absatz, und viel Ambient-Motion (Schweben, Drehen, Vasen) liefert keine Botschaft.
15. **Technik und Hygiene.** 9 px horizontaler Overflow auf Desktop (VasenTiefe und Deko-Kreis). Das Hero-Video mit 2,1 MB spielt auch mobil automatisch. Das Poster ist nicht optimiert. ~620 KB JS für eine Marketingseite. Das Footer-Wording „Unternehmensberatung“ widerspricht der Positionierung. Nicht referenzierte Altlasten liegen in `public/` (`icons3d`, `hero-riso.webp`, `proof/`, Signatur-PNG).
