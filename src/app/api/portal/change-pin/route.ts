import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { PORTAL_COOKIE } from '@/lib/portal-session';

export async function POST(req: Request) {
  const ssaId = cookies().get(PORTAL_COOKIE)?.value;
  if (!ssaId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const { pin } = await req.json();
  if (!/^\d{4}$/.test(pin)) {
    return NextResponse.json({ error: 'PIN must be exactly 4 digits' }, { status: 400 });
  }

  const sb = supabaseAdmin();
  const { data: existing } = await sb.from('ssas').select('id').eq('pin', pin).single();
  if (existing && existing.id !== ssaId) {
    return NextResponse.json({ error: 'PIN already in use by another chapter' }, { status: 400 });
  }

  const { error } = await sb.from('ssas').update({ pin }).eq('id', ssaId);
  if (error) return NextResponse.json({ error: 'Failed to update PIN' }, { status: 500 });
  return NextResponse.json({ ok: true });
}
