-- 005: event type (calendar taxonomy) + submission status (moderation)
--
-- Adds two columns to `events`:
--   * type   — event category for the national calendar's Type filter. Nullable;
--              existing rows stay untagged until an officer/admin sets one.
--   * status — moderation state. Existing + officer/admin-created events are
--              'approved' and show immediately; public (no-login) submissions
--              come in 'pending' and only appear on the calendar once an admin
--              approves them.
--
-- Safe to run against the live DB: additive, with a default that keeps every
-- existing event visible.

alter table public.events
  add column if not exists type text,
  add column if not exists status text not null default 'approved'
    check (status in ('pending', 'approved', 'rejected'));

-- Backfill any pre-existing rows explicitly (default already covers them, but be
-- explicit in case the column existed nullable from an earlier hand-edit).
update public.events set status = 'approved' where status is null;

-- The Type filter reads distinct values; suggested taxonomy (not enforced, so
-- it can evolve without a migration):
--   'Divaan / Kirtan', 'Social / GBM', 'Professional / Career',
--   'Conference / Retreat', 'Fundraiser / Seva', 'Workshop / Educational'
create index if not exists events_status_starts_at_idx
  on public.events (status, starts_at);

-- RLS: public inserts (the no-login submission form) are allowed but forced to
-- 'pending' so they can't self-publish. The form route uses the service role,
-- which bypasses RLS, so this policy is defense-in-depth for any anon-key path.
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'events'
      and policyname = 'events public submit pending'
  ) then
    create policy "events public submit pending"
      on public.events for insert to anon
      with check (status = 'pending' and ssa_id is null);
  end if;
end $$;
