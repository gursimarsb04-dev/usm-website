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
    .from('wrapped_submissions')
    .select('*')
    .eq('ssa_id', ssaId)
    .order('school_year', { ascending: false })
    .limit(1)
    .single();
  return NextResponse.json(data ?? null);
}

export async function POST(req: Request) {
  const ssaId = getSSAId();
  if (!ssaId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const body = await req.json();
  const { error } = await supabaseAdmin()
    .from('wrapped_submissions')
    .upsert({ ...body, ssa_id: ssaId }, { onConflict: 'ssa_id,school_year' });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
