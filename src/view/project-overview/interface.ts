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

export type { ColumnType };
