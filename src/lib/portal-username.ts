// Portal login username, derived from the university name — no underscores or
// special characters. Every SSA logs in with this + their PIN; two chapters at
// the same university share a username and are told apart by their PIN.
const STOP = new Set(['university', 'of', 'the', 'at', 'college', 'and', 'school']);

export function ssaUsername(school: string | null | undefined): string {
  if (!school) return '';
  const cleaned = school.replace(/&/g, ' and ').replace(/[–—-]/g, ' ');
  const tokens = (cleaned.match(/[A-Za-z0-9]+/g) ?? []).filter(
    (t) => !STOP.has(t.toLowerCase())
  );
  return tokens.join('').toLowerCase();
}
