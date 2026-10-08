import { woodyProductMock } from '@tests/__mocks__/components/productcard';
import { fireEvent, render, screen } from '@tests/test-utils';
import { describe, expect, it, vi } from 'vitest';

import ProductCard from '../ProductCard';

describe('ProductCard Component', () => {
  it('renders product information, badge, price and handles click', () => {
    const handleClick = vi.fn();
    render(<ProductCard {...woodyProductMock} onClick={handleClick} />);

    expect(screen.getByTestId('product-card-component')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-title')).toHaveTextContent('Woody');
    expect(screen.getByTestId('product-card-category')).toHaveTextContent(
      'Toy Story',
    );
    expect(screen.getByTestId('product-card-price')).toHaveTextContent('€48');
    expect(screen.getByTestId('product-card-description')).toHaveTextContent(
      woodyProductMock.description,
    );

    const actionContainer = screen.getByTestId('product-card-action');
    expect(actionContainer).toHaveTextContent('View details');
    const actionBtn = actionContainer.querySelector('button')!;
    fireEvent.click(actionBtn);
    expect(handleClick).toHaveBeenCalledTimes(1);

    const imgBtn = screen.getByTestId('product-card-image-button');
    fireEvent.click(imgBtn);
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('renders custom action text', () => {
    render(<ProductCard {...woodyProductMock} actionText="Comprar" />);

    expect(screen.getByTestId('product-card-action')).toHaveTextContent(
      'Comprar',
    );
  });

  it('renders variant count and stock labels when provided', () => {
    render(<ProductCard {...woodyProductMock} variantCount={3} stock={4} />);

    expect(screen.getByTestId('product-card-variant-count')).toHaveTextContent(
      '3 variants',
    );
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
});
