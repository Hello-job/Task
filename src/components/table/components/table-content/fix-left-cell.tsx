import { useState, memo } from 'react';
import { Input } from 'antd';
import Cell from '../custom-field/cell';
import type { ChangeEvent, MouseEvent } from 'react';
import type {
  rowDataType,
  ColumnType,
  ChangeType
} from '@/stores/application/types';

const FixLeftCell = ({
  column,
  rowItem,
  onChange,
  onChangeRow,
  handleContextMenu
}: {
  column: ColumnType;
  rowItem: rowDataType;
  onChange: (params: any) => void;
  onChangeRow: (type: ChangeType, row: rowDataType) => void;
  handleContextMenu: (e: MouseEvent<HTMLDivElement>, row: rowDataType) => void;
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
      }}>
      <Cell rowItem={rowItem} handleContextMenu={handleContextMenu}>
        {['edit', 'add'].includes(type as ChangeType) ? (
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
