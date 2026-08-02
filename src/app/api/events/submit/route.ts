import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { sendEmail, escapeHtml } from '@/lib/email';
import { CONTACT_EMAIL } from '@/lib/site';

// POST /api/events/submit — public, no-login event submission.
// Inserts a `pending` event (ssa_id null) that only appears on the calendar once
// an admin approves it (sets status = 'approved'). Mirrors /api/apply: validate,
// service-role insert, best-effort notify email. Requires migration 005 (adds
// events.type + events.status) to be applied.
export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const {
    title,
    starts_at,
    ends_at,
    location,
    type,
    registration_url,
    description,
    chapter,
    submitter_name,
    submitter_email,
  } = body ?? {};

  if (!title || !starts_at || !submitter_email) {
    return NextResponse.json(
      { error: 'Event title, date/time, and your email are required.' },
      { status: 400 }
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(submitter_email)) {
    return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 });
  }
  if (isNaN(new Date(starts_at).getTime())) {
    return NextResponse.json({ error: 'Please provide a valid start date/time.' }, { status: 400 });
  }

  // The events table has no submitter/chapter columns, so fold that context into
  // the description for the admin reviewing the pending event.
  const note = [
    description,
    chapter ? `Chapter/host: ${chapter}` : '',
    `Submitted by ${submitter_name || 'someone'} (${submitter_email})`,
  ]
    .filter(Boolean)
    .join('\n\n');

  const { error } = await supabaseAdmin().from('events').insert({
    title,
    starts_at,
    ends_at: ends_at || null,
    location: location || null,
    type: type || null,
    registration_url: registration_url || null,
    description: note,
    ssa_id: null,
    status: 'pending',
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  // Notify USM so a pending submission doesn't sit unseen. Best-effort.
  sendEmail({
    to: CONTACT_EMAIL,
    replyTo: submitter_email,
    subject: `New event submission: ${title}`,
    html: `<p>A new event was submitted for review.</p>
<p><strong>${escapeHtml(title)}</strong><br/>
When: ${escapeHtml(String(starts_at))}<br/>
Where: ${escapeHtml(location || 'n/a')}<br/>
Type: ${escapeHtml(type || 'n/a')}</p>
<p>${escapeHtml(note).replace(/\n/g, '<br/>')}</p>
<p>Approve it by setting its status to <code>approved</code> in Supabase.</p>`,
  }).catch(() => {});

  return NextResponse.json({ ok: true });
}
