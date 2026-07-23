import { Resend } from "resend";

/**
 * Transaktions-E-Mails via Resend (Muster aus dem Riegel-Projekt, für beuwy
 * verschlankt). Aktiv, sobald RESEND_API_KEY gesetzt ist; ohne Key wird
 * nichts versendet (kein Crash) — der Aufrufer bekommt { skipped: true }.
 *
 * Env auf Vercel:
 *   RESEND_API_KEY  — Versand aktivieren
 *   EMAIL_FROM      — Default "beuwy <onboarding@resend.dev>"
 *   EMAIL_TO        — Default "ap@beuwy.com"
 */
const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const FROM = process.env.EMAIL_FROM || "beuwy <onboarding@resend.dev>";
const TO = process.env.EMAIL_TO || "ap@beuwy.com";

export async function sendMail(opts: {
  subject: string;
  html: string;
  to?: string;
  replyTo?: string;
}): Promise<{ ok: boolean; skipped?: boolean }> {
  if (!resend) return { ok: false, skipped: true };
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: opts.to || TO,
      replyTo: opts.replyTo,
      subject: opts.subject,
      html: opts.html,
    });
    if (error) {
      console.error("[email] Versand fehlgeschlagen:", error.message);
      return { ok: false };
    }
    return { ok: true };
  } catch (e) {
    console.error("[email] Versand-Exception:", e);
    return { ok: false };
  }
}

/** Tabellenbasiertes Layout — E-Mail-Clients strippen moderne CSS-Features. */
export function emailLayout(opts: {
  heading: string;
  intro: string;
  bodyHtml: string;
}): string {
  return `<!doctype html>
<html lang="de">
<body style="margin:0;padding:24px;background:#f5f2ea;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e6e0d2;">
        <tr>
          <td style="background:#1A0404;padding:20px 32px;">
            <span style="color:#F7E99A;font-size:20px;font-weight:bold;letter-spacing:-0.02em;">beuwy</span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <h1 style="margin:0 0 8px;font-size:20px;color:#1A0404;">${opts.heading}</h1>
            <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#5a5344;">${opts.intro}</p>
            ${opts.bodyHtml}
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px;border-top:1px solid #e6e0d2;">
            <p style="margin:0;font-size:12px;color:#8A8068;">beuwy — Alexander Pütter · Mendelssohnstraße 52 · 67061 Ludwigshafen · ap@beuwy.com</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function emailRows(rows: Array<{ label: string; value: string }>): string {
  const tr = rows
    .filter((r) => r.value)
    .map(
      (r) => `<tr>
  <td style="padding:8px 0;font-size:13px;color:#8A8068;vertical-align:top;width:120px;">${r.label}</td>
  <td style="padding:8px 0;font-size:14px;color:#1A0404;">${r.value}</td>
</tr>`
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e6e0d2;">${tr}</table>`;
}
