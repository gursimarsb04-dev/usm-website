export default {
  name: 'newsPost', title: 'News Post', type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: (r: any) => r.required() },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'excerpt', type: 'text', rows: 3, description: 'One-sentence summary shown in the feed' },
    { name: 'coverImage', type: 'image', options: { hotspot: true } },
    { name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'isHumansOfUSM', title: 'Humans of USM story?', type: 'boolean', initialValue: false },
  ],
};
