// Major/profession dropdown for event registration forms.
//
// DRAFT — the intake spec asked for "common categories" but didn't list them,
// so these are a reasonable starting set covering the fields USM programming
// already leans on (LSAT/law prep, hackathons/CS, career mentorship broadly).
// Edit freely; nothing else in the codebase depends on these exact values
// besides the dropdown itself.
export const MAJOR_OPTIONS = [
  'Business / Finance',
  'Computer Science / Engineering (Software)',
  'Engineering (Other)',
  'Pre-Med / Biology / Health Sciences',
  'Nursing',
  'Pre-Law / Political Science',
  'Psychology / Social Sciences',
  'Communications / Marketing',
  'Undecided',
  'Other',
] as const;
