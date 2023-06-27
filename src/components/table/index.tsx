import HeaderCells from './components/header-cells';
import TableContent from './components/table-content';
import useThRender from './hooks/useThRender';

import type { ColumnType, rowDataType } from '@/stores/application/types';
import type { operationColumnType } from '@/view/project-overview/interface';

export interface TableProps {
  columns: ColumnType[];
  visibleList: rowDataType[];
  onChange: any;
  setVisibleList: (params: any) => void;
  handleColumnsAction: (params: operationColumnType) => void;
}

const Table = ({
  columns,
  visibleList,
  onChange,
  setVisibleList,
  handleColumnsAction
}: TableProps) => {
  const { addThRender } = useThRender();
  return (
    <div>
      <HeaderCells
        columns={columns}
        addThRender={addThRender}
        handleColumnsAction={handleColumnsAction}
      />
      <TableContent
        columns={columns}
        visibleList={visibleList}
        onChange={onChange}
        setVisibleList={setVisibleList}
      />
    </div>
  );
};

export default Table;
