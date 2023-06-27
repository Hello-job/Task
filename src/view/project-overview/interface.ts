import type { rowDataType, ColumnType } from '@/stores/project/types';
interface onChangeRow {
  column: ColumnType;
  rowItem: rowDataType;
  value: any;
}

type actionColumnType = 'add' | 'edit' | 'delete';
interface operationColumnType {
  type: actionColumnType;
  column: ColumnType;
}

export type { onChangeRow, operationColumnType };
