# Recherche: CRO-Mechanismen für /system (VSL-Seite, ein CTA)

Stand: 23.09.2026. Alle Angaben stammen aus WebSearch/WebFetch-Ergebnissen der Session (keine Erinnerung). Unsichere/nicht direkt verifizierte Angaben sind als **„keine Zahl gefunden"** bzw. **UNVERIFIED** markiert.

WICHTIGER BEFUND VORWEG: Die vom Auftraggeber genannte Domain **drip-agency.com / drip.agency ist NICHT die echte Agentur** — `drip.agency` ist bei GoDaddy zum Verkauf geparkt (307-Redirect auf `forsale.godaddy.com`). Die tatsächlich aktive, deutsche CRO-Agentur mit diesem Namen läuft unter **`dripagency.de`** (Blog, Case-Study-Bibliothek, eigene A/B-Test-Statistik-Auswertung). Alle „Drip Agency"-Funde unten beziehen sich auf `dripagency.de`. Falls der Auftraggeber eine andere/englische Drip Agency meinte, wurde diese nicht gefunden.

---

## 1) Mechanismen im Detail

### 1. Sticky CTA / Sticky Add-to-Cart-Bar (mobil)
- Was: Fixierte Leiste am unteren Bildschirmrand mit dem einen CTA, bleibt beim Scrollen sichtbar.
- Beispiel: GoodUI Pattern #41 „Sticky Call To Action" — https://goodui.org/patterns/41/ (29 A/B-Tests, ~148,8 Mio. Besucher, Einzelresultate hinter Paywall).
- Gemessener Effekt: Spannweite in Branchenquellen 5–15 %, teils bis 20 % Conversion-Uplift auf Mobile-PDPs — Quellen: https://growthrock.co/sticky-add-to-cart-button-example/ , https://convertibles.dev/blogs/case-studies/homepage-sticky-cta-case-study (+20,4 % CR, 95,1 % Sieg-Wahrscheinlichkeit, Whisky-Abo-Marke), https://www.designernews.co/stories/100603-we-ab-tested-having-a-sticky-add-to-cart-button-sticky-won . Baymard-referenzierte Sekundärquellen nennen 5–12 % (konnte Baymard-Originalstudie nicht direkt öffnen, nur Sekundärzitate — als **teilweise unverifiziert** markiert).
- Psychologie: ständige Erreichbarkeit senkt Friktion (Fogg Behavior Model: „Ability"/Trigger-Nähe — B.J. Fogg, „A Behavior Model for Persuasive Design", 2009).
- Risiko: bei kurzen Seiten wirkungslos bis negativ (GoodUI selbst: „sticky ist kein Selbstläufer", nicht jeder Test gewinnt); Online Dialogue warnt explizit: https://www.onlinedialogue.nl/en/blogs/sticky-cta-guaranteed-conversion-uplift/

### 2. Exit-Intent (mobil: Zurück-Geste, Scroll-Velocity, Inaktivität)
- Was: Popup/Layer bei Abbruchsignal. Mobile-Trigger: Zurück-Button, schnelles Hoch-Scrollen (>200 px/s), Inaktivität 20–30 s, Tab-Wechsel.
- Quelle: https://www.pushowl.com/blog/mobile-exit-intent-popups , https://claspo.io/blog/exit-intent-popups-on-mobile/
- Gemessener Effekt: durchschnittlich 2,81 % Conversion aller Exit-Popups, Top-10 % bis 19,63 %; E-Mail-Capture-Exit-Popups ~1,8 %, Warenkorb-Exit-Popups bis 17,12 % — Quelle: https://popupsmart.com/blog/do-exit-intent-popups-work (Basis: 500 Kampagnen, laut Artikel).
- Psychologie: Verlustaversion / letzte-Chance-Framing (Kahneman/Tversky, Prospect Theory 1979 — nicht direkt in dieser Recherche neu belegt, Standardzuschreibung).
- Risiko rechtlich: siehe Abschnitt 3 — Exit-Intent-Skripte, die Mausbewegung/Scrollverhalten tracken und darauf ein Popup mit Marketing-Zweck auslösen, sind in Deutschland **einwilligungspflichtig nach § 25 TDDDG**, wenn dafür Endgeräte-Informationen (Cookies/Storage) genutzt werden.

### 3. Multi-Step-Formular / Foot-in-the-Door statt Ein-Klick-Button
- Was: Erste triviale Frage (z. B. „Wie viele Objekte verkaufen Sie im Jahr?") statt direktem Formular — psychologischer Fuß-in-der-Tür-Effekt.
- Quelle CXL: https://cxl.com/blog/foot-in-the-door-technique/ ; Formstack-Zahl (Sekundärzitat): Multi-Page 13,9 % vs. Single-Page 4,5 % Conversion — Quelle: https://www.leadgen-economy.com/blog/multi-step-forms-conversion-optimization/ (Formstack-Originalstudie nicht direkt gefetcht, daher **Sekundärquelle, nicht Primärquelle**).
- Gegenbeleg (wichtig!): https://www.zuko.io/blog/single-page-or-multi-step-form — bei kurzen Formularen (3–5 Felder) gewinnt oft Single-Page; Multi-Step gewinnt erst ab ~8 Fragen oder bei Qualifizierungsbedarf. Ein Fallbeispiel „MiroMind" zitiert sogar 80–180 % mehr Leads mit Single-Page, weil 70 % beim Öffnen des Multi-Step-Formulars absprangen (Quelle im selben Suchergebnis, **nicht separat verifiziert**).
- Psychologie: Foot-in-the-door (Freedman & Fraser 1966, Original-Studie „Compliance without pressure"); Zeigarnik-Effekt (unvollendete Aufgaben bleiben im Kopf, Zeigarnik 1927) bei Fortschrittsanzeige.
- Fazit für beuwy: 4-Fragen-Funnel ist im „ab 8 Fragen"-Bereich eher grenzwertig — es sind nur 4, daher könnte laut Zuko-Logik auch ein kompakteres Formular konkurrenzfähig sein. Empfehlung: gegeneinander testen, nicht blind übernehmen.

### 4. Erste-Person-CTA-Copy ("Ja, ich will" / "Start my")
- Was: Button-Text aus Sicht des Nutzers statt Befehlsform.
- Quelle/Ursprung: Michael Aagaard (ContentVerve, später Unbounce) — Split-Test „Start your free 30-day trial" vs. „Start my free 30-day trial": **+90 % Klicks** für „my". Zweiter Test „Create account" vs. „Create your account": „your"-Version erzielte 24,91 % **weniger** Klicks als „my"-Version. — Quellen: https://www.practicalecommerce.com/Drive-Ecommerce-Conversions-with-First-person-Statements , https://clickz.com/me-vs-you-how-pronouns-affect-click-conversion-rates/32596/ , Aagaard-Talk-PDF https://unbounce.com/cta-conf/Michael_Aagaard_CTAConf2015.pdf
- Wichtig — Gegensignal in den Suchergebnissen: eine andere Quelle behauptete, in späteren Aagaard-Tests habe „Your" konsistent gewonnen und „My" verwirre, weil der Rest der Seite in Du/Sie-Form spricht. Das konnte ich nicht auf eine Primärquelle zurückführen — **Widerspruch ungeklärt, als offene Frage markiert.** Für beuwy (Sie-Form, B2B, hoher Preis) ist der Konsistenz-Einwand plausibel: Erste-Person-CTA nur testen, wenn der ganze Funnel konsequent in Ich-Form umgestellt wird, sonst Bruch mit der Sie-Form-Vorgabe aus CLAUDE.md.
- Psychologie: Selbstbezug/Ownership-Sprache erhöht wahrgenommene Verbindlichkeit der eigenen Entscheidung.

### 5. VSL: verzögerte CTA-Einblendung vs. von Anfang an sichtbar
- Was: Button erscheint erst nach X Minuten Video (z. B. Minute 7) statt durchgehend sichtbar.
- Quelle (Praxis, kein kontrollierter Test gefunden): https://community.funnelish.com/t/cta-button-delay-how-can-i-delay-the-cta-button-of-my-vsl-with-funnelish/4670 , https://www.pandavideo.com/blog/sales-pages-with-time-delay
- Gemessener Effekt: **keine Zahl gefunden.** Alle Quellen beschreiben nur die technische Umsetzung/Praxis in Funnel-Software (ClickFunnels/Funnelish-Ökosystem), keine A/B-Testdaten. Das ist Branchenpraxis/Behauptung, kein Beleg.
- Psychologie: Commitment-Aufbau vor der Handlungsaufforderung (Cialdini, „Influence", 1984 — Prinzip Commitment & Consistency); auch Zeigarnik (Video als offene Schleife).
- Risiko: hoher Fokus-per-Viewport-Stil laut CLAUDE.md spricht eher für einen durchgehend sichtbaren, aber unaufdringlichen CTA statt künstlicher Verzögerung — Verzögerung passt schlecht zu „ein Fokus-Element pro Viewport" und riskiert Frust bei ungeduldigen High-Ticket-B2B-Besuchern, die gezielt kommen.

### 6. Territory-/Exklusivitäts-Checker ("Prüfen Sie, ob Ihre Stadt verfügbar ist")
- Was: Eingabefeld/Formular, das Verfügbarkeit einer Region/Stadt für Exklusivpartnerschaft prüft.
- Beispiele: https://myterritorycheck.com/ (Franchise-Territoriumsprüfung), https://reachthelocals.com/local-map-seo/ (ein Anbieter pro Nachbarschaft, Konkurrenz wird abgelehnt), https://seoforhomeservice.com/zip-code-exclusivity-promise/ (ZIP-Code-Exklusivität für Handwerksbetriebe), eXp Realty Solutions: https://solutions.exprealty.com/market-exclusivity-real-estate/
- Gemessener Effekt: **keine Zahl gefunden** — alle Quellen sind Verkaufsseiten der Anbieter selbst, keine unabhängigen A/B-Testresultate.
- Psychologie: Scarcity/Exklusivität (Cialdini, Influence, Prinzip Scarcity) + Territorial-Framing passt sehr gut zu „nur ein Makler pro Stadt" als Differenzierung.
- Für beuwy hoch relevant: passt exakt zum Geschäftsmodell (Premium-Boutique, begrenzte Kundenzahl) und liefert eine harte Qualifizierungs-Vorfrage im Funnel.

### 7. Returning-Visitor-Personalisierung
- Was: Wiedererkennung per Cookie/LocalStorage, z. B. Intro überspringen, „Willkommen zurück".
- Quelle: https://abmatic.ai/blog/personalizing-website-for-returning-visitors , https://www.if-so.com/personalized-landing-pages-10-real-life-examples/
- Gemessener Effekt: „+13 % Conversion auf SaaS-Free-Trial-Seiten beim Überspringen der Intro für wiederkehrende Nutzer" — Quelle nur als Fließtext-Behauptung in einem Aggregator-Artikel gefunden, **keine Primärstudie identifiziert, als unverifiziert markieren.**
- Psychologie: kognitive Entlastung / weniger Redundanz (Hick's Law-adjazent).
- Risiko DSGVO: Wiedererkennung per Cookie ist unter TDDDG grundsätzlich einwilligungspflichtig, außer technisch unbedingt erforderlich (was reine Personalisierung i. d. R. nicht ist).

### 8. Server-seitiges A/B-Testing ohne Flicker (Next.js 15 / Vercel)
- Empfohlener Weg 2025/2026: **Vercel Flags SDK** (flags-sdk.dev) + **Edge Middleware**: Cookie liest/setzt den Bucket, Middleware rewritet die Anfrage serverseitig auf die Variante, bevor gerendert wird → kein Client-Flackern, kein Layout-Shift, kein Drittanbieter-Skript. Quellen: https://vercel.com/docs/flags , https://vercel.com/docs/flags/flags-sdk-reference , https://flags-sdk.dev/
- Alternative/kombinierbar: Statisches Precompute-Pattern der Flags SDK für ISR/SSG-Seiten.
- Für Auswertung: GrowthBook oder PostHog als Experiment-Analyse-Layer (Bucket-Zuweisung serverseitig, Reporting im jeweiligen Tool) — in den Suchergebnissen nur als Nennung, **nicht im Detail verifiziert.**

### 9. Sozialer Beweis / Scarcity-Framing (aus DRIP-Agency-Statistik)
- Quelle: https://dripagency.de/blog/ab-testing-statistics
- Konkrete Zahlen (eigene aggregierte Testdatenbank der Agentur, n variiert je Kategorie):
  - Popups: 72,0 % Gewinnrate, 8,0 % Verlustrate, 90,0 % „decisive win rate" (n=25)
  - Scarcity/FOMO: 47,8 % Gewinnrate, aber **84,2 % decisive win rate** bei Verlust vs. Sieg (n=67) — d. h. wenn Scarcity-Tests einen klaren Sieger haben, gewinnt fast immer die Scarcity-Variante
  - CTA-Wording: 46,5 % Gewinnrate, 20,9 % Verlust, 69,0 % decisive win rate (n=43)
  - Insgesamt über alle Tests: 36,3 % signifikante Sieger, Median-CR-Uplift +1,88 %, Median-RPV-Uplift +2,77 % (Top-Quartil +5,21 % oder mehr)
- Das ist die konkreteste, breit abgesicherte Datenquelle in dieser Recherche (eigene Agenturstatistik, nicht unabhängig geprüft, aber mit Stichprobengrößen ausgewiesen).

### 10. Hick's Law — ein CTA statt mehrerer
- Quelle Ursprung: Hick, W. E. & Hyman, R. (1952), Reaktionszeit-Gesetz RT = a + b·log₂(N+1).
- Angewandte Zahl: Unbounce-Auswertung über 41.000+ Landingpages — Seiten mit mehreren Angeboten/CTAs konvertieren **266 % niedriger** als Ein-CTA-Seiten. Quelle (Sekundärzitat, Original-Unbounce-Report nicht direkt gefetcht): https://uxscan.ai/learn/hicks-law
- Direkt relevant für /system: bestätigt die bestehende Ein-CTA-Architektur der Seite.

### 11. Von-Restorff-Effekt (Isolationseffekt) für CTA-Kontrast
- Ursprung: Hedwig von Restorff, 1933, „Über die Wirkung von Bereichsbildungen im Spurenfeld" (Gedächtnispsychologie-Originalstudie).
- Anwendung: kontrastierender, isolierter, größerer Button sticht heraus und wird eher erinnert/geklickt. Quelle: https://tactics.convertize.com/tactic/choose-a-contrasting-button-colour-and-size-for-your-call-to-action
- Gemessener Effekt: **keine belastbare Einzelzahl gefunden**, nur allgemeine Empfehlung.
- Für beuwy: Pastellgelb als einziger Akzent auf Weiß erfüllt dieses Prinzip strukturell bereits.

### 12. Zeigarnik-Effekt / Endowed-Progress-Effekt für Fortschrittsbalken im Funnel
- Ursprung Endowed Progress: Nunes, J. C. & Drèze, X. (2006), Journal of Consumer Research, Autowaschanlagen-Feldexperiment: Karte mit 10 Feldern (2 vorgestempelt, gleicher Aufwand) → 34 % Abschlussquote vs. Karte mit 8 leeren Feldern → 19 % Abschlussquote (n=300, 9 Monate Laufzeit). Quelle: https://siliconcanals.com/t-car-wash-loyalty-cards-endowed-progress/ (zitiert die Originalstudie korrekt und mit Zahlen).
- Anwendung im 4-Fragen-Funnel: Fortschrittsbalken, der bei Frage 1 schon leicht gefüllt startet (z. B. „Schritt 1 von 4" mit optischem Kopfstart durch vorausgefüllte Kontext-Info wie IP-basierte Stadt), erhöht Abschlussquote laut Prinzip — **keine direkte Zahl für Lead-Funnels gefunden, Übertragung aus Loyalty-Programm-Kontext ist Analogieschluss, nicht direkt belegt.**
- Zeigarnik (1927): unvollendete Aufgaben werden besser erinnert/erzeugen Handlungsdruck — Standardbegründung für Fortschrittsanzeigen, in dieser Recherche nicht mit neuer Primärquelle belegt (Allgemeinwissen der Skill-Domäne).

### 13. Booking.com / Massenexperimentierkultur (als Kontext, nicht direkt übertragbar)
- Quelle: https://irrationallabs.com/blog/4-product-testing-results-booking-experimentation/ , https://siliconcanals.com/sc-n-booking-com-runs-well-over-a-thousand-simultaneous-a-b-tests-at-any-moment-from-its-amsterdam-headquarters-on-an-experimentation-platform-engineers-built-in-the-mid-2000s-and-have-patched-contin/
- Kennzahl: >1.000 parallele Tests, ~25.000 Tests/Jahr; Kultur „nichts geht live ohne Test".
- Relevanz für beuwy: **kaum übertragbar** — Booking.com hat Millionen Sessions/Tag, beuwy hat B2B-High-Ticket-Traffic in deutlich kleinerer Größenordnung. Wird nur als Kontrastfolie im Report erwähnt, nicht als Blaupause.

### 14. Multi-Step-Form-Qualifizierung als Segmentierung (DRIP-Agency: „Contact info layout" 63,2 % Gewinnrate, n=19) und „Product reservation"/Verknappung (62,5 %, n=24)
- Quelle: https://dripagency.de/blog/ab-testing-statistics — bestätigt, dass Formular-Layout und Reservierungs-/Verknappungsmechaniken zu den zuverlässigsten Testkategorien gehören (hohe Gewinnrate bei vergleichsweise wenig Verlustrate).

### 15. GoodUI-Gesamtarchiv als Meta-Evidenzquelle
- Quelle: https://goodui.org/ , https://goodui.org/tests/ — Grundprinzip: jedes Pattern ist mit Testanzahl (z. B. Pattern 41 = 29 Tests) hinterlegt, keine Einzelfallanekdote. Empfehlung: kostenpflichtigen GoodUI-Zugang für Einzelergebnisse in Betracht ziehen, bevor Prioritäten endgültig festgelegt werden — hier nur Metaebene ausgewertet.

---

## 2) Ranking: Top 10 Mechanismen für die beuwy /system-VSL-Seite (1 CTA, High-Ticket B2B, 27.900 €)

1. **Territory-/Exklusivitäts-Checker** ("Ist Ihre Stadt noch frei?") — passt 1:1 zum Boutique-Modell, dient zugleich als Qualifizierung vor der eigentlichen Buchung. Keine Zahl, aber strategisch am stärksten passend (Scarcity + Cialdini).
2. **Sticky CTA-Leiste mobil** — solide belegt (GoodUI 29 Tests, mehrere unabhängige 5–20 %-Uplift-Berichte), technisch trivial, geringes Risiko.
3. **Ein-CTA-Architektur beibehalten/verstärken (Hick's Law)** — bereits Kern der Seite, durch 266 %-Unbounce-Zahl stark gestützt; keine neue Funktion nötig, aber jede weitere Ablenkung (Menüpunkte, Sekundärlinks) im Funnel konsequent entfernen.
4. **Progress-Indicator mit Kopfstart im 4-Fragen-Funnel (Endowed-Progress-Prinzip)** — starke Primärstudie (Nunes & Drèze, konkrete Zahlen), Umsetzung günstig, Risiko gering.
5. **Server-seitiges A/B-Testing über Vercel Flags SDK + Edge Middleware** — technische Voraussetzung, um alle anderen Punkte überhaupt sauber (ohne Flicker) zu testen; 2025/2026 der empfohlene Next.js/Vercel-Weg.
6. **Scarcity/FOMO-Elemente dosiert einsetzen** — DRIP-Agency-Zahl zeigt: wenn ein Sieger feststeht, ist es meist die Scarcity-Variante (84,2 % decisive win rate) — aber nur wahrheitsgemäße Verknappung (z. B. „nur X Neukunden pro Quartal"), sonst UWG-Risiko (siehe unten).
7. **Exit-Intent nur als Rückgewinnungs-Layer mit echtem Mehrwert** (z. B. Kurzvideo/Case-Study statt Rabatt), mobil über Scroll-Velocity/Inaktivität ausgelöst — mittlere Evidenz, hohe DSGVO-Auflage, daher mit Bedacht.
8. **Von-Restorff-Kontrast des CTA-Buttons** — bereits im Designsystem angelegt (Pastellgelb/Weiß), nur konsequent auf allen Funnel-Screens durchziehen.
9. **Multi-Step-Formular-Reihenfolge testen (leichte Frage zuerst)** — Evidenz gemischt (Formstack pro, Zuko/MiroMind contra), daher als A/B-Test und nicht als Annahme einführen.
10. **Returning-Visitor-Personalisierung ("Sie waren schon hier, hier ist Ihr Stand")** — schwächste Evidenzlage (keine Primärquelle gefunden) und höchster DSGVO-Aufwand (Cookie-Consent nötig) im Verhältnis zum Nutzen — niedrigste Priorität.

Bewusst NICHT empfohlen: Erste-Person-CTA-Copy ("Ich will") — Evidenzlage widersprüchlich und würde brechen mit der verbindlichen Sie-Form aus CLAUDE.md; verzögerte CTA-Einblendung im VSL — keine Testzahl gefunden, nur Funnel-Software-Marketing, widerspricht dem „ein Fokus-Element pro Viewport"-Prinzip.

---

## 3) Rechtliches in Deutschland — klar markiert

**DSGVO / TDDDG (früher TTDSG), § 25 TDDDG:**
- Jedes Skript, das Geräteinformationen speichert oder ausliest, um daraus ein Marketing-Signal abzuleiten (Exit-Intent per Mausbewegungs-/Scroll-Tracking, Returning-Visitor-Cookies, Personalisierungs-Cookies), **braucht eine aktive Einwilligung nach § 25 TDDDG**, sofern nicht technisch zwingend erforderlich. Reine Session-Erkennung für A/B-Test-Bucketing kann ggf. als funktional notwendig gelten (Rechtsberatung einholen), Personalisierung/Retargeting-Cookies i. d. R. nicht.
- Quelle: https://www.ihk.de/koeln/hauptnavigation/recht-steuern/regeln-fuer-cookies-ttdsg-5259484 , https://cortina-consult.com/web-compliance/wissen/tdddg/

**UWG (Gesetz gegen den unlauteren Wettbewerb):**
- Dark Patterns (z. B. optisch bevorzugter "Akzeptieren"-Button gegenüber grauem "Ablehnen") können als unlautere geschäftliche Handlung eingestuft werden. Quelle-Kontext: https://frame-for-business.de/blog/cookie-consent-banner-rechtssicher/
- **Erfundene/nicht belegbare Dringlichkeit** (Fake-Countdown, der bei Reload neu startet; „nur noch 2 Plätze", die nicht real begrenzt sind) ist eine klassische UWG-relevante Irreführung (§ 5 UWG, Irreführende geschäftliche Handlungen) — in den Suchergebnissen nicht mit einem konkreten Gerichtsurteil belegt, aber Grundprinzip ist unstrittig in der Fachliteratur zu Dark Patterns. **Empfehlung: jede Scarcity-/Urgency-Behauptung muss real und nachprüfbar sein** (z. B. echte Kapazitätsgrenze der Boutique-Agentur — passt ohnehin zum "wenige Kunden gleichzeitig"-Geschäftsmodell).

**Territory-Checker:** rechtlich unproblematisch, solange die Verfügbarkeitsaussage der Realität entspricht (sonst wieder § 5 UWG).

---

## 4) Konkrete Empfehlung: A/B-Testing in Next.js 15 auf Vercel

1. **Vercel Flags SDK** (flags-sdk.dev, offizielles Vercel-Docs unter https://vercel.com/docs/flags) als Basis — Next.js- und SvelteKit-nativ, App Router-kompatibel.
2. **Edge Middleware** übernimmt Bucket-Zuweisung: Cookie lesen, falls nicht vorhanden neu setzen (z. B. `beuwy-variant=A|B`, Session/langlebig je nach Testdauer), dann serverseitiges Rewrite auf die jeweilige Route/Variante — kein Client-Flicker, kein CLS.
3. Für ISR/SSG-Seiten: das **Precompute-Pattern** der Flags SDK nutzen, damit Varianten weiterhin statisch ausgeliefert werden können.
4. Für Auswertung/Reporting: GrowthBook oder PostHog als Experiment-Layer andocken (in dieser Recherche nur benannt, nicht im Detail geprüft — vor Einsatz eigene Kurzrecherche zu Preismodell/DSGVO-Konformität für die konkrete Instanz empfehlenswert).
5. Testlaufzeit-Richtwert aus DRIP-Agency-Daten: Median 42 Tage, mindestens 28 Tage (P25), ab 51 Tagen (P75) sinkt der Grenznutzen weiterer Laufzeit deutlich — als Orientierung für Testplanung bei /system nutzbar, auch wenn beuwys Traffic-Volumen niedriger ist als bei den E-Commerce-Marken in der DRIP-Statistik (Signifikanz wird entsprechend länger dauern).

---

## Offene Fragen / nicht abschließend verifiziert
- Aagaard "my vs. your"-Widerspruch (Punkt 4) nicht auf Primärquelle zurückführbar.
- Baymard-Originalzahlen zu Sticky-ATC nur über Sekundärzitate erreichbar, Baymard-Volltext selbst nicht gefetcht.
- Returning-Visitor-13%-Zahl ohne Primärstudie.
- Formstack-Multi-Step-Zahl (13,9 % vs. 4,5 %) nur als Sekundärzitat, Formstack-Original nicht gefetcht.
- VSL-Delayed-CTA: keine A/B-Testzahl gefunden, nur Software-Marketing-Behauptungen.
