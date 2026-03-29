import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import checkFile from 'eslint-plugin-check-file'
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import sonarjs from 'eslint-plugin-sonarjs'
import unicorn from 'eslint-plugin-unicorn'
import unusedImports from 'eslint-plugin-unused-imports'

const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    plugins: {
      'unused-imports': unusedImports,
      'no-relative-import-paths': noRelativeImportPaths,
      'simple-import-sort': simpleImportSort,
      'sonarjs': sonarjs,
      'check-file': checkFile,
      'unicorn': unicorn,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        { 
          allowSameFolder: false, 
          rootDir: '.', 
          prefix: '@' 
        },
      ],

      // Simple Import Sort
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // SonarJS Recommended
      ...sonarjs.configs.recommended.rules,

      // Unicorn Recommended
      ...unicorn.configs['flat/recommended'].rules,
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/filename-case': 'off', // Handled by check-file

      // Check File (Naming Conventions)
      'check-file/filename-naming-convention': [
        'error',
        {
          'src/components/!(ui)/*.tsx': 'PASCAL_CASE',
          'src/components/ui/*.tsx': 'KEBAB_CASE',
          'src/hooks/*.ts': 'CAMEL_CASE',
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          'src/**/': 'KEBAB_CASE',
          'app/**/': String.raw`+([a-z0-9\[\]\(\)\-\._])`,
        },
      ],
    },
  },
])

export default eslintConfig
