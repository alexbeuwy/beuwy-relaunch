/**
 * Zentrale Text-Verwaltung der Landingpage.
 * - DEFAULTS = die im Code definierte Copy
 * - Overrides kommen aus Supabase (public.website_content) und werden in /studio
 *   ohne Deploy gepflegt. Fail-open: ohne Env/DB rendert die Seite die Defaults.
 * - *Wort* in Headline-Feldern wird als <em> gerendert (siehe RichText).
 * - \n in Listen-Feldern trennt Einträge.
 *
 * Aufbau 1:1 nach der Codex-Referenz (Workflow wf_35dd9f74, Research-Regeln):
 * Hero (Riesenwort + ein Satz, ohne Bild und ohne CTA) → Trust-Leiste →
 * Feature-Blöcke (Titel + ~35 Wörter + 1 Visual) → Preis-Teaser →
 * Beweis-Block → Schluss-CTA. Sales-Regeln: simpel, positiv, nur belegbare
 * Zahlen, Anker vor dem Preis.
 */

export const DEFAULTS: Record<string, string> = {
  // ── Hero: Riesenwort + ein Satz + Media-Frame ──────────────────────────
  "hero.brand": "beuwy",
  "hero.tagline":
    "Wer teuer verkauft, muss teuer wirken. beuwy baut Marke und Vertriebssystem für Abschlüsse ab 10.000 €.",
  /* URL zu .webp/.jpg/.png (Bild) oder .webm/.mp4 (Auto-Loop-Video) auf dem
     CDN. Leer = abstrakter Platzhalter, bis das Higgsfield-Asset da ist. */
  "hero.media_url": "",

  // ── Trust-Leiste ───────────────────────────────────────────────────────
  "trust.label": "Aus Projekten mit",

  // ── Feature-Blöcke ─────────────────────────────────────────────────────
  "features.title": "Marke und Vertrieb aus einer *Hand*.",
  "features.intro":
    "Zum Bank-Termin der gute Anzug. Zur eigenen Website der Jogginganzug? Ab 10.000 € pro Abschluss entscheidet der Auftritt mit.",
  "features.f1_title": "Marke",
  "features.f1_text":
    "Markendesign aus der Welt der 100.000-€-Relaunches, gebaut für Ihre Preisklasse. Schrift, Farbe, Bildwelt und Ton greifen ineinander, bis der Auftritt so teuer wirkt wie Ihr Angebot.",
  "features.f2_title": "Anzeigen",
  "features.f2_text":
    "Instagram, Facebook, LinkedIn, TikTok: Anzeigen dort, wo Ihre Kunden abends scrollen. KI wertet laufend aus, welche Zielgruppe wirklich kauft — dorthin fließt Ihr Budget.",
  "features.f3_title": "Vertriebssystem",
  "features.f3_text":
    "Ein CRM, das jede Anfrage festhält. Setter und Closer sind startklar, jeder Anruf wird erfasst. Ihr Team ruft in Minuten zurück, solange die Anfrage warm ist.",
  "features.f4_title": "Zahlen",
  "features.f4_text":
    "Jede Woche ein Bericht mit den Zahlen, die zählen: Anfragen, Termine, Abschlüsse. Jede Woche wird nachgeschärft.",

  // ── Live-Check (Feature-Block 5, das Signature-Tool) ───────────────────
  "check.title": "Der Live-Check",
  "check.text":
    "Testen Sie die Maschine an Ihrer eigenen Domain: Screenshot, neun Messpunkte, ehrliche Einschätzung durch beuwy Agenten. Dauert 25 Sekunden.",

  // ── Preis-Teaser ───────────────────────────────────────────────────────
  "pricing.title": "Drei Stufen. Ein *Festpreis*.",
  "pricing.intro":
    "Große Häuser rufen für diese Klasse sechsstellige Budgets auf. Hier steht der Preis fest, bevor Sie zusagen.",
  "pricing.tier1_name": "Das Fundament",
  "pricing.tier1_price": "7.900 €",
  "pricing.tier1_result": "Eine Marke, die zu Ihren Preisen passt.",
  "pricing.tier2_name": "Das Vertriebssystem",
  "pricing.tier2_price": "16.900 €",
  "pricing.tier2_result":
    "Anzeigen, die Kunden mit großem Budget holen — und ein CRM, das sie hält.",
  "pricing.tier2_badge": "Empfehlung",
  "pricing.tier3_name": "Das Betriebssystem",
  "pricing.tier3_price": "ab 34.000 €",
  "pricing.tier3_result":
    "Ihre Firma läuft auf einem eigenen System: Marke, CRM, Vertrieb, Wachstum.",
  "pricing.prozess":
    "Der Weg: Anfrage → Antwort in 24 Stunden → Diagnose (1.990 €, wird voll angerechnet) → Systembau zum Festpreis.",
  "pricing.einordnung":
    "Zur Einordnung: Der Riegel-Relaunch lag mit 28.000 € zwischen Stufe zwei und drei — und hatte sich nach drei Wochen bezahlt.",
  "pricing.garantie1":
    "Diagnose-Garantie: Überzeugt der Systementwurf, gilt die Diagnose als Anzahlung. Überzeugt er weniger, geht sie zurück.",
  "pricing.garantie2":
    "Festpreis-Garantie: Wird mehr nötig als geplant, trage ich das. Ihr Preis bleibt stehen.",
  "pricing.cta": "Projekt anfragen",

  // ── Beweis-Block (an Testimonial-Position, vor dem Schluss-CTA) ────────
  "proof.title": "342.000 €. Über 2.200 Partner. *Top 10*.",
  "proof.intro": "Drei Branchen, ein Muster: Die bessere Marke macht die größeren Abschlüsse.",
  "proof.riegel_branch": "RIEGEL Immobilien · Rhein-Neckar",
  "proof.riegel_facts":
    "28.000 € Projekt — nach 3 Wochen bezahlt\n9 Abschlüsse in 6 Wochen · im Schnitt 38.000 €\nTop 21 von über 25.000 Maklern · ImmoScout24 ImmoAward 2025",
  "proof.riegel_mechanic":
    "Der Rechner nutzt amtliche Grundstückswerte, öffentliche Daten und über 5.000 ausgewertete Verkäufe. Sein PDF-Bericht verkauft mit: Der Makler legt ihn ausgedruckt auf den Tisch.",
  "proof.riegel_link": "riegel-immobilien.de",
  "proof.vision_branch": "Vision Group · Immobilien-Startup, Mannheim",
  "proof.vision_facts":
    "Vom kleinen Gründungsbüro zur eigenen Marke\nKKR als Partner gewonnen\nVerkaufsunterlagen, die vor jeder Bank bestehen",
  "proof.vision_mechanic":
    "Neue Marke, neues Recruiting, Vertrieb über Anzeigen: dieselbe Mechanik, die in Ihrem System steckt.",
  "proof.koenigswege_branch": "Königswege · Finanzvertrieb",
  "proof.koenigswege_facts":
    "Marke, Events und Auftritt komplett neu aufgesetzt\nHeute über 2.200 Partner\nTop 10 der Finanzvertriebe Deutschlands · Cash-Ranking 2025",
  "proof.koenigswege_mechanic":
    "Eine Marke, auf die Partner stolz sind, erledigt das Recruiting nebenbei.",
  "proof.stat": "342.000",
  "proof.stat_text":
    "Euro Abschlussvolumen in den ersten 6 Wochen nach dem Riegel-Relaunch.",
  "proof.founder_line":
    "Alle drei tragen dieselbe Handschrift: Alexander Pütter — seit 2009 im Markengeschäft, erst für Bosch, Continental und Michelin.",
  "proof.founder_quote": "Ich baue Marken, mit denen Menschen große Entscheidungen treffen.",

  // ── Schluss-CTA ────────────────────────────────────────────────────────
  "cta.title": "Machen wir Ihren Auftritt zum *Verkäufer*.",
  "cta.text":
    "Schicken Sie zwei Zeilen zu Ihrer Firma. Innerhalb eines Tages bekommen Sie eine klare Antwort und einen ersten Blick auf Ihren größten Hebel.",
  "cta.primary": "Projekt anfragen",

  // ── Video-Analyse (Outreach-Seite, auf der Startseite unverlinkt) ──────
  "video.title": "Die Video-Analyse Ihres *Falls*.",
  "video.intro":
    "Sie schicken Ihre Domain. Sie bekommen ein persönlich aufgenommenes Video: was Interessenten heute sehen, wo Anfragen versickern, was ein System ändern würde.",
  "video.note": "Persönlich aufgenommen · Antwort binnen 24 h",
  "video.submit": "Video-Analyse anfordern",
};

export const FIELD_LABELS: Record<string, string> = {
  "hero.brand": "Hero · Riesenwort (Markenname)",
  "hero.tagline": "Hero · Der eine Satz darunter",
  "hero.media_url":
    "Hero · Media-URL (.webp/.png = Bild, .webm/.mp4 = Auto-Loop-Video; leer = Platzhalter)",
  "trust.label": "Trust-Leiste · Label über den Logos",
  "features.title": "Features · Überschrift (*Wort* = Hervorhebung)",
  "features.intro": "Features · Unterzeile",
  "proof.riegel_facts": "Riegel · Fakten (eine Zeile = ein Punkt)",
  "proof.vision_facts": "Vision Group · Fakten (eine Zeile = ein Punkt)",
  "proof.koenigswege_facts": "Königswege · Fakten (eine Zeile = ein Punkt)",
  "proof.stat": "Beweis · Kennzahl (nur Zahl, Puffballon-Ziffern)",
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
