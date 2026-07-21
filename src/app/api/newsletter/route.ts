import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

// Public newsletter signup. Stores the email via the service role so the
// subscriber list itself stays unreadable by the anon key. Idempotent: a repeat
// email is treated as success rather than an error.
export async function POST(req: Request) {
  let body: { email?: string; source?: string };
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

  const { error } = await supabaseAdmin()
    .from('newsletter_subscribers')
    .upsert({ email, source }, { onConflict: 'email', ignoreDuplicates: true });

  if (error) {
    return NextResponse.json({ error: 'Could not subscribe — try again.' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
