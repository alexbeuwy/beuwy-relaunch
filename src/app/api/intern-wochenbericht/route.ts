import { NextRequest, NextResponse } from "next/server";
import { STUDIO_COOKIE, isStudioAuthed } from "@/lib/studio-auth";
import { crmKonfiguriert, kontoDetail, mailLoggen, type BwKontoDetail } from "@/lib/crm/db";
import { sendMail, emailLayout, emailRows } from "@/lib/email";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { getContent } from "@/lib/content";
import { INTERN_KUNDEN_DEFAULTS } from "@/lib/texte/intern-kunden";

/**
 * Versand/Protokollierung für /intern/wochenbericht (R5 Leaf G7). Ein
 * Formular, zwei benannte Submit-Buttons (aktion=senden|protokollieren,
 * siehe page.tsx) — beide POSTen hierher, Unterschied ist nur, ob
 * sendMail() wirklich aufgerufen wird.
 *
 * "senden": ruft sendMail() auf. Liefert Resend erfolgreich, protokolliert
 * mailLoggen(status:"gesendet"). Fehlt RESEND_API_KEY (mail.skipped) oder
 * ist keine Datenbank konfiguriert, gibt es nichts wirklich zu versenden —
 * status:"demo", genau wie bei den anderen Mail-Aktionen im Projekt
 * (Muster: /api/konto "code").
 *
 * "protokollieren": versendet bewusst NICHTS (das ist der ganze Sinn des
 * Buttons — Alex hat den Kunden z. B. telefonisch informiert) und
 * protokolliert entsprechend ehrlich als status:"demo", nicht "gesendet" —
 * die Mail-Historie (kontakt360, MAIL_STATUS_LABEL) soll "Gesendet"
 * ausschließlich für tatsächlich zugestellte Mails zeigen.
 *
 * bauWochenbericht()/esc()/absatz()/liste() sind identisch zu
 * src/app/intern/wochenbericht/page.tsx dupliziert (nicht importiert) —
 * page.tsx liegt zwar im selben Leaf, ein Import von dort in eine Route
 * würde aber Server-Component- und Route-Handler-Code vermischen; beide
 * Kopien müssen bei Änderungen synchron gehalten werden (wie an mehreren
 * Stellen im Repo bereits üblich, siehe Kommentare dort).
 */

export const runtime = "nodejs";

type TicketZeile = BwKontoDetail["tickets"][number];

const STUFEN_LABEL: Record<string, string> = {
  aufnahme: "Aufnahme",
  design: "Design",
  umsetzung: "Umsetzung",
  livegang: "Livegang",
  betrieb: "Betrieb",
};

const STATUS_ANZEIGE: Record<string, string> = {
  offen: "Offen",
  "in-arbeit": "In Arbeit",
  erledigt: "Erledigt",
  neu: "Neu",
  in_bearbeitung: "In Bearbeitung",
};

const WOCHE_MS = 7 * 24 * 3_600_000;
const MAX_NOTIZ_ZEICHEN = 2000;

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function absatz(html: string): string {
  return `<p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#141414;">${html}</p>`;
}

function liste(punkte: string[]): string {
  const items = punkte.map((p) => `<li style="margin:0 0 8px;">${p}</li>`).join("");
  return `<ul style="margin:0 0 16px;padding-left:20px;font-size:14px;line-height:1.6;color:#141414;">${items}</ul>`;
}

function abschnittstitel(text: string): string {
  return `<p style="margin:20px 0 8px;font-size:13px;font-weight:700;color:#141414;">${esc(text)}</p>`;
}

function vorname(name: string): string {
  const trimmed = String(name ?? "").trim();
  return esc(trimmed.split(/\s+/)[0] || trimmed) || "Sie";
}

function bauWochenbericht(input: {
  name: string;
  projektStatusLabel: string;
  erledigt: string[];
  offen: string[];
  notiz: string;
  headingVorlage: string;
  introText: string;
  erledigtTitel: string;
  erledigtLeer: string;
  offenTitel: string;
  offenLeer: string;
  projektstatusTitel: string;
  notizLabel: string;
}): { betreff: string; html: string } {
  const betreff = "Ihr Wochenbericht";
  const html = emailLayout({
    heading: input.headingVorlage.replace("{name}", vorname(input.name)),
    intro: esc(input.introText),
    bodyHtml:
      emailRows([{ label: input.projektstatusTitel, value: esc(input.projektStatusLabel) }]) +
      abschnittstitel(input.erledigtTitel) +
      (input.erledigt.length ? liste(input.erledigt.map(esc)) : absatz(esc(input.erledigtLeer))) +
      abschnittstitel(input.offenTitel) +
      (input.offen.length ? liste(input.offen.map(esc)) : absatz(esc(input.offenLeer))) +
      (input.notiz.trim()
        ? abschnittstitel(input.notizLabel) + absatz(esc(input.notiz).replace(/\n/g, "<br />"))
        : ""),
  });
  return { betreff, html };
}

function berechneBerichtsdaten(tickets: TicketZeile[]): { erledigt: TicketZeile[]; offen: TicketZeile[] } {
  const jetzt = Date.now();
  const wochenTickets = tickets.filter((ti) => jetzt - new Date(ti.erstellt).getTime() <= WOCHE_MS);
  return {
    erledigt: wochenTickets.filter((ti) => ti.status === "erledigt"),
    offen: tickets.filter((ti) => ti.status !== "erledigt"),
  };
}

export async function POST(req: NextRequest) {
  if (!rateLimit(`intern-wochenbericht:${clientIp(req)}`, 30, 10 * 60_000)) {
    return NextResponse.json({ ok: false, error: "Zu viele Anfragen — bitte kurz warten." }, { status: 429 });
  }

  if (!(await isStudioAuthed(req.cookies.get(STUDIO_COOKIE)?.value))) {
    return NextResponse.json({ ok: false, error: "Nicht angemeldet." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  const aktion = String(form.get("aktion") ?? "").trim();
  const email = String(form.get("konto") ?? "").trim().toLowerCase();
  const notiz = String(form.get("notiz") ?? "").trim().slice(0, MAX_NOTIZ_ZEICHEN);

  if (!email) {
    return NextResponse.json({ ok: false, error: "Fehlendes Konto." }, { status: 400 });
  }
  if (aktion !== "senden" && aktion !== "protokollieren") {
    return NextResponse.json({ ok: false, error: "Unbekannte Aktion." }, { status: 400 });
  }

  const ziel = new URL("/intern/wochenbericht", req.url);
  ziel.searchParams.set("konto", email);
  if (notiz) ziel.searchParams.set("notiz", notiz);

  const konfiguriert = crmKonfiguriert();

  if (!konfiguriert) {
    // Ohne Datenbank gibt es kein echtes Konto zu bestätigen — beide
    // Aktionen bleiben ehrlich im Demo-Zustand, ohne sendMail()/mailLoggen()
    // aufzurufen (fail-open, Muster wie überall sonst in db.ts).
    ziel.searchParams.set("status", "demo");
    return NextResponse.redirect(ziel, { status: 303 });
  }

  const detail = await kontoDetail(email);
  if (!detail) {
    return NextResponse.json({ ok: false, error: "Konto nicht gefunden." }, { status: 404 });
  }

  const content = await getContent();
  const t = (key: string) => content[key] ?? INTERN_KUNDEN_DEFAULTS[key] ?? key;
  const { erledigt, offen } = berechneBerichtsdaten(detail.tickets);

  const { betreff, html } = bauWochenbericht({
    name: detail.konto.name || detail.konto.firma || email,
    projektStatusLabel: STUFEN_LABEL[detail.konto.projekt_status] ?? (detail.konto.projekt_status || "Aufnahme"),
    erledigt: erledigt.map((ti) => ti.titel),
    offen: offen.map((ti) => `${ti.titel} (${STATUS_ANZEIGE[ti.status] ?? ti.status})`),
    notiz,
    headingVorlage: t("intern.kunden.wochenbericht.mail_heading"),
    introText: t("intern.kunden.wochenbericht.mail_intro"),
    erledigtTitel: t("intern.kunden.wochenbericht.erledigt_titel"),
    erledigtLeer: t("intern.kunden.wochenbericht.erledigt_leer"),
    offenTitel: t("intern.kunden.wochenbericht.offen_titel"),
    offenLeer: t("intern.kunden.wochenbericht.offen_leer"),
    projektstatusTitel: t("intern.kunden.wochenbericht.projektstatus_titel"),
    notizLabel: t("intern.kunden.wochenbericht.notiz_label"),
  });

  if (aktion === "protokollieren") {
    await mailLoggen({ leadId: null, vorlage: "wochenbericht", betreff, empfaenger: email, status: "demo" });
    ziel.searchParams.set("status", "demo");
    return NextResponse.redirect(ziel, { status: 303 });
  }

  // aktion === "senden"
  const mail = await sendMail({ to: email, subject: betreff, html });
  if (mail.ok) {
    await mailLoggen({ leadId: null, vorlage: "wochenbericht", betreff, empfaenger: email, status: "gesendet" });
    ziel.searchParams.set("status", "gesendet");
  } else if (mail.skipped) {
    console.warn("[intern-wochenbericht] RESEND_API_KEY fehlt — nur geloggt:", { email });
    await mailLoggen({ leadId: null, vorlage: "wochenbericht", betreff, empfaenger: email, status: "demo" });
    ziel.searchParams.set("status", "demo");
  } else {
    console.error("[intern-wochenbericht] Versand fehlgeschlagen.");
    await mailLoggen({ leadId: null, vorlage: "wochenbericht", betreff, empfaenger: email, status: "fehler" });
    ziel.searchParams.set("status", "fehler");
  }

  return NextResponse.redirect(ziel, { status: 303 });
}
