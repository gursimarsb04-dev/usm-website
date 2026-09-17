'use client';
import { useState } from 'react';
import { SCHOOL_OPTIONS } from '@/lib/schools';
import { MAJOR_OPTIONS } from '@/lib/majors';

const DIETARY_OPTIONS = ['GF', 'Dairy Free', 'Nut Allergy'] as const;

export default function WestCoastConferenceForm({ slug }: { slug: string }) {
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const [school, setSchool] = useState('');
  const [majorProfession, setMajorProfession] = useState('');
  const [dietary, setDietary] = useState<string[]>([]);
  const [dietaryNone, setDietaryNone] = useState(false);
  const [needsHousing, setNeedsHousing] = useState<'yes' | 'no' | ''>('');

  function toggleDietary(opt: string) {
    setDietaryNone(false);
    setDietary((prev) => (prev.includes(opt) ? prev.filter((d) => d !== opt) : [...prev, opt]));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');
    setMessage('');
    const form = new FormData(e.currentTarget);

    const payload = {
      slug,
      name: form.get('name'),
      email: form.get('email'),
      phone: form.get('phone'),
      quantity: 1,
      returnPath: window.location.pathname,
      registration: {
        gender: form.get('gender'),
        birthday: form.get('birthday'),
        homeAddress: form.get('homeAddress'),
        studentStatus: form.get('studentStatus'),
        school: school === 'Other' ? String(form.get('schoolOther') || '') : school,
        majorProfession:
          majorProfession === 'Other' ? String(form.get('majorProfessionOther') || '') : majorProfession,
        linkedinUrl: form.get('linkedinUrl') || null,
        attendedBefore: form.get('attendedBefore') === 'yes',
        dietary: dietaryNone ? [] : dietary,
        dietaryOther: form.get('dietaryOther') || null,
        emergencyContactName: form.get('emergencyContactName'),
        emergencyContactRelation: form.get('emergencyContactRelation'),
        emergencyContactPhone: form.get('emergencyContactPhone'),
        needsHousing: needsHousing === 'yes',
        roommateRequests: needsHousing === 'yes'
          ? [form.get('roommate1'), form.get('roommate2'), form.get('roommate3')]
              .map((r) => String(r || '').trim())
              .filter(Boolean)
          : [],
        mediaConsent: form.get('mediaConsent') === 'on',
        photoConsent: form.get('photoConsent') === 'on',
        liabilityAccepted: form.get('liabilityAccepted') === 'on',
      },
    };

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setState('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setState('error');
      setMessage('Payment could not be started. Please try again.');
    } catch {
      setState('error');
      setMessage('Network error. Please try again.');
    }
  }

  const input =
    'w-full rounded-xl border border-teal/20 bg-white px-4 py-3 text-teal-ink placeholder:text-teal-soft/60 focus:outline-none focus:ring-2 focus:ring-teal/30';
  const label = 'grid gap-1 text-sm font-medium text-teal-ink';
  const sectionTitle = 'font-display font-semibold text-teal-ink text-base mt-2';

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className={label}>
        Full name
        <input name="name" required autoComplete="name" placeholder="Your name" className={input} />
      </label>
      <label className={label}>
        Email address
        <input name="email" type="email" required autoComplete="email" placeholder="you@school.edu" className={input} />
      </label>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className={label}>
          Gender
          <select name="gender" required defaultValue="" className={input}>
            <option value="" disabled>Select…</option>
            <option>Male</option>
            <option>Female</option>
            <option>Non-binary</option>
            <option>Prefer not to say</option>
          </select>
        </label>
        <label className={label}>
          Birthday
          <input name="birthday" type="date" required className={input} />
        </label>
      </div>
      <label className={label}>
        Cell phone
        <input name="phone" type="tel" required autoComplete="tel" placeholder="(555) 555-5555" className={input} />
      </label>
      <label className={label}>
        Home address
        <input name="homeAddress" required autoComplete="street-address" placeholder="Street, city, state, ZIP" className={input} />
      </label>

      <div className={sectionTitle}>About you</div>
      <label className={label}>
        Student status
        <select name="studentStatus" required defaultValue="" className={input}>
          <option value="" disabled>Select…</option>
          <option value="undergrad">Undergrad</option>
          <option value="grad">Grad</option>
          <option value="alumni">Alumni</option>
        </select>
      </label>
      <label className={label}>
        What school do you currently attend?
        <select
          name="school"
          required
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          className={input}
        >
          <option value="" disabled>Select…</option>
          {SCHOOL_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </label>
      {school === 'Other' && (
        <input name="schoolOther" required placeholder="Your school" className={input} />
      )}
      <label className={label}>
        What is your major/profession?
        <select
          name="majorProfession"
          required
          value={majorProfession}
          onChange={(e) => setMajorProfession(e.target.value)}
          className={input}
        >
          <option value="" disabled>Select…</option>
          {MAJOR_OPTIONS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </label>
      {majorProfession === 'Other' && (
        <input name="majorProfessionOther" required placeholder="Your major/profession" className={input} />
      )}
      <label className={label}>
        LinkedIn <span className="text-teal-soft font-normal">(optional)</span>
        <input name="linkedinUrl" type="url" placeholder="https://linkedin.com/in/…" className={input} />
      </label>

      <div className={label}>
        Have you been to a USM event before?
        <div className="flex gap-4 mt-1">
          <label className="flex items-center gap-2 text-sm text-teal-ink/90">
            <input type="radio" name="attendedBefore" value="yes" required className="h-4 w-4" /> Yes
          </label>
          <label className="flex items-center gap-2 text-sm text-teal-ink/90">
            <input type="radio" name="attendedBefore" value="no" required className="h-4 w-4" /> No
          </label>
        </div>
      </div>

      <div className="grid gap-2">
        <span className="text-sm font-medium text-teal-ink">
          Dietary restrictions <span className="text-teal-soft font-normal">(all food provided is eggless and vegetarian)</span>
        </span>
        <label className="flex items-center gap-3 text-sm text-teal-ink/90">
          <input
            type="checkbox"
            checked={dietaryNone}
            onChange={(e) => { setDietaryNone(e.target.checked); if (e.target.checked) setDietary([]); }}
            className="h-4 w-4 rounded border-teal/30"
          />
          None
        </label>
        {DIETARY_OPTIONS.map((opt) => (
          <label key={opt} className="flex items-center gap-3 text-sm text-teal-ink/90">
            <input
              type="checkbox"
              checked={dietary.includes(opt)}
              onChange={() => toggleDietary(opt)}
              disabled={dietaryNone}
              className="h-4 w-4 rounded border-teal/30"
            />
            {opt}
          </label>
        ))}
        <input name="dietaryOther" placeholder="Other — please specify (optional)" disabled={dietaryNone} className={input} />
      </div>

      <div className={sectionTitle}>Emergency contact</div>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className={label}>
          Name
          <input name="emergencyContactName" required placeholder="Full name" className={input} />
        </label>
        <label className={label}>
          Relation
          <input name="emergencyContactRelation" required placeholder="e.g. Mother, Roommate" className={input} />
        </label>
      </div>
      <label className={label}>
        Emergency contact phone number
        <input name="emergencyContactPhone" type="tel" required placeholder="(555) 555-5555" className={input} />
      </label>

      <div className={sectionTitle}>Housing</div>
      <div className={label}>
        Do you need housing?
        <div className="flex gap-4 mt-1">
          <label className="flex items-center gap-2 text-sm text-teal-ink/90">
            <input
              type="radio"
              name="needsHousing"
              value="yes"
              checked={needsHousing === 'yes'}
              onChange={() => setNeedsHousing('yes')}
              required
              className="h-4 w-4"
            /> Yes
          </label>
          <label className="flex items-center gap-2 text-sm text-teal-ink/90">
            <input
              type="radio"
              name="needsHousing"
              value="no"
              checked={needsHousing === 'no'}
              onChange={() => setNeedsHousing('no')}
              required
              className="h-4 w-4"
            /> No — I'll arrange my own (lower ticket price)
          </label>
        </div>
      </div>
      {needsHousing === 'yes' && (
        <div className="grid gap-2">
          <span className="text-sm text-teal-ink/80">
            Preferred roommates <span className="text-teal-soft font-normal">(up to 3 — they must also request you, optional)</span>
          </span>
          <input name="roommate1" placeholder="Roommate 1" className={input} />
          <input name="roommate2" placeholder="Roommate 2" className={input} />
          <input name="roommate3" placeholder="Roommate 3" className={input} />
        </div>
      )}

      <label className="flex items-start gap-3 text-sm text-teal-ink/90">
        <input name="mediaConsent" type="checkbox" required className="mt-1 h-4 w-4 rounded border-teal/30" />
        <span>
          I agree to the media consent &amp; liability waiver <a href="#media-consent" className="underline hover:text-teal">(see below)</a>.
        </span>
      </label>
      <label className="flex items-start gap-3 text-sm text-teal-ink/90">
        <input name="photoConsent" type="checkbox" required className="mt-1 h-4 w-4 rounded border-teal/30" />
        <span>I grant permission for USM to use photography from this event in future marketing materials.</span>
      </label>
      <label className="flex items-start gap-3 text-sm text-teal-ink/90">
        <input name="liabilityAccepted" type="checkbox" required className="mt-1 h-4 w-4 rounded border-teal/30" />
        <span>
          I have read and accept the <a href="#liability-waiver" className="underline hover:text-teal">acknowledgment of risk &amp; waiver of liability</a>.
        </span>
      </label>

      {state === 'error' && <p className="text-sm text-red-600 font-medium">{message}</p>}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="mt-2 rounded-full bg-teal text-white py-3.5 font-display font-semibold text-base hover:bg-teal-ink transition-colors disabled:opacity-50"
      >
        {state === 'loading' ? 'Processing…' : 'Continue to payment'}
      </button>
    </form>
  );
}
