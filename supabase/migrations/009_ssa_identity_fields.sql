-- 009: chapter identity fields.
--
-- A chapter page previously had no way to say anything about itself beyond a
-- description paragraph — which is why every page read like a USM directory
-- entry rather than that chapter's own home on the web. These four fields are
-- what a student actually wants above the fold: what this chapter is about,
-- and when/where to show up.
--
-- IMPORTANT: 002_hide_portal_secrets revoked table-wide SELECT on ssas and
-- granted an explicit column allowlist instead. Any new column is therefore
-- INVISIBLE to the anon/authenticated roles until it's granted here too —
-- forgetting this makes the column silently read as null through the public
-- API with no error. Keep src/lib/ssa-columns.ts in sync as well.

alter table public.ssas
  add column if not exists tagline text,        -- one line under the chapter name
  add column if not exists meets_when text,     -- e.g. 'Sundays, 6:00 PM'
  add column if not exists meets_where text,    -- e.g. 'Busch Student Center'
  add column if not exists founded_year int;    -- e.g. 2014 -> "Est. 2014"

grant select (tagline, meets_when, meets_where, founded_year) on public.ssas to anon;
grant select (tagline, meets_when, meets_where, founded_year) on public.ssas to authenticated;

notify pgrst, 'reload schema';
