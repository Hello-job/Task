import type { ColumnType } from '@/view/project-overview/interface';
import type { rowDataType } from '@/stores/application/types';

interface IProps {
  column: ColumnType;
  rowItem: rowDataType;
  onChange: (params: any) => void;
}

export type { IProps };
