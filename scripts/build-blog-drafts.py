#!/usr/bin/env python3
"""Import content-import/posts/*.md as DRAFT blog posts.

Run from the repo root:  python3 scripts/build-blog-drafts.py [report.md]

Writes src/lib/blog-drafts.ts. Every post is imported with draft: true, which
the site only shows on non-production deployments (see src/lib/blog.ts).

Lines marked [NEEDS GURSIMAR REVIEW] or [VERIFY ...] are kept in the data but
are rendered as visible TODOs on drafts and dropped automatically if a post is
ever published, so they can never reach the live page. If a report path is
given, every flagged line is listed there for review.
"""
import glob
import json
import os
import re
import sys

SRC = 'content-import/posts'
OUT = 'src/lib/blog-drafts.ts'
FLAG = re.compile(r'\[(NEEDS GURSIMAR REVIEW|VERIFY)[^\]]*\]')

# Drafts that replace an existing live post at its URL.
SLUG_OVERRIDES = {'scholarships-for-sikh-students-usa': 'sikh-scholarships'}

# Suggested links that point at an equivalent page under a different path.
PATH_ALIASES = {'/chapters/apply': '/start-an-ssa'}

# Real, public, indexable routes a suggested link may point at (besides posts).
KNOWN_ROUTES = {
    '/', '/about', '/programs', '/ssas', '/start-an-ssa', '/events', '/news', '/resources',
    '/opportunities', '/impact', '/gallery', '/partners', '/donate', '/contact',
    '/guides/sikhi-101', '/west-coast-conference',
}

CATEGORY = {
    'Interfaith and Allyship': 'Student Life',
    'Langar Kitchen for Students': 'Student Life',
    'Scholarships and Admissions': 'Student Life',
    'Seva and Service': 'Student Life',
    'Seva and service (hub)': 'Student Life',
    'Sikh Festivals': 'Sikhi',
    'Sikh History': 'Sikhi',
    'Sikh Identity': 'Sikhi',
    'Sikh Rights and Accommodations': 'Activism & News',
    'Sikh identity on campus (spoke)': 'Student Life',
    'Sikh student organizing (hub)': 'Student Life',
}


def front_matter(text):
    m = re.match(r'---\n(.*?)\n---\n', text, re.S)
    meta = {}
    for line in m.group(1).splitlines():
        k, _, v = line.partition(':')
        v = v.strip()
        if v.startswith('['):
            meta[k.strip()] = json.loads(v)
        else:
            meta[k.strip()] = v.strip('"')
    return meta, text[m.end():]


def split_sections(body):
    """Split on '## ' headings. Returns (intro_and_body_md, {special: lines})."""
    special = {'FAQ': [], 'Suggested internal links': [], 'Sources': []}
    keep, current = [], None
    for line in body.splitlines():
        h = re.match(r'^## (.+)$', line)
        if h:
            current = h.group(1).strip() if h.group(1).strip() in special else None
            if current:
                continue
        (special[current] if current else keep).append(line)
    return '\n'.join(keep), special


def parse_faq(lines):
    items, q, a = [], None, []
    for line in lines + ['### ']:
        m = re.match(r'^### (.*)$', line)
        if m:
            if q:
                ans = ' '.join(x.strip() for x in a if x.strip())
                items.append({'q': q, 'a': ans, 'flagged': bool(FLAG.search(q + ' ' + ans))})
            q, a = m.group(1).strip() or None, []
        elif q is not None:
            a.append(line)
    return items


def parse_links(lines, post_slugs, unresolved):
    out = []
    for line in lines:
        line = line.strip().lstrip('-').strip()
        if not line:
            continue
        if line.lower().startswith('hub:'):
            unresolved.append(line)
            continue
        planned = '(planned)' in line
        for raw in re.split(r',\s*', FLAG.sub('', line).replace('(planned)', '')):
            path = raw.strip().rstrip('/') or raw.strip()
            if not path.startswith('/'):
                continue
            path = PATH_ALIASES.get(path, path)
            if path.startswith('/blog/'):
                path = '/news/' + path[len('/blog/'):]
            ok = path in KNOWN_ROUTES or path.startswith('/programs/') or (
                path.startswith('/news/') and path[len('/news/'):] in post_slugs)
            if ok and not planned:
                if path not in out:
                    out.append(path)
            else:
                unresolved.append(raw.strip() + (' (planned)' if planned else ''))
    return out


def main():
    files = sorted(glob.glob(os.path.join(SRC, '*.md')))
    metas = []
    for f in files:
        meta, body = front_matter(open(f, encoding='utf-8').read())
        metas.append((f, meta, body))
    # Every slug a link may resolve to: these drafts plus the live posts.
    live = re.findall(r"slug: '([^']+)'", open('src/lib/blog-articles.ts', encoding='utf-8').read())
    live += re.findall(r"slug: '([^']+)'", open('src/lib/news-fallbacks.ts', encoding='utf-8').read())
    post_slugs = set(live) | {SLUG_OVERRIDES.get(m['slug'], m['slug']) for _, m, _ in metas}

    posts, report = [], []
    for f, meta, body in metas:
        src_slug = meta['slug']
        slug = SLUG_OVERRIDES.get(src_slug, src_slug)
        h1 = re.search(r'^# (.+)$', body, re.M)
        title = h1.group(1).strip() if h1 else meta['seo_title']
        body = re.sub(r'^# .+\n', '', body, count=1, flags=re.M)
        main_md, special = split_sections(body)
        unresolved = []
        links = parse_links(special['Suggested internal links'], post_slugs, unresolved)
        # Internal links that point to /blog/ inside the body are rewritten too.
        main_md = re.sub(r'\]\(/blog/', '](/news/', main_md)

        flagged_lines = []
        for n, line in enumerate(open(f, encoding='utf-8').read().splitlines(), 1):
            for m in FLAG.finditer(line):
                flagged_lines.append({'line': n, 'kind': 'review' if m.group(1).startswith('NEEDS') else 'verify', 'text': line.strip()})
                break
        kinds = [x['kind'] for x in flagged_lines]
        posts.append({
            'slug': slug,
            'sourceFile': os.path.basename(f),
            'title': title,
            'seoTitle': meta['seo_title'],
            'excerpt': meta['meta_description'],
            'keywords': meta.get('target_keywords', []),
            'cluster': meta.get('cluster', ''),
            'category': CATEGORY.get(meta.get('cluster', ''), 'Student Life'),
            'author': 'USM',
            'draft': True,
            'publishingNote': meta.get('publishing_note') or None,
            'markdown': main_md.strip() + '\n',
            'faq': parse_faq(special['FAQ']),
            'sources': [l.strip().lstrip('-').strip() for l in special['Sources'] if l.strip()],
            'internalLinks': links,
            'flagCounts': {'review': kinds.count('review'), 'verify': kinds.count('verify')},
        })
        report.append((slug, os.path.basename(f), flagged_lines, unresolved))

    with open(OUT, 'w', encoding='utf-8') as out:
        out.write('// GENERATED by scripts/build-blog-drafts.py from content-import/posts/*.md.\n')
        out.write('// Do not edit by hand: change the markdown and re-run the script.\n')
        out.write('// All posts are drafts: shown only on non-production deployments.\n')
        out.write("import type { NewsPost } from '@/lib/news-fallbacks';\n\n")
        out.write('export const blogDrafts: NewsPost[] = ')
        out.write(json.dumps(posts, ensure_ascii=False, indent=2))
        out.write(';\n')
    print(f'wrote {len(posts)} drafts to {OUT}')

    if len(sys.argv) > 1:
        with open(sys.argv[1], 'w', encoding='utf-8') as r:
            r.write('# Blog drafts: flagged lines and unresolved links\n\n')
            r.write('| Post (URL) | Source file | NEEDS GURSIMAR REVIEW | VERIFY |\n|---|---|---|---|\n')
            for slug, src, fl, _ in report:
                r.write(f"| /news/{slug} | {src} | {sum(x['kind']=='review' for x in fl)} | {sum(x['kind']=='verify' for x in fl)} |\n")
            tot_r = sum(sum(x['kind']=='review' for x in fl) for _, _, fl, _ in report)
            tot_v = sum(sum(x['kind']=='verify' for x in fl) for _, _, fl, _ in report)
            r.write(f'| **Total** | | **{tot_r}** | **{tot_v}** |\n\n')
            r.write('Counts are lines. A line carrying both markers counts once, under the first marker on it.\n\n')
            for slug, src, fl, unresolved in report:
                r.write(f'## /news/{slug} ({src})\n\n')
                for x in fl:
                    r.write(f"- line {x['line']} [{'REVIEW' if x['kind']=='review' else 'VERIFY'}]: {x['text']}\n")
                if unresolved:
                    r.write('\nSuggested internal links not added (page does not exist or is planned):\n')
                    for u in unresolved:
                        r.write(f'- {u}\n')
                r.write('\n')
        print(f'wrote report to {sys.argv[1]}')


if __name__ == '__main__':
    main()
