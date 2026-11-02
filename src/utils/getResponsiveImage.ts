import { getAssetPath } from './getAssetPath';

type ImageOptions = { widths: number[]; sizes: string };

/** Transform public Sanity images at delivery time, preserving crop and hotspot URLs. */
export function getResponsiveImage(
  source: string | undefined,
  options: ImageOptions,
) {
  const src = getAssetPath(source);
  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return { src };
  }
  if (
    url.hostname !== 'cdn.sanity.io' ||
    !url.pathname.startsWith('/images/')
  ) {
    return { src };
  }

  const originalWidth = Number(url.pathname.match(/-(\d+)x\d+\.[a-z]+$/i)?.[1]);
  const cropWidth = Number(url.searchParams.get('rect')?.split(',')[2]);
  const limit = Math.min(originalWidth || Infinity, cropWidth || Infinity);
  const widths = [
    ...new Set(
      options.widths
        .filter(width => Number.isFinite(width) && width > 0)
        .map(width => Math.min(Math.round(width), limit)),
    ),
  ].sort((a, b) => a - b);
  if (!widths.length) return { src };

  const atWidth = (width: number) => {
    const variant = new URL(url);
    variant.searchParams.set('w', String(width));
    variant.searchParams.set('q', '80');
    variant.searchParams.set('fit', 'max');
    variant.searchParams.set('auto', 'format');

    return variant.toString();
  };

  return {
    src: atWidth(widths[widths.length - 1]),
    srcSet: widths.map(width => `${atWidth(width)} ${width}w`).join(', '),
    sizes: options.sizes,
  };
}
