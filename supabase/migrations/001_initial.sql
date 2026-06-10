-- ============================================================
-- USM Platform — initial schema
-- Run in Supabase SQL Editor (or `supabase db push`)
-- ============================================================

-- ── SSAs: one row per chapter (all 75; `status` controls visibility) ──
create table public.ssas (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,              -- e.g. 'rutgers'
  name text not null,                     -- e.g. 'Rutgers SSA'
  school text not null,
  city text,
  state text,
  latitude double precision,             -- for the map (intern spreadsheet task)
  longitude double precision,
  instagram_handle text,
  contact_email text,
  description text,
  joining_instructions text,
  board_members jsonb default '[]',       -- [{name, role, photo_url}]
  cover_photo_url text,
  status text not null default 'unclaimed'
    check (status in ('unclaimed','pending','live','inactive')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── Profiles: links Supabase auth users to an SSA ──
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  ssa_id uuid references public.ssas(id),
  role text not null default 'ssa_leader'
    check (role in ('ssa_leader','usm_admin')),
  created_at timestamptz default now()
);

-- ── Events: USM + SSA events, unified calendar ──
create table public.events (
  id uuid primary key default gen_random_uuid(),
  ssa_id uuid references public.ssas(id),  -- null = USM national event
  title text not null,
  description text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  location text,
  registration_url text,                   -- SSAs link out to their own forms
  cover_photo_url text,
  archive_summary text,                    -- filled after the event
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- ── SSA photo galleries ──
create table public.ssa_photos (
  id uuid primary key default gen_random_uuid(),
  ssa_id uuid not null references public.ssas(id) on delete cascade,
  url text not null,
  caption text,
  created_at timestamptz default now()
);

-- ── Wrapped: one submission per SSA per school year ──
create table public.wrapped_submissions (
  id uuid primary key default gen_random_uuid(),
  ssa_id uuid not null references public.ssas(id) on delete cascade,
  school_year text not null default '2025-26',
  events_held int,
  member_count int,
  seva_hours int,
  biggest_moment text,
  senior_quote text,
  senior_quote_name text,
  photo_urls jsonb default '[]',
  published boolean default false,         -- USM admin flips to true
  created_at timestamptz default now(),
  unique (ssa_id, school_year)
);

-- ── Support requests (speaker / funding / board support / resources) ──
create table public.support_requests (
  id uuid primary key default gen_random_uuid(),
  ssa_id uuid references public.ssas(id),
  request_type text not null
    check (request_type in ('speaker','funding','board_support','event_help','resource','other')),
  details text not null,
  status text not null default 'new'
    check (status in ('new','in_review','approved','declined','done')),
  submitted_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- ── Start-an-SSA applications (public form) ──
create table public.ssa_applications (
  id uuid primary key default gen_random_uuid(),
  applicant_name text not null,
  email text not null,
  school text not null,
  city text,
  state text,
  message text,
  status text not null default 'new'
    check (status in ('new','contacted','onboarding','launched','closed')),
  created_at timestamptz default now()
);

-- ============================================================
-- Row Level Security
-- Principle: public reads what's live; SSA leaders edit only
-- their own chapter; USM admins edit everything.
-- ============================================================

alter table public.ssas enable row level security;
alter table public.profiles enable row level security;
alter table public.events enable row level security;
alter table public.ssa_photos enable row level security;
alter table public.wrapped_submissions enable row level security;
alter table public.support_requests enable row level security;
alter table public.ssa_applications enable row level security;

-- Helper: is the current user a USM admin?
create or replace function public.is_admin() returns boolean
language sql stable security definer as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'usm_admin'
  );
$$;

-- Helper: the current user's SSA
create or replace function public.my_ssa() returns uuid
language sql stable security definer as $$
  select ssa_id from public.profiles where id = auth.uid();
$$;

-- SSAS: everyone can read; leaders update their own; admins everything
create policy "ssas public read" on public.ssas for select using (true);
create policy "ssas leader update" on public.ssas for update
  using (id = public.my_ssa() or public.is_admin());
create policy "ssas admin insert" on public.ssas for insert
  with check (public.is_admin());
create policy "ssas admin delete" on public.ssas for delete
  using (public.is_admin());

-- PROFILES: users read/update self; admins read all
create policy "profiles self read" on public.profiles for select
  using (id = auth.uid() or public.is_admin());
create policy "profiles self update" on public.profiles for update
  using (id = auth.uid());

-- EVENTS: public read; leaders manage their SSA's events; admins all
create policy "events public read" on public.events for select using (true);
create policy "events leader insert" on public.events for insert
  with check (ssa_id = public.my_ssa() or public.is_admin());
create policy "events leader update" on public.events for update
  using (ssa_id = public.my_ssa() or public.is_admin());
create policy "events leader delete" on public.events for delete
  using (ssa_id = public.my_ssa() or public.is_admin());

-- PHOTOS: public read; leaders manage own
create policy "photos public read" on public.ssa_photos for select using (true);
create policy "photos leader write" on public.ssa_photos for insert
  with check (ssa_id = public.my_ssa() or public.is_admin());
create policy "photos leader delete" on public.ssa_photos for delete
  using (ssa_id = public.my_ssa() or public.is_admin());

-- WRAPPED: public reads published; leaders manage own; admins all
create policy "wrapped public read" on public.wrapped_submissions for select
  using (published = true or ssa_id = public.my_ssa() or public.is_admin());
create policy "wrapped leader insert" on public.wrapped_submissions for insert
  with check (ssa_id = public.my_ssa() or public.is_admin());
create policy "wrapped leader update" on public.wrapped_submissions for update
  using (ssa_id = public.my_ssa() or public.is_admin());

-- SUPPORT REQUESTS: leaders see/create their own; admins all
create policy "requests own read" on public.support_requests for select
  using (ssa_id = public.my_ssa() or public.is_admin());
create policy "requests own insert" on public.support_requests for insert
  with check (ssa_id = public.my_ssa() or public.is_admin());
create policy "requests admin update" on public.support_requests for update
  using (public.is_admin());

-- APPLICATIONS: anyone can apply; only admins read
create policy "applications public insert" on public.ssa_applications for insert
  with check (true);
create policy "applications admin read" on public.ssa_applications for select
  using (public.is_admin());
create policy "applications admin update" on public.ssa_applications for update
  using (public.is_admin());

-- ── Storage bucket for SSA photo uploads ──
insert into storage.buckets (id, name, public) values ('ssa-photos','ssa-photos', true)
  on conflict do nothing;
create policy "photo uploads by authed" on storage.objects for insert
  with check (bucket_id = 'ssa-photos' and auth.role() = 'authenticated');
create policy "photo public read" on storage.objects for select
  using (bucket_id = 'ssa-photos');
