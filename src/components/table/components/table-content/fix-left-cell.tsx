import { useState, memo } from 'react';
import { Input } from 'antd';
import Cell from '../custom-field/cell';
import type { ColumnType } from '../interface';
import type { ChangeEvent, MouseEvent } from 'react';

const FixLeftCell = ({
  column,
  rowItem,
  onChange,
  onChangeRow,
  handleContextMenu
}: {
  column: ColumnType;
  rowItem: any;
  onChange: (params: any) => void;
  onChangeRow: (type: any, row: any) => void;
  handleContextMenu: (e: MouseEvent<HTMLDivElement>, row: any) => void;
}) => {
  const { width, name } = column;
  const defaultValue = rowItem[column.name];
  const [currentValue, setCurrentValue] = useState(defaultValue);
  const { type } = rowItem;

  const handleOnBlur = () => {
    if (rowItem.type) {
      delete rowItem.type;
    }
    onChange({
      column,
      rowItem,
      value: currentValue
    });
  };

  return (
    <div
      key={name}
      style={{ width }}
      className="h-full border border-solid border-baseGray flex items-center"
      onClick={() => {
        onChangeRow('edit', rowItem);
      }}
      onContextMenu={(e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleContextMenu(e, rowItem);
      }}>
      <Cell>
        {['edit', 'add'].includes(type) ? (
          <Input
            bordered={false}
            defaultValue={defaultValue}
            value={currentValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCurrentValue(e.target.value);
            }}
            onBlur={handleOnBlur}
            autoFocus
          />
        ) : (
          <span className="px-[11px]">{defaultValue}</span>
        )}
      </Cell>
    </div>
  );
};

export default memo(FixLeftCell);
