module.exports = {
    extends: ['stylelint-config-standard'],
    plugins: ['stylelint-order', 'stylelint-scss'],
    rules: {
        'at-rule-no-unknown': null,
        'selector-class-pattern': null,
        'media-query-no-invalid': null,
        'function-no-unknown': null,
        'block-no-empty': null,
        'order/order': [
            'custom-properties',
            'at-rules',
            'dollar-variables',
            'declarations',
            'rules',
        ],
        'order/properties-order': [
            ['height', 'width'],
            {
                emptyLineBeforeUnspecified: 'never',
            },
        ],
        'at-rule-empty-line-before': 'never',
        'comment-empty-line-before': 'never',
        'custom-property-empty-line-before': 'never',
        'declaration-empty-line-before': 'never',
        'rule-empty-line-before': 'always',
    },
};
