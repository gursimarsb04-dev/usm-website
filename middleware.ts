import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Subdomain routing middleware.
 *
 * Only activates subdomain rewriting for:
 *   - *.unitedsikhmovement.org  (production)
 *   - *.localhost:3000           (local dev)
 *
 * All other hosts (Vercel preview URLs, custom domains without
 * subdomains, etc.) pass through untouched.
 */

const PRODUCTION_DOMAIN = 'unitedsikhmovement.org';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  // Skip for API routes, Next.js internals, admin panel, and static assets
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

  // --- Subdomain extraction (ONLY for known domains) ---
  const currentHost = hostname.replace(':3000', '');
  let subdomain: string | null = null;

  if (currentHost.endsWith('.localhost')) {
    // Local dev: rusikh.localhost
    subdomain = currentHost.replace('.localhost', '');
  } else if (currentHost.endsWith(`.${PRODUCTION_DOMAIN}`)) {
    // Production: rusikh.unitedsikhmovement.org
    subdomain = currentHost.replace(`.${PRODUCTION_DOMAIN}`, '');
  }

  // No subdomain detected, or it's www/admin → pass through normally
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
