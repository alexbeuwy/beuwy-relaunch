# GEO-Strategie — R2-7

Kompaktnotiz zum GEO/SEO-Paket (BRIEF §9, Gate `docs/redesign/gates/R2-7.md`).

## G4 — Beantwortet jede Seite ihre Suchfrage im ersten Absatz? (Stichprobe 4)

- **`/leadgenerierung-immobilienmakler`**: H1 „Leadgenerierung für
  Immobilienmakler — Eigentümer, keine Adressen." Erster Absatz:
  „Lead-Portale verkaufen denselben Kontakt an mehrere Makler
  zeitgleich. Unser System sorgt dafür, dass Eigentümer Sie finden,
  bevor sie beim Portal ankommen." Zitierfähig, direkte Antwort.
- **`/bottimmo-alternative`**: Hero-Sub „BOTTIMMO baut ein bewährtes
  Marketing-Paket für den Einstieg. Wer schon zu den führenden Häusern
  seiner Stadt zählt, braucht mehr als das Paket, das auch der
  Mitbewerber zwei Straßen weiter nutzt." Ordnet fair ein, dann Abgrenzung.
- **`/ki-fuer-immobilienmakler`** (R2-3, während dieses Leafs fertig
  geworden): „KI für Immobilienmakler heißt nicht, mit ChatGPT, Claude,
  Kimi oder DeepSeek herumzuprobieren, bis ein brauchbarer Text steht."
  Keyword wörtlich, Unterschied (System statt Prompt) sofort benannt.
- **`/immobilienmarketing-agentur`** (R2-4): H1 „Immobilienmarketing
  Agentur gesucht? Führende Makler wählen anders." Erster Absatz: „Eine
  Immobilienmarketing-Agentur liefert Kampagnen und ein neues Design.
  Wer schon zu den führenden Häusern seiner Stadt zählt, will mehr:
  eine Analyse zuerst." Trifft die Suchintention direkt.

Alle vier bestehen G4. `/marketing-bautraeger` und
`/marketing-immobilienvertrieb` (Alex' Nachtrag 26.08) sind ebenfalls
während dieses Leafs fertig geworden und folgen sichtbar demselben
Muster (Stichprobe: „Marketing für Immobilienvertriebe heißt:
Interessenten registrieren sich über ein eigenes Portal …" im ersten
Absatz) — beide waren aber nicht Teil der offiziellen 4er-Stichprobe.

## Snippet-Formate — wo was liegt

- **FAQPage-JSON-LD**: inline auf allen 5 R2-Seiten
  (`/ki-fuer-immobilienmakler`, `/immobilienmarketing-agentur`,
  `/marketing-projektentwickler`, `/marketing-bautraeger`,
  `/marketing-immobilienvertrieb`) sowie `/onoffice-website`,
  `/website-fuer-immobilienmakler`, `/leadgenerierung-immobilienmakler`
  (je eigener Block, von den jeweiligen Leaves gebaut). Die drei
  Cluster-Seiten haben FAQ-Text, aber kein Schema — Lücke, siehe unten.
- **Organization/ProfessionalService-JSON-LD**: global im Layout
  (`OrganisationLd`, dieses Leaf).
- **Vergleichstabellen**: `/maklerwebsite-kosten` (4 Preisstufen),
  `/maklersoftware-vergleich` (CRM-Vergleich), `/bottimmo-alternative`
  (4-Zeilen-Gegenüberstellung), `/immobilienmarketing-agentur`
  (Briefing/Analyse, Abrechnung nach Aufwand/Diagnose) — starke
  Kandidaten für „X vs. Y"-Suchen und AI-Übersichten.
- **llms.txt**: Vollausbau mit H2-Gliederung (Positionierung,
  Leistungen, Seiten, Referenzen, Vergleich BOTTIMMO, Kosten-Spannen,
  Kontakt), jede Zeile einzeln zitierfähig, keine erfundenen Zahlen.

## Nächste Schritte für Alex (Empfehlung, keine Behauptung)

1. FAQPage-JSON-LD auf den drei Cluster-Seiten nachziehen — FAQ-Inhalte
   stehen schon da, nur das Schema fehlt.
2. Google Business Profile + Branchenverzeichnisse für „beuwy" und
   „Alexander Pütter" (Ludwigshafen) anlegen — NAP-Konsistenz stützt
   das ProfessionalService-Schema, ohne Bewertungen zu erfinden.
3. Fachbeiträge/Gastbeiträge in Maklerkreisen (Verbandsmagazine,
   onOffice-Partnerverzeichnis, IVD-Umfeld) — der stärkste Hebel für
   Platz-1-Snippets ist eine Erwähnung aus themennaher Quelle.
4. onOffice-Partnerstatus final machen (BRIEF §8): erst danach darf die
   Formulierung auf Partnerschaft wechseln.
5. Wortmarken-Freigaben einholen (ENGEL & VÖLKERS, VON POLL, DAHLER &
   COMPANY etc.) — sobald belastbar, als Case-Erwähnung ins Schema.
6. Bewertungsprofile erst anlegen, wenn echte Bewertungen vorliegen,
   dann `AggregateRating` ergänzen. Bis dahin bewusst leer lassen.

## Bekannte Lücken

- `ServiceLd` aus `SchemaOrg.tsx` ist gebaut, aber in keiner
  Leistungsseite verdrahtet — das ist Sache der jeweiligen `page.tsx`
  und außerhalb der Dateiliste dieses Leafs.
- Die drei Cluster-Seiten haben noch kein FAQPage-Schema (siehe oben).
