// Renders blog post bodies with real structure (headings, lists, links, quotes)
// instead of flattening everything to plain paragraphs — H2s and in-body links
// are what Google reads to understand and rank a post.
//
// Two input shapes, same output:
//  - `markdown`: a small Markdown subset used by the in-repo articles
//    (## / ###, - and 1. lists, > quotes, **bold**, *italic*, [text](url),
//    and ![alt](/photos/x.jpg "caption") on its own line for a figure).
//    A line containing only {{signup}} drops the mid-article email capture in.
//    Tables (| a | b |) render as scrollable tables. Review markers are handled
//    by the `flags` prop (see REVIEW_FLAG).
//  - `blocks`: Sanity portable text (block styles, list items, strong/em/link marks).
import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';

const H2 = 'font-display text-2xl md:text-3xl font-bold text-teal mt-12 mb-4 leading-snug';
const H3 = 'font-display text-xl font-semibold text-teal-ink mt-8 mb-3';
const P = 'text-teal-ink/85 leading-relaxed';
const LIST = 'space-y-2 pl-6 text-teal-ink/85 leading-relaxed';
const QUOTE = 'border-l-4 border-gold pl-5 italic text-teal-ink/80';
const A = 'text-teal font-semibold underline decoration-gold decoration-2 underline-offset-2 hover:text-gold-deep';

function SmartLink({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={A}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={A} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

// Inline Markdown: [text](url), **bold**, *italic*. Links are matched first so
// their text can still carry emphasis.
function inline(text: string, keyPrefix = 'i'): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let n = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = `${keyPrefix}-${n++}`;
    if (m[1] !== undefined) {
      out.push(
        <SmartLink key={key} href={m[2]}>
          {inline(m[1], key)}
        </SmartLink>
      );
    } else if (m[3] !== undefined) {
      out.push(
        <strong key={key} className="font-semibold text-teal-ink">
          {inline(m[3], key)}
        </strong>
      );
    } else {
      out.push(<em key={key}>{inline(m[4], key)}</em>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

type MdBlock =
  | { t: 'h2' | 'h3' | 'p' | 'quote'; text: string }
  | { t: 'ul' | 'ol'; items: string[] }
  | { t: 'table'; head: string[]; rows: string[][] }
  | { t: 'img'; src: string; alt: string; caption?: string }
  | { t: 'signup' };

/**
 * Editorial review markers, e.g. [VERIFY], [VERIFY URL], [NEEDS GURSIMAR REVIEW].
 * A block or list item carrying one is either shown as a visible TODO (drafts)
 * or dropped entirely (published posts), so it can never reach a live page.
 */
export const REVIEW_FLAG = /\[(NEEDS GURSIMAR REVIEW|VERIFY)[^\]]*\]/;
const REVIEW_FLAG_G = /\s*\[(NEEDS GURSIMAR REVIEW|VERIFY)[^\]]*\]/g;
export type FlagMode = 'todo' | 'hide';

const flagged = (text: string) => REVIEW_FLAG.test(text);
const stripFlags = (text: string) => text.replace(REVIEW_FLAG_G, '').trim();
const flagLabel = (text: string) => (/NEEDS GURSIMAR REVIEW/.test(text) ? 'Needs Gursimar review' : 'Verify');

/** Stable anchor id for a heading, used by the table of contents. */
export function headingId(text: string): string {
  return stripFlags(text)
    .replace(/\*\*|\*|\[([^\]]+)\]\([^)]*\)/g, '$1')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const splitRow = (l: string) => l.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());

function parseMarkdown(md: string): MdBlock[] {
  const blocks: MdBlock[] = [];
  // Blocks are separated by blank lines. A heading only owns its own line, so
  // text directly under it (no blank line) becomes the next block.
  const chunks = md.trim().split(/\n\s*\n/).map((c) => c.split('\n').map((l) => l.trim()).filter(Boolean));
  while (chunks.length) {
    const lines = chunks.shift()!;
    if (!lines.length) continue;
    const first = lines[0];
    const heading = first.match(/^(#{2,3}) (.+)$/);
    if (heading) {
      blocks.push({ t: heading[1].length === 2 ? 'h2' : 'h3', text: heading[2] });
      if (lines.length > 1) chunks.unshift(lines.slice(1));
      continue;
    }
    const img = lines.length === 1 && first.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/);
    if (img) blocks.push({ t: 'img', alt: img[1], src: img[2], caption: img[3] });
    else if (first === '{{signup}}') blocks.push({ t: 'signup' });
    else if (lines.every((l) => l.startsWith('|'))) {
      const rows = lines.filter((l) => !/^\|[\s:|-]+\|$/.test(l)).map(splitRow);
      blocks.push({ t: 'table', head: rows[0] ?? [], rows: rows.slice(1) });
    } else if (lines.every((l) => /^[-*] /.test(l))) blocks.push({ t: 'ul', items: lines.map((l) => l.slice(2)) });
    else if (lines.every((l) => /^\d+\. /.test(l))) blocks.push({ t: 'ol', items: lines.map((l) => l.replace(/^\d+\. /, '')) });
    else if (lines.every((l) => l.startsWith('>'))) blocks.push({ t: 'quote', text: lines.map((l) => l.replace(/^>\s?/, '')).join(' ') });
    else blocks.push({ t: 'p', text: lines.join(' ') });
  }
  return blocks;
}

/** H2s for the table of contents (flag-aware, so hidden headings aren't listed). */
export function extractToc(md: string, flags: FlagMode = 'hide'): { id: string; text: string }[] {
  return parseMarkdown(md)
    .filter((b): b is { t: 'h2'; text: string } => b.t === 'h2')
    .filter((b) => flags === 'todo' || !flagged(b.text))
    .map((b) => ({ id: headingId(b.text), text: stripFlags(b.text).replace(/\*\*|\*/g, '') }));
}

/** Visible TODO wrapper for flagged content on drafts. */
function Todo({ text, children }: { text: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50 px-4 py-3">
      <span className="mb-1 inline-block rounded bg-amber-400 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-950">
        TODO: {flagLabel(text)}
      </span>
      <div>{children}</div>
    </div>
  );
}

function renderMarkdown(md: string, signup: ReactNode, flags: FlagMode): ReactNode[] {
  // Wrap or drop one piece of flagged text; unflagged text passes through.
  const gate = (text: string, render: (clean: string) => ReactNode): ReactNode =>
    !flagged(text) ? render(text) : flags === 'hide' ? null : <Todo text={text}>{render(stripFlags(text))}</Todo>;

  return parseMarkdown(md).map((b, i) => {
    const k = `b${i}`;
    switch (b.t) {
      case 'signup':
        return <Fragment key={k}>{signup}</Fragment>;
      case 'img':
        return (
          <figure key={k} className="my-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.src} alt={b.alt} loading="lazy" className="w-full rounded-3xl" />
            {b.caption && <figcaption className="mt-2 text-center text-sm text-teal-soft">{b.caption}</figcaption>}
          </figure>
        );
      case 'h2':
        return <Fragment key={k}>{gate(b.text, (t) => <h2 id={headingId(b.text)} className={`${H2} scroll-mt-28`}>{inline(t, k)}</h2>)}</Fragment>;
      case 'h3':
        return <Fragment key={k}>{gate(b.text, (t) => <h3 className={H3}>{inline(t, k)}</h3>)}</Fragment>;
      case 'quote':
        return <Fragment key={k}>{gate(b.text, (t) => <blockquote className={QUOTE}>{inline(t, k)}</blockquote>)}</Fragment>;
      case 'ul':
      case 'ol': {
        const items = b.items
          .map((it, j) => (flagged(it) && flags === 'hide' ? null : (
            <li key={j}>{flagged(it) ? <Todo text={it}>{inline(stripFlags(it), `${k}-${j}`)}</Todo> : inline(it, `${k}-${j}`)}</li>
          )))
          .filter(Boolean);
        if (!items.length) return null;
        return b.t === 'ul' ? (
          <ul key={k} className={`${LIST} list-disc marker:text-gold-deep`}>{items}</ul>
        ) : (
          <ol key={k} className={`${LIST} list-decimal marker:text-gold-deep marker:font-semibold`}>{items}</ol>
        );
      }
      case 'table': {
        const rows = b.rows.filter((r) => !(flags === 'hide' && flagged(r.join(' '))));
        if (!rows.length) return null;
        return (
          <div key={k} className="overflow-x-auto rounded-2xl border border-teal/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-mist text-teal-ink">
                <tr>{b.head.map((h, j) => <th key={j} className="px-4 py-3 font-semibold">{inline(h, `${k}-h${j}`)}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-teal/10 text-teal-ink/85">
                {rows.map((r, j) => {
                  const f = flagged(r.join(' '));
                  return (
                    <tr key={j} className={f ? 'bg-amber-50' : undefined}>
                      {r.map((c, x) => (
                        <td key={x} className="px-4 py-3 align-top">
                          {x === 0 && f && <span className="mr-2 rounded bg-amber-400 px-1.5 py-0.5 text-[10px] font-bold uppercase text-amber-950">TODO</span>}
                          {inline(stripFlags(c), `${k}-${j}-${x}`)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      }
      default:
        return <Fragment key={k}>{gate(b.text, (t) => <p className={P}>{inline(t, k)}</p>)}</Fragment>;
    }
  });
}

// ── Sanity portable text ──
function renderSpans(block: any, k: string): ReactNode[] {
  const defs: Record<string, any> = Object.fromEntries((block.markDefs ?? []).map((d: any) => [d._key, d]));
  return (block.children ?? []).map((c: any, j: number) => {
    let node: ReactNode = c.text;
    for (const mark of c.marks ?? []) {
      if (mark === 'strong') node = <strong className="font-semibold text-teal-ink">{node}</strong>;
      else if (mark === 'em') node = <em>{node}</em>;
      else if (defs[mark]?._type === 'link' && defs[mark].href) node = <SmartLink href={defs[mark].href}>{node}</SmartLink>;
    }
    return <Fragment key={`${k}-${j}`}>{node}</Fragment>;
  });
}

function renderPortable(blocks: any[]): ReactNode[] {
  const out: ReactNode[] = [];
  let list: { type: string; items: ReactNode[] } | null = null;
  const flush = () => {
    if (!list) return;
    const cls = list.type === 'number' ? `${LIST} list-decimal` : `${LIST} list-disc marker:text-gold-deep`;
    out.push(list.type === 'number' ? <ol key={`l${out.length}`} className={cls}>{list.items}</ol> : <ul key={`l${out.length}`} className={cls}>{list.items}</ul>);
    list = null;
  };
  blocks.forEach((b, i) => {
    const k = `pt${i}`;
    if (typeof b === 'string') {
      flush();
      out.push(<p key={k} className={P}>{b}</p>);
      return;
    }
    if (b?._type !== 'block') return; // images etc. are skipped for now
    if (b.listItem) {
      if (!list || list.type !== b.listItem) {
        flush();
        list = { type: b.listItem, items: [] };
      }
      list.items.push(<li key={k}>{renderSpans(b, k)}</li>);
      return;
    }
    flush();
    const spans = renderSpans(b, k);
    if (b.style === 'h2') out.push(<h2 key={k} className={H2}>{spans}</h2>);
    else if (b.style === 'h3' || b.style === 'h4') out.push(<h3 key={k} className={H3}>{spans}</h3>);
    else if (b.style === 'blockquote') out.push(<blockquote key={k} className={QUOTE}>{spans}</blockquote>);
    else out.push(<p key={k} className={P}>{spans}</p>);
  });
  flush();
  return out;
}

export default function ArticleBody({
  markdown,
  blocks,
  signup,
  flags = 'hide',
}: {
  markdown?: string;
  blocks?: any[];
  /** Mid-article email capture, placed at the {{signup}} marker (markdown only). */
  signup?: ReactNode;
  /** Review markers: 'todo' shows them highlighted (drafts), 'hide' drops them. */
  flags?: FlagMode;
}) {
  const content = markdown ? renderMarkdown(markdown, signup ?? null, flags) : renderPortable(blocks ?? []);
  return <div className="space-y-5">{content}</div>;
}
