"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?usp=sf_link";

const REQUEST_CATEGORIES = [
  "Event Support",
  "Marketing Materials",
  "Mentorship",
  "Funding",
  "Other",
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex-1 flex items-center justify-center bg-cream min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-3 border-saffron border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-body text-warm-gray text-sm">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const userName = session.user?.name || "Officer";
  const userEmail = session.user?.email || "";
  const ssaSlug = (session.user as any)?.ssaSlug || "unknown";
  const ssaLabel = ssaSlug === "all" ? "USM Admin" : ssaSlug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());

  return (
    <div className="flex-1 bg-cream">
      {/* Dashboard Header */}
      <div className="bg-navy">
        <div className="mx-auto max-w-container px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-warm-white">
              USM SSA Dashboard
            </h1>
            <p className="font-body text-warm-gray text-sm mt-1">
              {userName} &middot; {ssaLabel}
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="font-body text-sm text-warm-gray hover:text-saffron-light
                       border border-warm-gray/30 hover:border-saffron/50
                       rounded-xl px-4 py-2 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-container px-6 py-10 space-y-10">
        {/* Welcome Card */}
        <div className="bg-white rounded-[2rem] ring-1 ring-black/5 shadow-sm p-8">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-navy">
            Welcome back, {userName}
          </h2>
          <p className="font-body text-slate-body mt-2">
            You are managing <span className="font-semibold text-navy">{ssaLabel}</span>.
            Use this dashboard to submit requests, view events, and stay connected with USM.
          </p>
        </div>

        {/* Quick Links Grid */}
        <div>
          <h3 className="font-display text-lg font-semibold text-navy mb-4">
            Quick Links
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Submit a Request */}
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-[2rem] ring-1 ring-black/5 shadow-sm p-8
                         hover:ring-saffron/30 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-saffron/10 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-saffron" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h4 className="font-display font-semibold text-navy group-hover:text-saffron transition-colors">
                Submit a Request
              </h4>
              <p className="font-body text-slate-body text-sm mt-1">
                Request supplies, support, event help, and more from USM.
              </p>
            </a>

            {/* View Events */}
            <Link
              href="/events"
              className="group bg-white rounded-[2rem] ring-1 ring-black/5 shadow-sm p-8
                         hover:ring-saffron/30 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-saffron/10 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-saffron" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
              </div>
              <h4 className="font-display font-semibold text-navy group-hover:text-saffron transition-colors">
                View Events
              </h4>
              <p className="font-body text-slate-body text-sm mt-1">
                Browse upcoming USM and SSA events across the country.
              </p>
            </Link>

            {/* Find an SSA */}
            <Link
              href="/find-ssa"
              className="group bg-white rounded-[2rem] ring-1 ring-black/5 shadow-sm p-8
                         hover:ring-saffron/30 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-saffron/10 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-saffron" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <h4 className="font-display font-semibold text-navy group-hover:text-saffron transition-colors">
                Find an SSA
              </h4>
              <p className="font-body text-slate-body text-sm mt-1">
                Locate Sikh Student Associations near you.
              </p>
            </Link>

            {/* Manage Your Chapter */}
            <div
              className="relative bg-white rounded-[2rem] ring-1 ring-black/5 shadow-sm p-8 opacity-60"
            >
              <span className="absolute top-6 right-6 inline-flex items-center rounded-full bg-navy/10 px-2.5 py-0.5 text-xs font-body font-medium text-navy">
                Coming Soon
              </span>
              <div className="w-10 h-10 rounded-xl bg-saffron/10 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-saffron" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <h4 className="font-display font-semibold text-navy">
                Manage Your Chapter
              </h4>
              <p className="font-body text-slate-body text-sm mt-1">
                Chapter management tools are on the way.
              </p>
            </div>
          </div>
        </div>

        {/* Request Form Section */}
        <div className="bg-white rounded-[2rem] ring-1 ring-black/5 shadow-sm p-8 sm:p-10">
          <div className="max-w-2xl">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-navy">
              Need Something?
            </h3>
            <p className="font-body text-slate-body mt-2">
              Submit your request through our form and our team will get back to
              you within 48 hours.
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
              {REQUEST_CATEGORIES.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center rounded-full bg-cream px-3 py-1
                             font-body text-xs font-medium text-navy"
                >
                  {cat}
                </span>
              ))}
            </div>

            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-8 py-3.5
                         bg-saffron hover:bg-saffron-light text-navy
                         font-display font-semibold rounded-xl
                         transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-saffron/50 focus:ring-offset-2"
            >
              Submit Request
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-[2rem] ring-1 ring-black/5 shadow-sm p-8">
          <h3 className="font-display text-lg font-semibold text-navy mb-4">
            Recent Activity
          </h3>
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <svg className="w-10 h-10 text-off-white mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <p className="font-body text-warm-gray text-sm">
              No recent activity
            </p>
          </div>
        </div>

        {/* Dashboard Footer */}
        <footer className="text-center py-6 border-t border-off-white">
          <p className="font-body text-warm-gray text-xs">
            &copy; {new Date().getFullYear()} United Sikh Movement Dashboard. All
            rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
