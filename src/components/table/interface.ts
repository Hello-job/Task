interface TableProps {
  columns: any[];
  visibleList: any[];
  onChange: any;
  setVisibleList: (params: any) => void;
}

const baseColumn = {
  name: 'title',
  label: '标题',
  field: {
    type: 'textarea'
  },
  width: 200
};

type ColumnType = typeof baseColumn;

export type { TableProps, ColumnType };
