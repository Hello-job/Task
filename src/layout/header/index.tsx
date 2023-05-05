import UserInfo from './user-info';
import ThemeSwitch from './theme-switch';

const Header = () => {
  return (
    <div className="w-full py-2 px-5 h-[50px] border-0 border-b border-solid border-[#e9e9f5] bg-skin-bg-base flex justify-end items-center">
      {/* 主题切换 */}
      <ThemeSwitch />
      {/* 个人信息 */}
      <UserInfo />
    </div>
  );
};

export default Header;
