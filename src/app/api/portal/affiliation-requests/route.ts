import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { PORTAL_COOKIE } from '@/lib/portal-session';

function getSSAId() {
  return cookies().get(PORTAL_COOKIE)?.value ?? null;
}

export async function GET() {
  const ssaId = getSSAId();
  if (!ssaId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const { data } = await supabaseAdmin()
    .from('affiliation_requests')
    .select('id, status, message, created_at, user_id, user_name, user_email')
    .eq('ssa_id', ssaId)
    .order('created_at', { ascending: false });
  return NextResponse.json(data ?? []);
}

export async function PATCH(req: Request) {
  const ssaId = getSSAId();
  if (!ssaId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const { id, status } = await req.json();
  if (!['approved', 'rejected'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }
  const sb = supabaseAdmin();
  const { data: reqData } = await sb
    .from('affiliation_requests')
    .select('user_id')
    .eq('id', id)
    .eq('ssa_id', ssaId)
    .single();
  if (!reqData) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await sb.from('affiliation_requests').update({ status }).eq('id', id);
  if (status === 'approved') {
    await sb.from('profiles').update({ ssa_id: ssaId }).eq('id', reqData.user_id);
  }
  return NextResponse.json({ ok: true });
}
