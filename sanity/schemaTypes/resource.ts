export default {
  name: 'resource', title: 'Resource', type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: (r: any) => r.required() },
    { name: 'category', type: 'string', options: { list: ['Sikhi', 'Event Planning', 'Fundraising', 'Leadership', 'Marketing', 'Other'] } },
    { name: 'description', type: 'text', rows: 2 },
    { name: 'file', type: 'file', description: 'PDF/guide upload' },
    { name: 'externalUrl', type: 'url', description: 'Or link instead of a file' },
    { name: 'gated', title: 'SSA leaders only?', type: 'boolean', initialValue: false },
  ],
};
