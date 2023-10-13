module.exports = {
  env: {
    browser: true,
    es2021: true,
    'react-native/react-native': true
  },
  extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended', 'standard', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'simple-import-sort', 'react-native', 'detox'],
  rules: {
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'react/prop-types': 'warn',
    'no-undef': 'warn',
    'no-unused-vars': 'warn',
    camelcase: 'warn',
    indent: [
      'error',
      2,
      {
        SwitchCase: 1
      }
    ]
  },
  overrides: [
    {
      files: ['**/*.spec.js', '**/*.spec.jsx', '**/*.e2e.js', '**/*.test.js'],
      env: {
        'detox/detox': true,
        jest: true
        // 'jest/globals': true
      }
    }
  ]
}
