import { cookies } from 'next/headers';
import { supabaseAdmin } from './supabase-admin';

export const PORTAL_COOKIE = 'ssa_portal_session';

export function getPortalSSAId(): string | null {
  return cookies().get(PORTAL_COOKIE)?.value ?? null;
}

export async function getPortalSSA() {
  const id = getPortalSSAId();
  if (!id) return null;
  const { data } = await supabaseAdmin().from('ssas').select('*').eq('id', id).single();
  return data;
}
