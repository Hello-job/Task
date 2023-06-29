import HeaderCells from './components/header-cells';
import TableContent from './components/table-content';
import useThRender from './hooks/useThRender';

import type { ColumnType, rowDataType } from '@/stores/project/types';
import type { operationColumnType } from '@/view/project-overview/interface';

export interface TableProps {
  columns: ColumnType[];
  visibleList: rowDataType[];
  onRowChange: any;
  setVisibleList: (params: any) => void;
  handleColumnsAction: (params: operationColumnType) => void;
}

const Table = ({
  columns,
  visibleList,
  onRowChange,
  setVisibleList,
  handleColumnsAction
}: TableProps) => {
  const { addThRender } = useThRender();
  return (
    <div className="overflow-auto h-full">
      <HeaderCells
        columns={columns}
        addThRender={addThRender}
        handleColumnsAction={handleColumnsAction}
      />
      <TableContent
        columns={columns}
        visibleList={visibleList}
        onRowChange={onRowChange}
        setVisibleList={setVisibleList}
      />
    </div>
  );
};

export default Table;
