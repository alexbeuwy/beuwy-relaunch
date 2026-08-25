-- ============================================================
-- Personal-Branding-OS (Antigravity-Protokoll, docs/branding/)
-- Angewendet am 2026-08-19 auf das Projekt "beuwy Funnels".
-- Diese Datei ist die Aufzeichnung des Stands, nicht der Auslöser —
-- ausgeführt wurde sie über die Supabase-Migrationen
-- (os_branding_schema, os_branding_rpcs).
--
-- Sicherheitsmuster wie website_content: RLS an, keine Policies, damit
-- die Tabellen für den anon-Key unerreichbar sind. Jeder Zugriff läuft
-- über SECURITY-DEFINER-Funktionen, die das CONTENT_WRITE_SECRET prüfen.
-- ============================================================

create table if not exists public.os_skript (
  id uuid primary key default gen_random_uuid(),
  batch text,
  nummer int,
  titel text not null,
  saeule text check (saeule in ('a','b','c')),
  hook_interrupt text,
  hook_kontra text,
  hook_zahl text,
  hook_gewaehlt text check (hook_gewaehlt in ('interrupt','kontra','zahl')),
  body text,
  loop_ende text,
  regie text,
  laenge_sek int,
  status text not null default 'idee'
    check (status in ('idee','skript','gedreht','geplant','gepostet','verworfen')),
  geplant_fuer date,
  audio_url text,
  quelle text default 'claude',
  erstellt_am timestamptz not null default now(),
  aktualisiert_am timestamptz not null default now()
);

create table if not exists public.os_reel (
  id uuid primary key default gen_random_uuid(),
  plattform text not null check (plattform in ('instagram','tiktok')),
  extern_id text not null,
  veroeffentlicht_am timestamptz not null,
  titel text,
  permalink text,
  skript_id uuid references public.os_skript(id) on delete set null,
  saeule text check (saeule in ('a','b','c')),
  hook_typ text check (hook_typ in ('interrupt','kontra','zahl')),
  laenge_sek numeric,
  views bigint not null default 0,
  reichweite bigint not null default 0,
  avg_watchtime_sek numeric,
  watchtime_prozent numeric,
  saves bigint not null default 0,
  shares bigint not null default 0,
  kommentare bigint not null default 0,
  likes bigint not null default 0,
  profilbesuche bigint not null default 0,
  follows bigint not null default 0,
  aktualisiert_am timestamptz not null default now(),
  unique (plattform, extern_id)
);

create index if not exists os_reel_zeit_idx on public.os_reel (veroeffentlicht_am desc);

create table if not exists public.os_tagesstand (
  datum date not null,
  plattform text not null check (plattform in ('instagram','tiktok')),
  follower bigint not null default 0,
  profilbesuche bigint not null default 0,
  reichweite bigint not null default 0,
  primary key (datum, plattform)
);

create table if not exists public.os_ingest_log (
  id bigserial primary key,
  quelle text not null,
  ok boolean not null,
  anzahl int not null default 0,
  detail text,
  zeit timestamptz not null default now()
);

create index if not exists os_ingest_log_zeit_idx on public.os_ingest_log (zeit desc);

alter table public.os_skript enable row level security;
alter table public.os_reel enable row level security;
alter table public.os_tagesstand enable row level security;
alter table public.os_ingest_log enable row level security;

revoke all on public.os_skript from anon, authenticated;
revoke all on public.os_reel from anon, authenticated;
revoke all on public.os_tagesstand from anon, authenticated;
revoke all on public.os_ingest_log from anon, authenticated;

-- ── Zugriffsschicht ─────────────────────────────────────────
-- Funktionen: os_pruefe (intern), os_upsert_reel, os_reel_zuordnen,
-- os_set_tagesstand, os_skripte_anlegen, os_skript_aendern, os_log,
-- os_snapshot. Definitionen siehe Migration os_branding_rpcs; sie prüfen
-- alle zuerst website_secrets.content_write gegen p_secret und werfen
-- sonst 'unauthorized'.
