import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { ADMIN_COOKIE } from '@/lib/admin-session';

function isAdmin() {
  return cookies().get(ADMIN_COOKIE)?.value === '1';
}

const STATUSES = ['new', 'contacted', 'onboarding', 'launched', 'closed'];

export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data } = await supabaseAdmin()
    .from('ssa_applications')
    .select('id, applicant_name, email, school, city, state, message, status, created_at')
    .order('created_at', { ascending: false });
  return NextResponse.json(data ?? []);
}

export async function PATCH(req: Request) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, status } = await req.json();
  if (!STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }
  const { error } = await supabaseAdmin().from('ssa_applications').update({ status }).eq('id', id);
  if (error) return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  return NextResponse.json({ ok: true });
}
