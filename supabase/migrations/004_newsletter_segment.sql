-- ============================================================
-- USM Platform — newsletter segmentation + SMS opt-in capture
-- Run in Supabase SQL Editor (or `supabase db push`)
-- ============================================================
-- Students and alumni/donors want different content, so capture which one a
-- subscriber is at signup. Also captures an optional phone number for a future
-- SMS digest.
--
-- IMPORTANT (compliance): `sms_consent` records *affirmative* opt-in. The
-- signup checkbox is never pre-checked, and a phone number alone is NOT
-- consent. Before any SMS is actually sent, this needs a provider (e.g. Twilio)
-- and a TCPA review covering STOP/HELP handling and disclosure language.
-- Nothing sends today — this migration only stores what the user agreed to.

alter table public.newsletter_subscribers
  add column if not exists segment text
    check (segment in ('student', 'alumni_donor'))
    default 'student';

alter table public.newsletter_subscribers
  add column if not exists phone text;

alter table public.newsletter_subscribers
  add column if not exists sms_consent boolean not null default false;

-- Existing rows predate the split; default them to 'student'.
update public.newsletter_subscribers set segment = 'student' where segment is null;

-- Reload PostgREST so the API reflects the new columns immediately.
notify pgrst, 'reload schema';
