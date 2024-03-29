import { memo, useMemo, useState, useCallback, useEffect } from 'react';
import { formWidget } from '../config';
import FixLeftCell from './widget/fix-left-cell';
import TdMenu from './widget/td-menu';
import Cell from '../custom-field/cell';
import type { MouseEvent } from 'react';
import type { TableProps } from '../../index';
import type { RowDataType, ColumnType } from '@/types';
import { TableContentContextProvider } from './context';
import useRowOperationFns from './hooks/useRowOperationFns';

interface onChangeRow {
  column: ColumnType;
  rowItem: RowDataType;
  value: any;
}

type ChangeType = 'edit' | 'add';

type TableContentProps = Omit<TableProps, 'handleColumnsAction'> & {
  [key: string]: any;
};

interface TableRowContextType {
  onRowChange: (params: onChangeRow) => void;
  onRightCellClick: (e: MouseEvent<HTMLDivElement>, row: RowDataType) => void;
}

const initXYRange = {
  startRange: {
    x: undefined,
    y: undefined
  },
  endRange: {
    x: undefined,
    y: undefined
  }
};

export type { TableRowContextType };

const TableContent = ({
  visibleList,
  columns,
  onRowChange,
  setVisibleList
}: TableContentProps) => {
  const [beginColumn, ...otherColumn] = columns;

  // 单元格右击菜单
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({
    x: 0,
    y: 0
  });
  const [menuRow, setMenuRow] = useState<RowDataType | null>(null);
  // 鼠标左键长按
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState(initXYRange);
  const [mouseCells, setMouseCells] = useState<RowDataType[]>([]);

  const { addUpRecord, addDownRecord, deleteRecord } = useRowOperationFns({
    dataSource: visibleList,
    setVisibleList,
    setMenuVisible
  });

  const onListeners = useCallback(() => {
    if (mouseCells.length) {
      setMouseCells([]);
    }

    if (!mouseDown) {
      setSelectedRange(initXYRange);
    }
  }, [mouseCells, mouseDown]);

  useEffect(() => {
    document.addEventListener('mousedown', onListeners);
    return () => {
      document.removeEventListener('mousedown', onListeners);
    };
  }, [onListeners]);

  const handleMouseUp = useCallback(() => {
    if (mouseDown) {
      setMouseDown(false);
    }
  }, [mouseDown]);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseUp]);

  /**
   * 鼠标右键操作
   */
  const handleContextMenu = useCallback(
    (e: MouseEvent<HTMLDivElement>, rowItem: RowDataType) => {
      const { clientX, clientY } = e;
      setMenuVisible(true);
      setMenuPosition({
        x: clientX,
        y: clientY
      });
      setMenuRow(rowItem);
    },
    []
  );

  /**
   * @description 改变行状态
   * @return {void}
   */
  const onChangeRowState = useCallback(
    (type: ChangeType, row: RowDataType) => {
      visibleList.forEach(item => {
        if (item.id === row.id) {
          item.type = type;
        }
      });
      setVisibleList([...visibleList]);
    },
    [visibleList, setVisibleList]
  );

  /**
   * @description 新增行宽度
   */
  const rowWidth = useMemo(() => {
    return columns.reduce((pre, item) => {
      if (item.width) {
        return pre + item.width;
      }
      return pre;
    }, 0);
  }, [columns]);

  /**
   * @description 新增行render
   * @returns {void}
   */
  const AddRow = () => {
    return (
      <div
        style={{ width: rowWidth }}
        className="border-t-0 border-b border-l border-r  border-solid border-baseGray flex items-center px-2 p-l[19px] h-[37px] cursor-pointer"
        onClick={() => {
          const oldVisibleList = [...visibleList];
          oldVisibleList.push({
            id: 99,
            title: '',
            type: 'add',
            index: oldVisibleList.length
          });
          setVisibleList(oldVisibleList);
        }}>
        +
      </div>
    );
  };

  /**
   * TableRowContext
   */
  const TableRowContext = useMemo(
    () => ({
      onRowChange,
      mouseDown,
      selectedRange,
      setMouseDown,
      onRightCellClick: handleContextMenu,
      setSelectedRange
    }),
    [handleContextMenu, onRowChange, selectedRange, mouseDown]
  );

  return (
    <TableContentContextProvider value={TableRowContext}>
      <div className="w-full flex flex-col">
        {/* 行数据 */}
        {visibleList.map(item => {
          return (
            <div className="box-border text-center" key={item.id}>
              <div className="flex items-center h-[37px]">
                <FixLeftCell
                  column={beginColumn}
                  rowItem={item}
                  onChange={onRowChange}
                  onChangeRowState={onChangeRowState}
                />
                {otherColumn.map((column: ColumnType) => {
                  const WidgetCell = formWidget[column.field.type];
                  const { width } = column;
                  return (
                    <div
                      data-id={item.id}
                      key={column.name}
                      style={{ width }}
                      className="h-full  flex-shrink-0  border-l-0 border-t border-b border-r border-solid border-baseGray flex items-center">
                      <Cell
                        column={column}
                        mouseCells={mouseCells}
                        setMouseCells={setMouseCells}
                        rowItem={item}
                        onRightCellClick={handleContextMenu}>
                        {WidgetCell && (
                          <WidgetCell
                            column={column}
                            rowItem={item}
                            onChange={onRowChange}
                          />
                        )}
                      </Cell>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {/* 新增行 */}
        <AddRow />
        {/* 右键操作 */}
        {menuVisible && (
          <TdMenu
            menuRow={menuRow as RowDataType}
            menuPosition={menuPosition}
            onAddUpRecord={addUpRecord}
            onAddDownRecord={addDownRecord}
            onDeleteRecord={deleteRecord}
            onClose={() => setMenuVisible(false)}
          />
        )}
      </div>
    </TableContentContextProvider>
  );
};

export default memo(TableContent);
