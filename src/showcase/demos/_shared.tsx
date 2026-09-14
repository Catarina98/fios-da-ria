import { ReactNode } from 'react';
import { Caption } from '@components/ui/typography';

export const noop = () => undefined;

export const Row = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <div className="flex flex-col gap-8">
    <Caption className="uppercase text-tertiary">{label}</Caption>
    <div className="flex flex-wrap items-center gap-16">{children}</div>
  </div>
);

export const Stack = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <div className="flex flex-col gap-8">
    <Caption className="uppercase text-tertiary">{label}</Caption>
    <div className="flex flex-col items-start gap-16">{children}</div>
  </div>
);
