import {
  defaultLabelMock,
  primaryLabelMock,
  secondaryLabelMock,
} from '@tests/__mocks__/components/label';
import { cleanup, render, screen, within } from '@tests/test-utils';
import { afterEach, describe, expect, it } from 'vitest';

import Label from '../Label';

describe('<Home />', () => {
  afterEach(cleanup);

  it('should render default label properly', () => {
    render(<Label {...defaultLabelMock} />);

    const label = screen.getByTestId('label-component');

    expect(label).toBeInTheDocument();
    expect(within(label).getByText(defaultLabelMock.text)).toBeInTheDocument();
  });

  it('should render primary label properly', () => {
    render(<Label {...primaryLabelMock} />);

    const label = screen.getByTestId('label-component');

    expect(label).toBeInTheDocument();
    expect(within(label).getByText(primaryLabelMock.text)).toBeInTheDocument();
  });

  it('should render secondary label properly', () => {
    render(<Label {...secondaryLabelMock} />);

    const label = screen.getByTestId('label-component');

    expect(label).toBeInTheDocument();
    expect(
      within(label).getByText(secondaryLabelMock.text),
    ).toBeInTheDocument();
  });
});
