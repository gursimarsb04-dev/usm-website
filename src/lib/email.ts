// Minimal transactional email sender via Mailchimp Transactional (Mandrill),
// matching the setup already used by the portal email-blast route. When
// MAILCHIMP_API_KEY is not configured it logs instead of sending, so local dev
// and un-provisioned deploys don't error.
type SendArgs = { to: string; subject: string; html: string; replyTo?: string };

export async function sendEmail({ to, subject, html, replyTo }: SendArgs): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  const key = process.env.MAILCHIMP_API_KEY;
  const fromEmail = process.env.EMAIL_FROM_ADDRESS ?? 'noreply@unitedsikhmovement.org';
  const fromName = process.env.EMAIL_FROM_NAME ?? 'United Sikh Movement';

  if (!key) {
    console.log(`[email] MAILCHIMP_API_KEY not set — would send "${subject}" to ${to}`);
    return { ok: true, skipped: true };
  }

  const payload = {
    key,
    message: {
      html,
      subject,
      from_email: fromEmail,
      from_name: fromName,
      to: [{ email: to, type: 'to' }],
      ...(replyTo ? { headers: { 'Reply-To': replyTo } } : {}),
    },
  };

  try {
    const res = await fetch('https://mandrillapp.com/api/1.0/messages/send.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { ok: false, error: await res.text() };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

export function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
