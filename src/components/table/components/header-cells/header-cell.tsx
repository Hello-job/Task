import { memo } from 'react';

import type { ColumnType } from '@/stores/project/types';

const HeadeCell = ({ width = 200, name, title }: ColumnType) => {
  return (
    <li
      id="headerCell"
      key={name}
      className="border-solid border-l-0 border-t border-b border-r border-baseGray text-textGray h-full flex items-center px-2"
      style={{ width }}>
      {title}
    </li>
  );
};

export default memo(HeadeCell);
