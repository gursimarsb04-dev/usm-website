import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import Phulkari from '@/components/Phulkari';
import SocialLinks from '@/components/SocialLinks';
import NewsletterSignup from '@/components/NewsletterSignup';
import { CONTACT_EMAIL, EIN } from '@/lib/site';

export const metadata = { title: 'Contact' };

const routes = [
  { who: 'Start a chapter', body: 'No SSA at your school? Apply and a coordinator reaches out within a week.', href: '/start-an-ssa', cta: 'Apply to start an SSA' },
  { who: 'Find your SSA', body: 'Already have a chapter? Find it on the map and get connected.', href: '/ssas', cta: 'Find your SSA' },
  { who: 'Partner or sponsor', body: 'Organizations and gurdwaras supporting Sikh students — we’d love to work together.', href: `mailto:${CONTACT_EMAIL}?subject=Partnership%20with%20USM`, cta: 'Email the team' },
  { who: 'Become a mentor', body: 'Sikh professionals ready to give back to the next generation.', href: `mailto:${CONTACT_EMAIL}?subject=Becoming%20a%20USM%20Mentor`, cta: 'Email the team' },
];

export default function Contact() {
  return (
    <>
      <section className="bg-teal text-white py-20 text-center">
        <FadeUp className="mx-auto max-w-2xl px-5">
          <p className="text-gold font-display tracking-widest uppercase text-xs">Get in touch</p>
          <h1 className="font-display text-5xl font-bold mt-3">Let’s talk.</h1>
          <p className="mt-4 text-white/80 leading-relaxed">
            Whether you’re a student, a chapter, a partner, or a mentor — there’s
            a place for you in the movement. Reach us directly at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold underline underline-offset-4">
              {CONTACT_EMAIL}
            </a>.
          </p>
          <SocialLinks className="mt-6 justify-center" iconClass="w-6 h-6" />
        </FadeUp>
      </section>
      <Phulkari className="text-teal/15" />

      <section className="py-16 mx-auto max-w-wrap px-5">
        <div className="grid gap-5 md:grid-cols-2">
          {routes.map((r, i) => (
            <FadeUp key={r.who} variant={i % 2 ? 'right' : 'left'} delay={(i % 2) * 80}
              className="rounded-3xl bg-white border border-teal/10 p-7 flex flex-col">
              <h2 className="font-display text-xl font-bold text-teal">{r.who}</h2>
              <p className="mt-2 text-teal-ink/75 leading-relaxed flex-1">{r.body}</p>
              <Link href={r.href}
                className="mt-4 font-semibold text-teal underline decoration-gold decoration-2 underline-offset-8 hover:text-gold-deep">
                {r.cta} →
              </Link>
            </FadeUp>
          ))}
        </div>

        <FadeUp variant="scale" className="mt-12 rounded-3xl bg-mist p-8 text-center">
          <h2 className="font-display text-2xl font-bold text-teal">Join the newsletter</h2>
          <p className="mt-2 text-teal-ink/70">Events, opportunities, and stories — a couple times a month.</p>
          <div className="mt-5 max-w-md mx-auto">
            <NewsletterSignup source="contact" variant="light" />
          </div>
        </FadeUp>

        <p className="mt-10 text-center text-sm text-teal-soft">
          United Sikh Movement is a registered 501(c)(3) nonprofit · EIN {EIN}
        </p>
      </section>
    </>
  );
}
