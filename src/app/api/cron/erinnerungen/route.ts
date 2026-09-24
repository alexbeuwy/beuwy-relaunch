import { NextRequest, NextResponse } from "next/server";
import { safeEqual } from "@/lib/studio-auth";
import { leadsListe, leadDetail, mailLoggen, type BwLead } from "@/lib/crm/db";
import { sendMail } from "@/lib/email";
import { mailTerminErinnerung } from "@/lib/email-vorlagen";

/**
 * /api/cron/erinnerungen — Termin-Erinnerungen für Booking-Leads (R5 Leaf
 * G6). Macht die in docs/redesign/R5-FUNKTIONEN.md als Befund notierte
 * Lücke real: die Erinnerungs-Vorlage mailTerminErinnerung() existiert seit
 * R3 in src/lib/email-vorlagen.ts, wurde aber bislang von KEINEM Cron
 * jemals ausgelöst — /api/booking/route.ts verschickt nur die sofortige
 * mailTerminBestaetigung, keine Erinnerung vor dem Termin.
 *
 * GET, geschützt über denselben Header-Vergleich wie die bestehenden
 * os-Crons und src/app/api/cron/flows/route.ts (Leaf G4): Bearer-Token
 * gegen CRON_SECRET (eigenes Secret, nicht OS_CRON_SECRET) ODER der von
 * Vercel-Cron selbst gesetzte x-vercel-cron-Header. Vercel-Cron ruft
 * ausschließlich mit GET.
 *
 * EMPFOHLENER CRON-PFAD (vercel.json fasst dieses Leaf nicht an — trägt
 * der Orchestrator nach, siehe Antwort):
 *   GET /api/cron/erinnerungen, täglich einmal (z. B. "0 7 * * *" — 07:00
 *   UTC / 08:00 bzw. 09:00 Europe/Berlin, vor dem üblichen Arbeitstag).
 *   Ein Tages-Lauf reicht, weil "Termin morgen" sich innerhalb eines Tages
 *   nicht mehr ändert.
 *
 * DATENQUELLE: leadsListe() (src/lib/crm/db.ts, RPC bw_leads_liste) liefert
 * ALLE Leads — gefiltert wird hier in JS auf quelle==="booking", exakt wie
 * die anderen /intern-Ansichten es mit dieser Liste tun (siehe
 * R5-PORTGUT.md: JS-Aggregation statt eigener SQL-View ist im Projekt
 * etabliertes Muster für Datenmengen, die eine RPC-Antwort noch trägt).
 *
 * FELD-VERTRAG (verifiziert in /api/booking/route.ts, Zeile "daten: {
 * type, mode, duration, date, time }"): das Termin-Datum liegt unter
 * bw_lead.daten.date (NICHT "datum"), die Uhrzeit unter daten.time (NICHT
 * "uhrzeit") — beide bereits als "YYYY-MM-DD" bzw. "HH:MM" validiert
 * (src/lib/validierung.ts::terminSchema, Europe/Berlin). "morgen" wird
 * deshalb ebenfalls als Europe/Berlin-Datum berechnet (Intl.DateTimeFormat
 * mit timeZone, dieselbe Technik wie die private heuteBerlinISO()-Hilfe in
 * validierung.ts — dort nicht exportiert, deshalb hier lokal nachgebaut),
 * damit "morgen" für Alex' Terminkalender und für diesen Cron dasselbe
 * Kalenderdatum meint, unabhängig von der UTC-Serverzeit des Cron-Runs.
 *
 * DOPPELVERSAND-SCHUTZ (Auftrag): vor dem Senden wird über leadDetail(id)
 * das Mail-Log des Leads gelesen. Existiert dort bereits ein Eintrag mit
 * vorlage==="terminErinnerung", wird für diesen Lead NICHT erneut
 * versendet — auch dann nicht, wenn der letzte Versand als "fehler"
 * geloggt war (bewusst: ein fehlgeschlagener Sendeversuch soll nicht bei
 * jedem täglichen Cron-Lauf erneut anlaufen und den Kunden im Erfolgsfall
 * doppelt erreichen, falls der Log-Eintrag zwar geschrieben, der Grund des
 * Fehlers aber transient war; ein Re-Versand ist damit bewusst ein
 * manueller Schritt, kein automatischer Retry). "terminErinnerung" ist
 * exakt der vorlage-String, den auch mailLoggen() für diesen Versand
 * schreibt — beide Stellen müssen den String identisch verwenden, siehe
 * VORLAGE_ERINNERUNG unten als einzige Quelle dafür.
 *
 * Jeder Lead läuft in einem eigenen try/catch — ein einzelner Fehler
 * (fehlende Felder, sendMail-Ausfall, RPC-Fehler) bricht nie den Batch ab
 * (Muster: src/app/api/cron/flows/route.ts::lauf()).
 */

export const runtime = "nodejs";
export const maxDuration = 60;

/** Einzige Quelle für den vorlage-String — Doppelversand-Prüfung und
 *  mailLoggen() müssen ihn identisch verwenden. */
const VORLAGE_ERINNERUNG = "terminErinnerung";

function darfAutomatikErinnerungen(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const kopf = req.headers.get("authorization") || "";
    const wert = kopf.startsWith("Bearer ") ? kopf.slice(7) : "";
    if (wert && safeEqual(wert, secret)) return true;
  }
  /* Vercel-Cron meldet sich mit eigenem Header statt Bearer-Token —
     gleiches Muster wie darfAutomatik() in src/lib/os/zugang.ts und
     darfAutomatikFlows() in src/app/api/cron/flows/route.ts. */
  return Boolean(req.headers.get("x-vercel-cron"));
}

/** Datum in n Tagen (ab Europe/Berlin-heute) als YYYY-MM-DD, tagesgenau —
 *  dieselbe Technik wie die private berlinDatumInNTagen()-Hilfe in
 *  src/lib/validierung.ts (dort nicht exportiert, hier lokal nachgebaut). */
function berlinDatumInNTagen(n: number): string {
  const heuteBerlin = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(new Date());
  const tag = new Date(`${heuteBerlin}T00:00:00Z`);
  tag.setUTCDate(tag.getUTCDate() + n);
  return tag.toISOString().slice(0, 10);
}

function vorname(name: string): string {
  const trimmed = String(name ?? "").trim();
  return trimmed.split(/\s+/)[0] || trimmed;
}

type ErinnerungsErgebnis = { versendet: number; uebersprungen: number; fehlerhaft: number; gesamt: number };

async function bereitsErinnert(leadId: string): Promise<boolean> {
  const detail = await leadDetail(leadId);
  if (!detail) return false;
  return detail.mails.some((m) => m.vorlage === VORLAGE_ERINNERUNG);
}

async function verarbeiteLead(lead: BwLead, morgen: string): Promise<"versendet" | "uebersprungen"> {
  const bereits = await bereitsErinnert(lead.id);
  if (bereits) return "uebersprungen";

  const datum = String((lead.daten as Record<string, unknown>).date ?? "");
  const uhrzeit = String((lead.daten as Record<string, unknown>).time ?? "");
  const name = vorname(lead.name) || lead.name;

  const vorlage = mailTerminErinnerung(name, datum || morgen, uhrzeit);
  const versand = await sendMail({ subject: vorlage.betreff, html: vorlage.html, to: lead.email });

  await mailLoggen({
    leadId: lead.id,
    vorlage: VORLAGE_ERINNERUNG,
    betreff: vorlage.betreff,
    empfaenger: lead.email,
    status: versand.ok ? "gesendet" : versand.skipped ? "demo" : "fehler",
  });

  return "versendet";
}

async function lauf(): Promise<ErinnerungsErgebnis> {
  const morgen = berlinDatumInNTagen(1);
  const alle = await leadsListe();

  const faellig = alle.filter((lead) => {
    if (lead.quelle !== "booking") return false;
    if (!lead.email) return false;
    const daten = lead.daten as Record<string, unknown>;
    return String(daten.date ?? "") === morgen;
  });

  let versendet = 0;
  let uebersprungen = 0;
  let fehlerhaft = 0;

  for (const lead of faellig) {
    try {
      const ergebnis = await verarbeiteLead(lead, morgen);
      if (ergebnis === "versendet") versendet += 1;
      else uebersprungen += 1;
    } catch (e) {
      fehlerhaft += 1;
      console.error("[cron/erinnerungen] Lead fehlgeschlagen:", lead.id, e);
    }
  }

  return { versendet, uebersprungen, fehlerhaft, gesamt: faellig.length };
}

export async function POST(req: NextRequest) {
  if (!darfAutomatikErinnerungen(req)) {
    return NextResponse.json({ ok: false, error: "Nicht berechtigt" }, { status: 401 });
  }
  const ergebnis = await lauf();
  return NextResponse.json({ ok: true, ...ergebnis });
}

/* Vercel-Cron ruft mit GET. */
export async function GET(req: NextRequest) {
  return POST(req);
}
