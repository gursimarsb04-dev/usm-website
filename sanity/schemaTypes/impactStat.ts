export default {
  name: 'impactStat', title: 'Impact Stat', type: 'document',
  fields: [
    { name: 'label', type: 'string', description: 'e.g. "Leader retention"' },
    { name: 'value', type: 'string', description: 'e.g. "77%"' },
    { name: 'order', type: 'number' },
    { name: 'showOnHomepage', type: 'boolean', initialValue: false },
  ],
};
