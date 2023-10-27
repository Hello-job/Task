import { memo, useRef, useEffect, useCallback, useState } from 'react';
import Sortable from 'sortablejs';
import type { SortableEvent } from 'sortablejs';
import type { ColumnType } from '@/types';
import type { operationColumnType } from '@/view/project-overview/interface';
import { move } from 'lodash';
import Cell from './cell';

interface HeaderContentCellType {
  columns: ColumnType[];
  handleColumnsAction: (params: operationColumnType) => void;
}

// 从旧位置删除元素并插入到新位置
const arrSort = (dataList: any[], oldIndex: number, newIndex: number) => {
  const list = dataList.slice();
  const elementToMove = list.splice(oldIndex, 1)[0];
  list.splice(newIndex, 0, elementToMove);
  return list;
};
const HeaderContentCell = ({
  columns,
  handleColumnsAction
}: HeaderContentCellType) => {
  const [beginColumn = {}, ...otherColumn] = columns;
  const columnsRef = useRef(columns);
  const sortHeaderCellRef = useRef(null);
  const onEnd = (event: SortableEvent) => {
    const { newIndex, oldIndex } = event;
    if (newIndex === void 0 || oldIndex === void 0) return;
    const [, ...remainColumn] = columnsRef.current;

    const newColumns = arrSort(remainColumn, oldIndex, newIndex);
    const data: any = [beginColumn, ...newColumns];

    handleColumnsAction({
      type: 'sort',
      newColumns: data
    });
  };

  useEffect(() => {
    columnsRef.current = columns;
  }, [columns]);

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
  }, []);

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
