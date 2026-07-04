import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { PORTAL_COOKIE } from '@/lib/portal-session';

function getSSAId() {
  return cookies().get(PORTAL_COOKIE)?.value ?? null;
}

export async function GET() {
  const ssaId = getSSAId();
  if (!ssaId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const { data } = await supabaseAdmin()
    .from('events')
    .select('*')
    .eq('ssa_id', ssaId)
    .order('starts_at', { ascending: false });
  return NextResponse.json(data ?? []);
}

export async function POST(req: Request) {
  const ssaId = getSSAId();
  if (!ssaId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const body = await req.json();
  const sb = supabaseAdmin();

  const { data: event, error } = await sb
    .from('events')
    .insert({ ...body, ssa_id: ssaId })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  // Fetch SSA info and followers, then notify in the background
  const [{ data: ssa }, { data: follows }] = await Promise.all([
    sb.from('ssas').select('name, slug').eq('id', ssaId).single(),
    sb.from('ssa_follows').select('user_id').eq('ssa_id', ssaId),
  ]);

  if (ssa && follows && follows.length > 0) {
    const startsAt = new Date(body.starts_at);
    const dateStr = startsAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const notifications = follows.map((f: { user_id: string }) => ({
      user_id: f.user_id,
      title: `New event: ${body.title}`,
      body: `${ssa.name} posted a new event on ${dateStr}${body.location ? ` · ${body.location}` : ''}.`,
      link: `/ssas/${ssa.slug}`,
    }));
    await sb.from('notifications').insert(notifications);
  }

  return NextResponse.json(event);
}
