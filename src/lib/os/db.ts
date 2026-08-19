import {
  LEERER_SNAPSHOT,
  type Reel,
  type Skript,
  type Snapshot,
} from "./typen";

/**
 * Datenzugriff des Branding-OS — identisches Muster wie die Text-Verwaltung:
 * anon-Key plus CONTENT_WRITE_SECRET gegen SECURITY-DEFINER-Funktionen.
 * Die Tabellen selbst sind für anon gesperrt, das Secret verlässt den
 * Server nie. Ohne Env-Variablen liefert alles leer statt zu krachen.
 */

function config() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  const secret = process.env.CONTENT_WRITE_SECRET;
  return url && key && secret ? { url, key, secret } : null;
}

export function osKonfiguriert(): boolean {
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
    if (!res.ok) {
      console.error(`[os] ${fn} fehlgeschlagen: ${res.status} ${await res.text()}`);
      return null;
    }
    const text = await res.text();
    return text ? (JSON.parse(text) as T) : (null as T);
  } catch (e) {
    console.error(`[os] ${fn} Exception:`, e);
    return null;
  }
}

/** Alles, was das Dashboard braucht — ein Aufruf. */
export async function ladeSnapshot(): Promise<Snapshot> {
  const daten = await rpc<Snapshot>("os_snapshot", {});
  return daten ?? LEERER_SNAPSHOT;
}

export type ReelUpsert = {
  plattform: Reel["plattform"];
  extern_id: string;
  veroeffentlicht_am: string;
  titel?: string | null;
  permalink?: string | null;
  laenge_sek?: number | null;
  views?: number;
  reichweite?: number;
  avg_watchtime_sek?: number | null;
  watchtime_prozent?: number | null;
  saves?: number;
  shares?: number;
  kommentare?: number;
  likes?: number;
  profilbesuche?: number;
  follows?: number;
};

export async function speichereReel(daten: ReelUpsert): Promise<string | null> {
  return rpc<string>("os_upsert_reel", { p_daten: daten });
}

export async function ordneReelZu(
  id: string,
  felder: Partial<Pick<Reel, "saeule" | "hook_typ" | "skript_id" | "laenge_sek">>,
): Promise<boolean> {
  return (await rpc("os_reel_zuordnen", { p_id: id, p_felder: felder })) !== null;
}

export async function speichereTagesstand(daten: {
  datum: string;
  plattform: Reel["plattform"];
  follower?: number;
  profilbesuche?: number;
  reichweite?: number;
}): Promise<boolean> {
  return (await rpc("os_set_tagesstand", { p_daten: daten })) !== null;
}

export type SkriptNeu = Pick<
  Skript,
  | "batch"
  | "nummer"
  | "titel"
  | "saeule"
  | "hook_interrupt"
  | "hook_kontra"
  | "hook_zahl"
  | "body"
  | "loop_ende"
  | "regie"
  | "laenge_sek"
>;

export async function legeSkripteAn(skripte: SkriptNeu[]): Promise<number> {
  return (await rpc<number>("os_skripte_anlegen", { p_daten: skripte })) ?? 0;
}

export async function aendereSkript(
  id: string,
  felder: Partial<Pick<Skript, "status" | "hook_gewaehlt" | "geplant_fuer" | "audio_url">>,
): Promise<boolean> {
  return (await rpc("os_skript_aendern", { p_id: id, p_felder: felder })) !== null;
}

export async function protokolliere(
  quelle: string,
  ok: boolean,
  anzahl: number,
  detail: string,
): Promise<void> {
  await rpc("os_log", {
    p_quelle: quelle,
    p_ok: ok,
    p_anzahl: anzahl,
    p_detail: detail.slice(0, 500),
  });
}
