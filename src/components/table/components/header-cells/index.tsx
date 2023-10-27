import { ReactNode, memo, useCallback, useState } from 'react';
import AddHeaderCell from './add-header-cell';
import HeaderContentCell from './header-content-cell';
import type { ColumnType } from '@/types';
import type { operationColumnType } from '@/view/project-overview/interface';

interface HeaderType {
  columns: ColumnType[];
  addThRender: (params: any) => ReactNode;
  handleColumnsAction: (params: operationColumnType) => void;
}

const HeaderCells = ({
  columns,
  addThRender,
  handleColumnsAction
}: HeaderType) => {
  const [operationColumn, setOperationColumn] = useState<string | null>(null);
  const onCloseFieldSetting = useCallback(() => {
    setOperationColumn(null);
  }, []);

  return (
    <div className="w-full flex items-center h-[37px] text-sm">
      <HeaderContentCell
        columns={columns}
        handleColumnsAction={handleColumnsAction}
      />
      <AddHeaderCell
        columns={columns}
        operationColumn={operationColumn}
        setOperationColumn={setOperationColumn}
        addThRender={addThRender}
        onCloseFieldSetting={onCloseFieldSetting}
        handleColumnsAction={handleColumnsAction}
      />
    </div>
  );
};

export default memo(HeaderCells);
