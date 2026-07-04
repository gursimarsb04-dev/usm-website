import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { PORTAL_COOKIE } from '@/lib/portal-session';

export async function POST(req: Request) {
  const ssaId = cookies().get(PORTAL_COOKIE)?.value;
  if (!ssaId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const { subject, message, recipients } = await req.json();
  if (!subject?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Subject and message are required' }, { status: 400 });
  }
  if (!['followers', 'members', 'all'].includes(recipients)) {
    return NextResponse.json({ error: 'Invalid recipients value' }, { status: 400 });
  }

  const sb = supabaseAdmin();
  const { data: ssa } = await sb.from('ssas').select('name, slug').eq('id', ssaId).single();
  if (!ssa) return NextResponse.json({ error: 'SSA not found' }, { status: 404 });

  const emailSet = new Set<string>();

  if (recipients === 'followers' || recipients === 'all') {
    const { data: follows } = await sb
      .from('ssa_follows')
      .select('profiles(email)')
      .eq('ssa_id', ssaId);
    follows?.forEach((f: any) => { if (f.profiles?.email) emailSet.add(f.profiles.email); });
  }

  if (recipients === 'members' || recipients === 'all') {
    const { data: members } = await sb
      .from('profiles')
      .select('email')
      .eq('ssa_id', ssaId)
      .not('email', 'is', null);
    members?.forEach((m: any) => { if (m.email) emailSet.add(m.email); });
  }

  const emails = Array.from(emailSet);
  if (emails.length === 0) {
    return NextResponse.json({ ok: true, sent: 0 });
  }

  if (!process.env.MAILCHIMP_API_KEY) {
    console.log(`[email-blast] MAILCHIMP_API_KEY not set. Would send "${subject}" to:`, emails);
    return NextResponse.json({ ok: true, sent: emails.length, note: 'MAILCHIMP_API_KEY not configured — emails logged only.' });
  }

  const fromEmail = process.env.EMAIL_FROM_ADDRESS ?? 'noreply@unitedsikhmovement.org';
  const fromName = process.env.EMAIL_FROM_NAME ?? 'United Sikh Movement';
  const safeMessage = message
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a2e38">
      <p style="font-size:13px;color:#5f8a9f;margin-bottom:16px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">${ssa.name}</p>
      <div style="font-size:15px;line-height:1.7">${safeMessage}</div>
      <hr style="border:none;border-top:1px solid #e8f0f4;margin:28px 0">
      <p style="font-size:12px;color:#999">Sent by ${ssa.name} via United Sikh Movement &middot; <a href="https://unitedsikhmovement.org/ssas/${ssa.slug}" style="color:#235470">View chapter page</a></p>
    </div>`;

  // Mailchimp Transactional (Mandrill) — sends to specific addresses directly
  const payload = {
    key: process.env.MAILCHIMP_API_KEY,
    message: {
      html,
      subject,
      from_email: fromEmail,
      from_name: fromName,
      to: emails.map(email => ({ email, type: 'to' })),
    },
  };

  const res = await fetch('https://mandrillapp.com/api/1.0/messages/send.json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    return NextResponse.json({ error: `Mailchimp error: ${errText}` }, { status: 500 });
  }

  const results: any[] = await res.json();
  const rejected = results.filter(r => r.status === 'rejected' || r.status === 'invalid');
  const sent = results.length - rejected.length;

  return NextResponse.json({ ok: true, sent });
}
