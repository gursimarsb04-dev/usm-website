"use client";

import { useEffect } from "react";
import Link from "next/link";
import { WarningCircle } from "@phosphor-icons/react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased selection:bg-saffron selection:text-navy">
        <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-8">
            <WarningCircle weight="fill" className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="font-display font-semibold text-5xl md:text-7xl tracking-tighter text-white mb-6">
            A critical error occurred.
          </h1>
          <p className="text-white/80 text-lg max-w-lg mb-10">
            We've logged the error and our team will look into it. There may be a missing configuration or environment variable.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => reset()}
              className="px-8 py-3.5 rounded-full bg-saffron text-navy font-medium hover:bg-saffron-light transition-colors"
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-8 py-3.5 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
