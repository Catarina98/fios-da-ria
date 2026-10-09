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
      name: 'stock',
      title: 'Stock Quantity',
      type: 'number',
      initialValue: 1,
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'vintedUrl',
      title: 'Vinted Link',
      type: 'url',
    },
    {
      name: 'images',
      title: 'Product Images Gallery',
      type: 'array',
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
              name: 'stock',
              title: 'Stock',
              type: 'number',
              initialValue: 1,
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
    },
    prepare({
      titlePt,
      titleEn,
      categoryRefTitlePt,
      categoryRefTitleEn,
      categoryString,
      media,
    }: any) {
      const title = titlePt || titleEn || 'Untitled Product';
      const category =
        categoryRefTitlePt ||
        categoryRefTitleEn ||
        (typeof categoryString === 'string' ? categoryString : '') ||
        'Uncategorized';

      return {
        title,
        subtitle: category,
        media,
      };
    },
  },
};
