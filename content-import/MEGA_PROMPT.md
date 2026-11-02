You're working on the unitedsikhmovement.org Next.js site. First unzip usm-content-import.zip into /content-import at the repo root. Don't deploy it to the site; it's source material only. Work on your branch with a Vercel preview, show me a full summary, and DO NOT merge or deploy to production until I say yes.

Rules for all copy: plain human tone, no em or en dashes, don't invent facts, numbers, quotes or religious claims. Keep any line marked [NEEDS GURSIMAR REVIEW] or [VERIFY] out of the live page (hide it or leave it as a visible TODO in the draft) and list every one of them for me.

PART A. Fixes I already approved (skip any that are already done and tell me)
1. Noindex,follow the empty chapter pages, and let a page become indexable automatically once it has real content. Keep every chapter in the /ssas map.
2. Use "40 active chapters" across the site. /ssas can say "82 chapters listed".
3. Leave event addresses as plain location text.
4. Write unique meta descriptions for /west-coast-conference and /retreat. Noindex /privacy, /events/submit and the registration confirmation page.
5. Server-render the real homepage counter numbers so the HTML doesn't show 0. Keep the count-up animation.
6. Mark the West Coast Retreat (Oct 23) as past and remove "Open for registration".
7. Shorten the blog post SEO titles to under 60 characters. Don't change the slugs.
8. Take Podcast out of the nav and footer, and noindex /podcast until the first episode is out.
9. Harvard's chapter Instagram (@harvardsikhs) now shows "Miss World America Colorado". Remove that link and flag it for me.

PART B. New chapter landing page template (/ssas/[slug])
The data is in /content-import/ssa/ssa_instagram.csv (and .json), and the full spec is in /content-import/ssa/landing_page_plan.md. Follow that spec. Sections, in order:
1. Header: chapter display name (from the Instagram display name, otherwise the USM name), school, city and state. For the image, use Instagram's official profile embed or a clean generic USM chapter graphic, with the school initials on a branded background. Do NOT host the downloaded profile pictures in /content-import/ssa/pics yet; I haven't decided on permission. Build an `image` field I can switch on later.
2. About this chapter: the Instagram bio quoted exactly as written, or details USM already holds. Hide the section if there's nothing.
3. Follow and join: an Instagram button, only where the csv says confidence is "high".
4. What is an SSA: one generic block, the same on every page (copy is in the spec).
5. Upcoming events: this chapter's events from our events data, then USM national events. Hide the chapter events part if there are none.
6. Get involved with USM: links to /start-an-ssa, /programs and /opportunities.
7. Nearby chapters: the 3 to 5 closest chapters by city and state, linked.
8. FAQ: generic and non-doctrinal (questions are in the spec). Questions about Sikhi link to /guides/sikhi-101 instead of making new claims.
9. The existing newsletter signup.
Design: make it look modern and welcoming, mobile-first, consistent with the site's brand, with a strong hero, a clear Instagram CTA and card-style sections. Avoid empty states that say "Nothing on the calendar"; hide those blocks instead.
SEO: title "<School> Sikh Student Association | USM" (under 60 characters), the meta description pattern from the spec, H1 "<Display name> at <School>", Organization schema with sameAs Instagram and parentOrganization USM, BreadcrumbList, and FAQPage only if the FAQ is visible.
Indexing: index a chapter only if it has a high-confidence Instagram link plus at least one verified detail (a bio or USM-held info). Everything else stays noindex,follow.
Don't show follower counts.

PART C. Blog posts
There are 17 drafts in /content-import/posts/*.md, each with an SEO title, slug, meta description, keywords, FAQ and Sources. The same posts are in the two .docx files.
1. Add them as blog posts in our existing blog system (/news), using each file's slug, title and meta description. Add BlogPosting schema, plus FAQPage schema for each FAQ section.
2. Make all of them DRAFT or unpublished, or put them behind a preview-only flag. Nothing goes live until I've reviewed the flagged lines.
3. "Scholarships for Sikh Students in the U.S." replaces the existing /news/sikh-scholarships at the same URL. Keep it as a draft until I confirm.
4. Add the internal links suggested in each post, and link related posts to each other (3 per post).
5. Give the blog a better post layout: a readable column width, a table of contents for long posts, an FAQ accordion, a CTA box (Start an SSA, Join the newsletter, Events), and a related posts block.
6. Give me a table of every post with its count of NEEDS GURSIMAR REVIEW and VERIFY lines.

PART D. Tracking check
Make sure the 5 GA4 events from the last round (newsletter_signup, chapter_application, donate_click, join_network_click, event_register_click) also fire on the new chapter pages and blog layouts.

When you're done, give me: the preview URL, a checklist of what changed, a list of anything you skipped or couldn't verify, and 3 sample URLs to check (UCLA chapter, one empty chapter, one blog post).
