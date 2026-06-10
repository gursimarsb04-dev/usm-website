import FadeUp from '@/components/FadeUp';
import Phulkari from '@/components/Phulkari';
import Button from '@/components/Button';

export const metadata = { title: 'About' };

export default function About() {
  return (
    <>
      <section className="bg-teal text-white py-24">
        <FadeUp className="mx-auto max-w-3xl px-5">
          <p className="text-gold font-display tracking-widest uppercase text-xs">Our story</p>
          <h1 className="font-display text-5xl font-bold mt-3 leading-tight">
            Sikh students shouldn't have to choose between success and Sikhi.
          </h1>
        </FadeUp>
      </section>
      <Phulkari className="text-teal/15" />

      <section className="mx-auto max-w-3xl px-5 py-16 space-y-6 text-lg text-teal-ink/85 leading-relaxed">
        <FadeUp>
          {/* TODO(interns): replace with the real founding story — when, where, who, why.
              The current site never filled this in. Don't ship without it. */}
          <p>
            United Sikh Movement started with a simple observation: Sikh students
            across the country were navigating the same challenge alone — building
            careers and futures while staying grounded in their identity.
          </p>
          <p className="mt-5">
            Today USM connects 75 Sikh Student Associations across North America,
            making it the largest Sikh student network in America and the second
            largest globally. We build around Simran, Seva, Sangat, and Academics —
            because excellence and faith were never opposites.
          </p>
        </FadeUp>
        <FadeUp className="pt-8">
          <h2 className="font-display text-3xl font-bold text-teal">Leadership</h2>
          {/* TODO(interns): team grid — names, roles, photos from Dropbox */}
          <p className="mt-3 text-base text-teal-soft">Team section coming with the photo sort.</p>
        </FadeUp>
        <FadeUp className="pt-6 text-center">
          <Button href="/ssas">Find Your SSA</Button>
        </FadeUp>
      </section>
    </>
  );
}
