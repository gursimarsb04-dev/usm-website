import FadeUp from '@/components/FadeUp';
import Phulkari from '@/components/Phulkari';
import Button from '@/components/Button';
import { supabasePublic } from '@/lib/supabase-public';

export const metadata = { title: 'About' };
export const revalidate = 300;

const fourS = [
  { s: 'Simran', body: 'Remembrance at the center — prayer, reflection, and a connection to Maharaj that grounds everything else.' },
  { s: 'Seva', body: 'Selfless service, from langar on campus to boots on the ground in Punjab. The work is the worship.' },
  { s: 'Sangat', body: 'Community that holds you. No Sikh student should have to build it alone — so we built it together.' },
  { s: 'Academics', body: 'Excellence as a form of seva. Mentorship, LSAT prep, hackathons, and career mentorship — ambition rooted in identity.' },
];

export default async function About() {
  let ssaCount = 85; // fallback if the count query fails
  try {
    const { count } = await supabasePublic()
      .from('ssas')
      .select('*', { count: 'exact', head: true })
      .neq('status', 'inactive');
    if (count) ssaCount = count;
  } catch {}
  return (
    <>
      <section className="bg-teal text-white py-24 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14 2 L26 14 L14 26 L2 14 Z' fill='none' stroke='%23F5D78C' stroke-width='1'/%3E%3C/svg%3E\")",
          }}
        />
        <FadeUp className="relative mx-auto max-w-3xl px-5">
          <p className="text-gold font-display tracking-widest uppercase text-xs">Our story</p>
          <h1 className="font-display text-5xl font-bold mt-3 leading-tight">
            It started with four students who wanted more for SSAs.
          </h1>
        </FadeUp>
      </section>
      <Phulkari className="text-teal/15" />

      <section className="mx-auto max-w-3xl px-5 py-16 space-y-6 text-lg text-teal-ink/85 leading-relaxed">
        <FadeUp>
          <p>
            Sikh students across California were carrying the same weight alone:
            excelling in class while staying true to their identity, searching
            for mentors who understood their journey, building careers without
            compromising their values. The Sikh Student Associations existed —
            but each one was an island.
          </p>
          <p className="mt-5">
            So a handful of students decided the islands should be a network.
            What began as Southern California SSAs gathering for divaans and
            conferences became United Sikh Movement — today{' '}
            <strong className="text-teal">40 active chapters, {ssaCount} SSAs in the
            network</strong>, the largest Sikh student network in America and
            the second largest in the world.
          </p>
          <p className="mt-5">
            This year alone, USM invested $13,000+ directly into Sikh students —
            SSA chapter funds, leadership trainings, regional events, speaker
            tours, awareness training for university administrators, and
            programming to enrich Sikh life on campus. We are not just supporting
            the system. We are shaping it.
          </p>
          <p className="mt-5">
            What started as a local network became an ecosystem. Today USM
            doesn't just connect SSAs — it invests in them, builds leaders
            within them, and surrounds Sikh youth with the mentorship,
            programming, and community they need to thrive in every arena they
            enter. From the largest Sikh hackathon in America to Gurbani
            workshops on UC campuses, USM is building something no one built
            for us.
          </p>
        </FadeUp>

        <FadeUp className="pt-10">
          <p className="text-gold-deep font-display tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rotate-45 bg-gold" aria-hidden />
            The four pillars
          </p>
          <h2 className="font-display text-3xl font-bold text-teal">
            Simran. Seva. Sangat. Academics.
          </h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {fourS.map((p) => (
              <div key={p.s} className="rounded-2xl bg-white border border-teal/10 p-6">
                <h3 className="font-display text-xl font-bold text-teal">{p.s}</h3>
                <p className="mt-2 text-base text-teal-ink/75 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp className="pt-10">
          <div className="rounded-3xl bg-teal text-white p-8">
            <p className="text-gold font-display tracking-widest uppercase text-xs mb-3">Our mission</p>
            <p className="font-display text-xl leading-relaxed">
              USM is a national ecosystem forging the next generation of Sikh
              youth through Gurmat-rooted leadership, professional mentorship,
              and transformative community programming. By deepening roots and
              expanding what Sikh excellence looks like, we are sparking a
              movement of Sikh changemakers who carry Gurmat into every arena
              they enter.
            </p>
          </div>
        </FadeUp>

        <FadeUp className="pt-8">
          <h2 className="font-display text-3xl font-bold text-teal">Leadership</h2>
          <div className="mt-5 rounded-2xl bg-white border border-teal/10 p-6 flex items-center gap-5">
            {/* TODO(interns): headshot from Flickr */}
            <div className="w-16 h-16 rounded-full bg-mist shrink-0 grid place-items-center font-display font-bold text-teal">HK</div>
            <div>
              <div className="font-display font-bold text-teal-ink text-lg">Harsimran Kaur</div>
              <div className="text-sm text-teal-soft">Executive Director</div>
            </div>
          </div>
          {/* TODO(interns): full team grid — names, roles, photos, pending roster from Simar */}
          <p className="mt-4 text-base text-teal-soft">
            Behind her: regional teams across the West Coast, Midwest, and East
            Coast, and student sevadaars on 40 campuses. USM is 100%
            volunteer-led — every dollar goes straight to students.
          </p>
        </FadeUp>

        <FadeUp className="pt-6 text-center">
          <Button href="/ssas">Find Your Sangat</Button>
        </FadeUp>
      </section>
    </>
  );
}
