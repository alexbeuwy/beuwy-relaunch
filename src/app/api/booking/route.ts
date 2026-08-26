import { NextResponse } from "next/server";
import { sendMail, emailLayout, emailRows } from "@/lib/email";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { terminSchema, pruefeFormular } from "@/lib/validierung";
import { leadAnlegen, mailLoggen } from "@/lib/crm/db";
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
 */

export const runtime = "nodejs";

// Nur beim HTML-Rendern escapen — replyTo bekommt Rohwerte.
const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const clean = (s: unknown, max: number) => String(s ?? "").trim().slice(0, max);

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

  const leadId = await leadAnlegen({
    quelle: "booking",
    name,
    email,
    telefon: phone,
    nachricht: messageTxt || `Terminwunsch: ${type || "Termin"} am ${date} um ${time} Uhr.`,
    daten: { type, mode, duration, date, time },
  });

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
  return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
}
