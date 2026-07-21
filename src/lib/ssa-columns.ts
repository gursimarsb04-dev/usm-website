// Columns on `ssas` that are safe to expose through the public (anon-key) API.
// Everything the table has EXCEPT `pin`, which is a portal login secret.
//
// Public pages must select from this list rather than `*`, because the anon key
// ships in the browser: a `select('*')` would hand every chapter's PIN to anyone
// who reads it. The companion DB migration (002_hide_pin.sql) revokes the `pin`
// column from the anon/authenticated roles so this fails closed even if a future
// query forgets — after that migration a `select('*')` as anon errors, so keep
// public reads pointed at this constant.
export const SSA_PUBLIC_COLUMNS = [
  'id',
  'slug',
  'name',
  'school',
  'city',
  'state',
  'latitude',
  'longitude',
  'instagram_handle',
  'contact_email',
  'description',
  'joining_instructions',
  'board_members',
  'cover_photo_url',
  'programs_content',
  'members_content',
  'status',
  'created_at',
  'updated_at',
].join(', ');
