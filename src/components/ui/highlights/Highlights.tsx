import { FC } from 'react';
import Button from '@components/ui/button/Button';
import { BadgeVariant } from '@typing/components/badge';
import {
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from '@typing/components/button';
import type { HighlightsType } from '@typing/components/highlights';
import { cn } from '@utils/cn';
import { getAssetPath } from '@utils/getAssetPath';
import { highlightText } from '@utils/highlightText';

import './Highlights.scss';
import Badge from '../badge';
import { Body, Display } from '../typography';

const Highlights: FC<HighlightsType> = ({
  badge,
  title,
  description,
  button,
  secondaryButton,
  imageSrc,
  imageAlt = '',
  note,
  imagePosition = 'right',
  isFullHeight,
  breadcrumbs,
  className,
  ...props
}) => {
  const hasFullHeight = Boolean(isFullHeight);

  const renderBtn = (btn: ButtonType, key?: string | number) => {
    const {
      variant,
      size,
      leftIcon,
      rightIcon,
      disabled,
      onClick,
      url,
      children,
      className: btnClassName,
      ...rest
    } = btn;

    return (
      <Button
        key={key}
        className={cn(
          'highlights-btn',
          variant === ButtonVariant.Ghost && 'highlights-btn-ghost',
          btnClassName,
        )}
        variant={variant ?? ButtonVariant.Primary}
        size={size ?? ButtonSize.Medium}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        disabled={disabled}
        onClick={onClick}
        url={url}
        {...rest}
      >
        {children}
      </Button>
    );
  };

  return (
    <section
      data-testid="highlights-component"
      className={cn(
        'highlights-section',
        imagePosition === 'left' && 'image-left',
        hasFullHeight && 'highlights-full-height',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'highlights-container container',
          breadcrumbs && 'has-breadcrumbs',
        )}
      >
        {breadcrumbs && (
          <div
            className="highlights-breadcrumbs"
            data-testid="highlights-breadcrumbs"
          >
            {breadcrumbs}
          </div>
        )}
        <div className="highlights-content" data-testid="highlights-content">
          {badge && (
            <div
              className="highlights-badge-wrapper"
              data-testid="highlights-badge"
            >
              <Badge variant={BadgeVariant.Primary}>{badge}</Badge>
            </div>
          )}

          <Display size="M" className="highlights-title">
            {highlightText(title)}
          </Display>

          <Body size="M" className="highlights-description">
            {description}
          </Body>

          {button && (
            <div
              className="highlights-actions"
              data-testid="highlights-actions"
            >
              {renderBtn(button, 'primary-btn')}
              {secondaryButton && renderBtn(secondaryButton, 'secondary-btn')}
            </div>
          )}
        </div>

        <div
          className="highlights-media-container"
          data-testid="highlights-media"
        >
          <div className="highlights-visual-card">
            <img
              src={getAssetPath(imageSrc)}
              alt={imageAlt}
              className="highlights-image"
              data-testid="highlights-image"
            />

            {note && (
              <Badge
                variant={BadgeVariant.Neutral}
                icon={note.icon}
                className="highlights-note"
                data-testid="highlights-note"
              >
                {note.text}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
