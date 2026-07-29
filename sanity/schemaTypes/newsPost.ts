// NOTE ON AUTHORSHIP: `author` is required and must be a real person's name.
// USM's policy is that AI-assisted posts still carry a human byline and stay
// strictly factual/verifiable. `aiAssisted` is an internal record of which
// posts used AI drafting — it is not currently surfaced on the public page.
export default {
  name: 'newsPost', title: 'News Post', type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: (r: any) => r.required() },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'author', type: 'string', description: 'Real person — required on every post', validation: (r: any) => r.required() },
    {
      name: 'category', type: 'string',
      options: { list: ['Career Development', 'Hackathons', 'Guest Speakers', 'Student Research', 'Activism & News', 'Humans of USM'] },
    },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'excerpt', type: 'text', rows: 3, description: 'One-sentence summary shown in the feed' },
    { name: 'coverImage', type: 'image', options: { hotspot: true } },
    { name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'isHumansOfUSM', title: 'Humans of USM story?', type: 'boolean', initialValue: false },
    { name: 'aiAssisted', title: 'AI-assisted draft?', type: 'boolean', initialValue: false, description: 'Internal record only — human author still required' },
  ],
};
