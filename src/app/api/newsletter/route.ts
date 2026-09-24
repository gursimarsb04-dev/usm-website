import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { sendEmail } from '@/lib/email';
import { SITE_URL } from '@/lib/site';

// Public newsletter signup. Stores the email via the service role so the
// subscriber list itself stays unreadable by the anon key. Idempotent: a repeat
// email is treated as success rather than an error.
//
// Also captures `segment` (student vs. alumni/donor) for targeted sends, and an
// optional phone + explicit `sms_consent`. A phone number alone is never treated
// as consent — the flag must be sent true by the client's opt-in checkbox, and
// no SMS is sent anywhere today.
export async function POST(req: Request) {
  let body: {
    email?: string;
    source?: string;
    segment?: string;
    phone?: string | null;
    smsConsent?: boolean;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const email = String(body.email ?? '').trim().toLowerCase();
  const source = typeof body.source === 'string' ? body.source.slice(0, 40) : null;

  // Simple, permissive email shape check.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 });
  }

  // Only accept the two known segments; anything else falls back to 'student'.
  const segment = body.segment === 'alumni_donor' ? 'alumni_donor' : 'student';

  // Consent must be explicitly true; a phone without consent is discarded so we
  // never end up holding a number we aren't allowed to text.
  const smsConsent = body.smsConsent === true;
  const rawPhone = typeof body.phone === 'string' ? body.phone.trim().slice(0, 32) : '';
  const phone = smsConsent && rawPhone ? rawPhone : null;

  // `.select()` returns the row only when it was newly inserted (duplicates are
  // ignored), which is how we know to send the welcome email exactly once.
  const { data, error } = await supabaseAdmin()
    .from('newsletter_subscribers')
    .upsert(
      { email, source, segment, phone, sms_consent: smsConsent },
      { onConflict: 'email', ignoreDuplicates: true }
    )
    .select('id');

  if (error) {
    return NextResponse.json({ error: 'Could not subscribe — try again.' }, { status: 500 });
  }

  // Best-effort: a failed welcome email must never fail the signup itself.
  // sendEmail no-ops (logs) when MAILCHIMP_API_KEY isn't configured.
  if (data && data.length > 0) {
    await sendEmail({ to: email, subject: 'Welcome to United Sikh Movement', html: welcomeHtml(segment) }).catch(() => {});
  }
  return NextResponse.json({ ok: true });
}

function welcomeHtml(segment: 'student' | 'alumni_donor'): string {
  const links =
    segment === 'student'
      ? [
          ['Find the SSA on your campus', '/ssas'],
          ['Scholarships for Sikh students', '/news/sikh-scholarships'],
          ['Free LSAT mentoring', '/news/free-lsat-mentoring'],
          ['Upcoming events', '/events'],
        ]
      : [
          ['What USM does', '/news/what-is-united-sikh-movement'],
          ['Mentor or speak at an event', '/contact'],
          ['Support Sikh students', '/donate'],
        ];
  const items = links.map(([label, path]) => `<li><a href="${SITE_URL}${path}">${label}</a></li>`).join('');
  return `<div style="font-family:Arial,sans-serif;max-width:560px;color:#12343b">
<p>Vaheguru Ji Ka Khalsa, Vaheguru Ji Ki Fateh!</p>
<p>Thanks for joining United Sikh Movement — America's largest Sikh student network, 40 chapters strong and 100% volunteer-led.</p>
<p>About once a month you'll hear from us about events, programs, and opportunities. A few places to start:</p>
<ul>${items}</ul>
<p>— The USM team</p>
</div>`;
}
