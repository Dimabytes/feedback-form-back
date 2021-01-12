module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: ['airbnb-base', 'plugin:sonarjs/recommended'],
  parserOptions: {
    ecmaVersion: 12
  },
  plugins: ['sonarjs', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'comma-dangle': 0,
    'object-curly-spacing': ['error', 'never'],
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    'arrow-parens': 0,
    'no-console': 0,
    'consistent-return': 0,
    'arrow-body-style': 0,
    'quote-props': 0
  }
};
