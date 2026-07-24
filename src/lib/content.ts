/**
 * Zentrale Text-Verwaltung der Landingpage.
 * - DEFAULTS = die im Code definierte Copy (Conversion-Architektur, docs/CONVERSION.md)
 * - Overrides kommen aus Supabase (public.website_content) und werden in /studio
 *   ohne Deploy gepflegt. Fail-open: ohne Env/DB rendert die Seite die Defaults.
 * - *Wort* in Headline-Feldern wird als <em> gerendert (siehe RichText in page.tsx).
 * - \n in Listen-Feldern trennt Einträge.
 */

export const DEFAULTS: Record<string, string> = {
  // ── Hero (Direct/Organic) ──────────────────────────────────────────────
  "hero.title": "Sie geben zwei Stunden. Sie bekommen ein *Vertriebssystem*.",
  "hero.subtitle":
    "Portal, CRM-Anbindung, KI-Sichtbarkeit — zum Festpreis, live in Wochen. Das Referenzprojekt ist echt: klicken Sie rein.",
  "hero.plate_context": "Immobilienmakler · Rhein-Neckar · 16.500 € Festpreis · live",

  // ── Hero-Variante Paid Ads (?via=ad) ───────────────────────────────────
  "heroad.title": "Ein System, das Anfragen *holt*, qualifiziert und in Ihr CRM legt.",
  "heroad.subtitle":
    "Zum Festpreis, in Wochen live, gebaut von einer Person. Das Referenzprojekt ist echt — klicken Sie rein.",

  // ── Hero-Variante Cold Outreach (?via=video) ───────────────────────────
  "herovideo.title": "Sie kommen aus meinem Video. Hier ist der *Rest*.",
  "herovideo.subtitle":
    "Unten das System, das Sie gesehen haben — live. Daneben: was so etwas kostet und wie schnell es geht.",

  // ── Sichtbarkeits-Check ────────────────────────────────────────────────
  "check.title": "Was sehen ChatGPT und Google, wenn sie *Sie* lesen?",
  "check.intro":
    "Screenshot, neun technische Prüfpunkte und eine Sichtbarkeitsprüfung durch beuwy Agenten — ehrlich, in 25 Sekunden, ohne Login.",

  // ── Status-quo-Kosten ──────────────────────────────────────────────────
  "kosten.title": "Der Weg zum Auftrag beginnt nicht mehr auf Ihrer *Website*.",
  "kosten.intro":
    "Eigentümer, Anleger und Patienten prüfen Anbieter zuerst in Google-AI-Übersichten und Chat-Assistenten. Wer dort nicht vorkommt, verliert Aufträge unbemerkt.",
  "kosten.row1_label": "Früher",
  "kosten.row1_text": "Suche → zehn blaue Links → Ihre Website → Anruf.",
  "kosten.row2_label": "Heute",
  "kosten.row2_text":
    "Frage an Google oder ChatGPT → eine Antwort mit zwei, drei Namen → Anruf beim Erstgenannten.",
  "kosten.row3_label": "Konsequenz",
  "kosten.row3_text":
    "Die Antwort der Maschine ist die neue erste Filterstufe. Sie findet statt, bevor Sie vom Interessenten erfahren.",
  "kosten.bridge":
    "Ob Sie in diesen Antworten vorkommen, ist keine Meinungsfrage — es ist messbar. Der Check unten zeigt es Ihnen in 25 Sekunden.",
  "kosten.stat": "58,5",
  "kosten.stat_text": "der Google-Suchen enden bereits ohne Klick auf eine Website.",
  "kosten.stat_source": "Quelle · SparkToro/Datos, 2024",

  // ── Referenzen ─────────────────────────────────────────────────────────
  "proof.title": "Zwei Systeme, die es *beweisen*.",
  "proof.intro": "Beide live, beide im Vertrieb im Einsatz, beide von einer Person gebaut.",
  "proof.riegel_branch": "Immobilienmakler · Rhein-Neckar",
  "proof.riegel_facts":
    "207 Unterseiten · Preisatlas für 33 Städte\nImmobilien-Rechner: Bewertung in 60 Sekunden\nonOffice-Anbindung · Portal · Terminbuchung",
  "proof.riegel_mechanic":
    "Der Rechner holt die Eigentümer-Anfrage, die Standortseiten machen Riegel zur zitierbaren Antwort, onOffice macht daraus einen Vertriebsprozess.",
  "proof.saadi_branch": "Wohnungsprivatisierung · Mannheim",
  "proof.saadi_facts":
    "Vertriebspartner-Funnel mit Qualifizierungslogik\nProdukt-Strecken mit Gutachten & Prospekt-Standards\nImmoCampus als zweite Rekrutierungs-Rampe",
  "proof.saadi_mechanic":
    "Die Partner-Strecke qualifiziert Vertriebe, disqualifiziert früh — und rekrutiert dadurch planbar statt zufällig.",
  "proof.stat": "315",
  "proof.stat_text":
    "verkaufte Wohnungen über einen Social-Media-Funnel — mitten in der Zinskrise.",
  "proof.stat_note":
    "acta, 2023 mitgegründet: Vertrieb selbst skaliert — von der Person, die auch Ihr System baut.",

  // ── Leistungspakete ────────────────────────────────────────────────────
  "pricing.title": "Drei Pakete. Ein *Festpreis*.",
  "pricing.intro":
    "Der Preis steht fest, bevor Sie zusagen. Was im Paket steht, ist der Lieferumfang — nicht der Einstieg.",
  "pricing.tier1_name": "Das Fundament",
  "pricing.tier1_result": "Ein Auftritt, der Vertrauen erzeugt — und von Maschinen verstanden wird.",
  "pricing.tier1_price": "7.900 €",
  "pricing.tier1_features":
    "Positionierung & Website-System\nKI-Lesbarkeit: schema.org, llms.txt, zitierfähige Inhalte\nTerminbuchung statt Kontaktformular\nImpressum bis Ladezeit: alles gelöst",
  "pricing.tier2_name": "Das Vertriebssystem",
  "pricing.tier2_result": "Ein Portal, das Anfragen erzeugt, qualifiziert und in Ihr CRM übergibt.",
  "pricing.tier2_price": "16.900 €",
  "pricing.tier2_features":
    "Alles aus dem Fundament\nRechner, Portal oder Funnel — das Werkzeug, das Ihre Kunden anzieht\nCRM-Anbindung (z. B. onOffice)\nStandort- und Fachseiten für Google & KI-Antworten\nReferenzklasse: das RIEGEL-System — oben live verlinkt",
  "pricing.tier2_badge": "Meistgewählt",
  "pricing.tier3_name": "Das Betriebssystem",
  "pricing.tier3_result": "Ihre Firma läuft auf eigenem System: CRM, Automatisierungen, Sichtbarkeit.",
  "pricing.tier3_price": "ab 34.000 €",
  "pricing.tier3_features":
    "Alles aus dem Vertriebssystem\nCustom CRM oder tiefe Prozess-Automatisierung mit KI\nMehrere Funnels und Portale\nLaufender Ausbau und Betrieb",
  "pricing.garantie1":
    "Diagnose-Garantie: Überzeugt der Systementwurf nicht, wird die Diagnose erstattet.",
  "pricing.garantie2": "Festpreis-Garantie: Mehraufwand ist mein Risiko, nicht Ihres.",
  "pricing.agentur_vergleich":
    "Zum Vergleich: Der Agentur-Standard für diese Projektklasse sind drei bis sechs Monate, ein Pitch-Prozess — und am Ende macht ein Junior die Arbeit.",
  "pricing.cta": "Projekt anfragen",

  // ── Arbeitsweise (System) ──────────────────────────────────────────────
  "system.title": "Eine Website verkauft nicht. Ein *System* schon.",
  "system.intro":
    "Vier Ebenen, die ineinandergreifen — gedacht von Ihrem Vertriebsprozess her, nicht von der Startseite.",
  "system.row1_title": "Marke",
  "system.row1_text": "Eine Positionierung, die ein Kunde nachsprechen und eine Maschine zitieren kann.",
  "system.row2_title": "Website + Werkzeuge",
  "system.row2_text":
    "Rechner, Portale, Buchung: Werkzeuge, die dem Besucher sofort etwas geben — und Ihnen die Anfrage.",
  "system.row3_title": "KI-Sichtbarkeit",
  "system.row3_text":
    "Strukturierte Daten und zitierfähige Inhalte, damit Google-AI und Chat-Assistenten Sie als Antwort verwenden.",
  "system.row4_title": "Prozess + CRM",
  "system.row4_text": "Jede Anfrage landet dort, wo Ihr Vertrieb arbeitet — nicht in einem Posteingang.",

  // ── Mechanik (Reason-Why vor dem Preis) ────────────────────────────────
  "system.mechanik_title": "Festpreis und Tempo sind kein *Trick*.",
  "system.mechanik_intro":
    "Der Grund, warum eine Person liefert, wofür Agenturen Monate ansetzen:",
  "system.mechanik1_title": "Kein Overhead",
  "system.mechanik1_text":
    "Keine Pitch-Teams, keine Abstimmungsschleifen, keine Übergaben. Diese Monate bezahlt sonst der Kunde mit.",
  "system.mechanik2_title": "KI-gestützte Produktion",
  "system.mechanik2_text":
    "Gebaut mit denselben KI-Systemen, die ich verkaufe. Deshalb Wochen statt Monate — und ein Preis, der hält.",
  "system.mechanik3_title": "Erprobtes Fundament",
  "system.mechanik3_text":
    "Kein Projekt startet bei null: Buchung, CRM-Anbindung und KI-Lesbarkeit sind gebaut und im Einsatz. Ihr System beginnt auf Referenzniveau.",

  // ── Prozess & Qualifizierung ───────────────────────────────────────────
  "process.title": "Erst die *Prüfung*, dann die Diagnose, dann das System.",
  "process.intro": "Festpreis, fester Umfang, eine Ansprechperson — die, die es baut.",
  "process.step1_title": "Anfrage & Prüfung",
  "process.step1_meta": "24 h · kostenlos",
  "process.step1_text":
    "Sie schicken Ihre Anfrage. Ich prüfe, ob Ihr Projekt passt — und antworte binnen 24 Stunden ehrlich, auch wenn die Antwort Nein ist.",
  "process.step2_title": "Diagnose",
  "process.step2_meta": "1.990 € · voll angerechnet",
  "process.step2_text":
    "Ein Dokument über Ihren digitalen Vertriebsweg: wo Anfragen entstehen, wo sie verloren gehen, was das System leisten muss. Es gehört Ihnen — samt Systementwurf. Überzeugt er nicht: Geld zurück.",
  "process.step3_title": "Systembau",
  "process.step3_meta": "Festpreis · ab 7.900 €",
  "process.step3_text":
    "Marke, Portal, Werkzeuge, CRM-Anbindung, KI-Sichtbarkeit — live, nicht als Konzept. Danach Betrieb und Ausbau, wenn Sie wollen.",
  "process.capacity":
    "Ich nehme nicht jedes Projekt. Nicht als Verkaufstrick — jedes System wird von einer Person gebaut, und die baut gerade auch andere. Deshalb die Prüfung vor der Zusage.",

  // ── Founder ────────────────────────────────────────────────────────────
  "founder.title": "Sie sprechen mit dem, der es *baut*.",
  "founder.text1":
    "Alexander Pütter arbeitet seit 2009 an Marken — erst für Bosch-Gruppe, Continental und Michelin, seit 2017 mit beuwy für inhabergeführte Unternehmen. 2023 hat er acta mitgegründet und den Vertrieb selbst skaliert — die 315 verkauften Wohnungen oben stammen aus diesem Funnel.",
  "founder.text2": "Ich kenne Kaufentscheidungen, weil ich sie selbst auslöse.",
  "founder.solo":
    "Eine Person heißt: keine Übergabe an Juniors, keine Stille Post, keine Meetings über Meetings. Der Code, die Zugänge und das System gehören am Ende Ihnen — dokumentiert und übergabefähig.",
  "founder.caption": "Alexander Pütter · Ludwigshafen am Rhein",

  // ── FAQ ────────────────────────────────────────────────────────────────
  "faq.title": "Die Fragen, die im ersten Gespräch *immer* kommen.",
  "faq.q1": "Warum kostet das 16.900 € und nicht 3.000 € wie ein Baukasten?",
  "faq.a1":
    "Ein Baukasten liefert eine Seite. Hier entsteht ein System: Positionierung, Werkzeuge, CRM-Anbindung, KI-Sichtbarkeit — die Klasse, die Sie in den Referenzen live anklicken können. Der Agentur-Standard für diese Klasse liegt bei drei bis sechs Monaten und deutlich höheren Budgets.",
  "faq.q2": "Warum gibt es keinen Pitch?",
  "faq.a2":
    "Ein Pitch zeigt Folien. Ich zeige Systeme, die live sind — klicken Sie in die Referenzen. Den Rest leistet die Diagnose: bezahlt, aufs Projekt angerechnet, und das Dokument gehört Ihnen. Überzeugt der Entwurf nicht, wird sie erstattet.",
  "faq.q3": "Was, wenn die eine Person ausfällt?",
  "faq.a3":
    "Hier berät und baut dieselbe Person — es gibt keine Übergabe, in der Wissen verloren geht. Alles ist von Tag eins dokumentiert, Code und Zugänge gehören Ihnen: jederzeit übergabefähig.",
  "faq.q4": "Wie viel Zeit kostet mich das Projekt?",
  "faq.a4":
    "Zwei Stunden Input am Anfang, zwei Freigaben unterwegs. Wenn Sie mehr Zeit investieren wollen, gern — nötig ist es nicht.",
  "faq.q5": "Was heißt KI hier konkret?",
  "faq.a5":
    "Drei Dinge. Sichtbarkeit: strukturierte Daten und zitierfähige Inhalte, damit ChatGPT und Google-AI Sie empfehlen. Produktion: KI-gestützter Bau — deshalb Festpreis und Tempo. Prozesse: Automatisierungen dort, wo Ihr Team Zeit verliert.",
  "faq.q6": "Wie schnell ist das System live?",
  "faq.a6":
    "In Wochen, nicht Monaten — den konkreten Termin bekommen Sie mit dem Systementwurf, und er ist Teil des Festpreises.",

  // ── CTA ────────────────────────────────────────────────────────────────
  "cta.title": "Der nächste Schritt ist eine Prüfung, kein Pitch.",
  "cta.text":
    "Schicken Sie Ihre Anfrage oder buchen Sie direkt 30 Minuten. Sie bekommen binnen 24 Stunden eine ehrliche Antwort — auch wenn sie Nein lautet.",
  "cta.primary": "Projekt anfragen",
  "cta.secondary": "Oder zuerst: die Video-Analyse Ihres Falls anfordern",
  "cta.meta": "Kostenlos · kein Pitch · Antwort binnen 24 h",

  // ── Video-Analyse (eigene Seite mit Formular statt mailto) ─────────────
  "video.title": "Die Video-Analyse Ihres *Falls*.",
  "video.intro":
    "Sie schicken Ihre Domain. Sie bekommen ein persönlich aufgenommenes Video: was Interessenten und Maschinen heute sehen, wo Anfragen verloren gehen, was ein System ändern würde.",
  "video.note": "Kostenlos · persönlich aufgenommen, keine Vorlage · Antwort binnen 24 h",
  "video.submit": "Video-Analyse anfordern",
};

export const FIELD_LABELS: Record<string, string> = {
  "hero.title": "Hero · Überschrift (*Wort* = Hervorhebung)",
  "hero.subtitle": "Hero · Unterzeile",
  "hero.plate_context": "Hero · Kontextzeile Referenz (Branche · Preis · Timeline)",
  "heroad.title": "Hero-Variante Ads (?via=ad) · Überschrift",
  "heroad.subtitle": "Hero-Variante Ads · Unterzeile",
  "herovideo.title": "Hero-Variante Video-Outreach (?via=video) · Überschrift",
  "herovideo.subtitle": "Hero-Variante Video-Outreach · Unterzeile",
  "pricing.tier1_features": "Paket 1 · Merkmale (eine Zeile = ein Punkt)",
  "pricing.tier2_features": "Paket 2 · Merkmale (eine Zeile = ein Punkt)",
  "pricing.tier3_features": "Paket 3 · Merkmale (eine Zeile = ein Punkt)",
  "proof.riegel_facts": "Riegel · Fakten (eine Zeile = ein Punkt)",
  "proof.saadi_facts": "Saadi · Fakten (eine Zeile = ein Punkt)",
  "process.capacity": "Prozess · Kapazitäts-Absatz (echte Zahl eintragen, sobald entschieden)",
  "kosten.stat": "Kennzahl (nur Zahl, ohne %)",
  "proof.stat": "Referenzen · Kennzahl (nur Zahl)",
  "system.mechanik_title": "Mechanik · Überschrift (Reason-Why vor dem Preis)",
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
