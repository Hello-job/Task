type ChangeType = 'edit' | 'add';

interface rowDataType {
  id: number;
  title: string;
  index: number;
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
  index: number;
  width?: number;
}

interface applicationType {
  dataSource: dataSourceType;
  columns: ColumnType[];
  projectInfo: any;
  projectList: any[];
}

export type {
  dataSourceType,
  rowDataType,
  applicationType,
  ColumnType,
  fieldType,
  ChangeType
};
