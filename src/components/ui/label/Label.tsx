import { FC } from 'react';
import { type LabelType, LabelVariant } from '@typing/components/label';

import './Label.scss';

const Label: FC<LabelType> = ({ text, variant = LabelVariant.Primary }) => {
  return (
    <div
      data-testid="label-component"
      className={`label-container ${variant === LabelVariant.Secondary ? 'secondary-style' : ''}`}
    >
      {text}
    </div>
  );
};

export default Label;
