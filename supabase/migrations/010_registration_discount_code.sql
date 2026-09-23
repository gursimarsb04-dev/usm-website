-- 010: track which discount code (if any) a registration used.
--
-- Discount codes themselves (USC26, SEVA26, ...) live in code
-- (src/lib/events-catalog.ts CatalogEvent.discounts) and are resolved
-- server-side in /api/register — this column is just the audit trail of
-- which code, if any, was applied to a given registration's price_cents.

alter table public.registrations
  add column discount_code text;
