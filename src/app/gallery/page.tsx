import FadeUp from '@/components/FadeUp';
import Phulkari from '@/components/Phulkari';
import { GALLERY_ALBUMS } from '@/lib/site';

export const metadata = { title: 'Gallery' };

export default function Gallery() {
  return (
    <>
      <section className="bg-teal text-white py-20 text-center">
        <FadeUp className="mx-auto max-w-2xl px-5">
          <p className="text-gold font-display tracking-widest uppercase text-xs">Moments &amp; memories</p>
          <h1 className="font-display text-5xl font-bold mt-3">Gallery</h1>
          <p className="mt-4 text-white/80 leading-relaxed">
            Camps, conferences, retreats, and sangat from across the country.
            Tap an album to see the full set on Flickr.
          </p>
        </FadeUp>
      </section>
      <Phulkari className="text-teal/15" />

      <section className="py-16 mx-auto max-w-wrap px-5">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_ALBUMS.map((a, i) => (
            <FadeUp key={a.title} variant="rise" delay={(i % 3) * 100}>
              <a
                href={a.flickr}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-3xl overflow-hidden bg-teal-soft shadow-sm border border-teal/10 hover:border-gold transition-colors"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.cover}
                    alt={a.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-ink/70 via-teal-ink/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h2 className="font-display text-lg font-bold text-white">{a.title}</h2>
                    {a.blurb && <p className="text-sm text-white/80 mt-0.5">{a.blurb}</p>}
                  </div>
                  <span className="absolute top-4 right-4 rounded-full bg-white/90 text-teal-ink text-xs font-semibold px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    View on Flickr →
                  </span>
                </div>
              </a>
            </FadeUp>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-teal-soft">
          More albums are added after every event — follow along on{' '}
          <a href="https://www.instagram.com/unitedsikhmovement/" target="_blank" rel="noreferrer"
            className="underline hover:text-teal">Instagram</a>.
        </p>
      </section>
    </>
  );
}
