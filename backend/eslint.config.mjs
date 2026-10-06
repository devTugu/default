// eslint.config.mjs — NestJS Clean Architecture backend
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'eslint.config.mjs',
      'dist/**',
      'coverage/**',
      'node_modules/**',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      // NestJS: PascalCase decorator factories (Public, Permissions, CurrentUser, AppErrors)
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: ['class', 'interface', 'enum', 'typeAlias'], format: ['PascalCase'] },
        { selector: 'enumMember', format: ['UPPER_CASE', 'PascalCase'] },
        { selector: 'function', format: ['camelCase', 'PascalCase'] },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          filter: { regex: '^_', match: false },
        },
        {
          selector: 'property',
          format: ['camelCase', 'snake_case', 'UPPER_CASE'],
          filter: {
            regex: '^(_id|_index|_count|created_at|updated_at|deleted_at)$',
            match: false,
          },
        },
      ],

      '@typescript-eslint/no-explicit-any': [
        'error',
        { ignoreRestArgs: true, fixToUnknown: false },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',

      // TypeORM / JWT adapters: strict typing enforced in code review, not noisy in infra
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-extra-boolean-cast': 'off',

      'no-console': 'warn',
      'no-duplicate-imports': ['error', { allowSeparateTypeImports: true }],
      'prefer-const': 'error',
      'prettier/prettier': 'error',
    },
  },

  // DB CLI entrypoints
  {
    files: [
      'src/infrastructure/database/run-migrations.ts',
      'src/infrastructure/database/seed/run-seed.ts',
    ],
    rules: {
      'no-console': 'off',
    },
  },

  // Observability bootstrap (optional OTEL/Sentry)
  {
    files: [
      'src/infrastructure/observability/tracing.ts',
      'src/infrastructure/observability/sentry.ts',
    ],
    rules: {
      'no-console': 'off',
    },
  },

  // Jest mocks
  {
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/naming-convention': 'off',
    },
  },

  // E2E (supertest + full AppModule bootstrap)
  {
    files: ['test/**/*.ts'],
    rules: {
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/unbound-method': 'off',
    },
  },
);
