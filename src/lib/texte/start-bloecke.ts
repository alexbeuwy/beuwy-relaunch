/**
 * Studio-Texte: Startseite · Blöcke aus StartOben/StartUnten und deren
 * Bausteinen (Säulen, Prozess, FAQ, Abgrenzung, Showreel, Finale …).
 * Präfix mk.<gruppe>. — landet im Studio unter „Startseite".
 * Wird von Agent K (R11) befüllt; content.ts spreadet bereits.
 *
 * Konvention (R11, abweichend vom seiten/<slug>.ts-Schema): Keys heißen
 * mk.<gruppe>.<feld>, Listen sind von Hand nummeriert (mk.faq.1.frage,
 * mk.faq.1.antwort, …) statt über listeRegistrieren — das würde s.-Keys
 * erzeugen. Reihenfolge unten = Lesereihenfolge der Startseite.
 */

export const START_BLOECKE_DEFAULTS: Record<string, string> = {
  /* ── Spiegel (StartOben, Block 2) ──────────────────────────────── */
  "mk.spiegel.eyebrow": "Der Blick von außen",
  "mk.spiegel.titel": "Sie sind unter den Besten. *Sieht* man Ihnen das an?",
  "mk.spiegel.badge": "Erster Eindruck · Entscheidet",
  "mk.spiegel.p1":
    "Sie kennen das: Das Gespräch lief gut, der Eigentümer war überzeugt — und den Auftrag bekam ein anderer.",
  "mk.spiegel.p2":
    "Nicht, weil der besser verkauft. Abends am Handy hat er nur teurer ausgesehen: Website, Exposé, Bewertungen — in dieser Reihenfolge.",
  "mk.spiegel.p3_vor":
    "Eigentlich ist es nur dieser eine Grund. Und er ist in sechs Wochen",
  "mk.spiegel.p3_stark": "erledigt",

  /* ── Abgrenzung Baukasten (StartOben, Block 3) ─────────────────── */
  "mk.abgrenzung.baukasten_label": "Baukasten",
  "mk.abgrenzung.baukasten.1.text": "Schicke Visitenkarte, aber kein Motor dahinter.",
  "mk.abgrenzung.baukasten.2.text": "Exposés sehen bei jedem Makler gleich aus.",
  "mk.abgrenzung.baukasten.3.text": "Jede Änderung landet in der Warteschlange.",
  "mk.abgrenzung.baukasten.4.text": "Niemand zeigt Ihnen, wie viele Mandate dabei herauskommen.",
  "mk.abgrenzung.beuwy.1.text": "Ein System für Ihre Marke, kein Template von der Stange.",
  "mk.abgrenzung.beuwy.2.text": "Exposés tragen Ihren Namen, nicht den des Baukastens.",
  "mk.abgrenzung.beuwy.3.text":
    "Änderungen erledigt Ihr direkter Ansprechpartner — ohne Warteschlange.",
  "mk.abgrenzung.beuwy.4.text": "Mandate und Deals sind messbar. Jede Zahl steht in Ihrem CRM.",

  /* ── VSL-Slot + Kernversprechen (StartOben, Block 4) ───────────── */
  "mk.vsl.karte_label": "In 90 Sekunden",
  "mk.vsl.karte_titel": "Kein Pitch. Ein echtes Projekt.",
  "mk.vsl.karte_text":
    "Unsere Websites sehen aus wie Sie: Ihre Fotos, Ihr Ton, Ihre Zahlen. Und dahinter ein Funnel, der nur durchstellt, was ein Gespräch wert ist.",
  "mk.vsl.link_text": "Video ansehen",
  "mk.vsl.byline_name": "Alexander Pütter",
  "mk.vsl.byline_rolle": "— Gründer beuwy, Ihr direkter Ansprechpartner im Projekt.",
  "mk.vsl.avatar_text": "Führende Makler im DACH-Raum vertrauen beuwy",

  /* ── Säulen (StartOben, Block 5) ────────────────────────────────── */
  "mk.saeulen.eyebrow": "Der Mechanismus",
  "mk.saeulen.titel": "Vier Säulen tragen Ihren *Vorsprung*.",
  "mk.saeulen.sub":
    "Marke, Website, E-Mail und Automatisierung — als ein System gebaut, nicht als vier separate Rechnungen.",
  "mk.saeulen.1.nr": "01",
  "mk.saeulen.1.titel": "Marke & Design",
  "mk.saeulen.1.satz": "Der Auftritt, der in drei Sekunden zeigt, in welcher Liga Sie spielen.",
  "mk.saeulen.1.hebel1":
    "Bildsprache und Typografie folgen einem Styleguide — jedes Exposé wirkt, als käme es von einer Marke, nicht von drei Praktikanten.",
  "mk.saeulen.1.hebel2": "Farbwelt und Ton sind auf Ihre Preisklasse kalibriert.",
  "mk.saeulen.1.hebel3":
    "Ein Markensystem statt Einzelaufträge: Logo, Visitenkarte, Exposé-Vorlage und Signatur sprechen eine Sprache.",
  "mk.saeulen.2.nr": "02",
  "mk.saeulen.2.titel": "Website & Experience",
  "mk.saeulen.2.satz": "Die Seite, die lädt, bevor der Eigentümer zum nächsten Makler wechselt.",
  "mk.saeulen.2.hebel1":
    "Ladezeit unter einer Sekunde — wer zuerst da ist, wirkt wie das Büro, das sofort zurückruft.",
  "mk.saeulen.2.hebel2":
    "Exposés, die aussehen, wie das Objekt es verdient — und einen Alleinauftrag rechtfertigen, bevor Sie im Wohnzimmer sitzen.",
  "mk.saeulen.2.hebel3":
    "Immobilienbewertungs-Rechner qualifiziert Eigentümer nebenbei: Adresse rein, Ersteinschätzung raus, Lead mit Score im CRM.",
  "mk.saeulen.3.nr": "03",
  "mk.saeulen.3.titel": "E-Mail & Funnel",
  "mk.saeulen.3.satz": "Keine Anfrage verhungert im Postfach, weil niemand zurückgerufen hat.",
  "mk.saeulen.3.hebel1":
    "Jede Anfrage landet mit Quelle und nächstem Schritt direkt in Ihrem CRM — kein Zettel, kein Copy-Paste, kein vergessener Rückruf.",
  "mk.saeulen.3.hebel2":
    "Follow-up-Automation: Wer heute nicht kauft, bekommt in sechs Monaten automatisch die richtige E-Mail.",
  "mk.saeulen.3.hebel3":
    "Personalisierte Datenmails zum konkreten Objekt — der Eigentümer bekommt eine Antwort, keine Massen-Mail.",
  "mk.saeulen.4.nr": "04",
  "mk.saeulen.4.titel": "Automatisierung",
  "mk.saeulen.4.satz": "Modelle wechseln jede Woche, aber was bei Ihnen ankommt, bleibt einfach.",
  "mk.saeulen.4.hebel1":
    "ChatGPT, Claude, Kimi, DeepSeek — ein Prompt liefert bestenfalls einen Text, nie ein System.",
  "mk.saeulen.4.hebel2":
    "Terminanfragen sortieren sich selbst nach Dringlichkeit und Objektwert, bevor sie in Ihrem Kalender landen.",
  "mk.saeulen.4.hebel3":
    "Wöchentlicher Bericht statt Rätselraten: Anfragen, Quelle, Status — automatisch zusammengestellt, jeden Montag im Postfach.",

  /* ── Performance-Marketing (StartOben Block 5b + PerformanceStory
     + MandateLoop) ───────────────────────────────────────────────── */
  "mk.pm.eyebrow": "Performance-Marketing",
  "mk.pm.titel": "So wird aus einer Anzeige ein *Mandat*.",
  "mk.pm.sub": "Fremde sehen Ihre Anzeige. Das System macht daraus einen Termin.",
  "mk.pm.station.1.schritt": "01",
  "mk.pm.station.1.titel": "Gesehen werden",
  "mk.pm.station.1.satz":
    "Anzeigen bringen Ihre Marke vor Eigentümer, die noch niemanden beauftragt haben.",
  "mk.pm.station.2.schritt": "02",
  "mk.pm.station.2.titel": "Hängen bleiben",
  "mk.pm.station.2.satz":
    "Wer klickt, kommt auf einen Auftritt, der das Versprechen der Anzeige einlöst.",
  "mk.pm.station.3.schritt": "03",
  "mk.pm.station.3.titel": "Sich vorstellen",
  "mk.pm.station.3.satz":
    "Interessenten registrieren sich und qualifizieren sich vor, während Sie besichtigen.",
  "mk.pm.ad_label": "Gesponsert · Ihre Marke",
  "mk.pm.funnel_label1": "Bleiben dran",
  "mk.pm.funnel_label2": "Rechner gestartet",
  "mk.pm.funnel_label3": "Registriert & qualifiziert",
  "mk.pm.funnel_caption": "Schematischer Verlauf — Ihre echten Quoten stehen im Wochenbericht.",
  "mk.pm.kontakt_label": "Neue qualifizierte Anfrage",
  "mk.pm.kontakt_titel": "Verkauf · ETW, 92 m²",
  "mk.pm.kontakt_text": "Rückruf gewünscht ab 17 Uhr · Quelle: Rechner",
  "mk.pm.dream_vor": "Rund",
  "mk.pm.dream_nach": "der erreichten Eigentümer registrieren sich. Der Rest ist Mathematik:",
  "mk.pm.dream_label": "Was am Ende zählt",
  "mk.pm.loop_label": "zusätzliche Mandate im Jahr",
  "mk.pm.loop_faktor_vor": "× Ø",
  "mk.pm.loop_faktor_nach": "Maklerprovision",
  "mk.pm.loop_summe_text":
    "zusätzlicher Umsatz — Zahlen aus Ihrem Markt, im Gespräch gerechnet, nicht versprochen.",

  /* ── Anfassen / Selbst testen (StartUnten, Block 5b) ───────────── */
  "mk.anfassen.eyebrow": "Selbst testen",
  "mk.anfassen.titel": "Fassen Sie das System *an*.",
  "mk.anfassen.sub":
    "Drei Rechner, wie wir sie für Ihre Eigentümer bauen. Live, im beuwy-Kleid, ohne Anmeldung.",
  "mk.anfassen.cta_text": "Ausprobieren",
  "mk.anfassen.1.label": "Für Eigentümer",
  "mk.anfassen.1.titel": "Verkaufspreis-Rechner",
  "mk.anfassen.1.text":
    "Zeigt die Wertspanne mit offenem Rechenweg — sofort sichtbar, kein Formular davor.",
  "mk.anfassen.2.label": "Für Vermieter",
  "mk.anfassen.2.titel": "Mietpreis-Rechner",
  "mk.anfassen.2.text":
    "Kaltmiete realistisch einschätzen, mit Vergleichslogik statt Bauchgefühl — inklusive Hinweis zur Mietpreisbremse.",
  "mk.anfassen.3.label": "Für Kapitalanleger",
  "mk.anfassen.3.titel": "AfA- & Restnutzungsdauer-Rechner",
  "mk.anfassen.3.text": "Zeigt in zwei Minuten, was ein Restnutzungsdauer-Gutachten steuerlich bewegt.",

  /* ── Beweis (StartUnten, Block 6) ──────────────────────────────── */
  "mk.beweis.kopf_eyebrow": "Beweis",
  "mk.beweis.kopf_titel": "Sie müssen uns nicht glauben. *Rechnen* Sie nach.",
  "mk.beweis.kopf_sub": "Drei Häuser, drei Größenordnungen. Zum Nachlesen.",
  "mk.beweis.ki_titel": "*17 Jahre* Markenarbeit. Und bei KI vorne dabei.",
  "mk.beweis.ki_text":
    "Was diese Woche an Modellen erscheint, steckt nächste Woche in unseren Abläufen — als Arbeit, die Ihr Team nicht mehr selbst machen muss.",
  "mk.beweis.wirkung_label": "Was danach messbar passiert ist",
  "mk.beweis.case1_text":
    "Bewertungsrechner mit amtlichen Bodenrichtwerten, direkt an das Maklersystem angebunden — jede Anfrage sofort im Ablauf. Ergebnis: neun Abschlüsse, 342.000 € Volumen in sechs Wochen.",
  "mk.beweis.case2_text":
    "Auftritt und Pitch-Unterlagen, die eine Prüfung durch internationale Investoren bestehen. Aus dem Dreierteam wurden rund 70 Mitarbeiter. Die erste gemeinsame Transaktion mit KKR: 163 Wohneinheiten in Dingolfing.",
  "mk.beweis.case_cta": "Fallstudie ansehen",

  /* ── Und danach? (StartUnten, Block 6b) ────────────────────────── */
  "mk.danach.label": "Und danach?",
  "mk.danach.titel": "Dann sieht Ihre Stadt Sie *überall*.",
  "mk.danach.text":
    "Ihre Marke im Postfach, in der Story, auf der Straße und am Spielfeldrand — bis der erste Gedanke bei „Immobilien\" Ihr Name ist.",
  "mk.danach.1.titel": "Auf Ihren Fahrzeugen",
  "mk.danach.2.titel": "Auf der Messe",
  "mk.danach.3.titel": "Im Stadion",
  "mk.danach.4.titel": "In jeder Story",
  "mk.danach.logo_pill": "Ihr Logo",

  /* ── Prozess (StartUnten, Block 7) ─────────────────────────────── */
  "mk.prozess.label": "Vier Schritte, ein Zeitplan",
  "mk.prozess.titel": "In *Wochen* liefern, was andere in Quartalen versprechen.",
  "mk.prozess.1.nr": "W1",
  "mk.prozess.1.titel": "Marke & Konzept",
  "mk.prozess.1.text":
    "In der ersten Woche stehen Positionierung, Bildsprache und die Wörter, die Ihren Preis rechtfertigen.",
  "mk.prozess.2.nr": "W2–3",
  "mk.prozess.2.titel": "Website & Funnel",
  "mk.prozess.2.text":
    "Ihr neuer Auftritt entsteht, samt Vorquali-Funnel und Terminbuchung. Sie sprechen nur noch mit Eigentümern, die es ernst meinen.",
  "mk.prozess.3.nr": "W4",
  "mk.prozess.3.titel": "Automationen & Anbindung",
  "mk.prozess.3.text":
    "CRM-Anbindung, Rückrufregel, Wochenbericht: Was bisher an Ihnen hing, läuft jetzt im System.",
  "mk.prozess.4.nr": "∞",
  "mk.prozess.4.titel": "Betrieb",
  "mk.prozess.4.text":
    "Anzeigen laufen, Anfragen landen im CRM, der Wochenbericht kommt von selbst. Ihre Aufgabe: die Termine wahrnehmen.",
  "mk.prozess.ticket_text":
    "Jedes Ihrer Anliegen läuft in einem Ticketsystem: nachweisbar, mit Status, bis es erledigt ist.",
  "mk.prozess.karte_label": "Ihr Aufwand",
  "mk.prozess.karte_titel": "Vier Termine reichen.",
  "mk.prozess.karte_text": "Den Rest liefern wir: Marke, Website, Funnel, Automationen.",

  /* ── Qualifizierung/Disqualifizierung (StartUnten, Block 8) ────── */
  "mk.qualifizierung.eyebrow": "Passt das zu Ihnen?",
  "mk.qualifizierung.titel": "beuwy passt nicht zu *jedem*.",
  "mk.qualifizierung.subvor": "Das ist",
  "mk.qualifizierung.substark": "Absicht",
  "mk.qualifizierung.subnach": ", nicht Marketing.",
  "mk.qualifizierung.ja_label": "Wir arbeiten mit Maklern, die …",
  "mk.qualifizierung.ja.1.text": "die absolute regionale Marktdominanz wollen.",
  "mk.qualifizierung.ja.2.text":
    "die in ihrer Stadt die Nummer 1 sein wollen, wenn jemand an Immobilien denkt.",
  "mk.qualifizierung.ja.3.text":
    "die schnell entscheiden, sobald alle Informationen und Nachweise auf dem Tisch liegen.",
  "mk.qualifizierung.ja.4.text":
    "die Profis und Prozessen vertrauen — bewährte Abläufe, zugeschnitten auf das eigene Haus.",
  "mk.qualifizierung.nein_label": "Nicht die richtige Wahl, wenn …",
  "mk.qualifizierung.nein.1.text": "Sie die billigste Lösung suchen.",
  "mk.qualifizierung.nein.2.text": "Systeme und Automatisierung Sie nicht interessieren.",
  "mk.qualifizierung.nein.3.text": "Ihnen egal ist, wie Ihr Auftritt wirkt.",
  "mk.qualifizierung.badge": "AUSGEWÄHLT · NICHT FÜR ALLE",

  /* ── FAQ (StartUnten, Block 9) — inkl. FAQPage-JSON-LD ─────────── */
  "mk.faq.label": "Bevor Sie fragen",
  "mk.faq.titel": "Die *Antworten*, die vorher kommen.",
  "mk.faq.1.frage": "Was kostet das?",
  "mk.faq.1.antwort":
    "Das hängt vom Umfang ab: Marke allein, oder Marke, Website und Nachfass zusammen. Die ehrliche Rechnung: Ein Alleinauftrag mehr im Monat, und das System hat sich getragen. Den Rest klären wir im ersten Gespräch mit Ihren Zahlen, nicht mit einer Preisliste.",
  "mk.faq.2.frage": "Für wen sind beuwy-Systeme geeignet?",
  "mk.faq.2.antwort":
    "Machen Ihnen 10.000 € Marketingkosten im Monat keine Angst? Weil Sie wissen: Daraus werden 100.000 € mehr Einnahmen. Dann ja. Wenn Sie bei diesen Zahlen schlucken, ist ein Baukasten ab 39 € im Monat die ehrlichere Wahl. Beides ist in Ordnung. Es ist nur nicht dasselbe Ziel.",
  "mk.faq.3.frage": "Wer sind die häufigsten beuwy-Kunden?",
  "mk.faq.3.antwort":
    "Inhaber, deren Geschäft längst läuft. Nur ihr Ehrgeiz ist größer als ihr Auftritt. Ihr Maßstab sind die Besten ihrer Stadt: Sie sparen woanders — nur nicht an dem, was man von ihnen sieht. Kommt Ihnen das bekannt vor? Aus genau solchen Gesprächen sind in 17 Jahren über 100 Markenprojekte entstanden.",
  "mk.faq.4.frage": "Wie schnell live?",
  "mk.faq.4.antwort": "Vier bis sechs Wochen, je nach Umfang.",
  "mk.faq.5.frage": "Muss ich Inhalte liefern?",
  "mk.faq.5.antwort":
    "Texte, Struktur und die ersten Entwürfe kommen von uns. Sie liefern, was nur Sie haben: Ihre Zahlen und Ihre Objekte. Freigeben müssen Sie trotzdem, aber das dauert Minuten, keine Meetings.",
  "mk.faq.6.frage": "Funktioniert das mit onOffice/FLOWFACT?",
  "mk.faq.6.antwort":
    "Ja. Website, Rechner und Funnel docken an onOffice, FLOWFACT, Propstack, JUSTIMMO oder CasaOne an. Anfragen stehen dort, wo Ihr Team ohnehin arbeitet.",
  "mk.faq.7.frage": "Was passiert nach dem Livegang?",
  "mk.faq.7.antwort":
    "Das System läuft weiter, nicht Sie hinterher. Wir justieren Anzeigen, halten das CRM sauber und schicken Ihnen jede Woche den Bericht.",

  /* ── Finale (StartUnten, Block 10) ─────────────────────────────── */
  "mk.finale.label": "Der nächste Schritt",
  "mk.finale.titel": "Ihr Ruf ist erstklassig. *Zeit* für ein System, das mithält.",

  /* ── Beleg-Raster (BelegRaster.tsx — aktuell ohne Aufrufer, keine
     Studio-Wirkung; Keys stehen bereit, falls ein Aufrufer die Karte
     künftig mit `c` verdrahtet, siehe Report) ───────────────────── */
  "mk.belege.umsatz_label": "Königswege · Provisionserlös",
  "mk.belege.umsatz_wert": "34,78 Mio. €",
  "mk.belege.umsatz_text":
    "2024, Platz 10 der Cash-Hitliste — erstmals unter den Top Ten. 2021 waren es 17,64 Mio.",
  "mk.belege.umsatz_quelle": "Cash-Hitliste der Finanzvertriebe",
  "mk.belege.award_label": "RIEGEL · ImmoScout24-Award 2025",
  "mk.belege.award_wert": "Platz 21",
  "mk.belege.award_text": "von über 25.000 Maklern in Deutschland.",
  "mk.belege.award_quelle": "ImmoScout24",
  "mk.belege.partner_label": "Königswege · Vertriebspartner",
  "mk.belege.partner_wert": "2.210",
  "mk.belege.partner_text": "an 85 Standorten. 2021 waren es 170.",
  "mk.belege.partnerquelle": "koenigswege.com",
  "mk.belege.expose_label": "RIEGEL · Exposé-Aufrufe",
  "mk.belege.expose_wert": "292.514",
  "mk.belege.expose_text": "rollierend über sechs Monate.",
  "mk.belege.expose_quelle": "ImmoScout24-Anbieterprofil",
  "mk.belege.vision_label": "Vision Group · März 2022",
  "mk.belege.visionsatzeins": "Drei Leute in Mannheim.",
  "mk.belege.visionsatzzweivor": "Vier Jahre später Partner von",
  "mk.belege.visionsatzzweiem": "KKR",
  "mk.belege.vision_text":
    "KKR hält seit 1999 Beteiligungen an 29 Unternehmen im deutschsprachigen Raum — Axel Springer, Wella, Hensoldt. Über elf Milliarden Euro Eigenkapital. Seit März 2022 gehört ein Haus dazu, das 2018 aus zwei Gründern und einer Buchhalterin bestand.",
  "mk.belege.vision_quelle": "Handelsblatt · Pressemitteilungen der Beteiligten",
  "mk.belege.riegel_label": "RIEGEL · sechs Wochen nach dem Relaunch",
  "mk.belege.riegel_wert": "342.000 €",
  "mk.belege.riegel_text":
    "Abschlussvolumen aus neun Abschlüssen. Das Projekt hatte sich nach drei Wochen bezahlt gemacht. Ein Familienunternehmen mit über zwanzig Jahren Erfahrung, dessen Auftritt davon nichts erzählte — bis Eigentümer beim Vergleich dreier Makler zuerst das fanden, was wir gebaut haben.",
  "mk.belege.riegel_mehr": "Fallstudie lesen",

  /* ── Podcast-Slot / Showreel-Slot (StartUnten, Block 6) ────────── */
  "mk.podcast.folgt_pill": "Folge erscheint in Kürze",
  "mk.showreel.pill_text": "Showreel — die Kampagnenwelt in Bewegung",
};

export const START_BLOECKE_LABELS: Record<string, string> = {
  "mk.spiegel.eyebrow": "Makler · Spiegel · Eyebrow",
  "mk.spiegel.titel": "Makler · Spiegel · Titel (*Wort* = Hervorhebung)",
  "mk.spiegel.badge": "Makler · Spiegel · Stempel-Badge (Kreistext)",
  "mk.spiegel.p1": "Makler · Spiegel · Absatz 1",
  "mk.spiegel.p2": "Makler · Spiegel · Absatz 2",
  "mk.spiegel.p3_vor": "Makler · Spiegel · Absatz 3 vor der Hervorhebung",
  "mk.spiegel.p3_stark": "Makler · Spiegel · Absatz 3 · hervorgehobenes Wort",

  "mk.abgrenzung.baukasten_label": "Makler · Abgrenzung · Spalten-Label „Baukasten\"",
  "mk.abgrenzung.baukasten.1.text": "Makler · Abgrenzung · Baukasten 1",
  "mk.abgrenzung.baukasten.2.text": "Makler · Abgrenzung · Baukasten 2",
  "mk.abgrenzung.baukasten.3.text": "Makler · Abgrenzung · Baukasten 3",
  "mk.abgrenzung.baukasten.4.text": "Makler · Abgrenzung · Baukasten 4",
  "mk.abgrenzung.beuwy.1.text": "Makler · Abgrenzung · beuwy 1",
  "mk.abgrenzung.beuwy.2.text": "Makler · Abgrenzung · beuwy 2",
  "mk.abgrenzung.beuwy.3.text": "Makler · Abgrenzung · beuwy 3",
  "mk.abgrenzung.beuwy.4.text": "Makler · Abgrenzung · beuwy 4",

  "mk.vsl.karte_label": "Makler · VSL-Video · Gelbe Karte · Label",
  "mk.vsl.karte_titel": "Makler · VSL-Video · Gelbe Karte · Titel",
  "mk.vsl.karte_text": "Makler · VSL-Video · Gelbe Karte · Text",
  "mk.vsl.link_text": "Makler · VSL-Video · Link-Text „Video ansehen\"",
  "mk.vsl.byline_name": "Makler · VSL-Video · Byline · Name",
  "mk.vsl.byline_rolle": "Makler · VSL-Video · Byline · Rolle",
  "mk.vsl.avatar_text": "Makler · VSL-Video · Avatar-Reihe · Text",

  "mk.saeulen.eyebrow": "Makler · Säulen · Eyebrow",
  "mk.saeulen.titel": "Makler · Säulen · Titel (*Wort* = Hervorhebung)",
  "mk.saeulen.sub": "Makler · Säulen · Sub",
  "mk.saeulen.1.nr": "Makler · Säulen 1 · Nummer",
  "mk.saeulen.1.titel": "Makler · Säulen 1 · Titel",
  "mk.saeulen.1.satz": "Makler · Säulen 1 · Satz",
  "mk.saeulen.1.hebel1": "Makler · Säulen 1 · Hebel 1",
  "mk.saeulen.1.hebel2": "Makler · Säulen 1 · Hebel 2",
  "mk.saeulen.1.hebel3": "Makler · Säulen 1 · Hebel 3",
  "mk.saeulen.2.nr": "Makler · Säulen 2 · Nummer",
  "mk.saeulen.2.titel": "Makler · Säulen 2 · Titel",
  "mk.saeulen.2.satz": "Makler · Säulen 2 · Satz",
  "mk.saeulen.2.hebel1": "Makler · Säulen 2 · Hebel 1",
  "mk.saeulen.2.hebel2": "Makler · Säulen 2 · Hebel 2",
  "mk.saeulen.2.hebel3": "Makler · Säulen 2 · Hebel 3",
  "mk.saeulen.3.nr": "Makler · Säulen 3 · Nummer",
  "mk.saeulen.3.titel": "Makler · Säulen 3 · Titel",
  "mk.saeulen.3.satz": "Makler · Säulen 3 · Satz",
  "mk.saeulen.3.hebel1": "Makler · Säulen 3 · Hebel 1",
  "mk.saeulen.3.hebel2": "Makler · Säulen 3 · Hebel 2",
  "mk.saeulen.3.hebel3": "Makler · Säulen 3 · Hebel 3",
  "mk.saeulen.4.nr": "Makler · Säulen 4 · Nummer",
  "mk.saeulen.4.titel": "Makler · Säulen 4 · Titel",
  "mk.saeulen.4.satz": "Makler · Säulen 4 · Satz",
  "mk.saeulen.4.hebel1": "Makler · Säulen 4 · Hebel 1",
  "mk.saeulen.4.hebel2": "Makler · Säulen 4 · Hebel 2",
  "mk.saeulen.4.hebel3": "Makler · Säulen 4 · Hebel 3",

  "mk.pm.eyebrow": "Makler · Performance-Grafik · Sektions-Eyebrow",
  "mk.pm.titel": "Makler · Performance-Grafik · Sektions-Titel (*Wort* = Hervorhebung)",
  "mk.pm.sub": "Makler · Performance-Grafik · Sektions-Sub",
  "mk.pm.station.1.schritt": "Makler · Performance-Grafik · Station 1 · Schritt-Nummer",
  "mk.pm.station.1.titel": "Makler · Performance-Grafik · Station 1 · Titel",
  "mk.pm.station.1.satz": "Makler · Performance-Grafik · Station 1 · Satz",
  "mk.pm.station.2.schritt": "Makler · Performance-Grafik · Station 2 · Schritt-Nummer",
  "mk.pm.station.2.titel": "Makler · Performance-Grafik · Station 2 · Titel",
  "mk.pm.station.2.satz": "Makler · Performance-Grafik · Station 2 · Satz",
  "mk.pm.station.3.schritt": "Makler · Performance-Grafik · Station 3 · Schritt-Nummer",
  "mk.pm.station.3.titel": "Makler · Performance-Grafik · Station 3 · Titel",
  "mk.pm.station.3.satz": "Makler · Performance-Grafik · Station 3 · Satz",
  "mk.pm.ad_label": "Makler · Performance-Grafik · Anzeigen-Visual · Pill-Text",
  "mk.pm.funnel_label1": "Makler · Performance-Grafik · Funnel-Visual · Stufe 2 · Label",
  "mk.pm.funnel_label2": "Makler · Performance-Grafik · Funnel-Visual · Stufe 3 · Label",
  "mk.pm.funnel_label3": "Makler · Performance-Grafik · Funnel-Visual · Stufe 4 · Label",
  "mk.pm.funnel_caption": "Makler · Performance-Grafik · Funnel-Visual · Bildunterschrift",
  "mk.pm.kontakt_label": "Makler · Performance-Grafik · Kontakt-Visual · Label",
  "mk.pm.kontakt_titel": "Makler · Performance-Grafik · Kontakt-Visual · Titel",
  "mk.pm.kontakt_text": "Makler · Performance-Grafik · Kontakt-Visual · Text",
  "mk.pm.dream_vor": "Makler · Performance-Grafik · Dream-State-Satz vor der Quote",
  "mk.pm.dream_nach": "Makler · Performance-Grafik · Dream-State-Satz nach der Quote",
  "mk.pm.dream_label": "Makler · Performance-Grafik · Dream-State-Karte · Label",
  "mk.pm.loop_label": "Makler · Performance-Grafik · Endlos-Zahl · Unterzeile",
  "mk.pm.loop_faktor_vor": "Makler · Performance-Grafik · Endlos-Zahl · Faktor vor der Provision",
  "mk.pm.loop_faktor_nach": "Makler · Performance-Grafik · Endlos-Zahl · Faktor nach der Provision",
  "mk.pm.loop_summe_text": "Makler · Performance-Grafik · Endlos-Zahl · Fußzeile",

  "mk.anfassen.eyebrow": "Makler · Selbst testen · Eyebrow",
  "mk.anfassen.titel": "Makler · Selbst testen · Titel (*Wort* = Hervorhebung)",
  "mk.anfassen.sub": "Makler · Selbst testen · Sub",
  "mk.anfassen.cta_text": "Makler · Selbst testen · Karten-CTA „Ausprobieren\"",
  "mk.anfassen.1.label": "Makler · Selbst testen 1 · Label",
  "mk.anfassen.1.titel": "Makler · Selbst testen 1 · Titel",
  "mk.anfassen.1.text": "Makler · Selbst testen 1 · Text",
  "mk.anfassen.2.label": "Makler · Selbst testen 2 · Label",
  "mk.anfassen.2.titel": "Makler · Selbst testen 2 · Titel",
  "mk.anfassen.2.text": "Makler · Selbst testen 2 · Text",
  "mk.anfassen.3.label": "Makler · Selbst testen 3 · Label",
  "mk.anfassen.3.titel": "Makler · Selbst testen 3 · Titel",
  "mk.anfassen.3.text": "Makler · Selbst testen 3 · Text",

  "mk.beweis.kopf_eyebrow": "Makler · Beweis · Sektions-Eyebrow",
  "mk.beweis.kopf_titel": "Makler · Beweis · Sektions-Titel (*Wort* = Hervorhebung)",
  "mk.beweis.kopf_sub": "Makler · Beweis · Sektions-Sub",
  "mk.beweis.ki_titel": "Makler · Beweis · KI-Absatz · Titel (*Wort* = Hervorhebung)",
  "mk.beweis.ki_text": "Makler · Beweis · KI-Absatz · Text",
  "mk.beweis.wirkung_label": "Makler · Beweis · Label über den Wirkungsspuren",
  "mk.beweis.case1_text": "Makler · Beweis · Fall 1 · Ergebnis-Text (RIEGEL)",
  "mk.beweis.case2_text": "Makler · Beweis · Fall 2 · Ergebnis-Text (Vision Group)",
  "mk.beweis.case_cta": "Makler · Beweis · Fall-Link-Text",

  "mk.danach.label": "Makler · Danach · Eyebrow „Und danach?\"",
  "mk.danach.titel": "Makler · Danach · Titel (*Wort* = Hervorhebung)",
  "mk.danach.text": "Makler · Danach · Text",
  "mk.danach.1.titel": "Makler · Danach 1 · Szenen-Titel",
  "mk.danach.2.titel": "Makler · Danach 2 · Szenen-Titel",
  "mk.danach.3.titel": "Makler · Danach 3 · Szenen-Titel",
  "mk.danach.4.titel": "Makler · Danach 4 · Szenen-Titel",
  "mk.danach.logo_pill": "Makler · Danach · Platzhalter-Pill „Ihr Logo\"",

  "mk.prozess.label": "Makler · Prozess · Eyebrow",
  "mk.prozess.titel": "Makler · Prozess · Titel (*Wort* = Hervorhebung)",
  "mk.prozess.1.nr": "Makler · Prozess 1 · Marker",
  "mk.prozess.1.titel": "Makler · Prozess 1 · Titel",
  "mk.prozess.1.text": "Makler · Prozess 1 · Text",
  "mk.prozess.2.nr": "Makler · Prozess 2 · Marker",
  "mk.prozess.2.titel": "Makler · Prozess 2 · Titel",
  "mk.prozess.2.text": "Makler · Prozess 2 · Text",
  "mk.prozess.3.nr": "Makler · Prozess 3 · Marker",
  "mk.prozess.3.titel": "Makler · Prozess 3 · Titel",
  "mk.prozess.3.text": "Makler · Prozess 3 · Text",
  "mk.prozess.4.nr": "Makler · Prozess 4 · Marker",
  "mk.prozess.4.titel": "Makler · Prozess 4 · Titel",
  "mk.prozess.4.text": "Makler · Prozess 4 · Text",
  "mk.prozess.ticket_text": "Makler · Prozess · Satz über das Ticketsystem",
  "mk.prozess.karte_label": "Makler · Prozess · Gelbe Karte · Label",
  "mk.prozess.karte_titel": "Makler · Prozess · Gelbe Karte · Titel",
  "mk.prozess.karte_text": "Makler · Prozess · Gelbe Karte · Text",

  "mk.qualifizierung.eyebrow": "Makler · Qualifizierung · Eyebrow",
  "mk.qualifizierung.titel": "Makler · Qualifizierung · Titel (*Wort* = Hervorhebung)",
  "mk.qualifizierung.subvor": "Makler · Qualifizierung · Sub vor der Hervorhebung",
  "mk.qualifizierung.substark": "Makler · Qualifizierung · Sub · hervorgehobenes Wort",
  "mk.qualifizierung.subnach": "Makler · Qualifizierung · Sub nach der Hervorhebung",
  "mk.qualifizierung.ja_label": "Makler · Qualifizierung · Spalten-Label „Ja\"",
  "mk.qualifizierung.ja.1.text": "Makler · Qualifizierung · Ja 1",
  "mk.qualifizierung.ja.2.text": "Makler · Qualifizierung · Ja 2",
  "mk.qualifizierung.ja.3.text": "Makler · Qualifizierung · Ja 3",
  "mk.qualifizierung.ja.4.text": "Makler · Qualifizierung · Ja 4",
  "mk.qualifizierung.nein_label": "Makler · Qualifizierung · Spalten-Label „Nein\"",
  "mk.qualifizierung.nein.1.text": "Makler · Qualifizierung · Nein 1",
  "mk.qualifizierung.nein.2.text": "Makler · Qualifizierung · Nein 2",
  "mk.qualifizierung.nein.3.text": "Makler · Qualifizierung · Nein 3",
  "mk.qualifizierung.badge": "Makler · Qualifizierung · Stempel-Badge",

  "mk.faq.label": "Makler · FAQ · Eyebrow",
  "mk.faq.titel": "Makler · FAQ · Titel (*Wort* = Hervorhebung)",
  "mk.faq.1.frage": "Makler · FAQ 1 · Frage",
  "mk.faq.1.antwort": "Makler · FAQ 1 · Antwort",
  "mk.faq.2.frage": "Makler · FAQ 2 · Frage",
  "mk.faq.2.antwort": "Makler · FAQ 2 · Antwort",
  "mk.faq.3.frage": "Makler · FAQ 3 · Frage",
  "mk.faq.3.antwort": "Makler · FAQ 3 · Antwort",
  "mk.faq.4.frage": "Makler · FAQ 4 · Frage",
  "mk.faq.4.antwort": "Makler · FAQ 4 · Antwort",
  "mk.faq.5.frage": "Makler · FAQ 5 · Frage",
  "mk.faq.5.antwort": "Makler · FAQ 5 · Antwort",
  "mk.faq.6.frage": "Makler · FAQ 6 · Frage",
  "mk.faq.6.antwort": "Makler · FAQ 6 · Antwort",
  "mk.faq.7.frage": "Makler · FAQ 7 · Frage",
  "mk.faq.7.antwort": "Makler · FAQ 7 · Antwort",

  "mk.finale.label": "Makler · Finale · Eyebrow",
  "mk.finale.titel": "Makler · Finale · Titel (*Wort* = Hervorhebung)",

  "mk.belege.umsatz_label": "Makler · Belege · Umsatz-Kachel · Label",
  "mk.belege.umsatz_wert": "Makler · Belege · Umsatz-Kachel · Wert",
  "mk.belege.umsatz_text": "Makler · Belege · Umsatz-Kachel · Text",
  "mk.belege.umsatz_quelle": "Makler · Belege · Umsatz-Kachel · Quelle",
  "mk.belege.award_label": "Makler · Belege · Award-Kachel · Label",
  "mk.belege.award_wert": "Makler · Belege · Award-Kachel · Wert",
  "mk.belege.award_text": "Makler · Belege · Award-Kachel · Text",
  "mk.belege.award_quelle": "Makler · Belege · Award-Kachel · Quelle",
  "mk.belege.partner_label": "Makler · Belege · Partner-Kachel · Label",
  "mk.belege.partner_wert": "Makler · Belege · Partner-Kachel · Wert",
  "mk.belege.partner_text": "Makler · Belege · Partner-Kachel · Text",
  "mk.belege.partnerquelle": "Makler · Belege · Partner-Kachel · Quelle",
  "mk.belege.expose_label": "Makler · Belege · Exposé-Kachel · Label",
  "mk.belege.expose_wert": "Makler · Belege · Exposé-Kachel · Wert",
  "mk.belege.expose_text": "Makler · Belege · Exposé-Kachel · Text",
  "mk.belege.expose_quelle": "Makler · Belege · Exposé-Kachel · Quelle",
  "mk.belege.vision_label": "Makler · Belege · Vision-Group-Kachel · Label",
  "mk.belege.visionsatzeins": "Makler · Belege · Vision-Group-Kachel · Aussage Zeile 1",
  "mk.belege.visionsatzzweivor": "Makler · Belege · Vision-Group-Kachel · Aussage Zeile 2 vor „KKR\"",
  "mk.belege.visionsatzzweiem": "Makler · Belege · Vision-Group-Kachel · Aussage · hervorgehobenes Wort",
  "mk.belege.vision_text": "Makler · Belege · Vision-Group-Kachel · Text",
  "mk.belege.vision_quelle": "Makler · Belege · Vision-Group-Kachel · Quelle",
  "mk.belege.riegel_label": "Makler · Belege · RIEGEL-Kachel · Label",
  "mk.belege.riegel_wert": "Makler · Belege · RIEGEL-Kachel · Wert",
  "mk.belege.riegel_text": "Makler · Belege · RIEGEL-Kachel · Text",
  "mk.belege.riegel_mehr": "Makler · Belege · RIEGEL-Kachel · Link-Text",

  "mk.podcast.folgt_pill": "Makler · Podcast · Pill „Folge erscheint in Kürze\"",
  "mk.showreel.pill_text": "Makler · Showreel · Pill-Text",
};
