import HeaderCells from './components/header-cells';
import TableContent from './components/table-content';
import useThRender from './hooks/useThRender';
import type { TableProps } from './interface';

const Table = ({
  columns,
  visibleList,
  onChange,
  setVisibleList
}: TableProps) => {
  const { addThRender } = useThRender();
  return (
    <div>
      <HeaderCells columns={columns} addThRender={addThRender} />
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
