import { memo, useRef, useEffect } from 'react';
import HeadeCell from './header-cell';
import Sortable from 'sortablejs';

interface HeaderContentCellType {
  columns: any[];
}

const HeaderContentCell = ({ columns }: HeaderContentCellType) => {
  console.log('>>>>>>>>columns', columns);

  const [beginColumn = {}, ...otherColumn] = columns;
  const { width = 200 } = beginColumn;

  const sortHeaderCellRef = useRef(null);

  useEffect(() => {
    const sortableList = sortHeaderCellRef.current;
    if (sortableList) {
      new Sortable(sortableList, {
        animation: 150, // 拖动时的动画时长（毫秒）
        handle: '#headerCell',
        // 其他选项和回调函数可以在这里添加
        onEnd: (event: Event) => {
          console.log('>>>>>event', event);
        }
      });
    }
  }, []);
  return (
    <>
      <div
        className="border flex-shrink-0 border-solid border-baseGray h-full flex items-center text-center text-textGray px-2  sticky left-0  z-50 bg-white"
        style={{ width }}>
        {beginColumn.title}
      </div>
      <ul ref={sortHeaderCellRef} className="flex h-full">
        {otherColumn.map((item: any) => {
          return <HeadeCell key={item.name} {...item} />;
        })}
      </ul>
    </>
  );
};

export default memo(HeaderContentCell);
