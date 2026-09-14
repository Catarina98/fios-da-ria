'use client';

import Label from '@components/ui/label';
import { Body, Caption, Display, Heading } from '@components/ui/typography';
import { LabelVariant } from '@typing/components/label';

const TypographyDemo = () => (
  <div className="flex flex-col gap-16 text-primary">
    <Display size="L">Display L</Display>
    <Display size="M">Display M</Display>
    <Display size="S">Display S</Display>
    <Heading size="XL">Heading XL</Heading>
    <Heading size="L">Heading L</Heading>
    <Heading size="M">Heading M</Heading>
    <Heading size="S">Heading S</Heading>
    <Body size="L">Body L</Body>
    <Body size="M">Body M</Body>
    <Body size="S">Body S</Body>
    <Label text="Label primary" variant={LabelVariant.Primary} />
    <Label text="Label secondary" variant={LabelVariant.Secondary} />
    <Caption>Caption</Caption>
  </div>
);

export default TypographyDemo;
