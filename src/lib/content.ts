/**
 * Zentrale Text-Verwaltung — JEDER Text der Seite läuft über diese Keys
 * und ist damit in /studio (Login: /login) ohne Deploy editierbar.
 * - DEFAULTS = die im Code definierte Copy
 * - Overrides kommen aus Supabase (public.website_content)
 * - Fail-open: ohne Env/DB rendert die Seite die Defaults
 * - *Wort* in Headline-Feldern wird als <em> gerendert (siehe RichText)
 *
 * Aufbau = Einwandskette (Seiten-System, 18.08.2026):
 * Hero (Traum) → Herkunft (Vertrauen) → Beweis-Schnellschuss → Pain (E1)
 * → Mechanismus + Playground (E2/E5) → Band (CTA) → Live-Check (Magnet)
 * → Fälle (E3) → Ablauf/Rechner (E4/E6) → Kapazität + Filter → FAQ → Finale.
 * Ein CTA-Wortlaut: „Systemgespräch anfragen". Kein Preis, nirgends.
 */

export const DEFAULTS: Record<string, string> = {
  /* ── 01 Hero — Traumzustand, positiv, belegbare Prozess-Aussage ────── */
  "hero.title": "Neukunden nach *System*.",
  "hero.subtitle":
    "beuwy baut Marke, Werbeanzeigen und Vertriebssystem als ein zusammenhängendes System — und verantwortet, was dabei herauskommt: Anfragen, Termine, Abschlüsse.",
  "hero.cta": "Systemgespräch anfragen",
  "hero.cta_secondary": "Live-Check starten",

  /* ── 02 Herkunft — Vertrauen kommt vor dem Problem ─────────────────── */
  "trust.label":
    "Seit 2009 · von Bosch bis PURELEI · heute: Dienstleister mit hohen Auftragswerten",

  /* ── 03 DREAM STATE — der Zustand, den er kaufen will ─────────────── */
  "dream.title": "Am Monatsersten wissen Sie, wie viele Kunden *kommen*.",
  "dream.text":
    "Keine Diskussion mehr über Ihren Preis, weil der Auftritt ihn beantwortet. Keine Anfrage mehr, die im Postfach verhungert. Sie steuern Neukunden wie eine Position im Budget — und der Bericht liegt jeden Montag auf dem Tisch.",

  /* ── 05 PROOF — Wochenbericht-Bild + drei belegte Zahlen ─────────── */
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

  /* ── 04 Pain — der Leser erkennt sich, E1 stirbt ───────────────────── */
  "diagnose.title":
    "Sie verlieren Aufträge an Leute, die schlechter arbeiten als Sie.",
  "diagnose.q1": "„Wir sind besser als die Konkurrenz.“",
  "diagnose.a1":
    "Der Kunde sieht das nicht. Er vergleicht drei Auftritte und wählt den, der teurer aussieht. Ihr Preis wird zum Argument gegen Sie.",
  "diagnose.q2": "„Wir bekommen genug Anfragen.“",
  "diagnose.a2":
    "Anfragen sind keine Kunden. Ruft niemand innerhalb von Minuten zurück, ist die Anfrage kalt, bevor Ihr Angebot geschrieben ist.",
  "diagnose.q3": "„Das läuft bei uns über Excel.“",
  "diagnose.a3":
    "Dann läuft es über Erinnerung. Was in keinem System steht, wird nicht nachgefasst — und was nicht nachgefasst wird, kauft woanders.",

  /* ── 04 MECHANISM — warum es bisher nicht lief (Entlastung) ───────── */
  "mech.title": "Ihr Umsatz versickert zwischen Ihren *Dienstleistern*.",
  "mech.text":
    "Die Agentur macht Ihnen die Marke, der Freelancer die Anzeigen. Aber die Anfrage von Donnerstagabend ruft keiner zurück. Es lag nie an Ihnen und selten am Budget — es lag an den Lücken zwischen vier Beteiligten, die sich gegenseitig nicht kennen.",
  "play.title": "Vier Teile, ein Verantwortlicher. Drehen Sie *selbst*.",
  "play.tagline": "Mehr Anfragen. Mehr Abschlüsse. Mehr Freiheit.",
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

  /* ── CTA-Band — ein Zwischenruf, ein Wortlaut ──────────────────────── */
  "band1.title":
    "Das Systemgespräch dauert 30 Minuten. Danach wissen Sie, wo es bei Ihnen klemmt.",
  "band1.note": "Video oder Telefon · Sie sprechen mit dem, der baut",
  "band2.title":
    "Sie haben jetzt gesehen, was drin ist. Reden wir über den Weg dorthin.",
  "band2.note": "Antwort innerhalb von 24 Stunden",

  /* ── 06 Live-Check — der Lead-Magnet ohne Gespräch ─────────────────── */
  "check.title": "Prüfen Sie uns an Ihrer eigenen *Website*.",
  "check.text":
    "Der Live-Check zeigt in 25 Sekunden, was Interessenten sehen — neun Messpunkte, eine ehrliche Einschätzung. Reden müssen Sie dafür mit niemandem.",

  /* ── 07 Fälle — E3 stirbt: funktioniert bei Leuten wie mir ─────────── */
  "refs.title": "Drei Auftritte. Und was *danach* passiert ist.",
  "refs.riegel_name": "RIEGEL Immobilien · Rhein-Neckar",
  "refs.riegel_text":
    "Neue Marke, neue Website, Bewertungsrechner mit amtlichen Bodenrichtwerten und über 5.000 ausgewerteten Verkäufen, angebunden an das Maklersystem. Danach: neun Abschlüsse in sechs Wochen. Das Projekt hatte sich nach drei Wochen bezahlt gemacht. Heute Platz 21 von über 25.000 Maklern beim ImmoScout24-Award.",
  "refs.riegel_link": "riegel-immobilien.de",
  "refs.vision_name": "Vision Group · Immobilien, Mannheim",
  "refs.vision_text":
    "Als Vision Group einstieg, bestand die Firma aus zwei Gründern und einer Buchhalterin. Wir haben die Marke und die Unterlagen gebaut, mit denen man vor Investoren besteht — heute ist KKR ihr Partner. Andere Größenordnung, gleiches Prinzip: Wer vor einer großen Entscheidung steht, kauft zuerst Vertrauen.",
  "refs.vision_video":
    "https://beuwy.com/wp-content/uploads/2025/11/Vision-Imagefilm.webm",
  "refs.koenigswege_name": "Königswege · Finanzvertrieb",
  "refs.koenigswege_text":
    "Marke, Auftritt und Veranstaltungen komplett neu aufgesetzt. Heute arbeiten über 2.200 Partner unter dieser Marke; das Haus steht in den Top 10 der deutschen Finanzvertriebe.",
  /* ── 06 AUTHORITY — eigener Moment, nicht mehr Fußnote im Proof ──── */
  "authority.title": "Sie sehen gerade eine *Arbeitsprobe*.",
  "authority.text":
    "Diese Seite, der Live-Check, der Rechner — selbst gebaut, wie alles bei uns. Vergleichen Sie das ruhig mit dem, was Ihre letzte Agentur abgeliefert hat. Angefangen haben wir 2009 bei Bosch und Continental; dazwischen lagen PURELEI, Rosental Organics, das Musiklabel Good Kid Records, Finanzvertriebe, Versicherer.",

  /* ── 08 Ablauf + Rechner — E4 und E6 sterben, ohne dass ein Preis fällt ── */
  "goal.title": "Rechnen wir mit Ihrem *Ziel*, nicht mit unserem Preis.",
  "goal.intro":
    "Zwei Regler. Danach wissen wir beide, worüber wir reden — und ob sich ein Gespräch für Sie überhaupt lohnt.",
  "goal.steps": "Systemgespräch|Diagnose des größten Hebels|Festpreis|Betrieb",
  "goal.after":
    "Was ein System kostet, hängt davon ab, was es tragen muss — deshalb steht am Anfang keine Preisliste, sondern die Diagnose. Danach steht Ihr Festpreis. Wird es aufwendiger als gedacht, ist das mein Problem.",

  /* ── 09 Kapazität + Filter — Statusumkehr, ehrlich und prüfbar ─────── */
  "fit.title": "Mehr als drei Systeme gleichzeitig baue ich *nicht*.",
  "fit.line1":
    "Ich baue jedes System selbst. Drei gleichzeitig gehen, vier nicht — deshalb hat ein Systemgespräch immer auch die Frage im Gepäck, wann ich anfangen kann.",
  "fit.line2":
    "Und unter 15.000 € Auftragswert rechnet sich ein System nicht. Das sage ich Ihnen im Gespräch dann auch so, statt Ihnen etwas zu verkaufen, das sich nie trägt.",

  /* ── 10 Häufige Fragen — Rest-Einwände ─────────────────────────────── */
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

  /* ── 11 Finale — die niedrigste Hürde der Seite ────────────────────── */
  "final.title": "Schreiben Sie mir zwei *Zeilen*.",
  "final.text":
    "Was Sie verkaufen, woran es hakt. Morgen wissen Sie, wo Ihr größter Hebel liegt — schriftlich, nicht als Verkaufsgespräch getarnt.",
  "final.cta": "Systemgespräch anfragen",
  "final.note": "Antwort innerhalb von 24 Stunden.",

  /* ── /termin — Pains sofort, Ablauf entmystifiziert ────────────────── */
  "termin.title": "30 Minuten. Danach wissen Sie, wo Ihre Aufträge verloren gehen.",
  "termin.intro":
    "Sie sprechen direkt mit Alexander Pütter — nicht mit einem Account-Manager.",
  "termin.loss_label": "Wo Aufträge verloren gehen",
  "termin.loss1":
    "Der Kunde vergleicht drei Auftritte und nimmt den, der teurer aussieht.",
  "termin.loss2":
    "Anfragen, die nicht innerhalb von Minuten zurückgerufen werden, kaufen woanders.",
  "termin.loss3": "Ihre Marke war 2019 gut. Ihre Kunden vergleichen mit 2026.",
  "termin.flow_label": "Was im Gespräch passiert",
  "termin.flow1":
    "Wir schauen uns Ihren Auftritt gemeinsam an, live am Bildschirm.",
  "termin.flow2":
    "Sie nennen mir Ihre Zahlen — Anfragen, Termine, Abschlüsse. Ich sage Ihnen, wo es klemmt.",
  "termin.flow3":
    "Den größten Hebel bekommen Sie schriftlich, innerhalb von 24 Stunden. Ob wir zusammenarbeiten, entscheiden Sie danach.",

  /* ── Video-Analyse (Outreach-Seite, auf der Startseite unverlinkt) ── */
  "video.title": "Die Video-Analyse Ihres *Falls*.",
  "video.intro":
    "Sie schicken Ihre Domain. Sie bekommen ein persönlich aufgenommenes Video: was Interessenten heute sehen, wo Anfragen versickern, was ein System ändern würde.",
  "video.note": "Persönlich aufgenommen · Antwort binnen 24 h",
  "video.submit": "Video-Analyse anfordern",
};

export const FIELD_LABELS: Record<string, string> = {
  "hero.title": "Hero · H1 (*Wort* = Hervorhebung)",
  "hero.subtitle": "Hero · Subline (Mechanismus + Verantwortung)",
  "hero.cta": "Der eine CTA-Wortlaut der ganzen Seite",
  "hero.cta_secondary": "Hero · Zweitweg (Live-Check)",
  "trust.label": "Herkunft · Zeile über den Logos",
  "diagnose.title": "Pain · Kopfzeile (bewusst ohne Hervorhebung)",
  "play.title": "Playground · Überschrift (*Wort* = Hervorhebung)",
  "play.intro": "Playground · Mechanismus-Absatz (E2: Entlastung)",
  "check.text": "Live-Check · Lead-Magnet-Satz",
  "refs.vision_video": "Fälle · Vision-Imagefilm (URL, leer = ohne Video)",
  "refs.selbst_head": "Fälle · Selbstreferenz-Kopf",
  "refs.selbst_text": "Fälle · Selbstreferenz + Herkunftsbreite",
  "goal.after": "Ablauf · Festpreis-Logik (kein Preis nennen)",
  "fit.line1": "Kapazität · muss der Wahrheit entsprechen",
  "fit.line2": "Filter · Schwelle 15.000 €",
  "termin.title": "/termin · Kopfzeile",
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
