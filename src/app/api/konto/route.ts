import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { sendMail } from "@/lib/email";
import { mailKontoCode } from "@/lib/email-vorlagen";
import {
  crmKonfiguriert,
  kontoCodeAnlegen,
  kontoCodeEinloesen,
  kontoDatenSetzen,
  kontoDetail,
  kontoUpsert,
  leadAnlegen,
  ticketAnlegen,
  ticketAntwortAnlegen,
  ticketAntworten,
} from "@/lib/crm/db";
import { kontaktSchema } from "@/lib/validierung";
import {
  demoKontoCode,
  demoKontoCodeGueltig,
  leseKontoCookie,
  loescheKontoCookie,
  setzeKontoCookie,
  zufallsKontoCode,
} from "@/lib/konto-auth";

/**
 * API für /konto (R3 Leaf B9, Onboarding-Umbau R3). Fünf Aktionen über ein
 * Feld `aktion`, Muster identisch zu /api/booking und /api/tool-lead
 * (Rate-Limit über src/lib/rate-limit, Supabase ausschließlich über
 * src/lib/crm/db.ts).
 *
 * "code" und "einloesen" laufen in zwei Modi, je nachdem ob eine Datenbank
 * konfiguriert ist (crmKonfiguriert()):
 *  - Konfiguriert: echter Zufallscode, in Supabase abgelegt/geprüft
 *    (kontoCodeAnlegen/kontoCodeEinloesen) — Produktivbetrieb.
 *  - Nicht konfiguriert: speicherloser, aus E-Mail + Zeitfenster
 *    abgeleiteter Demo-Code (src/lib/konto-auth.ts) — funktioniert auf
 *    jedem Deployment ohne Env, auch über mehrere Serverless-Instanzen
 *    hinweg, weil "code" und "einloesen" ihn unabhängig voneinander neu
 *    berechnen statt sich etwas zu merken.
 * Fehlt zusätzlich RESEND_API_KEY (sendMail liefert skipped:true), kommt
 * ohnehin keine Mail an — die Antwort trägt dann demo:true und den Code
 * selbst als demoCode, ehrlich gekennzeichnet, damit der Flow ohne
 * Postfach durchklickbar bleibt.
 *
 * "onboarding" speichert die vier Fragegruppen aus dem Wizard in
 * KontoBereich.tsx (Rolle/Intent/Team/Stadt, plus Firma/Name über
 * kontoUpsert) — nur mit gültigem Konto-Cookie, sonst 401. Der Client ruft
 * sie direkt nach erfolgreichem "einloesen" auf; schlägt das Speichern
 * fehl, bleibt die Antwort trotzdem ok:true (fail-open), weil die
 * eigentliche Registrierung mit der Code-Einlösung schon durch ist.
 *
 * R5 Leaf G7 (additiv, Tickets mit Threads): "ticket-antwort" legt eine
 * Kundenantwort im Thread eines eigenen Tickets an (ticketAntwortAnlegen,
 * von="kunde") — geprüft wird die Ticket-Zugehörigkeit serverseitig über
 * kontoDetail(email), damit niemand über eine erratene Ticket-ID in einen
 * fremden Thread schreiben kann. Zusätzlich ein neuer GET-Handler (liest
 * ?ticket=<id>): lädt den Verlauf desselben Tickets für die Anzeige in
 * KontoBereich.tsx — rein additiv, verändert keinen bestehenden POST-Pfad.
 */

export const runtime = "nodejs";

const clean = (s: unknown, max: number) => String(s ?? "").trim().slice(0, max);

/** "score nach Teamgröße" — grobe Priorisierung fürs CRM, kein Ersatz für echtes Lead-Scoring. */
const TEAM_SCORE: Record<string, number> = {
  allein: 20,
  "2–5": 40,
  "6–15": 65,
  "16+": 90,
};

/** E-Mail-Prüfung/-Normalisierung über dieselbe Regel wie alle anderen Formulare. */
function pruefeEmail(wert: unknown): string | null {
  const ergebnis = kontaktSchema.shape.email.safeParse(wert);
  return ergebnis.success ? ergebnis.data : null;
}

export async function POST(req: Request) {
  const ip = clientIp(req);

  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  const aktion = clean(b.aktion, 20);

  if (aktion === "code") {
    if (
      !rateLimit(`konto-code:${ip}`, 5, 10 * 60_000) ||
      !rateLimit(`konto-code:email:${clean(b.email, 200).toLowerCase()}`, 3, 10 * 60_000)
    ) {
      return NextResponse.json({ ok: false, error: "Zu viele Versuche — bitte in ein paar Minuten erneut probieren." }, { status: 429 });
    }
    const email = pruefeEmail(b.email);
    if (!email) {
      return NextResponse.json({ ok: false, error: "Bitte eine gültige E-Mail-Adresse angeben." }, { status: 422 });
    }

    const konfiguriert = crmKonfiguriert();
    const code = konfiguriert ? zufallsKontoCode() : demoKontoCode(email);
    if (konfiguriert) {
      await kontoCodeAnlegen(email, code, 15);
    }

    const vorlage = mailKontoCode(code);
    const mail = await sendMail({ to: email, subject: vorlage.betreff, html: vorlage.html });

    if (mail.ok) {
      return NextResponse.json({ ok: true, delivered: true });
    }
    if (mail.skipped) {
      console.warn("[konto] RESEND_API_KEY fehlt — Code nur geloggt:", { email });
      return NextResponse.json({ ok: true, delivered: false, demo: true, demoCode: code });
    }
    console.error("[konto] Codeversand fehlgeschlagen — 502.");
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  }

  if (aktion === "einloesen") {
    if (
      !rateLimit(`konto-einloesen:${ip}`, 10, 10 * 60_000) ||
      !rateLimit(`konto-einloesen:email:${clean(b.email, 200).toLowerCase()}`, 10, 10 * 60_000)
    ) {
      return NextResponse.json({ ok: false, error: "Zu viele Versuche — bitte in ein paar Minuten erneut probieren." }, { status: 429 });
    }
    const email = pruefeEmail(b.email);
    const code = clean(b.code, 6);
    if (!email || !/^\d{6}$/.test(code)) {
      return NextResponse.json({ ok: false, error: "Bitte den 6-stelligen Code eingeben." }, { status: 422 });
    }

    const konfiguriert = crmKonfiguriert();
    if (konfiguriert) {
      const konto = await kontoCodeEinloesen(email, code);
      if (!konto) {
        return NextResponse.json({ ok: false, error: "Der Code ist ungültig oder abgelaufen." }, { status: 401 });
      }
      await setzeKontoCookie(email);
      return NextResponse.json({ ok: true });
    }

    if (!demoKontoCodeGueltig(email, code)) {
      return NextResponse.json({ ok: false, error: "Der Code ist ungültig oder abgelaufen." }, { status: 401 });
    }
    await setzeKontoCookie(email);
    return NextResponse.json({ ok: true, demo: true });
  }

  if (aktion === "ticket") {
    const email = await leseKontoCookie();
    if (!email) {
      return NextResponse.json({ ok: false, error: "Bitte zuerst anmelden." }, { status: 401 });
    }
    if (!rateLimit(`konto-ticket:${email}`, 10, 10 * 60_000)) {
      return NextResponse.json({ ok: false, error: "Zu viele Versuche — bitte in ein paar Minuten erneut probieren." }, { status: 429 });
    }
    const titel = clean(b.titel, 200);
    const detail = clean(b.detail, 5000);
    if (titel.length < 3) {
      return NextResponse.json({ ok: false, error: "Bitte einen Titel mit mindestens 3 Zeichen angeben." }, { status: 422 });
    }

    await ticketAnlegen(email, titel, detail);
    return NextResponse.json({ ok: true, demo: !crmKonfiguriert() });
  }

  if (aktion === "ticket-antwort") {
    const email = await leseKontoCookie();
    if (!email) {
      return NextResponse.json({ ok: false, error: "Bitte zuerst anmelden." }, { status: 401 });
    }
    if (!rateLimit(`konto-ticket-antwort:${email}`, 30, 10 * 60_000)) {
      return NextResponse.json({ ok: false, error: "Zu viele Versuche — bitte in ein paar Minuten erneut probieren." }, { status: 429 });
    }
    const ticketId = Number(b.ticketId);
    const text = clean(b.text, 4000);
    if (!Number.isInteger(ticketId) || ticketId <= 0) {
      return NextResponse.json({ ok: false, error: "Ungültiges Ticket." }, { status: 422 });
    }
    if (!text) {
      return NextResponse.json({ ok: false, error: "Bitte eine Nachricht eingeben." }, { status: 422 });
    }

    const konfiguriert = crmKonfiguriert();
    if (konfiguriert) {
      const detail = await kontoDetail(email);
      const gehoertZumKonto = detail?.tickets.some((ti) => ti.id === ticketId) ?? false;
      if (!gehoertZumKonto) {
        return NextResponse.json({ ok: false, error: "Ticket nicht gefunden." }, { status: 404 });
      }
      await ticketAntwortAnlegen(ticketId, "kunde", text);
    }
    return NextResponse.json({ ok: true, demo: !konfiguriert });
  }

  if (aktion === "onboarding") {
    const email = await leseKontoCookie();
    if (!email) {
      return NextResponse.json({ ok: false, error: "Bitte zuerst anmelden." }, { status: 401 });
    }
    if (!rateLimit(`konto-onboarding:${email}`, 5, 10 * 60_000)) {
      return NextResponse.json({ ok: false, error: "Zu viele Versuche — bitte in ein paar Minuten erneut probieren." }, { status: 429 });
    }

    const rolle = clean(b.rolle, 60);
    const intent = Array.isArray(b.intent) ? b.intent.map((i) => clean(i, 80)).filter(Boolean).slice(0, 10) : [];
    const team = clean(b.team, 20);
    const stadt = clean(b.stadt, 100);
    const firma = clean(b.firma, 200);
    const name = clean(b.name, 200);

    // Fail-open (R3 — Intent-Onboarding): egal was hier schiefgeht, die
    // Registrierung selbst ist mit der Code-Einlösung bereits abgeschlossen.
    // kontoUpsert/kontoDatenSetzen/leadAnlegen liefern bei fehlender
    // Datenbank ohnehin still null/void statt zu werfen (src/lib/crm/db.ts).
    try {
      if (name || firma) {
        await kontoUpsert({ email, name, firma, projektStatus: "aufnahme" });
      }
      await kontoDatenSetzen(email, { rolle, intent, team, stadt });
      await leadAnlegen({
        quelle: "konto",
        name,
        email,
        firma,
        daten: { rolle, intent, team, stadt },
        score: TEAM_SCORE[team] ?? 0,
      });
    } catch (err) {
      console.warn("[konto] onboarding-Speicherung fehlgeschlagen — fail-open:", err);
    }

    return NextResponse.json({ ok: true });
  }

  if (aktion === "abmelden") {
    await loescheKontoCookie();
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, error: "Unbekannte Aktion." }, { status: 400 });
}

/**
 * R5 Leaf G7 (additiv): liefert den Antwort-Thread eines eigenen Tickets
 * für die Anzeige in KontoBereich.tsx (Chat-Blasen unter "Ihre Anliegen").
 * Rein additiv — der bestehende POST-Handler bleibt unverändert.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const ticketId = Number(url.searchParams.get("ticket"));

  if (!Number.isInteger(ticketId) || ticketId <= 0) {
    return NextResponse.json({ ok: false, error: "Ungültige Ticket-ID." }, { status: 400 });
  }

  const email = await leseKontoCookie();
  if (!email) {
    return NextResponse.json({ ok: false, error: "Bitte zuerst anmelden." }, { status: 401 });
  }
  if (!rateLimit(`konto-ticket-lesen:${email}`, 60, 10 * 60_000)) {
    return NextResponse.json({ ok: false, error: "Zu viele Anfragen — bitte kurz warten." }, { status: 429 });
  }

  if (!crmKonfiguriert()) {
    return NextResponse.json({ ok: true, antworten: [] });
  }

  const detail = await kontoDetail(email);
  const gehoertZumKonto = detail?.tickets.some((ti) => ti.id === ticketId) ?? false;
  if (!gehoertZumKonto) {
    return NextResponse.json({ ok: false, error: "Ticket nicht gefunden." }, { status: 404 });
  }

  const antworten = await ticketAntworten(ticketId);
  return NextResponse.json({ ok: true, antworten });
}
