import { FC } from 'react';
import { Body, Caption, Heading } from '@components/ui/typography';
import type { TitleSectionType } from '@typing/components/titlesection';
import { cn } from '@utils/cn';

import './TitleSection.scss';

const TitleSection: FC<TitleSectionType> = ({
  eyebrow,
  title,
  description,
  action,
  align = 'center',
  className,
  ...props
}) => {
  return (
    <div
      data-testid="titlesection-component"
      className={cn('titlesection', `titlesection-${align}`, className)}
      {...props}
    >
      <div className={cn('titlesection-header', action && 'has-action')}>
        <div className="titlesection-content">
          {eyebrow && (
            <Caption
              className="titlesection-eyebrow"
              data-testid="titlesection-eyebrow"
            >
              {eyebrow}
            </Caption>
          )}
          <Heading
            as="h2"
            size="XL"
            className="titlesection-title"
            data-testid="titlesection-title"
          >
            {title}
          </Heading>
          {description && (
            <Body
              size="S"
              className="titlesection-description"
              data-testid="titlesection-description"
            >
              {description}
            </Body>
          )}
        </div>
        {action && (
          <div
            className="titlesection-action"
            data-testid="titlesection-action"
          >
            {action}
          </div>
        )}
      </div>
    </div>
  );
};

export default TitleSection;
