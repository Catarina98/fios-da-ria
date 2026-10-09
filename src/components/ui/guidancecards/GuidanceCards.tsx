import { FC } from 'react';
import Card from '@components/ui/card';
import type { GuidanceCardsType } from '@typing/components/guidancecards';
import { cn } from '@utils/cn';
import { Flower, Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';

import './GuidanceCards.scss';

const GuidanceCards: FC<GuidanceCardsType> = ({
  materialsTitle,
  materialsItems,
  careTitle,
  careItems,
  className,
  ...props
}) => {
  const t = useTranslations('Homepage');

  const resolvedMaterialsTitle = materialsTitle ?? t('guidance.materialsTitle');
  const resolvedMaterialsItems =
    materialsItems ?? (t.raw('guidance.materialsItems') as string[]);

  const resolvedCareTitle = careTitle ?? t('guidance.careTitle');
  const resolvedCareItems =
    careItems ?? (t.raw('guidance.careItems') as string[]);

  return (
    <div
      data-testid="guidance-cards-component"
      className={cn('guidance-cards', className)}
      {...props}
    >
      <Card
        title={resolvedMaterialsTitle}
        icon={<Flower size={20} />}
        iconVariant="primary"
        items={resolvedMaterialsItems}
      />
      <Card
        title={resolvedCareTitle}
        icon={<Shield size={20} />}
        iconVariant="secondary"
        items={resolvedCareItems}
      />
    </div>
  );
};

export default GuidanceCards;
