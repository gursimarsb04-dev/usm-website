# USM Website

United Sikh Movement — 501(c)(3) nonprofit website connecting Sikh student organizations across the US.

Built with Next.js 14, Sanity CMS, Stripe, Tailwind CSS, and Mailchimp.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` — Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` — Sanity dataset (e.g. `production`)
- `SANITY_API_TOKEN` — Sanity API token (for server-side)
- `STRIPE_SECRET_KEY` — Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key
- `MAILCHIMP_API_KEY` — Mailchimp API key
- `MAILCHIMP_LIST_ID` — Mailchimp audience/list ID
- `REVALIDATION_SECRET` — Secret for on-demand ISR revalidation
