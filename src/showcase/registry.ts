export type ShowcaseGroup = 'Foundations' | 'Components';

export type ShowcaseEntry = {
  slug: string;
  name: string;
  summary: string;
  group?: ShowcaseGroup;

  // Full-width sections (e.g. hero banners) render edge-to-edge instead of
  // inside the padded detail card, so their `fill` images render at their
  // real width and `sizes="100vw"` stays accurate.
  fullWidth?: boolean;
};

export const showcaseList: ShowcaseEntry[] = [
  {
    slug: 'colors',
    name: 'Colors',
    summary: 'The custom bg-*, text-*, border-*, icon-* and link-* tokens.',
    group: 'Foundations',
  },
  {
    slug: 'typography',
    name: 'Typography',
    summary: 'Display, Heading, Body, Label and Caption at every size.',
    group: 'Foundations',
  },
  {
    slug: 'accordion',
    name: 'Accordion',
    summary:
      'Expandable list of question and answer panels, plain or paired with a heading, support link and CTA.',
  },
  {
    slug: 'badge',
    name: 'Badge',
    summary: 'Pill-shaped indicator badge with variants and icon support.',
  },
  {
    slug: 'button',
    name: 'Button',
    summary: 'Primary, secondary, tertiary and icon-only actions.',
  },
  {
    slug: 'card',
    name: 'Card',
    summary:
      'Content and feature card with circular icon badge, serif title and item list.',
  },
  {
    slug: 'highlights',
    name: 'Highlights',
    summary:
      'Feature highlight section with title, description, call to action and framed visual media.',
    fullWidth: true,
  },
  {
    slug: 'productcard',
    name: 'ProductCard',
    summary:
      'Product card with image, category badge, title, price and action.',
  },
  {
    slug: 'storybanner',
    name: 'StoryBanner',
    summary:
      'Split banner with event list, agenda badge and artisan event image.',
  },
  {
    slug: 'titlesection',
    name: 'TitleSection',
    summary:
      'Section header with uppercase eyebrow, display title, descriptive body and action slot.',
  },
];

export const showcaseGroups: {
  label: ShowcaseGroup;
  entries: ShowcaseEntry[];
}[] = (['Foundations', 'Components'] as const).map(label => ({
  label,
  entries: showcaseList.filter(
    entry => (entry.group ?? 'Components') === label,
  ),
}));

export const findShowcaseEntry = (slug: string) =>
  showcaseList.find(entry => entry.slug === slug);
