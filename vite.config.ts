import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteEslint from 'vite-plugin-eslint';
import { resolve } from 'path';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    envDir: './env',
    build: {
      minify: 'terser',
      rollupOptions: {
        manualChunks: {
          // 不经常更新的代码单独打包成一个 JS 文件，这样就可以减少 HTTP 请求，同时降低服务器压力
          // 每个 '键' 都表示一个分包块，'值' 包含列出的模块及其所有依赖项
          react: [
            'React',
            'react-dom',
            'react-redux',
            'react-router-dom',
            'axios'
          ]
        }
      },
      terserOptions: {
        compress: {
          // 生产环境时移除console
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    plugins: [
      react(),
      // 打包压缩 体积小不建议压缩
      viteCompression(),
      viteEslint({
        failOnError: false
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        react: 'react',
        'react-dom': 'react-dom'
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
      host: '0.0.0.0',
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
};
