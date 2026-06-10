// The donor page's best friend: numbers + stories, link this everywhere.
import FadeUp from '@/components/FadeUp';
import Button from '@/components/Button';
import Phulkari from '@/components/Phulkari';
import { getImpactStats } from '@/lib/sanity';

export const revalidate = 3600;
export const metadata = { title: 'Our Impact' };

export default async function Impact() {
  let stats: { label: string; value: string }[] = [];
  try { stats = await getImpactStats(); } catch {}
  if (stats.length === 0) {
    stats = [
      { label: 'SSAs nationwide', value: '75' },
      { label: 'Active chapters', value: '40' },
      { label: 'Leader retention', value: '77%' },
      { label: 'Students at our last summit', value: '150+' },
    ];
  }

  return (
    <>
      <section className="bg-teal text-white py-24 text-center">
        <FadeUp className="mx-auto max-w-2xl px-5">
          <p className="text-gold font-display tracking-widest uppercase text-xs">Annual Impact</p>
          <h1 className="font-display text-5xl font-bold mt-3">What the movement built this year</h1>
        </FadeUp>
      </section>
      <Phulkari className="text-teal/15" />

      <section className="py-20 mx-auto max-w-wrap px-5">
        <FadeUp className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-5xl font-semibold text-teal">{s.value}</div>
              <div className="mt-1 text-sm uppercase tracking-widest text-teal-soft">{s.label}</div>
            </div>
          ))}
        </FadeUp>
        {/* TODO(interns): add 2-3 Humans of USM stories here, pulled from Sanity newsPost where isHumansOfUSM == true */}
      </section>

      <section className="py-16 text-center">
        <FadeUp>
          <h2 className="font-display text-3xl font-bold text-teal">Powered by sangat like you</h2>
          <Button href="/donate" className="mt-6">Support the Movement</Button>
        </FadeUp>
      </section>
    </>
  );
}
