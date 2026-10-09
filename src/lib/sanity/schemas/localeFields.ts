export const localeString = {
  title: 'Localized String',
  name: 'localeString',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true },
    },
  ],
  fields: [
    {
      title: 'Portuguese (PT)',
      name: 'pt',
      type: 'string',
    },
    {
      title: 'English (EN)',
      name: 'en',
      type: 'string',
    },
  ],
};

export const localeText = {
  title: 'Localized Text',
  name: 'localeText',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true },
    },
  ],
  fields: [
    {
      title: 'Portuguese (PT)',
      name: 'pt',
      type: 'text',
      rows: 3,
    },
    {
      title: 'English (EN)',
      name: 'en',
      type: 'text',
      rows: 3,
    },
  ],
};
