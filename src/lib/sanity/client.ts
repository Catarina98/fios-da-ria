import { createClient } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
};

export const isSanityConfigured = (): boolean => {
  return Boolean(
    sanityConfig.projectId && sanityConfig.projectId.trim().length > 0,
  );
};

export const sanityClient = isSanityConfigured()
  ? createClient(sanityConfig)
  : null;

const imageBuilder = isSanityConfigured()
  ? createImageUrlBuilder(sanityConfig)
  : null;

export const urlFor = (source: any) => {
  if (!imageBuilder || !source) return '';

  return imageBuilder.image(source).auto('format').fit('max').url();
};
