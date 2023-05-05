import { memo, useMemo } from 'react';

import type { ColumnType } from './interface';

interface HeaderType {
  columns: ColumnType[];
}

const Header = ({ columns }: HeaderType) => {
  const HeaderLeft = () => {
    const { width } = columns[0];
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

  const headerColumns = useMemo(() => {
    return columns.slice(1);
  }, [columns]);

  return (
    <div className="w-full flex items-center h-[37px]">
      <HeaderLeft />
      <ul className="flex h-full">
        {headerColumns.map((item: any) => {
          return <HeaderContentItem key={item.name} {...item} />;
        })}
      </ul>
    </div>
  );
};

export default memo(Header);
