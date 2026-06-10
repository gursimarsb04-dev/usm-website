# USM Website — unitedsikhmovement.org rebuild

The new platform for United Sikh Movement: public site + SSA Portal.
Built with Next.js 14 (App Router) · Tailwind · Supabase · Sanity · Vercel.

## Architecture in one paragraph

The **public site** (everything under `/`) is what students, donors, and parents see.
USM-managed content (programs, news, resources, opportunities, impact stats) lives in
**Sanity** so non-technical team members edit it in a friendly studio. Chapter data
(SSAs, events, photos, Wrapped, support requests) lives in **Supabase**, because 40+
SSA leaders each need their own login that can only touch their own chapter —
that's enforced by Postgres row-level security, not by trust. The **SSA Portal**
(`/portal`) is where leaders log in with a magic link and manage their page.
Donations link out to the **Dasvandh Network** (they handle 501(c)(3) receipts).
Event payments link out to each SSA's own forms — USM never touches chapter money.

## Setup (do these in order)

### 1. Install and run
```bash
npm install
cp .env.example .env.local   # fill in as you complete steps 2-3
npm run dev                   # http://localhost:3000
```
The site renders with empty states before Supabase/Sanity are configured — that's intentional.

### 2. Supabase (chapter data + auth)
1. Create a free project at supabase.com
2. SQL Editor → paste and run `supabase/migrations/001_initial.sql`
3. Then run `supabase/seed_example.sql` (replace with the real SSA spreadsheet when ready)
4. Settings → API → copy URL + anon key into `.env.local`
5. Authentication → Providers → make sure **Email** is on (magic links work out of the box)
6. **Creating an SSA leader account:** Authentication → Users → "Invite user" with their email,
   then in SQL: `insert into profiles (id, full_name, ssa_id) values ('<their-user-uuid>', 'Name', '<ssa-uuid>');`
7. **Make Simar admin:** sign in once via `/portal/login`, then
   `update profiles set role = 'usm_admin' where id = '<his-uuid>';`

### 3. Sanity (USM content)
1. `npm create sanity@latest` in a separate folder → new free project
2. Copy `sanity/schemaTypes/` into the studio's `schemaTypes/` and export them from its index
3. `npx sanity deploy` → gives the team a hosted studio URL (e.g. usm.sanity.studio)
4. Copy the project ID into `.env.local`
5. Add content: 6 Program docs, a Site Settings doc (incl. the Dasvandh URL), first News posts

### 4. Vercel
1. Push to the USM GitHub repo → import in Vercel
2. Add all `.env.local` vars in Vercel project settings
3. Domain cutover happens LAST, after Simar's review (he controls DNS)

### 5. The SSA spreadsheet (priority intern task)
Build a Google Sheet: `slug, name, school, city, state, latitude, longitude, instagram, email, status`
for all 75 SSAs. Export as CSV → convert to insert statements like `seed_example.sql`.
Coordinates: search the school on Google Maps, right-click → copy coordinates.

## Design system (read before touching styles)

- **Teal `#235470` is structure.** Headers, footer, text. **Gold `#F5D78C` is only for
  what should be clicked** + rare moments of warmth. If gold is everywhere, nothing stands out.
- **Fonts:** Bricolage Grotesque (display) / Albert Sans (body) — loaded in `layout.tsx`.
- **One animation:** `<FadeUp>` wraps sections. Don't add new animation patterns.
- **One signature:** the `<Phulkari>` divider. Use it sparingly — it loses meaning if it's on every section.
- **One idea per screen.** If a section says two things, split it.
- **Nav stays at five items.** New pages go in the footer or inside existing sections.

## TODO board (marked `TODO(interns)` in code)

- [ ] Swap hero + pillar placeholder photos (sorted Dropbox → `/public/`, then `next/image`)
- [ ] About page: real founding story + leadership grid (the old site shipped placeholders — we don't)
- [ ] Page editor: board-members editor + photo gallery uploads (copy the Wrapped upload pattern)
- [ ] n8n webhook on support requests → email SSA Coordinator + confirmation to submitter
- [ ] Board-only pages: simple middleware password gate using `BOARD_PASSWORD`
- [ ] News detail page (`/news/[slug]`) with Portable Text rendering (`@portabletext/react`)
- [ ] Admin view: approve Wrapped submissions + new SSA applications (Supabase Studio works day one)
- [ ] SEO: per-page metadata + sitemap (matters for the Google Ad Grant)
- [ ] Mailchimp → news sync via n8n (phase 2)
- [ ] SSA subdomains via Vercel wildcard + middleware rewrite (phase 2, nice-to-have)

## Launch sequence

1. Wrapped intake form goes to all 40 active SSAs (Google Form now, portal later)
2. Build out content in Sanity + the SSA spreadsheet
3. Populate Wrapped pages from submissions
4. Simar reviews on the Vercel preview URL
5. Domain cutover + 301 redirects from old WordPress URLs (keep Ad Grant juice)
