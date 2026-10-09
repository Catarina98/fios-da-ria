import { cleanup, render, screen } from '@tests/test-utils';
import { afterEach, describe, expect, it } from 'vitest';

import GuidanceCards from '../GuidanceCards';

describe('<GuidanceCards />', () => {
  afterEach(cleanup);

  it('renders default materials and care cards from translations', () => {
    render(<GuidanceCards />);

    expect(screen.getByTestId('guidance-cards-component')).toBeInTheDocument();
    expect(screen.getByText('Materiais naturais')).toBeInTheDocument();
    expect(screen.getByText('Fio 100% algodão')).toBeInTheDocument();
    expect(
      screen.getByText('Cuidados com o seu amigurumi'),
    ).toBeInTheDocument();
    expect(screen.getByText('Lavar à mão')).toBeInTheDocument();
  });

  it('supports custom props for titles and items', () => {
    render(
      <GuidanceCards
        materialsTitle="Custom Materials"
        materialsItems={['Custom item 1']}
        careTitle="Custom Care"
        careItems={['Custom care 1']}
      />,
    );

    expect(screen.getByText('Custom Materials')).toBeInTheDocument();
    expect(screen.getByText('Custom item 1')).toBeInTheDocument();
    expect(screen.getByText('Custom Care')).toBeInTheDocument();
    expect(screen.getByText('Custom care 1')).toBeInTheDocument();
  });
});
