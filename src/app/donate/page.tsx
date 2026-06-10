// Donations route to the Dasvandh Network — they handle 501(c)(3) receipting.
import FadeUp from '@/components/FadeUp';
import { getSiteSettings } from '@/lib/sanity';

export const metadata = { title: 'Donate' };

export default async function Donate() {
  let url = '#';
  try { url = (await getSiteSettings())?.dasvandhUrl || '#'; } catch {}

  return (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <FadeUp>
        <h1 className="font-display text-5xl font-bold text-teal">Dasvandh, in action</h1>
        <p className="mt-5 text-lg text-teal-ink/75 leading-relaxed">
          Every contribution funds camps, summits, and chapter support for Sikh
          students across 75 campuses. Donations are tax-deductible and processed
          securely through the Dasvandh Network.
        </p>
        <a href={url} target="_blank" rel="noreferrer"
          className="inline-block mt-8 rounded-full bg-gold px-10 py-4 font-display font-semibold text-lg text-teal-ink hover:bg-gold-deep transition-colors">
          Give through Dasvandh Network
        </a>
        <p className="mt-6 text-sm text-teal-soft">
          USM is a registered 501(c)(3). You'll receive a receipt for tax purposes.
        </p>
      </FadeUp>
    </div>
  );
}
