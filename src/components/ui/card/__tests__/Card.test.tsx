import {
  careCardMock,
  materialsCardMock,
} from '@tests/__mocks__/components/card';
import { render, screen } from '@tests/test-utils';
import { describe, expect, it } from 'vitest';

import Card from '../Card';

describe('Card Component', () => {
  it('renders card title, icon and list items', () => {
    render(
      <Card
        {...materialsCardMock}
        icon={<span data-testid="flower-icon">✿</span>}
      />,
    );

    expect(screen.getByTestId('card-component')).toBeInTheDocument();
    expect(screen.getByTestId('card-title')).toHaveTextContent(
      'Materiais naturais',
    );
    expect(screen.getByTestId('card-icon')).toHaveClass('card-icon-primary');
    expect(screen.getByTestId('flower-icon')).toBeInTheDocument();

    const list = screen.getByTestId('card-list');
    expect(list).toBeInTheDocument();
    expect(screen.getByText('Fio 100% algodão')).toBeInTheDocument();
    expect(
      screen.getByText('Olhos com travas de segurança'),
    ).toBeInTheDocument();
    expect(screen.getByText('Enchimento antialérgico')).toBeInTheDocument();
  });

  it('renders card with secondary icon and description', () => {
    render(
      <Card
        {...careCardMock}
        icon={<span data-testid="shield-icon">🛡</span>}
        description="Additional care instructions"
      />,
    );

    expect(screen.getByTestId('card-icon')).toHaveClass('card-icon-secondary');
    expect(screen.getByTestId('shield-icon')).toBeInTheDocument();
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
    expect(
      screen.getByText('Additional care instructions'),
    ).toBeInTheDocument();
  });

  it('renders without icon, items, or description', () => {
    render(<Card title="Simple Card" />);

    expect(screen.getByTestId('card-title')).toHaveTextContent('Simple Card');
    expect(screen.queryByTestId('card-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('card-list')).not.toBeInTheDocument();
    expect(screen.queryByTestId('card-content')).not.toBeInTheDocument();
  });

  it('renders without title', () => {
    render(<Card description="Card without title" />);

    expect(screen.queryByTestId('card-title')).not.toBeInTheDocument();
    expect(screen.getByText('Card without title')).toBeInTheDocument();
  });
});
