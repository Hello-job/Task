import { useEffect, useState } from 'react';
import { registerMicroApps, start } from 'qiankun';
import { ations } from '../../micro-app/index';
import { Storage } from '@/shared';
import { HOST, APP_NAME } from './config';

const GraphView = () => {
  const [microApp, setterMicroAppMounted] = useState<boolean>(false);
  const getActiveRule = (name: string) => (location: Location) => {
    return location.pathname.includes(name);
  };

  /**
   * 加载微应用
   * https://qiankun.umijs.org/zh/faq
   */
  useEffect(() => {
    registerMicroApps(
      [
        {
          name: APP_NAME,
          entry: HOST,
          container: '#graph',
          activeRule: getActiveRule('/view')
        }
      ],
      {
        async beforeMount() {
          setterMicroAppMounted(true);
        }
      }
    );
    // 是否开启沙箱
    start({ sandbox: { speedy: true } });
  }, []);

  // 加载完成后传递状态
  useEffect(() => {
    if (!microApp) return;
    ations.setGlobalState({
      type: 'token',
      data: {
        token: Storage.local.get('token')
      }
    });
  }, [microApp]);

  return <div id="graph" className="w-full h-full"></div>;
};
export default GraphView;
