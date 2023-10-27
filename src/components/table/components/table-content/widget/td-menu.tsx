import { memo, useEffect, useRef } from 'react';
import type { RowDataType } from '@/types';
import type { ReturnProps } from '../hooks/useRowOperationFns';

interface MenuClick {
  onAddUpRecord: ReturnProps['addUpRecord'];
  onAddDownRecord: ReturnProps['addDownRecord'];
  onDeleteRecord: ReturnProps['deleteRecord'];
}

interface FixLeftCellRightMenuType extends MenuClick {
  menuPosition: {
    x: number;
    y: number;
  };
  menuRow: RowDataType;
  onClose: () => void;
}

const TdMenu = ({
  menuRow,
  menuPosition,
  onAddUpRecord,
  onAddDownRecord,
  onDeleteRecord,
  onClose
}: FixLeftCellRightMenuType) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      event.stopPropagation();
      if (!menuRef.current?.contains(event.target as Node)) {
        onClose();
      }
    };
    window.addEventListener('mouseup', handleMouseDown);

    return () => {
      window.removeEventListener('mouseup', handleMouseDown);
    };
  }, []);

  return (
    <>
      {
        <div
          ref={menuRef}
          className="fixed z-[1000] rounded-md shadow-base bg-white py-2 px-1 text-sm text-textGray"
          style={{
            top: menuPosition.y,
            left: menuPosition.x
          }}>
          <div
            className="py-1 px-2 cursor-pointer hover:bg-grayCustom"
            onClick={() =>
              onAddUpRecord({
                rowItem: menuRow,
                rowData: { id: 2, title: '', index: 1, type: 'add' }
              })
            }>
            上方插入行
          </div>
          <div
            className="py-1 px-2  cursor-pointer hover:bg-grayCustom"
            onClick={() =>
              onAddDownRecord({
                rowItem: menuRow,
                rowData: { id: 1, title: '', index: 1, type: 'add' }
              })
            }>
            下方插入行
          </div>
          <div
            className="py-1 px-2  cursor-pointer hover:bg-grayCustom"
            onClick={() => {
              onDeleteRecord({ rowItem: menuRow });
            }}>
            删除行
          </div>
        </div>
      }
    </>
  );
};

export default memo(TdMenu);
