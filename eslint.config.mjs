import antfu from '@antfu/eslint-config';

export default antfu({
  react: true,
  typescript: true,
  jsx: true,

  stylistic: {
    indent: 2,
    semi: true,
    quotes: 'single',
  },

  rules: {
    'style/brace-style': ['error', '1tbs'],
    'style/arrow-parens': ['error', 'always'],
    'style/no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxBOF: 0,
        maxEOF: 0,
      },
    ],
  },

  formatters: {
    html: true,
    markdown: 'prettier',
  },
});
