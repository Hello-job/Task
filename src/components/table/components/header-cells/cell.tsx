import { memo } from 'react';
import cls from 'classnames';
import type { MouseEventHandler, CSSProperties } from 'react';

import type { ColumnType } from '@/types';

interface CellProps {
  children: React.ReactNode;
  column: ColumnType;
  className?: string;
  style?: CSSProperties;
}
const Cell = ({ children, className, style, column }: CellProps) => {
  const { width = 200 } = column;
  const onContextMenu: MouseEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    console.log('>>>>>>右击');
  };
  return (
    <div
      id="headerCell"
      style={{ width, ...style }}
      onContextMenu={onContextMenu}
      className={cls(
        'border-solid border-l-0 border-t border-b border-r border-baseGray text-textGray h-full flex items-center px-2',
        className
      )}>
      {children}
    </div>
  );
};

export default memo(Cell);
