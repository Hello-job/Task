import { useContext, useMemo } from 'react';
import cls from 'classnames';
import { TableContentContext } from '../../table-content/context';
import type { rowDataType, ColumnType } from '@/stores/project/types';
import type { ReactNode } from 'react';

import type { MouseEvent } from 'react';

interface CellType {
  className?: string;
  children: ReactNode;
  rowItem: rowDataType;
  mouseDown?: boolean;
  mouseCells?: rowDataType[];
  column: ColumnType;
  setMouseCells?: (params: rowDataType[]) => void;
  setMouseDown?: (params: boolean) => void;
  onRightCellClick: (e: MouseEvent<HTMLDivElement>, row: rowDataType) => void;
}

const Cell = ({
  children,
  className = '',
  rowItem,
  column,
  onRightCellClick
}: CellType) => {
  const { selectedRange, setSelectedRange, mouseDown, setMouseDown }: any =
    useContext(TableContentContext);

  const handleonMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setMouseDown && setMouseDown(true);
    setSelectedRange({
      ...selectedRange,
      startRange: {
        x: column.index,
        y: rowItem.index
      }
    });
  };

  const handleonMouseEnter = () => {
    if (mouseDown) {
      setSelectedRange({
        ...selectedRange,
        endRange: {
          x: column.index,
          y: rowItem.index
        }
      });
    }
  };

  const isSelectedRange = useMemo(() => {
    const startRange = selectedRange.startRange;
    const endRange = selectedRange.endRange;

    if (
      Object.values(startRange).some(item => item === void 0) &&
      !Object.values(endRange).some(item => item === void 0)
    ) {
      return endRange.x === column.index && endRange.y === rowItem.index;
    }
    const [minX, maxX] = [startRange.x, endRange.x].sort();
    const [minY, maxY] = [startRange.y, endRange.y].sort();
    const isXRange = minX <= column.index && column.index <= maxX;
    const isYrange = minY <= rowItem.index && rowItem.index <= maxY;

    return isXRange && isYrange;
  }, [selectedRange, column, rowItem]);

  return (
    <div
      onMouseDown={handleonMouseDown}
      onMouseEnter={handleonMouseEnter}
      className={cls(
        'px-2 w-full h-full text-left flex flex-col justify-center text-sm text-[#3c4152] border-2 cursor-pointer border-solid border-transparent focus-within:border-2 focus-within:border-solid focus-within:border-violet',
        className,
        {
          ' bg-violetMask': isSelectedRange
        }
      )}
      onContextMenu={(e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        onRightCellClick(e, rowItem);
      }}>
      {children}
    </div>
  );
};

export default Cell;
