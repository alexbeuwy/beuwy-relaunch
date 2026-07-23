# Assets & BunnyCDN

## Woher die Bilder kommen

**Aktuell (Proof-Sektion):** echte Live-Screenshots der Referenzseiten, vom
Website-Check-Tool auf Vercel geschossen, in `public/proof/` (`riegel.jpg`,
`saadi.jpg`). Ehrlich, relevant, hochwertig — dienen als gerahmte Plates.

**Zukünftig (High-End-Assets):** Alexander lädt generierte Assets in den
BunnyCDN-Storage `beuwy-website` (Region Frankfurt/DE). Die öffentliche
Auslieferung läuft über die Pull-Zone.

## Ablauf, sobald Assets da sind

1. Alexander lädt Assets in den Storage (`storage.bunnycdn.com` → Zone
   `beuwy-website`). Zugangsdaten liegen NICHT im Repo — nur lokal im
   Session-Scratchpad (`.bunny-env`), und der Schreibschlüssel gehört
   rotiert, sobald der Asset-Workflow steht (er stand einmal im Chat).
2. **Pull-Zone:** `https://beuwy-2.b-cdn.net/` (Storage-Zone
   `beuwy-website`, Frankfurt/DE) — als remotePattern eingetragen,
   Zugriff verifiziert.

## Platziert (23.07.)

- **Founder-Portrait** (`studio/…brown_studio_4-cmpr-1600.webp`): Sektion 05
  „Wer baut" als licht-modellierte Plate (4:5, Rim-Light, Glare-Hover),
  Fakten-Zeilen links als Ledger. Alternative liegt in `studio/ai/`
  (founder-portrait, Golden-Hour) — auf Zuruf tauschbar.
- **Kunden-Logo-Rail** (Vision, Königswege, acta, PURELEI, Getsafe, GK):
  Proof-Sektion, cream-monochrom via CSS-Filter (Palette-Disziplin),
  Opacity 0.42 → 0.85 bei Hover; Quellen-Zeile mit Zahlen bleibt darunter.
- **Logo 2026**: war bereits als Inline-SVG in `Logo.tsx` integriert —
  identisch mit den CDN-Dateien (`creamwhite` = #FFFDF3, `dark_red` =
  #3A0808 für gelbe Flächen, falls gebraucht).
3. Einbindung: für optimierte Auslieferung `next/image` mit
   `remotePatterns` in `next.config.mjs` (Host = Pull-Zone). Dann werden die
   High-End-Assets an den passenden Stellen platziert:
   - Hero: großes licht-modelliertes Objekt/Render als Bühnen-Anker
     (dark-luxe will Bildmasse in den ersten zwei Sektionen).
   - Proof: echte Case-Renders statt/neben den Live-Screenshots.
   - System/Prozess: erklärende Diagramme oder Objekt-Crops.

## Design-Prinzip beim Platzieren

Assets werden nach `docs/DESIGN-DIRECTION.md` + dark-luxe-Rezepten gesetzt:
gerahmte Plates mit Rim-Light-Kante, Glare-Sweep beim Hover, cinematic Crops
(≈1.9:1), Screenshot-/Objekt-Reveal per clip-path. Kein generischer Stock,
keine Deko-Blobs — jedes Bild trägt eine Aufgabe.
