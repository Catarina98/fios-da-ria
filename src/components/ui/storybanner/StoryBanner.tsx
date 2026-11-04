import { FC } from 'react';
import Badge from '@components/ui/badge';
import { Body, Heading } from '@components/ui/typography';
import { BadgeVariant } from '@typing/components/badge';
import type { StoryBannerType } from '@typing/components/storybanner';
import { cn } from '@utils/cn';
import { getResponsiveImage } from '@utils/getResponsiveImage';

import './StoryBanner.scss';

const StoryBanner: FC<StoryBannerType> = ({
  badge = 'Agenda',
  title,
  imageSrc,
  imageAlt = '',
  events,
  absencesLabel,
  emptyMessage,
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
          {...getResponsiveImage(imageSrc, {
            widths: [320, 480, 640, 800, 1024, 1440],
            sizes:
              '(min-width: 1400px) 680px, (min-width: 1024px) 50vw, calc(100vw - 32px)',
          })}
          alt={imageAlt || (typeof title === 'string' ? title : '')}
          data-testid="story-banner-image"
          loading="lazy"
          decoding="async"
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
              <div
                key={evt.id ?? idx}
                className="event-item"
                data-testid="event-item"
              >
                <div className="event-main">
                  <Heading as="h3" size="S" className="event-title">
                    {evt.title}
                  </Heading>
                  <Body size="S" className="event-location">
                    {evt.location}
                  </Body>
                  <Body size="S" className="event-meta">
                    <span>{evt.frequency}</span>
                    <span className="event-schedule">{evt.schedule}</span>
                  </Body>
                </div>
                {evt.absences && evt.absences.length > 0 && (
                  <div className="event-absences">
                    <strong>{absencesLabel}</strong>
                    <ul>
                      {evt.absences.map(date => (
                        <li key={date}>{date}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {events?.length === 0 && emptyMessage && (
          <Body size="S">{emptyMessage}</Body>
        )}
      </div>
    </section>
  );
};

export default StoryBanner;
