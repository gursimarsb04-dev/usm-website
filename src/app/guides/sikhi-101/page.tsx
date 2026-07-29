// Ad Grants landing page. Targets high-volume, low-competition religious
// literacy searches ("what is Sikhism", "why do Sikhs wear turbans") — queries
// where USM has genuine authority and almost no advertiser competes, so the
// grant's $2 CPC cap can actually win the auction.
//
// ⚠️ TODO(USM): content in src/lib/guides/sikhi-101.ts needs a factual review
// by the USM team before this is promoted or used as an ads destination.
import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import Phulkari from '@/components/Phulkari';
import Button from '@/components/Button';
import {
  sikhi101Sections,
  SIKHI_101_TITLE,
  SIKHI_101_INTRO,
} from '@/lib/guides/sikhi-101';

export const metadata = {
  title: 'Sikhi 101: What Is Sikhism?',
  description:
    'A plain-language introduction to Sikhi (Sikhism): what Sikhs believe, why Sikhs wear turbans, the Five Ks, the Khalsa, and how Sikhi differs from Islam.',
  // Hidden until USM reviews the content. This is a concept draft, and it's
  // religious content — indexing unreviewed material risks it ranking (and
  // being cited) before anyone has checked it for accuracy. The page stays
  // reachable by direct link so the team can review it; remove this block
  // and add the nav link once it's approved.
  robots: { index: false, follow: false },
};

// FAQPage structured data — these sections are already question-shaped, and FAQ
// rich results lift click-through, which matters against the Ad Grant's 5% CTR floor.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: sikhi101Sections.map((s) => ({
    '@type': 'Question',
    name: s.heading,
    acceptedAnswer: { '@type': 'Answer', text: s.paragraphs.join(' ') },
  })),
};

export default function Sikhi101() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="bg-teal text-white py-20">
        <FadeUp className="mx-auto max-w-3xl px-5">
          <p className="text-gold font-display tracking-widest uppercase text-xs">Guide</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3 leading-tight">
            {SIKHI_101_TITLE}
          </h1>
          <p className="mt-5 text-lg text-white/80 leading-relaxed">{SIKHI_101_INTRO}</p>
        </FadeUp>
      </section>
      <Phulkari className="text-teal/15" />

      <div className="mx-auto max-w-3xl px-5 py-14">
        {/* On-page nav — helps users and gives search engines section context. */}
        <FadeUp>
          <nav aria-label="On this page" className="rounded-2xl bg-mist p-6">
            <p className="text-[10px] uppercase tracking-widest text-gold-deep font-semibold">
              On this page
            </p>
            <ul className="mt-3 space-y-1.5">
              {sikhi101Sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-teal hover:text-gold-deep underline underline-offset-4 text-sm">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </FadeUp>

        {sikhi101Sections.map((s) => (
          <FadeUp key={s.id} className="mt-12">
            <section id={s.id} className="scroll-mt-24">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-teal">
                {s.heading}
              </h2>
              <div className="mt-4 space-y-4 text-teal-ink/85 leading-relaxed">
                {s.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          </FadeUp>
        ))}

        <FadeUp className="mt-16 rounded-3xl bg-teal text-white p-10 text-center">
          <h2 className="font-display text-3xl font-bold">Find your sangat on campus</h2>
          <p className="mt-2 text-white/75">
            USM supports Sikh Student Associations across North America.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button href="/ssas">Find Your SSA</Button>
            <Button
              href="/start-an-ssa"
              variant="ghost"
              className="!border-white !text-white hover:!bg-white hover:!text-teal"
            >
              Start an SSA
            </Button>
          </div>
          <p className="mt-6 text-sm text-white/60">
            Want to know more about what we do?{' '}
            <Link href="/programs" className="text-gold underline underline-offset-4">
              Explore our programs →
            </Link>
          </p>
        </FadeUp>
      </div>
    </>
  );
}
