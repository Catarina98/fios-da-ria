import { cleanup, render, screen } from '@tests/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { noop, Row, Stack } from '../_shared';
import AccordionDemo from '../accordion';
import ButtonDemo from '../button';
import ColorsDemo from '../colors';
import TypographyDemo from '../typography';

describe('Showcase Demos', () => {
  beforeEach(() => {
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });

  describe('_shared', () => {
    it('executes noop function', () => {
      expect(noop()).toBeUndefined();
    });

    it('renders Row component with label and children', () => {
      render(
        <Row label="Test Row">
          <span>Row child</span>
        </Row>,
      );

      expect(screen.getByText('Test Row')).toBeInTheDocument();
      expect(screen.getByText('Row child')).toBeInTheDocument();
    });

    it('renders Stack component with label and children', () => {
      render(
        <Stack label="Test Stack">
          <span>Stack child</span>
        </Stack>,
      );

      expect(screen.getByText('Test Stack')).toBeInTheDocument();
      expect(screen.getByText('Stack child')).toBeInTheDocument();
    });
  });

  describe('ButtonDemo', () => {
    it('renders all button demo variants', () => {
      render(<ButtonDemo />);

      expect(screen.getByText('Primary Button')).toBeInTheDocument();
      expect(screen.getByText('Secondary Button')).toBeInTheDocument();
      expect(screen.getByText('Tertiary Button')).toBeInTheDocument();
      expect(screen.getByText('Ghost Button')).toBeInTheDocument();
      expect(screen.getByText('Add to Cart')).toBeInTheDocument();
      expect(screen.getByText('Next Step')).toBeInTheDocument();
      expect(screen.getByText('Disabled')).toBeInTheDocument();
      expect(screen.getByText('Loading State')).toBeInTheDocument();
    });
  });

  describe('AccordionDemo', () => {
    it('renders accordion demo items', () => {
      render(<AccordionDemo />);

      expect(screen.getByText('What does Flaga deliver?')).toBeInTheDocument();
      expect(screen.getByText('How fast is delivery?')).toBeInTheDocument();
      expect(screen.getByText('Disabled item')).toBeInTheDocument();
    });
  });

  describe('ColorsDemo', () => {
    it('renders background and border color swatches', () => {
      render(<ColorsDemo />);

      expect(screen.getByText('Backgrounds — bg-*')).toBeInTheDocument();
      expect(screen.getByText('Borders — border-*')).toBeInTheDocument();
      expect(screen.getByText('bg-primary')).toBeInTheDocument();
      expect(screen.getByText('border-primary')).toBeInTheDocument();
    });
  });

  describe('TypographyDemo', () => {
    it('renders all typography demo elements', () => {
      render(<TypographyDemo />);

      expect(screen.getByText('Display L')).toBeInTheDocument();
      expect(screen.getByText('Heading XL')).toBeInTheDocument();
      expect(screen.getByText('Body L')).toBeInTheDocument();
      expect(screen.getByText('Label primary')).toBeInTheDocument();
      expect(screen.getByText('Label secondary')).toBeInTheDocument();
      expect(screen.getByText('Caption')).toBeInTheDocument();
    });
  });
});
