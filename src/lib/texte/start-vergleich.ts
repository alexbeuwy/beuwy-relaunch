/**
 * Studio-Texte: Startseite · Vergleich (Standard-Export vs. beuwy).
 *
 * REGEL (Alex, 27.08): Jede neue nutzerlesbare Textfläche registriert
 * ihre Texte hier unter src/lib/texte/<bereich>.ts — defaults + labels —
 * und liest sie zur Laufzeit über getContent(). So kann Alex jeden Text
 * im Studio korrigieren, ohne LLM und ohne Deployment. content.ts
 * spreadet alle Bereichsdateien in DEFAULTS/FIELD_LABELS.
 */

export const VERGLEICH_DEFAULTS: Record<string, string> = {
  "mk.vgl.abgr.eyebrow": "Die Abgrenzung",
  "mk.vgl.abgr.titel": "Es gibt Makler mit einer Website. Und Makler mit einem *System* dahinter.",
  "mk.vgl.abgr.sub":
    "Standardlösungen füllen Exposés und Dokumente, die bei jedem Makler gleich aussehen. Anpassen lässt sich davon wenig.",
  "mk.vgl.punchline": "Sichtbar sind viele. Unverwechselbar seit 17 Jahren: die mit System.",

  "mk.vgl.eyebrow": "Der Unterschied, den Eigentümer sehen",
  "mk.vgl.titel": "Gleiche Häuser. Gleiche Portale. *Ungleiche* Wirkung.",
  "mk.vgl.sub":
    "Scrollen Sie kurz durch beide Welten — Sie erkennen Ihre Post sofort. Und danach die Frage: Welche der beiden schickt die Nummer 1 der Stadt?",

  "mk.vgl.std.label": "Der Standard — 99 von 100 Büros",
  "mk.vgl.std.titel": "Ordentlich. Austauschbar. Grau.",
  "mk.vgl.std.text":
    "Export ab Werk: Dasselbe Exposé, dieselbe Serienmail, dieselbe Objektliste — nur der Absender wechselt. Reicht für Abschlüsse. Reicht nicht, um als klare Nummer 1 wahrgenommen zu werden.",
  "mk.vgl.std.tools": "onOffice|BOTTIMMO|FLOWFACT|Propstack|CASAONE|justimmo",
  "mk.vgl.std.fussnote": "Layout ab Werk — so kommt es tausendfach im Postfach an.",

  "mk.vgl.bw.label": "Mit beuwy",
  "mk.vgl.bw.titel": "„Wow — das kannte ich so noch nicht.“",
  "mk.vgl.bw.text":
    "Ihre Marke auf jedem Pixel: Reports, die Eigentümer aufheben. Mails, die klingen wie Sie. Reels, die Ihre Stadt kennt.",
  "mk.vgl.bw.visual_headline": "Verkauft in 12 Tagen. 104 % vom Angebotspreis.",
  "mk.vgl.bw.visual_sub": "Ihr Eigentümer-Report — Seite 1 von 6",
  "mk.vgl.bw.expose_titel": "Exposé auf Knopfdruck",
  "mk.vgl.bw.mail_titel": "Jede Mail pro Empfänger neu geschrieben",
  "mk.vgl.bw.mail_satz":
    "Guten Abend Frau Berger, drei Familien haben Ihr Exposé heute geöffnet — die Finanzierungsprüfung von zweien ist bereits grün.",
  "mk.vgl.bw.mail_satz2":
    "Guten Morgen Herr Weidner, in der Gartenstraße wurden seit Januar drei Häuser verkauft, im Schnitt 8 % über Angebotspreis. Soll ich die Auswertung für Ihre Hausnummer mitschicken?",
  "mk.vgl.bw.mail_satz3":
    "Hallo Familie Roth, Ihr gemerktes Haus in Friesenheim ist seit heute 20.000 € günstiger — und Samstag um 11 Uhr ist der letzte freie Besichtigungstermin.",
  "mk.vgl.bw.mail_satz4":
    "Guten Tag Herr Dr. Sattler, Ihre Wohnung in der Rheinallee liegt 140 € unter der erzielbaren Kaltmiete — bei Neuvermietung sind das 1.680 € mehr im Jahr.",
  "mk.vgl.bw.mail_satz5":
    "Liebe Familie Brandt, heute vor einem Jahr bekamen Sie den Schlüssel. Ihr Haus hat seitdem rund 4 % an Wert gewonnen — Ihr Jahresreport hängt an.",
  "mk.vgl.bw.fakten_label": "Sätze, die nur Ihr System schreiben kann",
  "mk.vgl.bw.fakten":
    "Ein Nachbar in Ihrer Straße hat 2022 für 63 % Ihrer Preisvorstellung verkauft.|Ihr Exposé wurde diese Woche 41-mal gemerkt — von drei geprüften Käufern.|In Ihrem Viertel stehen gerade nur zwei vergleichbare Häuser zum Verkauf.|Der letzte Verkauf in Ihrer Lage lag 9 % über dem Gutachterwert.",
  "mk.vgl.bw.reel_label": "Echtes Objekt-Reel · RIEGEL Immobilien",
};

export const VERGLEICH_LABELS: Record<string, string> = {
  "mk.vgl.abgr.eyebrow": "Startseite · Abgrenzung · Eyebrow über der Überschrift",
  "mk.vgl.abgr.titel": "Startseite · Abgrenzung · Überschrift (*Wort* = Hervorhebung)",
  "mk.vgl.abgr.sub": "Startseite · Abgrenzung · Einleitungssatz",
  "mk.vgl.punchline": "Startseite · Vergleich · Schlusszeile unter den beiden Karten",

  "mk.vgl.eyebrow": "Startseite · Vergleich · Eyebrow über der Überschrift",
  "mk.vgl.titel": "Startseite · Vergleich · Überschrift (*Wort* = Hervorhebung)",
  "mk.vgl.sub": "Startseite · Vergleich · Einleitungssatz",

  "mk.vgl.std.label": "Startseite · Vergleich · Standard-Seite · Label über der Karte",
  "mk.vgl.std.titel": "Startseite · Vergleich · Standard-Seite · Überschrift",
  "mk.vgl.std.text": "Startseite · Vergleich · Standard-Seite · Beschreibungstext",
  "mk.vgl.std.tools": "Startseite · Vergleich · Standard-Seite · Portal-/CRM-Namen, mit | getrennt",
  "mk.vgl.std.fussnote": "Startseite · Vergleich · Standard-Seite · Fußnote unter dem Mockup",

  "mk.vgl.bw.label": "Startseite · Vergleich · beuwy-Seite · Label über der Karte",
  "mk.vgl.bw.titel": "Startseite · Vergleich · beuwy-Seite · Überschrift (Zitat)",
  "mk.vgl.bw.text": "Startseite · Vergleich · beuwy-Seite · Beschreibungstext",
  "mk.vgl.bw.visual_headline": "Startseite · Vergleich · beuwy-Seite · Headline im Report-Visual",
  "mk.vgl.bw.visual_sub": "Startseite · Vergleich · beuwy-Seite · Subline im Report-Visual",
  "mk.vgl.bw.expose_titel": "Startseite · Vergleich · beuwy-Seite · Titel der Exposé-Wechsel-Kachel",
  "mk.vgl.bw.mail_titel": "Startseite · Vergleich · beuwy-Seite · Titel der Mail-Kachel",
  "mk.vgl.bw.mail_satz": "Startseite · Vergleich · Mail-Kachel · Satz 1 (Eigentümer-Update)",
  "mk.vgl.bw.mail_satz2": "Startseite · Vergleich · Mail-Kachel · Satz 2 (Straßen-Farming)",
  "mk.vgl.bw.mail_satz3": "Startseite · Vergleich · Mail-Kachel · Satz 3 (Käufer-Merkliste)",
  "mk.vgl.bw.mail_satz4": "Startseite · Vergleich · Mail-Kachel · Satz 4 (Kapitalanleger)",
  "mk.vgl.bw.mail_satz5": "Startseite · Vergleich · Mail-Kachel · Satz 5 (Kauf-Jahrestag)",
  "mk.vgl.bw.fakten_label": "Startseite · Vergleich · Label über der großen Wechsel-Headline",
  "mk.vgl.bw.fakten":
    "Startseite · Vergleich · Wechsel-Headline: Sätze mit | getrennt",
  "mk.vgl.bw.reel_label": "Startseite · Vergleich · beuwy-Seite · Bildunterschrift des Reels",
};
