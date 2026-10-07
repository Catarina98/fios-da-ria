import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { getAssetPath } from '../getAssetPath';

describe('getAssetPath', () => {
  const originalEnv = process.env.NEXT_PUBLIC_BASE_PATH;

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_BASE_PATH;
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_BASE_PATH = originalEnv;
  });

  it('returns empty string if src is falsy', () => {
    expect(getAssetPath()).toBe('');
    expect(getAssetPath('')).toBe('');
  });

  it('returns absolute external URLs unchanged', () => {
    expect(getAssetPath('https://example.com/pic.jpg')).toBe(
      'https://example.com/pic.jpg',
    );
    expect(getAssetPath('http://example.com/pic.jpg')).toBe(
      'http://example.com/pic.jpg',
    );
    expect(getAssetPath('data:image/png;base64,123')).toBe(
      'data:image/png;base64,123',
    );
    expect(getAssetPath('blob:http://localhost/123')).toBe(
      'blob:http://localhost/123',
    );
  });

  it('returns normalized local path without basePath when env is empty', () => {
    expect(getAssetPath('/logo.png')).toBe('/logo.png');
    expect(getAssetPath('logo.png')).toBe('/logo.png');
  });

  it('prefixes basePath when NEXT_PUBLIC_BASE_PATH is configured', () => {
    process.env.NEXT_PUBLIC_BASE_PATH = '/fios-da-ria';

    expect(getAssetPath('/logo.png')).toBe('/fios-da-ria/logo.png');
    expect(getAssetPath('images/woody.jpg')).toBe(
      '/fios-da-ria/images/woody.jpg',
    );
  });

  it('does not double prefix if path already includes basePath', () => {
    process.env.NEXT_PUBLIC_BASE_PATH = '/fios-da-ria';

    expect(getAssetPath('/fios-da-ria/logo.png')).toBe('/fios-da-ria/logo.png');
  });
});
