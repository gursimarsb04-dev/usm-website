import { getChapter } from '@/lib/chapters';
import SSANav from './SSANav';

export default async function SSALayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  // The Homepage / Programs sub-nav only makes sense when there is a programs
  // page with real content, i.e. a chapter that claimed its page and filled it
  // in. Everyone else gets the breadcrumb on the landing page instead of a tab
  // that leads to an empty page.
  const c = await getChapter(params.slug);
  if (!c?.claimed || !c.details?.programs_content) return <>{children}</>;

  return (
    <>
      <SSANav ssaName={c.usmName} ssaSlug={c.slug} />
      {children}
    </>
  );
}
