export const highlightSchema = {
  name: 'highlight',
  title: 'Highlight (Banner)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
      description:
        'Highlight title. Use <highlight>text</highlight> to apply italicized accent style.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'badge',
      title: 'Top Tag (Badge)',
      type: 'localeString',
      description: 'Top badge/tag (e.g. "Handmade in Portugal").',
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'localeText',
      description: 'Short descriptive text.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'localeString',
      description: 'Primary button label (e.g. "View Gallery").',
    },
    {
      name: 'buttonUrl',
      title: 'Button Link',
      type: 'string',
      description: 'Internal path (e.g. "/gallery") or external URL.',
    },
    {
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'localeString',
      description: 'Optional button label (e.g. "Meet Catarina").',
    },
    {
      name: 'secondaryButtonUrl',
      title: 'Secondary Button Link',
      type: 'string',
      description: 'Optional internal path or external URL.',
    },
    {
      name: 'image',
      title: 'Highlight Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'localeString',
      description: 'Alternative text for accessibility.',
    },
    {
      name: 'imageTag',
      title: 'Image Tag (Note)',
      type: 'localeString',
      description:
        'Floating badge/note on the image (e.g. "Unique pieces, made with love").',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description:
        'Carousel order (e.g. 1 for first slide, 2 for next...). If empty, sorted by newest.',
    },
    {
      name: 'isVisible',
      title: 'Show Highlight',
      type: 'boolean',
      description:
        'Turn off to hide this highlight from the website regardless of scheduling dates.',
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
  ],
  preview: {
    select: {
      titlePt: 'title.pt',
      titleEn: 'title.en',
      badgePt: 'badge.pt',
      badgeEn: 'badge.en',
      media: 'image',
      isVisible: 'isVisible',
      order: 'order',
    },
    prepare({
      titlePt,
      titleEn,
      badgePt,
      badgeEn,
      media,
      isVisible,
      order,
    }: any) {
      const baseTitle = titleEn || titlePt || 'Untitled Highlight';
      const title = isVisible === false ? `${baseTitle} (Hidden)` : baseTitle;
      const orderLabel = typeof order === 'number' ? ` [#${order}]` : '';
      const badge = badgeEn || badgePt;
      const subtitle = badge ? `${badge}${orderLabel}` : orderLabel.trim();

      return {
        title,
        subtitle: subtitle || 'Highlight',
        media,
      };
    },
  },
};
