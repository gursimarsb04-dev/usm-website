import { notFound } from 'next/navigation';
import FadeUp from '@/components/FadeUp';
import { sanity, urlFor } from '@/lib/sanity';
import { programFallbacks } from '@/lib/program-fallbacks';

export const revalidate = 3600;

export default async function ProgramPage({ params }: { params: { slug: string } }) {
  let p: any = null;
  try {
    p = await sanity.fetch(
      `*[_type=="program" && slug.current==$slug][0]{title, pillar, tagline, description, coverImage, gallery}`,
      { slug: params.slug }
    );
  } catch {}
  if (!p) {
    const fb = programFallbacks.find((f) => f.slug === params.slug);
    if (!fb) notFound();
    // Render the fallback body as a single description block.
    p = { ...fb, description: [{ _type: 'block', children: [{ text: fb.body }] }] };
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <FadeUp>
        <p className="text-gold-deep font-display tracking-widest uppercase text-xs">{p.pillar}</p>
        <h1 className="font-display text-5xl font-bold text-teal mt-2">{p.title}</h1>
        {p.tagline && <p className="mt-2 text-xl text-teal-soft">{p.tagline}</p>}
        {p.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={urlFor(p.coverImage).width(1200).url()} alt={p.title}
            className="mt-8 rounded-3xl w-full" />
        ) : p.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.image} alt={p.title}
            className="mt-8 rounded-3xl w-full" />
        ) : null}
        <div className="prose mt-8 text-teal-ink/85 leading-relaxed">
          {/* Simple block renderer — interns can upgrade to @portabletext/react later */}
          {(p.description || []).map((block: any, i: number) =>
            block._type === 'block'
              ? <p key={i} className="mb-4">{block.children?.map((c: any) => c.text).join('')}</p>
              : null
          )}
        </div>

        {p.stats?.length > 0 && (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {p.stats.map((s: any) => (
              <div key={s.label} className="rounded-2xl bg-mist border border-teal/10 p-5 text-center">
                <div className="font-display text-3xl font-semibold text-teal">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-teal-soft leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {p.testimonial && (
          <blockquote className="mt-8 rounded-3xl bg-teal text-white p-7">
            <p className="font-display text-lg leading-relaxed">“{p.testimonial}”</p>
            <footer className="mt-3 text-sm text-gold">— A USM student</footer>
          </blockquote>
        )}
      </FadeUp>
    </div>
  );
}
