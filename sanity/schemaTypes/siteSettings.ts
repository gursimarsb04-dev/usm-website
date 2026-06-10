export default {
  name: 'siteSettings', title: 'Site Settings', type: 'document',
  fields: [
    { name: 'heroHeadline', type: 'string' },
    { name: 'heroSubline', type: 'text', rows: 2 },
    { name: 'heroImage', type: 'image', options: { hotspot: true } },
    { name: 'dasvandhUrl', title: 'Dasvandh Network donation URL', type: 'url' },
    { name: 'instagramUrl', type: 'url' },
    { name: 'linkedinUrl', type: 'url' },
    { name: 'youtubeUrl', type: 'url' },
  ],
};
