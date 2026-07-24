import { NextResponse } from "next/server";
import { sendMail, emailLayout, emailRows } from "@/lib/email";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/**
 * Video-Analyse-Anfragen (ersetzt den mailto-Link im CTA): Name, E-Mail,
 * Domain — Lead geht per Resend-Mail an EMAIL_TO. Ohne RESEND_API_KEY
 * antwortet die Route ehrlich mit demo:true (Muster aus /api/booking).
 */

export const runtime = "nodejs";

const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const clean = (s: unknown, max: number) => String(s ?? "").trim().slice(0, max);

export async function POST(req: Request) {
  if (!rateLimit(`video:${clientIp(req)}`, 5, 10 * 60_000)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad request" }, { status: 400 });
  }

  // Honeypot: unsichtbares Feld — von Menschen leer, von Bots gefüllt.
  if (clean(b.website, 200)) {
    return NextResponse.json({ ok: true, delivered: false, skipped: true });
  }

  const name = clean(b.name, 200);
  const email = clean(b.email, 200);
  const domain = clean(b.domain, 200);
  const messageTxt = clean(b.message, 2000);

  if (!name || !domain || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const rows = emailRows([
    { label: "Name", value: esc(name) },
    { label: "E-Mail", value: esc(email) },
    { label: "Domain", value: esc(domain) },
    { label: "Anmerkung", value: esc(messageTxt) },
  ]);

  const internal = await sendMail({
    subject: `Video-Analyse angefordert: ${domain} — ${name}`,
    replyTo: email,
    html: emailLayout({
      heading: "Neue Video-Analyse-Anfrage",
      intro: "Über /video-analyse wurde eine Analyse angefordert.",
      bodyHtml: rows,
    }),
  });

  if (internal.ok) {
    await sendMail({
      to: email,
      subject: "Ihre Video-Analyse bei beuwy",
      html: emailLayout({
        heading: "Anfrage erhalten",
        intro: `Vielen Dank! Ich schaue mir ${esc(domain)} an und melde mich binnen 24 Stunden — auch, wenn die Antwort Nein ist.`,
        bodyHtml: rows,
      }),
    });
    return NextResponse.json({ ok: true, delivered: true });
  }

  if (internal.skipped) {
    console.warn("[video-analyse] RESEND_API_KEY fehlt — Anfrage nur geloggt:", {
      name, email, domain, messageTxt,
    });
    return NextResponse.json({ ok: true, delivered: false, demo: true });
  }

  console.error("[video-analyse] Lead-Mail fehlgeschlagen — 502.");
  return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
}
