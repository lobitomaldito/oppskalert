-- Én funksjon avgjør om et kall til nettsidesjekken slipper gjennom
-- (api/nettsidesjekk.js). Erstatter skriv-så-tell fra 20261112120000.
-- Svarer 'ok', 'ip' (taket per IP er nådd) eller 'dogn' (døgntaket er nådd).
--
-- To tak: per IP per time og for alle til sammen per døgn. Døgntaket er det
-- som stopper bots med mange IP-adresser, så antall henting av fremmede sider
-- og antall rader her aldri kan bli større enn taket, uansett trafikk.
--
-- Bare kall som slipper gjennom skrives. Et avvist kall skriver ingenting, så
-- en flom fra bots fyller ikke databasen ringeappen også bruker.
--
-- ponytail: én lås for alle kall gjør at de går ett om gangen gjennom
-- funksjonen. Hvert kall tar under et millisekund, så det holder langt over
-- det siden får av trafikk. Bytt til en tellerrad per døgn hvis det noen gang
-- blir kø.

create or replace function public.nettsidesjekk_slipp(p_ip_hash text, p_per_time int, p_per_dogn int)
returns text
language plpgsql
security definer
set search_path = public
as $$
begin
  perform pg_advisory_xact_lock(hashtext('nettsidesjekk_kall'));

  delete from nettsidesjekk_kall where created_at < now() - interval '24 hours';

  if (select count(*) from nettsidesjekk_kall
      where ip_hash = p_ip_hash and created_at > now() - interval '1 hour') >= p_per_time then
    return 'ip';
  end if;
  if (select count(*) from nettsidesjekk_kall) >= p_per_dogn then
    return 'dogn';
  end if;

  insert into nettsidesjekk_kall (ip_hash) values (p_ip_hash);
  return 'ok';
end;
$$;

revoke all on function public.nettsidesjekk_slipp(text, int, int) from public, anon, authenticated;
grant execute on function public.nettsidesjekk_slipp(text, int, int) to service_role;
