import { memo } from 'react';
import type { ReactNode } from 'react';
import type { ColumnType } from '@/types';

interface AddHeaderCellType {
  columns: ColumnType[];
  operationColumn: string | null;
  setOperationColumn: (type: string) => void;
  addThRender: (params: any) => ReactNode;
  onCloseFieldSetting: (params: any) => void;
  handleColumnsAction: (params: any) => void;
}

const AddHeaderCell = ({
  columns,
  operationColumn,
  addThRender,
  setOperationColumn,
  onCloseFieldSetting,
  handleColumnsAction
}: AddHeaderCellType) => {
  return (
    <div
      className="relative border border-solid border-baseGray h-full flex items-center justify-center cursor-pointer text-center text-textGray px-2"
      style={{ width: '40px' }}
      onClick={() => {
        setOperationColumn('add');
      }}>
      +
      {operationColumn &&
        addThRender({
          type: 'add',
          columns,
          onClose: onCloseFieldSetting,
          handleColumnsAction
        })}
    </div>
  );
};

export default memo(AddHeaderCell);
