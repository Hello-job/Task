import { useState, useRef, useCallback } from 'react';
import { Avatar } from '@/components';
import { useSelector, useDispatch } from 'react-redux';
import UserCard from './user-card';
import { PersonalInfoProvider } from './context';
import type { UpdateValue } from './context';

import type { RootState, Dispatch } from '@/stores';

const UserInfo = () => {
  const dispatch = useDispatch<Dispatch>();
  const personalInfo: any = useSelector<RootState>(
    model => model.userInfo.personalInfo
  );
  const userPopRef = useRef(null);
  const [openUserPopover, setOpenUserPopover] = useState<boolean>(false);

  const handlePersonalInfo = useCallback((value: Partial<UpdateValue>) => {
    dispatch.userInfo.updateUserInfo(value);
  }, []);

  const handleUpdateField = useCallback(async (file: any) => {
    return await dispatch.uploadFile.uploadFile({
      file: file.originFileObj
    });
  }, []);

  return (
    <PersonalInfoProvider
      props={{
        personalInfo,
        onChange: handlePersonalInfo,
        onUpdateField: handleUpdateField
      }}>
      <div
        ref={userPopRef}
        className="w-[30px] h-[30px] bg-skin-text-primary rounded-full relative text-skin-text-white text-center leading-3 flex items-center justify-center cursor-pointer"
        onClick={() => setOpenUserPopover(!openUserPopover)}>
        <Avatar personalInfo={personalInfo} />
        {openUserPopover ? (
          <UserCard
            userPopRef={userPopRef}
            setOpenUserPopover={setOpenUserPopover}
          />
        ) : null}
      </div>
    </PersonalInfoProvider>
  );
};

export default UserInfo;
