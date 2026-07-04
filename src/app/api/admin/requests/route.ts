import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { ADMIN_COOKIE } from '@/lib/admin-session';

function isAdmin() {
  return cookies().get(ADMIN_COOKIE)?.value === '1';
}

export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data } = await supabaseAdmin()
    .from('affiliation_requests')
    .select('id, status, message, created_at, user_id, user_name, user_email, ssa_id, ssas(name, slug)')
    .order('created_at', { ascending: false });
  return NextResponse.json(data ?? []);
}

export async function PATCH(req: Request) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, status } = await req.json();
  if (!['approved', 'rejected'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }
  const sb = supabaseAdmin();
  const { data: reqData } = await sb
    .from('affiliation_requests')
    .select('user_id, ssa_id')
    .eq('id', id)
    .single();
  if (!reqData) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  await sb.from('affiliation_requests').update({ status }).eq('id', id);
  if (status === 'approved') {
    await sb.from('profiles').update({ ssa_id: reqData.ssa_id }).eq('id', reqData.user_id);
  }
  return NextResponse.json({ ok: true });
}
