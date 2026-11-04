import { HTMLAttributes } from 'react';

export type StoryBannerEvent = {
  id?: string;
  title: string;
  location: string;
  frequency: string;
  schedule: string;
  absences?: string[];
};

export type StoryBannerType = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  badge?: string;
  title: string;
  imageSrc: string;
  imageAlt?: string;
  events?: StoryBannerEvent[];
  absencesLabel?: string;
  emptyMessage?: string;
};
