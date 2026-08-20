import { cleanup, render, screen, within } from '@testing-library/react';
import {
  TitleSectionAlign,
  TitleSectionColor,
  TitleSectionSize,
} from '@typing/components/titlesection';
import { afterEach, describe, expect, it } from 'vitest';

import TitleSection from '../TitleSection';

describe('TitleSection Component', () => {
  afterEach(cleanup);

  it('renders title and subtitle correctly', () => {
    render(<TitleSection title="Test Title" subtitle="Test Subtitle" />);

    const titleSection = screen.getByTestId('title-section-component');

    expect(titleSection).toBeInTheDocument();
    expect(
      within(titleSection).getByTestId('title-section-title'),
    ).toHaveTextContent('Test Title');
    expect(
      within(titleSection).getByTestId('title-section-subtitle'),
    ).toHaveTextContent('Test Subtitle');
  });

  it('applies correct alignment classes', () => {
    const { rerender } = render(
      <TitleSection title="Test" align={TitleSectionAlign.Center} />,
    );
    const titleSection = screen.getByTestId('title-section-component');

    expect(titleSection).toHaveClass('align-center');

    rerender(<TitleSection title="Test" align={TitleSectionAlign.Left} />);
    expect(titleSection).toHaveClass('align-left');
  });

  it('applies correct size and color classes to the title', () => {
    render(
      <TitleSection
        title="Test Title"
        titleSize={TitleSectionSize.Small}
        titleColor={TitleSectionColor.Secondary}
      />,
    );
    const titleSection = screen.getByTestId('title-section-component');
    const titleElement = within(titleSection).getByTestId(
      'title-section-title',
    );

    expect(titleElement).toHaveClass('size-sm');
    expect(titleElement).toHaveClass('color-secondary');
  });
});
