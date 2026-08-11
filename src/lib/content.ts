/**
 * Zentrale Text-Verwaltung der Landingpage.
 * - DEFAULTS = die im Code definierte Copy (Conversion-Architektur, docs/CONVERSION.md)
 * - Overrides kommen aus Supabase (public.website_content) und werden in /studio
 *   ohne Deploy gepflegt. Fail-open: ohne Env/DB rendert die Seite die Defaults.
 * - *Wort* in Headline-Feldern wird als <em> gerendert (siehe RichText in page.tsx).
 * - \n in Listen-Feldern trennt Einträge.
 *
 * Copy-Stand: Clean-Relaunch (Workflow wf_35dd9f74) — Positionierung
 * Premium-Markendesign + High-Ticket-Lead-Generierung. Regeln: simpel,
 * positiv (keine Negativwörter an Vertrauensstellen), nur belegbare Zahlen
 * (UWG-Check), Anker vor dem Preis, ein CTA pro Gedanke.
 */

export const DEFAULTS: Record<string, string> = {
  // ── Hero (Direct/Organic) ──────────────────────────────────────────────
  "hero.title": "10.000 € pro Abschluss. Und Ihr *Auftritt*?",
  "hero.subtitle":
    "Wer teuer verkauft, muss teuer wirken. beuwy baut die Marke, die zu Ihren Preisen passt, und das System, das aus Anzeigen Abschlüsse macht. Das Beispiel ist echt — klicken Sie rein.",
  "hero.plate_context": "RIEGEL Immobilien · 9 Abschlüsse · 342.000 € in 6 Wochen",

  // ── Hero-Variante Paid Ads (?via=ad) ───────────────────────────────────
  "heroad.title": "Klicks sind günstig. Kunden mit großem Budget sind *teuer*.",
  "heroad.subtitle":
    "beuwy filtert Ihre Anzeigen auf Käufer, die 10.000 € und mehr abschließen — vom ersten Klick bis zur Unterschrift.",

  // ── Hero-Variante Cold Outreach (?via=video) ───────────────────────────
  "herovideo.title": "Sie kennen das System aus meinem Video. Hier ist der *Rest*.",
  "herovideo.subtitle":
    "Unten sehen Sie Zahlen, Preise und den nächsten Schritt.",

  // ── Problem ────────────────────────────────────────────────────────────
  "problem.title": "Zum Bank-Termin der gute Anzug. Zur eigenen Website der *Jogginganzug*.",
  "problem.intro":
    "Wer für 10.000 € und mehr verkauft, verkauft an Menschen, die genau hinschauen. Ein Auftritt aus dem Baukasten kostet genau dort den Abschluss.",
  "problem.row1_label": "Marke",
  "problem.row1_text":
    "Ihr Auftritt sieht nach Baukasten aus. Der Kunde vergleicht — und wählt den, der teurer aussieht.",
  "problem.row2_label": "Anfragen",
  "problem.row2_text":
    "Anfragen kommen rein. Ruft niemand sofort an, sind sie nach Minuten kalt.",
  "problem.row3_label": "Vertrieb",
  "problem.row3_text": "Ihr Team pflegt Excel-Listen. Es sollte telefonieren.",

  // ── Beweis (Referenzen) ────────────────────────────────────────────────
  "proof.title": "342.000 €. Über 2.200 Partner. *Top 10*.",
  "proof.intro": "Drei Branchen, ein Muster: Die bessere Marke macht die größeren Abschlüsse.",
  "proof.riegel_branch": "Immobilien · Rhein-Neckar",
  "proof.riegel_facts":
    "28.000 € Projekt — nach 3 Wochen bezahlt\n9 Abschlüsse in 6 Wochen · im Schnitt 38.000 €\nTop 21 von über 25.000 Maklern · ImmoScout24 ImmoAward 2025\nTelefonnummer freiwillig — Anfragen reichlich",
  "proof.riegel_mechanic":
    "Der Rechner nutzt amtliche Grundstückswerte, öffentliche Daten und über 5.000 ausgewertete Verkäufe. Sein PDF-Bericht verkauft mit: Der Makler legt ihn ausgedruckt auf den Tisch.",
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

  // ── Sichtbarkeits-Check (Signature-Tool bleibt) ────────────────────────
  "check.title": "Wie wirkt Ihr Auftritt? Testen Sie es *live*.",
  "check.intro":
    "Domain eintippen: Screenshot, neun Messpunkte und eine ehrliche Einschätzung durch beuwy Agenten. Dauert 25 Sekunden.",

  // ── Produkt ────────────────────────────────────────────────────────────
  "product.title": "Marke und Vertrieb aus einer *Hand*.",
  "product.intro":
    "Eine bessere Marke verändert mehr als die Optik: größere Abschlüsse, mehr Bewerbungen, stärkere Partner. Und Banken, die zuhören.",
  "product.row1_title": "Marke",
  "product.row1_text":
    "Markendesign aus der Welt der 100.000-€-Relaunches — gebaut für Ihre Preisklasse.",
  "product.row2_title": "Anzeigen",
  "product.row2_text":
    "Instagram, Facebook, LinkedIn, TikTok: Anzeigen dort, wo Ihre Kunden abends scrollen.",
  "product.row3_title": "Vertriebssystem",
  "product.row3_text":
    "Ein CRM, das jede Anfrage festhält. Setter und Closer startklar, jeder Anruf wird erfasst.",
  "product.row4_title": "Zahlen",
  "product.row4_text": "Jede Woche ein Bericht. Jede Woche wird nachgeschärft.",

  // ── Mechanik (Reason-Why vor dem Preis) ────────────────────────────────
  "mechanik.title": "Kleine Werkstatt. Große *Wirkung*.",
  "mechanik.intro":
    "Warum das Ergebnis nach Großagentur aussieht und der Preis bezahlbar bleibt:",
  "mechanik.m1_title": "Direkt zum Macher",
  "mechanik.m1_text":
    "Sie sprechen mit dem, der baut. Abstimmungsschleifen fallen weg.",
  "mechanik.m2_title": "KI-gestützte Produktion",
  "mechanik.m2_text":
    "Gebaut mit denselben Werkzeugen, die später Ihre Anzeigen steuern. Deshalb Wochen statt Monate.",
  "mechanik.m3_title": "Erprobtes Fundament",
  "mechanik.m3_text":
    "CRM, Anruf-Erfassung und Rechner-Systeme sind gebaut und im Einsatz. Ihr System startet auf Referenzniveau.",

  // ── Leistungspakete ────────────────────────────────────────────────────
  "pricing.title": "Drei Stufen. Ein *Festpreis*.",
  "pricing.intro":
    "Große Häuser rufen für diese Klasse sechsstellige Budgets auf. Hier steht der Preis fest, bevor Sie zusagen.",
  "pricing.tier1_name": "Das Fundament",
  "pricing.tier1_result": "Eine Marke, die zu Ihren Preisen passt.",
  "pricing.tier1_price": "7.900 €",
  "pricing.tier1_features":
    "Markendesign auf Relaunch-Niveau\nWebsite, die verkauft statt nur zeigt\nTerminbuchung statt Kontaktformular\nKI-Lesbarkeit inklusive: schema.org, zitierfähige Inhalte",
  "pricing.tier2_name": "Das Vertriebssystem",
  "pricing.tier2_result":
    "Anzeigen, die Kunden mit großem Budget holen — und ein CRM, das sie hält.",
  "pricing.tier2_price": "16.900 €",
  "pricing.tier2_features":
    "Alles aus dem Fundament\nAnzeigen auf Instagram, Facebook, LinkedIn, TikTok\nEigenes CRM mit automatischen Abläufen\nSetter- und Closer-Setup mit Anruf-Erfassung\nWöchentlicher Bericht und Optimierung",
  "pricing.tier2_badge": "Empfehlung",
  "pricing.tier3_name": "Das Betriebssystem",
  "pricing.tier3_result":
    "Ihre Firma läuft auf einem eigenen System: Marke, CRM, Vertrieb, Wachstum.",
  "pricing.tier3_price": "ab 34.000 €",
  "pricing.tier3_features":
    "Alles aus dem Vertriebssystem\nMehrere Kampagnen, mehrere Zielgruppen\nTiefe Prozess-Automatisierung mit KI\nLaufender Ausbau und Betrieb",
  "pricing.einordnung":
    "Zur Einordnung: Der Riegel-Relaunch lag mit 28.000 € zwischen Stufe zwei und drei — und hatte sich nach drei Wochen bezahlt.",
  "pricing.garantie1":
    "Diagnose-Garantie: Überzeugt der Systementwurf, gilt die Diagnose als Anzahlung. Überzeugt er weniger, geht sie zurück.",
  "pricing.garantie2":
    "Festpreis-Garantie: Wird mehr nötig als geplant, trage ich das. Ihr Preis bleibt stehen.",
  "pricing.cta": "Projekt anfragen",

  // ── Prozess ────────────────────────────────────────────────────────────
  "process.title": "Erst die *Anfrage*, dann der Plan, dann das System.",
  "process.intro": "Fester Umfang und eine Ansprechperson: die, die baut.",
  "process.step1_title": "Anfrage & Kurzcheck",
  "process.step1_meta": "24 Stunden",
  "process.step1_text":
    "Sie schicken zwei Zeilen zu Ihrer Firma. Innerhalb eines Tages wissen Sie, ob Ihr Projekt passt.",
  "process.step2_title": "Diagnose",
  "process.step2_meta": "1.990 € · voll angerechnet",
  "process.step2_text":
    "Ein Dokument über Ihren Vertriebsweg: wo Anfragen entstehen, wo sie versickern, was das System leisten muss. Es gehört Ihnen. Überzeugt der Entwurf, gilt der Betrag als Anzahlung — sonst geht er zurück.",
  "process.step3_title": "Systembau",
  "process.step3_meta": "Festpreis · steht vor Start fest",
  "process.step3_text":
    "Marke, Anzeigen, CRM, Telefon-Setup — live, als fertiges System. Danach Betrieb und Ausbau, wenn Sie wollen.",
  "process.capacity":
    "Jedes System entsteht an einem Tisch: meinem. Deshalb der Kurzcheck vor der Zusage.",

  // ── Founder ────────────────────────────────────────────────────────────
  "founder.title": "Sie sprechen mit dem, der es *baut*.",
  "founder.text1":
    "Alexander Pütter arbeitet seit 2009 an Marken — erst für Bosch, Continental und Michelin. Seit 2017 baut er mit beuwy Marken und Vertriebssysteme für inhabergeführte Unternehmen: die Königswege-Marke aus der Startup-Phase (heute über 2.200 Partner) und die Mannheimer Vision Group, die KKR als Partner gewann.",
  "founder.text2": "Ich baue Marken, mit denen Menschen große Entscheidungen treffen.",
  "founder.solo":
    "Eine Person, kurze Wege. Am Ende gehören Code, Zugänge und System Ihnen — alles ist aufgeschrieben, Sie können es jederzeit weitergeben.",
  "founder.caption": "Alexander Pütter · Ludwigshafen am Rhein",

  // ── FAQ ────────────────────────────────────────────────────────────────
  "faq.title": "Fragen, die im ersten Gespräch *immer* kommen.",
  "faq.q1": "Warum kostet das 16.900 €, wenn ein Baukasten 3.000 € kostet?",
  "faq.a1":
    "Ein Baukasten liefert eine Seite. Hier entsteht ein System: Marke, Anzeigen, CRM und Telefon-Setup — die Klasse, die Sie in den Referenzen live sehen. Große Häuser brauchen dafür oft deutlich länger und deutlich mehr Budget.",
  "faq.q2": "Für wen ist das gebaut?",
  "faq.a2":
    "Für Anbieter, bei denen ein einziger Abschluss 10.000 € und mehr bringt: Immobilien, Finanzvertrieb, Bau, Geschäftskunden mit großen Aufträgen. In dieser Klasse zahlt sich ein Premium-Auftritt sofort aus.",
  "faq.q3": "Wie ist mein Projekt langfristig abgesichert?",
  "faq.a3":
    "Beratung und Bau liegen in einer Hand, alles ist von Tag eins dokumentiert. Code und Zugänge gehören Ihnen — Sie können jederzeit intern oder extern weitergeben.",
  "faq.q4": "Wie viel Zeit muss ich einplanen?",
  "faq.a4":
    "Zwei Stunden am Anfang, zwei Freigaben unterwegs. Alles Weitere ist Ihre Wahl.",
  "faq.q5": "Wo arbeitet KI im System mit?",
  "faq.a5":
    "An drei Stellen. Produktion: KI-gestützter Bau, deshalb Festpreis und Tempo. Anzeigen: KI wertet aus, welche Zielgruppe kauft. CRM: Neue Anfragen landen automatisch bei Ihrem Telefonteam.",
  "faq.q6": "Wie schnell ist das System live?",
  "faq.a6":
    "In Wochen. Den konkreten Termin bekommen Sie mit dem Systementwurf — als Teil des Festpreises.",

  // ── CTA ────────────────────────────────────────────────────────────────
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
  "hero.title": "Hero · Überschrift (*Wort* = Hervorhebung)",
  "hero.subtitle": "Hero · Unterzeile",
  "hero.plate_context": "Hero · Kontextzeile Referenz",
  "heroad.title": "Hero-Variante Ads (?via=ad) · Überschrift",
  "heroad.subtitle": "Hero-Variante Ads · Unterzeile",
  "herovideo.title": "Hero-Variante Video-Outreach (?via=video) · Überschrift",
  "herovideo.subtitle": "Hero-Variante Video-Outreach · Unterzeile",
  "proof.riegel_facts": "Riegel · Fakten (eine Zeile = ein Punkt)",
  "proof.vision_facts": "Vision Group · Fakten (eine Zeile = ein Punkt)",
  "proof.koenigswege_facts": "Königswege · Fakten (eine Zeile = ein Punkt)",
  "proof.stat": "Referenzen · Kennzahl (nur Zahl)",
  "pricing.tier1_features": "Paket 1 · Merkmale (eine Zeile = ein Punkt)",
  "pricing.tier2_features": "Paket 2 · Merkmale (eine Zeile = ein Punkt)",
  "pricing.tier3_features": "Paket 3 · Merkmale (eine Zeile = ein Punkt)",
  "process.capacity": "Prozess · Kapazitäts-Absatz",
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
