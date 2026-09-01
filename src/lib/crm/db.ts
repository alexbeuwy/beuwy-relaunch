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

export async function kontoDatenSetzen(email: string, daten: Record<string, unknown>): Promise<void> {
  await rpc("bw_konto_daten_setzen", { p_email: email, p_daten: daten });
}

export async function ticketAnlegen(email: string, titel: string, detail = ""): Promise<void> {
  await rpc("bw_ticket_anlegen", { p_email: email, p_titel: titel, p_detail: detail });
}

export async function ticketStatusSetzen(id: number, status: string): Promise<void> {
  await rpc("bw_ticket_status_setzen", { p_id: id, p_status: status });
}


/* ── R5: Kontakte, Deals, Aufgaben, Tageskommando ─────────────────── */

export type BwKontakt = {
  id: string; erstellt: string; email: string; name: string;
  telefon: string; firma: string; rolle: string; notiz: string;
};

export type BwDeal = {
  id: string; erstellt: string; kontakt_id: string | null; lead_id: string | null;
  titel: string; wert_eur: number; status: string; verlust_grund: string; erwartet: string | null;
};

export async function kontaktUpsert(k: { email: string; name?: string; telefon?: string; firma?: string; rolle?: string }): Promise<string | null> {
  return rpc<string>("bw_kontakt_upsert", { p_email: k.email, p_name: k.name ?? "", p_telefon: k.telefon ?? "", p_firma: k.firma ?? "", p_rolle: k.rolle ?? "" });
}

export async function kontakteListe(): Promise<BwKontakt[]> {
  return (await rpc<BwKontakt[]>("bw_kontakte_liste", {})) ?? [];
}

export async function kontakt360(id: string): Promise<Record<string, unknown> | null> {
  return rpc("bw_kontakt_360", { p_id: id });
}

export async function dealSpeichern(d: { id?: string | null; kontaktId?: string | null; leadId?: string | null; titel: string; wert?: number; status?: string; verlustGrund?: string; erwartet?: string | null }): Promise<string | null> {
  return rpc<string>("bw_deal_speichern", { p_id: d.id ?? null, p_kontakt: d.kontaktId ?? null, p_lead: d.leadId ?? null, p_titel: d.titel, p_wert: d.wert ?? 0, p_status: d.status ?? null, p_verlust: d.verlustGrund ?? null, p_erwartet: d.erwartet ?? null });
}

export async function dealsListe(): Promise<BwDeal[]> {
  return (await rpc<BwDeal[]>("bw_deals_liste", {})) ?? [];
}

export async function aufgabeSpeichern(a: { id?: number | null; titel?: string; faellig?: string | null; erledigt?: boolean; kontaktId?: string | null; dealId?: string | null }): Promise<void> {
  await rpc("bw_aufgabe_speichern", { p_id: a.id ?? null, p_titel: a.titel ?? null, p_faellig: a.faellig ?? null, p_erledigt: a.erledigt ?? null, p_kontakt: a.kontaktId ?? null, p_deal: a.dealId ?? null });
}

export async function tageskommando(): Promise<Record<string, unknown> | null> {
  return rpc("bw_tageskommando", {});
}

/* ── R5: Tickets-Threads ──────────────────────────────────────────── */

export async function ticketAntworten(ticketId: number): Promise<Array<{ id: number; erstellt: string; von: string; text: string }>> {
  return ((await rpc("bw_ticket_antworten", { p_ticket: ticketId })) as Array<{ id: number; erstellt: string; von: string; text: string }> | null) ?? [];
}

export async function ticketAntwortAnlegen(ticketId: number, von: "beuwy" | "kunde", text: string): Promise<void> {
  await rpc("bw_ticket_antworten_anlegen", { p_ticket: ticketId, p_von: von, p_text: text });
}

/* ── R5: Einblick-Tracking ────────────────────────────────────────── */

export async function trackAnlegen(events: Array<Record<string, unknown>>): Promise<void> {
  await rpc("bw_track_anlegen", { p_events: events });
}

export async function trackAuswertung(von: string, bis: string): Promise<Record<string, unknown> | null> {
  return rpc("bw_track_auswertung", { p_von: von, p_bis: bis });
}

export async function trackHeatmap(pfad: string, geraet: string | null, von: string): Promise<Array<{ x: number; y: number; n: number }>> {
  return ((await rpc("bw_track_heatmap", { p_pfad: pfad, p_geraet: geraet, p_von: von })) as Array<{ x: number; y: number; n: number }> | null) ?? [];
}

/* ── R5: E-Mail-Flows ─────────────────────────────────────────────── */

export async function flowSpeichern(f: { id?: string | null; name: string; status?: string; ausloeser?: string; schritte: Array<{ typ: string; konfig: Record<string, unknown> }> }): Promise<string | null> {
  return rpc<string>("bw_flow_speichern", { p_id: f.id ?? null, p_name: f.name, p_status: f.status ?? null, p_ausloeser: f.ausloeser ?? null, p_schritte: f.schritte });
}

export async function flowsListe(): Promise<Array<Record<string, unknown>>> {
  return ((await rpc("bw_flows_liste", {})) as Array<Record<string, unknown>> | null) ?? [];
}

export async function flowStarten(flowId: string, leadId: string | null, email: string): Promise<void> {
  await rpc("bw_flow_starten", { p_flow: flowId, p_lead: leadId, p_email: email });
}

export async function flowFaellige(): Promise<Array<Record<string, unknown>>> {
  return ((await rpc("bw_flow_faellige", {})) as Array<Record<string, unknown>> | null) ?? [];
}

export async function flowFortschreiben(laufId: number, position: number, status: string | null, naechste: string | null): Promise<void> {
  await rpc("bw_flow_fortschreiben", { p_lauf: laufId, p_position: position, p_status: status, p_naechste: naechste });
}

export async function abmelden(email: string): Promise<void> {
  await rpc("bw_abmelden", { p_email: email });
}
