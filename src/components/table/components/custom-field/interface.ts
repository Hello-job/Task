import type { rowDataType, ColumnType } from '@/stores/project/types';

interface IProps {
  column: ColumnType;
  rowItem: rowDataType;
  onChange: (params: any) => void;
}

export type { IProps };
