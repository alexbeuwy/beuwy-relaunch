/**
 * CRM-Datenzugriff (R3) — Präfix bw_ im Projekt „beuwy Funnels".
 * Identisches Muster wie src/lib/os/db.ts: anon-Key + CONTENT_WRITE_SECRET
 * gegen SECURITY-DEFINER-RPCs (Migration r3_crm_bw_rpcs; Spiegel im Repo:
 * supabase/crm-schema.sql). Tabellen sind für anon gesperrt, das Secret
 * verlässt den Server nie. Ohne Env liefert alles null/[] statt zu werfen —
 * die UI kennzeichnet den Demo-Modus ehrlich.
 */

export type BwLead = {
  id: string;
  erstellt: string;
  quelle: string;
  status: string;
  name: string;
  email: string;
  telefon: string;
  firma: string;
  nachricht: string;
  daten: Record<string, unknown>;
  score: number;
};

export type BwLeadDetail = {
  lead: BwLead;
  events: Array<{ erstellt: string; typ: string; detail: string }>;
  notizen: Array<{ id: number; erstellt: string; autor: string; text: string }>;
  mails: Array<{ erstellt: string; vorlage: string; betreff: string; empfaenger: string; status: string }>;
};

export type BwKonto = {
  id: string;
  erstellt: string;
  email: string;
  name: string;
  firma: string;
  projekt_status: string;
};

export type BwKontoDetail = {
  konto: BwKonto;
  tickets: Array<{ id: number; erstellt: string; titel: string; status: string; detail: string }>;
};

function config() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  const secret = process.env.CONTENT_WRITE_SECRET;
  return url && key && secret ? { url, key, secret } : null;
}

export function crmKonfiguriert(): boolean {
  return config() !== null;
}

async function rpc<T>(fn: string, body: Record<string, unknown>): Promise<T | null> {
  const c = config();
  if (!c) return null;
  try {
    const res = await fetch(`${c.url}/rest/v1/rpc/${fn}`, {
      method: "POST",
      headers: {
        apikey: c.key,
        Authorization: `Bearer ${c.key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...body, p_secret: c.secret }),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const text = await res.text();
    return text ? (JSON.parse(text) as T) : (null as T | null);
  } catch {
    return null;
  }
}

export async function leadAnlegen(l: {
  quelle: string;
  name: string;
  email: string;
  telefon?: string;
  firma?: string;
  nachricht?: string;
  daten?: Record<string, unknown>;
  score?: number;
}): Promise<string | null> {
  return rpc<string>("bw_lead_anlegen", {
    p_quelle: l.quelle,
    p_name: l.name,
    p_email: l.email,
    p_telefon: l.telefon ?? "",
    p_firma: l.firma ?? "",
    p_nachricht: l.nachricht ?? "",
    p_daten: l.daten ?? {},
    p_score: l.score ?? 0,
  });
}

export async function leadsListe(): Promise<BwLead[]> {
  return (await rpc<BwLead[]>("bw_leads_liste", {})) ?? [];
}

export async function leadDetail(id: string): Promise<BwLeadDetail | null> {
  return rpc<BwLeadDetail>("bw_lead_detail", { p_id: id });
}

export async function leadStatusSetzen(id: string, status: string): Promise<void> {
  await rpc("bw_lead_status_setzen", { p_id: id, p_status: status });
}

export async function leadNotizAnlegen(id: string, text: string, autor = "alex"): Promise<void> {
  await rpc("bw_lead_notiz_anlegen", { p_id: id, p_text: text, p_autor: autor });
}

export async function mailLoggen(m: {
  leadId?: string | null;
  vorlage: string;
  betreff: string;
  empfaenger: string;
  status: "gesendet" | "demo" | "fehler";
}): Promise<void> {
  await rpc("bw_mail_loggen", {
    p_lead_id: m.leadId ?? null,
    p_vorlage: m.vorlage,
    p_betreff: m.betreff,
    p_empfaenger: m.empfaenger,
    p_status: m.status,
  });
}

export async function kontoCodeAnlegen(email: string, code: string, minuten = 15): Promise<void> {
  await rpc("bw_konto_code_anlegen", { p_email: email, p_code: code, p_minuten: minuten });
}

export async function kontoCodeEinloesen(email: string, code: string): Promise<BwKonto | null> {
  return rpc<BwKonto>("bw_konto_code_einloesen", { p_email: email, p_code: code });
}

export async function kontoDetail(email: string): Promise<BwKontoDetail | null> {
  return rpc<BwKontoDetail>("bw_konto_detail", { p_email: email });
}

export async function kontoUpsert(k: { email: string; name?: string; firma?: string; projektStatus?: string }): Promise<void> {
  await rpc("bw_konto_upsert", {
    p_email: k.email,
    p_name: k.name ?? "",
    p_firma: k.firma ?? "",
    p_projekt_status: k.projektStatus ?? "aufnahme",
  });
}

export async function ticketAnlegen(email: string, titel: string, detail = ""): Promise<void> {
  await rpc("bw_ticket_anlegen", { p_email: email, p_titel: titel, p_detail: detail });
}

export async function ticketStatusSetzen(id: number, status: string): Promise<void> {
  await rpc("bw_ticket_status_setzen", { p_id: id, p_status: status });
}
