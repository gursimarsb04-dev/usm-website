import { supabasePublic } from '@/lib/supabase-public';
import { ssaFallbacks } from '@/lib/ssa-fallback';
import SSANav from './SSANav';

export default async function SSALayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  // Same Supabase-then-fallback resolution as the page, so the chapter sub-nav
  // renders for roster chapters that aren't in the database yet.
  let ssa: { name: string; slug: string } | null = null;
  try {
    const { data } = await supabasePublic()
      .from('ssas')
      .select('id, name, slug, status')
      .eq('slug', params.slug)
      .single();
    if (data && data.status === 'live') ssa = { name: data.name, slug: data.slug };
  } catch {}
  if (!ssa) {
    const fb = ssaFallbacks.find((f) => f.slug === params.slug);
    if (fb) ssa = { name: fb.name, slug: fb.slug };
  }
  if (!ssa) return <>{children}</>;

  return (
    <>
      <SSANav ssaName={ssa.name} ssaSlug={ssa.slug} />
      {children}
    </>
  );
}
