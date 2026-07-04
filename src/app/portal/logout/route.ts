import { NextResponse } from 'next/server';
import { PORTAL_COOKIE } from '@/lib/portal-session';

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL('/portal/login', req.url));
  res.cookies.delete(PORTAL_COOKIE);
  return res;
}
