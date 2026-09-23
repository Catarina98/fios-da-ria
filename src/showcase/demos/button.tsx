'use client';

import Button from '@components/ui/button/Button';
import { ButtonSize, ButtonVariant } from '@typing/components/button';
import { ArrowRight, ShoppingCart } from 'lucide-react';

import { Row } from './_shared';

const ButtonDemo = () => (
  <div className="flex flex-col gap-24">
    <Row label="Variants">
      <Button variant={ButtonVariant.Primary}>Primary Button</Button>
      <Button variant={ButtonVariant.Secondary}>Secondary Button</Button>
      <Button variant={ButtonVariant.Tertiary}>Tertiary Button</Button>
      <Button variant={ButtonVariant.Ghost}>Ghost Button</Button>
    </Row>
    <Row label="With icon">
      <Button
        variant={ButtonVariant.Secondary}
        size={ButtonSize.Large}
        leftIcon={<ShoppingCart size={16} />}
      >
        Add to Cart
      </Button>
      <Button rightIcon={<ArrowRight size={16} />}>Next Step</Button>
    </Row>
    <Row label="Statuses">
      <Button disabled>Disabled</Button>
      <Button isLoading>Loading State</Button>
    </Row>
  </div>
);

export default ButtonDemo;
