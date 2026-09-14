/**
 * Studio-Texte: Rechner-Tools & ErgebnisSchleuse (R4).
 *
 * REGEL (Alex, 27.08): Jede neue nutzerlesbare Textfläche registriert
 * ihre Texte hier unter src/lib/texte/<bereich>.ts — defaults + labels —
 * und liest sie zur Laufzeit über getContent(). So kann Alex jeden Text
 * im Studio korrigieren, ohne LLM und ohne Deployment. content.ts
 * spreadet alle Bereichsdateien in DEFAULTS/FIELD_LABELS.
 */

export const TOOLS_DEFAULTS: Record<string, string> = {
  "tools.schleuse.titel": "Ihre Auswertung ist fertig.",
  "tools.schleuse.sub":
    "Sagen Sie uns kurz, für wen wir rechnen — das Ergebnis erscheint direkt danach.",
  "tools.schleuse.button": "Ergebnis freischalten",
  "tools.schleuse.hinweis":
    "Keine Werbung, kein Anruf ohne Anlass — Ihre Auswertung, sonst nichts.",
};

export const TOOLS_LABELS: Record<string, string> = {
  "tools.schleuse.titel": "Tools · Lead-Wall · Überschrift der Freischalt-Karte",
  "tools.schleuse.sub": "Tools · Lead-Wall · Satz unter der Überschrift",
  "tools.schleuse.button": "Tools · Lead-Wall · Button-Beschriftung",
  "tools.schleuse.hinweis": "Tools · Lead-Wall · Beruhigungszeile unter dem Button",
};
