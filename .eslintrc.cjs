module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  // https://eslint.bootcss.com/docs/user-guide/configuring
  // "off" 或 0 - 关闭规则
  // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
  // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  rules: {
    'prettier/prettier': 'error',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    eqeqeq: [2, 'allow-null'], // 使用 === 替代 ==
    // 未使用的变量(禁止出现)
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    // 关闭禁止使用any
    '@typescript-eslint/no-explicit-any': 'off',
    // 未使用的表达式禁止出现(禁止出现)
    'no-unused-expressions': 'off',
    // 驼峰命名
    camelcase: 'warn',
    // 强制使用useState结构名称如: [xxx, setXxx] = useState
    'react/hook-use-state': 1,
    // 强制不可使用{...props}
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2 // 缩进字节数
      }
    ]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
