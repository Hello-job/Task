import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useLayoutEffect,
  useCallback
} from 'react';
import type { ColumnType } from '@/stores/project/types';
import { formWidget } from './config';

interface VritualListProps {
  itemSize: number; // 行高
  ListData: any[]; // 数据源
  bufferScale: number; // 缓冲比例
  columns: ColumnType[];
}

const VritualList = ({
  itemSize,
  ListData,
  bufferScale,
  columns
}: VritualListProps) => {
  // 当前区域可显示数量
  const [showCount, setShowCount] = useState(0);

  // 起止位置
  const [start, setStart] = useState<number>(0);

  // 截至位置
  const [end, setEnd] = useState<number>(0);

  // 可视区域位置dom
  const listDomRef = useRef<HTMLDivElement>(null);

  // 列表总高度
  const listHeightRef = useRef<HTMLDivElement>(null);

  // 显示项目
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 可视区域位置高度
    const listDomHeight = listDomRef?.current?.clientHeight || 0;
    const _showCount = Math.ceil(listDomHeight / itemSize);
    setEnd(_showCount);
    setShowCount(51);
  }, [listDomRef]);

  // 初始化默认高度
  const opsitions = useMemo(() => {
    return ListData.map((item, index) => {
      return {
        index,
        top: index * itemSize,
        bottom: (index + 1) * itemSize,
        height: itemSize
      };
    });
  }, [ListData]);

  // 上面的缓冲值
  const aboveCount = useMemo(() => {
    return Math.min(start, bufferScale * showCount);
  }, [start, showCount]);

  // 下面的缓冲值
  const belowCount = useMemo(() => {
    return Math.min(ListData.length - end, bufferScale * showCount);
  }, [start, end, showCount]);

  // 当前区域显示的数据
  const visibleList = useMemo(() => {
    const _start = start - aboveCount;
    const _end = end + belowCount;
    const showList = ListData.slice(_start, Math.min(_end, ListData.length));
    return showList;
  }, [start, end, aboveCount, showCount, ListData]);

  useEffect(() => {
    const height = opsitions[opsitions.length - 1].bottom;
    if (listHeightRef.current) {
      listHeightRef.current.style.height = height + 'px';
    }
  }, [
    listDomRef?.current?.clientHeight,
    opsitions,
    itemsRef.current,
    visibleList
  ]);

  const updateItemsSize = () => {
    if (itemsRef.current) {
      const items = itemsRef.current;
      const nodes = items?.childNodes;
      nodes?.forEach((node: any) => {
        const rect = node?.getBoundingClientRect();
        const index = +node.id;
        const height = rect.height;
        const oldHeight = opsitions[index].height;
        const oldValue = height - oldHeight;
        // 存在差值从新计算每个元素的高度
        if (oldValue) {
          opsitions[index].height = height;
          opsitions[index].bottom = opsitions[index].bottom + oldValue;
          for (let k = index + 1; k < opsitions.length; k++) {
            opsitions[k].top = opsitions[k - 1].bottom;
            opsitions[k].bottom = opsitions[k].bottom + oldValue;
          }
        }
      });
    }
  };

  // 获取每一项的真实高度
  useLayoutEffect(() => {
    setTimeout(() => {
      updateItemsSize();
    }, 1);
  }, [
    listDomRef?.current?.clientHeight,
    visibleList,
    opsitions,
    itemsRef.current
  ]);

  // 获取开始索引
  const getStartIndex = (scrollTop = 0) => {
    // // 方案一
    // const item = opsitions.find((item: any) => item && item.bottom > scrollTop);
    // return item?.index;

    // 方案二 使用二分法
    let start = 0;
    let end = opsitions.length - 1;
    let tempIndex = null;
    while (start <= end) {
      const midIndex = parseInt(String((start + end) / 2));
      const midBottom = opsitions[midIndex].bottom;
      // 中间项距离高度与scrollTop相等
      if (midBottom === scrollTop) {
        return midIndex + 1;
      } else if (midBottom < scrollTop) {
        start = midIndex + 1;
      } else if (midBottom > scrollTop) {
        if (tempIndex === null || tempIndex > midIndex) {
          // 存储位置
          tempIndex = midIndex;
        }
        end = end - 1;
      }
    }
    return tempIndex;
  };

  // 滚轮事件
  const onScroll = (event: any) => {
    const scrollTop = event.target.scrollTop || 0;
    const _start = getStartIndex(scrollTop) || 0;
    const _end = _start + showCount;

    setStart(_start);
    setEnd(_end);
    setStartOffset();
  };

  // 获取偏移量
  const setStartOffset = useCallback(() => {
    let _startOffset = 0;
    // 获取偏移量
    if (start >= 1) {
      const size =
        opsitions[start].top -
        (opsitions[start - aboveCount] ? opsitions[start - aboveCount].top : 0);
      _startOffset = opsitions[start - 1].bottom - size;
    }
    if (itemsRef.current) {
      itemsRef.current.style.transform = `translate3d(0,${_startOffset}px,0)`;
    }
  }, [start, opsitions]);

  const FixLeftCell = ({ row }: { row: ColumnType }) => {
    const { width, name } = row;
    const WidgetCell = formWidget[row.field.type];
    return (
      <div
        key={name}
        style={{ width }}
        className="h-full border border-solid border-baseGray flex items-center">
        {WidgetCell && <WidgetCell column={row} />}
      </div>
    );
  };

  return (
    <div
      ref={listDomRef}
      className="w-full flex h-full relative  overflow-auto "
      onScroll={onScroll}>
      <div
        ref={listHeightRef}
        className="w-full -z-[1] absolute left-0 right-0 top-0"></div>
      <div ref={itemsRef} className="w-full absolute top-0 right-0 left-0">
        {visibleList.map((item, index) => {
          return (
            <div
              id={item.id}
              className="w-full box-border text-center"
              key={item.value}>
              <div className="flex items-center h-[37px]">
                <FixLeftCell row={columns[0]} />
                {columns.slice(1).map((column: ColumnType) => {
                  const WidgetCell = formWidget[column.field.type];
                  const { width } = column;
                  return (
                    <div
                      key={column.name}
                      style={{ width }}
                      className="h-full border-l-0 border-t border-b border-r border-solid border-baseGray flex items-center">
                      {WidgetCell && <WidgetCell column={column} />}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VritualList;
