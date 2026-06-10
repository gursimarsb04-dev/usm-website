// Anonymous read-only client for PUBLIC pages (home, directory, events).
// No cookies → pages stay cacheable/ISR-friendly. RLS allows public reads.
import { createClient } from '@supabase/supabase-js';

export function supabasePublic() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
  );
}
