// Adds newsletter signups to the USM Mailchimp audience (Marketing API), so the
// monthly newsletter and the welcome email are sent from Mailchimp itself.
//
// Needs two server-only env vars in Vercel:
//   MAILCHIMP_MARKETING_API_KEY  e.g. "abc123...-us21" (the suffix is the data center)
//   MAILCHIMP_AUDIENCE_ID        Audience → Settings → Audience name and defaults
// Without them this no-ops; Supabase stays the source of truth either way.
//
// Every contact gets the `website-signup` tag (the Mailchimp welcome journey
// triggers on it) plus their segment tag (`student` / `alumni_donor`) and a
// `src:<source>` tag, e.g. `src:blog:sikh-scholarships:m`.
import { createHash } from 'crypto';

export async function addToMailchimp({
  email,
  segment,
  source,
}: {
  email: string;
  segment: string;
  source: string | null;
}): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  const key = process.env.MAILCHIMP_MARKETING_API_KEY;
  const list = process.env.MAILCHIMP_AUDIENCE_ID;
  if (!key || !list) return { ok: true, skipped: true };

  const dc = key.split('-').pop();
  const base = `https://${dc}.api.mailchimp.com/3.0/lists/${list}/members/${createHash('md5').update(email).digest('hex')}`;
  const auth = { Authorization: `Basic ${Buffer.from(`usm:${key}`).toString('base64')}`, 'Content-Type': 'application/json' };

  try {
    // PUT = upsert. `status_if_new` never re-subscribes someone who opted out.
    const res = await fetch(base, {
      method: 'PUT',
      headers: auth,
      body: JSON.stringify({ email_address: email, status_if_new: 'subscribed' }),
    });
    if (!res.ok) return { ok: false, error: await res.text() };

    const tags = ['website-signup', segment, source ? `src:${source}` : null]
      .filter(Boolean)
      .map((name) => ({ name, status: 'active' }));
    const t = await fetch(`${base}/tags`, { method: 'POST', headers: auth, body: JSON.stringify({ tags }) });
    if (!t.ok) return { ok: false, error: await t.text() };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}
