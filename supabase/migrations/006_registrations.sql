-- 006: general-purpose event registrations table.
--
-- Replaces "trust Stripe metadata alone" with real, queryable storage — needed
-- for things Stripe metadata can't support: an alumni database built from
-- LinkedIn links, and matching attendees who request each other as roommates.
--
-- Every paid registration is inserted with status 'pending' the moment the
-- attendee submits the form (before Stripe redirect), then flipped to 'paid'
-- by the Stripe webhook (checkout.session.completed) once payment actually
-- clears. Free events insert directly as 'free'. This means 'pending' rows
-- that never convert (abandoned checkout) are expected and should be treated
-- as non-attendees, not deleted — they still count as a signup lead.
--
-- No anon/authenticated INSERT policy is defined on purpose: every insert goes
-- through an API route using the service-role client (supabaseAdmin()), the
-- same pattern as every other write path in this codebase. That's what
-- actually enforces "price is computed server-side, never trusted from the
-- client" — RLS here is a second line of defense, not the primary one.

create table public.registrations (
  id uuid primary key default gen_random_uuid(),
  event_slug text not null,
  created_at timestamptz not null default now(),

  -- General info
  full_name text not null,
  email text not null,
  gender text,
  birthday date,
  phone text,
  home_address text,

  -- Student status / school / profession
  student_status text check (student_status in ('undergrad', 'grad', 'alumni')),
  school text,
  major_profession text,
  linkedin_url text,
  attended_before boolean,

  -- Dietary
  dietary text[] not null default '{}',
  dietary_other text,

  -- Emergency contact
  emergency_contact_name text,
  emergency_contact_relation text,
  emergency_contact_phone text,

  -- Housing / roommates
  needs_housing boolean not null default false,
  roommate_requests text[] not null default '{}',

  -- Professional-dev-event extras (Hackathon, Moot Court, etc.)
  resume_url text,

  -- Consents — all required at signup, tracked individually for an audit trail
  media_consent boolean not null default false,
  photo_consent boolean not null default false,
  liability_accepted boolean not null default false,

  -- Ticketing
  ticket_tier text,
  price_cents integer not null default 0,
  currency text not null default 'usd',
  stripe_session_id text,
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'paid', 'free', 'canceled')),

  -- Catch-all for one-off, event-specific fields not worth their own column
  extra jsonb
);

create index registrations_event_slug_idx on public.registrations (event_slug);
create index registrations_email_idx on public.registrations (email);
create unique index registrations_stripe_session_idx
  on public.registrations (stripe_session_id) where stripe_session_id is not null;

alter table public.registrations enable row level security;

-- Matches the ssa_applications pattern: RLS is defense-in-depth here since the
-- admin dashboard actually reads via supabaseAdmin() (service role), not as
-- an authenticated Supabase-Auth admin user — but this keeps the anon/auth
-- roles locked out even if a future query forgets to use the service client.
create policy "registrations admin read"
  on public.registrations for select
  using (public.is_admin());
