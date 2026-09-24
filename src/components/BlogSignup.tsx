// Email capture card for blog posts. Wraps the shared NewsletterSignup (which
// stores to Supabase `newsletter_subscribers` via /api/newsletter) and tags the
// signup `blog:<slug>` so the admin dashboard shows which article converted.
import NewsletterSignup from '@/components/NewsletterSignup';

export default function BlogSignup({
  slug,
  heading = 'Get stories like this in your inbox',
  body = 'Events, programs, and opportunities for Sikh students — about once a month. No spam.',
  placement,
}: {
  slug: string;
  heading?: string;
  body?: string;
  /** Distinguishes the mid-article and end-of-post forms in the source tag. */
  placement: 'mid' | 'end';
}) {
  // `source` is capped at 40 chars server-side; keep the placement suffix short.
  const source = `blog:${slug}`.slice(0, 36) + (placement === 'mid' ? ':m' : ':e');
  return (
    <aside className="not-prose my-10 rounded-3xl bg-mist p-6 md:p-8" aria-label="Newsletter signup">
      <p className="font-display text-xl font-bold text-teal">{heading}</p>
      <p className="mt-2 mb-5 text-sm text-teal-ink/75">{body}</p>
      <NewsletterSignup source={source} variant="light" />
    </aside>
  );
}
