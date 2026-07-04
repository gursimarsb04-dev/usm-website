import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { ADMIN_COOKIE } from '@/lib/admin-session';

export async function POST(req: Request) {
  if (cookies().get(ADMIN_COOKIE)?.value !== '1') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { currentPassword, newUsername, newPassword } = await req.json();

  const sb = supabaseAdmin();
  const { data } = await sb.from('admin_config').select('username, password').eq('id', 1).single();

  const storedPassword = data?.password ?? (process.env.ADMIN_PASSWORD ?? 'usm2026');
  if (currentPassword !== storedPassword) {
    return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 });
  }

  const update: Record<string, string> = {};
  if (newUsername?.trim()) update.username = newUsername.trim();
  if (newPassword?.trim()) update.password = newPassword.trim();

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
  }

  const { error } = await sb.from('admin_config').update(update).eq('id', 1);
  if (error) return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  return NextResponse.json({ ok: true });
}
