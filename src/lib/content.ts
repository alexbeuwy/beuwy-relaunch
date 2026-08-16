/**
 * Zentrale Text-Verwaltung der Landingpage.
 * - DEFAULTS = die im Code definierte Copy
 * - Overrides kommen aus Supabase (public.website_content) und werden in /studio
 *   ohne Deploy gepflegt. Fail-open: ohne Env/DB rendert die Seite die Defaults.
 * - *Wort* in Headline-Feldern wird als <em> gerendert (siehe RichText).
 *
 * Struktur nach dem Wireframe vom 12.08.2026 (Fintech-50-Research):
 * Hero (These, 7 Wörter) → Herkunft (Logos) → Track Record (3 Zahlen aus
 * 3 Projekten, statisch) → Diagnose → System (4 Module) → Live-Check →
 * Referenzen → Ihr Ziel → Häufige Fragen → Abschluss.
 * Genau zwei Marketing-CTAs: „Systemgespräch anfragen" / „Live-Check starten".
 */

export const DEFAULTS: Record<string, string> = {
  /* ── 01 Hero — die These ─────────────────────────────────────────────
     Kontrastformel nach appliedAI/Ramp: „X ist kein A. X ist B."
     Sieben Wörter, Präsens, kein Superlativ, kein Ausrufezeichen. */
  "hero.title": "Marke ist kein Geschmack. Marke ist *Umsatz*.",
  "hero.subtitle":
    "beuwy baut Marke, Anzeigen und Vertriebssystem als ein zusammenhängendes System — und verantwortet, was dabei herauskommt: Anfragen, Termine, Abschlüsse.",
  "hero.cta": "Systemgespräch anfragen",
  "hero.cta_secondary": "Live-Check starten",

  /* ── 02 Herkunft — Logos auf dem Hügelband ─────────────────────────── */
  "trust.label": "Seit 2009 für Industrie, Finanzvertrieb und Immobilien",

  /* ── 03 Track Record — drei Zahlen aus drei verschiedenen Projekten,
     statisch (keine Animation), keine Karten ───────────────────────── */
  /* ── 03 System im Betrieb — Produkt-Shot + Track Record ────────────── */
  "shot.caption":
    "So sieht Verantwortung aus: Anfragen, Termine, Abschlüsse und Kosten je Abschluss — jede Woche, mit der Änderung für die Woche darauf.",
  "stats.s1_value": "342.000 €",
  "stats.s1_label":
    "Abschlussvolumen in den ersten sechs Wochen nach dem Riegel-Relaunch",
  "stats.s2_value": "2.200+",
  "stats.s2_label":
    "Partner arbeiten heute unter der Marke, die wir für Königswege gebaut haben",
  "stats.s3_value": "17",
  "stats.s3_label":
    "Jahre Markenarbeit — angefangen bei Bosch, Continental und Michelin",

  /* ── 04 Diagnose — wörtliche Zitate statt behaupteter Schmerzpunkte ── */
  "diagnose.title": "Drei Sätze, die wir in jedem *Erstgespräch* hören.",
  "diagnose.q1": "„Wir sind besser als die Konkurrenz.“",
  "diagnose.a1":
    "Der Kunde sieht das nicht. Er vergleicht drei Auftritte und wählt den, der teurer aussieht. Ihr Preis wird zum Argument gegen Sie.",
  "diagnose.q2": "„Wir bekommen genug Anfragen.“",
  "diagnose.a2":
    "Anfragen sind keine Kunden. Ruft niemand innerhalb von Minuten zurück, ist die Anfrage kalt, bevor Ihr Angebot geschrieben ist.",
  "diagnose.q3": "„Das läuft bei uns über Excel.“",
  "diagnose.a3":
    "Dann läuft es über Erinnerung. Was in keinem System steht, wird nicht nachgefasst — und was nicht nachgefasst wird, kauft woanders.",

  /* ── 05 System — vier Module, ein Verantwortlicher ─────────────────── */
  "system.title": "Vier Teile. Ein *Verantwortlicher*.",
  "system.intro":
    "Sie müssen keines dieser Werkzeuge kennen und keine drei Dienstleister koordinieren. Sie bekommen das Ergebnis.",
  "system.m1_title": "Marke",
  "system.m1_text":
    "Auftritt, Schrift, Farbe, Sprache. Gebaut nach denselben Regeln wie für Konzerne, zugeschnitten auf Ihre Preisklasse.",
  "system.m2_title": "Anzeigen",
  "system.m2_text":
    "Kampagnen auf den Kanälen, auf denen Ihre Kunden wirklich sind. Das Budget wandert dorthin, wo Abschlüsse entstehen, nicht dorthin, wo Klicks entstehen.",
  "system.m3_title": "Vertriebssystem",
  "system.m3_text":
    "Ein CRM, das jede Anfrage festhält, mit Telefonanbindung und Rückrufregel. Nichts bleibt liegen, weil niemand daran gedacht hat.",
  "system.m4_title": "Zahlen",
  "system.m4_text":
    "Jede Woche ein Bericht: Anfragen, Termine, Abschlüsse, Kosten pro Abschluss. Daraus folgt, was in der Woche darauf geändert wird.",

  /* ── 06 Live-Check — der gleichwertige zweite Weg ──────────────────── */
  "check.title": "Prüfen Sie uns an Ihrer eigenen *Website*.",
  "check.text":
    "Adresse eintragen, 25 Sekunden warten. Sie sehen, was ein Interessent sieht, neun Messpunkte und eine ehrliche Einschätzung — ohne Gespräch, ohne Vertrag.",

  /* ── 07 Referenzen — drei Fälle mit Mechanik und Ergebnis ──────────── */
  "refs.title": "Drei Auftritte. Und was *danach* passiert ist.",
  "refs.riegel_name": "RIEGEL Immobilien · Rhein-Neckar",
  "refs.riegel_text":
    "Neue Marke, neue Website, Bewertungsrechner mit amtlichen Bodenrichtwerten und über 5.000 ausgewerteten Verkäufen, angebunden an das Maklersystem. In den ersten sechs Wochen danach: neun Abschlüsse, 342.000 € Volumen. Das Projekt hatte sich nach drei Wochen bezahlt. Heute: Platz 21 von über 25.000 Maklern beim ImmoScout24-Award.",
  "refs.riegel_link": "riegel-immobilien.de",
  "refs.koenigswege_name": "Königswege · Finanzvertrieb",
  "refs.koenigswege_text":
    "Marke, Auftritt und Veranstaltungen komplett neu aufgesetzt. Heute arbeiten über 2.200 Partner unter dieser Marke; das Haus steht in den Top 10 der deutschen Finanzvertriebe.",
  "refs.vision_name": "Vision Real Estate · Mannheim",
  "refs.vision_text":
    "Aus einem Gründungsbüro eine Marke gemacht, die vor Banken besteht — inklusive der Unterlagen, mit denen aus einem Dreierteam ein Gemeinschaftsunternehmen mit einem internationalen Investor wurde.",

  /* ── 08 Ihr Ziel — der Rechner statt einer Preistabelle ────────────── */
  "goal.title": "Rechnen wir mit Ihrem *Ziel*, nicht mit unserem Preis.",
  "goal.intro":
    "Zwei Regler. Danach wissen wir beide, worüber wir reden — und ob sich ein Gespräch für Sie überhaupt lohnt.",
  "goal.steps": "Systemgespräch|Diagnose des größten Hebels|Festpreis|Betrieb",
  "goal.after":
    "Was ein System kostet, hängt davon ab, was es tragen muss. Deshalb steht hier kein Preis, sondern eine Diagnose am Anfang: ein Gespräch, eine Analyse Ihres größten Hebels, eine Antwort innerhalb von 24 Stunden. Danach ein Festpreis, der steht.",

  /* ── 09 Häufige Fragen ─────────────────────────────────────────────── */
  "faq.title": "Was Kunden vorher *wissen* wollen.",
  "faq.q1": "Wie lange dauert so ein Projekt?",
  "faq.a1":
    "Eine Marke steht in drei bis vier Wochen. Ein vollständiges System mit Anzeigen und CRM in acht bis zwölf. Den Termin bekommen Sie vor Projektstart schriftlich.",
  "faq.q2": "Arbeiten Sie mit künstlicher Intelligenz?",
  "faq.a2":
    "Ja, in der Produktion: Aufbau, Texte, Auswertung und wiederkehrende Abläufe laufen zu großen Teilen über eigene Werkzeuge auf Basis aktueller Sprachmodelle. Für Sie ändert das zwei Dinge: Es geht schneller, und es kostet weniger als bei einer Agentur, die dieselbe Arbeit von Hand macht. Welche Werkzeuge das im Einzelnen sind, spielt für Ihr Ergebnis keine Rolle — und ändert sich ohnehin alle paar Monate.",
  "faq.q3": "Wer arbeitet an meinem Projekt?",
  "faq.a3":
    "Alexander Pütter, persönlich. Zugearbeitet wird von Spezialisten für Video, Fotografie und Entwicklung, koordiniert an einer Stelle. Sie haben einen Ansprechpartner und einen Verantwortlichen.",
  "faq.q4": "Was passiert nach dem Launch?",
  "faq.a4":
    "Der Betrieb: Anzeigen steuern, CRM pflegen, Telefonstrecke überwachen, wöchentlich berichten. Ein System, das niemand betreibt, wird in acht Wochen zur Visitenkarte.",

  /* ── 10 Abschluss — ein Weg, H2 statt Riesenwort ───────────────────── */
  "final.title": "Zwei Zeilen zu Ihrer Firma genügen für den *Anfang*.",
  "final.text":
    "Sie schreiben, was Sie verkaufen und woran es gerade hakt. Sie bekommen innerhalb von 24 Stunden eine Einschätzung Ihres größten Hebels — schriftlich, nicht als Verkaufsgespräch getarnt.",
  "final.cta": "Systemgespräch anfragen",
  "final.note": "Antwort innerhalb von 24 Stunden.",

  /* ── Video-Analyse (Outreach-Seite, auf der Startseite unverlinkt) ── */
  "video.title": "Die Video-Analyse Ihres *Falls*.",
  "video.intro":
    "Sie schicken Ihre Domain. Sie bekommen ein persönlich aufgenommenes Video: was Interessenten heute sehen, wo Anfragen versickern, was ein System ändern würde.",
  "video.note": "Persönlich aufgenommen · Antwort binnen 24 h",
  "video.submit": "Video-Analyse anfordern",
};

export const FIELD_LABELS: Record<string, string> = {
  "hero.title": "Hero · These (*Wort* = Hervorhebung)",
  "hero.subtitle": "Hero · Was geliefert wird und für wen",
  "hero.cta": "Hero · Primär-CTA",
  "hero.cta_secondary": "Hero · Sekundär-CTA",
  "trust.label": "Herkunft · Zeile über den Logos",
  "stats.s1_value": "Track Record · Zahl 1 (Riegel)",
  "stats.s2_value": "Track Record · Zahl 2 (Königswege)",
  "stats.s3_value": "Track Record · Zahl 3 (Markenarbeit)",
  "diagnose.title": "Diagnose · Überschrift (*Wort* = Hervorhebung)",
  "system.title": "System · Überschrift (*Wort* = Hervorhebung)",
  "system.intro": "System · Lead-Satz",
  "check.title": "Live-Check · Überschrift (*Wort* = Hervorhebung)",
  "check.text": "Live-Check · Lead-Satz",
  "refs.title": "Referenzen · Überschrift (*Wort* = Hervorhebung)",
  "refs.riegel_text": "Referenzen · Riegel (Mechanik + Ergebnis)",
  "refs.koenigswege_text": "Referenzen · Königswege",
  "refs.vision_text": "Referenzen · Vision Real Estate",
  "goal.title": "Ziel · Überschrift (*Wort* = Hervorhebung)",
  "goal.after": "Ziel · Absatz unter dem Rechner (Diagnose statt Preis)",
  "faq.title": "FAQ · Überschrift (*Wort* = Hervorhebung)",
  "final.title": "Abschluss · Überschrift (*Wort* = Hervorhebung)",
  "final.text": "Abschluss · Lead-Satz",
};

/** Lädt Overrides aus Supabase und merged über die Defaults. Fail-open. */
export async function getContent(): Promise<Record<string, string>> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return { ...DEFAULTS };
  try {
    const r = await fetch(`${url}/rest/v1/website_content?select=key,value`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: 60, tags: ["content"] },
    });
    if (!r.ok) return { ...DEFAULTS };
    const rows = (await r.json()) as Array<{ key: string; value: string }>;
    const out: Record<string, string> = { ...DEFAULTS };
    for (const row of rows) {
      if (typeof row.key === "string" && typeof row.value === "string") {
        out[row.key] = row.value;
      }
    }
    return out;
  } catch {
    return { ...DEFAULTS };
  }
}
