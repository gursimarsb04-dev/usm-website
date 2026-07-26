import Link from 'next/link';
import Image from 'next/image';
import FadeUp from '@/components/FadeUp';
import Card from '@/components/Card';
import { PageHeader } from '@/components/Section';
import { getPrograms, urlFor } from '@/lib/sanity';
import { programFallbacks } from '@/lib/program-fallbacks';

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
        <PageHeader
          title="Programs"
          intro="Three pillars. One mission: Sikh students who excel without leaving their Sikhi at the door."
        />
      </FadeUp>

      {pillarOrder.map((pillar) => {
        const items = programs.filter((p) => p.pillar === pillar && !p.hidden);
        if (!items.length) return null;
        return (
          <FadeUp key={pillar} className="mt-14">
            <h2 className="font-display text-xs uppercase tracking-[0.25em] text-gold-deep mb-5">{pillar}</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {items.map((p) => (
                <Card key={p.slug} href={`/programs/${p.slug}`} padded={false}>
                  {/* next/image: these were the heaviest assets on the site.
                      `sizes` tells Next to serve a ~half-width image on desktop
                      instead of the full source. alt="" is deliberate — the
                      program title renders directly beneath. */}
                  <div className="relative aspect-[16/8] bg-mist overflow-hidden">
                    {p.coverImage ? (
                      <Image
                        src={urlFor(p.coverImage).width(800).height(400).url()}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-[1.02] transition-transform"
                      />
                    ) : p.image ? (
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-[1.02] transition-transform"
                      />
                    ) : null}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-teal-ink">{p.title}</h3>
                    {p.tagline && <p className="text-teal-soft text-sm mt-1">{p.tagline}</p>}
                  </div>
                </Card>
              ))}
            </div>

          </FadeUp>
        );
      })}
    </div>
  );
}
