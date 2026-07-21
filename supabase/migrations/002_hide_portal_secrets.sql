-- ============================================================
-- USM Platform — hide portal login secrets from the public API
-- Run in Supabase SQL Editor (or `supabase db push`)
-- ============================================================
--
-- WHY: the anon key ships in the browser (NEXT_PUBLIC_SUPABASE_ANON_KEY), so
-- anything the `anon` role can read is effectively public. Row-Level Security is
-- row-level, not column-level, so the existing "ssas public read" policy still
-- let anyone fetch `ssas.pin` — every chapter's portal login secret — via
-- `GET /rest/v1/ssas?select=pin`. This locks that column (and the admin_config
-- table) down to the service role, which the server uses for logins and admin.
--
-- After this runs, a public `select('*')` on ssas ERRORS (permission denied on
-- pin), which is why the app selects the SSA_PUBLIC_COLUMNS allowlist instead
-- (src/lib/ssa-columns.ts). Keep public reads pointed at that list.
--
-- IMPORTANT: a column-level `revoke select (pin)` is a NO-OP while the role
-- still holds table-wide SELECT (Supabase grants that to anon/authenticated by
-- default) — a table grant lets you read every column. So we must revoke the
-- table-wide grant first, then grant back only the safe columns.

-- ── ssas.pin: hidden by granting every column EXCEPT pin ──
revoke select on public.ssas from anon;
revoke select on public.ssas from authenticated;

grant select (
  id, slug, name, school, city, state, latitude, longitude,
  instagram_handle, contact_email, description, joining_instructions,
  board_members, cover_photo_url, programs_content, members_content,
  status, created_at, updated_at
) on public.ssas to anon;

grant select (
  id, slug, name, school, city, state, latitude, longitude,
  instagram_handle, contact_email, description, joining_instructions,
  board_members, cover_photo_url, programs_content, members_content,
  status, created_at, updated_at
) on public.ssas to authenticated;

-- ── admin_config: no public access at all (belt-and-suspenders) ──
-- This table holds the admin dashboard username/password. It was created after
-- 001_initial.sql. Ensure RLS is on and no policy grants anon/authenticated
-- access; the server reaches it via the service role, which bypasses RLS.
alter table if exists public.admin_config enable row level security;
revoke all on public.admin_config from anon;
revoke all on public.admin_config from authenticated;

-- Reload PostgREST so the API reflects the new grants immediately.
notify pgrst, 'reload schema';

-- Sanity checks:
--   set role anon; select pin from public.ssas limit 1;          -- permission denied for column pin
--   set role anon; select name from public.ssas limit 1;         -- returns a row (app reads still work)
--   set role anon; select * from public.admin_config limit 1;    -- 0 rows
--   reset role;
