module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    // 'react/no-children-prop': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 'off',
    'no-console': 'off',
    'jsx-a11y/label-has-associated-control': [2, {
      labelComponents: ['CustomLabel'],
      labelAttributes: ['inputLabel'],
      controlComponents: ['CustomInput'],
      assert: 'both',
      depth: 3,
    }],
  },
};
