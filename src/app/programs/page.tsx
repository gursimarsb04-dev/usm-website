import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import { getPrograms, urlFor } from '@/lib/sanity';
import { programFallbacks, spiritualImpact } from '@/lib/program-fallbacks';

export const revalidate = 3600;
export const metadata = { title: 'Programs' };

const pillarOrder = ['Sikhi Development', 'Professional Development', 'SSA Network'];

export default async function Programs() {
  let programs: any[] = [];
  try { programs = await getPrograms(); } catch {}
  if (!programs || programs.length === 0) programs = programFallbacks;

  return (
    <div className="mx-auto max-w-wrap px-5 py-16">
      <FadeUp>
        <h1 className="font-display text-5xl font-bold text-teal">Programs</h1>
        <p className="mt-3 text-lg text-teal-ink/75 max-w-xl">
          Three pillars. One mission: Sikh students who excel without leaving their Sikhi at the door.
        </p>
      </FadeUp>

      {pillarOrder.map((pillar) => {
        const items = programs.filter((p) => p.pillar === pillar);
        if (!items.length) return null;
        return (
          <FadeUp key={pillar} className="mt-14">
            <h2 className="font-display text-xs uppercase tracking-[0.25em] text-gold-deep mb-5">{pillar}</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {items.map((p) => (
                <Link key={p.slug} href={`/programs/${p.slug}`}
                  className="group rounded-3xl bg-white border border-teal/10 overflow-hidden hover:border-gold transition-colors">
                  <div className="aspect-[16/8] bg-mist overflow-hidden">
                    {p.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={urlFor(p.coverImage).width(800).height(400).url()} alt=""
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" />
                    ) : p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt=""
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" />
                    ) : null}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-teal-ink">{p.title}</h3>
                    {p.tagline && <p className="text-teal-soft text-sm mt-1">{p.tagline}</p>}
                  </div>
                </Link>
              ))}
            </div>

            {/* Spiritual-impact callout — lives under Sikhi Development */}
            {pillar === 'Sikhi Development' && (
              <div className="mt-8 rounded-3xl bg-teal text-white p-8">
                <p className="text-gold font-display tracking-widest uppercase text-xs mb-5">
                  The Sikhi impact, in numbers
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {spiritualImpact.map((s) => (
                    <div key={s.label}>
                      <div className="font-display text-4xl font-semibold text-gold">{s.value}</div>
                      <div className="mt-1 text-sm text-white/80 leading-snug">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </FadeUp>
        );
      })}
    </div>
  );
}
