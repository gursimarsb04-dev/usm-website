// The donor page's best friend: this year's receipts, in numbers and stories.
import FadeUp from '@/components/FadeUp';
import Button from '@/components/Button';
import Phulkari from '@/components/Phulkari';
import { getImpactStats } from '@/lib/sanity';
import { spiritualImpact } from '@/lib/program-fallbacks';

const testimonials = [
  {
    quote: 'Ever since Camp Kudrat my life has changed. I started doing Kirtan Sohila before sleeping and let go of my anxiety pills. When my parents saw the change in me, they also started following the Sikh path.',
    who: 'Camp Kudrat attendee',
  },
];

export const revalidate = 3600;
export const metadata = { title: 'Our Impact' };

const wins = [
  {
    title: 'The SRB Reflection Room — UCSB',
    body: "UCSB's SSA partnered with the Muslim Student Association to open a dedicated interfaith space on campus where students of all faiths can pray, reflect, and find refuge. It didn't come from the administration — it came from students who showed up.",
    tag: 'Student-led institutional change',
  },
  {
    title: 'UCI recognizes 1984',
    body: 'The UCI Student Government passed a formal resolution recognizing Operation Blue Star and standing in solidarity with the Sikh community — Sikh students showing up in civic spaces with history, clarity, and courage.',
    tag: 'Advocacy in action',
  },
  {
    title: 'Free LSAT prep, top-decile mentors',
    body: '20+ students receiving personalized LSAT preparation from five top-10th-percentile Sikh mentors, in partnership with the Sikh Legal Society. Law school starts with the LSAT — now there is sangat to tackle it with.',
    tag: 'USM × Sikh Legal Society',
  },
  {
    title: 'Khudrang Roots on the ground',
    body: 'Students traveled to Punjab to meet village leaders, families, and educators — listening first, building second. Community-informed, student-driven, built to last.',
    tag: 'Where students grow, Punjab thrives',
  },
];

export default async function Impact() {
  let stats: { label: string; value: string }[] = [];
  try { stats = await getImpactStats(); } catch {}
  if (stats.length === 0) {
    stats = [
      { label: 'Active chapters', value: '40' },
      { label: 'Students reached annually', value: '2,500+' },
      { label: 'Invested in students this year', value: '$13,000+' },
      { label: 'SSA leaders more confident after USM', value: '95%' },
    ];
  }

  return (
    <>
      <section className="bg-teal text-white py-24 text-center">
        <FadeUp className="mx-auto max-w-2xl px-5">
          <p className="text-gold font-display tracking-widest uppercase text-xs">Annual impact</p>
          <h1 className="font-display text-5xl font-bold mt-3">
            What the movement built this year
          </h1>
        </FadeUp>
      </section>
      <Phulkari className="text-teal/15" />

      <section className="py-20 mx-auto max-w-wrap px-5">
        <FadeUp className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl md:text-5xl font-semibold text-teal">{s.value}</div>
              <div className="mt-1 text-sm uppercase tracking-widest text-teal-soft">{s.label}</div>
            </div>
          ))}
        </FadeUp>

        <FadeUp className="mt-20 grid gap-6 md:grid-cols-2">
          {wins.map((w) => (
            <div key={w.title} className="rounded-3xl bg-white border border-teal/10 p-7">
              <p className="text-[11px] uppercase tracking-widest text-gold-deep font-semibold">{w.tag}</p>
              <h2 className="font-display text-xl font-bold text-teal-ink mt-2">{w.title}</h2>
              <p className="mt-3 text-teal-ink/75 leading-relaxed">{w.body}</p>
            </div>
          ))}
        </FadeUp>
        {/* TODO(interns): Humans of USM stories from Sanity (newsPost where isHumansOfUSM == true) */}

        <FadeUp className="mt-16 rounded-3xl bg-teal text-white p-8">
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
        </FadeUp>

        <FadeUp className="mt-10 grid gap-6 md:grid-cols-2 items-start">
          <div className="rounded-3xl bg-sand border border-teal/10 p-7">
            <p className="text-[11px] uppercase tracking-widest text-gold-deep font-semibold">
              Professional pipeline
            </p>
            <h2 className="font-display text-xl font-bold text-teal-ink mt-2">
              From hackathon to startups
            </h2>
            <p className="mt-3 text-teal-ink/75 leading-relaxed">
              4 teams from 13Hacks are now building startups — with 85.7% of
              participants reporting they gained a new skill. Proof that Sikhi
              and professional ambition belong in the same room.
            </p>
          </div>
          {testimonials.map((t) => (
            <blockquote key={t.who} className="rounded-3xl bg-white border border-teal/10 p-7">
              <p className="font-display text-lg text-teal-ink leading-relaxed">“{t.quote}”</p>
              <footer className="mt-3 text-sm text-gold-deep">— {t.who}</footer>
            </blockquote>
          ))}
        </FadeUp>
      </section>

      <section className="py-16 text-center">
        <FadeUp>
          <h2 className="font-display text-3xl font-bold text-teal">Powered by sangat like you</h2>
          <Button href="/donate" className="mt-6">Support Our Work</Button>
        </FadeUp>
      </section>
    </>
  );
}
