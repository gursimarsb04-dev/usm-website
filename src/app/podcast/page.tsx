import FadeUp from '@/components/FadeUp';
import { getPodcastEpisodes } from '@/lib/sanity';

export const revalidate = 600;
export const metadata = { title: 'Podcast' };

function ytId(url: string) {
  const m = url?.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
  return m?.[1];
}

export default async function Podcast() {
  let eps: any[] = [];
  try { eps = await getPodcastEpisodes(); } catch {}

  return (
    <div className="mx-auto max-w-wrap px-5 py-16">
      <FadeUp>
        <h1 className="font-display text-5xl font-bold text-teal">The USM Podcast</h1>
        <p className="mt-3 text-lg text-teal-ink/75 max-w-xl">
          Conversations with Sikhs building, leading, and figuring it out.
        </p>
      </FadeUp>
      <FadeUp className="mt-10 grid gap-8 md:grid-cols-2">
        {eps.map((e, i) => {
          const id = ytId(e.youtubeUrl);
          return (
            <div key={i}>
              {id && (
                <div className="aspect-video rounded-2xl overflow-hidden">
                  <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${id}`}
                    title={e.title} allowFullScreen loading="lazy" />
                </div>
              )}
              <h2 className="font-display font-semibold text-teal-ink mt-3">{e.title}</h2>
              {e.guest && <p className="text-sm text-teal-soft">with {e.guest}</p>}
            </div>
          );
        })}
        {eps.length === 0 && (
          <p className="text-teal-soft md:col-span-2">
            First episodes coming soon — built on the content calendar from this summer's internship.
          </p>
        )}
      </FadeUp>
    </div>
  );
}
