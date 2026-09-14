/**
 * Testbatterie für src/lib/validierung.ts — portiert aus dem
 * Riegel-Projekt, um den beuwy-Abschnitt (8) für anfrageSchema erweitert
 * (ersetzt Riegels Mietwert-Anhang, der bei beuwy keine Entsprechung hat).
 *
 * Läuft komplett offline (kein DNS, kein Netz). Bei jedem Fehlschlag
 * process.exit(1) am Ende, mit einer Liste aller fehlgeschlagenen
 * Prüfungen. Aufruf: npm run test:validierung
 */

import {
  kontaktSchema,
  terminSchema,
  anfrageSchema,
  pruefeFormular,
  mailTippfehler,
  telefonNormalisieren,
  leadQualitaet,
} from "../src/lib/validierung.ts";

let anzahl = 0;
let fehlgeschlagen = 0;
const fehlerListe: string[] = [];

function pruefe(bezeichnung: string, bedingung: boolean, detail?: string) {
  anzahl++;
  if (!bedingung) {
    fehlgeschlagen++;
    fehlerListe.push(detail ? `${bezeichnung} — ${detail}` : bezeichnung);
    console.error(`  ✗ ${bezeichnung}${detail ? ` — ${detail}` : ""}`);
  } else {
    console.log(`  ✓ ${bezeichnung}`);
  }
}

function abschnitt(titel: string) {
  console.log(`\n${titel}`);
}

// Heute/Morgen in Europe/Berlin — dieselbe Logik wie in validierung.ts,
// hier bewusst separat gehalten (Testcode soll nicht von internen,
// unexportierten Helfern des Moduls abhängen).
function heuteBerlinISO(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(new Date());
}
function berlinDatumInNTagen(n: number): string {
  const heute = new Date(`${heuteBerlinISO()}T00:00:00Z`);
  heute.setUTCDate(heute.getUTCDate() + n);
  return heute.toISOString().slice(0, 10);
}

const ROLLEN_TEST = "Inhaber/Geschäftsführer eines Maklerhauses";

/* ────────────────────────────────────────────────────────────────
 * 1 · Echte Leads — dürfen NIE abgewiesen werden
 * ──────────────────────────────────────────────────────────────── */
abschnitt("1 · Echte Leads (dürfen nie abgewiesen werden)");

const echteLeads: { name: string; email: string; phone?: string }[] = [
  { name: "Max Mustermann", email: "max.mustermann@web.de", phone: "0621 5200 8800" },
  { name: "Dr. Anna Bär-Weiß", email: "a.baer@t-online.de" },
  { name: "Sean O'Connor", email: "sean@oconnor-immobilien.ie" },
  { name: "Jan van der Berg", email: "j.vdberg@gmx.net" },
  { name: "Li Wei", email: "li.wei@icloud.com" },
  { name: "Müller", email: "mueller@sub.domain.example.com", phone: "+49 171 1234567" },
  { name: "J. Schmidt", email: "js@arcor.de", phone: "06232/1001010" },
];

for (const lead of echteLeads) {
  const ergebnis = pruefeFormular(kontaktSchema, { ...lead, website: "" });
  pruefe(
    `Lead akzeptiert: ${lead.name} <${lead.email}>`,
    ergebnis.ok === true && ergebnis.bot === false,
    ergebnis.ok === false ? ergebnis.fehler : undefined
  );
}

/* ────────────────────────────────────────────────────────────────
 * 2 · Müll — muss abgewiesen werden
 * ──────────────────────────────────────────────────────────────── */
abschnitt("2 · Müll (muss abgewiesen werden)");

const muellFaelle: { bezeichnung: string; name: string; email: string }[] = [
  { bezeichnung: "Name leer", name: "", email: "max@web.de" },
  { bezeichnung: 'Name "a"', name: "a", email: "max@web.de" },
  { bezeichnung: 'Name "1234567890" (kein Buchstabe)', name: "1234567890", email: "max@web.de" },
  { bezeichnung: "E-Mail einbuchstabige TLD", name: "Max Mustermann", email: "a@b.c" },
  { bezeichnung: "E-Mail ohne TLD", name: "Max Mustermann", email: "max@gmail" },
  { bezeichnung: "E-Mail doppelter Punkt im Local-Part", name: "Max Mustermann", email: "max..mustermann@web.de" },
  { bezeichnung: "E-Mail führender Punkt im Local-Part", name: "Max Mustermann", email: ".max@web.de" },
  { bezeichnung: "E-Mail mit Leerzeichen im Local-Part", name: "Max Mustermann", email: "max mustermann@web.de" },
  { bezeichnung: "E-Mail leer", name: "Max Mustermann", email: "" },
];

for (const fall of muellFaelle) {
  const ergebnis = pruefeFormular(kontaktSchema, { name: fall.name, email: fall.email, website: "" });
  pruefe(`Abgewiesen: ${fall.bezeichnung}`, ergebnis.ok === false);
}

/* ────────────────────────────────────────────────────────────────
 * 3 · Honeypot — Bot sieht Erfolg, wird aber nie durchgereicht
 * ──────────────────────────────────────────────────────────────── */
abschnitt("3 · Honeypot");

{
  const bot = pruefeFormular(kontaktSchema, {
    name: "Max Mustermann",
    email: "max@web.de",
    website: "https://spam.example",
  });
  pruefe("Befülltes Honeypot-Feld → ok:true", bot.ok === true);
  pruefe("Befülltes Honeypot-Feld → bot:true", bot.ok === true && bot.bot === true);
}

{
  // Sogar bei gleichzeitig kaputten Feldern: Bot wird nicht abgewiesen,
  // weil die Honeypot-Prüfung der Schema-Validierung vorgeht.
  const botMitMuell = pruefeFormular(kontaktSchema, {
    name: "",
    email: "kaputt",
    website: "gefuellt",
  });
  pruefe(
    "Bot mit gleichzeitig ungültigen Feldern → trotzdem ok:true/bot:true",
    botMitMuell.ok === true && botMitMuell.bot === true
  );
}

{
  const mensch = pruefeFormular(kontaktSchema, { name: "Max Mustermann", email: "max@web.de", website: "" });
  pruefe("Leeres Honeypot-Feld → bot:false", mensch.ok === true && mensch.bot === false);
}

/* ────────────────────────────────────────────────────────────────
 * 4 · mailTippfehler
 * ──────────────────────────────────────────────────────────────── */
abschnitt("4 · E-Mail-Tippfehler");

const tippfehlerMitVorschlag: [string, string][] = [
  ["max@gmial.com", "max@gmail.com"],
  ["max@gmail.con", "max@gmail.com"],
  ["max@web.dee", "max@web.de"],
  ["max@gmx.d", "max@gmx.de"],
  ["max@t-online.se", "max@t-online.de"],
];

for (const [eingabe, erwartet] of tippfehlerMitVorschlag) {
  const vorschlag = mailTippfehler(eingabe);
  pruefe(`Vorschlag für ${eingabe} → ${erwartet}`, vorschlag === erwartet, `erhalten: ${vorschlag}`);
}

const tippfehlerOhneVorschlag = ["max@gmail.com", "info@adler-immobilien.de", "max@web.at", "kontakt@sparkasse-vorderpfalz.de"];

for (const eingabe of tippfehlerOhneVorschlag) {
  const vorschlag = mailTippfehler(eingabe);
  pruefe(`Kein Vorschlag für ${eingabe}`, vorschlag === null, `erhalten: ${vorschlag}`);
}

/* ────────────────────────────────────────────────────────────────
 * 5 · Telefon
 * ──────────────────────────────────────────────────────────────── */
abschnitt("5 · Telefon-Normalisierung");

const telefonFaelle: [string, string][] = [
  ["0621 5200 8800", "+4962152008800"],
  ["06232/100 10 10", "+4962321001010"],
  ["+49 171 1234567", "+491711234567"],
  ["0049 171 1234567", "+491711234567"],
  ["+49 (0)621 520088-00", "+49621520088-00"],
  ["", ""],
];

for (const [eingabe, erwartet] of telefonFaelle) {
  const ergebnis = telefonNormalisieren(eingabe);
  pruefe(`telefonNormalisieren(${JSON.stringify(eingabe)}) → ${JSON.stringify(erwartet)}`, ergebnis === erwartet, `erhalten: ${ergebnis}`);
}

{
  const kurzeZiffernfolge = pruefeFormular(kontaktSchema, { name: "Max Mustermann", email: "max@web.de", phone: "123", website: "" });
  pruefe('Telefon "123" (drei Ziffern) wird abgewiesen', kurzeZiffernfolge.ok === false);
}

{
  // Leeres Feld ist ok, wo das Feld optional ist (kontaktSchema/terminSchema).
  const leeresOptionalesFeld = pruefeFormular(kontaktSchema, { name: "Max Mustermann", email: "max@web.de", phone: "", website: "" });
  pruefe("Leeres Telefonfeld ok, wenn optional (kontaktSchema)", leeresOptionalesFeld.ok === true);
}

{
  // Bei beuwys anfrageSchema ist Telefon Pflicht — dort greift die Pflicht.
  const anfrageOhneTelefon = pruefeFormular(anfrageSchema, {
    rolle: ROLLEN_TEST,
    groesse: "unter 10",
    fokus: ["Website & Anfragen"],
    zeit: "So schnell wie möglich",
    name: "Max Mustermann",
    email: "max@web.de",
    phone: "",
    website: "",
  });
  pruefe("Leeres Telefonfeld bei anfrageSchema wird abgewiesen (Pflicht)", anfrageOhneTelefon.ok === false);
}

/* ────────────────────────────────────────────────────────────────
 * 6 · Termin-Datum (terminSchema, Europe/Berlin)
 * ──────────────────────────────────────────────────────────────── */
abschnitt("6 · Termin-Datum");

const heute = heuteBerlinISO();
const morgen = berlinDatumInNTagen(1);

function terminMitDatum(date: string, time = "10:00") {
  return pruefeFormular(terminSchema, {
    name: "Max Mustermann",
    email: "max@web.de",
    phone: "",
    date,
    time,
    website: "",
  });
}

pruefe(`Termin heute (${heute}) ok`, terminMitDatum(heute).ok === true);
pruefe(`Termin morgen (${morgen}) ok`, terminMitDatum(morgen).ok === true);
pruefe('Termin "1990-01-01" abgewiesen', terminMitDatum("1990-01-01").ok === false);
pruefe('Termin "2087-01-01" abgewiesen', terminMitDatum("2087-01-01").ok === false);
pruefe('Uhrzeit "25:99" abgewiesen', terminMitDatum(heute, "25:99").ok === false);

/* ────────────────────────────────────────────────────────────────
 * 7 · Lead-Qualität — reine Anzeige, blockiert nie
 * ──────────────────────────────────────────────────────────────── */
abschnitt("7 · Lead-Qualität");

{
  const r = leadQualitaet({ name: "Hallo Hallo", email: "hallo@hallo.de" });
  pruefe("Hallo Hallo → Hinweis enthält 'identisch'", r.hinweise.some((h) => h.toLowerCase().includes("identisch")), JSON.stringify(r));
  pruefe("Hallo Hallo → Hinweis enthält 'Platzhalter'", r.hinweise.some((h) => h.toLowerCase().includes("platzhalter")), JSON.stringify(r));
}

{
  const r = leadQualitaet({ name: "Anna Berger", email: "anna.berger@web.de", telefon: "+4962152008800", domain: "ok" });
  pruefe("Anna Berger → 100 Punkte", r.punkte === 100, JSON.stringify(r));
  pruefe("Anna Berger → keine Hinweise", r.hinweise.length === 0, JSON.stringify(r));
}

{
  const r = leadQualitaet({ email: "anna@mailinator.com" });
  pruefe("mailinator.com → Hinweis enthält 'Wegwerf'", r.hinweise.some((h) => h.toLowerCase().includes("wegwerf")), JSON.stringify(r));
}

{
  const r = leadQualitaet({ domain: "existiert-nicht" });
  pruefe("domain existiert-nicht → Hinweis enthält 'existiert nicht'", r.hinweise.some((h) => h.toLowerCase().includes("existiert nicht")), JSON.stringify(r));
}

/* ────────────────────────────────────────────────────────────────
 * 8 · beuwy: anfrageSchema (Vorquali-Funnel) — statt Riegels
 *     Mietwert-Anhang, der bei beuwy keine Entsprechung hat.
 * ──────────────────────────────────────────────────────────────── */
abschnitt("8 · beuwy anfrageSchema (Vorquali-Funnel)");

{
  const gueltig = pruefeFormular(anfrageSchema, {
    rolle: ROLLEN_TEST,
    groesse: "10–30",
    fokus: ["Marke & Auftritt", "Website & Anfragen"],
    zeit: "So schnell wie möglich",
    name: "Max Mustermann",
    email: "max.mustermann@web.de",
    phone: "0621 5200 8800",
    website: "",
  });
  pruefe("Gültige Vorquali-Antworten kommen strukturiert durch", gueltig.ok === true && gueltig.bot === false, gueltig.ok === false ? gueltig.fehler : undefined);
  if (gueltig.ok) {
    pruefe("fokus bleibt als Array erhalten", Array.isArray(gueltig.daten.fokus) && gueltig.daten.fokus.length === 2, JSON.stringify(gueltig.daten.fokus));
    pruefe("message ist ohne Angabe leerer String (nicht undefined)", gueltig.daten.message === "");
    pruefe("phone wurde normalisiert", gueltig.daten.phone === "+4962152008800", gueltig.daten.phone);
  }
}

{
  // Manipulierte/zu lange Werte: werden gedeckelt, nicht abgewiesen und
  // nicht unverändert durchgereicht.
  const riesenText = "x".repeat(5000);
  const manipuliert = pruefeFormular(anfrageSchema, {
    rolle: riesenText,
    groesse: riesenText,
    fokus: Array.from({ length: 500 }, () => riesenText),
    zeit: riesenText,
    name: "Max Mustermann",
    email: "max.mustermann@web.de",
    phone: "0621 5200 8800",
    message: "m".repeat(50_000),
    website: "",
  });
  pruefe("Überlange Werte werden nicht abgewiesen (gedeckelt statt durchgereicht)", manipuliert.ok === true && manipuliert.bot === false);
  if (manipuliert.ok) {
    const d = manipuliert.daten;
    pruefe("rolle gedeckelt auf ≤200 Zeichen", d.rolle.length <= 200, String(d.rolle.length));
    pruefe("rolle NICHT unverändert durchgereicht", d.rolle !== riesenText);
    pruefe("groesse gedeckelt auf ≤50 Zeichen", d.groesse.length <= 50, String(d.groesse.length));
    pruefe("zeit gedeckelt auf ≤100 Zeichen", d.zeit.length <= 100, String(d.zeit.length));
    pruefe("message gedeckelt auf ≤5000 Zeichen", d.message.length <= 5000, String(d.message.length));
    pruefe("fokus gedeckelt auf ≤4 Einträge", d.fokus.length <= 4, String(d.fokus.length));
    pruefe("jeder fokus-Eintrag gedeckelt auf ≤100 Zeichen", d.fokus.every((f) => f.length <= 100));
  }
}

{
  // Fehlende Pflichtfelder werden weiterhin abgewiesen (Deckeln ersetzt
  // keine Pflicht — nur die Überlänge wird toleriert).
  const ohneRolle = pruefeFormular(anfrageSchema, {
    rolle: "",
    groesse: "unter 10",
    fokus: ["Marke & Auftritt"],
    zeit: "Ich sondiere noch",
    name: "Max Mustermann",
    email: "max@web.de",
    phone: "0621 5200 8800",
    website: "",
  });
  pruefe("Leere Rolle wird abgewiesen", ohneRolle.ok === false);

  const ohneFokus = pruefeFormular(anfrageSchema, {
    rolle: ROLLEN_TEST,
    groesse: "unter 10",
    fokus: [],
    zeit: "Ich sondiere noch",
    name: "Max Mustermann",
    email: "max@web.de",
    phone: "0621 5200 8800",
    website: "",
  });
  pruefe("Leeres fokus-Array wird abgewiesen", ohneFokus.ok === false);

  const ungueltigeEmail = pruefeFormular(anfrageSchema, {
    rolle: ROLLEN_TEST,
    groesse: "unter 10",
    fokus: ["Marke & Auftritt"],
    zeit: "Ich sondiere noch",
    name: "Max Mustermann",
    email: "max@gmail",
    phone: "0621 5200 8800",
    website: "",
  });
  pruefe("Ungültige E-Mail wird auch bei anfrageSchema abgewiesen", ungueltigeEmail.ok === false);
}

{
  // Honeypot gilt auch für den Vorquali-Funnel.
  const bot = pruefeFormular(anfrageSchema, {
    rolle: "x".repeat(9999),
    groesse: "",
    fokus: [],
    zeit: "",
    name: "",
    email: "kaputt",
    phone: "",
    website: "https://spam.example",
  });
  pruefe("Honeypot bei anfrageSchema → ok:true/bot:true trotz kaputter Felder", bot.ok === true && bot.bot === true);
}

/* ────────────────────────────────────────────────────────────────
 * Ergebnis
 * ──────────────────────────────────────────────────────────────── */

console.log(`\n${anzahl} Prüfungen, ${anzahl - fehlgeschlagen} bestanden, ${fehlgeschlagen} fehlgeschlagen.`);

if (fehlgeschlagen > 0) {
  console.error("\nFehlgeschlagene Prüfungen:");
  for (const f of fehlerListe) console.error(`  - ${f}`);
  process.exit(1);
}
