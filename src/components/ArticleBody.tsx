// Renders blog post bodies with real structure (headings, lists, links, quotes)
// instead of flattening everything to plain paragraphs — H2s and in-body links
// are what Google reads to understand and rank a post.
//
// Two input shapes, same output:
//  - `markdown`: a small Markdown subset used by the in-repo articles
//    (## / ###, - and 1. lists, > quotes, **bold**, *italic*, [text](url)).
//    A line containing only {{signup}} drops the mid-article email capture in.
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
          {m[3]}
        </strong>
      );
    } else {
      out.push(<em key={key}>{m[4]}</em>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

type MdBlock =
  | { t: 'h2' | 'h3' | 'p' | 'quote'; text: string }
  | { t: 'ul' | 'ol'; items: string[] }
  | { t: 'signup' };

function parseMarkdown(md: string): MdBlock[] {
  const blocks: MdBlock[] = [];
  // Paragraphs are separated by blank lines; list items are consecutive lines.
  for (const chunk of md.trim().split(/\n\s*\n/)) {
    const lines = chunk.split('\n').map((l) => l.trim()).filter(Boolean);
    if (!lines.length) continue;
    const first = lines[0];
    if (first === '{{signup}}') blocks.push({ t: 'signup' });
    else if (first.startsWith('### ')) blocks.push({ t: 'h3', text: first.slice(4) });
    else if (first.startsWith('## ')) blocks.push({ t: 'h2', text: first.slice(3) });
    else if (lines.every((l) => /^[-*] /.test(l))) blocks.push({ t: 'ul', items: lines.map((l) => l.slice(2)) });
    else if (lines.every((l) => /^\d+\. /.test(l))) blocks.push({ t: 'ol', items: lines.map((l) => l.replace(/^\d+\. /, '')) });
    else if (lines.every((l) => l.startsWith('>'))) blocks.push({ t: 'quote', text: lines.map((l) => l.replace(/^>\s?/, '')).join(' ') });
    else blocks.push({ t: 'p', text: lines.join(' ') });
  }
  return blocks;
}

function renderMarkdown(md: string, signup: ReactNode): ReactNode[] {
  return parseMarkdown(md).map((b, i) => {
    const k = `b${i}`;
    switch (b.t) {
      case 'signup':
        return <Fragment key={k}>{signup}</Fragment>;
      case 'h2':
        return <h2 key={k} className={H2}>{inline(b.text, k)}</h2>;
      case 'h3':
        return <h3 key={k} className={H3}>{inline(b.text, k)}</h3>;
      case 'quote':
        return <blockquote key={k} className={QUOTE}>{inline(b.text, k)}</blockquote>;
      case 'ul':
        return (
          <ul key={k} className={`${LIST} list-disc marker:text-gold-deep`}>
            {b.items.map((it, j) => <li key={j}>{inline(it, `${k}-${j}`)}</li>)}
          </ul>
        );
      case 'ol':
        return (
          <ol key={k} className={`${LIST} list-decimal marker:text-gold-deep marker:font-semibold`}>
            {b.items.map((it, j) => <li key={j}>{inline(it, `${k}-${j}`)}</li>)}
          </ol>
        );
      default:
        return <p key={k} className={P}>{inline(b.text, k)}</p>;
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
}: {
  markdown?: string;
  blocks?: any[];
  /** Mid-article email capture, placed at the {{signup}} marker (markdown only). */
  signup?: ReactNode;
}) {
  const content = markdown ? renderMarkdown(markdown, signup ?? null) : renderPortable(blocks ?? []);
  return <div className="space-y-5">{content}</div>;
}
