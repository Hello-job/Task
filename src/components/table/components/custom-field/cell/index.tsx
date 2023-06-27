import type { ReactNode } from 'react';
import cls from 'classnames';
import type { rowDataType } from '@/stores/application/types';

import type { MouseEvent } from 'react';

interface CellType {
  className?: string;
  children: ReactNode;
  rowItem: rowDataType;
  mouseDown?: boolean;
  mouseCells?: rowDataType[];
  setMouseCells?: (params: rowDataType[]) => void;
  setMouseDown?: (params: boolean) => void;
  handleContextMenu: (e: MouseEvent<HTMLDivElement>, row: rowDataType) => void;
}

const Cell = ({
  children,
  className = '',
  rowItem,
  mouseDown,
  mouseCells,
  setMouseCells,
  setMouseDown,
  handleContextMenu
}: CellType) => {
  return (
    <div
      onMouseDown={e => {
        e.stopPropagation();
        e.preventDefault();
        setMouseDown && setMouseDown(true);
        console.log('>>>>>>按下');
      }}
      onMouseEnter={() => {
        console.log('>>>>>>>进入了单元格', mouseDown);
        if (mouseDown) {
          console.log('>>>>>>>进入了单元格');
          if (mouseCells && setMouseCells) {
            if (mouseCells.some(item => item.id === rowItem.id)) {
              const newMouseCells = mouseCells.filter(
                item => item.id !== rowItem.id
              );
              setMouseCells(newMouseCells);
              return;
            }

            setMouseCells([...mouseCells, rowItem]);
          }
        }
      }}
      className={cls(
        'px-2 w-full h-full text-left flex flex-col justify-center text-sm text-[#3c4152] border-2 cursor-pointer border-solid border-transparent focus-within:border-2 focus-within:border-solid focus-within:border-violet',
        className,
        {
          'bg-violet2': mouseCells?.some(item => item.id === rowItem.id)
        }
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
