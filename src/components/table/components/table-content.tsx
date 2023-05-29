import { useMemo, useState } from 'react';
import { formWidget } from './config';
import type { TableContentProps, ColumnType } from './interface';

const TableContent = ({
  visibleList,
  columns,
  onChange,
  setVisibleList
}: TableContentProps) => {
  const [beginColumn, ...otherColumn] = columns;

  const FixLeftCell = ({
    column,
    rowItem
  }: {
    column: ColumnType;
    rowItem: any;
  }) => {
    const { width, name } = column;
    const WidgetCell = formWidget[column.field.type];
    return (
      <div
        key={name}
        style={{ width }}
        className="h-full border border-solid border-baseGray flex items-center">
        {WidgetCell && (
          <WidgetCell column={column} rowItem={rowItem} onChange={onChange} />
        )}
      </div>
    );
  };

  const AddRow = () => {
    return (
      <div
        style={{ width: rowWidth }}
        className="border-t-0 border-b border-l border-r  border-solid border-baseGray flex items-center px-2 h-[37px] cursor-pointer"
        onClick={() => {
          const oldVisibleList = [...visibleList];
          oldVisibleList.push({
            id: 99
          });
          setVisibleList(oldVisibleList);
        }}>
        +
      </div>
    );
  };

  const rowWidth = useMemo(() => {
    return columns.reduce((pre, item) => {
      return pre + item.width;
    }, 0);
  }, [columns]);

  return (
    <div className="w-full flex flex-col">
      {visibleList.map(item => {
        return (
          <div id={item.id} className="box-border text-center" key={item.id}>
            <div className="flex items-center h-[37px]">
              <FixLeftCell column={beginColumn} rowItem={item} />
              {otherColumn.map((column: ColumnType) => {
                const WidgetCell = formWidget[column.field.type];
                const { width } = column;
                return (
                  <div
                    key={column.name}
                    style={{ width }}
                    className="h-full border-l-0 border-t border-b border-r border-solid border-baseGray flex items-center">
                    {WidgetCell && (
                      <WidgetCell
                        column={column}
                        rowItem={item}
                        onChange={onChange}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <AddRow />
    </div>
  );
};

export default TableContent;
