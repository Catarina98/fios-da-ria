export interface RangeSliderType {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  label?: string;
  minLabel?: string;
  maxLabel?: string;
  currencySymbol?: string;
  className?: string;
}
