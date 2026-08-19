/**
 * Typen des Personal-Branding-OS. Spiegeln 1:1 die Supabase-Tabellen
 * os_reel / os_tagesstand / os_skript / os_ingest_log
 * (Schema: supabase/os-schema.sql, Regeln: docs/branding/).
 */

export type Saeule = "a" | "b" | "c";
export type HookTyp = "interrupt" | "kontra" | "zahl";
export type Plattform = "instagram" | "tiktok";
export type SkriptStatus =
  | "idee"
  | "skript"
  | "gedreht"
  | "geplant"
  | "gepostet"
  | "verworfen";

export const SAEULEN: Record<Saeule, string> = {
  a: "Selbstständigkeit",
  b: "AI/Claude",
  c: "Webseiten",
};

export const HOOKS: Record<HookTyp, string> = {
  interrupt: "Pattern-Interrupt",
  kontra: "Kontra-These",
  zahl: "Konkrete Zahl",
};

export type Reel = {
  id: string;
  plattform: Plattform;
  extern_id: string;
  veroeffentlicht_am: string;
  titel: string | null;
  permalink: string | null;
  skript_id: string | null;
  saeule: Saeule | null;
  hook_typ: HookTyp | null;
  laenge_sek: number | null;
  views: number;
  reichweite: number;
  avg_watchtime_sek: number | null;
  watchtime_prozent: number | null;
  saves: number;
  shares: number;
  kommentare: number;
  likes: number;
  profilbesuche: number;
  follows: number;
  aktualisiert_am: string;
};

export type Tagesstand = {
  datum: string;
  plattform: Plattform;
  follower: number;
  profilbesuche: number;
  reichweite: number;
};

export type Skript = {
  id: string;
  batch: string | null;
  nummer: number | null;
  titel: string;
  saeule: Saeule | null;
  hook_interrupt: string | null;
  hook_kontra: string | null;
  hook_zahl: string | null;
  hook_gewaehlt: HookTyp | null;
  body: string | null;
  loop_ende: string | null;
  regie: string | null;
  laenge_sek: number | null;
  status: SkriptStatus;
  geplant_fuer: string | null;
  audio_url: string | null;
  quelle: string | null;
  erstellt_am: string;
  aktualisiert_am: string;
};

export type IngestLog = {
  id: number;
  quelle: string;
  ok: boolean;
  anzahl: number;
  detail: string | null;
  zeit: string;
};

export type Snapshot = {
  reels: Reel[];
  tage: Tagesstand[];
  skripte: Skript[];
  log: IngestLog[];
};

export const LEERER_SNAPSHOT: Snapshot = {
  reels: [],
  tage: [],
  skripte: [],
  log: [],
};
