import { NextResponse } from "next/server";
import { z } from "zod";
import { sendMail, emailLayout, emailRows } from "@/lib/email";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { terminSchema, pruefeFormular } from "@/lib/validierung";
import { leadAnlegen, mailLoggen, kontaktUpsert, flowsListe, flowStarten } from "@/lib/crm/db";
import { mailTerminBestaetigung } from "@/lib/email-vorlagen";

/**
 * Terminanfragen aus dem Buchungstool (portiert aus dem Riegel-Projekt).
 * Nach erfolgreicher Prüfung landet die Anfrage zusätzlich als Lead im CRM
 * (src/lib/crm/db.ts, Vertrag R3-PLAN.md "Verträge") — Muster identisch zu
 * /api/tool-lead. Die Kunden-Bestätigung läuft über die Vorlage
 * mailTerminBestaetigung (src/lib/email-vorlagen.ts) statt über eine
 * Ad-hoc-Mail, ihr Versand wird per mailLoggen protokolliert.
 *
 * Ohne RESEND_API_KEY: ehrlicher Demo-Modus — die Antwort trägt demo:true,
 * mailLoggen bekommt den Status "demo"; die Anfrage landet zusätzlich im
 * Server-Log. leadAnlegen/mailLoggen sind fail-open (liefern null/nichts
 * statt zu werfen) — ein CRM-Ausfall darf die Antwort nie kaputt machen.
 *
 * Name/E-Mail/Telefon/Datum/Uhrzeit laufen über terminSchema aus
 * src/lib/validierung.ts (zod statt Hand-Regex); Honeypot-Erkennung
 * ebenfalls über pruefeFormular — Bots bekommen weiterhin 200 mit
 * skipped:true, ohne dass eine Mail verschickt wird.
 *
 * R5 Leaf G8 (Datenqualität + Auslöser): der AnfrageFunnel schickt seit
 * diesem Leaf zusätzlich ein strukturiertes Feld `antworten` (Rolle/
 * Abschlüsse/Fokus/Zeithorizont als Record<string,string>) — landet
 * geprüft in `daten.vorquali`, die Fließtext-Nachricht bleibt unverändert
 * für die Mail. Nach erfolgreichem leadAnlegen läuft zusätzlich
 * kontaktUpsert() (Dedup über bw_kontakt, fail-open) und ein Flow-Check
 * (aktive Flows mit ausloeser "booking" werden für diesen Lead gestartet,
 * ebenfalls fail-open) — beides gebündelt in einem Promise.allSettled
 * statt einer Await-Kette, damit es parallel zum Mailversand läuft statt
 * die Antwort zusätzlich zu verzögern.
 */

export const runtime = "nodejs";

// Nur beim HTML-Rendern escapen — replyTo bekommt Rohwerte.
const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const clean = (s: unknown, max: number) => String(s ?? "").trim().slice(0, max);

/**
 * R5 G8, Codefund 1: die Vorquali-Antworten aus AnfrageFunnel.tsx kommen
 * strukturiert als `antworten: {schluessel: wert}` — Schlüssel/Werte je
 * begrenzt, Gesamtzahl der Schlüssel gedeckelt. Additive Metadaten: eine
 * ungültige Form wird verworfen statt die ganze Buchung abzulehnen (die
 * Fließtext-`message` bleibt in jedem Fall der verbindliche Inhalt der
 * internen Mail).
 */
const vorqualiSchema = z
  .record(z.string().trim().min(1).max(60), z.string().trim().max(500))
  .refine((obj) => Object.keys(obj).length <= 20, "Zu viele Vorquali-Antworten.");

function vorqualiAusPayload(wert: unknown): Record<string, string> | undefined {
  if (!wert || typeof wert !== "object" || Array.isArray(wert)) return undefined;
  const geprueft = vorqualiSchema.safeParse(wert);
  return geprueft.success ? geprueft.data : undefined;
}

/**
 * R5 G8, Codefund 2+3: Kontakt-Dedup + Flow-Auslöser nach erfolgreichem
 * Lead-Anlegen. Beide Aufrufe sind fail-open (Fehler werden verschluckt,
 * ein CRM-Ausfall darf die Buchungsbestätigung nie verhindern) und laufen
 * in einem gemeinsamen Promise.allSettled statt sequenziell, damit der
 * Aufruf parallel zum Mailversand im Hintergrund läuft.
 */
function crmNebenwirkungen(l: { leadId: string | null; email: string; name: string; telefon: string }): Promise<unknown> {
  return Promise.allSettled([
    kontaktUpsert({ email: l.email, name: l.name, telefon: l.telefon }).catch(() => null),
    (async () => {
      const flows = await flowsListe();
      const treffer = flows.filter(
        (f) => f && typeof f === "object" && (f as Record<string, unknown>).status === "aktiv" && (f as Record<string, unknown>).ausloeser === "booking"
      );
      await Promise.allSettled(
        treffer.map((f) => flowStarten(String((f as Record<string, unknown>).id ?? ""), l.leadId, l.email))
      );
    })().catch(() => null),
  ]);
}

export async function POST(req: Request) {
  if (!rateLimit(`booking:${clientIp(req)}`, 5, 10 * 60_000)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad request" }, { status: 400 });
  }

  const type = clean(b.type, 120);
  const mode = clean(b.mode, 60);
  const duration = clean(b.duration, 10);
  const messageTxt = clean(b.message, 2000);

  const pruefung = pruefeFormular(terminSchema, {
    name: b.name,
    email: b.email,
    phone: b.phone,
    date: b.date,
    time: b.time,
    website: b.website,
  });

  if (pruefung.ok && pruefung.bot) {
    // Honeypot: unsichtbares Feld — von Menschen leer, von Bots gefüllt.
    // Bot sieht Erfolg, es wird aber keine Mail verschickt.
    return NextResponse.json({ ok: true, delivered: false, skipped: true });
  }

  if (!pruefung.ok) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const { name, email, phone, date, time } = pruefung.daten;
  const vorquali = vorqualiAusPayload(b.antworten);

  const leadId = await leadAnlegen({
    quelle: "booking",
    name,
    email,
    telefon: phone,
    nachricht: messageTxt || `Terminwunsch: ${type || "Termin"} am ${date} um ${time} Uhr.`,
    daten: { type, mode, duration, date, time, ...(vorquali ? { vorquali } : {}) },
  });

  // Kontakt-Dedup + Flow-Auslöser laufen ab hier im Hintergrund parallel
  // zum Mailversand — awaited erst unmittelbar vor jeder Antwort unten.
  const nebenwirkungen = crmNebenwirkungen({ leadId, email, name, telefon: phone });

  const rows = emailRows([
    { label: "Anlass", value: esc(type) },
    { label: "Art", value: esc(mode) },
    { label: "Datum", value: esc(date) },
    { label: "Uhrzeit", value: `${esc(time)} Uhr${duration ? ` · ${esc(duration)} Min.` : ""}` },
    { label: "Name", value: esc(name) },
    { label: "E-Mail", value: esc(email) },
    { label: "Telefon", value: esc(phone) },
    { label: "Nachricht", value: esc(messageTxt) },
  ]);

  const internal = await sendMail({
    subject: `Terminanfrage: ${type || "Termin"} am ${date} ${time} — ${name}`,
    replyTo: email,
    html: emailLayout({
      heading: "Neue Terminanfrage",
      intro: "Über das Buchungstool wurde ein Wunschtermin angefragt.",
      bodyHtml: rows,
    }),
  });

  const bestaetigung = mailTerminBestaetigung(name, date, time);

  if (internal.ok) {
    // Bestätigung an den Anfragenden — best effort, blockiert die Antwort nicht.
    const kunde = await sendMail({ to: email, subject: bestaetigung.betreff, html: bestaetigung.html });
    await mailLoggen({
      leadId,
      vorlage: "termin-bestaetigung",
      betreff: bestaetigung.betreff,
      empfaenger: email,
      status: kunde.ok ? "gesendet" : "fehler",
    });
    await nebenwirkungen;
    return NextResponse.json({ ok: true, delivered: true });
  }

  if (internal.skipped) {
    // Kein RESEND_API_KEY konfiguriert: Anfrage ins Server-Log, ehrlich flaggen.
    console.warn("[booking] RESEND_API_KEY fehlt — Anfrage nur geloggt:", {
      type, mode, date, time, name, email, phone, messageTxt,
    });
    await mailLoggen({
      leadId,
      vorlage: "termin-bestaetigung",
      betreff: bestaetigung.betreff,
      empfaenger: email,
      status: "demo",
    });
    await nebenwirkungen;
    return NextResponse.json({ ok: true, delivered: false, demo: true });
  }

  // Versand konfiguriert, aber fehlgeschlagen → ehrlich scheitern.
  console.error("[booking] Lead-Mail fehlgeschlagen — 502.");
  await mailLoggen({
    leadId,
    vorlage: "termin-bestaetigung",
    betreff: bestaetigung.betreff,
    empfaenger: email,
    status: "fehler",
  });
  await nebenwirkungen;
  return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
}
