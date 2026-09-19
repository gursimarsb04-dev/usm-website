-- Pin search_path on SECURITY DEFINER functions per Supabase's linter — without
-- this, a caller could in theory shadow objects these functions reference via
-- their session's search_path. Behavior is unchanged; this only closes that
-- theoretical vector. (The is_admin/my_ssa EXECUTE-by-anon/authenticated
-- warnings from the same scan are expected: RLS policies call these functions
-- as part of evaluating access for every role, by design.)

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'usm_admin'
  );
$$;

create or replace function public.my_ssa() returns uuid
language sql stable security definer set search_path = public as $$
  select ssa_id from public.profiles where id = auth.uid();
$$;
