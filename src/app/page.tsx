import Link from 'next/link';
import Button from '@/components/Button';
import FadeUp from '@/components/FadeUp';
import StatCounter from '@/components/StatCounter';
import Phulkari from '@/components/Phulkari';
import EventCard from '@/components/EventCard';
import ChapterMarquee from '@/components/ChapterMarquee';
import Parallax from '@/components/Parallax';
import Card from '@/components/Card';
import EmptyState from '@/components/EmptyState';
import { Section, Eyebrow, SectionHeading } from '@/components/Section';
import { supabasePublic } from '@/lib/supabase-public';
import { SSA_COLLECTIVE_FORM_URL } from '@/lib/site';

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
    body: '13Hacks, LSAT prep with 97th-percentile Sikh mentors, speaker panels nationwide and more, connecting you to Sikh professionals and opportunities to build your skills across every industry.',
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
        {/* Real hero photo — 7th Annual Inter-SSA Conference sangat.
            Parallax drifts it slowly as you scroll off the hero. */}
        <Parallax speed={0.25} className="absolute inset-0">
          <div
            aria-hidden
            className="absolute inset-0 scale-110 bg-cover bg-center"
            style={{ backgroundImage: "url('/photos/hero.jpg')" }}
          />
        </Parallax>
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
          <FadeUp variant="left" delay={0}>
            <p className="text-gold font-display tracking-widest uppercase text-sm mb-5 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-gold floaty" aria-hidden />
              United Sikh Movement
            </p>
          </FadeUp>
          <FadeUp variant="up" delay={120}>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] max-w-3xl">
              Success and Sikhi.
              <br />
              <span className="text-gold">Never one or the other.</span>
            </h1>
          </FadeUp>
          <FadeUp variant="up" delay={260}>
            <p className="mt-6 max-w-xl text-lg text-white/80 leading-relaxed">
              Sikh students are navigating systems that were never built with
              them in mind — searching for sangat, mentors who get it, and a
              community that follows them beyond graduation. USM is the national
              ecosystem that changes that. 40 chapters. Mentors in every field.
              A movement behind you.
            </p>
          </FadeUp>
          <FadeUp variant="up" delay={400}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/ssas">Find Your Sangat</Button>
              <Button
                href="/start-an-ssa"
                variant="ghost"
                className="!border-white !text-white hover:!bg-white hover:!text-teal"
              >
                Start an SSA
              </Button>
              <Button
                href={SSA_COLLECTIVE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                className="!border-white !text-white hover:!bg-white hover:!text-teal"
              >
                Join the Network
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CHAPTER MARQUEE: proof of scale you can feel ── */}
      <ChapterMarquee />

      {/* ── PROOF: the numbers, counting up ──
          Full-bleed gold band, oversized numerals — a confident claim rather
          than a small data table. Mobbin ref: Employment Hero
          https://mobbin.com/sites/sections/3ca84297-a513-46e4-a14a-d7170df4a1ff */}
      <Section tone="gold">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {[
            { value: 40, label: 'SSAs in the network' },
            { value: 100, suffix: '+', label: 'Leaders trained annually' },
            { value: 95, suffix: '%', label: 'SSA leaders more confident after USM' },
            { value: 2500, suffix: '+', label: 'Students reached annually' },
          ].map((s, i) => (
            <FadeUp key={s.label} variant="scale" delay={i * 120}>
              <StatCounter value={s.value} suffix={s.suffix} label={s.label} size="band" />
            </FadeUp>
          ))}
        </div>
      </Section>

      <Phulkari className="text-teal/15" />

      {/* ── PILLARS ── */}
      {pillars.map((p, i) => (
        <Section key={p.title} tone={i % 2 ? 'mist' : 'sand'} size="feature">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeUp variant={i % 2 ? 'right' : 'left'} className={i % 2 ? 'md:order-2' : ''}>
              <Eyebrow className="mb-3">{p.title}</Eyebrow>
              <SectionHeading size="lg">{p.line}</SectionHeading>
              <p className="mt-5 text-lg text-teal-ink/80 leading-relaxed max-w-md">{p.body}</p>
              <Link
                href={p.href}
                className="inline-block mt-6 font-semibold text-teal underline decoration-gold decoration-2 underline-offset-8 hover:text-gold-deep"
              >
                Explore →
              </Link>
            </FadeUp>
            {/* Real pillar photo — reveals with a soft scale + clip */}
            <FadeUp
              variant="scale"
              delay={140}
              className="aspect-[4/3] rounded-3xl bg-teal-soft relative overflow-hidden shadow-sm group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.img}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-ink/40 to-transparent" />
            </FadeUp>
          </div>
        </Section>
      ))}

      {/* ── RECEIPTS: students are the catalyst ── */}
      <Section tone="teal" size="feature">
        <FadeUp>
          <Eyebrow inverse className="mb-3">This year alone</Eyebrow>
          <SectionHeading size="lg" inverse className="max-w-2xl leading-tight">
            Sikh youth are not waiting for change. They are the catalyst for it.
          </SectionHeading>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {receipts.map((r, i) => (
              <FadeUp key={r.what} variant={i % 2 ? 'right' : 'left'} delay={(i % 2) * 80}>
                <Card tone="inverse" interactive className="h-full">
                  <p className="font-display font-semibold text-lg leading-snug">{r.what}</p>
                  <p className="mt-2 text-sm text-gold">{r.who}</p>
                </Card>
              </FadeUp>
            ))}
          </div>
          <p className="mt-8 text-white/70 max-w-xl">
            From reflection rooms to resolutions, none of it came from the top
            down. It came from students who showed up — with the movement
            behind them. <Link href="/impact" className="text-gold underline underline-offset-4">See the full impact →</Link>
          </p>
        </FadeUp>
      </Section>

      {/* ── BEYOND CAMPUS: Khudrang Roots ── */}
      <Section tone="sand" size="feature">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeUp variant="left">
            <Eyebrow className="mb-3">Khudrang Roots</Eyebrow>
            <SectionHeading size="lg">
              Where students grow, Punjab thrives.
            </SectionHeading>
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
          </FadeUp>
          <FadeUp variant="right" delay={120} className="aspect-[4/3] rounded-3xl overflow-hidden">
            <div
              className="w-full h-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/photos/khudrang-roots-logo.jpg')", backgroundColor: '#1D3F62' }}
            />
          </FadeUp>
        </div>
      </Section>

      {/* ── UPCOMING EVENTS ── */}
      <Section tone="mist" size="feature">
        <FadeUp>
          <SectionHeading>Happening soon</SectionHeading>
          {events.length > 0 ? (
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {events.map((e, i) => (
                <FadeUp key={e.id} variant="rise" delay={i * 120}>
                  <EventCard event={e} />
                </FadeUp>
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-8"
              title="No events on the calendar right now"
              body="New chapter and national events are added throughout the year — subscribe to the calendar so the next one lands in your phone automatically."
              actionLabel="See all events →"
              actionHref="/events"
            />
          )}
        </FadeUp>
      </Section>

      {/* ── FINAL CTA ──
          Kept as a raw <section> rather than <Section>: the texture layer is
          full-bleed, and Section's inner max-w-wrap container would clip it. */}
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
          <SectionHeading size="lg" inverse>Join the movement.</SectionHeading>
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
