-- ============================================================
--  ORDINI GROTTA MARCELLO — MIGRAZIONE v9
--  · Quantità ricevuta + prezzo ricevuto (totale, IVA esclusa)
--  · Snapshot del prezzo di listino per lo scostamento
--  Eseguire prima di caricare il nuovo index.html
-- ============================================================

alter table ord_righe add column if not exists ricevuto             numeric;   -- quantità ricevuta (decimali ok)
alter table ord_righe add column if not exists prezzo_ric_totale    numeric;   -- prezzo totale ricevuto, IVA esclusa
alter table ord_righe add column if not exists prezzo_listino_snap  numeric;   -- €/unità a listino al momento del ricevimento
alter table ord_righe add column if not exists prezzo_listino_um    text;      -- unità cui si riferisce il prezzo di listino
alter table ord_righe add column if not exists ric_da               text;      -- chi ha registrato il ricevimento
alter table ord_righe add column if not exists ric_il               timestamptz;

grant all on all tables in schema public to anon, authenticated;
grant all on all sequences in schema public to anon, authenticated;
notify pgrst, 'reload schema';

select 'ok' as esito;
