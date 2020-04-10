module.exports = {
  parser: 'babel-eslint',
  env: {},
  root: true,
  extends: [],
  plugins: ['prettier', 'react-hooks'],
  rules: {
    'prettier/prettier': 'error',
    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    'brace-style': 'warn',
    'camelcase': 'warn',
    'default-case': 'warn',
    'eol-last': 'error',
    'for-direction': 'error',
    'jsx-quotes': ['warn', 'prefer-single'],
    'max-lines': ['error', 600],
    'multiline-ternary': 'warn',
    'newline-per-chained-call': 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': ['warn', 'never'],
    'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
    'react-hooks/exhaustive-deps': 'warn' // 检查 effect 的依赖
  },
};