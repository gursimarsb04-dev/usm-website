export default {
  name: 'program', title: 'Program', type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: (r: any) => r.required() },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'pillar', type: 'string', options: { list: ['Sikhi Development', 'Professional Development', 'SSA Network'] } },
    { name: 'tagline', type: 'string', description: '3-5 words. e.g. "Reflect. Connect. Renew."' },
    { name: 'description', type: 'array', of: [{ type: 'block' }] },
    { name: 'coverImage', type: 'image', options: { hotspot: true } },
    { name: 'gallery', type: 'array', of: [{ type: 'image' }] },
    { name: 'order', type: 'number', description: 'Display order on the programs page' },
  ],
};
