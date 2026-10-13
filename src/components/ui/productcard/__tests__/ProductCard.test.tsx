import { woodyProductMock } from '@tests/__mocks__/components/productcard';
import { render, screen } from '@tests/test-utils';
import { describe, expect, it } from 'vitest';

import ProductCard from '../ProductCard';

describe('ProductCard Component', () => {
  it('renders product information, badge, price and links to url', () => {
    render(<ProductCard {...woodyProductMock} />);

    expect(screen.getByTestId('product-card-component')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-title')).toHaveTextContent('Woody');
    expect(screen.getByTestId('product-card-category')).toHaveTextContent(
      'Toy Story',
    );
    expect(screen.getByTestId('product-card-price')).toHaveTextContent('€48');

    const actionContainer = screen.getByTestId('product-card-action');
    expect(actionContainer).toHaveTextContent('View details');
    const actionLink = actionContainer.querySelector('a')!;
    expect(actionLink).toHaveAttribute('href', woodyProductMock.url);

    const imgLink = screen.getByTestId('product-card-image-button');
    expect(imgLink).toHaveAttribute('href', woodyProductMock.url);
  });

  it('renders custom action text', () => {
    render(<ProductCard {...woodyProductMock} actionText="Comprar" />);

    expect(screen.getByTestId('product-card-action')).toHaveTextContent(
      'Comprar',
    );
  });

  it('renders stock label when provided', () => {
    render(<ProductCard {...woodyProductMock} stock={4} />);

    expect(screen.getByTestId('product-card-stock')).toHaveTextContent(
      '4 in stock',
    );
  });

  it('renders sold out label when stock is 0', () => {
    render(<ProductCard {...woodyProductMock} stock={0} />);

    const stockEl = screen.getByTestId('product-card-stock');
    expect(stockEl).toHaveTextContent('Sold out');
    expect(stockEl).toHaveClass('product-card-stock-sold-out');
  });

  it('applies custom tag colors when provided', () => {
    render(
      <ProductCard
        {...woodyProductMock}
        categoryTagBg="#00ff00"
        categoryTagColor="#ff0000"
      />,
    );

    const badge = screen.getByTestId('product-card-category');
    expect(badge).toHaveStyle({
      backgroundColor: '#00ff00',
      color: '#ff0000',
    });
  });

  it('does not set inline styles when tag colors are not provided', () => {
    render(<ProductCard {...woodyProductMock} />);

    const badge = screen.getByTestId('product-card-category');
    expect(badge.style.backgroundColor).toBe('');
    expect(badge.style.color).toBe('');
  });
});
