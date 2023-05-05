import { useEffect, useMemo, useState } from 'react';
import cls from 'classnames';
import { Icon, ColResize } from '@/components';
import sideMenuRouters from '@/router/side-menu';
import { useNavigate, useLocation } from 'react-router-dom';
import type { RouterItemType } from '@/router/index.type';

interface SideMenuProps {
  open: boolean;
  sideWidth: number;
  setSideWidth: (value: number) => void;
  setOpenSideMenu: (value: boolean) => void;
}

const SideMenu = ({
  open,
  sideWidth,
  setSideWidth,
  setOpenSideMenu
}: SideMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeMenu, setActiveMenu] = useState('/project');
  const sideMenuList = useMemo(() => {
    return sideMenuRouters.filter(item => {
      return item.meta.side;
    });
  }, [sideMenuRouters]);

  const handleMenuClick = (menu: RouterItemType) => {
    setActiveMenu(menu.path);
    navigate(menu.path);
  };

  useEffect(() => {
    if (location.pathname) {
      setActiveMenu(location.pathname);
    }
  }, []);

  return (
    <div
      className={cls(
        'h-full bg-skin-bg-base fixed   transition-all duration-200 linear border-0 border-r border-solid border-[#e9e9f5]'
      )}
      style={{
        width: sideWidth,
        left: open ? 0 : -sideWidth + 'px'
      }}>
      {/* 收缩 */}
      <div
        className={cls(
          'w-5 h-5 absolute z-10 -right-6 top-4 rounded-full bg-skin-bg-base text-center text-[#8d91b2] shadow-md cursor-pointer',
          {
            '-translate-x-3': open
          }
        )}
        onClick={() => setOpenSideMenu(!open)}>
        <Icon type={open ? 'iconfront1' : 'iconpostposition'} />
      </div>
      <div className="w-full h-full">
        <div className="h-[50px] bg-skin-text-primary"></div>
        <div className="p-2 text-skin-text-base">
          {sideMenuList.map(menu => {
            return (
              <div
                key={menu.path}
                className={cls(
                  'rounded-md p-2 hover:bg-grayCustom text-sm flex items-center cursor-pointer',
                  {
                    'bg-skin-text-primary2 text-violet hover:bg-skin-text-primary2':
                      activeMenu === menu.path
                  }
                )}
                style={{
                  backgroundColor: ''
                }}
                onClick={() => handleMenuClick(menu)}>
                <Icon type="iconattribute" />
                <span className="ml-2.5">{menu.meta.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      <ColResize
        minWidth={200}
        maxWidth={400}
        onChange={width => setSideWidth(width)}
      />
    </div>
  );
};

export default SideMenu;
