'use client';

import { useEffect, useState } from 'react';
import type {
  StoryBannerEvent,
  StoryBannerType,
} from '@typing/components/storybanner';

import StoryBanner from './StoryBanner';

export default function HomeMarketAgenda({
  locale,
  events,
  ...props
}: StoryBannerType & { locale: string }) {
  const [liveEvents, setLiveEvents] = useState<StoryBannerEvent[] | null>(null);

  useEffect(() => {
    let active = true;

    import('@lib/sanity/marketAgenda')
      .then(({ fetchMarketAgenda }) => fetchMarketAgenda(locale))
      .then(agenda => {
        if (active) setLiveEvents(agenda);
      })
      .catch(error => console.warn('Failed to refresh market agenda:', error));

    return () => {
      active = false;
    };
  }, [locale]);

  return <StoryBanner {...props} events={liveEvents ?? events} />;
}
