-- R3 CRM/Kundenkonto-Schema — Präfix bw_, Projekt „beuwy Funnels".
-- Zugriffsmuster wie website_content/os_*: Tabellen für anon gesperrt
-- (RLS an, keine Policies), Zugriff NUR über SECURITY-DEFINER-RPCs,
-- die das CONTENT_WRITE_SECRET prüfen (Server-only, src/lib/crm/db.ts).

create table if not exists public.bw_lead (
  id uuid primary key default gen_random_uuid(),
  erstellt timestamptz not null default now(),
  quelle text not null default 'funnel',            -- funnel | booking | tool | manuell
  status text not null default 'neu',               -- neu | kontaktiert | termin | angebot | kunde | verloren
  name text not null default '',
  email text not null default '',
  telefon text not null default '',
  firma text not null default '',
  nachricht text not null default '',
  daten jsonb not null default '{}'::jsonb,          -- Funnel-Antworten / Tool-Eingaben
  score int not null default 0
);
create index if not exists bw_lead_status_idx on public.bw_lead (status, erstellt desc);

create table if not exists public.bw_lead_event (
  id bigint generated always as identity primary key,
  lead_id uuid not null references public.bw_lead(id) on delete cascade,
  erstellt timestamptz not null default now(),
  typ text not null,                                 -- status | mail | notiz-system | termin
  detail text not null default ''
);

create table if not exists public.bw_lead_notiz (
  id bigint generated always as identity primary key,
  lead_id uuid not null references public.bw_lead(id) on delete cascade,
  erstellt timestamptz not null default now(),
  autor text not null default 'alex',
  text text not null
);

create table if not exists public.bw_mail_log (
  id bigint generated always as identity primary key,
  lead_id uuid references public.bw_lead(id) on delete set null,
  erstellt timestamptz not null default now(),
  vorlage text not null,
  betreff text not null,
  empfaenger text not null,
  status text not null default 'gesendet'            -- gesendet | demo | fehler
);

create table if not exists public.bw_konto (
  id uuid primary key default gen_random_uuid(),
  erstellt timestamptz not null default now(),
  email text not null unique,
  name text not null default '',
  firma text not null default '',
  projekt_status text not null default 'aufnahme',   -- aufnahme | design | umsetzung | livegang | betrieb
  lead_id uuid references public.bw_lead(id) on delete set null
);

create table if not exists public.bw_konto_code (
  id bigint generated always as identity primary key,
  email text not null,
  code text not null,
  erstellt timestamptz not null default now(),
  gueltig_bis timestamptz not null,
  eingeloest boolean not null default false
);
create index if not exists bw_konto_code_email_idx on public.bw_konto_code (email, erstellt desc);

create table if not exists public.bw_ticket (
  id bigint generated always as identity primary key,
  konto_id uuid not null references public.bw_konto(id) on delete cascade,
  erstellt timestamptz not null default now(),
  titel text not null,
  status text not null default 'offen',              -- offen | in-arbeit | erledigt
  detail text not null default ''
);

alter table public.bw_lead enable row level security;
alter table public.bw_lead_event enable row level security;
alter table public.bw_lead_notiz enable row level security;
alter table public.bw_mail_log enable row level security;
alter table public.bw_konto enable row level security;
alter table public.bw_konto_code enable row level security;
alter table public.bw_ticket enable row level security;

-- RPC-Oberfläche (voller Wortlaut in Supabase-Migration r3_crm_bw_rpcs):
-- bw_pruefe_secret · bw_lead_anlegen · bw_leads_liste · bw_lead_detail ·
-- bw_lead_status_setzen · bw_lead_notiz_anlegen · bw_mail_loggen ·
-- bw_konto_code_anlegen · bw_konto_code_einloesen · bw_konto_detail ·
-- bw_konto_upsert · bw_ticket_anlegen · bw_ticket_status_setzen
-- Alle SECURITY DEFINER, Secret-Prüfung gegen website_secrets/content_write.

-- r3_konto_daten: bw_konto.daten jsonb + RPC bw_konto_daten_setzen (Intent-Onboarding)

-- r5_track_und_flows: bw_track_events (First-Party-Analytics, Schema nach
-- Riegel rechner_events erweitert um pfad) + bw_flow/bw_flow_schritt/
-- bw_flow_lauf/bw_mail_abmeldung (E-Mail-Flows). RPCs: bw_track_anlegen,
-- bw_track_auswertung, bw_track_heatmap, bw_flow_speichern, bw_flows_liste,
-- bw_flow_starten, bw_flow_faellige, bw_flow_fortschreiben, bw_abmelden.
-- Voller Wortlaut in Supabase-Migration r5_track_und_flows.

-- r5_kontakt_deal_aufgabe: bw_kontakt (Dedup ueber E-Mail), bw_deal
-- (Wert/Verlustgrund), bw_aufgabe, bw_ticket_antwort (Threads),
-- bw_konto_status_event. RPCs: bw_kontakt_upsert, bw_kontakt_360,
-- bw_kontakte_liste, bw_deal_speichern, bw_deals_liste,
-- bw_aufgabe_speichern, bw_tageskommando, bw_ticket_antworten(+_anlegen).
-- Voller Wortlaut in Supabase-Migration r5_kontakt_deal_aufgabe.
-- r5_konto_status_protokoll: bw_konto_upsert protokolliert Statuswechsel in bw_konto_status_event
