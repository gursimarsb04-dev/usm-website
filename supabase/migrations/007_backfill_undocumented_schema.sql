-- ============================================================
-- USM Platform — backfill schema that the app has always referenced in
-- code but was never captured as a migration file.
--
-- MUST RUN AFTER 001_initial.sql AND BEFORE 002_hide_portal_secrets.sql —
-- 002 grants column-level SELECT on ssas.pin/programs_content/members_content
-- and locks down admin_config, both of which require these to already exist.
--
-- Discovered while standing up a fresh Supabase project from scratch: no
-- real USM database existed before this, so none of this was ever actually
-- applied anywhere — it was added to some earlier, now-gone database
-- directly (dashboard or ad-hoc SQL) and the app was built against it, but
-- the migration was never written down. This is that missing migration,
-- reverse-engineered from every place the code reads/writes these.
-- ============================================================

-- ── ssas: portal login secret + portal-editable page content ──
alter table public.ssas
  add column if not exists pin text,
  add column if not exists programs_content text,
  add column if not exists members_content text; -- "only visible to affiliated members" per the page editor

-- ── admin_config: singleton row for the admin dashboard's username/password.
-- Left unseeded on purpose — src/lib/admin-session.ts falls back to
-- ADMIN_USERNAME/ADMIN_PASSWORD env vars when no row exists, and a real
-- password belongs in Vercel env vars, not committed/seeded SQL. ──
create table if not exists public.admin_config (
  id int primary key,
  username text not null,
  password text not null
);

-- ── ssa_follows: which auth users follow which chapter (drives event
-- notifications and the "followers" email-blast audience). ──
create table public.ssa_follows (
  id uuid primary key default gen_random_uuid(),
  ssa_id uuid not null references public.ssas(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (ssa_id, user_id)
);

alter table public.ssa_follows enable row level security;
create policy "follows self manage" on public.ssa_follows for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
create policy "follows leader read" on public.ssa_follows for select
  using (ssa_id = public.my_ssa() or public.is_admin());

-- ── notifications: per-user notification feed (new chapter events, etc.). ──
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  body text,
  link text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.notifications enable row level security;
create policy "notifications self read" on public.notifications for select
  using (user_id = auth.uid());
create policy "notifications self update" on public.notifications for update
  using (user_id = auth.uid());
-- No insert policy for anon/authenticated — only the service role (portal
-- events route, fanning out to followers) creates these.

-- ── affiliation_requests: a student asking to be affiliated with a chapter,
-- reviewed by that chapter's leader (approving sets profiles.ssa_id). ──
create table public.affiliation_requests (
  id uuid primary key default gen_random_uuid(),
  ssa_id uuid not null references public.ssas(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  user_name text,
  user_email text,
  message text,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.affiliation_requests enable row level security;
create policy "affiliation self insert" on public.affiliation_requests for insert
  with check (user_id = auth.uid());
create policy "affiliation self read" on public.affiliation_requests for select
  using (user_id = auth.uid() or ssa_id = public.my_ssa() or public.is_admin());
create policy "affiliation leader update" on public.affiliation_requests for update
  using (ssa_id = public.my_ssa() or public.is_admin());

notify pgrst, 'reload schema';
