"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/sanity.config";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export default function StudioPage() {
  if (!projectId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy text-white p-8">
        <div className="max-w-md text-center">
          <h1 className="font-display text-3xl font-semibold mb-4">Sanity Studio</h1>
          <p className="text-white/70 mb-6">
            The CMS is not configured yet. Set the <code className="bg-white/10 px-2 py-1 rounded text-saffron">NEXT_PUBLIC_SANITY_PROJECT_ID</code> environment variable to connect your Sanity project.
          </p>
          <a
            href="https://www.sanity.io/manage"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-saffron text-navy font-medium rounded-full hover:bg-saffron-light transition-colors"
          >
            Go to Sanity Dashboard
          </a>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
