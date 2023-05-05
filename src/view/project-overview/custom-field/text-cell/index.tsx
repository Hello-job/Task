import {} from 'react';
import type { ColumnType } from '../../interface';

interface TextAreaType {
  column: ColumnType;
}

const TextArea = ({ column }: TextAreaType) => {
  const { width } = column;
  return <div style={{ width }}>{column.label}</div>;
};

export default TextArea;
