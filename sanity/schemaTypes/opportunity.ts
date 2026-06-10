export default {
  name: 'opportunity', title: 'Opportunity', type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'type', type: 'string', options: { list: ['Internship', 'Scholarship', 'Volunteer', 'Job', 'Grant', 'Other'] } },
    { name: 'organization', type: 'string' },
    { name: 'deadline', type: 'date' },
    { name: 'url', type: 'url' },
    { name: 'blurb', type: 'text', rows: 2, description: 'Keep it brief — one or two sentences' },
  ],
};
