"use client";

/**
 * Erstanbieter-Tracking für die öffentlichen beuwy-Seiten — „Einblick"
 * (R5 Leaf G5). Portiert das Riegel-Muster
 * (/home/user/alexbeuwy/riegel/src/lib/track.ts, siehe
 * docs/redesign/R5-PORTGUT.md Fundstück 1) auf beuwys eigenes Vokabular.
 *
 * DATENBASIS (per Supabase-Introspektion geprüft, KEINE eigene Migration
 * in diesem Leaf nötig — bw_track_events + die drei RPCs existieren
 * bereits, siehe supabase/crm-schema.sql Kommentar „r5_track_und_flows"):
 * Tabelle bw_track_events(event, pfad, step, quelle, x_pct, y_pct,
 * bereich, ansicht, geraet, pageload_id, created_at). Die RPC
 * bw_track_anlegen liest aus jedem Batch-Item GENAU diese Feldnamen
 * (snake_case) — src/app/api/track/route.ts baut sie aus dem hier
 * gesendeten Wire-Format. `step`/`quelle`/`ansicht` sind Riegel-Erbe und
 * für Einblick sonst ungenutzt: dieses Leaf zweckentfremdet NUR `step`
 * (smallint) für die Scroll-Tiefen-Marke (25/50/75/100) — eine eigene
 * vierte Zahl-Spalte wäre reiner Migrations-Overhead für ein Leaf, das
 * per Auftrag keine SQL-Dateien anfassen darf.
 *
 * DATENSCHUTZ BY DESIGN — identisch zu Riegel:
 * - `pageloadId` lebt NUR im Modul-Speicher, KEIN Cookie/localStorage.
 *   Jede SPA-Navigation (TrackBeacon.tsx, usePathname-Wechsel) erzeugt
 *   über neuerSeitenaufruf() eine NEUE pageloadId — keine seiten-
 *   übergreifende Wiedererkennung, kein Cross-Site-Tracking.
 * - Klicks im 0,5-%-Raster (KLICK_STUFEN=200), relativ zu
 *   document.scrollWidth/Height — Buckets statt Pixel, kein
 *   Fingerprinting-Potenzial.
 * - Öffentliche Seiten only: /intern, /studio, /os, /konto werden NIE
 *   getrackt. Zwei unabhängige Sperren (defense in depth): hier client-
 *   seitig VOR dem Queuen, und nochmal serverseitig in
 *   src/app/api/track/route.ts — fällt eine Sperre aus, greift die
 *   andere.
 * - Fail-soft: Tracking darf die Seite nie stören. Jeder Fehler wird
 *   verschluckt, nichts wirft.
 */

export type TrackEventName = "pageview" | "klick" | "scroll_tiefe";

/** Pfade, die NIE getrackt werden — Spiegel der Liste in api/track/route.ts. */
const GESPERRTE_PFADE = ["/intern", "/studio", "/os", "/konto"];

export function istOeffentlicherPfad(pfad: string): boolean {
  return !GESPERRTE_PFADE.some((p) => pfad === p || pfad.startsWith(`${p}/`));
}

interface TrackItem {
  event: TrackEventName;
  pfad: string;
  pageloadId: string;
  geraet: "desktop" | "mobil";
  xPct?: number;
  yPct?: number;
  bereich?: string;
  tiefe?: number;
}

function neueId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

let pageloadId = neueId();

/** Ab dieser Viewport-Breite gilt ein Klick als „desktop" — derselbe
 *  Breakpoint wie Tailwinds md, an dem die Website ihr Layout umstellt. */
const DESKTOP_AB_PX = 768;

function geraeteklasse(): "desktop" | "mobil" {
  return typeof window !== "undefined" && window.innerWidth >= DESKTOP_AB_PX ? "desktop" : "mobil";
}

let queue: TrackItem[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
/** Dedupliziert je Seitenaufruf: pageview + jede Scroll-Marke höchstens
 *  einmal. Klicks NICHT dedupliziert — jeder Klick ist ein eigenes
 *  Ereignis. Wird bei jeder neuen pageloadId geleert (neuerSeitenaufruf). */
const gesendet = new Set<string>();

/** Von TrackBeacon bei jeder SPA-Navigation aufgerufen — neue Seite = neue
 *  pageloadId, alte Dedup-Markierungen verfallen mit ihr. */
export function neuerSeitenaufruf(): string {
  pageloadId = neueId();
  gesendet.clear();
  return pageloadId;
}

function flush(): void {
  if (queue.length === 0) return;
  const body = JSON.stringify({ items: queue });
  queue = [];
  try {
    if (navigator.sendBeacon?.("/api/track", new Blob([body], { type: "application/json" }))) return;
  } catch {}
  fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(
    () => {},
  );
}

if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush();
  });
}

function track(event: TrackEventName, pfad: string, extra?: Partial<TrackItem>): void {
  try {
    if (!istOeffentlicherPfad(pfad)) return;
    if (event !== "klick") {
      const key = event === "scroll_tiefe" ? `scroll_tiefe:${extra?.tiefe}` : `${event}:${pfad}`;
      if (gesendet.has(key)) return;
      gesendet.add(key);
    }
    queue.push({ event, pfad, pageloadId, geraet: geraeteklasse(), ...extra });
    if (queue.length >= 12) flush();
    else {
      if (flushTimer) clearTimeout(flushTimer);
      flushTimer = setTimeout(flush, 4000);
    }
  } catch {
    /* Tracking darf die Seite nie stören. */
  }
}

export function trackPageview(pfad: string): void {
  track("pageview", pfad);
}

/** Auflösung der Heatmap: 200 Stufen je Achse = 0,5-%-Buckets (Muster
 *  Riegel — Betreiber-Feedback dort: „5 % zu grob, Heatmap wie bei
 *  Hotjar"). Muss zur serverseitigen Range-Prüfung passen. */
export const KLICK_STUFEN = 200;

export function trackKlick(pfad: string, e: { clientX: number; clientY: number; target: EventTarget | null }): void {
  try {
    const doc = document.documentElement;
    const grenze = (v: number) => Math.min(KLICK_STUFEN, Math.max(0, Math.round(v * KLICK_STUFEN)));
    const xPct = grenze((e.clientX + window.scrollX) / doc.scrollWidth);
    const yPct = grenze((e.clientY + window.scrollY) / doc.scrollHeight);
    const bereich =
      (e.target instanceof Element ? e.target.closest("[data-track-bereich]")?.getAttribute("data-track-bereich") : null) ??
      "seite";
    track("klick", pfad, { xPct, yPct, bereich });
  } catch {}
}

/** Scroll-Tiefen-Marken — jede wird höchstens einmal je Seitenaufruf
 *  gemeldet (Dedup über `gesendet`, s. o.). Da eine Marke nur meldet, wenn
 *  sie erreicht ist, feuert z. B. 100 immer NACH 75/50/25 — die Zahlen
 *  sind damit kumulativ zu lesen, nicht exklusiv. */
const SCROLL_MARKEN = [25, 50, 75, 100] as const;

export function trackScroll(pfad: string): void {
  try {
    const doc = document.documentElement;
    const gesamt = doc.scrollHeight - window.innerHeight;
    if (gesamt <= 0) return; // Seite ohne Scroll-Strecke — keine Tiefe zu messen
    const prozent = Math.min(100, Math.round((window.scrollY / gesamt) * 100));
    for (const marke of SCROLL_MARKEN) {
      if (prozent >= marke) track("scroll_tiefe", pfad, { tiefe: marke });
    }
  } catch {}
}
