// Portal home: what an SSA leader sees after login.
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { supabaseServer } from '@/lib/supabase-server';

export default async function Dashboard() {
  const sb = supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect('/portal/login');

  const { data: profile } = await sb
    .from('profiles')
    .select('full_name, role, ssas(name, slug, status)')
    .eq('id', user.id)
    .single();

  const ssa: any = profile?.ssas;

  const tools = [
    { href: '/portal/dashboard/page-editor', title: 'Edit your page', body: 'Description, board, joining instructions, photos.' },
    { href: '/portal/dashboard/events', title: 'Events', body: 'Post events — they appear on your page and the national calendar instantly.' },
    { href: '/portal/dashboard/wrapped', title: 'USM Wrapped', body: 'Submit your year — events, numbers, photos, one senior quote.' },
    { href: '/portal/dashboard/requests', title: 'Request support', body: 'Speakers, funding, board support, resources.' },
  ];

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-xs uppercase tracking-widest text-teal-soft">SSA Portal</p>
      <h1 className="font-display text-3xl font-bold text-teal mt-1">
        {ssa?.name || 'Your chapter'}
      </h1>
      {ssa?.status === 'live' ? (
        <Link href={`/ssas/${ssa.slug}`} className="text-sm text-teal underline underline-offset-4">
          View your public page →
        </Link>
      ) : (
        <p className="text-sm text-gold-deep font-medium mt-1">
          Your page isn't live yet — complete it in the editor and USM will publish it.
        </p>
      )}

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {tools.map((t) => (
          <Link key={t.href} href={t.href}
            className="rounded-2xl bg-white border border-teal/10 p-6 hover:border-gold transition-colors">
            <h2 className="font-display font-semibold text-teal-ink">{t.title}</h2>
            <p className="text-sm text-teal-ink/70 mt-1">{t.body}</p>
          </Link>
        ))}
      </div>

      {/* Gated resources, inline — leaders shouldn't hunt for them */}
      <div className="mt-10 rounded-2xl bg-gold/20 p-6">
        <h2 className="font-display font-semibold text-teal-ink">Leader resources</h2>
        <p className="text-sm text-teal-ink/70 mt-1">
          Funding templates, event playbooks, and chapter guides.
        </p>
        <Link href="/portal/dashboard/resources" className="inline-block mt-3 text-sm font-semibold text-teal underline underline-offset-4">
          Open the toolkit →
        </Link>
      </div>

      <form action="/portal/logout" method="post" className="mt-12">
        <button className="text-xs text-teal-soft underline">Sign out</button>
      </form>
    </div>
  );
}
