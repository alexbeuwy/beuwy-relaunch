# GATES — Kennzahlen-Dashboard auf High-End ziehen

- [x] G1 Logos aller drei Kunden liegen als Datei im Repo und stehen auf den Schaltern
  CHECK: ls public/kunden/ | wc -l
  EXPECT: /^3\s*$/
  EVIDENCE: 3

- [x] G2 Vision-Daten sagen "Peak 2022", nirgends mehr "heute" — auch in der Fallstudie nicht
  CHECK: cd /home/user/beuwy-relaunch && grep -c "heute ist KKR ihr Partner" src/lib/cases.ts
  EXPECT: /^0\s*$/
  EVIDENCE: 0

- [x] G3 Mehrere Datenstränge je Kunde, im Diagramm umschaltbar
  CHECK: cd /home/user/beuwy-relaunch && grep -c "^    straenge: \[" src/lib/kunden-kurven.ts
  EXPECT: /^3\s*$/
  EVIDENCE: 3

- [x] G4 RIEGEL läuft über Exposé-Aufrufe, nicht nur über Abschlussvolumen
  CHECK: cd /home/user/beuwy-relaunch && grep -c "Exposé-Aufrufe" src/lib/kunden-kurven.ts
  EXPECT: /^[1-9]/
  EVIDENCE: 2

- [x] G5 Dot-Grid und Glow sind im Diagramm umgesetzt
  CHECK: cd /home/user/beuwy-relaunch && grep -cE "kz-punktraster|kz-glow" src/app/globals.css
  EXPECT: /^[2-9]|^[1-9][0-9]/
  EVIDENCE: 2

- [x] G6 Slow-Reveal beim Scroll-Eintritt, mit prefers-reduced-motion-Ausnahme
  CHECK: cd /home/user/beuwy-relaunch && cat src/components/KennzahlenStudio.tsx src/app/globals.css | grep -c "prefers-reduced-motion"
  EXPECT: /^([2-9]|[1-9][0-9])/
  EVIDENCE: 12

- [x] G7 KEINE erfundenen Datenpunkte — jeder Strang trägt seine Herkunft
  CHECK: cd /home/user/beuwy-relaunch && grep -c 'herkunft: "' src/lib/kunden-kurven.ts
  EXPECT: /^[9-9]|^[1-9][0-9]/
  EVIDENCE: 14

- [x] G8 Build grün
  CHECK: cd /home/user/beuwy-relaunch && npm run build > /tmp/g8.log 2>&1; echo $?
  EXPECT: /^0\s*$/
  EVIDENCE: 0

- [x] G9 Screenshots 1440 + 390 vom Endstand, keine Konsolen- und keine 4xx-Fehler
  EVIDENCE: kz-d-1/2/3/3b.png (1440) und kz-m-1/2/3/3b.png (390), je Kunde und je Strang. Der Puppeteer-Lauf sammelt pageerror und Antworten >=400; beide Laeufe melden "fehler: keine".

- [x] G10 Gepusht
  CHECK: cd /home/user/beuwy-relaunch && git status --porcelain | wc -l
  EXPECT: /^0\s*$/
  EVIDENCE: 0

- [x] G11 Königswege-Zwischenstand recherchiert und datiert belegt
  CHECK: cd /home/user/beuwy-relaunch && grep -c "04.08.2022" src/lib/kunden-kurven.ts
  EXPECT: /^2\s*$/
  EVIDENCE: 2
