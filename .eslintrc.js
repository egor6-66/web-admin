module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    parser: '@typescript-eslint/parser',
    plugins: [
        'react',
        'simple-import-sort',
        'jsx-a11y',
        'promise',
        'sonarjs',
        'unicorn',
    ],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    extends: [
        'prettier',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:promise/recommended',
        'plugin:sonarjs/recommended-legacy',
    ],
    overrides: [
        {
            files: ['*.js', '*.jsx', '*.ts', '*.tsx', '*'],
            rules: {
                'simple-import-sort/imports': [
                    'error',
                    {
                        groups: [
                            ['^react', '^@?\\w'],
                            ['^(@|components)(/.*|$)'],
                            ['^\\u0000'],
                            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                            ['^.+\\.?(css)$'],
                        ],
                    },
                ],
            },
        },
    ],

    rules: {
        'no-redeclare': 0,
        'no-case-declarations': 0,
        '@typescript-eslint/ban-types': 0,
        'react/display-name': 0,
        'no-console': 'error',
        'promise/catch-or-return': 0,
        'promise/always-return': 0,
        '@typescript-eslint/consistent-type-definitions': 'error',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'no-undef': 0,
        'react/react-in-jsx-scope': 0,
        'no-unused-vars': 0,
        'react-hooks/exhaustive-deps': 0,
        'sonarjs/no-collapsible-if': 0,
        'react-hooks/rules-of-hooks': 0,
        'sonarjs/no-identical-expressions': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/ban-ts-comment': 0,
        'sonarjs/no-small-switch': 0,
        'eslint-disable-next-line': 0,
        'lines-between-class-members': [
            'error',
            'always',
            { exceptAfterSingleLine: true },
        ],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'interface',
                format: ['PascalCase'],
                custom: {
                    regex: '^I[A-Z]',
                    match: true,
                },
            },
        ],
        'react/function-component-definition': [
            2,
            { namedComponents: 'arrow-function' },
        ],
        'padding-line-between-statements': [
            'warn',
            { blankLine: 'always', prev: '*', next: 'block' },
            { blankLine: 'always', prev: 'block', next: '*' },
            { blankLine: 'always', prev: '*', next: 'block-like' },
            { blankLine: 'always', prev: 'block-like', next: '*' },
            { blankLine: 'always', prev: '*', next: 'return' },
            { blankLine: 'always', prev: 'directive', next: '*' },
            // { blankLine: 'always', prev: ['const', 'let'], next: '*' },
            { blankLine: 'always', prev: 'multiline-block-like', next: '*' },
            { blankLine: 'always', prev: 'multiline-const', next: '*' },
            { blankLine: 'always', prev: '*', next: 'multiline-const' },
            {
                blankLine: 'any',
                prev: ['singleline-const', 'singleline-let'],
                next: ['singleline-const', 'singleline-let'],
            },
            { blankLine: 'always', prev: ['case', 'default'], next: '*' },
            { blankLine: 'always', prev: '*', next: 'export' },
            {
                blankLine: 'any',
                prev: ['export'],
                next: ['export'],
            },
        ],
    },
};
