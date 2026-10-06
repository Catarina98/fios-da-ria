'use client';

import Badge from '@components/ui/badge';
import { BadgeSize, BadgeVariant } from '@typing/components/badge';
import { Heart, Sparkles, Star } from 'lucide-react';

import { Row } from './_shared';

const BadgeDemo = () => (
  <div className="flex flex-col gap-24">
    <Row label="Variants">
      <Badge variant={BadgeVariant.Primary}>Feito à mão em Portugal</Badge>
      <Badge variant={BadgeVariant.Secondary}>Novo Padrão</Badge>
      <Badge variant={BadgeVariant.Neutral}>
        Peças únicas, feitas com carinho
      </Badge>
    </Row>

    <Row label="With Icons">
      <Badge variant={BadgeVariant.Neutral} icon={<Heart size={16} />}>
        Peças únicas, feitas com carinho
      </Badge>
      <Badge variant={BadgeVariant.Secondary} icon={<Sparkles size={14} />}>
        Novo Padrão
      </Badge>
      <Badge variant={BadgeVariant.Primary} icon={<Star size={14} />}>
        Destaque
      </Badge>
    </Row>

    <Row label="Sizes">
      <Badge size={BadgeSize.Small} variant={BadgeVariant.Primary}>
        Small (sm)
      </Badge>
      <Badge size={BadgeSize.Medium} variant={BadgeVariant.Primary}>
        Medium (md)
      </Badge>
    </Row>
  </div>
);

export default BadgeDemo;
