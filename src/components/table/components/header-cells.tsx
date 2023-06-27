import { ReactNode, memo, useRef, useState, useLayoutEffect } from 'react';
import Sortable from 'sortablejs';
import type { ColumnType } from '@/stores/application/types';
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
  const sortHeaderCellRef = useRef(null);
  const [beginColumn, ...otherColumn] = columns;
  const onCloseFieldSetting = () => {
    setOperationColumn(null);
  };

  useLayoutEffect(() => {
    const sortableList = sortHeaderCellRef.current;
    if (sortableList) {
      const sortable = new Sortable(sortableList, {
        animation: 150, // 拖动时的动画时长（毫秒）
        handle: '#headerCell',
        // 其他选项和回调函数可以在这里添加
        onEnd: (event: Event) => {
          console.log('>>>>>event', event);
        }
      });
    }
  }, []);

  const HeaderLeft = () => {
    const { width } = beginColumn;
    return (
      <div
        className="border border-solid border-baseGray h-full flex items-center text-center text-textGray px-2"
        style={{ width }}>
        {columns[0].label}
      </div>
    );
  };

  const HeaderContentItem = (item: ColumnType) => {
    const { width } = item;
    return (
      <li
        id="headerCell"
        key={item.name}
        className="border-solid border-l-0 border-t border-b border-r border-baseGray text-textGray h-full flex items-center px-2"
        style={{ width }}>
        {item.label}
      </li>
    );
  };

  const HeaderCell = () => {
    return (
      <ul ref={sortHeaderCellRef} className="flex h-full">
        {otherColumn.map((item: any) => {
          return <HeaderContentItem key={item.name} {...item} />;
        })}
      </ul>
    );
  };

  const AddHeaderCell = () => {
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
            onClose: onCloseFieldSetting,
            handleColumnsAction
          })}
      </div>
    );
  };

  return (
    <div className="w-full flex items-center h-[37px] text-sm">
      <HeaderLeft />
      <HeaderCell />
      <AddHeaderCell />
    </div>
  );
};

export default memo(HeaderCells);
