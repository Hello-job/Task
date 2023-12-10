/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'violet-500': '#7b67ee', // 主题字颜色（紫色）
        'violet-200': '#edeaff', // 选中色
        grayCustom: '#f5f7fa', // hover灰色
        textGray: '#6e7080', // 字体灰色
        textLight: '#8c8c8c', // 字体浅灰色
        textDefault: '#2a2c34', // 字体默认黑色
        transparenBlack: 'rgba(0,0,0, 0.3)', // 透明黑色
        baseGray: '#e7ebf4', // 表格灰色
        textGray: '#6e7080', // 文字灰色
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
        }
      },
      boxShadow: {
        base: '0 4px 8px rgba(0,0,0,.07), 0 8px 28px rgba(0,0,0,.09)'
      },
      backgroundColor: {
        mask: 'rgba(0, 0, 0, 0.45)',
        violetMask: 'rgb(123, 103, 238, 0.3)'
      },
      keyframes: {
        modalShow: {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 }
        }
      },
      animation: {
        modalShow: 'modalShow 0.3s ease-in-out'
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
