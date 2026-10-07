import { FC } from 'react';
import Badge from '@components/ui/badge';
import { Body, Caption, Heading } from '@components/ui/typography';
import { BadgeVariant } from '@typing/components/badge';
import type { StoryBannerType } from '@typing/components/storybanner';
import { cn } from '@utils/cn';
import { getAssetPath } from '@utils/getAssetPath';

import './StoryBanner.scss';

const StoryBanner: FC<StoryBannerType> = ({
  badge = 'Agenda',
  title,
  imageSrc,
  imageAlt = '',
  events,
  className,
  ...props
}) => {
  return (
    <section
      data-testid="story-banner-component"
      className={cn('story-banner', className)}
      {...props}
    >
      <div className="story-image-wrapper">
        <img
          src={getAssetPath(imageSrc)}
          alt={imageAlt || (typeof title === 'string' ? title : '')}
          data-testid="story-banner-image"
        />
      </div>

      <div className="story-copy">
        {badge && (
          <Badge
            variant={BadgeVariant.Secondary}
            className="story-badge"
            data-testid="story-banner-badge"
          >
            {badge}
          </Badge>
        )}

        <Heading
          as="h2"
          size="XL"
          className="story-title"
          data-testid="story-banner-title"
        >
          {title}
        </Heading>

        {events && events.length > 0 && (
          <div className="event-list" data-testid="story-banner-event-list">
            {events.map((evt, idx) => (
              <div key={idx} className="event-item" data-testid="event-item">
                <div className="event-main">
                  <Heading as="h3" size="S" className="event-title">
                    {evt.title}
                  </Heading>
                  <Body size="S" className="event-location">
                    {evt.location}
                  </Body>
                </div>
                <div className="event-meta">
                  <Caption>{evt.frequency}</Caption>
                  <Caption>{evt.schedule}</Caption>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default StoryBanner;
