import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteEslint from 'vite-plugin-eslint';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './env',
  plugins: [
    react(),
    viteEslint({
      failOnError: false
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  server: {
    // 默认打开的端口和本地
    port: 5173,
    https: false, // 不支持https
    proxy: {
      '/api': {
        target: 'http://101.132.222.119:8000', // 实际请求地址
        changeOrigin: true, // 是否跨域
        rewrite: path => path.replace(/^\/api/, '') // 对什么类的服务器匹配
      }
    }
  }
});
