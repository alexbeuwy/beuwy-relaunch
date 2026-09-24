/**
 * Studio-Texte: Startseite · Motion (Scroll-Effekt-Stufe, Rollback-Schalter).
 *
 * REGEL (Alex, 27.08): Jede neue nutzerlesbare Textfläche registriert
 * ihre Texte hier unter src/lib/texte/<bereich>.ts — defaults + labels —
 * und liest sie zur Laufzeit über getContent(). So kann Alex jeden Text
 * im Studio korrigieren, ohne LLM und ohne Deployment. content.ts
 * spreadet alle Bereichsdateien in DEFAULTS/FIELD_LABELS.
 */

export const MOTION_DEFAULTS: Record<string, string> = {
  "mk.motion.stufe": "voll",
};

export const MOTION_LABELS: Record<string, string> = {
  "mk.motion.stufe":
    "Startseite · Motion · Scroll-Effekte: voll, dezent oder aus (aus = Rollback, alles steht still)",
};
