-- Spam-merking av demo-henvendelser.
--
-- api/demo-request.js setter status = 'spam' og skriver hvorfor i
-- spam_grunn, slik at dashbordet kan skjule dem uten å slette dem, og du
-- kan se om heuristikken bommet.
--
-- Backfillen under tar radene som ble skrevet mens anon-INSERT stod åpen og
-- bots POStet rett på PostgREST forbi skjemaet. Kjennetegnet er at både
-- navn og firma er lange tegnrekker uten mellomrom, med store bokstaver
-- inni og nesten ingen vokaler, og at melding er tom (skjemaet setter alltid
-- melding fra svarene i steg 1).

alter table public.demo_foresporsler
  add column if not exists spam_grunn text;

-- status var låst til ny/kontaktet/demo_sendt/kunde/arkivert. 'spam' er et
-- eget steg, ikke det samme som arkivert: arkivert er noe du selv har
-- vurdert og lagt bort, spam er noe som aldri var en henvendelse. Merk at
-- dette Supabase-prosjektet deles med CRM-en, som må kjenne verdien for å
-- vise den riktig.
alter table public.demo_foresporsler
  drop constraint if exists demo_foresporsler_status_check;

alter table public.demo_foresporsler
  add constraint demo_foresporsler_status_check
  check (status = any (array['ny', 'kontaktet', 'demo_sendt', 'kunde', 'arkivert', 'spam']));

comment on column public.demo_foresporsler.spam_grunn is
  'Hvorfor henvendelsen ble merket som spam. NULL for ekte henvendelser.';

update public.demo_foresporsler
set status = 'spam',
    spam_grunn = 'navn og firma er tilfeldige tegn'
where status = 'ny'
  and melding is null
  and navn ~ '^[A-Za-zÆØÅæøå]{12,}$'
  and navn ~ '[a-zæøå]'
  and substring(navn from 2) ~ '[A-ZÆØÅ]'
  and firma ~ '^[A-Za-zÆØÅæøå]{12,}$'
  and firma ~ '[a-zæøå]'
  and substring(firma from 2) ~ '[A-ZÆØÅ]';
