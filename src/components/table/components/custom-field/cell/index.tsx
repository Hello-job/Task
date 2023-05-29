import { ReactNode } from 'react';
import cls from 'classnames';

interface CellType {
  className?: string;
  children: ReactNode;
}

const Cell = ({ children, className = '' }: CellType) => {
  return (
    <div
      className={cls(
        'px-2 w-full h-full text-left flex flex-col justify-center text-sm text-[#3c4152]',
        className
      )}>
      {children}
    </div>
  );
};

export default Cell;
