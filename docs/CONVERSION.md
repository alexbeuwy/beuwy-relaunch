# Conversion-Architektur beuwy.com

Stand: 23.07.2026 · Brief: Alex (Conversion-Architekt-Prompt) · Umsetzung: live,
alle Texte via /studio editierbar (CMS). Offene Fakten: siehe §7 — mit
haltbaren Defaults belegt, KEINE erfundenen Zahlen auf der Seite.

---

## 1. Offer-Design (vor jeder Copy-Zeile)

Value Equation je Paket: Traumergebnis × Erfolgswahrscheinlichkeit ÷ (Zeit ×
Aufwand). Der Hebel liegt bei uns in **Erfolgswahrscheinlichkeit** (klickbare
Live-Referenzen) und **Zeit/Aufwand** (Speed-Versprechen + "2 Stunden Input").

| | T1 · Das Fundament (Decoy/Einstieg) | T2 · Das Vertriebssystem (Ziel) | T3 · Das Betriebssystem (Anker) |
|---|---|---|---|
| Preis | **7.900 €** Festpreis | **16.900 €** Festpreis | **ab 34.000 €** + Betrieb |
| Traumergebnis | Auftritt, der Vertrauen erzeugt | Portal, das Anfragen erzeugt und ins CRM übergibt | Firma läuft auf eigenem System: CRM, Automatisierungen, KI-Sichtbarkeit |
| Inhalt | Positionierung, Website-System, KI-Lesbarkeit (schema.org, llms.txt), Terminbuchung | alles aus T1 + Rechner/Portal-Werkzeug, CRM-Anbindung (z. B. onOffice), Standort-/Fachseiten, Sichtbarkeits-Layer | alles aus T2 + Custom CRM / Prozess-Automatisierungen mit KI, mehrere Funnels, laufender Ausbau |
| Kundenaufwand | 2 Stunden Input | 2 Stunden Input + 2 Freigaben | Kickoff-Workshop, danach Freigaben |
| Speed | Wochen, nicht Monate *(konkrete Zahl: CMS-Feld, von Alex zu setzen)* | dito | Etappen, erste live wie T2 |
| Risk Reversal | Diagnose-Garantie (s. u.) | Diagnose-Garantie + Festpreis-Garantie | dito |

**Decoy-Logik:** T1 existiert, damit T2 als vernünftiger Mittelweg dasteht
(Kompromiss-Effekt) — und fängt real kleine Fälle. T3 ankert nach oben: Wer
16.900 € neben 34.000 € sieht, verhandelt nicht über 16.900 €. T2 trägt das
Badge "Meistgewählt" (wahr: Riegel- und Saadi-Klasse).

**Risk Reversal (haltbar für einen Solo-Founder, keine Umsatz-Garantien):**
1. **Diagnose-Garantie:** Die bezahlte Diagnose (1.990 €, angerechnet) wird
   erstattet, wenn der Systementwurf nicht überzeugt. Risiko des Kunden vor
   dem Projekt: null.
2. **Festpreis-Garantie:** Festpreis heißt Festpreis. Mehraufwand ist mein
   Risiko, nicht Ihres.
*(Beide zu 100 % haltbar; Liefertermin-Garantie optional nach Alex' Freigabe.)*

## 2. Wireframe (Sektion · Zweck · Psychologie)

| # | Sektion | Zweck | Mechanismus |
|---|---|---|---|
| 1 | **Hero, proof-first** | In 5 s beweisen statt behaupten | Kernsatz + klickbare Live-Referenz-Plate (Riegel) mit Kontextzeile Branche · Timeline · 16.500 € · Status-Gap gezeigt |
| 2 | **Sichtbarkeits-Check** | Sofortiger persönlicher Wert | Commitment-Stufe 1, Reziprozität, Personalisierungs-Beweis |
| 3 | **Status-quo-Kosten** | Nichtstun teuer machen | Loss Aversion konkret: Empfehlungs-Wandel + Agentur-Vergleich (Zeit) |
| 4 | **Referenzen** | Erfolgswahrscheinlichkeit maximieren | 2 klickbare Systeme + Logo-Rail; echte Zahlen mit Quelle |
| 5 | **Leistungspakete** | Kaufentscheidung strukturieren | 3 Tiers, Anker + Decoy, Speed, Garantie, "2 Stunden Input" |
| 6 | **Arbeitsweise** | "funktioniert das?" beantworten | 4-Ebenen-System an realen Mechaniken |
| 7 | **Prozess als Prüfung** | Status-Effekt legitim erzeugen | Qualifizierungs-Frame ("prüfen, ob Ihr Projekt passt") + echte Kapazität |
| 8 | **Founder** | Solo-Einwand → Feature | Portrait, "eine Ansprechperson, keine Junior-Weitergabe" |
| 9 | **FAQ** | Einwände vorwegnehmen | Preis, Pitch, Solo, Zeitaufwand |
| 10 | **CTA (gelb)** | Commitment-Treppe abschließen | Primär: Projekt anfragen (Prüfung) · Sekundär: Video-Analyse anfordern |

Commitment-Treppe über die Seite: Demo klicken (§1) → Check laufen lassen (§2)
→ Video-Analyse anfordern (§10 sekundär, matcht das Loom-Playbook) →
Erstgespräch/Anfrage (§10 primär, /termin).

## 3. Kern-Copy (Auszug — vollständig in src/lib/content.ts, editierbar in /studio)

**Hero (Direct/Organic):**
> *Eyebrow:* Portale · CRMs · KI-Automatisierung — Finance, Real Estate, Medizin
> *H1:* Während Agenturen pitchen, ist Ihr **Portal** live.
> *Sub:* beuwy liefert verkaufsfertige Systeme zum Festpreis. Sie geben zwei
> Stunden Input. Den Rest liefern wir.
> *Plate-Kontext:* Immobilienmakler · Rhein-Neckar · 16.500 € · live — klicken Sie rein.

**Hero-Variante Paid (Static Ads, ?via=ad):**
> *H1:* Portal, CRM, KI — zum Festpreis. Live, nicht als Konzept.
> *Sub:* Keine Agentur-Monate. Ein Referenzprojekt sehen Sie unten — es ist echt.

**Hero-Variante Cold-Outreach (?via=video):**
> *H1:* Sie kommen aus meinem Video. Hier ist der Rest.
> *Sub:* Unten das System, das Sie gesehen haben — live. Daneben: was so etwas
> kostet und wie schnell es geht.

**Qualifizierungs-Frame (§7):**
> Ich nehme nicht jedes Projekt. Nicht als Verkaufstrick — jedes System wird
> von einer Person gebaut, und die baut gerade auch andere. Schicken Sie Ihre
> Anfrage; Sie bekommen binnen 24 Stunden eine ehrliche Antwort, ob und wann
> Ihr Projekt passt.

**Status-Gap (§3, Loss Aversion konkret):**
> Eine Agentur braucht für ein Projekt dieser Klasse üblicherweise drei bis
> sechs Monate — Pitch, Workshops, Abstimmungsschleifen. Jeder dieser Monate
> ist ein Monat, in dem Ihr Rechner keine Anfragen einsammelt und ChatGPT
> Ihren Wettbewerber empfiehlt.

## 4. Pricing-Sektion (Begründung)

- Reihenfolge T1→T2→T3, T2 visuell erhöht (Panel heller, Badge "Meistgewählt").
- Jede Karte: Name, Ein-Satz-Ergebnis, Preis, 4-5 Merkmale, Speed-Zeile,
  Garantie-Zeile. Ein CTA pro Karte: "Projekt anfragen" (alle in dieselbe
  Prüfung — kein Warenkorb-Gefühl).
- Unter den Karten: Vergleichszeile "Agentur-Standard: 3-6 Monate, fünfstellig
  bis sechsstellig, Junior macht die Arbeit" + Festpreis-/Diagnose-Garantie.
- Preise sind CMS-Felder — Alex justiert ohne Deploy.

## 5. FAQ als Einwandbehandlung (vollständig in content.ts)

1. Preis ("Warum kein 3.000-€-Baukasten?") → System vs. Seite + Agentur-Anker.
2. "Warum gibt es keinen Pitch?" → Referenzen sind live klickbar; die bezahlte
   Diagnose ersetzt den Pitch und gehört dem Kunden.
3. Solo-Einwand → Feature: eine Ansprechperson, keine Junior-Weitergabe, Code
   und Zugänge gehören dem Kunden, dokumentierte Übergabe.
4. "Wie viel Zeit kostet mich das?" → 2 Stunden Input, 2 Freigaben.
5. "Was, wenn mir der Entwurf nicht gefällt?" → Diagnose-Garantie.
6. "Was heißt KI konkret?" (bestehend, geschärft auf Automatisierung).

## 6. Nicht verhandelbar (harte Regeln, umgesetzt)

- Keine Fake-Slots, keine Countdowns, keine erfundenen Testimonials/Metriken.
- Jede Zahl auf der Seite ist belegt (Preis Riegel: von Alex; Partner-Zahlen:
  cash-online; Zero-Click: SparkToro/Datos) oder als Rechenlogik formuliert.
- Kapazität wird erst mit konkreter Zahl versehen, wenn Alex sie nennt (§7).

## 7. Offene Fakten (von Alex zu setzen — alle als CMS-Felder angelegt)

| Feld | Frage an Alex | Default bis dahin (haltbar) |
|---|---|---|
| `pricing.speed` | Riegel-Timeline: wie viele Tage/Wochen real? ("live in X Tagen") | "in Wochen statt Monaten" |
| `process.capacity` | Welche Kapazität öffentlich? ("Ich nehme N Projekte pro Quartal") | Formulierung ohne Zahl (s. §3-Frame) |
| `hero.plate_context` | Riegel-Timeline für die Kontextzeile | "Immobilienmakler · Rhein-Neckar · 16.500 € Festpreis" (ohne Timeline) |
| `pricing.tier1_price` etc. | 7.900 / 16.900 / ab 34.000 ok? | wie vorgeschlagen |
| Garantie | Liefertermin-Garantie zusätzlich? (z. B. 10 % Rabatt je Verzugswoche) | nur Diagnose- + Festpreis-Garantie |
