import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAdminSession } from '@/lib/admin-session';
import { supabaseAdmin } from '@/lib/supabase-admin';

export default async function AdminDashboard() {
  if (!getAdminSession()) redirect('/admin/login');

  const sb = supabaseAdmin();
  const [{ count: ssaCount }, { count: pendingCount }, { count: userCount }] = await Promise.all([
    sb.from('ssas').select('*', { count: 'exact', head: true }),
    sb.from('affiliation_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    sb.from('profiles').select('*', { count: 'exact', head: true }),
  ]);

  const cards = [
    { href: '/admin/dashboard/ssas', label: 'Manage SSAs', value: ssaCount ?? 0, sub: 'chapters' },
    { href: '/admin/dashboard/requests', label: 'Affiliation Requests', value: pendingCount ?? 0, sub: 'pending' },
    { href: '/admin/dashboard/ssas/new', label: 'Add New SSA', value: '+', sub: 'create chapter' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <p className="text-xs uppercase tracking-widest text-gold-deep font-semibold">USM Admin</p>
      <h1 className="font-display text-3xl font-bold text-teal mt-1">Admin Dashboard</h1>
      <p className="text-sm text-teal-soft mt-1">{userCount ?? 0} registered users across all chapters.</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {cards.map(c => (
          <Link key={c.href} href={c.href}
            className="rounded-2xl bg-white border border-teal/10 p-6 hover:border-gold transition-colors">
            <p className="text-3xl font-display font-bold text-teal">{c.value}</p>
            <p className="text-xs text-teal-soft mt-0.5">{c.sub}</p>
            <p className="font-display font-semibold text-teal-ink mt-3">{c.label} →</p>
          </Link>
        ))}
      </div>

      <form action="/admin/logout" method="post" className="mt-12">
        <button className="text-xs text-teal-soft underline">Sign out</button>
      </form>
    </div>
  );
}
