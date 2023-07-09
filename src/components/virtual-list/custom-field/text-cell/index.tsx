import { useState } from 'react';
import { Input } from 'antd';
import Cell from '../cell';
import type { ColumnType } from '@/view/project-overview/interface';

interface TextAreaType {
  column: ColumnType;
}

const TextArea = ({ column }: TextAreaType) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(column.title);
  const handleOnBlur = () => {
    setEdit(false);
  };
  return (
    <Cell>
      <div>
        {edit ? (
          <Input
            defaultValue={column.title}
            value={value}
            onChange={e => setValue(e.target.value)}
            onBlur={handleOnBlur}
            autoFocus
          />
        ) : (
          <span
            onClick={() => {
              setEdit(true);
            }}>
            {value}
          </span>
        )}
      </div>
    </Cell>
  );
};

export default TextArea;
