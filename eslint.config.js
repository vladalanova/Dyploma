// eslint.config.js
const security = require('eslint-plugin-security');

module.exports = [
  {
    plugins: {
      security
    },
    languageOptions: {
      sourceType: 'module'
    },
    rules: {
      ...require('eslint-plugin-security').configs.recommended.rules,
      'no-unused-vars': 'warn',
      'no-console': 'off'
    }
  }
];
