// Event category taxonomy for the national calendar's Type filter and the
// submission forms. NOT enforced in the DB (see migration 005) so it can evolve
// here without a schema change. Client-safe (no server imports) so both the
// public submit form and the portal event form can import it.
export const EVENT_TYPES = [
  'Divaan / Kirtan',
  'Social / GBM',
  'Professional / Career',
  'Conference / Retreat',
  'Fundraiser / Seva',
  'Workshop / Educational',
] as const;

export type EventType = (typeof EVENT_TYPES)[number];
