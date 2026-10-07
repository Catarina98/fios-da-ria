import bundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? (isGithubActions ? '/fios-da-ria' : '');

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  compiler: {
    reactRemoveProperties: true,
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
