import { NextRequest, NextResponse } from "next/server";
import { safeEqual } from "@/lib/studio-auth";
import { flowFaellige, flowFortschreiben, mailLoggen } from "@/lib/crm/db";
import { sendMail, emailLayout } from "@/lib/email";
import {
  mailFunnelBestaetigung,
  mailTerminBestaetigung,
  mailTerminErinnerung,
  mailNachfass,
  mailToolErgebnis,
  mailKontoCode,
} from "@/lib/email-vorlagen";

/**
 * /api/cron/flows — die Versand-Engine für /intern/flows (R5 Leaf G4).
 * GET, geschützt über denselben Header-Vergleich wie die bestehenden
 * os-Crons (src/lib/os/zugang.ts::darfAutomatik): Bearer-Token gegen
 * CRON_SECRET (eigenes Secret, nicht OS_CRON_SECRET — die Flow-Engine ist
 * ein eigenständiger Cron-Pfad) ODER der von Vercel-Cron selbst gesetzte
 * x-vercel-cron-Header. Vercel-Cron ruft ausschließlich mit GET; ein
 * manueller Auslöser aus /intern (falls später gebaut) kann denselben
 * Bearer-Header per POST schicken.
 *
 * RPC-KONTRAKT von bw_flow_faellige() (src/lib/crm/db.ts::flowFaellige,
 * bislang ohne SQL-Migration im Repo — dieses Leaf legt die erwarteten
 * Zeilen-Schlüssel fest, damit die Migration sie treffen kann). Jede
 * Zeile beschreibt GENAU EINEN fälligen Lauf, dessen aktueller Schritt
 * ein MAIL-Schritt ist — Bedingungs- und Warten-Schritte hat die RPC
 * bereits selbst aufgelöst, bevor sie eine Zeile zurückgibt (so beschreibt
 * es der Auftrag: "Schritt mail" ist die einzige Form, die hier ankommt):
 *
 *   {
 *     id: number,                 // bw_flow_lauf.id, für flowFortschreiben
 *     flow_id: string,
 *     lead_id: string | null,
 *     email: string,
 *     name: string,
 *     position: number,           // Index des jetzt fälligen Mail-Schritts
 *     schritt: { typ: "mail", konfig: {...} },   // der fällige Schritt
 *     naechster: { typ: string, konfig: {...} } | null,  // was danach kommt, null = Flow-Ende
 *   }
 *
 * "schritt"/"naechster" haben exakt die {typ, konfig}-Form aus
 * flowSpeichern() — der Editor (FlowEditor.tsx) erzeugt keine anderen
 * Formen. Fehlt "naechster" oder ist sein Typ nicht "warten", gilt der
 * Lauf als beendet (status "fertig") — das deckt sowohl echtes Flow-Ende
 * als auch den Sonderfall ab, dass "naechster" wider Erwarten kein
 * bereits aufgelöster Schritt ist: lieber sauber beenden als raten.
 *
 * VORLAGEN: dieselben sechs Exporte wie in FlowEditor.tsx (Kontrakt dort
 * ausführlich erklärt). Beim echten Versand ist nur der Name des
 * Kontakts sicher bekannt — die übrigen Pflichtparameter der fünf
 * Vorlagen jenseits von mailNachfass (Wunsch/Termin/Tool/Code) bleiben
 * leer, bis eine künftige Erweiterung sie aus bw_lead.daten/bw_kontakt.daten
 * zieht. Bewusste, dokumentierte Einschränkung dieses Leafs, keine
 * versehentliche Lücke.
 *
 * Jeder Lauf läuft in einem eigenen try/catch — ein einzelner Fehler
 * (fehlende Felder, sendMail-Ausfall, RPC-Fehler) bricht nie den Batch ab.
 */

export const runtime = "nodejs";
export const maxDuration = 60;

const VORLAGE_DEMO = {
  name: "",
  wunsch: "",
  datum: "",
  uhrzeit: "",
  tool: "",
  ergebnisZeilen: [] as Array<{ label: string; value: string }>,
  code: "",
};

type SchrittRef = { typ: string; konfig: Record<string, unknown> } | null;

type FaelligerLauf = {
  laufId: number;
  flowId: string;
  leadId: string | null;
  email: string;
  name: string;
  position: number;
  schritt: SchrittRef;
  naechster: SchrittRef;
};

function darfAutomatikFlows(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const kopf = req.headers.get("authorization") || "";
    const wert = kopf.startsWith("Bearer ") ? kopf.slice(7) : "";
    if (wert && safeEqual(wert, secret)) return true;
  }
  /* Vercel-Cron meldet sich mit eigenem Header statt Bearer-Token —
     gleiches Muster wie darfAutomatik() in src/lib/os/zugang.ts. */
  return Boolean(req.headers.get("x-vercel-cron"));
}

function zuSchrittRef(v: unknown): SchrittRef {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  if (typeof o.typ !== "string") return null;
  const konfig = o.konfig && typeof o.konfig === "object" ? (o.konfig as Record<string, unknown>) : {};
  return { typ: o.typ, konfig };
}

function zuFaelligerLauf(raw: Record<string, unknown>): FaelligerLauf | null {
  const laufId = Number(raw.id);
  const email = String(raw.email ?? "").trim();
  if (!Number.isFinite(laufId) || !email) return null;
  return {
    laufId,
    flowId: typeof raw.flow_id === "string" ? raw.flow_id : "",
    leadId: typeof raw.lead_id === "string" ? raw.lead_id : null,
    email,
    name: typeof raw.name === "string" ? raw.name : "",
    position: Number.isFinite(Number(raw.position)) ? Number(raw.position) : 0,
    schritt: zuSchrittRef(raw.schritt),
    naechster: zuSchrittRef(raw.naechster),
  };
}

function vorname(name: string): string {
  const trimmed = name.trim();
  return trimmed.split(/\s+/)[0] || trimmed;
}

function renderVorlage(vorlageId: string, name: string): { betreff: string; html: string } | null {
  const n = vorname(name) || VORLAGE_DEMO.name;
  switch (vorlageId) {
    case "funnel_bestaetigung":
      return mailFunnelBestaetigung(n, VORLAGE_DEMO.wunsch);
    case "termin_bestaetigung":
      return mailTerminBestaetigung(n, VORLAGE_DEMO.datum, VORLAGE_DEMO.uhrzeit);
    case "termin_erinnerung":
      return mailTerminErinnerung(n, VORLAGE_DEMO.datum, VORLAGE_DEMO.uhrzeit);
    case "nachfass":
      return mailNachfass(n);
    case "tool_ergebnis":
      return mailToolErgebnis(n, VORLAGE_DEMO.tool, VORLAGE_DEMO.ergebnisZeilen);
    case "konto_code":
      return mailKontoCode(VORLAGE_DEMO.code);
    default:
      return null;
  }
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Freitext-Schritt → emailLayout, exakt dieselbe Logik wie die
 *  Vorschau in FlowEditor.tsx (renderFreitextVorschau), damit ankommt,
 *  was der Editor gezeigt hat. */
function renderFreitext(betreff: string, text: string): { betreff: string; html: string } {
  const absaetze = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => esc(p).replace(/\n/g, "<br/>"));
  const [intro, ...rest] = absaetze;
  const bodyHtml = rest
    .map((p) => `<p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#141414;">${p}</p>`)
    .join("");
  return { betreff, html: emailLayout({ heading: betreff || "…", intro: intro || "", bodyHtml }) };
}

/** Abmelde-Pflicht (R5-FUNKTIONEN.md Modul 4): jede Flow-Mail trägt einen
 *  Ein-Klick-Abmelde-Link. emailLayout() selbst kennt keinen Fußzeilen-
 *  Slot dafür (gemeinsame Hülle, hier nicht anfassbar) — die Zeile wird
 *  deshalb in die bestehende Adresszeile eingehängt. Findet sich der
 *  bekannte Marker aus emailLayout() nicht mehr (Vorlage geändert), hängt
 *  ein sichtbarer Fallback vor </body> — die Pflicht gilt unbedingt,
 *  lieber unschön sichtbar als lautlos fehlend. */
function mitAbmeldeFusszeile(html: string, email: string): string {
  const token = Buffer.from(email, "utf8").toString("base64url");
  const link = `https://beuwy.com/abmelden?e=${encodeURIComponent(token)}`;
  const zeile = `<p style="margin:8px 0 0;font-size:11.5px;color:#8A8068;">Automatischer Flow · <a href="${link}" style="color:#8A8068;">keine automatischen E-Mails mehr</a></p>`;
  const marker = "ap@beuwy.com</p>";
  if (html.includes(marker)) return html.replace(marker, `${marker}${zeile}`);
  return html.replace("</body>", `<div style="padding:16px 32px;font-size:11.5px;color:#8A8068;">${zeile}</div></body>`);
}

function stundenSpaeter(stunden: number): string {
  return new Date(Date.now() + Math.max(0, stunden) * 3_600_000).toISOString();
}

async function verarbeiteLauf(lauf: FaelligerLauf): Promise<void> {
  if (lauf.schritt && lauf.schritt.typ === "mail") {
    const konfig = lauf.schritt.konfig;
    const modus = String(konfig.modus ?? "");
    let gerendert: { betreff: string; html: string } | null = null;
    let vorlageLabel = "frei";

    if (modus === "vorlage") {
      const vorlageId = String(konfig.vorlageId ?? "");
      gerendert = renderVorlage(vorlageId, lauf.name);
      vorlageLabel = vorlageId || "vorlage";
    } else if (modus === "frei") {
      const betreff = String(konfig.betreff ?? "");
      const text = String(konfig.text ?? "");
      if (betreff && text) gerendert = renderFreitext(betreff, text);
    }

    if (gerendert) {
      const html = mitAbmeldeFusszeile(gerendert.html, lauf.email);
      const versand = await sendMail({ subject: gerendert.betreff, html, to: lauf.email });
      await mailLoggen({
        leadId: lauf.leadId,
        vorlage: vorlageLabel,
        betreff: gerendert.betreff,
        empfaenger: lauf.email,
        status: versand.ok ? "gesendet" : versand.skipped ? "demo" : "fehler",
      });
    }
  }

  /* ── Position fortschreiben: warten → naechste_aktion setzen, sonst Ende. ── */
  const naechstePosition = lauf.position + 1;
  if (lauf.naechster && lauf.naechster.typ === "warten") {
    const stunden = Number(lauf.naechster.konfig.stunden);
    const naechsteAktion = stundenSpaeter(Number.isFinite(stunden) && stunden > 0 ? stunden : 24);
    await flowFortschreiben(lauf.laufId, naechstePosition, null, naechsteAktion);
    return;
  }

  if (lauf.naechster) {
    /* Unerwarteter, nicht vorab aufgelöster Folge-Schritt (z. B. eine
       weitere Mail direkt im Anschluss) — sofort wieder fällig stellen,
       statt hier selbst Logik nachzubilden, die eigentlich Sache der RPC
       ist (siehe Kontrakt-Kommentar oben). */
    await flowFortschreiben(lauf.laufId, naechstePosition, null, null);
    return;
  }

  await flowFortschreiben(lauf.laufId, naechstePosition, "fertig", null);
}

async function lauf() {
  const faellige = await flowFaellige();
  let gesendet = 0;
  let fehlerhaft = 0;

  for (const roh of faellige) {
    const parsed = zuFaelligerLauf(roh);
    if (!parsed) {
      fehlerhaft += 1;
      continue;
    }
    try {
      await verarbeiteLauf(parsed);
      gesendet += 1;
    } catch (e) {
      fehlerhaft += 1;
      console.error("[cron/flows] Lauf fehlgeschlagen:", parsed.laufId, e);
    }
  }

  return { verarbeitet: gesendet, fehler: fehlerhaft, gesamt: faellige.length };
}

export async function POST(req: NextRequest) {
  if (!darfAutomatikFlows(req)) {
    return NextResponse.json({ ok: false, error: "Nicht berechtigt" }, { status: 401 });
  }
  const ergebnis = await lauf();
  return NextResponse.json({ ok: true, ...ergebnis });
}

/* Vercel-Cron ruft mit GET. */
export async function GET(req: NextRequest) {
  return POST(req);
}
