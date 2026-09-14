# Gates R2-O — Orchestrator-Kern
- [x] G1 Hero: H1 kleiner, "System" statt "Marketing", Zielgruppen-Rotation (SSR zeigt Maklern, reduced-motion statisch)
      CHECK: grep -c "System hinter" src/lib/content.ts && grep -c "RotationsWort" src/components/MaklerHero.tsx
      EXPECT: je >=1 · EVIDENCE: je 1. H1 clamp 34/4.2vw/58 (vorher 40/4.8/68),
      Titel "Das System hinter Deutschlands *besten*" + RotationsWort
      (Maklern|Projektentwicklern|Bautraegern|Kapitalanlage-Vertrieben,
      Punkt im rotierenden Element gegen Reflow, sr-only-Liste, reduced-
      motion statisch). Zusatz (Alex): Floating Card als Glas-Karte mit
      Beam-Kontur (14s conic, Ausnahme wie Stempel-40s) + 7s-Schweben,
      Position obere Videokante -64px in den Fade, Clip-Rahmen intern.
- [x] G2 VslSlot: bewegter Platzhalter (Portrait-Video, laedt erst im Viewport), Poster-Fallback
      CHECK: grep -c "PORTRAIT_VIDEO" src/components/VslSlot.tsx
      EXPECT: >=1 · EVIDENCE: 2 Treffer (Import+Verwendung). IO mit
      rootMargin 200px, reduced-motion laedt gar nicht, Poster traegt.
- [x] G3 cdn.ts: 3 neue Videos exportiert, 7-MB-Schnitt nirgends als Autoplay-Default
      CHECK: grep -rn "Hero-Alle-Videos" src | grep -v cdn.ts | wc -l
      EXPECT: 0 · EVIDENCE: 0. PORTRAIT_VIDEO/LOFT_VIDEO/HERO_SCHNITT
      exportiert, Groessen+Regeln im Kommentar (BRIEF §9).
- [ ] G4 Schema-Grafiken in Startseite verdrahtet (nach R2-1/R2-2)
      CHECK: grep -c "SchemaGrafiken\|PerformanceFlow\|ExposeVergleich" src/components/Start*.tsx
      EXPECT: >=1 · EVIDENCE: pending
