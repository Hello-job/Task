import { memo } from 'react';

import type { personalInfoType } from '@/stores/userInfo';

import cls from 'classnames';

interface AvatarType {
  personalInfo?: personalInfoType;
  className?: string;
}

const Avatar = ({ personalInfo, className }: AvatarType) => {
  return (
    <div
      className={cls(
        'w-full h-full flex items-center justify-center text-sm overflow-hidden rounded-full shadow-md',
        className
      )}>
      {personalInfo?.avatar ? (
        <img
          className="w-full h-full object-cover"
          src={personalInfo?.avatar}
        />
      ) : (
        <span className=" break-normal">
          {personalInfo?.user_name?.slice(1)}
        </span>
      )}
    </div>
  );
};

export default memo(Avatar);
