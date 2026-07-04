import { notFound } from 'next/navigation';
import FadeUp from '@/components/FadeUp';
import Phulkari from '@/components/Phulkari';
import { supabasePublic } from '@/lib/supabase-public';

export const revalidate = 300;

export default async function ProgramsPage({ params }: { params: { slug: string } }) {
  const { data: ssa } = await supabasePublic()
    .from('ssas')
    .select('id, name, slug, status, programs_content')
    .eq('slug', params.slug)
    .single();
  if (!ssa || ssa.status !== 'live') notFound();

  return (
    <>
      <section className="bg-teal text-white py-16">
        <FadeUp className="mx-auto max-w-wrap px-5">
          <p className="text-gold font-display tracking-widest uppercase text-xs">Programs</p>
          <h1 className="font-display text-4xl font-bold mt-2">{ssa.name}</h1>
        </FadeUp>
      </section>
      <Phulkari className="text-teal/15" />
      <div className="mx-auto max-w-wrap px-5 py-14">
        {ssa.programs_content ? (
          <FadeUp>
            <div className="max-w-2xl text-teal-ink/80 leading-relaxed whitespace-pre-line text-[15px]">
              {ssa.programs_content}
            </div>
          </FadeUp>
        ) : (
          <p className="text-teal-soft">No programs listed yet — check back soon.</p>
        )}
      </div>
    </>
  );
}
