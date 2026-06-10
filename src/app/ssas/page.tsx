// SSA Directory: the map is the page. All 75 pins = proof of scale.
import SSAMap from '@/components/SSAMap';
import FadeUp from '@/components/FadeUp';
import Button from '@/components/Button';
import Link from 'next/link';
import { supabasePublic } from '@/lib/supabase-public';
import type { SSA } from '@/lib/types';

export const revalidate = 300;
export const metadata = { title: 'Find Your SSA' };

export default async function SSADirectory() {
  let ssas: SSA[] = [];
  try {
    const sb = supabasePublic();
    const { data } = await sb.from('ssas').select('*').neq('status', 'inactive').order('name');
    ssas = (data as SSA[]) ?? [];
  } catch {}

  const live = ssas.filter((s) => s.status === 'live');

  return (
    <div className="mx-auto max-w-wrap px-5 py-16">
      <FadeUp>
        <h1 className="font-display text-5xl font-bold text-teal">Find your SSA</h1>
        <p className="mt-3 text-lg text-teal-ink/75 max-w-xl">
          75 Sikh Student Associations across North America. Gold pins are
          chapters with live pages — tap yours.
        </p>
      </FadeUp>

      <FadeUp className="mt-10">
        <SSAMap ssas={ssas} />
      </FadeUp>

      {/* List view for accessibility + SEO */}
      <FadeUp className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-teal mb-5">All chapters</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ssas.map((s) =>
            s.status === 'live' ? (
              <Link key={s.id} href={`/ssas/${s.slug}`}
                className="rounded-xl bg-white border border-teal/10 p-4 hover:border-gold transition-colors">
                <div className="font-display font-semibold text-teal-ink">{s.name}</div>
                <div className="text-sm text-teal-soft">{s.school}</div>
              </Link>
            ) : (
              <div key={s.id} className="rounded-xl bg-mist/60 p-4">
                <div className="font-display font-semibold text-teal-ink/60">{s.name}</div>
                <div className="text-xs text-teal-soft">
                  On the network · <Link href="/portal/login" className="underline">claim your page</Link>
                </div>
              </div>
            )
          )}
          {ssas.length === 0 && (
            <p className="text-teal-soft sm:col-span-3">
              Chapter data loads from Supabase — run the seed script (README step 5).
            </p>
          )}
        </div>
      </FadeUp>

      <FadeUp className="mt-16 rounded-3xl bg-teal text-white p-10 text-center">
        <h2 className="font-display text-3xl font-bold">No SSA at your school?</h2>
        <p className="mt-2 text-white/75">We'll help you start one — starter kit included.</p>
        <Button href="/start-an-ssa" className="mt-6">Start an SSA</Button>
      </FadeUp>
    </div>
  );
}
