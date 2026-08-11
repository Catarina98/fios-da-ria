import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import _import from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    plugins: {
      import: _import,
      'simple-import-sort': simpleImportSort,
      'react-hooks': reactHooks,
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.json'],
        },
      },
    },
    rules: {
      'react/display-name': 'off',
      '@next/next/no-img-element': 'off',
      'react/no-unescaped-entities': 'off',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/refs': 'warn',

      'import/no-anonymous-default-export': 'off',
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            ["^react$", "^@?\\w"],
            ["^@"],
            ["^\\./"],
          ],
        },
      ],
      "import/newline-after-import": ["error", { count: 1 }],

      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',

      'lines-around-comment': [
        'error',
        {
          beforeLineComment: true,
          beforeBlockComment: true,
          allowBlockStart: true,
          allowClassStart: true,
          allowObjectStart: true,
          allowArrayStart: true,
        },
      ],
      'newline-before-return': 'error',
    },
  },
]);

export default eslintConfig;
