-- ⚠️ KJØRES ETTER AT api/demo-request.js ER DEPLOYET, IKKE FØR.
--
-- Så lenge den gamle klienten ligger ute i produksjon, skriver den rett på
-- PostgREST med anon-nøkkelen. Dropper du policyen først, får ekte besøkende
-- feilmelding i skjemaet fram til neste deploy.
--
-- Policyen «anon can submit demo requests» ga INSERT med `with check (true)`
-- til anon-rollen. Siden både nøkkelen, tabellnavnet og feltnavnene ligger i
-- klientbundlet, kunne hvem som helst POSTe leads inn uten å åpne siden, og
-- det var akkurat det botene gjorde. Etter dette er
-- api/demo-request.js (service-role) eneste vei inn.
--
-- analytics_events beholder sin anon-INSERT med vilje: den skrives fra
-- nettleseren ved hver sporingshendelse og har ingen annen vei inn.

drop policy if exists "anon can submit demo requests" on public.demo_foresporsler;
