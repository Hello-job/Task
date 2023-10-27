type ChangeType = 'edit' | 'add';

interface RowDataType {
  id: number;
  title: string;
  index: number;
  recordStatus?: number;
  type?: ChangeType;
  [key: string]: any;
}

type DataSourceType = RowDataType[];

interface FieldType {
  type: string;
  props?: any;
}
interface ColumnType {
  name: string;
  title: string;
  field: FieldType;
  index: number;
  width?: number;
}

interface ApplicationType {
  dataSource: DataSourceType;
  columns: ColumnType[];
  projectInfo: any;
  projectList: any[];
}

export type {
  DataSourceType,
  RowDataType,
  ApplicationType,
  ColumnType,
  FieldType,
  ChangeType
};
