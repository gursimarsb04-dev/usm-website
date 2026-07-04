import { supabasePublic } from '@/lib/supabase-public';
import SSANav from './SSANav';

export default async function SSALayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const { data: ssa } = await supabasePublic()
    .from('ssas')
    .select('id, name, slug, status')
    .eq('slug', params.slug)
    .single();

  if (!ssa || ssa.status !== 'live') return <>{children}</>;

  return (
    <>
      <SSANav ssaName={ssa.name} ssaSlug={ssa.slug} />
      {children}
    </>
  );
}
