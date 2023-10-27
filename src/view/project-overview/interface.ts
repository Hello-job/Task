import type { RowDataType, ColumnType } from '@/types';
interface onChangeRow {
  column: ColumnType;
  rowItem: RowDataType;
  value: any;
}

type actionColumnType = 'add' | 'edit' | 'delete' | 'sort';
interface operationColumnType {
  type: actionColumnType;
  column?: ColumnType;
  newColumns?: ColumnType[];
}

export type { onChangeRow, operationColumnType };
