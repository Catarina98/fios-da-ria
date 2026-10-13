export const productSchema = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Product ID (Slug)',
      type: 'slug',
      options: {
        source: 'title.pt',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeText',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price (e.g. €38)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: 'order',
      title: 'Ordem de Exibição (Display Order)',
      type: 'number',
      description:
        'Número para definir a ordem na lista (ex: 1 para aparecer primeiro, 2 a seguir...). Se vazio, ordena pelos mais recentes.',
    },
    {
      name: 'vintedUrl',
      title: 'Vinted Link',
      type: 'url',
    },
    {
      name: 'isVisible',
      title: 'Show Product',
      type: 'boolean',
      description:
        'Turn off to hide the product from the website regardless of scheduling dates',
      initialValue: true,
    },
    {
      name: 'visibleFrom',
      title: 'Visible From (Start Date)',
      type: 'datetime',
      description: 'Optional. Leave blank to show immediately.',
    },
    {
      name: 'visibleUntil',
      title: 'Visible Until (End Date)',
      type: 'datetime',
      description: 'Optional. Leave blank to keep visible indefinitely.',
      validation: (Rule: any) =>
        Rule.custom((visibleUntil: string | undefined, context: any) => {
          const visibleFrom = context.document?.visibleFrom;
          if (
            visibleUntil &&
            visibleFrom &&
            new Date(visibleUntil) <= new Date(visibleFrom)
          ) {
            return 'End date must be after the start date';
          }

          return true;
        }),
    },
    {
      name: 'images',
      title: 'Product Images Gallery',
      type: 'array',
      options: {
        layout: 'grid',
      },
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'variants',
      title: 'Character Variants',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'Variant ID',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'name',
              title: 'Variant Name',
              type: 'localeString',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'price',
              title: 'Variant Price (e.g. €38)',
              type: 'string',
            },

            {
              name: 'vintedUrl',
              title: 'Vinted URL',
              type: 'url',
            },
            {
              name: 'image',
              title: 'Primary Variant Image',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'images',
              title: 'Variant Gallery Images',
              type: 'array',
              options: {
                layout: 'grid',
              },
              of: [{ type: 'image', options: { hotspot: true } }],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      titlePt: 'title.pt',
      titleEn: 'title.en',
      categoryRefTitlePt: 'category.title.pt',
      categoryRefTitleEn: 'category.title.en',
      categoryString: 'category',
      media: 'images.0',
      isVisible: 'isVisible',
      order: 'order',
    },
    prepare({
      titlePt,
      titleEn,
      categoryRefTitlePt,
      categoryRefTitleEn,
      categoryString,
      media,
      isVisible,
      order,
    }: any) {
      const baseTitle = titlePt || titleEn || 'Untitled Product';
      const title = isVisible === false ? `${baseTitle} (Hidden)` : baseTitle;
      const category =
        categoryRefTitlePt ||
        categoryRefTitleEn ||
        (typeof categoryString === 'string' ? categoryString : '') ||
        'Uncategorized';
      const orderLabel = typeof order === 'number' ? ` [#${order}]` : '';

      return {
        title,
        subtitle: `${category}${orderLabel}`,
        media,
      };
    },
  },
};
