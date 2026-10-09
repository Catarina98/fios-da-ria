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
          description="O xerife mais leal de Toy Story, recriado ponto a ponto com todos os detalhes do seu traje."
          image="/images/toystory-highlight.jpg"
          price="€48"
          url="/product/collection-toy-story"
        />
        <ProductCard
          title="Branca de Neve"
          category="Disney Princess"
          description="A primeira princesa Disney numa versão delicada, com o icónico vestido azul e amarelo."
          image="/images/snow-white.jpg"
          price="€65"
          url="/product/collection-disney-princesses"
        />
        <ProductCard
          title="Anya Forger"
          category="Spy Family"
          description="A pequena telepata de Spy × Family, com o seu cabelo cor-de-rosa e uniforme inconfundível."
          image="/images/anya.jpg"
          price="€42"
          url="/product/collection-spy-family"
        />
      </div>
    </Stack>
  </div>
);

export default ProductCardDemo;
