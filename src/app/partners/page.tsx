import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import Phulkari from '@/components/Phulkari';
import Button from '@/components/Button';
import { CONTACT_EMAIL } from '@/lib/site';

export const metadata = { title: 'Our Partners' };

// Partner orgs carried over from the legacy unitedsikhmovement.org/our-partners.
// TODO(usm): add logo images to /public/partners and a `logo` field if desired.
const partners = [
  { name: 'Basics of Sikhi', blurb: 'Sikh educational campaign reaching youth through YouTube, printed materials, and social media.' },
  { name: 'United Sikhs', blurb: 'UN-affiliated international nonprofit delivering humanitarian relief and civil-rights advocacy.' },
  { name: 'Sikh Relief', blurb: 'Welfare support for Sikh prisoners and families in need.' },
  { name: 'Khalsa Care Foundation', blurb: 'Promoting Sikh traditions, values, and family services across the community.' },
  { name: 'Riverside Gurudwara', blurb: 'A hub 55 miles east of Los Angeles hosting community events and sangat.' },
  { name: 'Walnut Gurudwara', blurb: 'A gurdwara east of Los Angeles powering Langar Seva events with USM.' },
];

export default function Partners() {
  return (
    <>
      <section className="bg-teal text-white py-20 text-center">
        <FadeUp className="mx-auto max-w-2xl px-5">
          <p className="text-gold font-display tracking-widest uppercase text-xs">Allies of the movement</p>
          <h1 className="font-display text-5xl font-bold mt-3">Our partners</h1>
          <p className="mt-4 text-white/80 leading-relaxed">
            USM doesn’t do this alone. These organizations and gurdwaras help
            power Sikh students — through education, seva, funding, and sangat.
          </p>
        </FadeUp>
      </section>
      <Phulkari className="text-teal/15" />

      <section className="py-16 mx-auto max-w-wrap px-5">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p, i) => (
            <FadeUp key={p.name} variant="rise" delay={(i % 3) * 100}
              className="rounded-3xl bg-white border border-teal/10 p-7 hover:border-gold transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-gold/20 grid place-items-center font-display font-bold text-teal text-lg">
                {p.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
              </div>
              <h2 className="font-display text-lg font-bold text-teal-ink mt-4">{p.name}</h2>
              <p className="mt-2 text-sm text-teal-ink/75 leading-relaxed">{p.blurb}</p>
            </FadeUp>
          ))}
        </div>

        <FadeUp variant="scale" className="mt-14 rounded-3xl bg-teal text-white p-10 text-center">
          <h2 className="font-display text-3xl font-bold">Want to partner with USM?</h2>
          <p className="mt-2 text-white/75 max-w-xl mx-auto">
            Organizations, gurdwaras, and sponsors who want to invest in the next
            generation of Sikh leaders — let’s build together.
          </p>
          <Button href={`mailto:${CONTACT_EMAIL}?subject=Partnership%20with%20USM`} className="mt-6">
            Get in touch
          </Button>
        </FadeUp>
      </section>
    </>
  );
}
