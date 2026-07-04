import { NextResponse } from 'next/server';
import { validateAdminCredentials, ADMIN_COOKIE } from '@/lib/admin-session';

export async function POST(req: Request) {
  const { username, password } = await req.json();
  if (!(await validateAdminCredentials(username, password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, '1', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/',
  });
  return res;
}
