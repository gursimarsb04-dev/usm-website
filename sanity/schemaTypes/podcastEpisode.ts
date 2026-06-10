export default {
  name: 'podcastEpisode', title: 'Podcast Episode', type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'guest', type: 'string' },
    { name: 'publishedAt', type: 'date' },
    { name: 'youtubeUrl', type: 'url' },
    { name: 'description', type: 'text', rows: 3 },
  ],
};
