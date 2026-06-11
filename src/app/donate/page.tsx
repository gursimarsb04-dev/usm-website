// "Give the gift of sangat" — their own Vaisakhi campaign language.
import FadeUp from '@/components/FadeUp';
import { getSiteSettings } from '@/lib/sanity';

export const metadata = { title: 'Donate' };

const impactMath = [
  { amount: '$25', does: 'puts a student in the room at a leadership retreat' },
  { amount: '$100', does: 'funds Sikhi resources for a whole chapter' },
  { amount: '$1,000', does: "fuels a full year of one SSA's mentorship and community-building" },
];

export default async function Donate() {
  let url = 'https://dvnetwork.org/organizations/united-sikh-movement';
  try {
    const s = await getSiteSettings();
    if (s?.dasvandhUrl) url = s.dasvandhUrl;
  } catch {}

  return (
    <div className="mx-auto max-w-2xl px-5 py-20">
      <FadeUp className="text-center">
        <p className="text-gold-deep font-display tracking-widest uppercase text-xs">Dasvandh, in action</p>
        <h1 className="font-display text-5xl font-bold text-teal mt-3">
          Give the gift of sangat.
        </h1>
        <p className="mt-5 text-lg text-teal-ink/75 leading-relaxed">
          No Sikh student should have to build community alone — and with your
          support, they won't have to. This year your dasvandh put $12,600+
          directly into students: chapter grants, retreats, free LSAT prep, and
          seva from campus to Punjab.
        </p>
      </FadeUp>

      <FadeUp className="mt-10 space-y-3">
        {impactMath.map((m) => (
          <div key={m.amount} className="rounded-2xl bg-white border border-teal/10 p-5 flex items-center gap-5">
            <div className="font-display text-2xl font-bold text-teal w-24 shrink-0">{m.amount}</div>
            <p className="text-teal-ink/80">{m.does}</p>
          </div>
        ))}
      </FadeUp>

      <FadeUp className="mt-10 text-center">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-block rounded-full bg-gold px-10 py-4 font-display font-semibold text-lg text-teal-ink hover:bg-gold-deep transition-colors"
        >
          Give through Dasvandh Network
        </a>
        <p className="mt-5 text-sm text-teal-soft">
          USM is a registered 501(c)(3). Contributions are tax-deductible and
          processed securely by the Dasvandh Network — every dollar goes into
          programming, retreats, resources, and grants for SSAs nationwide.
        </p>
      </FadeUp>
    </div>
  );
}
