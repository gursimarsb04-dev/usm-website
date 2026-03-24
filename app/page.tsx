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
      <section data-section="hero" className="relative min-h-[90dvh] flex items-center justify-center pt-32 pb-20 overflow-hidden text-center text-navy font-body">
        <div className="absolute inset-0 z-0">
          {settings?.heroImage ? (
            <Image
              src={urlFor(settings.heroImage).width(1600).url()}
              alt="United Sikh Movement Students"
              fill
              className="object-cover object-top opacity-60 mix-blend-multiply filter brightness-[1.1] contrast-[0.9]"
              priority
            />
          ) : (
            <div className="w-full h-full bg-warm-white opacity-80 relative">
               <Image src="https://picsum.photos/seed/usm-hero/1600/900" alt="Students" fill className="object-cover object-top opacity-60 mix-blend-multiply filter brightness-[1.1] contrast-[0.9]" priority />
            </div>
          )}
          {/* Soft light gradient overlays to match the airy reference look */}
          <div className="absolute inset-0 bg-gradient-to-t from-warm-white via-warm-white/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-warm-white/90 via-warm-white/20 to-transparent" />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col items-center gap-10 mt-12">
          
          <div className="flex flex-col items-center gap-6">
            <h1 className="font-display font-semibold text-5xl md:text-7xl lg:text-[6rem] tracking-tight leading-[1] text-navy max-w-4xl text-balance">
              {settings?.heroHeadline || "Empowering Sikh Youth to Excel"}
            </h1>
            <p className="font-body text-xl md:text-2xl text-slate-body max-w-2xl leading-relaxed text-balance">
              {settings?.heroSubtext || "America's largest Sikh student network building community, academic excellence, and spiritual grounding."}
            </p>
          </div>

          {/* Action Area (Keeping dual CTAs as requested but styling like the search pill) */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/70 backdrop-blur-xl p-2 rounded-full border border-white shadow-xl shadow-navy/5 w-full max-w-2xl mx-auto ring-1 ring-black/5">
            <Link
              href="/find-ssa"
              className="group flex flex-1 items-center justify-center gap-3 bg-white text-navy px-8 py-4 md:py-5 rounded-full font-medium transition-all hover:bg-slate-50 w-full outline-none focus-visible:ring-2 focus-visible:ring-saffron"
            >
              <span className="text-lg">Find an SSA Near You</span>
            </Link>
            <Link
              href="#join"
              className="group flex sm:flex-[0.6] items-center justify-center gap-3 bg-saffron text-white px-8 py-4 md:py-5 rounded-full font-medium transition-all hover:bg-saffron-light w-full outline-none focus-visible:ring-2 focus-visible:ring-navy"
            >
              <span className="text-lg">Join Now</span>
              <ArrowRight weight="bold" className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
        </div>
      </section>

      {/* Trusted By */}
      <section data-section="trusted-by">
        <TrustedByMarquee logos={settings?.trustedByLogos || []} />
      </section>

      {/* Pillars - Redesigned as sticky scroll cards */}
      <section data-section="pillars" className="py-24 md:py-32 bg-[#F6F8FA]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col gap-8 md:gap-16">
          
          {/* Pillar 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-warm-white relative ring-1 ring-black/5 shadow-xl shadow-navy/5">
              <Image src="https://picsum.photos/seed/usm-academic-2/800/600" alt="Academic Excellence" fill className="object-cover" />
              {/* Overlay card matching the reference */}
              <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10 bg-navy/90 backdrop-blur-md p-8 lg:p-10 rounded-[2rem] text-white">
                <h2 className="font-display font-semibold text-3xl md:text-4xl mb-4">Academic<br/>Excellence</h2>
                <p className="text-white/80 leading-relaxed font-body">
                  Ensure Sikh students have access to top-tier academic resources, test prep, and a nationwide network of peers.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-32 bg-white p-8 lg:p-10 rounded-[2.5rem] ring-1 ring-black/5 shadow-xl shadow-navy/5">
              <h3 className="font-display font-semibold text-2xl text-navy">Key Resources</h3>
              <ul className="flex flex-col gap-6 mt-2">
                {['Study resources & shared notes', 'Alumni academic advising', 'Graduate school prep networks'].map((item, i) => (
                  <li key={i} className="flex gap-4 items-center">
                    <span className="font-mono text-saffron font-bold text-lg">0{i+1}</span>
                    <span className="text-navy font-medium font-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-32 bg-white p-8 lg:p-10 rounded-[2.5rem] ring-1 ring-black/5 shadow-xl shadow-navy/5 order-2 lg:order-1">
              <h2 className="font-display font-semibold text-3xl md:text-4xl text-navy mb-2">Professional<br/>Mentorship</h2>
              <p className="text-slate-body leading-relaxed font-body mb-2">
                Connecting students with accomplished Sikh professionals in finance, tech, medicine, and law.
              </p>
              <ul className="flex flex-col gap-6 mt-2">
                {['1-on-1 industry mentorship', 'Resume & interview workshops', 'Exclusive job board access'].map((item, i) => (
                  <li key={i} className="flex gap-4 items-center">
                    <span className="font-mono text-saffron font-bold text-lg">0{i+1}</span>
                    <span className="text-navy font-medium font-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7 aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-warm-white relative ring-1 ring-black/5 shadow-xl shadow-navy/5 order-1 lg:order-2">
              <Image src="https://picsum.photos/seed/usm-mentor-2/800/600" alt="Professional Mentorship" fill className="object-cover" />
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-warm-white relative ring-1 ring-black/5 shadow-xl shadow-navy/5">
              <Image src="https://picsum.photos/seed/usm-spiritual-2/800/600" alt="Spiritual Grounding" fill className="object-cover" />
              <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10 bg-white/90 backdrop-blur-md p-8 lg:p-10 rounded-[2rem] text-navy ring-1 ring-black/5">
                <h2 className="font-display font-semibold text-3xl md:text-4xl mb-4">Spiritual<br/>Grounding</h2>
                <p className="text-slate-body leading-relaxed font-body">
                  Stay rooted in Sikhi while navigating college life. We provide safe spaces for Kirtan, discussions, and spiritual growth on campus.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-32 bg-white p-8 lg:p-10 rounded-[2.5rem] ring-1 ring-black/5 shadow-xl shadow-navy/5">
              <h3 className="font-display font-semibold text-2xl text-navy">Programs</h3>
              <ul className="flex flex-col gap-6 mt-2">
                {['Weekly Kirtan programs', 'Campus Langar initiatives', 'Sikhi awareness workshops'].map((item, i) => (
                  <li key={i} className="flex gap-4 items-center">
                    <span className="font-mono text-saffron font-bold text-lg">0{i+1}</span>
                    <span className="text-navy font-medium font-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Impact Stats */}
      <section data-section="impact-stats">
        <ImpactStats ssaCount={ssaCount} eventCount={eventCount} stateCount={stateCount} />
      </section>

      {/* Our Programs - Clickable cards linking to dedicated pages */}
      <section data-section="programs" className="py-24 md:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-saffron px-3 py-1 bg-saffron/10 rounded-full inline-block mb-6">What We Do</span>
              <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-navy mb-4">
                Our Programs
              </h2>
              <p className="font-body text-slate-body text-xl">
                From spiritual retreats to career summits, our programs empower Sikh students to grow in every dimension.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { slug: 'camp-kudrat', icon: '\u{1F3D5}\uFE0F', title: 'Camp Kudrat', category: 'Sikhi Development', tagline: 'Reflect. Connect. Renew.' },
              { slug: 'gurbani-study', icon: '\u{1F4D6}', title: 'Gurbani Study', category: 'Sikhi Development', tagline: 'Mother Tongue Made Easy.' },
              { slug: 'safal-summit', icon: '\u{1F393}', title: 'Safal Summit', category: 'Professional Development', tagline: 'Excel. Connect. Lead.' },
              { slug: 'kadam-career-panel', icon: '\u{1F4BC}', title: 'Kadam Career Panel', category: 'Professional Development', tagline: 'Your Next Step Starts Here.' },
              { slug: 'national-conference', icon: '\u{1F91D}', title: 'National Conference', category: 'SSA Network', tagline: 'Network, Learn, Lead.' },
              { slug: 'leadership-retreat', icon: '\u{1F3AF}', title: 'Leadership Retreat', category: 'SSA Network', tagline: 'Lead With Purpose.' },
            ].map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group bg-white ring-1 ring-black/5 rounded-[2rem] p-8 flex flex-col gap-4 hover:shadow-xl hover:shadow-navy/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{program.icon}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-saffron bg-saffron/10 px-3 py-1 rounded-full">{program.category}</span>
                </div>
                <h3 className="font-display font-semibold text-2xl text-navy group-hover:text-saffron transition-colors">{program.title}</h3>
                <p className="text-slate-body font-body italic">{program.tagline}</p>
                <span className="mt-auto flex items-center gap-2 text-saffron font-medium text-sm group-hover:gap-3 transition-all">
                  Learn more
                  <ArrowRight weight="bold" className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section data-section="testimonials" className="py-24 md:py-32 bg-[#F6F8FA] overflow-hidden relative">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent opacity-50 pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16 md:mb-20 relative z-10 flex flex-col items-center text-center gap-4">
          <h2 className="font-display font-semibold text-5xl md:text-6xl tracking-tight text-navy">
            Voices of the Community
          </h2>
          <p className="font-body text-slate-body text-xl max-w-2xl">
            Hear from students across the country who have found their home, accelerated their careers, and deepened their faith through USM.
          </p>
        </div>
        <TestimonialCarousel testimonials={testimonials || []} />
      </section>

      {/* Featured Events */}
      <section data-section="featured-events" className="py-24 md:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-navy mb-4">
                Upcoming Events
              </h2>
              <p className="font-body text-slate-body text-xl">
                Connect with the community at an event near you. We host regional retreats, workshops, and gatherings year-round.
              </p>
            </div>
            <Link href="/events" className="shrink-0 flex items-center gap-2 text-saffron font-medium hover:text-saffron-light transition-colors group text-lg">
              View full calendar 
              <ArrowRight weight="bold" className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredEvents?.map((e: any) => (
               <div key={e._id} className="group bg-white ring-1 ring-black/5 rounded-[2.5rem] flex flex-col h-full hover:shadow-2xl hover:shadow-navy/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                  <div className="aspect-[4/3] w-full bg-warm-gray/20 relative overflow-hidden">
                    {e.coverImage ? (
                      <Image src={urlFor(e.coverImage).width(600).height(450).url()} alt={e.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                       <Image src={`https://picsum.photos/seed/${e._id}/600/450`} alt={e.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    )}
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold text-navy flex items-center gap-2 shadow-sm">
                       <CalendarBlank weight="bold" className="w-4 h-4" />
                       {new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                  </div>
                  <div className="p-8 md:p-10 flex flex-col flex-1">
                    <span className="text-xs uppercase tracking-[0.2em] font-medium text-saffron mb-4">{e.eventType}</span>
                    <h3 className="font-display font-semibold text-2xl text-navy mb-4 line-clamp-2 leading-tight">{e.title}</h3>
                    <div className="text-base text-slate-body flex items-center gap-3 mt-auto font-body">
                      <MapPin weight="fill" className="text-warm-gray/70 w-5 h-5 shrink-0" />
                      <span className="line-clamp-1">{e.location}</span>
                    </div>
                    <a href={e.eventbriteUrl || `/events/${e.slug?.current || e.slug}`} className="mt-8 w-full py-4 rounded-full border-2 border-off-white text-navy font-medium text-center hover:border-navy hover:bg-navy/5 transition-all text-lg">
                      Details & Registration
                    </a>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Movement CTA - Designed as a floating pill like the reference */}
      <section id="join" data-section="join-the-movement" className="py-24 md:py-32 bg-white relative flex justify-center px-6">
        <div className="w-full max-w-[1200px] bg-navy rounded-[3rem] md:rounded-[4rem] px-6 py-16 md:py-24 relative overflow-hidden flex flex-col items-center text-center gap-10 shadow-2xl shadow-navy/20">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex flex-col gap-6 items-center relative z-10">
            <h2 className="font-display font-semibold text-5xl md:text-6xl lg:text-7xl tracking-tighter text-white max-w-2xl leading-[1] text-balance">
              Join the Movement
            </h2>
            <p className="font-body text-xl text-white/80 max-w-lg leading-relaxed">
              Join the Movement and help empower Sikh youth nationwide.
            </p>
          </div>
          
          <div className="w-full max-w-lg relative z-10 flex flex-col md:flex-row gap-4 items-center">
             <div className="w-full relative">
                <input type="email" placeholder="How can we help you grow?" className="w-full bg-white text-navy px-8 py-5 md:py-6 rounded-full outline-none font-body text-lg border-2 border-transparent focus:border-saffron transition-colors pr-36" />
                <button className="absolute right-2 top-2 bottom-2 bg-saffron text-white px-8 rounded-full font-medium hover:bg-saffron-light transition-colors text-lg">
                  Submit
                </button>
             </div>
          </div>
        </div>
      </section>
    </>
  );
}
