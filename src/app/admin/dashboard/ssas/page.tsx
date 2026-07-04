import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAdminSession } from '@/lib/admin-session';
import { supabaseAdmin } from '@/lib/supabase-admin';

const statusColor: Record<string, string> = {
  live: 'bg-green-100 text-green-800',
  unclaimed: 'bg-gray-100 text-gray-600',
  pending: 'bg-yellow-100 text-yellow-800',
  inactive: 'bg-red-100 text-red-700',
};

export default async function AdminSSAList() {
  if (!getAdminSession()) redirect('/admin/login');

  const { data: ssas } = await supabaseAdmin()
    .from('ssas')
    .select('id, slug, name, school, state, status, pin')
    .order('state', { ascending: true })
    .order('name', { ascending: true });

  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/dashboard" className="text-xs text-teal-soft underline">← Dashboard</Link>
          <h1 className="font-display text-3xl font-bold text-teal mt-2">All SSAs</h1>
          <p className="text-sm text-teal-soft">{ssas?.length ?? 0} chapters — login: username <code className="bg-teal/10 px-1 rounded">admin</code> + PIN</p>
        </div>
        <Link href="/admin/dashboard/ssas/new"
          className="rounded-full bg-gold px-5 py-2.5 text-sm font-display font-semibold text-teal-ink hover:bg-gold-deep transition-colors">
          + New SSA
        </Link>
      </div>

      <div className="mt-8 rounded-2xl bg-white border border-teal/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-teal/10 bg-mist/40">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-semibold text-teal-soft uppercase tracking-wide">Chapter</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-teal-soft uppercase tracking-wide">State</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-teal-soft uppercase tracking-wide">Status</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-teal-soft uppercase tracking-wide">PIN</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-teal/5">
            {ssas?.map(ssa => (
              <tr key={ssa.id} className="hover:bg-mist/30 transition-colors">
                <td className="px-5 py-3">
                  <p className="font-medium text-teal-ink">{ssa.name}</p>
                  <p className="text-xs text-teal-soft">{ssa.school}</p>
                </td>
                <td className="px-5 py-3 text-teal-soft">{ssa.state}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[ssa.status] ?? ''}`}>
                    {ssa.status}
                  </span>
                </td>
                <td className="px-5 py-3 font-mono font-semibold text-teal">{ssa.pin ?? '—'}</td>
                <td className="px-5 py-3 text-right">
                  <Link href={`/admin/dashboard/ssas/${ssa.id}`}
                    className="text-xs font-medium text-teal underline underline-offset-4">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
