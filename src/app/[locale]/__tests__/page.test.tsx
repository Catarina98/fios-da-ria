import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { showcaseList } from '@/showcase/registry';

import Home from '../page';

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

describe('<Home />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should redirect to the first showcase item', async () => {
    const params = Promise.resolve({ locale: 'en' });

    await Home({ params });

    expect(redirect).toHaveBeenCalledWith(
      `/en/showcase/${showcaseList[0].slug}`,
    );
  });
});
