import { describe, expect, it } from 'vitest';

import { findShowcaseEntry, showcaseGroups, showcaseList } from '../registry';

describe('showcase registry', () => {
  it('contains valid showcase entries', () => {
    expect(showcaseList.length).toBeGreaterThan(0);
    showcaseList.forEach(entry => {
      expect(entry.slug).toBeTruthy();
      expect(entry.name).toBeTruthy();
      expect(entry.summary).toBeTruthy();
    });
  });

  it('groups entries into Foundations and Components', () => {
    expect(showcaseGroups).toHaveLength(2);
    expect(showcaseGroups[0].label).toBe('Foundations');
    expect(showcaseGroups[1].label).toBe('Components');

    const foundationSlugs = showcaseGroups[0].entries.map(e => e.slug);
    expect(foundationSlugs).toContain('colors');
    expect(foundationSlugs).toContain('typography');

    const componentSlugs = showcaseGroups[1].entries.map(e => e.slug);
    expect(componentSlugs).toContain('accordion');
    expect(componentSlugs).toContain('badge');
    expect(componentSlugs).toContain('button');
    expect(componentSlugs).toContain('card');
    expect(componentSlugs).toContain('highlights');
    expect(componentSlugs).toContain('productcard');
    expect(componentSlugs).toContain('storybanner');
    expect(componentSlugs).toContain('titlesection');
  });

  it('finds existing entry by slug', () => {
    const entry = findShowcaseEntry('button');
    expect(entry).toBeDefined();
    expect(entry?.name).toBe('Button');
  });

  it('returns undefined for non-existent slug', () => {
    const entry = findShowcaseEntry('unknown-slug');
    expect(entry).toBeUndefined();
  });
});
