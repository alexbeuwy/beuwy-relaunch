# FAKTEN.md — beuwy Animationsfilm (Apple-Stil, 60–120 s)

Stand 25.09.2026. Quellen: Datei + Abschnitt, wie im Repo `/home/user/beuwy-relaunch`
gelesen. Strikt getrennt: **FREIGEGEBEN** (Alex hat es bestätigt) / **UNBELEGT** /
**NUR MIT KUNDENFREIGABE**.

---

## 1. Wer beuwy ist (Firma, Team, Herkunft, Positionierung)

- **Positionierung:** beuwy ist eine **Unternehmensberatung** für Immobilienunternehmen
  — NICHT „Agentur" (Wort für Selbstbeschreibung verboten, Grep-Gate).
  Quelle: `docs/redesign/BRIEF.md` §9.
- **Was verkauft wird:** keine Websites, sondern **Portale/Systeme** — Auftritte, die
  messbar Mandate/Deals erzeugen. „Website" bleibt nur SEO-Keyword-Sprache.
  Quelle: BRIEF.md §9.
- **Gründer:** Alexander Pütter. 17 Jahre Markenarbeit, u. a. für Bosch, Continental,
  Michelin (als Namen genannt, keine fremden Logos zeigen).
  Quelle: `docs/branding/VSL-EXPLAINER-v2.md` §2.3, §4 (Zeile 1:08).
  Status: **FREIGEGEBEN** (auf `/ueber-uns` veröffentlicht).
- **Selbst verkauft:** Alex hat selbst 380 Wohnungen in 3 Jahren verkauft (Kapitalanlage-
  Vertrieb „acta", ca. 40 Mio. € Volumen, in der Spitze 15 Vertriebsleute, über
  Instagram-Anzeigen). Quelle: `src/lib/texte/seiten/marketing-kapitalanlage-immobilien.ts`
  Z.44-48 (`acta_fakten`); `src/lib/content.ts` Z.270 (`mk.beweis.kunden`-Kacheln).
  Status: **FREIGEGEBEN** als Fallstudie „acta", aber acta ist Alex' eigener Vertrieb,
  nicht formal ein externer Kunde — im Film als „selbst aufgebaut" erzählen, nicht als
  drittes Kundenlogo.
- **Seit wann/Umfang:** „seit 2017", „40+ Premium-Projekte für Makler" (`mk.stats.s1`).
  Quelle: `docs/branding/VSL-EXPLAINER-v2.md` Z.39; `src/lib/content.ts` Z.240-241.
  Auf Startseite auch „100+ Markenprojekte seit 2009" (Floating Card Hero) — Achtung,
  **widersprüchliche Zahl/Jahr** zu „seit 2017"/„40+", siehe Lücken unten.
  Quelle: `docs/redesign/recherche/2026-09-24-audit-startseite-marke.md` Z.33.
- **Team/Arbeitsmodus:** Gründerteam mit Erfahrung als Projektentwickler/Makler selbst
  (Alex 380 Wohnungen verkauft). Ein Ansprechpartner arbeitet nach Ticketsystem
  nachweisbar (kein "wie weit ist mein Dokument"-Problem).
  Quelle: VSL-EXPLAINER-v2.md §2.2 "Kontrolle ↑"; BRIEF.md §8.
- **Events Mallorca/Mailand/Frankfurt:** **in den durchsuchten Dateien NICHT gefunden.**
  Kein Treffer für „Mallorca", „Mailand" oder Event-Reisen in BRIEF, PLAN, GOAL,
  VSL-EXPLAINER, SKRIPT-Dateien, HOOKS, recherche/*, sales/*, content.ts oder den
  Zielgruppen-Seiten. → **LÜCKE**, s. u.

## 2. Angebote HEUTE (4 Säulen, done-for-you)

Quelle: `docs/redesign/BRIEF.md` §1, §6 (Startseiten-Dramaturgie Block 5); Startseite
laut Audit (`docs/redesign/recherche/2026-09-24-audit-startseite-marke.md` Z.40).

1. **Marke & Design** — Branding, Corporate Identity, „Instanz statt Visitenkarte".
2. **Website & Experience** — Premium-Auftritt, XXL-Hero-System, eigenes Portal
   (Objektliste, Kundenkonto, Suchaufträge) unter der Marke des Kunden.
3. **E-Mail & Funnel** — automatisierte Reports, Mailings passend zum Suchauftrag,
   Nachfass-Automation.
4. **Automatisierung** — eigenes CRM/Deal-Kanban, Bewertungsrechner (kalibriert mit
   echten Abschlussdaten, amtliche Bodenrichtwerte), Wochenbericht, KI-Prozesse.

Konkrete Bausteine (aus RIEGEL-Case, verallgemeinerbar als „das System"):
Immobilienbewertungs-Rechner · Report-PDF (automatisch mit Kundenlogo) · eigenes
Portal mit Kundenkonten · CRM-Anbindung (onOffice, FLOWFACT, Propstack, JUSTIMMO,
CasaOne — als Kompatibilität, nicht Partnerschaft) · Follow-up-Automation ·
lokale Sichtbarkeit (Google, KI-Antworten).
Quelle: BRIEF.md §8 (Tabelle); `docs/branding/FILM-PROMPT-60S.md` Z.17-22, Z.62-85.

**Liefergeschwindigkeit:** 4–6 Wochen bis Livegang, teils „6 Wochen" genannt, teils
„4–6 Wochen". Termin wird **schriftlich** zugesagt, bevor das Projekt beginnt.
Quelle: `src/lib/texte/seiten/marketing-kapitalanlage-immobilien.ts` Z.63 (FAQ);
VSL-EXPLAINER-v2.md §4 (Zeile 1:32); FILM-PROMPT-60S.md Z.58-60.
Status: **FREIGEGEBEN**.

**Kundenaufwand:** „zwei Termine und Ihre Fotos" laut VSL-EXPLAINER-v2/FILM-PROMPT-60S,
ABER Startseite und `/ueber-uns` sagen an anderer Stelle „vier Termine" —
**interner Widerspruch, ungeklärt**. Quelle: VSL-EXPLAINER-v2.md Z.44 (Klammer-Hinweis);
`docs/redesign/recherche/2026-09-24-audit-startseite-marke.md` Z.45 ("Vier Termine
reichen."). → für den Film: **nur „zwei Termine" verwenden, wenn Alex das vorab
bestätigt** (siehe Lücken); sonst neutral „wenige Termine" sagen.

## 3. Zielgruppen (mit Nutzen/Schmerz je Gruppe, Quelle je Aussage)

### 3a. Makler (Kernzielgruppe, am besten belegt)
- **Schmerz:** Eigentümer vergleicht abends 3 Makler-Websites am Handy, ruft den an,
  der „besser aussieht", nicht besser verkauft; Portale geben eine Anfrage an bis zu
  3 Makler weiter; günstige Wertermittlungen kosten 6–8 Std. Zeit ohne Ergebnis.
  Quelle: `docs/branding/HOOKS-v3.md` Belege B1 (Portale bis 3 Makler, belegt), B7
  (6–8 Std. Wertermittlung, Einzelstimme/Blog), B6 (DISQ/ntv 2024: 47 % E-Mails an
  große Maklerhäuser unbeantwortet, belegt).
- **Nutzen/Traumzustand:** „Ihr nächstes Mandat beginnt, während Sie schlafen" —
  Eigentümer bewertet nachts sein Haus, Minute später hat er den Report mit dem
  Logo des Maklers, ruft am nächsten Morgen an. Quelle:
  `docs/branding/VSL-EXPLAINER-v2.md` §3 Hook A (Z.68-77).
- Kundenname mit Freigabe: **RIEGEL Immobilien**. Quelle s. Abschnitt 5.

### 3b. Projektentwickler / Bauträger
- Eigene Seiten: `src/app/marketing-projektentwickler`, `src/app/marketing-bautraeger`.
- Case: **Vision Group** — von 3 Personen im Gründungsbüro zu Joint Venture mit KKR
  über 160 Mio. €, 1.450 Wohneinheiten entwickelt.
  Quelle: `src/lib/content.ts` Z.270 (`mk.beweis.kunden`-Kachel); `src/lib/texte/seiten/
  cases-detail.ts` Z.35-45, Z.97-99; `src/lib/texte/seiten/casaone-website.ts` Z.110.
  Status: **FREIGEGEBEN** (auf Startseite/Cases veröffentlicht).
- Anmerkung Audit: Vision Group „hat den Zyklus nicht überstanden" laut
  VSL-EXPLAINER-v2.md Z.64 (Liste „bewusst nicht im Film") — im aktuellen Case-Text
  aber weiter als Erfolgsbeispiel geführt. → im Film nur mit den freigegebenen
  Wachstumszahlen erzählen, keine aktuelle Unternehmenslage behaupten.

### 3c. Vertriebe (Immobilienvertrieb / Kapitalanlage-Vertrieb)
- Eigene Seiten: `src/app/marketing-immobilienvertrieb`,
  `src/app/marketing-kapitalanlage-immobilien`.
- **Schmerz (Kapitalanlage-Vertrieb):** gekaufte Anleger-Listen sind bei jedem
  Wettbewerber gleich teuer und gleich kalt; Umsatz hängt am Zufall des Nachschubs;
  Anleger vertrauen ihr Geld keinem austauschbaren Auftritt an.
  Quelle: `src/lib/texte/seiten/marketing-kapitalanlage-immobilien.ts` Z.7-23 (`pains`).
- **Nutzen:** Qualifizierung vor dem Termin (Eigenkapital/Einkommen/Anlageziel liegen
  vor, bevor der Kalender sich öffnet), Anzeige → Rechner/Registrierung → qualifiziertes
  Profil, Follow-up-Automation, Wochenbericht mit Kennzahlen statt Bauchgefühl.
  Quelle: ebd. Z.25-41 (`schritte`).
- Case: **acta** — 15 Vertriebsleute an der Spitze, 380 Wohneinheiten in 3 Jahren,
  ca. 40 Mio. € Volumen über Instagram-Anzeigen. Das ist **Alex' eigener,
  selbst betriebener Vertrieb** (kein Drittkunde). Quelle: ebd. Z.44-48.
  Status: **FREIGEGEBEN** als Beleg, aber Herkunft (Alex selbst) im Film klar machen.

### 3d. Finanzdienstleister / Finanzvertriebe
- **Kein eigener Zielgruppen-Ordner/keine eigene Seite** für „Finanzdienstleister" im
  engeren Sinn (Versicherungs-/Finanzberater) gefunden — nur die verwandte Kapitalanlage-
  Immobilien-Seite (s. 3c) und der Case Königswege.
- **Case: Königswege** — „Top 10 der deutschen Finanzvertriebe". Marke und Auftritt
  komplett neu aufgesetzt, Veranstaltungsformate, Recruiting-Strecke. Wachstum:
  von **60 Personen beim Start der Zusammenarbeit** auf **über 2.300 Partner** heute
  unter derselben Marke. Quelle: `src/lib/content.ts` Z.72, Z.270-272 (`mk.beweis.kunden`,
  Kachel-Text); `src/lib/texte/seiten/cases-detail.ts` Z.48, Z.100-102, Z.139-141;
  `src/lib/texte/seiten/bewertungen-aufbauen.ts` Z.139-142;
  `docs/redesign/recherche/2026-09-24-audit-startseite-marke.md` Z.43, Z.61, Z.94.
  Status: **FREIGEGEBEN**, auf Startseite/Cases veröffentlicht — ist damit der
  **stärkste vorhandene Beleg für „Finanzdienstleister/Finanzvertriebe"** und sollte
  im Film diese Zielgruppe tragen (Königswege ist selbst KEIN Immobilienmakler,
  sondern Finanzvertrieb — explizit im Audit vermerkt: „Königswege (Finanzvertrieb)").

## 4. Was beuwy künftig anbieten wird

**In den durchsuchten Dateien praktisch nicht als eigenständige Zukunfts-Roadmap
beschrieben.** Was existiert, sind SEO-Seitenpläne für neue Content-/Vergleichsseiten
(kein neues Produkt) und ein "AI-Narrativ":

- `docs/redesign/BRIEF.md` §9 „AI-Narrativ": beuwy übersetzt die KI-Flut (ChatGPT,
  Claude, Kimi, DeepSeek) in „nutzbare Abläufe, die im Alltag Arbeit abnehmen" —
  Positionierung, kein konkretes neues Produkt/Angebot mit Datum.
- `docs/redesign/BRIEF.md` §9 R2-Seiten: `/ki-fuer-immobilienmakler` (KI-Pain →
  nutzbare Systeme), `/marketing-projektentwickler`, `/marketing-bautraeger` — das
  sind SEO-Landingpages für bestehende Leistungen, keine neuen Produkte.
- `/os` Branding-OS-Dashboard (Ingest Instagram/TikTok, KPI-Engine, Skript-Engine,
  ElevenLabs) ist laut `CLAUDE.md` ein **internes Werkzeug für Alex' Personal
  Branding**, kein Kundenangebot, noindex, aus Nav/Footer ausgeblendet.
  Quelle: `CLAUDE.md` Abschnitt „Studio & interne Werkzeuge".
- Keine Erwähnung einer geplanten Erweiterung auf Finanzdienstleister/Versicherungen
  als eigenes künftiges Geschäftsfeld gefunden.

→ **LÜCKE**: „Was beuwy künftig anbieten wird" ist im Repo nicht als Roadmap
dokumentiert. Für den Film braucht es entweder eine direkte Aussage von Alex
(z. B. im User-Prompt: „für Immobilienunternehmen, Vertriebe, Makler UND
Finanzdienstleister" — das ist eine Erweiterung der Zielgruppen-Ansprache, aber ohne
Beleg für neue Produktbausteine) oder der Film bleibt bei den 4 heutigen Säulen und
zeigt die vorhandene Zielgruppen-Breite (Makler, Projektentwickler, Bauträger,
Vertriebe/Finanzvertriebe wie Königswege) statt neuer Angebote.

## 5. Belegte Zahlen — Status je Aussage

| Claim | Status | Quelle |
|---|---|---|
| RIEGEL Immobilien: 9 zusätzliche Mandate in den ersten 3 Monaten nach dem Relaunch | **FREIGEGEBEN** (Alex, 23.09., „liegt vor, Status: grün") | `docs/branding/VSL-EXPLAINER-v2.md` §6b Z.185; `src/lib/content.ts` Z.69; `src/lib/texte/seiten/cases-detail.ts` Z.94 |
| RIEGEL: Bewertungsrechner kalibriert mit 489 echten Abschlüssen + amtlichen Bodenrichtwerten | **FREIGEGEBEN**, belegt (RIEGEL-Backtest) | VSL-EXPLAINER-v2.md §2.2 Zeile "Wahrscheinlichkeit ↑"; `cases-detail.ts` Z.95, Z.125 |
| RIEGEL: Platz 21 von über 25.000 Maklern, ImmoScout24-Award (unabhängig vom Relaunch gewonnen) | **FREIGEGEBEN**, aber explizit "unabhängig vom Relaunch" — nicht als beuwy-Erfolg framen | `cases-detail.ts` Z.31, Z.96 |
| Vision Group: 3 → 1.450 Wohneinheiten entwickelt, 160 Mio. € Joint Venture mit KKR | **FREIGEGEBEN** | `content.ts` Z.270; `cases-detail.ts` Z.97-99; `docs/redesign/LAUNCH.md` Z.77 |
| Königswege: 60 → 2.300+ Partner, Top 10 der deutschen Finanzvertriebe | **FREIGEGEBEN** | `content.ts` Z.72, Z.270-272; `cases-detail.ts` Z.100-102 |
| acta: 15 Vertriebsleute, 380 Wohneinheiten/3 Jahre, ca. 40 Mio. € über Instagram-Anzeigen | **FREIGEGEBEN** als Case, ist Alex' eigener Vertrieb | `marketing-kapitalanlage-immobilien.ts` Z.44-48 |
| Alex: 380 Wohnungen selbst verkauft (= dieselbe acta-Zahl, anders erzählt) | **FREIGEGEBEN**, auf `/ueber-uns` veröffentlicht | VSL-EXPLAINER-v2.md §2.2, Z.38, §4 Zeile 1:15 |
| 17 Jahre Markenarbeit (Bosch, Continental, Michelin) | **FREIGEGEBEN** | VSL-EXPLAINER-v2.md Z.40; `content.ts` Z.245 (`mk.stats.s3_label`) |
| 40+ Premium-Projekte für Makler, seit 2017 | **FREIGEGEBEN** laut Aussage Alex, aber Widerspruch zu „100+ Markenprojekte seit 2009" auf der Startseite | VSL-EXPLAINER-v2.md Z.39; `content.ts` Z.240-241 vs. Audit Z.33 |
| 2.100 Beurkundungen/Jahr über beuwy-Systeme | Steht in zwei **Skript-Entwürfen** (SKRIPT-v4, SKRIPT-60s), **nicht** in VSL-EXPLAINER-v2 §6b als von Alex bestätigte Zahl, **nicht** in content.ts als Studio-Key auffindbar → **UNBELEGT / zu prüfen**, bevor sie im Film verwendet wird | `docs/branding/SKRIPT-v4.md` Z.47; `docs/branding/SKRIPT-60s.md` Z.19 |
| 30 Minuten Abstimmung pro Woche (nach dem Aufbau) | **FREIGEGEBEN** (Aussage Alex, 23.09.) — gilt nur für die Abstimmung mit beuwy, NICHT als „ohne Zeitaufwand/ohne Personal" insgesamt | VSL-EXPLAINER-v2.md §6b Z.166-168; `docs/redesign/recherche/2026-09-23-makler-tiefenrecherche.md` Z.913, Z.958, Z.965 |
| Ein Büro/Makler pro Stadt (Gebietsschutz) | **FREIGEGEBEN** (Alex, 23.09., „echt") — soll in den Vertrag aufgenommen werden | VSL-EXPLAINER-v2.md §2.2 Zeile "Knappheit"; `docs/redesign/LAUNCH.md` Z.77 |
| Leadgenerierung: 2.500 € netto Betreuung + 2.000 € Meta-Budget/Monat, ca. 150 Leads/Monat, NUR mit System vorher (Marke+Website), Makler ruft selbst an | **FREIGEGEBEN**, mit klaren Einschränkungen (nicht „ohne laufende Werbekosten") | VSL-EXPLAINER-v2.md §6b Z.170-176, Z.182-184 |
| 5–40 Mehrmandate pro Quartal | **In den gelesenen Dateien nicht gefunden** in dieser Form. Vergleichbar ist nur RIEGEL „9 Mandate in 3 Monaten" | → **LÜCKE**, keine Quelle gefunden |
| „10 Mandate/Monat" | **UNBELEGT**, explizit als Risiko markiert — einziger Beleg ist RIEGEL mit ca. 3/Monat | VSL-EXPLAINER-v2.md §2.4 Z.61, §6b Z.177-179; `docs/redesign/recherche/2026-09-23-makler-tiefenrecherche.md` Z.942, Z.948-958 (in Rezension „gestrichen (Recht)") |
| „90 % KI-Box" | **In den durchsuchten Dateien nicht gefunden** — keine Quelle | → **LÜCKE**, keine Bestätigung, nicht verwenden |
| Konkurrenz-Logos (E&V, Von Poll, Dahler, Kensington, RE/MAX, McMakler, Homeday, Betterhomes) | **NUR MIT KUNDENFREIGABE / Rechtsrisiko** — BRIEF.md verbietet Fremdlogo-Bilddateien explizit, nur Wordmark-Typo-Anmutung erlaubt, „Freigaben klärt Alex" | `docs/redesign/BRIEF.md` §4 Z.93-98, §7 Z.134; Audit Z.100 nennt die Logo-Kombination sogar „rechtlich und reputativ heikel" |
| „schneller als die Konkurrenz" / vergleichende Superlative | **NUR MIT KUNDENFREIGABE** — RIEGEL erhielt am 09.09. eine Abmahnung der Wettbewerbszentrale wegen „Bestpreis"-Werbung; nur mit harten Daten verwendbar | VSL-EXPLAINER-v2.md §2.4 Z.62 |
| Live in 6 Wochen / 4–6 Wochen, Termin schriftlich | **FREIGEGEBEN** | s. Abschnitt 2 |
| Preis „27.900 €" für das System | Steht in VSL-EXPLAINER-v2 als „Wertgleichung", ist eine der offenen Entscheidungen Alex' ("Preis im Film zeigen oder nicht") — **NUR MIT KUNDENFREIGABE**, noch nicht final entschieden | VSL-EXPLAINER-v2.md §2.2 Zeile "Preis relativ ↓"; §7 Punkt 3 |
| Ø Courtage 28.560 € pro Mandat (400.000 € Ø-Hauspreis × 7,14 %) | Rechnung mit Quelle (Capital 09/2026, RIEGEL-Bezug) — als **Herleitung nachvollziehbar**, aber selbst als Repo-interne Rechnung markiert, kein unabhängig freigegebener beuwy-Claim → im Film nur mit Fußnote/Quelle verwenden | VSL-EXPLAINER-v2.md §2.2 Zeile "Ergebnis ↑" |

## 6. Verbotene / heikle Claims (explizit, für Voiceover und Bildtext)

- **Kein „revolutionär", kein „innovativ", kein „Partner"** (außer onOffice, sobald
  Partner-Status offiziell ist). Quelle: `docs/branding/FILM-PROMPT-60S.md` Z.122-125;
  BRIEF.md §8.
- **Keine Behauptung ohne Zahl.** Quelle: FILM-PROMPT-60S.md Z.125.
- **Kein „Agentur"** für beuwy selbst. Quelle: BRIEF.md §9.
- **Keine erfundenen Zahlen**, keine „300 %+"-Comic-Zahlen. Quelle: BRIEF.md §5.
- **Kein „ohne laufende Werbekosten"** — ist laut Alex falsch (Leadgen kostet
  4.500 €/Monat). Richtig ist „ohne mehr Arbeit"/„eigene Leads, die nur Ihnen
  gehören". Quelle: VSL-EXPLAINER-v2.md §2.4 Z.63, §6b Z.174-176.
- **Kein „ohne Zeitaufwand"/„ohne zusätzliches Personal"** als Pauschalaussage —
  widerspricht den 30 Minuten/Woche. Quelle: `docs/redesign/recherche/
  2026-09-23-makler-tiefenrecherche.md` Z.942, Z.958.
- **Keine KI-Personen als echtes Team oder echte Kunden ausgeben** — jedes KI-Bild
  braucht die Mikro-Pille „AI Visual". Quelle: BRIEF.md §4 Z.69-70, §7 Z.135;
  CLAUDE.md Design-Richtung.
- **Vision Group „hat den Zyklus nicht überstanden"** (Stand VSL-EXPLAINER-v2, als
  „bewusst nicht im Film" markiert) — im Film nur die freigegebenen Wachstumszahlen
  zeigen, keine Aktualitätsbehauptung. Quelle: VSL-EXPLAINER-v2.md §2.4 Z.64.
- **Nie kursiv**, kein Gold, keine Verläufe, kein Glow, keine Stock-Menschen, keine
  Partikel/Bokeh/Weltkugeln/Zahnräder/Raketen. Quelle: FILM-PROMPT-60S.md Z.120-125;
  CLAUDE.md Design-Richtung.

## 7. Sprach-/Ausspracheregeln (für ElevenLabs-Vertonung)

- Aussprache „beuwy" = **„Boiwie"** (IPA `/ˈbɔʏviː/`). Auf v3: Pronunciation
  Dictionary mit IPA-Phonem anlegen (case-sensitive: beuwy/Beuwy/BEUWY). Auf v2/STS:
  Alias „Boiwie" setzen oder direkt „Boiwie" ins Sprechskript schreiben.
  Quelle: `docs/redesign/recherche/2026-09-24-elevenlabs-trailer-stimme.md` Z.27-30,
  §4 Z.161-197.
- **Modellwahl:** `eleven_v3` als Master (größte Ausdrucksbreite, Audio-Tags,
  Stabilität „Natural" ≈ 0.5 für Trailer). `eleven_multilingual_v2` als
  Reparaturwerkzeug für Sätze mit präzisen Pausen (`<break>`, Request Stitching,
  v3 unterstützt das nicht). **Beste Betonungsqualität: Speech-to-Speech**
  (`eleven_multilingual_sts_v2`) — Alex spricht das Skript selbst mit der
  gewünschten Betonung ein, ElevenLabs tauscht nur das Timbre.
  Quelle: ebd. §1, §5 Z.199-217, Kurzfassung Z.11-25.
- **Sätze kurz halten (≤ 12 Wörter)**, Betonungswort ans Satzende, Zahlen ausschreiben
  („sechs Wochen" statt „6 Wochen"), max. 1 Wort in CAPS pro Satz, Tags auf Englisch
  vor der Stelle setzen (`[serious tone]`, `[pause]`, `[slows down]`), max. 1–2 Tags
  pro Absatz. Quelle: ebd. §3, §7 Phase 0 (Z.329-351).
- **Nachbearbeitung:** ffmpeg-Kette in §6 (highpass, EQ, De-Esser, 2-stufige
  Kompression, leichte Sättigung, kurzer Raum, Loudness −16 LUFS für Web/Social).
  „Apple-Spot"-Variante = trockener, weniger Bass, kein Hall. Quelle: ebd. §6
  Z.271-325.
- **Deutsch, Sie-Form, kein Übersetzungsdeutsch, kein KI-Deutsch** (Verbotsliste in
  `.claude/skills/deutsche-werbetexte/SKILL.md`, nicht Teil dieses Auftrags, aber
  Pflichtlektüre für Copy). Quelle: BRIEF.md §5, §2.

## 8. Design-/Motion-Referenz für den Film (bereits erarbeitet, „Film v2")

- Bereits existierendes Konzept **„beuwy · Der Film (v2)"**: Hook-Varianten A (Die
  Nacht, empfohlen), B (Dein Impuls), C (Die Rechnung); vollständiges Skript v2
  (ca. 1:55) und ein separates **60-Sekunden-Skript** mit Farbcode D/G/W (dunkel/
  gelb/weiß) inkl. Timecodes 0–60 s. Quelle: `docs/branding/VSL-EXPLAINER-v2.md`
  komplett; `docs/branding/SKRIPT-60s.md` komplett; `docs/branding/HOOKS-v3.md`
  komplett (10 Hooks + roter Faden).
- Bereits eine **Stilprobe gebaut**: `video/system-explainer/v2-stilprobe.html`,
  15 Einstellungen in 36 s (Ø 2,4 s), Ton `audio/v2/stilprobe-mix.mp3`, Technik
  nur CSS/GSAP (Shader fallen im Sandbox-Container auf harte Schnitte zurück).
  Quelle: VSL-EXPLAINER-v2.md §6a.
- Ausführlicher **After-Effects-Prompt** mit Dramaturgie-Timecodes, Bildwelt-Regeln,
  Umsetzungsplan und Lieferformaten existiert bereits als eigenständiges Dokument.
  Quelle: `docs/branding/FILM-PROMPT-60S.md` komplett.
- Techniken-Vokabular (aus Recherche „Film v2"): Scale-from-Huge-Slam mit Overshoot,
  Wort-Stagger mit Masken, Blur-to-Sharp, Zählwerk/Split-Flap für Zahlen, Clip-Path-/
  Iris-Wipes statt Blenden, Zoom-through, Match-Cut, Whip mit Motion Blur, CSS-3D-
  Kamera mit Parallaxe, Licht-Sweep über UI. Tempo: Hook 0,6–1,2 s, Problem 2–3 s,
  Feature-Bursts 3–4 Schnitte/5 s + 0,5 s Luft, Trust über Zählwerke, Angebot/CTA
  ruhiger. Musik 126 BPM, Drop auf Schlüsselsatz, Sound-Effekte gezielt (Tick, Ping,
  Klick, Bass-Hit, Whoosh, Riser). Quelle: VSL-EXPLAINER-v2.md §5.
- **Farbkontrast-Ausnahme fürs Video** (Wunsch Alex, 23.09., spät): dunkle Szenen mit
  hellen Elementen, pastellgelbe Flächen mit dunkler Schrift sind erlaubt — Ausnahme
  zur strikten Website-Regel „nur Weiß als Grund". Quelle: VSL-EXPLAINER-v2.md §6b,
  letzter Punkt (Z.186).

## 9. Lücken / offene Fragen an Alex

1. **Events Mallorca/Mailand/Frankfurt**: keine Quelle im Repo gefunden — bitte
   bestätigen, ob/wie diese im Film vorkommen sollen (Bildmaterial? Nur als Satz?).
2. **„Finanzdienstleister" als eigene Zielgruppe**: keine dedizierte Seite/Copy
   gefunden. Vorhandene Nähe: Königswege (Finanzvertrieb, freigegeben) und die
   Kapitalanlage-Immobilien-Seite. Reicht das als Beleg für „Finanzdienstleister"
   im Film, oder ist eine engere/andere Zielgruppe gemeint (z. B. Versicherungs-
   makler, Vermögensberater)?
3. **Was beuwy künftig anbieten wird**: keine dokumentierte Produkt-Roadmap
   gefunden. Bitte 2–3 Sätze von Alex, was „künftig" konkret meint (neues Produkt?
   neue Zielgruppen-Ansprache mit bestehenden 4 Säulen? geplante Features im OS?).
4. **2.100 Beurkundungen/Jahr**: nur in zwei Skript-Entwürfen (SKRIPT-v4,
   SKRIPT-60s), nicht als von Alex bestätigte Zahl in VSL-EXPLAINER-v2 §6b oder in
   content.ts wiedergefunden — bitte separat bestätigen, bevor sie im neuen Film
   läuft.
5. **Zwei vs. vier Termine** (Kundenaufwand): Widerspruch zwischen VSL-EXPLAINER-v2/
   FILM-PROMPT-60S („zwei Termine") und Startseite/`/ueber-uns` („vier Termine") —
   bitte final festlegen.
6. **„100+ Markenprojekte seit 2009" vs. „40+ Premium-Projekte für Makler seit
   2017"**: zwei unterschiedliche Zahlen/Jahre für offenbar denselben Track-Record
   — bitte klären, welche im Film verwendet werden darf und für welche Zielgruppe.
7. **Preis im Film zeigen** (27.900 €) oder nicht — laut VSL-EXPLAINER-v2 §7 noch
   offene Entscheidung Alex'.
8. **5–40 Mehrmandate pro Quartal**: keine Quelle im Repo gefunden — bitte Herkunft/
   Freigabe klären, falls diese Zahl im Film verwendet werden soll.
9. **Risiko-Umkehr/Garantie**: laut VSL-EXPLAINER-v2 §7 als größter fehlender
   No-Brainer-Hebel notiert, keine Entscheidung dokumentiert — für den Film relevant,
   falls „emotional aufladen ohne Risiko" gewünscht ist.

---

**Nicht verwendbar ohne Weiteres/zurückweisen, falls im User-Wunsch implizit
enthalten:** Wettbewerber-Logos zeigen (E&V, Von Poll, McMakler etc.) — Rechtsrisiko,
nur mit expliziter Freigabe Alex' und nur als Wordmark-Typo, nicht als Bilddatei.
