/**
 * Dummy-Daten für die CRM-Konsole (R11b, 14.09). Befüllt /intern über die
 * vorhandenen RPC-Wrapper aus ./db.ts mit einem realistischen, in sich
 * stimmigen Makler-Datensatz: Kontakte, Leads mit Status und Notizen,
 * Deals in allen Phasen, Aufgaben (fällig/überfällig/erledigt), Kunden-
 * konten mit Onboarding und Tickets, Mail-Protokolle, zwei pausierte
 * Flows und rund 4.000 Einblick-Ereignisse.
 *
 * Markierung (für das spurlose Löschen, supabase/crm-dummy.sql):
 * - Personen: E-Mail-Domain @muster-makler.de (Kontakte, Leads, Konten, Mails)
 * - Leads zusätzlich daten.dummy = true
 * - Einblick: pageload_id beginnt mit "dummy-"
 * - Flows: Name beginnt mit "[Demo] "
 * Zeitstempel setzen die RPCs auf jetzt; bw_dummy_verteilen() (SQL)
 * verteilt sie anschließend über die letzten sechs Wochen.
 *
 * Flows werden bewusst NICHT gestartet (pausiert) — sonst würden die
 * Nachfass-Crons echte Mails an Fantasie-Adressen schicken.
 */

import {
  aufgabeSpeichern,
  dealSpeichern,
  dummyVerteilen,
  flowSpeichern,
  kontaktUpsert,
  kontoDatenSetzen,
  kontoDetail,
  kontoUpsert,
  leadAnlegen,
  leadNotizAnlegen,
  leadStatusSetzen,
  mailLoggen,
  ticketAnlegen,
  ticketAntwortAnlegen,
  ticketStatusSetzen,
  trackAnlegen,
} from "./db";

export const DUMMY_DOMAIN = "muster-makler.de";

type Person = {
  vorname: string;
  nachname: string;
  firma: string;
  stadt: string;
  rolle: string;
  telefon: string;
};

const PERSONEN: Person[] = [
  { vorname: "Katharina", nachname: "Vogt", firma: "Vogt Immobilien", stadt: "Heidelberg", rolle: "Geschäftsführerin", telefon: "06221 4839210" },
  { vorname: "Markus", nachname: "Lindner", firma: "Lindner & Partner Immobilien", stadt: "Mannheim", rolle: "Inhaber", telefon: "0621 7735540" },
  { vorname: "Sabine", nachname: "Kraus", firma: "Kraus Immobilien", stadt: "Speyer", rolle: "Inhaberin", telefon: "06232 918330" },
  { vorname: "Tobias", nachname: "Reuter", firma: "Reuter Wohnbau Vertrieb", stadt: "Karlsruhe", rolle: "Vertriebsleiter", telefon: "0721 6604412" },
  { vorname: "Nadine", nachname: "Hoffmann", firma: "Hoffmann Living", stadt: "Frankfurt am Main", rolle: "Geschäftsführerin", telefon: "069 25738810" },
  { vorname: "Jan", nachname: "Brückner", firma: "Brückner Immobilien", stadt: "Wiesbaden", rolle: "Inhaber", telefon: "0611 4419077" },
  { vorname: "Elena", nachname: "Schreiber", firma: "Schreiber & Co. Immobilien", stadt: "Stuttgart", rolle: "Partnerin", telefon: "0711 2205611" },
  { vorname: "Christoph", nachname: "Adler", firma: "Adler Projektentwicklung", stadt: "Mainz", rolle: "Geschäftsführer", telefon: "06131 8892045" },
  { vorname: "Miriam", nachname: "Falk", firma: "Falk Immobilien", stadt: "Darmstadt", rolle: "Inhaberin", telefon: "06151 3907724" },
  { vorname: "Stefan", nachname: "Berger", firma: "Berger Haus & Grund", stadt: "Ludwigsburg", rolle: "Inhaber", telefon: "07141 6612980" },
  { vorname: "Julia", nachname: "Neumann", firma: "Neumann Immobilien", stadt: "Freiburg", rolle: "Geschäftsführerin", telefon: "0761 4568833" },
  { vorname: "Daniel", nachname: "Roth", firma: "Roth Kapitalanlagen", stadt: "Köln", rolle: "Vertrieb", telefon: "0221 9925570" },
  { vorname: "Anna", nachname: "Weidner", firma: "Weidner Immobilien", stadt: "Worms", rolle: "Inhaberin", telefon: "06241 3378021" },
  { vorname: "Philipp", nachname: "Sattler", firma: "Sattler Immobilien", stadt: "Kaiserslautern", rolle: "Inhaber", telefon: "0631 4105590" },
];

function email(p: Person): string {
  const s = (t: string) => t.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss");
  return `${s(p.vorname)}.${s(p.nachname)}@${DUMMY_DOMAIN}`;
}
function name(p: Person): string {
  return `${p.vorname} ${p.nachname}`;
}

/* Weitere Leads ohne Kontakt-Stammsatz (frische Anfragen). */
const WEITERE_LEADS: Person[] = [
  { vorname: "Lena", nachname: "Kessler", firma: "Kessler Immobilien", stadt: "Bad Dürkheim", rolle: "Inhaberin", telefon: "" },
  { vorname: "Oliver", nachname: "Menzel", firma: "Menzel & Söhne", stadt: "Landau", rolle: "Inhaber", telefon: "06341 990120" },
  { vorname: "Sophie", nachname: "Wagner", firma: "Wagner Living", stadt: "Heilbronn", rolle: "Geschäftsführerin", telefon: "" },
  { vorname: "Martin", nachname: "Ebert", firma: "Ebert Immobilien", stadt: "Pforzheim", rolle: "Inhaber", telefon: "07231 5540099" },
  { vorname: "Carina", nachname: "Lutz", firma: "Lutz Wohnen", stadt: "Neustadt", rolle: "Inhaberin", telefon: "" },
  { vorname: "Felix", nachname: "Hartmann", firma: "Hartmann Projekt GmbH", stadt: "Bonn", rolle: "Geschäftsführer", telefon: "0228 7712340" },
  { vorname: "Vanessa", nachname: "Kühn", firma: "Kühn Immobilien", stadt: "Offenbach", rolle: "Inhaberin", telefon: "" },
  { vorname: "Benjamin", nachname: "Scholz", firma: "Scholz & Partner", stadt: "Saarbrücken", rolle: "Partner", telefon: "0681 3306622" },
];

type LeadPlan = {
  person: Person;
  quelle: "funnel" | "booking" | "tool" | "manuell";
  status: "neu" | "kontaktiert" | "termin" | "angebot" | "kunde" | "verloren";
  score: number;
  nachricht: string;
  daten: Record<string, unknown>;
  notizen: string[];
};

const ROLLEN = ["Inhaber/in", "Geschäftsführung", "Vertriebsleitung", "Marketing"];
const GROESSEN = ["1–3 Personen", "4–10 Personen", "11–30 Personen", "über 30"];
const FOKUS = ["Website & Marke", "Leads & Funnel", "Automatisierung", "Alles aus einer Hand"];
const ZEIT = ["Sofort", "In 1–3 Monaten", "Dieses Jahr", "Erst mal orientieren"];

function leadPlaene(): LeadPlan[] {
  const p = PERSONEN;
  const w = WEITERE_LEADS;
  const f = (person: Person, quelle: LeadPlan["quelle"], status: LeadPlan["status"], score: number, nachricht: string, i: number, notizen: string[] = [], extra: Record<string, unknown> = {}): LeadPlan => ({
    person,
    quelle,
    status,
    score,
    nachricht,
    notizen,
    daten: { dummy: true, rolle: ROLLEN[i % 4], groesse: GROESSEN[(i * 3) % 4], fokus: FOKUS[(i * 5) % 4], zeit: ZEIT[(i * 7) % 4], ...extra },
  });
  return [
    f(p[0], "funnel", "kunde", 92, "Wir verkaufen im Jahr rund 80 Objekte in Heidelberg und Umgebung, aber unsere Website sieht aus wie 2014. Wir brauchen einen Auftritt, der zu unseren Preisen passt.", 0, ["Erstgespräch 45 Min. — sehr klare Vorstellung, Budget frei.", "Angebot Marke + Website + Funnel angenommen."]),
    f(p[1], "booking", "kunde", 88, "Termin über die Website gebucht. Thema: Relaunch und Nachfass-Automatisierung für unser Team mit sechs Maklern.", 1, ["Kickoff war gut, will im Oktober live sein."]),
    f(p[2], "funnel", "angebot", 76, "Ich bekomme viele Anfragen über die Portale, aber kaum Alleinaufträge. Ich glaube, mein Auftritt überzeugt die Eigentümer nicht.", 2, ["Angebot verschickt, Rückmeldung bis Freitag zugesagt."]),
    f(p[3], "booking", "termin", 71, "Vertriebsteam für zwei Neubauprojekte, wir brauchen Landingpages mit Interessenten-Vorqualifizierung.", 3, ["Termin Donnerstag 10 Uhr, Projektunterlagen liegen vor."]),
    f(p[4], "funnel", "angebot", 83, "Wir positionieren uns im Premium-Segment in Frankfurt. Website, Exposé-Design und E-Mail-Strecke sollen aus einem Guss sein.", 4, ["Zwei Referenzen angeschaut, wollte konkret die Riegel-Reels sehen."]),
    f(p[5], "tool", "kontaktiert", 54, "Auswertung aus dem Verkaufspreisrechner angefordert.", 5, ["Kurze Mail geschickt, wartet auf Rückruf."], { tool: "verkaufspreisrechner", objektwert: 640000 }),
    f(p[6], "funnel", "termin", 79, "Wir sind zu dritt und wollen das Empfehlungsgeschäft digital abbilden. Was kostet ein System, das auch nachfasst?", 6, ["Terminbestätigung ist raus."]),
    f(p[7], "manuell", "kontaktiert", 62, "Kontakt über LinkedIn — Projektentwickler mit drei Vermarktungsstarts 2027.", 7, ["Telefonat: erst Q1, dann Entscheidung."]),
    f(p[8], "funnel", "kunde", 90, "Nach 12 Jahren wollen wir die Marke einmal richtig machen. Logo, Website, Exposés, Social Media.", 8, ["Vertrag unterschrieben, Foto-Shooting geplant."]),
    f(p[9], "tool", "neu", 41, "Auswertung aus dem Mietpreisrechner angefordert.", 9, [], { tool: "mietpreisrechner" }),
    f(p[10], "funnel", "verloren", 58, "Wir suchen eine günstige Lösung für eine neue Website, maximal 3.000 Euro.", 10, ["Budget passt nicht zum Umfang — freundlich abgesagt, Baukasten empfohlen."]),
    f(p[11], "booking", "angebot", 74, "Kapitalanlage-Vertrieb, wir brauchen eine Investoren-Landingpage plus Rechner.", 11, ["Angebot mit zwei Varianten verschickt."]),
    f(p[12], "funnel", "kontaktiert", 66, "Meine Exposés sehen aus wie die von allen anderen. Ich will, dass Eigentümer den Unterschied sehen.", 12, ["Rückruf vereinbart."]),
    f(p[13], "funnel", "neu", 63, "Ein Kollege hat mir beuwy empfohlen. Ich bin Einzelkämpfer mit ca. 25 Verkäufen pro Jahr.", 13),
    f(w[0], "funnel", "neu", 57, "Ich möchte weg von den Portal-Leads und selbst Eigentümer erreichen.", 14),
    f(w[1], "funnel", "neu", 68, "Wir sind ein Familienbetrieb in zweiter Generation und wollen den Auftritt modernisieren, ohne die Tradition zu verlieren.", 15),
    f(w[2], "tool", "neu", 38, "Auswertung aus dem AfA-Rechner angefordert.", 16, [], { tool: "afa-rechner" }),
    f(w[3], "booking", "termin", 72, "Termin gebucht — Thema Website-Relaunch mit onOffice-Anbindung.", 17, ["Termin bestätigt, onOffice-Zugang wird vorbereitet."]),
    f(w[4], "funnel", "kontaktiert", 49, "Ich habe eine Website, aber es kommt nichts darüber rein.", 18, ["Erste Mail mit Beispielen geschickt."]),
    f(w[5], "manuell", "verloren", 45, "Empfehlung aus dem Netzwerk, Projekt liegt vorerst auf Eis.", 19, ["Projekt verschoben, Wiedervorlage in sechs Monaten."]),
    f(w[6], "funnel", "neu", 61, "Wie schnell könnt ihr eine neue Website live stellen? Ich habe im November eine Messe.", 20),
    f(w[7], "booking", "kontaktiert", 70, "Kanzlei-nahes Maklerbüro, wir wollen seriös und modern zugleich wirken.", 21, ["Rückruf war gut, schickt Unterlagen."]),
  ];
}

type DealPlan = { personIndex: number; titel: string; wert: number; status: LeadPlan["status"]; verlust?: string; erwartetInTagen?: number };
const DEALS: DealPlan[] = [
  { personIndex: 0, titel: "Marke + Website + Funnel — Vogt Immobilien", wert: 38000, status: "kunde" },
  { personIndex: 1, titel: "Relaunch + Automatisierung — Lindner & Partner", wert: 29500, status: "kunde" },
  { personIndex: 2, titel: "Website + Exposé-System — Kraus Immobilien", wert: 18900, status: "angebot", erwartetInTagen: 12 },
  { personIndex: 3, titel: "Projekt-Landingpages — Reuter Wohnbau", wert: 24000, status: "termin", erwartetInTagen: 30 },
  { personIndex: 4, titel: "Premium-Auftritt — Hoffmann Living", wert: 46000, status: "angebot", erwartetInTagen: 18 },
  { personIndex: 6, titel: "Empfehlungs-System — Schreiber & Co.", wert: 16800, status: "termin", erwartetInTagen: 40 },
  { personIndex: 8, titel: "Markenrelaunch — Falk Immobilien", wert: 32000, status: "kunde" },
  { personIndex: 10, titel: "Website — Neumann Immobilien", wert: 9800, status: "verloren", verlust: "Budget" },
  { personIndex: 11, titel: "Investoren-Landingpage + Rechner — Roth Kapitalanlagen", wert: 21500, status: "angebot", erwartetInTagen: 21 },
  { personIndex: 12, titel: "Exposé-Design + Website — Weidner Immobilien", wert: 14900, status: "kontaktiert", erwartetInTagen: 55 },
];

type AufgabePlan = { titel: string; tage: number; erledigt?: boolean; personIndex?: number; dealIndex?: number };
const AUFGABEN: AufgabePlan[] = [
  { titel: "Angebot nachfassen — Kraus Immobilien", tage: -2, dealIndex: 2 },
  { titel: "Rückruf Sabine Kraus wegen Exposé-Beispielen", tage: -1, personIndex: 2 },
  { titel: "Erstgespräch vorbereiten — Reuter Wohnbau (Projektunterlagen lesen)", tage: 0, dealIndex: 3 },
  { titel: "Riegel-Reels an Hoffmann Living schicken", tage: 0, personIndex: 4 },
  { titel: "Terminbestätigung Schreiber & Co. prüfen", tage: 1, personIndex: 6 },
  { titel: "onOffice-Zugang für Ebert anfordern", tage: 2 },
  { titel: "Zweite Angebotsvariante Roth Kapitalanlagen", tage: 3, dealIndex: 8 },
  { titel: "Foto-Shooting Falk Immobilien terminieren", tage: 5, personIndex: 8 },
  { titel: "Wiedervorlage Hartmann Projekt GmbH", tage: 14 },
  { titel: "Kickoff-Protokoll Lindner & Partner versenden", tage: -4, erledigt: true, personIndex: 1 },
  { titel: "Vertrag Vogt Immobilien gegenzeichnen", tage: -6, erledigt: true, personIndex: 0 },
  { titel: "Mail mit Beispielen an Carina Lutz", tage: -3, erledigt: true },
];

type KontoPlan = { personIndex: number; status: "aufnahme" | "design" | "umsetzung" | "livegang" | "betrieb"; team: string; intent: string; tickets: Array<{ titel: string; detail: string; status: "offen" | "in-arbeit" | "erledigt"; antworten: Array<{ von: "beuwy" | "kunde"; text: string }> }> };
const KONTEN: KontoPlan[] = [
  { personIndex: 0, status: "umsetzung", team: "4–10 Personen", intent: "Website & Marke", tickets: [
    { titel: "Teamfotos: welches Format braucht ihr?", detail: "Unser Fotograf fragt nach Auflösung und Ausschnitt für die Teamseite.", status: "in-arbeit", antworten: [{ von: "beuwy", text: "Querformat 3:2, mindestens 3.000 px Breite, neutraler Hintergrund. Wir schicken heute noch das Briefing-PDF." }] },
    { titel: "Impressum-Daten aktualisiert", detail: "Neue Steuernummer ist eingetragen — bitte übernehmen.", status: "erledigt", antworten: [{ von: "beuwy", text: "Übernommen, ist im nächsten Deploy drin." }, { von: "kunde", text: "Danke!" }] },
  ] },
  { personIndex: 1, status: "design", team: "4–10 Personen", intent: "Alles aus einer Hand", tickets: [
    { titel: "Zweite Farbvariante fürs Logo", detail: "Könnt ihr die Wortmarke noch in einem dunkleren Blau zeigen?", status: "offen", antworten: [] },
  ] },
  { personIndex: 8, status: "aufnahme", team: "1–3 Personen", intent: "Website & Marke", tickets: [
    { titel: "Zugangsdaten alte Website", detail: "Wo finde ich die Zugangsdaten zum bisherigen Hoster?", status: "in-arbeit", antworten: [{ von: "beuwy", text: "Im Onboarding-Ordner unter „Zugänge“ — wir haben sie eben noch einmal per Mail geschickt." }] },
    { titel: "Termin Foto-Shooting", detail: "Passt der 24. für das Shooting?", status: "offen", antworten: [] },
  ] },
  { personIndex: 13, status: "betrieb", team: "1–3 Personen", intent: "Leads & Funnel", tickets: [] },
];

/* Kleiner deterministischer Zufall (mulberry32), damit jeder Lauf dieselben Ereignisse erzeugt. */
function zufall(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PFADE: Array<[string, number]> = [
  ["/", 30], ["/vsl", 6], ["/immobilienmarketing", 8], ["/website-fuer-immobilienmakler", 9],
  ["/leadgenerierung-immobilienmakler", 7], ["/tools/verkaufspreisrechner", 8], ["/tools", 4],
  ["/tools/mietpreisrechner", 3], ["/anfrage", 5], ["/cases", 4], ["/cases/riegel-immobilien", 3],
  ["/ueber-uns", 3], ["/onoffice-website", 3], ["/beste-maklerwebsites", 3], ["/wissen", 2],
  ["/ki-fuer-immobilienmakler", 2],
];
const BEREICHE = ["hero", "cta", "vergleich", "faq", "nav", "tools", "footer", "showreel"];

function einblickEreignisse(): Array<Record<string, unknown>> {
  const r = zufall(20260914);
  const summe = PFADE.reduce((s, [, g]) => s + g, 0);
  const wahlPfad = () => {
    let x = r() * summe;
    for (const [pfad, g] of PFADE) { x -= g; if (x <= 0) return pfad; }
    return "/";
  };
  const events: Array<Record<string, unknown>> = [];
  let n = 0;
  for (let tag = 0; tag < 42; tag++) {
    const wochentag = (tag + 1) % 7; // 0/6 = Wochenende
    const basis = wochentag === 0 || wochentag === 6 ? 14 : 26;
    const anzahl = basis + Math.floor(r() * 14);
    for (let i = 0; i < anzahl; i++) {
      n++;
      const pageload_id = `dummy-${tag}-${n}`;
      const pfad = wahlPfad();
      const geraet = r() < 0.58 ? "mobil" : "desktop";
      const basisEvent = { pfad, step: null, quelle: null, x_pct: null, y_pct: null, bereich: null, ansicht: null, geraet, pageload_id };
      events.push({ ...basisEvent, event: "pageview" });
      const tiefe = r();
      for (const [marke, schwelle] of [[25, 0.2], [50, 0.45], [75, 0.65], [100, 0.82]] as Array<[number, number]>) {
        if (tiefe >= schwelle) events.push({ ...basisEvent, event: "scroll_tiefe", step: marke });
      }
      const klicks = r() < 0.35 ? 1 + (r() < 0.3 ? 1 : 0) : 0;
      for (let k = 0; k < klicks; k++) {
        events.push({ ...basisEvent, event: "klick", x_pct: Math.floor(r() * 200), y_pct: Math.floor(r() * 200), bereich: BEREICHE[Math.floor(r() * BEREICHE.length)] });
      }
    }
  }
  return events;
}

function isoTag(offsetTage: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetTage);
  return d.toISOString().slice(0, 10);
}

async function inHaeppchen<T>(liste: T[], groesse: number, fn: (t: T) => Promise<unknown>): Promise<void> {
  for (let i = 0; i < liste.length; i += groesse) {
    await Promise.all(liste.slice(i, i + groesse).map(fn));
  }
}

export type DummyErgebnis = {
  kontakte: number; leads: number; deals: number; aufgaben: number; konten: number; tickets: number; mails: number; ereignisse: number; flows: number;
  verteilt: boolean;
};

/** Legt den kompletten Beispiel-Datensatz an. Wiederholte Läufe sind idempotent für Kontakte/Konten (Upsert), Leads/Deals kämen doppelt — davor löschen. */
export async function dummyFuellen(): Promise<DummyErgebnis> {
  const ergebnis: DummyErgebnis = { kontakte: 0, leads: 0, deals: 0, aufgaben: 0, konten: 0, tickets: 0, mails: 0, ereignisse: 0, flows: 0, verteilt: false };

  // 1) Kontakte
  const kontaktIds = new Map<number, string>();
  await inHaeppchen(PERSONEN.map((p, i) => ({ p, i })), 6, async ({ p, i }) => {
    const id = await kontaktUpsert({ email: email(p), name: name(p), telefon: p.telefon, firma: p.firma, rolle: p.rolle });
    if (id) { kontaktIds.set(i, id); ergebnis.kontakte++; }
  });

  // 2) Leads + Status + Notizen + Mail-Protokoll
  const plaene = leadPlaene();
  const leadIds = new Map<number, string>();
  await inHaeppchen(plaene.map((plan, i) => ({ plan, i })), 5, async ({ plan, i }) => {
    const id = await leadAnlegen({ quelle: plan.quelle, name: name(plan.person), email: email(plan.person), telefon: plan.person.telefon, firma: plan.person.firma, nachricht: plan.nachricht, daten: { ...plan.daten, stadt: plan.person.stadt }, score: plan.score });
    if (!id) return;
    leadIds.set(i, id);
    ergebnis.leads++;
    if (plan.status !== "neu") await leadStatusSetzen(id, plan.status);
    for (const notiz of plan.notizen) await leadNotizAnlegen(id, notiz);
    const vorlage = plan.quelle === "booking" ? "termin_bestaetigung" : plan.quelle === "tool" ? "tool_auswertung" : "funnel_bestaetigung";
    const betreff = plan.quelle === "booking" ? "Ihr Termin mit beuwy ist bestätigt" : plan.quelle === "tool" ? "Ihre Auswertung von beuwy" : "Ihre Anfrage ist angekommen";
    if (plan.quelle !== "manuell") {
      await mailLoggen({ leadId: id, vorlage, betreff, empfaenger: email(plan.person), status: "gesendet" });
      ergebnis.mails++;
    }
    if (["kontaktiert", "termin", "angebot"].includes(plan.status)) {
      await mailLoggen({ leadId: id, vorlage: "nachfass_1", betreff: "Kurze Frage zu Ihrem Auftritt", empfaenger: email(plan.person), status: "gesendet" });
      ergebnis.mails++;
    }
  });

  // 3) Deals
  const dealIds = new Map<number, string>();
  await inHaeppchen(DEALS.map((d, i) => ({ d, i })), 5, async ({ d, i }) => {
    const id = await dealSpeichern({ kontaktId: kontaktIds.get(d.personIndex) ?? null, leadId: leadIds.get(d.personIndex) ?? null, titel: d.titel, wert: d.wert, status: d.status, verlustGrund: d.verlust, erwartet: d.erwartetInTagen ? isoTag(d.erwartetInTagen) : null });
    if (id) { dealIds.set(i, id); ergebnis.deals++; }
  });

  // 4) Aufgaben
  await inHaeppchen(AUFGABEN, 6, async (a) => {
    await aufgabeSpeichern({ titel: a.titel, faellig: isoTag(a.tage), erledigt: a.erledigt ?? false, kontaktId: a.personIndex !== undefined ? kontaktIds.get(a.personIndex) ?? null : null, dealId: a.dealIndex !== undefined ? dealIds.get(a.dealIndex) ?? null : null });
    ergebnis.aufgaben++;
  });

  // 5) Kundenkonten + Onboarding + Tickets
  for (const k of KONTEN) {
    const p = PERSONEN[k.personIndex];
    await kontoUpsert({ email: email(p), name: name(p), firma: p.firma, projektStatus: k.status });
    await kontoDatenSetzen(email(p), { rolle: p.rolle, intent: k.intent, team: k.team, stadt: p.stadt });
    ergebnis.konten++;
    for (const t of k.tickets) {
      await ticketAnlegen(email(p), t.titel, t.detail);
      ergebnis.tickets++;
    }
    if (k.tickets.length > 0) {
      const detail = await kontoDetail(email(p));
      const tickets = (detail?.tickets ?? []).slice().sort((a, b) => a.id - b.id);
      for (const t of k.tickets) {
        const treffer = tickets.find((x) => x.titel === t.titel);
        if (!treffer) continue;
        for (const antwort of t.antworten) await ticketAntwortAnlegen(treffer.id, antwort.von, antwort.text);
        if (t.status !== "offen") await ticketStatusSetzen(treffer.id, t.status);
      }
    }
  }

  // 6) Flows — pausiert, damit kein Cron echte Mails an Fantasie-Adressen schickt
  const flows = [
    { name: "[Demo] Nachfass nach Erstanfrage", ausloeser: "lead_neu", schritte: [
      { typ: "mail", konfig: { modus: "vorlage", vorlageId: "funnel_bestaetigung" } },
      { typ: "warten", konfig: { stunden: 48 } },
      { typ: "bedingung", konfig: { feld: "status", wert: "neu" } },
      { typ: "mail", konfig: { modus: "vorlage", vorlageId: "nachfass_1" } },
    ] },
    { name: "[Demo] Tool-Auswertung mit Folge-Mail", ausloeser: "tool_lead", schritte: [
      { typ: "mail", konfig: { modus: "vorlage", vorlageId: "tool_auswertung" } },
      { typ: "warten", konfig: { stunden: 72 } },
      { typ: "mail", konfig: { modus: "vorlage", vorlageId: "nachfass_1" } },
    ] },
  ];
  for (const f of flows) {
    const id = await flowSpeichern({ name: f.name, status: "pausiert", ausloeser: f.ausloeser, schritte: f.schritte });
    if (id) ergebnis.flows++;
  }

  // 7) Einblick-Ereignisse in Häppchen
  const events = einblickEreignisse();
  const haeppchen: Array<Array<Record<string, unknown>>> = [];
  for (let i = 0; i < events.length; i += 60) haeppchen.push(events.slice(i, i + 60));
  await inHaeppchen(haeppchen, 4, async (h) => {
    await trackAnlegen(h);
    ergebnis.ereignisse += h.length;
  });

  // 8) Zeitstempel verteilen (SQL-Migration; fehlt sie, bleibt alles auf heute)
  ergebnis.verteilt = (await dummyVerteilen()) !== null;
  return ergebnis;
}
