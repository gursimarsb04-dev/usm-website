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
    .from('events')
    .select('*')
    .eq('ssa_id', ssaId)
    .order('starts_at', { ascending: false });
  return NextResponse.json(data ?? []);
}

export async function POST(req: Request) {
  const ssaId = getSSAId();
  if (!ssaId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const body = await req.json();
  const { data, error } = await supabaseAdmin()
    .from('events')
    .insert({ ...body, ssa_id: ssaId })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
