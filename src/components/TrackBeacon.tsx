"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  istOeffentlicherPfad,
  neuerSeitenaufruf,
  trackKlick,
  trackPageview,
  trackScroll,
} from "@/lib/track-client";

/**
 * Unsichtbare Root-Layout-Komponente — initialisiert das Einblick-
 * Tracking (R5 Leaf G5) und hängt die Klick-/Scroll-Listener für die
 * gesamte öffentliche Website. Wird vom Orchestrator EINMAL ins
 * Root-Layout (src/app/layout.tsx) gehängt, außerhalb von <NurWebsite> —
 * Tracking läuft auf Website-Seiten, nicht auf /intern & Co. (die
 * internen Pfade sind zusätzlich hart gesperrt, siehe
 * istOeffentlicherPfad in src/lib/track-client.ts + serverseitig in
 * src/app/api/track/route.ts).
 *
 * usePathname() liefert bei jeder App-Router-Navigation (Link-Klick,
 * Soft-Navigation) einen neuen Wert — genau das ist der Trigger für
 * eine frische pageloadId + ein neues pageview-Event: „jede Navigation
 * = neue pageview + neue pageload_id" (Auftrag).
 *
 * Klick-/Scroll-Listener hängen EINMALIG am document/window (kein Re-Bind
 * bei jeder Navigation) und lesen den aktuellen Pfad über eine Ref, damit
 * das Neu-Verdrahten bei jedem Seitenwechsel entfällt.
 */
export function TrackBeacon() {
  const pathname = usePathname();
  const pfadRef = useRef(pathname);

  useEffect(() => {
    pfadRef.current = pathname;
    if (!istOeffentlicherPfad(pathname)) return;
    neuerSeitenaufruf();
    trackPageview(pathname);
  }, [pathname]);

  useEffect(() => {
    function aufKlick(e: MouseEvent) {
      const pfad = pfadRef.current;
      if (!istOeffentlicherPfad(pfad)) return;
      trackKlick(pfad, e);
    }

    // Scroll-Tiefe leicht entprellt (400ms) — beim Scrollen feuert das
    // Ereignis sonst dutzendfach pro Sekunde, ohne dass sich die
    // gemeldete Tiefe je Marke ändert (Dedup läuft ohnehin in
    // track-client.ts, das Entprellen spart nur unnötige Aufrufe).
    let scrollTimer: ReturnType<typeof setTimeout> | null = null;
    function aufScroll() {
      if (scrollTimer) return;
      scrollTimer = setTimeout(() => {
        scrollTimer = null;
        const pfad = pfadRef.current;
        if (!istOeffentlicherPfad(pfad)) return;
        trackScroll(pfad);
      }, 400);
    }

    document.addEventListener("click", aufKlick, { passive: true });
    window.addEventListener("scroll", aufScroll, { passive: true });
    return () => {
      document.removeEventListener("click", aufKlick);
      window.removeEventListener("scroll", aufScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, []);

  return null;
}
