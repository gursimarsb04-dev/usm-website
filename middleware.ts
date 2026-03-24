import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  // Skip for API routes, Next.js internals, and static assets
  if (
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/admin') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Protect dashboard routes — require an auth session cookie
  if (url.pathname.startsWith('/dashboard')) {
    const token =
      request.cookies.get('next-auth.session-token') ||
      request.cookies.get('__Secure-next-auth.session-token');
    if (!token) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Extract subdomain
  // Production: rusikh.unitedsikhmovement.org
  // Development: rusikh.localhost:3000
  const currentHost = hostname.replace(':3000', '');

  let subdomain: string | null = null;

  if (currentHost.endsWith('.localhost')) {
    // Local dev: rusikh.localhost
    subdomain = currentHost.replace('.localhost', '');
  } else if (currentHost.includes('.')) {
    const parts = currentHost.split('.');
    // e.g. rusikh.unitedsikhmovement.org => 3 parts
    if (parts.length >= 3) {
      subdomain = parts[0];
    }
  }

  // Skip for apex domain, www, and admin subdomains
  if (!subdomain || subdomain === 'www' || subdomain === 'admin') {
    return NextResponse.next();
  }

  // Rewrite to the SSA site dynamic route
  url.pathname = `/ssa-site/${subdomain}${url.pathname === '/' ? '' : url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
