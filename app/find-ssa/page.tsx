"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { MagnifyingGlass, MapPin, ArrowRight } from "@phosphor-icons/react";
import EmailSignup from "@/components/EmailSignup";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

interface SSAChapter {
  university: string;
  city: string;
  state: string;
  status: "active";
}

const chapters: SSAChapter[] = [
  // California — 19
  { university: "Sacramento State", city: "Sacramento", state: "California", status: "active" },
  { university: "UC Berkeley", city: "Berkeley", state: "California", status: "active" },
  { university: "UC Davis", city: "Davis", state: "California", status: "active" },
  { university: "CSU Stanislaus", city: "Turlock", state: "California", status: "active" },
  { university: "Fresno State", city: "Fresno", state: "California", status: "active" },
  { university: "UC Merced", city: "Merced", state: "California", status: "active" },
  { university: "CSU East Bay", city: "Hayward", state: "California", status: "active" },
  { university: "San Francisco State", city: "San Francisco", state: "California", status: "active" },
  { university: "University of San Francisco", city: "San Francisco", state: "California", status: "active" },
  { university: "Cal Poly Pomona", city: "Pomona", state: "California", status: "active" },
  { university: "UC Riverside", city: "Riverside", state: "California", status: "active" },
  { university: "University of Southern California", city: "Los Angeles", state: "California", status: "active" },
  { university: "UC Irvine", city: "Irvine", state: "California", status: "active" },
  { university: "Cal State Fullerton", city: "Fullerton", state: "California", status: "active" },
  { university: "UC San Diego", city: "San Diego", state: "California", status: "active" },
  { university: "Cal State Long Beach", city: "Long Beach", state: "California", status: "active" },
  { university: "UCLA", city: "Los Angeles", state: "California", status: "active" },
  { university: "UC Santa Barbara", city: "Santa Barbara", state: "California", status: "active" },
  { university: "Orange Coast College", city: "Costa Mesa", state: "California", status: "active" },
  // Washington — 1
  { university: "University of Washington", city: "Seattle", state: "Washington", status: "active" },
  // New York — 1
  { university: "St. John's University", city: "Queens", state: "New York", status: "active" },
  // New Jersey — 2
  { university: "NJIT", city: "Newark", state: "New Jersey", status: "active" },
  { university: "Rutgers University", city: "New Brunswick", state: "New Jersey", status: "active" },
  // Indiana — 1
  { university: "Purdue University", city: "West Lafayette", state: "Indiana", status: "active" },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function FindSSAPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return chapters;
    return chapters.filter(
      (ch) =>
        ch.university.toLowerCase().includes(q) ||
        ch.city.toLowerCase().includes(q) ||
        ch.state.toLowerCase().includes(q)
    );
  }, [query]);

  const stateCount = useMemo(
    () => new Set(chapters.map((c) => c.state)).size,
    []
  );

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-navy pt-40 pb-16 md:pt-48 md:pb-20 relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-saffron/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center gap-6">
          <h1 className="font-display font-semibold text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[1.05] text-white max-w-3xl text-balance">
            Find Your Community
          </h1>
          <p className="font-body text-xl md:text-2xl text-white/70 max-w-2xl leading-relaxed">
            {chapters.length} active SSA chapters across {stateCount} states
            &mdash; and growing.
          </p>
        </div>
      </section>

      {/* ── Search Bar ── */}
      <section className="bg-navy pb-12 md:pb-16">
        <div className="max-w-[700px] mx-auto px-6 md:px-12 relative z-10">
          <div className="relative">
            <MagnifyingGlass
              weight="bold"
              className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by university or state..."
              className="w-full rounded-full bg-white/10 text-white placeholder-white/40 pl-14 pr-6 py-4 md:py-5 text-lg font-body outline-none border-2 border-white/10 focus:border-saffron transition-colors"
            />
          </div>
        </div>
      </section>

      {/* ── Chapter Grid ── */}
      <section className="bg-warm-white py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-navy mb-2">
                No chapters found
              </p>
              <p className="font-body text-slate-body">
                Try a different search term, or{" "}
                <Link
                  href="/donate"
                  className="text-saffron underline underline-offset-4 hover:text-saffron-light transition-colors"
                >
                  start a chapter
                </Link>{" "}
                at your school.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((ch) => (
                <div
                  key={ch.university}
                  className="group bg-white rounded-[2rem] ring-1 ring-black/5 shadow-md shadow-navy/5 overflow-hidden hover:shadow-xl hover:shadow-navy/10 hover:-translate-y-1 transition-all duration-500 flex flex-col"
                >
                  {/* Card header */}
                  <div className="bg-gradient-to-br from-saffron to-saffron-light px-8 pt-8 pb-6 relative overflow-hidden">
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full pointer-events-none" />
                    <h3 className="font-display font-semibold text-xl md:text-2xl text-white leading-tight relative z-10">
                      {ch.university}
                    </h3>
                  </div>

                  {/* Card body */}
                  <div className="px-8 py-6 flex flex-col flex-1 gap-4">
                    <div className="flex items-center gap-2 text-slate-body font-body">
                      <MapPin weight="fill" className="w-4 h-4 text-warm-gray shrink-0" />
                      <span>
                        {ch.city}, {ch.state}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 w-fit text-xs uppercase tracking-[0.15em] font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Active
                    </span>

                    <div className="mt-auto pt-4">
                      <a
                        href={`mailto:info@unitedsikhs.org?subject=Connect with ${ch.university} SSA`}
                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-navy text-white font-medium text-base hover:bg-navy-deep transition-colors group/btn"
                      >
                        Connect
                        <ArrowRight
                          weight="bold"
                          className="w-4 h-4 transition-transform group-hover/btn:translate-x-1"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Start a Chapter CTA ── */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-8">
          <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-navy leading-[1.1]">
            Don&rsquo;t See Your School?
          </h2>
          <p className="font-body text-lg md:text-xl text-slate-body max-w-xl leading-relaxed">
            We&rsquo;re always looking to expand. If there&rsquo;s no SSA at your
            campus yet, you can be the one to change that.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/donate"
              className="flex items-center justify-center gap-2 bg-saffron text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-saffron-light transition-colors group"
            >
              Start a Chapter
              <ArrowRight
                weight="bold"
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
              />
            </Link>
            <a
              href="mailto:info@unitedsikhs.org?subject=Start an SSA Chapter"
              className="flex items-center justify-center gap-2 border-2 border-off-white text-navy px-8 py-4 rounded-full font-medium text-lg hover:border-navy hover:bg-navy/5 transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* ── Email Capture ── */}
      <section className="py-24 md:py-32 bg-white relative flex justify-center px-6">
        <div className="w-full max-w-[1000px] bg-navy rounded-[3rem] md:rounded-[4rem] px-8 md:px-16 py-16 md:py-20 relative overflow-hidden flex flex-col items-center text-center gap-8 shadow-2xl shadow-navy/20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

          <div className="flex flex-col gap-4 items-center relative z-10">
            <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-white max-w-lg leading-[1.1]">
              Stay in the Loop
            </h2>
            <p className="font-body text-lg text-white/70 max-w-md leading-relaxed">
              Get updates on new chapters, events, and opportunities delivered
              straight to your inbox.
            </p>
          </div>

          <div className="w-full max-w-md relative z-10">
            <EmailSignup theme="dark" />
          </div>
        </div>
      </section>
    </>
  );
}
