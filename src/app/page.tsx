import Link from 'next/link';
import Button from '@/components/Button';
import FadeUp from '@/components/FadeUp';
import StatCounter from '@/components/StatCounter';
import Phulkari from '@/components/Phulkari';
import EventCard from '@/components/EventCard';
import ChapterMarquee from '@/components/ChapterMarquee';
import { supabasePublic } from '@/lib/supabase-public';

export const revalidate = 300;

const pillars = [
  {
    title: 'Sikhi Development',
    line: 'Stay rooted while you grow.',
    body: 'Camp Kudrat, Gurbani Study, and student-built spaces for kirtan and reflection — like the interfaith reflection room UCSB students opened this year.',
    href: '/programs',
  },
  {
    title: 'Professional Development',
    line: 'Learn from Sikhs who made it.',
    body: 'Safal Summit at the World Trade Center, the Kadam Career Panel, free LSAT prep with top-decile Sikh mentors, and the first Sikh-focused hackathon.',
    href: '/programs',
  },
  {
    title: 'SSA Network',
    line: '75 chapters. One sangat.',
    body: 'Regional teams from NorCal to the East Coast, $1,000 chapter stipends, leadership retreats, and a national conference — so no board builds alone.',
    href: '/ssas',
  },
];

const receipts = [
  { what: 'Interfaith reflection room opened at UCSB', who: 'UCSB SSA × MSA' },
  { what: 'Student government resolution recognizing 1984 passed', who: 'UCI SSA' },
  { what: '20+ students in free LSAT prep with top-10% mentors', who: 'USM × Sikh Legal Society' },
  { what: 'Sikh awareness trainings scheduled for UC & CSU admins', who: 'USM Advocacy' },
];

export default async function Home() {
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
      {/* ── HERO ── */}
      <section className="relative min-h-[88vh] flex items-center bg-teal text-white overflow-hidden">
        {/* TODO(interns): real hero photo from Flickr → /public/hero.jpg, gradient becomes overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-ink via-teal to-teal-soft" />
        {/* Signature texture, barely there */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14 2 L26 14 L14 26 L2 14 Z' fill='none' stroke='%23F5D78C' stroke-width='1'/%3E%3C/svg%3E\")",
          }}
        />
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
              Sikh students are constantly juggling — campus life on one side,
              staying grounded in Sikhi on the other. We built the ecosystem so
              you never have to pick: sangat on 75 campuses, mentors in every
              field, and a movement behind you.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/ssas">Find Your Sangat</Button>
              <Button
                href="/start-an-ssa"
                variant="ghost"
                className="!border-white !text-white hover:!bg-white hover:!text-teal"
              >
                Start an SSA
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CHAPTER MARQUEE: proof of scale you can feel ── */}
      <ChapterMarquee />

      {/* ── PROOF: the numbers, counting up ── */}
      <section className="py-20 bg-sand">
        <FadeUp className="mx-auto max-w-wrap px-5 grid grid-cols-2 md:grid-cols-4 gap-10">
          <StatCounter value={40} label="Active chapters" />
          <StatCounter value={75} label="SSAs in the network" />
          <StatCounter value={77} suffix="%" label="Leader retention" />
          <StatCounter value={12600} suffix="+" label="Invested in students this year ($)" />
        </FadeUp>
      </section>

      <Phulkari className="text-teal/15" />

      {/* ── PILLARS ── */}
      {pillars.map((p, i) => (
        <section key={p.title} className={`py-24 ${i % 2 ? 'bg-mist' : 'bg-sand'}`}>
          <FadeUp className="mx-auto max-w-wrap px-5 grid md:grid-cols-2 gap-12 items-center">
            <div className={i % 2 ? 'md:order-2' : ''}>
              <p className="text-gold-deep font-display tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rotate-45 bg-gold" aria-hidden />
                {p.title}
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-teal">{p.line}</h2>
              <p className="mt-5 text-lg text-teal-ink/80 leading-relaxed max-w-md">{p.body}</p>
              <Link
                href={p.href}
                className="inline-block mt-6 font-semibold text-teal underline decoration-gold decoration-2 underline-offset-8 hover:text-gold-deep"
              >
                Explore →
              </Link>
            </div>
            {/* TODO(interns): pillar photos from Flickr → /public/pillar-{1,2,3}.jpg */}
            <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-teal to-teal-soft relative overflow-hidden grid place-items-center">
              <div
                aria-hidden
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14 2 L26 14 L14 26 L2 14 Z' fill='none' stroke='%23F5D78C' stroke-width='1'/%3E%3C/svg%3E\")",
                }}
              />
              <span className="relative text-gold/80 font-display text-sm tracking-widest uppercase">
                {p.title} — photo coming
              </span>
            </div>
          </FadeUp>
        </section>
      ))}

      {/* ── RECEIPTS: students are the catalyst ── */}
      <section className="py-24 bg-teal text-white">
        <div className="mx-auto max-w-wrap px-5">
          <FadeUp>
            <p className="text-gold font-display tracking-widest uppercase text-xs mb-3">
              This year alone
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold max-w-2xl leading-tight">
              Sikh youth are not waiting for change. They are the catalyst for it.
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {receipts.map((r) => (
                <div key={r.what} className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <p className="font-display font-semibold text-lg leading-snug">{r.what}</p>
                  <p className="mt-2 text-sm text-gold">{r.who}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-white/70 max-w-xl">
              From reflection rooms to resolutions, none of it came from the top
              down. It came from students who showed up — with the movement
              behind them. <Link href="/impact" className="text-gold underline underline-offset-4">See the full impact →</Link>
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── BEYOND CAMPUS: Khudrang Roots ── */}
      <section className="py-24 bg-sand">
        <FadeUp className="mx-auto max-w-wrap px-5 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gold-deep font-display tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rotate-45 bg-gold" aria-hidden />
              Khudrang Roots
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-teal">
              Where students grow, Punjab thrives.
            </h2>
            <p className="mt-5 text-lg text-teal-ink/80 leading-relaxed max-w-md">
              A student-led initiative sending diaspora youth to Punjab — to
              listen to village leaders, families, and educators first, then
              build projects that last. Community-informed. Student-driven.
            </p>
            <a
              href="https://dvnetwork.org/projects/khudrang-roots"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-6 font-semibold text-teal underline decoration-gold decoration-2 underline-offset-8 hover:text-gold-deep"
            >
              Support the mission →
            </a>
          </div>
          {/* TODO(interns): Khudrang photo from the summer trip */}
          <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-teal to-teal-soft relative overflow-hidden grid place-items-center">
            <span className="text-gold/80 font-display text-sm tracking-widest uppercase">
              Punjab — photo coming
            </span>
          </div>
        </FadeUp>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      <section className="py-24 bg-mist">
        <div className="mx-auto max-w-wrap px-5">
          <FadeUp>
            <h2 className="font-display text-4xl font-bold text-teal">Happening soon</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {events.length > 0 ? (
                events.map((e) => <EventCard key={e.id} event={e} />)
              ) : (
                <p className="text-teal-soft md:col-span-3">
                  Safal Summit hits the World Trade Center June 19–21 — and the
                  fall calendar is loading.{' '}
                  <Link href="/events" className="underline">See all events →</Link>
                </p>
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 bg-teal text-white text-center relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14 2 L26 14 L14 26 L2 14 Z' fill='none' stroke='%23F5D78C' stroke-width='1'/%3E%3C/svg%3E\")",
          }}
        />
        <FadeUp className="relative mx-auto max-w-2xl px-5">
          <h2 className="font-display text-4xl md:text-5xl font-bold">Your sangat is waiting.</h2>
          <p className="mt-4 text-white/75">
            No Sikh student should have to build community alone — and with 40
            active chapters, you won't have to.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Button href="/ssas">Find Your SSA</Button>
            <Button
              href="/donate"
              variant="ghost"
              className="!border-gold !text-gold hover:!bg-gold hover:!text-teal-ink"
            >
              Give the Gift of Sangat
            </Button>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
