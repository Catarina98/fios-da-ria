export const getAssetPath = (src?: string): string => {
  if (!src) return '';
  if (
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('data:') ||
    src.startsWith('blob:')
  ) {
    return src;
  }
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const normalized = src.startsWith('/') ? src : `/${src}`;
  if (basePath && normalized.startsWith(basePath)) {
    return normalized;
  }
  
return `${basePath}${normalized}`;
};
