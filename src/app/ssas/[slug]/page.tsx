// Chapter landing page (/ssas/<slug>). Spec: content-import/ssa/landing_page_plan.md.
//
// Built only from (a) what we can verify about the chapter (its Instagram bio
// when the account is confirmed, or details the chapter gave USM itself) and
// (b) generic USM content that is true for every chapter. Any section without
// real content is hidden rather than filled with placeholder copy.
import { notFound } from 'next/navigation';
import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import Phulkari from '@/components/Phulkari';
import JsonLd from '@/components/JsonLd';
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion';
import { supabasePublic } from '@/lib/supabase-public';
import { getChapter, getAllChapters, nearbyChapters, chapterHeading, type Chapter } from '@/lib/chapters';
import { getUpcomingCalendarEvents, type CalendarEvent } from '@/lib/calendar';
import { chapterSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import type { USMEvent, Wrapped } from '@/lib/types';

export const revalidate = 300;

const UUID = /^[0-9a-f-]{36}$/i;

function pageTitle(c: Chapter): string {
  for (const t of [`${c.school} Sikh Student Association | USM`, `${c.school} SSA | USM`, `${c.displayName} | USM`]) {
    if (t.length < 60) return t;
  }
  return `${c.usmName} | USM`;
}

function pageDescription(c: Chapter): string {
  const where = c.city ? ` in ${c.city}${c.state ? `, ${c.state}` : ''}` : '';
  const ig = c.instagram ? 'Instagram, ' : '';
  return `Find the Sikh Student Association at ${c.school}${where}: how to join, ${ig}upcoming events, and nearby SSAs in the United Sikh Movement network.`;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const c = await getChapter(params.slug);
  if (!c) return { title: 'Chapter not found' };
  return {
    ...pageMetadata({ path: `/ssas/${c.slug}`, title: pageTitle(c), absoluteTitle: true, description: pageDescription(c) }),
    // Thin pages stay out of the index until the chapter has verified content;
    // `follow` keeps link equity flowing to the rest of the site.
    ...(c.indexable ? {} : { robots: { index: false, follow: true } }),
  };
}

// ── Generic copy, identical on every chapter page ──
const WHAT_IS_SSA =
  'A Sikh Student Association is a student-run group on campus for Sikh students and anyone curious about Sikhi and Punjabi culture. SSAs across the USM network host things like kirtan nights, seva projects, socials, and career panels.';

function faqItems(c: Chapter): { items: FaqItem[]; plain: { q: string; a: string }[] } {
  const ig = c.instagram;
  const askChapter = ig ? `Check with the chapter on Instagram at @${ig.handle}.` : 'Contact USM and we can help you reach the chapter.';
  const linkCls = 'font-semibold text-teal underline decoration-gold underline-offset-4';
  const askNode = ig ? (
    <>Check with the chapter on Instagram at <a href={ig.url} target="_blank" rel="noopener noreferrer" className={linkCls}>@{ig.handle}</a>.</>
  ) : (
    <><Link href="/contact" className={linkCls}>Contact USM</Link> and we can help you reach the chapter.</>
  );
  const meets = c.details?.meets_when
    ? `The chapter lists its meetings as ${c.details.meets_when}${c.details.meets_where ? `, at ${c.details.meets_where}` : ''}.`
    : null;

  const rows: { q: string; node: React.ReactNode; text: string }[] = [
    { q: `Do I have to be Sikh to join ${c.displayName}?`, node: <>Every chapter sets its own membership. {askNode}</>, text: `Every chapter sets its own membership. ${askChapter}` },
    {
      q: 'How do I find meeting times?',
      node: meets ? <>{meets} For changes, {askNode}</> :<>The fastest way to find meetings and events is the chapter itself. {askNode}</>,
      text: meets ? `${meets} For changes, ${askChapter}` : `The fastest way to find meetings and events is the chapter itself. ${askChapter}`,
    },
    {
      q: 'What if my school has no SSA?',
      node: <>USM helps students start one. <Link href="/start-an-ssa" className={linkCls}>Apply to start an SSA</Link> and a USM coordinator will reach out within a week with a starter kit.</>,
      text: 'USM helps students start one. Apply to start an SSA at unitedsikhmovement.org/start-an-ssa and a USM coordinator will reach out within a week with a starter kit.',
    },
    {
      q: 'Where can I find scholarships for Sikh students?',
      node: <>See USM&apos;s guide to <Link href="/news/sikh-scholarships" className={linkCls}>scholarships for Sikh students</Link>.</>,
      text: "See USM's guide to scholarships for Sikh students at unitedsikhmovement.org/news/sikh-scholarships.",
    },
    {
      q: 'Where can I learn more about Sikhi?',
      node: <>Start with USM&apos;s <Link href="/guides/sikhi-101" className={linkCls}>Sikhi 101 guide</Link>.</>,
      text: "Start with USM's Sikhi 101 guide at unitedsikhmovement.org/guides/sikhi-101.",
    },
  ];
  return { items: rows.map((r) => ({ q: r.q, a: r.node })), plain: rows.map((r) => ({ q: r.q, a: r.text })) };
}

function fmtDay(iso: string) {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString('en-US', { day: 'numeric', timeZone: 'America/Los_Angeles' }),
    mon: d.toLocaleDateString('en-US', { month: 'short', timeZone: 'America/Los_Angeles' }),
  };
}

function EventRow({ title, startsAt, location, href, label }: { title: string; startsAt: string; location: string | null; href: string | null; label: string }) {
  const { day, mon } = fmtDay(startsAt);
  const external = href && !href.startsWith('/');
  return (
    <div className="flex gap-4 rounded-2xl border border-teal/10 bg-white p-4 md:p-5">
      <div className="w-14 shrink-0 rounded-xl bg-mist py-2 text-center">
        <div className="font-display text-2xl font-bold leading-none text-teal">{day}</div>
        <div className="mt-1 text-[11px] uppercase tracking-widest text-teal-soft">{mon}</div>
      </div>
      <div className="min-w-0">
        <div className="text-[11px] font-semibold uppercase tracking-widest text-gold-deep">{label}</div>
        <div className="mt-0.5 font-display font-semibold text-teal-ink">{title}</div>
        {location && <div className="mt-0.5 text-sm text-teal-soft">{location}</div>}
        {href && (
          <a
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            data-track="event_register_click"
            data-event-name={title}
            className="mt-2 inline-block text-sm font-semibold text-teal underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-deep"
          >
            Register
          </a>
        )}
      </div>
    </div>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-3xl border border-teal/10 bg-white p-6 md:p-8 shadow-sm ${className}`}>{children}</section>;
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-2xl md:text-3xl font-bold text-teal">{children}</h2>;
}

export default async function ChapterPage({ params }: { params: { slug: string } }) {
  const c = await getChapter(params.slug);
  if (!c) notFound();

  // Chapter events, photos and Wrapped only exist for chapters with a DB row.
  let chapterEvents: USMEvent[] = [];
  let photos: { id: string; url: string; caption?: string }[] = [];
  let wrapped: Wrapped | null = null;
  if (UUID.test(c.id)) {
    try {
      const sb = supabasePublic();
      const [{ data: ev }, { data: wr }, { data: ph }] = await Promise.all([
        sb.from('events').select('*').eq('ssa_id', c.id).gte('starts_at', new Date().toISOString()).order('starts_at').limit(6),
        sb.from('wrapped_submissions').select('*').eq('ssa_id', c.id).eq('published', true).order('school_year', { ascending: false }).limit(1),
        c.claimed
          ? sb.from('ssa_photos').select('*').eq('ssa_id', c.id).order('created_at', { ascending: false }).limit(8)
          : Promise.resolve({ data: [] as any[] }),
      ]);
      chapterEvents = ((ev as USMEvent[]) ?? []).filter((e: any) => e.status !== 'pending');
      photos = (ph as any[]) ?? [];
      wrapped = (wr?.[0] as Wrapped) ?? null;
    } catch {}
  }

  let national: CalendarEvent[] = [];
  try {
    national = (await getUpcomingCalendarEvents()).filter((e) => e.source === 'national').slice(0, 3);
  } catch {}

  const nearby = nearbyChapters(c, await getAllChapters());
  const heading = chapterHeading(c);
  const place = [c.city, c.state].filter(Boolean).join(', ');
  const d = c.details;
  const facts = [
    d?.meets_when && { label: 'Meets', value: d.meets_when },
    d?.meets_where && { label: 'Where', value: d.meets_where },
    d?.founded_year && { label: 'Established', value: String(d.founded_year) },
    wrapped?.member_count && { label: 'Members', value: `${wrapped.member_count}+` },
  ].filter(Boolean) as { label: string; value: string }[];
  const hasAbout = !!(c.bio || d?.description || d?.tagline);
  const faq = faqItems(c);
  const crumbs: [string, string][] = [['Home', '/'], ['Find Your SSA', '/ssas'], [c.displayName, `/ssas/${c.slug}`]];

  return (
    <>
      <JsonLd data={[chapterSchema(c), breadcrumbSchema(crumbs), faqSchema(faq.plain)]} />

      {/* ── 1. Hero ── */}
      <section className="relative overflow-hidden bg-teal text-white">
        {d?.cover_photo_url && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.cover_photo_url} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-ink via-teal-ink/85 to-teal-ink/60" />
          </>
        )}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14 2 L26 14 L14 26 L2 14 Z' fill='none' stroke='%23F5D78C' stroke-width='1'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative mx-auto max-w-wrap px-5 pb-14 pt-10 md:pb-20 md:pt-14">
          <nav aria-label="Breadcrumb" className="text-sm text-white/60">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-gold">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/ssas" className="hover:text-gold">Find Your SSA</Link></li>
              <li aria-hidden>/</li>
              <li className="text-white/85">{c.displayName}</li>
            </ol>
          </nav>

          <div className="mt-8 flex flex-col-reverse gap-8 md:flex-row md:items-center md:justify-between">
            <FadeUp className="max-w-2xl">
              <p className="font-display text-xs uppercase tracking-widest text-gold">Sikh Student Association</p>
              <h1 className="mt-3 font-display text-4xl font-bold leading-tight md:text-6xl">{heading}</h1>
              <p className="mt-4 text-lg text-white/80">
                {c.school}
                {place && <span className="text-white/60"> · {place}</span>}
              </p>
              {d?.tagline && <p className="mt-4 max-w-xl font-display text-xl leading-snug text-gold">{d.tagline}</p>}

              <div className="mt-8 flex flex-wrap gap-3">
                {c.instagram && (
                  <a
                    href={c.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-display font-semibold text-teal-ink transition-colors hover:bg-gold-deep"
                  >
                    <InstagramGlyph /> Follow @{c.instagram.handle}
                  </a>
                )}
                {d?.contact_email && (
                  <a href={`mailto:${d.contact_email}`} className="rounded-full border border-white/30 px-6 py-3 font-semibold transition-colors hover:border-gold hover:text-gold">
                    Email the chapter
                  </a>
                )}
                {!c.instagram && !d?.contact_email && (
                  <Link href="/contact" className="rounded-full bg-gold px-6 py-3 font-display font-semibold text-teal-ink transition-colors hover:bg-gold-deep">
                    Get connected through USM
                  </Link>
                )}
              </div>
            </FadeUp>

            {/* Chapter graphic: school initials on brand colors. Swap in the
                chapter's own image once CHAPTER_IMAGES_ENABLED is turned on. */}
            <div className="shrink-0">
              {c.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.image} alt={`${c.displayName} logo`} className="h-28 w-28 rounded-3xl object-cover ring-4 ring-gold/40 md:h-44 md:w-44" />
              ) : (
                <div
                  aria-hidden
                  className="grid h-28 w-28 place-items-center rounded-3xl bg-gradient-to-br from-gold to-gold-deep shadow-xl ring-4 ring-white/10 md:h-44 md:w-44"
                >
                  <span className="font-display text-3xl font-bold tracking-tight text-teal-ink md:text-5xl">{c.initials}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {facts.length > 0 && (
        <section className="border-b border-teal/10 bg-mist">
          <div className="mx-auto grid max-w-wrap grid-cols-2 gap-6 px-5 py-7 md:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label}>
                <div className="text-[11px] uppercase tracking-widest text-teal-soft">{f.label}</div>
                <div className="mt-1 font-display font-semibold leading-snug text-teal-ink">{f.value}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="bg-sand">
        <div className="mx-auto grid max-w-wrap gap-6 px-5 py-12 md:grid-cols-3 md:py-16">
          <div className="space-y-6 md:col-span-2">
            {/* ── 2. About this chapter (verified content only) ── */}
            {hasAbout && (
              <FadeUp>
                <Card>
                  <H2>About this chapter</H2>
                  {d?.description && <p className="mt-4 whitespace-pre-line text-lg leading-relaxed text-teal-ink/80">{d.description}</p>}
                  {c.bio && (
                    <figure className="mt-5">
                      <blockquote className="whitespace-pre-line rounded-2xl border-l-4 border-gold bg-mist/60 px-5 py-4 text-teal-ink/85 leading-relaxed">
                        {c.bio}
                      </blockquote>
                      <figcaption className="mt-2 text-sm text-teal-soft">
                        From the chapter&apos;s Instagram bio
                        {c.instagram && (
                          <>
                            {' '}(<a href={c.instagram.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-teal">@{c.instagram.handle}</a>)
                          </>
                        )}
                      </figcaption>
                    </figure>
                  )}
                </Card>
              </FadeUp>
            )}

            {/* ── 3. Follow and join ── */}
            {(c.instagram || d?.joining_instructions) && (
              <FadeUp>
                <Card className="bg-gradient-to-br from-white to-gold/10">
                  <H2>Follow and join</H2>
                  {d?.joining_instructions && (
                    <p className="mt-4 whitespace-pre-line leading-relaxed text-teal-ink/80">{d.joining_instructions}</p>
                  )}
                  {c.instagram && (
                    <>
                      <p className="mt-4 text-teal-ink/80">The fastest way to find meetings and events is the chapter&apos;s Instagram.</p>
                      <a
                        href={c.instagram.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 font-display font-semibold text-white transition-colors hover:bg-teal-ink"
                      >
                        <InstagramGlyph /> @{c.instagram.handle} on Instagram
                      </a>
                    </>
                  )}
                </Card>
              </FadeUp>
            )}

            {/* ── 4. What is an SSA (generic) ── */}
            <FadeUp>
              <Card>
                <H2>What is a Sikh Student Association?</H2>
                <p className="mt-4 leading-relaxed text-teal-ink/80">{WHAT_IS_SSA}</p>
              </Card>
            </FadeUp>

            {/* ── 5. Upcoming events (chapter first, then USM national) ── */}
            {(chapterEvents.length > 0 || national.length > 0) && (
              <FadeUp>
                <Card>
                  <H2>Upcoming events</H2>
                  {chapterEvents.length > 0 && (
                    <div className="mt-5 grid gap-3">
                      {chapterEvents.map((e) => (
                        <EventRow key={e.id} title={e.title} startsAt={e.starts_at} location={e.location} href={e.registration_url} label={c.displayName} />
                      ))}
                    </div>
                  )}
                  {national.length > 0 && (
                    <>
                      <h3 className="mt-6 text-sm font-semibold uppercase tracking-widest text-teal-soft">Across USM</h3>
                      <div className="mt-3 grid gap-3">
                        {national.map((e) => (
                          <EventRow key={e.id} title={e.title} startsAt={e.startsAt} location={e.location} href={e.registerUrl} label="USM National" />
                        ))}
                      </div>
                    </>
                  )}
                  <Link href="/events" className="mt-5 inline-block text-sm font-semibold text-teal hover:text-gold-deep">
                    All events →
                  </Link>
                </Card>
              </FadeUp>
            )}

            {/* Claimed chapters: their own photos */}
            {photos.length > 0 && (
              <FadeUp>
                <Card>
                  <H2>Our year so far</H2>
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {photos.map((p) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={p.id} src={p.url} alt={p.caption || c.displayName} className="aspect-square rounded-xl object-cover" />
                    ))}
                  </div>
                </Card>
              </FadeUp>
            )}

            {/* ── 8. FAQ ── */}
            <FadeUp>
              <H2>Questions about {c.displayName}</H2>
              <div className="mt-5">
                <FaqAccordion items={faq.items} />
              </div>
            </FadeUp>
          </div>

          <aside className="space-y-6">
            {/* Claimed chapters: board and Wrapped */}
            {d?.board_members && d.board_members.length > 0 && (
              <Card>
                <h2 className="font-display text-lg font-bold text-teal">Chapter board</h2>
                <ul className="mt-3 space-y-2.5">
                  {d.board_members.map((b, i) => (
                    <li key={i} className="rounded-xl bg-mist/60 px-4 py-3">
                      <div className="text-sm font-medium text-teal-ink">{b.name}</div>
                      <div className="mt-0.5 text-xs text-teal-soft">{b.role}</div>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
            {wrapped && (
              <Link href={`/ssas/${c.slug}/wrapped`} className="block rounded-3xl bg-teal p-6 text-white transition-colors hover:bg-teal-ink">
                <div className="text-[11px] uppercase tracking-widest text-gold">{wrapped.school_year} Wrapped</div>
                <div className="mt-1 font-display text-lg font-bold">See the year in numbers</div>
              </Link>
            )}

            {/* ── 6. Get involved with USM ── */}
            <Card>
              <h2 className="font-display text-lg font-bold text-teal">Get involved with USM</h2>
              <ul className="mt-4 space-y-3">
                {[
                  { href: '/start-an-ssa', t: 'Start an SSA', b: 'No SSA at your school? USM sends a starter kit with a constitution template and first-event playbook.' },
                  { href: '/programs', t: 'Programs', b: '13Hacks, LSAT prep, Camp Kudrat, and leadership retreats.' },
                  { href: '/opportunities', t: 'Opportunities', b: 'Internships, scholarships, grants, and volunteer roles for Sikh students.' },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="group block rounded-2xl border border-teal/10 p-4 transition-colors hover:border-gold">
                      <div className="font-display font-semibold text-teal-ink group-hover:text-teal">{l.t} →</div>
                      <div className="mt-1 text-sm text-teal-ink/70">{l.b}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>

            {/* ── 7. Nearby chapters ── */}
            {nearby.length > 0 && (
              <Card>
                <h2 className="font-display text-lg font-bold text-teal">Nearby chapters</h2>
                <ul className="mt-4 space-y-2">
                  {nearby.map((n) => (
                    <li key={n.slug}>
                      <Link href={`/ssas/${n.slug}`} className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-mist">
                        <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-teal text-[11px] font-bold text-gold">
                          {n.initials}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-teal-ink">{n.displayName}</span>
                          <span className="block truncate text-xs text-teal-soft">{n.school}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/ssas" className="mt-3 inline-block text-sm font-semibold text-teal hover:text-gold-deep">See the full map →</Link>
              </Card>
            )}
          </aside>
        </div>
      </div>

      <Phulkari className="text-teal/15" />
      <section className="bg-sand">
        <div className="mx-auto max-w-wrap px-5 py-10 text-center">
          <p className="text-sm text-teal-ink/70">
            {c.displayName} is listed in the{' '}
            <Link href="/" className="font-semibold text-teal underline underline-offset-4 hover:text-gold-deep">United Sikh Movement</Link>{' '}
            network: 40 active chapters supporting Sikh students.
          </p>
        </div>
      </section>
    </>
  );
}

function InstagramGlyph() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
