import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { sendEmail, escapeHtml } from '@/lib/email';
import { CONTACT_EMAIL } from '@/lib/site';

// Public "Start an SSA" application. Inserts via the service role (so it doesn't
// depend on anon RLS) and emails USM so applications don't sit unseen.
export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const school = String(body.school ?? '').trim();
  const city = String(body.city ?? '').trim();
  const state = String(body.state ?? '').trim();
  const message = String(body.message ?? '').trim();

  if (!name || !school || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Name, school, and a valid email are required.' }, { status: 400 });
  }

  const { error } = await supabaseAdmin().from('ssa_applications').insert({
    applicant_name: name,
    email,
    school,
    city: city || null,
    state: state || null,
    message: message || null,
  });

  if (error) {
    return NextResponse.json({ error: 'Could not submit — please try again.' }, { status: 500 });
  }

  // Notify USM. Non-blocking for the applicant: a failed email must not fail the
  // application, since it's already safely stored.
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a2e38">
      <h2 style="color:#235470">New SSA application</h2>
      <p><strong>${escapeHtml(name)}</strong> wants to start a chapter at <strong>${escapeHtml(school)}</strong>.</p>
      <table style="font-size:14px;line-height:1.7">
        <tr><td style="color:#5f8a9f;padding-right:12px">Email</td><td>${escapeHtml(email)}</td></tr>
        <tr><td style="color:#5f8a9f;padding-right:12px">Location</td><td>${escapeHtml([city, state].filter(Boolean).join(', ') || '—')}</td></tr>
        <tr><td style="color:#5f8a9f;padding-right:12px;vertical-align:top">Message</td><td>${escapeHtml(message || '—').replace(/\n/g, '<br>')}</td></tr>
      </table>
      <p style="font-size:12px;color:#999;margin-top:20px">Review it in the admin dashboard → Applications.</p>
    </div>`;

  const mail = await sendEmail({
    to: CONTACT_EMAIL,
    subject: `New SSA application — ${school}`,
    html,
    replyTo: email,
  });

  return NextResponse.json({ ok: true, notified: mail.ok && !mail.skipped });
}
