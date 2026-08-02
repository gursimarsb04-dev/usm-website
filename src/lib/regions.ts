// Region grouping for the national event calendar.
//
// There is no `region` column in the DB — each chapter only carries a `state`
// (see `SSA` in types.ts) — so region is DERIVED here from state. The four US
// regions match USM's own conference framing (West Coast / Midwest / East
// Coast), plus South, plus Canada (USM has chapters in AB/BC/ON/QC).
//
// To reassign a state, edit REGION_BY_STATE — the calendar filter and any
// region grouping pick it up automatically. Unknown/missing states resolve to
// null (shown as "Other" in the UI) rather than being force-fit into a region.

export const REGIONS = ['West Coast', 'Midwest', 'East Coast', 'South', 'Canada'] as const;
export type Region = (typeof REGIONS)[number];

const REGION_BY_STATE: Record<string, Region> = {
  // ── West Coast ──
  CA: 'West Coast', WA: 'West Coast', OR: 'West Coast', NV: 'West Coast',
  AZ: 'West Coast', HI: 'West Coast', AK: 'West Coast', ID: 'West Coast',
  UT: 'West Coast', NM: 'West Coast', CO: 'West Coast', MT: 'West Coast',
  WY: 'West Coast',

  // ── Midwest ──
  IL: 'Midwest', IN: 'Midwest', MI: 'Midwest', MN: 'Midwest', MO: 'Midwest',
  OH: 'Midwest', WI: 'Midwest', IA: 'Midwest', KS: 'Midwest', NE: 'Midwest',
  ND: 'Midwest', SD: 'Midwest',

  // ── East Coast (Northeast + Mid-Atlantic) ──
  NY: 'East Coast', NJ: 'East Coast', PA: 'East Coast', MA: 'East Coast',
  CT: 'East Coast', RI: 'East Coast', MD: 'East Coast', DC: 'East Coast',
  VA: 'East Coast', NC: 'East Coast', ME: 'East Coast', NH: 'East Coast',
  VT: 'East Coast', DE: 'East Coast',

  // ── South ──
  TX: 'South', AL: 'South', FL: 'South', GA: 'South', SC: 'South',
  TN: 'South', LA: 'South', MS: 'South', AR: 'South', OK: 'South',
  KY: 'South', WV: 'South',

  // ── Canada ──
  AB: 'Canada', BC: 'Canada', ON: 'Canada', QC: 'Canada', MB: 'Canada',
  SK: 'Canada', NS: 'Canada', NB: 'Canada', NL: 'Canada', PE: 'Canada',
};

/** Resolve a chapter's region from its two-letter state/province code. */
export function regionForState(state: string | null | undefined): Region | null {
  if (!state) return null;
  return REGION_BY_STATE[state.trim().toUpperCase()] ?? null;
}
