import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarBlank, MapPin } from "@phosphor-icons/react/dist/ssr";
import { client } from "@/sanity/client";
import { homePageQuery } from "@/sanity/queries";
import { organizationJsonLd } from "@/lib/jsonld";
import { urlFor } from "@/sanity/image";

import TrustedByMarquee from "@/components/TrustedByMarquee";
import ImpactStats from "@/components/ImpactStats";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import EmailSignup from "@/components/EmailSignup";

export const revalidate = 1800;

export default async function HomePage() {
  const data = await client.fetch(homePageQuery) || {};
  const { settings, featuredEvents, testimonials, ssaCount = 80, eventCount = 250, stateCount = 31 } = data;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
      
      {/* Hero */}
      <section data-section="hero" className="relative min-h-[100dvh] bg-navy flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[55%] pointer-events-none">
          {settings?.heroImage ? (
            <Image
              src={urlFor(settings.heroImage).width(1200).url()}
              alt="United Sikh Movement Students"
              fill
              className="object-cover object-center opacity-80"
              priority
            />
          ) : (
            <div className="w-full h-full bg-navy-deep opacity-50 relative">
               <Image src="https://picsum.photos/seed/usm-hero/1200/900" alt="Students" fill className="object-cover object-center opacity-80" priority />
            </div>
          )}
          {/* Gradient mask to blend the image left to right */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-transparent" />
          {/* Bottom gradient fade for smoother transition */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy to-transparent" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 flex flex-col gap-8 max-w-2xl">
            <h1 className="font-display font-semibold text-5xl md:text-7xl lg:text-[5rem] tracking-tighter leading-[1.05] text-white">
              {settings?.heroHeadline || "Empower Sikh Youth to Lead and Connect."}
            </h1>
            <p className="font-body text-lg md:text-xl text-white/80 max-w-lg leading-relaxed">
              {settings?.heroSubtext || "America's largest Sikh student network building community, academic excellence, and spiritual grounding."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link
                href="/ssa"
                className="group flex flex-1 sm:flex-none items-center justify-center sm:justify-start gap-3 bg-saffron text-navy px-8 py-4 rounded-full font-medium transition-all hover:bg-saffron-light active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              >
                <span>Find Your SSA</span>
                <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center transition-transform group-hover:translate-x-1 shrink-0">
                  <ArrowRight weight="bold" className="w-4 h-4" />
                </div>
              </Link>
              <Link
                href="#join"
                className="flex flex-1 sm:flex-none items-center justify-center px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Join the Movement
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section data-section="trusted-by">
        <TrustedByMarquee logos={settings?.trustedByLogos || []} />
      </section>

      {/* Pillars */}
      <section data-section="pillars" className="py-24 md:py-32 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-24 md:gap-32">
          
          {/* Pillar 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-center">
            <div className="order-2 lg:order-1 flex flex-col gap-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-saffron px-3 py-1 bg-saffron/10 rounded-full w-fit">01 / Focus</span>
              <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-navy">Academic Excellence</h2>
              <p className="text-slate-body text-lg leading-relaxed">
                Ensure Sikh students have access to top-tier academic resources, test prep, and a nationwide network of peers navigating the same challenging programs.
              </p>
              <ul className="flex flex-col gap-4 mt-4">
                {['Study resources & shared notes', 'Alumni academic advising', 'Graduate school prep networks'].map((item, i) => (
                  <li key={i} className="flex gap-4 p-4 rounded-2xl bg-white/50 border border-off-white">
                    <span className="font-mono text-saffron font-bold text-lg">0{i+1}</span>
                    <span className="text-navy font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2 aspect-[4/3] rounded-[2rem] overflow-hidden bg-warm-white relative ring-1 ring-black/5">
              <Image src="https://picsum.photos/seed/usm-academic/800/600" alt="Academic Excellence" fill className="object-cover" />
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24 items-center">
            <div className="order-1 aspect-[4/3] rounded-[2rem] overflow-hidden bg-warm-white relative ring-1 ring-black/5">
              <Image src="https://picsum.photos/seed/usm-mentor/800/600" alt="Professional Mentorship" fill className="object-cover" />
            </div>
            <div className="order-2 flex flex-col gap-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-saffron px-3 py-1 bg-saffron/10 rounded-full w-fit">02 / Grow</span>
              <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-navy">Professional Mentorship</h2>
              <p className="text-slate-body text-lg leading-relaxed">
                Connecting students with accomplished Sikh professionals in finance, tech, medicine, and law. You shouldn't have to choose between your career and your identity.
              </p>
              <ul className="flex flex-col gap-4 mt-4">
                {['1-on-1 industry mentorship', 'Resume & interview workshops', 'Exclusive job board access'].map((item, i) => (
                  <li key={i} className="flex gap-4 p-4 rounded-2xl bg-white/50 border border-off-white">
                    <span className="font-mono text-saffron font-bold text-lg">0{i+1}</span>
                    <span className="text-navy font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-center">
            <div className="order-2 lg:order-1 flex flex-col gap-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-saffron px-3 py-1 bg-saffron/10 rounded-full w-fit">03 / Ground</span>
              <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-navy">Spiritual Grounding</h2>
              <p className="text-slate-body text-lg leading-relaxed">
                Stay rooted in Sikhi while navigating college life. We provide safe spaces for Kirtan, discussions, and spiritual growth on campus.
              </p>
              <ul className="flex flex-col gap-4 mt-4">
                {['Weekly Kirtan programs', 'Campus Langar initiatives', 'Sikhi awareness workshops'].map((item, i) => (
                  <li key={i} className="flex gap-4 p-4 rounded-2xl bg-white/50 border border-off-white">
                    <span className="font-mono text-saffron font-bold text-lg">0{i+1}</span>
                    <span className="text-navy font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2 aspect-[4/3] rounded-[2rem] overflow-hidden bg-warm-white relative ring-1 ring-black/5">
              <Image src="https://picsum.photos/seed/usm-spiritual/800/600" alt="Spiritual Grounding" fill className="object-cover" />
            </div>
          </div>

        </div>
      </section>

      {/* Impact Stats */}
      <section data-section="impact-stats">
        <ImpactStats ssaCount={ssaCount} eventCount={eventCount} stateCount={stateCount} />
      </section>

      {/* Testimonials */}
      <section data-section="testimonials" className="py-24 md:py-32 bg-warm-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-12 md:mb-16">
          <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-navy text-center">
            Voices of the Community
          </h2>
        </div>
        <TestimonialCarousel testimonials={testimonials || []} />
      </section>

      {/* Featured Events */}
      <section data-section="featured-events" className="py-24 md:py-32 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-navy mb-4">
                Upcoming Events
              </h2>
              <p className="text-slate-body text-lg">
                Connect with the community at an event near you. We host regional retreats, workshops, and gatherings year-round.
              </p>
            </div>
            <Link href="/events" className="shrink-0 flex items-center gap-2 text-saffron font-medium hover:text-saffron-light transition-colors group">
              View full calendar 
              <ArrowRight weight="bold" className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEvents?.map((e: any) => (
               <div key={e._id} className="group bg-navy/5 ring-1 ring-black/5 p-1.5 rounded-[2rem] flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="bg-white rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col h-full overflow-hidden">
                  <div className="aspect-[16/9] w-full bg-warm-gray/20 relative overflow-hidden">
                    {e.coverImage ? (
                      <Image src={urlFor(e.coverImage).width(600).height(340).url()} alt={e.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                       <Image src={`https://picsum.photos/seed/${e._id}/600/340`} alt={e.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-navy flex items-center gap-1.5">
                       <CalendarBlank weight="bold" />
                       {new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-saffron mb-3">{e.eventType}</span>
                    <h3 className="font-display font-semibold text-xl text-navy mb-3 line-clamp-2">{e.title}</h3>
                    <div className="text-sm text-warm-gray flex items-center gap-2 mt-auto">
                      <MapPin weight="fill" className="text-warm-gray/70" />
                      {e.location}
                    </div>
                    <a href={e.eventbriteUrl || `/events/${e.slug?.current || e.slug}`} className="mt-6 w-full py-3 rounded-full border border-off-white text-navy font-medium text-center hover:border-navy hover:bg-navy/5 transition-all">
                      Details & Registration
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Movement CTA */}
      <section id="join" data-section="join-the-movement" className="py-24 md:py-32 bg-saffron relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center gap-10">
          <div className="flex flex-col gap-6 items-center">
            <h2 className="font-display font-semibold text-5xl md:text-7xl tracking-tighter text-navy max-w-2xl leading-[1.05]">
              Be Part of the Next Generation.
            </h2>
            <p className="font-body text-xl text-navy/80 max-w-lg leading-relaxed">
              Join thousands of Sikh students growing together. Sign up for our newsletter to stay updated on events, resources, and mentorship.
            </p>
          </div>
          <div className="w-full max-w-md">
            <EmailSignup theme="light" />
          </div>
          <div className="pt-8 flex flex-col items-center gap-4">
            <p className="text-sm text-navy/70 font-medium">Or support our 501(c)(3) mission directly</p>
            <Link href="/donate" className="px-8 py-4 rounded-full border-2 border-navy text-navy font-medium hover:bg-navy hover:text-saffron transition-colors">
              Make a Donation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
