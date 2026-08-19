import { NextRequest, NextResponse } from "next/server";
import { darfIrgendwie } from "@/lib/os/zugang";
import { ladeSnapshot, protokolliere } from "@/lib/os/db";
import { lageBerechnen, type Entscheidung } from "@/lib/os/kpi";
import { emailLayout, sendMail } from "@/lib/email";

/**
 * Der Wochen-Review aus docs/branding/KPI-LOGIK.md, automatisiert:
 * sonntags rechnet der Cron die Lage durch und schickt sie per Mail —
 * inklusive der einen Änderung für die kommende Woche.
 *
 * Bewusst ohne Sprachmodell: die Entscheidungs-Engine liefert bereits
 * konkrete Anweisungen, und eine Regel schlägt eine Formulierung.
 */

export const runtime = "nodejs";

const FARBEN: Record<Entscheidung["stufe"], string> = {
  handeln: "#c2371b",
  beobachten: "#b8860b",
  sammeln: "#4a5442",
  laeuft: "#2e7d4f",
};

const WORTE: Record<Entscheidung["stufe"], string> = {
  handeln: "Handeln",
  beobachten: "Beobachten",
  sammeln: "Sammeln",
  laeuft: "Läuft",
};

function zahl(n: number | null, einheit = ""): string {
  if (n === null || Number.isNaN(n)) return "–";
  return `${new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 }).format(n)}${einheit}`;
}

export async function GET(req: NextRequest) {
  if (!(await darfIrgendwie(req))) {
    return NextResponse.json({ ok: false, error: "Nicht berechtigt" }, { status: 401 });
  }

  const lage = lageBerechnen(await ladeSnapshot());

  const zeilen = [
    ["Reels diese Woche", String(lage.woche7.anzahl)],
    ["Ø Reichweite je Reel", zahl(lage.woche7.views)],
    ["Ø Watchtime", zahl(lage.woche7.watchtime, " %")],
    ["Saves je 1.000 Views", zahl(lage.woche7.savesRate)],
    ["Follow-Conversion", zahl(lage.woche7.followConv, " %")],
    ["Follower gesamt", zahl(lage.follower.gesamt)],
    ["Follower pro Tag", zahl(lage.follower.proTag)],
    ["Kadenz-Streak", `${lage.streak} Tage`],
  ];

  const tabelle = zeilen
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 0;color:#4a5442;font-size:14px;">${k}</td>
         <td style="padding:6px 0;text-align:right;font-size:14px;font-weight:bold;color:#10190f;">${v}</td></tr>`,
    )
    .join("");

  /* Die eine Änderung für nächste Woche: die dringlichste Entscheidung. */
  const wichtigste = lage.entscheidungen[0];
  const rest = lage.entscheidungen.slice(1, 5);

  const entscheidungenHtml = rest
    .map(
      (e) => `<tr><td style="padding:10px 0;border-top:1px solid #e6e0d2;">
        <span style="display:inline-block;font-size:11px;text-transform:uppercase;letter-spacing:0.04em;color:${FARBEN[e.stufe]};">${WORTE[e.stufe]}</span><br>
        <strong style="font-size:15px;color:#10190f;">${e.titel}</strong><br>
        <span style="font-size:14px;color:#4a5442;">${e.begruendung}</span><br>
        <span style="font-size:14px;color:#10190f;">→ ${e.aktion}</span>
      </td></tr>`,
    )
    .join("");

  const html = emailLayout({
    heading: `Woche ${lage.woche} — Branding OS`,
    intro: lage.phase,
    bodyHtml: `
      ${
        wichtigste
          ? `<div style="background:#f6f2e6;border-left:3px solid ${FARBEN[wichtigste.stufe]};padding:14px 16px;margin-bottom:20px;">
               <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.04em;color:${FARBEN[wichtigste.stufe]};">Die eine Änderung</div>
               <div style="font-size:17px;font-weight:bold;color:#10190f;margin-top:4px;">${wichtigste.titel}</div>
               <div style="font-size:14px;color:#4a5442;margin-top:4px;">${wichtigste.begruendung}</div>
               <div style="font-size:14px;color:#10190f;margin-top:6px;">→ ${wichtigste.aktion}</div>
             </div>`
          : ""
      }
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${tabelle}</table>
      ${entscheidungenHtml ? `<h3 style="font-size:13px;text-transform:uppercase;letter-spacing:0.04em;color:#4a5442;margin:24px 0 0;">Weitere Signale</h3><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${entscheidungenHtml}</table>` : ""}
      <p style="font-size:13px;color:#4a5442;margin-top:24px;">
        Regel bleibt: nur eine Änderung pro Woche, sonst ist nicht messbar, was gewirkt hat.
        Vollständige Lage unter <a href="https://beuwy.com/os" style="color:#0c4bc3;">beuwy.com/os</a>.
      </p>`,
  });

  const mail = await sendMail({
    subject: `Branding OS — Woche ${lage.woche}: ${wichtigste?.titel ?? "alles ruhig"}`,
    html,
  });

  await protokolliere(
    "wochenreport",
    mail.ok,
    lage.woche7.anzahl,
    mail.skipped ? "RESEND_API_KEY fehlt" : mail.ok ? "versendet" : "Versand fehlgeschlagen",
  );

  return NextResponse.json({
    ok: mail.ok,
    woche: lage.woche,
    versendet: mail.ok,
    uebersprungen: Boolean(mail.skipped),
  });
}
