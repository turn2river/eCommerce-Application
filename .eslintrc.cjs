module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['prettier', 'import', '@typescript-eslint'],
  root: true,
  rules: {
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 2,
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'explicit',
          constructors: 'off',
          methods: 'explicit',
          parameterProperties: 'explicit',
          properties: 'explicit',
        },
      },
    ],
    '@typescript-eslint/lines-between-class-members': 0,
    '@typescript-eslint/no-explicit-any': 2,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/no-non-null-assertion': 1,
    '@typescript-eslint/no-unnecessary-type-assertion': 2,
    'block-spacing': ['warn', 'always'],
    'class-methods-use-this': 0,
    'curly': ['warn', 'all'],
    'eol-last': 2,
    'import/prefer-default-export': 0,
    'max-lines-per-function': ['error', 200],

    'no-console': 0,
    'no-debugger': 0,
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
        maxBOF: 0,
        maxEOF: 1,
      },
    ],
    'no-param-reassign': 1,
    'no-plusplus': 0,
    'no-return-assign': 1,
    'no-template-curly-in-string': 1,
    'no-underscore-dangle': 0,
    'no-unused-vars': 0,
    'object-curly-spacing': ['warn', 'always'],
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['!', '?', '//', 'todo', '*'],
      },
    ],
  },
  ignorePatterns: ['*.js'],
}
