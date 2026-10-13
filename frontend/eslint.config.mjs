import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    {
        // import プラグインは Next.js の設定でこの種類のファイルにだけ登録されているので、同じ範囲に絞る
        files: ['**/*.{js,jsx,mjs,ts,tsx,mts,cts}'],
        rules: {
            'import/order': [
                'warn',
                {
                    groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
                    pathGroups: [
                        { pattern: 'react', group: 'external', position: 'before' },
                        { pattern: 'next', group: 'external', position: 'before' },
                        { pattern: 'next/**', group: 'external', position: 'before' },
                        { pattern: '@/**', group: 'internal' },
                    ],
                    pathGroupsExcludedImportTypes: ['builtin'],
                    distinctGroup: false,
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
        },
    },
    globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
