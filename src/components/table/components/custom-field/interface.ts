import type { ColumnType } from '@/view/project-overview/interface';

interface IProps {
  column: ColumnType;
  rowItem: any;
  onChange: (params: any) => void;
}

export type { IProps };
