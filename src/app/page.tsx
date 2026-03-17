import { HeroSection } from '@/components/sections/HeroSection';
import { ImpactStats } from '@/components/sections/ImpactStats';
import { ProgramsSection } from '@/components/sections/ProgramsSection';
import { EventsSection } from '@/components/sections/EventsSection';
import { CTASection } from '@/components/sections/CTASection';
import { NewsletterSection } from '@/components/sections/NewsletterSection';

export const metadata = {
  title: 'United Sikh Movement - Empower Sikh Youth',
  description: 'Join 5,000+ Sikh students across 39 university chapters. Get mentorship, develop your career, deepen your spirituality, and lead your community.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <ImpactStats />
      <ProgramsSection />
      <EventsSection />
      <CTASection />
      <NewsletterSection />
    </main>
  );
}
