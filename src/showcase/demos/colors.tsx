'use client';

import { Body, Caption } from '@components/ui/typography';
import { cn } from '@utils/cn';

const backgroundSwatches = [
  'bg-primary',
  'bg-secondary',
  'bg-secondary-hover',
  'bg-tertiary',
  'bg-quaternary',
  'bg-grey',
  'bg-white',
  'bg-disabled',
];

const borderSwatches = ['border-primary'];

const textSwatches = [
  'text-primary',
  'text-secondary',
  'text-tertiary',
  'text-disabled',
];

const Swatch = ({ name }: { name: string }) => (
  <div className="flex flex-col gap-4">
    <div className={cn('h-40 w-full rounded-6 border border-primary', name)} />
    <Caption className="text-tertiary">{name}</Caption>
  </div>
);

const ColorsDemo = () => (
  <div className="flex flex-col gap-32">
    <div className="flex flex-col gap-8">
      <Caption className="uppercase text-tertiary">Backgrounds — bg-*</Caption>
      <div className="grid grid-cols-2 gap-16 tablet:grid-cols-4">
        {backgroundSwatches.map(name => (
          <Swatch key={name} name={name} />
        ))}
      </div>
    </div>

    <div className="flex flex-col gap-8">
      <Caption className="uppercase text-tertiary">Borders — border-*</Caption>
      <div className="grid grid-cols-2 gap-16 tablet:grid-cols-4">
        {borderSwatches.map(name => (
          <div key={name} className="flex flex-col gap-4">
            <div
              className={cn(
                'h-40 w-full rounded-6 border-2 bg-transparent',
                name,
              )}
            />
            <Caption className="text-tertiary">{name}</Caption>
          </div>
        ))}
      </div>
    </div>

    <div className="flex flex-col gap-8">
      <Caption className="uppercase text-tertiary">Text — text-*</Caption>
      <div className="flex flex-col gap-8">
        {textSwatches.map(name => (
          <div key={name} className="flex items-baseline gap-12">
            <Body size="M" className={name}>
              The quick brown fox jumps over the lazy dog
            </Body>
            <Caption className="text-tertiary">{name}</Caption>
          </div>
        ))}
      </div>
    </div>

    <Caption className="text-tertiary">
      All color variables, utility classes and tokens are defined in
      src/styles/colors.css.
    </Caption>
  </div>
);

export default ColorsDemo;
