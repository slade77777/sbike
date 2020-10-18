module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: [
            '>0.1%',
            'not dead',
            'not ie 11',
            'not op_mini all',
            'not android <= 4.4',
            'not samsung <= 4',
          ],
        },
        useBuiltIns: 'entry',
        corejs: '3',
        modules: false,
      },
    ],
    '@babel/react',
    '@babel/typescript',
    '@babel/flow',
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ],
};
