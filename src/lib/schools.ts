// School dropdown for event registration forms. Reuses the same ~82-school
// list the SSA directory already maintains (src/lib/ssa-fallback.ts) so there
// is one source of truth and no "UCSD" vs "UC San Diego" vs "University of
// California SD" drift between the chapter directory and registration forms.
//
// A few chapters share a school (e.g. two Fresno State orgs), so this dedupes
// down to distinct school names. "Other" is always appended — events like the
// West Coast Conference can draw students from schools with no SSA chapter
// yet, and they still need somewhere to go.
import { ssaFallbacks } from './ssa-fallback';

export const SCHOOL_OPTIONS: string[] = [
  ...Array.from(new Set(ssaFallbacks.map((s) => s.school))).sort(),
  'Other',
];
