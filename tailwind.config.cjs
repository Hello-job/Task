/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        violet: '#7b67ee', // 主题字颜色（紫色）
        violet2: '#edeaff', // 选中色
        grayCustom: '#f5f7fa', // hover灰色
        textGray: '#6e7080', // 字体灰色
        textLight: '#8c8c8c', // 字体浅灰色
        textDefault: '#2a2c34', // 字体默认黑色
        transparenBlack: 'rgba(0,0,0, 0.3)', // 透明黑色
        skin: {
          'text-primary': 'var(--color-text-primary)',
          'text-white': 'var(--color-text-white)',
          'text-base': 'var(--color-text-base)',
          'text-gray': 'var(--color-text-gray)',
          'text-light-gray': 'var(--color-text-light-gray)',
          'text-light': 'var(--color-text-light)',
          'hover-gray': 'var(--color-hover-gray)',
          'bg-base': 'var(--color-bg-base)',
          'bg-primary': 'var(--color-bg-primary)'
        },
        baseGray: '#e7ebf4', // 表格灰色
        textGray: '#6e7080' // 文字灰色
      }
    }
  },
  variants: {
    extend: {
      display: ['group-hover']
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
};
