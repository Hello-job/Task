import { useState } from 'react';
import { Input } from 'antd';
import Cell from '../cell';
import type { IProps } from '../interface';

const TextArea = ({ column, rowItem, onChange }: IProps) => {
  const [edit, setEdit] = useState(false);
  const defaultValue = rowItem[column.name];
  const handleOnBlur = () => {
    setEdit(false);
  };
  return (
    <Cell>
      <div>
        {edit ? (
          <Input
            defaultValue={column.label}
            value={defaultValue}
            onChange={e => {
              onChange({
                column,
                rowItem,
                value: e.target.value
              });
            }}
            onBlur={handleOnBlur}
            autoFocus
          />
        ) : (
          <div
            onClick={() => {
              setEdit(true);
            }}>
            {defaultValue}
          </div>
        )}
      </div>
    </Cell>
  );
};

export default TextArea;
