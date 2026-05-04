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
  },
});
