-- Example seed — replace with the real 75-SSA spreadsheet (intern task).
-- Columns map 1:1 to a Google Sheet: slug, name, school, city, state, lat, lng, status
insert into public.ssas (slug, name, school, city, state, latitude, longitude, status) values
  ('rutgers', 'Rutgers SSA', 'Rutgers University', 'New Brunswick', 'NJ', 40.5008, -74.4474, 'live'),
  ('ucla', 'UCLA SSA', 'University of California, Los Angeles', 'Los Angeles', 'CA', 34.0689, -118.4452, 'unclaimed'),
  ('umich', 'Michigan SSA', 'University of Michigan', 'Ann Arbor', 'MI', 42.2780, -83.7382, 'unclaimed')
on conflict (slug) do nothing;

-- Make yourself the first USM admin AFTER signing up via the portal once:
-- update public.profiles set role = 'usm_admin' where id = 'YOUR-AUTH-USER-UUID';
