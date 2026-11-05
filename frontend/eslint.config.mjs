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
                    // 大文字と小文字を区別し、大文字で始まる名前を先にする
                    alphabetize: { order: 'asc', caseInsensitive: false },
                    // { } の中の名前も、type を先にしてアルファベット順に並べる
                    named: { enabled: true, types: 'types-first' },
                },
            ],
        },
    },
    {
        files: ['**/*.{ts,tsx,mts,cts}'],
        rules: {
            // 型だけの import に type を付ける(付いていないと、上の並べ替えで型として扱われない)
            '@typescript-eslint/consistent-type-imports': [
                'warn',
                { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
            ],
        },
    },
    globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
