'use client';

import { FC, useState } from 'react';
import { MediaDisplayType } from '@typing/components/mediadisplay';

import MediaDisplaySlider from './components/MediaDisplaySlider';

import './MediaDisplay.scss';
import { useViewport } from '../../../hooks/useViewport';

const MediaDisplay: FC<MediaDisplayType> = ({ images, activeIndex = 0 }) => {
  const [localActiveIndex, setLocalActiveIndex] = useState(activeIndex);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const { isDesktop } = useViewport();

  return (
    <div>
      <MediaDisplaySlider
        key="slider1"
        images={images}
        activeIndex={localActiveIndex}
        showFullScreen={showFullScreen}
        onIndexChange={setLocalActiveIndex}
        onToggleFullScreen={setShowFullScreen}
      />

      {isDesktop && (
        <div className="bottom-images-container">
          {images.slice(1, 3).map((imgUrl, index) => {
            const actualIndex = index + 1;
            
return (
              <div
                key={`bottom-image-${actualIndex}`}
                className={`bottom-image ${actualIndex === localActiveIndex ? 'active' : ''}`}
                onClick={() => setLocalActiveIndex(actualIndex)}
              >
                <img src={imgUrl} alt={`Bottom image ${actualIndex}`} />
              </div>
            );
          })}
          {images.length > 3 ? (
            <button
              type="button"
              className="bottom-image more"
              onClick={() => setShowFullScreen(true)}
            >
              <img src={images[3]} alt="More images" />
              <span>+{images.length - 3}</span>
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default MediaDisplay;
