import { FC } from 'react';
import {
  TitleSectionAlign,
  TitleSectionColor,
  TitleSectionSize,
  type TitleSectionType,
} from '@typing/components/titlesection';
import clsx from 'clsx';

import './TitleSection.scss';

const TitleSection: FC<TitleSectionType> = ({
  title,
  subtitle,
  align = TitleSectionAlign.Left,
  titleSize = TitleSectionSize.Medium,
  titleColor = TitleSectionColor.Primary,
}) => {
  return (
    <div
      data-testid="title-section-component"
      className={clsx('title-section-container', `align-${align}`)}
    >
      {title && (
        <h2
          data-testid="title-section-title"
          className={clsx(
            'title-section-title',
            `size-${titleSize}`,
            `color-${titleColor}`,
          )}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p
          data-testid="title-section-subtitle"
          className="title-section-subtitle"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default TitleSection;
