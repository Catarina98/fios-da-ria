import { FC } from 'react';
import type { RangeSliderType } from '@typing/components/rangeslider';
import { cn } from '@utils/cn';

import './RangeSlider.scss';

const RangeSlider: FC<RangeSliderType> = ({
  min,
  max,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  label = 'Price',
  minLabel = 'Minimum',
  maxLabel = 'Maximum',
  currencySymbol = '€',
  className,
}) => {
  return (
    <div
      className={cn('range-slider', className)}
      data-testid="range-slider-component"
    >
      <div className="range-slider-heading">
        <span>{label}</span>
        <strong data-testid="range-slider-value">
          {currencySymbol}
          {minValue} – {currencySymbol}
          {maxValue}
        </strong>
      </div>
      <div className="range-slider-inputs">
        <input
          aria-label={minLabel}
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={event => onMinChange(Number(event.target.value))}
          data-testid="range-slider-min"
        />
        <input
          aria-label={maxLabel}
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={event => onMaxChange(Number(event.target.value))}
          data-testid="range-slider-max"
        />
      </div>
      <div className="range-slider-labels">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
