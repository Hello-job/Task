import { useEffect, useState } from 'react';
import Header from './header';
import SideMenu from './side-menu';
import cls from 'classnames';
import Content from './content';
import { FloatingBall } from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import type { Dispatch, RootState } from '@/stores';

const Layout = () => {
  const dispatch = useDispatch<Dispatch>();
  const [openSideMenu, setOpenSideMenu] = useState<boolean>(true);
  const [sideWidth, setSideWidth] = useState<number>(200);
  const personalInfo = useSelector(
    (store: RootState) => store.userInfo.personalInfo
  );
  useEffect(() => {
    dispatch.userInfo.getUserInfo();
  }, []);

  useEffect(() => {
    if (personalInfo.id) {
      dispatch.soketService.init({});
    }
  }, [personalInfo.id]);

  return (
    <div className="w-full h-full overflow-hidden">
      <SideMenu
        sideWidth={sideWidth}
        setSideWidth={setSideWidth}
        open={openSideMenu}
        setOpenSideMenu={setOpenSideMenu}
      />
      <div
        className={cls(
          'w-full h-full flex flex-col  transition-all duration-200'
        )}
        style={{
          paddingLeft: openSideMenu ? sideWidth : 0
        }}>
        <Header />
        <Content />
      </div>
      <FloatingBall className={'w-12 h-12 overflow-hidden '}>
        <div
          className="w-12 h-12 rounded-full  shadow-md cursor-pointer object-cover m-0"
          draggable="false">
          <img
            draggable="false"
            className="w-full h-full"
            src="https://vika.cn/_next/image?url=https%3A%2F%2Fs4.vika.cn%2F_next%2Fstatic%2Fmedia%2Forganization_img_vikaby_default.1176dff3.png&w=2048&q=75"
          />
        </div>
      </FloatingBall>
    </div>
  );
};

export default Layout;
