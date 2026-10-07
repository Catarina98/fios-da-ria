import {
  titleSectionCenterMock,
  titleSectionWithActionMock,
} from '@tests/__mocks__/components/titlesection';
import { render, screen } from '@tests/test-utils';
import { describe, expect, it } from 'vitest';

import TitleSection from '../TitleSection';

describe('TitleSection Component', () => {
  it('renders eyebrow, title and description centered', () => {
    render(<TitleSection {...titleSectionCenterMock} />);

    expect(screen.getByTestId('titlesection-component')).toHaveClass(
      'titlesection-center',
    );
    expect(screen.getByTestId('titlesection-eyebrow')).toHaveTextContent(
      'O que nos guia',
    );
    expect(screen.getByTestId('titlesection-title')).toHaveTextContent(
      'Carinho em cada detalhe',
    );
    expect(screen.getByTestId('titlesection-description')).toHaveTextContent(
      'Escolhas conscientes para peças bonitas, seguras e cheias de personalidade.',
    );
  });

  it('renders left-aligned with action button', () => {
    render(
      <TitleSection
        {...titleSectionWithActionMock}
        action={<button data-testid="action-btn">Ver tudo</button>}
      />,
    );

    expect(screen.getByTestId('titlesection-component')).toHaveClass(
      'titlesection-left',
    );
    expect(screen.getByTestId('action-btn')).toBeInTheDocument();
    expect(screen.getByTestId('titlesection-action')).toBeInTheDocument();
  });

  it('renders without eyebrow, description, or action when not provided', () => {
    render(<TitleSection title="Just Title" />);

    expect(screen.getByTestId('titlesection-title')).toHaveTextContent(
      'Just Title',
    );
    expect(
      screen.queryByTestId('titlesection-eyebrow'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('titlesection-description'),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('titlesection-action')).not.toBeInTheDocument();
  });
});
