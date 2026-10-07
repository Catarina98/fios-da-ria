import { HTMLAttributes } from 'react';

export type StoryBannerEvent = {
  title: string;
  location: string;
  frequency: string;
  schedule: string;
};

export type StoryBannerType = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  badge?: string;
  title: string;
  imageSrc: string;
  imageAlt?: string;
  events?: StoryBannerEvent[];
};
