// Long-form SEO articles for the USM blog (see BLOG_CAMPAIGN.md for the
// keyword targets and Google Ad Grants plan behind each one).
//
// Rules for anything added here:
//  - Byline is "USM" (org policy: a named author on every post).
//  - Strictly factual. Program numbers come from src/lib/program-fallbacks.ts;
//    outside facts (scholarships, law) link to the primary source. Anything
//    with a deadline or dollar amount tells readers to confirm on the source.
//  - Body uses the Markdown subset in src/components/ArticleBody.tsx.
//    `{{signup}}` on its own line places the mid-article email capture.
//  - Keep slugs short: the signup is tagged `blog:<slug>` (40-char column cap).
import type { NewsPost } from '@/lib/news-fallbacks';

const PUBLISHED = '2026-09-24';

export const blogArticles: NewsPost[] = [
  // ── 1. Event: West Coast Conference (time-sensitive, lead Ad Grants campaign) ──
  {
    slug: 'west-coast-sikh-conference-2026',
    title: 'The 13th Annual USM Conference Is Coming to USC: November 6–8, 2026',
    seoTitle: 'Sikh Student Conference 2026 at USC (Nov 6–8) | USM West Coast Conference',
    author: 'USM',
    category: 'Events',
    publishedAt: PUBLISHED,
    coverImageUrl: '/photos/prog-national-conference.jpg',
    excerpt:
      "Three days of speakers, workshops, and sangat with Sikh students from across the country, hosted at the University of Southern California. Here's what to expect and how to register.",
    cta: {
      heading: 'Get conference updates first',
      body: 'Speaker announcements, schedule drops, and roommate-matching reminders go to the list before anywhere else.',
    },
    markdown: `
If you are a Sikh college student on the West Coast (or willing to fly in), there is one weekend this fall worth blocking off: **November 6–8, 2026**, when United Sikh Movement brings its 13th annual conference to the **University of Southern California** in Los Angeles.

This is the conference USM has been running, in one form or another, since a few students first got Southern California SSAs in a room together. Today it is where students from across the country come to hear from speakers, learn in workshops, and find sangat beyond their own campus.

[Register for the West Coast Conference →](/west-coast-conference)

## What happens at the conference

The weekend is built around three things students keep telling us they need more of:

- **Speakers who have walked the path.** Sikh professionals, founders, and community leaders who talk honestly about careers, identity, and what they wish they had known at your age.
- **Workshops you actually use.** Practical sessions you can take back to your classes, your career search, and your SSA.
- **Sangat.** Three days with Sikh students who get it — the part people remember most.

Last year's Inter-SSA Conferences brought together **300+ students across three regions** (110 on the West Coast alone) and **23 speakers**. The West Coast Conference is the flagship of that series.

## Who should come

- **Any Sikh college student.** You do not need to be on an SSA board, and your campus does not need to have an SSA at all.
- **SSA board members** who want to trade playbooks with chapters that have already figured out the thing you are stuck on.
- **Students who feel a little disconnected** from Sikhi or from the Sikh community on campus. Many people tell us this was the weekend that changed that.

{{signup}}

## Pricing and housing

Tickets are tiered: **the earlier you register, the less you pay**, and prices step up as the event gets closer. If you are arranging your own housing, there is a lower **no-hotel ticket** available the whole time. The current price is always shown on the [conference page](/west-coast-conference).

If you are coming with friends from your campus, register together so you can be matched for housing.

## Why a Sikh student conference matters

![Students from SSAs across the country at a USM Inter-SSA Conference](/photos/prog-national-conference.jpg "A USM Inter-SSA Conference.")

Most Sikh students are one of a handful of Sikhs in their lecture hall, their internship, or their dorm. That is not a problem to fix, but it does mean that the conversations that matter most — how to carry your Sikhi into a demanding career, how to keep your kes in a field where no one else does, how to lead an SSA without burning out — often happen alone.

A conference puts those conversations in one room. Students leave with mentors they can text, friends at other schools, and ideas for their own chapter. That is also why USM exists: [we are the largest Sikh student network in America](/news/what-is-united-sikh-movement), with 40 active chapters, and the conference is where the whole network shows up at once.

## How to register

1. Go to the [West Coast Conference page](/west-coast-conference).
2. Fill out the registration form (it takes a few minutes).
3. Read the media consent and liability waiver on that page before the event.

Questions about the weekend? [Contact the USM team](/contact) — we are all volunteers and former students ourselves, and we are happy to help.
`,
  },

  // ── 2. Event: SYNC at SF Tech Week ──
  {
    slug: 'sync-sikh-sf-tech-week',
    title: 'SYNC: The Only Sikh Space at SF Tech Week (October 6, San Francisco)',
    seoTitle: 'SYNC: Sikh Tech Networking Event at SF Tech Week 2026 | October 6',
    author: 'USM',
    category: 'Events',
    publishedAt: PUBLISHED,
    coverImageUrl: '/photos/pillar-professional.jpg',
    excerpt:
      'One evening, one room: Sikh founders, engineers, investors, operators, and students meeting the Bay Area tech ecosystem during SF Tech Week. October 6, 6–9 PM.',
    cta: {
      heading: 'Get invited to the next SYNC',
      body: 'Spots are limited. Join the list to hear about future Sikh tech and founder events before they fill up.',
    },
    markdown: `
What if one evening could introduce you to the people, ideas, and connections you didn't know you were missing?

That is the idea behind **SYNC**, a new event from United Sikh Movement and the **only Sikh space during SF Tech Week**, one of the Bay Area's biggest gatherings of builders, founders, investors, and innovators.

- **When:** Tuesday, October 6, 2026 · 6–9 PM
- **Where:** San Francisco
- **Who:** Founders, engineers, investors, operators, students, creatives — and anyone curious about what is being built next

[RSVP for SYNC →](https://lnkd.in/gpepHJ3D)

## Why a Sikh space at SF Tech Week?

SF Tech Week fills the city with hundreds of events. Plenty of them are great. But if you are Sikh, you know the feeling of walking into a room where you are the only one with a dastar, or the only one who knows what langar is, and spending the first half hour explaining yourself before you get to talk about what you are building.

SYNC flips that. For one evening, the Sikh community meets the tech ecosystem on its own terms.

## More than networking

SYNC is inspired by **sangat** — the Sikh idea that who you surround yourself with shapes who you become. So the goal is not to swap LinkedIn profiles and leave. It is to be in a room with people who are building, creating, investing, and thinking about what comes next, and to know you are part of a community doing it together.

Expect:

- **Conversations across career stages.** Students next to founders; engineers next to investors.
- **Collaboration.** Co-founders, first hires, mentors, and advisors have all been found at smaller events than this.
- **Community.** A room where your identity is the starting point, not the thing you have to explain.

{{signup}}

## Where SYNC comes from

SYNC grows out of the same belief behind [13Hacks, the first Sikh hackathon](/news/first-sikh-hackathon-13hacks): Sikh students and professionals do their best work in spaces that are both **values-driven and opportunity-rich**. At 13Hacks, that meant a weekend where students formed teams, learned from mentors across tech and startups, and pitched real products — including [TruckMind, a startup that won the Venture Track](/news/first-sikh-hackathon-13hacks).

SYNC takes that energy to the professional side of the Bay Area.

## Who should come

- **Founders and early employees** looking for talent, collaborators, or people who understand the path.
- **Engineers, PMs, designers, and operators** who want to meet Sikhs across the industry.
- **Investors** who want to meet the next generation of Sikh builders.
- **Students** who want to see what is possible, and meet people who will pick up the phone later.

Spots are limited, and this is the first one. [RSVP here](https://lnkd.in/gpepHJ3D), and come be part of the first.
`,
  },

  // ── 3. First Sikh hackathon + TruckMind ──
  {
    slug: 'first-sikh-hackathon-13hacks',
    title: 'Inside 13Hacks, the First Sikh Hackathon — and the Startup That Won Its Venture Track',
    seoTitle: 'The First Sikh Hackathon: 13Hacks at UC Berkeley & the Startup It Launched',
    author: 'USM',
    category: 'Hackathons',
    publishedAt: PUBLISHED,
    coverImageUrl: '/photos/prog-hackathon.jpg',
    excerpt:
      '100+ builders from 9 states, 30 mentors, three days at UC Berkeley — and TruckMind, a transportation startup that walked away with the Venture Track. Here is what happened at the first Sikh hackathon.',
    cta: {
      heading: 'Be first in line for 13Hacks 2027',
      body: 'Get the application, tracks, and dates for next year before they are announced publicly.',
    },
    markdown: `
In January 2026, United Sikh Movement did something no one had done before: it hosted a hackathon built by and for Sikh students. **13Hacks** ran for three days, January 23–25, at **UC Berkeley**, and brought together **100+ attendees from 9 states** and **30 mentors** from across tech, startups, product, design, and finance.

It was the first Sikh-hosted hackathon in America. It will not be the last.

## What 13Hacks was (and wasn't)

13Hacks was billed as **the Sikh Innovation Sprint**, and that framing mattered. It was open to **all majors, with no coding experience required**. Teams were built around a mix of skills — engineers, designers, business students, future lawyers — because that is what real companies look like.

Over the weekend, participants moved through:

- **Team formation** on day one
- **Hands-on workshops** on the skills they needed to build
- **Late-night hacking**
- **Fireside chats and AMAs** with mentors and community leaders
- **Demos and final pitches** in front of judges

The judges were **Jagjot (JJ) Singh, Dilpreet Sahota, Sargun Kaur, and Navneet Kaur**, and mentors included Sikh leaders across IT, cybersecurity, product, and startups. Organizers **Gursimar Kaur, Puneet Kaur Cheema, and Harsimran Kaur** ran the weekend.

## The startup: TruckMind

The team that won the **Venture Track** was **TruckMind**, a unified transportation platform that brings dispatch, safety, compliance, and back-office automation into one system for carriers.

At 13Hacks, the team showcased TruckMind's **safety compliance module**, focused on do-it-yourself **driver qualification (DQ) file management**. The goal: help trucking carriers move off spreadsheets and reactive workflows toward safety operations that are self-serve and audit-ready — without relying on outside consultants.

In the team's own words after the event, the judges' feedback "reinforced our belief that safety compliance needs to be preventive, operator-friendly, and built for real-world use."

The TruckMind team at 13Hacks: **Gurtej Sahota, Jugraj Singh, Parampreet Singh, Gurvir Virk, and Harpreet Kaur.**

There is something fitting about it. Trucking is an industry where Sikh Americans have a large presence, and one many Sikh families know from the inside. A team of young Sikhs building modern software for it — and getting feedback from Sikh judges and mentors who understood both the tech and the industry — is exactly the kind of thing 13Hacks was designed to make possible.

{{signup}}

## First place: "be delusional"

Another winning team, **DevRamp**, took first place with a lesson worth repeating. Team member Bhajneek Anand, a data science student at UCSD, wrote afterward that it was his first hackathon, and that one judge's advice stuck: **be delusional** — in your vision, and in what you want to achieve.

His biggest takeaway was not technical:

> If you're not technical, stop forcing yourself to code. Work on the pitch. Focus on the design. Map out the business model. Do what you're actually good at.

His team won, he said, because they fully understood their product's market, competitors, and customers. "Technical execution mattered, but conviction and clarity won the judges over."

If you have never done a hackathon and that sounds like something you could do, we wrote a whole guide: [How to do your first hackathon with no coding experience](/news/first-hackathon-no-coding).

## Why a Sikh hackathon?

Because Sikh students belong at the front of technical innovation, and a community built around them can help them get there.

Hackathons are where a lot of people get their first internship lead, first co-founder, or first taste of building something real. But plenty of students never go, because they assume they are not "technical enough," or they do not know anyone going. 13Hacks removed both barriers: no coding required, and a room full of people who share your values.

In the words of the USM team afterward: 13Hacks was proof of what is possible when we create spaces that are both values-driven and opportunity-rich.

## What's next

**13Hacks 2027** is coming. Join the list below to hear first. And if you are in the Bay Area this fall, the same energy is going professional at [SYNC, the Sikh space at SF Tech Week](/news/sync-sikh-sf-tech-week).
`,
  },

  // ── 4. What is USM (brand) ──
  {
    slug: 'what-is-united-sikh-movement',
    title: 'What Is United Sikh Movement? America’s Largest Sikh Student Network, Explained',
    seoTitle: 'What Is United Sikh Movement (USM)? The Largest Sikh Student Network in the US',
    author: 'USM',
    category: 'Activism & News',
    publishedAt: PUBLISHED,
    coverImageUrl: '/photos/hero.jpg',
    excerpt:
      'Started by four students in Southern California, USM is now a 40-chapter network helping Sikh youth grow professionally, personally, and spiritually. Here is what we do and how to get involved.',
    cta: {
      heading: 'Stay connected to the movement',
      body: 'One email a month: events near you, new programs, and stories from Sikh students across the country.',
    },
    markdown: `
**United Sikh Movement (USM)** is a national nonprofit that connects and supports Sikh college students across the United States. With **40 active chapters**, it is the **largest Sikh student network in America** — and the second largest in the world.

If you have been to a Sikh Student Association event, a Gurmat camp, a Sikh hackathon, or a Sikh student conference in the last few years, there is a good chance USM was part of it.

## How USM started

It started with four students who wanted more for Sikh student life.

Sikh students across California were carrying the same weight alone: excelling in class while staying true to their identity, searching for mentors who understood their journey, and building careers without compromising their values. Sikh Student Associations existed on many campuses, but each one was an island.

So a handful of students decided the islands should be a network. What began as Southern California chapters gathering for divaans grew, chapter by chapter, into a national network — and then into something bigger.

## What USM does

USM is built on four pillars: **Simran** (spirituality), **Seva** (service), **Sangat** (community), and **Academics**. In practice, that looks like three kinds of programs.

![A session at Camp Kudrat](/photos/prog-camp-kudrat.jpg "Camp Kudrat, USM's annual Sikhi retreat.")

### Sikhi development

- **[Camp Kudrat](/news/camp-kudrat-recap)**, an annual Sikhi retreat in nature — nitnem, kirtan, workshops, and sangat, with phones put away.
- **The Gurmat Sangeet Initiative**, including a 10-week course that became an official UC Davis offering, with **250+ attendees in Fall 2025**.
- **The [Salok Mahala 9 series](/news/salok-mahala-9-meaning)**, where youth facilitators trained with Sikh Dharmsal lead workshops on Guru Tegh Bahadur Ji's teachings.

### Professional development

- **[13Hacks](/news/first-sikh-hackathon-13hacks)**, the first Sikh hackathon in America — 100+ attendees, 9 states, 30 mentors.
- **[Free LSAT mentoring and prep](/news/free-lsat-mentoring)** from Sikhs who scored in the 97th percentile and above, with the Sikh Legal Society.
- **[SYNC](/news/sync-sikh-sf-tech-week)**, the Sikh space at SF Tech Week.

![Participants and mentors at 13Hacks, the first Sikh hackathon, at UC Berkeley](/photos/prog-hackathon.jpg "13Hacks at UC Berkeley: 100+ attendees from 9 states.")

### The SSA network

- **Conferences** that put every chapter in one room — [including the 13th annual conference at USC](/news/west-coast-sikh-conference-2026).
- **Leadership retreats** for SSA board members: 65+ participants from 18 SSAs this year, and 95% said they felt more confident leading their chapter afterward.
- **A national network** of 120+ board members who share playbooks in real time.
- **Advocacy.** After the hate crime at SJSU, USM mobilized West Coast schools toward Sikh awareness trainings with UC and CSU administrators and university police.

![SSA board members at a USM leadership retreat](/photos/prog-leadership-retreat.jpg "SSA board members at a USM leadership retreat.")

{{signup}}

## Who runs USM?

USM is **100% volunteer-led** — regional teams across the West Coast, Midwest, and East Coast, plus student sevadaars on 40 campuses. Most of them were students in an SSA not long ago. Because no one is paid, every donated dollar goes straight to students. USM is a registered 501(c)(3).

## How to get involved

- **If you are a student:** [find the SSA on your campus](/ssas), or come to a USM event. You do not need to be on a board.
- **If your campus has no SSA:** [we will help you start one](/start-an-ssa).
- **If you are a professional:** mentor at 13Hacks, speak at a conference, or come to SYNC.
- **If you want to support Sikh students:** [donate](/donate). It goes directly to programs.

## The short version

USM exists so no Sikh student has to choose between going far and staying rooted. With mentorship from Sikhs who have walked the path and programs built around what students actually need, USM is helping a generation carry their Sikhi into every room they walk into.
`,
  },

  // ── 5. Scholarships (high-volume evergreen search) ──
  {
    slug: 'sikh-scholarships',
    title: 'Scholarships for Sikh Students in the U.S.: The 2026–27 Guide',
    seoTitle: 'Sikh Scholarships 2026–27: Grants & Interest-Free Loans for Sikh Students (US)',
    author: 'USM',
    category: 'Student Life',
    publishedAt: PUBLISHED,
    coverImageUrl: '/photos/pillar-network.jpg',
    excerpt:
      'The scholarships, grants, and interest-free loans built specifically for Sikh students in the U.S. — who they are for, what they offer, and how to put together a stronger application.',
    cta: {
      heading: 'Get scholarship deadlines in your inbox',
      body: 'We share new Sikh scholarships and upcoming deadlines with the list, so you do not find out the week after they close.',
    },
    markdown: `
College is expensive, and most general scholarship databases bury the awards that were built for students like you. This guide collects the **scholarships, grants, and interest-free loans created specifically for Sikh students** studying in the United States, plus how to make your application stronger.

**One rule before you start:** amounts, eligibility, and deadlines change every year. Treat this as a map, and always confirm the details on the official site before you apply.

![Sikh students from SSAs across the country gathered together](/photos/prog-national-network.jpg "USM's network connects 120+ SSA board members nationwide.")

## Scholarships and aid for Sikh students in the U.S.

### Sikh Education Fund (Association of Sikh Professionals)

Since 1989, the [Sikh Education Fund](https://associationofsikhprofessionals.org/sikh-education-fund/), a project of the Association of Sikh Professionals, has helped Sikh students at U.S. colleges and universities with **scholarships and interest-free loans**. Loans are repaid after graduation, and the repaid money goes back into the fund to support the next students — a model built on the idea of seva.

**Good fit if:** you are studying at a U.S. college or university and could use either a grant or a loan with no interest.

### 5Rivers Foundation Scholarship

The [5Rivers Foundation](https://www.5riversfoundation.org/criteria-and-eligibility) offers scholarship grants of **up to $5,000** to Sikh students attending or planning to attend an accredited U.S. undergraduate or graduate program. Its published criteria have included a minimum GPA of 2.5 and a family income cap, and its most recent cycle had a summer deadline. Awards are not renewable, but past recipients can reapply.

**Good fit if:** you have financial need and are enrolled (or about to enroll) in a U.S. program.

### SALDEF scholarships

[SALDEF](https://saldef.org/tag/scholarship/), the Sikh American Legal Defense and Education Fund, has offered scholarships to Sikh American students who show **both academic merit and financial need**.

**Good fit if:** you have a strong academic record and a story about why you are pursuing your field.

### Sikh Human Development Foundation (USA scholarships)

The [Sikh Human Development Foundation](https://www.shdf.org/scholarships-usa/) is best known for scholarships in Punjab, but it also lists a **USA scholarship** program. Check its page for the current eligibility.

### Sikh Scholarship Fund

The [Sikh Scholarship Fund](https://sikhscholarshipfund.com/) supports Sikh students who show academic excellence, leadership potential, and commitment to community service.

{{signup}}

## Grants for your SSA (not just for you)

If you are on a Sikh Student Association board, money for your **chapter** exists too. The Sikh Coalition has run a [Sangat Seva Grant for SSAs](https://www.sikhcoalition.org/blog/2026/college-students-apply-for-the-sikh-student-association-grant/), supporting programming like Sikh Awareness Week, leadership workshops, and seva projects. The 2026 round has closed, but it is worth watching for the next one.

And if your campus does not have an SSA yet, [USM can help you start one](/start-an-ssa).

## How to write a stronger application

Sikh-specific scholarships are read by people who care about the community. That changes what a strong application looks like.

1. **Be specific about seva.** "I volunteer at the gurdwara" is common. What did you actually do, for how long, and what changed because of it?
2. **Connect your field to your values.** Why law, medicine, engineering, or teaching — and what does Sikhi have to do with it? Reviewers want to see that you have thought about it.
3. **Show leadership, not titles.** Being SSA president matters less than what your SSA did while you led it.
4. **Ask for recommendations early.** Give recommenders at least three weeks and a short summary of what you would like them to mention.
5. **Reuse, then tailor.** Write one strong core essay about your story and values, then adapt the opening and closing for each award.
6. **Apply to more than one.** These awards are small individually. Several of them together can change a year.

## Other ways to lower the cost of your future

Scholarships are one piece. Some of the biggest costs come after college — test prep, applications, and grad school. USM offers [free LSAT mentoring and prep](/news/free-lsat-mentoring) from Sikhs who scored in the 97th percentile and above, so you do not have to pay thousands for a course.

## Know a scholarship we missed?

This guide is updated as we learn about new awards. If you run or know a scholarship for Sikh students in the U.S., [let us know](/contact) and we will review it for the next update.
`,
  },

  // ── 6. Free LSAT mentoring ──
  {
    slug: 'free-lsat-mentoring',
    title: 'Free LSAT Mentoring From Sikhs Who Scored in the 97th Percentile',
    seoTitle: 'Free LSAT Prep & Mentoring for Sikh Students | 97th-Percentile Mentors',
    author: 'USM',
    category: 'Career Development',
    publishedAt: PUBLISHED,
    coverImageUrl: '/photos/prog-lsat-prep.jpg',
    excerpt:
      'LSAT courses can cost thousands. USM and the Sikh Legal Society offer free LSAT mentoring and prep led by Sikhs who scored in the 97th percentile and above. Here is how it works and how to join.',
    cta: {
      heading: 'Get the next LSAT cohort announcement',
      body: 'New cohorts, mentor sessions, and (soon) MCAT and DAT prep — announced to the list first.',
    },
    markdown: `
Law school is expensive before you ever set foot in a classroom. Commercial LSAT courses and private tutors can run into the thousands of dollars, and for a lot of first-generation students, that is the first wall between them and a legal career.

United Sikh Movement offers **free LSAT mentoring and prep**, led by Sikhs who scored in the **97th percentile and above**, in partnership with the **[Sikh Legal Society](https://www.sikhlegalsociety.org/)**.

[Sign up for LSAT prep →](https://forms.gle/NSWRwTXwppjZMbRi6)

## What you get

- **Mentors who have done it.** Your mentors scored in the 97th percentile or higher. They know what the test rewards and where people lose points.
- **It is free.** No course fee, no upsell.
- **People who get where you are coming from.** Mentors are Sikhs who have navigated the same questions you are: how to explain this path to family, how to find your place in a field with few Sikhs, and how to keep your identity front and center while doing it.
- **A path forward.** Through the Sikh Legal Society — a collective of Sikh students and young professionals in law — you can connect with attorneys, peers in law school, and resources for the application process.

## Who it is for

- College students and recent grads **thinking about law school**
- Students who have **started studying** and want structure or accountability
- Anyone who has been **priced out** of commercial prep

You do not need to have decided on law school yet. Plenty of people take the LSAT to find out.

{{signup}}

## How to approach the LSAT (the short version)

Whether or not you join the program, a few principles hold for almost everyone.

1. **Take a diagnostic first.** Take a full, timed practice test before you study anything. Your starting score tells you how much time you need.
2. **Give yourself enough runway.** Most people need a few months of consistent study, not a few weeks of cramming.
3. **Review beats volume.** Understanding why you got a question wrong (and why the right answer is right) matters more than how many questions you do.
4. **Simulate test day.** Do full timed sections in one sitting, under real conditions, well before your test date.
5. **Study with people.** Accountability is the most underrated prep tool. This is a big part of why mentoring works.

Always check the official test format and dates on [LSAC](https://www.lsac.org/), which runs the LSAT; the format has changed in recent years.

## Why USM runs this

USM's academic pillar exists because **chasing excellence is its own kind of seva**. Sikh students should be able to pursue law, medicine, and beyond without leaving their community or their identity at the door — and without paying thousands just to get started.

Next up: **MCAT and DAT prep**, built the same way. Join the list below to hear when they launch.

## Paying for the rest

The LSAT is one cost. If you are looking for help with tuition too, see our guide to [scholarships for Sikh students in the U.S.](/news/sikh-scholarships).
`,
  },

  // ── 7. Dastar at job interviews / workplace rights ──
  {
    slug: 'turban-job-interview',
    title: 'Wearing a Dastar to a Job Interview: What Sikh Professionals Want You to Know',
    seoTitle: 'Wearing a Turban (Dastar) to a Job Interview: Sikh Workplace Rights & Tips',
    author: 'USM',
    category: 'Career Development',
    publishedAt: PUBLISHED,
    coverImageUrl: '/photos/pillar-professional.jpg',
    excerpt:
      'Should you change anything about your dastar, beard, or kara for an interview? What the law says about religious accommodation at work, and practical advice from Sikhs who have been in the room.',
    cta: {
      heading: 'Career advice from Sikh professionals',
      body: 'Get mentorship opportunities, recruiting events, and career stories from Sikhs in your field.',
    },
    markdown: `
It is one of the most common questions Sikh students ask as recruiting season starts: **Should I change anything about how I look for a job interview?**

The short answer is no. You do not have to choose between your dastar, your kes, or your kara and a career. This guide covers what the law says, what to do if something comes up, and advice from Sikhs who have sat on both sides of the interview table.

*This is general information, not legal advice. If you think you have faced discrimination, talk to one of the organizations listed at the end.*

## What the law says

In the United States, **Title VII of the Civil Rights Act of 1964** prohibits employers with 15 or more employees from discriminating based on religion, and requires them to **reasonably accommodate** religious practices — including religious dress and grooming like a turban or unshorn hair — unless doing so would cause "undue hardship."

Two things are worth knowing:

- **The bar for "undue hardship" went up.** In *Groff v. DeJoy* (2023), the Supreme Court unanimously held that employers must show the burden of an accommodation is **substantial in the overall context of their business**, not just a minor cost. ([Supreme Court opinion](https://www.supremecourt.gov/opinions/22pdf/22-174_k536.pdf))
- **Discomfort is not a hardship.** The EEOC's guidance on the workplace rights of Sikhs says that claiming coworkers might be "upset" or "uncomfortable" seeing a turban is **not** undue hardship. ([EEOC guidance](https://www.eeoc.gov/fact-sheet/questions-and-answers-about-workplace-rights-muslims-arabs-south-asians-and-sikhs-under))

Many states add their own protections on top of federal law.

## Before the interview

- **Dress the way you would on your best day at work.** A neatly tied dastar in a color that goes with your outfit reads as polished, the same way a good tie or blazer does.
- **You do not need to disclose or explain your faith.** Your religion is not an interview topic unless you choose to bring it up.
- **If you need an accommodation for the interview itself**, such as a safety-gear question for a lab or site visit, it is fine to ask the recruiter ahead of time. Keep it simple and matter-of-fact.

{{signup}}

## During the interview

- **If someone asks about your dastar out of curiosity**, a short, confident answer works: what it is and what it means to you. Then steer back to why you are a great fit. Many Sikh professionals say it becomes a moment of connection.
- **If a question crosses a line** (for example, whether you would "be willing to remove it"), you can say that it is part of your faith and that you are confident it will not affect your work, then move on. Write down what was asked, by whom, and when.
- **Lead with your work.** The strongest thing you can do is make your skills impossible to ignore.

## After you get the offer

- **Uniforms, PPE, and dress codes:** if a policy conflicts with your articles of faith, ask HR for a religious accommodation in writing. Employers accommodate this all the time, and many already have policies in place.
- **Security screenings and travel:** know your rights before you go. The Sikh Coalition and SALDEF both publish know-your-rights resources.

## What Sikh professionals tell students

At USM events, the same themes come up again and again from Sikh engineers, lawyers, doctors, and founders:

1. **Your identity is a strength in the room.** People remember you. Make sure they remember your work too.
2. **Find the Sikhs already at the company.** Many large employers have Sikh employees or South Asian resource groups. Reach out — most are happy to help.
3. **You are not the first.** Sikhs serve in courtrooms, operating rooms, the military, and C-suites wearing their dastars. The path exists because people walked it.

That is why USM builds spaces like [SYNC](/news/sync-sikh-sf-tech-week) and [13Hacks](/news/first-sikh-hackathon-13hacks): so you meet those professionals before your interview, not after.

## If something goes wrong

If you believe you were discriminated against during hiring or at work, these organizations help Sikhs specifically:

- [The Sikh Coalition](https://www.sikhcoalition.org/)
- [SALDEF](https://saldef.org/)

You can also file a charge with the [EEOC](https://www.eeoc.gov/). There are time limits for filing, so do not wait.
`,
  },

  // ── 8. First hackathon, no coding (broad top-of-funnel) ──
  {
    slug: 'first-hackathon-no-coding',
    title: 'How to Do Your First Hackathon With No Coding Experience',
    seoTitle: 'First Hackathon With No Coding Experience? A Step-by-Step Guide for Beginners',
    author: 'USM',
    category: 'Hackathons',
    publishedAt: PUBLISHED,
    coverImageUrl: '/photos/prog-hackathon.jpg',
    excerpt:
      "Non-CS major? You can still win. A practical guide to picking a role, finding a team, and pitching — with lessons from 13Hacks, where a first-place team credited the pitch, not the code.",
    cta: {
      heading: 'Want in on 13Hacks 2027?',
      body: 'No coding required. Join the list for early applications, prep workshops, and team-matching.',
    },
    markdown: `
Most students who never go to a hackathon skip it for the same reason: *"I'm not technical enough."*

Here is the truth from [13Hacks, the first Sikh hackathon](/news/first-sikh-hackathon-13hacks): **DevRamp**, one of the first-place teams, said conviction and clarity won the judges over — not the code. One of its members wrote afterward:

> If you're not technical, stop forcing yourself to code. Work on the pitch. Focus on the design. Map out the business model. Do what you're actually good at.

This guide walks through how to do exactly that.

## What actually happens at a hackathon

A hackathon is a short, intense event, usually 24 to 72 hours, where small teams build a working prototype of an idea and pitch it to judges. Most follow the same arc:

1. **Kickoff and tracks.** Organizers announce the challenges or "tracks" (for example, a venture track for startup ideas).
2. **Team formation.** If you do not have a team, this is where you find one.
3. **Building.** Workshops, mentor check-ins, and a lot of snacks.
4. **Demos and pitches.** Each team shows what they built and why it matters.

## The roles non-coders own

Every strong hackathon team needs more than engineers. Pick the role that matches your strengths:

- **Product lead.** Defines the problem, talks to "users" (other attendees, mentors), and decides what gets built first.
- **Designer.** Makes the screens, the flow, and the demo look real. Tools like Figma have free plans.
- **Business and market lead.** Who is the customer, who are the competitors, how would this make money?
- **Pitch lead.** Writes and delivers the story. Often the single biggest factor in how judges score.
- **Researcher.** Finds the data, the stats, and the real-world proof that the problem is worth solving.

At 13Hacks, the **Venture Track** winner, TruckMind, won by showing a deep understanding of a real industry problem — trucking safety compliance — and a clear plan to solve it.

{{signup}}

## Before the event

- **Pick one skill to lead with.** You do not need to do everything. Be the best pitch person or the best designer in the room.
- **Learn one no-code tool.** A prototyping tool, a website builder, or a slide deck with clickable screens can make an idea feel real.
- **Come with a problem, not just an idea.** "Small trucking companies manage compliance in spreadsheets" is more useful than "an app for trucks."

## During the event

1. **Find a team early.** Say what you are good at: "I'm not an engineer, but I'll own the pitch and the market research."
2. **Scope small.** One core feature that works beats five that do not.
3. **Talk to mentors.** They are there for you. Ask them to poke holes in your idea on day one, not the last hour.
4. **Start the pitch halfway through**, not at the end. It will shape what gets built.
5. **Sleep a little.** Seriously.

## The pitch

Judges usually have a few minutes per team. A simple structure works:

1. **The problem**, in one sentence, with a real example.
2. **Who has it**, and how big the group is.
3. **Your solution**, shown in a live or clickable demo.
4. **Why you** — what your team understands that others do not.
5. **What's next** if you kept building.

Know your market, your competitors, and your customer cold. That is what DevRamp said made the difference at 13Hacks.

## Why your first hackathon should be one where you belong

The hardest part of a first hackathon is walking into a room where you do not know anyone. That is why 13Hacks was **open to all majors with no coding experience required**, and why mentors were there from start to finish. Students formed teams, learned new skills, and pitched real projects alongside people who share their values.

**13Hacks 2027** is coming. Join the list below and you will hear first.
`,
  },

  // ── 9. Salok Mahala 9 ──
  {
    slug: 'salok-mahala-9-meaning',
    title: "Salok Mahala 9: What Guru Tegh Bahadur Ji's Saloks Say to You in Your 20s",
    seoTitle: 'Salok Mahala 9 Meaning: Guru Tegh Bahadur Ji’s Teachings Explained for Young Sikhs',
    author: 'USM',
    category: 'Sikhi',
    publishedAt: PUBLISHED,
    coverImageUrl: '/photos/prog-salok-mahala-9.jpg',
    excerpt:
      "The saloks of Guru Tegh Bahadur Ji near the end of Guru Granth Sahib Ji speak directly to fear, attachment, and courage. An introduction for young Sikhs, and how USM's youth-led series teaches them.",
    cta: {
      heading: 'Join the next Salok Mahala 9 cohort',
      body: 'Workshops led by youth facilitators who get where you are. Join the list to hear when the next series opens near you.',
    },
    markdown: `
Near the very end of Sri Guru Granth Sahib Ji are the **Saloks of the Ninth Guru, Guru Tegh Bahadur Ji** — commonly called **Salok Mahala 9**. Many Sikhs know them from the Bhog of a Sehaj or Akhand Paath, when they are read just before Mundavani.

They are short. They are also some of the most direct words in Gurbani about the things people in their late teens and twenties wrestle with most: **fear, attachment, what lasts, and where to find strength.**

This is an introduction, not a translation or a replacement for sitting with the Bani yourself, or learning from people who have studied it deeply.

## Who was Guru Tegh Bahadur Ji?

Guru Tegh Bahadur Ji was the ninth Sikh Guru. He is remembered as **Hind di Chadar**, the shield of India, for giving his life in **Delhi in 1675** to defend the freedom of others to practice their faith — people whose religion was not his own. Gurdwara Sis Ganj Sahib in Chandni Chowk marks the place of his shaheedi. The Sikh world marked the **350th anniversary** of his martyrdom in 2025.

His Bani appears in Guru Granth Sahib Ji across several raags, and his saloks are gathered near the end of the Guru Granth Sahib.

## The themes of Salok Mahala 9

### Everything you are attached to is temporary

Again and again, the saloks point out that the body, wealth, status, and even relationships do not last forever — and that clinging to them as if they will is the root of a lot of suffering. That is not a call to stop caring. It is an invitation to hold things with open hands, and to anchor yourself in what does not change: Naam.

### Fearlessness, both ways

One of the most quoted lines of the saloks describes the person of wisdom as one who **"frightens no one, and is afraid of no one"** (*bhai kahoo ko det neh, neh bhai maanat aan*).

Think about how much of college life runs on fear: fear of failing, of falling behind, of what people think, of the future. And think about how often fear makes people hurt others. The Guru's words describe a freedom from both. Given how Guru Tegh Bahadur Ji lived and gave his life, it is not an abstract idea.

{{signup}}

### Remember while there is time

The saloks carry an urgency: life passes quickly, so do not wait for "later" to remember Vaheguru. For students who keep telling themselves they will get serious about Sikhi after exams, after graduation, after the job, it is a direct message.

### Strength comes from the Guru

Some of the final saloks speak of feeling that one's strength is gone and seeking refuge — and of strength returning through the Guru's support. Many people find comfort in these lines during the hardest seasons of their lives.

## Why learn it from people your age?

USM's **Salok Mahala 9 Series** was built on a simple idea: the person teaching you should be someone who gets where you are.

Working with **Sikh Dharmsal**, USM trained **6 youth facilitators** to lead workshops on Guru Tegh Bahadur Ji's Salok Mahala 9. The sessions are built for students — small groups, real questions, and time to talk about how these teachings apply to exams, relationships, anxiety, and ambition. The series is expanding to SSAs across the West Coast.

If you want to go deeper into Gurbani more broadly, start with USM's [Sikhi 101 guide](/guides/sikhi-101), or come to [Camp Kudrat](/news/camp-kudrat-recap), USM's annual Sikhi retreat.

![Kirtan with traditional string instruments and tabla at a USM Gurmat Sangeet program](/photos/prog-gurmat-sangeet.jpg "USM's Gurmat Sangeet course, now an official UC Davis offering.")

## How to start reading Salok Mahala 9

1. **Read a few saloks at a time**, not all at once. Pick one line to carry with you for the day.
2. **Use a reliable translation**, and when you can, learn the meaning of the original words. A lot of depth is lost in English.
3. **Listen to it in kirtan or katha.** Hearing Bani sung or explained brings it alive in a different way.
4. **Talk about it with someone.** That is what sangat is for, and what the Salok Mahala 9 Series is designed to give you.
`,
  },

  // ── 10. Being Sikh in college ──
  {
    slug: 'sikh-in-college',
    title: 'Being Sikh in College: Finding Sangat, Handling Questions, and Staying Grounded',
    seoTitle: 'Being Sikh in College: A Guide to Finding Community and Keeping Your Sikhi',
    author: 'USM',
    category: 'Student Life',
    publishedAt: PUBLISHED,
    coverImageUrl: '/photos/pillar-sikhi.jpg',
    excerpt:
      "For a lot of Sikh students, college is the first time Sikhi becomes a choice instead of a routine. A practical guide to finding community, answering questions about your identity, and not doing it alone.",
    cta: {
      heading: 'You are not doing this alone',
      body: 'Join the student list for events near your campus, retreats, and stories from Sikh students across the country.',
    },
    markdown: `
For a lot of Sikh students, college is the first time Sikhi becomes a **choice** instead of a routine. There is no one waking you up for nitnem, no weekly trip to the gurdwara with family, and a lot of new people who have never met a Sikh before.

That can feel isolating. It can also be the moment your Sikhi becomes truly your own. This guide is for the first-year student, the transfer, and anyone who has felt a little disconnected since starting school.

## Find your sangat in the first month

The single biggest thing you can do is find other Sikhs early, before the semester gets busy.

- **Look for your campus SSA.** Most larger campuses have a Sikh Student Association. [Find the SSA on your campus](/ssas) on USM's map of 40 active chapters.
- **No SSA? Start one.** It takes fewer people than you think. [USM will help you start an SSA](/start-an-ssa), with a coordinator and playbooks from chapters that have done it.
- **Find the nearest gurdwara.** Even going once a month for langar and sangat makes a difference.
- **Go to one bigger event.** Conferences and retreats connect you with Sikhs from other campuses. The [13th annual USM conference is at USC, November 6–8](/news/west-coast-sikh-conference-2026).

## Answering questions about your identity

You will get questions — about your dastar, your kara, your name, why you do not cut your hair. Most come from curiosity, not hostility.

- **Have a one-sentence answer ready.** "It's part of my faith. Sikhs keep our hair uncut as a gift from God, and the turban keeps it covered and reminds me of who I want to be." Short, confident, and yours.
- **You do not owe anyone a lecture.** Answer as much as you want to.
- **Use it as a bridge.** Some of the best friendships start with "What does that mean?"

If a question crosses into harassment, you do not have to handle it alone. Talk to your SSA, your university's bias-reporting office, or organizations like the Sikh Coalition. When a hate crime happened at SJSU, USM mobilized West Coast schools toward Sikh awareness trainings with UC and CSU administrators and university police, so chapters were not left to handle it alone.

{{signup}}

## Keeping your Sikhi when your schedule is chaos

- **Keep it small and daily.** Even one bani you do consistently beats an ambitious routine you drop by week three.
- **Attach it to something you already do**, like Japji Sahib on the walk to your first class, or Kirtan Sohila before sleep.
- **Find a study-and-simran buddy.** Accountability works for Sikhi the same way it works for the gym.
- **Go deeper once a year.** A retreat like [Camp Kudrat](/news/camp-kudrat-recap) can reset everything. One camper told us that after camp they started doing Kirtan Sohila before sleeping and were able to let go of their anxiety medication.

![A session at Camp Kudrat](/photos/prog-camp-kudrat.jpg "Camp Kudrat: phones away, sangat in.")

## When Sikhi feels far away

Plenty of students go through a stretch where they feel disconnected, questioning, or guilty for drifting. That is more common than anyone admits.

- **You are not alone in it.** Talk to someone a year or two ahead of you who has been through it.
- **Start with learning, not pressure.** USM's [Sikhi 101 guide](/guides/sikhi-101) and the youth-led [Salok Mahala 9 series](/news/salok-mahala-9-meaning) are good places to begin.
- **Stay close to sangat** even when you are not sure where you stand. Coming back is always easier when the door stayed open.

At USM we have seen students start tying a dastar, start keeping kes, and take Amrit — often after a season of feeling far away.

## Building your future without leaving your identity behind

College is also where careers start. You should not have to choose between ambition and identity:

- Build something at [13Hacks, the first Sikh hackathon](/news/first-sikh-hackathon-13hacks) (no coding required).
- Get [free LSAT mentoring](/news/free-lsat-mentoring) if law is on your mind.
- Read what Sikh professionals say about [wearing a dastar to a job interview](/news/turban-job-interview).
- Look for [scholarships built for Sikh students](/news/sikh-scholarships).

## The bottom line

You do not have to figure out being Sikh in college by yourself. There are 40 chapters and more than 120 SSA board members across the country who have been exactly where you are. Find them early.
`,
  },
];
