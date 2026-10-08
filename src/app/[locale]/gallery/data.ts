export interface ProductVariant {
  id: string;
  name: string;
  image: string;
  price: string;
  stock: number;
}

export interface StoreProduct {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  price: string;
  stock: number;
  variants: ProductVariant[];
}

export function getProductPrices(product: StoreProduct): number[] {
  const variants = product.variants ?? [];
  const source =
    variants.length > 0
      ? variants.map(variant => variant.price)
      : [product.price];

  return source
    .map(price => Number(String(price).replace('€', '').trim()))
    .filter(price => Number.isFinite(price));
}

export function getProductDisplayPrice(
  product: StoreProduct,
  fromPrefix = 'From',
): string {
  if ((product.variants ?? []).length === 0) return product.price;

  const prices = getProductPrices(product);
  
return prices.length > 0
    ? `${fromPrefix} €${Math.min(...prices)}`
    : product.price;
}

export const CATALOG_PRODUCTS: StoreProduct[] = [
  {
    id: 'collection-toy-story',
    title: 'Toy Story Collection',
    category: 'Movies & Series',
    description:
      'Woody, Jessie, and Buzz in a handcrafted collection for everyone who never stopped believing in the magic of toys.',
    image: '/images/catalog/toy-story-woody.JPG',
    price: '€38',
    stock: 3,
    variants: [
      {
        id: 'toy-story-woody',
        name: 'Woody',
        image: '/images/catalog/toy-story-woody.JPG',
        price: '€38',
        stock: 1,
      },
      {
        id: 'toy-story-jessie',
        name: 'Jessie',
        image: '/images/catalog/toy-story-jessie.JPG',
        price: '€38',
        stock: 1,
      },
      {
        id: 'toy-story-buzz',
        name: 'Buzz Lightyear',
        image: '/images/catalog/toy-story-buzz.JPG',
        price: '€42',
        stock: 1,
      },
    ],
  },
  {
    id: 'collection-disney-princesses',
    title: 'Disney Princesses Collection',
    category: 'Movies & Series',
    description:
      'Five timeless princesses, recreated in amigurumi with unique dresses, hairstyles, and handcrafted details.',
    image: '/images/catalog/disney-snow-white.JPEG',
    price: '€42',
    stock: 5,
    variants: [
      {
        id: 'disney-snow-white',
        name: 'Snow White',
        image: '/images/catalog/disney-snow-white.JPEG',
        price: '€42',
        stock: 1,
      },
      {
        id: 'disney-cinderella',
        name: 'Cinderella',
        image: '/images/catalog/disney-cinderella.JPEG',
        price: '€42',
        stock: 1,
      },
      {
        id: 'disney-belle',
        name: 'Belle',
        image: '/images/catalog/disney-belle.JPG',
        price: '€45',
        stock: 1,
      },
      {
        id: 'disney-rapunzel',
        name: 'Rapunzel',
        image: '/images/catalog/disney-rapunzel.JPG',
        price: '€45',
        stock: 1,
      },
      {
        id: 'disney-jasmine',
        name: 'Jasmine',
        image: '/images/catalog/disney-jasmine.jpg',
        price: '€42',
        stock: 1,
      },
    ],
  },
  {
    id: 'collection-spy-family',
    title: 'Spy × Family Collection',
    category: 'Anime',
    description:
      'The beloved characters from the Forger family in delicate, detailed, stitch-by-stitch editions.',
    image: '/images/catalog/spy-family-anya.jpg',
    price: '€38',
    stock: 2,
    variants: [
      {
        id: 'spy-family-anya',
        name: 'Anya Forger',
        image: '/images/catalog/spy-family-anya.jpg',
        price: '€38',
        stock: 1,
      },
      {
        id: 'spy-family-yor',
        name: 'Yor Forger',
        image: '/images/catalog/spy-family-yor.jpg',
        price: '€42',
        stock: 1,
      },
    ],
  },
  {
    id: 'collection-one-piece',
    title: 'One Piece Collection',
    category: 'Anime',
    description:
      'The most adventurous crew of the seas, recreated in small amigurumis full of personality and character.',
    image: '/images/catalog/one-piece-usopp.JPEG',
    price: '€35',
    stock: 4,
    variants: [
      {
        id: 'one-piece-usopp',
        name: 'Usopp',
        image: '/images/catalog/one-piece-usopp.JPEG',
        price: '€35',
        stock: 1,
      },
      {
        id: 'one-piece-chopper',
        name: 'Chopper',
        image: '/images/catalog/one-piece-chopper.JPEG',
        price: '€35',
        stock: 1,
      },
      {
        id: 'one-piece-zoro',
        name: 'Zoro',
        image: '/images/catalog/one-piece-zoro.JPEG',
        price: '€38',
        stock: 1,
      },
      {
        id: 'one-piece-nami',
        name: 'Nami',
        image: '/images/catalog/one-piece-nami.JPEG',
        price: '€35',
        stock: 1,
      },
    ],
  },
];
