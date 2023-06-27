import { useState } from 'react';
import Table from '@/components/table';
import type { ColumnType } from '@/stores/application/types';
import type { rowItemType } from './data';

interface onChangeRow {
  column: ColumnType;
  rowItem: rowItemType;
  value: any;
}
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '@/stores';
import type { operationColumnType } from './interface';

const ProjectOverView = () => {
  const dispatch = useDispatch<Dispatch>();
  const columns = useSelector((state: RootState) => state.project.columns);
  const dataSource = useSelector(
    (state: RootState) => state.project.dataSource
  );

  const [visibleList, setVisibleList] = useState(dataSource);

  const onChange = ({ column, rowItem, value }: onChangeRow) => {
    visibleList.find(item => {
      if (item.id === rowItem.id) {
        rowItem[column.name] = value;
      }
    });
    setVisibleList([...visibleList]);
  };

  const handleColumnsAction = ({ type, column }: operationColumnType) => {
    switch (type) {
      case 'add': {
        const newColumns = columns.push(column);
        dispatch.project.setColumns(newColumns);
        break;
      }
    }
  };

  return (
    <div className="w-full h-full bg-skin-bg-base rounded-sm flex flex-col p-5">
      {/* <VritualList
        itemSize={40}
        ListData={listData}
        bufferScale={1}
        columns={columns}></VritualList> */}
      <Table
        columns={columns}
        visibleList={visibleList}
        onChange={onChange}
        setVisibleList={setVisibleList}
        handleColumnsAction={handleColumnsAction}
      />
    </div>
  );
};

export default ProjectOverView;
