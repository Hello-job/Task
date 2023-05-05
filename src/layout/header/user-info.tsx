import { useState, useRef } from 'react';
import { Avatar } from '@/components';
import { useSelector } from 'react-redux';
import UserCard from './user-card';

import type { RootState } from '@/stores';

const UserInfo = () => {
  const personalInfo: any = useSelector<RootState>(
    model => model.userInfo.personalInfo
  );
  const userPopRef = useRef(null);

  const [openUserPopover, setOpenUserPopover] = useState<boolean>(false);

  return (
    <div
      ref={userPopRef}
      className="w-[30px] h-[30px] bg-skin-text-primary rounded-full relative text-skin-text-white text-center leading-3 flex items-center justify-center cursor-pointer"
      onClick={() => setOpenUserPopover(!openUserPopover)}>
      <Avatar personalInfo={personalInfo} />
      {openUserPopover ? (
        <UserCard
          personalInfo={personalInfo}
          userPopRef={userPopRef}
          setOpenUserPopover={setOpenUserPopover}
        />
      ) : null}
    </div>
  );
};

export default UserInfo;
