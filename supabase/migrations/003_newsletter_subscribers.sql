-- ============================================================
-- USM Platform — newsletter subscribers
-- Run in Supabase SQL Editor (or `supabase db push`)
-- ============================================================
-- Stores emails captured by the footer / contact-page signup. The public can
-- insert (subscribe); only USM admins can read the list. Writes go through the
-- server (/api/newsletter) using the service role, so anon SELECT stays closed.

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,                       -- e.g. 'footer', 'contact'
  created_at timestamptz default now()
);

alter table public.newsletter_subscribers enable row level security;

-- No public read; admins read all. (Server subscribe path uses service role,
-- which bypasses RLS, so no public-insert policy is needed.)
create policy "newsletter admin read" on public.newsletter_subscribers for select
  using (public.is_admin());
