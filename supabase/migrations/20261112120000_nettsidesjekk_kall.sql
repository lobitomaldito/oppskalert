-- Grensen per IP for den gratis nettsidesjekken (api/nettsidesjekk.js).
--
-- Funksjonen henter fremmede domener på oppdrag fra hvem som helst, så den
-- trenger en grense som gjelder på tvers av serverinstansene. En teller i
-- minnet nullstilles hver gang Vercel starter en ny instans.
--
-- Bare en HMAC av IP-adressen lagres, aldri selve adressen, og radene slettes
-- av funksjonen etter ett døgn. Domenet som ble sjekket går til sporingen
-- (nettsidesjekk_resultat), ikke hit.
--
-- RLS uten policyer: bare service-role (funksjonen) kommer til.

create table if not exists public.nettsidesjekk_kall (
  id bigint generated always as identity primary key,
  ip_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists nettsidesjekk_kall_ip_tid on public.nettsidesjekk_kall (ip_hash, created_at desc);

alter table public.nettsidesjekk_kall enable row level security;
revoke all on public.nettsidesjekk_kall from anon, authenticated;
