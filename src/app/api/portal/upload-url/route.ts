import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { PORTAL_COOKIE } from '@/lib/portal-session';

export async function POST(req: Request) {
  const ssaId = cookies().get(PORTAL_COOKIE)?.value;
  if (!ssaId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const { filename } = await req.json();
  const path = `${ssaId}/wrapped/${Date.now()}-${filename}`;
  const { data, error } = await supabaseAdmin()
    .storage
    .from('ssa-photos')
    .createSignedUploadUrl(path);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ signedUrl: data.signedUrl, path, token: data.token });
}
