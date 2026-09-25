# USM Blog + Google Ad Grants Campaign

The plan behind the 10 articles in `src/lib/blog-articles.ts`: what each one is
for, how the Google Ad Grants budget ($10k/month) drives traffic to them, and how
every visit turns into an email subscriber stored in Supabase.

## The funnel

```
Google search / Ad Grants ad  →  article on /news/<slug>  →  email signup (mid-article + end)
                                                                  │
                            Supabase `newsletter_subscribers` ◄───┘  source = blog:<slug>:m|e
                                                                  │
                                         welcome email + monthly newsletter
                                                                  │
                          events (conference, SYNC, 13Hacks) · SSAs · donations
```

- **Every article has two signup forms**: one mid-article (`{{signup}}` marker)
  and one at the end, each with an article-specific pitch (`cta` field).
- **Signups are tagged** `blog:<slug>:m` (mid) or `blog:<slug>:e` (end) in the
  `source` column, so the admin Subscribers view shows exactly which article
  and which placement converted.
- **Signups count as Google Ads conversions** once the tracking IDs are set
  (see "Setup checklist").
- **New subscribers get a welcome email** (student vs. alum/supporter links),
  sent through the existing Mailchimp Transactional setup once
  `MAILCHIMP_API_KEY` is configured.

## The 10 articles

People don't search "SSA". They search for scholarships, LSAT prep, hackathons,
job-interview advice, Sikhi, and events. Each article targets a search people
actually make, then introduces USM.

| # | Article (`/news/…`) | Primary searches | Role | Ad Grants campaign |
|---|---|---|---|---|
| 1 | `west-coast-sikh-conference-2026` — 13th annual USM conference at USC, Nov 6–8 | sikh conference 2026, sikh student conference, sikh events los angeles | **Convert now** (registrations) | Events |
| 2 | `sync-sikh-sf-tech-week` — SYNC, Oct 6 | sikh tech networking, sf tech week events, sikh founders | **Convert now** (RSVPs) | Events |
| 3 | `first-sikh-hackathon-13hacks` — 13Hacks + TruckMind | first sikh hackathon, sikh entrepreneurs, sikh startups | Brand story / PR | Tech & Hackathons |
| 4 | `what-is-united-sikh-movement` | united sikh movement, sikh youth organization, sikh student organization | **Brand hub** | Brand |
| 5 | `sikh-scholarships` | sikh scholarships, scholarships for sikh students, punjabi scholarships | **Top traffic driver** (evergreen) | Scholarships |
| 6 | `free-lsat-mentoring` | free lsat prep, free lsat tutoring, lsat mentor | Program signups | Careers & LSAT |
| 7 | `turban-job-interview` | turban job interview, sikh workplace rights, religious accommodation turban | Evergreen, links earned | Careers & LSAT |
| 8 | `first-hackathon-no-coding` | first hackathon no coding, hackathon for beginners, non cs hackathon | Broad reach, 13Hacks 2027 list | Tech & Hackathons |
| 9 | `salok-mahala-9-meaning` | salok mahala 9, salok mahala 9 meaning, guru tegh bahadur teachings | Sikhi / community | Sikhi |
| 10 | `sikh-in-college` | sikh in college, sikh college students, keeping sikhi in college | Student acquisition | Sikhi |

Old seed posts `13hacks-first-sikh-hosted-hackathon` and
`free-lsat-prep-sikh-mentors` 308-redirect to #3 and #6.

## Google Ad Grants plan ($10,000/month ≈ $330/day)

### Grant rules to design around
- **5% account CTR** every month, or the account gets suspended. That's why
  every campaign uses tightly themed ad groups and phrase/exact match.
- **No single-word keywords** (except USM's own brand terms) and no overly
  generic ones ("scholarships", "hackathon" alone). Pause any keyword with
  Quality Score 1–2.
- **Conversion tracking is required** for Smart Bidding. Use *Maximize
  Conversions*, which also removes the $2 max-CPC limit.
- Each campaign needs **2+ ad groups, 2+ responsive search ads each, and 2+
  sitelinks**, plus location targeting (United States).
- Ads must go to substantive pages on the org's own domain, so every ad lands
  on an article, not the homepage.

### Campaign structure

| Campaign | Budget share | Landing pages | Example keywords (phrase/exact) |
|---|---|---|---|
| **Events** (through Nov 6) | 30% now → 0% after | #1, #2 | "sikh conference 2026", "sikh student conference", "sikh events los angeles", "sf tech week sikh", "sikh networking event" |
| **Scholarships** | 25% | #5 | "sikh scholarships", "scholarships for sikh students", "sikh education fund", "punjabi student scholarship" |
| **Careers & LSAT** | 15% | #6, #7 | "free lsat prep", "free lsat tutoring", "lsat mentor", "turban job interview", "sikh workplace rights" |
| **Tech & Hackathons** | 10% | #3, #8 | "hackathon for beginners", "first hackathon tips", "hackathon no coding", "sikh entrepreneurs" |
| **Sikhi & Student Life** | 10% | #9, #10 | "salok mahala 9", "guru tegh bahadur teachings", "sikh in college", "sikh student community" |
| **Brand** | 10% | #4 | "united sikh movement", "usm sikh", "sikh youth organization", "sikh student organization" |

After Nov 6, move the Events budget into Scholarships (Q4 is peak scholarship
season) and Careers & LSAT.

Realistically, Ad Grants accounts rarely spend the full $10k on a narrow niche.
Spend grows as more articles add more keyword coverage. That's why the
"next articles" list below matters.

### Sample ad copy (responsive search ads)

**Scholarships** — Headlines (≤30 chars): `Scholarships for Sikh Students` · `2026–27 Sikh Scholarship Guide` · `Grants & Interest-Free Loans` · `Free Guide From USM`
Descriptions (≤90): `Every scholarship, grant, and interest-free loan built for Sikh students in the U.S.` · `Updated guide from America's largest Sikh student network. Free, no signup needed.`

**Events** — `Sikh Student Conference 2026` · `Nov 6–8 at USC, Los Angeles` · `Early Registration Saves More` · `SYNC: Sikhs at SF Tech Week`
`Three days of speakers, workshops, and sangat with Sikh students from across the U.S.`

**Careers & LSAT** — `Free LSAT Prep & Mentoring` · `97th-Percentile Sikh Mentors` · `No Course Fees, Ever`
`LSAT mentoring from Sikhs who scored in the 97th percentile, with the Sikh Legal Society.`

**Sitelinks (all campaigns):** Find Your SSA (`/ssas`) · Upcoming Events (`/events`) · Free LSAT Mentoring · Scholarships Guide

## Rollout calendar

| When | Action |
|---|---|
| **Week of Sep 24** | Ship articles + tracking. Set env vars. Submit sitemap in Google Search Console. Launch **Events** campaign (#1, #2) first: both events have deadlines. |
| **By Oct 1** | Launch Scholarships + Brand campaigns. LinkedIn + Instagram: SYNC push (#2). |
| **Oct 6** | SYNC. Post a recap and add it to article #2. |
| **Oct 1–15** | Launch Careers & LSAT, Tech & Hackathons, Sikhi campaigns. One article per week in the newsletter. |
| **Oct 17 → Nov 6** | Conference countdown: retarget with ads + weekly email. |
| **Nov 6–8** | Conference. Afterwards, recap post + move Events budget. |
| **Monthly** | Check CTR (≥5%), pause QS 1–2 keywords, add negative keywords, review signups per article in the admin dashboard. |

## Organic distribution (free)
- **LinkedIn:** one post per article, written as a story rather than a link
  drop. Tag the people featured (TruckMind team, 13Hacks judges/mentors, SYNC
  hosts) so their networks see it.
- **Instagram:** a 5-slide carousel per article; link in bio → `/news`.
- **SSA chapters:** share kit (caption + graphic) for #1, #5, #10. 40 chapters
  reposting reach far more students than one account.
- **Newsletter:** feature one article per send.
- **Backlinks:** send #3 to TruckMind and 13Hacks participants, #5 to the
  scholarship orgs it lists, and #7 to Sikh Coalition/SALDEF. Links from
  those sites help #5 and #7 rank.

## Setup checklist (one-time, in Vercel + Google)
1. **Google Analytics 4:** create a property. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel.
2. **Google Ads (Ad Grants):** create a conversion action ("Newsletter signup",
   category *Sign-up*, website). Set `NEXT_PUBLIC_GOOGLE_ADS_ID` (`AW-…`) and
   `NEXT_PUBLIC_GOOGLE_ADS_SIGNUP_LABEL` in Vercel, then redeploy.
3. **Google Search Console:** verify `unitedsikhmovement.org` and submit
   `https://unitedsikhmovement.org/sitemap.xml`.
4. **Welcome email:** set `MAILCHIMP_API_KEY` (plus `EMAIL_FROM_ADDRESS`) in
   Vercel so new subscribers get it.
5. **Test once:** subscribe from an article, then confirm the row appears in
   Supabase → `newsletter_subscribers` with `source = blog:<slug>:m`.

## What to measure
- **Signups per article** (Supabase `source`), the main number.
- **Ad CTR** per campaign (must stay ≥5% account-wide).
- **Cost per signup** (in-kind) by campaign → shift budget monthly.
- **Registrations** for the conference and SYNC from blog traffic.
- **Organic clicks** per article in Search Console (takes 2–3 months to show).

## Next articles (to widen keyword coverage)
- MCAT / DAT prep for Sikh students (when those programs launch)
- How to start a Sikh Student Association (for "start a sikh club in college")
- Camp Kudrat 2027, Sikh summer retreats for young adults
- Khudrang Roots: seva trips to Punjab for diaspora youth
- 13Hacks 2027 announcement + winners' "where are they now" (TruckMind follow-up)
- Gurmat Sangeet at UC Davis: learning kirtan in college
