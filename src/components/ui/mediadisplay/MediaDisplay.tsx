'use client';

import { FC, useState } from 'react';
import { MediaDisplayType } from '@typing/components/mediadisplay';

import MediaDisplaySlider from './components/MediaDisplaySlider';

const MediaDisplay: FC<MediaDisplayType> = ({ images, activeIndex = 0 }) => {
  const [localActiveIndex, setLocalActiveIndex] = useState(activeIndex);

  return (
    <>
      <MediaDisplaySlider
        key="slider1"
        images={images}
        activeIndex={localActiveIndex}
        onIndexChange={i => setLocalActiveIndex(i)}
      />
      {/* <MediaDisplaySlider key="slider2" images={images} activeIndex={localActiveIndex} onIndexChange={(i) => setLocalActiveIndex(i)} /> */}
    </>
  );
};

export default MediaDisplay;
