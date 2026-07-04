import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { PORTAL_COOKIE } from '@/lib/portal-session';

function getSSAId() {
  return cookies().get(PORTAL_COOKIE)?.value ?? null;
}

export async function GET() {
  const id = getSSAId();
  if (!id) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const { data, error } = await supabaseAdmin().from('ssas').select('*').eq('id', id).single();
  if (error) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(data);
}

export async function PATCH(req: Request) {
  const id = getSSAId();
  if (!id) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const body = await req.json();
  const allowed = ['description', 'joining_instructions', 'instagram_handle', 'contact_email'];
  const update: Record<string, any> = { updated_at: new Date().toISOString() };
  for (const key of allowed) {
    if (key in body) update[key] = body[key];
  }
  const { error } = await supabaseAdmin().from('ssas').update(update).eq('id', id);
  if (error) return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  return NextResponse.json({ ok: true });
}
