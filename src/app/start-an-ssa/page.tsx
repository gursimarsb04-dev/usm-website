// The growth funnel: no SSA at your school? Start one.
import FadeUp from '@/components/FadeUp';
import ApplyForm from './ApplyForm';

export const metadata = { title: 'Start an SSA' };

const steps = [
  { t: 'Tell us about your campus', b: 'Fill out the form below — takes two minutes.' },
  { t: 'We reach out within a week', b: 'A USM coordinator walks you through the starter kit: constitution template, first-event playbook, and funding guide.' },
  { t: 'Launch with the network behind you', b: 'Your chapter joins a national network of 40 active chapters — with speakers, funding support, and a sangat from day one.' },
];

export default function StartAnSSA() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <FadeUp>
        <h1 className="font-display text-5xl font-bold text-teal">Start an SSA</h1>
        <p className="mt-4 text-lg text-teal-ink/75">
          No Sikh Student Association at your school? You're exactly who this
          page is for. Hundreds of students have been where you are — here's how it works.
        </p>
      </FadeUp>

      <FadeUp className="mt-12 space-y-8">
        {steps.map((s, i) => (
          <div key={i} className="flex gap-5">
            <div className="shrink-0 w-10 h-10 rounded-full bg-gold grid place-items-center font-display font-bold text-teal-ink">
              {i + 1}
            </div>
            <div>
              <h2 className="font-display font-semibold text-xl text-teal">{s.t}</h2>
              <p className="text-teal-ink/75 mt-1">{s.b}</p>
            </div>
          </div>
        ))}
      </FadeUp>

      <FadeUp className="mt-14 rounded-3xl bg-white border border-teal/10 p-8 shadow-sm">
        <h2 className="font-display text-2xl font-semibold text-teal mb-6">Apply to start a chapter</h2>
        <ApplyForm />
      </FadeUp>
    </div>
  );
}
