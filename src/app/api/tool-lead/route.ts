import { NextResponse } from "next/server";
import { sendMail, emailLayout, emailRows } from "@/lib/email";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { kontaktSchema, pruefeFormular } from "@/lib/validierung";
import { leadAnlegen, mailLoggen } from "@/lib/crm/db";

/**
 * Lead-Route für alle /tools/*-Rechner (Verkaufspreis, Miete, AfA — B2–B4).
 * Ergebnis ist nie hinter dieser Route versteckt (die Rechner selbst zeigen
 * ihr Ergebnis sofort, ohne Lead-Gate) — hier landet nur, wer freiwillig die
 * ausführliche Auswertung per E-Mail will.
 *
 * Muster identisch zu /api/booking (Honeypot über pruefeFormular, Resend
 * ohne RESEND_API_KEY → ehrlicher demo:true), zusätzlich mit CRM-Persistenz
 * über src/lib/crm/db.ts (Vertrag R3-PLAN.md, Abschnitt "Verträge": B7/B9
 * UND diese Route nutzen ausschließlich diese Datei für Supabase-Zugriff).
 * `eingaben`/`ergebnis` kommen bereits fertig berechnet vom Client (den
 * Rechnern aus src/lib/rechner/*.ts) und werden hier nur als Kontext-JSON
 * im Lead gespeichert, nicht erneut durchgerechnet.
 */

export const runtime = "nodejs";

const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const clean = (s: unknown, max: number) => String(s ?? "").trim().slice(0, max);

const TOOL_LABEL: Record<string, string> = {
  verkaufspreis: "Verkaufspreisrechner",
  mietpreis: "Mietpreisrechner",
  afa: "AfA-/Restnutzungsdauer-Rechner",
};

// Guardrail gegen missbräuchlich große Payloads — ein reales Rechenergebnis
// (Schritte + Eingaben) liegt weit darunter.
const MAX_JSON_ZEICHEN = 8_000;

/** Reduziert ein beliebiges JSON-Objekt auf eine handhabbare Größe, ohne zu werfen. */
function begrenzteDaten(wert: unknown): Record<string, unknown> {
  if (!wert || typeof wert !== "object") return {};
  try {
    const text = JSON.stringify(wert);
    if (text.length <= MAX_JSON_ZEICHEN) return wert as Record<string, unknown>;
    return { hinweis: "Daten für die Speicherung gekürzt (zu groß)." };
  } catch {
    return {};
  }
}

export async function POST(req: Request) {
  if (!rateLimit(`tool-lead:${clientIp(req)}`, 8, 10 * 60_000)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad request" }, { status: 400 });
  }

  const tool = clean(b.tool, 60) || "unbekannt";
  const toolLabel = TOOL_LABEL[tool] ?? "Rechner";

  const pruefung = pruefeFormular(kontaktSchema, {
    name: b.name,
    email: b.email,
    // Telefon ist in der ErgebnisSchleuse optional — leer bleibt leer.
    phone: typeof b.telefon === "string" && b.telefon.trim() ? b.telefon : undefined,
    website: b.website,
  });

  if (pruefung.ok && pruefung.bot) {
    // Honeypot: Bot sieht Erfolg, es passiert nichts weiter.
    return NextResponse.json({ ok: true, delivered: false, skipped: true });
  }

  if (!pruefung.ok) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const { name, email, phone } = pruefung.daten;
  const eingaben = begrenzteDaten(b.eingaben);
  const ergebnis = begrenzteDaten(b.ergebnis);

  const leadId = await leadAnlegen({
    quelle: "tool",
    name,
    email,
    telefon: phone ?? "",
    nachricht: `Auswertung freigeschaltet: ${toolLabel}.`,
    daten: { tool, eingaben, ergebnis },
  });

  const rows = emailRows([
    { label: "Tool", value: esc(toolLabel) },
    { label: "Name", value: esc(name) },
    { label: "E-Mail", value: esc(email) },
  ]);

  const internal = await sendMail({
    subject: `Tool-Lead: ${toolLabel} — ${name}`,
    replyTo: email,
    html: emailLayout({
      heading: "Neue Auswertungs-Anfrage",
      intro: `Über ${toolLabel} wurde eine detaillierte Auswertung per E-Mail angefordert.`,
      bodyHtml: rows,
    }),
  });

  if (internal.ok) {
    // Bestätigung an den Anfragenden — best effort, blockiert die Antwort nicht.
    await sendMail({
      to: email,
      subject: `Ihre Auswertung: ${toolLabel} bei beuwy`,
      html: emailLayout({
        heading: "Auswertung erhalten",
        intro: `Vielen Dank! Wir schicken Ihnen die detaillierte Auswertung aus dem ${toolLabel} in Kürze persönlich zu.`,
        bodyHtml: rows,
      }),
    });
    await mailLoggen({
      leadId,
      vorlage: `tool-lead-${tool}`,
      betreff: `Tool-Lead: ${toolLabel} — ${name}`,
      empfaenger: email,
      status: "gesendet",
    });
    return NextResponse.json({ ok: true, delivered: true });
  }

  if (internal.skipped) {
    console.warn("[tool-lead] RESEND_API_KEY fehlt — Anfrage nur geloggt:", { tool, name, email });
    await mailLoggen({
      leadId,
      vorlage: `tool-lead-${tool}`,
      betreff: `Tool-Lead: ${toolLabel} — ${name}`,
      empfaenger: email,
      status: "demo",
    });
    return NextResponse.json({ ok: true, delivered: false, demo: true });
  }

  await mailLoggen({
    leadId,
    vorlage: `tool-lead-${tool}`,
    betreff: `Tool-Lead: ${toolLabel} — ${name}`,
    empfaenger: email,
    status: "fehler",
  });
  console.error("[tool-lead] Lead-Mail fehlgeschlagen — 502.");
  return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
}
