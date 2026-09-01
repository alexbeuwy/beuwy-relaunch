import { emailChecks, emailLayout, emailRows } from "@/lib/email";
import { maklerAsset } from "@/lib/cdn";

/**
 * E-Mail-Vorlagen (R3 Leaf B7) — sechs Vorlagen über die eine Hülle aus
 * src/lib/email.ts (emailLayout/emailRows, NICHT verändert). Jede Funktion
 * hat exakt die Signatur `(…): { betreff: string; html: string }` — das
 * Kundenkonto (Parallel-Leaf) importiert dieselben Exporte, die Signaturen
 * dürfen sich also nicht mehr ändern.
 *
 * Ton (der eigentliche Auftrag): überraschend menschlich, kurz (~120
 * Wörter), Sie-Form, keine Marketing-Floskeln, kein "Wir freuen uns".
 * Jede Mail sagt, was jetzt passiert und was der Empfänger NICHT mehr tun
 * muss. Der Nachfass liefert echten Mehrwert statt einer Nachhak-Floskel,
 * die Erinnerung packt alles fürs Gespräch Nötige in eine Zeile.
 */

/** Nur beim HTML-Rendern escapen — Betreffs bleiben reiner Text. */
function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function vorname(name: string): string {
  const trimmed = String(name ?? "").trim();
  return esc(trimmed.split(/\s+/)[0] || trimmed);
}

function absatz(html: string): string {
  return `<p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#141414;">${html}</p>`;
}

function liste(punkte: string[]): string {
  const items = punkte.map((p) => `<li style="margin:0 0 8px;">${p}</li>`).join("");
  return `<ul style="margin:0 0 16px;padding-left:20px;font-size:14px;line-height:1.6;color:#141414;">${items}</ul>`;
}

/** "2026-09-14" → "14. September 2026". Alles andere kommt unverändert durch. */
function formatDatumDeutsch(input: string): string {
  const treffer = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(input ?? "").trim());
  if (!treffer) return String(input ?? "").trim();
  const [, jahr, monat, tag] = treffer;
  const monate = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember",
  ];
  const name = monate[Number(monat) - 1];
  return name ? `${Number(tag)}. ${name} ${jahr}` : String(input ?? "").trim();
}

/** "10:30" → "10:30 Uhr". Enthält der Wert schon "Uhr", bleibt er unverändert. */
function formatUhrzeit(input: string): string {
  const wert = String(input ?? "").trim();
  if (!wert) return wert;
  return /uhr/i.test(wert) ? wert : `${wert} Uhr`;
}

/* ── 1) Vorquali-Funnel — Bestätigung nach dem Absenden ────────────── */

export function mailFunnelBestaetigung(
  name: string,
  wunsch: string,
): { betreff: string; html: string } {
  const n = vorname(name);
  const betreff = "kurz zu Ihrer Anfrage";
  const html = emailLayout({
    heading: `Ihre Anfrage ist da, ${n}.`,
    intro: `Notiert: ${esc(wunsch)}. Das reicht uns, um vorbereitet ins Gespräch zu gehen.`,
    fotoUrl: maklerAsset(2),
    bodyHtml:
      emailChecks([
        "Wir sichten Ihre Angaben und melden uns innerhalb eines Werktags.",
        "Sie bekommen zwei bis drei konkrete Terminvorschläge.",
        "Kein zweites Formular, kein Rückruf zur Vorqualifizierung.",
      ]),
  });
  return { betreff, html };
}

/* ── 2) Terminbuchung — Bestätigung ─────────────────────────────────── */

export function mailTerminBestaetigung(
  name: string,
  datum: string,
  uhrzeit: string,
): { betreff: string; html: string } {
  const n = vorname(name);
  const d = formatDatumDeutsch(datum);
  const u = formatUhrzeit(uhrzeit);
  const betreff = `Ihr Termin am ${d}`;
  const html = emailLayout({
    heading: `Termin bestätigt, ${n}.`,
    intro: `${esc(d)}, ${esc(u)}. Den Termin haben wir fest eingeplant.`,
    fotoUrl: maklerAsset(8),
    bodyHtml:
      emailChecks([
        "Kurz vorher bekommen Sie eine Erinnerung.",
        "Nichts vorzubereiten, nichts zu bestätigen.",
        "Passt es doch nicht: einfach auf diese E-Mail antworten, wir verschieben.",
      ]),
  });
  return { betreff, html };
}

/* ── 3) Terminbuchung — Erinnerung ──────────────────────────────────── */

export function mailTerminErinnerung(
  name: string,
  datum: string,
  uhrzeit: string,
): { betreff: string; html: string } {
  const n = vorname(name);
  const d = formatDatumDeutsch(datum);
  const u = formatUhrzeit(uhrzeit);
  const betreff = `Erinnerung: Ihr Termin am ${d}`;
  const html = emailLayout({
    heading: `${n}, Ihr Termin: ${esc(d)}, ${esc(u)}.`,
    intro: "Wir rufen Sie zur vereinbarten Zeit an. Sie müssen nichts vorbereiten und nichts bestätigen.",
    fotoUrl: maklerAsset(5),
    bodyHtml: absatz(
      "Passt die Zeit doch nicht mehr, antworten Sie einfach auf diese E-Mail. Ein neuer Termin ist schnell gefunden.",
    ),
  });
  return { betreff, html };
}

/* ── 4) Nachfass — echter Mehrwert statt Nachhak-Floskel ────────────── */

export function mailNachfass(name: string): { betreff: string; html: string } {
  const n = vorname(name);
  const betreff = "drei Fragen vor unserem Gespräch";
  const html = emailLayout({
    heading: `${n}, das können Sie vorab schon prüfen.`,
    intro: "Damit unser Gespräch direkt in die Tiefe geht, drei Dinge, die Sie in fünf Minuten selbst nachsehen können.",
    fotoUrl: maklerAsset(10),
    bodyHtml:
      liste([
        "Wie lange dauert es aktuell, bis eine neue Anfrage über Ihre Website eine Antwort bekommt?",
        "Sieht Ihr Exposé anders aus als das von fünf anderen Maklern in Ihrer Stadt, oder nutzen alle dieselbe Vorlage?",
        "Wie viele Anfragen der letzten vier Wochen wurden nie ein zweites Mal kontaktiert?",
      ]) +
      absatz("Notieren Sie sich einfach, was Ihnen dabei auffällt. Den Rest besprechen wir im Gespräch."),
  });
  return { betreff, html };
}

/* ── 5) Tool-Ergebnis — Rechnerauswertung per Mail ──────────────────── */

export function mailToolErgebnis(
  name: string,
  tool: string,
  ergebnisZeilen: Array<{ label: string; value: string }>,
): { betreff: string; html: string } {
  const n = vorname(name);
  const t = esc(tool);
  const betreff = `Ihre Auswertung: ${tool}`;
  const html = emailLayout({
    heading: `${n}, hier ist Ihre Auswertung.`,
    intro: `Die Ergebnisse aus dem ${t} zum Nachlesen, ohne dass Sie etwas erneut eingeben müssen.`,
    fotoUrl: maklerAsset(18),
    bodyHtml:
      emailRows(ergebnisZeilen.map((z) => ({ label: esc(z.label), value: esc(z.value) }))) +
      absatz("Fragen zu den Zahlen beantworten wir gern, einfach auf diese E-Mail antworten."),
  });
  return { betreff, html };
}

/* ── 6) Kundenkonto — Login-Code ────────────────────────────────────── */

export function mailKontoCode(code: string): { betreff: string; html: string } {
  const c = esc(code);
  const betreff = "Ihr Code für den Zugang";
  const html = emailLayout({
    heading: "Ihr Anmeldecode",
    intro: "Geben Sie diesen Code auf der Login-Seite ein, er ist 15 Minuten gültig.",
    bodyHtml:
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 18px;"><tr><td bgcolor="#fbf5d6" align="center" style="border-radius:16px;padding:22px 0;font-family:'Courier New',Courier,monospace;font-size:30px;font-weight:700;letter-spacing:0.14em;color:#161613;">${c}</td></tr></table>` +
      absatz("Haben Sie diesen Code nicht angefordert, ignorieren Sie diese E-Mail einfach."),
  });
  return { betreff, html };
}
