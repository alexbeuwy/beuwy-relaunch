# Makler-System-Playbook — vom Riegel-Projekt zur Maschine

> **Für wen:** dich, Alex. Kein Kunden-Dokument, keine Präsentation. Ein
> Arbeitspapier: was du diese Woche anfängst, damit aus einem Projekt zehn
> pro Monat werden.
>
> **Stand:** 2026-07-10. Basis: Riegel-Relaunch (6-7 Tage, 13.800 € netto,
> live auf riegel.vercel.app), `docs/MARKET-FINDINGS.md`, `docs/VOICE.md`,
> `docs/PROJECT.md`.
>
> **Eine Warnung vorweg:** Fast jede Zahl in diesem Dokument außer dem
> 13.800-€-Preis ist eine Annahme, markiert mit **[ANNAHME]**. Du hast genau
> einen Datenpunkt (Riegel). Alles andere ist Rechnung, kein Beweis. Bau das
> Ding, miss die echten Zahlen, ersetze die Annahmen.

---

## 1 · Das Produkt

### Die eine SKU

Drei Namens-Vorschläge — für das Produkt selbst, nicht für die Ansprache:

| Name | Warum er funktioniert | Warum er wackelt |
|---|---|---|
| **Makler-Portal** *(Empfehlung)* | Sagt genau, was es ist — ein eigenes Portal wie Zillow, nicht „eine Website". 14-Jähriger versteht es sofort. | Klingt nüchtern, kein Wiedererkennungswert |
| **Makler-Update** | Gute Outreach-Zeile („Wir haben deine Seite schon mal upgedatet"), klingt nach Fortschritt statt Neubau | Als Produktname zu klein — klingt nach Patch, nicht nach neuem System |
| **Dein Immo-Portal** | Betont Besitz — es ist SEIN Portal, nicht beuwys Vorlage | Etwas länger, weniger scharf als Kürzel |

**Für dieses Dokument nutze ich „Makler-Portal"** als Arbeitsname. Endgültige
Entscheidung siehe Frage 1 am Ende.

Wichtig: Das ist eine **neue, eigene SKU** neben dem bestehenden System-Tier
(ab 38.000 €, 10 Werktage, Agent-Layer). Kein Ersatz, keine Konkurrenz — ein
schmaleres, schnelleres, vertikal-spezifisches Angebot nur für Makler mit
onOffice. Das System-Tier bleibt der Premium-Anker für alles andere.

### Exakter Scope

**Immer drin** (das ist die ganze Lieferung, nicht mehr, nicht weniger):

1. **onOffice-Anbindung** — Objekte aus dem bestehenden onOffice-Account des
   Maklers laufen automatisch ins Portal. Kein manuelles Kopieren.
2. **Zillow-Style-Portal auf eigener Domain** — Suche, Filter, Kartenansicht,
   Objekt-Detailseiten. Läuft auf der Domain des Maklers, nicht auf einer
   beuwy-Subdomain.
3. **Kunden-Login** — ein Bereich, in dem Interessenten Suchen speichern und
   Favoriten merken können. *(Muss geklärt werden, siehe Frage 10 — aktuell
   unklar, ob das für Endkunden des Maklers oder für den Makler selbst gedacht
   ist. Der Scope hier geht von Endkunden-Login aus, weil das der
   Zillow-Vergleich nahelegt.)*
4. **Marken-Übernahme (Brand-Tokens)** — Farben, Schrift, Logo des Maklers
   werden ins Template eingesetzt. Keine neue Markenentwicklung — die Marke
   existiert schon, wir übernehmen sie.
5. **AI-High-End-Visuals** — hochwertige Hero-/Stimmungsbilder (Skyline,
   Atmosphäre, Markenbilder), die nicht nach KI aussehen. **Nicht** die
   echten Objektfotos — die kommen unverändert aus onOffice.
6. **Fester Liefertermin** — 7 Werktage bewiesen (Riegel). Kommuniziere
   konservativer, z. B. 10 Werktage, damit du Puffer für Nicht-Riegel-Fälle
   hast, in denen der onOffice-Zugang o. Ä. nicht sofort sauber läuft.
7. **Fester Preis, vorher bekannt.** Kein Tagessatz.

**Nie drin** (das ist die Scope-Kriech-Bremse — jedes Mal, wenn ein Kunde
danach fragt: Nein, oder als separates, extra bezahltes Modul):

- Keine neue Logo-/Markenentwicklung von Null — Add-on, kein Bestandteil
- Keine individuellen Layout-Extras außerhalb des Templates. Das Produkt ist
  das Template plus Marken-Tokens — nicht „lass uns hier noch was Eigenes
  bauen"
- Keine Anzeigen-Schaltung (Google/Meta) im Standardpaket
- Keine Anbindung an andere CRM-/Maklersysteme außer onOffice (siehe Risiko
  in §6 und Frage 9)
- Keine laufende Content-/SEO-Betreuung — das ist ein separates
  Retainer-Angebot, kein Bestandteil des Portals
- Keine Mehrsprachigkeit als Standard
- Keine echten Objektfotos durch KI ersetzen oder „aufhübschen" — das wäre
  irreführend gegenüber Käufern und ein rechtliches Risiko. AI-Visuals sind
  ausschließlich Marken-/Stimmungsbilder, niemals Ersatz für echte
  Objektaufnahmen
- Keine Verhandlung von Extra-Wünschen während der Lieferwoche — Wünsche
  gehen in die Liste für „danach", nicht in die aktuelle Lieferung

Diese Nie-Drin-Liste ist wichtiger als die Immer-Drin-Liste. Scope-Kriechen
ist der Grund, warum aus 7 Tagen 3 Wochen werden — und warum 10/Monat nie
klappt.

### Preis-Logik

13.800 € netto ist **bewiesen** — ein Kunde, akzeptiert, happy. Alles
Weitere ist Staffel-Vorschlag, **[ANNAHME]**:

| Stufe | Umfang | Preis (Vorschlag) |
|---|---|---|
| Basis | bis ~50 aktive Objekte in onOffice, ein Standort | 11.900 € netto |
| Standard *(= Riegel-Fall)* | bis ~150 aktive Objekte, ein Standort, Gebietsschutz inklusive | 13.800 € netto |
| Größer | 150+ Objekte oder mehrere Büros/Marken | ab 18.000 €, Individualangebot nach kurzem Gespräch |

**Warum nach Objektzahl staffeln, nicht nach Zeit:** je mehr Objekte im
onOffice-Account, desto mehr Test- und QA-Aufwand (mehr Objekttypen, mehr
Edge Cases in den Daten), aber die Grundarbeit — Template, Tokens,
Connector — bleibt gleich. Objektzahl ist das einzige Merkmal, das der
Makler selbst kennt und das du vor dem Kick-off aus onOffice abfragen kannst.

**Offene Frage, die du dir ehrlich beantworten musst:** War 13.800 € der
Standardpreis, oder ein Pilotpreis, weil Riegel dein erster Fall war und du
noch kein fertiges Template hattest? Wenn Letzteres — der nächste Kunde
zahlt vermutlich mehr, nicht weniger, weil die Lieferung jetzt schneller und
sicherer ist. Siehe Frage 2.

**Kein Zeit-Staffel-Rabatt, keine Discount-Codes.** Fester Preis pro Stufe,
Punkt. Alles andere untergräbt „ein fester Preis, den du vorher kennst".

---

## 2 · Die Delivery-Maschine

### Was skaliert werden muss

7 Tage für **einen** Kunden — gebaut, während das Template selbst entstand.
Für 10 Kunden **parallel** pro Monat brauchst du drei Dinge, die JETZT noch
nicht fertig getrennt sind:

1. **Ein Template-Repo** — eine Next.js-Codebasis, kein Repo pro Kunde, das
   dann eigenständig weiterlebt. Jede Verbesserung (Bugfix, neues Feature)
   muss automatisch bei allen laufenden Kunden ankommen, nicht 50-mal von
   Hand nachgezogen werden. **Das ist die wichtigste technische Entscheidung
   im ganzen Dokument — siehe §6, Risiko „Hosting bei 50+ Sites".**
2. **Ein Brand-Token-Layer** — eine Konfigurationsdatei pro Kunde (Farben,
   Fonts, Logo, Domain, onOffice-Zugangsdaten), keine Code-Änderung pro
   Kunde. Ein neuer Kunde = eine neue Config, nicht eine neue
   Entwicklungs-Iteration.
3. **Eine Content-Pipeline für AI-Visuals** — eine Bibliothek fertiger
   Prompts (Skyline-Stimmung, Architektur-Atmosphäre, abstrakte
   Hero-Bilder), mit einem festen Nachbearbeitungsschritt (Farbabgleich auf
   die Marken-Tokens, Schärfe/Auflösung), damit „sieht nicht nach KI aus"
   wiederholbar ist und nicht jedes Mal neu erfunden wird. Baue diese
   Bibliothek jetzt, mit den Prompts, die bei Riegel funktioniert haben, als
   Startpunkt.

Ohne diese drei Bausteine ist jeder neue Kunde wieder ein Bau-Projekt wie
Riegel — 6-7 Tage Handarbeit. Mit ihnen wird ein neuer Kunde eine
**Konfiguration**, kein Bau.

### Was du selbst machen musst vs. was weg kann

**Bleibt bei dir (nicht delegierbar, weil es der Grund ist, warum Kunden
kaufen):**
- Verkaufsgespräche und Abschluss
- Marken-Token-Entscheidungen bei Grenzfällen (unklares Kunden-Logo, schlechte
  Farbvorlage — Geschmacksentscheidung)
- Finale Freigabe/QA vor Launch
- Auswahl der AI-Visual-Ergebnisse (Kuratierung — nicht die Generierung
  selbst)
- Die Kundenbeziehung. „Du redest mit dem, der baut" ist dein
  Differenzierungsmerkmal — das kannst du nicht outsourcen, ohne das
  Versprechen zu brechen

**Automatisierbar (einmal bauen, dann läuft es):**
- onOffice-Connector — einmal robust bauen, dann pro Kunde nur Zugangsdaten
  eintragen
- Deployment (ein Skript/eine Pipeline: neue Config rein, Vercel-Projekt
  raus)
- DNS-Setup — als Runbook dokumentieren, nicht jedes Mal neu überlegen
- AI-Visual-Generierung — sobald die Prompt-Bibliothek steht, ist das
  Parameter-Austausch, kein Neuentwerfen

**Delegierbar an Freelancer/VA (sobald Volumen es rechtfertigt):**
- Brand-Tokens aus vorhandenem Kundenmaterial extrahieren (Logo-Datei,
  Farbwerte aus bestehender Website) — eine Junior-Design- oder VA-Aufgabe
  nach klarer Checkliste
- onOffice-Zugang einrichten/testen pro Kunde
- QA-Checkliste abarbeiten (Links, Mobile-Ansicht, Ladezeit) vor deiner
  finalen Freigabe
- **Personalisierte Demos für die Kaltakquise bauen** (siehe §3a) — das ist
  der größte Zeitfresser im ganzen System und der wahrscheinlich erste Job,
  den du abgibst

### Ab welcher Stückzahl der erste Freelancer

**[ANNAHME, mit Rechnung — Details in §5]:**

- **1-3 Kunden/Monat:** du allein. Nutze die Zeit, um Template,
  Brand-Token-Layer und Prompt-Bibliothek fertig zu bauen.
- **4-6 Kunden/Monat:** hier kippt es. Sobald du regelmäßig Demos für
  Kaltakquise baust (§3a), frisst das 30-60 Minuten pro Demo — bei den
  Mengen, die für 4+ Kunden nötig sind, sind das mehrere Arbeitstage pro
  Woche, nur fürs Demo-Bauen. **Erste Einstellung: ein Demo-Builder
  (VA/Junior-Designer, keine Entwicklerrolle), 10-15h/Woche.** Das ist keine
  Entwicklungsarbeit, sondern Konfiguration nach Checkliste — genau das
  Richtige für eine erste Delegation.
- **7-10 Kunden/Monat:** die Lieferseite selbst wird zum Engpass, nicht nur
  Akquise. Zweite Rolle: jemand für Deployment-/QA-Ops, der onOffice-
  Eigenheiten einzelner Kunden abfängt, bevor sie bei dir landen.

Die Rechnung dazu, warum das so ist, steht in §5 („Zeitbudget von Alex").

---

## 3 · Die Akquise-Loops

### a) Personalisierte White-Label-Demo als Outreach-Waffe

Der Kern: der Zielmakler sieht seine **eigenen** Objekte in deinem Design,
bevor er auch nur mit dir gesprochen hat. Das ist kein Pitch, das ist ein
Beweis.

**Schritt für Schritt:**

1. **Zielmakler auswählen.** Erkennungsmerkmal: nutzt onOffice — oft sichtbar
   an eingebetteten onOffice-Widgets/Standard-Exposé-Layouts auf der
   bestehenden Maklerseite, oder direkt erfragbar über Branchenverzeichnisse.
2. **Datenquelle für die Demo.** Nur **öffentlich sichtbare** Objektdaten:
   von der eigenen Website des Maklers oder von Portalen, auf denen der
   Makler seine eigenen Objekte selbst öffentlich gelistet hat (z. B.
   ImmoScout24-Anzeigen). **Kein** Zugriff auf den onOffice-Account des
   Zielmaklers selbst — den hast du nicht und darfst ihn nicht haben.
3. **Aufwand pro Demo (sobald Template + Brand-Token-Layer stehen):** Logo
   und Farben vom Makler übernehmen (Screenshot/Logo-Datei reicht), 5-10
   echte Objekte manuell eintragen (Titel, Preis, Lage, Beschreibung — Text
   und Fakten, keine geschützten Werke). Zielzeit: **30-60 Minuten pro
   Demo**, sobald der Prozess eingespielt ist. Kein Live-onOffice-Connector
   für die Demo — zu aufwendig und rechtlich unnötig riskant ohne
   Kundenzugang. Stattdessen ein „Demo-Modus" des Templates mit fest
   eingetragenen Beispielobjekten.
4. **Demo-Link.** Technisch am einfachsten: eine Pfad-Route wie
   `beuwy.com/demo/riegel` in einer eigenen Demo-Instanz des Templates.
   Echte Subdomains im Stil `deine-stadt-demo.beuwy.com` sehen persönlicher
   aus, brauchen aber Wildcard-DNS + Wildcard-Domain-Konfiguration bei
   Vercel — technischer Mehraufwand, den du erst einbaust, wenn das Volumen
   es rechtfertigt. Starte mit Pfad-Routen, wechsle später auf Subdomains.
5. **Die Nachricht.** Kalte Mail oder DM: *„Wir haben deine Website schon mal
   umgebaut. Schau selbst: [Link]."* Kurz, kein Pitch-Text davor. Der Link
   IST der Pitch.

**Rechtliche Leitplanken — das ist der Teil, den du nicht überspringen
darfst:**

- **Objektfotos sind geschützt** (meist Makler oder dessen Fotograf/
  Home-Staging-Anbieter). Fremde Fotos ungefragt in eine Demo zu übernehmen
  ist eine Vervielfältigung fremder Werke — rechtlich eine Grauzone, auch
  wenn du sie nur dem Rechteinhaber selbst zeigst.
- **Sicherste Variante:** in der Demo **eigene Platzhalter- oder
  AI-Stimmungsbilder** statt der echten Objektfotos verwenden. Nur Text und
  Fakten (Titel, Preis, Lage, Zimmerzahl) sind Fakten, keine geschützten
  Werke — die kannst du bedenkenlos übernehmen. Immer noch beeindruckend,
  weil „deine echten Objekte, mein Design" auch ohne echte Fotos wirkt.
- **Wenn du doch 1-2 echte Fotos nutzt:** nur für die private Demo, nie
  öffentlich verlinkt, nie auf Social geteilt, sofort offline nehmen, wenn
  keine Antwort kommt oder der Kontakt „nein" sagt.
- **Demo immer `noindex`, nie in der Sitemap, nie öffentlich beworben**, bis
  der Makler zugestimmt hat. Das ist eine private Demo für eine Person, kein
  Portfolio-Stück.
- **Logo-/Namensnennung** in einer privat gezeigten Demo ist gängige und
  akzeptierte Agentur-Praxis (vergleichbar mit einem Redesign-Mockup),
  niedriges Risiko — aber nicht öffentlich als Case bewerben, bevor ein
  Vertrag steht.
- **[ANNAHME/Hinweis, keine Rechtsberatung]:** Sobald du in großer Stückzahl
  Demos baust, lohnt sich eine einmalige kurze Abstimmung mit einem Anwalt
  über deinen Standardprozess — damit das nicht bei jeder Demo neues
  Bauchgefühl ist.

### b) Der Riegel-Loop

Riegel ist dein bestes Beweisstück — nutz ihn wie einen Motor, nicht wie ein
einmaliges Case-Study-PDF.

1. **Case dokumentieren** — Vorher/Nachher-Screenshots, die 6-7-Tage-Zahl,
   die 13.800-€-Zahl, ein kurzes Kundenzitat (falls Riegel eins gibt).
2. **Video-Walkthrough** — Screen-Recording, du erzählst dazu: „So sieht das
   Portal aus, so hat es vorher ausgesehen, so lange hat's gedauert." Zeig
   die Suche, den Login, ein Objekt im Detail.
3. **Instagram/LinkedIn-Ads auf Makler.** Du hast das schon gemacht — bei
   acta 315 Wohnungen über Instagram verkauft, €48,4 Mio. Volumen, mitten in
   der Zinskrise. Gleiche Mechanik, andere Zielgruppe: statt
   Wohnungskäufer jetzt Makler selbst. Kurzes vertikales Video (Reel/Story),
   Vorher/Nachher als Creative, Ziel-Interessen: onOffice, ImmoScout24,
   Makler-Berufsgruppen. CTA führt zur `/makler`-Seite oder direkt zur
   Demo-Anfrage.
4. **Retargeting** wie beim acta-Funnel: wer über 50 % des Videos gesehen
   hat, bekommt eine schärfere Folge-Anzeige mit direktem CTA.

### c) Vertikale Referrals

Makler kennen Makler — regionale Netzwerke, Verbandstreffen, lokale
Maklerkreise. Der Hebel ist **Gebietsschutz**:

- **Das Verkaufsargument:** „Ich baue das nur einmal pro Stadt. Wenn du mich
  buchst, sicherst du dir deine Stadt."
- **Der Referral-Treibstoff:** genau diese Exklusivität macht Empfehlung in
  die Nachbarstadt attraktiv — der Kunde konkurriert nicht mit dem, den er
  empfiehlt. „In deiner Stadt bist nur du drin — empfiehl mich für die
  Nachbarstadt, und du bekommst [X]."
- **[ANNAHME, Entscheidung offen — Frage 5]:** konkrete Prämie noch nicht
  festgelegt. Optionen: Bar-Prämie (z. B. 1.000 €), ein Gratis-Monat
  Pflege/Support, oder ein Rabatt auf ein künftiges Zusatzmodul.
- **Gebiets-Definition muss klar sein**, sonst ist das Versprechen nicht
  einlösbar — siehe Risiko in §6.

### d) Jeder gelieferte Kunde = neuer Case auf /makler

Standardisiere das am Ende jedes Projekts, nicht als Nachgedanke:

- Vorher/Nachher-Screenshot
- 2-3 Sätze Kundenzitat
- Kennzahl, falls vorhanden (Zeit bis Live, ggf. später Anfragen-Zunahme)

Landet auf `/makler` — **diese Seite existiert noch nicht**, siehe §4. Nach
dem gleichen Muster wie `src/lib/cases.ts` (Single Source of Truth für Case-
Studies), damit die Seite automatisch mitwächst. Mit jedem Kunden wird die
Beweislage dicker und der nächste Abschluss leichter — das ist der
Compoundeffekt, den du willst.

---

## 4 · Der Funnel

```
Kalte Demo (§3a)  ─┐
IG/LinkedIn-Ad (§3b) ─┼─→  /makler  ─→  Demo-Link / Anfrage (?quelle=makler)  ─→  Call  ─→  Vertrag
Referral (§3c)     ─┘         │
                          Cases + Riegel-Beweis
```

**Was gebaut werden muss (aktueller Stand geprüft):**

- **`/makler`-Landingpage — existiert noch nicht.** `/immobilien` ist die
  strukturell nächste Vorlage im Repo: Diagnose-Sektion, Operator-Trust-
  Block, gestaffelte Preise, Geld-zurück-Garantie, Case-Beweise, FAQ,
  Lead-Magnet, Verfügbarkeits-Zähler. Fast 1:1 übertragbar — Inhalte
  austauschen, Struktur behalten.
- **`/anfrage?quelle=makler`** — das Muster **existiert bereits im Code**
  (`src/app/anfrage/page.tsx` hat schon eine `quelle`-Weiche für
  `immobilien`/`immobilien-check`). Für Makler fehlt nur ein analoger
  Zweig (`quelle?.startsWith("makler")`) mit eigener Headline/Copy — ein
  kleiner, klar umrissener Entwicklungs-Task, kein neues Konzept.
- **Personalisierter Demo-Link** pro Zielmakler (§3a).

**Antwortzeiten:**
- Auf eine Demo-Antwort/Interesse: **innerhalb 24h** persönlich melden (weil
  Demo-Bau manuelle Arbeit ist, ist sofortige Reaktion realistisch, aber
  nicht < 6h garantierbar, solange du das allein machst)
- Auf eine fertige Anfrage über `/anfrage`: **< 6h**, wie beim Rest der
  Seite bereits versprochen — keine Extra-Regel für Makler nötig, gleiche
  Latte wie überall sonst.

**Abschluss-Gespräch-Struktur (15-20 Min, kein langer Pitch):**

1. Demo live zeigen, Reaktion abwarten
2. Drei Fragen: Wie viele Objekte in onOffice? Was nervt an der aktuellen
   Seite am meisten? Bis wann soll es live sein?
3. Preis und Garantie **direkt nennen** — kein „Angebot folgt per Mail".
   Passt zum No-Brainer-Prinzip aus `PROJECT.md`.
4. Nächster Schritt sofort: Vertrag/Anzahlung heute, Startdatum fixieren.

---

## 5 · Zahlen

**Ziel:** 10 Kunden/Monat × 13.800 € = **138.000 € netto/Monat.**

Alles Folgende ist Rechnung mit **[ANNAHME]**-Werten, keine Messung. Nutze
es, um zu sehen, ob die Größenordnung überhaupt plausibel ist — nicht als
Zusage.

### Kanal-Mix (Annahme, frei anpassbar)

| Kanal | Ziel-Anteil | Kunden/Monat |
|---|---|---|
| Kalte Demo (§3a) | 40 % | 4 |
| Bezahlte Ads / Riegel-Loop (§3b) | 30 % | 3 |
| Referral (§3c) | 30 % | 3 |

### Kalte Demo — Rechnung rückwärts

Stufen: Demo verschickt → Antwort → Call → Abschluss.

| Stufe | Quote **[ANNAHME]** |
|---|---|
| Demo → Antwort | 15 % |
| Antwort → Call | 50 % |
| Call → Abschluss | 35 % |
| **Kombiniert** | **≈ 2,6 %** |

Für 4 Kunden: **≈ 150 Demos/Monat** nötig (≈ 7-8/Werktag). Bei 30-60 Min pro
Demo sind das **75-150 Stunden/Monat nur fürs Demo-Bauen** — mehr als eine
volle Stelle. **Das ist der harte Beweis dafür, dass der Demo-Builder-Hire
aus §2 kein Nice-to-have ist, sondern die Voraussetzung für dieses Kanal.**

### Bezahlte Ads (Riegel-Loop) — Rechnung rückwärts

Keine belegten CPL-Zahlen für diese Nische — **nicht erfinden**. Stufen und
Quoten sind Platzhalter **[ANNAHME]**, keine Erfahrungswerte aus diesem
konkreten Funnel:

| Stufe | Quote **[ANNAHME]** |
|---|---|
| Lead → Call | 40 % |
| Call → Abschluss | 30 % |
| **Kombiniert** | **≈ 12 %** |

Für 3 Kunden: **≈ 25 Leads/Monat**. Empfehlung: **mit einem Testbudget
starten (z. B. 1.000-1.500 €/Monat [ANNAHME]) und die echte CPL messen**,
statt eine erfundene Zahl in die Planung zu schreiben.

### Referral — Rechnung rückwärts

| Stufe | Quote **[ANNAHME]** |
|---|---|
| Warme Empfehlung → Call | 70 % |
| Call → Abschluss | 45 % |
| **Kombiniert** | **≈ 31,5 %** |

Für 3 Kunden: **≈ 10 warme Empfehlungen/Monat** nötig. **Wichtiger
Vorbehalt:** dieser Kanal startet bei null — er braucht erst eine Basis
gelieferter Kunden, bevor er trägt. In den ersten Monaten muss der fehlende
Referral-Anteil von den anderen zwei Kanälen aufgefangen werden.

### Zeitbudget von Alex (bei voller Auslastung, 10/Monat)

| Aufgabe | Stunden/Monat **[ANNAHME]** |
|---|---|
| Calls (≈ 28 Calls insgesamt, inkl. Vor-/Nachbereitung) | ≈ 21 h |
| Delivery-Oversight (10 Kunden × 1 Tag/Kunde: Tokens, Visual-Kuration, QA, Launch-Call) | ≈ 80 h |
| Ads-Management/Creative | ≈ 16 h |
| Referral-Pflege | ≈ 8 h |
| **Summe ohne Demo-Bau** | **≈ 125 h** |
| Demo-Bau (150 Demos × 30-60 Min) | **75-150 h — MUSS delegiert werden** |

Bei ~160 verfügbaren Arbeitsstunden im Monat bleiben ohne Demo-Bau nur ~35 h
Puffer für Template-Pflege, Hiring, Rechnungen, Pech. Mit Demo-Bau ist die
Rechnung solo **nicht machbar** — das deckt sich mit der Hiring-Schwelle aus
§2.

**Der größte Hebel im ganzen System:** die 80 Stunden Delivery-Oversight pro
Monat. Jede Stunde, die du hier durch bessere Automatisierung (robusterer
onOffice-Connector, feste QA-Checkliste statt Freihand-Prüfung) herausholst,
ist wertvoller als fast jede andere Optimierung — sie multipliziert sich mit
10 Kunden/Monat.

---

## 6 · Risiken ehrlich

- **onOffice-API-Abhängigkeit.** Der Connector funktioniert nur, solange
  onOffice die API offen hält, keine Breaking Changes macht und der Kunde
  seinen eigenen API-Zugang bereitstellt und pflegt. Wenn onOffice die
  Bedingungen ändert oder ein Zielkunde ein anderes System nutzt (Propstack,
  FlowFact, Immoware24), bricht die Automatisierung für diesen Fall komplett
  weg — und du bist wieder bei Handarbeit. Der Connector sollte modular
  gebaut werden, auch wenn heute nur onOffice zählt.
- **Design-Sättigung.** Wenn mehrere Makler in überschneidenden Gebieten
  fast identische Portale bekommen, sehen sich lokale Wettbewerber
  gegenseitig im gleichen Layout — das untergräbt genau das
  Premium-Gefühl, das verkauft wurde. **Gebietsschutz löst das UND ist
  gleichzeitig das Verkaufsargument** (§3c). Aber: die Definition von
  „Gebiet" ist ungeklärt (Stadt? Landkreis? Stadtteil? Nische?) und hat
  einen echten Zielkonflikt eingebaut — strikte Ein-Kunde-pro-Stadt-Regel
  begrenzt mathematisch, wie viele der 10 Kunden/Monat überhaupt aus
  Deutschlands begrenzter Zahl großer Städte kommen können. Muss vor
  Skalierung entschieden werden (Frage 3).
- **Solo-Bottleneck.** Jeder Loop in §3 läuft am Ende auf dich zu — Verkauf,
  Abschluss, Freigabe, Kundenbeziehung. „Du redest die ganze Zeit direkt mit
  mir" ist dein Verkaufsargument UND deine größte Verwundbarkeit. Keine
  Redundanz: Krankheit, Urlaub oder auch nur ein voller Kalender bremsen die
  ganze Maschine, nicht nur ein Teilstück.
- **Vercel/Hosting-Betrieb bei 50+ Kunden-Sites.** Nach fünf Monaten bei
  Zielvolumen sind 50 Kunden-Sites live. Zwei Fragen entscheiden, ob das
  handhabbar bleibt: (1) Fork-pro-Kunde-Repo vs. echtes Multi-Tenant-System
  — bei Forks muss **jede** Template-Verbesserung 50-mal von Hand
  nachgezogen werden, das skaliert nicht. (2) Vercel-Kosten/Limits pro
  Projekt bei 50+ parallelen Deployments — vorher prüfen, nicht erst bei
  Rechnung Nr. 50. **Empfehlung:** vor dem zehnten Kunden die
  Architektur-Frage klären, nicht danach (Frage 4).
- **Rechtlich/DSGVO beim Kunden-Login.** Sobald echte Interessenten-Konten
  gespeichert werden (Favoriten, gespeicherte Suchen), greift DSGVO für
  jede der 50+ Kunden-Sites einzeln — Verantwortlichkeit muss geklärt sein
  (Makler als Verantwortlicher, beuwy als Auftragsverarbeiter?).
- **Keine wiederkehrende Umsatzlinie eingebaut.** Das Portal ist aktuell ein
  Einmal-Festpreis. Laut `MARKET-FINDINGS.md` §4 ist eine wiederkehrende
  Linie der einzige belegte Weg, über die Solo-Stundendecke zu kommen — die
  138.000 €/Monat aus diesem Playbook müssen **jeden Monat neu von null**
  verkauft werden, ohne Sicherheitsnetz aus Bestandskunden-Umsatz. Das
  spricht dafür, früh über einen Pflege-Retainer nachzudenken (Frage 7),
  nicht erst wenn 10/Monat schon Alltag sind.

---

## OFFENE FRAGEN AN DEN ORCHESTRATOR

1. **Produktname:** „Makler-Portal", „Makler-Update", „Dein Immo-Portal"
   oder ein eigener Name?
2. **Preis-Basis:** War 13.800 € der Standardpreis oder ein Pilotpreis für
   Riegel als ersten Fall? Bestimmt, ob die Staffel in §1 nach oben oder
   unten verschoben werden muss.
3. **Gebietsschutz-Definition:** Stadt, Landkreis, Stadtteil oder Nische
   (z. B. Wohn- vs. Gewerbeimmobilien)? Wie strikt — im Wissen, dass eine
   strikte Ein-Kunde-pro-Stadt-Regel die erreichbare Stückzahl in kleineren
   Märkten mathematisch begrenzt.
4. **Architektur-Entscheidung:** Fork-pro-Kunde-Repo oder echtes
   Multi-Tenant-System? Entscheidet, ob Wartung bei 50+ Kunden linear
   explodiert oder flach bleibt. Sollte vor dem 10. Kunden fallen, nicht
   danach.
5. **Referral-Prämie:** konkrete Form und Höhe (Bar-Prämie, Gratis-Monat,
   Rabatt-Gutschein)?
6. **Erste Einstellung:** Budget für einen Demo-Builder (VA/Junior, 10-15h/
   Woche) ab ca. 4 Kunden/Monat freigeben — ja/nein, und wann konkret?
7. **Einmal-Preis oder Retainer mitverkaufen?** `MARKET-FINDINGS.md` zeigt:
   MRR ist der einzige belegte Weg über die Solo-Decke. Soll ein
   Pflege-Retainer von Anfang an Teil des Verkaufsgesprächs sein, oder erst
   später als separates Upsell?
8. **Rechtliche Prüfung der Demo-Praxis** (fremde Objektfotos/-daten):
   einmalige Anwalts-Abstimmung vor Skalierung — ja/wann?
9. **onOffice als einzige Datenquelle** oder von Anfang an auch andere
   Systeme (Propstack, FlowFact, Immoware24) einplanen? Beeinflusst, wie
   modular der Connector jetzt gebaut werden muss.
10. **Kunden-Login klären:** ist damit ein Login für die Endkunden des
    Maklers (Interessenten, Favoriten/gespeicherte Suchen) gemeint oder ein
    Login für den Makler selbst (Verwaltung)? Der Scope in §1 geht von
    Ersterem aus — bitte bestätigen, weil es Umfang und DSGVO-Aufwand direkt
    bestimmt.
