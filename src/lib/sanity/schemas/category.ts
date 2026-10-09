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
  ],
  preview: {
    select: {
      titlePt: 'title.pt',
      titleEn: 'title.en',
      slug: 'slug.current',
    },
    prepare({ titlePt, titleEn, slug }: any) {
      return {
        title: titlePt || titleEn || 'Untitled Category',
        subtitle: slug ? `/${slug}` : '',
      };
    },
  },
};
