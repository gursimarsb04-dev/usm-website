export type SSA = {
  id: string; slug: string; name: string; school: string;
  city: string | null; state: string | null;
  latitude: number | null; longitude: number | null;
  instagram_handle: string | null; contact_email: string | null;
  description: string | null; joining_instructions: string | null;
  board_members: { name: string; role: string; photo_url?: string }[];
  cover_photo_url: string | null;
  status: 'unclaimed' | 'pending' | 'live' | 'inactive';
};

export type USMEvent = {
  id: string; ssa_id: string | null; title: string;
  description: string | null; starts_at: string; ends_at: string | null;
  location: string | null; registration_url: string | null;
  cover_photo_url: string | null; archive_summary: string | null;
};

export type Wrapped = {
  id: string; ssa_id: string; school_year: string;
  events_held: number | null; member_count: number | null; seva_hours: number | null;
  biggest_moment: string | null; senior_quote: string | null;
  senior_quote_name: string | null; photo_urls: string[]; published: boolean;
};
