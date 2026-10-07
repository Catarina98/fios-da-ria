import { storyBannerMock } from '@tests/__mocks__/components/storybanner';
import { cleanup, render, screen } from '@tests/test-utils';
import { afterEach, describe, expect, it } from 'vitest';

import StoryBanner from '../StoryBanner';

describe('StoryBanner Component', () => {
  afterEach(cleanup);
  it('renders all main elements correctly', () => {
    render(<StoryBanner {...storyBannerMock} />);

    expect(screen.getByTestId('story-banner-component')).toBeInTheDocument();
    expect(screen.getByTestId('story-banner-image')).toHaveAttribute(
      'src',
      storyBannerMock.imageSrc,
    );
    expect(screen.getByTestId('story-banner-image')).toHaveAttribute(
      'alt',
      storyBannerMock.imageAlt,
    );
    expect(screen.getByTestId('story-banner-badge')).toHaveTextContent(
      'Agenda',
    );
    expect(screen.getByTestId('story-banner-title')).toHaveTextContent(
      'Próximos eventos',
    );
    expect(screen.getByTestId('story-banner-event-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('event-item')).toHaveLength(1);
    expect(
      screen.getByText('Mercadinho dos Artesãos e Produtores de Olhão'),
    ).toBeInTheDocument();
  });

  it('handles fallback imageAlt when not provided', () => {
    render(
      <StoryBanner
        title="Agenda de Feiras"
        imageSrc="/images/mercadinho.jpg"
      />,
    );

    expect(screen.getByTestId('story-banner-image')).toHaveAttribute(
      'alt',
      'Agenda de Feiras',
    );
  });

  it('handles fallback imageAlt when title is not a string and alt is omitted', () => {
    render(
      <StoryBanner
        title={(<span>Título Complexo</span>) as unknown as string}
        imageSrc="/images/mercadinho.jpg"
      />,
    );

    expect(screen.getByTestId('story-banner-image')).toHaveAttribute('alt', '');
  });

  it('renders without badge, events, and with custom className', () => {
    render(
      <StoryBanner
        badge=""
        title="Sem eventos"
        imageSrc="/images/mercadinho.jpg"
        className="custom-story-class"
      />,
    );

    expect(screen.queryByTestId('story-banner-badge')).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('story-banner-event-list'),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('story-banner-component')).toHaveClass(
      'custom-story-class',
    );
  });
});
