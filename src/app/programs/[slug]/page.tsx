import { ProgramPageClient } from './ProgramPageClient';

export function generateStaticParams() {
  return [
    { slug: 'camp-kudrat' },
    { slug: 'gurbani-study' },
    { slug: 'safal-summit' },
    { slug: 'kadam-career-panel' },
    { slug: 'national-conference' },
    { slug: 'leadership-retreat' },
  ];
}

export default function ProgramPage() {
  return <ProgramPageClient />;
}
