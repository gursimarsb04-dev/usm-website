// Single source of truth for org-wide contact details, socials, and the gallery
// album list. Update the placeholders here and every page picks it up.

// TODO(usm): PLACEHOLDER — swap for the real USM inbox when it's decided. Used on
// the Contact page (shown publicly) and as the recipient for new "Start an SSA"
// application notifications. Can be overridden per-environment with CONTACT_EMAIL.
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? 'abhijyotschadha@gmail.com';

// 501(c)(3) tax ID — from the legacy unitedsikhmovement.org footer.
export const EIN = '81-5233460';

export const SOCIALS = [
  { name: 'Instagram', href: 'https://www.instagram.com/unitedsikhmovement/' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/unitedsikhmovement' },
  { name: 'X', href: 'https://x.com/usmnetwork' },
  { name: 'Facebook', href: 'https://www.facebook.com/unitedsikhmovement/' },
] as const;

// Gallery albums: a cover image + a link out to the full Flickr album.
// TODO(usm): replace each `flickr` URL with the real album link, and drop a real
// cover image in /public/photos (or point `cover` at a Flickr-hosted image URL).
// Using existing program photos as placeholder covers for now.
export type Album = { title: string; cover: string; flickr: string; blurb?: string };
export const GALLERY_ALBUMS: Album[] = [
  { title: 'Inter-SSA National Conference', cover: '/photos/prog-national-conference.jpg', flickr: 'https://www.flickr.com/photos/unitedsikhmovement/albums', blurb: 'Chapters from across the country, one sangat.' },
  { title: 'Camp Kudrat', cover: '/photos/prog-camp-kudrat.jpg', flickr: 'https://www.flickr.com/photos/unitedsikhmovement/albums', blurb: 'Reflect. Connect. Renew.' },
  { title: 'Safal Summit', cover: '/photos/prog-safal-summit.jpg', flickr: 'https://www.flickr.com/photos/unitedsikhmovement/albums', blurb: 'Where ambition meets identity.' },
  { title: '13Hacks', cover: '/photos/prog-hackathon.jpg', flickr: 'https://www.flickr.com/photos/unitedsikhmovement/albums', blurb: 'The Sikh innovation sprint.' },
  { title: 'Leadership Retreat', cover: '/photos/pillar-network.jpg', flickr: 'https://www.flickr.com/photos/unitedsikhmovement/albums', blurb: 'Lead, organize, serve.' },
  { title: 'Sikhi Development', cover: '/photos/pillar-sikhi.jpg', flickr: 'https://www.flickr.com/photos/unitedsikhmovement/albums', blurb: 'Staying rooted while we grow.' },
];
