-- ─────────────────────────────────────────────────────────────────────────
-- beuwy CRM · Dummy-Daten (R11b, 14.09.2026)
--
-- Zwei RPCs für /intern/einstellungen:
--   bw_dummy_verteilen(p_secret) — verteilt die Zeitstempel aller Dummy-
--     Zeilen über die letzten sechs Wochen (die Anlege-RPCs setzen now()).
--   bw_dummy_loeschen(p_secret)  — entfernt ausschließlich Dummy-Zeilen.
--
-- Markierung der Dummy-Daten (siehe src/lib/crm/dummy.ts):
--   Personen  → E-Mail-Domain @muster-makler.de (bw_kontakt, bw_lead,
--               bw_konto, bw_mail_log.empfaenger)
--   Leads     → zusätzlich daten->>'dummy' = 'true'
--   Einblick  → bw_track_events.pageload_id beginnt mit 'dummy-'
--   Flows     → bw_flow.name beginnt mit '[Demo] '
--
-- Einmal im Supabase-SQL-Editor des Projekts „beuwy Funnels" ausführen.
-- Idempotent (create or replace). Läuft als SECURITY DEFINER, Tabellen
-- bleiben für anon gesperrt.
--
-- SECRET-PRÜFUNG: Die bw_*-RPCs prüfen p_secret gegen
-- website_secrets.content_write (Migration r3_crm_bw_rpcs). Der Block
-- „-- SECRET" unten macht dasselbe inline. Heißen die Spalten in
-- website_secrets anders als name/value, bitte die zwei Bezeichner an
-- die vorhandene Funktion public.bw_pruefe_secret angleichen (im SQL-
-- Editor: Database → Functions → bw_pruefe_secret → Definition).
-- ─────────────────────────────────────────────────────────────────────────

create or replace function public.bw_dummy_verteilen(p_secret text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_leads int := 0;
  v_kontakte int := 0;
  v_deals int := 0;
  v_konten int := 0;
  v_mails int := 0;
  v_events int := 0;
  v_tickets int := 0;
  v_notizen int := 0;
  v_lead_events int := 0;
begin
  -- SECRET
  if not exists (
    select 1 from public.website_secrets s
    where s.name = 'content_write' and s.value = p_secret
  ) then
    raise exception 'unauthorized';
  end if;

  -- Leads: Anfragen der letzten 42 Tage, jüngere Status weiter hinten
  update public.bw_lead l
     set erstellt = now()
       - (case l.status
            when 'neu' then floor(random() * 5)
            when 'kontaktiert' then 4 + floor(random() * 8)
            when 'termin' then 7 + floor(random() * 10)
            when 'angebot' then 12 + floor(random() * 12)
            when 'kunde' then 20 + floor(random() * 20)
            else 15 + floor(random() * 25)
          end || ' days')::interval
       - (floor(random() * 9) || ' hours')::interval
   where l.email like '%@muster-makler.de'
     and coalesce(l.daten->>'dummy', '') = 'true';
  get diagnostics v_leads = row_count;

  -- Lead-Ereignisse und Notizen kurz nach dem jeweiligen Lead
  update public.bw_lead_event e
     set erstellt = l.erstellt + (1 + floor(random() * 72) || ' hours')::interval
    from public.bw_lead l
   where e.lead_id = l.id
     and l.email like '%@muster-makler.de'
     and coalesce(l.daten->>'dummy', '') = 'true';
  get diagnostics v_lead_events = row_count;

  update public.bw_lead_notiz n
     set erstellt = l.erstellt + (2 + floor(random() * 96) || ' hours')::interval
    from public.bw_lead l
   where n.lead_id = l.id
     and l.email like '%@muster-makler.de'
     and coalesce(l.daten->>'dummy', '') = 'true';
  get diagnostics v_notizen = row_count;

  -- Kontakte: etwas älter als ihr erster Lead
  update public.bw_kontakt k
     set erstellt = coalesce(
           (select min(l.erstellt) from public.bw_lead l where l.email = k.email),
           now() - (10 + floor(random() * 30) || ' days')::interval
         ) - (floor(random() * 3) || ' hours')::interval
   where k.email like '%@muster-makler.de';
  get diagnostics v_kontakte = row_count;

  -- Deals: nach dem Kontakt, gewonnene/verlorene weiter zurück
  update public.bw_deal d
     set erstellt = k.erstellt + (1 + floor(random() * 10) || ' days')::interval
    from public.bw_kontakt k
   where d.kontakt_id = k.id
     and k.email like '%@muster-makler.de';
  get diagnostics v_deals = row_count;

  -- Kundenkonten + Tickets
  update public.bw_konto ko
     set erstellt = now() - (5 + floor(random() * 30) || ' days')::interval
   where ko.email like '%@muster-makler.de';
  get diagnostics v_konten = row_count;

  update public.bw_ticket t
     set erstellt = ko.erstellt + (1 + floor(random() * 12) || ' days')::interval
    from public.bw_konto ko
   where t.konto_id = ko.id
     and ko.email like '%@muster-makler.de';
  get diagnostics v_tickets = row_count;

  -- Mail-Protokoll: an den Lead gekoppelt
  update public.bw_mail_log m
     set erstellt = coalesce(
           (select l.erstellt from public.bw_lead l where l.id = m.lead_id),
           now() - (floor(random() * 30) || ' days')::interval
         ) + (floor(random() * 30) || ' minutes')::interval
   where m.empfaenger like '%@muster-makler.de';
  get diagnostics v_mails = row_count;

  -- Einblick: je pageload_id ein fester Tag (aus der ID abgeleitet), damit
  -- Seitenaufruf, Scroll-Marken und Klicks eines Besuchs zusammenbleiben
  update public.bw_track_events ev
     set created_at = now()
       - ((abs(hashtext(ev.pageload_id)) % 42) || ' days')::interval
       - ((abs(hashtext(ev.pageload_id || 'h')) % 14 + 7) || ' hours')::interval
       - ((abs(hashtext(ev.pageload_id || 'm')) % 60) || ' minutes')::interval
   where ev.pageload_id like 'dummy-%';
  get diagnostics v_events = row_count;

  return jsonb_build_object(
    'leads', v_leads, 'lead_events', v_lead_events, 'notizen', v_notizen,
    'kontakte', v_kontakte, 'deals', v_deals, 'konten', v_konten,
    'tickets', v_tickets, 'mails', v_mails, 'events', v_events
  );
end;
$$;

create or replace function public.bw_dummy_loeschen(p_secret text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_events int := 0;
  v_flows int := 0;
  v_aufgaben int := 0;
  v_deals int := 0;
  v_mails int := 0;
  v_konten int := 0;
  v_leads int := 0;
  v_kontakte int := 0;
begin
  -- SECRET
  if not exists (
    select 1 from public.website_secrets s
    where s.name = 'content_write' and s.value = p_secret
  ) then
    raise exception 'unauthorized';
  end if;

  delete from public.bw_track_events where pageload_id like 'dummy-%';
  get diagnostics v_events = row_count;

  -- Flows (Schritte/Läufe hängen per FK-Cascade an bw_flow)
  delete from public.bw_flow where name like '[Demo] %';
  get diagnostics v_flows = row_count;

  -- Aufgaben an Dummy-Kontakten oder Dummy-Deals
  delete from public.bw_aufgabe a
   where a.kontakt_id in (select id from public.bw_kontakt where email like '%@muster-makler.de')
      or a.deal_id in (
        select d.id from public.bw_deal d
        join public.bw_kontakt k on k.id = d.kontakt_id
        where k.email like '%@muster-makler.de'
      );
  get diagnostics v_aufgaben = row_count;

  delete from public.bw_deal d
   where d.kontakt_id in (select id from public.bw_kontakt where email like '%@muster-makler.de')
      or d.lead_id in (select id from public.bw_lead where email like '%@muster-makler.de');
  get diagnostics v_deals = row_count;

  delete from public.bw_mail_log where empfaenger like '%@muster-makler.de';
  get diagnostics v_mails = row_count;

  -- Konten (Tickets + Antworten + Codes hängen per Cascade daran)
  delete from public.bw_ticket t
   where t.konto_id in (select id from public.bw_konto where email like '%@muster-makler.de');
  delete from public.bw_konto_code where email like '%@muster-makler.de';
  delete from public.bw_konto where email like '%@muster-makler.de';
  get diagnostics v_konten = row_count;

  -- Leads (Events + Notizen per Cascade)
  delete from public.bw_lead
   where email like '%@muster-makler.de'
     and coalesce(daten->>'dummy', '') = 'true';
  get diagnostics v_leads = row_count;

  delete from public.bw_kontakt where email like '%@muster-makler.de';
  get diagnostics v_kontakte = row_count;

  return jsonb_build_object(
    'kontakte', v_kontakte, 'leads', v_leads, 'deals', v_deals, 'aufgaben', v_aufgaben,
    'konten', v_konten, 'mails', v_mails, 'events', v_events, 'flows', v_flows
  );
end;
$$;

revoke all on function public.bw_dummy_verteilen(text) from public;
revoke all on function public.bw_dummy_loeschen(text) from public;
grant execute on function public.bw_dummy_verteilen(text) to anon, authenticated;
grant execute on function public.bw_dummy_loeschen(text) to anon, authenticated;
