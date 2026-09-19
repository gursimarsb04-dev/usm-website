import { cookies } from 'next/headers';
import { supabaseAdmin } from './supabase-admin';

export const ADMIN_COOKIE = 'usm_admin_session';

export function getAdminSession(): boolean {
  return cookies().get(ADMIN_COOKIE)?.value === '1';
}

export async function validateAdminCredentials(username: string, password: string): Promise<boolean> {
  // Wrapped defensively: supabaseAdmin() throws synchronously (not a rejected
  // promise) when Supabase env vars aren't configured, which used to crash
  // this route with an opaque 500 instead of falling through to the env-var
  // credentials below — the exact same class of bug fixed in /api/register.
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { data } = await supabaseAdmin()
        .from('admin_config')
        .select('username, password')
        .eq('id', 1)
        .single();
      if (data) {
        return username === data.username && password === data.password;
      }
    }
  } catch (err) {
    console.error('admin_config lookup failed, falling back to env vars:', err);
  }
  // Fallback to env vars if Supabase isn't configured, the table row is
  // missing, or the lookup failed for any other reason.
  return (
    username === (process.env.ADMIN_USERNAME ?? 'admin') &&
    password === (process.env.ADMIN_PASSWORD ?? 'usm2026')
  );
}
