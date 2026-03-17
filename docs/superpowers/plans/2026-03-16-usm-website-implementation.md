# USM Website Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the structural foundation of the United Sikh Movement website — project scaffolding, Sanity CMS, API routes, page routing, and data fetching — ready for Antigravity to layer on frontend design.

**Architecture:** Next.js 14 App Router with Sanity.io as headless CMS, Stripe for donations, Mailchimp for email signups. Server Components by default, Client Components only where interactivity is required. ISR for content caching.

**Tech Stack:** Next.js 14, Tailwind CSS v3, Sanity.io, Stripe, Mailchimp API, Vercel

**Note:** Frontend styling, motion, and component aesthetics are handled by Antigravity separately. This plan delivers the skeleton: routing, data layer, CMS schemas, API contracts, and basic page shells with data flowing through them.

---

## File Structure

```
usm-website/
├── app/
│   ├── layout.tsx                    # Root layout (fonts, metadata, skip-to-content)
│   ├── page.tsx                      # Home page (Server Component, fetches from Sanity)
│   ├── not-found.tsx                 # Custom 404
│   ├── error.tsx                     # Global error boundary
│   ├── robots.ts                     # robots.txt generation
│   ├── sitemap.ts                    # sitemap.xml generation
│   ├── about/
│   │   └── page.tsx                  # About page
│   ├── ssa/
│   │   ├── page.tsx                  # SSA directory listing
│   │   └── [slug]/
│   │       └── page.tsx              # SSA detail page
│   ├── events/
│   │   ├── page.tsx                  # Events listing
│   │   └── [slug]/
│   │       └── page.tsx              # Event detail page
│   ├── donate/
│   │   ├── page.tsx                  # Donate page
│   │   └── thank-you/
│   │       └── page.tsx              # Post-donation confirmation
│   ├── blog/
│   │   ├── page.tsx                  # Blog listing (deferred — placeholder shell)
│   │   └── [slug]/
│   │       └── page.tsx              # Blog post detail (deferred — placeholder shell)
│   ├── studio/
│   │   └── [[...tool]]/
│   │       └── page.tsx              # Sanity Studio embed
│   └── api/
│       ├── mailchimp/
│       │   └── route.ts              # POST: subscribe email
│       ├── donate/
│       │   └── route.ts              # POST: create Stripe Checkout session
│       ├── donation-progress/
│       │   └── route.ts              # GET: fetch donation total from Stripe
│       └── revalidate/
│           └── route.ts              # POST: on-demand ISR revalidation
├── sanity/
│   ├── client.ts                     # Sanity client instance
│   ├── image.ts                      # @sanity/image-url helper
│   ├── queries.ts                    # All GROQ queries in one place
│   ├── schemas/
│   │   ├── index.ts                  # Schema registry
│   │   ├── ssa.ts                    # SSA schema
│   │   ├── event.ts                  # Event schema
│   │   ├── teamMember.ts             # TeamMember schema
│   │   ├── testimonial.ts            # Testimonial schema
│   │   ├── blogPost.ts               # BlogPost schema
│   │   ├── faq.ts                    # FAQ schema
│   │   └── siteSettings.ts           # SiteSettings singleton
│   └── sanity.config.ts              # Sanity project config
├── lib/
│   ├── stripe.ts                     # Stripe client instance
│   ├── mailchimp.ts                  # Mailchimp API helper
│   └── utils.ts                      # Shared utilities (formatDate, formatCurrency, etc.)
├── types/
│   └── index.ts                      # TypeScript types for all Sanity documents
├── .env.local.example                # Template for environment variables
├── tailwind.config.ts                # Tailwind config with USM color tokens
├── next.config.ts                    # Next.js config (Sanity image domains, etc.)
└── package.json
```

---

## Chunk 1: Project Scaffolding & Configuration

### Task 1: Initialize Next.js project

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `app/layout.tsx`, `app/page.tsx`

- [ ] **Step 1: Scaffold Next.js with Tailwind**

```bash
cd /Users/gursimarsingh/Documents/usm-website
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

Expected: Project created with App Router structure.

- [ ] **Step 2: Install all project dependencies**

```bash
npm install next-sanity @sanity/image-url @sanity/vision sanity styled-components
npm install stripe @stripe/stripe-js
npm install @phosphor-icons/react
npm install framer-motion
npm install @portabletext/react
npm install -D @types/node
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 14 project with dependencies"
```

### Task 2: Environment variables and Next.js config

**Files:**
- Create: `.env.local.example`
- Modify: `next.config.ts`

- [ ] **Step 1: Create `.env.local.example`**

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
# STRIPE_WEBHOOK_SECRET=       # uncomment if using webhook mode

# Mailchimp
MAILCHIMP_API_KEY=
MAILCHIMP_LIST_ID=
MAILCHIMP_SERVER_PREFIX=

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Revalidation
REVALIDATION_SECRET=
```

- [ ] **Step 2: Update `next.config.ts`**

Add Sanity CDN image domain and Picsum (dev placeholders) to `images.remotePatterns`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 3: Commit**

```bash
git add .env.local.example next.config.ts
git commit -m "feat: add env template and configure image domains"
```

### Task 3: Tailwind config with USM design tokens

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Add USM color palette and font families to Tailwind**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0F1B2D",
          deep: "#0A1220",
        },
        saffron: {
          DEFAULT: "#D4912A",
          light: "#F0C96E",
        },
        cream: "#FDFAF5",
        "warm-white": "#FEFDFB",
        "slate-body": "#4A5568",
        "warm-gray": "#94A3B8",
        "off-white": "#E8E4DF",
      },
      fontFamily: {
        display: ["Clash Display", "sans-serif"],
        body: ["Satoshi", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      maxWidth: {
        container: "1400px",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: add USM design tokens to Tailwind config"
```

### Task 4: TypeScript types for all Sanity documents

**Files:**
- Create: `types/index.ts`

- [ ] **Step 1: Define all document types**

```typescript
export interface SSA {
  _id: string;
  _type: "ssa";
  name: string;
  slug: { current: string };
  university: string;
  state: string;
  city: string;
  region: "West" | "Midwest" | "East" | "South";
  logo?: SanityImage;
  description?: string;
  contactEmail?: string;
  instagramUrl?: string;
  websiteUrl?: string;
  memberCount?: number;
  foundedYear?: number;
}

export interface Event {
  _id: string;
  _type: "event";
  title: string;
  slug: { current: string };
  date: string;
  location: string;
  description?: any[]; // Portable Text
  coverImage?: SanityImage;
  eventbriteUrl?: string;
  eventType: "conference" | "retreat" | "social" | "workshop";
  hostedBy?: SSA;
  isFeatured: boolean;
}

export interface TeamMember {
  _id: string;
  _type: "teamMember";
  name: string;
  role: string;
  group: "Executive Board" | "Advisors" | "Regional Leads";
  photo?: SanityImage;
  bio?: string;
  linkedinUrl?: string;
  order: number;
}

export interface Testimonial {
  _id: string;
  _type: "testimonial";
  quote: string;
  authorName: string;
  authorRole?: string;
  authorPhoto?: SanityImage;
  ssa?: SSA;
}

export interface BlogPost {
  _id: string;
  _type: "blogPost";
  title: string;
  slug: { current: string };
  author: string;
  publishedAt: string;
  coverImage?: SanityImage;
  body?: any[]; // Portable Text
  tags?: string[];
}

export interface FAQ {
  _id: string;
  _type: "faq";
  question: string;
  answer: string;
  category: string;
}

export interface SiteSettings {
  _id: string;
  _type: "siteSettings";
  heroHeadline: string;
  heroSubtext?: string;
  heroImage?: SanityImage;
  donationGoal?: number;
  trustedByLogos?: SanityImage[];
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

// API request/response types

export interface MailchimpRequest {
  email: string;
  firstName?: string;
}

export interface DonateRequest {
  amount: number; // in USD cents
  frequency: "one-time" | "monthly";
  donorEmail?: string;
}

export interface DonationProgressResponse {
  total: number;
  goal: number;
  currency: "usd";
}
```

- [ ] **Step 2: Commit**

```bash
git add types/index.ts
git commit -m "feat: add TypeScript types for all Sanity documents and API contracts"
```

### Task 5: Shared utility functions

**Files:**
- Create: `lib/utils.ts`

- [ ] **Step 1: Write utility functions**

```typescript
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

export function getSSAConnectUrl(ssa: {
  websiteUrl?: string;
  contactEmail?: string;
}): string {
  if (ssa.websiteUrl) return ssa.websiteUrl;
  if (ssa.contactEmail) return `mailto:${ssa.contactEmail}`;
  return "#";
}

export function getSSAJoinUrl(ssa: {
  websiteUrl?: string;
  instagramUrl?: string;
  contactEmail?: string;
}): string {
  if (ssa.websiteUrl) return ssa.websiteUrl;
  if (ssa.instagramUrl) return ssa.instagramUrl;
  if (ssa.contactEmail) return `mailto:${ssa.contactEmail}`;
  return "#";
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/utils.ts
git commit -m "feat: add shared utility functions"
```

---

## Chunk 2: Sanity CMS Setup

### Task 6: Sanity client and image helper

**Files:**
- Create: `sanity/client.ts`, `sanity/image.ts`

- [ ] **Step 1: Create Sanity client**

```typescript
// sanity/client.ts
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
});

// Preview client (no CDN cache)
export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
```

- [ ] **Step 2: Create image URL helper**

```typescript
// sanity/image.ts
import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";
import type { SanityImage } from "@/types";

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}
```

- [ ] **Step 3: Commit**

```bash
git add sanity/client.ts sanity/image.ts
git commit -m "feat: add Sanity client and image URL helper"
```

### Task 7: All Sanity schemas

**Files:**
- Create: `sanity/schemas/ssa.ts`, `sanity/schemas/event.ts`, `sanity/schemas/teamMember.ts`, `sanity/schemas/testimonial.ts`, `sanity/schemas/blogPost.ts`, `sanity/schemas/faq.ts`, `sanity/schemas/siteSettings.ts`, `sanity/schemas/index.ts`

- [ ] **Step 1: SSA schema**

```typescript
// sanity/schemas/ssa.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "ssa",
  title: "SSA",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "university", title: "University", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "state", title: "State", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "city", title: "City", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "region",
      title: "Region",
      type: "string",
      options: { list: ["West", "Midwest", "East", "South"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })] }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "contactEmail", title: "Contact Email", type: "string" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "websiteUrl", title: "Website URL", type: "url" }),
    defineField({ name: "memberCount", title: "Member Count", type: "number" }),
    defineField({ name: "foundedYear", title: "Founded Year", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "university" },
  },
});
```

- [ ] **Step 2: Event schema**

```typescript
// sanity/schemas/event.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "date", title: "Date", type: "datetime", validation: (Rule) => Rule.required() }),
    defineField({ name: "location", title: "Location", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })] }),
    defineField({ name: "eventbriteUrl", title: "Eventbrite URL", type: "url" }),
    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
      options: { list: ["conference", "retreat", "social", "workshop"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "hostedBy", title: "Hosted By", type: "reference", to: [{ type: "ssa" }] }),
    defineField({ name: "isFeatured", title: "Featured", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "title", subtitle: "date" },
  },
  orderings: [
    { title: "Date (Newest)", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
});
```

- [ ] **Step 3: TeamMember schema**

```typescript
// sanity/schemas/teamMember.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "role", title: "Role", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "group",
      title: "Group",
      type: "string",
      options: { list: ["Executive Board", "Advisors", "Regional Leads"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })] }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 4 }),
    defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 0 }),
  ],
  preview: {
    select: { title: "name", subtitle: "role" },
  },
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
```

- [ ] **Step 4: Testimonial schema**

```typescript
// sanity/schemas/testimonial.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: "authorName", title: "Author Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "authorRole", title: "Author Role", type: "string" }),
    defineField({ name: "authorPhoto", title: "Author Photo", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })] }),
    defineField({ name: "ssa", title: "SSA", type: "reference", to: [{ type: "ssa" }] }),
  ],
  preview: {
    select: { title: "authorName", subtitle: "authorRole" },
  },
});
```

- [ ] **Step 5: BlogPost schema**

```typescript
// sanity/schemas/blogPost.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "author", title: "Author", type: "string" }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })] }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt" },
  },
});
```

- [ ] **Step 6: FAQ schema**

```typescript
// sanity/schemas/faq.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: "category", title: "Category", type: "string", validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: "question", subtitle: "category" },
  },
});
```

- [ ] **Step 7: SiteSettings singleton schema**

```typescript
// sanity/schemas/siteSettings.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "heroHeadline", title: "Hero Headline", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "heroSubtext", title: "Hero Subtext", type: "text", rows: 3 }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })] }),
    defineField({ name: "donationGoal", title: "Donation Goal (USD cents)", type: "number" }),
    defineField({
      name: "trustedByLogos",
      title: "Trusted By Logos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })] }],
    }),
  ],
  // Singleton: prevent creating multiple
  __experimental_actions: [/* "create", */ "update", "delete", "publish"],
});
```

- [ ] **Step 8: Schema registry**

```typescript
// sanity/schemas/index.ts
import ssa from "./ssa";
import event from "./event";
import teamMember from "./teamMember";
import testimonial from "./testimonial";
import blogPost from "./blogPost";
import faq from "./faq";
import siteSettings from "./siteSettings";

export const schemaTypes = [ssa, event, teamMember, testimonial, blogPost, faq, siteSettings];
```

- [ ] **Step 9: Commit**

```bash
git add sanity/schemas/
git commit -m "feat: add all Sanity CMS schemas"
```

### Task 8: Sanity Studio configuration and embed

**Files:**
- Create: `sanity/sanity.config.ts`, `app/studio/[[...tool]]/page.tsx`

- [ ] **Step 1: Sanity config**

```typescript
// sanity/sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "usm-studio",
  title: "USM Content Studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
```

- [ ] **Step 2: Studio page route**

```typescript
// app/studio/[[...tool]]/page.tsx
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

- [ ] **Step 3: Commit**

```bash
git add sanity/sanity.config.ts app/studio/
git commit -m "feat: embed Sanity Studio at /studio route"
```

### Task 9: GROQ queries

**Files:**
- Create: `sanity/queries.ts`

- [ ] **Step 1: Write all GROQ queries**

```typescript
// sanity/queries.ts
import { groq } from "next-sanity";

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    heroHeadline,
    heroSubtext,
    heroImage,
    donationGoal,
    trustedByLogos
  }
`;

// SSAs
export const allSSAsQuery = groq`
  *[_type == "ssa"] | order(name asc) {
    _id, name, slug, university, state, city, region,
    logo, description, contactEmail, instagramUrl,
    websiteUrl, memberCount, foundedYear
  }
`;

export const ssaBySlugQuery = groq`
  *[_type == "ssa" && slug.current == $slug][0] {
    _id, name, slug, university, state, city, region,
    logo, description, contactEmail, instagramUrl,
    websiteUrl, memberCount, foundedYear
  }
`;

export const ssaSlugsQuery = groq`
  *[_type == "ssa" && defined(slug.current)][].slug.current
`;

// Events
export const upcomingEventsQuery = groq`
  *[_type == "event" && date >= now()] | order(date asc) {
    _id, title, slug, date, location, coverImage,
    eventbriteUrl, eventType, isFeatured,
    "hostedBy": hostedBy->{ name, slug }
  }
`;

export const pastEventsQuery = groq`
  *[_type == "event" && date < now()] | order(date desc) {
    _id, title, slug, date, location, coverImage,
    eventbriteUrl, eventType,
    "hostedBy": hostedBy->{ name, slug }
  }
`;

export const featuredEventsQuery = groq`
  *[_type == "event" && isFeatured == true && date >= now()] | order(date asc) [0...3] {
    _id, title, slug, date, location, coverImage,
    eventbriteUrl, eventType,
    "hostedBy": hostedBy->{ name, slug }
  }
`;

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id, title, slug, date, location, description,
    coverImage, eventbriteUrl, eventType, isFeatured,
    "hostedBy": hostedBy->{ _id, name, slug }
  }
`;

export const eventSlugsQuery = groq`
  *[_type == "event" && defined(slug.current)][].slug.current
`;

export const eventsBySSAQuery = groq`
  *[_type == "event" && hostedBy._ref == $ssaId && date >= now()] | order(date asc) [0...5] {
    _id, title, slug, date, location, eventType, eventbriteUrl
  }
`;

// Team Members
export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id, name, role, group, photo, bio, linkedinUrl, order
  }
`;

// Testimonials
export const testimonialsQuery = groq`
  *[_type == "testimonial"] {
    _id, quote, authorName, authorRole, authorPhoto,
    "ssa": ssa->{ name }
  }
`;

// FAQs
export const faqsQuery = groq`
  *[_type == "faq"] | order(category asc) {
    _id, question, answer, category
  }
`;

// Home page: combined query for all homepage data
export const homePageQuery = groq`{
  "settings": *[_type == "siteSettings"][0] {
    heroHeadline, heroSubtext, heroImage, donationGoal, trustedByLogos
  },
  "featuredEvents": *[_type == "event" && isFeatured == true && date >= now()] | order(date asc) [0...3] {
    _id, title, slug, date, location, coverImage, eventbriteUrl, eventType,
    "hostedBy": hostedBy->{ name, slug }
  },
  "testimonials": *[_type == "testimonial"] {
    _id, quote, authorName, authorRole, authorPhoto,
    "ssa": ssa->{ name }
  },
  "ssaCount": count(*[_type == "ssa"]),
  "eventCount": count(*[_type == "event"]),
  "stateCount": count(array::unique(*[_type == "ssa"].state))
}`;
```

- [ ] **Step 2: Commit**

```bash
git add sanity/queries.ts
git commit -m "feat: add all GROQ queries for Sanity data fetching"
```

---

## Chunk 3: API Routes

### Task 10: Stripe client setup

**Files:**
- Create: `lib/stripe.ts`

- [ ] **Step 1: Create Stripe client**

```typescript
// lib/stripe.ts
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
  typescript: true,
});
```

- [ ] **Step 2: Commit**

```bash
git add lib/stripe.ts
git commit -m "feat: add Stripe client instance"
```

### Task 11: Mailchimp helper

**Files:**
- Create: `lib/mailchimp.ts`

- [ ] **Step 1: Create Mailchimp helper**

```typescript
// lib/mailchimp.ts

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY!;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID!;
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX!;

interface SubscribeParams {
  email: string;
  firstName?: string;
}

export async function subscribeToMailchimp({ email, firstName }: SubscribeParams) {
  const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `apikey ${MAILCHIMP_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      status: "subscribed",
      merge_fields: firstName ? { FNAME: firstName } : {},
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    if (data.title === "Member Exists") {
      return { success: false, error: "Already subscribed" };
    }
    return { success: false, error: "Subscription failed" };
  }

  return { success: true };
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/mailchimp.ts
git commit -m "feat: add Mailchimp API helper"
```

### Task 12: POST /api/mailchimp

**Files:**
- Create: `app/api/mailchimp/route.ts`

- [ ] **Step 1: Implement route**

```typescript
// app/api/mailchimp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { subscribeToMailchimp } from "@/lib/mailchimp";

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000; // 1 minute
  const maxRequests = 5;

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }
  entry.count++;
  return entry.count > maxRequests;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { email, firstName } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const result = await subscribeToMailchimp({ email, firstName });

    if (!result.success) {
      const status = result.error === "Already subscribed" ? 409 : 500;
      return NextResponse.json({ error: result.error }, { status });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/mailchimp/route.ts
git commit -m "feat: add POST /api/mailchimp route with rate limiting"
```

### Task 13: POST /api/donate

**Files:**
- Create: `app/api/donate/route.ts`

- [ ] **Step 1: Implement route**

```typescript
// app/api/donate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, frequency, donorEmail } = body;

    // Validate amount (in USD cents, 1 cent to $500)
    if (!amount || typeof amount !== "number" || amount < 1 || amount > 50_000) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    if (!["one-time", "monthly"].includes(frequency)) {
      return NextResponse.json({ error: "Invalid frequency" }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    if (frequency === "monthly") {
      // Create a subscription via Stripe Checkout
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer_email: donorEmail || undefined,
        line_items: [
          {
            price_data: {
              currency: "usd",
              recurring: { interval: "month" },
              product_data: {
                name: "Monthly Donation to United Sikh Movement",
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        success_url: `${siteUrl}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/donate`,
      });

      return NextResponse.json({ url: session.url });
    }

    // One-time payment
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: donorEmail || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Donation to United Sikh Movement",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/donate`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/donate/route.ts
git commit -m "feat: add POST /api/donate route for Stripe Checkout"
```

### Task 14: GET /api/donation-progress

**Files:**
- Create: `app/api/donation-progress/route.ts`

- [ ] **Step 1: Implement route**

```typescript
// app/api/donation-progress/route.ts
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { client } from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/queries";

export async function GET() {
  try {
    // Fetch donation goal from Sanity
    const settings = await client.fetch(siteSettingsQuery);
    const goal = settings?.donationGoal || 0;

    // Fetch total from Stripe (sum of successful payments)
    let total = 0;
    const charges = await stripe.charges.list({
      limit: 100,
      // In production, you'd paginate through all charges
      // or use Stripe's reporting API for accurate totals
    });

    for (const charge of charges.data) {
      if (charge.paid && !charge.refunded) {
        total += charge.amount;
      }
    }

    return NextResponse.json(
      { total, goal, currency: "usd" as const },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
        },
      }
    );
  } catch (error) {
    console.error("Donation progress error:", error);
    return NextResponse.json(
      { total: 0, goal: 0, currency: "usd" as const },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/donation-progress/route.ts
git commit -m "feat: add GET /api/donation-progress route"
```

### Task 15: POST /api/revalidate

**Files:**
- Create: `app/api/revalidate/route.ts`

- [ ] **Step 1: Implement on-demand revalidation route**

```typescript
// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const path = searchParams.get("path");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  if (!path) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }

  try {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/revalidate/route.ts
git commit -m "feat: add POST /api/revalidate for on-demand ISR"
```

---

## Chunk 4: Page Routing & Data Shells

### Task 16: Root layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Set up root layout with fonts, metadata defaults, and skip-to-content**

```typescript
// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "United Sikh Movement",
    template: "%s | United Sikh Movement",
  },
  description:
    "America's largest Sikh student network. Connecting Sikh student organizations across the country to build unity, mentorship, and spiritual grounding.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "United Sikh Movement",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-saffron focus:text-navy"
        >
          Skip to content
        </a>
        {/* Navbar will be added here by Antigravity */}
        <main id="main-content">{children}</main>
        {/* Footer will be added here by Antigravity */}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: set up root layout with metadata and skip-to-content"
```

### Task 17: Home page with data fetching

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Home page Server Component that fetches all homepage data**

```typescript
// app/page.tsx
import { client } from "@/sanity/client";
import { homePageQuery } from "@/sanity/queries";

export const revalidate = 1800; // 30 minutes

export default async function HomePage() {
  const data = await client.fetch(homePageQuery);

  const { settings, featuredEvents, testimonials, ssaCount, eventCount, stateCount } = data;

  return (
    <>
      {/* Hero Section */}
      <section data-section="hero">
        <h1>{settings?.heroHeadline || "Empowering Sikh Students to Lead, Connect, and Grow"}</h1>
        <p>{settings?.heroSubtext}</p>
        {/* CTAs: "Find Your SSA" + "Join the Movement" — styled by Antigravity */}
      </section>

      {/* Trusted By */}
      <section data-section="trusted-by">
        {settings?.trustedByLogos?.map((logo: any, i: number) => (
          <div key={i}>{/* Logo image — styled by Antigravity */}</div>
        ))}
      </section>

      {/* Pillars */}
      <section data-section="pillars">
        {/* Static content: Academic Excellence, Professional Mentorship, Spiritual Grounding */}
        {/* Layout and images — styled by Antigravity */}
      </section>

      {/* Impact Stats */}
      <section data-section="impact-stats">
        <div data-stat="ssas">{ssaCount}</div>
        <div data-stat="events">{eventCount}</div>
        <div data-stat="states">{stateCount}</div>
      </section>

      {/* Testimonials */}
      <section data-section="testimonials">
        {testimonials?.map((t: any) => (
          <div key={t._id} data-testimonial>
            <blockquote>{t.quote}</blockquote>
            <cite>{t.authorName}</cite>
            <span>{t.authorRole}</span>
            <span>{t.ssa?.name}</span>
          </div>
        ))}
      </section>

      {/* Featured Events */}
      <section data-section="featured-events">
        {featuredEvents?.map((e: any) => (
          <div key={e._id} data-event>
            <span>{e.date}</span>
            <h3>{e.title}</h3>
            <span>{e.location}</span>
            <a href={e.eventbriteUrl || `/events/${e.slug.current}`}>Register</a>
          </div>
        ))}
      </section>

      {/* Join the Movement — email signup + donate CTA */}
      <section data-section="join-the-movement">
        {/* EmailSignup component + Donate link — styled by Antigravity */}
      </section>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add home page with Sanity data fetching"
```

### Task 18: About page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: About page with team members and FAQs**

```typescript
// app/about/page.tsx
import { Metadata } from "next";
import { client } from "@/sanity/client";
import { teamMembersQuery, faqsQuery } from "@/sanity/queries";
import type { TeamMember, FAQ } from "@/types";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about United Sikh Movement — our mission, story, and the team behind America's largest Sikh student network.",
};

export const revalidate = 3600;

export default async function AboutPage() {
  const [teamMembers, faqs] = await Promise.all([
    client.fetch<TeamMember[]>(teamMembersQuery),
    client.fetch<FAQ[]>(faqsQuery),
  ]);

  // Group team members
  const groups = teamMembers.reduce<Record<string, TeamMember[]>>((acc, member) => {
    const group = member.group || "Team";
    if (!acc[group]) acc[group] = [];
    acc[group].push(member);
    return acc;
  }, {});

  // Group FAQs by category
  const faqCategories = faqs.reduce<Record<string, FAQ[]>>((acc, faq) => {
    if (!acc[faq.category]) acc[faq.category] = [];
    acc[faq.category].push(faq);
    return acc;
  }, {});

  return (
    <>
      {/* Origin Story */}
      <section data-section="origin-story">
        <h1>Our Story</h1>
        {/* Timeline content — styled by Antigravity */}
      </section>

      {/* Mission & Values */}
      <section data-section="mission">
        <h2>Our Mission</h2>
        <p>
          Sikh students don&apos;t have to choose between success and spirituality.
          They need mentorship from Sikhs across fields like tech, finance, consulting,
          and medicine, alongside spiritual grounding that makes their identity a strength.
        </p>
      </section>

      {/* Leadership Team */}
      <section data-section="team">
        {Object.entries(groups).map(([groupName, members]) => (
          <div key={groupName} data-team-group={groupName}>
            <h3>{groupName}</h3>
            {members.map((member) => (
              <div key={member._id} data-team-member>
                <span>{member.name}</span>
                <span>{member.role}</span>
                <p>{member.bio}</p>
                {member.linkedinUrl && <a href={member.linkedinUrl}>LinkedIn</a>}
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section data-section="faq">
        {Object.entries(faqCategories).map(([category, items]) => (
          <div key={category} data-faq-category={category}>
            <h3>{category}</h3>
            {items.map((faq) => (
              <details key={faq._id}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        ))}
      </section>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: add about page with team members and FAQ data"
```

### Task 19: SSA directory and detail page

**Files:**
- Create: `app/ssa/page.tsx`, `app/ssa/[slug]/page.tsx`

- [ ] **Step 1: SSA listing page**

```typescript
// app/ssa/page.tsx
import { Metadata } from "next";
import { client } from "@/sanity/client";
import { allSSAsQuery } from "@/sanity/queries";
import type { SSA } from "@/types";

export const metadata: Metadata = {
  title: "Find an SSA",
  description: "Find a Sikh Student Association near you. Browse SSAs across the country by region, state, or school name.",
};

export const revalidate = 3600;

export default async function SSADirectoryPage() {
  const ssas = await client.fetch<SSA[]>(allSSAsQuery);

  // Extract unique regions and states for filter options
  const regions = [...new Set(ssas.map((s) => s.region))].sort();
  const states = [...new Set(ssas.map((s) => s.state))].sort();

  return (
    <>
      <section data-section="ssa-header">
        <h1>Find an SSA</h1>
        <p>Connect with a Sikh Student Association at your school or in your area.</p>
      </section>

      {/*
        SSADirectory Client Component — receives all data as props for client-side filtering.
        Antigravity will build this component with filter UI and grid layout.
        Props: { ssas: SSA[], regions: string[], states: string[] }
      */}
      {/* <SSADirectory ssas={ssas} regions={regions} states={states} /> */}

      {/* Placeholder for SSA data rendering until Client Component is built */}
      <section data-section="ssa-grid">
        {ssas.length === 0 ? (
          <div data-empty-state>
            <p>No SSAs found. Want to start one?</p>
            <a href="mailto:contact@unitedsikh.org">Contact USM</a>
          </div>
        ) : (
          ssas.map((ssa) => (
            <a key={ssa._id} href={`/ssa/${ssa.slug.current}`} data-ssa-card>
              <span>{ssa.name}</span>
              <span>{ssa.university}</span>
              <span>{ssa.city}, {ssa.state}</span>
              {ssa.memberCount && <span>{ssa.memberCount} members</span>}
            </a>
          ))
        )}
      </section>
    </>
  );
}
```

- [ ] **Step 2: SSA detail page**

```typescript
// app/ssa/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { ssaBySlugQuery, ssaSlugsQuery, eventsBySSAQuery } from "@/sanity/queries";
import { getSSAJoinUrl } from "@/lib/utils";
import type { SSA, Event } from "@/types";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(ssaSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const ssa = await client.fetch<SSA | null>(ssaBySlugQuery, { slug: params.slug });
  if (!ssa) return {};
  return {
    title: `${ssa.name} — ${ssa.university}`,
    description: ssa.description || `Learn about ${ssa.name} at ${ssa.university}.`,
  };
}

export default async function SSADetailPage({ params }: { params: { slug: string } }) {
  const ssa = await client.fetch<SSA | null>(ssaBySlugQuery, { slug: params.slug });
  if (!ssa) notFound();

  const upcomingEvents = await client.fetch<Event[]>(eventsBySSAQuery, { ssaId: ssa._id });
  const joinUrl = getSSAJoinUrl(ssa);

  return (
    <>
      <section data-section="ssa-detail">
        <h1>{ssa.name}</h1>
        <p>{ssa.university} — {ssa.city}, {ssa.state}</p>
        {ssa.description && <p>{ssa.description}</p>}
        {ssa.memberCount && <span>{ssa.memberCount} members</span>}
        {ssa.foundedYear && <span>Founded {ssa.foundedYear}</span>}

        <div data-contact>
          {ssa.contactEmail && <a href={`mailto:${ssa.contactEmail}`}>Email</a>}
          {ssa.instagramUrl && <a href={ssa.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>}
          {ssa.websiteUrl && <a href={ssa.websiteUrl} target="_blank" rel="noopener noreferrer">Website</a>}
        </div>

        <a href={joinUrl} target="_blank" rel="noopener noreferrer" data-cta="join">
          Join This SSA
        </a>
      </section>

      {upcomingEvents.length > 0 && (
        <section data-section="ssa-events">
          <h2>Upcoming Events</h2>
          {upcomingEvents.map((event) => (
            <a key={event._id} href={`/events/${event.slug.current}`} data-event-card>
              <span>{event.date}</span>
              <span>{event.title}</span>
              <span>{event.location}</span>
            </a>
          ))}
        </section>
      )}
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/ssa/
git commit -m "feat: add SSA directory listing and detail pages"
```

### Task 20: Events listing and detail page

**Files:**
- Create: `app/events/page.tsx`, `app/events/[slug]/page.tsx`

- [ ] **Step 1: Events listing page**

```typescript
// app/events/page.tsx
import { Metadata } from "next";
import { client } from "@/sanity/client";
import { upcomingEventsQuery, pastEventsQuery } from "@/sanity/queries";
import { formatDate } from "@/lib/utils";
import type { Event } from "@/types";

export const metadata: Metadata = {
  title: "Events",
  description: "Discover upcoming Sikh student events — conferences, retreats, workshops, and socials hosted by USM and SSAs nationwide.",
};

export const revalidate = 600;

export default async function EventsPage({
  searchParams,
}: {
  searchParams: { view?: string; type?: string };
}) {
  const view = searchParams.view || "upcoming";
  const events = await client.fetch<Event[]>(
    view === "past" ? pastEventsQuery : upcomingEventsQuery
  );

  // Filter by event type if specified
  const filteredEvents = searchParams.type
    ? events.filter((e) => e.eventType === searchParams.type)
    : events;

  return (
    <>
      <section data-section="events-header">
        <h1>Events</h1>
        <p>Find conferences, retreats, workshops, and socials near you.</p>
      </section>

      {/* Filters — view toggle + event type filter */}
      <nav data-section="events-filters">
        <a href="/events?view=upcoming" data-active={view === "upcoming"}>Upcoming</a>
        <a href="/events?view=past" data-active={view === "past"}>Past</a>
        {/* Event type filters */}
        <a href={`/events?view=${view}`}>All</a>
        <a href={`/events?view=${view}&type=conference`}>Conferences</a>
        <a href={`/events?view=${view}&type=retreat`}>Retreats</a>
        <a href={`/events?view=${view}&type=workshop`}>Workshops</a>
        <a href={`/events?view=${view}&type=social`}>Socials</a>
      </nav>

      <section data-section="events-grid">
        {filteredEvents.length === 0 ? (
          <div data-empty-state>
            <p>No {view} events right now. Join our mailing list to be the first to know.</p>
            {/* EmailSignup component — Antigravity will build */}
          </div>
        ) : (
          filteredEvents.map((event) => (
            <a key={event._id} href={`/events/${event.slug.current}`} data-event-card>
              <span data-event-type>{event.eventType}</span>
              <time>{formatDate(event.date)}</time>
              <h3>{event.title}</h3>
              <span>{event.location}</span>
              {event.hostedBy && <span>Hosted by {event.hostedBy.name}</span>}
            </a>
          ))
        )}
      </section>
    </>
  );
}
```

- [ ] **Step 2: Event detail page**

```typescript
// app/events/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { eventBySlugQuery, eventSlugsQuery } from "@/sanity/queries";
import { formatDate } from "@/lib/utils";
import type { Event } from "@/types";

export const revalidate = 600;

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(eventSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const event = await client.fetch<Event | null>(eventBySlugQuery, { slug: params.slug });
  if (!event) return {};
  return {
    title: event.title,
    description: `${event.title} — ${formatDate(event.date)} at ${event.location}. Hosted by United Sikh Movement.`,
  };
}

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = await client.fetch<Event | null>(eventBySlugQuery, { slug: params.slug });
  if (!event) notFound();

  return (
    <>
      <section data-section="event-detail">
        <span data-event-type>{event.eventType}</span>
        <h1>{event.title}</h1>
        <time>{formatDate(event.date)}</time>
        <span>{event.location}</span>
        {event.hostedBy && (
          <a href={`/ssa/${event.hostedBy.slug?.current}`}>
            Hosted by {event.hostedBy.name}
          </a>
        )}

        {/* Portable Text body — render with @portabletext/react */}
        {event.description && (
          <div data-rich-text>
            {/* PortableText component goes here — styled by Antigravity */}
          </div>
        )}

        {event.eventbriteUrl && (
          <a href={event.eventbriteUrl} target="_blank" rel="noopener noreferrer" data-cta="register">
            Register on Eventbrite
          </a>
        )}
      </section>
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/events/
git commit -m "feat: add events listing and detail pages"
```

### Task 21: Donate page and thank-you page

**Files:**
- Create: `app/donate/page.tsx`, `app/donate/thank-you/page.tsx`

- [ ] **Step 1: Donate page**

```typescript
// app/donate/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support United Sikh Movement. Your tax-deductible donation funds events, mentorship programs, and resources for Sikh students nationwide.",
};

export default function DonatePage() {
  return (
    <>
      <section data-section="donate-header">
        <h1>Support the Movement</h1>
        <p>
          Your donation funds events, mentorship programs, and resources for
          Sikh student organizations across America. United Sikh Movement is a
          501(c)(3) nonprofit — all donations are tax-deductible.
        </p>
      </section>

      {/* Donation form — Client Component for interactivity */}
      {/* DonationForm component will POST to /api/donate and redirect to Stripe */}
      <section data-section="donate-form">
        {/* Preset amounts: $25, $50, $100, $250 + custom */}
        {/* One-time / Monthly toggle */}
        {/* Submit button */}
        {/* Donation progress bar — fetches from /api/donation-progress */}
      </section>

      <section data-section="tax-info">
        <p>
          United Sikh Movement is a registered 501(c)(3) nonprofit organization.
          All donations are tax-deductible to the extent allowed by law.
          You will receive a receipt via email for your records.
        </p>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Thank you page**

```typescript
// app/donate/thank-you/page.tsx
import { Metadata } from "next";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you for your generous donation to United Sikh Movement.",
};

export default async function DonateThankYouPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  let donationAmount: string | null = null;

  if (searchParams.session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(searchParams.session_id);
      if (session.amount_total) {
        donationAmount = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "usd",
        }).format(session.amount_total / 100);
      }
    } catch {
      // Session not found or expired — show generic thank you
    }
  }

  return (
    <section data-section="thank-you">
      <h1>Thank You for Your Generosity</h1>
      {donationAmount && <p>Your donation of {donationAmount} makes a difference.</p>}
      <p>
        A tax receipt has been sent to your email. Your support funds events,
        mentorship, and resources for Sikh students across America.
      </p>

      <nav data-section="share">
        <p>Spread the word:</p>
        <a href="https://twitter.com/intent/tweet?text=I%20just%20donated%20to%20United%20Sikh%20Movement%21&url=https://unitedsikh.org/donate" target="_blank" rel="noopener noreferrer">Share on X</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=https://unitedsikh.org/donate" target="_blank" rel="noopener noreferrer">Share on Facebook</a>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://unitedsikh.org/donate" target="_blank" rel="noopener noreferrer">Share on LinkedIn</a>
      </nav>

      <nav data-section="next-actions">
        <a href="/ssa">Find an SSA</a>
        <a href="/events">Upcoming Events</a>
        <a href="/">Back to Home</a>
      </nav>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/donate/
git commit -m "feat: add donate page and thank-you page with Stripe session retrieval"
```

---

## Chunk 5: SEO, Error Pages & Final Structure

### Task 22: robots.txt and sitemap.xml

**Files:**
- Create: `app/robots.ts`, `app/sitemap.ts`

- [ ] **Step 1: robots.txt**

```typescript
// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio/", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
```

- [ ] **Step 2: sitemap.xml**

```typescript
// app/sitemap.ts
import { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { ssaSlugsQuery, eventSlugsQuery } from "@/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const [ssaSlugs, eventSlugs] = await Promise.all([
    client.fetch<string[]>(ssaSlugsQuery),
    client.fetch<string[]>(eventSlugsQuery),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/ssa`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/events`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/donate`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const ssaPages: MetadataRoute.Sitemap = ssaSlugs.map((slug) => ({
    url: `${siteUrl}/ssa/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const eventPages: MetadataRoute.Sitemap = eventSlugs.map((slug) => ({
    url: `${siteUrl}/events/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...ssaPages, ...eventPages];
}
```

- [ ] **Step 3: Commit**

```bash
git add app/robots.ts app/sitemap.ts
git commit -m "feat: add robots.txt and dynamic sitemap generation"
```

### Task 23: Custom 404 and error pages

**Files:**
- Create: `app/not-found.tsx`, `app/error.tsx`

- [ ] **Step 1: Custom 404 page**

```typescript
// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <section data-section="not-found">
      <h1>Page Not Found</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <nav>
        <Link href="/">Go Home</Link>
        <Link href="/ssa">Find an SSA</Link>
        <Link href="/events">Browse Events</Link>
      </nav>
    </section>
  );
}
```

- [ ] **Step 2: Global error boundary**

```typescript
// app/error.tsx
"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section data-section="error">
      <h1>Something went wrong</h1>
      <p>We&apos;re sorry — something unexpected happened. Please try again.</p>
      <button onClick={() => reset()}>Try Again</button>
      <a href="/">Go Home</a>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/not-found.tsx app/error.tsx
git commit -m "feat: add custom 404 and error boundary pages"
```

### Task 24: JSON-LD structured data

**Files:**
- Create: `lib/jsonld.ts`
- Modify: `app/page.tsx`, `app/events/[slug]/page.tsx`

- [ ] **Step 1: Create JSON-LD helper functions**

```typescript
// lib/jsonld.ts
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "United Sikh Movement",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://unitedsikh.org",
    description:
      "America's largest Sikh student network. Connecting Sikh student organizations across the country.",
    nonprofitStatus: "Nonprofit501c3",
  };
}

export function eventJsonLd(event: {
  title: string;
  date: string;
  location: string;
  eventbriteUrl?: string;
  slug: { current: string };
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://unitedsikh.org";
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.date,
    location: {
      "@type": "Place",
      name: event.location,
    },
    url: event.eventbriteUrl || `${siteUrl}/events/${event.slug.current}`,
    organizer: {
      "@type": "Organization",
      name: "United Sikh Movement",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://unitedsikh.org";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}
```

- [ ] **Step 2: Add Organization JSON-LD to home page**

In `app/page.tsx`, add inside the return JSX:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
/>
```

- [ ] **Step 3: Add Event JSON-LD to event detail page**

In `app/events/[slug]/page.tsx`, add inside the return JSX:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd(event)) }}
/>
```

- [ ] **Step 4: Commit**

```bash
git add lib/jsonld.ts app/page.tsx app/events/\[slug\]/page.tsx
git commit -m "feat: add JSON-LD structured data (Organization, Event, Breadcrumb)"
```

### Task 25: Blog page shells (deferred content, routing ready)

**Files:**
- Create: `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Blog listing shell**

```typescript
// app/blog/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Stories, talks, and insights from the United Sikh Movement community.",
};

export default function BlogPage() {
  return (
    <section data-section="blog-coming-soon">
      <h1>Blog</h1>
      <p>Coming soon. Follow us on social media for the latest updates.</p>
      <a href="/">Back to Home</a>
    </section>
  );
}
```

- [ ] **Step 2: Blog detail shell**

```typescript
// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";

// Blog detail pages are deferred for v1.
// When ready, this will fetch from Sanity blogPost schema and render with @portabletext/react.
export default function BlogPostPage() {
  notFound();
}
```

- [ ] **Step 3: Commit**

```bash
git add app/blog/
git commit -m "feat: add blog page shells (deferred for v1)"
```

### Task 26: Add blog slugs to sitemap

**Files:**
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Update sitemap to include blog slugs when they exist**

Add to the imports in `app/sitemap.ts`:

```typescript
// Add to existing imports
import { ssaSlugsQuery, eventSlugsQuery } from "@/sanity/queries";
// Add new query
const blogSlugsQuery = groq`*[_type == "blogPost" && defined(slug.current)][].slug.current`;
```

Add to the `sitemap()` function after eventSlugs fetch:

```typescript
const [ssaSlugs, eventSlugs, blogSlugs] = await Promise.all([
  client.fetch<string[]>(ssaSlugsQuery),
  client.fetch<string[]>(eventSlugsQuery),
  client.fetch<string[]>(blogSlugsQuery),
]);

// Add blog pages
const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
  url: `${siteUrl}/blog/${slug}`,
  lastModified: new Date(),
  changeFrequency: "monthly" as const,
  priority: 0.5,
}));

return [...staticPages, ...ssaPages, ...eventPages, ...blogPages];
```

- [ ] **Step 2: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat: include blog slugs in sitemap"
```

### Task 27: Verify project builds

- [ ] **Step 1: Run build to check for type errors and missing dependencies**

```bash
cd /Users/gursimarsingh/Documents/usm-website
npm run build
```

Expected: Build should complete (may show warnings about missing env vars, which is expected — actual Sanity/Stripe credentials are not configured yet).

- [ ] **Step 2: Fix any build errors that arise**

Address TypeScript errors, missing imports, or dependency issues.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "fix: resolve build errors and finalize project structure"
```

---

## Summary

After completing all 27 tasks, the project will have:

- **Next.js 14 App Router** scaffolded with proper config
- **7 Sanity schemas** (SSA, Event, TeamMember, Testimonial, BlogPost, FAQ, SiteSettings) with a schema registry
- **Sanity Studio** embedded at `/studio`
- **All GROQ queries** centralized in one file
- **4 API routes** (`/api/mailchimp`, `/api/donate`, `/api/donation-progress`, `/api/revalidate`)
- **8 page routes** (Home, About, SSA listing, SSA detail, Events listing, Event detail, Donate, Donate Thank You, Blog shell, Blog detail shell) with ISR revalidation
- **JSON-LD structured data** (Organization, Event, Breadcrumb helpers)
- **TypeScript types** for all documents and API contracts
- **SEO infrastructure** (metadata, sitemap, robots.txt)
- **Error handling** (404, error boundary, empty states)
- **Utility functions** (formatDate, formatCurrency, SSA URL helpers)

**What Antigravity takes over:** All `data-section` and `data-*` attributes mark semantic sections ready for styling. Page shells have the data flowing through — Antigravity adds the taste-skill visual system (Tailwind classes, Framer Motion, Double-Bezel cards, typography, spacing, responsive layouts).
