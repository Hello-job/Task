import { memo, useRef, useEffect, useCallback } from 'react';
import Sortable from 'sortablejs';
import type { SortableEvent } from 'sortablejs';
import type { ColumnType } from '@/types';
import type { operationColumnType } from '@/view/project-overview/interface';
import Cell from './cell';

interface HeaderContentCellType {
  columns: ColumnType[];
  handleColumnsAction: (params: operationColumnType) => void;
}

const arrSort = (dataList: any[], oldIndex: number, newIndex: number) => {
  const list = dataList.slice();
  const oldItem = list[oldIndex];
  list.splice(oldIndex, 1);
  list.splice(newIndex, 0, oldItem);
  return list;
};

const HeaderContentCell = ({
  columns,
  handleColumnsAction
}: HeaderContentCellType) => {
  const [beginColumn = {}, ...otherColumn] = columns;

  const sortHeaderCellRef = useRef(null);
  const onEnd = useCallback(
    (event: SortableEvent) => {
      const { newIndex, oldIndex } = event;
      if (newIndex === void 0 || oldIndex === void 0) return;
      const [, ...remainColumn] = columns;
      const newColumns = arrSort(remainColumn, oldIndex, newIndex);
      const data: any = [beginColumn, ...newColumns];

      handleColumnsAction({
        type: 'sort',
        newColumns: data
      });
    },
    [beginColumn, columns, handleColumnsAction]
  );

  useEffect(() => {
    const sortableList = sortHeaderCellRef.current;
    if (sortableList) {
      new Sortable(sortableList, {
        animation: 150, // 拖动时的动画时长（毫秒）
        handle: '#headerCell',
        // 其他选项和回调函数可以在这里添加
        onEnd
      });
    }
  }, [sortHeaderCellRef, onEnd]);

  return (
    <>
      <Cell
        className="sticky left-0  z-50 bg-white"
        column={beginColumn as ColumnType}>
        {(beginColumn as ColumnType).title}
      </Cell>
      <div ref={sortHeaderCellRef} className="flex h-full">
        {otherColumn.map((item: any) => {
          return (
            <Cell key={item.name} column={item}>
              {item.title}
            </Cell>
          );
        })}
      </div>
    </>
  );
};

export default memo(HeaderContentCell);
