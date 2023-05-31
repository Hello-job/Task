type ChangeType = 'edit' | 'add';

interface rowDataType {
  id: number;
  title: string;
  recordStatus?: number;
  type?: ChangeType;
  [key: string]: any;
}

type dataSourceType = rowDataType[];

interface fieldType {
  type: string;
  props?: any;
}
interface ColumnType {
  name: string;
  label: string;
  field: fieldType;
  width?: number;
}

interface applicationType {
  dataSource: dataSourceType;
  columns: ColumnType[];
}

export type {
  dataSourceType,
  rowDataType,
  applicationType,
  ColumnType,
  fieldType,
  ChangeType
};
