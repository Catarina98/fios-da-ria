import { cleanup, fireEvent, render, screen } from '@tests/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import RangeSlider from '../RangeSlider';

describe('<RangeSlider />', () => {
  afterEach(cleanup);

  it('renders slider heading, values and labels', () => {
    render(
      <RangeSlider
        min={0}
        max={100}
        minValue={20}
        maxValue={80}
        onMinChange={vi.fn()}
        onMaxChange={vi.fn()}
      />,
    );

    expect(screen.getByTestId('range-slider-component')).toBeInTheDocument();
    expect(screen.getByTestId('range-slider-value')).toHaveTextContent(
      '€20 – €80',
    );
    expect(screen.getByLabelText('Minimum')).toBeInTheDocument();
    expect(screen.getByLabelText('Maximum')).toBeInTheDocument();
  });

  it('triggers onMinChange and onMaxChange when inputs change', () => {
    const handleMinChange = vi.fn();
    const handleMaxChange = vi.fn();

    render(
      <RangeSlider
        min={0}
        max={100}
        minValue={20}
        maxValue={80}
        onMinChange={handleMinChange}
        onMaxChange={handleMaxChange}
      />,
    );

    const minInput = screen.getByTestId('range-slider-min');
    const maxInput = screen.getByTestId('range-slider-max');

    fireEvent.change(minInput, { target: { value: '30' } });
    expect(handleMinChange).toHaveBeenCalledWith(30);

    fireEvent.change(maxInput, { target: { value: '70' } });
    expect(handleMaxChange).toHaveBeenCalledWith(70);
  });
});
