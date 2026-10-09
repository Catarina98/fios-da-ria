import { cleanup, render, screen } from '@tests/test-utils';
import { afterEach, describe, expect, it } from 'vitest';

import Breadcrumbs from '../Breadcrumbs';

describe('<Breadcrumbs />', () => {
  afterEach(cleanup);

  it('renders breadcrumbs navigation with links and current item', () => {
    render(
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Gallery', href: '/gallery' },
          { label: 'Woody' },
        ]}
      />,
    );

    expect(screen.getByTestId('breadcrumbs-component')).toBeInTheDocument();

    const homeLink = screen.getByTestId('breadcrumb-link-0');
    expect(homeLink).toHaveTextContent('Home');
    expect(homeLink).toHaveAttribute('href', '/');

    const galleryLink = screen.getByTestId('breadcrumb-link-1');
    expect(galleryLink).toHaveTextContent('Gallery');
    expect(galleryLink).toHaveAttribute('href', '/gallery');

    const currentSpan = screen.getByTestId('breadcrumb-current-2');
    expect(currentSpan).toHaveTextContent('Woody');
    expect(currentSpan).toHaveAttribute('aria-current', 'page');
  });

  it('renders separators between breadcrumb items', () => {
    render(
      <Breadcrumbs
        items={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />,
    );

    expect(screen.getByTestId('breadcrumb-separator')).toBeInTheDocument();
  });

  it('returns null when items is empty', () => {
    const { container } = render(<Breadcrumbs items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
