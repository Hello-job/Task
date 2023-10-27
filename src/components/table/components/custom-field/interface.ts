import type { RowDataType, ColumnType } from '@/types';

interface IProps {
  column: ColumnType;
  rowItem: RowDataType;
  onChange: (params: any) => void;
}

export type { IProps };
