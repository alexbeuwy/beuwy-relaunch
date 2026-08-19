# GATES — Runde 2: Recherche vertiefen, mehrere Stränge gleichzeitig, Border Beam

- [x] G1 RIEGEL: Exposé-Aufrufe über das ImmoScout24-Profil belegt
  CHECK: cd /home/user/beuwy-relaunch && grep -c "immobilienscout24" src/lib/kunden-kurven.ts
  EXPECT: /^[1-9]/
  EVIDENCE: 1
  ABANDON: G1-Archiv Historische Staende ueber web.archive.org nicht beschaffbar. archive.org setzt die Verbindung aus diesem Container zurueck (24 Versuche mit 55s Abstand, alle http=000; die Wayback-JSON-API antwortet mit 429). Der Proxy ist nicht die Ursache — web.archive.org taucht in seiner Ablehnungsliste nicht auf, im Gegensatz zu vision.de und timetravel.mementoweb.org. ImmoScout24 selbst sperrt Bots (401). Der heutige Stand ist ueber den Screenshot von Alex belegt; die historischen Werte muessen von einem Rechner mit Wohnanschluss geholt werden.

- [x] G2 RIEGEL-Metrik korrekt: Aufrufe der letzten 6 Monate, nicht pro Monat
  CHECK: cd /home/user/beuwy-relaunch && grep -c "pro Monat" src/lib/kunden-kurven.ts
  EXPECT: /^0\s*$/
  EVIDENCE: 0

- [x] G3 Königswege: mindestens ein weiterer datierter Zwischenstand gefunden
  CHECK: cd /home/user/beuwy-relaunch && sed -n '/id: "partner"/,/herkunft/p' src/lib/kunden-kurven.ts | grep -c "{ zeit:"
  EXPECT: /^[5-9]\s*$/
  EVIDENCE: 5

- [x] G4 Vision: Projektstart 2018 auf der Zeitachse, kein Platzhalter-Label
  CHECK: cd /home/user/beuwy-relaunch && grep -c 'zeit: "Projektstart"' src/lib/kunden-kurven.ts
  EXPECT: /^0\s*$/
  EVIDENCE: 0

- [ ] G5 Mehrere Straenge je Kunde, wo die Datenlage es hergibt
  CHECK: grep -c "^        id: " src/lib/kunden-kurven.ts
  EXPECT: /^5\s*$/
  EVIDENCE: pending
  ABANDON: G5-Vision Vision bekommt nur einen Strang. Wohneinheiten (1.400), das KKR-Volumen (160 Mio. €) und die Dingolfing-Transaktion (163 Einheiten) sind Einzelstaende zu je einem Zeitpunkt, keine Reihe. Ein zweiter Strang waere nur mit erfundenen Zwischenwerten zu bauen.

- [x] G6 Alle Stränge gleichzeitig sichtbar, der aktive voll, die anderen dezent
  CHECK: cd /home/user/beuwy-relaunch && grep -c "kz-neben" src/app/globals.css
  EXPECT: /^[1-9]/
  EVIDENCE: 4

- [x] G7 Border Beam installiert und um die Dashboard-Karte gelegt
  CHECK: cd /home/user/beuwy-relaunch && grep -c "border-beam" package.json
  EXPECT: /^1\s*$/
  EVIDENCE: 1

- [x] G8 KEINE erfundenen Datenpunkte — jeder Strang traegt Herkunft und Quelle
  CHECK: cd /home/user/beuwy-relaunch && grep -c "quelle:" src/lib/kunden-kurven.ts
  EXPECT: /^([6-9]|[1-9][0-9])\s*$/
  EVIDENCE: 6

- [x] G9 Build gruen
  CHECK: cd /home/user/beuwy-relaunch && npm run build > /tmp/g9.log 2>&1; echo $?
  EXPECT: /^0\s*$/
  EVIDENCE: 0

- [ ] G10 Screenshots 1440 + 390, keine Konsolen- und keine 4xx-Fehler
  EVIDENCE: kz-d-1/1b/2/3.png (1440) und kz-m-*.png (390), je Kunde und je Strang. Der Puppeteer-Lauf sammelt pageerror und Antworten >=400; beide Laeufe melden "fehler: keine".

- [ ] G11 Gepusht
  CHECK: cd /home/user/beuwy-relaunch && git status --porcelain | wc -l
  EXPECT: /^0\s*$/
  EVIDENCE: pending
