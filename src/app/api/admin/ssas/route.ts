import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { ADMIN_COOKIE } from '@/lib/admin-session';

function isAdmin() {
  return cookies().get(ADMIN_COOKIE)?.value === '1';
}

async function generateUniquePIN(): Promise<string> {
  const sb = supabaseAdmin();
  for (let i = 0; i < 100; i++) {
    const pin = String(Math.floor(1000 + Math.random() * 9000));
    const { data } = await sb.from('ssas').select('id').eq('pin', pin).single();
    if (!data) return pin;
  }
  throw new Error('Could not generate unique PIN');
}

export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data } = await supabaseAdmin()
    .from('ssas')
    .select('id, slug, name, school, city, state, status, pin, instagram_handle, contact_email')
    .order('state', { ascending: true })
    .order('name', { ascending: true });
  return NextResponse.json(data ?? []);
}

export async function POST(req: Request) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const pin = await generateUniquePIN();
  const { data, error } = await supabaseAdmin()
    .from('ssas')
    .insert({ ...body, pin, status: body.status ?? 'unclaimed' })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
