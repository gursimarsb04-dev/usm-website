import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import { PageHeader } from '@/components/Section';
import SubmitEventForm from './SubmitEventForm';

export const metadata = { title: 'Submit an event' };

export default function SubmitEventPage() {
  return (
    <div className="mx-auto max-w-xl px-5 py-16">
      <FadeUp>
        <Link href="/events" className="text-sm text-teal-soft hover:text-teal">← All events</Link>
        <PageHeader
          title="Submit an event"
          intro="Running something students should know about? Add it to the national calendar. SSA officers can also post directly from their portal — this form is the quick, no-login way in. Submissions are reviewed before they go live."
        />
      </FadeUp>
      <FadeUp className="mt-8">
        <SubmitEventForm />
      </FadeUp>
    </div>
  );
}
