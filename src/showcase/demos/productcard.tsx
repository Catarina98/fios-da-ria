'use client';

import ProductCard from '@components/ui/productcard';

import { Stack } from './_shared';

const ProductCardDemo = () => (
  <div className="flex flex-col gap-32">
    <Stack label="Product Card Grid">
      <div className="grid grid-cols-1 gap-24 tablet:grid-cols-2 desktop:grid-cols-3">
        <ProductCard
          title="Woody"
          category="Toy Story"
          image="/images/toystory-highlight.jpg"
          price="€48"
          url="/product/collection-toy-story"
        />
        <ProductCard
          title="Branca de Neve"
          category="Disney Princess"
          image="/images/snow-white.jpg"
          price="€65"
          url="/product/collection-disney-princesses"
        />
        <ProductCard
          title="Anya Forger"
          category="Spy Family"
          image="/images/anya.jpg"
          price="€42"
          url="/product/collection-spy-family"
        />
      </div>
    </Stack>
  </div>
);

export default ProductCardDemo;
