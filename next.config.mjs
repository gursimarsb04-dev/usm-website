/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
  async redirects() {
    return [
      // "/blog" is what people (and ads) will type; the blog lives at /news.
      { source: '/blog', destination: '/news', permanent: true },
      { source: '/blog/:slug', destination: '/news/:slug', permanent: true },
      // Seed posts replaced by the full-length SEO articles.
      { source: '/news/13hacks-first-sikh-hosted-hackathon', destination: '/news/first-sikh-hackathon-13hacks', permanent: true },
      { source: '/news/free-lsat-prep-sikh-mentors', destination: '/news/free-lsat-mentoring', permanent: true },
    ];
  },
};
export default nextConfig;
