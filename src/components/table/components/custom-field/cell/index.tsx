import { ReactNode } from 'react';
import cls from 'classnames';
import type { rowDataType } from '@/stores/application/types';

import type { MouseEvent } from 'react';

interface CellType {
  className?: string;
  children: ReactNode;
  rowItem: rowDataType;
  handleContextMenu: (e: MouseEvent<HTMLDivElement>, row: rowDataType) => void;
}

const Cell = ({
  children,
  className = '',
  rowItem,
  handleContextMenu
}: CellType) => {
  return (
    <div
      className={cls(
        'px-2 w-full h-full text-left flex flex-col justify-center text-sm text-[#3c4152] border-2 cursor-pointer border-solid border-transparent focus-within:border-2 focus-within:border-solid focus-within:border-violet',
        className
      )}
      onContextMenu={(e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleContextMenu(e, rowItem);
      }}>
      {children}
    </div>
  );
};

export default Cell;
