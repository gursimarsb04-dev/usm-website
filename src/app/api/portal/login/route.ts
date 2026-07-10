import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { PORTAL_COOKIE } from '@/lib/portal-session';
import { ssaUsername } from '@/lib/portal-username';

export async function POST(req: Request) {
  const { username, pin } = await req.json();
  const { data: ssa } = await supabaseAdmin()
    .from('ssas')
    .select('id, school')
    .eq('pin', pin)
    .single();
  // The username is derived from the chapter's university and must match.
  if (!ssa || ssaUsername(ssa.school) !== String(username ?? '').trim().toLowerCase()) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(PORTAL_COOKIE, ssa.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
  return res;
}
