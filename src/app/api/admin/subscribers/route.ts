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
    .from('newsletter_subscribers')
    .select('id, email, source, created_at')
    .order('created_at', { ascending: false });
  return NextResponse.json(data ?? []);
}
