"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import Link from "next/link";

const ssaDisplayNames: Record<string, string> = {
  rusikh: "RUSIKH",
  "uc-berkeley": "Cal Sikh (UC Berkeley)",
  "uc-davis": "UC Davis SSA",
};

function LoginForm() {
  const searchParams = useSearchParams();
  const ssaParam = searchParams.get("ssa");
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const errorParam = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(errorParam ? "Invalid email or password." : "");
  const [loading, setLoading] = useState(false);

  const ssaName = ssaParam ? ssaDisplayNames[ssaParam] || ssaParam.toUpperCase() : null;
  const title = ssaName ? `${ssaName} Login` : "SSA Officer Login";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError("Invalid email or password.");
        setLoading(false);
      } else if (result?.ok) {
        // Redirect manually on success
        window.location.href = callbackUrl;
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-warm-white rounded-[2rem] p-8 sm:p-10 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-navy rounded-2xl mb-4">
              <span className="text-saffron font-display font-bold text-xl">
                USM
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-navy">
              {title}
            </h1>
            <p className="font-body text-slate-body mt-2 text-sm">
              Sign in to access your SSA dashboard
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-6 font-body text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block font-body text-sm font-medium text-navy mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@unitedsikhmovement.org"
                required
                className="w-full px-4 py-3 rounded-xl border border-off-white bg-white
                           font-body text-navy placeholder:text-warm-gray
                           focus:outline-none focus:ring-2 focus:ring-saffron/50 focus:border-saffron
                           transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-body text-sm font-medium text-navy mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 rounded-xl border border-off-white bg-white
                           font-body text-navy placeholder:text-warm-gray
                           focus:outline-none focus:ring-2 focus:ring-saffron/50 focus:border-saffron
                           transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-saffron hover:bg-saffron-light text-navy
                         font-display font-semibold rounded-xl
                         transition-colors duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed
                         focus:outline-none focus:ring-2 focus:ring-saffron/50 focus:ring-offset-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="font-body text-sm text-warm-gray hover:text-saffron-light transition-colors"
          >
            &larr; Back to main site
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-navy flex items-center justify-center">
          <div className="text-warm-gray font-body">Loading...</div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
