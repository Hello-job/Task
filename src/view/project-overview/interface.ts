const baseColumn = {
  name: 'title',
  label: '标题',
  field: {
    type: 'textarea'
  },
  width: 200
};

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
