'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { MediaDisplayType } from '@typing/components/mediadisplay';

import './MediaDisplay.scss';

const MediaDisplay: FC<MediaDisplayType> = ({ images, activeIndex = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [localActiveIndex, setLocalActiveIndex] = useState(activeIndex);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const width = container.clientWidth;
      container.scrollTo({
        left: activeIndex * width,
        behavior: 'smooth',
      });
      setLocalActiveIndex(activeIndex);
    }
  }, [activeIndex]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const scrollLeft = container.scrollLeft;
    const clientWidth = container.clientWidth;
    const newIndex = Math.round(scrollLeft / clientWidth);

    if (
      newIndex !== localActiveIndex &&
      newIndex >= 0 &&
      newIndex < images.length
    ) {
      setLocalActiveIndex(newIndex);
    }
  };

  return (
    <>
      <div className="media-display-container">
        <div
          data-testid="media-display-component"
          className="slider-container"
          ref={containerRef}
          onScroll={handleScroll}
        >
          {images.map((imgUrl, index) => (
            <div key={index} className="slide">
              <img src={imgUrl} alt={`Gallery slide ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className="dot-container">
          {images.map((_, index) => (
            <div
              key={`dot-${index}`}
              className={`dot ${index === localActiveIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MediaDisplay;
