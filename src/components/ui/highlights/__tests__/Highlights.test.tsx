import {
  catarinaHighlightMock,
  toyStoryHighlightMock,
} from '@tests/__mocks__/components/highlights';
import { cleanup, fireEvent, render, screen } from '@tests/test-utils';
import { ButtonSize, ButtonVariant } from '@typing/components/button';
import { afterEach, describe, expect, it, vi } from 'vitest';

import Highlights from '../Highlights';

describe('Highlights Component', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders title, description and image correctly', () => {
    render(<Highlights {...toyStoryHighlightMock} />);

    expect(screen.getByTestId('highlights-component')).toBeInTheDocument();
    expect(
      screen.getByText(toyStoryHighlightMock.title as string),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Bem-vindos à Fios da Ria. Eu sou a Catarina, e crio figuras amigurumi detalhadas e feitas à mão. Macias, fofinhas e cheias de personalidade.',
      ),
    ).toBeInTheDocument();

    const image = screen.getByTestId('highlights-image');
    expect(image).toHaveAttribute('src', toyStoryHighlightMock.imageSrc);
    expect(image).toHaveAttribute('alt', toyStoryHighlightMock.imageAlt);
  });

  it('parses <highlight> tag in title string', () => {
    render(
      <Highlights
        {...toyStoryHighlightMock}
        title="Histórias feitas de fio, <highlight>ponto a ponto.</highlight>"
      />,
    );

    const titleElement = screen.getByRole('heading');
    expect(titleElement).toHaveTextContent(
      'Histórias feitas de fio, ponto a ponto.',
    );
    const highlightedChunk = titleElement.querySelector(
      '.highlights-highlight',
    );
    expect(highlightedChunk).toBeInTheDocument();
    expect(highlightedChunk).toHaveTextContent('ponto a ponto.');
  });

  it('renders ReactNode title directly (e.g., from t.rich translation)', () => {
    render(
      <Highlights
        {...toyStoryHighlightMock}
        title={
          <>
            Histórias feitas de fio,{' '}
            <span className="text-accent" data-testid="custom-rich-title">
              ponto a ponto.
            </span>
          </>
        }
      />,
    );

    expect(screen.getByTestId('custom-rich-title')).toHaveTextContent(
      'ponto a ponto.',
    );
  });

  it('renders button and handles click event', () => {
    const handleClick = vi.fn();
    render(
      <Highlights
        {...catarinaHighlightMock}
        button={{
          ...catarinaHighlightMock.button!,
          onClick: handleClick,
        }}
      />,
    );

    const button = screen.getByTestId('button-component');
    expect(button).toHaveTextContent('Explorar o meu trabalho');

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders button with custom variant, size and icons', () => {
    render(
      <Highlights
        title="Custom Highlight"
        description="Custom description"
        imageSrc="/test.jpg"
        button={{
          children: 'Custom Action',
          variant: ButtonVariant.Secondary,
          size: ButtonSize.Large,
          leftIcon: <span data-testid="test-left-icon">IconL</span>,
          rightIcon: <span data-testid="test-right-icon">IconR</span>,
        }}
      />,
    );

    const button = screen.getByTestId('button-component');
    expect(button).toHaveClass('btn-secondary');
    expect(button).toHaveClass('btn-lg');
    expect(screen.getByTestId('test-left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('test-right-icon')).toBeInTheDocument();
  });

  it('does not render actions wrapper when button is omitted', () => {
    render(
      <Highlights
        title="No Button"
        description="Description without actions"
        imageSrc="/test.jpg"
      />,
    );

    expect(screen.queryByTestId('highlights-actions')).not.toBeInTheDocument();
  });

  it('renders badge when provided', () => {
    render(
      <Highlights {...toyStoryHighlightMock} badge="Feito à mão em Portugal" />,
    );

    const badge = screen.getByTestId('highlights-badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('Feito à mão em Portugal');
  });

  it('does not render badge when badge prop is omitted', () => {
    render(<Highlights {...catarinaHighlightMock} />);

    expect(screen.queryByTestId('highlights-badge')).not.toBeInTheDocument();
  });

  it('applies image-left class when imagePosition is left', () => {
    render(<Highlights {...toyStoryHighlightMock} imagePosition="left" />);

    const section = screen.getByTestId('highlights-component');
    expect(section).toHaveClass('image-left');
  });

  it('merges custom className and spreads HTML attributes', () => {
    render(
      <Highlights
        {...toyStoryHighlightMock}
        className="custom-highlight-class"
        aria-label="Hero highlight section"
      />,
    );

    const section = screen.getByTestId('highlights-component');
    expect(section).toHaveClass('custom-highlight-class');
    expect(section).toHaveAttribute('aria-label', 'Hero highlight section');
  });

  it('renders secondaryButton and handles click', () => {
    const handleSec = vi.fn();
    render(
      <Highlights
        {...toyStoryHighlightMock}
        button={{ children: 'Primary' }}
        secondaryButton={{ children: 'Secondary', onClick: handleSec }}
      />,
    );

    expect(screen.getByText('Primary')).toBeInTheDocument();
    const secBtn = screen.getByText('Secondary');
    expect(secBtn).toBeInTheDocument();
    fireEvent.click(secBtn);
    expect(handleSec).toHaveBeenCalledTimes(1);
  });

  it('renders note with and without icon', () => {
    const { rerender } = render(
      <Highlights
        {...toyStoryHighlightMock}
        note={{
          text: 'Peças únicas, feitas com carinho',
          icon: <span data-testid="heart-icon">♥</span>,
        }}
      />,
    );

    const note = screen.getByTestId('highlights-note');
    expect(note).toBeInTheDocument();
    expect(screen.getByTestId('heart-icon')).toBeInTheDocument();
    expect(
      screen.getByText('Peças únicas, feitas com carinho'),
    ).toBeInTheDocument();

    rerender(
      <Highlights
        {...toyStoryHighlightMock}
        note={{
          text: 'Note without icon',
        }}
      />,
    );
    expect(screen.getByText('Note without icon')).toBeInTheDocument();
  });
});
