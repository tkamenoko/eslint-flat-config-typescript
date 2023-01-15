import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import importSort from 'eslint-plugin-simple-import-sort';

const globalIgnores = { ignores: ['node_modules/**'] };

const tsRules = {
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: './tsconfig.json',
    },
  },
  plugins: {
    '@typescript-eslint': tsPlugin,
  },
  rules: {
    ...tsPlugin.configs['eslint-recommended']?.rules,
    ...tsPlugin.configs['strict']?.rules,
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      { disallowTypeAnnotations: false },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      },
    ],
  },
};

export default [
  globalIgnores,
  'eslint:recommended',
  {
    // WORKAROUND: eslint-plugin-import does not yet support flat config.
    // See https://github.com/import-js/eslint-plugin-import/issues/2556
    plugins: {
      'simple-import-sort': importSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  tsRules,
  prettier,
];
