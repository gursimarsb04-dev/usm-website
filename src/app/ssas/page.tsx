// SSA Directory: the map is the page. Every pin = proof of scale.
import SSAMap from '@/components/SSAMap';
import FadeUp from '@/components/FadeUp';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { PageHeader, SectionHeading } from '@/components/Section';
import { supabasePublic } from '@/lib/supabase-public';
import { SSA_PUBLIC_COLUMNS } from '@/lib/ssa-columns';
import { SSA_COLLECTIVE_FORM_URL } from '@/lib/site';
import { ssaFallbacks } from '@/lib/ssa-fallback';
import type { SSA } from '@/lib/types';

export const revalidate = 300;
export const metadata = { title: 'Find Your SSA' };

export default async function SSADirectory() {
  let ssas: SSA[] = [];
  try {
    const sb = supabasePublic();
    const { data } = await sb.from('ssas').select(SSA_PUBLIC_COLUMNS).neq('status', 'inactive').order('name');
    ssas = (data as unknown as SSA[]) ?? [];
  } catch {}
  // No DB configured yet, or table is empty — fall back to the known roster
  // so the map and directory show every chapter regardless.
  if (ssas.length === 0) ssas = ssaFallbacks;

  return (
    <div className="mx-auto max-w-wrap px-5 py-16">
      <FadeUp>
        <PageHeader
          title="Find your SSA"
          intro={`${ssas.length} active Sikh Student Association chapters across the nation. Gold pins are chapters with live pages — tap yours.`}
        />
      </FadeUp>

      <FadeUp className="mt-10">
        <SSAMap ssas={ssas} />
      </FadeUp>

      {/* List view for accessibility + SEO */}
      <FadeUp className="mt-14">
        <SectionHeading className="mb-5">All chapters</SectionHeading>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {/* Every chapter links to its page; unclaimed ones just note that
              their board can still claim and fill it in. */}
          {ssas.map((s) => (
            <Card key={s.id} href={`/ssas/${s.slug}`} className="p-4" padded={false}>
              <div className="font-display font-semibold text-teal-ink">{s.name}</div>
              <div className="text-sm text-teal-soft">{s.school}</div>
              {s.status !== 'live' && (
                <div className="text-[11px] uppercase tracking-widest text-gold-deep mt-1">
                  Unclaimed
                </div>
              )}
            </Card>
          ))}
        </div>
      </FadeUp>

      <FadeUp className="mt-16 rounded-3xl bg-teal text-white p-10 text-center">
        <h2 className="font-display text-3xl font-bold">No SSA at your school?</h2>
        <p className="mt-2 text-white/75">We'll help you start one — starter kit included.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Button href="/start-an-ssa">Start an SSA</Button>
          <Button
            href={SSA_COLLECTIVE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            className="!border-white !text-white hover:!bg-white hover:!text-teal"
          >
            Join the Network
          </Button>
        </div>
      </FadeUp>
    </div>
  );
}
