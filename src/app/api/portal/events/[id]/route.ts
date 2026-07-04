import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { PORTAL_COOKIE } from '@/lib/portal-session';

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const ssaId = cookies().get(PORTAL_COOKIE)?.value;
  if (!ssaId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const { error } = await supabaseAdmin()
    .from('events')
    .delete()
    .eq('id', params.id)
    .eq('ssa_id', ssaId);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
