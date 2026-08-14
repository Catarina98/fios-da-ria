import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { ButtonSize, ButtonVariant } from '@typing/components/button';
import { afterEach, describe, expect, it, vi } from 'vitest';

import Button from '../Button';

describe('Button Component', () => {
  afterEach(cleanup);

  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByTestId('button-component');
    expect(button.querySelector('.btn-content')).not.toBeEmptyDOMElement();
    expect(button).toBeInTheDocument();
  });

  it('handles click event', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByTestId('button-component');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables the button when disabled prop is true', () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Click me
      </Button>,
    );

    const button = screen.getByTestId('button-component');
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('disables the button and shows spinner when isLoading is true', () => {
    render(<Button isLoading>Click me</Button>);

    const button = screen.getByTestId('button-component');
    expect(button).toBeDisabled();
    expect(button.querySelector('.btn-spinner')).toBeInTheDocument();
  });

  it('renders default variant and size classes', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByTestId('button-component');
    expect(button).toHaveClass('btn');
    expect(button).toHaveClass('btn-primary');
    expect(button).toHaveClass('btn-md');
  });

  it('applies correct CSS classes for custom variants and sizes', () => {
    render(
      <Button variant={ButtonVariant.Ghost} size={ButtonSize.Large}>
        Click me
      </Button>,
    );
    const button = screen.getByTestId('button-component');
    expect(button).toHaveClass('btn');
    expect(button).toHaveClass('btn-ghost');
    expect(button).toHaveClass('btn-lg');
  });

  it('renders left and right icons correctly', () => {
    render(
      <Button leftIcon="Left" rightIcon="Right">
        Click me
      </Button>,
    );
    const button = screen.getByTestId('button-component');
    expect(button.querySelector('.btn-icon-left')).toBeInTheDocument();
    expect(button.querySelector('.btn-icon-right')).toBeInTheDocument();
  });

  it('hides icons when isLoading is true', () => {
    render(
      <Button leftIcon="Left" rightIcon="Right" isLoading>
        Click me
      </Button>,
    );
    const button = screen.getByTestId('button-component');
    expect(button.querySelector('.btn-icon-left')).not.toBeInTheDocument();
    expect(button.querySelector('.btn-icon-right')).not.toBeInTheDocument();
  });

  it('does not trigger onClick when isLoading is true', () => {
    const handleClick = vi.fn();
    render(
      <Button isLoading onClick={handleClick}>
        Click me
      </Button>,
    );

    const button = screen.getByTestId('button-component');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
