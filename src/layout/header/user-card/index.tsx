import { useCallback, useEffect, useState } from 'react';
import { Input } from 'antd';
import { Icon, Avatar } from '@/components';
import { useNavigate } from 'react-router-dom';
import { Storage } from '@/shared';
import SettingModal from './setting-modal';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/stores';

interface UserDetailInfoType {
  personalInfo: any;
  userPopRef: any;
  setOpenUserPopover: (value: boolean) => void;
}

function UserCard({
  setOpenUserPopover,
  userPopRef,
  personalInfo
}: UserDetailInfoType) {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();
  const [open, setOpen] = useState(false);
  const [editNameOpen, setEditNameOpen] = useState(false);

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
      <div className="h-[128px] bg-skin-text-primary px-8 py-6 flex items-center">
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
        <div>
          <div className=" text-lg text-skin-text-white mb-1">
            {editNameOpen ? (
              <Input
                defaultValue={personalInfo.name}
                autoFocus
                onBlur={e => {
                  dispatch.userInfo.updateUserInfo({
                    name: e.target.value
                  });
                  setEditNameOpen(false);
                }}
              />
            ) : (
              <>
                <span className="mr-2">{personalInfo.name}</span>
                <Icon
                  type="icondetails_edit"
                  onClick={() => setEditNameOpen(true)}
                />
              </>
            )}
          </div>
          <div className="text-sm text-skin-text-white text-left">
            备注:
            {personalInfo.desc || <span className="ml-2">暂无</span>}
          </div>
        </div>
      </div>
      <div className="bg-skin-bg-base pt-4 px-6 pb-8">
        <h4 className=" text-textGray text-left">个人信息</h4>
        <div className="flex items-center mt-4 text-sm">
          <span className="text-textGray w-[72px] text-left mr-2">手机号</span>
          <span className=" text-skin-text-base">
            {personalInfo.phone || <span className="text-violet">暂无</span>}
          </span>
        </div>
        <div className="flex items-center mt-4 text-sm">
          <span className="text-textGray w-[72px] text-left mr-2">
            电子邮箱
          </span>
          <span className=" text-skin-text-base">
            {personalInfo.email || <span className="text-violet">暂无</span>}
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
      <SettingModal open={open} setOpen={setOpen} personalInfo={personalInfo} />
    </div>
  );
}

export default UserCard;
