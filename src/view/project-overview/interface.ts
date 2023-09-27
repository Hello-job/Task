import type { rowDataType, ColumnType } from '@/stores/project/types';
interface onChangeRow {
  column: ColumnType;
  rowItem: rowDataType;
  value: any;
}

type actionColumnType = 'add' | 'edit' | 'delete' | 'sort';
interface operationColumnType {
  type: actionColumnType;
  column?: ColumnType;
  newColumns?: ColumnType[];
}

export type { onChangeRow, operationColumnType };
