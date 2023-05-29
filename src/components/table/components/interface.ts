const baseColumn = {
  name: 'title',
  label: '标题',
  field: {
    type: 'textarea'
  },
  width: 200
};

type ColumnType = typeof baseColumn;

interface TableContentProps {
  visibleList: any[];
  columns: any[];
  onChange: any;
  setVisibleList: (params: any) => void;
}

export type { ColumnType, TableContentProps };
