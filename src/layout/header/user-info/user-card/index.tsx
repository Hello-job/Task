import { useCallback, useEffect, useState, useContext } from 'react';
import { Avatar } from '@/components';
import { useNavigate } from 'react-router-dom';
import { Storage } from '@/shared';
import SettingModal from './setting-modal';
import { parInfoContext } from '../context';
import TextInfo from './text-info';

interface UserDetailInfoType {
  userPopRef: any;
  setOpenUserPopover: (value: boolean) => void;
}

function UserCard({ setOpenUserPopover, userPopRef }: UserDetailInfoType) {
  const navigate = useNavigate();
  const { personalInfo, onChange } = useContext(parInfoContext);
  const [open, setOpen] = useState(false);

  const handleMOuseDown = useCallback(
    (e: MouseEvent) => {
      if (open) return;
      setOpenUserPopover(userPopRef?.current?.contains(e.target));
    },
    [open, userPopRef, setOpenUserPopover]
  );

  useEffect(() => {
    if (!userPopRef) return;
    window.removeEventListener('mousedown', handleMOuseDown);
    window.addEventListener('mousedown', handleMOuseDown);
    return () => {
      window.removeEventListener('mousedown', handleMOuseDown);
    };
  }, [open, handleMOuseDown, userPopRef]);

  const handleExitLogin = () => {
    Storage.local.clear();
    navigate('/login', { replace: true });
  };

  return (
    <div
      className="w-80 userInfo rounded-md overflow-hidden absolute top-8 right-0 shadow-md z-10 bg-skin-bg-base"
      onClick={e => {
        e.stopPropagation();
      }}>
      <div className="h-[128px] bg-skin-text-primary px-8 py-6 flex">
        <div className="w-12 h-12   rounded-full overflow-hidden mr-5 ">
          <div className="w-12 h-12 relative overflow-hidden group">
            <Avatar
              personalInfo={personalInfo}
              className="text-[20px] bg-amber-200"
            />
            <div
              className="absolute top-0 z-10 hidden w-full h-full bg-transparenBlack text-skin-text-white text-lg leading-10 group-hover:block"
              onClick={() => {
                setOpen(true);
              }}></div>
          </div>
        </div>
        <div className="flex-1 text-left">
          <div className="text-lg text-skin-text-white mb-1">
            <TextInfo
              style={{ color: 'white' }}
              text={personalInfo.name}
              fieldKey="name"
              className="text-white"
              onChange={onChange}
            />
          </div>
          <div className="text-sm text-skin-text-white text-left flex items-center">
            <div className="mr-2 font-normal flex-shrink-0">签名:</div>
            <TextInfo
              style={{ color: 'white' }}
              text={personalInfo.desc}
              fieldKey="desc"
              className="text-white flex-1"
              onChange={onChange}
            />
          </div>
        </div>
      </div>
      <div className="bg-skin-bg-base pt-4 px-6 pb-8">
        <h4 className=" text-textGray text-left">个人信息</h4>
        <div className="flex items-center mt-4 text-sm">
          <span className="text-textGray w-[72px] text-left mr-2">手机号</span>
          <span className=" text-skin-text-base">
            <TextInfo
              text={personalInfo.phone}
              fieldKey="phone"
              onChange={onChange}
            />
          </span>
        </div>
        <div className="flex items-center mt-4 text-sm">
          <span className="text-textGray w-[72px] text-left mr-2">
            电子邮箱
          </span>
          <span className=" text-skin-text-base">
            <TextInfo
              text={personalInfo.email}
              fieldKey="email"
              onChange={onChange}
            />
          </span>
        </div>
      </div>
      <div className=" bg-skin-bg-base py-4 px-2 flex items-center justify-around text-textGray">
        <div className="border-0 border-r border-solid border-textGray flex-1 inline-block text-center cursor-pointer">
          个人设置
        </div>
        <div
          className="  flex-1 inline-block text-center  cursor-pointer"
          onClick={handleExitLogin}>
          退出登陆
        </div>
      </div>
      <SettingModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default UserCard;
