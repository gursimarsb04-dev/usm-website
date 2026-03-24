"use client";

import { useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Hardcoded Data                                                     */
/* ------------------------------------------------------------------ */

const pillars = [
  {
    name: "Simran",
    subtitle: "Spirituality",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
        <path d="M20 8v24M8 20h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    description:
      "Grounding ourselves in Gurbani, meditation, and Sikh values that guide every step of the journey.",
  },
  {
    name: "Seva",
    subtitle: "Philanthropy",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <path d="M20 35s-14-8.5-14-18a8 8 0 0 1 14-5.3A8 8 0 0 1 34 17c0 9.5-14 18-14 18Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    description:
      "Selfless service to uplift communities — from food drives to mentorship programs that create lasting impact.",
  },
  {
    name: "Sangat",
    subtitle: "Community",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="26" cy="14" r="5" stroke="currentColor" strokeWidth="2" />
        <path d="M6 32c0-5 4-9 8-9s8 4 8 9M18 32c0-5 4-9 8-9s8 4 8 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    description:
      "Building a nationwide family of students who support each other through college and beyond.",
  },
  {
    name: "Academics",
    subtitle: "Excellence",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <path d="M6 16l14-8 14 8-14 8-14-8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M10 18v10c0 2 4.5 5 10 5s10-3 10-5V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    description:
      "Providing scholarships, hackathons, and professional development to help Sikh students thrive.",
  },
];

const timeline = [
  { year: "2015", title: "USM Founded", desc: "Harsimran Kaur founds United Sikh Movement in Elk Grove, CA, with a vision to unite Sikh students nationwide." },
  { year: "2016", title: "First SSA Chapter", desc: "The first Sikh Student Association chapter is established, creating a replicable model for campus communities." },
  { year: "2018", title: "Camp Kudrat Launched", desc: "Camp Kudrat brings Sikh youth together in nature for spiritual growth, leadership training, and lifelong bonds." },
  { year: "2020", title: "20+ SSA Chapters", desc: "USM's network grows to over twenty SSA chapters across the United States, touching every major region." },
  { year: "2022", title: "Safal Summit", desc: "The inaugural Safal Summit draws record attendance, bringing together students, professionals, and community leaders." },
  { year: "2024", title: "39 Active Chapters", desc: "USM now supports 39 active chapters nationwide, making it one of the largest Sikh student networks in the country." },
];

const team = [
  { name: "Harsimran Kaur", role: "Founder & Executive Director", initials: "HK" },
  { name: "Gursimar Kaur", role: "President", initials: "GK" },
  { name: "Manjot Singh", role: "Director of Operations", initials: "MS" },
  { name: "Haramrit Singh", role: "West Coast SSA Engagement Director", initials: "HS" },
  { name: "Gursimar Singh", role: "Director of Technology", initials: "GS" },
  { name: "Divjot Singh", role: "Director of Logistics", initials: "DS" },
  { name: "Divneel Singh", role: "Tech Lead", initials: "DS" },
  { name: "Achint Kaur", role: "SoCal Coordinator", initials: "AK" },
  { name: "Preet Singh", role: "Midwest Regional Director", initials: "PS" },
  { name: "Puneet Cheema", role: "Sevadaar & Hackathon Mentor", initials: "PC" },
];

const partners = [
  { name: "Jakara Movement", url: "https://www.jakara.org" },
  { name: "Sikh Coalition", url: "https://www.sikhcoalition.org" },
  { name: "SALDEF", url: "https://saldef.org" },
  { name: "Dasvandh Network", url: "https://www.dasvandh.com" },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  const [email, setEmail] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitStatus("loading");
    try {
      const res = await fetch("/api/mailchimp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubmitStatus("success");
        setEmail("");
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
  }

  return (
    <div className="flex flex-col w-full">
      {/* ── Hero ── */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 bg-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-saffron/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
        <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col gap-8 md:gap-12">
          <div className="max-w-4xl">
            <h1 className="font-display font-semibold text-5xl md:text-7xl lg:text-[5.5rem] tracking-tighter text-white leading-[1.05] mb-6">
              Empowering the Next Generation of Sikh Leaders.
            </h1>
            <p className="font-body text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl">
              We believe you don&rsquo;t have to choose between your career and your identity. Our mission is to provide the mentorship, resources, and spiritual grounding to help Sikh students excel.
            </p>
          </div>
        </div>
      </section>

      {/* ── Four Pillars ── */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-warm-white">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-16">
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-6">
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-saffron px-3 py-1 bg-saffron/10 rounded-full w-fit">
              Our Pillars
            </span>
            <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-navy">
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <div
                key={p.name}
                className="bg-[#F6F8FA] rounded-[2rem] p-8 flex flex-col gap-5 ring-1 ring-black/5 hover:ring-saffron/30 transition-all"
              >
                <div className="text-saffron">{p.icon}</div>
                <div>
                  <h3 className="font-display font-semibold text-xl text-navy">{p.name}</h3>
                  <span className="text-sm text-warm-gray font-body">{p.subtitle}</span>
                </div>
                <p className="text-slate-body font-body leading-relaxed text-[15px]">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-cream text-navy">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-32 self-start">
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-saffron px-3 py-1 bg-saffron/10 rounded-full w-fit">
              Our Journey
            </span>
            <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-navy">
              From a vision in California to a nationwide movement.
            </h2>
            <p className="text-slate-body text-lg leading-relaxed">
              United Sikh Movement started with a simple realization: Sikh college students were navigating difficult academic and professional paths alone, often compromising their spiritual roots to fit in. We built this community to change that.
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 flex flex-col relative before:absolute before:inset-y-0 before:left-[19px] before:w-[2px] before:bg-navy/10">
            {timeline.map((item, i) => (
              <div key={i} className="relative pl-16 pb-16 last:pb-0">
                <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-cream border-4 border-navy/10 flex items-center justify-center shrink-0 shadow-sm z-10 transition-colors hover:border-saffron hover:bg-saffron/5">
                  <div className="w-3 h-3 rounded-full bg-saffron" />
                </div>
                <div className="flex flex-col gap-3 pt-1">
                  <span className="font-mono text-saffron font-bold text-xl">{item.year}</span>
                  <h3 className="font-display font-semibold text-2xl text-navy">{item.title}</h3>
                  <p className="text-slate-body leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-warm-white">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-16">
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-6">
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-saffron px-3 py-1 bg-saffron/10 rounded-full w-fit">
              Leadership
            </span>
            <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-navy">
              Meet the Team
            </h2>
            <p className="text-slate-body text-lg">
              Dedicated professionals and students working together to build resources and opportunities for the next generation.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center gap-4 p-6 rounded-[2rem] bg-cream ring-1 ring-black/5 hover:ring-saffron/30 transition-all"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-saffron to-saffron-light flex items-center justify-center shadow-md">
                  <span className="font-display font-bold text-xl text-white">
                    {member.initials}
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="font-display font-semibold text-base text-navy leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-slate-body text-sm mt-1 font-body leading-snug">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-cream">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-16">
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-6">
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-saffron px-3 py-1 bg-saffron/10 rounded-full w-fit">
              Partners
            </span>
            <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-navy">
              Organizations We Work With
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-8 rounded-[2rem] bg-warm-white ring-1 ring-black/5 hover:ring-saffron/30 hover:shadow-lg transition-all text-center"
              >
                <span className="font-display font-semibold text-lg text-navy">{p.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Email Capture CTA ── */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-navy relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-saffron/10 rounded-full blur-[120px] pointer-events-none translate-y-1/2 -translate-x-1/4" />
        <div className="max-w-[700px] mx-auto relative z-10 flex flex-col items-center gap-8 text-center">
          <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-white">
            Stay Connected
          </h2>
          <p className="text-white/70 text-lg font-body leading-relaxed max-w-md">
            Get updates on events, chapter news, and opportunities delivered straight to your inbox.
          </p>

          <form
            onSubmit={handleEmailSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (submitStatus !== "idle") setSubmitStatus("idle");
              }}
              placeholder="you@example.com"
              className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-body focus:outline-none focus:ring-2 focus:ring-saffron"
            />
            <button
              type="submit"
              disabled={submitStatus === "loading"}
              className="px-8 py-3.5 rounded-full bg-saffron text-white font-display font-semibold hover:bg-saffron-light transition-colors disabled:opacity-60"
            >
              {submitStatus === "loading" ? "Sending..." : "Subscribe"}
            </button>
          </form>

          {submitStatus === "success" && (
            <p className="text-saffron-light font-body text-sm">You&rsquo;re subscribed — welcome aboard!</p>
          )}
          {submitStatus === "error" && (
            <p className="text-red-400 font-body text-sm">Something went wrong. Please try again.</p>
          )}
        </div>
      </section>

      {/* ── Join CTA ── */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-gradient-to-br from-saffron to-saffron-light relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center gap-8 text-center">
          <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-white">
            Join the Movement
          </h2>
          <p className="text-white/90 text-lg font-body leading-relaxed max-w-lg">
            Your support helps us build programs, launch chapters, and empower Sikh students across the nation.
          </p>
          <Link
            href="/donate"
            className="px-10 py-4 rounded-full bg-navy text-white font-display font-semibold text-lg hover:bg-navy-deep transition-colors shadow-lg"
          >
            Donate Now
          </Link>
        </div>
      </section>
    </div>
  );
}
