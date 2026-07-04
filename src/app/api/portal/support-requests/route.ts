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
    .from('support_requests')
    .select('*')
    .eq('ssa_id', ssaId)
    .order('created_at', { ascending: false });
  return NextResponse.json(data ?? []);
}

export async function POST(req: Request) {
  const ssaId = getSSAId();
  if (!ssaId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const body = await req.json();
  const { error } = await supabaseAdmin()
    .from('support_requests')
    .insert({ ...body, ssa_id: ssaId });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
