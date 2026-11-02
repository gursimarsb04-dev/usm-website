# SSA chapter landing page plan (v1, 2026-11-01)

Goal: turn near-empty /ssas/<slug> pages into useful pages using only (a) verified public info from the chapter's Instagram or the USM site and (b) generic USM content that is true for every chapter. No coordination with chapters, nothing made up.

## Data rules
- Every chapter field must trace to a source: the USM page itself, the chapter's public Instagram (record URL and date pulled), or a cited third-party page.
- Follower and post counts change. Either omit them or show them as "as of <date>". Recommendation: omit from the page, keep them internal.
- If a field is missing, hide the section. Never fill it with filler copy.
- Instagram handles must be confidence "high" before linking (see ssa_instagram.csv). Example of why: @harvardsikhs currently shows the display name "Miss World America Colorado", so that link should be pulled or checked before reuse.
- RU Sikh (Rutgers New Brunswick) is the only chapter page with real content today (meeting time, room, est. 2014, 130+ members, board). Those board names and figures came from the USM CMS; confirm they are real before reusing them as an example.

## Page sections (in order)
1. **Header**: chapter display name (from IG display name or USM page), school, city/state (USM page), profile picture (see permission flag below).
2. **About this chapter** (only if verified): IG bio text quoted as-is, or USM-held details (meeting day, room, year established). Hide if neither exists.
3. **Follow and join**: Instagram link button (and optional IG embed of the profile or a recent public post via Instagram's official embed). Generic line: "The fastest way to find meetings and events is the chapter's Instagram."
4. **What is a Sikh Student Association?** Generic, same on every page: a student-run campus group for Sikh students and anyone interested in Sikhi and Punjabi culture; events often include divaan or kirtan, seva projects, social events, and career panels. (Keep to what SSAs commonly do; no doctrinal claims.)
5. **Upcoming events**: pull from the USM events feed filtered to this chapter, then USM national events (e.g. the West Coast Conference Nov 6 to 8, 2026, at USC, per /events). Hide chapter events if none.
6. **Get involved with USM**: links to /start-an-ssa (for other schools), /programs (13Hacks, LSAT prep, Camp Kudrat, Leadership Retreat), /opportunities.
7. **Nearby chapters**: 3 to 5 closest chapters from the USM directory by city/state (computed from pages.json), linked internally. Good for internal linking.
8. **Optional local info (needs a source link per item)**: nearby gurdwaras (name, address, link to their own site or Google Maps listing), campus interfaith/reflection room if the university lists one, campus religious accommodation policy page. Each item must have a source URL; drop it if none.
9. **FAQ: being a Sikh student at <School>** (generic, non-doctrinal): Do I have to be Sikh to join? (Answer only if the chapter's own bio says so; otherwise say "Check with the chapter on Instagram.") How do I find meeting times? Is there a gurdwara nearby? (links section 8) What if my school has no SSA? (link /start-an-ssa). Where can I find scholarships? (link /news/sikh-scholarships). Questions about Sikhi itself link to /guides/sikhi-101 (already reviewed content) rather than new claims.
10. **Newsletter CTA**: existing USM footer form (student vs alum/supporter).

## Example sample copy (UCLA, from verified public data pulled 2026-11-01)
Sources: https://unitedsikhmovement.org/ssas/ucla and https://www.instagram.com/ucla_ssa/ (display name "Sikh Student Association UCLA", bio "Join our GroupMe!").

> **Sikh Student Association UCLA**
> UCLA, Los Angeles, CA
>
> The Sikh Student Association at UCLA is part of the United Sikh Movement network. The chapter shares meetings, events, and how to join its GroupMe on Instagram at @ucla_ssa.
> [Follow @ucla_ssa on Instagram]
>
> **What is an SSA?** A Sikh Student Association is a student-run group on campus for Sikh students and anyone curious about Sikhi and Punjabi culture. SSAs across the USM network host things like kirtan nights, seva projects, socials, and career panels.
>
> **Coming up across USM:** West Coast Conference, November 6 to 8, 2026, at USC. [Register]
>
> **Nearby chapters:** USC SSA, CSUN SSA, CSULB SSA, CSU Fullerton SSA, UC Irvine SSA.
>
> **No SSA at your school?** USM will send you a starter kit with a constitution template and first-event playbook. [Start an SSA]

(Note: "SSAs across the network host kirtan nights, seva projects, socials, and career panels" is supported by USM's own program pages and RU Sikh's page; keep it generic.)

## Schema suggestion
JSON-LD per chapter page:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Sikh Student Association UCLA",
  "url": "https://unitedsikhmovement.org/ssas/ucla",
  "sameAs": ["https://www.instagram.com/ucla_ssa/"],
  "parentOrganization": {"@type": "NGO", "name": "United Sikh Movement", "url": "https://unitedsikhmovement.org"},
  "location": {"@type": "Place", "name": "UCLA", "address": {"@type": "PostalAddress", "addressLocality": "Los Angeles", "addressRegion": "CA", "addressCountry": "US"}}
}
```
Add `Event` schema for any listed chapter event, and `FAQPage` only if the FAQ is visible on the page. Add a `BreadcrumbList` (Home > Find Your SSA > chapter).

## SEO patterns
- Title: `<School> Sikh Student Association (<Display name>) | USM` , e.g. "UCLA Sikh Student Association (SSA UCLA) | USM". Keep under about 60 characters; drop the parenthetical if long.
- Meta description: `Find the Sikh Student Association at <School> in <City>, <State>: how to join, Instagram, upcoming events, and nearby SSAs in the United Sikh Movement network.`
- H1: `<Display name> at <School>`.
- Canonical to the clean /ssas/<slug> URL.

## Indexing
- Index pages that have a high-confidence IG link plus at least one verified chapter detail (bio or USM-held info) plus the generic sections.
- noindex,follow pages with no confirmed IG and no chapter content until they get some, so ~80 thin near-duplicates do not dilute the site. Keep them in the directory for users.
- Also fix site copy: pages say "40 chapters" while the sitemap lists 82 chapter pages.

## FOR GURSIMAR TO DECIDE
- **Profile pictures and logos**: these are the chapters' own images (often school or chapter logos). Using them on USM pages without permission is a copyright/courtesy question. Options: (1) use only after a blanket OK from chapters, (2) show the IG embed (Instagram serves the image under its own terms), (3) use a generic USM chapter graphic. Downloaded copies in pics/ are for internal review only until you decide.
- Whether to show follower counts at all.
- Whether to keep chapters whose IG is inactive or repurposed (e.g. harvard).
