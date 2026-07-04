import { cookies } from 'next/headers';
import { supabaseAdmin } from './supabase-admin';

export const ADMIN_COOKIE = 'usm_admin_session';

export function getAdminSession(): boolean {
  return cookies().get(ADMIN_COOKIE)?.value === '1';
}

export async function validateAdminCredentials(username: string, password: string): Promise<boolean> {
  const { data } = await supabaseAdmin()
    .from('admin_config')
    .select('username, password')
    .eq('id', 1)
    .single();

  if (data) {
    return username === data.username && password === data.password;
  }
  // Fallback to env vars if table row missing
  return (
    username === (process.env.ADMIN_USERNAME ?? 'admin') &&
    password === (process.env.ADMIN_PASSWORD ?? 'usm2026')
  );
}
