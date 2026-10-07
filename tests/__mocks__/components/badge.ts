import { BadgeSize, BadgeType, BadgeVariant } from '@typing/components/badge';

export const primaryBadgeMock = {
  children: 'Feito à mão em Portugal',
  variant: BadgeVariant.Primary,
  size: BadgeSize.Small,
} satisfies BadgeType;

export const secondaryBadgeMock = {
  children: 'Novo Padrão',
  variant: BadgeVariant.Secondary,
  size: BadgeSize.Medium,
} satisfies BadgeType;

export const neutralBadgeMock = {
  children: 'Peças únicas, feitas com carinho',
  variant: BadgeVariant.Neutral,
} satisfies BadgeType;
