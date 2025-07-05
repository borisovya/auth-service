module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // включает eslint-config-prettier + prettier
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    // 🔕 убрать ошибки при console.log/error
    'no-console': 'off',

    // 🔕 позволить безопасную обработку ошибок
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',

    // ✅ желательно оставить строгую проверку catch
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unsafe-argument': 'warn',

    // ✅ код-стайл
    'prettier/prettier': ['error'],
  },
};
