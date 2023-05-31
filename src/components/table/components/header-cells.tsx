import { ReactNode, memo, useState } from 'react';

import type { ColumnType } from '@/stores/application/types';

interface HeaderType {
  columns: ColumnType[];
  addThRender: (params: any) => ReactNode;
}

const HeaderCells = ({ columns, addThRender }: HeaderType) => {
  const [operationColumn, setOperationColumn] = useState<string | null>(null);
  const [beginColumn, ...otherColumn] = columns;
  const onCloseFieldSetting = () => {
    setOperationColumn(null);
  };
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
        key={item.name}
        className="border-solid border-l-0 border-t border-b border-r border-baseGray text-textGray h-full flex items-center px-2"
        style={{ width }}>
        {item.label}
      </li>
    );
  };

  const HeaderCell = () => {
    return (
      <ul className="flex h-full">
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
            onClose: onCloseFieldSetting
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
