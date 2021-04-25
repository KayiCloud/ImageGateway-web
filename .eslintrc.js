module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended', 'kayieslint'],

  rules: {
    "no-async-promise-executor": 'off',
    "no-prototype-builtins": 'off'
  }
}