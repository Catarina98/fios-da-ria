import React from 'react';
import { ButtonVariant } from '@typing/components/button';
import { HighlightItem } from '@typing/components/highlights';
import { Heart } from 'lucide-react';

import { isSanityConfigured, sanityClient, urlFor } from './client';

export interface SanityHighlightRaw {
  _id?: string;
  title?: { pt?: string; en?: string } | string;
  badge?: { pt?: string; en?: string } | string;
  description?: { pt?: string; en?: string } | string;
  buttonText?: { pt?: string; en?: string } | string;
  buttonUrl?: string;
  secondaryButtonText?: { pt?: string; en?: string } | string;
  secondaryButtonUrl?: string;
  image?: any;
  imageAlt?: { pt?: string; en?: string } | string;
  imageTag?: { pt?: string; en?: string } | string;
  isVisible?: boolean;
  visibleFrom?: string;
  visibleUntil?: string;
  order?: number;
}

const getLocalizedValue = (
  value: { pt?: string; en?: string } | string | undefined,
  locale: string,
): string => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  const target = locale === 'pt' ? value.pt : value.en;

  return target || value.pt || value.en || '';
};

export const getDefaultHighlights = (
  locale: string = 'pt',
): HighlightItem[] => {
  if (locale === 'en') {
    return [
      {
        id: 'default-hero-1',
        badge: 'Handmade in Portugal',
        title: 'Stories made of yarn, <highlight>stitch by stitch.</highlight>',
        description:
          'Welcome to Fios da Ria. I am Catarina, and I create detailed, handmade amigurumi figures. Soft, fluffy and full of personality.',
        imageSrc: '/images/toystory-highlight.webp',
        imageAlt: 'Three colorful crochet figures in nature',
        button: {
          children: 'View Gallery',
          variant: ButtonVariant.Primary,
          url: '/gallery',
        },
        secondaryButton: {
          children: 'Meet Catarina',
          variant: ButtonVariant.Ghost,
          url: '/about',
        },
        note: {
          text: 'Unique pieces, made with love',
          icon: React.createElement(Heart, { size: 16 }),
        },
      },
    ];
  }

  return [
    {
      id: 'default-hero-1',
      badge: 'Feito à mão em Portugal',
      title: 'Histórias feitas de fio, <highlight>ponto a ponto.</highlight>',
      description:
        'Bem-vindos à Fios da Ria. Eu sou a Catarina, e crio figuras amigurumi detalhadas e feitas à mão. Macias, fofinhas e cheias de personalidade.',
      imageSrc: '/images/toystory-highlight.webp',
      imageAlt: 'Três bonecos de crochet coloridos na natureza',
      button: {
        children: 'Ver Galeria',
        variant: ButtonVariant.Primary,
        url: '/gallery',
      },
      secondaryButton: {
        children: 'Conhecer a Catarina',
        variant: ButtonVariant.Ghost,
        url: '/about',
      },
      note: {
        text: 'Peças únicas, feitas com carinho',
        icon: React.createElement(Heart, { size: 16 }),
      },
    },
  ];
};

export const formatSanityHighlight = (
  raw: SanityHighlightRaw,
  locale: string,
): HighlightItem => {
  const imageUrl = raw.image
    ? typeof raw.image === 'string'
      ? raw.image
      : urlFor(raw.image)
    : '/images/toystory-highlight.webp';

  const buttonText = getLocalizedValue(raw.buttonText, locale);
  const secondaryButtonText = getLocalizedValue(
    raw.secondaryButtonText,
    locale,
  );
  const imageTag = getLocalizedValue(raw.imageTag, locale);
  const badge = getLocalizedValue(raw.badge, locale);

  return {
    id: raw._id || 'highlight',
    title: getLocalizedValue(raw.title, locale),
    badge: badge || undefined,
    description: getLocalizedValue(raw.description, locale),
    button: buttonText
      ? {
          children: buttonText,
          variant: ButtonVariant.Primary,
          url: raw.buttonUrl || '/gallery',
        }
      : undefined,
    secondaryButton: secondaryButtonText
      ? {
          children: secondaryButtonText,
          variant: ButtonVariant.Ghost,
          url: raw.secondaryButtonUrl || '/about',
        }
      : undefined,
    imageSrc: imageUrl,
    imageAlt: getLocalizedValue(raw.imageAlt, locale),
    note: imageTag
      ? {
          text: imageTag,
          icon: React.createElement(Heart, { size: 16 }),
        }
      : undefined,
    order: typeof raw.order === 'number' ? raw.order : undefined,
  };
};

export async function getHighlights(
  locale: string = 'pt',
): Promise<HighlightItem[]> {
  if (!isSanityConfigured() || !sanityClient) {
    return getDefaultHighlights(locale);
  }

  try {
    const query = `*[_type == "highlight"
      && coalesce(isVisible, true) == true
      && (!defined(visibleFrom) || visibleFrom <= now())
      && (!defined(visibleUntil) || visibleUntil > now())
    ] | order(coalesce(order, 9999) asc, _createdAt desc) {
      _id,
      title,
      badge,
      description,
      buttonText,
      buttonUrl,
      secondaryButtonText,
      secondaryButtonUrl,
      image,
      imageAlt,
      imageTag,
      order
    }`;

    const sanityHighlights =
      await sanityClient.fetch<SanityHighlightRaw[]>(query);

    if (!sanityHighlights || sanityHighlights.length === 0) {
      return getDefaultHighlights(locale);
    }

    return sanityHighlights.map(h => formatSanityHighlight(h, locale));
  } catch (error) {
    console.warn('Failed to fetch highlights from Sanity:', error);

    return getDefaultHighlights(locale);
  }
}
