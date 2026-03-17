export interface SSA {
  _id: string;
  _type: "ssa";
  name: string;
  slug: { current: string };
  university: string;
  state: string;
  city: string;
  region: "West" | "Midwest" | "East" | "South";
  logo?: SanityImage;
  description?: string;
  contactEmail?: string;
  instagramUrl?: string;
  websiteUrl?: string;
  memberCount?: number;
  foundedYear?: number;
}

export interface Event {
  _id: string;
  _type: "event";
  title: string;
  slug: { current: string };
  date: string;
  location: string;
  description?: any[];
  coverImage?: SanityImage;
  eventbriteUrl?: string;
  eventType: "conference" | "retreat" | "social" | "workshop";
  hostedBy?: SSA;
  isFeatured: boolean;
}

export interface TeamMember {
  _id: string;
  _type: "teamMember";
  name: string;
  role: string;
  group: "Executive Board" | "Advisors" | "Regional Leads";
  photo?: SanityImage;
  bio?: string;
  linkedinUrl?: string;
  order: number;
}

export interface Testimonial {
  _id: string;
  _type: "testimonial";
  quote: string;
  authorName: string;
  authorRole?: string;
  authorPhoto?: SanityImage;
  ssa?: SSA;
}

export interface BlogPost {
  _id: string;
  _type: "blogPost";
  title: string;
  slug: { current: string };
  author: string;
  publishedAt: string;
  coverImage?: SanityImage;
  body?: any[];
  tags?: string[];
}

export interface FAQ {
  _id: string;
  _type: "faq";
  question: string;
  answer: string;
  category: string;
}

export interface SiteSettings {
  _id: string;
  _type: "siteSettings";
  heroHeadline: string;
  heroSubtext?: string;
  heroImage?: SanityImage;
  donationGoal?: number;
  trustedByLogos?: SanityImage[];
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface MailchimpRequest {
  email: string;
  firstName?: string;
}

export interface DonateRequest {
  amount: number;
  frequency: "one-time" | "monthly";
  donorEmail?: string;
}

export interface DonationProgressResponse {
  total: number;
  goal: number;
  currency: "usd";
}
