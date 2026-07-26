// Public resources here; SSA-leader resources live inside the portal.
import FadeUp from '@/components/FadeUp';
import Link from 'next/link';
import Card from '@/components/Card';
import EmptyState from '@/components/EmptyState';
import { PageHeader } from '@/components/Section';
import { getResources } from '@/lib/sanity';
import { resourceFallbacks } from '@/lib/resource-fallbacks';

export const revalidate = 600;
export const metadata = { title: 'Resources' };

export default async function Resources() {
  let resources: any[] = [];
  try { resources = await getResources(false); } catch {}
  if (!resources || resources.length === 0) resources = resourceFallbacks.filter((r) => !r.gated);
  const categories = Array.from(new Set(resources.map((r) => r.category))).filter(Boolean);

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <FadeUp>
        <PageHeader
          title="Resources"
          intro={
            <>
              Guides and tools for Sikh students. SSA leaders: your full toolkit lives in{' '}
              <Link href="/portal/login" className="underline text-teal">the portal</Link>.
            </>
          }
        />
      </FadeUp>
      {categories.map((cat) => (
        <FadeUp key={cat} className="mt-12">
          <h2 className="font-display text-xs uppercase tracking-[0.25em] text-gold-deep mb-4">{cat}</h2>
          <div className="space-y-3">
            {resources.filter((r) => r.category === cat).map((r, i) => (
              <Card
                key={i}
                href={r.fileUrl || r.externalUrl || '#'}
                target="_blank"
                rel="noreferrer"
              >
                <h3 className="font-display font-semibold text-teal-ink">{r.title}</h3>
                {r.description && <p className="text-sm text-teal-ink/70 mt-1">{r.description}</p>}
              </Card>
            ))}
          </div>
        </FadeUp>
      ))}
      {resources.length === 0 && (
        <EmptyState
          className="mt-10"
          title="No resources published yet"
          body="Guides, templates, and toolkits will appear here as the USM team publishes them."
          actionLabel="SSA leaders: open the portal toolkit →"
          actionHref="/portal/login"
        />
      )}
    </div>
  );
}
