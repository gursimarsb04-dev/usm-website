import FadeUp from '@/components/FadeUp';
import { CONTACT_EMAIL, EIN } from '@/lib/site';

export const metadata = { title: 'Privacy Policy' };

// NOTE(usm): This is a good-faith, plain-language starting point covering how the
// site actually handles data (newsletter emails via Supabase, donations via the
// Dasvandh Network, chapter applications). Have it reviewed by counsel before
// relying on it, and update the "Last updated" date whenever it changes.
const updated = 'July 2026';

const sections: { h: string; p: string[] }[] = [
  {
    h: 'Who we are',
    p: [
      `United Sikh Movement (“USM,” “we,” “us”) is a registered 501(c)(3) nonprofit (EIN ${EIN}). This policy explains what information we collect through unitedsikhmovement.org and how we use it.`,
    ],
  },
  {
    h: 'Information we collect',
    p: [
      'Newsletter signups: the email address you submit, so we can send you updates. You can unsubscribe at any time.',
      'Chapter applications and support requests: the name, email, school, and any message you provide when applying to start or affiliate a Sikh Student Association.',
      'Chapter portal accounts: information SSA leaders enter to manage their chapter pages.',
      'Basic technical data: standard server and analytics logs (such as pages visited) used to keep the site running and improve it.',
    ],
  },
  {
    h: 'How we use it',
    p: [
      'To send newsletters and respond to your inquiries.',
      'To operate the SSA network — reviewing applications, connecting chapters, and running the leader portal.',
      'We do not sell your personal information.',
    ],
  },
  {
    h: 'Donations',
    p: [
      'Donations are processed by the Dasvandh Network, not by USM directly. Payment details are handled by their platform under their own privacy and security terms — we never see or store your full card information.',
    ],
  },
  {
    h: 'Service providers',
    p: [
      'We use trusted providers to run the site and our programs, including Supabase (database), a Mailchimp service for email, and the Dasvandh Network (donations). These providers process data only to provide their services to us.',
    ],
  },
  {
    h: 'Your choices',
    p: [
      'You can unsubscribe from emails using the link in any newsletter, or by contacting us.',
      `You can ask us to access or delete the personal information we hold about you by emailing ${CONTACT_EMAIL}.`,
    ],
  },
  {
    h: 'Children',
    p: [
      'The site is intended for university students and adults. We do not knowingly collect information from children under 13.',
    ],
  },
  {
    h: 'Contact',
    p: [
      `Questions about this policy? Email us at ${CONTACT_EMAIL}.`,
    ],
  },
];

export default function Privacy() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <FadeUp>
        <h1 className="font-display text-4xl font-bold text-teal">Privacy Policy</h1>
        <p className="mt-2 text-sm text-teal-soft">Last updated: {updated}</p>
      </FadeUp>

      <div className="mt-10 space-y-9">
        {sections.map((s) => (
          <FadeUp key={s.h} variant="up">
            <h2 className="font-display text-xl font-semibold text-teal-ink">{s.h}</h2>
            {s.p.map((para, i) => (
              <p key={i} className="mt-2 text-teal-ink/80 leading-relaxed">{para}</p>
            ))}
          </FadeUp>
        ))}
      </div>
    </div>
  );
}
