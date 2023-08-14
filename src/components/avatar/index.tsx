import { memo } from 'react';

import type { CSSProperties } from 'react';

import type { personalInfoType } from '@/stores/userInfo';

import cls from 'classnames';

interface AvatarType {
  personalInfo?: personalInfoType;
  className?: string;
  style?: CSSProperties;
}

const Avatar = ({ personalInfo, className, style = {} }: AvatarType) => {
  const color = personalInfo?.color;
  return (
    <div
      style={color ? { backgroundColor: color, ...style } : style}
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
        <span className="break-normal text-white">
          {personalInfo?.name?.slice(0, 2)}
        </span>
      )}
    </div>
  );
};

export default memo(Avatar);
