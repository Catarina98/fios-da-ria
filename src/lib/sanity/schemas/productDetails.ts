// Shared fields allow collections to describe each character accurately.
export const productDetailsFields = [
  { name: 'dimensions', title: 'Approximate dimensions', type: 'localeString' },
  {
    name: 'included',
    title: 'Included in the price (unit or set)',
    type: 'localeText',
  },
  { name: 'materials', title: 'Materials', type: 'localeText' },
  { name: 'care', title: 'Care instructions', type: 'localeText' },
  {
    name: 'warnings',
    title: 'Intended use and safety warnings',
    type: 'localeText',
  },
  {
    name: 'minimumAge',
    title: 'Minimum age (years)',
    type: 'number',
    description:
      'Only publish after assessment of the final product. Materials alone do not establish a safe age.',
    validation: (Rule: any) => Rule.integer().min(0),
  },
  {
    name: 'safetyReviewed',
    title: 'Age and safety documentation reviewed',
    type: 'boolean',
    description:
      'Confirm the assessment, required documentation and applicable labelling for this product. Enables publication of its age indication; this checkbox is not a conformity assessment.',
    initialValue: false,
  },
];
