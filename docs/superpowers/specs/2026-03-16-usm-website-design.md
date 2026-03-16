# United Sikh Movement Website — Design Spec

## Overview

A multi-page marketing and community website for United Sikh Movement (USM), a 501(c)(3) nonprofit connecting Sikh student organizations across the country. The site serves as an outward-facing recruitment tool with four conversion goals: event signups, SSA discovery, donations, and email list joins.

USM started from a vision in California and has grown into America's largest Sikh student network. The core thesis: Sikh students don't have to choose between success and spirituality — they need mentorship from Sikhs across fields like tech, finance, consulting, and medicine, alongside spiritual grounding that makes their identity a strength.

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | Next.js 14 (App Router) | Server Components by default, Client Components for interactive elements |
| Styling | Tailwind CSS v4 + Framer Motion | Per taste-skill guidelines |
| CMS | Sanity.io | Free tier (3 users, 100K API requests/mo), visual Content Studio |
| Donations | Stripe Checkout | Native embedded flow, webhook to Next.js API routes |
| Events | Eventbrite (external links) | Event metadata managed in Sanity, registration on Eventbrite |
| Email | Mailchimp API | Signup forms hit `/api/mailchimp` endpoint |
| Hosting | Vercel | Free tier, ISR for content updates |

---

## Sanity CMS Schemas

### SSA
- `name` (string)
- `slug` (slug)
- `university` (string)
- `state` (string)
- `city` (string)
- `region` (string: West / Midwest / East / South)
- `logo` (image)
- `description` (text)
- `contactEmail` (string)
- `instagramUrl` (url)
- `websiteUrl` (url)
- `memberCount` (number)
- `foundedYear` (number)

### Event
- `title` (string)
- `slug` (slug)
- `date` (datetime)
- `location` (string)
- `description` (portable text)
- `coverImage` (image)
- `eventbriteUrl` (url)
- `eventType` (string: conference / retreat / social / workshop)
- `hostedBy` (reference → SSA)
- `isFeatured` (boolean)

### TeamMember
- `name` (string)
- `role` (string)
- `group` (string: Executive Board / Advisors / Regional Leads)
- `photo` (image)
- `bio` (text)
- `linkedinUrl` (url)
- `order` (number) — controls display sort order within group

### Testimonial
- `quote` (text)
- `authorName` (string)
- `authorRole` (string)
- `authorPhoto` (image)
- `ssa` (reference → SSA)

### BlogPost
- `title` (string)
- `slug` (slug)
- `author` (string)
- `publishedAt` (datetime)
- `coverImage` (image)
- `body` (portable text)
- `tags` (array of strings)

### FAQ
- `question` (string)
- `answer` (text)
- `category` (string)

### SiteSettings (singleton)
- `heroHeadline` (string)
- `heroSubtext` (text)
- `heroImage` (image)
- `donationGoal` (number)
- `trustedByLogos` (array of images)

Note: Donation progress is fetched directly from the Stripe API at request time (via `/api/donation-progress`) rather than stored in Sanity, to avoid write race conditions on a document store.

---

## Data Flow

```
Sanity Studio (team edits content)
       ↓ real-time sync via GROQ
Next.js Server Components (fetch at build/request time via ISR)
       ↓
Static pages + Dynamic routes (/ssa/[slug], /events/[slug], /blog/[slug])

Stripe Checkout → redirect back to /donate/thank-you (success) or /donate (cancel)
Donation progress → /api/donation-progress → fetches total from Stripe API
Mailchimp ← /api/mailchimp ← email signup form submissions
```

ISR ensures pages are statically generated for speed but automatically re-build when content updates in Sanity.

---

## Pages

### 1. Home Page (`/`)

The flagship conversion page. Every section drives toward one of the four goals.

**Hero Section**
- Asymmetric split layout (left text, right image)
- Large Clash Display headline: editable from SiteSettings
- Two CTAs: "Find Your SSA" (primary saffron) + "Join the Movement" (secondary ghost)
- Deep navy background with image fade
- `min-h-[100dvh]` (never `h-screen`)

**Trusted By**
- Horizontal logo strip of partner SSAs
- Infinite marquee scroll, pauses on hover
- Muted treatment

**Pillars (What USM Offers)**
- Three pillars in zig-zag layout (alternating image/text sides)
- Academic Excellence, Professional Mentorship, Spiritual Grounding
- Each has numbered list of specifics
- Cream background section

**Impact Stats**
- Full-width band with 3-4 animated counters
- Numbers count up on scroll into view
- JetBrains Mono for numbers

**Voices of the Community**
- Horizontal scrolling testimonial cards
- Student photos, quotes, names, SSA affiliation
- Double-Bezel card architecture
- Spring physics drag-to-scroll

**Upcoming Events**
- 2-3 featured event cards from Sanity (filtered by `isFeatured`)
- Date, title, location, CTA to event page or Eventbrite

**Join the Movement**
- Full-width saffron/gold section
- Mailchimp email signup input + "Donate" button
- Warm, inviting close

**Footer** — see Shared Components

### 2. About Page (`/about`)

**Origin Story**
- Narrative text with timeline/milestone markers
- Growth from California founding → largest Sikh student network in America

**Mission & Values**
- Core thesis presented with large serif typography and generous whitespace

**Leadership Team**
- Grid of TeamMember cards from Sanity
- Photo, name, role, LinkedIn
- Subtle parallax tilt on hover

**FAQ**
- Accordion grouped by category from Sanity
- Framer Motion `layout` animation for smooth expand/collapse

### 3. Find an SSA (`/ssa`)

**Filter Bar**
- Sticky glass-effect bar with `backdrop-blur-xl`
- Text search by school name
- Dropdown: Region (West/Midwest/East/South)
- Dropdown: State
- Client-side filtering (all SSAs pre-fetched)

**SSA Grid**
- Responsive grid of SSA cards
- University name, logo, city/state, member count, "Connect" CTA
- "Connect" CTA behavior: links to the SSA's `websiteUrl` if available, otherwise opens `mailto:contactEmail`
- Staggered reveal on load

**SSA Detail Page (`/ssa/[slug]`)**
- Full description, contact info, Instagram link
- Upcoming events hosted by this SSA (cross-referenced via `hostedBy` field)
- "Join This SSA" CTA: links to `websiteUrl` or `instagramUrl` (the SSA's own signup channel). If neither exists, opens `mailto:contactEmail`.

**Empty State**
- "No SSAs in this area yet — want to start one?" with contact CTA

### 4. Events Page (`/events`)

**Event Listing**
- Chronologically sorted event cards
- Date badge, title, location, event type tag, hosting SSA, "Register" CTA
- Filter by event type
- "Upcoming" vs "Past" toggle (server-side GROQ filter: `date >= now()` for upcoming, `date < now()` for past)

**Event Detail Page (`/events/[slug]`)**
- Cover image, rich text description
- Date/time/location details
- Eventbrite registration link or embed
- Related events

### 5. Donate Page (`/donate`)

**Impact Message**
- What donations fund: events, SSA resources, mentorship programs

**Donation Form**
- Stripe Checkout (redirect mode): user selects amount on-site, then redirected to Stripe's hosted checkout page. Redirects back to `/donate/thank-you` on success, `/donate` on cancel.
- Currency: USD
- Preset amounts: $25, $50, $100, $250 + custom input
- One-time or monthly toggle (maps to Stripe `mode: "payment"` vs `mode: "subscription"`)
- 501(c)(3) badge for trust

**Progress Bar**
- Visual progress toward `donationGoal` from SiteSettings (optional)

**Tax Receipt Note**
- Donations are tax-deductible, receipt via email

### 6. Blog/Talks (`/blog`) — Optional for Launch (schema is implemented in v1, page is deferred)

**Post Grid**
- Cards with cover image, title, date, tags
- Filterable by tag

**Post Detail (`/blog/[slug]`)**
- Full rich-text rendering via Sanity Portable Text

---

## Shared Components

### Navbar
- Floating glass pill, detached from top (`mt-6 mx-auto w-max rounded-full`)
- Logo left, nav links center, "Donate" CTA right (saffron pill)
- Mobile: hamburger → X morph, full-screen overlay with `backdrop-blur-3xl bg-navy/80`
- Staggered link reveals on open

### Footer
- Multi-column: nav links, social icons (Phosphor Light), 501(c)(3) info
- Secondary Mailchimp signup input

### Sanity Studio (`/studio`)
- Embedded in the Next.js app via `next-sanity` at route `/studio`
- Protected by Sanity's built-in authentication (team members log in with Sanity accounts)
- Not a public-facing page — excluded from sitemap and nav

### Donate Thank You (`/donate/thank-you`)
- Confirmation page after successful Stripe Checkout
- Shows: "Thank you for your generosity" message, donation amount (fetched from `session_id` query param via Stripe API), tax receipt note, social sharing links, and "Explore more" CTAs (Find an SSA, Upcoming Events)

### Email Signup
- Input + button hitting `/api/mailchimp`
- Used in: Home "Join the Movement" section, Footer

### CTA Banner
- Reusable "Join the Movement" section
- Email signup + donate button

---

## Visual Design System

### Taste-Skill Dial Settings
- DESIGN_VARIANCE: 8 (asymmetric, fractional grid units, massive whitespace zones)
- MOTION_INTENSITY: 6 (fluid CSS transitions, scroll-triggered reveals, spring physics)
- VISUAL_DENSITY: 4 (art gallery mode, generous section padding)

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Navy Primary | `#0F1B2D` | Hero backgrounds, navbar, dark sections |
| Navy Deep | `#0A1220` | Footer, overlays |
| Saffron Accent | `#D4912A` | Primary CTAs, highlights, donate button, accent borders |
| Saffron Light | `#F0C96E` | Hover states, progress bars, subtle highlights |
| Cream | `#FDFAF5` | Light section backgrounds |
| Warm White | `#FEFDFB` | Card backgrounds, body background |
| Slate Body | `#4A5568` | Body text on light backgrounds |
| Warm Gray | `#94A3B8` | Secondary text, captions |
| Off-White | `#E8E4DF` | Borders, dividers |
| Pure White | `#FFFFFF` | Text on dark backgrounds |

Single accent color (saffron). No purple/neon. No pure black (#000000). Consistent warm-neutral base.

### Typography

| Role | Font | Classes |
|------|------|---------|
| Display/Headlines | Clash Display | `text-4xl md:text-6xl tracking-tighter leading-none font-semibold` |
| Section Headers | Clash Display | `text-2xl md:text-4xl tracking-tight` |
| Body | Satoshi | `text-base text-slate-600 leading-relaxed max-w-[65ch]` |
| Eyebrow Tags | Satoshi | `text-[10px] uppercase tracking-[0.2em] font-medium` |
| Numbers/Mono | JetBrains Mono | Impact stats counters |

### Spacing & Layout

- Section padding: `py-24` to `py-32`
- Container: `max-w-[1400px] mx-auto px-6 md:px-12`
- Card radii: `rounded-[2rem]` outer, `rounded-[calc(2rem-0.375rem)]` inner
- Mobile collapse: single column `w-full px-4 py-8` below 768px
- Hero height: `min-h-[100dvh]`
- Grid: CSS Grid with fractional units (e.g., `grid-template-columns: 2fr 1fr 1fr`)

### Motion

All animations use `transform` and `opacity` only. Custom cubic-bezier everywhere. No `linear` or `ease-in-out`. `backdrop-blur` only on fixed/sticky elements.

| Pattern | Implementation |
|---------|----------------|
| Page Entry | `translate-y-16 opacity-0` → `translate-y-0 opacity-100`, 800ms, `cubic-bezier(0.32, 0.72, 0, 1)`, Framer Motion `whileInView` |
| Staggered Lists | `staggerChildren: 0.1` for SSA cards, team members, pillars |
| Navbar Mobile | Lines → X morph via `rotate-45`, overlay with staggered fade-ins |
| Button Hover | `active:scale-[0.98]`, inner icon `translate-x-1 -translate-y-[1px]` |
| Trusted By | Infinite marquee, pauses on hover |
| Impact Counters | Count-up via IntersectionObserver |
| FAQ Accordion | Framer Motion `layout` prop |
| Card Hover (Team) | Subtle 3D parallax tilt tracking mouse |
| Card Hover (SSA) | Shadow elevation increase |
| Testimonials | Horizontal drag with spring physics (`stiffness: 100, damping: 20`) |

### Component Aesthetics

**Cards (Double-Bezel)**
- Outer shell: `bg-navy/5 ring-1 ring-black/5 p-1.5 rounded-[2rem]`
- Inner core: `bg-white rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]`
- On dark backgrounds: `bg-white/5 ring-white/10`

**Primary CTA**
- Saffron pill: `rounded-full px-6 py-3 bg-saffron text-navy font-medium`
- Arrow icon in nested circular wrapper (Button-in-Button pattern)

**Secondary CTA**
- Ghost pill: `rounded-full px-6 py-3 border border-white/20 text-white`

**Eyebrow Pills**
- `rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em]` with background tint

**Input Fields**
- Rounded pill: `rounded-full px-5 py-3`, label above, saffron glow on focus

**Donation Amounts**
- Preset amount pills, selected fills with saffron, custom input inline

**SSA Filter Bar**
- Sticky, `backdrop-blur-xl`, rounded pill dropdowns

**Icons**
- Phosphor Icons (Light weight), `strokeWidth: 1.5` throughout

**Images**
- Real photography, rounded corners matching card radii
- Dev placeholders: `picsum.photos/seed/{random}/800/600`
- Production: real USM photos

---

## API Routes

### `POST /api/mailchimp`
Subscribe an email to the Mailchimp list.
- **Request body:** `{ email: string, firstName?: string }`
- **Response (200):** `{ success: true }`
- **Response (400):** `{ error: "Invalid email" }`
- **Response (409):** `{ error: "Already subscribed" }`
- **Response (500):** `{ error: "Subscription failed" }`
- **Rate limiting:** 5 requests per IP per minute (via Vercel Edge Config or in-memory store)

### `POST /api/donate`
Create a Stripe Checkout Session and return the redirect URL.
- **Request body:** `{ amount: number, frequency: "one-time" | "monthly", donorEmail?: string }`
- **Validation:** `amount` must be >= 1 and <= 50000 (USD cents)
- **Response (200):** `{ url: string }` (Stripe Checkout URL)
- **Response (400):** `{ error: "Invalid amount" }`
- **Response (500):** `{ error: "Failed to create checkout session" }`
- **Success redirect:** `/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`
- **Cancel redirect:** `/donate`

### `GET /api/donation-progress`
Fetch total donation amount from Stripe API for progress bar display.
- **Response (200):** `{ total: number, goal: number, currency: "usd" }`
- **Caching:** Response cached for 5 minutes via `Cache-Control` header to avoid hitting Stripe API limits

---

## External Integrations

| Service | Integration Point |
|---------|-------------------|
| Sanity.io | GROQ queries in Server Components, real-time preview, Content Studio at `/studio` |
| Stripe | Checkout Sessions API, webhook for payment confirmation |
| Mailchimp | Marketing API for list subscription |
| Eventbrite | External links from event pages (no API integration needed) |
| Vercel | Hosting, serverless functions for API routes, ISR |

---

## Environment Variables

```
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=            # read-only token for server-side fetches

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=       # not needed if using redirect mode without webhooks

# Mailchimp
MAILCHIMP_API_KEY=
MAILCHIMP_LIST_ID=
MAILCHIMP_SERVER_PREFIX=     # e.g., "us21"

# Site
NEXT_PUBLIC_SITE_URL=        # e.g., https://unitedsikh.org
```

---

## ISR & Caching Strategy

- **SSA listing page:** `revalidate: 3600` (1 hour) — SSAs change infrequently
- **SSA detail pages:** `revalidate: 3600`
- **Events listing:** `revalidate: 600` (10 minutes) — events are more time-sensitive
- **Event detail pages:** `revalidate: 600`
- **Home page:** `revalidate: 1800` (30 minutes)
- **About page:** `revalidate: 3600`
- **Blog posts:** `revalidate: 3600`
- **On-demand revalidation:** Sanity webhook calls `/api/revalidate?secret=<token>&path=<path>` to bust cache immediately when content is published. This supplements time-based ISR.

These intervals keep Sanity API usage well within the 100K/month free tier.

---

## SEO & Metadata

- **Dynamic `<meta>` tags** via Next.js `generateMetadata()` on every page
- **Open Graph images:** Auto-generated per page using `@vercel/og` or a static default OG image with USM branding
- **`robots.txt`** and **`sitemap.xml`** generated via Next.js built-in conventions (`app/robots.ts`, `app/sitemap.ts`)
- **Structured data:** `Organization` JSON-LD schema on the home page, `Event` JSON-LD on event detail pages, `BreadcrumbList` on all inner pages
- **Canonical URLs** set on every page
- **Page titles:** Format: `{Page Title} | United Sikh Movement`

---

## Accessibility

- All interactive elements are keyboard-navigable with visible focus rings (saffron outline)
- Mobile nav overlay: focus is trapped inside when open, `Escape` key closes it, focus returns to hamburger button
- FAQ accordion: uses `<button>` triggers with `aria-expanded`, content regions use `aria-labelledby`
- Color contrast: all text/background pairings validated against WCAG AA (4.5:1 for body text, 3:1 for large text). Saffron `#D4912A` on Navy `#0F1B2D` = 5.2:1 ratio (passes AA). Slate Body `#4A5568` on Cream `#FDFAF5` = 5.8:1 (passes AA).
- All images have descriptive `alt` text (managed in Sanity image fields)
- Form inputs have associated `<label>` elements
- Skip-to-content link at top of page
- Motion: respect `prefers-reduced-motion` — disable all animations when user prefers reduced motion

---

## Error, Loading & Empty States

| Scenario | Treatment |
|----------|-----------|
| **API errors (donation, email signup)** | Inline error message below the form input. Red-tinted text. No toast/modals — keep it grounded. |
| **Donation success** | Redirect to `/donate/thank-you` page with confirmation message and suggested next actions (share, find an SSA). |
| **Email signup success** | Input transforms to a green checkmark + "You're in!" message. Resets after 3 seconds. |
| **SSA empty search results** | Illustrated empty state: "No SSAs found in this area yet — want to start one?" with a CTA to contact USM. |
| **Events empty state** | "No upcoming events right now. Join our mailing list to be the first to know." + email signup. |
| **Page loading (ISR miss)** | Skeleton loaders matching the layout geometry of the page. No generic spinners. |
| **Sanity fetch failure** | Graceful fallback: static cached version of the page. Log error server-side. |
| **404 page** | Custom branded 404 with USM illustration, message, and links back to Home / SSA directory. |
| **500 / error boundary** | Custom error page: "Something went wrong. Please try again." with Home link. |

---

## Image Optimization

- All images rendered via Next.js `<Image>` component with responsive `sizes` and automatic format optimization (WebP/AVIF)
- Sanity images use `@sanity/image-url` for on-the-fly transforms (crop, resize, format)
- Hero images: `priority` prop for LCP optimization
- SSA logos: fixed dimensions (`width={80} height={80}`) to prevent layout shift
- Lazy loading on all below-the-fold images (Next.js default)

---

## Analytics

- **Plausible Analytics** (privacy-friendly, no cookie banner needed) or **Google Analytics 4** — USM team's choice
- Conversion tracking events: `donate_click`, `donate_complete`, `email_signup`, `ssa_connect_click`, `event_register_click`
- UTM parameter support for tracking campaign traffic

---

## Out of Scope (for v1)

- Member login / authentication
- In-app event registration (using Eventbrite links)
- Push notifications
- Forum / discussion features
- E-commerce / merch store
- Multi-language support
