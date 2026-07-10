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
    body: 'Camp Kudrat, Gurbani workshops, Gurmat Sangeet, and the Salok Mahala 9 series — immersive spaces for Sikh youth to go deeper in their Sikhi alongside people who are on the same path.',
    href: '/programs',
    img: '/photos/pillar-sikhi.jpg',
  },
  {
    title: 'Professional Development',
    line: 'Learn from Sikhs who made it.',
    body: '13Hacks, the Safal Summit, LSAT prep with 97th-percentile Sikh mentors, case competitions, and the Fateh Collective mentorship platform connecting you to Sikh professionals in every industry — because you shouldn’t have to choose between your career and your values.',
    href: '/programs',
    img: '/photos/pillar-professional.jpg',
  },
  {
    title: 'SSA Network',
    line: '40 chapters. One sangat.',
    body: 'We are the backbone behind 40 Sikh Student Associations coast to coast — providing leadership retreats, regional conferences, funding, resources, and a national network so every SSA can thrive, not just survive.',
    href: '/ssas',
    img: '/photos/pillar-network.jpg',
  },
];

const receipts = [
  { what: 'Interfaith reflection room opened at UCSB', who: 'UCSB SSA × MSA' },
  { what: 'Student government resolution recognizing 1984 passed', who: 'UCI SSA' },
  { what: '20+ students in free LSAT prep with top-10% mentors', who: 'USM × Sikh Legal Society' },
  { what: 'Sikh awareness trainings scheduled for UC & CSU admins', who: 'USM Advocacy' },
  { what: '4 teams from 13Hacks are now building startups', who: '13Hacks · Sikh Innovation Sprint' },
  { what: '9 USM staff members have taken Amrit, crediting USM sangat as part of their journey', who: 'Sikhi Development' },
];

export default async function Home() {
  let events: any[] = [];
  let ssaCount = 85; // fallback if the count query fails
  try {
    const sb = supabasePublic();
    const { data } = await sb
      .from('events')
      .select('*')
      .gte('starts_at', new Date().toISOString())
      .order('starts_at')
      .limit(3);
    events = data ?? [];
    const { count } = await sb
      .from('ssas')
      .select('*', { count: 'exact', head: true })
      .neq('status', 'inactive');
    if (count) ssaCount = count;
  } catch {}

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[88vh] flex items-center bg-teal text-white overflow-hidden">
        {/* Real hero photo — 7th Annual Inter-SSA Conference sangat */}
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/photos/hero.jpg')" }}
        />
        {/* Teal gradient overlay keeps the headline readable over the photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-ink/95 via-teal-ink/75 to-teal/40" />
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
              Sikh students are navigating systems that were never built with
              them in mind — searching for sangat, mentors who get it, and a
              community that follows them beyond graduation. USM is the national
              ecosystem that changes that. 40 chapters. Mentors in every field.
              A movement behind you.
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
        <FadeUp className="mx-auto max-w-wrap px-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-10">
          <StatCounter value={40} label="Active chapters" />
          <StatCounter value={ssaCount} label="SSAs in the network" />
          <StatCounter value={95} suffix="%" label="SSA leaders more confident after USM" />
          <StatCounter value={13000} prefix="$" suffix="+" label="Invested in students this year" />
          <StatCounter value={2500} suffix="+" label="Students reached annually" />
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
            {/* Real pillar photo */}
            <div className="aspect-[4/3] rounded-3xl bg-teal-soft relative overflow-hidden shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.img}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-ink/40 to-transparent" />
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
              This is what it looks like when Gurmat principles meet real-world
              seva.
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
          <h2 className="font-display text-4xl md:text-5xl font-bold">Join the movement.</h2>
          <p className="mt-4 text-white/75">
            Whether you're a student looking for sangat, an SSA seeking support,
            or a professional ready to give back — there is a place for you in
            USM.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Button href="/ssas">Find Your SSA</Button>
            <Button
              href="/donate"
              variant="ghost"
              className="!border-gold !text-gold hover:!bg-gold hover:!text-teal-ink"
            >
              Support Our Work
            </Button>
            <Button
              href="mailto:info@unitedsikhmovement.org?subject=Becoming%20a%20USM%20Mentor"
              variant="ghost"
              className="!border-white !text-white hover:!bg-white hover:!text-teal"
            >
              Become a Mentor
            </Button>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
