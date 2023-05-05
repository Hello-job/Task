import type { ColumnType } from '../../interface';
interface SingleSelectType {
  column: ColumnType;
}

const SingleSelect = ({ column }: SingleSelectType) => {
  const { width } = column;
  return <div style={{ width }}>{column.label}</div>;
};

export default SingleSelect;
