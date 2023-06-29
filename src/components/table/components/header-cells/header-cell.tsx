import { memo } from 'react';

import type { ColumnType } from '@/stores/project/types';

const HeadeCell = ({ width, name, label }: ColumnType) => {
  return (
    <li
      id="headerCell"
      key={name}
      className="border-solid border-l-0 border-t border-b border-r border-baseGray text-textGray h-full flex items-center px-2"
      style={{ width }}>
      {label}
    </li>
  );
};

export default memo(HeadeCell);
