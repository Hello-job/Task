import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// 在应用入口文件中使用: 如 main.js, app.jsx
import { createVersionPolling } from 'version-polling';

createVersionPolling({
  appETagKey: '__APP_ETAG__',
  pollingInterval: 5 * 1000, // 单位为毫秒
  silent: process.env.NODE_ENV === 'development', // 开发环境下不检测
  onUpdate: self => {
    // 当检测到有新版本时，执行的回调函数，可以在这里提示用户刷新页面
    const result = confirm('页面有更新，点击确定刷新页面！');
    if (result) {
      self.onRefresh();
    } else {
      self.onCancel();
    }
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  //   <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  //   </React.StrictMode>
);
