/**
 * Studio-Texte /check/[domain] — teilbares Sichtbarkeits-Gutachten. Nur
 * die statischen Rahmentexte stehen hier; Domain, Score, Kategorien und
 * Befunde selbst kommen aus dem Audit-Cache (dynamisch, bleiben Code).
 * Templates mit {platzhalter} werden im Code per .replace() befüllt —
 * so bleibt der umgebende Satz Studio-editierbar, der dynamische Wert
 * bleibt Code.
 */
export const SEITE = { slug: "check", titel: "Sichtbarkeits-Gutachten (/check)", route: "/check/[domain]" };
const S = "s.check.";

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel_praefix`]: "Sichtbarkeits-Gutachten:",
  [`${S}meta.titel_suffix`]: " — beuwy",
  [`${S}meta.titel_ohne_domain`]: "Sichtbarkeits-Gutachten — beuwy",
  [`${S}meta.beschreibung`]:
    "Automatisierte Ersteinschätzung der KI-Sichtbarkeit: Screenshot, Technik-Prüfpunkte und priorisierte Befunde.",
  [`${S}leer.titel_vor`]: "Für",
  [`${S}leer.titel_nach`]: "liegt noch kein Gutachten vor.",
  [`${S}leer.text`]:
    "Der Check dauert etwa 25 Sekunden: Screenshot, neun Technik-Prüfpunkte und eine Sichtbarkeitsprüfung durch beuwy Agenten.",
  [`${S}leer.cta`]: "Check jetzt starten",
  [`${S}dossier.label`]: "Sichtbarkeits-Gutachten",
  [`${S}dossier.chip`]: "beuwy Agenten",
  [`${S}dossier.stand_praefix`]: "Stand ",
  [`${S}dossier.score_label`]: "Sichtbarkeits-Score",
  [`${S}dossier.score_suffix`]: " /100",
  [`${S}score.band1`]: "kommt bei KI-Anfragen praktisch nicht vor.",
  [`${S}score.band2`]: "ist vereinzelt auffindbar, wird aber nicht empfohlen.",
  [`${S}score.band3`]: "ist teilweise sichtbar — mit klaren Lücken.",
  [`${S}score.band4`]: "hat eine solide Basis — mit Luft nach oben.",
  [`${S}score.band5`]: "ist stark positioniert.",
  [`${S}technik.label`]: "Technische Basis",
  [`${S}technik.begruendung`]: "{ok} von {gesamt} Technik-Prüfpunkten bestanden.",
  [`${S}befunde.label`]: "Befunde · nach Wirkung priorisiert",
  [`${S}befunde.aufwand_wirkung`]: "Aufwand {effort} · Wirkung {impact}/3",
  [`${S}footer.text`]:
    "Automatisierte Ersteinschätzung durch beuwy Agenten auf Basis öffentlich abrufbarer Inhalte, Stand {stand}. Kein manuelles Gutachten — einzelne Bewertungen können danebenliegen. Diese Seite ist nur über den direkten Link erreichbar und wird nicht öffentlich gelistet.",
  [`${S}abschluss.titel`]: "Die Lücken schließen?",
  [`${S}abschluss.text`]:
    "In 30 Minuten sehen wir uns an, welche der Befunde {domain} wirklich Anfragen kosten — und ob ein System sich für Sie rechnet. Ehrliche Antwort, auch wenn sie Nein lautet.",
  [`${S}abschluss.cta1`]: "30-Minuten-Systemgespräch buchen",
  [`${S}abschluss.cta2`]: "Video-Analyse anfordern",
  [`${S}abschluss.hinweis`]: "Kein Pitch · Antwort binnen 24 h",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel_praefix`]: "SEO · Browser-Titel · Teil vor der Domain",
  [`${S}meta.titel_suffix`]: "SEO · Browser-Titel · Teil nach der Domain",
  [`${S}meta.titel_ohne_domain`]: "SEO · Browser-Titel, wenn keine Domain erkannt wurde",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}leer.titel_vor`]: "Leerzustand · Titel · Teil vor der Domain",
  [`${S}leer.titel_nach`]: "Leerzustand · Titel · Teil nach der Domain",
  [`${S}leer.text`]: "Leerzustand · Erklärtext",
  [`${S}leer.cta`]: "Leerzustand · Knopf-Text",
  [`${S}dossier.label`]: "Dossier-Kopf · Label",
  [`${S}dossier.chip`]: "Dossier-Kopf · Chip-Text",
  [`${S}dossier.stand_praefix`]: "Dossier-Kopf · „Stand“-Vorspann (Datum bleibt Code)",
  [`${S}dossier.score_label`]: "Score · Label",
  [`${S}dossier.score_suffix`]: "Score · Suffix nach der Zahl",
  [`${S}score.band1`]: "Score-Einschätzung · unter 30",
  [`${S}score.band2`]: "Score-Einschätzung · 30–49",
  [`${S}score.band3`]: "Score-Einschätzung · 50–69",
  [`${S}score.band4`]: "Score-Einschätzung · 70–84",
  [`${S}score.band5`]: "Score-Einschätzung · ab 85",
  [`${S}technik.label`]: "Technik-Kategorie · Label",
  [`${S}technik.begruendung`]: "Technik-Kategorie · Begründungssatz (Zahlen bleiben Code)",
  [`${S}befunde.label`]: "Befunde · Sektionslabel",
  [`${S}befunde.aufwand_wirkung`]: "Befunde · Aufwand/Wirkung-Zeile (Werte bleiben Code)",
  [`${S}footer.text`]: "Fußzeile des Dossiers (Datum bleibt Code)",
  [`${S}abschluss.titel`]: "Abschluss · Titel",
  [`${S}abschluss.text`]: "Abschluss · Text (Domain bleibt Code)",
  [`${S}abschluss.cta1`]: "Abschluss · Knopf 1 (Termin)",
  [`${S}abschluss.cta2`]: "Abschluss · Knopf 2 (Video-Analyse)",
  [`${S}abschluss.hinweis`]: "Abschluss · Hinweis unter den Knöpfen",
};
