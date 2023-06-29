import { useState, memo, useContext } from 'react';
import { Input } from 'antd';
import Cell from '../custom-field/cell';
import type { ChangeEvent } from 'react';
import type {
  rowDataType,
  ColumnType,
  ChangeType
} from '@/stores/project/types';
import { TableContentContext } from './context';

const FixLeftCell = ({
  column,
  rowItem,
  onChange,
  onChangeRowState
}: {
  column: ColumnType;
  rowItem: rowDataType;
  onChange: (params: any) => void;
  onChangeRowState: (type: ChangeType, row: rowDataType) => void;
}) => {
  const { onRightCellClick } = useContext(TableContentContext);

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
      data-id={rowItem.id}
      key={name}
      style={{ width }}
      className="h-full flex-shrink-0 border border-solid border-baseGray flex items-center sticky left-0 z-50 bg-white"
      onClick={() => {
        onChangeRowState('edit', rowItem);
      }}>
      <Cell
        rowItem={rowItem}
        column={column}
        onRightCellClick={onRightCellClick}>
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
