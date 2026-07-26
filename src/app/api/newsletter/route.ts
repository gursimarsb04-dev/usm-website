import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

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

  const { error } = await supabaseAdmin()
    .from('newsletter_subscribers')
    .upsert(
      { email, source, segment, phone, sms_consent: smsConsent },
      { onConflict: 'email', ignoreDuplicates: true }
    );

  if (error) {
    return NextResponse.json({ error: 'Could not subscribe — try again.' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
