import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*'],
      exclude: [
        '**/__tests__/**',
        'src/types/*',
        '**/index.ts',
        '**/*.styles.ts',
        '**/*.scss',
        'src/styles/**',
        'src/proxy.ts',
        'src/i18n/**',
        'src/lib/**',
        '**/*.md',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
    include: ['./src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/e2e/**',
      '**/.{git,cache,output,temp}/**',
    ],
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@api': path.resolve(import.meta.dirname, './src/api'),
      '@components': path.resolve(import.meta.dirname, './src/components'),
      '@hooks': path.resolve(import.meta.dirname, './src/hooks'),
      '@i18n': path.resolve(import.meta.dirname, './src/i18n'),
      '@lib': path.resolve(import.meta.dirname, './src/lib'),
      '@messages': path.resolve(import.meta.dirname, './messages'),
      '@providers': path.resolve(import.meta.dirname, './src/providers'),
      '@tests': path.resolve(import.meta.dirname, './tests'),
      '@typing': path.resolve(import.meta.dirname, './src/types'),
      '@utils': path.resolve(import.meta.dirname, './src/utils'),
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
});
