import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import FadeUp from '@/components/FadeUp';
import StatCounter from '@/components/StatCounter';
import Phulkari from '@/components/Phulkari';
import EventCard from '@/components/EventCard';
import { supabasePublic } from '@/lib/supabase-public';

export const revalidate = 300;

const pillars = [
  {
    title: 'Sikhi Development',
    line: 'Stay rooted while you grow.',
    body: 'Camp Kudrat, Gurbani Study, and spaces for kirtan and reflection on every campus.',
    href: '/programs',
  },
  {
    title: 'Professional Development',
    line: 'Learn from Sikhs who made it.',
    body: 'Safal Summit, the Kadam Career Panel, and mentorship from professionals across tech, finance, medicine, and law.',
    href: '/programs',
  },
  {
    title: 'SSA Network',
    line: '75 chapters. One sangat.',
    body: 'The National Conference, Leadership Retreat, and a coast-to-coast network of Sikh Student Associations.',
    href: '/ssas',
  },
];

export default async function Home() {
  // Upcoming events (graceful if Supabase isn't configured yet)
  let events: any[] = [];
  try {
    const sb = supabasePublic();
    const { data } = await sb
      .from('events')
      .select('*')
      .gte('starts_at', new Date().toISOString())
      .order('starts_at')
      .limit(3);
    events = data ?? [];
  } catch {}

  return (
    <>
      {/* ── HERO: one idea — you don't have to choose ── */}
      <section className="relative min-h-[88vh] flex items-center bg-teal text-white overflow-hidden">
        {/* TODO(interns): swap for a real hero photo from the sorted Dropbox → /public/hero.jpg */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-ink via-teal to-teal-soft opacity-95" />
        <div className="relative mx-auto max-w-wrap px-5 py-24">
          <FadeUp>
            <p className="text-gold font-display tracking-widest uppercase text-sm mb-5">
              United Sikh Movement
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] max-w-3xl">
              Success and Sikhi.
              <br />
              <span className="text-gold">Never one or the other.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80 leading-relaxed">
              The largest network of Sikh students in America — sangat, mentorship,
              and spiritual grounding across 75 campuses.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/ssas">Find Your SSA</Button>
              <Button href="/start-an-ssa" variant="ghost" className="!border-white !text-white hover:!bg-white hover:!text-teal">
                Start One
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── PROOF: the numbers, counting up ── */}
      <section className="py-20 bg-sand">
        <FadeUp className="mx-auto max-w-wrap px-5 grid grid-cols-2 md:grid-cols-4 gap-10">
          <StatCounter value={75} suffix="" label="SSAs nationwide" />
          <StatCounter value={40} suffix="" label="Active chapters" />
          <StatCounter value={77} suffix="%" label="Leader retention" />
          <StatCounter value={150} suffix="+" label="At our last summit" />
        </FadeUp>
      </section>

      <Phulkari className="text-teal/15" />

      {/* ── PILLARS: one per screen-ish, alternating ── */}
      {pillars.map((p, i) => (
        <section key={p.title} className={`py-24 ${i % 2 ? 'bg-mist' : 'bg-sand'}`}>
          <FadeUp className="mx-auto max-w-wrap px-5 grid md:grid-cols-2 gap-12 items-center">
            <div className={i % 2 ? 'md:order-2' : ''}>
              <p className="text-gold-deep font-display tracking-widest uppercase text-xs mb-3">
                {p.title}
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-teal">{p.line}</h2>
              <p className="mt-5 text-lg text-teal-ink/80 leading-relaxed max-w-md">{p.body}</p>
              <Link href={p.href} className="inline-block mt-6 font-semibold text-teal underline underline-offset-4 hover:text-gold-deep">
                Explore →
              </Link>
            </div>
            {/* TODO(interns): replace with pillar photos from Dropbox → /public/pillar-{1,2,3}.jpg */}
            <div className="aspect-[4/3] rounded-3xl bg-teal/10 grid place-items-center text-teal-soft font-display">
              Photo: {p.title}
            </div>
          </FadeUp>
        </section>
      ))}

      {/* ── UPCOMING EVENTS ── */}
      <section className="py-24 bg-sand">
        <div className="mx-auto max-w-wrap px-5">
          <FadeUp>
            <h2 className="font-display text-4xl font-bold text-teal">Happening soon</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {events.length > 0 ? (
                events.map((e) => <EventCard key={e.id} event={e} />)
              ) : (
                <p className="text-teal-soft md:col-span-3">
                  New events drop here all year. <Link href="/events" className="underline">See the full calendar →</Link>
                </p>
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 bg-teal text-white text-center">
        <FadeUp className="mx-auto max-w-2xl px-5">
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Your sangat is waiting.
          </h2>
          <p className="mt-4 text-white/75">
            Forty active chapters, and growing every semester.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Button href="/ssas">Find Your SSA</Button>
            <Button href="/donate" variant="ghost" className="!border-gold !text-gold hover:!bg-gold hover:!text-teal-ink">
              Support the Movement
            </Button>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
