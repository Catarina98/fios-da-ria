import bundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@metyis-porto/douro-ui-react',
    '@metyis-porto/douro-ui-button',
  ],
  output: 'standalone',
  compiler: {
    reactRemoveProperties: true,
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
