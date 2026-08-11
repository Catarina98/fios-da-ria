import { primaryButtonMock } from '@tests/__mocks__/components/button';
import { cleanup, fireEvent, render, screen } from '@tests/test-utils';
import { ButtonVariant } from '@typing/components/button';
import { useRouter } from 'next/navigation';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import Button from '../Button';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const mockPush = vi.fn();

describe('<Button />', () => {
  afterEach(cleanup);
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render properly', () => {
    render(<Button {...primaryButtonMock} />);

    const buttonElement = screen.getByText('Primary Button');

    expect(buttonElement).toHaveAttribute('aria-label', 'primary button');
    expect(buttonElement).toHaveAttribute('data-testid', 'primary-button');
  });

  it('should call router.push for regular URLs', () => {
    (useRouter as Mock).mockReturnValue({ push: mockPush });

    render(<Button {...primaryButtonMock} />);

    const button = screen.getByTestId('primary-button');

    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith('/about');
  });

  it('should not call router.push when url is undefined', () => {
    (useRouter as Mock).mockReturnValue({ push: mockPush });

    render(<Button {...primaryButtonMock} url={undefined} />);

    const button = screen.getByTestId('primary-button');

    fireEvent.click(button);

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should not call router.push when url is empty', () => {
    (useRouter as Mock).mockReturnValue({ push: mockPush });

    render(<Button {...primaryButtonMock} url="" />);

    const button = screen.getByTestId('primary-button');

    fireEvent.click(button);

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should fallback to primary when variant is custom', () => {
    render(
      <Button
        {...primaryButtonMock}
        variant={ButtonVariant.Custom}
      />
    );

    const button = screen.getByTestId('custom-button');

    expect(button).toBeInTheDocument();
  });
});
