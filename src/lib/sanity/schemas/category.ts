export const categorySchema = {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Category Name',
      type: 'localeString',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL Identifier)',
      type: 'slug',
      options: {
        source: (doc: any) => doc?.title?.pt || doc?.title?.en || '',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeText',
    },
    {
      name: 'available',
      title: 'Available',
      type: 'boolean',
      description:
        'If turned off, this category and all its products will be hidden from the website.',
      initialValue: true,
    },
    {
      name: 'tagBackgroundColor',
      title: 'Tag Background Color',
      type: 'string',
      description:
        'Hex or CSS color for category tag background (e.g. #FCE7EF). If empty, the default pink color is used.',
    },
    {
      name: 'tagTextColor',
      title: 'Tag Text Color',
      type: 'string',
      description:
        'Hex or CSS color for category tag text (e.g. #874B6E). If empty, the default pink color is used.',
    },
  ],
  preview: {
    select: {
      titlePt: 'title.pt',
      titleEn: 'title.en',
      slug: 'slug.current',
      available: 'available',
    },
    prepare({ titlePt, titleEn, slug, available }: any) {
      const isAvailable = available !== false;
      const status = isAvailable ? '' : ' (Unavailable)';

      return {
        title: `${titlePt || titleEn || 'Untitled Category'}${status}`,
        subtitle: slug ? `/${slug}` : '',
      };
    },
  },
};
