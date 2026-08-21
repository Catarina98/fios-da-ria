import { accordionMock } from '@tests/__mocks__/components/accordion';
import { cleanup, fireEvent, render, screen } from '@tests/test-utils';
import { afterEach, describe, expect, it } from 'vitest';

import Accordion from '../Accordion';

describe('<Accordion />', () => {
  afterEach(cleanup);

  it('should render accordion with all items', () => {
    render(<Accordion {...accordionMock} />);

    accordionMock.items.forEach(item => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.content)).toBeInTheDocument();
    });
  });

  it('should have all items closed initially', () => {
    render(<Accordion {...accordionMock} />);

    accordionMock.items.forEach(item => {
      const content = screen.getByText(item.content);
      expect(content.parentElement).not.toHaveClass('is-open');
    });
  });

  it('should open item when clicked', () => {
    render(<Accordion {...accordionMock} />);

    const firstItemTitle = screen.getByText('Item 1');
    const firstItemContent = screen.getByText('Content 1');

    fireEvent.click(firstItemTitle);

    expect(firstItemContent).toHaveClass('accordion-content', 'is-open');
  });

  it('should close item when clicked again', () => {
    render(<Accordion {...accordionMock} />);

    const firstItemContent = screen.getByText('Content 1');

    fireEvent.click(firstItemContent);
    expect(firstItemContent).toHaveClass('is-open');

    fireEvent.click(firstItemContent);
    expect(firstItemContent).not.toHaveClass('is-open');
  });

  it('should close previous item when another item is opened', () => {
    render(<Accordion {...accordionMock} />);

    const firstItemContent = screen.getByText('Content 1');
    const secondItemContent = screen.getByText('Content 2');

    fireEvent.click(firstItemContent);
    expect(firstItemContent).toHaveClass('is-open');
    expect(secondItemContent).not.toHaveClass('is-open');

    fireEvent.click(secondItemContent);
    expect(firstItemContent).not.toHaveClass('is-open');
    expect(secondItemContent).toHaveClass('is-open');
  });
});
