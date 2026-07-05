import { notFound } from 'next/navigation';
import FadeUp from '@/components/FadeUp';
import { sanity, urlFor } from '@/lib/sanity';
import { programFallbacks, programDescriptions } from '@/lib/program-fallbacks';

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
    p = { ...fb, description: [{ _type: 'block', children: [{ text: programDescriptions[params.slug] || '' }] }] };
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
      </FadeUp>
    </div>
  );
}
