/**
 * No-Op-Stub für das Riegel-Original src/lib/track.ts.
 *
 * Riegels track.ts war ein cookieloses, gebatchtes Conversion-Tracking für
 * den Rechner-Funnel (sendBeacon an /api/track, Klick-Heatmap-Buckets,
 * Funnel-Events). beuwy hat aktuell weder die Route `/api/track` noch die
 * dahinterliegende Auswertung — und der Modul-Vertrag dieses Ports
 * verlangt ausdrücklich einen No-Op-Stub, keinen Nachbau der Route.
 *
 * Alle Exporte des Originals sind hier vorhanden (gleiche Namen, gleiche
 * Signaturen, additive JSDoc), damit ein aus Riegel portierter
 * Rechner-Client (calculator.tsx bzw. der beuwy-Bewertungs-Wizard)
 * unverändert `import { track, trackKlick, setAnsicht } from
 * "@/lib/bewertung/track"` schreiben kann. Jede Funktion ist bewusst leer
 * — kein Netzwerk, kein State, kein Seiteneffekt. Sobald beuwy ein eigenes
 * Funnel-Tracking bekommt, ist dies die einzige Datei, die eine echte
 * Implementierung braucht (Aufrufer bleiben unverändert).
 */

/** Wie im Original: die vom Rechner-Funnel gemeldeten Ereignisnamen. */
export type TrackEventName =
  | "rechner_start"
  | "rechner_step"
  | "rechner_analyse"
  | "rechner_ergebnis"
  | "report_form_geoeffnet"
  | "report_angefordert"
  | "rechner_klick";

/** Wie im Original: welche Ansicht des Rechners gerade sichtbar ist. */
export type Ansicht =
  | "objektart"
  | "standort"
  | "eckdaten"
  | "analyse"
  | "ergebnis"
  | "ergebnis-formular"
  | "seite";

/** No-Op — im Original: aktuelle Ansicht für nachfolgende trackKlick()-Aufrufe merken. */
export function setAnsicht(_a: Ansicht): void {
  // bewusst leer — kein Tracking in beuwy (s. Datei-Kommentar oben)
}

/** Wie im Original beibehalten (Heatmap-Rasterauflösung), falls ein
 *  portiertes UI-Element den Wert noch referenziert — ohne Funktion, da
 *  trackKlick() ohnehin nichts sendet. */
export const KLICK_STUFEN = 200;

/** No-Op — im Original: Event batched an /api/track melden. */
export function track(_event: TrackEventName, _detail?: Record<string, string | number | boolean>): void {
  // bewusst leer — kein Tracking in beuwy (s. Datei-Kommentar oben)
}

/** No-Op — im Original: Klick-Position für die Heatmap in Prozent-Buckets melden. */
export function trackKlick(_e: { clientX: number; clientY: number; target: EventTarget | null }): void {
  // bewusst leer — kein Tracking in beuwy (s. Datei-Kommentar oben)
}
