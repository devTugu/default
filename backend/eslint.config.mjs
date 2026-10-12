// eslint.config.mjs — NestJS Clean Architecture backend
import eslint from '@eslint/js';
import cleanCode from '@default/eslint-config/clean-code';
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
  ...cleanCode,
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

      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-extra-boolean-cast': 'off',

      'no-duplicate-imports': ['error', { allowSeparateTypeImports: true }],
      'prefer-const': 'error',
      'prettier/prettier': 'error',
    },
  },

  {
    files: [
      'src/infrastructure/database/run-migrations.ts',
      'src/infrastructure/database/seed/run-seed.ts',
    ],
    rules: {
      'no-console': 'off',
    },
  },

  {
    files: [
      'src/infrastructure/observability/tracing.ts',
      'src/infrastructure/observability/sentry.ts',
    ],
    rules: {
      'no-console': 'off',
    },
  },

  // Nest DI: constructor param count = injected deps, not smell
  {
    files: [
      '**/*.controller.ts',
      '**/*use-case*.ts',
      '**/*.module.ts',
      '**/domain/**/*.entity.ts',
    ],
    rules: {
      'max-params': 'off',
    },
  },

  // Drizzle schema / seed / wide upsert mappers are declarative dumps
  {
    files: [
      '**/infrastructure/database/drizzle/schema/**/*.ts',
      '**/infrastructure/database/seed/**/*.ts',
      '**/repositories/site-setting.drizzle-repository.ts',
    ],
    rules: {
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      complexity: 'off',
    },
  },

  {
    files: ['**/*.spec.ts', 'test/**/*.ts'],
    rules: {
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/naming-convention': 'off',
      'max-lines-per-function': 'off',
      'max-nested-callbacks': 'off',
      complexity: 'off',
    },
  },
);
