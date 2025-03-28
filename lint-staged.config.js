module.exports =
    process.env.NODE_ENV === 'production'
        ? {}
        : {
              '**/*.ts?(x)': () => ['npm run typecheck', 'npm run lint:fix'],
              '**/*.(css|scss)': () => 'npm run stylelint:fix',
          };
