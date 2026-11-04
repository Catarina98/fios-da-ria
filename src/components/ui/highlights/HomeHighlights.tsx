'use client';

import { useEffect, useState } from 'react';
import type { HighlightItem } from '@typing/components/highlights';

import HighlightsCarousel from './HighlightsCarousel';

export default function HomeHighlights({
  initialItems,
  locale,
}: {
  initialItems: HighlightItem[];
  locale: string;
}) {
  const [liveItems, setLiveItems] = useState<HighlightItem[] | null>(null);

  useEffect(() => {
    let active = true;

    import('@lib/sanity/highlights')
      .then(({ fetchHighlights }) => fetchHighlights(locale))
      .then(items => {
        if (active && items) {
          setLiveItems(items);
        }
      })
      .catch(error => {
        console.warn('Failed to refresh homepage highlights:', error);
      });

    return () => {
      active = false;
    };
  }, [locale]);

  return (
    <HighlightsCarousel items={liveItems ?? initialItems} primaryHeading />
  );
}
