import { useCallback, useState, useEffect } from 'react';
import Table from '@/components/table';
import KanbanView from '@/components/kanban';
import type { ColumnType } from '@/types';
import type { rowItemType } from './data';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '@/stores';
import { defaultColumns } from '@/stores/project/data';
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
  }, [id, dispatch.project]);

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
    ({ type, column, newColumns }: operationColumnType) => {
      switch (type) {
        case 'add': {
          dispatch.project.createColumn({ projectId: id, ...column });
          break;
        }
        case 'sort': {
          newColumns && dispatch.project.setColumns([...newColumns]);
        }
      }
    },
    [id, dispatch.project]
  );

  return (
    <div className="w-full h-full bg-skin-bg-base rounded-sm flex flex-col p-5">
      <KanbanView />
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
