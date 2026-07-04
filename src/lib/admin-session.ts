import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'usm_admin_session';

export function getAdminSession(): boolean {
  return cookies().get(ADMIN_COOKIE)?.value === '1';
}

export function validateAdminCredentials(username: string, password: string): boolean {
  return (
    username === (process.env.ADMIN_USERNAME ?? 'admin') &&
    password === (process.env.ADMIN_PASSWORD ?? 'usm2026')
  );
}
