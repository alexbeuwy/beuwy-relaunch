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

/**
 * Tabellenbasiertes Layout im Stil der Website (Alex, 27.08: „mehr im
 * Style der Homepage, boldere Headline, Fade, schöne Assets"):
 * Pastellgelb-Kopfband mit Wortmarke und freigestellter Kampagnen-Vase,
 * darunter ein Verlaufs-Band als Fade in den weißen Inhalt, Headline
 * fett und groß in Tinte. E-Mail-Clients strippen moderne CSS-Features —
 * deshalb Tabellen, Inline-Styles und bgcolor-Fallbacks; der Verlauf
 * und das webp-Asset sind progressive Verschönerung (Outlook zeigt
 * stattdessen die flache Gelbfläche, nichts bricht).
 */
export function emailLayout(opts: {
  heading: string;
  intro: string;
  bodyHtml: string;
  cta?: { label: string; url: string };
}): string {
  const cta = opts.cta
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 4px;"><tr>
        <td bgcolor="#f3e27f" style="border-radius:999px;">
          <a href="${opts.cta.url}" style="display:inline-block;padding:14px 30px;font-size:15px;font-weight:bold;color:#161613;text-decoration:none;letter-spacing:-0.01em;">${opts.cta.label}</a>
        </td>
      </tr></table>`
    : "";
  return `<!doctype html>
<html lang="de">
<body style="margin:0;padding:28px 16px;background:#f7f7f5;font-family:Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center">
      <table role="presentation" width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e9e9e6;">
        <tr>
          <td bgcolor="#f3e27f" style="background:linear-gradient(135deg,#f3e27f 0%,#f7ecab 100%);padding:0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:26px 36px 22px;vertical-align:middle;">
                  <span style="font-size:23px;font-weight:800;letter-spacing:-0.03em;color:#161613;">beuwy</span><br>
                  <span style="font-size:11px;letter-spacing:0.12em;color:#161613;opacity:0.6;">MARKE&nbsp;&middot;&nbsp;PORTAL&nbsp;&middot;&nbsp;VERTRIEBSSYSTEM</span>
                </td>
                <td width="120" style="padding:10px 24px 0 0;vertical-align:bottom;" align="right">
                  <img src="https://beuwy-2.b-cdn.net/assets/makler%20assets/Vase-01.webp" width="86" alt="" style="display:block;border:0;max-width:86px;height:auto;">
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="#fbf5d6" style="background:linear-gradient(180deg,#f7ecab 0%,#ffffff 100%);font-size:0;line-height:0;height:32px;">&nbsp;</td>
        </tr>
        <tr>
          <td style="padding:8px 36px 36px;">
            <h1 style="margin:0 0 10px;font-size:30px;line-height:1.12;letter-spacing:-0.02em;font-weight:800;color:#161613;">${opts.heading}</h1>
            <p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:#5d5d58;">${opts.intro}</p>
            ${opts.bodyHtml}
            ${cta}
          </td>
        </tr>
        <tr>
          <td style="padding:18px 36px 22px;border-top:1px solid #e9e9e6;">
            <p style="margin:0;font-size:12px;line-height:1.6;color:#8a8a84;">beuwy — Alexander Pütter · Max-Bill-Str. 3 · 67061 Ludwigshafen · <a href="mailto:ap@beuwy.com" style="color:#5d5d58;">ap@beuwy.com</a></p>
          </td>
        </tr>
      </table>
      <table role="presentation" width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">
        <tr><td style="padding:14px 8px 0;" align="center">
          <span style="font-size:11px;color:#8a8a84;">Unternehmensberatung f&uuml;r Immobilienmarketing &middot; beuwy.com</span>
        </td></tr>
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
  <td style="padding:9px 18px 9px 20px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#8a8a84;vertical-align:top;width:130px;">${r.label}</td>
  <td style="padding:9px 20px 9px 0;font-size:14.5px;line-height:1.55;color:#161613;">${r.value}</td>
</tr>`
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#f7f7f5" style="background:#f7f7f5;border-radius:14px;margin:4px 0 8px;"><tr><td style="font-size:0;line-height:0;height:10px;">&nbsp;</td></tr>${tr}<tr><td style="font-size:0;line-height:0;height:10px;">&nbsp;</td></tr></table>`;
}
