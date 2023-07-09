import { useCallback, useState, useEffect } from 'react';
import Table from '@/components/table';
import type { ColumnType } from '@/stores/project/types';
import type { rowItemType } from './data';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '@/stores';
import type { operationColumnType } from './interface';
import { useParams } from 'react-router-dom';

interface onChangeRow {
  column: ColumnType;
  rowItem: rowItemType;
  value: any;
}

const ProjectOverView = () => {
  const { id } = useParams();
  const dispatch = useDispatch<Dispatch>();
  const columns = useSelector((state: RootState) => state.project.columns);
  const dataSource = useSelector(
    (state: RootState) => state.project.dataSource
  );

  const [visibleList, setVisibleList] = useState(dataSource);

  useEffect(() => {
    if (!id) return;
    dispatch.project.getColumns({ id: Number(id) });
  }, [id]);

  const onRowChange = useCallback(
    ({ column, rowItem, value }: onChangeRow) => {
      visibleList.find(item => {
        if (item.id === rowItem.id) {
          rowItem[column.name] = value;
        }
      });
      setVisibleList([...visibleList]);
    },
    [visibleList]
  );

  const handleColumnsAction = useCallback(
    ({ type, column }: operationColumnType) => {
      switch (type) {
        case 'add': {
          const newColumns = columns.push(column);
          dispatch.project.setColumns(newColumns);
          break;
        }
      }
    },
    [columns]
  );

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
        onRowChange={onRowChange}
        setVisibleList={setVisibleList}
        handleColumnsAction={handleColumnsAction}
      />
    </div>
  );
};

export default ProjectOverView;
