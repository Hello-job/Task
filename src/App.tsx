import { Suspense } from 'react';
import { ConfigProvider } from 'antd';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
import { Provider } from 'react-redux';
import store from './stores';
import { Loading } from 'surprisec-react-components';

import { useRoutes } from 'react-router-dom';
import router from './router';
import 'antd/dist/reset.css';
import './style/tailwind.css';
import './style/reset.less';
import 'surprisec-react-components/style';

export default function App() {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <Suspense fallback={<Loading />}>{useRoutes(router)}</Suspense>
      </ConfigProvider>
    </Provider>
  );
}
