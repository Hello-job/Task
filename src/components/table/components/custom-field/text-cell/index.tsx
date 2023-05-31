import { useState } from 'react';
import { Input } from 'antd';
import type { IProps } from '../interface';
import type { ChangeEvent } from 'react';

const TextArea = ({ column, rowItem, onChange }: IProps) => {
  const [edit, setEdit] = useState(false);
  const defaultValue = rowItem[column.name];
  const [currentValue, setCurrentValue] = useState(defaultValue);
  const handleOnBlur = () => {
    onChange({
      column,
      rowItem,
      value: currentValue
    });
    setEdit(false);
  };
  return (
    <>
      {edit ? (
        <Input
          className="text-sm"
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
        <span
          className="px-[11px] w-full h-full flex items-center"
          onClick={() => {
            setEdit(true);
          }}>
          <span>{defaultValue}</span>
        </span>
      )}
    </>
  );
};

export default TextArea;
