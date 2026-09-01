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

import { TOOLS_DEFAULTS, TOOLS_LABELS } from "./texte/tools";
import { VERGLEICH_DEFAULTS, VERGLEICH_LABELS } from "./texte/start-vergleich";
import { MOTION_DEFAULTS, MOTION_LABELS } from "./texte/motion";
import { INTERN_AUFGABEN_DEFAULTS, INTERN_AUFGABEN_LABELS } from "./texte/intern-aufgaben";
import { INTERN_EINBLICK_DEFAULTS, INTERN_EINBLICK_LABELS } from "./texte/intern-einblick";
import { INTERN_FLOWS_DEFAULTS, INTERN_FLOWS_LABELS } from "./texte/intern-flows";
import { INTERN_KONTAKTE_DEFAULTS, INTERN_KONTAKTE_LABELS } from "./texte/intern-kontakte";
import { INTERN_KUNDEN_DEFAULTS, INTERN_KUNDEN_LABELS } from "./texte/intern-kunden";
import { INTERN_PIPELINE_DEFAULTS, INTERN_PIPELINE_LABELS } from "./texte/intern-pipeline";
import { INTERN_SHELL_DEFAULTS, INTERN_SHELL_LABELS } from "./texte/intern-shell";

export const DEFAULTS: Record<string, string> = {
  ...TOOLS_DEFAULTS,
  ...VERGLEICH_DEFAULTS,
  ...MOTION_DEFAULTS,
  ...INTERN_AUFGABEN_DEFAULTS,
  ...INTERN_EINBLICK_DEFAULTS,
  ...INTERN_FLOWS_DEFAULTS,
  ...INTERN_KONTAKTE_DEFAULTS,
  ...INTERN_KUNDEN_DEFAULTS,
  ...INTERN_PIPELINE_DEFAULTS,
  ...INTERN_SHELL_DEFAULTS,
  /* ── 01 Hero — Traumzustand, positiv, belegbare Prozess-Aussage ────── */
  "hero.title": "Neukunden nach *System*.",
  "hero.subtitle":
    "beuwy baut Marke, Werbeanzeigen und Vertriebssystem als ein zusammenhängendes System — und verantwortet, was dabei herauskommt: Anfragen, Termine, Abschlüsse.",
  "hero.cta": "Systemgespräch anfragen",
  "hero.cta_secondary": "Live-Check starten",

  /* ── 02 Herkunft — Vertrauen kommt vor dem Problem ─────────────────── */
  "trust.label":
    "Seit 2009 · Schwerpunkt: Dienstleister mit hohen Auftragswerten · Kunden u. a. Bosch, PURELEI, Rosental",

  /* ── 03 DREAM STATE — der Zustand, den er kaufen will ─────────────── */
  "dream.title": "Am Monatsersten wissen Sie, wie viele Kunden *kommen*.",
  "dream.text":
    "Ihr Preis ist nicht mehr das erste Thema, weil der Auftritt ihn vorher beantwortet. Keine Anfrage, die im Postfach verhungert. Sie steuern Neukunden wie eine Position im Budget: der Monat ist geplant, die Woche zeigt, ob es aufgeht.",

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
  "diagnose.q4": "„Ich lebe von Empfehlungen, Werbung passt nicht zu mir.“",
  "diagnose.a4":
    "Empfehlungen bringen die Kunden, die Sie schon kennen. Alle anderen suchen Sie, bevor sie anrufen — und entscheiden dabei, ob sie anrufen.",

  /* ── 04 MECHANISM — warum es bisher nicht lief (Entlastung) ───────── */
  "mech.title": "Ihr Umsatz versickert zwischen Ihren *Dienstleistern*.",
  "mech.text":
    "Die Agentur macht Ihnen die Marke, der Freelancer die Anzeigen. Aber die Anfrage von Donnerstagabend ruft keiner zurück. Es lag nie an Ihnen und selten am Budget — es lag an den Lücken zwischen vier Beteiligten, die sich gegenseitig nicht kennen.",
  "play.title": "Drei Säulen. Ein *Umsatz*.",
  "play.tagline": "Mehr Anfragen. Mehr Abschlüsse. Mehr Freiheit.",
  "kz.title": "Und das kommt dabei heraus.",
  "kz.intro":
    "Drei Häuser, drei Kennzahlen, drei Zeiträume. Antippen, wen Sie sehen wollen.",
  "play.hint": "Säule antippen — sehen Sie, was ohne sie passiert.",

  /* Die drei Säulen: Titel, Versprechen, Beleg, und was ohne sie passiert */
  "pillar1_title": "Marke",
  "pillar1_claim": "Der Auftritt, der Ihren Preis beantwortet.",
  "pillar1_text":
    "Schrift, Farbe, Sprache, Bildwelt — gebaut nach denselben Regeln wie für Bosch oder Continental, zugeschnitten auf Ihre Preisklasse. Der Kunde entscheidet in Sekunden, in welcher Liga Sie spielen. Diese Sekunden gehören uns.",
  "pillar1_proof": "Vertrauen vor dem ersten Wort",
  "pillar1_without": "Ohne Marke vergleicht der Kunde nur Preise — und Sie sind der Teuerste.",

  "pillar2_title": "Werbeanzeigen",
  "pillar2_claim": "Sie bekommen Anfragen, keine Klickberichte.",
  "pillar2_text":
    "Motive, Texte und Zielgruppen entstehen bei uns über eigene KI-Werkzeuge. Was eine Agentur 2025 in sechs Monaten durch den Test schickte, jagen wir in vier Wochen durch. Was keine Anfragen bringt, wird abgeschaltet, bevor es Budget frisst.",
  "pillar2_proof": "Testtempo statt Bauchgefühl",
  "pillar2_without": "Ohne Anzeigen warten Sie darauf, dass Empfehlungen von allein kommen.",

  "pillar3_title": "Vertriebssystem",
  "pillar3_claim": "Keine Anfrage bleibt liegen.",
  "pillar3_text":
    "Kein Standard-CRM mit 400 Feldern, sondern ein System, das nur Ihren Ablauf kann: personalisierte Datenmail zum konkreten Objekt oder Angebot, Rückrufregel mit Telefonanbindung, automatische Wochenberichte. Was nachgefasst werden muss, steht im System — nicht in Ihrem Kopf.",
  "pillar3_proof": "Von der Anfrage bis zum Bericht",
  "pillar3_without": "Ohne System verhungert die Anfrage von Donnerstagabend im Postfach.",

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
  /* Fallstudien-Inhalte liegen in src/lib/cases.ts (Code, nicht Studio) */
  "refs.title": "Fünf Häuser. Und die *Strecke*, die sie gegangen sind.",
  "refs.intro":
    "Jede Fallstudie beginnt da, wo der Kunde stand — und endet bei dem, was heute messbar ist.",
  /* ── 06 AUTHORITY — eigener Moment, nicht mehr Fußnote im Proof ──── */
  "authority.title": "Sie sehen gerade eine *Arbeitsprobe*.",
  "authority.text":
    "Diese Seite, der Live-Check, der Rechner — selbst gebaut, wie alles bei uns. Vergleichen Sie das ruhig mit dem, was Ihre letzte Agentur abgeliefert hat.",
  "authority.brands_label": "Seit 2009 gebaut für",
  "authority.brands":
    "Bosch|Continental|Michelin|PURELEI|Rosental Organics|Good Kid Records|Vision Group|Königswege|RIEGEL Immobilien",

  /* ── 08 Ablauf + Rechner — E4 und E6 sterben, ohne dass ein Preis fällt ── */
  "goal.title": "Rechnen wir mit Ihrem *Ziel*, nicht mit unserem Preis.",
  "goal.intro":
    "Zwei Regler. Danach wissen wir beide, worüber wir reden — und ob sich ein Gespräch für Sie überhaupt lohnt.",
  "goal.steps": "Systemgespräch|Diagnose des größten Hebels|Festpreis|Betrieb",
  "goal.after":
    "Was ein System kostet, hängt davon ab, was es tragen muss — deshalb steht am Anfang keine Preisliste, sondern die Diagnose. Danach steht Ihr Festpreis. Wird es aufwendiger als gedacht, ist das mein Problem.",

  /* ── 09 Kapazität + Filter — Statusumkehr, ehrlich und prüfbar ─────── */
  "fit.title": "Mehr als drei Systeme gleichzeitig baue ich *nicht*.",
  "fit.num1": "3",
  "fit.num2": "15.000 €",
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
  "beleg.title": "Alles, was hier steht, können Sie *nachprüfen*.",
  "beleg.intro":
    "Drei Häuser, sieben Zahlen, jede mit ihrer Quelle. Keine Kundenstimmen ohne Nachnamen, keine Screenshots ohne Datum.",
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

  /* ══ LIGHT MAKLER STYLE (Redesign 2026-08) — neue Welt-Keys ══
     Platzhalter mit Sought-after-Effekt; Alex passt Zahlen und
     Namen im Studio an, bevor Freigaben stehen. */

  "mk.hero.eyebrow": "Marke · Website · Automatisierung",
  "mk.hero.title": "Das System hinter Deutschlands *besten*",
  "mk.hero.rotation": "Maklern",
  "mk.hero.subtitle":
    "beuwy bringt 17 Jahre Markenarbeit mit. Ihr Auftritt ist in 4–6 Wochen live.",
  "mk.hero.cta": "Zusammenarbeit anfragen",
  "mk.hero.cta_hinweis": "Antwort in 24 Stunden",
  "mk.hero.cta2": "Ergebnisse ansehen",
  "mk.hero.checks":
    "Marke & Design~beantwortet Ihren Preis|Website & Funnel~sortiert Anfragen vor, bevor Sie abheben|Automatisierung~arbeitet, während Sie verkaufen",
  "mk.hero.badge_label": "Für führende Immobilienmakler",
  "mk.hero.badge_wert": "100+",
  "mk.hero.badge_text": "Markenprojekte seit 2009",
  "mk.trust.label": "Projekte mit Maklern führender Häuser",
  "mk.trust.namen":
    "ENGEL & VÖLKERS|VON POLL IMMOBILIEN|DAHLER & COMPANY|KENSINGTON|RE/MAX|McMakler|Homeday|BETTERHOMES",

  "mk.stats.s1_wert": "40+",
  "mk.stats.s1_label": "Premium-Projekte für Makler",
  "mk.stats.s2_wert": "3×",
  "mk.stats.s2_label": "mehr Eigentümer-Anfragen nach Relaunch",
  "mk.stats.s3_wert": "17",
  "mk.stats.s3_label": "Jahre Markenarbeit, u. a. Bosch, Continental, Michelin",
  "mk.stats.s4_wert": "4–6",
  "mk.stats.s4_label": "Wochen bis zum Livegang",

  "mk.vsl.url": "",

  "mk.integrationen.label": "Angebunden an die Tools, die Sie schon nutzen",
  "mk.integrationen.namen": "onOffice|FLOWFACT|Propstack|JUSTIMMO|CasaOne",

  "mk.pm.quote": "5 %",
  "mk.pm.mandate": "5",
  "mk.pm.provision": "31.285 €",

  "mk.podcast.url": "",
  "mk.podcast.titel": "Im Gespräch: Leon Lin",
  "mk.podcast.sub":
    "Alexander Pütter mit Leon Lin, KI-Skill-Entwickler. Über Systeme, die im Makleralltag wirklich arbeiten.",

  "mk.beweis.label": "Größenordnungen, keine Versprechen",
  "mk.beweis.kacheln":
    "Vision Group~1.450~Wohneinheiten entwickelt · Joint Venture mit KKR über 160 Mio. €~Aus drei Leuten im Gründungsbüro wurde die Gruppe, mit der Private Equity verhandelt.|Königswege~2.300+~Partner · Top 10 der deutschen Finanzvertriebe~Mit 60 Leuten zum Relaunch gekommen. Heute rekrutiert die Marke von selbst.|acta~380~Wohneinheiten in drei Jahren verkauft · rund 40 Mio. € Volumen~Selbst mit aufgebaut: Kapitalanlage-Vertrieb, in der Spitze 15 Leute, verkauft über Instagram-Anzeigen.",
  "mk.beweis.kunden_label": "Und gebaut für Häuser, die gerade groß werden",
  "mk.beweis.kunden": "RIEGEL Immobilien|hzo immobilien|invyse|Königswege",
};

export const FIELD_LABELS: Record<string, string> = {
  ...TOOLS_LABELS,
  ...VERGLEICH_LABELS,
  ...MOTION_LABELS,
  ...INTERN_AUFGABEN_LABELS,
  ...INTERN_EINBLICK_LABELS,
  ...INTERN_FLOWS_LABELS,
  ...INTERN_KONTAKTE_LABELS,
  ...INTERN_KUNDEN_LABELS,
  ...INTERN_PIPELINE_LABELS,
  ...INTERN_SHELL_LABELS,
  "beleg.title": "Übersicht · Überschrift (*Wort* = Hervorhebung)",
  "beleg.intro": "Übersicht · Einleitungssatz",
  "hero.title": "Hero · H1 (*Wort* = Hervorhebung)",
  "hero.subtitle": "Hero · Subline (Mechanismus + Verantwortung)",
  "hero.cta": "Der eine CTA-Wortlaut der ganzen Seite",
  "hero.cta_secondary": "Hero · Zweitweg (Live-Check)",
  "trust.label": "Herkunft · Zeile über den Logos",
  "diagnose.title": "Pain · Kopfzeile (bewusst ohne Hervorhebung)",
  "diagnose.q4": "Pain · vierter Einwand (Empfehlungsgeschäft)",
  "play.title": "Playground · Überschrift (*Wort* = Hervorhebung)",
  "kz.title": "Kennzahlen-Dashboard · Überschrift",
  "kz.intro": "Kennzahlen-Dashboard · Einleitungssatz",
  "play.intro": "Playground · Mechanismus-Absatz (E2: Entlastung)",
  "check.text": "Live-Check · Lead-Magnet-Satz",
  "refs.title": "Fallstudien · Überschrift (Inhalte selbst: src/lib/cases.ts)",
  "refs.intro": "Fallstudien · Einleitungssatz",
  "goal.after": "Ablauf · Festpreis-Logik (kein Preis nennen)",
  "fit.num1": "3",
  "fit.num2": "15.000 €",
  "fit.line1": "Kapazität · muss der Wahrheit entsprechen",
  "fit.line2": "Filter · Schwelle 15.000 €",
  "termin.title": "/termin · Kopfzeile",
  "mk.hero.eyebrow": "Makler · Hero · Eyebrow",
  "mk.hero.title": "Makler · Hero · H1 vor dem Rotationswort (*Wort* = Hervorhebung)",
  "mk.hero.rotation": "Makler · Hero · Zielgruppen-Wort/Wörter, mit | getrennt (1 Wort = statisch, mehrere = Rotation)",
  "mk.hero.subtitle": "Makler · Hero · Subline",
  "mk.hero.cta": "Makler · Der eine CTA-Wortlaut",
  "mk.hero.cta_hinweis": "Makler · Mikrozeile unter dem CTA",
  "mk.hero.cta2": "Makler · Sekundär-CTA (Anker Ergebnisse)",
  "mk.hero.checks": "Makler · Checkmark-Trio: Label~Subzeile, mit | getrennt",
  "mk.hero.badge_label": "Makler · Floating Card · Label",
  "mk.hero.badge_wert": "Makler · Floating Card · große Zahl",
  "mk.hero.badge_text": "Makler · Floating Card · Text",
  "mk.trust.label": "Makler · Zeile über den Wordmarks",
  "mk.trust.namen": "Makler · Wordmarks, mit | getrennt (Freigaben!)",
  "mk.stats.s1_wert": "Makler · Zahl 1", "mk.stats.s1_label": "Makler · Zahl 1 · Text",
  "mk.stats.s2_wert": "Makler · Zahl 2", "mk.stats.s2_label": "Makler · Zahl 2 · Text",
  "mk.stats.s3_wert": "Makler · Zahl 3", "mk.stats.s3_label": "Makler · Zahl 3 · Text",
  "mk.stats.s4_wert": "Makler · Zahl 4", "mk.stats.s4_label": "Makler · Zahl 4 · Text",
  "mk.vsl.url": "Makler · VSL-Video-URL (leer = Platzhalter)",
  "mk.integrationen.label": "Makler · Zeile über den Software-Wordmarks",
  "mk.integrationen.namen": "Makler · Software-Wordmarks, mit | getrennt",
  "mk.pm.quote": "Makler · Performance-Grafik · Quote (z. B. 5 %)",
  "mk.pm.mandate": "Makler · Performance-Grafik · Mehr-Mandate pro Jahr (z. B. 5)",
  "mk.pm.provision": "Makler · Performance-Grafik · Ø Provision je Mandat",
  "mk.podcast.url": "Makler · Beweis · Podcast-Video-URL (leer = Platzhalter)",
  "mk.podcast.titel": "Makler · Beweis · Podcast-Titel",
  "mk.podcast.sub": "Makler · Beweis · Podcast-Unterzeile",
  "mk.beweis.label": "Makler · Beweis-Block · Eyebrow",
  "mk.beweis.kacheln": "Makler · Beweis-Kacheln: Name~Wert~Kontext~Story, mit | getrennt",
  "mk.beweis.kunden_label": "Makler · Beweis · Zeile über den Kundenlogos",
  "mk.beweis.kunden": "Makler · Beweis · Kundenlogos, mit | getrennt",
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
