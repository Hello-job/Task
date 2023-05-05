import { ReactNode } from 'react';
import cls from 'classnames';

interface CellType {
  className?: string;
  children: ReactNode;
}

const Cell = ({ children, className = '' }: CellType) => {
  return <div className={cls('px-2', className)}>{children}</div>;
};

export default Cell;
