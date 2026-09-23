# Makler-Tiefenrecherche: Wer der Makler ist, was ihn schmerzt, was wir sagen dürfen

Stand 23.09.2026. Grundlage für die Hook und das Explainer-VSL auf beuwy.com/system
(Zielgruppe: Inhaber kleiner bis mittlerer Maklerbüros in Deutschland).

Zusammengeführt aus fünf Recherchesträngen (Stimme, Markt, Eigentümer, Werbung, intern)
und dem vorhandenen Material:

- `scratchpad/inhalt-inventar.md`, `scratchpad/makler-stimme.md`, `scratchpad/recherche-vsl.md`,
  `scratchpad/riegel-inventar.md` (Session-Scratchpad, nicht im Repo)
- `docs/branding/VSL-EXPLAINER-v2.md`
- Repo-Stellen: `src/lib/texte/vsl.ts`, `src/lib/content.ts`, `src/lib/kunden-kurven.ts`,
  `docs/redesign/LAUNCH.md` §2.5, `docs/redesign/COPY-BRIEF.md`, `docs/redesign/SYSTEM-SEITE.md`

Recherchiert per Websuche, Seitenabruf und Meta-Anzeigenbibliothek. Es gab **keine**
Makler-Befragung, keine Formulare, keine Konten.

## 0. Belegkennungen (bitte beim Zitieren mitnehmen)

**Für Zitate (Sprachbank):**

| Kennung | Bedeutung |
|---|---|
| **[W]** | Quellseite abgerufen, Wortlaut steht dort so. Geprüft ist die Kette Quellseite → Abruf-Tool → Bericht. Vor Nutzung im Film am Original gegenlesen. |
| **[S]** | Nur Suchmaschinen-Auszug, Originalseite gesperrt (Trustpilot, LinkedIn, WAF). Wortlaut evtl. paraphrasiert. **Vermutung, vor Nutzung prüfen.** |
| **[A]** | Makler-Aussage im Anbieter-Umfeld (Testimonial, Fallstudie, Anzeige). Wortschatz echt, Ton geschönt. |
| **[F]** | Verbandsvertreter, Fachautor oder Coach, kein Makler aus dem Tagesgeschäft. |

(Im Strang „Stimme" hieß [A] noch [V]. Umbenannt, damit es nicht mit „Vermutung" kollidiert.)

**Für Zahlen und Aussagen:**

| Kennung | Bedeutung |
|---|---|
| **BELEGT** | Zahl steht so in der Primärquelle (URL). |
| **SEKUNDÄR** | Presse oder Zweitquelle mit nachvollziehbarer Methodik. |
| **RECHNUNG** | Eigene Rechnung aus belegten Werten. Rechenweg steht dabei. |
| **VERMUTUNG** | Keine belastbare Quelle. Nicht als Fakt verwenden. |
| **ANGABE** | Von Alex oder Kunden, intern benannt, extern nicht geprüft. |

---

## 1. Makler-Personas

Die Personas sind **Synthese** aus den Zitaten in Abschnitt 3 und den Zahlen in Abschnitt 4.
Sie sind nicht durch Befragung validiert (**VERMUTUNG** als Ganzes, einzelne Züge belegt).
Die Zahlenbasis: 27.062 Unternehmen in WZ 68.31.1, 73.433 tätige Personen, 28.603 tätige
Inhaber (Destatis, Berichtsjahr 2019), laut IVD nur rund 12.000 Makler im Vollerwerb
(WiWo 2019). Der Markt besteht also überwiegend aus kleinen Büros.

### Persona 1: Der Platzhirsch vor Ort („Herr Brandt", 52, Inhaber, 3–8 Mitarbeitende)

Das ist die Kernzielgruppe von beuwy. RIEGEL Immobilien ist dieser Typ.

- **Alltag:** Seit 15–25 Jahren in einer Region, bekannt, gute Bewertungen (vgl. RIEGEL: Google
  4,8 bei 449 Bewertungen). Macht Bewertungstermine selbst, weil dort das Mandat entschieden
  wird. Arbeitstag bis 18–19 Uhr, sonntags klingelt das Telefon, an Feiertagen schaut er nach
  Anfragen (Prause [W]). Pro Objekt rund 30 Stunden, pro Wertermittlung 6–8 Stunden (Prause [W]).
  Hat ImmoScout24-Vertrag, onOffice oder ähnliche Software, eine Website von 2017.
- **Angst:**
  - Dass ihm Jüngere mit Online-Bewertung und Social Media die Eigentümer abgreifen, bevor
    sie überhaupt bei ihm anrufen. („Eigentümer wählen nicht den besten Makler. Sie wählen den,
    den sie kennen." Heinrichs [W])
  - Den Bewertungstermin zu verlieren, weil ein Kollege 40.000 Euro mehr verspricht
    (IMMOBILIEN-PROFI [W]).
  - Portalabhängigkeit: Preise steigen, Kündigung ist schwer, Ansprechpartner wechseln
    (Trustpilot-Bewertungen [W]).
  - Dass eine Agentur ihm teure Technik verkauft, „die unser Geschäft nicht versteht".
- **Stolz:** Marktkenntnis, Ruf, Empfehlungen, persönliche Beratung. „Vertrauen, Erfahrung und
  Persönlichkeit kann man nicht digitalisieren." (Wohltorf, IVD [F]) ist sein Satz.
- **Wunsch:** Dass Eigentümer von selbst zu ihm kommen. Alleinaufträge statt Preiskampf.
  Unabhängigkeit von Portalen („wieder selbst und direkt vermarkten", Cabel [W]).
  Nicht mehr über Prozente reden müssen.
- **Wie man ihn anspricht:** Sie-Form, ruhig, auf Augenhöhe als Unternehmer. Technik als
  Werkzeug, das seinen Ruf sichtbar macht, nicht als Ersatz für ihn.

### Persona 2: Der Wachstumsmakler („Frau Kaya", 38, Inhaberin, 1–3 Mitarbeitende, 5–10 Jahre am Markt)

- **Alltag:** Hat den Ruf noch nicht, den Persona 1 hat. Kauft Leads (immowelt, Aroundhome,
  ImmoScout24-Maklervergleich), rennt zum Telefon, „um die Ersten zu sein" (neue.immo [W]).
  Macht Instagram selbst, abends. Kennt Funnels und KI-Tools aus Coach-Webinaren.
- **Angst:**
  - Dass Leadkosten fressen, was die Provision bringt. „Die Grundgebühr alleine ist schon recht
    knackig, doch nicht immer kommen neue Leads rein." (neue.immo [W])
  - Dass derselbe Eigentümer auch bei zwei Kollegen klingelt (belegt: max. 3 Makler je Lead,
    ImmoScout24/immowelt/Aroundhome).
  - Leadkauf ist schambesetzt („Wer Leads kauft (und dazu steht), muss sich entweder
    beschimpfen lassen…", Grosenick, AIZ [F]).
- **Stolz:** Schnelligkeit, Einsatz, moderne Arbeitsweise, „kein Makler der alten Schule".
- **Wunsch:** Planbar Aufträge, eigene Kontakte statt gemieteter, Wochenende frei „ohne Leads
  zu verlieren" [S]. Eine Marke aufbauen, die mit den Großen mithält.
- **Risiko für beuwy:** Preissensibel, reagiert auf Null-Euro-Angebote. Passt nur, wenn
  Budget und Mandatsvolumen da sind (Qualifizierung).

### Persona 3: Der Empfehlungsmakler kurz vor dem Umbau („Herr Vogt", 60, Inhaber, 2–5 Mitarbeitende)

- **Alltag:** 80 % der Aufträge über Empfehlung (Münchner Makler, immobilien-profi.de [S]).
  Kaum Online-Marketing, Website seit Jahren unverändert. Überlegt Nachfolge oder Verkauf
  des Büros.
- **Angst:**
  - Das Empfehlungsnetz dünnt aus, weil Eigentümer heute zuerst online bewerten
    (42 % der bewertenden Eigentümer online, ImmoScout24/Innofact 2019) und 51 % ihren Makler
    über ImmoScout24 suchen.
  - „80 % Ihrer Pipeline hängt an einer Handvoll Empfehler" (MaklerMagnet-Werbung, belegt als
    Werbeaussage, nicht als Statistik).
  - Technikprojekte, die ihn Monate kosten („3–6 Wochen Einarbeitung" bei onOffice, laut
    Anbieterblog [A]).
- **Stolz:** Lebenswerk, Name in der Stadt, Kümmerer. „Manchmal ist man Mediator, manchmal
  Psychologe." (Wohltorf [F])
- **Wunsch:** Das Büro übergabefähig machen, den Namen online so stark machen wie offline.
  Ein Ansprechpartner, der erreichbar ist.
- **Wie man ihn anspricht:** Done for you (auf Deutsch: „Wir bauen, Sie liefern zwei Termine
  und Ihre Fotos"), klare Laufzeit, keine Einarbeitung.

---

## 2. Schmerz- und Wunschkarte (priorisiert)

**Stärke:** 5 = trifft alle drei Personas und löst Emotion aus, 1 = Randthema.
**Beleg:** H = hart (DE-Primärquelle), M = mittel (Makler-Zitate [W], Sekundärquelle),
W = weich (US-Daten, Anbieter-Zahlen, Vermutung).

### 2.1 Schmerzen

| Rang | Schmerz | Stärke | Beleg | Kernbeleg | beuwy-Baustein |
|---|---|---|---|---|---|
| 1 | **Der gekaufte Eigentümer-Kontakt klingelt auch bei zwei Kollegen.** | 5 | H | ImmoScout24 „an maximal 3 Makler:innen"; immowelt „bis zu 3 Makler pro PLZ-Gebiet, zufällig"; Aroundhome „maximal zwei Mitbewerbende" | Eigener Bewertungsrechner, Kontakte gehören dem Makler |
| 2 | **Der Eigentümer entscheidet, bevor der Makler im Spiel ist** (bewertet online, spricht mit einem, bleibt dort). | 5 | H (DE) + W (US) | 42 % online bewertet, 51 % suchen über ImmoScout24 (Innofact 2019); 94 % entscheiden im Erstgespräch (Forsa); US: 62 % kontaktieren nur einen Makler (Zillow 2025) | Rechner, Report mit Logo, Sichtbarkeit bei Google/KI |
| 3 | **Die unbezahlte Wertermittlung: 6–8 Stunden, dann verspricht ein Kollege mehr.** | 5 | M | Prause [W]; „Der Wettbewerber hat einfach 40.000 EUR mehr versprochen." [W] | Report vorab, qualifizierter Eigentümer kommt vorbereitet |
| 4 | **Anfragen bleiben liegen / Funkstille nach dem Termin.** | 4 | H | DISQ/ntv 2024: 47 % der E-Mail-Anfragen an große Maklerhäuser unbeantwortet, 53 % der Anrufe im ersten Versuch nicht durchgekommen; „Das Problem ist, was danach passiert: Funkstille!" [W] | Nachfass-Automatik, CRM, Sofort-Report |
| 5 | **Portalabhängigkeit: steigende Preise, Kleingedrucktes, kein Ansprechpartner.** | 4 | H (Zahlen) + M (Zitate) | Scout24 ARPU Professional +9,5 % (2025), Abo-Umsatz 342,3 Mio. € (+15,4 %); Trustpilot-Zitate [W] | Eigenes Portal mit Kundenkonten und Suchaufträgen |
| 6 | **Zeitfresser: Arbeitstag bis 19 Uhr, Sonntag, Feiertag, Besichtigungstouristen.** | 4 | M | Prause [W], Ostsee-Makler [W] | Automatik für Reports, Suchauftrag-Mails, Nachfassen |
| 7 | **Markt schrumpft 2026, Zinsen am Hoch.** | 3 | H | GEWOS: 612.000 Käufe 2026 (−4,4 %); Bauzins 4,2 % (Interhyp, 10.09.2026), höchster Stand seit Mai 2011 (Barkow); EZB 2,50 % | Kontext, kein Kernschmerz (Makler kennen ihn) |
| 8 | **Image- und Provisionsdruck.** | 3 | H + M | 54 % wenig/kein Vertrauen in Makler (YouGov 2024 für ohne-makler.net); ~75 % halten Provision für zu hoch (Homeday/Civey 2021); „Parasit"-Fremdbild [W] | Sichtbare Mehrleistung: Report, Kundenkonto, Status |
| 9 | **Agenturen verstehen das Geschäft nicht, Technik kostet Einarbeitung.** | 3 | M/W | „Ihr bewegt euch auf einem Terrain, von dem ihr schlicht und einfach nichts versteht." [W]; Presseportal-Zitat [S] | Gründer hat 380 Wohnungen verkauft (ANGABE), done for you |
| 10 | **KI-Sichtbarkeit: Wer nicht in der KI-Antwort auftaucht, findet nicht statt.** | 2 | W | Fricke [F]; BrightLocal 2026: 45 % nutzen KI zur Recherche über lokale Unternehmen (US) | Baustein, **kein Aufhänger** (Markt überlaufen, s. Abschnitt 5) |

### 2.2 Wünsche

| Rang | Wunschbild | Stärke | Wortlaut / Beleg |
|---|---|---|---|
| 1 | **Eigentümer kommen zu mir, nicht zu drei Maklern** | 5 | „Sie wählen den, den sie kennen." (Heinrichs [W]) |
| 2 | **Unabhängig von Portalen, eigene Kontakte** | 5 | „wieder selbst und direkt zu vermarkten und zu akquirieren" (Cabel [W]); „Emanzipation statt Abhängigkeit!" (Fricke [F]) |
| 3 | **Alleinaufträge statt Preiskampf** | 4 | „wie Makler Alleinaufträge magisch anziehen" (Bosbach [F]) |
| 4 | **Zeit fürs Eigentliche** | 4 | „die uns mehr Zeit fürs Wesentliche geben" (Discher [A]); „voll und ganz auf das Kerngeschäft konzentrieren" (Darrmann [A]) |
| 5 | **Nicht mehr über Prozente reden müssen** | 4 | „Dann redet man auch nicht mehr über drei oder sechs Prozent Provision." (Wohltorf [F]) |
| 6 | **Regelmäßig Aufträge** | 3 | „regelmäßig verkaufswillige Eigentümer … verlässlich neue Aufträge" (Andrich [A]) |
| 7 | **Wochenende frei, ohne Anfragen zu verlieren** | 3 | „am Wochenende wirklich abschalten … ohne Leads zu verlieren" [S, Anbieter assistent24.at] |
| 8 | **Ein Mensch als Ansprechpartner** | 3 | „unsere Ansprechpartnerin ist immer erreichbar, was ein riesiger Mehrwert für uns ist" (Winter [A]) |
| 9 | **Technik, die einfach funktioniert** | 2 | „völlig selbsterklärend" (Beate Kuhn Immobilien über Propstack [A]) |
| 10 | **Marke vor Ort** | 2 | „eine Marke zu erschaffen, Vertrauen aufzubauen" (v. Järten [A]) |

**Was der Eigentümer will (Gegenseite, für die Beweisführung):**
Marktkenntnis vor Ort 95 %, Eindruck im Erstgespräch 94 %, Ruf 92 %, fundierte Wertermittlung
88 % (Forsa, [SEKUNDÄR]); 62,5 % wollen laufend informiert werden (HAUSGOLD, Anbieterquelle);
Bekanntheit des Maklers nur 17 % „sehr wichtig".

---

## 3. Sprachbank

70 Einträge aus dem Strang „Stimme", unverändert übernommen, nach Schmerzpunkt sortiert.
44 davon [W], 6 [S], der Rest [A]/[F]. Zahlen in Zitaten sind **Aussagen der jeweiligen Person**,
keine Studien.

**Nicht ergiebig:** OMR Reviews zu onOffice enterprise und Propstack haben 0 Bewertungen
(https://omr.com/en/reviews/product/onoffice-enterprise, https://omr.com/de/reviews/product/propstack).
Capterra listet für onOffice eine Bewertung. Reddit ohne Treffer. Facebook-Gruppen „MaklerDiskussion"
(https://www.facebook.com/groups/Maklerdiskussion/) und „Deutsche Immobilienmakler" geschlossen.
vermieter-forum.com und gutefrage.net sperren den Abruf.

### A. Akquise

1. „Akquise und Einkauf von Immobilien – das ist für 80 Prozent der Immobilienmakler eine der schwierigsten Aufgaben." Heinz Bosbach, Coach [F]. https://gewinnermagazin.de/heinz-bosbach-interview/ (80 % = seine Schätzung)
2. „Eigentümer wählen nicht den besten Makler. Sie wählen den, den sie kennen." Andreas Heinrichs, „Makler am Mikro" [W]. https://makler-am-mikro.de/
3. „Sie sind im operativen Geschäft gefangen und fühlen sich verständlicherweise von der Aufgabe überfordert, nun auch noch zum Kommunikationsprofi werden zu müssen." Jan Kricheldorf, AIZ [F]. https://aiz.digital/akquise-neu-denken-vormarkt-vormarkt-vormarkt/
4. „Ohne Automatisierung lässt sich das Beackern des Vormarkts kaum bewältigen, wenn man keine eigene Marketingabteilung hat." Gleiche Quelle [F].
5. „Der Wettbewerber hat einfach 40.000 EUR mehr versprochen." IMMOBILIEN-PROFI [W]. https://www.immobilien-profi.de/40-000-eur-zu-viel-versprochen-und-dann-funkstille/
6. „Der ist weg" / „Der hat sich entschieden" / „Hat keinen Sinn mehr": Selbstgespräche nach verlorenem Bewertungstermin, gleiche Quelle [W].
7. „Und dann passiert etwas sehr Menschliches: Die Gier siegt." Gleiche Quelle [W].
8. „dauert dann ein wenig länger, aber das kriegen wir zu dem Preis schon hin" (Makler über Fantasiepreise), Thorsten Nölle (McMakler), LinkedIn [S]. https://www.linkedin.com/in/thorsten-n%C3%B6lle-a3a1066/
9. „Der größte Konkurrent der Makler ist er selbst. Stillstand ist Gift." Dirk Wohltorf, IVD [F]. https://aiz.digital/vertrauen-kann-man-nicht-digitalisieren/

### B. Zeit

10. „Arbeitstag endet häufig erst zwischen 18 und 19 Uhr." Marcus Prause, Makler [W]. https://www.immoprause.de/alltag-als-makler
11. „Auch sonntags klingelt gelegentlich das Telefon." Prause [W].
12. „Selbst an Feiertagen schauen wir regelmäßig nach Anfragen." Prause [W].
13. „Von der Objektaufnahme bis zur Übergabe kommen schnell rund 30 Arbeitsstunden pro Objekt zusammen." Prause [W].
14. „Je nach Objekt investieren wir zwischen 16 und 26 Stunden allein in die Vermarktungsvorbereitung." Prause [W].
15. „Mit Anfahrt, Termin, Bewertung, Recherche und Dokumentenprüfung investieren wir für eine professionelle Wertermittlung schnell sechs bis acht Stunden." Prause [W]. **Die kostenlose Bewertung kostet den Makler einen Arbeitstag.**
16. „Manche Objekte benötigen zehn Termine. Manche zwanzig. Manche sogar dreißig oder mehr." Prause [W].
17. „Solche Menschen rauben Ihnen wertvolle Zeit." Ostsee-Makler über Besichtigungstouristen [W]. https://ostsee-makler.immobilien/keine-macht-dem-immobilientourismus/
18. „Die Provisionen spiegeln somit auch des Maklers Risiko wider, einen Teil seiner Arbeitszeit nicht vergütet zu bekommen." Ulas Aslan, Makler [W]. https://www.service-seiten.com/Immobilien/BraunschweigWolfsburg-2019/Die-UEberfluessigkeit-des-Immobilienmaklers.html

### C. Portale und ImmoScout-Kosten

19. „Für uns ein Grund, von Immobilienscout komplett wegzugehen." „Jordan", 27.03.2013 [W]. https://www.immobilienportale.com/20133780-immobilienscout24-zu-den-neuen-preisen/
20. „Ihr müsst nur noch eure Zahlen erfüllen und bewegt euch auf einem Terrain von dem ihr schlicht und einfach nichts versteht." „Barclay", 25.03.2013, gleiche Quelle [W].
21. „einer der schlechtesten Läden die es derzeit am Markt gibt": „Crocket", 24.03.2013, gleiche Quelle [W].
22. „der Kunde die neuen Features doppelt bezahlt": „Stephan", 23.03.2013, gleiche Quelle [W].
23. „Je mehr IMMOBILIENMAKLER Kündigen desto günstiger WERDEN DIE PREISE FREUNDE!!!" Mirza Karagic, 03.04.2013, gleiche Quelle [W]. (Alt, Ton bis heute gleich.)
24. „Viele Kolleginnen und Kollegen sind längst dazu übergegangen ihre Laufzeitverträge mit den Portalen zu kündigen, wieder selbst und direkt zu vermarkten und zu akquirieren." Ralf Cabel, Moderator MaklerDiskussion, 06.07.2021 [W]. https://www.haufe.de/immobilien/wirtschaft-politik/makler-und-immobilienportale-eine-schwierige-beziehung_84342_508212.html
25. „Wir haben seit über 20 Jahre einen Vertrag als Makler bei Immowelt … Wenn der Vertrag besteht, ist der Kundenservice nicht erreichbar." Weiss Irion GmbH, Trustpilot, 15.07.2026 [W]. https://de.trustpilot.com/review/www.immowelt.de?page=3
26. „Sie erhalten keine Rückrufe und haben ständig wechselnde Ansprechpartner." Gleiche Bewertung [W].
27. „deutlich schlechtere Konversion im Vergleich zum Wettbewerb" / „Vorsicht beim Kleingedruckten!!" Alexander Noters, Trustpilot, 21.07.2026 [W]. Gleiche Seite.
28. „Es wird leider immer uninteressanter Wohnungen bei Immoscout zu inserieren." Herbert Gerhards, Trustpilot, 17.09.2026 [W]. https://at.trustpilot.com/review/www.immobilienscout24.de?page=3 (Makler-Status unklar)
29. „Immoscout ist leider mittlerweile ein Monopolist." Sebastian Bosch, Trustpilot, 31.08.2026 [W]. https://de.trustpilot.com/review/www.immobilienscout24.de?page=8 (Vermieter, kein Makler)
30. Preismodell „so undurchsichtig geworden", keine Erklärung trotz Anfragen; Absicht, „eng mit den Maklern vor Ort" zu arbeiten, nicht mehr erkennbar. Langjähriger Makler-Kunde [S]. https://ch.trustpilot.com/review/www.immobilienscout24.de?page=17
31. „Selten hat mich ein Dienstleister so erzürnt." Geschäftsführer einer Maklerfirma zur IS24-Preiserhöhung [S]. http://grundbuchblog.de/immobilienscout24-preiserhoehung/
32. „Emanzipation statt Abhängigkeit!" Andrea Fricke, IMMOBILIEN-PROFI [F]. https://www.immobilien-profi.de/makler-im-zeitalter-der-ki-suche/

### D. Gekaufte Eigentümer-Kontakte (Leads)

33. „Wir teilten uns jeden Immobilien Lead mit weiteren Maklern." Erfahrungsbericht [W]. https://neue.immo/leads-kaufen/
34. „…rannten wir zum Telefon und versuchten die Ersten zu sein." Gleiche Quelle [W]. **Bild: Makler als Sprinter gegen Kollegen.**
35. „Die Grundgebühr alleine ist schon recht knackig, doch nicht immer kommen neue Leads rein." Gleiche Quelle [W].
36. „Auch wenn wir für die Kontaktdaten potentieller Verkäufer bezahlt haben, waren diese bei unserem Anruf oft überfordert." Gleiche Quelle [W].
37. „Es ist uns sehr oft passiert, dass wir unhöflich abgewimmelt wurden." Gleiche Quelle [W].
38. „die Daten der Immobilie stimmten erst garnicht": gleiche Quelle [W].
39. Aroundhome-Leads „für Makler eine Katastrophe", aus „mehr als 40 Leads" „ein einziger Auftrag", „zu 80 % unbrauchbar", ca. 1.800 € pro Woche für 10 Leads [S]. https://de.trustpilot.com/review/www.aroundhome.de?page=280
40. IS24-Leads „weder geprüft noch vorqualifiziert", „mehrfach vergeben, was im Verkaufsgespräch verneint wurde" [S]. Trustpilot IS24.
41. „Wer Leads kauft (und dazu steht), muss sich entweder beschimpfen lassen…" Lars Grosenick, AIZ [F]. https://aiz.digital/leadanbieter-was-kosten-sie-wirklich/
42. „90 Prozent der Makler hören nach zwei bis drei Monaten auf, ihre Leads zu bearbeiten." IMMOKAISER-Podcast #36 [W, Zahl unbelegt = VERMUTUNG]. https://immokaiser.podigee.io/38-new-episode
43. „…ein Maklerbüro im Schnitt 10 Lead" für einen Auftrag: gleiche Quelle [W, unbelegt].
44. „Wir beziehen schon lange Leads von immowelt. Darauf zu verzichten, wäre meiner Meinung nach grob fahrlässig." Thorben Andrich, Redhome [A]. https://www.immowelt-impuls.de/magazin/digitale-akquise-redhome-immobilien/ (Gegenstimme)

### E. Nachfassen und Funkstille

45. „Kein Rückruf. Keine Antwort auf die E-Mail." Prause über Interessenten [W]. https://www.immoprause.de/alltag-als-makler
46. „Das Problem ist, was danach passiert: Funkstille!" IMMOBILIEN-PROFI [W]. Quelle wie Nr. 5.
47. „ANRUFEN! … Ihr werdet überrascht sein, wie oft ihr diese Aufträge zurückbekommt." Gleiche Quelle [W].
48. „Wenn Sie hinter dem Interessenten herlaufen, dann läuft er davon." Carmela Cantore [W]. https://www.die-immobilienfluesterin.de/2023/08/10/wenn-der-kaufinteressent-sich-nicht-mehr-meldet/
49. „Ein Interessent wird höchst selten schon bei einer Besichtigung ein Käufer." Cantore [W].
50. „…da Sie in jeden neuen Interessenten die Hoffnung setzen, dass dieser Ihr Haus oder Ihre Wohnung kaufen könnte." Ostsee-Makler [W]. Quelle wie Nr. 17.
51. „Sobald ein Lead bei uns eingeht, versuchen wir, die Interessenten … so schnell wie möglich zu kontaktieren." Alexandra Richter, DKB Grund [A]. https://www.immowelt-impuls.de/magazin/interview-immo-leads-dkb-grund-gmbh/

### F. Technik, KI, Software

52. „Vertrauen, Erfahrung und Persönlichkeit kann man nicht digitalisieren." Dirk Wohltorf, IVD [F]. Quelle wie Nr. 9. **Kerneinwand der Branche.**
53. „Wer die Digitalisierung als Gewinn, als ein Tool von vielen sieht, wird gewinnen." Wohltorf [F].
54. „Wir haben intern Prozesse optimiert und digitalisiert – ohne aber die Qualität der individuellen Vermittlung aufzugeben." Jürgen Michael Schick [F]. https://imheute.de/juergen-michael-schick-ueber-marktchancen-off-market-deals-und-reformbedarf-im-maklerberuf/
55. „Zeitaufwand für präzise Prompts, inkonsistente Ergebnisse, fehlende visuelle Analyse … sowie die Gefahr von Fehlern." IVD-Bildungsinstitut [F/A]. https://www.ivd-bildungsinstitut.de/exposes-mit-ki-im-makleralltag/
56. „Allerdings muss man fleißig Content aufbauen und sein Unternehmen präsentieren. Das ist ein langer Weg." Christian v. Järten, Makler [A]. https://www.immowelt-impuls.de/magazin/social-media-im-arbeitsalltag/
57. „Teils lange Antwortzeiten im Service Center." „Lasse", onOffice-Nutzer, Capterra, 15.05.2024 [W]. https://www.capterra.com.de/software/184897/onoffice
58. „Eine ganz tolle Maklersoftware, völlig selbsterklärend, sehr einfach und logisch aufgebaut." Beate Kuhn Immobilien über Propstack [A]. https://www.propstack.de/rezensionen/
59. „Wer künftig nicht in der KI-Antwort auftaucht, findet online schlicht nicht mehr statt." Andrea Fricke [F]. Quelle wie Nr. 32.

### G. Konkurrenz und Image

60. „Du musst doch nur gut aussehen, schöne Häuser zeigen und dann das große Geld einstecken." Paulina Haque zitiert das Vorurteil [W]. https://phaque-immobilien.de/immobilienmakler-sind-doch-ueberfluessig/
61. „…es ist definitiv kein SCHNELL und EINFACH verdientes Geld." Haque [W].
62. „Kaum ein Berufsstand ruft ähnliches Naserümpfen hervor wie der des Immobilienmaklers." Ulas Aslan [W]. Quelle wie Nr. 18.
63. „Ein Parasit, der sich ohne jeglichen Arbeitsaufwand eine goldene Nase an einem schnellen Verkauf verdient." Aslan gibt das Fremdbild wieder [W].
64. „Es gibt bis heute keine einheitlichen Standards für unseren Berufsstand. Jeder darf sich Immobilienmakler nennen." Jürgen Michael Schick [F]. Quelle wie Nr. 54.
65. Nur etwa 12.000 Makler hauptberuflich, die übrigen haben „noch andere Jobs", „Hobby-Makler". Schick in der WiWo [F]. https://www.wiwo.de/finanzen/immobilien/unheimliche-vermittler-schwemme-darum-gibt-es-ploetzlich-so-viele-makler/25049522.html
66. „Manchmal ist man Mediator, manchmal Psychologe. Das ist unsere Bestimmung." Wohltorf [F]. Quelle wie Nr. 9.

### H. Provisionsdruck

67. „Das Bestellerprinzip bedroht unsere Existenz." Frank Baur, Makler [W]. Quelle wie Nr. 65.
68. „Die Provision ist nicht mit einem Angestelltengehalt zu vergleichen. Sie ist als reiner Umsatz zu betrachten, von dem noch viele Kosten abgezogen werden müssen." Röhricht Immobilien [W]. https://www.roehricht-immobilien.de/als-makler-reich-werden-selbststaendig-oder-angestellt/
69. „Mit Nachweis Geld zu verdienen, ist Old School. … Wir sind Brückenbauer, Kümmerer, Komplettdienstleister. … Dann redet man auch nicht mehr über drei oder sechs Prozent Provision." Dirk Wohltorf, IVD [F]. https://www.haufe.de/immobilien/entwicklung-vermarktung/marktanalysen/makler-ivd-praesident-dirk-wohltorf-im-interview_84324_614138.html
70. „Selbstverständlich können Sie Ihre Immobilie selbst veräußern, so wie Sie auch Ihre Steuern selber erledigen können." Haque [W]. (Konter gegen „Das kann ich auch selbst")

### I. Ergänzende Formulierungen aus Wunsch- und Einwandmaterial

71. „die uns mehr Zeit fürs Wesentliche geben" Stefan Discher über Propstack [A]. https://www.propstack.de/rezensionen/
72. „voll und ganz auf das Kerngeschäft konzentrieren" Stephanie Darrmann, Homeday-Partnerin [A]. https://www.homeday.de/de/homeday-erfahrungen-als-makler/
73. „regelmäßig verkaufswillige Eigentümer … verlässlich neue Aufträge" Thorben Andrich [A]. Quelle wie Nr. 44.
74. „unsere Ansprechpartnerin ist immer erreichbar, was ein riesiger Mehrwert für uns ist" Claudia Winter, DKB Grund [A]. Quelle wie Nr. 51.
75. „viele Layout- und Text-Korrekturen erforderlich, da keine branchenspezifischen Kenntnisse" (über Agenturen) Hans Schneider, sinngemäß [S]. https://www.presseportal.de/pm/171672/5819895
76. „Preiserhöhungen von über 100 % … einseitig", Kündigung trotz Aufgabe der Maklertätigkeit abgelehnt (immowelt) [S]. Trustpilot immowelt.
77. „Leads sind Geldverschwendung." Makler zu Aroundhome [S]. Trustpilot Aroundhome.

### 3.1 Einwände gegen Agenturen, Software, Portale (nach Häufigkeit)

1. **Vertragsfalle, Kleingedrucktes, Laufzeit.** Nr. 24, 27, 76. **Folge: Laufzeit und Ausstieg im Film klar ansagen.**
2. **„Die verstehen unser Geschäft nicht."** Nr. 20, 75. Fachkenntnis-Test: Kann die Agentur Käufer- von Verkäufer-Lead unterscheiden? (https://realxlab.com/marketing-agentur-bewerten-immobilienmakler-leitfaden/, Anbieter). **Hebel: Alex hat über 380 Wohnungen selbst verkauft (ANGABE).**
3. **Interessenkonflikt.** Agentur will wenig Stunden pro Kunde [S, Anbieterblog]; Leads mehrfach verkauft trotz Gegenteil-Zusage (Nr. 40).
4. **Kein Ansprechpartner, langsamer Support.** Nr. 26, 57.
5. **Einarbeitung und Komplexität.** onOffice 3–6 Wochen, Website auf Anbieter-Subdomain (https://saasbloggerelite.com/artikel/onoffice-alternative-2026, Anbieter). Nr. 3.
6. **Teure Website, die aussieht wie alle.** „Makler bezahlen 5.000 bis 15.000 Euro für professionelle Websites, die wie jede andere Makler-Website aussehen" [S, https://makler.immo/marketing/website-fuer-immobilienmakler, Anbieter].
7. **„Vertrauen kann man nicht digitalisieren."** Nr. 52.
8. **„Leads sind Geldverschwendung."** Nr. 77.
9. **VERMUTUNG:** „Wem gehören Daten und Kontakte nach Vertragsende?" Deckt sich mit „sobald Sie kündigen, sind Ihre Leads weg" (https://bloxl.de/blog/website-fuer-makler, Anbieter).

### 3.2 Tabu-Wörter

**Belegt (in keinem Maklerzitat, Makler werfen sie Anbietern vor):**

| Wort | Warum | Ersatz |
|---|---|---|
| „Lead" | ambivalent, scham- und ärgerbesetzt (Nr. 33–41) | Anfrage, Eigentümer, Verkäufer, Kontakt |
| „Premium-Platzierung", Zusatzpakete | Portal-Abzocke (Nr. 22, 30) | nicht verwenden |
| „Digitalisierung" | Verbandssprache (Nr. 53–54) | Werkzeug, Tool, Abläufe |
| „KI" ohne konkrete Aufgabe | löst Nr. 52 aus | Aufgabe nennen: „rechnet", „schickt den Report", „fasst nach" |

**VERMUTUNG (abgeleitet aus Ton und Werbe-Sample):** Funnel, Conversion, skalieren,
hyperpersonalisiert, Customer Journey, Touchpoints, Growth, Performance-Marketing, „10x",
„Game-Changer", „revolutionär", „done for you" (betrifft beuwy selbst), Pipeline,
Content-Strategie, „exklusiv", „ohne Kaltakquise", „planbar", „in deinem Revier", Du-Form.

**Makler-Wörter (verwenden):** Alleinauftrag, Bewertungstermin, Objektaufnahme, Eigentümer,
Verkäufer, Suchkunden, Anfragen, nachfassen, Funkstille, Besichtigungstouristen, Portale/Scout,
Kleingedrucktes, Laufzeitvertrag, Provision/Courtage, Kollegen, Region, „vor Ort",
Tagesgeschäft, Kümmerer, Empfehlung, Wochenende.

---

## 4. Harte Zahlen-Bank

### 4.1 Hook-taugliche Kernzahlen

| # | Zahl | Status | Quelle |
|---|---|---|---|
| Z1 | ImmoScout24 gibt eine Eigentümeranfrage „an maximal 3 Makler:innen" weiter | BELEGT | https://www.immobilienscout24.de/anbieten/gewerbliche-anbieter/inserieren/weitere-produkte/maklersuchmaschine.html (abgerufen 23.09.2026) |
| Z2 | immowelt: 49 € pro Lead zzgl. MwSt., „bis zu 3 Makler pro PLZ-Gebiet", zufällig; aus 10 Leads ca. 2 Termine; über 700 Makler; Empfehlung: Reaktion „innerhalb von 60 Minuten", 3–5 Kontaktversuche | BELEGT | https://www.immowelt.de/immobilienprofis/leads (abgerufen 23.09.2026) |
| Z3 | Aroundhome: „maximal zwei Mitbewerbende", Zahlung pro Kontakt „unabhängig davon, ob daraus ein Auftrag entsteht" | BELEGT | https://www.aroundhome.de/partner-werden/immobilienverkauf/ (abgerufen 23.09.2026) |
| Z4 | DISQ/ntv 2024: 47 % der E-Mail-Anfragen an 10 bundesweite Maklerunternehmen unbeantwortet, ca. 56 % der Antworten unvollständig, ca. 53 % der Anrufe im ersten Versuch nicht durchgekommen (370 Kontakte) | BELEGT (große Ketten, nicht kleine Büros) | https://disq.de/2024/20240221-immobilienmakler.html |
| Z5 | DISQ 2026: „Ein großer Teil der E-Mail-Anfragen bleibt unbeantwortet", Branchenschnitt 68,3 Punkte („befriedigend") | BELEGT | https://disq.de/2026/20260224-immobilienmakler.html |
| Z6 | 47 % der verkaufswilligen Eigentümer ließen bewerten; davon 42 % online (Platz 1), 39 % Gutachter, 30 % Makler, 20 % selbst | BELEGT (Juli 2019, n=500) | https://www.immobilienscout24.de/unternehmen/news-medien/news/default-title/der-immobilienmakler-ist-fuer-die-mehrheit-der-eigentuemer-trotz-bestellerprinzip-oder-split-regelung-unverzichtbar/ |
| Z7 | Maklersuche: 51 % über ImmoScout24, 38 % Suchmaschinen, 29 % Büro, 28 % kennen schon einen | BELEGT (2019) | wie Z6 |
| Z8 | Eindruck im Erstgespräch 94 % wichtig (60 % „sehr"), Marktkenntnis 95 %, Ruf 92 %, Wertermittlung 88 %, Bekanntheit nur 17 % „sehr wichtig"; 71 % haben noch nie einen Makler beauftragt | SEKUNDÄR (Forsa, n=1.008, 2020; Auftraggeber vermutlich Maklerseite) | https://www.immobilienmanager.de/die-erwartungen-von-immobilieneigentuemern-an-makler-04092020 · https://www.experten.de/id/4922647/studie-zeigt-erwartungen-von-eigentuemern-an-immobilienmakler/ · https://www.haufe.de/immobilien/wirtschaft-politik/was-kunden-von-ihrem-immobilienmakler-erwarten_84342_524784.html |
| Z9 | USA: Median 1 kontaktierter Makler; 62 % kontaktierten nur einen; „vertrauenswürdig" und „reaktionsschnell" je 78 %; 35 % finden Makler online | BELEGT, **US** | Zillow CHTR 2025, S. 89–92: https://www.zillowstatic.com/bedrock/app/uploads/sites/60/2025/10/Consumer-Housing-Trends-Report-for-Agents-2025_102925.pdf |
| Z10 | USA: „59 % of sellers hire the first agent they speak with" | SEKUNDÄR, **US** | https://www.housingwire.com/articles/why-most-buyers-hire-the-first-agent-they-talk-to/ (02.01.2026) |
| Z11 | GEWOS 2026: ca. 612.000 Wohnimmobilienkäufe (−4,4 %), Umsatz knapp 211 Mrd. € (−2,0 %), Eigenheime mehr als −5 % | SEKUNDÄR | https://www.onvista.de/news/2026/09-17-hohe-bauzinsen-nachfrage-nach-immobilien-kuehlt-sich-ab-0-10-26554258 (17.09.2026) |
| Z12 | Bauzins 10 J.: 4,2 % (Interhyp, 10.09.2026); ca. 4,25 %, „höchster Stand seit Mai 2011" (Barkow) | BELEGT | https://www.interhyp.de/zinsen/ · onvista wie Z11 |
| Z13 | EZB Einlagensatz 2,25 → 2,50 % am 10.09.2026, Inflation August 3,3 % | BELEGT | https://www.zdfheute.de/wirtschaft/ezb-zinsentscheid-leitzins-finanzen-100.html |
| Z14 | Scout24 2025: 26.027 Professional-Kunden, Abo-Umsatz 342,3 Mio. € (+15,4 %), ARPU +9,5 % „insbesondere im Wohnimmobilienmaklergeschäft", Transaction Enablement 106,6 Mio. € (+17,5 %), EBITDA-Marge Professional 62,3 % | BELEGT | https://www.scout24.com/en/news-media/news/detail/scout24-veroeffentlicht-vorlaeufige-ergebnisse-fuer-2025-und-gibt-prognose-fuer-2026-bekannt-wachstum-und-starke-operative-entwicklung-bestaetigt (26.02.2026) |

### 4.2 Branche

| Kennzahl | Wert | Status | Quelle |
|---|---|---|---|
| Unternehmen WZ 68.31.1 (Wohnimmobilien) | 27.062 | BELEGT (Berichtsjahr 2019) | Destatis Fachserie 9 R. 4.3, Tab. 1.1: https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Dienstleistungen/Publikationen/Downloads-Dienstleistungen-Struktur/grundstuecks-wohnungswesen-2090430197004.pdf?__blob=publicationFile |
| Tätige Personen | 73.433 (28.603 tätige Inhaber, 44.830 Arbeitnehmer) | BELEGT | ebd., Tab. 2.2 |
| Umsatz | 10,34 Mrd. €; 140.764 € je tätige Person | BELEGT | ebd., Tab. 1.3 |
| WZ 68.31 gesamt (Wohnen + Gewerbe) | 29.528 Unternehmen | BELEGT | ebd. |
| Umsatz je Unternehmen | ≈ 382.000 € (Durchschnitt; Median deutlich darunter = VERMUTUNG) | RECHNUNG 10,34 Mrd. / 27.062 | – |
| Makler im Vollerwerb | ca. 12.000 | Angabe IVD | https://www.wiwo.de/finanzen/immobilien/unheimliche-vermittler-schwemme-darum-gibt-es-ploetzlich-so-viele-makler/25049522.html (26.09.2019) |
| Destatis 2017 | 27.365 Unternehmen, 70.181 Personen, 8,48 Mrd. € | SEKUNDÄR | https://datenschutz.immobilien/wie-viele-immobilienmakler-gibt-es-in-deutschland/ |
| Adressdatenbank | 38.714 Einträge | kommerziell, nicht amtlich | https://listflix.de/statistik/immobilienmakler/ (Aug. 2026) |
| IVD-Mitglieder | ca. 6.000 Unternehmen | SEKUNDÄR | https://www.fiabci.de/fiabci-ivd.html |
| IVD-Anteil an Transaktionen | „rund 40 %", ca. 405.000/Jahr, knapp 95 Mrd. € (vermutlich inkl. Vermietung) | Eigenangabe, undatiert | https://ivd.net/ivd-bundesverband/maklerinnen-und-makler/ |

Hinweis: „70.000 Makler" (WiWo 2019) sind tätige Personen, keine Büros.

### 4.3 Transaktionen und Preise

| Kennzahl | Wert | Status | Quelle |
|---|---|---|---|
| Kaufverträge 2025 gesamt | 872.000 (+8 %), 278 Mrd. € (+13 %), davon 198 Mrd. € Wohnen | BELEGT | AK OGA/BBSR, 24.06.2026: https://redaktion-akoga.niedersachsen.de/immobilienmarktbericht_deutschland/198-milliarden-euro-flossen-2025-in-den-kauf-von-wohnimmobilien-251846.html |
| Preise 2025 | Reihen-/Doppelhäuser gebraucht 2.470 €/m² (+4 %), freistehend 2.420 €/m², ETW gebraucht 2.390 €/m² | BELEGT | ebd. |
| GEWOS-Prognose 2025 | 656.000 Kauffälle Wohnen (+14,2 %), 221,2 Mrd. €; Eigenheime 253.600, ETW 308.400 (Bestand 266.700, Neubau 41.700), MFH 38.700, Bauland 55.400; Inserate seit Ende 2021 +120 % (Eigenheime), +77 % (ETW) | SEKUNDÄR (Prognose) | https://gewos.de/wp-content/uploads/sites/16/2025/09/GEWOS-Pressemitteilung-IMA-2025.pdf |
| Rückgang 2026 in Stück | ≈ 28.000 Käufe weniger | RECHNUNG 612.000 / 0,956 − 612.000 | – |
| vdp-Index Q2 2026 | Wohnen +1,9 % ggü. Vorjahr (ETW +2,6, EFH +2,0, MFH +1,6); Gesamt +1,3 %, −0,1 % ggü. Vorquartal | BELEGT | https://www.pfandbrief.de/uneinheitliche-entwicklung-der-immobilienpreise/ |
| ImmoScout24 WohnBarometer Q2 2026 | Bestandswohnungen 2.645 €/m² (+3,9 % ggü. Vorjahr); ca. 1/3 der EFH-Inserate Energieklasse G/H | SEKUNDÄR | https://www.presseportal.de/pm/31321/6305869 |
| Deutsche-Hypo-Klimaindex Sept. 2026 | 80,5 Punkte (−16,6 %) | SEKUNDÄR | https://www.ad-hoc-news.de/wirtschaft/immobilienmarkt-2026-wohnkaeufe-sinken-auf-612-000-transaktionen/70116030 |
| Eigentümersicht | Über die Hälfte hält 2026 für guten Verkaufszeitpunkt; 60–69-Jährige: 48 % würden eher verkaufen | SEKUNDÄR (Okt. 2025, n=535) | https://www.presseportal.de/pm/31321/6144167 |
| Verkäufe pro Büro/Jahr | ≈ 14 pro Büro, ≈ 32 pro Vollerwerbsmakler (grob: Maklerquote misst Inserate) | RECHNUNG 600.700 × 0,65 ≈ 390.000; / 27.062 bzw. / 12.000 | – |

### 4.4 Maklerquote und Courtage

| Kennzahl | Wert | Status | Quelle |
|---|---|---|---|
| Maklerquote Q1 2026 | 65 % bundesweit (Leipzig 73, Stuttgart 71, Berlin/Hamburg 69, Köln 54) | BELEGT | https://www.sprengnetter.de/2026/05/04/maklerquote-q1-2026/ · https://www.asscompact.de/nachrichten/so-hat-sich-die-immobilienmaklerquote-entwickelt-0 |
| Maklerquote Q2 2026 (ETW) | 67 % (Leipzig 73, Berlin 71, Dortmund 70, Köln 58), Basis 485.350 Inserate | SEKUNDÄR | https://www.presseportal.de/pm/156121/6309423 |
| Historie IVD Süd | 2015: 90,0 %, 2022: 74,4 %, 2023: ca. 75 % (andere Methodik) | SEKUNDÄR | https://ivd-sued.net/pn-57-makler-marktanteil-bei-wohnimmobilien-steigt-2023-jan-bis-mai-in-bayern-und-baden-wuerttemberg-leicht-auf-rd-76-bzw-75-an-quote-deutschlandweit-bei-ca-75/ |
| Übliche Gesamtprovision | 5,95–7,14 % inkl. MwSt., regional, verhandelbar | BELEGT | https://www.immobilienscout24.de/wissen/verkaufen/maklerprovision.html |
| Regionale Sätze | meist 7,14 %; Bremen, Hessen, MV 5,95 %; Hamburg 6,25 %; Niedersachsen ländlich teils 4,76 % | SEKUNDÄR | https://www.baufi24.de/immobilien/maklerprovision-in-deutschland-mit-uebersicht-nach-bundeslaendern/ · https://www.ftd.de/finanzen/immobilien/maklerprovisionen-in-deutschland/ · https://www.drklein.de/maklerprovision.html |
| Halbteilung | seit 23.12.2020 (§§ 656a–656d BGB) | BELEGT | ImmoScout24 s. o. · https://www.bundestag.de/webarchiv/textarchiv/2020/kw20-de-maklerkosten-695102 · https://www.haufe.de/immobilien/wirtschaft-politik/maklerrecht-bestellerprinzip-beim-kauf-von-immobilien_84342_489726.html |
| 69 % der Inserate mit 3,57 % Käuferprovision | nicht verifiziert, vermutlich 2020/21 | SEKUNDÄR | https://www.homeday.de/kirby-content/downloads/market-reports/20201203_homeday_kaeuferprovisionen_q32020.pdf |
| Beispiel-Courtage Haus | 140 m² × 2.420 €/m² ≈ 339.000 € → ≈ 24.200 € gesamt bei 7,14 %, ≈ 12.100 € Verkäuferseite | RECHNUNG | – |
| beuwy-Rechenbeispiel | 400.000 € × 7,14 % = 28.560 € (Gesamt-, nicht Innenprovision) | RECHNUNG, nur als „Beispiel" | `src/lib/texte/vsl.ts:59,179` |
| Engel & Völkers | über 1,3 Mrd. € Courtage weltweit 2025, kein DE-Wert | SEKUNDÄR | https://www.presseportal.de/pm/72369/6199916 |

### 4.5 Leadpreise und Mehrfachvergabe

| Anbieter | Preis / Modell | Weitergabe | Status / Quelle |
|---|---|---|---|
| immowelt | 49 € zzgl. MwSt. (Immo-Leads, mTAN); Profi-Leads Preis offen | bis zu 3 pro PLZ, zufällig | BELEGT, Z2 |
| ImmoScout24 Maklervergleich | nach gelieferten Anfragen, regional, nicht öffentlich | max. 3 | BELEGT, Z1 |
| Aroundhome | pauschal pro Kontakt, auch ohne Auftrag; monatlich kündbar | max. 2 Mitbewerber | BELEGT, Z3 |
| Aroundhome Köln | „300–350 €" | SEKUNDÄR, nicht verifiziert: https://www.profido-consulting.de/blog/plattform-strategie-lead-vermittlung-bei-aroundhome |
| IS24/Aroundhome/Hausgold | „über 500 € pro (!) verkauften Lead" | interessierte Seite: https://zeitundwert.de/aktuelles/der-maklervergleich-im-internet-und-wer-mit-ihren-daten-geld-verdient |
| immoverkauf24 | Provisionsbeteiligung, Anteil nicht veröffentlicht | https://www.immoverkauf24.de/partnermakler-werden/ |
| Scout24 Realtor Lead Engine | „said to be around 33 %" der Courtage | Hörensagen, 05.01.2022: https://www.onlinemarketplaces.com/articles/scout24-and-the-new-property-portal-paradigm-part-two/ |
| Eigene Google-Ads-Kampagne | 54,17 € pro Eigentümer-Lead (CPC 8,03 €, CR 14,83 %); bei 50 Leads/Auftrag 2.708,50 € pro Auftrag; exklusiv | BELEGT (Fallbeispiel): https://www.ivd-bildungsinstitut.de/eigentuemer-leads-fuer-makler/ (11.06.2025) |
| Marktspanne | 35–120 € unqualifiziert, 150–600 € vorqualifiziert, 1.000–5.000 € pro Abschluss | Anbieterblog: https://www.myinvest-pro.de/blog/was-kostet-ein-immobilien-lead |
| immowelt-Kosten pro Termin | ≈ 245 € (10 × 49 € / 2 Termine) | RECHNUNG |
| immowelt-Kosten pro Mandat | ≈ 700 € nur Leadkosten, bei 1/3 Gewinnchance | RECHNUNG + VERMUTUNG (1/3) |
| Abo-Umsatz Scout24 pro Profi-Kunde | ≈ 1.096 €/Monat (inkl. Neubau/Gewerbe) | RECHNUNG 342,3 Mio. / 26.027 / 12 |

**Einschränkung:** ImmoScout24- und Aroundhome-Preise nicht offiziell → im Film nur als
„Makler berichten von …" oder weglassen.

### 4.6 Eigentümer-Verhalten und Vertrauen

| Kennzahl | Wert | Status | Quelle |
|---|---|---|---|
| Wertkenntnis | 46 % kennen den Wert ihrer Immobilie nicht | SEKUNDÄR (2021, n=388, nicht repräsentativ) | https://www.immobilienscout24.de/unternehmen/news-medien/news/default-title/fast-die-haelfte-der-eigentuemerinnen-kennt-den-wert-der-eigenen-immobilien-nicht/ |
| Mit Makler verkaufen | 57 % (2019); davon 69 % auch bei eigener Provision; 18–39-Jährige: 44 % selbst | BELEGT | wie Z6 |
| Mit Makler verkaufen (2023) | zwei Drittel, n=836 | SEKUNDÄR | https://www.bergen-realestate.com/2025/05/08/immobilienbesitzer-bevorzugen-verkauf-mit-maklerunterst%C3%BCtzung |
| Auswahlkriterien | guter Ruf 44,9 %, Empfehlung 36,4 %, gute Online-Bewertungen 28,7 %; ~75 % finden Provision zu hoch | BELEGT (Homeday/Civey, Juni 2021, n=5.038) | https://www.homeday.de/de/blog/maklerprovision-umfrage/ |
| Informiert werden | 62,5 % wollen laufend über jeden Schritt informiert werden; 79,7 % halten Online-Bewertungen für wichtig; Kanal E-Mail 38,7 %, Telefon 32,4 % | SEKUNDÄR, Anbieter, Methodik unklar | https://www.hausgold.de/infografiken/eigenschaften-wunschmakler/ |
| Vertrauen | 28 % großes/etwas Vertrauen, 54 % wenig/keines; 47 % glauben, selbst verkaufen zu können (2023) | SEKUNDÄR, Auftraggeber Wettbewerber | https://www.ohne-makler.net/magazin/yougov-immomarkt-2024/ · https://www.asscompact.de/nachrichten/immobilienmakler-umfrage-offenbart-vertrauensl%C3%BCcke |
| Empfehlung historisch | 40 % fanden Makler über Empfehlung, 22 % über Bank; 84 % würden weiterempfehlen | SEKUNDÄR, Mai 2010 | https://www.verbaende.com/news/pressemitteilung/forsa-umfrage-grosse-zufriedenheit-bei-maklerkunden-86-prozent-wuerden-ivd-makler-weiterempfehlen-vielfaeltige-erwartungen-an-makler-70142/ |
| McMakler 2019 | Befragt: 255 McMakler-Makler, **keine Eigentümer**, nicht als Eigentümerbeleg nutzen | – | https://www.presseportal.de/pm/118772/4410548 |
| NAR (US) | 80–81 % der Verkäufer kontaktierten nur einen Makler; 66 % mit empfohlenem/bekanntem Makler | SEKUNDÄR, US | https://www.thejamilbrothers.com/blog/80--of-Sellers-Contacted-Only-One-Agent-Before-Hiring---2025-NAR-Report-Insights · https://virginiarealtors.org/2024/12/09/key-takeaways-from-nars-2024-profile-of-home-buyers-and-sellers/ · https://www.nar.realtor/news/real-estate-news/nar-2025-profile-of-home-buyers-sellers-reveals-market-extremes |
| BrightLocal 2026 (US) | 97 % lesen Bewertungen; 31 % verlangen ≥ 4,5 Sterne; 45 % nutzen ChatGPT/KI zur Recherche über lokale Unternehmen; Google 83 → 71 % | BELEGT, US-Verbraucher | https://www.brightlocal.com/research/local-consumer-review-survey/ |

### 4.7 Reaktionszeit

| Kennzahl | Wert | Status | Quelle |
|---|---|---|---|
| HBR 2011 | 2.241 US-Firmen: 37 % antworten binnen 1 h, 23 % nie, Ø 42 h; binnen 1 h fast 7× häufiger qualifiziert | SEKUNDÄR (Paywall, übereinstimmende Zusammenfassungen) | https://hbr.org/2011/03/the-short-life-of-online-sales-leads · https://www.researchgate.net/publication/298137032_The_short_life_of_online_sales_leads · https://www.hbs.edu/faculty/Pages/item.aspx?num=39955 |
| „60-mal nach 24 h" | nicht im Volltext geprüft | SEKUNDÄR | wie oben |
| MIT/InsideSales 2007 | 5 statt 30 Min.: 100× erreichen, 21× qualifizieren; 6 Firmen, 15.000 Leads, B2B | SEKUNDÄR, **alt, nicht Immobilien** → nur „eine Studie mit über 15.000 Online-Anfragen" | https://www.onecavo.com/wp-content/uploads/2015/11/MIT-InsideSales.com_Lead-Response-Management.pdf · https://www.leadresponsemanagement.org/lrm_study/ |
| Uhrzeit der Anfragen (DE) | **keine** unabhängige Quelle; kursierende Werte 26–91 %, „20:48 Uhr" ohne Quelle | VERMUTUNG, nicht einblenden | https://www.it-boltwise.de/fehlende-unabhaengige-daten-zu-immobilienanfragen-nach-2048.html |
| US „62 % nach Feierabend", „30 % Wochenende" | Anbieterblogs ohne Primärquelle | VERMUTUNG, nicht verwenden | https://hyperleap.ai/blog/real-estate-lead-response-statistics-2026 · https://www.215labs.com/blog/after-hours-lead-capture-real-estate |
| Inseratszeiten | neue Mietinserate vor allem vormittags werktags (sagt nichts über Eigentümeranfragen) | BELEGT | https://www.immobilienscout24.de/wissen/mieten/tag-und-uhrzeit-meisten-inserate.html |

### 4.8 Nicht belegbar (Lücken)

- Anteil Alleinaufträge: **keine Quelle.** „Erfolgsquote bis zu 90 %" = quellenloses Snippet.
- Mandate pro Makler/Jahr: nur RECHNUNG (≈ 14 / ≈ 32).
- Deutsche Zahl „wie viele Makler kontaktiert ein Eigentümer": keine.
- Online-Bewertung aktuell (2025/26): nur 2019 belastbar → „laut ImmoScout24-Studie", nicht „heute".
- Marktanteil Top 10: Statista-Paywall.
- Neuere Destatis-Zahl: GENESIS 47415 nicht ausgewertet.
- Blog-Zahlen **nicht verwenden:** 17–26 Std./Woche Admin, 62 % verpasste Anfragen, 9× bei 5 Minuten, 30–70 % nie kontaktiert, „78 % der Käufer nehmen den ersten" (Herkunft ungeklärt).

---

## 5. Was der Markt überstrapaziert, und wo die Lücke ist

Basis: Meta-Anzeigenbibliothek DE, 11 Suchen (u. a. „Immobilienmakler Leads" ca. 4.550 Treffer,
„Immobilienmakler Marketing" ca. 3.132, „Makler Akquise" ca. 2.298, „Eigentümer Leads" ca. 2.006,
„Objektakquise" ca. 1.145, „Makler Alleinaufträge" ca. 832, „Verkäuferleads Makler" ca. 461,
„Maklersoftware" ca. 342, „Makler Termine Eigentümer" ca. 320, „Maklerbüro Website" ca. 150,
„Immobilienmakler KI Automatisierung" ca. 128). Die API liefert nur Linktitel, keinen Primärtext
oder Video-Hook. „Varianten" = gleiche Überschrift unter mehreren Anzeigen-IDs, als Signal für
Testen/Skalieren (VERMUTUNG, Spend nicht verfügbar). Anzeigenlink:
`https://www.facebook.com/ads/library/?id=<ID>`.

### 5.1 Reale Hooks am Markt (Auswahl mit Quelle)

**Leadgen:**
- „Leads ohne Vorabkosten!" Immodealone, 1401930525398908 (>8 Var.) · „Kein Abo, kein Lead-Paket" 1091040973622072 · „Du zahlst erst nach dem Notartermin" 1621286589609857 · „Erst verkaufen, dann zahlen" 1360833429373485 · „Der dritte Weg an Objekte" 1799481041239565 · „Ein Hinweis, ein Büro" 1079220978408894
- „Jeder Lead geht nur an einen Makler" Socialschmiede, 4324507501194249 (>8 Var.)
- „Makler-Leads in deinem Revier" Wehelpanybusiness.de, 2360104361400710 (>30 Var.)
- „Keine gekauften Leads." FindyourMakler, 1751327192774453
- „Erhalte exklusive Eigentümer-Leads für dein Immobilienmakler-Business" Von Morgen, 2619935875106064
- „Mehr Verkäuferleads. Weniger Zufall." Chris Sygo/Blinkwasser, 1867084600928170 · „Eigentümer-Magnet-Methode" 1608456110627571 (>12 Var.)
- „Mehr Objekte. Ohne Kaltakquise." SEOVISION, 2807334392973204
- „Mehr Eigentümer. Schnellere Verkäufe." PEX Network, 1621002459609890
- „In 6 Wochen zum Notar kommen" PCL Concept, 1079904284741942 (6 Var.)
- „Eigentümer sehen Ihre Fernsehwerbung" 1699557561139266
- MaklerMagnet: „Wie Sie als Immobilienmakler pro Monat 1–3 zusätzliche Verkaufsobjekte gewinnen." / „Ohne Kaltakquise oder geteilte Portal-Leads, die schon bei mehreren Maklern liegen …" / „80% Ihrer Pipeline hängt an einer Handvoll Empfehler …" https://www.maklermagnet.de/
- SocialMakler: „Ihr Lead-System, schlüsselfertig installiert" / „Warum Makler nie wieder Leads kaufen sollten" / „Was passiert, wenn Makler aufhören zu teilen" https://socialmakler.de/ (einmalig 6.900 €)
- MyImmoLeads: „Wir verkaufen deine erste Immobilie kostenlos, wenn du uns deine Werbeanzeigen schalten lässt." https://myimmoleads.de/
- GRUVOX: „Exklusive Off-Market-Leads für Immobilienmakler" / „Verfügbarkeit in deiner Region prüfen" https://gruvox.de/
- Blinkwasser: „Marketing-Partner der führenden deutschen Immobilienmakler" https://www.blinkwasser.de/
- Leadsagentur: „Leads Immobilienmakler – planbare Sichtbarkeit, Anfragen & mehr Verkaufsaufträge" / „Gleiche Power wie größte Portale mit individuellem Branding" https://leadsagentur.de/branchen/immobilien-leads/immobilienmakler/
- Ynfinite: „Neue KI Website generiert Verkäuferleads für Immobilien-Makler" 1037011702716047 (>20 Var.) / „Du verdienst es, gesehen zu werden!" https://ynfinite.com/

**Software, KI, Erreichbarkeit:**
- „10 Stunden pro Woche weniger am Telefon" Maklerbot, 904158179445192
- „Lena ruft erst Sie an, dann Ihre Leads" Marvin Jeske, 1534642905093357
- „Das Mandat entscheidet sich am Telefon." Hinoa, 912813761577952 (https://hinoa.de/)
- „Mehr Makleraufträge durch bessere Erreichbarkeit" / „Keine Immobilienanfrage mehr verpassen" Work247, 3077965399066134, 1367820955480100
- „In 2 Minuten zu Ihren KI-Mitarbeitern" WT Digital, 1779301743080567
- „Büropaket bis 14.03.2027 für 0 €" / „Einmal anbinden, keine Doppelpflege" Immoriver, 2136013660368296, 1386879753070502
- „Mehr Aufträge mit weniger Arbeit! … Jetzt smarter makeln" FIO, 2165370827527000
- „Eine App für moderne Makler" Rezi24, 1486552243233869
- „KI nennt nur wenige Makler" / „Wird dein Maklerbüro von ChatGPT empfohlen?" IntroKi, 1766310544655012, 2138075850138176
- „Kostenloser Makler KI-Check" SEOLabs, 1077695888562757, 1056389773853934 (>15 Var.)
- „Weniger Aufwand für Social Media" Heyfiona.ai, 2225431431569103
- Propstack: „… Damit Makler weniger verwalten und mehr verkaufen." https://www.propstack.de/
- onOffice: „always on your side" / „Höhere Effizienz · Mehr Zeit gewinnen · Bessere Ansprache · Größere Reichweite" https://onoffice.com/

**Coaches, Akademien:**
- „Die 5 größten Lügen der Objektakquise." Bosbach, 2349033729186849 (**>45 Var.**, stärkste Kampagne im Sample) · Event: „Du schließt Alleinaufträge zu Wunschpreisen der Verkäufer ab?" / „Deine Verkaufszeit dauert länger als 8 Wochen?" https://www.bosbach-consulting.de/live-event-objektakquise
- „Akquise 2026 – wenn die KI mitredet" Immobilien Makler Akademie, 1130711466131573 (>20 Var.)
- „Die 4 Stufen zum Mandat" Rang-Eins, 2052061862145122 (>35 Var.)
- „Vier EBT´s am ersten Tag" / „Bestand nutzen für Akquise und Verkauf" Adrian Mutzhas, 1057370447143650, 1419499540275750
- „Gratis Leitfaden: So überzeugst du Eigentümer direkt im ersten Gespräch." Robert Michel Junior, 1481718343717411
- „Für Immobilienmakler: So funktioniert Akquise im Jahr 2026" Sebastian Keller, 1035495332280280
- „Sie sind Makler, kein Marketer." / „Print wirkt. Gerade lokal." / „1 Thema · 60 Minuten · 0 Euro" BOTTIMMO, 2280721732748451, 1796144048086247, 2059595468254296
- „Wer alles macht, wird nie gerufen" Teaching Socials, 2038617970099427
- „Neue Objekte über Instagram" / „0 Euro für dein Maklerbüro" Muydozo, 1956410961694682, 845302915273974
- „Du bist IMMOBILIENMAKLER und dir gefällt deine Webseite nicht mehr?" Manuel Forster, 1060741286795362
- „Live-Webinar für Immo-Makler" / „Kostenfreier Live-Workshop" Temmer/Voigt, 2149987435898217, 1606261857952734
- „So rekrutierst du TOP-Akquisiteure" Scale PROP, 2113771819530949

**Franchise:** DAHLER 1098909862828744 · Rhein-Taunus Immobilien 1038950322276809 · „Über 90 Objekte, zu wenig Makler" Mergelmeyer 4693587420870144 · Engel & Völkers 1672382664535230 · Keller Williams 1122184913599802. (RE/MAX-Seite nicht lesbar.)

### 5.2 Überstrapaziert (Makler sind abgestumpft; Wirkung = VERMUTUNG)

1. **„Exklusiv / nicht geteilt / nur an einen Makler"**: Socialschmiede, GRUVOX, MyImmoLeads, SocialMakler, Von Morgen, Leadsagentur, FindyourMakler, MaklerMagnet. Tischeinsatz, kein Unterscheidungsmerkmal mehr.
2. **„Ohne Kaltakquise" / „planbar" / „weniger Zufall"**.
3. **Output-Zahl pro Monat** („1–3 Objekte", „10–15 warme Leads", „⌀ 29 Leads", „300 % ROI", „ROI > 6x").
4. **Null-Euro-Einstieg** („ohne Vorabkosten", „0 € Grundgebühr", „erste Immobilie kostenlos"). Zieht Schnäppchenjäger an.
5. **Listicles** („5 größte Lügen", „4 Stufen", „Akquise 2026").
6. **Webinar / Live-Workshop** → Terminmüdigkeit.
7. **„Kostenloses Erstgespräch / X-Analyse"** als CTA.
8. **Revier / Region exklusiv / Verfügbarkeit prüfen** (Knappheits-Standard).
9. **Du-Form mit Hustle-Ton** (Sie nur: BOTTIMMO, MaklerMagnet, Hinoa, Maklerbot, DAHLER, WT Digital).
10. **KI-Sichtbarkeit / „Wirst du von ChatGPT empfohlen?"** (SEOLabs, IntroKi, Akademie, Blogs https://estatepartner.de/blog/chatgpt-empfehlung-immobilienmakler, https://ki-sichtbarkeit.net/blog/ki-sichtbarkeit-immobilienmakler.html). Vor sechs Monaten Lücke, jetzt Lockangebot. **Für beuwy: Baustein, nicht Aufhänger.**
11. **KI-Telefonassistent / Erreichbarkeit** (Maklerbot, Hinoa, Work247, Jeske, WT Digital).

### 5.3 Kollisionen mit beuwy

- **„Führende Immobilienmakler"**: Blinkwasser nutzt es wörtlich als Absender-Claim. beuwy-CLAUDE.md nutzt dieselbe Formel. → Entscheidung für Alex, nicht für die Copy.
- **„Portal-Niveau"**: Leadsagentur „Gleiche Power wie größte Portale mit individuellem Branding". Unterschied muss sofort sichtbar sein: dort Lead-Einkauf mit Branding, bei beuwy eigenes Portal mit Kundenkonten, Suchaufträgen, CRM.
- **„In 6 Wochen"**: PCL Concept „In 6 Wochen zum Notar". Tempo besser am System festmachen („Ihr System steht, bevor der nächste Eigentümer anruft"), keine Wochenzahl im ersten Satz.
- **„Schlüsselfertig / 100 % eigene Leads"**: SocialMakler (6.900 €) ist am nächsten dran, aber nur Lead-Funnel.

### 5.4 Lücken (im Sample nicht gefunden; Nichtexistenz am Markt nicht bewiesen)

1. **Was nach der Anfrage passiert.** Alle verkaufen Zufluss. Niemand wirbt mit dem Weg Anfrage → Report → Suchauftrag → Nachfassen → Mandat.
2. **Der Blick des Eigentümers.** Keiner zeigt, was der Eigentümer abends über das Büro sieht (Website, Rechner, Google, ChatGPT). Anzeigen reden über Makler, nie durch die Augen des Verkäufers.
3. **Glaubwürdigkeit von der anderen Tischseite.** Kein Anbieter mit Gründer, der selbst Wohnungen verkauft hat. Coaches argumentieren mit Maklerjahren, Agenturen mit Lead-Zahlen.
4. **Eigentum statt Miete.** „Ihr Portal, Ihre Daten, Ihre Marke". Die Formel „Hören Sie auf, Kontakte zu mieten" fehlt.
5. **Ruhiger Sie-Premium-Ton.** In der Leadgen-Kategorie gibt es ihn nicht (DAHLER nur für Franchise).
6. **Der Bestand als Schatz.** Nur Mutzhas. „Ihre nächsten Mandate liegen schon in Ihrem Postfach" ist kaum besetzt.
7. **Ein System statt fünf Tools.** Der „Das sind nicht drei Geräte"-Moment fehlt.
8. **Ehrliche Qualifizierung.** Niemand sagt öffentlich, für wen es nicht passt.

### 5.5 Hook-Muster aus starken Spots (Übertragung als Entwurf)

| # | Muster | Beispiel / Quelle | Übertragung |
|---|---|---|---|
| 1 | Produkt als ein Bild mit Zahl | iPod „1,000 songs in your pocket" https://en.wikipedia.org/wiki/IPod | „Ein ganzes Immobilienportal. Mit Ihrem Namen drauf." |
| 2 | Status quo als Gegner | Apple „1984" https://en.wikipedia.org/wiki/1984_(advertisement) | Gemietete Kontakte als System, das Makler austauschbar macht |
| 3 | Identität statt Feature | „Think different" https://en.wikipedia.org/wiki/Think_different | Inhaber, der Marke statt Masse will |
| 4 | Zwei Figuren nebeneinander | „Get a Mac" https://en.wikipedia.org/wiki/Get_a_Mac | Zwei Makler, dieselbe Anfrage um 22:47 |
| 5 | „Nicht drei Dinge, eins" | iPhone 2007 https://en.wikipedia.org/wiki/IPhone_(1st_generation) | „Ein Bewertungsrechner. Ein Portal. Ein CRM. Das sind nicht drei Tools." |
| 6 | Mini-Sitcom Büroalltag | Apple „The Underdogs" https://appleinsider.com/articles/20/07/13/apples-underdogs-return-for-new-ad-about-working-from-home · https://www.adweek.com/commerce/apples-lovable-underdogs-are-back-and-joining-the-great-resignation/ | Freitag 17:58, Assistenz sucht die Excel-Liste der Suchkunden |
| 7 | Beweis-Stunt | Volvo „Epic Split" https://en.wikipedia.org/wiki/Epic_Split | Live: Adresse rein, eine Minute später Report mit Logo im Postfach |
| 8 | Gründer spricht trocken | Dollar Shave Club https://en.wikipedia.org/wiki/Dollar_Shave_Club | „Ich habe 380 Wohnungen verkauft. Ich weiß, was ein Eigentümer sieht, bevor er Sie anruft." |
| 9 | Understatement | VW „Think Small", Avis „We try harder" https://en.wikipedia.org/wiki/Think_Small · https://en.wikipedia.org/wiki/Avis_Car_Rental | „Wir machen keine Leads. Wir machen, dass Ihre ankommen." |
| 10 | Absurdes Bild fürs Tabu | Squatty Potty (Harmon Brothers) https://en.wikipedia.org/wiki/Squatty_Potty | Eimer mit Loch, in den Anfragen gegossen werden |

(Wikipedia-Seiten in dieser Sitzung nicht einzeln abgerufen.)

---

## 6. Claim-Ampel

Rechtsrahmen: § 5 UWG (Irreführung), § 5 Abs. 1 Nr. 7 (Verknappung), § 5 Abs. 4 (Preisermäßigung).
Anlass zur Vorsicht: Die Wettbewerbszentrale hat RIEGEL am 09.09.2026 wegen „Bestpreis"-Werbung
abgemahnt (RIEGEL `CLAUDE.md`, `scripts/werbeaussagen-check.mts`). Ein beuwy-Film mit RIEGEL-Bezug
steht unter besonderer Beobachtung.

### GRÜN: belegt oder technisch nachweisbar (im Film sagbar, Formulierung beachten)

| # | Aussage | Beleg | Formulierungsgrenze |
|---|---|---|---|
| G1 | Eigentümer bewerten online, ohne Anmeldung, in einem geführten Rechner | https://riegel-immobilien.de/rechner (HTTP 200, 23.09.); RIEGEL `src/app/rechner/page.tsx` | – |
| G2 | „Kalibriert mit 489 echten Abschlüssen" | RIEGEL `docs/fortschritt.md:976-1010`, `src/lib/valuation.ts`; Commit e74991a strich „über 5.000" | „kalibriert mit", nicht „basiert auf 489 Bewertungen" |
| G3 | Amtliche Bodenrichtwerte fließen live ein | RIEGEL `src/lib/boris.ts` | **nur 11 Länder** (RLP, HE, NI, HB, NW, BB, HH, SN, TH, ST, MV; nicht BY, BW, BE, SL, SH) → „wo verfügbar" |
| G4 | Report als PDF mit Maklerlogo, automatisch an Eigentümer und Makler (CC) | RIEGEL `src/lib/report-pdf.ts`, `/api/report` (5–9 Seiten) | „eine Minute später" / „sofort", nicht „um sechs" |
| G5 | Luftbild des Hauses im Report | RIEGEL `src/lib/satellite.ts` (Esri/Maxar) | Bildquelle klein angeben |
| G6 | Eigenes Portal: Objektliste mit Karte, Kundenkonto, Merkliste, Suchaufträge | https://riegel-immobilien.de/immobilien, `/konto`, `/merkliste` | – |
| G7 | Objekte laufen live aus der Maklersoftware, ohne Doppelpflege | RIEGEL `docs/onoffice-integration.md`, `src/lib/onoffice.ts` | **nur onOffice** |
| G8 | Exposé-Download nur mit Kundenkonto | RIEGEL `src/app/api/expose/route.ts` | – |
| G9 | Cookieloses Tracking, Heatmap, Trichter je Rechnerschritt | RIEGEL `src/lib/track.ts` | – |
| G10 | Cockpit: Anfragen, Reports, Objektstatus an einem Ort | RIEGEL `src/components/intern-dashboard.tsx`; beuwy `src/app/intern/*` | beuwy-`/intern` im Demo-Modus → Beispieldaten kennzeichnen |
| G11 | Standort- und Ratgeberseiten für Google und KI-Antworten (ca. 95 Seiten bei RIEGEL) | Live gezählt 23.09.; `robots.ts` lässt GPTBot, ClaudeBot, PerplexityBot zu; `/llms.txt` | als **Bauziel** („gebaut, um …"), kein Ranking |
| G12 | Datenschutzanwältin hat das RIEGEL-System geprüft | RIEGEL `docs/anwalts-check-2026-08.md:1-7` | Zitat nur mit Freigabe der Anwältin |
| G13 | Provision seit 2020 halbiert (ca. 3,57 % je Seite) | Bundestag, Haufe (s. 4.4) | – |
| G14 | RIEGEL: Ø Vermarktungsdauer 90 Tage, Ø Kaufpreis 385.820 € (2020–2026) | RIEGEL `src/lib/riegel-stats.ts:20,23` | reiner Wert, **nie** „schneller als" |
| G15 | RIEGEL-Bewertungen: Google 4,8 (449), IS24 4,7 (148), Trustpilot 4,6 (34), Stand Juli 2026 | RIEGEL `src/lib/trust-data.ts` | Leistung **vor** dem Relaunch, nie als beuwy-Ergebnis |
| G16 | Königswege: Platz 10 Cash-Hitliste, 34,78 Mio. € Provisionserlös 2024 | `kunden-kurven.ts` `herkunft: "geprueft"`, https://koenigswege.com | Finanzvertrieb, kein Makler; beuwy „begleitet" |
| G17 | Rechenbeispiel 400.000 € × 7,14 % = 28.560 € | `vsl.ts:59,179` | nur „Beispiel" / „bei 7,14 % Gesamtprovision" |
| G18 | Marktzahlen aus Abschnitt 4 mit Status BELEGT | s. Quellen | US-Zahlen als US kennzeichnen; 2019-Zahlen „laut ImmoScout24-Studie", nicht „heute" |
| G19 | Portale geben eine Eigentümeranfrage an bis zu drei Makler | Z1–Z3 | besser „an bis zu drei" statt „immer an drei" |
| G20 | Jede zweite E-Mail-Anfrage an große Maklerhäuser blieb im Test unbeantwortet | Z4 (DISQ/ntv 2024) | „große Maklerhäuser" / „im Test für ntv", nicht „alle Makler" |

### GELB: nur mit Freigabe oder Klärung

| # | Aussage | Stand | Was fehlt |
|---|---|---|---|
| Ge1 | **„RIEGEL: 9 zusätzliche Mandate in den ersten 3 Monaten"** | ANGABE Kunde; `kunden-kurven.ts` `herkunft: "kunde"`; RIEGEL-Repo: „Kein dokumentierter Beleg"; Zeitraum schwankte (6 Wochen / 3 Monate) | Schriftliche Bestätigung Manfred Riegel, CRM-Export mit Datum und Herkunft, Definition von „zusätzlich", Fußnote im Film. **Beweis in der Filmmitte, nicht Hook.** |
| Ge2 | „Über 380 Wohnungen selbst verkauft, in 3 Jahren, fast alles über Instagram" (acta) | ANGABE | Alex bestätigt Zahl und Wortlaut („mit zwei Partnern entwickelt und verkauft"), nicht „allein" |
| Ge3 | „17 Jahre Markenarbeit, u. a. Bosch, Continental, Michelin" | ANGABE | Referenznennung vertraglich erlaubt? Namen ja, **Logos nein** |
| Ge4 | „40+ Makler-Projekte seit 2017" | ANGABE (`mk.stats.s1`, `llms.txt`); namentlich nur 4 (RIEGEL, hzo, invyse, Königswege), nur RIEGEL klassischer Makler | Interne Liste; „Projekte", nicht „Systeme laufen bei 40 Maklern" |
| Ge5 | „Live in 6 Wochen, Termin schriftlich" | widersprüchlich (4–6 / sechs / vier Wochen) | Eine Zahl festlegen, Zusage in den Vertrag |
| Ge6 | „Ihr Aufwand: zwei Termine und Ihre Fotos" | widersprüchlich (`mk.prozess.karte_titel` „Vier Termine reichen.") | Alex entscheidet, Keys angleichen |
| Ge7 | „Ein Büro pro Stadt" | ANGABE, heute echt (Speyer vergeben) | Gebietsschutz operativ und vertraglich (UWG § 5 Abs. 1 Nr. 7) |
| Ge8 | Preis 27.900 € netto / 3 × 9.900 € | ANGABE, nur auf /system; alte Stufen 7.900/16.900/34.000 € in `docs/CONVERSION.md` | Entscheidung 3 in v2: Preis zeigen ja/nein |
| Ge9 | „Ein Mandat, und das System hat sich bezahlt" | Rechenlogik gilt nur als Beispiel (28.560 € Gesamtprovision > 27.900 €) | „Bei einem Objekt für 400.000 € und 7,14 % Gesamtprovision …" |
| Ge10 | „Jeden Montag der Wochenbericht, jedes Anliegen als Ticket" | ANGABE; Umsetzung im RIEGEL-Repo nicht gesehen | Screenshot eines echten Versands |
| Ge11 | „Käufer bekommen es, bevor es online steht" | Matching-Cron gebaut, Stand 18.08.: 0 Mails | Versandzahlen aus Supabase `matching_sent`; sonst „sobald es da ist, automatisch" |
| Ge12 | „Nachfassen passiert von selbst" | Bei RIEGEL nur geplant (`docs/wachstum.md` D); beuwy-Flows im Demo-Modus | Nur als Produktfunktion zeigen, vor Dreh einmal echt laufen lassen |
| Ge13 | „Läuft mit onOffice, FLOWFACT, Propstack, JUSTIMMO, CasaOne" | nur onOffice gebaut; `flowfact.svg`/`casaone.svg` Nachbauten | „anbindbar" statt „läuft"; keine nachgebauten Logos |
| Ge14 | „Platz 21 von über 25.000 Maklern (IS24-Award 2025)" | vor dem Relaunch; Urkunde nachzureichen | nur mit „unabhängig vom Relaunch", besser gar nicht |
| Ge15 | Logowand „Marken, die beuwy vertrauen" (22 Namen) | Freigaben offen (Vision Group, Königswege, hzo, acta) | Im Makler-Film nur RIEGEL, hzo, invyse (+ Königswege als Vertrieb) |
| Ge16 | Zitat / Video Manfred Riegel | existiert nicht | Schriftliche Freigabe, voller Name, echtes Video. **Stärkster fehlender Beweis** |
| Ge17 | RIEGEL 416.054 Exposé-Aufrufe vs. 6 Wettbewerber | öffentliches IS24-Profil https://www.immobilienscout24.de/anbieter/profil/riegel-immobilien | RIEGEL-Reichweite, kein beuwy-Effekt; vergleichende Werbung → nicht in den Film |
| Ge18 | Vision Group (3 → 70 MA, JV 160 Mio. € mit KKR) | Firma hat Zyklus nicht überstanden (`cases-detail.ts` Z. 44) | Aus dem Film raus (wie v2); Website ergänzen oder entfernen |
| Ge19 | „Den Auftrag bekommt, wer zuerst antwortet" als Aussage über deutsche Eigentümer | US-Daten + DE-Indiz (94 % Erstgespräch) | Als These/Szene formulieren, Zahl nur als US-Zahl |
| Ge20 | Anfragen kommen nachts / nach Feierabend | keine DE-Zahl | Nur Szene; harter Beleg später über RIEGEL-Zeitstempel |

### ROT: nicht in den Film (und teils live von der Website nehmen)

| # | Aussage | Warum | Wo sie heute steht |
|---|---|---|---|
| R1 | „Ein Mandat bringt im Schnitt / Ø 28.560 € Courtage" | „Capital 09/2026, Ø 400.000 €" ohne URL; RIEGEL-Ø 385.820 €; 7,14 % regional | VSL-EXPLAINER-v2 §2.2, Skript 1:44 („im Schnitt achtundzwanzigtausend") → „Ein Objekt für 400.000 € bringt …" |
| R2 | „3× mehr Eigentümer-Anfragen nach Relaunch" | keine Quelle | **live** `src/lib/content.ts:242-243` (`mk.stats.s2`) |
| R3 | „Ohne einen einzigen gekauften Lead" / „ohne einen einzigen Rabatt auf die Provision" | erweitert Kundenangabe ohne Quelle | **live** auf 10 Cluster-Seiten (u. a. `provision-verteidigen.ts`, `leadgenerierung-immobilienmakler.ts`, `seo-fuer-immobilienmakler.ts`) |
| R4 | „292.514 Exposé-Aufrufe (vorher 50.000)" als Relaunch-Wirkung | `herkunft: "schaetzung"`, Vorher-Wert unbelegt, widerspricht 416.054 | `start-bloecke.ts` `mk.belege.expose_wert`, `kunden-kurven.ts` |
| R5 | „10 Mandate mehr im Monat", „jeden Monat Alleinaufträge" | Ergebnisversprechen ohne Zahl | **live** `vsl.ts` Einwand 1 „Ein System bringt jeden Monat welche." → „ist dafür gebaut, …" |
| R6 | „Schneller verkaufen als die Konkurrenz", „sichtbarster Makler", „Nummer 1", „Bestpreis" | Superlativ ohne Vergleichsdaten | `vsl.ts` Knappheit „zum sichtbarsten Makler vor Ort machen" (als Ziel, grenzwertig) |
| R7 | „Bewährt bei dutzenden Maklern" | nicht belegt, gestrichen | `docs/branding/FILM-PROMPT-60S.md` Z. 20-21, 84 |
| R8 | Trust-Leiste Engel & Völkers, Von Poll, Dahler, Kensington, RE/MAX, McMakler, Homeday, BETTERHOMES | keine Freigaben, suggeriert Zusammenarbeit | **live** `content.ts:237` `mk.trust.namen` |
| R9 | „Ohne laufende Werbekosten" | FAQ „Wir justieren Anzeigen", Startseite 10.000 €/Monat Marketing als Schwelle | Hook B in v2 → bis Klärung „ohne mehr Arbeit" |
| R10 | Countdown, „Makler X hat gerade gebucht", erfundene Platzzahlen, „Wert 47.000 €, heute 27.900 €" | § 5, § 5 Abs. 4 UWG | bewusst nicht umgesetzt, dabei bleiben |
| R11 | Anbieter-Blog-Zahlen als Fakt („62 % verpasst", „30–70 % nie kontaktiert", „9× in 5 Min.", „17–26 Std./Woche", „78 % nehmen den ersten") | keine Primärquelle | droht im Hook, nur als Frage oder Szene |
| R12 | KI-Bilder als Team, Kunde, Eigentümer ohne „AI Visual" | CLAUDE.md + Irreführung | jede Higgsfield-Einstellung kennzeichnen |
| R13 | Speed-to-Lead-Alarm „in 60 Sekunden aufs Handy" als RIEGEL-Funktion | nur geplant, Resend blockiert | nicht als live zeigen |
| R14 | „100+ Makler-Projekte" | 100+ = alle Branchen seit 2009 | `mk.hero.badge_*`, nie neben „Makler" |
| R15 | Uhrzeit-Statistiken („70 % nach Feierabend", „20:48 Uhr") als Einblendung | keine DE-Quelle | – |
| R16 | „Studie des MIT" für die 21×-Zahl | alt, B2B, 6 Firmen | höchstens „eine Studie mit über 15.000 Online-Anfragen" |
| R17 | „Der Eigentümer vergleicht abends drei Makler" | widerspricht der Datenlage (er vergleicht kaum) | VSL-EXPLAINER-v2 Problem-Block 0:17 → umschreiben |

---

## 7. Zehn Einsichten, die einen Hook tragen könnten

Jede Einsicht: Kern, Beleg, Rohling (Entwurf, nicht im Sprachprofil, nicht freigegeben), Risiko.
Grundregel aus Stimme und Werbung: **Nicht mit „KI" oder „Automatisierung" öffnen** (Nr. 52 löst
Abwehr aus). Mit dem Schmerz in Maklerworten öffnen, Technik erst im Beweisteil als Werkzeug
(„ein Tool von vielen", Nr. 53).

### E1. Der Eigentümer vergleicht nicht. Er bleibt beim Ersten.

- **Beleg:** US: Median 1 Makler, 62 % nur einen (Zillow 2025), 59 % nehmen den Ersten (HousingWire).
  DE: 94 % entscheiden im Erstgespräch, 71 % verkaufen zum ersten Mal (Forsa).
- **Rohling:** „Nicht der bessere Makler bekommt den Auftrag. Sondern der, bei dem der Eigentümer zuerst rechnet."
- **Risiko:** Als These formulieren, US-Zahl nur gekennzeichnet. **Korrigiert v2 Block 0:17.**

### E2. Sie bezahlen für einen Eigentümer, den zwei Kollegen auch bezahlt haben.

- **Beleg:** Z1–Z3 (max. 3 Makler je Anfrage, belegt auf Anbieterseiten); Zitat Nr. 33/34 „rannten wir zum Telefon".
- **Rohling:** „Der Eigentümer, für den Sie heute bezahlt haben, bekommt gerade noch zwei andere Anrufe."
- **Risiko:** „bis zu" statt „immer". Stärkster belegter Schmerz, trifft Persona 2 direkt, Persona 1 als Warnung.

### E3. Die Bewertung ist der neue Erstkontakt, und sie passiert woanders.

- **Beleg:** 42 % der bewertenden Eigentümer online (Platz 1), 51 % suchen den Makler über ImmoScout24 (Innofact 2019). Portal verkauft den Kontakt dann weiter (Abschnitt 4.5).
- **Rohling:** „Bevor ein Eigentümer Sie anruft, hat er sein Haus schon bewertet. Die Frage ist nur: bei wem."
- **Risiko:** Zahl von 2019 → „laut einer ImmoScout24-Studie".

### E4. Die Nacht: Szene statt Statistik.

- **Beleg:** Mechanik live bei RIEGEL (G1, G4, G5). Keine Uhrzeit-Statistik zulässig (R15).
- **Rohling:** „23:48. Ein Eigentümer bewertet sein Haus. Eine Minute später hat er den Report. Mit Ihrem Logo. Und Sie haben seine Nummer."
- **Risiko:** Uhrzeit als erfundene Szene, nicht als Fall labeln. Rechtlich sauberste Variante (Hook A in v2).

### E5. Die kostenlose Bewertung kostet Sie einen Arbeitstag.

- **Beleg:** 6–8 Stunden pro Wertermittlung (Prause [W]); „Der Wettbewerber hat einfach 40.000 EUR mehr versprochen." [W]
- **Rohling:** „Sechs Stunden Wertermittlung. Dann verspricht ein Kollege 40.000 Euro mehr. Und Sie hören nichts mehr."
- **Risiko:** Einzelstimmen, als Szene erzählen, nicht als Branchenzahl. Emotional am stärksten für Persona 1.

### E6. Die Hälfte der Anfragen bleibt liegen, sogar bei den Großen.

- **Beleg:** DISQ/ntv 2024: 47 % E-Mail-Anfragen unbeantwortet, 53 % Anrufe nicht durchgekommen. HBR: Antwort binnen einer Stunde ≈ 7× häufiger qualifiziert.
- **Rohling:** „In einem Test für ntv blieb jede zweite E-Mail an große Maklerhäuser unbeantwortet. Wie viele sind es bei Ihnen, wenn Sie gerade bei einer Besichtigung stehen?"
- **Risiko:** Getestet wurden Ketten. Aussage über kleine Büros = VERMUTUNG, deshalb als Frage.

### E7. Mieten statt besitzen.

- **Beleg:** Scout24 ARPU +9,5 %, Abo-Umsatz +15,4 %, EBITDA-Marge 62,3 % (2025); Makler-Zitate Nr. 19–31; Wunsch „wieder selbst und direkt" (Nr. 24). Lücke 4 im Werbemarkt.
- **Rohling:** „Was das Portal Ihnen vermietet, können Sie besitzen." / „Hören Sie auf, Kontakte zu mieten."
- **Risiko:** Portal nicht namentlich herabsetzen (vergleichende Werbung). Löst den Begriff „Portal-Niveau" auf.

### E8. Alle verkaufen den Zufluss. Niemand kümmert sich um den Mittelteil.

- **Beleg:** Werbe-Sample (Lücke 1, Muster 1–4); Funkstille-Zitate Nr. 45–47; 62,5 % der Eigentümer wollen laufend informiert werden (HAUSGOLD).
- **Rohling:** „Alle verkaufen Ihnen Anfragen. Keiner kümmert sich darum, was danach passiert." / „Wir machen keine Leads. Wir machen, dass Ihre ankommen."
- **Risiko:** Nachfass-Automatik bei RIEGEL nicht live (Ge12) → als Produktfunktion zeigen.

### E9. Einer von der anderen Tischseite.

- **Beleg:** Einwand „die verstehen unser Geschäft nicht" (Nr. 20, 75); kein Wettbewerber im Sample mit Verkäufer-Gründer (Lücke 3).
- **Rohling:** „Ich habe über 380 Wohnungen verkauft. Ich weiß, was ein Eigentümer sieht, bevor er Sie anruft."
- **Risiko:** Ge2 Freigabe nötig, „mit Partnern". Stark als zweiter Satz nach einer Szene.

### E10. Ein System, nicht fünf Tools, und es trägt Ihren Namen.

- **Beleg:** G1–G11 (Rechner, Report, Portal, Kundenkonto, Suchauftrag, Cockpit live bei RIEGEL); Lücke 7; Einwand Einarbeitung/Komplexität.
- **Rohling:** „Ein Bewertungsrechner. Ein Portal. Ein Kundenkonto. Ein Report mit Ihrem Logo. Das sind nicht vier Werkzeuge. Das ist ein System, und es gehört Ihnen."
- **Risiko:** Keine Integrationen außer onOffice als „läuft" behaupten (Ge13). Eher Abgrenzungs- als Hook-Zeile.

### Empfohlene Kombination (Vorschlag)

1. **Szene E4** als Bild (0:00–0:05) +
2. **These E1** als erster gesprochener Satz („Nicht der bessere Makler bekommt den Auftrag …") +
3. **Schmerz E2 oder E6** als Beleg mit Zahl im Problem-Block +
4. **E7/E8** als Abgrenzung, **E9** als Absender, **Ge1 (RIEGEL)** als Beweis in der Mitte, nur mit Freigabe.

---

## 8. Offene Punkte (vor dem Hook-Bau klären)

1. RIEGEL-Freigabe „9 zusätzliche Mandate in 3 Monaten": Wortlaut, Zeitraum, Definition „zusätzlich", CRM-Beleg (Ge1). Parallel: 20-Minuten-Interview mit RIEGEL („Was blieb vorher liegen?", „Wie haben Sie über Agenturen gedacht?").
2. RIEGEL-Tracking: Zeitstempel der Bewertungsanfragen (Anteil nach 18 Uhr / Wochenende) und Antwortzeit vorher/nachher. Macht E4 und E6 zu eigenen harten Belegen.
3. Aktuelle Zahlen aus `/intern` (Stand 18.08.: 37 Report-Anfragen, 46 Leads, RIEGEL `docs/naechste-schritte.md:20-23`).
4. Live-UWG-Risiken auf der Website entfernen oder belegen: R2 (`mk.stats.s2`), R3 (10 Cluster-Seiten), R8 (`mk.trust.namen`), R5 (`vsl.ts` Einwand 1).
5. Quelle für „Ø 400.000 € (Capital 09/2026)" oder „Beispiel" (R1).
6. Zwei oder vier Termine, vier oder sechs Wochen: eine Zahl (Ge5/Ge6).
7. Gebietsschutz in den Vertrag (Ge7).
8. Risiko-Umkehr ja/nein (fehlender Beweis, offene Entscheidung Nr. 2 in v2).
9. Positionierung „führende Immobilienmakler" nach Blinkwasser-Fund (Alex).
10. Manuell prüfen: [S]-Zitate am Original (Trustpilot Aroundhome/IS24/immowelt, LinkedIn Nölle), 30 Minuten in der Facebook-Gruppe MaklerDiskussion; Snapshot-Links der Top-Kampagnen (Bosbach 2349033729186849, Rang-Eins 2052061862145122, Sygo 1608456110627571, Ynfinite 1037011702716047, Immodealone 1401930525398908, IntroKi 1766310544655012); YouTube-VSL Sygo https://www.youtube.com/watch?v=b8T99iK-dy4 transkribieren.
11. Kennzahlen, die in den Film/auf die Seite kommen, als Studio-Keys anlegen (`src/lib/content.ts` bzw. `src/lib/texte/vsl.ts`), nicht hart im Code.

**Hilfsdateien:** Zillow-Report `scratchpad/zillow.pdf`, Text `scratchpad/zillow.txt`
(Session-Scratchpad `/tmp/claude-0/-home-user-beuwy-relaunch/1bdc0956-df5e-5ed5-b04e-ad607ee60a6e/scratchpad/`).

---

## 9. Hooks: Jury und Top 5

Stand 23.09.2026. Geprüft wurden 24 Hook-Kandidaten aus drei Winkeln: Traumzustand (T1–T8), Verlust (V1–V8) und Kontra (K1–K8). Die Wortlaute stehen in den Winkel-Dateien des Workflows, die Kennungen G, Ge, R und Z beziehen sich auf die Abschnitte 4 und 6.

**Die Jury:**
- **(a) Makler:** Inhaber, 52, Büro mit vier Leuten, sieht täglich Agenturwerbung.
- **(b) Texter:** Direct-Response-Texter.
- **(c) Recht:** Wettbewerbsrechtler mit Blick auf § 5 UWG (Irreführung) und § 6 UWG (vergleichende Werbung).

Skala 1–10. Die Urteile sind eine Einschätzung der Jury und keine Messung. Vor dem Dreh wird im A/B-Test gemessen, nicht nach Bauchgefühl.

### 9.1 Jury-Ergebnis

| Hook | (a) Makler | (b) Texter | (c) Recht | Σ | Status |
|---|---|---|---|---|---|
| T1 Montag, acht Uhr | 5: Zwei Bewertungen am Wochenende klingen nach jeder Agentur, die volle Postfächer malt. | 6: Sauberes Traumbild, das auflöst, bevor es eine Frage öffnet. | 6: Die Szene legt ein typisches Ergebnis nahe, haltbar nur mit Pill „Szene“ und ohne Zahl im Sprechertext. | 17 | Reserve |
| T2 Die Nacht | 7: Die Uhrzeit kenne ich, das Postfach in CC ist konkret und nachprüfbar. | 8: Starkes Bild, die Pointe liegt beim Besitz, trägt eine Buchstütze. | 8: Mechanik belegt (G1, G4), „eine Minute später“ vor dem Dreh messen. | 23 | geht in Top 1 ein |
| T3 Der Anruf | 4: Ein erfundener Eigentümer, der mich anruft, ist genau die Werbung, die ich wegklicke. | 5: Eine fiktive Kundenstimme wirkt gestellt. | 4: Ein erfundenes Eigentümer-Zitat wird trotz Pill leicht als echte Kundenstimme verstanden. | 13 | **gestrichen (Recht)** |
| T4 Er kennt Sie schon | 6: Dass mich jemand googelt und auf meiner Seite landet, setzt Sichtbarkeit voraus, die ich heute nicht habe. | 7: Guter Perspektivwechsel, „Das Erstgespräch hat gestern Abend angefangen“ ist eine starke Zeile. | 5: Legt ein Google-Ranking nahe, G11 erlaubt nur das Bauziel. | 18 | Reserve (Zeile für den Problem-Block) |
| T5 Der Küchentisch | 6: Den Report auf dem Tisch mag ich, „Wann fangen wir an?“ ist Wunschdenken. | 6: Schöne Szene, aber das Ergebnis im Hook nimmt die Spannung. | 5: Legt den Alleinauftrag als Wirkung nahe, ein Ergebnisversprechen durch die Hintertür (Nähe zu R5). | 17 | Reserve (Bild für die Auflösung von Top 3) |
| T6 Eine Nummer, ein Makler | 7: „Kein Kollege hat dafür bezahlt“ trifft meinen Ärger über geteilte Anfragen. | 6: Richtiger Schmerz, aber die Lösung kommt vor dem Problem. | 7: Stimmt für den eigenen Rechner, Portal nicht nennen. | 20 | geht in Top 2 ein (Lösungsbild) |
| T7 Freitag, kurz vor sechs | 5: Feierabend um sechs ist nett, bringt mir aber keinen Auftrag. | 5: „Ihr Portal“ kollidiert mit dem Wort, das der Makler für ImmoScout benutzt. | 7: G6 ist belegt, keine Matching-Mails als laufend zeigen. | 17 | Reserve |
| T8 Gehört Ihnen | 6: Der Besitzgedanke gefällt mir, aber ich frage sofort, was nach der Kündigung passiert. | 6: Gute Schlusszeile, der Mittelteil ist zu abstrakt. | 3: „Auch nach Vertragsende“ ist unbelegt (VERMUTUNG), „keiner kann sie weitergeben“ zielt herabsetzend auf die Portale. | 15 | **gestrichen (Recht)** |
| V1 Die geteilte Anfrage | 8: Genau das erlebe ich, und dass es auf der Portalseite steht, macht es unangreifbar. | 7: Stark, aber rein negativ und ohne Gegenbild. | 8: Belegt durch Z1–Z3, „bis zu“ und „vielleicht“ tragen. | 23 | geht in Top 2 ein |
| V2 Die Bewertung passiert woanders | 6: Eine ImmoScout-Studie von 2019, ausgerechnet. | 6: Zahl plus rhetorische Frage, etwas papieren. | 6: Das Jahr muss gesprochen werden, „hinterlässt seine Nummer“ ist VERMUTUNG. | 18 | Reserve (Problem-Block) |
| V3 Der Erste führt das Gespräch | 4: „In den USA“, da schalte ich ab. | 5: Öffnet mit einer Einschränkung und verschenkt die ersten drei Sekunden. | 8: Ehrlich gekennzeichnet. | 17 | Reserve (Ersatz für R17 im Problem-Block) |
| V4 Der verlorene Arbeitstag | 9: Das ist mein Dienstag, und die 40.000 habe ich selbst erlebt. | 8: Konkrete Zahl, konkrete Kränkung, drei Schläge. | 7: Einzelstimmen, als solche markiert. | 24 | geht in Top 3 ein |
| V5 Jede zweite E-Mail bleibt liegen | 6: Bei den Großen ja, bei mir nicht, denke ich zuerst. | 7: Gute Zahl, die Schlussfrage wird persönlich. | 8: Korrekt auf große Maklerhäuser eingegrenzt. | 21 | geht in Top 4 ein |
| V6 Gemietet, nicht besessen | 7: Die Portalrechnung ärgert mich jedes Jahr. | 6: Umsatzzahl eines Konzerns ist im Hook zu weit weg. | 2: Nennt Scout24 beim Namen (§ 6 UWG), „bleiben sie dort“ ist eine ungeprüfte Vermutung zu den AGB. | 15 | **gestrichen (Recht)** |
| V7 Funkstille nach dem Termin | 8: Tut weh, weil es stimmt. | 7: Die Stille funktioniert, das Schluss-„Sie?“ klingt nach Vorwurf. | 6: Weckt die Erwartung an eine Nachfass-Automatik, die bei RIEGEL noch nicht läuft (Ge12). | 21 | geht in Top 5 ein |
| V8 Sonntagabend, Ihre Straße | 8: Das ist der Moment, den ich nie zu sehen bekomme, und die Logofrage trifft. | 9: Szene, Frage, Besitz: eine offene Schleife in 30 Wörtern. | 8: Reine Szene, Mechanik belegt (G1, G4). | 25 | geht in Top 1 ein |
| K1 „Keine einzige Anfrage“ | 7: Endlich einer, der mir keine Anfragen verspricht, da höre ich zu. | 8: Echter Pattern-Interrupt nach dem Avis-Muster. | 6: 47 % sind „fast jede zweite“, außerdem widerspricht der Satz der live stehenden Zeile R2 („3× mehr Anfragen“). | 21 | geht in Top 4 ein |
| K2 „Einer, nicht drei“ | 5: „Sie denken“ unterstellt mir etwas, und dann kommen die USA. | 6: Der Zahlensturz 3 → 1 ist stark, aber die Zahl ist fremd. | 7: US-Kennzeichnung Pflicht. | 18 | Reserve (Ersatz für R17 im Problem-Block) |
| K3 „Steht beim Portal selbst“ | 8: Das lese ich nach, und es stimmt. | 7: Glaubwürdig durch die fremde Quelle. | 5: Das wörtliche Zitat macht ImmoScout24 erkennbar (§ 6 UWG), „die Sie heute bezahlt haben“ passt nicht zu jedem Portalmodell. | 20 | geht in Top 2 ein, ohne Wortzitat |
| K4 „Die kostenlose Wertermittlung“ | 9: Der Satz „kostet Sie einen Arbeitstag“ hätte von mir sein können. | 8: Paradox im ersten Satz, danach Beleg und Kränkung. | 7: Einzelstimme, „rechnet ein Makler vor“ grenzt sauber ein. | 24 | geht in Top 3 ein |
| K5 „Der IVD hat recht“ | 6: Der IVD in einer Agenturwerbung macht mich misstrauisch. | 7: Den Einwand aufzugreifen ist klug. | 3: Inszeniert Verband und Präsidenten ohne Einwilligung als Zustimmende, das Zitat stammt von Wohltorf und nicht „vom IVD“. | 16 | **gestrichen (Recht)** |
| K6 „Behalten Sie Ihr Portal“ | 8: Keiner sagt mir, ich soll kündigen, das entspannt. | 8: Stärkster Kontra-Einstieg, die Pointe heißt „Bei Ihnen“. | 7: Technische Aussage, kein Auftragsversprechen. | 23 | geht in Top 2 ein |
| K7 „Wir bauen Websites. Trotzdem.“ | 6: Ehrlich, aber eine Website habe ich schon. | 6: Zwei Ideen in einem Hook. | 8: Meinung, klar als solche erkennbar. | 20 | Reserve |
| K8 „Ich bin kein Makler“ | 6: Neubau über Instagram ist nicht mein Bestandsgeschäft, aber die andere Tischseite interessiert mich. | 7: Einziger Absender-Hook ohne Doppelgänger im Markt (Lücke 3). | 4: Ge2 ist unbestätigt, ohne schriftliche Bestätigung droht Irreführung über die Qualifikation. | 17 | **gesperrt bis Ge2**, danach Absender-Satz direkt nach dem Hook |

**Gestrichen wegen Rechtsrisiko:** T3, T8, V6, K5. K8 ist zurückgestellt, bis Alex Ge2 schriftlich bestätigt.

**Befund der Jury:**
- Der Makler reagiert am stärksten auf eigene Kränkungen: die Wertermittlung, die geteilte Anfrage, die Funkstille.
- Schwach wirken Traumbilder und Zahlen aus den USA. Beim Traumzustand lautet der Reflex „Das sagt jede Agentur“.
- Deshalb öffnen alle fünf Endfassungen mit Verlust oder Kontra. Der Traumzustand (T2, T6) kommt als Umschlag ab 0:12.

### 9.2 Top 5 (Endfassungen)

Für alle fünf gilt:
- Sprechertext höchstens 30 Wörter, ruhig und trocken, Sie-Form.
- Kein „Lead“, kein Einstieg mit „KI“, kein „exklusiv“, kein „Nicht X. Sondern Y.“, keine Gedankenstriche, keine Superlative.
- Uhrzeiten sind Kulisse (R15, Ge20). Jede nachgestellte oder KI-Einstellung trägt die Pill „AI Visual“ oder „Szene“, Demo-Daten tragen „Beispieldaten“.
- Einblendtexte kommen als Studio-Keys in `src/lib/texte/vsl.ts`.

#### Rang 1: „Sonntagabend, 23:48“ (aus V8 + T2)

> Sonntagabend, 23:48. Ein Eigentümer aus Ihrer Straße bewertet sein Haus online. Eine Minute später hat er den Report. Welches Logo steht darauf? Und wer hat morgen früh seine Nummer?

*29 Wörter, gesprochen etwa 13 s.*

- **Einblendung:** „23:48“, dann „Wessen Logo?“. Bei 0:12 füllt sich das Logofeld mit dem Maklerlogo, darunter „Ihres.“ (Umschlag in die Lösung).
- **Bild:**
  1. Dunkles Wohnzimmer, das einzige Licht kommt vom Laptop, kein Gesicht (AI Visual).
  2. Harter Schnitt auf Weiß. Im echten Rechner wird eine Adresse getippt (Beispieldaten).
  3. „23:49“ rollt ein, das Report-PDF fächert auf, das Logofeld ist leer und gelb umrandet.
  4. Weckerdisplay „Mo 07:30“.
- **Beleg:**
  - Rechner live (G1): https://riegel-immobilien.de/rechner
  - Report mit Logo, automatisch an Eigentümer und Makler (G4), Luftbild (G5, Esri/Maxar klein angeben).
  - Online bewerten ist der häufigste Weg: Z6 (ImmoScout24/Innofact 2019), https://www.immobilienscout24.de/unternehmen/news-medien/news/default-title/der-immobilienmakler-ist-fuer-die-mehrheit-der-eigentuemer-trotz-bestellerprinzip-oder-split-regelung-unverzichtbar/ (gehört in den Problem-Block, nicht in den Hook).
- **Warum Rang 1:**
  - Höchste Jury-Summe (V8: 25).
  - Zeigt den Moment, den der Makler nie sieht (Lücke 2, Blick des Eigentümers), und behauptet dabei nichts, was nicht im Bild prüfbar ist.
  - Die offene Frage „Wessen Logo?“ führt direkt ins Produkt.
  - Rechtlich die sauberste Fassung.
- **Offene Frage an Alex:**
  - Kommt der Report tatsächlich binnen einer Minute an? Bitte einmal live messen, sonst „Minuten später“.
  - Darf der beuwy-Film die RIEGEL-Oberfläche mit RIEGEL-Logo zeigen, oder bauen wir ein neutrales Demo-Logo?

#### Rang 2: „Behalten Sie Ihr Portal“ (aus K6 + V1 + K3, Lösungsbild aus T6)

> Behalten Sie Ihr Portal. Wirklich. Sucht ein Eigentümer dort einen Makler, kann seine Anfrage an bis zu drei Büros gehen. Wer auf Ihrer Seite rechnet, landet bei einem. Bei Ihnen.

*30 Wörter.*

- **Einblendung:**
  - „Eine Anfrage. Bis zu drei Büros.“
  - Dann: „Ihr Rechner. Ihre Anfrage.“
  - Fußzeile: „Laut Anbieterangaben großer Portale, Stand 09/2026“.
- **Bild:** Split in einem einzigen Frame. Links verzweigt sich ein Punkt in drei Linien zu drei Bürosymbolen, zwei davon verblassen grau. Rechts führt eine gelbe Linie vom Rechner ins Cockpit, dort steht der Maklername groß (G10, Beispieldaten). Kein Portal-Logo, kein Portalname im Bild.
- **Beleg:**
  - ImmoScout24 „an maximal 3 Makler:innen“: https://www.immobilienscout24.de/anbieten/gewerbliche-anbieter/inserieren/weitere-produkte/maklersuchmaschine.html
  - immowelt „bis zu 3 Makler pro PLZ-Gebiet“: https://www.immowelt.de/immobilienprofis/leads
  - Aroundhome „maximal zwei Mitbewerbende“: https://www.aroundhome.de/partner-werden/immobilienverkauf/
  - Makler-Stimme „rannten wir zum Telefon“ [W]: https://neue.immo/leads-kaufen/
  - Die vollständigen Quellen stehen als Fußnote auf /system und nicht im Film (§ 6 UWG).
- **Warum Rang 2:**
  - Trifft Schmerz Rang 1 mit dem härtesten Beleg, den der Makler selbst beim Anbieter nachlesen kann.
  - Der Einstieg widerspricht dem erwarteten Agenturrat „kündigen Sie“, die Pointe liefert den Besitz (E7) ohne Abwertung der Portale.
  - Stärkster Kandidat für Persona 2 und für den A/B-Test gegen Rang 1.
- **Offene Frage an Alex:** Steht im Vertrag, dass Anfragen aus dem Rechner nur beim Makler landen, dass beuwy sie nicht weiterverwertet und dass sie nach Vertragsende beim Makler bleiben? Ohne diese Klausel ist „landet bei einem“ nur technisch gedeckt, der Besitzgedanke dahinter nicht.

#### Rang 3: „Die kostenlose Wertermittlung“ (aus K4 + V4, Auflösung mit Bild aus T5)

> Ihre kostenlose Wertermittlung kostet Sie einen Arbeitstag. Sechs bis acht Stunden, rechnet ein Makler vor. Dann verspricht ein Kollege 40.000 Euro mehr. Danach: Funkstille.

*24 Wörter.*

- **Einblendung:** „kostenlos“ groß, das „los“ wird gelb markiert und fällt weg. Dann „6 bis 8 Stunden.“ und am Ende „Funkstille.“
- **Bild:**
  1. Kalender-Tagesansicht, ein gelber Block „Wertermittlung“ wächst von 9 bis 17 Uhr.
  2. Bei „40.000 Euro mehr“ fällt eine einzige Zahl ins Bild (Szene).
  3. Leerer Chatverlauf mit „Gelesen“.
  4. Umschlag ab 0:12: Der Report liegt schon auf dem Küchentisch, bevor der Makler klingelt (T5, AI Visual), ohne „Wann fangen wir an?“.
- **Beleg:**
  - Sechs bis acht Stunden [W], Marcus Prause: https://www.immoprause.de/alltag-als-makler
  - „Der Wettbewerber hat einfach 40.000 EUR mehr versprochen.“ und „Funkstille!“ [W]: https://www.immobilien-profi.de/40-000-eur-zu-viel-versprochen-und-dann-funkstille/
  - Beides sind Einzelstimmen, keine Branchenzahlen. Vor dem Dreh am Original gegenlesen.
- **Warum Rang 3:**
  - Höchste Makler-Wertung (9): Der erste Satz ist ein Paradox in der Sprache des Maklers.
  - Trifft Persona 1 (Kernzielgruppe) emotional am tiefsten.
  - Mit 24 Wörtern der kürzeste Kandidat, also Raum für Pausen.
  - Ein Platz hinter Rang 2, weil der Beleg eine Einzelstimme ist.
- **Offene Frage an Alex:**
  - Gibt es von RIEGEL eine eigene Zahl, wie lange eine Wertermittlung dauert, vorher und seit es den Report gibt? Dann ersetzt sie die Fremdstimme und wird zum stärksten Beweis im Film.
  - Soll Prause als Quelle namentlich genannt werden, oder nur in der Fußnote auf /system?

#### Rang 4: „Ich verspreche keine“ (aus K1 + V5)

> Man hat Ihnen oft mehr Anfragen versprochen. Ich verspreche keine. Im Test für ntv blieb fast jede zweite E-Mail an große Maklerhäuser unbeantwortet. Das Problem beginnt nach der Anfrage.

*29 Wörter.*

- **Einblendung:**
  - „Mehr Anfragen.“, von einem gelben Highlighter durchgestrichen.
  - Dann „47 % unbeantwortet.“
  - Quellzeile: „DISQ-Test für ntv, 2024, 10 bundesweite Maklerunternehmen“.
- **Bild:** Weißer Grund, „Mehr Anfragen.“ in Helvena sehr groß. Nach dem Strich folgt ein Schnitt auf einen echten Posteingang (Beispieldaten), dessen Zähler „ungelesen“ hochläuft. Die Kamera zoomt auf eine einzige ungeöffnete Mail.
- **Beleg:**
  - DISQ/ntv 2024 (Z4, G20), 47 % der E-Mail-Anfragen unbeantwortet: https://disq.de/2024/20240221-immobilienmakler.html
  - Ergänzend DISQ 2026: https://disq.de/2026/20260224-immobilienmakler.html
- **Warum Rang 4:**
  - Der stärkste Pattern-Interrupt im Feld, weil Makler abgestumpft sind gegen „mehr Anfragen“ (5.2).
  - Besetzt die größte Marktlücke „was nach der Anfrage passiert“ (E8).
  - Nur Rang 4, weil sich der kleine Makler von „große Maklerhäuser“ distanzieren kann und weil der Hook heute der eigenen Website widerspricht.
- **Offene Frage an Alex:**
  - Wird R2 („3× mehr Anfragen“, live in `src/lib/content.ts:242-243`) vor dem Launch entfernt? Sonst entlarvt der erste Klick den Hook.
  - Spricht Alex das „Ich“ selbst vor der Kamera?

#### Rang 5: „Funkstille“ (aus V7)

> Der Bewertungstermin lief gut. Seitdem kein Rückruf, keine Antwort auf Ihre Mail. Der Eigentümer denkt in dieser Zeit weiter nach. Nur: mit wessen Unterlagen auf dem Tisch?

*27 Wörter.*

- **Einblendung:** „Funkstille.“
- **Bild:**
  1. Mailverlauf in echter UI, letzte Nachricht vom Makler „Vielen Dank für den Termin“.
  2. Die Datumszeile zählt Montag, Dienstag, Mittwoch hoch, ohne neue Nachricht.
  3. Am Ende blinkt nur der gelbe Cursor im leeren Antwortfeld.
- **Beleg:**
  - „Kein Rückruf. Keine Antwort auf die E-Mail.“ [W]: https://www.immoprause.de/alltag-als-makler
  - „Das Problem ist, was danach passiert: Funkstille!“ [W]: https://www.immobilien-profi.de/40-000-eur-zu-viel-versprochen-und-dann-funkstille/
  - „Denkt weiter nach“ ist eine These ohne Zahl.
- **Warum Rang 5:**
  - Schmerz Rang 4 in der Sprache des Maklers, Lücke 1 im Werbemarkt.
  - Der neue Schluss ersetzt das vorwurfsvolle „Sie?“ durch eine Frage, die den Makler nicht angreift.
  - Nur Rang 5, weil die Auflösung (Nachfass-Automatik) heute nicht live belegt ist (Ge12).
- **Offene Frage an Alex:**
  - Läuft die Nachfass-Automatik bis zum Dreh einmal echt, bei RIEGEL oder einem zweiten Kunden?
  - Was schickt sie konkret, zum Beispiel Marktbericht, Vergleichsobjekte oder den aktualisierten Report?
  - Ohne das bleibt der Hook in der Schublade.

### 9.3 Einsatz und Reserve

- **Testplan:** Rang 1 gegen Rang 2 als Film-Einstieg auf /system und als 15-s-Anzeigen. Ränge 3 bis 5 laufen als Schnittvarianten für Social.
- **Problem-Block 0:17:** R17 („vergleicht abends drei Makler“) wird ersetzt durch K2/V3, mit US-Kennzeichnung und dem Satz „Für Deutschland zählt das niemand.“ Dazu Forsa 94 % als DE-Indiz (https://www.immobilienmanager.de/die-erwartungen-von-immobilieneigentuemern-an-makler-04092020).
- **Absender direkt nach dem Hook:** K8 („Ich saß auf der Verkäuferseite …“), sobald Ge2 schriftlich vorliegt.
- **Beweis in der Filmmitte:** RIEGEL „+9 Mandate“ nur mit Ge1 und Ge16, in keinem Hook.
- **Gestrichen:** T3, T8, V6 und K5 werden auch in abgewandelter Form nicht wiederverwendet.
